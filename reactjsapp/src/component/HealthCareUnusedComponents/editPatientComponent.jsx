import React, { useState,useEffect } from "react";

import {Link} from "react-router-dom";
import {PatientServiceCall} from "./../../services/PatientService";
import './PatientComponent.css';

const EditPatientComponent =(props)=>  {
 
  const [Patient, setPatient] = useState({
        PatientId:"",
        PatientFname:"",
        PatientMname:"",
        PatientLname:"",
        Address:"",
        City:"",
        DateOfBirth:"",
        Gender:"",
        IPD_OPD:"",
        Email:"",
        Roomno:"",
        Disease:"",
        MobNo:"",
        EmergencyContact:"",
        IdCard:""
    });
  const [message,setMessage] =useState('');
  const serv = new PatientServiceCall();
  const clear = () => {
    setPatient({
      PatientId:"",
      PatientFname:"",
      PatientMname:"",
      PatientLname:"",
      Address:"",
      City:"",
      DateOfBirth:"",
      Gender:"",
      IPD_OPD:"",
      Email:"",
      Roomno:"",
      Disease:"",
      MobNo:"",
      EmergencyContact:"",
      IdCard:""
    });
  };

  const put=()=> {
    let token = sessionStorage.getItem("token");
    if (token === undefined) {
      setMessage(`Please send the Auth Header` );
    } else {
      serv
        .putData(token,Patient,Patient.PatientId)
        .then((resp) => {
          setMessage(resp.data.message);
          props.history.push("/listPatients");
        
        })
        .catch((error) => {
          setMessage(`Error Occured : ${error.message}`);
        });
    }
  }
  const getid=()=>{
    let token = sessionStorage.getItem("token");
    if (token === undefined) {
      setMessage("No Auth Header");
    } else {
      serv
        .getDataById(token,props.match.params.id)
        .then((resp) => {
          if(resp.data.rows===undefined){
            setMessage(resp.data.message);
          }
          else{
            setMessage(resp.data.message);
            setPatient(resp.data.rows);
          console.log(JSON.stringify(resp.data.rows));
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
      getid();

    }
  },[]);
  const logout=()=>{
    sessionStorage.removeItem("token");
  }
    return (
      <div className="container-lg">
        <h3>Add Patient Component</h3>
        <table className="table-bordered table-striped">
            <tbody>
                <tr>
                    <td className="rows">
                        <Link className="link" to="/" onClick={logout}>Logout</Link>
                    </td>
                    <td className="rows">
                      <Link className="link" to="/listComponents">Home</Link>
                    </td>
                    <td className="rows">
                    <Link className="link" to="/listPatients">Patients</Link>
                    </td>
                    <td className="rows">
                    <Link className="link" to="/addPatient">Add a Patient</Link>

                    </td>
                </tr>
            </tbody>
        </table>
        <div className="container">
          <strong>{message}</strong><br />
        </div>
        <table className="table table-bordred table-striped">
              <tbody>
                <tr>
                  <td>
                    <table className="table table-bordred table-striped">
                      <tbody>
                      <tr>
                          <td className="fields">Patient Id</td><td className="star">*</td>
                          <td>
                            <input
                              type="text"
                              name="PatientId"
                              onChange={(evt) => setPatient({ ...Patient, PatientId: evt.target.value })}
                              className="form-control"
                              value={Patient.PatientId}
                            />
                          </td>
                          
                        </tr>
                        <tr>
                          <td className="fields">First Name</td><td className="star">*</td>
                          <td>
                            <input
                              type="text"
                              name="PatientFname"
                              onChange={(evt) => setPatient({ ...Patient, PatientFname: evt.target.value })}
                              className="form-control"
                              value={Patient.PatientFname}
                            />
                          </td>
                          
                        </tr>
                        <tr>
                          <td className="fields">Last Name</td><td className="star">*</td>
                          <td>
                            <input
                              type="text"
                              name="PatientLname"
                              value={Patient.PatientLname}
                               onChange={(evt) => setPatient({ ...Patient, PatientLname: evt.target.value })}
                              className="form-control"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="fields">Identity Card</td><td className="star">*</td>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              name="IdCard"
                              value={Patient.IdCard}
                               onChange={(evt) => setPatient({ ...Patient, IdCard: evt.target.value })}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="fields">Date Of Birth</td><td className="star">*</td>
                          <td>
                            <input
                              type="date"
                              className="form-control"
                              name="DateOfBirth"
                              value={Patient.DateOfBirth}
                               onChange={(evt) => setPatient({ ...Patient, DateOfBirth: evt.target.value })}

                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="fields">Address</td><td className="star">*</td>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              name="Address"
                              value={Patient.Address}
                               onChange={(evt) => setPatient({ ...Patient, Address: evt.target.value })}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="fields">MobNo</td><td className="star">*</td>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              name="MobNo"
                              value={Patient.MobNo}
                               onChange={(evt) => setPatient({ ...Patient, MobNo: evt.target.value })}
                            />
                          </td>
                        </tr>
                        <tr> 
                          <td className="fields">Roomno</td><td className="star">*</td>
                          <td>
                            <input
                              type="number"
                              name="Roomno"
                              className="form-control"
                              value={Patient.Roomno}
                              onChange={(evt) => setPatient({ ...Patient, Roomno: evt.target.value })}
                            />
                          </td>
                        </tr>
                        <tr>
                        <td>
                        <input
                          type="button"
                          value="Put Data"
                          onClick={put}
                          className="btn btn-success"
                        /></td>
                        <td>
                        <input
                          type="button"
                          value="Clear"
                          onClick={clear}
                          className="btn btn-primary"
                        />
                      </td>
                </tr>  
                      </tbody>
                    </table>
                  </td>
                  <td>
                    <table className="table table-bordred table-striped">
                      <tbody>
                        <tr>
                          <td className="fields">Middle Name</td><td></td>
                          <td>
                            <input
                              type="text"
                              name="PatientMname"
                              className="form-control"
                              value={Patient.PatientMname}

                               onChange={(evt) => setPatient({ ...Patient, PatientMname: evt.target.value })}

                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="fields">Email</td><td className="star">*</td>
                          <td>
                            <input
                              type="text"
                              name="Email"
                              className="form-control"
                              value={Patient.Email}

                              onChange={(evt) => setPatient({ ...Patient, Email: evt.target.value })}

                            />
                          </td>
                        </tr>
                        <tr> 
                          <td className="fields">Gender</td><td className="star">*</td>
                          <td>
                            <select
                              name="Gender"
                              className="form-control"
                              value={Patient.Gender}
                              onChange={(evt) => setPatient({ ...Patient, Gender: evt.target.value })}
                            ><option selected disabled hidden></option><option value="Male">Male</option><option value="Female">Female</option><option value="Others">Others</option></select>
                          </td>
                        </tr>
                        <tr> 
                          <td className="fields">Disease</td><td className="star">*</td>
                          <td>
                            <input
                              type="text"
                              name="Disease"
                              className="form-control"
                              value={Patient.Disease}
                              onChange={(evt) => setPatient({ ...Patient, Disease: evt.target.value })}
                            />
                          </td>
                        </tr>
                        <tr> 
                          <td className="fields">IPD/OPD</td><td className="star">*</td>
                          <td>
                            <input
                              type="text"
                              name="IPD_OPD"
                              className="form-control"
                              value={Patient.IPD_OPD}
                              onChange={(evt) => setPatient({ ...Patient, IPD_OPD: evt.target.value })}
                            />
                          </td>
                        </tr>
                        <tr> 
                          <td className="fields">City</td><td className="star">*</td>
                          <td>
                            <input
                              type="text"
                              name="City"
                              className="form-control"
                              value={Patient.City}
                              onChange={(evt) => setPatient({ ...Patient, City: evt.target.value })}
                            />
                          </td>
                        </tr>
                        <tr> 
                          <td className="fields">Emergency Contact</td><td className="star">*</td>
                          <td>
                            <input
                              type="text"
                              name="EmergencyContact"
                              className="form-control"
                              value={Patient.EmergencyContact}
                              onChange={(evt) => setPatient({ ...Patient, EmergencyContact: evt.target.value })}
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

export default EditPatientComponent;
