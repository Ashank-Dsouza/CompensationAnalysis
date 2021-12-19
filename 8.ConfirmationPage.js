import {GetUserDetails} from 'public/UserDetails';

$w.onReady(function () {
    PopulateEnteredInfo()
});

function PopulateBuisnessInfo(enteredBuisnessInfo) {
    // populate the buisness name    
    const buisnessName = enteredBuisnessInfo?.buisnessName;
    $w("#buisnessName").text = buisnessName;

    // populate the trade name
    const tradeName = enteredBuisnessInfo?.tradeName;
    $w("#tradeName").text = tradeName;

    // populate the ein 
    const EIN = enteredBuisnessInfo?.EIN;
    $w("#EIN").text = EIN;

    // populate the buisness phone
    const buisnessPhone = enteredBuisnessInfo?.buisnessPhNo;
    $w("#buisnessPhone").text = buisnessPhone;

    // populate the buisness Address 
    const buisnessAddress =  enteredBuisnessInfo?.buisnessAddress?.formatted;
    $w("#buisnessAddress").text = buisnessAddress;

    // populate the buisness Start Date
    const buisnessStartDate =  enteredBuisnessInfo?.buisnessStartDate;
    $w("#buisnessStartDate").text = buisnessStartDate;

    // populate the industry
    const industry =  enteredBuisnessInfo.industry;
    $w("#industry").text = industry;

    // populate the revenue
    const revenue =  enteredBuisnessInfo.revenue;

    if(revenue === "LessThanMillion"){
        $w("#revenue").text = "Less Than One Million";
    }else{
        $w("#revenue").text = "More Than One Million";
    }
}

function PopulateRepresentativeInfo(enteredRepresentative) {
    const name =  enteredRepresentative.name;
    $w("#name").text = name;

    const title =  enteredRepresentative.title;
    $w("#title").text = title;

    const phNo =  enteredRepresentative.phNo;
    $w("#phNo").text = phNo;

    const email =  enteredRepresentative.email;
    $w("#email").email = email;
}

function PopulateEnteredInfo() {
    const userDetails = GetUserDetails()

    var buisnessInfo = userDetails.enteredBuisnessInfo;

    if(buisnessInfo){
        PopulateBuisnessInfo(buisnessInfo)
    }

    //---------------------------------------------
    // this is the population for the entered Representative
    //name
    var representativeInfo = userDetails.enteredRepresentative;
    if(representativeInfo){
        PopulateRepresentativeInfo(representativeInfo)
    }
    
}


// {
//     buisnessInfo: null,
//     selectedRelatives: null,
//     loanData:{
//         first: {
//             loanAmount: null,
//             loanDate: null,
//             loanNonPayrollExpense: null
//         },
//         second: {
//             loanAmount: null,
//             loanDate: null,
//             loanNonPayrollExpense: null
//     }
// }