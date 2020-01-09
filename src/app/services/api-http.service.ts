
import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {catchError, map, timeout} from "rxjs/operators";
import {throwError} from "rxjs/internal/observable/throwError";
import {TimeoutError} from "rxjs/internal-compatibility"
import * as _ from 'lodash';


@Injectable({
    providedIn: 'root'
})
export class ApiHttpService {
    public apiUrl= 'https://thyme-dev.stamp-me.com/api/v2_noauth';
    public requestTimeout: number;

    constructor(private http: HttpClient) {
        this.requestTimeout = 60000;
    }

    public get<T>(endpoint: string, qs: any = {}): Observable<HttpResponse<T>> {
        return this.request(endpoint, 'GET', qs);
    }

    public getUrl(endpoint: string): string {
        return (this.apiUrl + endpoint);
    }

    public getHeader(): { [header: string]: string } {
        let headers = {'Content-Type': 'application/json'}
        return headers;
    }

    private request<T>(endpoint: string, method: string, qs: any = {},
                       data?: any): Observable<HttpResponse<T>> {

        let requestOpts = {
            params:       _.omitBy(qs, _.isNil),
            body:         data,
            headers:      this.getHeader(),
            responseType: <'arraybuffer' | 'blob' | 'json' | 'text'>'json',
        };

        return this.http.request(method, this.getUrl(endpoint), requestOpts)
            .pipe(
                timeout(this.requestTimeout),
                catchError(this.handleError),
                map(resp => {
                    console.log(resp)
                    try {
                      console.log(resp)

                    } catch (e) {
                    }

                    return resp;
                }),
            );
    }

    private handleError(e: any) {
        let newErrorResp = e;

        if (e.error instanceof ErrorEvent || e.error instanceof ProgressEvent) {
            newErrorResp = new HttpErrorResponse({
                error:      {
                    error: {
                        detail: 'Problem connecting to the server.',
                        type:   'ClientError'
                    }
                },
                headers:    e.headers,
                status:     e.status,
                statusText: e.statusText,
                url:        e.url
            });
        } else if (e instanceof TimeoutError) {
            newErrorResp = new HttpErrorResponse({
                error:      {
                    error: {
                        detail: 'Operation timed out',
                        type:   'ServerError'
                    }
                },
                headers:    null,
                status:     504,
                statusText: 'Gateway Timeout',
                url:        null,
            });
        }

        return throwError(newErrorResp);
    }
}