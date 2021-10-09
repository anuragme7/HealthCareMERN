import React, { useState,useEffect } from "react";
import {Link} from "react-router-dom";
import './Ward.css';

import { WardService } from "../../services/WardService";
import TableComponentFunctional from "../../TableComponent/tableComponentFunctional";
import {DataContext} from '../../TableComponent/datacontext';
import SideBar from "./../../SideBar/SideBar";
import {SideBarData} from './../listComponentSideBarData';
const WardComponent=(props)=> {
  
  const [message,setMessage] =useState('');
  const [ward, updateWard] = useState([]);
  const [delId,updatedelId]=useState('');
  const [newRoleName,updatenewRoleName]=useState('');
  const serv = new WardService();
  const getValues=()=> {
    let token = sessionStorage.getItem("token");
    if (token === undefined) {
      setMessage(`Please send the Auth Header`);
    } else {
      serv
        .getData(token)
        .then((resp) => {
          
          updateWard(resp.data.rows);

          setMessage(`Data Received Successfully`);
        })
        .catch((error) => {
          setMessage(error.message);
        });
    }
  }

  useEffect(()=>{
    if(sessionStorage.getItem("token")===undefined){
      setMessage("Please Login");
    }
    else{
      getValues();
     }
  },[]);

  const addWard=()=>{
    let token = sessionStorage.getItem("token");
    if (token === undefined) {
      setMessage(`Please send the Auth Header`);
    } else {
        let newRole={
          WardType:newRoleName
        }
      serv
        .postData(token,newRole)
        .then((resp) => {
          if(resp.status===200){
          
            updatenewRoleName("");
            getValues();
          }
          setMessage(resp.data.message);
          
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
                <div className="container"> <br />
                    <strong>{message}</strong><br />
                    <DataContext.Provider value={{ward,undefined,updatedelId}}>
                    <TableComponentFunctional id="RoleId" canEdit={false} canDelete={false}></TableComponentFunctional>
                    </DataContext.Provider>
                  
                    <strong>
                    Add a Ward <br /></strong>
                    <input type="text" className="form-control" id="tb" placeholder="Add WardName" name="RoleName" 
                    value={newRoleName} onChange={(evt) => updatenewRoleName(evt.target.value )}/>
                    <input type="button" className='btn btn-success' value="Save" onClick={addWard}/>
                </div>
            </li>
            </ul>        
      </div>
    );
  }

export default WardComponent;
