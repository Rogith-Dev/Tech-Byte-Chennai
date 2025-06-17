import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
    name: 'apiUrl'
})
export class ApiUrlPipe implements PipeTransform {
    transform(path: String): string {
        return `${environment.apiUrl}${path}`;
    }
}