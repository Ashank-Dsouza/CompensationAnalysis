
function FormatDate(Days, Month, Year) {
    return {
        "Day": Days,
        "Month": Month,
        "Year": Year
    }
}

// Input Object:

// const InputObject = {
// 	"State": 'WA',
// 	"IncorporationDate": Date(2021, 6, 1),
// 	"Industry": "Restaurant",
// 	"Revenue": 12000 
// }
const OneMillion = 1000000;

const RecognisedStateList = ['WA', 'CA', 'NV', 'NM', 'MN', 'MI', 'VT', 'NYC', 'NJ', 'PA', 'WV', 'VA', 'KY', 'NC', 'DC', 'CO'];

const StateToEndDate = {
    'WA': FormatDate(30, "June", 2021),
    'CA': FormatDate(14, "June", 2021),
    'NV': FormatDate(1, "June", 2021),
    'NM': FormatDate(23, "February", 2021),
    'MN': FormatDate(11, "March", 2021),
    'MI': FormatDate(1, "June", 2021),
    'VT': FormatDate(14, "June", 2021),
    'NYC': FormatDate(7, "May", 2021),
    'NJ': FormatDate(19, "May", 2021),
    'PA': FormatDate(1, "April", 2021),
    'WV': FormatDate(22, "February", 2021),
    'VA': FormatDate(16, "March", 2021),
    'KY': FormatDate(26, "February", 2021),
    'NC': FormatDate(18, "March", 2021),
    'DC': FormatDate(20, "May", 2021),
    'CO': FormatDate(24, "March", 2021)
}

function GetCompensationRanges(BuissnessInfo) {
    if (!BuissnessInfo) {
        console.log("Not enough information provided.");
        return null;
    }

    const IncorporationDate_UpperLimit = new Date(2020, 1, 15);

    const IncorporationDate = BuissnessInfo.IncorporationDate;

    if (IncorporationDate >= IncorporationDate_UpperLimit) {
        if (BuissnessInfo.Revenue < OneMillion) {
            return {
                "StartDate": FormatDate(1, "July", 2021),
                "EndDate": FormatDate(30, "December", 2021)
            }
        }else{
            return null;
        }
    }
    else {
        if (BuissnessInfo.Industry == "Other"  || BuissnessInfo.State == "Other" && BuissnessInfo.Industry == "Restaurant") {
            return {
                "StartDate": null,
                "EndDate": null
            }
        }
        var DateRange = {
            "StartDate": null,
            "EndDate": null
        }
        if (RecognisedStateList.includes(BuissnessInfo.State) && BuissnessInfo.Industry == "Restaurant") {
            DateRange.StartDate = FormatDate(1, "April", 2020)
            DateRange.EndDate = StateToEndDate[BuissnessInfo.State]

            return DateRange;
        }
    }


    console.log("un reconized scenario");
    return null;
}

module.exports = { GetCompensationRanges }