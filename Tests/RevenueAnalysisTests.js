const f = require('./../RevenueAnalysis.js');
const expect = require('chai').expect;
const sinon = require("sinon");


describe("Testing GetCreditType ....", () => {

	it("Testing GetCreditType logic: for restaurant return 'ERC'", () => {

        var buisnessInfo = {
            "industry": "restaurant",
        }
		
        const creditType = f.GetCreditType(buisnessInfo);

        expect(creditType).to.be.equal("ERC");

	});

    it("Testing GetCreditType logic: for restaurant return 'Startup'", () => {

        var buisnessInfo = {
            "industry": "tourism",
            "revenue": 50000,
            "buisnessStartDate": new Date("October 11, 2020 00:00:01")
        }
		
        const creditType = f.GetCreditType(buisnessInfo);

        expect(creditType).to.be.equal("Startup");

	});

    it("Testing GetCreditType logic: should return 'RD'", () => {

        var buisnessInfo = {
            "industry": "tourism",
            "revenue": 1000001,
            "buisnessStartDate": new Date("January 11, 2020 00:00:01")
        }
		
        const creditType = f.GetCreditType(buisnessInfo);

        expect(creditType).to.be.equal("RD");

	});

    it("Testing GetCreditType logic: should NOT return 'RD' when buisnessStartDate is before dateRangeStart", () => {

        var buisnessInfo = {
            "industry": "tourism",
            "revenue": 1000000,
            "buisnessStartDate": new Date("April 11, 2020 00:02:01")
        }
		
        const creditType = f.GetCreditType(buisnessInfo);

        console.log("the creditType = ", creditType);

        expect(creditType).not.to.be.equal("RD");

	});

    it("Testing GetCreditType logic: should NOT return 'RD' when buisnessStartDate is on dateRangeStart", () => {

        var buisnessInfo = {
            "industry": "tourism",
            "revenue": 1000000,
            "buisnessStartDate": new Date("2020-02-15T00:00:01.000Z")
        }
		
        const creditType = f.GetCreditType(buisnessInfo);

        expect(creditType).not.to.be.equal("RD");

	});

    it("Testing GetCreditType logic: should NOT return 'Startup' when buisnessStartDate is on dateRangeStart", () => {

        var buisnessInfo = {
            "industry": "tourism",
            "revenue": 50000,
            "buisnessStartDate": new Date("2020-02-15T01:00:01.000Z")
        }
		
        const creditType = f.GetCreditType(buisnessInfo);

        expect(creditType).not.to.be.equal("Startup");

	});

    it("Testing GetCreditType logic: should NOT return 'RD' when buisnessStartDate is on dateRangeEnd", () => {

        var buisnessInfo = {
            "industry": "tourism",
            "revenue": 1000000,
            "buisnessStartDate": new Date("2020-12-31T00:00:01.000Z")
        }
		
        const creditType = f.GetCreditType(buisnessInfo);


        expect(creditType).not.to.be.equal("RD");

	});

    it("Testing GetCreditType logic: should return NOT 'RD' when buisnessStartDate is before dateRangeStart", () => {

        var buisnessInfo = {
            "industry": "tourism",
            "revenue": 1000000,
            "buisnessStartDate": new Date("2020-02-14T23:59:59.000Z")
        }
		
        const creditType = f.GetCreditType(buisnessInfo);

        expect(creditType).not.to.be.equal("RD");

	});

    it("Testing GetCreditType logic: should return 'RD' when buisnessStartDate is after dateRangeEnd", () => {

        var buisnessInfo = {
            "industry": "tourism",
            "revenue": 1000000,
            "buisnessStartDate": new Date("2021-01-01T00:00:01.000Z")
        }
		
        const creditType = f.GetCreditType(buisnessInfo);

        expect(creditType).to.be.equal("RD");

	});

    it("Testing GetCreditType logic: should return 'RD' when buisnessStartDate when after covid start ", () => {

        var buisnessInfo = {
            "industry": "tourism",
            "revenue": 1000000,
            "buisnessStartDate": new Date("January 11, 2020 00:00:01")
        }
		
        const creditType = f.GetCreditType(buisnessInfo);

        expect(creditType).to.be.equal("RD");

	});

    it("Testing GetCreditType logic: should NOT return 'RD' when buisnessStartDate is before dateRangeStart", () => {

        var buisnessInfo = {
            "industry": "tourism",
            "revenue": 1000000,
            "buisnessStartDate": new Date("April 11, 2020 00:02:01")
        }
		
        const creditType = f.GetCreditType(buisnessInfo);

        console.log("the creditType = ", creditType);

        expect(creditType).not.to.be.equal("RD");

	});
});

describe.only("Testing GetCompensationDateRange()   ....", () => {

    it("Should return start date as 1/1/2021, end date as  when 'RD' is returned as credit type", () => {

        const dateRange = f.GetCompensationDateRange(null, "RD");

        ExpectDatesToEqual(dateRange.startDate, new Date("2021-01-01T00:00:00.000Z") )
        ExpectDatesToEqual(dateRange.endDate, new Date("2021-12-31T00:00:00.000Z") )

	});

    it("Should return start date as  7/1/2021, end date as 12/30/21 when 'startup' is returned as credit type", () => {

        const dateRange = f.GetCompensationDateRange(null, "startup");

        ExpectDatesToEqual(dateRange.startDate, new Date("2021-07-01T00:00:00.000Z") )
        ExpectDatesToEqual(dateRange.endDate, new Date("2021-12-31T00:00:00.000Z") )

	});

    it("Should return null in non-mock case", () => {

        const dateRange = f.GetCompensationDateRange(null);

        expect(dateRange).not.to.be.null;


        expect(dateRange.startDate).to.be.null;
        expect(dateRange.endDate).to.be.null;

	});

    it("Should return null wheb creditType is not in ERC, startup, RD", () => {

        const dateRange = f.GetCompensationDateRange(null, "healthcare");

        expect(dateRange).not.to.be.null;


        expect(dateRange.startDate).to.be.null;
        expect(dateRange.endDate).to.be.null;

	});

    it("Should return startDate as 1-April and endDate as 6/30/2021 wheb creditType is ERC", () => {

        var buisnessInfo = {
            "industry": "tourism",
            "revenue": 1000000,
            "buisnessStartDate": new Date("April 11, 2020 00:02:01"),
            "stateCode": 'WA'
        }

        const dateRange = f.GetCompensationDateRange(buisnessInfo, "ERC");

        ExpectDatesToEqual(dateRange.startDate, new Date("2020-04-01T00:00:00.000Z") )
        ExpectDatesToEqual(dateRange.endDate, new Date("2021-06-30T00:00:00.000Z") )
	});

    it("Should return null when stateCode is not registered and is when creditType is ERC", () => {

        var buisnessInfo = {
            "industry": "tourism",
            "revenue": 1000000,
            "buisnessStartDate": new Date("April 11, 2020 00:02:01"),
            "stateCode": 'KA'
        }

        const dateRange = f.GetCompensationDateRange(buisnessInfo, "ERC");

        expect(dateRange).not.to.be.null;


        expect(dateRange.startDate).to.be.null;
        expect(dateRange.endDate).to.be.null;

	});
});

function ExpectDatesToEqual(ActualDate, ExpectedDate) {

	expect(ActualDate.getDate()).to.equal(ExpectedDate.getDate());
	expect(ActualDate.getMonth()).to.equal(ExpectedDate.getMonth());
	expect(ActualDate.getFullYear()).to.equal(ExpectedDate.getFullYear());
}