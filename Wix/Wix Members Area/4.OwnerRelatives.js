import wixUsers from 'wix-users';
import { AppendBuisnessInfo } from 'public/Storage';
import {GetRelativeNameIds} from 'public/RelativeInfo';
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

async function LoadNameOptions() {
    const relativeNameIds = await GetRelativeNameIds();
    
    SetOptions(relativeNameIds);
}

function SetOptions(RelativeNames) {
    $w('#relativeNames').options = getCheckboxOptions(RelativeNames);
}

function getCheckboxOptions(Items) {
    var checkboxOptions = [];
    //check if valid
    for (let index = 0; index < Items.length; index++) {
        var relativeNameId = Items[index];
        const fullName = relativeNameId.relativeName;
        const individualId = relativeNameId.relativeId;
        var option = {
                "label": fullName,
                "value": individualId
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
}

