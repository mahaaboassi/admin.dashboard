"use server"
import { Helper } from "@/helpers/helper";
import { apiRoutes } from "@/helpers/apiRoutes"

export async function getUsers(page = 1, limit = 5) {
    try{
        const {response,message} = await Helper({
            url : `${apiRoutes.user.getAllUsers}`,
            params:{
              page :page,
              limit :limit
            },
            method : "GET",
          })
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