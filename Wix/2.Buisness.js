import wixUsers from 'wix-users';
import { fetch } from 'wix-fetch';
import wixData from 'wix-data';
import { GetCompensationDateRange, GetCreditType } from "public/BuisnessInfo";
import { AddBuisnessInfo } from 'public/BuisnessInfoDB';
import { AppendBuisnessInfo } from 'public/Storage';
import { local } from 'wix-storage';
import wixLocation from 'wix-location';

const GetFullNameEndPoint = "https://s3ezx1ppdc.execute-api.us-east-1.amazonaws.com/dev/tax/getFullName"

const OwnerRelativesDB = "ownersRelatives";

function GetCurrentUserId() {
    let user = wixUsers.currentUser;
    let userId = user.id;
    return userId;
}

function GetName(relativeInfo) {
    return relativeInfo.first_name + " " + relativeInfo.last_name;
}

function GetRelativeIndividualId(relativeInfo) {
    const individualId =  relativeInfo['individual_id'].split('#')[0];
    return individualId;
}

function IsIdInObjectArray(ObjectArray, Id) {
    var IsInArray = false;
    
    for (let index = 0; index < ObjectArray.length; index++) {
        const element = ObjectArray[index];
        if(Id === element.individualId){
            IsInArray = true;
            break;
        }
    }
    return IsInArray;
}

function GetAllRelativeNameId(RelativeInfos) {
    var relativeNameIds = [];

    for (let index = 0; index < RelativeInfos.length; index++) {
        const relativeInfo = RelativeInfos[index];

        const relativeName = GetName(relativeInfo);
        const relativeId = GetRelativeIndividualId(relativeInfo);

        if(!IsIdInObjectArray(relativeNameIds, relativeId)){
            var relativeNameId = relativeName + "@" + relativeId;
            relativeNameIds.push(relativeNameId);
        }

    }
    return relativeNameIds; 
}
async function InsertOwnerRelativesIntoDB(relativeInfo, UserId) {
    const relativeNameIds = GetAllRelativeNameId(relativeInfo);

    var result = await wixData.get(OwnerRelativesDB, UserId);
    console.log("the result of get on ", UserId, " is ", result);

    let toUpdate = {
        "userid": UserId,
        "ownerrelatives": relativeNameIds,
        "_id": UserId
    };
    
    if(result){
        wixData.update(OwnerRelativesDB, toUpdate)
        .then((results) => {
            let item = results; //see item below
            console.log("updated this row: ", item);
        })
        .catch((err) => {
            let errorMsg = err;
            console.log("could not update row: ", err);
        });
    }else{
        wixData.insert(OwnerRelativesDB, toUpdate)
        .then((results) => {
            let item = results; //see item below
            console.log("inserted this row: ", item);
        })
        .catch((err) => {
            let errorMsg = err;
            console.log("could not insert row: ", errorMsg);

        });
    }

}
function GetRelativeInformation() {
    const UserId = GetCurrentUserId();

    const GetNameURL = GetFullNameEndPoint + '?userID=' + UserId;
    console.log("calling ", GetNameURL);
    fetch(GetNameURL, {
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(relativeInfo => {
            console.log('Success: ', relativeInfo);
            InsertOwnerRelativesIntoDB(relativeInfo, UserId);
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
    if (RawRevenue === "LessThanMillion") {
        return true;
    } else {
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

    if (arrLen >= 2) {
        stateCodeAndPinCode = addressArray[arrLen - 2]
    } else {
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

export function OnClickContinue() {
    GetRelativeInformation();
    local.removeItem("buisnessData");

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
        var randowInt = Math.floor(Math.random() * max);
        return randowInt.toString();
    }
    //local.removeItem("buisnessInfo");
    AppendBuisnessInfo("buisnessInfo", buisnessInfo);

    console.log("the buisnessData is: ", local.getItem("buisnessData"));

    console.log("moving to owner relatives page....");

    //wixLocation.to('/owner-relatives')

}

//module.exports = { GetName, GetRelativeIndividualId, IsIdInObjectArray, GetAllRelativeNameId }