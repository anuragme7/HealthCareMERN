import React, { Component } from "react";
import {Link} from "react-router-dom";

import { DoctorServiceCall } from "./../../services/DoctorService";
import './DoctorComponent.css';
class EditDoctorComponent extends Component {
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
    };
    this.serv = new DoctorServiceCall();
  }
  clear = () => {
    this.setState({ DoctorId: "" });
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
  };
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
          this.props.history.push("/listDoctors");
        })
        .catch((error) => {
          this.setState({ message: `Error Occured ${error.message}` });
        });
    }
  }
  logout=()=>{
    sessionStorage.removeItem("token");
  }
  getid=()=>{
    let token = sessionStorage.getItem("token");
    if (token === undefined) {
      this.setState({ message: `Please send the Auth Header` });
    } else {
      this.serv
        .getDataById(token,this.props.match.params.id)
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

  componentDidMount = () => {
    if(sessionStorage.getItem("token")===undefined){
      this.setState({message:"Please Login"});
    }
    else{
    this.getid();}
  };

  handleInPutChanges = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value },()=>{});
  };
  validateInputs=(name,value)=>{
  }

  render() {
    return (
      <div className="container-lg">
        <h3>Doctor Component</h3>
        <table className=" table-bordered table-striped">
            <tbody>
                <tr>
                    <td className="rows"> 
                        <Link className="link" to="/" onClick={this.logout.bind(this)}>Logout</Link>
                    </td>
                    <td className="rows">
                      <Link className="link" to="/listComponents">Home</Link>
                    </td>
                     <td className="rows">
                    <Link className="link" to="/listDoctors">Doctors</Link>
                    </td > 
                    
                    <td className="rows">
                    <Link className="link" to="/addDoctor">Add a Doctor</Link>

                    </td>
                </tr>
            </tbody>
        </table>
        <table className="table table-bordred table-striped">
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
                              onChange={this.handleInPutChanges.bind()}
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
                              onChange={this.handleInPutChanges.bind()}
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
                               onChange={this.handleInPutChanges.bind()}
                              className="form-control"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="fields">Identity Card</td><td className="star">*</td>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              name="IdCard"
                              value={this.state.IdCard}
                               onChange={this.handleInPutChanges.bind()}
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
                               onChange={this.handleInPutChanges.bind()}

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
                               onChange={this.handleInPutChanges.bind()}
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
                               onChange={this.handleInPutChanges.bind()}
                            />
                          </td>
                        </tr>
                        <tr> 
                          <td className="fields">Visiting Fees</td><td className="star">*</td>
                          <td>
                            <input
                              type="number"
                              name="DoctorFeesPerVisit"
                              className="form-control"
                              value={this.state.DoctorFeesPerVisit}
                              onChange={this.handleInPutChanges.bind()}
                            />
                          </td>
                        </tr>
                        <tr>
                        <td>
                        <input
                          type="button"
                          value="Clear"
                          onClick={this.clear.bind(this)}
                          className="btn btn-primary"
                        />
                      </td>
                      <td>
                        <input
                          type="button"
                          value="Update Data"
                          onClick={this.put.bind(this)}
                          className="btn btn-success"
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

                               onChange={this.handleInPutChanges.bind()}

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

                              onChange={this.handleInPutChanges.bind()}

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
                              onChange={this.handleInPutChanges.bind()}
                            ><option selected disabled hidden></option><option value="Male">Male</option><option value="Female">Female</option><option value="Others">Others</option></select>
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
                              onChange={this.handleInPutChanges.bind()}
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
                              onChange={this.handleInPutChanges.bind()}
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
                              onChange={this.handleInPutChanges.bind()}
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
                              onChange={this.handleInPutChanges.bind()}
                            />
                          </td>
                        </tr>
                        <tr> 
                          <td className="fields">ICU Fees</td><td></td>
                          <td>
                            <input
                              type="number"
                              name="DoctorICUFees"
                              className="form-control"
                              value={this.state.DoctorICUFees}
                              onChange={this.handleInPutChanges.bind()}
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
          <strong>{this.state.message}</strong><br />
        </div>


      </div>

      
    );
  }
}

export default EditDoctorComponent;
