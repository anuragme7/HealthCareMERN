import React, { useState,useEffect } from "react";
// import {Link} from "react-router-dom";
import './Registered.css'
import { TempUserService } from "../services/TempUserService";
const RegisterComponent=(props)=> {
  
  const [message,setMessage] =useState('');
  const [fields,setFields]=useState({
    Email:"",
    Password1:"",
    Password2:""
  })

  const serv = new TempUserService();

  const register=()=>{
    let mail=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if(fields.Email.match(mail)){
        let pass = /(?=.*[^A-Za-z0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}/;
        if(fields.Password1.match(pass)){
            if(fields.Password1===fields.Password2){
                setMessage("");
                serv
                .checkUser({Email:fields.Email})
                .then((resp) => {
                    setMessage(resp.data.message);
                    localStorage.setItem('Email',fields.Email);
                    localStorage.setItem('Password',fields.Password1);
                    props.history.push(`/register/details`);
                })
                .catch((error) => {
                    setMessage(`Email Already Exists`);
                });
                

            }
            else{
                setMessage("Password do not match");
            }
        }
        else{
            setMessage("Enter a Strong Password");
        }
      }
      else{
          setMessage("Enter a Valid Email");
      }
  }
  const clear=()=>{
      setFields({
        Email:"",
        Password1:"",
        Password2:""
      })
      
  }
  const handleInPutChanges=(evt)=>{
    setFields({...fields,[evt.target.name]:evt.target.value});
    
  }
  const login=()=>{
      sessionStorage.clear();
      localStorage.clear();
      props.history.push('/');
  }
    return (
      <div className="container-lg">
        <h3>Register</h3>
        <center>
        <table id="fb">
            <tbody>
                <tr>
                    <td>Email</td>
                    <td>
                        <input placeholder="Enter Email"
                        type="text" 
                        className="form-control" 
                        name="Email" 
                        value={fields.Email}
                        onChange={handleInPutChanges}/>
                     </td>
                </tr>
                <tr>
                    <td>Password</td>
                    <td>
                        <input placeholder="Create Password"
                        type="password"
                        
                        name="Password1"
                        value={fields.Password1}
                        onChange={handleInPutChanges}
                        className="form-control"
                        />
                    </td>
                </tr>
                <tr>
                    <td>Confirm Password</td>
                    <td>
                        <input placeholder="Comfirm Password"
                        type="password"
                        className="form-control"
                        name="Password2"
                        value={fields.Password2}
                        onChange={handleInPutChanges}
                        />
                    </td>
                </tr>
                <tr>
                      <td>
                        <input
                          type="button"
                          value="Clear"
                          onClick={clear}
                          className="btn btn-primary"
                        />
                      </td>
                      <td>
                        <input
                          type="button"
                          value="Register"
                          onClick={register}
                          className="btn btn-success"
                        />
                      </td>
                </tr>
                <tr>
                  <td>
                    <input
                    type="button"
                    value="Log In?"
                    onClick={login}
                    className="btn btn-danger"
                    />
                  </td>
                </tr>
            </tbody> 
        </table>
        <div>
            <strong>
                {message}
            </strong>
        </div>

        </center>
        
        

        
      </div>

      
    );
  }

export default RegisterComponent;
