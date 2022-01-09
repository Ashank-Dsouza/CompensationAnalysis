import wixUsers from 'wix-users';

$w.onReady(function () {

    $w("#html2").src = "https://authpayroll.link?userID=" + GetCurrentUserId() + "";
});

function GetCurrentUserId() {
    let user = wixUsers.currentUser;
    let userId = user.id;
    return userId;
}


