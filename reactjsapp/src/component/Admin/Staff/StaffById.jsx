import React, { useState,useEffect } from "react";

import {Link} from "react-router-dom";
import {StaffService} from "../../services/StaffService";
const StaffById =(props)=>  {
 
  const [staff, setstaff] = useState({
      StaffId: "",
      Fname : "",
      Mname :"",
      Lname : "",
      Address :"",
      City :"" ,
      DateOfBirth:"" ,
      Gender :"" ,
      RoleId : 0,
      EmergencyContact :"",
      IdCard :"",
      Email : "",
      MobNo:""
    });
    
  
  const [message,setMessage] =useState('');
  const [edit,setEdit] =useState(false);
 // const [isFormValid,setFormValid] =useState(true);

  const serv = new StaffService();
  const clear = () => {
    setstaff({
      Fname:"",
      Mname:"",
      Lname:"",
      Address :"",
      City :"" ,
      DateOfBirth:"" ,
      Gender :"" ,
      RoleId : 0,
      EmergencyContact :"",
      IdCard :"",
      Email : "",
      MobNo:""
    });
  };

  const put=()=> {
    let token = sessionStorage.getItem("token");
    if (token === undefined) {
      setMessage(`Please send the Auth Header` );
    } else {
      serv
        .putData(token,staff,staff.StaffId)
        .then((resp) => {
          setMessage(resp.data.message); 
          props.history.push("/admin/staff");
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
            setstaff(resp.data.rows);
          }
      })
        .catch((error) => {
          setMessage(`Error Occured : ${error.message}`);
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
                    <Link className="link" to="/admin/staff">Staff</Link>
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
            //disabled={!isFormValid}
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
                          <td className="fields">Staff Id</td><td className="star">*</td>
                          <td>
                            <input disabled
                              type="text"
                              name="StaffId"
                              onChange={(evt) => setstaff({ ...staff, StaffId: evt.target.value })}    
                              className="form-control"
                              value={staff.StaffId}
                            />
                          </td>
                          
                        </tr>
                        <tr>
                          <td className="fields">First Name</td><td className="star">*</td>
                          <td>
                            <input
                              type="text"
                              name="Fname"
                              onChange={(evt) => setstaff({ ...staff, Fname: evt.target.value })}    
                              disabled={!edit}
                              className="form-control"
                              value={staff.Fname}
                            />
                          </td>
                          
                        </tr>
                        <tr>
                          <td className="fields">Last Name</td><td className="star">*</td>
                          <td>
                            <input
                              type="text"
                              name="Lname"
                              value={staff.Lname}
                               onChange={(evt) => setstaff({ ...staff, Lname: evt.target.value })}    
                               disabled={!edit}
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
                              value={staff.IdCard}
                               onChange={(evt) => setstaff({ ...staff, IdCard: evt.target.value })}    
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
                              value={staff.DateOfBirth}
                               onChange={(evt) => setstaff({ ...staff, DateOfBirth: evt.target.value })}    
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
                              value={staff.Address}
                               onChange={(evt) => setstaff({ ...staff, Address: evt.target.value })}    
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
                              value={staff.MobNo}
                               onChange={(evt) => setstaff({ ...staff, MobNo: evt.target.value })}    
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
                          <td className="fields">Middle Name</td><td></td>
                          <td>
                            <input
                              type="text"
                              name="Mname"
                              className="form-control"
                              value={staff.Mname}

                               onChange={(evt) => setstaff({ ...staff, Mname: evt.target.value })}    
                               disabled={!edit}

                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="fields">RoleId</td><td className="star">*</td>
                          <td>
                            <input
                              type="text"
                              name="RoleId"
                              className="form-control"
                              value={staff.RoleId}
                              onChange={(evt) => setstaff({ ...staff, RoleId: evt.target.value })}    
                              disabled

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
                              value={staff.Email}

                              onChange={(evt) => setstaff({ ...staff, Email: evt.target.value })}    
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
                              value={staff.Gender}
                              onChange={(evt) => setstaff({ ...staff, Gender: evt.target.value })}    
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
                              value={staff.City}
                              onChange={(evt) => setstaff({ ...staff, City: evt.target.value })}    
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
                              value={staff.EmergencyContact}
                              onChange={(evt) => setstaff({ ...staff, EmergencyContact: evt.target.value })}    
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

export default StaffById;
