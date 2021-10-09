// import
import React from "react";
import './SideBarStyle.css'
const SideBar =(props)=> {
    return(    
        <div className='SideBar'>
            <ul className='SideBarList'>
           {props.SideBarData.map((rec,id)=>(
               <li 
               className='listrow' 
               key={id} 
               id={window.location.pathname===rec.link?'active':''}
               onClick={()=>{
                   window.location.pathname=rec.link
                   }}>
                   <div id='icon'>{rec.Icon}</div>{" "}
                   <div id='title'>{rec.title}</div>
               </li>
           ))}
           </ul>
        </div>
    )
    
 
}

export default SideBar;
