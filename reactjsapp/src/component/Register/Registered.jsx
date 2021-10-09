import React from "react";
import './Registered.css'
const Registered=(props)=> {
    
  return(
      <div>
          <h3>Registeration Complete</h3>
          <center>
              <div className="container">
                  <h5 className="xen">Kindly wait for Admin's Approval</h5>
                  <input type="button" value="Home" className="btn btn-primary" onClick={()=>{props.history.push('/')}}/>
              </div>
          </center>
      </div>
  )
}

export default Registered;
