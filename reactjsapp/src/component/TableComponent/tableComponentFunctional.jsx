import React, { useContext } from "react";

import { DataContext } from "./datacontext";
const TableComponentFunctional = (props) => {

  const subscriber = useContext(DataContext);
  let dataSource = subscriber[Object.keys(subscriber)[0]]; 
  let action = subscriber[Object.keys(subscriber)[2]]; // dispatchAction
  let allot = subscriber[Object.keys(subscriber)[3]]; // dispatchAction
  let columnHeaders = subscriber[Object.keys(subscriber)[1]]; // headers
  if (dataSource=== undefined ||dataSource.length===0) {
    return <div className="alert alert-danger">No records to display</div>;
  } else {
      if(columnHeaders===undefined){
        columnHeaders=Object.keys(dataSource[0]);
      }
    return (
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr className="table-dark">
              {columnHeaders.map((head, idx) => (
                <th key={idx}>{head}</th>
              ))}
              <th hidden={!props.canDetails}>Get Details</th>
              <th hidden={!props.allotDoc}>Allot Doctor</th>
              <th hidden={!props.Observation}>Observations</th>


            </tr>
          </thead>

          <tbody style={{color:'#2F4050',fontWeight:'600'}}>
            {dataSource.map((row, idx) => (
              
              <tr key={idx}>
                {columnHeaders.map((head, i) => (
                  <td key={i}>{row[head]}</td>
                ))}
                 <td hidden={!props.canDetails} >
                   <input type="button" value="Get Details" className="btn btn-primary" onClick={()=>action(row[props.id])}/>
                 </td>
                 <td hidden={!props.allotDoc} >
                   <input type="button" value="Allot Doctor" className="btn btn-danger" onClick={()=>allot(row[props.id])}/>
                 </td>
                 <td hidden={!props.Observation} >
                   <input type="button" value="Observations" className="btn btn-danger" onClick={()=>props.getObservations(row[props.id])}/>
                 </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};

export default TableComponentFunctional;
