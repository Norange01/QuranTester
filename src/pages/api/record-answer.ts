import type {APIRoute} from "astro";
import {supabase} from "../../lib/supabase";

export const prerender = false;

export const POST: APIRoute = async ({request}) => {
    const {user_id, ayah, incorrectness} = await request.json();

    const {error} = await supabase
    .from("tested_ayahs")
    .upsert([
        {
            user_id,
            ayah,
            last_tested: new Date().toISOString(),
            incorrectness,
        },
    ]);

    if(error){
        return new Response(JSON.stringify({ error: error.message }), {status:500});
    }

    return new Response(JSON.stringify({success:true}));
}