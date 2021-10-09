import React, { Component } from "react";
import {Link} from "react-router-dom";


import { DoctorServiceCall } from "./../../services/DoctorService";
import './DoctorComponent.css';
import ValidationSummary from './../../ValidationSummary22-09/ValidationSummary'

class DoctorById extends Component {
  constructor(props) {
    super(props);
    this.state = {
        DoctorId:"",
        DoctorFname:"",
        DoctorMname:"",
        DoctorLname:"",
        Address:"",
        City:"",
        DateOfBirth:"",
        Gender:"",
        Email:"",
        Specialization:"",
        MobNo:"",
        EmergencyContact:"",
        IdCard:"",
        DoctorFeesPerVisit:0,
        DoctorICUFees:0,
        DoctorConsultationFees:0,
        message:"",
        errors:[],
        isFormValid:true,
        edit:false
    };
    this.serv = new DoctorServiceCall();
  }
  clear = () => {
    this.setState({ DoctorFname: "" });
    this.setState({ DoctorMname: "" });
    this.setState({ DoctorLname: "" });
    this.setState({ Address: "" });
    this.setState({ City: "" });
    this.setState({ DateOfBirth: "" });
    this.setState({ Gender: "" });
    this.setState({ Email: "" });
    this.setState({ Specialization: "" });
    this.setState({ MobNo: "" });
    this.setState({ EmergencyContact: "" });
    this.setState({ IdCard: "" });
    this.setState({ DoctorFeesPerVisit: 0 });
    this.setState({ DoctorICUFees: 0 });
    this.setState({ DoctorConsultationFees: 0 });
    this.setState({errors:[]});
  };
  getid=()=>{
      this.setState({errors:[]});
    let token = sessionStorage.getItem("token");
    if (token === undefined) {
      this.setState({ message: `Please send the Auth Header` });
    } else {
      let id;
      if(this.props.hidden){
        id=this.props.idPassed;
      }
      else{
        id=this.props.match.params.id

      }
      this.serv
        .getDataById(token,id)
        .then((resp) => {
          if(resp.data.rows===undefined){
          this.setState({ message: resp.data.message });
          }
          else{
          this.setState({ message: resp.data.message });
          console.log(JSON.stringify(resp.data));
          this.setState({ DoctorId: resp.data.rows.DoctorId });
          this.setState({ DoctorFname: resp.data.rows.DoctorFname });
          this.setState({ DoctorMname: resp.data.rows.DoctorMname });
          this.setState({ DoctorLname: resp.data.rows.DoctorLname });
          this.setState({ Address: resp.data.rows.Address });
          this.setState({ City: resp.data.rows.City });
          this.setState({ DateOfBirth: resp.data.rows.DateOfBirth });
          this.setState({ Gender: resp.data.rows.Gender });
          this.setState({ Email: resp.data.rows.Email });
          this.setState({ Specialization: resp.data.rows.Specialization });
          this.setState({ MobNo: resp.data.rows.MobNo });
          this.setState({ EmergencyContact: resp.data.rows.EmergencyContact });
          this.setState({ IdCard: resp.data.rows.IdCard });
          this.setState({ DoctorFeesPerVisit: resp.data.rows.DoctorFeesPerVisit });
          this.setState({ DoctorICUFees: resp.data.rows.DoctorICUFees });
          this.setState({ DoctorConsultationFees: resp.data.rows.DoctorConsultationFees });}
        })
        .catch((error) => {
          this.setState({ message: `Error Occured ${error.message}` });
        });
    }
  }
  put() {
    let token = sessionStorage.getItem("token");
    if (token === undefined) {
      this.setState({ message: `Please send the Auth Header` });
    } else {
        let data={
        DoctorId:this.state.DoctorId,
        DoctorFname:this.state.DoctorFname,
        DoctorMname:this.state.DoctorMname,
        DoctorLname:this.state.DoctorLname,
        Address:this.state.Address,
        City:this.state.City,
        DateOfBirth:this.state.DateOfBirth,
        Gender:this.state.Gender,
        Email:this.state.Email,
        Specialization:this.state.Specialization,
        MobNo:this.state.MobNo,
        EmergencyContact:this.state.EmergencyContact,
        IdCard:this.state.IdCard,
        DoctorFeesPerVisit:this.state.DoctorFeesPerVisit,
        DoctorICUFees:this.state.DoctorICUFees,
        DoctorConsultationFees:this.state.DoctorConsultationFees}
      this.serv
        .putData(token,data,this.state.DoctorId)
        .then((resp) => {
          this.setState({ Doctors: resp.data.rows });
          this.setState({ message: resp.data.message });
          this.props.history.push("/admin/listDoctors");
        })
        .catch((error) => {
          this.setState({ message: `Error Occured ${error.message}` });
        });
    }
  }
  componentDidMount=()=>{
   this.getid();
  }

