import React, { Component } from "react";
import ValidationSummary from "./ValidationSummary";
import "./styleme.css"
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
            propertyNames:["FirstName","LastName","MiddleName","Email","City","Password","Pincode","State"],
            errors:[]

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
        this.setState({errors:[]});
    }
    setValue(val){
        this.setState({isFirstName:val});
    }
    validateValues=(property,textvalue)=>{
        let temp=this.state.errors.slice();
        if(textvalue===undefined||parseInt(textvalue)===0||textvalue.length===0){
            temp.push(`* Value required for ${property}`);
            this.setState({isFormValid:false});
        }
        else{
            let x=temp.indexOf(`* Value required for ${property}`);
            if(x!==-1){temp.splice(x,1);}
            this.setState({isFormValid:true});
        }
        this.setState({errors:temp},()=>{});
        console.log(this.state.errors);
    }
    putValues=(evt)=>{
        this.setState({[evt.target.name]:evt.target.value});
        this.validateValues(evt.target.name,evt.target.value);
    }
    register=(evt)=>{
        // let x=<ValidationSummary></ValidationSummary>;
        
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
                          <td className="fields">First Name</td><td className="star">*</td>
                          <td>
                            <input
                              type="text"
                              name="FirstName"
                              onChange={this.putValues.bind(this)}
                              className="form-control"
                              value={this.state.FirstName}
                            />
                          </td>
                          
                        </tr>
                        <tr>
                          <td className="fields">Last Name</td><td className="star">*</td>
                          <td>
                            <input
                              type="text"
                              name="LastName"
                              value={this.state.LastName}
                              onChange={this.putValues.bind(this)}
                              className="form-control"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="fields">Password</td><td className="star">*</td>
                          <td>
                            <input
                              type="password"
                              className="form-control"
                              name="Password"
                              value={this.state.Password}
                              onChange={this.putValues.bind(this)}

                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="fields">State</td><td className="star">*</td>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              name="State"
                              value={this.state.State}

                              onChange={this.putValues.bind(this)}

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
                          <td className="fields">Middle Name</td><td className="star">*</td>
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
                          <td className="fields">Email</td><td className="star">*</td>
                          <td>
                            <input
                              type="text"
                              name="Email"
                              className="form-control"
                              value={this.state.Email}

                             onChange={this.putValues.bind(this)}

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

                             onChange={this.putValues.bind(this)}

                            />
                          </td>
                        </tr>
                        <tr> 
                          <td className="fields">Pincode</td><td className="star">*</td>
                          <td>
                            <input
                              type="number"
                              name="Pincode"
                              className="form-control"
                              value={this.state.Pincode}
                             onChange={this.putValues.bind(this)}
                            />
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
                     onClick={this.register.bind(this)}
                     disabled={!this.state.isFormValid}
                    className="btn btn-success"
                />
                <ValidationSummary
                errors={this.state.errors}></ValidationSummary>
            </center>    
            </div>
        )
    }
}

export default ValidationForm;