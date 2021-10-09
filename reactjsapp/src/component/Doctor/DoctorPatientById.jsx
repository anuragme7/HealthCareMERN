import React, { useState,useEffect } from "react";
import {Link} from "react-router-dom";
import PatientById from "../Admin/Patient-Functional/PatientById";

import './doctor.css';
const DoctorPatientById=(props)=> {
 
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
                      <Link className="link" to="/doctor/dashboard">Home</Link>
                    </td>
                </tr>
            </tbody>
        </table>
        <input className='btn' id="logout" type="button" value="Logout" onClick={logout} />
        <strong>
        <span className='fright'>Hi Dr. {sessionStorage.getItem("DocName")}</span>
        </strong>
       
        <div className='container'>
        <PatientById hidden={true} docShow={true} donotedit={true} history={props.history} idPassed={props.match.params.id}></PatientById>
        </div>
      </div>
    );
  }

export default DoctorPatientById;
