import React, { useState,useEffect } from "react";
import {Link} from "react-router-dom";
import { DoctorPatientService } from "../services/DoctorPatientService";
import { DoctorServiceCall } from "../services/DoctorService";
import TableComponentFunctional from './../TableComponent/tableComponentFunctional';
import { DataContext } from "../TableComponent/datacontext";
import './styleme.css';
const RecepDoctorPatient=(props)=> {
  
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
      let id;
      if(props.id===undefined){
        id=props.match.params.id
      }
      else{
        id=props.id
      }
        docserv
        .getDataById(token,id)
        .then((resp) => {
            if(resp.status===200){
                setMessage(resp.data.message);
                setDoctor(resp.data.rows);
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
      let id;
      if(props.id===undefined){
        id=props.match.params.id
      }
      else{
        id=props.id
      }
        docpatserv
        .getDocDataById(token,id)
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
    sessionStorage.removeItem("token");
    props.history.push('/');
  }
    return (
      <div >
        <table hidden={props.hidden}>
            <tbody>
                <tr className='rowtr'>
                     <td className="rows">
                      <Link className="link" to="/recep/listComponent">Home</Link>
                    </td>
                    <td className="rows">
                     <Link className="link" to="/recep/patients">Patients</Link>
                    </td>
                    <td className="rows">
                     <Link className="link" to="/recep/doctors">Doctors</Link>
                    </td>
                </tr>
            </tbody>
        </table>
        <input className='btn' id='logout' type="button" value="Logout" onClick={logout} hidden={props.hidden} />
        <strong><span className='fright' hidden={props.hidden}>Hi, there</span></strong> <br />
        <div className="container">
            <strong>
                Patient List of Dr. {Doctor.DoctorFname} {Doctor.DoctorLname} ({Doctor.DoctorId})
                <br />  
            </strong>
            <DataContext.Provider value={{PatientsOfDoc,headers}}>
                <TableComponentFunctional
                ></TableComponentFunctional>
                </DataContext.Provider>
        </div>
      </div>
    );
  }

export default RecepDoctorPatient;
