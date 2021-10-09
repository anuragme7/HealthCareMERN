import React, { Component } from "react";
import './multsel.css'
import Componentmultiselect from './Componentmultiselect'
class MultiSelect extends Component{
    constructor(props){
        super(props);
        this.state={
            list:['C','C++','Nodejs','Reactjs','JavaScript','CSS','HTML5','MySql','AWS','Azure'],
            selected:[]
        };
    }
    selectedValue(values){
        this.setState({selected:values},()=>{console.log(this.state.selected);})
    }
    render(){
        return(
            <div className="Container">
                <h2>Multi Select 20-09</h2>
                <form >
                    <div className="form-group">
                        <Componentmultiselect dataSource={this.state.list}
                         selectedChk={this.state.selected}
                        selectedVal={this.selectedValue.bind(this)}
                        ></Componentmultiselect>
                    </div>
                </form>
                <br /><br />
                <div className="container">
                    <strong>
                    The Multi-selected values are:
                        {JSON.stringify(this.state.selected)}
                    </strong>
                </div>
            </div>

        )
    }
}

export default MultiSelect;