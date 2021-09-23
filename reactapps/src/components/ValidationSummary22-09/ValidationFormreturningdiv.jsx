import React, { Component } from "react";
import ValidationSummary from "./ValidationSummaryComponent";
class ValidationForm extends Component{
    constructor(props){
        super(props);
        this.state={
            FirstName:"",
            LastName:"",
            MiddleName:"",
            Email:"",
            City:"",
            Password:"",
            Pincode:0,
            State:"",
            isFormValid:true,
            isFirstName:true

        };

    }
    clear=(evt)=>{
        this.setState({FirstName:""});
        this.setState({LastName:""});
        this.setState({MiddleName:""});
        this.setState({Email:""});
        this.setState({City:""});
        this.setState({Password:""});
        this.setState({State:""});
        this.setState({Pincode:0});
    }
    setValue(val){
        this.setState({isFirstName:val});
    }
    putValues=(evt)=>{
        this.setState({[evt.target.name]:evt.target.value},()=>{
            console.log(this.state.FirstName);
        });
    }
    render(){
        return(
            <div className="container"> <h3>Validation Form Summary</h3>
            <table className="table table-bordred table-striped">
              <tbody>
                <tr>
                  <td>
                    <table className="table table-bordred table-striped">
                      <tbody>
                        <tr>
                          <td>First Name</td>
                          <td>
                            <input
                              type="text"
                              name="FirstName"
                              onChange={this.putValues.bind(this)}
                              className="form-control"
                              value={this.state.FirstName}
                            />
                            <ValidationSummary
                            property={this.state.FirstName}
                            propertyname="First Name"></ValidationSummary>
                            
                          </td>
                          
                        </tr>
                        <tr>
                          <td>Last Name</td>
                          <td>
                            <input
                              type="text"
                              name="LastName"
                              value={this.state.LastName}
                              onChange={this.putValues.bind(this)}
                              className="form-control"
                            />
                            <ValidationSummary
                            property={this.state.LastName}
                            propertyname="Last Name"></ValidationSummary>
                          </td>
                        </tr>
                        <tr>
                          <td>Password</td>
                          <td>
                            <input
                              type="password"
                              className="form-control"
                              name="Password"
                              value={this.state.Password}
                              onChange={this.putValues.bind(this)}

                            />
                             <ValidationSummary
                            property={this.state.Password}
                            propertyname="Password"></ValidationSummary>
                          </td>
                        </tr>
                        <tr>
                          <td>State</td>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              name="State"
                              value={this.state.State}

                              onChange={this.putValues.bind(this)}

                            />
                             <ValidationSummary
                            property={this.state.State}
                            propertyname="State"></ValidationSummary>
                          </td>
                        </tr>
                       
                      </tbody>
                    </table>
                  </td>
                  <td>
                    <table className="table table-bordred table-striped">
                      <tbody>
                        <tr>
                          <td>Middle Name</td>
                          <td>
                            <input
                              type="text"
                              name="MiddleName"
                              className="form-control"
                              value={this.state.MiddleName}

                              onChange={this.putValues.bind(this)}

                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Email</td>
                          <td>
                            <input
                              type="text"
                              name="Email"
                              className="form-control"
                              value={this.state.Email}

                             onChange={this.putValues.bind(this)}

                            />
                             <ValidationSummary
                            property={this.state.Email}
                            propertyname="Email"></ValidationSummary>
                          </td>
                        </tr>
                        <tr> 
                          <td>City</td>
                          <td>
                            <input
                              type="text"
                              name="City"
                              className="form-control"
                              value={this.state.City}

                             onChange={this.putValues.bind(this)}

                            />
                             <ValidationSummary
                            property={this.state.City}
                            propertyname="City"></ValidationSummary>
                          </td>
                        </tr>
                        <tr> 
                          <td>Pincode</td>
                          <td>
                            <input
                              type="number"
                              name="Pincode"
                              className="form-control"
                              value={this.state.Pincode}
                             onChange={this.putValues.bind(this)}
                            />
                             <ValidationSummary
                            property={this.state.Pincode}
                            propertyname="Pincode"></ValidationSummary>
                          </td>
                        </tr>
                        
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <center>
                <input type="button" value="Clear"
                    onClick={this.clear.bind(this)}
                    className="btn btn-primary"
                />
                <input type="button" value="Register"
                    // onClick={this.register.bind(this)}
                     disabled={!this.state.isFormValid}
                    className="btn btn-success"
                />
            </center>    
            </div>
        )
    }
}

export default ValidationForm;