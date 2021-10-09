import React, { Component } from "react";
class DataTableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
         prod:this.props.dataSource,
        start:0,
        end:this.props.dataSource.length,
        
    };
  }
  delf(delvalue){
        this.props.deleteidf(delvalue);
  }
  funcpage(evt){
    this.setState({start:(evt.target.id-1)*this.props.pageSize});
    this.setState({end:(evt.target.id*this.props.pageSize)});
  }
  func(){
    let pagination=[];
    if(this.props.isPagination){
        for(let i=1;i<=this.props.totalPages;i++){
            pagination.push(<li className="page-item"><a className="page-link" id={i} onClick={this.funcpage.bind(this)}>{i}</a></li>);
        }
    }
    return pagination;
   }
   getSelectedRow(emp){
       this.props.selectedRow(emp);
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
        if(this.props.canSort){
            if(typeof(this.props.sortKey)==='number'){
                this.props.dataSource.sort((a,b)=>{
                    return a[this.props.sortKey]-b[this.props.sortKey];
                });
            }
            if(typeof(this.props.sortKey)==='string'){
                this.props.dataSource.sort((a,b)=>{
                    if(a[this.props.sortKey]<b[this.props.sortKey]){
                        return -1;
                    }
                    if(a[this.props.sortKey]>b[this.props.sortKey]){
                        return 1;
                    }
                    return 0;
                });
            } 
        }
        if(this.props.canSearch&&(this.props.searchKey!==undefined)&&(this.props.searchVal!==undefined)){
           return( <div>{JSON.stringify(this.state.prod.filter((o)=>o[this.props.searchKey]==this.props.searchVal))}</div>)
        }
      return(
          
        <div className="table-responsive">
             <ul className="pagination justify-content-center">
                {    this.func()
                }   
            </ul>  
            <table className="table table-striped table-bordered table-hover">
                <thead>
                    <tr className="table-dark">
                        {this.props.headers.map((head, idx) => (
                        <th key={idx}>{head}</th>
                        ))
                           
                        }
                        <DeleteColumn canDelete={this.props.canDelete}></DeleteColumn> 
                    </tr>
                </thead>
                <tbody>
                {
                    this.props.dataSource.filter((o,i)=>i>=this.state.start&&i<this.state.end).map((emp,idx)=>( 
                        <tr key={idx} onClick={()=>this.getSelectedRow(emp)}>
                            {
                                this.props.headers.map((head,i)=>(
                                    <td key={i}>{emp[head]}</td>
                                ))
                                
                            }
                            <DeleteButton id={emp.ProductId} 
                            canDelete={this.props.canDelete}
                            delid={this.state.delid}
                            delf={this.delf.bind(this)}></DeleteButton>
                        </tr>
                    ))
                }
                </tbody>
            </table>  
                
        </div>    
        )
    }
  }
}
class DeleteColumn extends Component{
    render(){
        if(this.props.canDelete){
            return(<th>Delete</th>)
        }else{
            return null;
        }
    }
}
class DeleteButton extends Component{
    showid(evt){
        this.props.delf(evt.target.id);
    }
    render(){
        if(this.props.canDelete){
            return(<td><input id={this.props.id} onClick={this.showid.bind(this)} type="button" value="Delete" /></td>);
        }else{
            return null;
        }
    }
}
export default DataTableComponent;

// this.props.dataSource.map((emp,idx)=>( 
//     <tr key={idx} onClick={()=>this.getSelectedRow(emp)}>
//         {
//             this.props.headers.map((head,i)=>(
//                 <td key={i}>{emp[head]}</td>
//             ))
            
//         }
//         <DeleteButton id={emp.ProductId} 
//         canDelete={this.props.canDelete}
//         delid={this.state.delid}
//         delf={this.delf.bind(this)}></DeleteButton>
//     </tr>
// ))

{/* <TableOnIndex
headers={this.props.headers}
dataSource={this.props.dataSource}
start={this.state.start}
end={this.state.end}
receivedVal={this.delf.bind(this)}
canDelete={this.props.canDelete}></TableOnIndex> */}

// class TableOnIndex extends Component{
//     delf(val){
//         this.props.receivedVal(val);
//     }
//     func(){
        
//     }
//     render(){

//         let data;

//         this.props.dataSource.map((emp,id)=>{
//             if(id>parseInt(this.props.start)&&id<parseInt(this.props.end)){
//                 this.props.headers.map((head,idx)=>{

//                 })
//             }
//         })
//         return(
//             <div>{
//                 // this.props.dataSource.map((emp,id)=>(
//                 //     if(id>=parseInt(this.props.start)&&id<parseInt(this.props.end))(
//                 //         <tr>{
//                 //             this.props.headers.map((head,idx)=>(
//                 //                 <td key={idx+100}>{emp[head]}</td>
//                 //             ))
//                 //         }
//                 //         <DeleteButton id={emp.ProductId} 
//                 //             canDelete={this.props.canDelete}
//                 //             // delid={this.state.delid}
//                 //             delf={this.delf.bind(this)}></DeleteButton>
//                 //         </tr>
//                 //     )
//                 // ))
//             }
//             </div>
//         )
//     }

// }

