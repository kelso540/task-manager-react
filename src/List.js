import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './context/UserContext';

export default function List({item, count}) {

  const [strike, setStrike] = useState(false);
  const [color, setColor] = useState(true); 
  const [idBoolean, setIdBoolean] = useState(true);
  const [nowTime, setNowTime] = useState('');  

  const {setShowDelete, list, deleteCount, setDeleteCount} = useContext(UserContext);

  const setTime = () => {
    const date = new Date(); 
    const timeSplit = date.toString().split(' ');
    const time = timeSplit[4].toString().split(':'); 
    let amPM = "AM";
    let zero = "0";  
    if (time[0] < 12){ 
      amPM = "AM";
    }
    if (time[0] >= 12){
    amPM = "PM";
    time[0] -= 12;
    if(time[0] < 10){
        time[0] = zero + time[0];
    }
    }
    if(time[0] <= 0){
      time[0] = 12; 
    }
    const newTime = timeSplit[1] + ' ' + timeSplit[2] + ' ' + timeSplit[3] + ' at ' + time[0] + ":" + time[1] + ":" + time[2] + ' ' + amPM; 
    setNowTime(newTime); 
  }  

  useEffect(()=>{
    setTime();
  },[])
  
  const setDelete = () => {
    if(idBoolean){
      setDeleteCount(deleteCount + 1); 
    } else {
      setDeleteCount(deleteCount - 1); 
    }
  }

  const strikeThrough = () =>{
    setIdBoolean(!idBoolean);
    setStrike(!strike); 
    setColor(!color);  
    setShowDelete(true);
    list[count].id = idBoolean; 
    setDelete();
  }

  useEffect(()=>{
    console.log(deleteCount);
    if(deleteCount <= 0){
      setShowDelete(false); 
    }
  },[deleteCount, setShowDelete])

  return (
    <div className={(color) ?'firstColor' :'secondColor'} >

      <div className='taskDiv'>
        <span onClick={strikeThrough} className={(!strike) ?'check' :'checkMark'}></span>
        <div className='itemDiv'>
          <strong className={(!strike) ?'listItem' :'strikeThrough'}>{item}</strong>
        </div>
      </div>

      <div className='timeDiv'>
        <h4 className={(!strike) ?'noOpacity' :'opacity'}>Created {nowTime}</h4>
      </div>
      
    </div>
  )
}
