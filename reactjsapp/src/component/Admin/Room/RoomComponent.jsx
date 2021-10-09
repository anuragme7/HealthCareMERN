import React, { useState,useEffect } from "react";
import {Link} from "react-router-dom";
import './Room.css';

import { RoomService } from "../../services/RoomService";
import TableComponentFunctional from "../../TableComponent/tableComponentFunctional";
import {DataContext} from '../../TableComponent/datacontext';
import SideBar from "./../../SideBar/SideBar";
import {SideBarData} from './../listComponentSideBarData';
const RoomComponent=(props)=> {
  
  const [message,setMessage] =useState('');
  const [room, updateroom] = useState([]);
  const [delId,updatedelId]=useState('');
  
  const serv = new RoomService();
  const getValues=()=> {
    let token = sessionStorage.getItem("token");
    if (token === undefined) {
      setMessage(`Please send the Auth Header`);
    } else {
      serv
        .getData(token)
        .then((resp) => {
          
          updateroom(resp.data.rows);

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
                <div className="container">
                <Link className="btn" id="link" to="/admin/addroom">Add a Room</Link>
                  <br />
                    <strong>{message}</strong><br />
                    <DataContext.Provider value={{room,undefined,updatedelId}}>
                    <TableComponentFunctional id="RoleId" canEdit={false} canDelete={false}></TableComponentFunctional>
                    </DataContext.Provider>
                </div>
            </li>
            </ul>
 

        
        

      </div>
    );
  }

export default RoomComponent;
