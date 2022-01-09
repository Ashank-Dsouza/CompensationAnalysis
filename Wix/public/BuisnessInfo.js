import wixUsers from 'wix-users';

const REVENUE_MAX_LIMIT = 1000000;

// input:
// var buisnessInfo = {
//     "industry": "restaurant",
//     "buisnessStartDate": new Date("2020-02-15T00:00:00Z"),
//     "revenue": 400000,
//     "stateCode": 'CA'
// }

// output:
// {
//     "startDate":  new Date("2021-01-01T00:00:00Z"),
//     "endDate":  new Date("2021-12-31T00:00:00Z")
// }

function GetCurrentUserId() {
    let user = wixUsers.currentUser;
    let userId = user.id;
    return userId;
}

export function GetRevenueInfo(BuisnessInfo) {
    var creditType = GetCreditType(BuisnessInfo);
    var dateRange = GetCompensationDateRange(BuisnessInfo);

    return {
        "startDate": dateRange.startDate,
        "endDate": dateRange.endDate,
        "creditType": creditType,
        "userId": GetCurrentUserId()
    }
}

function GetCompensationDateRange(BuisnessInfo, mockCreditType) {
    var emptyDateRange = {
        "startDate": null,
        "endDate": null
    }

    var creditType = null;
    if (mockCreditType) {
        creditType = mockCreditType;
    } else {
        creditType = GetCreditType(BuisnessInfo);
    }

    if (!creditType)
        return emptyDateRange

    if (IsStringMatch(creditType, "RD")) {
        return {
            "startDate": new Date("2021-01-01T00:00:00Z"),
            "endDate": new Date("2021-12-31T00:00:00Z")
        }
    } else if (IsStringMatch(creditType, "startup")) {
        return {
            "startDate": new Date("2021-07-01T00:00:00Z"),
            "endDate": new Date("2021-12-31T00:00:00Z")
        }
    } else if (IsStringMatch(creditType, "ERC")) {

        return GetDateRangeFromState(BuisnessInfo.stateCode)

    } else {
        return emptyDateRange;
    }
}

function GetCreditType(BuisnessInfo) {
    if (!BuisnessInfo || !BuisnessInfo.industry) {
        return null;
    }

    if (IsStringMatch(BuisnessInfo.industry, "restaurant"))
        return 'ERC';
    else {
        const lowerDateLimit = new Date("2020-02-15T00:00:00Z");
        const upperDateLimit = new Date("2020-12-31T00:00:00Z");

        console.log("the lowerDateLimit is: ", lowerDateLimit);
        console.log("the upperDateLimit is: ", upperDateLimit);

        var dateString = getDateString(BuisnessInfo.buisnessStartDate);

        console.log("the date string is: ", dateString);

        BuisnessInfo.buisnessStartDate = new Date(dateString + 'T00:00:00Z');

        console.log("the buisnessStartDate is: ", BuisnessInfo.buisnessStartDate);

        if (BuisnessInfo.isRevenueLessThanMillion) {
            if (lowerDateLimit < BuisnessInfo.buisnessStartDate && upperDateLimit > BuisnessInfo.buisnessStartDate) {
                return "Startup";
            }
        } else {
            return "RD";
        }

        if (BuisnessInfo.buisnessStartDate < lowerDateLimit || upperDateLimit < BuisnessInfo.buisnessStartDate) {
            return "RD";
        }
    }

}
//should include end date (thus making the last date inclusive)
//test case: State = 'CA': start and end date should be inclusive
//RD, ERC, Startup

//If credit-type = ERC, then dates should be inclusive
//If industry =! restaurant, credit type 

//Start_date

function GetDateRangeFromState(StateCode) {
    const startDate = new Date("2020-04-01T00:00:00Z")
    const StateToEndDate = {
        'WA': new Date("2021-06-30T00:00:00Z"),

        'CA': new Date("2021-06-14T00:00:00Z"),

        'NV': new Date("2021-06-01T00:00:00Z"),

        'NM': new Date("2021-02-23T00:00:00Z"),

        'MN': new Date("2021-03-11T00:00:00Z"),

        'MI': new Date("2021-06-01T00:00:00Z"),

        'VT': new Date("2021-06-14T00:00:00Z"),

        'NY': new Date("2021-03-06T00:00:00Z"),

        'NJ': new Date("2021-05-19T00:00:00Z"),

        'PA': new Date("2021-04-01T00:00:00Z"),

        'WV': new Date("2021-02-22T00:00:00Z"),

        'VA': new Date("2021-03-16T00:00:00Z"),

        'KY': new Date("2021-02-26T00:00:00Z"),

        'NC': new Date("2021-03-18T00:00:00Z"),

        'DC': new Date("2021-05-20T00:00:00Z"),

        'CO': new Date("2021-03-24T00:00:00Z"),

        'FL': new Date("2020-09-25T00:00:00Z")
    }

    const endDate = StateToEndDate[StateCode];
    if (!endDate) {
        return {
            "startDate": null,
            "endDate": null
        }
    } else {
        return {
            "startDate": startDate,
            "endDate": endDate
        }
    }

}

function getDateString(date) {
    var mm = date.getMonth() + 1; // getMonth() is zero-based
    var dd = date.getDate();
    var yy = date.getFullYear();

    var monthStr = null;

    if (mm <= 9) {
        monthStr = "0" + mm.toString();
    } else {
        monthStr = mm.toString()
    }

    return yy + "-" + monthStr + "-" + dd;
}

function IsStringMatch(StrOne, StrTwo) {
    const areEqual = StrOne.toUpperCase() === StrTwo.toUpperCase();
    return areEqual;
}

//module.exports = { GetCreditType, GetCompensationDateRange}