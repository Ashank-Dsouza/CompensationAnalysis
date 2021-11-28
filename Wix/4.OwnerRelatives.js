import wixData from 'wix-data';
import wixUsers from 'wix-users';
import { AppendBuisnessInfo } from 'public/Storage';
import { local } from 'wix-storage';

const IsMockOn = false;

const MockUserID = "08bbdfdc-0fac-4829-9ad1-620c8d581cf2";

const CheckboxOptionsId = "relativeNames";

$w.onReady(function () {
    if (IsMockOn) {
        $w('#relativeNames').options = [
            { 'label': 'Onion', 'value': 'onion' },
            { 'label': 'Tomatoes', 'value': 'tomatoes' },
            { 'label': 'Extra Cheese', 'value': 'cheese' }

        ];
    } else {
        LoadNameOptions();
    }
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
    console.log("the user id is: ", UserId);
    wixData.query(OwnerRelativesDB)
        .eq("_owner", UserId)
        .find()
        .then((results) => {//owner-relatives
        console.log("the results are: ", results);
            //console.log("the relative names are: ", results.items);
            const row = results.items[4];
            const relativeList = row["ownerrelatives"];
            console.log("relativeList ", relativeList);
            SetOptions(relativeList);
        })
}

function SetOptions(RelativeNames) {
    $w('#relativeNames').options = getCheckboxOptions(RelativeNames);
}

function getCheckboxOptions(Items) {
    var checkboxOptions = [];
    //check if valid
    for (let index = 0; index < Items.length; index++) {
        const relativeName = Items[index].fullName;
        const relativeIndividualId = Item[index].individualId;
        var option = {
                "label": relativeName,
                "value": relativeIndividualId
        };
        checkboxOptions.push(option);
    }
    console.log("the options being set are.....");
    console.log(checkboxOptions);
    return checkboxOptions;
}

export function OnClickContinue() { // TODO: connect to continue button
    let selections = Array.prototype.map.call($w('#relativeNames').selectedIndices, function (x) { return $w('#relativeNames').options[x].value });
    console.log("the selections are: ", selections);
    AppendBuisnessInfo("selectedRelatives", selections);

    console.log("the buisnessData is: ", local.getItem("buisnessData"));

    for (var selection in selections) {
        wixData.get(OwnerRelativesDB, selection)
            .then((item) => {
                item.excluded = true;
                wixData.update(OwnerRelativesDB, item);
            }).catch((err) => {
                let errorMsg = err;
                console.log(errorMsg);
            });
    }
}

