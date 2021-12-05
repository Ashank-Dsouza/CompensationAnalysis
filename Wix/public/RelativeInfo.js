import wixUsers from 'wix-users';

const GetFullNameEndPoint = "https://s3ezx1ppdc.execute-api.us-east-1.amazonaws.com/dev/tax/getFullName"

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

export async function GetRelativeNameIds() {

    var RelativeInfos = await GetRelativeInformation();

    var relativeNameIds = [];

    for (let index = 0; index < RelativeInfos.length; index++) {
        const relativeInfo = RelativeInfos[index];

        const relativeName = GetName(relativeInfo);
        const relativeId = GetRelativeIndividualId(relativeInfo);

        if(!IsIdInObjectArray(relativeNameIds, relativeId)){
            var relativeNameId = {
                "relativeName": relativeName,
                "relativeId": relativeId
            }
            relativeNameIds.push(relativeNameId);
        }

    }
    return relativeNameIds; 
}

async function GetRelativeInformation() {
    const UserId = GetCurrentUserId();

    const URL = GetFullNameEndPoint + '?userID=' + UserId;
    console.log("calling ", URL);
    var response = await fetch(URL, {
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            }
        })
    var responseJSON = await response.json();

    // responseJSON = [
    //     {
    //         "gross_pay_amount": "3200",
    //         "user_id": "edac62ab-ad1f-47ab-b3cc-948f3ccb020f",
    //         "last_name": "Merk",
    //         "first_name": "Helena Laila",
    //         "individual_id": "1597fbfe-edfb-4d2d-977b-3dad41d152d5#1605657600000#3200",
    //         "pay_date": "1605657600000",
    //         "quarter": "4"
    //     },
    //     {
    //         "gross_pay_amount": "4800",
    //         "user_id": "edac62ab-ad1f-47ab-b3cc-948f3ccb020f",
    //         "last_name": "Merk",
    //         "first_name": "Helena Laila",
    //         "individual_id": "1597fbfe-edfb-4d2d-977b-3dad41d152d5#1614297600000#4800",
    //         "pay_date": "1614297600000",
    //         "quarter": "5"
    //     }
    // ]
    return responseJSON;
}

