import React from 'react'
import axios from "axios";
import "./Home.css"
import Input from '@mui/material/Input';
import { useEffect } from 'react';
import { useState } from 'react';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { GetAddress } from '../detectLocation/Location';
import Loader from './../Loader/Loader';

 export const Home = () => {

  const[data1, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const[city, setCity] = useState("london")
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("")


  const fetchData1 = async (e) => {
    await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=9545633b57aba8d5c7220f150d661773`)
    .then(res => {
      setLatitude(res.data.coord.lat)
      setLongitude(res.data.coord.lon)
      console.log(res.data)
     
      fetchData2()
    })
   
  }


  useEffect(() => {
    // fetchData2()
    

   }, [])

  console.log(city)
console.log(latitude, longitude)
  

    

// "https://api.openweathermap.org/data/2.5/onecall?lat=27.45456&lon=78.354545454&appid=9545633b57aba8d5c7220f150d661773"
// "https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=9545633b57aba8d5c7220f150d661773"
// 
let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=9545633b57aba8d5c7220f150d661773`
// console.log(url)
const fetchData2 =  () => {
    axios.get(url)
    .then(res => {
      setData(res.data)
      console.log(res.data)
      .finally(() => { setLoading(false)})
     
    });
    fetchData1()
   
}

   
   
   console.log(data1.hourly);
   console.log(data1.daily);
   
  return (
       

    <div>
       {loading && <div><Loader/></div>}
       <GetAddress lat = {latitude}lon= {longitude}/>
      <input 
      placeholder='Search Your City'        
       onChange={(e) => {
        setCity(e.target.value)
        // fetchData1();
      }} className='input'  /> 
      <button className='btn' onClick={fetchData1}>CLICK ME</button>
        
       <div className='box__1'>
         <div className='temp_1'>
        {data1?.daily?.map((e) => (
        <div className='daily_temp'> <h2>{Math.round(e.temp.day-273) +  "C"}</h2></div>
      
      ))}
      </div>
       <div className='temp_2'>
        { data1?.daily?.map((e) => (
       <div placeholder='daily temprature' className='daily_weather'>{e.weather.map((el) => (
        <h2 >{el.main }</h2>
        ))}  
       </div>
        ))}
        </div>
       
    
       

          <div className='hour' >
            
        {data1?.hourly?.map((e , i) => (
        <div className='hourly_temp'><h2>{Math.round(e.temp - 273 ) + "C" + "  "}</h2></div>
        ))}
      
     
       
    
       </div>
       </div> 
         
         <div className='hpbox'>
         <div className='boxph'>
        <h3>Pressure</h3>
      <h4>{(data1?.current?.pressure) + " hpa"}</h4>
      </div> 

       <div className='boxph'>
        <h3>Humdity</h3>
      <h4>{(data1?.current?.humidity) + "%"}</h4>
      </div> 
      </div>

      <div className='sun'> 
        <h2 className='rise'>Sunrise : 5:30am </h2>
        <h2 className='set'> Sunset : 7:48pm</h2>
      </div>
    
   
    </div>
  ) 
}
 
export default Home;
