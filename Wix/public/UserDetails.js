import { GetBuisnessData } from 'public/Storage';

// this file formats data according to the below format

// returns UserDetails in proper format for the fullName api 
export function GetUserDetails() {
    const userDetails = {
        buisnessInfo: null,
        selectedRelatives: null,
        loanData:{
            first: {
                loanAmount: null,
                loanDate: null,
                loanNonPayrollExpense: null
            },
            second: {
                loanAmount: null,
                loanDate: null,
                loanNonPayrollExpense: null
        }
    }
}

    const buisnessData = GetBuisnessData();
    userDetails.buisnessInfo = buisnessData.buisnessInfo;
    userDetails.selectedRelatives = buisnessData.selectedRelatives;
    userDetails.loanData.first = buisnessData.loanData;
    userDetails.loanData.second = buisnessData.loanDataTwo;

    return userDetails;

}

//the object in storage looks like:
// {
//     buisnessInfo: {
//         startDate: "01-01-2021", //MM/DD/YYYY
//         endDate: "01-01-2021",
//         creditType: "RD",
//         enteredBuisnessInfo: {
//              buisnessName: null,
//              tradeName: null,
//              EIN: null,
//              buisnessAddress: null,
//              buisnessPhNo: null,
//              buisnessStartDate: null,
//              industry: null,
//              revenue: null
//          }
//       enteredRepresentative: {
//              name: null,
//              title: null,
//              phNo: null,
//              email: null,
//          }
//     }

//     selectedRelatives:  ["830430jdkwjek", "lewli39093i34"],
//     loanData: null,
//     loanDataTwo: null

// }
