import _ from "lodash"

export function GenerateBRColumns({houseType ,splitDataset}) {

    const columns = [
        {
            accessor: "postalNumber",
            id: "postalNumber",
            Footer: "Sum, average",
        },
        {
            accessor: houseType + "Cases",
            Cell: ({ value, delimiter = "." }) => {
                const parts = value.toFixed(0).toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
            id: "Cases",
            Footer: () => {
                const delimiter = ".";
                const sumValue = _.sum(_.map(splitDataset, (d) => d[houseType + "Cases"])).toFixed(0);
                const parts = sumValue.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
        },
        {
            accessor: houseType + "Influx",
            Cell: ({ value, delimiter = "." }) => {
                const parts = value.toFixed(0).toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
            id: "Influx",
            Footer: () => {
                const delimiter = ".";
                const sumValue = _.sum(_.map(splitDataset, (d) => d[houseType + "Influx"])).toFixed(0);
                const parts = sumValue.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
        },
        {
            accessor: houseType + "Departure",
            Cell: ({ value, delimiter = "." }) => {
                const parts = value.toFixed(0).toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
            id: "Departure",
            Footer: () => {
                const delimiter = ".";
                const sumValue = _.sum(_.map(splitDataset, (d) => d[houseType + "Departure"])).toFixed(0);
                const parts = sumValue.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
        },
        {
            accessor: houseType + "AVGPrice",
            Cell: ({ value, delimiter = "." }) => {
                const parts = value.toFixed(0).toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
            id: "AVGPrice",
            Footer: () => {
                const delimiter = ".";
                const meanValue = _.mean(_.map(splitDataset, (d) => d[houseType + "AVGPrice"])).toFixed(0);
                const parts = meanValue.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
        },
        {
            accessor: houseType + "AVGPriceChange",
            Cell: ({ value, delimiter = "." }) => {
                const parts = value.toFixed(0).toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
            id: "AVGPriceChange",
            Footer: () => {
                const delimiter = ".";
                const meanValue = _.mean(_.map(splitDataset, (d) => d[houseType + "AVGPriceChange"])).toFixed(0);
                const parts = meanValue.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
        },
        {
            accessor: houseType + "AVGSize",
            Cell: ({ value, delimiter = "." }) => {
                const parts = value.toFixed(0).toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
            id: "AVGSize",
            Footer: () => {
                const delimiter = ".";
                const meanValue = _.mean(_.map(splitDataset, (d) => d[houseType + "AVGSize"])).toFixed(0);
                const parts = meanValue.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
        },
        {
            accessor: houseType + "AVGSizeChange",
            Cell: ({ value, delimiter = "." }) => {
                const parts = value.toFixed(0).toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
            id: "AVGSizeChange",
            Footer: () => {
                const delimiter = ".";
                const meanValue = _.mean(_.map(splitDataset, (d) => d[houseType + "AVGSizeChange"])).toFixed(0);
                const parts = meanValue.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
        },
        {
            accessor: houseType + "AVGPriceBySize",
            Cell: ({ value, delimiter = "." }) => {
                const parts = value.toFixed(0).toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
            id: "AVGPriceBySize",
            Footer: () => {
                const delimiter = ".";
                const meanValue = _.mean(_.map(splitDataset, (d) => d[houseType + "AVGPriceBySize"])).toFixed(0);
                const parts = meanValue.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
        },
        {
            accessor: houseType + "AVGPriceBySizeChange",
            Cell: ({ value, delimiter = "." }) => {
                const parts = value.toFixed(0).toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
            id: "AVGPriceBySizeChange",
            Footer: () => {
                const delimiter = ".";
                const meanValue = _.mean(_.map(splitDataset, (d) => d[houseType + "AVGPriceBySizeChange"])).toFixed(0);
                const parts = meanValue.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
        },
    ];

    return columns;
}

