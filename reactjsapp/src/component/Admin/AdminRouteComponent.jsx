import React, { Component } from "react";
// import classes for defining the Routing INfrastructure
import {BrowserRouter, Route, Redirect, Link, Switch } from "react-router-dom";
import ListComponents from './ListComponents'
import AddRoleComponent from "./Role-Functional/addRoleComponent";

import ListDoctorComponent from "./Doctor/listDoctorsComponent";
import AddDoctorComponent from "./Doctor/addDoctorComponent";
import DoctorById from "./Doctor/DoctorById";

import ListPatientComponent from "./Patient-Functional/listPatientComponent";
import AddPatientComponent from "./Patient-Functional/addPatientComponent";
import PatientById from "./Patient-Functional/PatientById";

import LoginComponent from "../LoginComponent/Login";

class AdminRouteComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="container-lg">
      
        <Switch>
        <Route exact path="/" component={LoginComponent}></Route>

          <Route exact path="/admin/listComponents" component={ListComponents}></Route>

          <Route exact path="/admin/listDoctors" component={ListDoctorComponent}></Route>
          <Route exact path="/admin/addDoctor" component={AddDoctorComponent}></Route>
          <Route exact path="/admin/doctorbyid/:id" component={DoctorById}></Route>


          <Route exact path="/admin/listPatients" component={ListPatientComponent}></Route>
          <Route exact path="/admin/addPatient" component={AddPatientComponent}></Route>
          <Route exact path="/admin/patientbyid/:id" component={PatientById}></Route>

          <Route exact path="/admin/listRoles" component={AddRoleComponent}></Route>

          <Redirect to="/admin/listComponents"></Redirect>
        </Switch>
       
      </div>
    );
  }
}

export default AdminRouteComponent;
