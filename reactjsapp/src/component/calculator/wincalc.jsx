import React, { Component } from "react";
 import './../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './wincalc.css'

class calc extends Component{
    constructor(props){
        super(props);
        this.state={
            result:"",
            deg:"Deg"
        };
    }
    printval(evt){
        if(this.state.result==="0"||this.state.result===0||this.state.result==='Infinity'||this.state.result===Infinity||this.state.result==="Invalid Input"){
            this.setState({result:`${evt.target.name}`})
        }
        else{
        this.setState({result:`${this.state.result}${evt.target.name}`});}
    }
    clrresult(evt){
        this.setState({result:``});
    }
    solve(evt){
        if(this.state.result==="Invalid Input"){
            this.setState({result:0})
        }
        else{
        let x=this.state.result;
        let y =eval(x).toString();
        this.setState({result:y});
        }
    }
    sqr(evt){
        let x=this.state.result;
        let y=Math.pow(x,2);
        this.setState({result:y.toString()});
    }
    sqrroot(evt){
        let x=this.state.result;
        let y=Math.pow(x,(1/2));
        this.setState({result:y.toString()});
    }
    onebyx(evt){
        let x=this.state.result;
        let y=1/x;
        this.setState({result:y.toString()});
    }
    pie(evt){
        let x=3.1415926535897932384626433832795;
        this.setState({result:x.toString()});
    }
    e(evt){
        let x=2.7182818284590452353602874713527;
        if(this.state.result==="0"||this.state.result===0||this.state.result==='Infinity'||this.state.result===Infinity||this.state.result==="Invalid Input"){
            this.setState({result:x.toString()})
        }
        else{
            this.setState({result:`${this.state.result}${x.toString()}`})
        }
    }
    back(evt){
        let x=this.state.result;
        x=x.slice(0,x.length-1);
        this.setState({result:x});
    }
    fact(evt){
        let x=this.state.result;
        x=eval(x);
        var y=parseInt(x);
        if(y<0){
            y="Invalid Input";
        }else{
            if(y===0){
                y=1;
            }
            else{
                for(let i =2;i<parseInt(x);i++){
                    y*=i;

                }
            }
        }
        this.setState({result:y.toString()})
    }
    mod(evt){
        let x=this.state.result;
        x=eval(x);
        this.setState({result:Math.abs(x).toString()});
    }
    exp(evt){
        console.log(Math.exp(3));
        this.setState({result:"0"});
    }
    pow10(evt){
        let x=this.state.result;
        x=parseInt(eval(x));
        this.setState({result:Math.pow(10,x).toString()});
    }
    negate(evt){
        let x=this.state.result;
        x=eval(x).toString();
        if(x[0]==='-'){
            this.setState({result:`${x.slice(1,)}`});
        }
        else{
            this.setState({result:`-${this.state.result}`});
        }

    }
    loga(evt){
        let x=this.state.result;
        x=parseInt(eval(x));
        this.setState({result:Math.log10(x)});

    }
    lna(evt){
        let x=this.state.result;
        x=parseInt(eval(x));
        this.setState({result:Math.log(x)});

    }
    trig(evt){
        var x=this.state.result;
        x=eval(x);
        let y=evt.target.value;
        let ans;
        if(this.state.deg==="Deg"){
            x=(x*Math.PI)/180; 
        }
        if(y==='sin'){
            ans=Math.sin(x).toFixed(6);
        }
        else if(y==='cos'){
            ans=Math.cos(x).toFixed(6);
        }
        else if(y==='tan'){
            ans=Math.tan(x).toFixed(6);
        }
        else if(y==='sec'){
            ans=1/Math.cos(x).toFixed(6);
        }
        else if(y==='csc'){
            ans=1/Math.sin(x).toFixed(6);
        }
        else if(y==='cot'){
            ans=1/Math.tan(x).toFixed(6);
        }
        this.setState({result:ans.toString()})
    }
    deg(evt){
        if(evt.target.value==="Deg"){
            evt.target.value="Rad";
            this.setState({deg:"Rad"});
        }
        else{
            evt.target.value="Deg";
            this.setState({deg:"Deg"});
        }
    }
    ce(evt){
        let x=this.state.result;
        x=eval(x);
        this.setState({result:Math.ceil(x).toString()});
    }
    fl(evt){
        let x=this.state.result;
        x=eval(x);
        this.setState({result:Math.floor(x).toString()});
    }
    cube(evt){
        let x=this.state.result;
        x=eval(x);
        this.setState({result:Math.pow(x,3).toString()});
    }
    cuber(evt){
        let x=this.state.result;
        x=eval(x);
        this.setState({result:Math.pow(x,1/3).toString()});
    }
    twopow(evt){
        let x=this.state.result;
        x=eval(x);
        this.setState({result:Math.pow(2,x).toString()});
    }
    render() {
        return (
        <div>
                
            <h2>Windows Scientific Calculator</h2>
            
            <input id ="output"  readOnly type="text" value={this.state.result} /><br /><br />
            <div className="table-responsive">
            <center>
            <table>
                <tbody >
                         
                <tr><td><input type="button"  value="sin" onClick={this.trig.bind(this)}/> </td>
                    <td><input type="button"  value="cos" onClick={this.trig.bind(this)}/> </td>
                    <td><input type="button"  value="tan" onClick={this.trig.bind(this)}/></td>
                    <td><input type="button" value="&#8970;x&#8971;" onClick={this.fl.bind(this)}/></td>
                    <td><input type="button" value="&#8968;x&#8969;" onClick={this.ce.bind(this)}/></td>
                </tr>

                <tr><td><input type="button"  value="csc" onClick={this.trig.bind(this)}/></td>
                    <td><input type="button"  value="sec" onClick={this.trig.bind(this)}/> </td>
                    <td><input type="button"  value="cot" onClick={this.trig.bind(this)}/></td>
                    <td><input type="button"  value="x&sup3;" onClick={this.cube.bind(this)}/></td>
                    <td><input type="button"  value="&#8731;x" onClick={this.cuber.bind(this)}/></td>
                </tr>

                <tr><td><input type="button" id="change" value={this.state.deg} onClick={this.deg.bind(this)}/></td>
                    <td><input type="button" value="&#960;" onClick={this.pie.bind(this)}/> </td>
                    <td><input type="button" value="e" onClick={this.e.bind(this)}/></td>
                    <td><input type="button" value="C" onClick={this.clrresult.bind(this)}/></td>
                    <td><input type="button" value="&#9003;" onClick={this.back.bind(this)}/></td>
                </tr>
                
                <tr>
                    <td><input type="button" value="x&#178;" onClick={this.sqr.bind(this)}/></td>
                    <td><input type="button" value="1/x" onClick={this.onebyx.bind(this)}/></td> 
                    <td><input type="button" value="|x|" onClick={this.mod.bind(this)}/></td>
                    <td><input type="button" value="2 &#x036F;" onClick={this.twopow.bind(this)}/></td>
                    <td><input type="button" name="%" value="mod" onClick={this.printval.bind(this)}/></td>
                </tr>
                
                <tr><td><input type="button" value="&#178;&#8730;x" onClick={this.sqrroot.bind(this)}/></td>
                    <td><input type="button" name="(" value="(" onClick={this.printval.bind(this)}/></td>
                    <td><input type="button" name=")" value=")" onClick={this.printval.bind(this)}/> </td>
                    <td><input type="button" value="n!" onClick={this.fact.bind(this)} /></td>
                    <td><input type="button" name="/" value="&#247;" onClick={this.printval.bind(this)}/></td>
                </tr>

                <tr><td><input type="button" name="**" value="a &#x036F;" onClick={this.printval.bind(this)}/> </td>              
                    <td><input type="button" className="num" name="7" value="7" onClick={this.printval.bind(this)}/> </td>
                    <td><input type="button" className="num" name="8" value="8" onClick={this.printval.bind(this)}/> </td>
                    <td><input type="button" className="num" name="9" value="9" onClick={this.printval.bind(this)}/> </td>
                    <td><input type="button" name="*" value="&#215;" onClick={this.printval.bind(this)}/></td>
                </tr>
                    
                <tr><td><input type="button" value="10 &#x036F;" onClick={this.pow10.bind(this)}/> </td>
                    <td><input type="button" className="num" name="4" value="4" onClick={this.printval.bind(this)}/> </td>
                    <td><input type="button" className="num" name="5" value="5" onClick={this.printval.bind(this)}/> </td>
                    <td><input type="button" className="num" name="6" value="6" onClick={this.printval.bind(this)}/> </td>
                    <td><input type="button" name="-" value="&#8722;" onClick={this.printval.bind(this)}/></td>
                </tr> 

                <tr><td><input type="button" value="log" onClick={this.loga.bind(this)}/>  </td>
                    <td><input type="button" className="num" name="1" value="1" onClick={this.printval.bind(this)}/></td> 
                    <td><input type="button" className="num" name="2" value="2" onClick={this.printval.bind(this)}/> </td>
                    <td><input type="button" className="num" name="3" value="3" onClick={this.printval.bind(this)}/> </td>
                    <td><input type="button" name="+" value="+" onClick={this.printval.bind(this)}/></td>
                </tr>
                
                <tr><td><input type="button" value="ln" onClick={this.lna.bind(this)}/> </td>
                    <td><input type="button" className="num" value="&#177;" onClick={this.negate.bind(this)} /></td>
                    <td><input type="button" className="num" name="0" value="0" onClick={this.printval.bind(this)}/> </td>
                    <td><input type="button" className="num" name="." value="." onClick={this.printval.bind(this)}/> </td>
                    <td><input type="button" id="equal" value="=" onClick={this.solve.bind(this)}/> </td>
                </tr>
                 
                </tbody>
            </table> 
            </center>
            </div>
          
        </div>
        );
    }
}
export default calc;
