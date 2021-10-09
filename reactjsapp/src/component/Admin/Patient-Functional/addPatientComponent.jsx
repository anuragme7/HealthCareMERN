import React, { useState,useEffect } from "react";

import {Link} from "react-router-dom";
import {PatientServiceCall} from "./../../services/PatientService";
//import { DoctorServiceCall } from "../../services/DoctorService";
//import {DoctorPatientService} from './../../services/DoctorPatientService';
//import DropDownComponent from "../../TableComponent/DropDownComponent";
import './PatientComponent.css';

const AddPatientComponent =(props)=>  {
 
  const [Patient, setPatient] = useState({
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
  // const [doctors,setDoctors]=useState([]);
//   const [docPatient, setDocPatient] = useState({
//     DoctorId:"",
//     PatientId:"",
//     ReferredIn:"",
//     ReferredOut:"",
//     Active:"true"
// });
  const serv = new PatientServiceCall();
  //const docserv=new DoctorServiceCall();
 // const docpatserv=new DoctorPatientService();
  const clear = () => {
    setPatient({
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

  const getDoctors=()=>{
    let token = sessionStorage.getItem("token");
    if (token === undefined) {
      setMessage(`Please send the Auth Header` );
    } else {
      // docserv
      //   .getData(token)
      //   .then((resp) => {
      //     setMessage(resp.data.message);
      //     // setDoctors(resp.data.rows);
        
      //   })
      //   .catch((error) => {
      //     setMessage(`Error Occured : ${error.message}`);
      //   });
    }

  }

  // const postdocPat=()=>{
  //   console.log("PatientId");
  //   console.log(docPatient.PatientId);
  // //   let token = sessionStorage.getItem("token");
  // //   if (token === undefined) {
  // //     setMessage(`Please send the Auth Header` );
  // //   } else {
  // //   console.log("Doc - Patient Data....... going in");
  // //   console.log(docPatient);
  // //   docpatserv
  // //   .postData(token,docPatient)
  // //   .then((respx) => {
  // //     if(respx.status===200){
  // //     setMessage(respx.data.message);
  // //     }
    
  // //   }).catch((error) => {
  // //     setMessage(`Error Occured in Alloting Doctor: ${error.message}`);
  // //   });
  // // }
  // }

  const post=()=> {
    let token = sessionStorage.getItem("token");
    if (token === undefined) {
      setMessage(`Please send the Auth Header` );
    } else {
      serv
        .postData(token,Patient)
        .then((resp) => {
          if(resp.status===200){
           // console.log("Setting Patient Id..... "+ resp.data.rows.PatientId);
            setMessage(resp.data.message);
            // setDocPatient({...docPatient,PatientId:resp.data.rows.PatientId});
            // postdocPat();
        }else{
          setMessage(resp.data.message);}
        
        })
        .catch((error) => {
          setMessage(`Error Occured in Createing Patient : ${error.message}`);
        });
    }
  }
  useEffect(()=>{
    if(sessionStorage.getItem("token")===undefined){
      setMessage("Please Login");
    }
    else{
      getDoctors();
    }
  },[]);
  const logout=()=>{
    sessionStorage.removeItem("token");
    props.history.push('/');

  }
    return (
      <div>
        <table hidden={props.hidden}>
            <tbody>
                <tr className='rowtr'>
                    <td className="rows">
                      <Link className="link" to="/admin/listComponents">Home</Link>
                    </td>
                    <td className="rows">
                    <Link className="link" to="/admin/listPatients">Patients</Link>
                    </td>
                </tr>
            </tbody>
        </table>
        <input className='btn' id="logout" hidden={props.hidden} type="button" value="Logout" onClick={logout} />
        <strong><span hidden={props.hidden} className='fright'>Hi, Admin</span></strong>
        <div className="container">
          <strong>{message}</strong><br /> <br />
     
        <table id="sb" className="table table-bordred table-striped">
              <tbody>
                <tr>
                  <td>
                    <table className="table table-bordred table-striped">
                      <tbody>
                      {/* <tr>
                          <td className="fields">Allot Doctor</td><td className="star">*</td>
                          <td>
                          <DropDownComponent
                                dataSource={doctors} stateProperty={docPatient.DoctorId} id={"DoctorId"} name={"DoctorFname"}
                                selectedValue={(val)=>setDocPatient({...docPatient,DoctorId:val})}></DropDownComponent>
                          </td>
                        </tr> */}
                        <tr>
                          <td className="fields">First Name</td><td className="star">*</td>
                          <td>
                            <input
                              type="text"
                              name="PatientFname"
                            placeholder="Enter Value" onChange={(evt) => setPatient({ ...Patient, PatientFname: evt.target.value })}
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
                             placeholder="Enter Value" onChange={(evt) => setPatient({ ...Patient, PatientLname: evt.target.value })}
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
                             placeholder="Enter Value" onChange={(evt) => setPatient({ ...Patient, IdCard: evt.target.value })}
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
                             placeholder="Enter Value" onChange={(evt) => setPatient({ ...Patient, DateOfBirth: evt.target.value })}

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
                             placeholder="Enter Value" onChange={(evt) => setPatient({ ...Patient, Address: evt.target.value })}
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
                             placeholder="Enter Value" onChange={(evt) => setPatient({ ...Patient, MobNo: evt.target.value })}
                            />
                          </td>
                        </tr>
                        <tr hidden={props.hidden}> 
                          <td className="fields">Roomno</td><td className="star">*</td>
                          <td>
                            <input
                              type="number"
                              name="Roomno"
                              className="form-control"
                              value={Patient.Roomno}
                            placeholder="Enter Value" onChange={(evt) => setPatient({ ...Patient, Roomno: evt.target.value })}
                            />
                          </td>
                        </tr>
                        <tr>
                        <td>
                        <input
                          type="button"
                          value="Add a Patient"
                          onClick={post}
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

                             placeholder="Enter Value" onChange={(evt) => setPatient({ ...Patient, PatientMname: evt.target.value })}

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

                            placeholder="Enter Value" onChange={(evt) => setPatient({ ...Patient, Email: evt.target.value })}

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
                            placeholder="Enter Value" onChange={(evt) => setPatient({ ...Patient, Gender: evt.target.value })}
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
                            placeholder="Enter Value" onChange={(evt) => setPatient({ ...Patient, Disease: evt.target.value })}
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
                            placeholder="Enter Value" onChange={(evt) => setPatient({ ...Patient, IPD_OPD: evt.target.value })}
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
                            placeholder="Enter Value" onChange={(evt) => setPatient({ ...Patient, City: evt.target.value })}
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
                            placeholder="Enter Value" onChange={(evt) => setPatient({ ...Patient, EmergencyContact: evt.target.value })}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
           
        </div>
      </div>

      
    );
  }

export default AddPatientComponent;
