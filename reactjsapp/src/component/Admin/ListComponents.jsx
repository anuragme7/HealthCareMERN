import React, { Component } from "react";
import './AdminHome.css';
import { Link } from "react-router-dom";

import {TempStaffService} from '../services/TempStaffService';
import {TempUserService} from '../services/TempUserService';
import { RoleService } from "../services/RoleService";
import { StaffService } from '../services/StaffService';
import TableComponent from "./../TableComponent/tableComponent";
import SideBar from "../SideBar/SideBar";
import {SideBarData} from './listComponentSideBarData';
class ComponentList extends Component {
  constructor(props){
    super(props);
    this.state={
      tempStaff:[],
      headers:[],
      message:"",
      roles:[],
      isTempStaff:false,
      mapRole:new Map(),
    };
    this.serv=new TempStaffService();
    this.userserv=new TempUserService();
    this.roleserv=new RoleService();
    this.staffserv=new StaffService();

  }
  logout=()=>{
      localStorage.clear();
      sessionStorage.clear();
      this.props.history.push('/');
  }  
  getRoles=()=>{
    let token = sessionStorage.getItem("token");
    if (token === undefined) {
      this.setState({ message: `Please send the Auth Header` });
    } else {
      console.log("In get Values");
      this.roleserv
        .getData(token)
        .then((resp) => {
          if(resp.data.rowCount>0){
            this.setState({ roles: resp.data.rows},()=>{
              this.state.roles.forEach((rec,id)=>{
                if(rec.RoleName==='Doctor'){
                  this.state.mapRole.set(`${rec.RoleId}`,"Dr-");
                }
                if(rec.RoleName==='Admin'){
                  this.state.mapRole.set(`${rec.RoleId}`,"Ad-");
                }
                if(rec.RoleName==='Nurse'){
                  this.state.mapRole.set(`${rec.RoleId}`,"Nr-");
                }
                if(rec.RoleName==='WardBoy'){
                  this.state.mapRole.set(`${rec.RoleId}`,"Wb-");
                }  
                if(rec.RoleName==='Patient'){
                  this.state.mapRole.set(`${rec.RoleId}`,"Pt-");
                } 
                if(rec.RoleName==='Accountant'){
                  this.state.mapRole.set(`${rec.RoleId}`,"Ac-");
                } 
                if(rec.RoleName==='Receptionist'){
                  this.state.mapRole.set(`${rec.RoleId}`,"Rc-");
                }
                if(rec.RoleName==='Medical'){
                  this.state.mapRole.set(`${rec.RoleId}`,"Md-");
                }
              })
            });
            this.setState({ message: `Data Received Successfully` });
          }
          else{
            this.setState({roles:[]});
          }
        })
        .catch((error) => {
          this.setState({ message: `Error Occured ${error.message}` });
        });
    }

  }
  getValues=()=>{
    let token = sessionStorage.getItem("token");
    if (token === undefined) {
      this.setState({ message: `Please send the Auth Header` });
    } else {
      console.log("In get Values");
      this.serv
        .getData(token)
        .then((resp) => {
          if(resp.data.rowCount>0){
          this.setState({ tempStaff: resp.data.rows},()=>{
            this.setState({isTempStaff:true});
          });
          this.setState({ message: `Data Received Successfully` });
        }
        else{
          this.setState({tempStaff:[]});
        }
        })
        .catch((error) => {
          this.setState({ message: `Error Occured ${error.message}` });
        });
    }
  }
  getApproveId=(val)=>{
    console.log("Approve User ======"+val);
   
    let token = sessionStorage.getItem("token");
    if (token === undefined) {
      this.setState({ message: `Please send the Auth Header` });
    } else {
      let stf=this.state.tempStaff.filter((rec,id)=>rec.UserId===val);
      let staffRow={
        StaffId : 0,
        Fname : stf[0].Fname ,
        Mname : stf[0].Mname,
        Lname : stf[0].Lname ,
        Address : stf[0].Address ,
        City : stf[0].City ,
        DateOfBirth : stf[0].DateOfBirth ,
        Gender : stf[0].Gender ,
        RoleId : stf[0].RoleId ,
        EmergencyContact : stf[0].EmergencyContact,
        IdCard : stf[0].IdCard,
        Email  : stf[0].Email,
        MobNo : stf[0].MobNo
      }

      console.log(staffRow);

      console.log(`${this.state.mapRole.get(`${staffRow.RoleId}`)}`)
      let userdata={
        UserId:"",
        Email:"",
        Password:""
      }
      this.userserv
        .getDataById(token,val)
        .then((resp) => {
          if(resp.status===200){
          userdata.Email=resp.data.rows.Email;
          userdata.Password=resp.data.rows.Password;
          console.log("In Adding Values. SELECT command successfull for Temp User");
          console.log(userdata);
          console.log("The Staff Data");
          console.log(staffRow);

          this.staffserv
          .postData(token,staffRow)
          .then((resp) => {
            if(resp.status===200){
              this.setState({ message: `User Registered as a Staff` });
              let LoginId=`${this.state.mapRole.get(`${resp.data.rows.RoleId}`)}${resp.data.rows.StaffId}`;
              userdata.UserId=LoginId;
              this.roleserv
                .postUserData(token,userdata)
                .then((resp)=>{
                  if(resp.status===200){
                    this.setState({ message: `User Registered with UserId ${LoginId}` });
                    this.getDenyId(val);
                  }
  
                }).catch((error) => {
                  this.setState({ message: `Error Occured ${error.message}` });
                });
  
            }else{
              this.setState({message:resp.data.message})
             }

          })
          .catch((error) => {
            this.setState({ message: `Error Occured ${error.message}` });
          });
        }
          this.setState({message:resp.data.message});
          
        })
        .catch((error) => {
          this.setState({ message: `Error Occured ${error.message}` });
        });
     
     
     }


  }
  getDenyId=(val)=>{
    console.log("Deny User ======"+val);
    let token = sessionStorage.getItem("token");
    if (token === undefined) {
      this.setState({ message: `Please send the Auth Header` });
    } else {
      this.serv
        .deleteData(token,val)
        .then((resp) => {
          //this.setState({ message: `User Denied` });
          this.userserv
          .deleteData(token,val)
          .then((resp) => {
            this.getValues();
            // this.setState({ message: `User Denied` },()=>{
                
            // });
          })
        })
        .catch((error) => {
          this.setState({ message: `Error Occured ${error.message}` });
        });
        
    }

  }
  componentDidMount=()=>{
   this.getValues();
   this.getRoles(); 
  } 
  render() {
    return (
      <div>
        <input className='btn' id="logout" type="button" value="Logout" onClick={this.logout.bind(this)} />
              <strong><span className='fright'>Hi, Admin</span></strong>
        <ul className='screen'>
              <li className='ui'>
                <div>
            <SideBar SideBarData={SideBarData}/></div>
              <div className="container-lg">
              <h4><strong>New Users waiting for approval</strong></h4>
              <div hidden={!this.state.isTempStaff} >
                <strong>{this.state.message}</strong> <br />
              </div>
              <TableComponent id="UserId"
              dataSource={this.state.tempStaff} canApprove={true}
              GetId={this.getApproveId.bind(this)}
              DelId={this.getDenyId.bind(this)}
              ></TableComponent>
              </div>
            </li>
            </ul>
      </div>  

      
    );
  }
}

