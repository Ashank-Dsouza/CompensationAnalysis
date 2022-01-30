const { isNaN } = require("lodash");
import { GetQuarters } from 'public/Storage';
import wixUsers from 'wix-users';

var IsMockOn = true;
var MockUserID = "a2a70d73-8200-49e9-bfa6-eb14f775677b";

function GetCurrentUserId() {
    let user = wixUsers.currentUser;
    let userId = user.id;
    if (IsMockOn) {
        userId = MockUserID
    }
    return userId;
}

export async function GetTotalCredits(){
    var url = "https://s3ezx1ppdc.execute-api.us-east-1.amazonaws.com/dev/tax/getTaxCredits?userID="
    url = url + GetCurrentUserId();
    console.log("the url is: ", url);
    const headers= {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
    
    var response  = await fetch(url, { method: 'GET', headers: headers });
    var jsonData = await response.json();
    console.log("the jsonData", jsonData)
    var taxDetailsStr = jsonData.taxCreditsDetails;
    console.log("the taxDetailsStr", taxDetailsStr);
    var taxDetails = await  JSON.parse(taxDetailsStr);
    var Quarters = taxDetails;
    if(!Quarters){
        null
    }
    
    var totalCredits = 0;

    for (let index = 0; index < Quarters.length; index++) {
        const quarter = Quarters[index];
        if(quarter.total_credits && !isNaN( quarter.total_credits)){ // adds credits only if it is a number
            totalCredits = totalCredits + quarter.total_credits;
        }
    }
    return totalCredits;
} 





