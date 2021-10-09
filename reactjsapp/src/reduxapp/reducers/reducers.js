
import {combineReducers} from 'redux';


export const addDepartmentReducer=(state,action)=>{
    switch(action.type) {
        case 'ADD_DEPARTMENT':
            // the state will contain tthew newly created department object
            return {
                department: action.department // this is returned from 
                // the addDepartment action see actions.js
            };                 
        default:
             return state; // return a default state       
    }
};

export const listDepartmentsReducer=(state=[], action)=>{
    switch(action.type){
        case 'ADD_DEPARTMENT':
            return [...state, addDepartmentReducer(undefined,action)];
        default:
            return state;    
    }   
}

export const showDept=(state=[],action)=>{
    switch(action.type){
        case 'SHOW_DEPARTMENT':
            state=[action.dept];
            return state;
        default:
            return state;    
    }
}


const reducers = combineReducers({listDepartmentsReducer,showDept});

export default reducers;