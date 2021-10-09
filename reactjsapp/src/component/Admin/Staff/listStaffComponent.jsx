import React, { useState,useEffect } from "react";
import {Link} from "react-router-dom";

import { StaffService } from "../../services/StaffService";
import TableComponentFunctional from "../../TableComponent/tableComponentFunctional";
import {DataContext} from '../../TableComponent/datacontext';
import SideBar from "../../SideBar/SideBar";
import { SideBarData } from "../listComponentSideBarData";
const ListStaffComponent=(props)=> {
  
  const [message,setMessage] =useState('');
  const [staff, updatestaff] = useState([]);
  const [headers,updateHeaders]=useState(["StaffId","Fname","Lname","RoleId","Gender","MobNo"]);
  const serv = new StaffService();
  const getValues=()=> {
    let token = sessionStorage.getItem("token");
    if (token === undefined) {
      setMessage(`Please send the Auth Header`);
    } else {
      serv
        .getData(token)
        .then((resp) => {
          updatestaff(resp.data.rows);

          setMessage(`Data Received Successfully`);
        })
        .catch((error) => {
          setMessage(error.message);
        });
    }
  }
  const getDetails=(val)=>{
    console.log("Value================== "+val);
    // if(props.hidden===true){
    //     props.history.push(`/recep/patientbyid/${val}`);
    // }
    // else{
    props.history.push(`/admin/staffbyid/${val}`);
  //}
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
        <input className='btn' id="logout" hidden={props.hidden} type="button" value="Logout" onClick={logout} />
        <strong><span hidden={props.hidden} className='fright'>Hi, Admin</span></strong>
        <ul className='screen'>
              <li className='ui'>
                <div>
                    <SideBar SideBarData={SideBarData} hidden={props.hidden}/>
                </div> 
                <div className="container">
                <br />
                <strong>{message}</strong><br />
                <DataContext.Provider value={{staff,headers,getDetails}}>
                <TableComponentFunctional id="StaffId" canEdit={true} canDetails={true} canDelete={true}></TableComponentFunctional>
                </DataContext.Provider> 
              </div>
            </li>
            </ul> 
       
        
      </div>     
    );
  }

export default ListStaffComponent;
{/* <table hidden={props.hidden}>
<tbody>
    <tr className='rowtr'>
        <td className="rows">
          <Link className="link" to="/admin/listComponents">Home</Link>
        </td>
        <td className="rows">
        <Link className="link" to="/admin/listRoles">Roles</Link>
        </td>
    </tr>
</tbody>
</table> */}