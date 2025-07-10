export function shuffle(array) { // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
}


export function get_partitioned_randomized_arr(pool){
    // Determine allowed sizes
    const pool_size = pool.length;
    if(pool_size<50){
        let randomized_pool = structuredClone(pool);
        shuffle(randomized_pool);
        return randomized_pool;
    }

    let acceptable_divisors = [];

    for(let i=1; i<16; i++){
        if(Math.floor(pool_size/i)>=100 && Math.floor(pool_size/i)<=500){
            acceptable_divisors.push(i);
        }
    }
    // Find size with minimum remainder
    let best_divisor = 1;
    let smallest_remainder_divisor_ratio = 1;
    for(let i=0; i<acceptable_divisors.length; i++){
        if((pool_size%acceptable_divisors[i])/acceptable_divisors[i]<smallest_remainder_divisor_ratio){
            best_divisor=acceptable_divisors[i];
        }
    }

    const portion_size = Math.floor(pool_size/best_divisor);
    let partitioned_randomized_pool=[];
    const remainder = pool_size-(portion_size*best_divisor);
    for(let i=0; i<best_divisor; i++){
        let new_portion=[]
        for(let j=0; j<portion_size; j++){
            new_portion.push(pool[(i*portion_size)+j]);
        }
        if(i==best_divisor-1){
            for(let k=0; k<remainder; k++){
                new_portion.push(pool[(best_divisor*portion_size)+k]);
            }
        }
        // Randomize each portion
        shuffle(new_portion);
        // Add to result array
        for(let j=0; j<new_portion.length; j++){
            partitioned_randomized_pool.push(new_portion[j]);
        }
    }

    return partitioned_randomized_pool;
}