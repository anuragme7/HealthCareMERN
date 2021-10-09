import React, { useEffect,useState } from "react";
import './doctor.css';

const ShowObservationsComponent = (props) => {

  if (props.dataSource=== undefined ||props.dataSource.length===0) {
    return <div className="alert alert-danger">No records to display</div>;
  } else {
     
    let columnHeaders=Object.keys(props.dataSource[0]);
    return (
      <div className="table-responsive">
            {props.dataSource.map((row, idx) => (
              
              <div>
                 <strong>{idx+1}.</strong> Recorded At - <strong>
                 <GetStandardDate sendDate={row.createdAt}></GetStandardDate>
                 </strong> <br /><br />
                 <div className='obs'>Observation -- {row.Observation}</div><br />
                 {/* Updated At - <strong>
                 <GetStandardDate sendDate={row.updatedAt}></GetStandardDate>
                 </strong><br /><br /> */}
              </div>
            ))}

      </div>
    );
  }
};

const GetStandardDate =(props)=>{
    const [date,setDate]=useState('');
    useEffect(()=>{
         setDate(new Date(props.sendDate));
    },[props.sendDate])
    return date.toString().substr(0,25)
}

export default ShowObservationsComponent;
