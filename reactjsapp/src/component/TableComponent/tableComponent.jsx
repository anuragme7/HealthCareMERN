import React, { Component } from "react";
import './tablecomp.css'

class TableComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            headers:[]
        };
        
    }
    sendId(val){
        this.props.GetId(val);
    }
    render(){
        if(this.props.dataSource===undefined||this.props.dataSource.length===0){
            return <div><strong>
                No data Present</strong></div>
        }
        else{
            if(this.props.columnHeaders===undefined){
                this.state.headers=Object.keys(this.props.dataSource[0]);
            }
            else{
               this.state.headers=this.props.columnHeaders;
            }
        return(
            <div className="table-responsive">
            <table className="table table-bordered">
             <thead>
                 <tr className="table-dark">
                 <th hidden={!this.props.canApprove}>Approve</th>
                 <th hidden={!this.props.canApprove}>Deny</th>
                     {
                         this.state.headers.map((h,i)=>(
                               <th key={i}>{h}</th>
                            ))
                     }
                  <th hidden={!this.props.getDetails}>Get Details</th>  
                  <th hidden={!this.props.showpatients}>Get Patients</th>  

                 </tr>
             </thead>
             <tbody  style={{color:'2F4050',fontWeight:'600'}}>
                 {
                     this.props.dataSource.map((rec,idx)=>(
                         <tr key={idx} >
                        <td hidden={!this.props.canApprove}>
                            <input type="button" value="Approve" className="btn btn-success" onClick={()=>this.sendId(rec[this.props.id])} />
                        </td>
                        <td hidden={!this.props.canApprove}>
                            <input type="button" value="Deny" className="btn btn-danger" onClick={()=>this.props.DelId(rec[this.props.id])} />
                        </td>
                             {    
                                  this.state.headers.map((h,i)=>(
                                    <td key={i}>{rec[h]}</td>
                                 ))
                             }   
                          <td hidden={!this.props.getDetails}><input type="button" value="Get Details" className="btn btn-primary"  onClick={()=>this.sendId(rec[this.props.id])}/></td>  
                          <td hidden={!this.props.showpatients}><input type="button" value="Get Patients" className="btn btn-danger"  onClick={()=>this.props.GetPat(rec[this.props.id])}/></td>   
                         </tr>
                         
                     ))
                 }
            </tbody>
          </table>
        </div>
        )}
    }
}

export default TableComponent;