import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import LoginComponent from "../LoginComponent/Login";

import RegisterComponent from "../Register/RegisterEmail";
import RegisterUser from "../Register/RegisterUser";
import Registered from "../Register/Registered";

import CompleteRegisteration from "../SpecificRegisteration/CompleteRegisteration";
import DoctorSpecificRegisteration from "../SpecificRegisteration/DoctorSpecificRegisteration";

// import AdminRouteComponent from "../Admin/AdminRouteComponent";
import RegisterationComplete from "../SpecificRegisteration/RegisterationDone";

import ListDoctorComponent from "../Admin/Doctor/listDoctorsComponent";
import AddDoctorComponent from "../Admin/Doctor/addDoctorComponent";
import DoctorById from "../Admin/Doctor/DoctorById";
import AdminPatientbyDocID from "../Admin/Doctor/showpatientsbydoc";

import ListComponents from '../Admin/ListComponents';

import AddRoleComponent from "../Admin/Role-Functional/addRoleComponent";

import ListPatientComponent from "../Admin/Patient-Functional/listPatientComponent";
import AddPatientComponent from "../Admin/Patient-Functional/addPatientComponent";
import PatientById from "../Admin/Patient-Functional/PatientById";

import WardComponent from "../Admin/Ward-Functional/WardComponent";
import ListNurseComponent from "../Admin/Nurse/listNurseComponent";
import NurseById from "../Admin/Nurse/NurseById";
import ListWardBoyComponent from "../Admin/WardBoy/listWardBotyComponent";
import WardBoyId from "../Admin/WardBoy/WardBoyId";

import ListStaffComponent from "../Admin/Staff/listStaffComponent";
import StaffById from "../Admin/Staff/StaffById";
import ListMedicalComponent from "../Admin/Medical/listmedicalComponent";

import ReceptionistDashBoard from "../Receptionist/ListComponentRecep";
import RecepPatients from "../Receptionist/RecepPatients";
import RecepPatientsById from "../Receptionist/RecepPatientById";
import RecepAddPatients from "../Receptionist/addPatientRecep";
import RecepDoctors from "../Receptionist/RecepDoctors";
import RecepDoctorById from "../Receptionist/RecepDoctorsById";
import AllotDoctorRecep from "../Receptionist/AllotDoctorRecep";
import RecepDoctorPatient from "../Receptionist/RecepPatientDoctor";
import RoomComponent from "../Admin/Room/RoomComponent";
import AddRoomComponent from "../Admin/Room/addRoomComponent";

import DoctorDashboard from "../Doctor/DoctorDashBoard";
import DoctorPatientById from "../Doctor/DoctorPatientById";
import DoctorObservationComponent from "../Doctor/doctorObservation";

class RouteComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className='MyApp'>
        {/* <h2>Welcome to HealthCare</h2> */}
        <BrowserRouter>
        <Switch>
            <Route exact path="/" component={LoginComponent}></Route>
            <Route exact path="/register" component={RegisterComponent}></Route>
            <Route exact path="/register/details" component={RegisterUser}></Route>
            <Route exact path="/registered" component={Registered}></Route>

            <Route exact path="/CompleteRegisteration" component={CompleteRegisteration}></Route>
            <Route exact path="/CompleteRegisteration/Doctor" component={DoctorSpecificRegisteration}></Route>
            <Route exact path="/registerationdone" component={RegisterationComplete}></Route>

            {/* <Route exact path="/Admin" component={AdminRouteComponent}></Route> */}
            {/* {(sessionStorage.getItem('Role')==='Admin')?<div> */}

            <Route exact path="/admin/listComponents" component={ListComponents}></Route>
            <Route exact path="/admin/staff" component={ListStaffComponent}></Route>
            <Route exact path="/admin/staffbyid/:id" component={StaffById}></Route>

            <Route exact path="/admin/listDoctors" component={ListDoctorComponent}></Route>
            <Route exact path="/admin/addDoctor" component={AddDoctorComponent}></Route>
            <Route exact path="/admin/doctorbyid/:id" component={DoctorById}></Route>
            <Route exact path="/admin/patientbydocid/:id" component={AdminPatientbyDocID}></Route>

            <Route exact path="/admin/listPatients" component={ListPatientComponent}></Route>
            <Route exact path="/admin/addPatient" component={AddPatientComponent}></Route>
            <Route exact path="/patientbyid/:id" component={PatientById}></Route>

            <Route exact path="/admin/listRoles" component={AddRoleComponent}></Route>
            <Route exact path="/admin/listwards" component={WardComponent}></Route>
            <Route exact path="/admin/listnurse" component={ListNurseComponent}></Route>
            <Route exact path="/admin/nursebyid/:id" component={NurseById}></Route>
            <Route exact path="/admin/wardboy" component={ListWardBoyComponent}></Route>
            <Route exact path="/admin/wardboyid/:id" component={WardBoyId}></Route>
            <Route exact path="/admin/room" component={RoomComponent}></Route>
            <Route exact path="/admin/addroom" component={AddRoomComponent}></Route>

            <Route exact path="/admin/medical" component={ListMedicalComponent}></Route>
            {/* </div>:(sessionStorage.getItem('Role')==='Doctor')?<div> */}

            <Route exact path="/doctor/dashboard" component={DoctorDashboard}></Route>
            <Route exact path="/doctor/patientbyid/:id" component={DoctorPatientById}></Route>
            <Route exact path="/doctor/docobservation/:id" component={DoctorObservationComponent}></Route>
            {/* </div>:sessionStorage.getItem('Role')==='Receptionist'?<div> */}
            <Route exact path="/recep/listComponent" component={ReceptionistDashBoard}></Route>

            <Route exact path="/recep/patients" component={RecepPatients}></Route>
            <Route exact path="/recep/patientbyid/:id" component={RecepPatientsById}></Route>
            <Route exact path="/recep/addpatient" component={RecepAddPatients}></Route>

            <Route exact path="/recep/doctors" component={RecepDoctors}></Route>
            <Route exact path="/recep/doctorbyid/:id" component={RecepDoctorById}></Route>
            <Route exact path="/recep/allotdoctor/:id" component={AllotDoctorRecep}></Route>

            <Route exact path="/recep/doctorpatient/:id" component={RecepDoctorPatient}></Route>

            {/* </div>:<div></div>} */}
           
            
            {/* Receptionist */}
            
           


        </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default RouteComponent;
