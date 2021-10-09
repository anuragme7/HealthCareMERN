import React, { useState,useEffect } from "react";
import {Link} from "react-router-dom";
import AddPatientComponent from "../Admin/Patient-Functional/addPatientComponent";
import './styleme.css';
const RecepAddPatients=(props)=> {
  
  const [message,setMessage] =useState('');
 
  const logout=()=>{
    sessionStorage.removeItem("token");
    props.history.push('/');
  }
    return (
      <div >
        <table>
            <tbody>
                <tr className='rowtr'>
                    <td className="rows">
                      <Link className="link" to="/recep/listComponent">Home</Link>
                    </td>
                    <td className="rows">
                     <Link className="link" to="/recep/patients">Patients</Link>
                    </td>
                    <td className="rows">
                      <Link className="link" to="/recep/listComponent">Doctors</Link>
                    </td>
                </tr>
            </tbody>
        </table>
        <input className='btn' id='logout' type="button" value="Logout" onClick={logout} />
        <strong><span className='fright'>Hi, there</span></strong><br />
        <div className='container'>
        <h5><strong> Add a Patient</strong></h5>
        <AddPatientComponent hidden={true} history={props.history}></AddPatientComponent>
        </div>
      </div>
    );
  }

export default RecepAddPatients;
