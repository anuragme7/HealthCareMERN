import React from 'react';
import {render,unmountComponentAtNode} from 'react-dom';
import {act} from 'react-dom/test-utils';
import MainReduxComponent from './../reduxapp/mainreduxcomponent';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducers from './../reduxapp/reducers/reducers';
let store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__());
describe('Test suit for new row in Table', () => {
    let dept={
        DeptNo:10,
        Location:'Pune',
        DeptName:'IT',
        Capacity:23
    }
    let domContainer = null;

    beforeEach(()=>{
        domContainer = document.createElement('div');
        document.body.appendChild(domContainer);
    });
    it('New row added in the table when save button is clicked',()=>{
        const onClick = jest.fn(); 
        act(()=>{
            render(<Provider store={store}><MainReduxComponent onClick={onClick} newDept={dept}/></Provider>, domContainer);
        });      
        const button  =document.querySelector('#but');
        expect(button.value).toBe('Save');

        act(()=>{
              button.dispatchEvent(new MouseEvent('click', {bubbles:true}));
        });
        expect(onClick).toHaveBeenCalledTimes(1);

        const deptno= document.querySelector('.deptno'); 
        expect(deptno.innerHTML).toBe('10');
        const deptname= document.querySelector('.deptname'); 
        expect(deptname.innerHTML).toBe('IT');
        const location= document.querySelector('.location'); 
        expect(location.innerHTML).toBe('Pune');
        const capacity= document.querySelector('.capacity'); 
        expect(capacity.innerHTML).toBe('23');
    });

    

    afterEach(()=>{
        unmountComponentAtNode(domContainer);
        domContainer.remove();
        domContainer  =null;
    });
    
});

