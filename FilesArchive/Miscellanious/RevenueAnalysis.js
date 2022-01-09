
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

function GetCreditType(BuisnessInfo) {
    if(!BuisnessInfo || !BuisnessInfo.industry){
        return null;
    }

    if(IsStringMatch( BuisnessInfo.industry, "restaurant"))
        return 'ERC';
    else{
        const lowerDateLimit = new Date("2020-02-15T00:00:00Z"); 
        const upperDateLimit = new Date("2020-12-31T00:00:00Z");

        console.log("the lowerDateLimit is: ", lowerDateLimit);
        console.log("the upperDateLimit is: ", upperDateLimit);


        var dateString = BuisnessInfo.buisnessStartDate.getDateString();

        console.log("the date string is: ", dateString);

        BuisnessInfo.buisnessStartDate = new Date( dateString + 'T00:00:00Z');

        console.log("the buisnessStartDate is: ", BuisnessInfo.buisnessStartDate);

        if(BuisnessInfo.revenue < REVENUE_MAX_LIMIT){
            if(lowerDateLimit < BuisnessInfo.buisnessStartDate &&  upperDateLimit > BuisnessInfo.buisnessStartDate){
                return "Startup";    
            }
        }else if(BuisnessInfo.revenue > REVENUE_MAX_LIMIT){
            return "RD";
        }

        if(BuisnessInfo.buisnessStartDate < lowerDateLimit || upperDateLimit < BuisnessInfo.buisnessStartDate ){
            return "RD";
        }
    }
    
}

function GetCompensationDateRange(BuisnessInfo, mockCreditType) {
    var emptyDateRange = {
        "startDate":  null,
        "endDate":  null
    }

    var creditType = null;
    if(mockCreditType){
        creditType = mockCreditType;
    }
    else{
        creditType = GetCreditType(BuisnessInfo);
    }

    if(!creditType)
        return emptyDateRange

    if(IsStringMatch(creditType, "RD")){
        return {
            "startDate":  new Date("2021-01-01T00:00:00Z"),
            "endDate":  new Date("2021-12-31T00:00:00Z")
        }
    }else if(IsStringMatch(creditType, "startup")){
        return {
            "startDate":  new Date("2021-07-01T00:00:00Z"),
            "endDate":  new Date("2021-12-31T00:00:00Z")
        }
    }else if(IsStringMatch(creditType, "ERC")){

        return GetDateRangeFromState(BuisnessInfo.stateCode)

    }else{
        return emptyDateRange;
    }
}

function GetDateRangeFromState(StateCode){
    const startDate = new Date("2020-04-01T00:00:00Z")
    const StateToEndDate = {
        'WA':  new Date("2021-06-30T00:00:00Z"),

        'CA': new Date("2021-06-14T00:00:00Z"),
    
        'NV': new Date("2021-06-01T00:00:00Z"),
        
        'NM': new Date("2021-02-23T00:00:00Z"),

        'MN': new Date("2021-03-11T00:00:00Z"),

        'MI': new Date("2021-06-01T00:00:00Z"),

        'VT': new Date("2021-06-14T00:00:00Z"),

        'NY':  new Date("2021-03-06T00:00:00Z"),
        
        'NJ': new Date("2021-05-19T00:00:00Z"),

        'PA': new Date("2021-04-01T00:00:00Z"),

        'WV': new Date("2021-02-22T00:00:00Z"),

        'VA': new Date("2021-03-16T00:00:00Z"),

        'KY': new Date("2021-02-26T00:00:00Z"),

        'NC': new Date("2021-03-18T00:00:00Z"),

        'DC': new Date("2021-05-20T00:00:00Z"),

        'CO': new Date("2021-03-24T00:00:00Z")
    }

    const endDate = StateToEndDate[StateCode];
    if(!endDate){
        return {
            "startDate": null,
            "endDate": null
        }
    }else{
        return {
            "startDate": startDate,
            "endDate": endDate
        }
    }

}

Date.prototype.getDateString = function() {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();
  
    return [this.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
           ].join('-');
  };
  

function IsStringMatch(StrOne, StrTwo){
    const areEqual = StrOne.toUpperCase() === StrTwo.toUpperCase();
    return areEqual;
}


module.exports = { GetCreditType, GetCompensationDateRange}