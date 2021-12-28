const { isNaN } = require("lodash");

function GetTotalCredits(Quarters){
    var totalCredits = 0;
    for (const key in Quarters) {
        if (Object.hasOwnProperty.call(Quarters, key)) {
            const quarter = Quarters[key];
            if(quarter.total_credits && !isNaN( quarter.total_credits)){
                totalCredits = totalCredits + quarter.total_credits;
            }
        }
    }
    return totalCredits;
} 
