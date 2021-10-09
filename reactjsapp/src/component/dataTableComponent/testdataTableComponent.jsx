import React, { Component } from "react";
class DataTableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
        // prod:this.props.dataSource,
        tablebody:[],
        pageSize:this.props.pageSize,
        pages:1
        
    };
  }
  delf(delvalue){
        this.props.deleteidf(delvalue);
  }
//   funcpage(evt){
//       let out=[];
//       let start;
//       for(start=(evt.target.id-1)*this.props.pageSize;start<=(evt.target.id*this.props.pageSize)-1;start++){
//           out.push(
//             <tr>
//                 <td>{this.props.dataSource[start].ProductId}</td>
//                 <td>{this.props.dataSource[start].ProductName}</td>
//                 <td>{this.props.dataSource[start].CategoryName}</td>
//                 <td>{this.props.dataSource[start].Price}</td>
//                 <DeleteButton id={this.props.dataSource[start].ProductId} 
//                 canDelete={this.props.canDelete}
//                 delid={this.state.delid}
//                 delf={this.delf.bind(this)}></DeleteButton>
//             </tr> 
//                 // {/* {
//                 //     this.props.headers.map((head,i)=>{
//                 //         <td key={i}>{this.props.dataSource[start][head]}</td>
//                 //     })
//                 // }
//                 // <DeleteButton id={this.props.dataSource[start].ProductId} 
//                 // canDelete={this.props.canDelete}
//                 // delid={this.state.delid}
//                 // delf={this.delf.bind(this)}></DeleteButton> */}
              
//           )
//       }
//       console.log("The value for out = "+JSON.stringify(out));
//       this.setState({tablebody:out});  
//   }
//   func(){
//     let pagination=[];
//     if(this.props.isPagination){
//         for(let i=1;i<=this.props.totalPages;i++){
//             pagination.push(<li className="page-item"><a className="page-link" id={i} onClick={this.funcpage.bind(this)}>{i}</a></li>);
//         }
//     }
//     return pagination;
//    }
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
      return(
          
        <div className="table-responsive">
             {/* <ul className="pagination justify-content-center">
                {    this.func()
                }   
            </ul>   */}
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
                    // this.state.tablebody
                    this.props.dataSource.map((emp,idx)=>( 
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
// class Pagination extends Component{
//     funcpage(id){

//     }
//     func(){
//         let pagination=[];
//         for(let i=1;i<=this.props.totalPages;i++){
//             pagination.push(<li className="page-item"><a className="page-link" id={i} onClick={this.funcpage.bind(this)}>{i}</a></li>);
//         }
//         return pagination;
//     }
//     render(){
//         if(this.props.isPagination){
//             return(
//                 <div>
            
//                 <ul className="pagination justify-content-center">
//                 {    this.func()}   
//                 </ul>
//                 </div>
//             )
//         }
//         else{
//             return null;
//         }
//     }
// }
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
