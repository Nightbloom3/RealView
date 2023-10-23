import MainTable from "../../Components/Tables/DataTableMainTableBR"
import SubTable from "../../Components/Tables/DataTableSubTableBR"
import { BaseReportData } from "./Data/BaseReportData"
import { GenerateBRColumns } from "./Data/BaseReportColumnsGenerator"

export default function BaseReportContent() {

    const headers = [
        "Postalnumber",
        "Number of Cases",
        "Case Influx",
        "Case Departure",
        "Average Price",
        "Average Price Change",
        "Average Size",
        "Average Size Change",
        "Average Price by Size",
        "Average Price by Size Change"
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
        <SubTable subTableData={villaData} subTableColumns={villaColumns} subTableCategory={"Villas / Townhousing"}/>,
        <SubTable subTableData={condoData} subTableColumns={condoColumns} subTableCategory={"Condominiums"}/>,
        <SubTable subTableData={coopData} subTableColumns={coopColumns} subTableCategory={"Cooperative Housings"}/>,
        <SubTable subTableData={holidayData} subTableColumns={holidayColumns} subTableCategory={"Holiday Housings"}/>,
    ]

    return (
        <div>
            <MainTable
            tableHeaders={headers}
            subTables={subTables}
            />
        </div>
    )
}