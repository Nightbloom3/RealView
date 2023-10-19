import { useMemo } from "react"
import DataTableBaseReport from "../../Components/Tables/DataTableBaseReport"
import { BaseReportData } from "./Data/BaseReportData"
import { GenerateVillaColumns } from "./Data/VillaColumns"
import { GenerateCondoColumns } from "./Data/CondoColumns"
import { GenerateCoopColumns } from "./Data/CoopColumns"
import { GenerateHolidayColumns } from "./Data/HolidayColumns"

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

    const villaData = useMemo(() => filterDataByPrefix(BaseReportData, "villa"), [])
    const condoData = useMemo(() => filterDataByPrefix(BaseReportData, "condo"), [])
    const coopData = useMemo(() => filterDataByPrefix(BaseReportData, "coop"), [])
    const holidayData = useMemo(() => filterDataByPrefix(BaseReportData, "holiday"), [])
    
    const villaColumns = useMemo(() => GenerateVillaColumns({splitDataset: villaData}), [villaData])
    const condoColumns = useMemo(() => GenerateCondoColumns({splitDataset: condoData}), [condoData])
    const coopColumns = useMemo(() => GenerateCoopColumns({splitDataset: coopData}), [coopData])
    const holidayColumns = useMemo(() => GenerateHolidayColumns({splitDataset: holidayData}), [holidayData])

    return (
        <div>
            <table className="BaseReportTable">
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={headers.length}>
                            <div>
                            <DataTableBaseReport
                                tableData={villaData}
                                tableColumns={villaColumns}
                                tableCategory={"Villas / Townhousing"}
                            />
                            </div>
                        </td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td colSpan={headers.length}>
                            <div>
                            <DataTableBaseReport
                                tableData={condoData}
                                tableColumns={condoColumns}
                                tableCategory={"Condominiums"}
                            />
                            </div>
                        </td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td colSpan={headers.length}>
                            <div>
                            <DataTableBaseReport
                                tableData={coopData}
                                tableColumns={coopColumns}
                                tableCategory={"Cooperative Housings"}
                            />
                            </div>
                        </td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td colSpan={headers.length}>
                            <div>
                            <DataTableBaseReport
                                tableData={holidayData}
                                tableColumns={holidayColumns}
                                tableCategory={"Holiday Housings"}
                            />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}