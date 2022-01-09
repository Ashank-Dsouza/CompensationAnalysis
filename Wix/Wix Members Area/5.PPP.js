import { AppendBuisnessInfo } from 'public/Storage';
import {local} from 'wix-storage';
const buisnessDataKey = "buisnessData";

export function ppp1continue_click(event) {
	const loanAmount = $w('#loanAmount1').value;
	const loanDate = $w('#loan1date').value;
	const loanNonPayrollExpense = $w('#loan1nonpayroll1').value;

	console.log("expense is: ", loanNonPayrollExpense);

	const loanData = {
		"loanAmount": loanAmount,
		"loanDate": loanDate,
		"loanNonPayrollExpense": loanNonPayrollExpense
	}

	AppendBuisnessInfo("loanData", loanData);

	console.log("the businessData is now: ", local.getItem(buisnessDataKey));


}