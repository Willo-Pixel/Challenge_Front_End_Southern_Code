'use client'

import { useState, useReducer, useCallback, Reducer, useEffect } from 'react';
import { curiosity_cameras, date_types, oportunity_cameras, rover_names, spirit_cameras } from '../../_services/constants';
import {  getData } from '../../_services/services';
import {  GetDataTypes, PhotosTypes, } from '../../_services/types';

import { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';

import Selector from '../selector';
import { ReducerActionTypes } from './types';
import DateInput from '../dateInput';
import Gallery from '../gallery';

const reducer: Reducer<GetDataTypes, ReducerActionTypes> = (state, action) => {
    switch (action.type) {
      case 'update_rover': {
        return {
          rover: action.payload,
          camera: state.camera,
          date_type: state.date_type,
          date_value: state.date_value,
        };
      }
      case 'update_camera': {
        return {
          rover: state.rover,
          camera: action.payload,
          date_type: state.date_type,
          date_value: state.date_value,
        };
      }
      case 'update_date_type': {
        return {
          rover: state.rover,
          camera: state.camera,
          date_type: action.payload,
          date_value: state.date_value,
        };
      }
      case 'update_date_value': {
        return {
          rover: state.rover,
          camera: state.camera,
          date_type: state.date_type,
          date_value: action.payload,
        };
      }
    }
  }
  
const initialState: GetDataTypes = { rover: 'curiosity', date_type: 'latest', camera: 'NAVCAM', date_value: '' };

export default function Container () {

    const [data, setData] = useState<PhotosTypes[]|undefined>();

    const [loading, setLoading] = useState<boolean>(false);

    const [state, dispatch] = useReducer(reducer, initialState);

    const requestData = (arg:GetDataTypes) => {

      setLoading(true);
      (async()=>{
        try{
          const response = await getData(arg);
          if(response && Object.keys(response).length > 0){
            const new_data = Object.keys(response)
            setData(response[new_data[0]]);
          };
          setLoading(false)
        } catch(e){
          console.log('In the interface', e)
          return
        }
      })();
    }

    const search = () => {
      requestData(state);
    }
    
    const handleChangeRover = useCallback((event: SelectChangeEvent) => {

      const inputText  = event.target.value
      dispatch({type:"update_rover", payload: inputText})
        
    },[]);

    const handleChangeCamera = useCallback((event: SelectChangeEvent) => {

      const inputText  = event.target.value
      dispatch({type:"update_camera", payload: inputText}) 

    },[])

    const handleChangeDateType = useCallback((event: SelectChangeEvent) => {

      const inputText  = event.target.value
      dispatch({type:"update_date_type", payload: inputText})  

    },[])

  const save = () => {

    localStorage.setItem("rover_nasa_app", state.rover);
    localStorage.setItem("camera_nasa_app", state.camera);
    localStorage.setItem("date_type_nasa_app", state.date_type);
    localStorage.setItem("date_value_nasa_app", state.date_value);
  
  }

  const dateCatcher = useCallback((arg:string) => {

    dispatch({type:"update_date_value", payload: arg})

  },[])

  useEffect(()=>{
    const rover = localStorage.getItem("rover_nasa_app");
    const camera = localStorage.getItem("camera_nasa_app");
    const date_type = localStorage.getItem("date_type_nasa_app");
    const date_value =  localStorage.getItem("date_value_nasa_app");

    let firstSearchObject: GetDataTypes = initialState;

    if(rover!=null){
      dispatch({type:'update_rover', payload:rover})
      firstSearchObject = {...firstSearchObject,rover:rover}
    }
    if(camera!=null){
      dispatch({type:'update_camera', payload:camera})
      firstSearchObject = {...firstSearchObject,camera:camera}
    }
    if(date_type!=null){
      dispatch({type:'update_date_type', payload:date_type})
      firstSearchObject = {...firstSearchObject,date_type:date_type}
    }
    if(date_value!=null){
      dispatch({type:'update_date_value', payload:date_value})
      firstSearchObject = {...firstSearchObject,date_value:date_value}
    }
    
    requestData(firstSearchObject);
    
    localStorage.removeItem("rover_nasa_app");
    localStorage.removeItem("camera_nasa_app");
    localStorage.removeItem("date_type_nasa_app");
    localStorage.removeItem("date_value_nasa_app");


  },[])

    return (

      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        style={{ minHeight: '100vh' }}
      >
      <Grid item>
        
          <Selector
            label={'Rover Name'}
            value={state.rover}
            handleChange={handleChangeRover}
            options={rover_names}
          />

          <Selector
            label={'Camera'}
            value={state.camera}
            handleChange={handleChangeCamera}
            options={
              state.rover==='opportunity'? oportunity_cameras:
              state.rover==='curiosity'? curiosity_cameras:
              spirit_cameras
            }
          />

          <Selector
            label={'Date Type'}
            value={state.date_type}
            handleChange={handleChangeDateType}
            options={date_types}
          />
          
      </Grid>
     
      <Grid item>

        <DateInput date_value={state.date_value} date_type={state.date_type} handleOnChange={dateCatcher}/>

      </Grid>

      <Grid item>

        <Button variant="contained" sx={{margin:'0 4px'}} onClick={search}> Get Photos </Button>
        <Button variant="outlined" sx={{margin:'0 4px'}} onClick={save}> Save search for next time </Button>

      </Grid>

      <Grid item>

        {loading && <span style={{margin:'8px'}}> Loading... </span>}

      </Grid>
      
      <Gallery data={data}/>
        
    </Grid>
    )
}