import { GetBuisnessData } from 'public/Storage';


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
//         creditType: "RD"
//     }

//     selectedRelatives:  ["830430jdkwjek", "lewli39093i34"],
//     loanData: null,
//     loanDataTwo: null

// }
