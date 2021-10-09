import React from 'react';
import {render,unmountComponentAtNode} from 'react-dom';
import {act} from 'react-dom/test-utils';
import CreateDepartmentReduxComponent from './../reduxapp/views/createdept';

describe('Test suit for the Create Departments', () => {
    let errors=['DeptNo should have positive value','DeptName is mandatory','Location is mandatory','Capacity should have positive value']
   
    let domContainer = null;

    beforeEach(()=>{
        domContainer = document.createElement('div');
        document.body.appendChild(domContainer);
    });
    it('validation must be shown with save button clicked with default or no values',()=>{
        const onClick = jest.fn(); 
        act(()=>{
            render(<CreateDepartmentReduxComponent onClick={onClick}/>, domContainer);
        });      
        const button  =document.querySelector('#but');
        expect(button.value).toBe('Save');
        
        act(()=>{
              button.dispatchEvent(new MouseEvent('click', {bubbles:true}));
        });
        expect(onClick).toHaveBeenCalledTimes(1);
        const div = document.querySelector('.dv');
        expect(div.innerHTML).toBe(JSON.stringify(errors));
    });

    

    afterEach(()=>{
        unmountComponentAtNode(domContainer);
        domContainer.remove();
        domContainer  =null;
    });
    
});

