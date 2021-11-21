//import wixUsers from 'wix-users';
//import { fetch } from 'wix-fetch';
//import wixData from 'wix-data';
//import {GetCompensationDateRange, GetCreditType} from "public/BuisnessInfo";
//import {AddBuisnessInfo} from 'public/BuisnessInfoDB';

const API_END_POINT = "https://s3ezx1ppdc.execute-api.us-east-1.amazonaws.com/dev/tax/getFullName"

const OwnerRelativesDB = "ownersRelatives";

function GetCurrentUserId() {
    let user = wixUsers.currentUser;
    let userId = user.id;
    return userId;
}

function InsertOwnerRelativesIntoDB(RelativeNames, UserId) {
    let id = RelativeNames['individual_id'].split('#')[0];
    wixData.query(OwnerRelativesDB)
    .eq("individual_id", id)
    .find()
    .then( (results) => {
        if(results.items.length > 0) {
            return;
        }
    })
    .catch( (err) => {
        let errorMsg = err;
        console.log("Error in query: ", errorMsg);
    });
    let toInsert = {
          "Last_name":  RelativeNames['last_name'],
          "First_name": RelativeNames['first_name'],
          "individual_id": RelativeNames['individual_id'],
          "_owner":   UserId
        };
    wixData.insert(OwnerRelativesDB, toInsert)
        .then((results) => {
            let item = results; //see item below
            console.log("inserted this row: ", item);
        })
        .catch((err) => {
            let errorMsg = err;
            console.log("the row was not inserted into the DB: ", errorMsg);
        });
}

function GetRelativeInformation() {
    const UserId = GetCurrentUserId();

    const API_END_POINT_WITH_USER_ID = API_END_POINT + '?userID=' + UserId;
    console.log(API_END_POINT_WITH_USER_ID);
    fetch(API_END_POINT_WITH_USER_ID, {
        method: 'GET', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        data.forEach(d => {
            InsertOwnerRelativesIntoDB(d, UserId);
        });
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function GetUserInput() {
    const buisnessStartDate = $w('#dateformed').value;
    const industry = $w('#industry').value;
    const address = $w('#businessaddress').value;
    const revenue = $w('#revenue').value;

    var UserInput = {
        "industry": industry,
        "buisnessStartDate": buisnessStartDate,
        "revenue": revenue,
        "stateCode": address.formatted
    }

    console.log("the input is: ", UserInput);
    return UserInput;
}

function GetIsRevenueLessThanMillion(RawRevenue) {
    if(RawRevenue === "LessThanMillion"){
        return true;
    }else{
        return false;
    }
}

function GetUniversalDate(localDate) {
    var universalDate = localDate;
    return universalDate;
}

function GetOnlyChars(str) {
    var charStr = str.replace(/[^a-zA-Z]+/g, '');
    return charStr;
}

function GetStateCode(address) {
    var addressArray = address.split(',');

    var arrLen = addressArray.length;

    var stateCodeAndPinCode = null;

    if(arrLen >= 2){
        stateCodeAndPinCode = addressArray[arrLen-2]
    }else{
        return null;
    }

   return GetOnlyChars(stateCodeAndPinCode);
}

function GetBuisnessInfo() {
    var userInput = GetUserInput();
    
    var IsRevenueLessThanMillion = GetIsRevenueLessThanMillion(userInput.revenue);
    var stateCode = GetStateCode(userInput.stateCode);
    var universalBuisnessStartDate = GetUniversalDate(userInput.buisnessStartDate);

    var BuisnessInfo = {
        "industry": userInput.industry,
        "buisnessStartDate": universalBuisnessStartDate,
        "isRevenueLessThanMillion": IsRevenueLessThanMillion,
        "stateCode": stateCode
    }
    console.log("the processed buisness info is : ", BuisnessInfo);
    return BuisnessInfo;
}

function OnClickContinue() { 
    //GetRelativeInformation();

    var BuisnessInfo = GetBuisnessInfo();

    var dateRange = GetCompensationDateRange(BuisnessInfo)
    var creditType = GetCreditType(BuisnessInfo)

    const buisnessInfo = {
        "startDate": dateRange.startDate,
        "endDate": dateRange.endDate,
        "creditType": creditType,
        "userId": getRandomId(10)
        //GetCurrentUserId()
    }

console.log("the buisnessInfo", buisnessInfo);

function getRandomId(max) {
    var randowInt =  Math.floor(Math.random() * max);
    return randowInt.toString();
  }

//AddBuisnessInfo(buisnessInfo);

}

module.exports = { GetStateCode }