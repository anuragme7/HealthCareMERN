import React, { useState,useEffect } from "react";
import {Link} from "react-router-dom";

import { MedicalService } from "../../services/MedicalService";
import TableComponentFunctional from "./../../TableComponent/tableComponentFunctional";
import {DataContext} from './../../TableComponent/datacontext';
import SideBar from "./../../SideBar/SideBar";
import {SideBarData} from './../listComponentSideBarData';
const ListMedicalComponent=(props)=> {
  
  const [message,setMessage] =useState('');
  const [medical, updatemedical] = useState([]);
  //const [headers,updateHeaders]=useState(["PatientId","PatientFname","PatientLname","IPD_OPD","Disease"]);
  const serv = new MedicalService();
  const getValues=()=> {
    let token = sessionStorage.getItem("token");
    if (token === undefined) {
      setMessage(`Please send the Auth Header`);
    } else {
      serv
        .getData(token)
        .then((resp) => {
            if(resp.status===200){
          updatemedical(resp.data.rows);}
          setMessage(resp.data.message);
        })
        .catch((error) => {
          setMessage(error.message);
        });
    }
  }
  const getDetails=(val)=>{
    console.log("Value================== "+val);
    // if(props.hidden===true){
    //     props.history.push(`/recep/patientbyid/${val}`);
    // }
    // else{
    // props.history.push(`/patientbyid/${val}`);}
  }

  useEffect(()=>{
    if(sessionStorage.getItem("token")===undefined){
      setMessage("Please Login");
      props.history.push('/');
    }
    else{
      getValues();
     }
  },[]);

  const logout=()=>{
    sessionStorage.clear();
    props.history.push('/');
  }
    return (
      <div>
            <input className='btn' id="logout" hidden={props.hidden} type="button" value="Logout" onClick={logout} />
        <strong><span hidden={props.hidden} className='fright'>Hi, Admin</span></strong>
        <ul className='screen'>
              <li className='ui'>
                <div>
                    <SideBar SideBarData={SideBarData} hidden={props.hidden}/>
                </div>        
                <div className="container">  <br />
                  <strong>{message}</strong><br />
                  <DataContext.Provider value={{medical,undefined,getDetails}}>
                  <TableComponentFunctional id="MedId" ></TableComponentFunctional>
                  </DataContext.Provider>         
                </div>
            </li>
            </ul>        
      </div>

      
    );
  }

export default ListMedicalComponent;
