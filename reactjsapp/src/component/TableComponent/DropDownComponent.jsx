import React from "react";
const DropDownComponent =(props)=> {
    if (props.dataSource === undefined || props.dataSource.length===0) {
        return (
        <div className="container">
            <strong>
            The data passed to the component is not present or undfined
            </strong>
        </div>
        );
    } else {
        return <select className="form-control" disabled={props.disabled}
            value={props.stateProperty}
            onChange={(evt)=>props.selectedValue(evt.target.value)}
        >
            <option selected hidden></option>
            <option hidden={!props.others} value="Others">Others</option>
            {
                props.dataSource.map((rec,idx)=>(
                    <option key={idx} value={rec[props.id]}>{`${rec[props.id]} - ${rec[props.name]}`}</option>
                ))
            }
        </select>;
    }
}
export default DropDownComponent;
