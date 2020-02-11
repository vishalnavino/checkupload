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


  public insertData(timeSheet : ITimeSheet) : Observable<any>{
    let requestBody = JSON.stringify(timeSheet);
    return this.http.post(this.getApiPath('timesheets'),requestBody,this.getHttpHeaders())
      .pipe(map(res => res));
  }

  public getTimeSheets(): Observable<ITimeSheet[]> {
    return this.http.get(this.timeSheetsUrl)
      .pipe(map(res => this.mapProductsFromApi(res)));
  }
  public getShifts(url?:string): Observable<ITimeSheet[]> {
    return this.http.get(this.getApiPath('timesheets/readall'))
      .pipe(map(res => this.mapProductsFromApi(res)));
  }

  public getShift(id : number) : Observable<ITimeSheet>{
    return this.http.get(this.getApiPath('timesheets/'+id))
    .pipe(map(res  => this.mapShistFromAPI(res)));
  }
  public updateData(timeSheet : ITimeSheet) : Observable<any>{
    return this.http.put(this.getApiPath('timesheets/'+timeSheet.id), timeSheet ,{headers: this.getThymeApiHeaders()})
      .pipe(map(res => res));
  }

  public deleteData(id: String) {
    return this.http.delete(this.getApiPath('timesheets/'+id))
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
    console.log(response)
    for (let i = 0; i < response.length; i++) {
      let employee: ITimeSheet = response[i];
      timeSheets.push(employee);
    }
    return timeSheets;
  }

  private mapShistFromAPI(responseItem: any): ITimeSheet {
    let timeSheet: ITimeSheet = <ITimeSheet>{};
    timeSheet.employee_id = responseItem.employee_id;
    timeSheet.from_time = responseItem.from_time;
    timeSheet.to_time = responseItem.to_time;
    console.log('res type'+responseItem.type)
    timeSheet.type = responseItem.type;
    timeSheet.note = responseItem.note;
    timeSheet.hours = responseItem.hours;
    timeSheet.manual_time = responseItem.manual_time;
    timeSheet.bit_attributes = responseItem.bit_attributes;
    timeSheet.keywords = responseItem.keywords;
    timeSheet.location = responseItem.location;
    timeSheet.name=responseItem.name;
    timeSheet.recurring=responseItem.recurring;

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
