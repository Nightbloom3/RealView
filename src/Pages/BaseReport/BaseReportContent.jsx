import DataTableBaseReport from "../../Components/Tables/DataTableBaseReport"
import { BaseReportData } from "./Data/BaseReportData"

export default function BaseReportContent() {

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

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Postalnumber</th>
                        <th>Number of Cases</th>
                        <th>Case Influx</th>
                        <th>Case Departure</th>
                        <th>Average Price</th>
                        <th>Average Price Change</th>
                        <th>Average Size</th>
                        <th>Average Size Change</th>
                        <th>Average Price by Size</th>
                        <th>Average Price by Size Change</th>
                    </tr>
                </thead>
                
            </table>
        </div>
    )
}