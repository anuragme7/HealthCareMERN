import React, { Component } from "react";
import {Link} from "react-router-dom";

import { DoctorServiceCall } from "../../services/DoctorService";
import './DoctorComponent.css';
import TableComponent from "./../../TableComponent/tableComponent";
import SideBar from "../../SideBar/SideBar";
import { SideBarData } from "./../listComponentSideBarData";
class ListDoctorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
        Doctors:[],
        headers:["DoctorId","DoctorFname","DoctorLname","Specialization"],
        docId:"",
        message:"",
        patientbyid:this.props.docpat
    };
    this.serv = new DoctorServiceCall();
  }
  getValues() {
    let token = sessionStorage.getItem("token");
    if (token === undefined) {
      this.setState({ message: `Please send the Auth Header` });
    } else {
      this.serv
        .getData(token)
        .then((resp) => {


          this.setState({ Doctors: resp.data.rows },()=>{
            //this.setState({headers:Object.keys(this.state.Doctors[0])})
          });
        
          this.setState({ message: `Data Received Successfully` });
        })
        .catch((error) => {
          this.setState({ message: `Error Occured ${error.message}` });
        });
    }
  }
  getDocId(val){
    console.log("The Doc Value======"+val);
    if(this.props.hidden===true){
    this.props.history.push(`/recep/doctorbyid/${val}`);
    }
    else{
    this.props.history.push(`/admin/doctorbyid/${val}`);
  }
    
  }
  getPatients(val){
    console.log("The Doc Value======"+val);
    console.log(this.props.docpat);
    if(this.props.docpat){
      this.props.history.push(`/recep/doctorpatient/${val}`);
    }
    else{
      this.props.history.push(`/admin/patientbydocid/${val}`);
    }
  }
  logout=()=>{
    sessionStorage.removeItem("token");
    this.props.history.push('/');
  }
  componentDidMount = () => {
    if(sessionStorage.getItem("token")===undefined){
      this.setState({message:"Please Login"});
    }
    else{
    this.getValues();
    if(this.state.patientbyid===undefined){
      this.setState({patientbyid:true});
    }
    }
  };
  render() {
    return (
      <div >
        <input id="logout" className="btn" type="button" value="Logout" onClick={this.logout} hidden={this.props.hidden}/>
        <strong><span hidden={this.props.hidden} className='fright'>Hi, Admin</span></strong>
        <ul className='screen'>
              <li className='ui'>
                <div hidden={this.props.hidden}>
                    <SideBar SideBarData={SideBarData} />
                </div>  
                <div className="container">
                <br />
                  <strong>{this.state.message}</strong><br />
                  <TableComponent id="DoctorId" getDetails={true}
                  dataSource={this.state.Doctors} columnHeaders={this.state.headers}
                  GetId={this.getDocId.bind(this)} showpatients={this.state.patientbyid}
                  GetPat={this.getPatients.bind(this)}></TableComponent>
                </div>
            </li>
            </ul> 
      </div>
    );
  }
}

export default ListDoctorComponent;


{/* <td className="rows">
          <Link className="link" to="/admin/addDoctor">Add a Doctor</Link>
          </td> */}