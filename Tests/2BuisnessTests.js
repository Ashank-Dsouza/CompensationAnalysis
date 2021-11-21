const f = require('../Wix/2.Buisness');
const expect = require('chai').expect;
const sinon = require("sinon");


describe.only("Testing Input processing in 2. Buisness page ....", () => {

	it("Testing GetStateCode for address '333 Sunol St, San Jose, CA 95126, USA'", () => {

        var address = '333 Sunol St, San Jose, CA 95126, USA';
		
        const stateCode = f.GetStateCode(address);

        expect(stateCode).to.be.equal("CA");

	});

    it("Testing GetStateCode for address '777 Lawrence Expy #28, Santa Clara, NM 95051, USA'", () => {

        var address = '777 Lawrence Expy #28, Santa Clara,NM 95051, USA';
		
        const stateCode = f.GetStateCode(address);

        expect(stateCode).to.be.equal("NM");

	});
});

module.exports = { }