const f = require('../StateList');
const expect = require('chai').expect;

// Input Object:

const InputObject = {
	"State": 'WA',
	"IncorporationDate": new Date(2020, 1, 1),
	"Industry": "Restaurant",
	"Revenue": 12000 
}

// Output Object:

var OutputObject = {
	"StartDate": new Date(2021, 6, 1),
	"EndDate": new Date(2021, 11, 30)
}

function ExpectDatesToEqual(ActualDate, ExpectedDate) {

	expect(ActualDate.Day).to.equal(ExpectedDate.Day);
	expect(ActualDate.Month).to.equal(ExpectedDate.Month);
	expect(ActualDate.Year).to.equal(ExpectedDate.Year);
}

function BasicResultVerification(DateRange) {
	expect(DateRange).to.not.be.null; 
	expect(DateRange.StartDate).to.not.be.null; 
	expect(DateRange.EndDate).to.not.be.null; 

	expect(DateRange).to.not.be.undefined; 
	expect(DateRange.StartDate).to.not.be.undefined; 
	expect(DateRange.EndDate).to.not.be.undefined; 

	console.log("the compensation is ");
    console.log("is: ", DateRange);
}

describe("Testing Compensation Date Getter ", () => {
    var url = "https://docs.google.com/spreadsheets/d/17TzXejGpq6URqtJSp89Hmnb5Pz2F0iun/edit#gid=1478183031";

	it("Testing on the February 15, 2020 rule ", () => {
		var expectedStartDate = {
			"Day": 1,
			"Month": "July",
			"Year": 2021
		}
		var expectedEndDate = {
			"Day": 30,
			"Month": "December",
			"Year": 2021
		}
		let InputObj = InputObject;
		InputObj.IncorporationDate = new Date(2020, 1, 15);	
		var result =  f.GetCompensationRanges(InputObj);

		BasicResultVerification(result);

		ExpectDatesToEqual(result.StartDate, expectedStartDate);
		ExpectDatesToEqual(result.EndDate, expectedEndDate);
	});

	it("Testing after the February 15, 2020 rule ", () => {
		var expectedStartDate = {
			"Day": 1,
			"Month": "July",
			"Year": 2021
		}
		var expectedEndDate = {
			"Day": 30,
			"Month": "December",
			"Year": 2021
		}
		let InputObj = InputObject;
		InputObj.IncorporationDate = new Date(2020, 6, 15);	
		var result =  f.GetCompensationRanges(InputObj);

		BasicResultVerification(result);
		
		ExpectDatesToEqual(result.StartDate, expectedStartDate);
		ExpectDatesToEqual(result.EndDate, expectedEndDate);
	});

	it("Testing after and on the February 15, 2020 rule; above 1 million ", () => {
		var expectedStartDate = null; //new Date(2018, 11, 24);
		var expectedEndDate = null; 

		let InputObj = InputObject;
		InputObj.Revenue = 1000001;  // 1 million
		InputObj.IncorporationDate = new Date(2021, 6, 15);	
		var result =  f.GetCompensationRanges(InputObject);

		console.log("the result is: ", result);

		expect(result).to.be.null;
	});

	it("Testing Get null,null when Industry is Other ", () => {

		let InputObj = InputObject;
		InputObj.Industry = "Other";
		InputObj.IncorporationDate = new Date(2020, 1, 5);
		console.log("the input object is : ", InputObj);
		var result =  f.GetCompensationRanges(InputObj);

		expect(result.StartDate).to.be.null;
		expect(result.EndDate).to.be.null;
	});

	it("Testing Get null,null when State is Other ", () => {

		let InputObj = InputObject;
		InputObj.State = "Other";
		InputObj.IncorporationDate = new Date(2020, 1, 5);
		//console.log("the input object is : ", InputObj);
		var result =  f.GetCompensationRanges(InputObj);

		expect(result.StartDate).to.be.null;
		expect(result.EndDate).to.be.null;
	});


	it("Testing State specific rule: NJ ", () => {
		var expectedStartDate = {
			"Day": 1,
			"Month": "April",
			"Year": 2020
		}
		var expectedEndDate = {
			"Day": 19,
			"Month": "May",
			"Year": 2021
		}

		let InputObject = {
			"State": 'NJ',
			"IncorporationDate": new Date(2020, 1, 11),
			"Industry": "Restaurant",
			"Revenue": 12000 
		}
		var result =  f.GetCompensationRanges(InputObject);

		BasicResultVerification(result);
		
		ExpectDatesToEqual(result.StartDate, expectedStartDate);
		ExpectDatesToEqual(result.EndDate, expectedEndDate);
	});


})