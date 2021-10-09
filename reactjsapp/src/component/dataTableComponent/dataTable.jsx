import React, { Component } from "react";

import DataTableComponent from './dataTableComponent';

import DropDownComponent from './dropdowncomponent';
class CheckBoxandRadio extends Component{
    constructor(props){
        super(props);
        this.state={
            products:[{ProductId:101, ProductName:"Lenovo ThinkPad", CategoryName:"Electronics", Price:49999},
            {ProductId:102, ProductName:"Sony 16MP Camera", CategoryName:"Electronics", Price:4999},
            {ProductId:103, ProductName:"OnePlus 8 Pro", CategoryName:"Electronics", Price:54999},
            {ProductId:104, ProductName:"Logitech Mouse", CategoryName:"Electronics", Price:999},
            {ProductId:105, ProductName:"Sony Headphones", CategoryName:"Electronics", Price:3999},
            {ProductId:106, ProductName:"Nike Track-suit", CategoryName:"Fashion", Price:1499},
            {ProductId:107, ProductName:"Raymond Shirt", CategoryName:"Fashion", Price:1049},
            {ProductId:108, ProductName:"Max Shirt", CategoryName:"Fashion", Price:799},
            {ProductId:109, ProductName:"Max T-shirt", CategoryName:"Fashion", Price:699},
            {ProductId:110, ProductName:"U.S. POLO Jeans", CategoryName:"Fashion", Price:2999},
            {ProductId:111, ProductName:"Oximeter", CategoryName:"Essentials", Price:1999},
            {ProductId:112, ProductName:"Thermometer", CategoryName:"Essentials", Price:599},
            {ProductId:113, ProductName:"Blood Pressure Machine", CategoryName:"Essentials", Price:1299},
            {ProductId:114, ProductName:"IR Thermometer", CategoryName:"Essentials", Price:1399},
            {ProductId:115, ProductName:"Glucometer", CategoryName:"Essentials", Price:899},
            {ProductId:116, ProductName:"Green Tea", CategoryName:"Pantry", Price:399},
            {ProductId:117, ProductName:"Saffola Oats", CategoryName:"Pantry", Price:159},
            {ProductId:118, ProductName:"Peanut Butter", CategoryName:"Pantry", Price:349},
            {ProductId:119, ProductName:"Glucon D", CategoryName:"Pantry", Price:299},
            {ProductId:120, ProductName:"Basmati Rice", CategoryName:"Pantry", Price:399}],
            Delete:false,
            Sort:false,
            deleteid:0,
            msg:"",
            Pagination:false,
            pageSize:20,
            sortKey:"" ,
            Search:false,
            searchKey:"",
            searchValue:""
        };

        this.state.Headers = Object.keys(this.state.products[0]);

    }

    setDelete(evt){
        if(evt.target.checked){
            this.setState({Delete:true},()=>{});
        }
        else{
            this.setState({Delete:false},()=>{});
            this.setState({msg:""},()=>{});
        }   
        
    }
    setSort(evt){
        if(evt.target.checked){
            this.setState({Sort:true},()=>{});
        }
        else{
            this.setState({Sort:false},()=>{});
            this.setState({sortKey:""},()=>{})
        }    
    }
    setSearch(evt){
        if(evt.target.checked){
            this.setState({Search:true},()=>{});
        }
        else{
            this.setState({Search:false},()=>{});
        }    
    }
    setPagination(evt){
        if(evt.target.checked){
            this.setState({Pagination:true},()=>{});
        }
        else{
            this.setState({Pagination:false},()=>{});
            this.setState({pageSize:20},()=>{});
        }
        
    }
    setpageSizeValue(val){
        this.setState({pageSize:val},()=>{
        })
       
    }
    setsortKey(selectVal){
        console.log("the selected value in dataTable : "+selectVal);
        this.setState({sortKey:selectVal},()=>{});
    }
    setsearchKey(selectVal){
        console.log(selectVal);
        this.setState({searchKey:selectVal[0]},()=>{
            console.log("the selected value in searchKey : "+this.state.searchKey);
        });
        this.setState({searchValue:selectVal[1]},()=>{ console.log("the selected value in searchVal : "+this.state.searchValue);});
    }
    delfunc(val){
        let temp=this.state.products.slice();
        let check=false;
        temp.forEach((rec,id)=>{
            if(rec.ProductId===parseInt(val)){
                temp.splice(id,1);
                check=true;
                return;
            }
        })
        if(check){
            this.setState({products:temp},()=>{
                console.log(this.state.products);
                this.setState({msg:"Product Deleted"});
            })    
        }
        
    }
    showselectedRow(emp){
        console.log("In show Selected Row : ");
        console.log(JSON.stringify(emp));
        console.log();
        this.setState({msg:`The selected row is : ${JSON.stringify(emp)}`})
    }
    
