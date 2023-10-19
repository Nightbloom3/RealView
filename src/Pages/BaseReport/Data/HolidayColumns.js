import _ from "lodash"

export function GenerateHolidayColumns({splitDataset}) {

    const columns = [
        {
            accessor: "postalNumber",
            Footer: "Sum, average",
        },
        {
            accessor: "holidayCases",
            Cell: ({ value, delimiter = "." }) => {
                const parts = value.toFixed(0).toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
            id: "holidayCases",
            Footer: () => {
                const delimiter = ".";
                const sumValue = _.sum(_.map(splitDataset, (d) => d.holidayCases)).toFixed(0);
                const parts = sumValue.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
        },
        {
            accessor: "holidayInflux",
            Cell: ({ value, delimiter = "." }) => {
                const parts = value.toFixed(0).toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
            id: "holidayInflux",
            Footer: () => {
                const delimiter = ".";
                const sumValue = _.sum(_.map(splitDataset, (d) => d.holidayInflux)).toFixed(0);
                const parts = sumValue.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
        },
        {
            accessor: "holidayDeparture",
            Cell: ({ value, delimiter = "." }) => {
                const parts = value.toFixed(0).toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
            id: "holidayDeparture",
            Footer: () => {
                const delimiter = ".";
                const sumValue = _.sum(_.map(splitDataset, (d) => d.holidayDeparture)).toFixed(0);
                const parts = sumValue.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
        },
        {
            accessor: "holidayAVGPrice",
            Cell: ({ value, delimiter = "." }) => {
                const parts = value.toFixed(0).toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
            id: "holidayAVGPrice",
            Footer: () => {
                const delimiter = ".";
                const meanValue = _.mean(_.map(splitDataset, (d) => d.holidayAVGPrice)).toFixed(0);
                const parts = meanValue.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
        },
        {
            accessor: "holidayAVGPriceChange",
            Cell: ({ value, delimiter = "." }) => {
                const parts = value.toFixed(0).toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
            id: "holidayAVGPriceChange",
            Footer: () => {
                const delimiter = ".";
                const meanValue = _.mean(_.map(splitDataset, (d) => d.holidayAVGPriceChange)).toFixed(0);
                const parts = meanValue.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
        },
        {
            accessor: "holidayAVGSize",
            Cell: ({ value, delimiter = "." }) => {
                const parts = value.toFixed(0).toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
            id: "holidayAVGSize",
            Footer: () => {
                const delimiter = ".";
                const meanValue = _.mean(_.map(splitDataset, (d) => d.holidayAVGSize)).toFixed(0);
                const parts = meanValue.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
        },
        {
            accessor: "holidayAVGSizeChange",
            Cell: ({ value, delimiter = "." }) => {
                const parts = value.toFixed(0).toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
            id: "holidayAVGSizeChange",
            Footer: () => {
                const delimiter = ".";
                const meanValue = _.mean(_.map(splitDataset, (d) => d.holidayAVGSizeChange)).toFixed(0);
                const parts = meanValue.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
        },
        {
            accessor: "holidayAVGPriceBySize",
            Cell: ({ value, delimiter = "." }) => {
                const parts = value.toFixed(0).toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
            id: "holidayAVGPriceBySize",
            Footer: () => {
                const delimiter = ".";
                const meanValue = _.mean(_.map(splitDataset, (d) => d.holidayAVGPriceBySize)).toFixed(0);
                const parts = meanValue.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
        },
        {
            accessor: "holidayAVGPriceBySizeChange",
            Cell: ({ value, delimiter = "." }) => {
                const parts = value.toFixed(0).toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
            id: "holidayAVGPriceBySizeChange",
            Footer: () => {
                const delimiter = ".";
                const meanValue = _.mean(_.map(splitDataset, (d) => d.holidayAVGPriceBySizeChange)).toFixed(0);
                const parts = meanValue.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
        },
    ];

    return columns;
}

