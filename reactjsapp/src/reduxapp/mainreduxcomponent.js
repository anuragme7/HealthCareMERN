import React, { useEffect } from 'react';

import {useDispatch, useSelector} from 'react-redux'; 
import addDepartment from './actions/actions';
import showDepartment from './actions/showdeptaction';
import CreateDepartmentReduxComponent from './views/createdept';
import ListDepartmentsReduxComponent from './views/listdepts';
const MainReduxComponent=(props)=>{
    let dispatch = useDispatch();
    let depts = useSelector(state=>state.listDepartmentsReducer);
    let deptone = useSelector(state=>state.showDept);
   
  return (
        <div className="container">
            <h1>The React Redux Application</h1>
            {/* oneDept={deptone} */}
            {/* onClick={props.onClick} newDept={props.addDept} */}
            <CreateDepartmentReduxComponent oneDept={deptone} newDept={props.newDept} onClick={props.onClick}
             AddDepartment= {(department)=> dispatch(addDepartment(department))}></CreateDepartmentReduxComponent>
            <hr />
            <ListDepartmentsReduxComponent
             departments={depts}
             ShowDepartment={(dept)=>dispatch(showDepartment(dept))}></ListDepartmentsReduxComponent>
        </div>

  );
};

export default MainReduxComponent;
