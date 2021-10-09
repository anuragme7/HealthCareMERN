import React, { useState,useEffect } from "react";

import {Link} from "react-router-dom";
import {NurseServiceCall} from "../../services/NurseService";
import { WardService } from "../../services/WardService";
import DropDownComponent from "../../TableComponent/DropDownComponent";

const NurseById =(props)=>  {
  const [nurse, setnurse] = useState({
      NurseId:"",
      NurseFname:"",
      NurseLname:"",
      Address:"",
      City:"",
      DateOfBirth:"",
      Gender:"",
      Email:"",
      MobNo:"",
      EmergencyContact:"",
      IdCard:"",
      NurseFeesPerDay:0,
      WardNo:0
    });
    
  
  const [message,setMessage] =useState('');
  const [edit,setEdit] =useState(false);
  const [ward, updateWard] = useState([]);
 // const [isFormValid,setFormValid] =useState(true);

  const serv = new NurseServiceCall();
  const wardserv = new WardService();

  const clear = () => {
    setnurse({
      NurseFname:"",
      NurseLname:"",
      Address:"",
      City:"",
      DateOfBirth:"",
      Gender:"",
      Email:"",
      MobNo:"",
      EmergencyContact:"",
      IdCard:"",
      NurseFeesPerDay:0,
      WardNo:0
    });
  };

  const put=()=> {
    let token = sessionStorage.getItem("token");
    if (token === undefined) {
      setMessage(`Please send the Auth Header` );
    } else {
      serv
        .putData(token,nurse,nurse.NurseId)
        .then((resp) => {
          if(resp.status===200){
          props.history.push("/admin/listnurse");
          }
          setMessage(resp.data.message); 
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
            setnurse(resp.data.rows);
          }
      })
        .catch((error) => {
          setMessage(`Error Occured : ${error.message}`);
        });
    }
    
  }
  const getWard=()=> {
    let token = sessionStorage.getItem("token");
    if (token === undefined) {
      setMessage(`Please send the Auth Header`);
    } else {
      wardserv
        .getData(token)
        .then((resp) => {
          updateWard(resp.data.rows);
          console.log(resp.data.rows);
          setMessage(`Data Received Successfully`);
        })
        .catch((error) => {
          setMessage(error.message);
        });
    }
  }

 const editdoc=()=>{
    if(edit){
        setEdit(false);
    }
    else{
        setEdit(true);

    }
}
  useEffect(()=>{
    if(sessionStorage.getItem("token")===undefined){
      setMessage("Please Login");
    }
    else{
      getid();
      getWard();

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
                    <Link className="link" to="/admin/listnurse">Nurse</Link>
                    </td>
                </tr>
            </tbody>
        </table>
        <input className='btn' id="logout" hidden={props.hidden} type="button" value="Logout" onClick={logout} />
        <strong><span hidden={props.hidden} className='fright'>Hi, Admin</span></strong>
        <br />
        <div className="container">
          <strong>{message}</strong> <br />
      
        <input hidden={props.donotedit} type="button" className="btn btn-warning" value="Edit" onClick={editdoc}/>
        <input hidden={props.donotedit} type="button" className="btn btn-success"  disabled={!edit} value="Get Data" onClick={getid}/>
        <input
            type="button" hidden={props.donotedit}
            value="Update Data"
            onClick={put}
            className="btn btn-dark"
        />
        <input hidden={props.donotedit}
            type="button"
            value="Clear"
            onClick={clear}
            disabled={!edit}
            className="btn btn-primary"
        />
        <table id="sb" className="table table-bordred table-striped">
              <tbody>
                <tr>
                  <td>
                    <table className="table table-bordred table-striped">
                      <tbody>
                      <tr>
                          <td className="fields">Nurse Id</td><td className="star">*</td>
                          <td>
                            <input disabled
                              type="text"
                              name="NurseId"
                              onChange={(evt) => setnurse({ ...nurse, NurseId: evt.target.value })}    
                              className="form-control"
                              value={nurse.NurseId}
                            />
                          </td>
                          
                        </tr>
                        <tr>
                          <td className="fields">First Name</td><td className="star">*</td>
                          <td>
                            <input
                              type="text"
                              name="NurseFname"
                              onChange={(evt) => setnurse({ ...nurse, NurseFname: evt.target.value })}    
                              disabled={!edit}
                              className="form-control"
                              value={nurse.NurseFname}
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
                              value={nurse.IdCard}
                               onChange={(evt) => setnurse({ ...nurse, IdCard: evt.target.value })}    
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
                              value={nurse.DateOfBirth}
                               onChange={(evt) => setnurse({ ...nurse, DateOfBirth: evt.target.value })}    
                               disabled={!edit}

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
                              value={nurse.Address}
                               onChange={(evt) => setnurse({ ...nurse, Address: evt.target.value })}    
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
                              value={nurse.MobNo}
                               onChange={(evt) => setnurse({ ...nurse, MobNo: evt.target.value })}    
                               disabled={!edit}
                            />
                          </td>
                        </tr>
                        <tr> 
                          <td className="fields">Fees</td><td className="star">*</td>
                          <td>
                            <input
                              type="text"
                              name="NurseFeesPerDay"
                              className="form-control"
                              value={nurse.NurseFeesPerDay}
                              onChange={(evt) => setnurse({ ...nurse, NurseFeesPerDay: evt.target.value })}    
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
                          <td className="fields">Last Name</td><td className="star">*</td>
                          <td>
                            <input
                              type="text"
                              name="NurseLname"
                              value={nurse.NurseLname}
                               onChange={(evt) => setnurse({ ...nurse, NurseLname: evt.target.value })}    
                               disabled={!edit}
                              className="form-control"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="fields">WardNo</td><td className="star">*</td>
                          <td >
                          <DropDownComponent disabled={!edit}
                                dataSource={ward} stateProperty={nurse.WardNo} id={"WardNo"} name={"WardType"}
                                selectedValue={(val)=>setnurse({...nurse,WardNo:val})}></DropDownComponent>
                          </td>
                        </tr>
                        <tr>
                          <td className="fields">Email</td><td className="star">*</td>
                          <td>
                            <input
                              type="text"
                              name="Email"
                              className="form-control"
                              value={nurse.Email}

                              onChange={(evt) => setnurse({ ...nurse, Email: evt.target.value })}    
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
                              value={nurse.Gender}
                              onChange={(evt) => setnurse({ ...nurse, Gender: evt.target.value })}    
                              disabled={!edit}
                            ><option selected disabled hidden></option><option value="Male">Male</option><option value="Female">Female</option><option value="Others">Others</option></select>
                          </td>
                        </tr>
                        <tr> 
                          <td className="fields">City</td><td className="star">*</td>
                          <td>
                            <input
                              type="text"
                              name="City"
                              className="form-control"
                              value={nurse.City}
                              onChange={(evt) => setnurse({ ...nurse, City: evt.target.value })}    
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
                              value={nurse.EmergencyContact}
                              onChange={(evt) => setnurse({ ...nurse, EmergencyContact: evt.target.value })}    
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
      </div>
      </div>

      
    );
  }

export default NurseById;
