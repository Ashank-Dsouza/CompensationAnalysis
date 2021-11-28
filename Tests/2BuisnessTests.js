const f = require('../Wix/2.Buisness');
const expect = require('chai').expect;
const sinon = require("sinon");


describe("Testing Input processing in 2. Buisness page ....", () => {

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

describe.only("Testing 2.Buisness, populate owner relatives database", () => {

	it("Testing GetName", () => {

                var relativeInfo = {
                        "gross_pay_amount": "3200",
                        "user_id": "edac62ab-ad1f-47ab-b3cc-948f3ccb020f",
                        "last_name": "Merk",
                        "first_name": "Helena",
                        "individual_id": "1597fbfe-edfb-4d2d-977b-3dad41d152d5#1605657600000#3200",
                        "pay_date": "1605657600000",
                        "quarter": "4"
                };
                        
                const name = f.GetName(relativeInfo);

                expect(name).to.be.equal("Helena Merk");

	});

        it("Testing GetRelativeIndividualId", () => {

                var relativeInfo = {
                        "gross_pay_amount": "3200",
                        "user_id": "edac62ab-ad1f-47ab-b3cc-948f3ccb020f",
                        "last_name": "Merk",
                        "first_name": "Helena",
                        "individual_id": "1597fbfe-edfb-4d2d-977b-3dad41d152d5#1605657600000#3200",
                        "pay_date": "1605657600000",
                        "quarter": "4"
                };
                        
                const id = f.GetRelativeIndividualId(relativeInfo);

                expect(id).to.be.equal("1597fbfe-edfb-4d2d-977b-3dad41d152d5");

	});


        it("Testing GetAllRelativeNameId should return less than what was passed", () => {

                var relativeInfos = [
                        {
                            "gross_pay_amount": "3200",
                            "user_id": "edac62ab-ad1f-47ab-b3cc-948f3ccb020f",
                            "last_name": "Merk",
                            "first_name": "Helena Laila",
                            "individual_id": "1597fbfe-edfb-4d2d-977b-3dad41d152d5#1605657600000#3200",
                            "pay_date": "1605657600000",
                            "quarter": "4"
                        },
                        {
                            "gross_pay_amount": "4800",
                            "user_id": "edac62ab-ad1f-47ab-b3cc-948f3ccb020f",
                            "last_name": "Merk",
                            "first_name": "Helena Laila",
                            "individual_id": "1597fbfe-edfb-4d2d-977b-3dad41d152d5#1614297600000#4800",
                            "pay_date": "1614297600000",
                            "quarter": "5"
                        }
                    ];
                        
                const relativeNameIds = f.GetAllRelativeNameId(relativeInfos);


                expect(relativeNameIds.length).to.be.equal(1);

                // relativeInfos = [
                //         {
                //             "gross_pay_amount": "3200",
                //             "user_id": "edac62ab-ad1f-47ab-b3cc-948f3ccb020f",
                //             "last_name": "Merk",
                //             "first_name": "Helena Laila",
                //             "individual_id": "1597fbfe-edfb-4d2d-977b-3dad41d152d5#1605657600000#3200",
                //             "pay_date": "1605657600000",
                //             "quarter": "4"
                //         },
                //         {
                //             "gross_pay_amount": "4800",
                //             "user_id": "edac62ab-ad1f-47ab-b3cc-948f3ccb020f",
                //             "last_name": "Merk",
                //             "first_name": "Helena Laila",
                //             "individual_id": "3864886-3873878-37379-39737937#1614297600000#4800",
                //             "pay_date": "1614297600000",
                //             "quarter": "5"
                //         }
                //     ];
                        
                // relativeNameIds = f.GetAllRelativeNameId(relativeInfos);


                // expect(relativeNameIds.length).to.be.equal(2);

	});

        it("Testing GetAllRelativeNameId should return same length than what was passed", () => {

                var relativeInfos = [
                        {
                            "gross_pay_amount": "3200",
                            "user_id": "edac62ab-ad1f-47ab-b3cc-948f3ccb020f",
                            "last_name": "Merk",
                            "first_name": "Helena Laila",
                            "individual_id": "1597fbfe-edfb-4d2d-977b-3dad41d152d5#1605657600000#3200",
                            "pay_date": "1605657600000",
                            "quarter": "4"
                        },
                        {
                            "gross_pay_amount": "4800",
                            "user_id": "edac62ab-ad1f-47ab-b3cc-948f3ccb020f",
                            "last_name": "Merk",
                            "first_name": "Helena Laila",
                            "individual_id": "3864886-3873878-37379-39737937#1614297600000#4800",
                            "pay_date": "1614297600000",
                            "quarter": "5"
                        }
                    ];
                        
                const relativeNameIds = f.GetAllRelativeNameId(relativeInfos);


                expect(relativeNameIds.length).to.be.equal(2);
        });

        it("Testing IsIdInObjectArray", () => {

                var objectArray = [
                        {
                                "fullName": "Ashank Dsouza",
                                "individualId": "1234"
                        },
                        {
                                "fullName": "Asha Devi",
                                "individualId": "4998"
                        }
                ];
                        
                var id = f.IsIdInObjectArray(objectArray, "1234");

                expect(id).to.be.true;

                objectArray = [
                        {
                                "fullName": "Ashank Dsouza",
                                "individualId": "99597"
                        },
                        {
                                "fullName": "Asha Devi",
                                "individualId": "4998"
                        }
                ];
                        
                id = f.IsIdInObjectArray(objectArray, "1234");

                expect(id).to.be.false;

	});

});

module.exports = { }