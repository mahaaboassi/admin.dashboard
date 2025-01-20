"use server"
import { Helper } from "@/helpers/helper";
import { apiRoutes } from "@/helpers/apiRoutes"

export async function addProperties(body) {
    
    try{
        const {response,message} = await Helper({
            url : apiRoutes.property.addProperty,
            method : "POST",
            body : body, 
            hasToken : true
          })
          console.log(response);
          if(response?.error ==0 ){
            
            return {
                success: true,
                data : response,
                message: message
              }
          }else{
            return {
                success: false,
                message: message
              }
          }
    }catch(error){
        console.log(error);
        return {
            success: false,
            message: `An unexpected error occurred`
          }
    }
    
}