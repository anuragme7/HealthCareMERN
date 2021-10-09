import React, { useState,useEffect } from "react";
const CreateDepartmentReduxComponent = (props) => {
  const [dept, setDept] = useState({
    DeptNo: 0,
    DeptName: '',
    Location: '',
    Capacity: 0,
  });

   
  const [errors,setErrors] =useState([]);

  const clear = () => {
    setDept({
      DeptNo: 0,
      DeptName: "",
      Location: "",
      Capacity: 0,
    });
    setErrors([]);
  };

  const save=()=>{
    let temperror=[];
    if(dept.DeptNo<=0){
      temperror.push('DeptNo should have positive value');
    }
    if(dept.DeptName===undefined || dept.DeptName.length===0){
      temperror.push('DeptName is mandatory');
    }
    if(dept.Location===undefined || dept.Location.length===0){
      temperror.push('Location is mandatory');
    }
    if(dept.Capacity<=0){
      temperror.push('Capacity should have positive value');
    }
   if(temperror.length===0){
      props.AddDepartment(dept); 
      setErrors([]);
   }
   else{
    setErrors(temperror);
    }
  };
  useEffect(()=>{
    if(props.oneDept!==undefined&&props.oneDept.length!==0){
      console.log(props.oneDept);
      console.log(props.oneDept.length);
      setDept({
        DeptNo:props.oneDept[0].DeptNo,
        DeptName:props.oneDept[0].DeptName,
        Location:props.oneDept[0].Location,
        Capacity:props.oneDept[0].Capacity,
      });
    } 
  },[props.oneDept])

  useEffect(()=>{
    if(props.newDept!==undefined){
      console.log(props.newDept);
      setDept({
        DeptNo:props.newDept.DeptNo,
        DeptName:props.newDept.DeptName,
        Location:props.newDept.Location,
        Capacity:props.newDept.Capacity,
      });
    } 
  },[props.newDept])
  return (
    <div className="container">
      <form>
        <div className="form-group">
          <label htmlFor="DeptNo">DeptNo *</label>
          <input
            type="text"
            name="DeptNo"
            className="form-control"
            value={dept.DeptNo}
            onChange={(evt) =>
              setDept({ ...dept, DeptNo: parseInt(evt.target.value) })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="DeptName">DeptName *</label>
          <input
            type="text"
            name="DeptName"
            className="form-control"
            value={dept.DeptName}
            onChange={(evt) => setDept({ ...dept, DeptName: evt.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Location">Location *</label>
          <input
            type="text"
            name="Location"
            className="form-control"
            value={dept.Location}
            onChange={(evt) => setDept({ ...dept, Location: evt.target.value })}
          />
          <div className="form-group">
            <label htmlFor="Capacity">Capacity *</label>
            <input
              type="text"
              name="Capacity"
              className="form-control"
              value={dept.Capacity}
              onChange={(evt) =>
                setDept({ ...dept, Capacity: parseInt(evt.target.value) })
              }
            />
          </div>
        </div>
        <hr />
        <div className="btn-group">
          <input type="button" value="Clear" className="btn btn-primary" onClick={clear} />
          <input type="button" value="Save" id='but' className="btn btn-success" 
          onClick={()=>{
               props.onClick(); 
              save();
              }}/>
        </div>
      </form>
      <hr />
      <div className='dv'>
        {
          JSON.stringify(errors)
        }
      </div>
    </div>

  );
};

export default CreateDepartmentReduxComponent;
