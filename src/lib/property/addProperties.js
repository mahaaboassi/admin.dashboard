"use server"
import { Helper } from "@/helpers/helper";
import { apiRoutes } from "@/helpers/apiRoutes"

export async function addProperties(body,id) {
    
    try{
        const {response,message} = await Helper({
            url : id ? apiRoutes.property.update(id) : apiRoutes.property.addProperty,
            method : id ? "PUT" : "POST",
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
        
        return {
            success: false,
            message: `An unexpected error occurred`
          }
    }
    
}