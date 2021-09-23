import React, { Component } from "react";
class Componentcheckandradio extends Component {
  constructor(props) {
    super(props);
    this.state = {
        allcheck:[],
        rad:""
    };
  }
  handleChange=(evt)=>{
      this.props.radValue(evt.target.value);
  }
  handleChangeChk=(evt)=>{
      this.props.chkValue(evt.target.value);
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
            <div className="form-group">
                <label>Select Courses</label> <br />
            { 
                this.props.dataSource.map((rec,idx)=>(
                    <label className="form-check-label">
                    <input type="checkbox" className="form-check-input" onClick={this.handleChangeChk.bind(this)} name="chkcourses" key={`c${idx}`} value={rec} /> {rec} 
                    </label>
                ))
            }
            </div>
            <br />
            <div className="form-group">
            <label>Select Course</label> <br />
            { 
                this.props.dataSource.map((rec,idx)=>(
                    <label className="form-check-label">
                    <input type="radio" className="form-check-input" onClick={this.handleChange.bind(this)} name="radcourses" key={`r${idx}`} value={rec} /> {rec} 
                    </label>
                ))
            }
            </div>
        </div>    
        )
    }
  }
}

export default Componentcheckandradio;
