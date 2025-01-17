"use server";

import { cookies } from "next/headers";

export function checkTokenOnServer() {
  const cookieStore = cookies();
  const token = cookieStore.get("token"); // Get the 'token' cookie

  if (token) {
    console.log("Token exists:", token.value);
    return token.value; // Return the token value
  } else {
    console.log("No token found.");
    return null; // Token does not exist
  }
}