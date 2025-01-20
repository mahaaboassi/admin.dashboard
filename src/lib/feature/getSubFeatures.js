"use server"
import { Helper } from "@/helpers/helper";
import { apiRoutes } from "@/helpers/apiRoutes"

export async function getSubFeatures(page=1,limit=5) {

    try{
        const {response,message} = await Helper({
            url : apiRoutes.feature.getAllSubfeatures,
            method : "GET",
            params:{
              page : page,
              limit : limit
            }
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