import React,{Component} from "react";

class ValidationSummary extends Component{
    render(){
        if(this.props.errors===undefined||this.props.errors.length===0){
            return null;
        }
        else{
            return (
                <div>
                { 
                    this.props.errors.map((val,keyx)=>(
                        <div className="styleme" key={keyx}>{val}</div>
                    ))
                }
                </div>
            )
        }
    }
}

export default ValidationSummary;