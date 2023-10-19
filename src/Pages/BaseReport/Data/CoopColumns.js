import _ from "lodash"

export function GenerateCoopColumns({splitDataset}) {

    const columns = [
        {
            accessor: "postalNumber",
            Footer: "Sum, average",
        },
        {
            accessor: "coopCases",
            Cell: ({ value, delimiter = "." }) => {
                const parts = value.toFixed(0).toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
            id: "coopCases",
            Footer: () => {
                const delimiter = ".";
                const sumValue = _.sum(_.map(splitDataset, (d) => d.coopCases)).toFixed(0);
                const parts = sumValue.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
        },
        {
            accessor: "coopInflux",
            Cell: ({ value, delimiter = "." }) => {
                const parts = value.toFixed(0).toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
            id: "coopInflux",
            Footer: () => {
                const delimiter = ".";
                const sumValue = _.sum(_.map(splitDataset, (d) => d.coopInflux)).toFixed(0);
                const parts = sumValue.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
        },
        {
            accessor: "coopDeparture",
            Cell: ({ value, delimiter = "." }) => {
                const parts = value.toFixed(0).toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
            id: "coopDeparture",
            Footer: () => {
                const delimiter = ".";
                const sumValue = _.sum(_.map(splitDataset, (d) => d.coopDeparture)).toFixed(0);
                const parts = sumValue.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
        },
        {
            accessor: "coopAVGPrice",
            Cell: ({ value, delimiter = "." }) => {
                const parts = value.toFixed(0).toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
            id: "coopAVGPrice",
            Footer: () => {
                const delimiter = ".";
                const meanValue = _.mean(_.map(splitDataset, (d) => d.coopAVGPrice)).toFixed(0);
                const parts = meanValue.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
        },
        {
            accessor: "coopAVGPriceChange",
            Cell: ({ value, delimiter = "." }) => {
                const parts = value.toFixed(0).toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
            id: "coopAVGPriceChange",
            Footer: () => {
                const delimiter = ".";
                const meanValue = _.mean(_.map(splitDataset, (d) => d.coopAVGPriceChange)).toFixed(0);
                const parts = meanValue.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
        },
        {
            accessor: "coopAVGSize",
            Cell: ({ value, delimiter = "." }) => {
                const parts = value.toFixed(0).toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
            id: "coopAVGSize",
            Footer: () => {
                const delimiter = ".";
                const meanValue = _.mean(_.map(splitDataset, (d) => d.coopAVGSize)).toFixed(0);
                const parts = meanValue.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
        },
        {
            accessor: "coopAVGSizeChange",
            Cell: ({ value, delimiter = "." }) => {
                const parts = value.toFixed(0).toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
            id: "coopAVGSizeChange",
            Footer: () => {
                const delimiter = ".";
                const meanValue = _.mean(_.map(splitDataset, (d) => d.coopAVGSizeChange)).toFixed(0);
                const parts = meanValue.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
        },
        {
            accessor: "coopAVGPriceBySize",
            Cell: ({ value, delimiter = "." }) => {
                const parts = value.toFixed(0).toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
            id: "coopAVGPriceBySize",
            Footer: () => {
                const delimiter = ".";
                const meanValue = _.mean(_.map(splitDataset, (d) => d.coopAVGPriceBySize)).toFixed(0);
                const parts = meanValue.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
        },
        {
            accessor: "coopAVGPriceBySizeChange",
            Cell: ({ value, delimiter = "." }) => {
                const parts = value.toFixed(0).toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
            id: "coopAVGPriceBySizeChange",
            Footer: () => {
                const delimiter = ".";
                const meanValue = _.mean(_.map(splitDataset, (d) => d.coopAVGPriceBySizeChange)).toFixed(0);
                const parts = meanValue.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
        },
    ];

    return columns;
}

