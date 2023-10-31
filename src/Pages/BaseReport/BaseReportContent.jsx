import React from "react"
import MainTable from "../../Components/Tables/DataTableMainTableBR"
import SubTable from "../../Components/Tables/DataTableSubTableBR"
import { BaseReportData } from "./Data/BaseReportData"
import { GenerateBRColumns } from "./Data/BaseReportColumnsGenerator"

export default function BaseReportContent() {
    const subTableHeaderRefs = Array(4).fill(React.createRef());

    const headers = [
        {label: "Postalnumber", id: "postalNumber"},
        {label: "Number of Cases", id: "Cases"},
        {label: "Case Influx", id: "Influx"},
        {label: "Case Departure", id: "Departure"},
        {label: "Average Price", id: "AVGPrice"},
        {label: "Average Price Change", id: "AVGPriceChange"},
        {label: "Average Size", id: "AVGSize"},
        {label: "Average Size Change", id: "AVGSizeChange"},
        {label: "Average Price by Size", id: "AVGPriceBySize"},
        {label: "Average Price by Size Change", id: "AVGPriceBySizeChange"}
    ]

    const filterDataByPrefix = (data, prefix) => {
        return data.map(item => {
            const filteredItem = { postalNumber: item.postalNumber };
            for (const key in item) {
                if (key.startsWith(prefix)) {
                    filteredItem[key] = item[key];
                }
            }
            return filteredItem
        })
    }

    const villaData = filterDataByPrefix(BaseReportData, "villa")
    const condoData = filterDataByPrefix(BaseReportData, "condo")
    const coopData = filterDataByPrefix(BaseReportData, "coop")
    const holidayData = filterDataByPrefix(BaseReportData, "holiday")
    
    const villaColumns = GenerateBRColumns({houseType: "villa", splitDataset: villaData})
    const condoColumns = GenerateBRColumns({houseType: "condo", splitDataset: condoData})
    const coopColumns = GenerateBRColumns({houseType: "coop", splitDataset: coopData})
    const holidayColumns = GenerateBRColumns({houseType: "holiday", splitDataset: holidayData})

    const subTables = [
        <SubTable subTableData={villaData} subTableColumns={villaColumns} subTableCategory={"Villas / Townhousing"} subTableHeaderRef={subTableHeaderRefs[0]}/>,
        <SubTable subTableData={condoData} subTableColumns={condoColumns} subTableCategory={"Condominiums"} subTableHeaderRef={subTableHeaderRefs[1]}/>,
        <SubTable subTableData={coopData} subTableColumns={coopColumns} subTableCategory={"Cooperative Housings"} subTableHeaderRef={subTableHeaderRefs[2]}/>,
        <SubTable subTableData={holidayData} subTableColumns={holidayColumns} subTableCategory={"Holiday Housings"} subTableHeaderRef={subTableHeaderRefs[3]}/>,
    ]

    return (
        <div>
            <MainTable
            tableHeaders={headers}
            subTables={subTables}
            subTableHeaderRefs={subTableHeaderRefs}
            />
        </div>
    )
}