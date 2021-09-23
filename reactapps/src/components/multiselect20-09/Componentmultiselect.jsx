import React, { Component } from "react";
class Componentmultiselect extends Component {
  constructor(props) {
    super(props);
    this.state = {
        values:[]
    };
  }
  handleChange=(evt)=>{
      //console.log(evt.target.options);
    let temp=[];
    for(let i=0;i<evt.target.options.length;i++){
        if(evt.target.options[i].selected){
            temp.push(evt.target.options[i].value);
        }
    }
    this.setState({values:temp},()=>{
    });
  }
  sendValues=(evt)=>{
    this.props.selectedVal(this.state.values);
  }
  render() {
    if (this.props.dataSource === undefined) {
      return (
        <div className="container">
          <strong>
            The data passed to the component is not present or undfined
          </strong>
        </div>
      );
    } else {
      return(
            <div>
                <select multiple id="mult" className="form-control"
                onChange={this.handleChange.bind(this)} onMouseLeave={this.sendValues.bind()} onKeyUp={this.sendValues.bind()}>
                    {
                        this.props.dataSource.map((rec,idx)=>(
                            <option key={idx} value={rec}>{rec}</option>
                        ))
                    }
                </select>;
                {/* <input type="button" value="Save" onClick={this.sendValues.bind()} /> */}
            </div>
        )
    }
  }
}

export default Componentmultiselect;
