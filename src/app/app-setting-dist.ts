const portNum = window.location.port, hostName = window.location.protocol+'//'+window.location.hostname;
export class AppSettings {
    public static ENDPOINT = portNum ? hostName+':3000': hostName;
}