import React, { useState,useEffect } from "react";
import {Link} from "react-router-dom";

import { PatientServiceCall } from "../../services/PatientService";
import './PatientComponent.css';
import TableComponentFunctional from "./../../TableComponent/tableComponentFunctional";
import {DataContext} from './../../TableComponent/datacontext';
import SideBar from "./../../SideBar/SideBar";
import {SideBarData} from './../listComponentSideBarData';
const ListPatientComponent=(props)=> {
  
  const [message,setMessage] =useState('');
  const [patients, updatePatients] = useState([]);
  const [headers,updateHeaders]=useState(["PatientId","PatientFname","PatientLname","IPD_OPD","Disease"]);
  const serv = new PatientServiceCall();
  const getValues=()=> {
    let token = sessionStorage.getItem("token");
    if (token === undefined) {
      setMessage(`Please send the Auth Header`);
    } else {
      serv
        .getData(token)
        .then((resp) => {
          updatePatients(resp.data.rows);

          setMessage(`Data Received Successfully`);
        })
        .catch((error) => {
          setMessage(error.message);
        });
    }
  }
  const getDetails=(val)=>{
    console.log("Value================== "+val);
    if(props.hidden===true){
        props.history.push(`/recep/patientbyid/${val}`);
    }
    else{
    props.history.push(`/patientbyid/${val}`);}
  }

  const getAllot=(val)=>{
    if(props.allotDoctor){
      props.history.push(`/recep/allotdoctor/${val}`);
    }

  }

  useEffect(()=>{
    if(sessionStorage.getItem("token")===undefined){
      setMessage("Please Login");
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
                <div hidden={props.hidden}>
                    <SideBar SideBarData={SideBarData} />
                </div>          
        <div className="container">       
        <Link className='btn' id="link" to="/admin/addPatient" hidden={props.hidden}>Add a Patient</Link>
         <br />
          <strong>{message}</strong><br />
          <DataContext.Provider value={{patients,headers,getDetails,getAllot}}>
          <TableComponentFunctional id="PatientId" allotDoc={props.allotDoctor} canEdit={true} canDetails={true} canDelete={true}></TableComponentFunctional>
          </DataContext.Provider>
         
          
        </div>
            </li>
            </ul> 
       

        
      </div>

      
    );
  }

export default ListPatientComponent;
