import React, { useState,useEffect } from "react";
import {Link} from "react-router-dom";
// import { PatientServiceCall } from "../services/PatientService";
// import { DoctorServiceCall } from "../services/DoctorService";
import PatientById from "../Admin/Patient-Functional/PatientById";

import './styleme.css';
const RecepPatientsById=(props)=> {
 
  const logout=()=>{
    sessionStorage.clear();
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
                      <Link className="link" to="/recep/patients">Patients</Link>
                    </td>
                </tr>
            </tbody>
        </table>
        <input className='btn' id='logout' type="button" value="Logout" onClick={logout} />
        <strong><span className='fright'>Hi, there</span></strong>
        <PatientById hidden={true} room={true} history={props.history} idPassed={props.match.params.id}></PatientById>
        
      </div>
    );
  }

export default RecepPatientsById;
