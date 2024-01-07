import _ from "lodash";

export function generateColumns({mergedDataSet, totalHousesForSale}) {

//short explanation of the used elements in a react table column,
//Header, contains the information that you want to have in the header.
//Footer, likewise with Header, is the information you want in the footer.
//accessor, is the data you want in the cell for the column, it should usually refer to a value from your data
//Cell, is what is actually displayed in the cell(s) for the column and can be used to format the data, like seen below.
const columns = [
  {
    Header: "Realtor",
    Footer: "Total",
    accessor: "realtor",
  },
  {
    Header: (
      <div>
        {" "}
        Number of
        <br />
        Houses
      </div>
    ),
    accessor: "housesForSale",
    id: "housesForSale",
    Footer: () => {
      return <div>{totalHousesForSale}</div>;
    },
  },
  {
    Header: (
      <div>
        {" "}
        Market
        <br />
        Share
      </div>
    ),
    Cell: ({ row }) => {
      // Access the "housesForSale" value from the previous column
      const housesForSale = row.original.housesForSale || 0;

      // Calculate market share as a percentage, handling division by zero
      const marketShare =
        totalHousesForSale !== 0
          ? (housesForSale / totalHousesForSale) * 100
          : 0;

      return isFinite(marketShare) ? marketShare.toFixed(2) + " %" : "N/A";
    },
    id: "marketShare",
    Footer: () => {
        // Calculate the total market share based on the total houses across datasets
        const totalMarketShare =
        totalHousesForSale !== 0
            ? (_.sumBy(mergedDataSet, (d) => d.housesForSale)  / totalHousesForSale) * 100
            : 0;

        return (
          <span>
            {mergedDataSet.length > 0
              ? totalMarketShare.toFixed(2) + " %"
              : 0}
          </span>
      );
    },
  },
  {
    Header: (
      <div>
        {" "}
        Average
        <br />
        Price(m²)
      </div>
    ),
    accessor: "avgPricePerM2",
    Cell: ({ value, delimiter = "." }) => {
      const parts = value.toFixed(0).toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
      return parts.join(".");
    },
    id: "avgPricePerM2",
    Footer: () => {
      const delimiter = "."
      const meanValue = _.mean(_.map(mergedDataSet, (d) => d.avgPricePerM2)).toFixed(0)
      const parts = meanValue.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
      return parts.join(".")
    },
  },
  {
    Header: (
      <div>
        {" "}
        Average
        <br />
        Size
      </div>
    ),
    accessor: "avgSizeInM2",
    Cell: ({ value }) => {
      return value + " m²";
    },
    id: "avgSizeInM2",
    Footer: (
      <span>
        {_.mean(_.map(mergedDataSet, (d) => d.avgSizeInM2)).toFixed(0) +
          " m²"}
      </span>
    ),
  },
  {
    Header: (
      <div>
        {" "}
        Average
        <br />
        Time Listed
      </div>
    ),
    accessor: "avgTimeListedInDays",
    Cell: ({ value }) => {
      return value + " days";
    },
    id: "avgTimeListedInDays",
    Footer: (
      <span>
        {_.mean(_.map(mergedDataSet, (d) => d.avgTimeListedInDays)).toFixed(
          0
        ) + " days"}
      </span>
    ),
  },
  {
    Header: (
      <div style={{ whiteSpace: "pre-line" }}>
        {" "}
        Price
        <br />
        Reduction Rate
      </div>
    ),
    accessor: "priceReducedHousePercentage",
    Cell: ({ value }) => {
      return value + " %";
    },
    id: "priceReducedHousePercentage",
    Footer: (
      <span>
        {_.mean(
          _.map(mergedDataSet, (d) => d.priceReducedHousePercentage)
        ).toFixed(2) + " %"}
      </span>
    ),
  },
  {
    Header: (
      <div>
        {" "}
        Average
        <br />
        Price Reduction
      </div>
    ),
    accessor: "avgPercentagePriceReduction",
    Cell: ({ value }) => {
      return value + " %";
    },
    id: "avgPercentagePriceReduction",
    Footer: (
      <span>
        {_.mean(
          _.map(mergedDataSet, (d) => d.avgPercentagePriceReduction)
        ).toFixed(2) + " %"}
      </span>
    ),
  },
];

return columns
}