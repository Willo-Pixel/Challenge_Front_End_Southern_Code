export interface GetDataTypes {
    rover: string ,
    date_type: string,
    camera: string,
    date_value: string,
}

export interface RoverTypes {
    id: number,
    landing_date: string,
    launch_date: string,
    name: string,
    status: string
}

export interface CameraTypes {
    full_name: string,
    id: number,
    name: string,
    rover_id: number,
}

export interface PhotosTypes {
    camera: CameraTypes
    earth_date: string,
    id: number,
    img_src: string,
    rover: RoverTypes
    sol: number,
}