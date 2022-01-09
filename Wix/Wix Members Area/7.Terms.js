import { GetQuarters } from 'public/Storage';
import { GetTotalCredits } from 'public/TotalCredits'

$w.onReady(function () {
	var totalCredits = GetTotalCredits()
	$w('#totalCredits').text = totalCredits.toString()
});