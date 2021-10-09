import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import RouteComponent from './components/HealthCareRoute/RouteComponent';
//import './index.css';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
// import {createStore} from 'redux';
// import {Provider} from 'react-redux';
// import reducers from './reduxapp/reducers/reducers';
// import MainReduxComponent from './reduxapp/mainreduxcomponent';
// let store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__());
// SideBar

//import SideBar from './components/SideBar/SideBar';

// import Calc from './components/calculator/wincalc'

//import EmployeeFormComponentReusable from './components/employeeformcomponent/employeeformcomponentreusable';

// import CheckBoxandRadio from './components/checkBoxandRadio20-09/checkboxandRadio20-09';

// import MultiSelect from './components/multiselect20-09/multiselect20-09';

// import DataTable from './components/dataTableComponent/dataTable';


// import ValidationForm from './components/ValidationSummary22-09/ValidationForm';
// import DoctorComponent from './components/Doctor/DoctorComponent';
//import ValidationFormDiv from './components/ValidationSummary22-09/ValidationFormreturningdiv';
// import LoginComponent from './components/Doctor/Login';
//import ListPatientComponent from './components/Patient/listPatientComponent';
ReactDOM.render(
  <React.StrictMode>
    {/* <Calc /> */}
   {/* < CheckBoxandRadio /> */}
   {/* <MultiSelect /> */}
   {/* <DataTable /> */}
   {/* <ValidationFormDiv /> */}
   {/* <ValidationForm/> */}
   {/* <DoctorComponent/> */}
   {/* <Provider store={store}>
        <MainReduxComponent></MainReduxComponent>
      </Provider> */}
   <BrowserRouter>
   <RouteComponent />
   </BrowserRouter>
   {/* <ListPatientComponent />
    */}
    {/* <SideBar/> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
