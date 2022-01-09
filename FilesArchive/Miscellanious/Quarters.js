import {GetUserDetails} from 'public/UserDetails';
import {GetQuarters} from 'public/Storage';

$w.onReady(function () {

    //PopulateEnteredInfo()
    var QuarterData = GetQuarters();
    if(QuarterData)
        PopulateQuarterTable(QuarterData.Quarters);
    else
        console.log("no data to display.");
});

const Quarters = ["2Q20", "3Q20", "4Q20", "1Q21", "2Q21", "3Q21", "4Q21"]

function PopulateQuarterTable(QuartersData) {
    $w("#quartersTable").forEachItem( ($item, itemData, index) => {
        var quarter = Quarters[index];

        var quarterData = QuartersData[quarter];

        let quarterNameElement = $item("#quarter");
        quarterNameElement.text = quarter;

        let repeatedElement = $item("#wages");
        repeatedElement.text = quarterData.gross_wages.toString();

        let refundableElement = $item("#refundable");
        refundableElement.text = quarterData.refundable.toString();

        let nonRefundableElement = $item("#nonRefundable");
        nonRefundableElement.text = quarterData.non_refundable.toString();

        let credits = $item("#credits");
        credits.text = quarterData.total_credits.toString();
      } );
}

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
	console.log("PopulateEnteredInfo");
    const userDetails = GetUserDetails()
	console.log("userDetails", userDetails);

    var buisnessInfo = userDetails.buisnessInfo.enteredBuisnessInfo;

    if(buisnessInfo){
		console.log("buisnessInfo", buisnessInfo);
        PopulateBuisnessInfo(buisnessInfo)
    }

    //---------------------------------------------
    // this is the population for the entered Representative
    //name
    var representativeInfo = userDetails.buisnessInfo.enteredRepresentative;
    if(representativeInfo){
		console.log("representativeInfo", representativeInfo);
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