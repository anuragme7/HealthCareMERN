import React, { useState,useEffect } from "react";

import {Link} from "react-router-dom";
import {WardBoyService} from "../../services/WardBoyService";
import { WardService } from "../../services/WardService";
import DropDownComponent from "../../TableComponent/DropDownComponent";


const WardBoyId =(props)=>  {
  const [wardboy, setwardboy] = useState({
      WardBoyId:"",
      WardBoyFname:"",
      WardBoyLname:"",
      Address:"",
      City:"",
      DateOfBirth:"",
      Gender:"",
      Email:"",
      MobNo:"",
      EmergencyContact:"",
      IdCard:"",
      WardBoySalary:0,
      WardNo:0
    });
    
  
  const [message,setMessage] =useState('');
  const [edit,setEdit] =useState(false);
  const [ward, updateWard] = useState([]);
 // const [isFormValid,setFormValid] =useState(true);

  const serv = new WardBoyService();
  const wardserv = new WardService();

  const clear = () => {
    setwardboy({
      WardBoyFname:"",
      WardBoyLname:"",
      Address:"",
      City:"",
      DateOfBirth:"",
      Gender:"",
      Email:"",
      MobNo:"",
      EmergencyContact:"",
      IdCard:"",
      WardBoySalary:0,
      WardNo:0
    });
  };

  const put=()=> {
    let token = sessionStorage.getItem("token");
    if (token === undefined) {
      setMessage(`Please send the Auth Header` );
    } else {
      serv
        .putData(token,wardboy,wardboy.WardBoyId)
        .then((resp) => {
          if(resp.status===200){
          props.history.push("/admin/wardboy");
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
            setwardboy(resp.data.rows);
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
                    <Link className="link" to="/admin/wardboy">WardBoy</Link>
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
                          <td className="fields">WardBoy Id</td><td className="star">*</td>
                          <td>
                            <input disabled
                              type="text"
                              name="WardBoyId"
                              onChange={(evt) => setwardboy({ ...wardboy, WardBoyId: evt.target.value })}    
                              className="form-control"
                              value={wardboy.WardBoyId}
                            />
                          </td>
                          
                        </tr>
                        <tr>
                          <td className="fields">First Name</td><td className="star">*</td>
                          <td>
                            <input
                              type="text"
                              name="WardBoyFname"
                              onChange={(evt) => setwardboy({ ...wardboy, WardBoyFname: evt.target.value })}    
                              disabled={!edit}
                              className="form-control"
                              value={wardboy.WardBoyFname}
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
                              value={wardboy.IdCard}
                               onChange={(evt) => setwardboy({ ...wardboy, IdCard: evt.target.value })}    
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
                              value={wardboy.DateOfBirth}
                               onChange={(evt) => setwardboy({ ...wardboy, DateOfBirth: evt.target.value })}    
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
                              value={wardboy.Address}
                               onChange={(evt) => setwardboy({ ...wardboy, Address: evt.target.value })}    
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
                              value={wardboy.MobNo}
                               onChange={(evt) => setwardboy({ ...wardboy, MobNo: evt.target.value })}    
                               disabled={!edit}
                            />
                          </td>
                        </tr>
                        <tr> 
                          <td className="fields">Salary</td><td className="star">*</td>
                          <td>
                            <input
                              type="text"
                              name="WardBoySalary"
                              className="form-control"
                              value={wardboy.WardBoySalary}
                              onChange={(evt) => setwardboy({ ...wardboy, WardBoySalary: evt.target.value })}    
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
                              name="WardBoyLname"
                              value={wardboy.WardBoyLname}
                               onChange={(evt) => setwardboy({ ...wardboy, WardBoyLname: evt.target.value })}    
                               disabled={!edit}
                              className="form-control"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="fields">WardNo</td><td className="star">*</td>
                          <td >
                          <DropDownComponent disabled={!edit}
                                dataSource={ward} stateProperty={wardboy.WardNo} id={"WardNo"} name={"WardType"}
                                selectedValue={(val)=>setwardboy({...wardboy,WardNo:val})}></DropDownComponent>
                          </td>
                        </tr>
                        <tr>
                          <td className="fields">Email</td><td className="star">*</td>
                          <td>
                            <input
                              type="text"
                              name="Email"
                              className="form-control"
                              value={wardboy.Email}

                              onChange={(evt) => setwardboy({ ...wardboy, Email: evt.target.value })}    
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
                              value={wardboy.Gender}
                              onChange={(evt) => setwardboy({ ...wardboy, Gender: evt.target.value })}    
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
                              value={wardboy.City}
                              onChange={(evt) => setwardboy({ ...wardboy, City: evt.target.value })}    
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
                              value={wardboy.EmergencyContact}
                              onChange={(evt) => setwardboy({ ...wardboy, EmergencyContact: evt.target.value })}    
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

export default WardBoyId;
