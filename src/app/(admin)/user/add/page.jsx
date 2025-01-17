"use client"; // Ensure this runs on the client side
import { useEffect, useState } from "react";
import { getUsers } from "@/lib/user/getUsers"

function AddUser() {
    useEffect(()=>{
        getAllUsers()
    },[])
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
        {loading ? "loading" : "done"}
        Add User
    </div> );
}

export default AddUser;