    render(){
        return(
        <div className="Container">
            <center>
                <form >
                <label className="form-check-label">
                <input  type="checkbox" className="form-check-input" value={this.state.Delete} onClick={this.setDelete.bind(this)} /> Edit
                </label>

                <label className="form-check-label">
                <input  type="checkbox" className="form-check-input" value={this.state.Sort} onClick={this.setSort.bind(this)} /> Sort <SortDropDown 
                canSort={this.state.Sort}
                sortKeys={this.state.Headers}
                selValue={this.state.sortKey}
                selectValue={this.setsortKey.bind(this)}></SortDropDown>
                </label>
                <br />
                

                <label className="form-check-label">
                <input  type="checkbox" className="form-check-input" value={this.state.Pagination} onClick={this.setPagination.bind(this)} /> Pagination 
                </label><PageSize 
                isPagination={this.state.Pagination}
                pageSizeVal={this.state.pageSize}
                pageSizeValue={this.setpageSizeValue.bind(this)}></PageSize>
                <br />
                <label className="form-check-label">
                <input  type="checkbox" className="form-check-input" value={this.state.Search} onClick={this.setSearch.bind(this)} /> Search <SearchDropDown 
                canSearch={this.state.Search}
                sortKeys={this.state.Headers}
                selectValue={this.setsearchKey.bind(this)}></SearchDropDown>
                </label>
                <br />
                </form>
                <div readOnly>{this.state.msg}</div>
            </center>    
            <br />
            
            <DataTableComponent 
            dataSource={this.state.products}
            headers={this.state.Headers}

            selectedRow={this.showselectedRow.bind(this)}

            canDelete={this.state.Delete}
            delid={this.state.deleteid}
            deleteidf={this.delfunc.bind(this)}

            canSort={this.state.Sort}
            sortKey={this.state.sortKey}

            canSearch={this.state.Search}
            searchKey={this.state.searchKey}
            searchVal={this.state.searchValue}
           
            isPagination={this.state.Pagination}
            pageSize={this.state.pageSize}
            totalPages={Math.ceil(this.state.products.length/this.state.pageSize)}
            ></DataTableComponent>
        </div>
        )
    }
}
class SearchDropDown extends Component{
    constructor(props){
        super(props)
            this.state={
                searchVal:"",
                selectValuex:""
            };
    }
    getsearchVal(evt){
        this.setState({searchVal:evt.target.value},()=>{});
    }
    getselectValue(val){
        this.setState({selectValuex:val},()=>{});
    }
    sendData(evt){
        this.props.selectValue([this.state.selectValuex,this.state.searchVal]);
    }
    render(){
        if(this.props.canSearch){
            return (
                <div>                
                <DropDownComponent dataSource={this.props.sortKeys}
                selectValue={this.getselectValue.bind(this)}
                >
                </DropDownComponent>
                <input type="text" onChange={this.getsearchVal.bind(this)} value={this.state.searchVal}/>
                <input type="button" value="Save" onClick={this.sendData.bind(this)}/>
                </div>

            )
        }
        else{
            return null;
        }
    }
}

class SortDropDown extends Component{
    getselectValue(val){
        this.props.selectValue(val);
    }
    render(){
        if(this.props.canSort){
            return (
                <DropDownComponent dataSource={this.props.sortKeys}
                selectValue={this.getselectValue.bind(this)}
                stateProperty={this.props.selValue}>
                </DropDownComponent>
            )
        }
        else{
            return null;
        }
    }
}

class PageSize extends Component{
    constructor(props){
        super(props);
        this.state={
            pageSizex:this.props.pageSizeVal
        };
    }
    setPageSize(evt){
        this.setState({pageSizex:evt.target.value},()=>{});
    }
    sendPageSize(evt){
        this.props.pageSizeValue(this.state.pageSizex);
    }
    render(){
        if(this.props.isPagination){
            return (
                <div>
                <input type="number" value={this.state.pageSizex} min="0" onChange={this.setPageSize.bind(this)} />
                <input type="button" value="Save" onClick={this.sendPageSize.bind(this)}/>
                </div>
            )
        }
        else{
            return null;
        }
    }
}

export default CheckBoxandRadio;