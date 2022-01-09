import wixUsers from 'wix-users';
import { fetch } from 'wix-fetch';
import wixData from 'wix-data';

const IsMockOn = true;

const MockUserID = "d20c3555-0fac-49f4-9396-7ecbfa37b980";

const MockAPIResponse = ["johndoe","adrianbial","markulm","nickgreg"];

const API_END_POINT = "https://flcl52rba5.execute-api.us-east-1.amazonaws.com/dev/tax/getFullName/"

const OwnerRelativesDB = "ownersRelatives";

function GetCurrentUserId() {
    let user = wixUsers.currentUser;
    let userId = user.id;
    if (IsMockOn) {
        userId = MockUserID
    }
    return userId;
}

function InsertOwnerRelativesIntoDB(RelativeNames, UserId) {
    let toInsert = {
          "ownerrelatives":  RelativeNames,
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

    const API_END_POINT_WITH_USER_ID = API_END_POINT + UserId;

    fetch(API_END_POINT_WITH_USER_ID, { "method": "get" })
        .then((httpResponse) => {
            if (httpResponse.ok) {
                return httpResponse.json();
            } else {
                return Promise.reject("Fetch did not succeed");
            }
        })
        .then(jsonData => InsertOwnerRelativesIntoDB(jsonData, UserId))
        .catch(err => console.log(err));
}

export function OnClickContinue() {
    if(IsMockOn){
        InsertOwnerRelativesIntoDB(MockAPIResponse, MockUserID);
    }else{
        GetRelativeInformation();
    }
}
