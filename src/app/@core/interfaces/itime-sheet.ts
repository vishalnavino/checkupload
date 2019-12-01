export interface ITimeSheet {

    id: String,
    from_time: String,
    to_time: String,
    type: String,
    manual_time: String,
    note: String,
    ref_id: number,
    valid: number,
    ts: String,
    deductedHours: number,
    employee_id: String,
    hours: number,
    editMode : boolean

}
