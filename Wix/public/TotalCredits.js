const { isNaN } = require("lodash");
import { GetQuarters } from 'public/Storage';

export function GetTotalCredits(){
    // the below gets 
    var QuartersData  = GetQuarters(); //gets quarter data from session storage. It was stored in session storage after an API click.
    var Quarters = QuartersData.Quarters;
    if(!Quarters){
        null
    }

    var totalCredits = 0;
    for (const key in Quarters) {
        if (Object.hasOwnProperty.call(Quarters, key)) {
            const quarter = Quarters[key];
            if(quarter.total_credits && !isNaN( quarter.total_credits)){ // adds credits only if it is a number
                totalCredits = totalCredits + quarter.total_credits;
            }
        }
    }
    return totalCredits;
} 


