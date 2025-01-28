"use server";

import { cookies } from 'next/headers';

// This function will be used to delete the token cookie
export async function removeToken() {
  const cookieStore = cookies();
  cookieStore.delete('token', {
    path: '/', // Optional: restrict the deletion to a specific path
    httpOnly: true, // Ensure the cookie is removed server-side
    secure: process.env.NODE_ENV === 'production', // Apply secure flag in production
    sameSite: 'strict',
  });
}

// You can call this function when a user logs out or when needed.
export async function logout() {
  // Remove token from cookies
  await removeToken();

//   // Redirect to the sign-in page after logout
//   return NextResponse.redirect(new URL('/auth/sign-in', request.url)); // Replace `request.url` with your context
}