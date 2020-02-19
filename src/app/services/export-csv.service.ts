import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExportCsvService {
   timesheet = {
    "emp_ids": 0,
    "id" : 0,
    "from_time_start": "string",
    "to_time_end": "string",
    "types": "string",
    "to_time_start": "string",
    "from_time_end": "string",
    "manual_time_end": "string",
    "manual_time_start": "string",
  } 
  
  constructor() { }

  downloadFile(data, filename='data') {
    let csvData = this.ConvertToCSV(data,["id","employee_id","from_time","to_time","type","manual_time","note","ref_id","ts","valid"]);
    console.log(csvData)
    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
        dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
}

downloadFileEmployee(data, filename='data') {
    let csvData = this.ConvertToCSV(data,["id","name","password","type","contract_hours_month","working_contract","gross_salary_month","limit_hours_month","ref_id","state","surcharge","descr"]);
    console.log(csvData)
    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
        dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
}

ConvertToCSV(objArray, headerList) {
     let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
     let str = '';
     let row = 'S.No.,';

     for (let index in headerList) {
         row += headerList[index] + ',';
     }
     row = row.slice(0, -1);
     str += row + '\r\n';
     for (let i = 0; i < array.length; i++) {
         let line = (i+1)+'';
         for (let index in headerList) {
            let head = headerList[index];

             line += ',' + array[i][head];
         }
         str += line + '\r\n';
     }
     return str;
 }
}
