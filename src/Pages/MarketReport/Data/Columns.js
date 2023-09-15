import _ from "lodash"
import { MarketReportData } from "./MarketReportData";

//short explanation of the used elements in a react table column,
//Header, contains the information that you want to have in the header.
//Footer, likewise with Header, is the information you want in the footer.
//accessor, is the data you want in the cell for the column, it should usually refer to a value from your data
//Cell, is what is actually displayed in the cell(s) for the column and can be used to format the data, like seen below.
export const columns = [
    {
        Header: "Realtor",
        Footer: "Total",
        accessor: "realtor",
    },
    {
        Header: <div> Number of<br />Houses</div>,
        accessor: "housesForSale",
        id:"housesForSale",
        Footer: columnProps => {

            const totalHousesForSale = _.sum(_.map(columnProps.data, d => d.housesForSale))
            console.log(totalHousesForSale)
            
            return (
                <span>
                    {totalHousesForSale}
                </span>
            )
        }
    },
    {
        Header: <div> Market<br />Share</div>,
        Cell: ({ row, column }) => {
            // Access the "housesForSale" value from the previous column
            const housesForSale = row.original.housesForSale || 0;
            
            // Access the sum of "housesForSale" from the footer of the "Number of Houses" column
            const totalHousesForSale = row.cells.find(cell => cell.column.id === 'housesForSale');
            console.log(totalHousesForSale.column.Footer);
            
            // Calculate market share as a percentage
            const marketShare = (housesForSale / totalHousesForSale) * 100;
    
            return marketShare.toFixed(2) + ' %';
        },
        id:"marketShare",
        Footer: columnProps => {
            return (
                <span>
                    {columnProps.data.length > 0 ? _.sum(_.map(columnProps.data, d => d.marketShare)) : 0}
                </span>
            )
        }
    },
    {
        Header: <div> Average<br />Price</div>,
        accessor: "avgPricePerM2",
        Cell: ({ value}) => { return value + ' m²' },
        id:"avgPricePerM2",
        Footer: <span>{_.mean(_.map(MarketReportData, d => d.avgPricePerM2)).toFixed(0) + " m²"}</span>
    },
    {
        Header: <div> Average<br />Size</div>,
        accessor: "avgSizeInM2",
        Cell: ({ value}) => { return value + ' m²' },
        id:"avgSizeInM2",
        Footer: <span>{_.mean(_.map(MarketReportData, d => d.avgSizeInM2)).toFixed(0) + " m²"}</span>
    },
    {
        Header: <div> Average<br />Time Listed</div>,
        accessor: "avgTimeListedInDays",
        Cell: ({ value}) => { return value + ' days' },
        id:"avgTimeListedInDays",
        Footer: <span>{_.mean(_.map(MarketReportData, d => d.avgTimeListedInDays)).toFixed(0) + " days"}</span>
    },
    {
        Header: <div style={{ whiteSpace: "pre-line"}}> Price<br />Reduction Rate</div>,
        accessor: "priceReducedHousePercentage",
        Cell: ({ value}) => { return value + ' %' },
        id:"priceReducedHousePercentage",
        Footer: <span>{_.mean(_.map(MarketReportData, d => d.priceReducedHousePercentage)).toFixed(2) + " %"}</span>
    },
    {
        Header: <div> Average<br />Price Reduction</div>,
        accessor: "avgPercentagePriceReduction",
        Cell: ({ value}) => { return value + ' %' },
        id:"avgPercentagePriceReduction",
        Footer: <span>{_.mean(_.map(MarketReportData, d => d.avgPercentagePriceReduction)).toFixed(2) + " %"}</span>
    },   
]