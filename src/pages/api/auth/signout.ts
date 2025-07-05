// With `output: 'static'` configured:
export const prerender = false;
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ cookies, redirect }) => {
  cookies.delete("sb-access-token", { path: "/" });
  cookies.delete("sb-refresh-token", { path: "/" });
  console.debug("signing out");
  return redirect("/signin");
  
};