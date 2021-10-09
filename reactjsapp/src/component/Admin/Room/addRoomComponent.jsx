import React, { useState,useEffect } from "react";
import {Link} from "react-router-dom";
import './Room.css';

import { RoomService } from "../../services/RoomService";
import { WardService } from "../../services/WardService";
import DropDownComponent from "../../TableComponent/DropDownComponent";

const AddRoomComponent=(props)=> {
  
  const [message,setMessage] =useState('');
  const [ward, updateWard] = useState([]);

  const [newRoom,setNewRoom]=useState({
      RoomNo :"",
      WardNo :0,
      RoomType :"",
      RoomFeesPerDay:0,
  })
  
  const serv = new RoomService();
  const wardserv = new WardService();
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
  const clear = () => {
    setNewRoom({
      RoomNo :"",
      WardNo :0,
      RoomType :"",
      RoomFeesPerDay:0
    });
    setMessage("");
  };

  useEffect(()=>{
    if(sessionStorage.getItem("token")===undefined){
      setMessage("Please Login");
    }
    else{
      getWard();
     }
  },[]);

  const addroom=()=>{
    let token = sessionStorage.getItem("token");
    if (token === undefined) {
      setMessage(`Please send the Auth Header`);
    } else {
      serv
        .postData(token,newRoom)
        .then((resp) => {
          if(resp.status===200){
           props.history.push('/admin/room');
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
        <table>
            <tbody>
                <tr className='rowtr'>
                    <td className="rows">
                      <Link className="link" to="/admin/listComponents">Home</Link>
                    </td>
                    <td className="admindash">
                    <Link className="adminlink" to="/admin/room">Room</Link>
                    </td>
                    <td className="rows">
                    <Link className="link" to="/admin/listwards">Wards</Link>
                    </td>
                </tr>
            </tbody>
        </table>
        <input className='btn' id="logout" idden={props.hidden} type="button" value="Logout" onClick={logout} />
        <strong><span hidden={props.hidden} className='fright'>Hi, Admin</span></strong>
        <br />
        <div className="container">
          <strong>{message}</strong><br />
        <strong>
        Add a Room <br /></strong>
        <div id="small">
        Room No: <input type="text" className="form-control" placeholder="Add RoomNo" name="RoomNo" value={newRoom.RoomNo}
         onChange={(evt)=>setNewRoom({...newRoom,RoomNo:evt.target.value})}/>
        Ward No:<DropDownComponent 
              dataSource={ward} stateProperty={newRoom.WardNo} id={"WardNo"} name={"WardType"}
              selectedValue={(val)=>setNewRoom({...newRoom,WardNo:val})}></DropDownComponent>
        Room Type: <input type="text" className="form-control" placeholder="Add RoomType" name="RoomType" value={newRoom.RoomType}
         onChange={(evt)=>setNewRoom({...newRoom,RoomType:evt.target.value})}/>
        Room Charge: <input type="number" className="form-control" placeholder="Price" name="RoomFeesPerDay" value={newRoom.RoomFeesPerDay}
         onChange={(evt)=>setNewRoom({...newRoom,RoomFeesPerDay:evt.target.value})}/>  
         <br />
         <input type="button" className='btn btn-primary' value="Clear" onClick={clear}/>   
         <input type="button" className='btn btn-success' value="Save" onClick={addroom}/>             
         </div>
      </div>
      </div>
    );
  }

export default AddRoomComponent;
