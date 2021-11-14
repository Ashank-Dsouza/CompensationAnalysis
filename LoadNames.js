import wixData from 'wix-data';
import wixUsers from 'wix-users';

const IsMockOn = true;

const MockUserID = "d20c3555-0fac-49f4-9396-7ecbfa37b980";

const CheckboxOptionsId = "relativeNames";

$w.onReady(function () {
	LoadNameOptions();
});

const OwnerRelativesDB = "ownersRelatives";

function GetCurrentUserId() {
    let user = wixUsers.currentUser;
    let userId = user.id;
    if (IsMockOn) {
        userId = MockUserID
    }
    return userId;
}

function LoadNameOptions() {
    const UserId = GetCurrentUserId();
    wixData.query(OwnerRelativesDB)
        .ge("_owner", UserId)
        .find()
        .then((results) => {
            console.log("the relative names are: ");
            const row = results.items[0];
            const relativeList = row.ownerrelatives;
            SetOptions(relativeList);
        })
}

function SetOptions(RelativeNames) {
    $w('#relativeNames').options = getCheckboxOptions(RelativeNames);
}

function getCheckboxOptions(Items){
    var checkboxOptions = [];

    for (let index = 0; index < Items.length; index++) {
        const payrollItem = Items[index];

        var option = {
            "label": payrollItem,
            "value": payrollItem
        };

        checkboxOptions.push(option);
        
    }
    console.log("the options being set are.....");
    console.log(checkboxOptions);
    return checkboxOptions;
}

