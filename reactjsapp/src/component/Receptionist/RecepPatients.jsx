import React, { useState,useEffect } from "react";
import {Link} from "react-router-dom";
import { PatientServiceCall } from "../services/PatientService";
import { DoctorServiceCall } from "../services/DoctorService";
import ListPatientComponent from "../Admin/Patient-Functional/listPatientComponent";
import './styleme.css';
const RecepPatients=(props)=> {
  const logout=()=>{
    sessionStorage.removeItem("token");
    props.history.push('/');
  }
    return (
      <div>
        <table>
            <tbody>
                <tr className='rowtr'>
                    <td className="rows">
                      <Link className="link" to="/recep/listComponent">Home</Link>
                    </td>
                    <td className="rows">
                    <Link  className="link" to="/recep/addpatient">Add a Patient</Link>
                    </td>
                    <td className="rows">
                      <Link className="link" to="/recep/doctors">Doctors</Link>
                    </td>
                </tr>
            </tbody>
        </table>
        <input className='btn' id='logout' type="button" value="Logout" onClick={logout} />
        <strong><span className='fright'>Hi, there</span></strong><br />  
        <div className='container'>
        <h5><strong>Patient List</strong></h5>
        <ListPatientComponent hidden={true} allotDoctor={true} history={props.history}></ListPatientComponent>
        </div>
      </div>
    );
  }

export default RecepPatients;
