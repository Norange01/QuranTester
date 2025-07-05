// With `output: 'static'` configured:
export const prerender = false;
import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const username = formData.get("username")?.toString();

  if (!email || !password) {
    return new Response("Email and password are required", { status: 400 });
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options:{
      data: {
        display_name: username
      }
    }
  });

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  console.debug("Going to sign in page after register");
  return redirect("/signin");
};