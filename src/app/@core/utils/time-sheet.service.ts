import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITimeSheet } from '../interfaces/itime-sheet';
import { map } from 'rxjs/operators';
import { ThymeConstants } from './thyme-constants';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimeSheetService {
  apiUrl: string = environment.apiUrl;

  timeSheetsUrl: string = ThymeConstants.HOST + 'employees/get_shifts?emp_ids=1&types=h;t;s';
  stampInUrl: string = ThymeConstants.HOST + '/timesheets/timestamp/stamp_in?password=';
  stampOutUrl: string = ThymeConstants.HOST + '/timesheets/timestamp/stamp_out?password=';
  saveTimeStampUrl: string = ThymeConstants.HOST + '/timesheets/timestamp/insert';
  saveHolidayUrl: string = ThymeConstants.HOST + '/timesheets/holiday/insert';
  saveSickNoteUrl: string = ThymeConstants.HOST + '/timesheets/sicknote/insert';

  
  constructor(private http: HttpClient) { }


  public getTimeSheets(): Observable<ITimeSheet[]> {
    return this.http.get(this.timeSheetsUrl)
      .pipe(map(res => this.mapProductsFromApi(res)));
  }
  public getShifts(): Observable<ITimeSheet[]> {
    return this.http.get(this.getApiPath('employees/get_shifts?emp_ids=1&types=h;t;s'))
      .pipe(map(res => this.mapProductsFromApi(res['timesheets'].content)));
  }
  

  public stampIn(password: string): Observable<any> {
    return this.http.post(this.stampInUrl + password, {}, this.getHttpHeaders())
      .pipe(map(res => res));
  }

  public stampOut(password: string): Observable<any> {
    return this.http.post(this.stampOutUrl + password, {}, this.getHttpHeaders())
      .pipe(map(res => res));
  }

  public saveTimeSheet(data:ITimeSheet): Observable<any> {
    let saveUrlPrefix;
    if(data.type == 'holiday'){
      saveUrlPrefix = this.saveHolidayUrl;
      data.type = 'h'
    }
    else if (data.type == 'timestamp'){
      saveUrlPrefix = this.saveTimeStampUrl;
      data.type = 't'
    }
    else if (data.type == 'sicknote'){
      saveUrlPrefix = this.saveSickNoteUrl;
      data.type = 's'
    }
    // let fullSaveUrl = saveUrlPrefix+"?password="+password+"&from_time="+from+"&to_time="+to+"&note="+note;
    return this.http.post(this.getApiPath('timesheets'),data, {headers: this.getThymeApiHeaders()})
      .pipe(map(res => res));
  }

  private mapProductsFromApi(response: any): ITimeSheet[] {
    const timeSheets: ITimeSheet[] = [];
    for (let i = 0; i < response.length; i++) {
      let employee: ITimeSheet = response[i];
      timeSheets.push(employee);
    }
    return timeSheets;
  }

  private populateTimeSheetInformations(responseItem: any): ITimeSheet {
    let timeSheet: ITimeSheet = <ITimeSheet>{};
    timeSheet.from_time = responseItem.from_time;
    timeSheet.to_time = timeSheet.to_time;
    timeSheet.type = timeSheet.type;
    timeSheet.note = timeSheet.note;

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
  getApiPath(path){
    return this.apiUrl+''+path;
  }

  private getThymeApiHeaders(): HttpHeaders {
    let  header: HttpHeaders = new HttpHeaders();
    header = header.set("Content-Type", "application/json");
    header = header.append("thyme_api_token", ThymeConstants.API_KEY);
    return header;
  }
}
