import wixData from 'wix-data';
import wixUsers from 'wix-users';

const IsMockOn = true;

const MockUserID = "d20c3555-0fac-49f4-9396-7ecbfa37b980";

$w.onReady(function () {
	// Write your JavaScript here

	// To select an element by ID use: $w("#elementID")

	// Click "Preview" to run your code
    //$w("#html2").postMessage(GetCurrentUserId());
    $w("#html2").src = "https://authpayroll.link?userID=" + GetCurrentUserId() + "";
});
//
const OwnerRelativesDB = "ownersRelatives";

function GetCurrentUserId() {
    //how to incorparate the userid with html
    let user = wixUsers.currentUser;
    let userId = user.id;
    return userId;
    /*if (IsMockOn) {
        userId = MockUserID
    }
    return userId;*/
}

function LoadNameOptions() {
    const UserId = GetCurrentUserId();
    wixData.query(OwnerRelativesDB)
        .ge("_owner", UserId)
        .find()
        .then((results) => {
            let newQuery = results.query;
            console.log(results);
        })
}