  handleInPutChanges = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value },()=>{});
    this.validateInputs(evt.target.name,evt.target.value);
    
  };
  validateInputs=(name,value)=>{
     let temp=this.state.errors.slice();
     if(value===undefined||parseInt(value)===0||value.length===0){
        temp.push(`* Value required for ${name}`);
        this.setState({isFormValid:false});
    }
    else{
        let x=temp.indexOf(`* Value required for ${name}`);
        if(x!==-1){temp.splice(x,1);}
        this.setState({isFormValid:true});
    }
    this.setState({errors:temp},()=>{});
    console.log(this.state.errors);

  }
  delete=()=>{
      let token = sessionStorage.getItem("token");
    if (token === undefined) {
      this.setState({ message: `Please send the Auth Header` });
    } else {
      this.serv
        .deleteData(token,this.state.DoctorId)
        .then((resp) => {
          this.setState({ message: resp.data.message },()=>{
          this.props.history.push("/admin/listDoctors");
            
          });
        })
        .catch((error) => {
          this.setState({ message: `Error Occured ${error.message}` });
        });
    }
  }
  editdoc=(evt)=>{
      if(this.state.edit){
          this.setState({edit:false});
      }
      else{
        this.setState({edit:true});
      }
  }
  logout=()=>{
    sessionStorage.removeItem("token");
    this.props.history.push('/');
  }
  render() {
    return (
      <div>
        <table hidden={this.props.hidden}>
            <tbody className='rowtr'>
                <tr>
                    <td className="rows">
                      <Link className="link" to="/admin/listComponents">Home</Link>
                    </td>
                    {/* <td className="rows">
                    <Link className="link" to="/admin/addDoctor">Add a Doctor</Link>
                    </td> */}
                     <td className="rows">
                    <Link className="link" to="/admin/listDoctors">Doctors</Link>
                    </td> 
                </tr>
            </tbody>
        </table>
        <input className='btn' id="logout" hidden={this.props.hidden} type="button" value="Logout" onClick={this.logout.bind(this)} />
        <strong><span hidden={this.props.hidden} className='fright'>Hi, Admin</span></strong>

        <div className="container">
          <strong>{this.state.message}</strong><br />
        
        <input type="button" hidden={this.props.hidden} className="btn btn-warning" value="Edit" onClick={this.editdoc.bind(this)}/>
        <input type="button" hidden={this.props.hidden} className="btn btn-success"  disabled={!this.state.edit} value="Get Data" onClick={this.getid.bind(this)}/>
        <input hidden={this.props.hidden}
            type="button"
            disabled={!this.state.isFormValid}
            value="Update Data"
            onClick={this.put.bind(this)}
            className="btn btn-dark"
        />
        <input
            type="button" hidden={this.props.hidden}
            value="Clear"
            onClick={this.clear.bind(this)}
            disabled={!this.state.edit}
            className="btn btn-primary"
        />
        {/* <input
            type="button" hidden={this.props.hidden}
            value="Delete"
            onClick={this.delete.bind(this)}
            disabled={!this.state.edit}
            className="btn btn-danger"
        /> */}
        
        <table id="sb" className="table table-bordred table-striped">
              <tbody>
                <tr>
                  <td>
                    <table className="table table-bordred table-striped">
                      <tbody>
                      <tr>
                          <td className="fields">Doctor Id</td><td className="star">*</td>
                          <td>
                            <input
                              type="text"
                              name="DoctorId"
                             disabled onChange={this.handleInPutChanges.bind()}
                              className="form-control"
                              value={this.state.DoctorId}
                            />
                          </td>
                          
                        </tr>
                        <tr>
                          <td className="fields">First Name</td><td className="star">*</td>
                          <td>
                            <input
                              type="text"
                              name="DoctorFname"
                             disabled={!this.state.edit}    onChange={this.handleInPutChanges.bind()}
                              className="form-control"
                              value={this.state.DoctorFname}
                            />
                          </td>
                          
                        </tr>
                        <tr>
                          <td className="fields">Last Name</td><td className="star">*</td>
                          <td>
                            <input
                              type="text"
                              name="DoctorLname"
                              value={this.state.DoctorLname}
                              disabled={!this.state.edit}    onChange={this.handleInPutChanges.bind()}
                              className="form-control"
                            />
                          </td>
                        </tr>
                        <tr hidden={this.props.hidden}>
                          <td className="fields">Identity Card</td><td className="star">*</td>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              name="IdCard"
                              value={this.state.IdCard}
                              disabled={!this.state.edit}    onChange={this.handleInPutChanges.bind()}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="fields">Date Of Birth</td><td className="star">*</td>
                          <td>
                            <input
                              type="date"
                              className="form-control"
                              name="DateOfBirth"
                              value={this.state.DateOfBirth}
                              disabled={!this.state.edit}    onChange={this.handleInPutChanges.bind()}

                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="fields">Address</td><td className="star">*</td>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              name="Address"
                              value={this.state.Address}
                              disabled={!this.state.edit}    onChange={this.handleInPutChanges.bind()}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="fields">MobNo</td><td className="star">*</td>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              name="MobNo"
                              value={this.state.MobNo}
                              disabled={!this.state.edit}    onChange={this.handleInPutChanges.bind()}
                            />
                          </td>
                        </tr>
                        <tr > 
                          <td className="fields">Visiting Fees</td><td className="star">*</td>
                          <td>
                            <input
                              type="number"
                              name="DoctorFeesPerVisit"
                              className="form-control"
                              value={this.state.DoctorFeesPerVisit}
                             disabled={!this.state.edit}    onChange={this.handleInPutChanges.bind()}
                            />
                          </td>
                        </tr>
                       
                        
                      </tbody>
                    </table>
                  </td>
                  <td>
                    <table className="table table-bordred table-striped">
                      <tbody>
                        <tr>
                          <td className="fields">Middle Name</td><td></td>
                          <td>
                            <input
                              type="text"
                              name="DoctorMname"
                              className="form-control"
                              value={this.state.DoctorMname}

                              disabled={!this.state.edit}    onChange={this.handleInPutChanges.bind()}

                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="fields">Email</td><td className="star">*</td>
                          <td>
                            <input
                              type="text"
                              name="Email"
                              className="form-control"
                              value={this.state.Email}

                             disabled={!this.state.edit}    onChange={this.handleInPutChanges.bind()}

                            />
                          </td>
                        </tr>
                        <tr> 
                          <td className="fields">Gender</td><td className="star">*</td>
                          <td>
                            <select
                              name="Gender"
                              className="form-control"
                              value={this.state.Gender}
                             disabled={!this.state.edit}    onChange={this.handleInPutChanges.bind()}
                            ><option disabled hidden></option><option value="Male">Male</option><option value="Female">Female</option><option value="Others">Others</option></select>
                          </td>
                        </tr>
                        <tr> 
                          <td className="fields">Specialization</td><td className="star">*</td>
                          <td>
                            <input
                              type="text"
                              name="Specialization"
                              className="form-control"
                              value={this.state.Specialization}
                             disabled={!this.state.edit}    onChange={this.handleInPutChanges.bind()}
                            />
                          </td>
                        </tr>
                        <tr> 
                          <td className="fields">Consultation Fees</td><td className="star">*</td>
                          <td>
                            <input
                              type="text"
                              name="DoctorConsultationFees"
                              className="form-control"
                              value={this.state.DoctorConsultationFees}
                             disabled={!this.state.edit}    onChange={this.handleInPutChanges.bind()}
                            />
                          </td>
                        </tr>
                        <tr> 
                          <td className="fields">City</td><td className="star">*</td>
                          <td>
                            <input
                              type="text"
                              name="City"
                              className="form-control"
                              value={this.state.City}
                             disabled={!this.state.edit}    onChange={this.handleInPutChanges.bind()}
                            />
                          </td>
                        </tr>
                        <tr> 
                          <td className="fields">Emergency Contact</td><td className="star">*</td>
                          <td>
                            <input
                              type="text"
                              name="EmergencyContact"
                              className="form-control"
                              value={this.state.EmergencyContact}
                             disabled={!this.state.edit}    onChange={this.handleInPutChanges.bind()}
                            />
                          </td>
                        </tr>
                        <tr hidden={this.props.hidden}> 
                          <td className="fields">ICU Fees</td><td></td>
                          <td>
                            <input
                              type="number"
                              name="DoctorICUFees"
                              className="form-control"
                              value={this.state.DoctorICUFees}
                             disabled={!this.state.edit}    onChange={this.handleInPutChanges.bind()}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="container">
            <ValidationSummary
                errors={this.state.errors}></ValidationSummary>
        </div>
      </div>
      </div>

      
    );
  }
}

export default DoctorById;
