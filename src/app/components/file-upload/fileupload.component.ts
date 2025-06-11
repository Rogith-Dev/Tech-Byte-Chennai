import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FileService } from '../../services/file-service/file.service';
import { HttpService } from '../../services/http-service/http.service';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html'
})

export class FileUploadComponent implements OnInit {

  public fileUploadForm!: FormGroup;
  public uploadFile: any = {
    id: null,
    name: null,
    sourceFileName: null,
    resourceKey: null,
    resourcePath: null,
    imageFileIdList: null // list of ids
  };
  public uploadLabelName!: string;
  public progressPercentage = 0;
  public accountFileUploadLimit = 0;
  public accountStorageLimit = 0;
  public currentAccountStorage = 0;
  public FileSelectInputDialog: any;
  private errorObjects = {};

  constructor(
    private fileService: FileService,
    private httpService: HttpService,
    private router: Router
  ) {
  }

  @Input() labelName: string;
  @Input() encryptedData: String;
  @Input() uploadFileData: object;
  @Input() form: FormGroup;
  @Input() uploadStatus: boolean;
  @Output() fileUploadInfo = new EventEmitter<any>();
  @Output() imageFileUploadInfo = new EventEmitter<any>();
  @Output() convertedFileUploadInfo = new EventEmitter<any>();
  @Input() canDisableFileUpload: boolean;
  @Input() AcceptFileType: any;

  /* Below line is implemented by Dinesh (for filenotes)*/
  @Input() resetChild: Subject<boolean> = new Subject<boolean>();

  ngOnInit(): void {

    this.uploadLabelName = this.labelName;
    this.fileUploadForm = this.form;
    this.uploadFile = this.uploadFileData;

    this.resetChild.subscribe(response => {
      if (response) {
        this.uploadFile = response;
      }
    });
  }

  /* change file. */
  public onFileSelect(file): void {
    if (file && file.length === 0) {
      return;
    }

    // Extract the file extension
    let fileName = file[0].name;
    let fileExtension = fileName.slice(fileName.lastIndexOf('.'));
    let mimeType = fileExtension ? fileExtension : '';
    const updatedFile = new File([file[0]], fileName, { type: mimeType });

    // init scan
    this.fileUploadInfo.next('uploadStart');
    this.initScanAndUpload(updatedFile);
  }

  private initScanAndUpload(file): void {
    const selectedFile = file;
    this.fileService.getFileNumOfPages(file, (pdf) => {

      if (pdf) {
        if (pdf.isEncrypted) { // check if file is password protected
          this.uploadFile.fileIsEncrypted = true;
          return;
        } else {
          this.uploadFile.fileIsEncrypted = false;
        }

        selectedFile.numberOfPages = pdf._pdfInfo.numPages;
      }
      // init scan process
      this.initScan(file);
    });

  }

  public initScan(file): void {

    this.uploadFile.isScanningFile = true;
    // init scan process
    this.fileService.startScanProcess(file, async (err, data) => {
      this.uploadFile.isScanningFile = false;

      if (err) {
        this.alertService.showErrorToasterMessage('Error occurred while scanning file' + err);
        return;
      }

      // if virus detected then return error
      if (data && !data.CleanResult) {
        this.uploadFile.isVirusDetected = true;
        this.uploadFile.virusName = data.FoundViruses[0].VirusName;
        return;
      } else {
        // if virus not detected, then init upload process

        this.initUploadProcess(file, true);
        return Promise.resolve();
      }
    });
  }

  private initUploadProcess(file, isSourceFile): void {

    this.uploadFile.isUploadingFile = true;
    if (file.type === ServerConstant.FILE_TYPES.pdf) {
      this.fileService.getPageNumber(file);
    }
    const encryptedData = this.encryptedData;
    this.fileService.uploadFiles(this.uploadFile, file, isSourceFile, encryptedData, (err, data, key) => {

      // check if callback from progress status
      if (key === 'progress') {
        this.progressPercentage = Math.round(data);  // convert into round value
      } else {
        if (err) {
          console.log('There was an error uploading your file: ', err);
          Object.assign(this.errorObjects, { commonErr: err });
          return;
        }
        this.progressPercentage = 0;
        this.uploadFile.isUploadingFile = false;
        if (data) {
          if (isSourceFile) {
            this.fileUploadInfo.next(data);
          } else {
            this.convertedFileUploadInfo.next(data);
          }
          if (file.type !== ServerConstant.FILE_TYPES.pdf) {
            this.fileService.convertDocumentAutodetectToPdf(file, (convertedFile) => {
              this.initUploadProcess(convertedFile, false);
            });
          } else {
            if (this.uploadLabelName == "Document") {
              this.uploadFile.isConvertingFile = true;
              const selectedFile: File = file;
              this.fileService.convertPdfToImage(this.uploadFile, selectedFile, (response) => {
                const result = response;
                this.uploadFile.imageFileIdList = result.files ? result.files.fileIds : [];
                this.uploadFile.isConvertingFile = false;
              });
            }
          }
        }
      }
    });
  }

  public downloadFileFromS3(fileInfo): void {
    if (fileInfo && fileInfo.resourceKey) {
      this.fileService.downloadS3File(fileInfo);
    }
  }


}
