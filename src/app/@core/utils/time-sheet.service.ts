import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITimeSheet } from '../interfaces/itime-sheet';
import { map } from 'rxjs/operators';
import { ThymeConstants } from './thyme-constants';

@Injectable({
  providedIn: 'root'
})
export class TimeSheetService {

  timeSheetsUrl: string = ThymeConstants.HOST + 'employees/get_shifts?emp_ids=1&types=h;t;s';
  stampInUrl: string = ThymeConstants.HOST + '/timesheets/timestamp/stamp_in?password=';
  stampOutUrl: string = ThymeConstants.HOST + '/timesheets/timestamp/stamp_out?password=';
  saveTimeStampUrl: string = ThymeConstants.HOST + '/timesheets/timestamp/insert';
  constructor(private http: HttpClient) { }


  public getTimeSheets(): Observable<ITimeSheet[]> {
    return this.http.get(this.timeSheetsUrl)
      .pipe(map(res => this.mapProductsFromApi(res)));
  }

  public stampIn(password: string): Observable<any> {
    return this.http.post(this.stampInUrl + password, {}, this.getHttpHeaders())
      .pipe(map(res => res));
  }

  public stampOut(password: string): Observable<any> {
    return this.http.post(this.stampOutUrl + password, {}, this.getHttpHeaders())
      .pipe(map(res => res));
  }

  public saveTimeStamp(password: string, from: string, to: string, note: string): Observable<any> {
    let fullSaveUrl = this.saveTimeStampUrl+"?password="+password+"&from_time="+from+"&to_time="+to+"&note="+note;
    return this.http.post(fullSaveUrl, { })
      .pipe(map(res => res));
  }

  private mapProductsFromApi(response: any): ITimeSheet[] {
    const timeSheets: ITimeSheet[] = [];
    for (let i = 0; i < response.length; i++) {
      let employee: ITimeSheet = this.populateTimeSheetInformations(response[i]);
      timeSheets.push(employee);
    }
    return timeSheets;
  }

  private populateTimeSheetInformations(responseItem: any): ITimeSheet {
    let timeSheet: ITimeSheet = <ITimeSheet>{};
    timeSheet.from_time = responseItem.from_time;
    timeSheet.to_time = timeSheet.to_time;
    timeSheet.hours = timeSheet.hours;
    timeSheet
    return timeSheet;
  }

  private getHttpHeaders(): any {
    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      })
    };
    return httpOptions;
  }

}
