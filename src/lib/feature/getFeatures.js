"use server"
import { Helper } from "@/helpers/helper";
import { apiRoutes } from "@/helpers/apiRoutes"

export async function getFeatures(page=1,limit=5) {
  console.log("page_inside-get_fun", page);
  
    try{
        const {response,message} = await Helper({
            url : apiRoutes.feature.getAllfeatures,
            method : "GET",
            params:{
              page : page,
              limit : limit
            }
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