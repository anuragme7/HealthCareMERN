import React, { useState,useEffect } from "react";
import {Link} from "react-router-dom";
import {DoctorObservationService} from  './../services/DoctorObservationService';
import ShowObservationsComponent from "./showObservation";
import './doctor.css';
const DoctorObservationComponent=(props)=> {
 
    const docobsserv=new DoctorObservationService();
    const [docId,setDocId]=useState(props.match.params.id);
    const [patId,setPatId]=useState(sessionStorage.getItem('PatId'));
    const [message,setMessage]=useState("");
    const [observations,setObservations]=useState("");
    const [newobservation,setNewObservation]=useState('');

    const getvalues=()=>{
        let token = sessionStorage.getItem("token");
        if (token === undefined) {
          setMessage("No Auth Header");
        } else {
          let send={
            DoctorId:docId,
            PatientId:patId
          }
          docobsserv
            .getDataById(token,send)
            .then((resp) => {
              if(resp.data.rows===undefined){
                setMessage(resp.data.message);
              }
              else{
                setMessage(resp.data.message);
                setObservations(resp.data.rows);
              }
          })
            .catch((error) => {
              setMessage(`Error Occured : ${error.message}`);
            });
        }
        
      }

    const save=()=>{
      console.log(newobservation);
      let token = sessionStorage.getItem("token");
      if (token === undefined) {
        setMessage("No Auth Header");
      } else {
        let send={
          DoctorId:docId,
          PatientId:patId,
          Observation:newobservation
        }
        docobsserv
          .postData(token,send)
          .then((resp) => {
            if(resp.status===200){
              getvalues();
              clear();
            }
            setMessage(resp.data.message);
        })
          .catch((error) => {
            setMessage(`Error Occured : ${error.message}`);
          });
      }

     
    }  
    const clear=()=>{
      setNewObservation("");
      setMessage('');
    }
    useEffect(()=>{
        if(sessionStorage.getItem('token')===undefined){
            setMessage('Please Login');
        }
        else{
            getvalues();
        }
    },[])
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
                      <Link className="link" to="/doctor/dashboard">Home</Link>
                    </td>
                </tr>
            </tbody>
        </table>
        <input className='btn' id="logout" type="button" value="Logout" onClick={logout} />
        <strong>
        <span className='fright'>Hi Dr. {sessionStorage.getItem("DocName")}</span>
        </strong> <br />
       
        <div className='container'>
            <strong>
            <h5>The Observations for PatientId - {patId} </h5> <br /> </strong>
            <ShowObservationsComponent dataSource={observations}>
                </ShowObservationsComponent>
                <textarea id="newobs" className='form-control' value={newobservation} placeholder='Write an Observation(max 500 words)' onChange={(evt)=>setNewObservation(evt.target.value)}></textarea><br />
                <input type="button" value="Clear" className='btn btn-primary' onClick={clear}/>
                <input type="button" value="Save Observation" className='btn btn-success' onClick={save}/>
                <br />
                <strong>{message}</strong>
        </div>

       
      </div>
    );
  }

export default DoctorObservationComponent;
