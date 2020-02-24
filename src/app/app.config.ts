import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAppConfig } from './app-config.model';

// See: Angular How-to: Editable Config Files
// https://blogs.msdn.microsoft.com/premier_developer/2018/03/01/angular-how-to-editable-config-files/

@Injectable()
export class AppConfig {

    static settings: IAppConfig;

    constructor(private http: HttpClient) { }

    load() {
        const jsonFile = 'assets/config/config.json';
        return new Promise<void>((resolve, reject) => {
            this.http.get(jsonFile).toPromise().then((response: IAppConfig) => {
                AppConfig.settings = <IAppConfig>response;
                resolve();
            }).catch((response: any) => {
                reject('Could not load file "${jsonFile}": ${JSON.stringify(response)}');
            });
        });
    }
}