import React, { useState,useEffect } from "react";
import {Link} from "react-router-dom";
import './../Doctor/DoctorComponent.css';

import { RoleService } from "../../services/RoleService";
import TableComponentFunctional from "../../TableComponent/tableComponentFunctional";
import {DataContext} from '../../TableComponent/datacontext';
import SideBar from "./../../SideBar/SideBar";
import {SideBarData} from './../listComponentSideBarData';
const AddRoleComponent=(props)=> {
  
  const [message,setMessage] =useState('');
  const [roles, updateRoles] = useState([]);
  const [delId,updatedelId]=useState('');
  const [newRoleName,updatenewRoleName]=useState('');
  const serv = new RoleService();
  const getValues=()=> {
    let token = sessionStorage.getItem("token");
    if (token === undefined) {
      setMessage(`Please send the Auth Header`);
    } else {
      serv
        .getData(token)
        .then((resp) => {
          updateRoles(resp.data.rows);

          setMessage(`Data Received Successfully`);
          //updateHeaders(Object.keys(roles[0]));
        })
        .catch((error) => {
          setMessage(error.message);
        });
    }
  }

  const setHeaders=()=>{
    console.log(roles[0]);
    // if(roles!==null&&roles!==undefined){
    //   updateHeaders(Object.keys(roles[0]));}
  }

  useEffect(()=>{
    if(sessionStorage.getItem("token")===undefined){
      setMessage("Please Login");
    }
    else{
      getValues();
      setHeaders();
     }
  },[]);

  const addRole=()=>{
    let token = sessionStorage.getItem("token");
    if (token === undefined) {
      setMessage(`Please send the Auth Header`);
    } else {
        let newRole={
            RoleName:newRoleName
        }
      serv
        .postRoleData(token,newRole)
        .then((resp) => {
          setMessage(resp.data.message);
          updatenewRoleName("");
          getValues();
        })
        .catch((error) => {
          setMessage(error.message);
        });
    }
  }

  const logout=()=>{
    sessionStorage.clear();
    props.history.push('/');

  }
    return (
      <div>
         <input className='btn' id="logout" idden={props.hidden} type="button" value="Logout" onClick={logout} />
        <strong><span hidden={props.hidden} className='fright'>Hi, Admin</span></strong>
        <ul className='screen'>
              <li className='ui'>
                <div>
                    <SideBar SideBarData={SideBarData} hidden={props.hidden}/>
                </div>        
                <div className="container">        <br />
                <strong>{message}</strong><br />
                <DataContext.Provider value={{roles,undefined,updatedelId}}>
                <TableComponentFunctional id="RoleId" canEdit={false} canDelete={false}></TableComponentFunctional>
                </DataContext.Provider>
              
                <strong>
                Add a Role <br /></strong>
                <input type="text" className="form-control" id="tb" placeholder="Add RoleName" name="RoleName" value={newRoleName}
                onChange={(evt) => updatenewRoleName(evt.target.value )}/>
                <input type="button" className='btn btn-success' value="Save" onClick={addRole}/>
               </div>  
            </li>
            </ul>
      </div>
    );
  }

export default AddRoleComponent;
