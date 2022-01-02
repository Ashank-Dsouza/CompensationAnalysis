const f = require('../GetTotals');
const expect = require('chai').expect;


describe.only("Calculate the total all credits in all credits", () => {

    it("GetTotalCredits'", () => {
        const Quarters = {
            "2Q20": {
                "gross_wages": 100932.82,
                "qualified_wages": 100932.82,
                "refundable": 120111.20,
                "non_refundable": 2010.92,
                "total_credits": 8100.11,
            },

            "3Q20":
            {
                "gross_wages": 100932.82,
                "qualified_wages": 100932.82,
                "refundable": 120111.20,
                "non_refundable": 2010.92,
                "total_credits": 8100.11,
            },

            "4Q20":
            {
                "gross_wages": 100932.82,
                "qualified_wages": 100932.82,
                "refundable": 120111.20,
                "non_refundable": 2010.92,
                "total_credits": 8100.11,
            },

            "1Q21":
            {
                "gross_wages": 100932.82,
                "qualified_wages": 100932.82,
                "refundable": 120111.20,
                "non_refundable": 2010.92,
                "total_credits": 8100.11,
            },

            "2Q21":
            {
                "gross_wages": 100932.82,
                "qualified_wages": 100932.82,
                "refundable": 120111.20,
                "non_refundable": 2010.92,
                "total_credits": 8100.11,
            },

            "3Q21":
            {
                "gross_wages": 100932.82,
                "qualified_wages": 100932.82,
                "refundable": 120111.20,
                "non_refundable": 2010.92,
                "total_credits": 8100.11,
            },

            "4Q21":
            {
                "gross_wages": 100932.82,
                "qualified_wages": 100932.82,
                "refundable": 120111.20,
                "non_refundable": 2010.92,
                "total_credits": 8100.11,
            }
        }
        var totalCredits = f.GetTotalCredits(Quarters);

        expect(totalCredits).to.be.equal(64800.88);
    })
})