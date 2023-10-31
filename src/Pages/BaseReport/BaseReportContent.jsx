import React, {useEffect, useRef } from "react"
import MainTable from "../../Components/Tables/DataTableMainTableBR"
import SubTable from "../../Components/Tables/DataTableSubTableBR"
import { BaseReportData } from "./Data/BaseReportData"
import { GenerateBRColumns } from "./Data/BaseReportColumnsGenerator"

export default function BaseReportContent() {
    const mainTableHeaderRef = useRef();

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
        <SubTable subTableData={villaData} subTableColumns={villaColumns} subTableCategory={"Villas / Townhousing"}/>,
        <SubTable subTableData={condoData} subTableColumns={condoColumns} subTableCategory={"Condominiums"}/>,
        <SubTable subTableData={coopData} subTableColumns={coopColumns} subTableCategory={"Cooperative Housings"}/>,
        <SubTable subTableData={holidayData} subTableColumns={holidayColumns} subTableCategory={"Holiday Housings"}/>,
    ]

    useEffect(() => {
        const mainTableHeader = mainTableHeaderRef.current;
        console.log(mainTableHeader)

        if (mainTableHeader) {
            const handleMainTableHeaderClick = () => {
                const subTableHeaders = document.querySelectorAll(".sub-table-header")

                subTableHeaders.forEach((subTableHeader) => {
                    subTableHeader.click();
                });
            };

            mainTableHeader.addEventListener("click", handleMainTableHeaderClick)

            return () => {
                mainTableHeader.removeEventListener("click", handleMainTableHeaderClick)
            };
        }
    }, [mainTableHeaderRef])

    return (
        <div>
            <MainTable
            tableHeaders={headers}
            subTables={subTables}
            mainTableHeaderRef={mainTableHeaderRef}
            />
        </div>
    )
}