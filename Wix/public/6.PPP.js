// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/1-hello-world
// post request from here to lambda
// pass the last three forms data here as payload.
import wixData from 'wix-data';
import wixUsers from 'wix-users';
import { AppendBuisnessInfo, GetBuisnessData } from 'public/Storage';
import {local} from 'wix-storage';
const buisnessDataKey = "buisnessData";


const API_ENDPOINT = "https://s3ezx1ppdc.execute-api.us-east-1.amazonaws.com/dev/tax/saveUserDetails"
const OwnerRelativesDB = "ownersRelatives";
const BusinessInfoDB = "businessInfo";

$w.onReady(function () {
	$w('#ppp2continue').onClick(GatherDataAndSendToBackend);
});

function GetCurrentUserId() {
    let user = wixUsers.currentUser;
    let userId = user.id;
    console.log("CurrentUser： ", userId);
    return userId.toString();
}

function PostToBackend(relatives, business_info) {
    //fconsole.log(business_info);
    var body = JSON.stringify({
            'business_info': business_info,
            'relatives': relatives
        });
    console.log("Posting to backend: ", body)
    //console.log("the user id is : ", GetCurrentUserId());
    const url = API_ENDPOINT + "?userID="+GetCurrentUserId();
    console.log("the url is : ", url);
	fetch(url, {
        method: 'POST',
        headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',

       },
        //empty->body
        body: body
    })
    .then(response => {
        return response.text();
    })
    .then(data => {
        console.log('Success. The response is: ', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}





function AddDetailsToBuisnessData(){
    const loanAmount = $w('#loanAmount1').value;
	const loanDate = $w('#loan2date').value;
	const loanNonPayrollExpense = $w('#loan1nonpayroll2').value;

    	const loanData = {
		"loanAmount": loanAmount,
		"loanDate": loanDate,
		"loanNonPayrollExpense": loanNonPayrollExpense
	}

    AppendBuisnessInfo("loanDataTwo", loanData);

	console.log("the businessData is now: ", local.getItem(buisnessDataKey));
}

function GatherDataAndSendToBackend() {
    AddDetailsToBuisnessData();


    let relatives;
    wixData.query(OwnerRelativesDB)
        .eq("_owner", GetCurrentUserId())
		//.eq("excluded", true)
        .find()
        .then((results) => {
            console.log("The excluded relatives are: ", results.items);
            relatives = results.items;
            let business_info = {}
            wixData.query(BusinessInfoDB)
                .eq("_owner", GetCurrentUserId())
                .find()
                .then((results) => {
                    console.log("The business infos are: ", results.items);
                    business_info["results"] = results.items;
                    var buisnessData = GetBuisnessData();
                    business_info["buisnessData"] = buisnessData;
                    PostToBackend(relatives, business_info);
                });
        });
}
