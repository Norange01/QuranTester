import { supabase } from "../lib/supabase";


export function surah_is_testable(surah_id){
    return "true";
}

export async function ayah_is_testable(ayah_id, user_id){
    let { data: testable_ranges } = await supabase.from('testable_ayahs').select('start_ayah, end_ayah').eq('user_id', user_id);
    if(testable_ranges==null){
        return "false";
    }
    testable_ranges_mapped = testable_ranges.map(row => row.start_ayah);
    for(let i=0; i<testable_ranges.length; i++){
        if(ayah_id>testable_ranges_mapped.start_ayah && ayah_id<testable_ranges_mapped.end_ayah){
            return "true";
        }
    }
    return "false";
}