import React, { useState, useEffect } from "react";
import './Registered.css';
import { TempUserService } from "../services/TempUserService";
import { TempStaffService } from "../services/TempStaffService";
import DropDownComponent from "../TableComponent/DropDownComponent";

const RegisterUser = (props) => {
    const [User, setUser] = useState({
        Fname: "",
        Mname: "",
        Lname: "",
        Address: "",
        City: "",
        DateOfBirth: "",
        Gender: "",
        Email: localStorage.getItem("Email"),
        MobNo: "",
        EmergencyContact: "",
        IdCard: "",
        RoleId:""
    });
    const [message, setMessage] = useState('');
    const userserv = new TempUserService();
    const staffserv = new TempStaffService();
    const [roles, setRoles] = useState([]);

    const [validation,setValidation]=useState(
        {
            Fname:{
                required:true,
                minlen:2,
                maxlen:20,
                error:true,
                errorm:"First Name is required",
                field:'First Name'
            },
            Lname:{
                required:true,
                minlen:2,
                maxlen:20,
                error:true,
                errorm:"Last Name is required",
                field:'Last Name'
            },
            Mname:{
                required:false,
                minlen:0,
                maxlen:20,
                error:false,
                errorm:"",
                field:'Middle Name'
            },
            Address:{
                required:true,
                minlen:5,
                maxlen:100,
                error:true,
                errorm:"Address is required",
                field:'Address'
            },
            Gender:{
                required:true,
                error:true,
                minlen:3,
                maxlen:10,
                errorm:"Gender is required",
                field:'Gender'
            },
            DateOfBirth:{
                required:true,
                error:true,
                errorm:"Date Of Birth is required",
                field:'Date Of Birth'
            },
            RoleId:{
                required:true,
                error:true,
                errorm:"Role Id is required",
                field:'Role Id'
            },
            MobNo:{
                required:true,
                minlen:9,
                maxlen:15,
                error:true,
                errorm:"Mobile No is required",
                field:'Mobile No'
            },
            IdCard:{
                required:false,
                minlen:0,
                maxlen:15,
                error:false,
                errorm:"",
                field:'Identity Card'
            },
            City:{
                required:true,
                minlen:3,
                maxlen:20,
                error:true,
                errorm:"City is required",
                field:'City'
            },
            EmergencyContact:{
                required:false,
                minlen:0,
                maxlen:20,
                error:false,
                errorm:"",
                field:'Emergency Contact'
            },
        }
    );

    const clear = () => {
        let tempvalidate={...validation};
        Object.keys(tempvalidate).forEach((rec) => {
            console.log(JSON.stringify(rec));
            if (tempvalidate[rec].required) {
                tempvalidate[rec].error = true;
                tempvalidate[rec].errorm = `${tempvalidate[rec].field} is required`;;
            } else {
                tempvalidate[rec].errorm = '';
            }
        })
        setUser({
            Fname: "",
            Mname: "",
            Lname: "",
            Address: "",
            City: "",
            DateOfBirth: "",
            Gender: "",
            MobNo: "",
            EmergencyContact: "",
            IdCard: "",
            RoleId:""
        });
        console.log('...........');
        console.log(JSON.stringify(tempvalidate));
        setValidation(tempvalidate);
    };
    const selectChange=(name,val)=>{
        console.log('select chagne');
        setUser({...User,[name]:val});
        console.log('Nmae');
        console.log(name)
        console.log(val);
        validate(name,val);
    }
    const handleChange=(evt)=>{
        setUser({ ...User, [evt.target.name]: evt.target.value });
        validate(evt.target.name,evt.target.value);
    }
    const validate = (name, value) => {
        const tempValidate =validation;
        if (tempValidate[name].required && value.length === 0) {
            setValidation({ ...validation, 
                [name]:{
                    ...validation[name]
                    ,error:true,
                    errorm:`${tempValidate[name].field} is required`
                    } 
                 });
        }else if (value.length <= tempValidate[name].minlen) {
            setValidation({ ...validation, 
                [name]:{
                    ...validation[name]
                    ,error:true,
                    errorm:`${tempValidate[name].field}'s length must be greater than ${tempValidate[name].minlen}`
                    } 
                 });
        } 
        else if ((value.length > tempValidate[name].minlen) && !(value.length < tempValidate[name].maxlen)) {
            setValidation({ ...validation, 
                [name]:{
                    ...validation[name]
                    ,error:true,
                    errorm:`${tempValidate[name].field}'s length must be between ${tempValidate[name].minlen} and ${tempValidate[name].maxlen}`
                    } 
                 });
        } else {
            setValidation({ ...validation, 
                [name]:{
                    ...validation[name]
                    ,error:false,
                    errorm:``
                    } 
                 });
            }

    }

    const isFormValid=()=>{
        let tempvalidate=validation;
        let x=Object.keys(tempvalidate).filter((rec,id)=>tempvalidate[rec].error===true);
        if(x.length>0){return true}
        return false;
    }

    const post = () => {
        staffserv
            .postData(User)
            .then((resp) => {
                setMessage(resp.data.message);
                userserv
                .postData({UserId:resp.data.rows.UserId,Email:User.Email,Password:localStorage.getItem("Password")})
                .then((resp) => {
                    setMessage(resp.data.message);
                    localStorage.clear();
                    sessionStorage.clear();
                    // console.log(resp.data.rows);
                    // sessionStorage.setItem("UserId",resp.data.rows.UserId);
                    props.history.push('/registered');
                })
            })
            .catch((error) => {
                setMessage(`Error Occured : ${error.message}`);
            });
        
    }
    useEffect(()=>{
        if(localStorage.getItem("Email")===undefined){
          setMessage("Please Register First to Login this page");
        }
        else{
            userserv
            .getRoles()
            .then((resp) => {
                setMessage(resp.data.message);
                setRoles(resp.data.rows);
            })
            .catch((error) => {
                setMessage(`Error Occured : ${error.message}`);
            });
         }
      },[]);
    const login = () => {
        localStorage.clear();
        sessionStorage.clear();
        props.history.push('/');
    }
    return (
        <div className="container-lg">
            <h3>Add Registeration Details</h3>
            <div className="container">
                <strong>{message}</strong><br />
            </div>
            <table id="sb" className="table table-bordred table-striped">
            <tbody>
                <tr>
                <td>
                    <table className="table table-bordred">
                        <tbody>
                            <tr>
                                <td className="names">First Name</td><td className="star">*</td>
                                <td>
                                    <input
                                        type="text"
                                        name="Fname"
                                        onChange={handleChange}
                                        className="form-control"
                                        value={User.Fname}
                                    />
                                    <div style={{color:'red'}}>{validation.Fname.errorm}</div>
                                </td>

                            </tr>
                            <tr>
                                <td className="names">Last Name</td><td className="star">*</td>
                                <td>
                                    <input
                                        type="text"
                                        name="Lname"
                                        value={User.Lname}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                    <div style={{color:'red'}}>{validation.Lname.errorm}</div>
                                </td>
                            </tr>
                            <tr>
                                <td className="names">Identity Card</td><td></td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="IdCard"
                                        value={User.IdCard}
                                         onChange={handleChange}
                                    />
                                    <div style={{color:'red'}}>{validation.IdCard.errorm}</div>

                                </td>
                            </tr>
                            <tr>
                                <td className="names">Date Of Birth</td><td className="star">*</td>
                                <td>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="DateOfBirth"
                                        value={User.DateOfBirth}
                                         onChange={handleChange}
                                    />
                                    <div style={{color:'red'}}>{validation.DateOfBirth.errorm}</div>

                                </td>
                            </tr>
                            <tr>
                                <td className="names">Address</td><td className="star">*</td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="Address"
                                        value={User.Address}
                                         onChange={handleChange}
                                    />
                                    <div style={{color:'red'}}>{validation.Address.errorm}</div>

                                </td>
                            </tr>
                            <tr>
                                <td className="names">MobNo</td><td className="star">*</td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="MobNo"
                                        value={User.MobNo}
                                        onChange={handleChange}
                                    />    
                                    <div style={{color:'red'}}>{validation.MobNo.errorm}</div>

                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input
                                        type="button"
                                        value="Register"
                                        disabled={isFormValid()}
                                        onClick={post}
                                        className="btn btn-success"
                                    /></td>
                                <td>
                                    <input
                                        type="button"
                                        value="Clear"
                                        onClick={clear}
                                        className="btn btn-primary"
                                    />
                                </td>
                             </tr>
                             <tr>
                                 <td>
                                 <input
                                        type="button"
                                        value="Login?"
                                        onClick={login}
                                        className="btn btn-danger"
                                    />
                                 </td>
                             </tr>
                    </tbody>
                </table>
                </td>
                <td>
                <table className="table table-bordred ">
                    <tbody>
                        <tr>
                            <td className="names">Middle Name</td><td></td>
                            <td>
                                <input
                                    type="text"
                                    name="Mname"
                                    className="form-control"
                                    value={User.Mname}
                                    onChange={handleChange}
                                />
                                    <div style={{color:'red'}}>{validation.Mname.errorm}</div>

                            </td>
                        </tr>
                        <tr>
                            <td className="names">Role Id</td><td className="star">*</td>
                            <td>
                                <DropDownComponent
                                dataSource={roles} stateProperty={User.RoleId} id={"RoleId"} name={"RoleName"}
                                selectedValue={(val)=>selectChange('RoleId',val)}></DropDownComponent>
                            <div style={{color:'red'}}>{validation.RoleId.errorm}</div>

                            </td>
                        </tr>
                        <tr>
                            <td className="names">Email</td><td className="star">*</td>
                            <td>
                                <input
                                    type="text"
                                    name="Email"
                                    className="form-control"
                                    value={User.Email}
                                    disabled
                                     onChange={handleChange}
                                />

                            </td>

                        </tr>
                        <tr>
                            <td className="names">Gender</td><td className="star">*</td>
                            <td>
                                <select
                                    name="Gender"
                                    className="form-control"
                                    value={User.Gender}
                                    onChange={handleChange}
                                ><option selected disabled hidden></option><option value="Male">Male</option><option value="Female">Female</option><option value="Others">Others</option></select>
                            <div style={{color:'red'}}>{validation.Gender.errorm}</div>
                            </td>
                        </tr>
                        <tr>
                            <td className="names">City</td><td className="star">*</td>
                            <td>
                                <input
                                    type="text"
                                    name="City"
                                    className="form-control"
                                    value={User.City}
                                    onChange={handleChange}
                                />     
                            <div style={{color:'red'}}>{validation.City.errorm}</div>

                            </td>
                        </tr>
                        <tr>
                            <td className="names">Emergency Contact</td><td></td>
                            <td>
                                <input
                                    type="text"
                                    name="EmergencyContact"
                                    className="form-control"
                                    value={User.EmergencyContact}
                                     onChange={handleChange}
                                />
                            <div style={{color:'red'}}>{validation.EmergencyContact.errorm}</div>

                            </td>
                        </tr>
                    </tbody>
                </table>
                </td>
                </tr>
               
            </tbody>
            </table>
        </div>


    );
}

export default RegisterUser;
