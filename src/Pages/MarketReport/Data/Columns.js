import _ from "lodash"
import { MarketReportData } from "./MarketReportData";

export const columns = [
    {
        Header: "Realtor",
        Footer: "Total",
        accessor: "realtor",
    },
    {
        Header: <div style={{ whiteSpace: "pre-line"}}> Number of<br />Houses</div>,
        accessor: "housesForSale",
        id:"housesForSale",
        Footer: <span>{_.sum(_.map(MarketReportData, d => d.housesForSale))}</span>
    },
    {
        Header: <div style={{ whiteSpace: "pre-line"}}> Market<br />Share</div>,
        accessor: "marketShare",
        Cell: ({ value}) => { return value, value + ' %' },
        id:"marketShare",
        Footer: <span>{_.sum(_.map(MarketReportData, d => d.marketShare)) + " %"}</span>
    },
    {
        Header: <div style={{ whiteSpace: "pre-line"}}> Average<br />Price</div>,
        accessor: "avgPricePerM2",
        Cell: ({ value}) => { return value, value + ' m²' },
        id:"avgPricePerM2",
        Footer: <span>{_.mean(_.map(MarketReportData, d => d.avgPricePerM2)).toFixed(0) + " m²"}</span>
    },
    {
        Header: <div style={{ whiteSpace: "pre-line"}}> Average<br />Size</div>,
        accessor: "avgSizeInM2",
        Cell: ({ value}) => { return value, value + ' m²' },
        id:"avgSizeInM2",
        Footer: <span>{_.mean(_.map(MarketReportData, d => d.avgSizeInM2)).toFixed(0) + " m²"}</span>
    },
    {
        Header: <div style={{ whiteSpace: "pre-line"}}> Average<br />Time Listed</div>,
        accessor: "avgTimeListedInDays",
        Cell: ({ value}) => { return value, value + ' days' },
        id:"avgTimeListedInDays",
        Footer: <span>{_.mean(_.map(MarketReportData, d => d.avgTimeListedInDays)).toFixed(0) + " days"}</span>
    },
    {
        Header: <div style={{ whiteSpace: "pre-line"}}> Price<br />Reduction Rate</div>,
        accessor: "priceReducedHousePercentage",
        Cell: ({ value}) => { return value, value + ' %' },
        id:"priceReducedHousePercentage",
        Footer: <span>{_.mean(_.map(MarketReportData, d => d.priceReducedHousePercentage)).toFixed(2) + " %"}</span>
    },
    {
        Header: <div style={{ whiteSpace: "pre-line"}}> Average<br />Price Reduction</div>,
        accessor: "avgPercentagePriceReduction",
        Cell: ({ value}) => { return value, value + ' %' },
        id:"avgPercentagePriceReduction",
        Footer: <span>{_.mean(_.map(MarketReportData, d => d.avgPercentagePriceReduction)).toFixed(2) + " %"}</span>
    },   
]