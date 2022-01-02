import wixUsers from 'wix-users';
import { AppendBuisnessInfo } from 'public/Storage';
import { GetRevenueInfo } from 'public/BuisnessInfo'
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
    var stateCode = GetStateCode(buisnessInfoInput.buisnessAddress.formatted);
    var buisnessStartDate = GetUniversalDate(buisnessInfoInput.buisnessStartDate);

    var BuisnessInfo = {
        "industry": buisnessInfoInput.industry,
        "buisnessStartDate": buisnessStartDate,
        "isRevenueLessThanMillion": IsRevenueLessThanMillion,
        "stateCode": stateCode
    }

    return BuisnessInfo;
}

function AddBuisnessDataToStore(revenueInfo, BuisnessInfo) {
    const userInput = GetUserInput();
    const buisnessInfoInput = userInput.buisnessInfo;
    const representativeInfo = userInput.representativeInfo;
    const totalBuisnessInfo = {
        "revenueInfo": revenueInfo,
        "enteredRevenueInfo": BuisnessInfo,
        "enteredBuisnessInfo": buisnessInfoInput,
        "enteredRepresentative": representativeInfo
    }
    AppendBuisnessInfo("buisnessInfo", totalBuisnessInfo);
}

export function OnClickContinue() {
    //local.removeItem("buisnessData");

    var BuisnessInfo = GetBuisnessInfo();

    var revenueInfo = GetRevenueInfo(BuisnessInfo);


    AddBuisnessDataToStore(revenueInfo, BuisnessInfo);

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
        tradeName: $w('#tradename').value,
        EIN: $w('#ein').value,
        buisnessAddress: $w('#businessaddress').value,
        buisnessPhNo: $w('#businessphone').value,
        buisnessStartDate: $w('#dateformed').value,
        industry: $w('#industry').value,
        revenue: $w('#revenue').value
    }
    return enteredBuisnessInfo;
}

function GetEnteredRepInfo() {
    var representativeInfo = {
        name:  $w('#authorizedrep').value,
        title:  $w('#title').value,
        phNo:  $w('#phonerep').value,
        email:  $w('#email').value,
    }
    return representativeInfo;
}

//module.exports = { GetName, GetRelativeIndividualId, IsIdInObjectArray, GetAllRelativeNameId }