const QuartersData = {
    "Quarters": {
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
        },
    }
}

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

