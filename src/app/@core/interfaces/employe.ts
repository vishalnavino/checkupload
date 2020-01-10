import { ITimeSheet } from './itime-sheet';

export interface Employee {
    id: string;
    name: string;
    password: string;
    descr: string;
    gross_salary_month: number;
    health_insurance_share: number;
    surcharge: number;
    contract_hours_month: number;
    type:string;
    working_contract:string;
    limit_hours_month: number;
    ref_id: number;
    timeSheets: ITimeSheet[];
    editMode : boolean;
    valid:number
}
