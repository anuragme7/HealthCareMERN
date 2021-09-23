import React, { Component } from "react";

import Componentcheckandraio from './Componentcheckandradio';

class CheckBoxandRadio extends Component{
    constructor(props){
        super(props);
        this.state={
            list:['C','C++','Nodejs','Reactjs','JavaScript','CSS','HTML5','MySql','AWS','Azure'],
            selectedRadio:"",
            selectedCheck:[]
        };
    }
    radVal(value){
        this.setState({selectedRadio:value},()=>{
            
        });
        
    }
    chkVal(value){
        let temp=this.state.selectedCheck.slice();
        let check=true;
        temp.forEach((rec,id)=>{
            if(rec===value){
                temp.splice(id,1);
                check=false;
            }
        })
        if(check){
            temp.push(value);
        }
        this.setState({selectedCheck:temp},()=>{
        })

    }
    render(){
        return(
            
            <div className="Container">
                <h2>Checkbox and Radio 20-09</h2>
                <form >
                    <div className="form-group">
                        <label>CheckBox and Radio</label>
                        <Componentcheckandraio dataSource={this.state.list}
                        selectedChk={this.state.selectedCheck}
                        chkValue={this.chkVal.bind(this)}
                        selectedRad={this.state.selectedRadio}
                        radValue={this.radVal.bind(this)}
                        ></Componentcheckandraio>
                    </div>
                </form>
                <br /><br />
                <div className="container">
                    <strong>
                    The Radio value is:
                        {JSON.stringify(this.state.selectedRadio)}
                    </strong>
                </div>
                <div className="container">
                    <strong>
                    The Checkbox values are:
                        {JSON.stringify(this.state.selectedCheck)}
                    </strong>
                </div>
            </div>

        )
    }
}

export default CheckBoxandRadio;