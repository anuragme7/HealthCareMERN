import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import './styles.css';

import { RoleService } from "../services/RoleService";

import { DoctorServiceCall } from "../services/DoctorService";
const DoctorSpecificRegisteration = (props) => {
    const [staffRow,setStaffRow]=useState(JSON.parse(sessionStorage.getItem("StaffRow")));
    const [Doctor, setDoctor] = useState({
        DoctorId:`Dr-${staffRow.StaffId}`,
        DoctorFname: staffRow.Fname,
        DoctorMname: staffRow.Mname,
        DoctorLname: staffRow.Lname,
        Address: staffRow.Address,
        City: staffRow.City,
        DateOfBirth: staffRow.DateOfBirth,
        Gender: staffRow.Gender,
        Email: staffRow.Email,
        MobNo: staffRow.MobNo,
        EmergencyContact: staffRow.EmergencyContact,
        IdCard: staffRow.IdCard,
        DoctorFeesPerVisit :0,
        DoctorICUFees:0 ,
        Specialization:"" ,
        DoctorConsultationFees:0
    });
    const [message, setMessage] = useState('');
     const docserv = new DoctorServiceCall();
     const roleserv = new RoleService();

    const post = () => {
        console.log("Received Doctor Details");
        console.log(Doctor);
        let token = sessionStorage.getItem("token");
        if (token === undefined) {
        setMessage(`Please send the Auth Header` );
        } else {
            roleserv
            .postUserInRoleData(token,{UserId:Doctor.DoctorId,RoleId:sessionStorage.getItem("RoleId")})
            .then((resp) => {
                setMessage(resp.data.message);
                docserv
                .postData(token,Doctor)
                .then((resp) => {
                setMessage(resp.data.message);
                sessionStorage.clear();
                sessionStorage.setItem("UserId",Doctor.DoctorId);
                props.history.push('/registerationdone');
                })
                .catch((error) => {
                setMessage(`Error Occured : ${error.message}`);
                });
            
            })
            .catch((error) => {
            setMessage(`Error Occured : ${error.message}`);
            });
            
        }
    }
    const login = () => {
        localStorage.clear();
        sessionStorage.clear();
        props.history.push('/');
    }
    return (
        <div className="container-lg">
            
            <h3>Complete Registertation - Doctor</h3>
            
            <table>
            <tbody>
                <tr className='rowtr'>
                    <td className="rows">
                        <Link className="link" to="/" onClick={login}>Logout</Link>
                    </td>
                    
                </tr>
            </tbody>
            </table> 
             <div className="container">
                <strong>{message}</strong><br />
            </div>
            <table id="sb" className="table table-bordred table-striped">
            <tbody>
                <tr>
                <td>
                    <table className="table table-bordred table-striped">
                        <tbody>
                            <tr>
                                <td className="fields">Specialization</td><td className="star">*</td>
                                <td>
                                    <input
                                        type="text"
                                        name="Specialization"
                                        onChange={(evt) => setDoctor({ ...Doctor, Specialization: evt.target.value })}
                                        className="form-control"
                                        value={Doctor.Specialization}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="fields">Fees Per Visit</td><td className="star">*</td>
                                <td>
                                    <input
                                        type="number"
                                        name="DoctorFeesPerVisit"
                                        value={Doctor.DoctorFeesPerVisit}
                                        onChange={(evt) => setDoctor({ ...Doctor, DoctorFeesPerVisit: evt.target.value })}
                                        className="form-control"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input
                                        type="button"
                                        value="Register"
                                        onClick={post}
                                        className="btn btn-success"
                                    /></td>
                             </tr>
                    </tbody>
                </table>
                </td>
                <td>
                <table className="table table-bordred table-striped">
                    <tbody>
                        <tr>
                            <td className="fields">Consultation Fees</td><td className="star">*</td>
                            <td>
                                <input
                                    type="number"
                                    name="DoctorConsultationFees"
                                    className="form-control"
                                    value={Doctor.DoctorConsultationFees}

                                    onChange={(evt) => setDoctor({ ...Doctor, DoctorConsultationFees: evt.target.value })}

                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="fields">ICU Fees</td><td></td>
                            <td>
                            <input
                                    type="number"
                                    name="DoctorICUFees"
                                    className="form-control"
                                    value={Doctor.DoctorICUFees}
                                    onChange={(evt) => setDoctor({ ...Doctor, DoctorICUFees: evt.target.value })}

                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                </td>
                </tr>
            </tbody>
            </table>
            <div className="container">
                <strong>{message}</strong><br />
            </div>
        </div>


    );
}

export default DoctorSpecificRegisteration;
