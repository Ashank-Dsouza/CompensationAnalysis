import wixUsers from 'wix-users';
import { fetch } from 'wix-fetch';
import wixData from 'wix-data';
import { GetCompensationDateRange, GetCreditType } from "public/BuisnessInfo";
import { AddBuisnessInfo } from 'public/BuisnessInfoDB';
import { AppendBuisnessInfo } from 'public/Storage';
import { local } from 'wix-storage';


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
    const userInput = GetUserInput();
    var buisnessInfoInput = userInput.buisnessInfo;

    var IsRevenueLessThanMillion = GetIsRevenueLessThanMillion(buisnessInfoInput.revenue);
    var stateCode = GetStateCode(buisnessInfoInput.buisnessAddress);
    var buisnessStartDate = GetUniversalDate(buisnessInfoInput.buisnessStartDate);

    var BuisnessInfo = {
        "industry": buisnessInfoInput.industry,
        "buisnessStartDate": buisnessStartDate,
        "isRevenueLessThanMillion": IsRevenueLessThanMillion,
        "stateCode": stateCode
    }
    console.log("the processed buisness info is : ", BuisnessInfo);
    return BuisnessInfo;
}

function AddBuisnessDataToStore(buisnessInfo) {
    const userInput = GetUserInput();
    const buisnessInfoInput = userInput.buisnessInfo;
    const representativeInfo = userInput.representativeInfo;
    const totalBuisnessInfo = {
        "buisnessInfo": buisnessInfo,
        "enteredBuisnessInfo": buisnessInfoInput,
        "enteredRepresentative": representativeInfo
    }
    AppendBuisnessInfo("buisnessInfo", totalBuisnessInfo);
}

function GetCurrentUserId() {
    let user = wixUsers.currentUser;
    let userId = user.id;
    if (IsMockOn) {
        userId = MockUserID
    }
    return userId;
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
        "userId": GetCurrentUserId()
    }

    console.log("the buisnessInfo", buisnessInfo);

    AddBuisnessDataToStore(buisnessInfo);

    console.log("the buisnessData is: ", local.getItem("buisnessData"));

}

function GetUserInput() {
    const buisnessInfo = GetEnteredBuisnessInfo();
    const representativeInfo = GetEnteredRepInfo();
    return {
        "buisnessInfo": buisnessInfo,
        "representativeInfo": representativeInfo
    }
    
}

function GetEnteredBuisnessInfo() {
    var enteredBuisnessInfo = {
        buisnessName: $w('#businessname').value,
        tradeName: $w('#tradename'),
        EIN: $w('#ein'),
        buisnessAddress: $w('#businessaddress'),
        buisnessPhNo: $w('#businessphone'),
        buisnessStartDate: $w('#dateformed'),
        industry: $w('#industry'),
        revenue: $w('#revenue')
    }
    return enteredBuisnessInfo;
}

function GetEnteredRepInfo(params) {
    var representativeInfo = {
        name:  $w('#authorizedrep'),
        title:  $w('#title'),
        phNo:  $w('#phonerep'),
        email:  $w('#email'),
    }
    return representativeInfo;
}

//module.exports = { GetName, GetRelativeIndividualId, IsIdInObjectArray, GetAllRelativeNameId }