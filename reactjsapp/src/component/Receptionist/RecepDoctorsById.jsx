import React, { useState,useEffect } from "react";
import {Link} from "react-router-dom";

import DoctorById from "../Admin/Doctor/DoctorById";

import './styleme.css';
const RecepDoctorById=(props)=> {
 
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
                      <Link className="link" to="/recep/doctors">Doctors</Link>
                    </td>
                </tr>
            </tbody>
        </table>
        <input className='btn' id='logout' type="button" value="Logout" onClick={logout} />
        <strong><span className='fright'>Hi, there</span></strong><br />  
        <div className='container'>
        <DoctorById hidden={true} history={props.history} idPassed={props.match.params.id}></DoctorById>
        </div>
      </div>
    );
  }

export default RecepDoctorById;
