import wixUsers from 'wix-users';
import { AppendBuisnessInfo } from 'public/Storage';
import {GetUserDetails} from 'public/UserDetails';
import { StoreQuarters, GetQuarters } from 'public/Storage';
import { local } from 'wix-storage';

const buisnessDataKey = "buisnessData";


const API_ENDPOINT = "https://s3ezx1ppdc.execute-api.us-east-1.amazonaws.com/dev/tax/saveUserDetails";

function GetCurrentUserId() {
    let user = wixUsers.currentUser;
    let userId = user.id;
    console.log("CurrentUser： ", userId);
    return userId.toString();
}
function PostToBackend() {

    var userDetails = GetUserDetails()
    var body = JSON.stringify(userDetails);
    console.log("Posting to backend: ", body)
    const url = API_ENDPOINT + "?userID=" + GetCurrentUserId();
    console.log("the api endpoint getting called is : ", url);
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

function AddBuisnessDetailsToStore() {
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

export function ContinueBtn_click() {
    AddBuisnessDetailsToStore();
    PostToBackend();
    StoreQuarters({
	"Quarters": {
		"2Q20": {
		"gross_wages": 100932.82,
		"qualified_wages": 100932.82,
		"refundable": 120111.20,
		"non_refundable": 2010.92,
		"total_credits": 100,
		},

		"3Q20":
		{
		"gross_wages": 100932.82,
		"qualified_wages": 100932.82,
		"refundable": 120111.20,
		"non_refundable": 2010.92,
		"total_credits": 100,
		},

		"4Q20":
		{
		"gross_wages": 100932.82,
		"qualified_wages": 100932.82,
		"refundable": 120111.20,
		"non_refundable": 2010.92,
		"total_credits": 100,
		},

		"1Q21":
		{
		"gross_wages": 100932.82,
		"qualified_wages": 100932.82,
		"refundable": 120111.20,
		"non_refundable": 2010.92,
		"total_credits": 100,
		},

		"2Q21":
		{
		"gross_wages": 100932.82,
		"qualified_wages": 100932.82,
		"refundable": 120111.20,
		"non_refundable": 2010.92,
		"total_credits": 100,
		},

		"3Q21":
		{
		"gross_wages": 100932.82,
		"qualified_wages": 100932.82,
		"refundable": 120111.20,
		"non_refundable": 2010.92,
		"total_credits": 100,
		},

		"4Q21":
		{
		"gross_wages": 100932.82,
		"qualified_wages": 100932.82,
		"refundable": 120111.20,
		"non_refundable": 2010.92,
		"total_credits": 100,
		}
	}
}
)   
}
