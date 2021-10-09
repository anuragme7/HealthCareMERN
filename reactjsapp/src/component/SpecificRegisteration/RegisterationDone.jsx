import React, { useState, useEffect } from "react";
import './styles.css'

const RegisterationComplete = (props) => {
    const login = () => {
        localStorage.clear();
        sessionStorage.clear();
        props.history.push('/');
    }
    return (
        <div className="container-lg">
             <center>
                 <strong>
                     <h3 className='cen'>
                         Registeration Completed Successfully
                     </h3>
                     <h4>
                         Your User-Id is {sessionStorage.getItem("UserId")}.You can Login by clicking here.
                     </h4>
                 </strong>
                 <input type="button" value="Login" className="btn btn-primary" onClick={login} />
             </center>
           
           
        </div>


    );
}

export default RegisterationComplete;
