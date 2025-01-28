"use server"
import { Helper } from "@/helpers/helper";
import { apiRoutes } from "@/helpers/apiRoutes"

export async function getOneProperty(id) {

    try{
        const {response,message} = await Helper({
            url : apiRoutes.property.getOne(id),
            method : "GET",
          })
          if(response?.error ==0 ){
            console.log(response);
            
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