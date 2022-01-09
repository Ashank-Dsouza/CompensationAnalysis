import wixUsers from 'wix-users';

const MockUserID = "d20c3555-0fac-49f4-9396-7ecbfa37b980";

$w.onReady(function () {

    $w("#html2").src = "https://authpayroll.link?userID=" + GetCurrentUserId() + "";
});

const OwnerRelativesDB = "ownersRelatives";

function GetCurrentUserId() {
    let user = wixUsers.currentUser;
    let userId = user.id;
    return userId;
}


