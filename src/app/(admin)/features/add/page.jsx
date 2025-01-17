"use client"; // Ensure this runs on the client side
import { useEffect, useState } from "react";
import { getUsers } from "@/lib/feature/getAllfeatures"

function AddFeature() {

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
        Add Feature
    </div> );
}

export default AddFeature;