export default ComponentList;
{/* <td className="admindash">
                    <Link className="adminlink" to="/admin/listDoctors">Canteen</Link>
                    </td> */}


                //     <table>
                //     <tbody>
                //         <tr className="rowtr">
                //             <td className="admindash">
                //             <Link className="adminlink" to="/admin/staff">Staff</Link>
                //             </td> 
                //              <td className="admindash">
                //             <Link className="adminlink" to="/admin/listDoctors">Doctors</Link>
                //             </td> 
                //             <td className="admindash">
                //             <Link className="adminlink" to="/admin/listPatients">Patients</Link>
                //             </td>
                //             <td className="admindash">
                //             <Link className="adminlink" to="/admin/listRoles">Roles</Link>
                //             </td>
                //             <td className="admindash">
                //             <Link className="adminlink" to="/admin/listnurse">Nurse</Link>
                //             </td>
                //             <td className="admindash">
                //             <Link className="adminlink" to="/admin/wardboy">WardBoy</Link>
                //             </td>
                //             <td className="admindash">
                //             <Link className="adminlink" to="/admin/listwards">Ward</Link>
                //             </td>
                //             <td className="admindash">
                //             <Link className="adminlink" to="/admin/room">Room</Link>
                //             </td>
                //             <td className="admindash">
                //             <Link className="adminlink" to="/admin/medical">Medical</Link>
                //             </td>
                            
                //         </tr>
                //     </tbody>
                // </table>