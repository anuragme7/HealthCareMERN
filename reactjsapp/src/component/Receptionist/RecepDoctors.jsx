import React, { useState,useEffect } from "react";
import {Link} from "react-router-dom";
import ListDoctorComponent from "../Admin/Doctor/listDoctorsComponent";
import ErrorBoundryComponent from "../ErrorBoundary/ErrorBoundaryComponent";
import './styleme.css';
const RecepDoctors=(props)=> {
  
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
                      <Link className="link" to="/recep/patients">Patients</Link>
                    </td>
                </tr>
            </tbody>
        </table>
        <input className='btn' id='logout' type="button" value="Logout" onClick={logout} />
        <strong><span className='fright'>Hi, there</span></strong><br />  
        <div className='container'>
        <h5><strong>Doctors List</strong></h5>
        <ErrorBoundryComponent>
        <ListDoctorComponent hidden={true} docpat={true} history={props.history}></ListDoctorComponent>
        </ErrorBoundryComponent>
        </div>
      </div>
    );
  }

export default RecepDoctors;
