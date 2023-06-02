export interface ReducerActionTypes {
    type: 'update_rover' | 'update_camera' | 'update_date_type' | 'update_date_value',
    payload: string,
}