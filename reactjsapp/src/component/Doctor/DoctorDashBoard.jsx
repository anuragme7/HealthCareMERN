import React, { useState,useEffect } from "react";
import {Link} from "react-router-dom";
import { DoctorPatientService } from "../services/DoctorPatientService";
import { DoctorServiceCall } from "../services/DoctorService";
import TableComponentFunctional from './../TableComponent/tableComponentFunctional';
import { DataContext } from "../TableComponent/datacontext";
import './doctor.css';
const DoctorDashboard=(props)=> {
  
  const [message,setMessage] =useState('');
  const [PatientsOfDoc,setDocPatients]=useState([]);
  const [Doctor,setDoctor]=useState([]);
  const [headers,updateHeaders]=useState(["PatientId","PatientFname","PatientLname","Disease","IPD_OPD","ReferredIn","ReferredOut"]);


  const docpatserv= new DoctorPatientService();
  const docserv= new DoctorServiceCall();


  const getDoctor=()=>{
    let token = sessionStorage.getItem("token");
    if (token === undefined) {
      setMessage("No Auth Header");
    } else {
        docserv
        .getDataById(token,sessionStorage.getItem("DocId"))
        .then((resp) => {
            if(resp.status===200){
                setMessage(resp.data.message);
                setDoctor(resp.data.rows);
                sessionStorage.setItem('DocName',resp.data.rows.DoctorFname);
            }
            else{
            setMessage(`Validation Error : ${resp.data.message}`);
            }
          
      })
        .catch((error) => {
          setMessage(`Error Occured : ${error.message}`);
        });
    }    
  }
  const getDocPatients=()=>{
    let token = sessionStorage.getItem("token");
    if (token === undefined) {
      setMessage("No Auth Header");
    } else {
        docpatserv
        .getDocDataById(token,sessionStorage.getItem("DocId"))
        .then((resp) => {
            if(resp.status===200){
                setMessage(resp.data.message);
                setDocPatients(resp.data.rows);
            }
            else{
            setMessage(`Validation Error : ${resp.data.message}`);
            }
          
      })
        .catch((error) => {
          setMessage(`Error Occured : ${error.message}`);
        });
    }    
  }
  const getDetails=(val)=>{
    props.history.push(`/doctor/patientbyid/${val}`);
  }

  const showObservations=(val)=>{
    console.log("Received valueeeee = "+val);
    sessionStorage.setItem('PatId',val);
    props.history.push(`/doctor/docobservation/${Doctor.DoctorId}`);
  }

  useEffect(()=>{
    if(sessionStorage.getItem("token")===undefined){
      setMessage("Please Login");
    }
    else{
        getDocPatients();
        getDoctor();
    }
  },[]);
 
  const logout=()=>{
    sessionStorage.clear();
    props.history.push('/');
  }
    return (
      <div>
        {/* <table>
            <tbody>
                <tr className='rowtr'>
                     <td className="rows">
                      <Link className="link" to="/recep/listComponent">Home</Link>
                    </td>         
                </tr>
            </tbody>
        </table> */}
        <input className='btn' id="logout" type="button" value="Logout" onClick={logout} />
        <strong>
        <span className='fright'>Hi Dr. {Doctor.DoctorFname}</span>
        </strong>
        <br />
        <div className='container'><h5>
            <strong>
                Your Patient List
                <br />
            </strong></h5>
            <DataContext.Provider value={{PatientsOfDoc,headers,getDetails}}>
                <TableComponentFunctional id="PatientId"
                canDetails={true} Observation={true} getObservations={showObservations}
                ></TableComponentFunctional>
                </DataContext.Provider>
        </div>
      </div>
    );
  }

export default DoctorDashboard;
