import wixData from 'wix-data';

const BuisnessInfoDB = "businessInfo";

export function AddBuisnessInfo(BuisnessInfo) {
    let toInsert = {
        "_id": null,
        "eligibilitystart": BuisnessInfo.startDate,
        "eligibilityend": BuisnessInfo.endDate,
        "credittype": BuisnessInfo.creditType
    };
    wixData.insert(BuisnessInfoDB, toInsert)
        .then((results) => {
            console.log("the row was inserted ", results);
        })
        .catch((err) => {
            let errorMsg = err;
            console.log("the row could NOT be inserted!!  Error: ", errorMsg);
        });
}

