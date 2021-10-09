import React, { useState,useEffect } from "react";

import {Link} from "react-router-dom";
import {PatientServiceCall} from "./../services/PatientService";
import { DoctorServiceCall } from "./../services/DoctorService";
import {DoctorPatientService} from './../services/DoctorPatientService';
import DropDownComponent from "./../TableComponent/DropDownComponent";
import './styleme.css';

const AllotDoctorRecep =(props)=>  {
 
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

    const [doctors,setDoctors]=useState([]);
    const [docPatient, setDocPatient] = useState({
        DoctorId:"",
        ReferredIn:"",
        ReferredOut:"",
    });
    
  
  const [message,setMessage] =useState('');
  const [edit,setEdit] =useState(false);
  const [outRefId,setOutRefId]=useState(false);
  const [RefIn,setRefIn]=useState("");
  const [RefOut,setRefOut]=useState("");
  const [valid,setValid]=useState(false);

   // const [isFormValid,setFormValid] =useState(true);

    const serv = new PatientServiceCall();
    const docserv=new DoctorServiceCall();
    const docpatserv=new DoctorPatientService();
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
          }
      })
        .catch((error) => {
          setMessage(`Error Occured : ${error.message}`);
        });
    }
    
  }
  const getDoctors=()=>{
    let token = sessionStorage.getItem("token");
    if (token === undefined) {
      setMessage(`Please send the Auth Header` );
    } else {
      docserv
        .getData(token)
        .then((resp) => {
          setMessage(resp.data.message);
          setDoctors(resp.data.rows);
        
        })
        .catch((error) => {
          setMessage(`Error Occured : ${error.message}`);
        });
    }

  }
  const getReferredId=(val)=>{
    if(val==='Others'){
        setOutRefId(true);
        setDocPatient({...docPatient,ReferredIn:val})

    }else{
        setOutRefId(false);
        setDocPatient({...docPatient,ReferredIn:val})
    }

  }
  const clear=()=>{
    setDocPatient({
      DoctorId:"",
      ReferredIn:"",
      ReferredOut:"",
    });
    setOutRefId(false);
    setValid(false);
  }
  const saveDocPat=()=>{
      console.log('............');
      let refin,refout;
     if(docPatient.ReferredIn==='Others'){
         refin=null;
         refout=docPatient.ReferredOut;
     }
     else{
         refin=docPatient.ReferredIn;
         refout=null;
     }
     if(docPatient.ReferredIn===''||docPatient.ReferredIn===undefined){
         refin=null;
         refout=null;
     }
     let senddocpat={
         DoctorId:docPatient.DoctorId,
         PatientId:props.match.params.id,
         ReferredIn:refin,
         ReferredOut:refout,
         Active:'true'
     }
     console.log(senddocpat);
     let token = sessionStorage.getItem("token");
    if (token === undefined) {
      setMessage("No Auth Header");
    } else {
      docpatserv
        .postData(token,senddocpat)
        .then((resp) => {
            if(resp.status===200){
                setMessage(resp.data.message);
                props.history.push('/recep/patients');
            }
            else{
            setMessage(`Validation Error : ${resp.data.message}`);
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
    props.history.push('/');

    }
    else{
      getid();
      getDoctors();

    }
  },[]);
  const logout=()=>{
    sessionStorage.clear();
    props.history.push('/');

  }
    return (
      <div>
        <table hidden={props.hidden}>
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
        <div className="container">
          <strong>{message}</strong><br />
    
        <table id='sb' className="table table-bordred table-striped">
              <tbody>
                <tr>
                  <td>
                    <table className="table table-bordred table-striped">
                      <tbody>
                      <tr>
                          <td className="fields">Patient Id</td><td className="star">*</td>
                          <td>
                            <input disabled
                              type="text"
                              name="PatientId"
                              onChange={(evt) => setPatient({ ...Patient, PatientId: evt.target.value })}    
                              className="form-control"
                              value={Patient.PatientId}
                            />
                          </td>
                          
                        </tr>
                        <tr>
                          <td className="fields">Middle Name</td><td></td>
                          <td>
                            <input
                              type="text"
                              name="PatientMname"
                              className="form-control"
                              value={Patient.PatientMname}

                               onChange={(evt) => setPatient({ ...Patient, PatientMname: evt.target.value })}    
                               disabled={!edit}

                            />
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
                              disabled={!edit}
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
                              disabled={!edit}
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
                               disabled={!edit}

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
                               disabled={!edit}
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
                          <td className="fields">First Name</td><td className="star">*</td>
                          <td>
                            <input
                              type="text"
                              name="PatientFname"
                              onChange={(evt) => setPatient({ ...Patient, PatientFname: evt.target.value })}    
                              disabled={!edit}
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
                               disabled={!edit}
                              className="form-control"
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
                              disabled={!edit}
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
                              disabled={!edit}
                            ><option selected disabled hidden></option><option value="Male">Male</option><option value="Female">Female</option><option value="Others">Others</option></select>
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
                              disabled={!edit}

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
                              disabled={!edit}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>

            <table id='nb'>
                <tbody>
                  <strong>
                    <tr>
                          <td className="fields">Allot Doctor</td><td className="star">*</td>
                          <td>
                          <DropDownComponent
                                dataSource={doctors} stateProperty={docPatient.DoctorId} id={"DoctorId"} name={"DoctorFname"}
                                selectedValue={(val)=>{setDocPatient({...docPatient,DoctorId:val});
                                setValid(true)}}></DropDownComponent>
                          </td>
                          <td className="fields">Referred By</td><td></td>
                          <td>
                          <DropDownComponent
                                dataSource={doctors} others={true} stateProperty={docPatient.ReferredIn} id={"DoctorId"} name={"DoctorFname"}
                                selectedValue={getReferredId}></DropDownComponent>
                                {/* (val)=> */}
                          </td>
                          <td hidden={!outRefId} className="fields">Enter Doctor's Name</td><td hidden={!outRefId}></td>
                          <td hidden={!outRefId}>
                            <input type="text" className="form-control" value={docPatient.ReferredOut}
                            onChange={(evt) => setDocPatient({ ...docPatient, ReferredOut: evt.target.value }) }/>
                          
                          </td>
                    </tr>
                    <tr>
                        <td>
                            <input placeholder="Enter Name" type="button" value="Save" className="btn btn-success" onClick={saveDocPat} disabled={!valid}/>
                      
                       
                        <input placeholder="Enter Name" type="button" value="Clear" className="btn btn-warning" onClick={clear}/>
                          </td>
                    </tr>
                    </strong>
                </tbody>
            </table>
            </div>
      </div>
    );
  }

export default AllotDoctorRecep;
