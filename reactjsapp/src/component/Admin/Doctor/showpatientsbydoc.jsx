import React, { Component } from "react";
import {Link} from "react-router-dom";

import { DoctorServiceCall } from "../../services/DoctorService";
import './DoctorComponent.css';
import RecepDoctorPatient from "../../Receptionist/RecepPatientDoctor";

class AdminPatientbyDocID extends Component {
  constructor(props) {
    super(props);
    this.state = {
        id:this.props.match.params.id
    };
    this.serv = new DoctorServiceCall();
  }
 
  logout=()=>{
    sessionStorage.removeItem("token");
    this.props.history.push('/');
  }
  render() {
    return (
      <div >
        <table >
            <tbody>
                <tr className='rowtr'>
                    <td className="rows">
                      <Link className="link" to="/admin/listComponents">Home</Link>
                    </td>
                    <td className="admindash">
                    <Link className="adminlink" to="/admin/listDoctors">Doctors</Link>
                    </td> 
                    <td className="rows">
                    <Link className="link" to="/admin/listPatients">Patients</Link>
                    </td>
                </tr>
            </tbody>
        </table>
        <input id="logout" className="btn" type="button" value="Logout" onClick={this.logout} />
        <strong><span className='fright'>Hi, Admin</span></strong>
        
        <br />
        <div className="container">
            <RecepDoctorPatient
            history={this.props.history} hidden={true} id={this.state.id}></RecepDoctorPatient>
        </div>
      </div>

      
    );
  }
}

export default AdminPatientbyDocID;
