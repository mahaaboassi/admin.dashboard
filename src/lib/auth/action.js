"use server"
import { Helper } from "@/helpers/helper";
import { apiRoutes } from "@/helpers/apiRoutes"
import { redirect } from "next/navigation";
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server';

export async function submitSignIn(data) {
    try{
        const {response,message} = await Helper({
            url : apiRoutes.auth.signIn,
            method : "POST",
            body: data
          })
          console.log(response);
          if(response?.error ==0 ){
            cookies().set('token', response.data.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 * 7 // 1 week
              })
            return {
                success: true,
                message: `Thank you, ${response.data.name}! Your submission was received.`
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