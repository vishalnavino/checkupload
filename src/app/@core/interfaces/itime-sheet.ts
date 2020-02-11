export class ITimeSheet {

    id: string;
    from_time: String;
    to_time: String;
    type: String;
    manual_time: String;
    note: String;
    ref_id: number;
    valid: number;
    ts: String;
    deductedHours: number;
    employee_id: String;
    hours: number;
    editMode : boolean;
    bit_attributes : number;
    keywords : string;
    location : string;
    name : string;
    recurring : number;

    constructor(employee_id,type,from_time,to_time,manual_time,note) { 
        this.employee_id = employee_id; 
        this.type = type; 
        this.from_time = from_time; 
        this.to_time = to_time; 
        this.manual_time = manual_time;
        this.note = note; 
    }

}
