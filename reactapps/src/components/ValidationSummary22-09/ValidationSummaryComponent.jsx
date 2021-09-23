import React,{Component} from "react";

class ValidationSummary extends Component{
    constructor(props){
        super(props);
        this.state={

        };

    }
    // func(val){
    //     this.props.Value(val);
    // }
    render(){

        if(this.props.property===undefined||this.props.property===0||this.props.property.length===0){
           return (<div className="alert alert-danger" hidden={false}>
                {this.props.propertyname} is Required
            </div>)
        }
        else return (null)

        //return null;
    }
}

export default ValidationSummary;