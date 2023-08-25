import ComparisonChart from "../../Charts/ComparisonChart";
import { useEffect, useState } from "react";
import { ProfilePageData } from "../../Charts/Data/ProfilePageData";
import { Chart as ChartJS } from "chart.js/auto";
// ^^^^^^ Må ikke slettes - ellers virker siden ikke ^^^^^^^--- import { Chart as ChartJS } from "chart.js/auto";

export default function MyProfilePageContent() {

    const ChartStylingWidth = 500; // Set your desired width
    const ChartStylingHeight = 500; // Set your desired height
    const ComparisonStyling = {
        MaintainAspectRatio: true,
        responsive: true,
        indexAxis: "y",
        scales: {
        xAxes: {
            max: 500,
        },
    },
  };

    const [profileData, setProfileData] = useState({
        labels: ProfilePageData.map((data) => data.year),
        datasets: [
            {
                label: "# Houses Sold",
                data: ProfilePageData.map((data) => data.HousesSold)
            },
            {
                label: "Avg Earnings",
                data: ProfilePageData.map((data) => data.HousesAcquired)
            }
        ]
    })

    const [selectChoice, setSelectChoice] = useState("")

    useEffect(() => {
        if (selectChoice) {
            const dynamicKey = selectChoice; // Use the selected value as the key
            const updatedData = {
                ...profileData,
                datasets: profileData.datasets.map((dataset) => {
                    if (dataset.label === "# Houses Sold" || dataset.label === "Avg Earnings") {
                        // Keep the existing datasets
                        return dataset;
                    }
                    return {
                        ...dataset,
                        label: selectChoice, // Update the label
                        data: ProfilePageData.map((data) => data[dynamicKey]),
                    };
                }),
            };
            setProfileData(updatedData);
        }
    }, [selectChoice, profileData]); // Add profileData as a dependency to avoid stale data

    function HandleChoiceChange(e) {
        setSelectChoice(e.target.value)
    }

    return (
        <div>
            <div className="Chart">
            <ComparisonChart
            ChartData={profileData}
            width={ChartStylingWidth}
            height={ChartStylingHeight}
            StylingOptions={ComparisonStyling}
            />
            </div>

            <div className="SelectBox">
                <p>Compare houses Sold to:</p>
                <select id="selectChoices" onChange={HandleChoiceChange}>
                    <option value="HousesAcquired"> Houses Acquired</option>
                    <option value="HousesAvgPriceSold">Average sale price of houses</option>
                    <option value="HousesAvgEarnings">Average earnings on house sales</option>
                    <option value="HousesAvgPriceChange">Average price change on houses</option>
                </select>

            </div>

        </div>

    )

}