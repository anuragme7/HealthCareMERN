import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css'

// import Calc from './components/calculator/wincalc'

//import EmployeeFormComponentReusable from './components/employeeformcomponent/employeeformcomponentreusable';

// import CheckBoxandRadio from './components/checkBoxandRadio20-09/checkboxandRadio20-09';

// import MultiSelect from './components/multiselect20-09/multiselect20-09';

// import DataTable from './components/dataTableComponent/dataTable';
import reportWebVitals from './reportWebVitals';
import ValidationForm from './components/ValidationSummary22-09/ValidationForm';
//import ValidationFormDiv from './components/ValidationSummary22-09/ValidationFormreturningdiv';
ReactDOM.render(
  <React.StrictMode>
    {/* <Calc /> */}
   {/* < CheckBoxandRadio /> */}
   {/* <MultiSelect /> */}
   {/* <DataTable /> */}
   {/* <ValidationFormDiv /> */}
   <ValidationForm/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
