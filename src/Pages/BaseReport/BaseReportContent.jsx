import React, { useState, useRef, useEffect } from "react"
import MainTable from "../../Components/Tables/DataTableMainTableBR"
import SubTable from "../../Components/Tables/DataTableSubTableBR"
import { BaseReportData1 } from "./Data/BaseReportData1"
import { BaseReportData2 } from "./Data/BaseReportData2"
import { BaseReportData3 } from "./Data/BaseReportData3"
import { GenerateBRColumns } from "./Data/BaseReportColumnsGenerator"

export default function BaseReportContent() {

    //Set function should be used in the future to hold whatever postal numbers are chosen by the user
    const [checkboxItems, setCheckboxItems] = useState(["3400", "3450", "3520"])
    //useState to keep track of what checkboxes are checked
    const [checkedItems, setCheckedItems] = useState(checkboxItems.map(() => false));

    const handleCheckboxClick = (index) => {
        const newCheckedItems = [...checkedItems];
        newCheckedItems[index] = !newCheckedItems[index];
        setCheckedItems(newCheckedItems);
    };

    //useState to keep track of what datasets are currently in use based on which checkboxes are checked,
    //should also be refactored in the future when access to the db is given.
    const [currentDataset, setCurrentDataset] = useState([])
    const datasetsRef = useRef({
        dataset1: BaseReportData1,
        dataset2: BaseReportData2,
        dataset3: BaseReportData3,
    })

      //useEffect to concat chosen datasets together before they are then merged later
    useEffect(() => {
        let newCurrentDataset = [];
        //Loops over whatever is in the checkedItems useState,
        //and for each that is set to true,
        //they shall be concatted together
        for (let i = 0; i < checkedItems.length; i++) {
            if (checkedItems[i]) {
                const datasetKey = `dataset${i + 1}`;
                newCurrentDataset = newCurrentDataset.concat(datasetsRef.current[datasetKey]);
            }
        }
        //Sets our currentDataset useState to the new concatted dataset
        setCurrentDataset((prevCurrentDataset) => {
            if (JSON.stringify(prevCurrentDataset) !== JSON.stringify(newCurrentDataset)) {
                return newCurrentDataset;
            }
            return prevCurrentDataset;
    });
    }, [checkedItems]);

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

    const villaData = filterDataByPrefix(currentDataset, "villa")
    const condoData = filterDataByPrefix(currentDataset, "condo")
    const coopData = filterDataByPrefix(currentDataset, "coop")
    const holidayData = filterDataByPrefix(currentDataset, "holiday")
    
    const villaColumns = GenerateBRColumns({houseType: "villa", splitDataset: villaData})
    const condoColumns = GenerateBRColumns({houseType: "condo", splitDataset: condoData})
    const coopColumns = GenerateBRColumns({houseType: "coop", splitDataset: coopData})
    const holidayColumns = GenerateBRColumns({houseType: "holiday", splitDataset: holidayData})

    const subTables = [
        <SubTable subTableData={villaData} subTableColumns={villaColumns} subTableCategory={"Villas / Townhousing"}/>,
        <SubTable subTableData={condoData} subTableColumns={condoColumns} subTableCategory={"Condominiums"}/>,
        <SubTable subTableData={coopData} subTableColumns={coopColumns} subTableCategory={"Cooperative Housings"} />,
        <SubTable subTableData={holidayData} subTableColumns={holidayColumns} subTableCategory={"Holiday Housings"} />,
    ]

    return (
        <div>
        <div className="choice-div">
        <fieldset>
          <legend>Select Postal Number(s)</legend>

          {checkboxItems.map((item, index) => (
            <div key={index}>
              <input
              type="checkbox"
              id={`option${index + 1}`}
              checked={checkedItems[index]}
              onChange={() => handleCheckboxClick(index)}
              />
              <label htmlFor={`option${index + 1}`}>{item}</label>
            </div>
          ))}

        </fieldset>
        </div>
        <br></br>
        <div className="table-div">
            <MainTable
            tableHeaders={headers}
            subTables={subTables}
            />
        </div>
        </div>
    )
}