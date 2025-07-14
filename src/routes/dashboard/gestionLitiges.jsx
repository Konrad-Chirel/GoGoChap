import React, { useState } from "react";
import ListeLitiges from "@/routes/dashboard/listeLitiges"; 
import Discussion from "@/routes/dashboard/discussionLitige"; 





export default function  GestionLitiges (){
    const [ litigeActif,setLitigeActif]=useState (null);
    return(
        <div className=" h-screen">
            {
                !litigeActif?(
                    <ListeLitiges onSelectLitige={(litiges)=>setLitigeActif (litiges)}/>)
                    :(
                        <Discussion litiges={litigeActif}onClose={()=>setLitigeActif(null)}/>
                    )
            }
            </div>
    );
}