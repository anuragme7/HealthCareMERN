import React, { useState,useEffect } from "react";
import {Link} from "react-router-dom";
import { PatientServiceCall } from "../services/PatientService";
import { DoctorServiceCall } from "../services/DoctorService";
import { DoctorPatientService } from "../services/DoctorPatientService";
import './styleme.css';
const ReceptionistDashBoard=(props)=> {
  
  const docserv = new DoctorServiceCall();
  const patserv= new PatientServiceCall();
  const docpatserv= new DoctorPatientService();
 
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
                     <Link className="link" to="/recep/patients">Patients</Link>
                    </td>
                    <td className="rows">
                     <Link className="link" to="/recep/doctors">Doctors</Link>
                    </td>
                    {/* <td className="rows">
                     <Link className="link" to="/recep/doctorpatient">Patients-Doctor</Link>
                    </td> */}
                    
                     
                </tr>
            </tbody>
        </table>
        <input className='btn' id='logout' type="button" value="Logout" onClick={logout} />
        <strong><span className='fright'>Hi, there</span></strong>

      </div>
    );
  }

export default ReceptionistDashBoard;
