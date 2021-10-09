import React, { Component } from "react";
class DropDownComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleChange=(evt)=>{
      this.props.selectValue(evt.target.value);
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
      return <select 
         value={this.props.stateProperty}
         onChange={this.handleChange.bind(this)}
       ><option disabled hidden selected></option>
            {
                this.props.dataSource.map((rec,idx)=>(
                    <option key={idx} value={rec}>{rec}</option>
                ))
            }
      </select>;
    }
  }
}

export default DropDownComponent;
