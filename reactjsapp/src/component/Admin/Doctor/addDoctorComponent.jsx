import React, { Component } from "react";
import {Link} from "react-router-dom";


import { DoctorServiceCall } from "./../../services/DoctorService";
import './DoctorComponent.css';
// import ValidationSummary from './../ValidationSummary22-09/ValidationSummary'

class AddDoctorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
        DoctorId:"",
        isDoctorId:true,
        DoctorFname:"",
        isDoctorFname:true,
        DoctorMname:"",
        isDoctorMname:true,
        DoctorLname:"",
        isDoctorLname:true,
        Address:"",
        City:"",
        DateOfBirth:"",
        Gender:"",
        Email:"",
        isEmail:true,
        Specialization:"",
        MobNo:"",
        EmergencyContact:"",
        IdCard:"",
        DoctorFeesPerVisit:0,
        DoctorICUFees:0,
        DoctorConsultationFees:0,
        message:"",
        errors:[],
        isFormValid:false
    };
    this.serv = new DoctorServiceCall();
  }
  clear = () => {
    this.setState({ DoctorId: "" });
    this.setState({ isDoctorId: true });

    this.setState({ DoctorFname: "" });
    this.setState({ isDoctorFname: true });

    this.setState({ DoctorMname: "" });
    this.setState({ isDoctorMname: true });

    this.setState({ DoctorLname: "" });
    this.setState({ isDoctorLname: true });

    this.setState({ Address: "" });
    this.setState({ City: "" });
    this.setState({ DateOfBirth: "" });
    this.setState({ Gender: "" });
    this.setState({ Email: "" });
    this.setState({ isEmail: true });

    this.setState({ Specialization: "" });
    this.setState({ MobNo: "" });
    this.setState({ EmergencyContact: "" });
    this.setState({ IdCard: "" });
    this.setState({ DoctorFeesPerVisit: 0 });
    this.setState({ DoctorICUFees: 0 });
    this.setState({ DoctorConsultationFees: 0 });
    this.setState({errors:[]});
  };

  post() {
    let token = sessionStorage.getItem("token");
    if (token === undefined) {
      this.setState({ message: `Please send the Auth Header` });
    } else {
        let data={DoctorId:this.state.DoctorId,
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
        .postData(token,data)
        .then((resp) => {
          this.setState({ Doctors: resp.data.rows });
          this.setState({ message: resp.data.message });
        })
        .catch((error) => {
          this.setState({ message: `Error Occured ${error.message}` });
        });
    }
  }

  handleInPutChanges = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value },()=>{});
    this.validateInputs(evt.target.name,evt.target.value);
    
  };
  validateInputs=(name,value)=>{
    let letters = /^[A-Za-z]+$/;
    let mail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(name==='DoctorId'){
      
      if(value.length<3||value.slice(0,3)!=="Dr-"){
        this.setState({isDoctorId:false});
      }
      else{
        this.setState({isDoctorId:true});

      }
    }
    if(name==='DoctorFname'){
      
      if(value.length<3||!value.match(letters)){
        this.setState({isDoctorFname:false});
      }
      else{
        this.setState({isDoctorFname:true});

      }
    }
    if(name==='DoctorLname'){
      
      if(value.length<3||!value.match(letters)){
        this.setState({isDoctorLname:false});
      }
      else{
        this.setState({isDoctorLname:true});

      }
    }
    if(name==='DoctorMname'){
      if(value===undefined||value.length===0){
        this.setState({isDoctorMname:true});
      }
      else{
      if(value.length<3||!value.match(letters)){
        this.setState({isDoctorMname:false});
      }
      else{
        this.setState({isDoctorMname:true});

      }}
    }
    if(name==='Email'){
      if(value.match(mail)){
        this.setState({isEmail:true});
      }
      else{
        this.setState({isEmail:false});
      }
    }    
    //  let temp=this.state.errors.slice();
    //  if(value===undefined||parseInt(value)===0||value.length===0){
    //     temp.push(`* Value required for ${name}`);
    //     this.setState({isFormValid:false});
    // }
    // else{
    //     let x=temp.indexOf(`* Value required for ${name}`);
    //     if(x!==-1){temp.splice(x,1);}
    //     this.setState({isFormValid:true});
    // }
    // this.setState({errors:temp},()=>{});
    // console.log(this.state.errors);

  }
  logout=()=>{
    sessionStorage.removeItem("token");
  }
  render() {
    return (
      <div className="container-lg">
        <h3>Add Doctor Component</h3>
        <table className="table-bordered table-striped">
            <tbody>
                <tr>
                    <td className="rows">
                        <Link className="link" to="/" onClick={this.logout.bind(this)}>Logout</Link>
                    </td>
                    <td className="rows">
                      <Link className="link" to="/admin/listComponents">Home</Link>
                    </td>
                     <td className="rows">
                    <Link className="link" to="/admin/listDoctors">Doctors</Link>
                    </td> 
                </tr>
            </tbody>
        </table>
        <div className="container">
          <strong>{this.state.message}</strong><br />
        </div>
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
                              placeholder="Enter value"
                              className="form-control"
                              value={this.state.DoctorId}
                            />
                            <div className="error" hidden={this.state.isDoctorId}>Dr. Id must start from "Dr-"</div>
                          </td>
                          
                          
                        </tr>
                        <tr>
                          <td className="fields">First Name</td><td className="star">*</td>
                          <td>
                            <input
                              type="text"
                              name="DoctorFname"
                              onChange={this.handleInPutChanges.bind()}
                              placeholder="Enter value"
                              className="form-control"
                              value={this.state.DoctorFname}
                            />
                            <div className="error" hidden={this.state.isDoctorFname}>Must be a string greater than 3 letters</div>
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
                               placeholder="Enter value"
                              className="form-control"
                            />
                            <div className="error" hidden={this.state.isDoctorLname}>Must be a string greater than 3 letters</div>

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
                               placeholder="Enter value"
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
                               placeholder="Enter value"

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
                               placeholder="Enter value"
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
                               placeholder="Enter value"
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
                              placeholder="Enter value"
                            />
                          </td>
                        </tr>
                        <tr>
                        <td>
                        <input
                          type="button"
                         disabled={!this.state.isFormValid}
                          value="Add a Doctor"
                          onClick={this.post.bind(this)}
                          className="btn btn-success"
                        /></td>
                        <td>
                        <input
                          type="button"
                          value="Clear"
                          onClick={this.clear.bind(this)}
                          className="btn btn-primary"
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
                               placeholder="Enter value"

                            />
                               <div className="error" hidden={this.state.isDoctorMname}>Must be a string greater than 3 letters</div>
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
                              placeholder="Enter value"

                            />
                               <div className="error" hidden={this.state.isEmail}>Enter Valid Email</div>
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
                              placeholder="Enter value"
                            ><option selected hidden></option><option value="Male">Male</option><option value="Female">Female</option><option value="Others">Others</option></select>
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
                              placeholder="Enter value"
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
                              placeholder="Enter value"
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
                              placeholder="Enter value"
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
                              placeholder="Enter value"
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
                              placeholder="Enter value"
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
            {/* <ValidationSummary
                errors={this.state.errors}></ValidationSummary> */}
          <strong>{this.state.message}</strong><br />
        </div>
      </div>

      
    );
  }
}

export default AddDoctorComponent;
