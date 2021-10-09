import React, { Component } from "react";
import {Link} from "react-router-dom";
import { RoleService } from "./../services/RoleService";

import './styles.css'

class CompleteRegisteration extends Component {

    constructor(props){
        super(props);
        this.state={
            staffRow:JSON.parse(sessionStorage.getItem("StaffRow")),
            message:"",
            roleName:"",
            roleId:0,
            roles:[]
        }
        this.roleserv=new RoleService();
    }
    getRoles=()=>{
        let token = sessionStorage.getItem("token");
        if (token === undefined) {
            this.setState({message:"No token available"});
        } else {
          this.roleserv
            .getData(token)
            .then((resp) => {
              if(resp.data.rowCount>0){
               this.setState({roles:resp.data.rows})
               let registeredRole=resp.data.rows.filter((rec,id)=>rec.RoleId===this.state.staffRow.RoleId);
               let temprn=registeredRole[0].RoleName;
               this.setState({roleName:temprn})
               let tempri=registeredRole[0].RoleId;
               this.setState({roleId:tempri})
              this.setState({message:resp.data.message});
               
              }
              else{
                this.setState({roles:[]})
              }
            })
            .catch((error) => {
                this.setState({message:`Error Occured ${error.message}`});
 
            });
        }
    
      }
  confirm=()=>{
      if(this.state.roleName==="Receptionist"){
        let token = sessionStorage.getItem("token");
        if (token === undefined) {
            this.setState({message:"No token available"});
        } else {
            let roleData={
                UserId:`Rc-${this.state.staffRow.StaffId}`,
                RoleId:this.state.staffRow.RoleId
            };
            this.roleserv
            .postUserInRoleData(token,roleData)
            .then((resp) => {
                this.setState({message:resp.data.message});
                sessionStorage.setItem("UserId",roleData.UserId);
                this.props.history.push('/registerationdone');
            })
            .catch((error) => {
                this.setState({message:`Error Occured ${error.message}`});

            });
            
        }

      }
      else{
      sessionStorage.setItem("Role",this.state.roleName);
      sessionStorage.setItem("RoleId",this.state.roleId);
      this.props.history.push(`/CompleteRegisteration/${this.state.roleName}`);}
  }

  logout=()=>{
    sessionStorage.clear();
    this.props.history.push('/');
  }
  componentDidMount=()=>{
      this.getRoles();
  }
  render(){
    return (
      <div className="container-lg">
        <h3>Complete Your Registeration</h3>
        <table>
            <tbody>
                <tr className='rowtr'>
                    <td className="rows">
                        <Link className="link" to="/" onClick={this.logout.bind(this)}>Logout</Link>
                    </td>
                    
                </tr>
            </tbody>
        </table>    
        <center>
            <strong>
            <h4 className='cen'>
                Did you apply for the role of {this.state.roleName}
            </h4>
            </strong>
            <input type="button" value="No &#10060;" className='btn btn-danger' onClick={this.logout.bind(this)}/>
            <input type="button" value="Yes &#10003;" className='btn btn-success' onClick={this.confirm.bind(this)}/>
        </center>

      </div>

      
    );
}  
}

export default CompleteRegisteration;
