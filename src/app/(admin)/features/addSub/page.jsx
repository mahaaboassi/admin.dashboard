"use client"; // Ensure this runs on the client side
import { useEffect, useState } from "react";
import { getUsers } from "@/lib/user/getUsers"

function AddSubFeature() {
    
    const [ loading ,setLoading] = useState(true)
    const getAllUsers = async ()=>{
        setLoading(true)
        try {
              const result = await getUsers()
              console.log(result);
              
              if(result && result.success){
                //   route.push("/dashboards")
              } else{
                setError(result.message)
              }
             
            } catch (error) {
              console.log("client side error" , error);
              
            } finally {
              setLoading(false)
            }
    }
    return ( <div>
      
        Add Sub Feature
    </div> );
}

export default AddSubFeature;