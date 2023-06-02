import { GetDataTypes } from "./types";

const api_key = '';

export function getData({rover, date_type, camera, date_value}: GetDataTypes) {

    let photos_path = 'photos';

    let date_path: string;

    if((date_type.length===0)||(date_type==='latest')){
        photos_path = 'latest_photos';
        date_path = date_type;
    } else {
        date_path = `${date_type}=${date_value}`
    }

    const query = `https://mars-photos.herokuapp.com/api/v1/rovers/${rover}/${photos_path}?api_key=${api_key}&${date_path}&camera=${camera}`
    const res = fetch(query,{ cache: 'no-store' }).then((r) => {
         
        if(r.status===400){
          throw new Error('Bad Request!');
        }
       
        if (!r.ok) {
          throw new Error('Failed to fetch data');
        }

        return r.json()
        
      }).catch((e)=>{

        console.error('In the request:', e.message)
        throw e

      });
   
    return res;
  }