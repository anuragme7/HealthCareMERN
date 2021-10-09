import React, { Component } from "react";

import {RoleService} from '../services/RoleService';
import './login.css';
class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
        UserId:"",
        Password:"",
        isUserId:false,
        isPassword:false,
        isFormValid:false,
        message:""
    };
    this.roleServ = new RoleService();
  }
  clearAuth = () => {
    this.setState({ UserId: "" });
    this.setState({ Password: "" });
    this.setState({message:""});
  };
  auth() {
    let mail=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let user;
    if(this.state.UserId.match(mail)){
      user={
        Email: this.state.UserId,
        Password: this.state.Password,
      };

    }else{
     user = {
      UserId: this.state.UserId,
      Password: this.state.Password,
    };}
    this.roleServ
      .authUser(user)
      .then((resp) => {
        this.setState({ message: resp.data.message },()=>{});
        sessionStorage.setItem("token", resp.data.token);
        sessionStorage.setItem("Role",resp.data.roleName);
        if(resp.data.roleName==="NA"){
          sessionStorage.setItem("StaffRow",JSON.stringify(resp.data.rows));
          this.props.history.push("/CompleteRegisteration");
        }
        else{
          if(resp.data.roleName==='Receptionist'){
            this.props.history.push("/recep/listComponent");
          }
          else if(resp.data.roleName==='Doctor'){
            sessionStorage.setItem('DocId',resp.data.UserId);
            this.props.history.push('/doctor/dashboard');
            
          }
          else{
            this.props.history.push("/admin/listComponents");
          }
        }
        })
      .catch((error) => {
        this.setState({ message: `Please provide Valid Credentials.` });
      });
  }

  handleInPutChanges = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value },()=>{});
    this.validateInputs(evt.target.name,evt.target.value);
  };
  validateInputs=(name,value)=>{
    if(name === 'UserId'){
        if(value.length === 0) {
            this.setState({isUserId:false});       
        }else {
            this.setState({isUserId:true});
        }
    }
    if(name === 'Password'){
        if(value.length === 0) {
            this.setState({isPassword:false});
           
        }else {
            this.setState({isPassword:true});
        }
    }
    this.setState({isFormValid:this.state.isUserId&&this.state.isPassword})

  }
  register = ()=>{
    this.props.history.push("/register");
  }
  componentDidMount=()=>{
    sessionStorage.clear();
  }
  render() {
    return (
      <div className="container-lg">
        <h3>Login</h3>
        <center>
          <table id="xb">
              <tbody>
                  <tr>
                      <td>UserId</td>
                      <td><input type="text" placeholder="Email or UserId" className="form-control" name="UserId" value={this.state.UserId} onChange={this.handleInPutChanges.bind()}/></td>
                  </tr>
                  <tr>
                      <td>Password</td>
                      <td>
                          <input placeholder="Password"
                          type="password"
                          className="form-control"
                          name="Password"
                          value={this.state.Password}
                          onChange={this.handleInPutChanges.bind(this)}
                          />
                      </td>
                  </tr>
                  <tr>
                        <td>
                          <input
                            type="button"
                            value="Clear"
                            onClick={this.clearAuth.bind(this)}
                            className="btn btn-primary"
                          />
                        </td>
                        <td>
                          <input
                            type="button"
                            value="Login"
                            onClick={this.auth.bind(this)}
                            className="btn btn-success"
                            disabled={!this.state.isFormValid}
                          />
                          
                        </td>
                  </tr>
                  <tr>
                    <td>
                    <input
                            type="button"
                            value="New? Register Here"
                            onClick={this.register.bind(this)}
                            className="btn btn-danger"
                          />

                    </td>
                  </tr>
              </tbody> 
          </table>
          
        <div className="container">
          <strong>{this.state.message}</strong><br />
        </div>
        </center>

      </div>

      
    );
  }
}

export default LoginComponent;
