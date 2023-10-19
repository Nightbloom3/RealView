import _ from "lodash"

export function GenerateCondoColumns({splitDataset}) {

    const columns = [
        {
            accessor: "postalNumber",
            Footer: "Sum, average",
        },
        {
            accessor: "condoCases",
            Cell: ({ value, delimiter = "." }) => {
                const parts = value.toFixed(0).toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
            id: "condoCases",
            Footer: () => {
                const delimiter = ".";
                const sumValue = _.sum(_.map(splitDataset, (d) => d.condoCases)).toFixed(0);
                const parts = sumValue.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
        },
        {
            accessor: "condoInflux",
            Cell: ({ value, delimiter = "." }) => {
                const parts = value.toFixed(0).toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
            id: "condoInflux",
            Footer: () => {
                const delimiter = ".";
                const sumValue = _.sum(_.map(splitDataset, (d) => d.condoInflux)).toFixed(0);
                const parts = sumValue.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
        },
        {
            accessor: "condoDeparture",
            Cell: ({ value, delimiter = "." }) => {
                const parts = value.toFixed(0).toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
            id: "condoDeparture",
            Footer: () => {
                const delimiter = ".";
                const sumValue = _.sum(_.map(splitDataset, (d) => d.condoDeparture)).toFixed(0);
                const parts = sumValue.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
        },
        {
            accessor: "condoAVGPrice",
            Cell: ({ value, delimiter = "." }) => {
                const parts = value.toFixed(0).toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
            id: "condoAVGPrice",
            Footer: () => {
                const delimiter = ".";
                const meanValue = _.mean(_.map(splitDataset, (d) => d.condoAVGPrice)).toFixed(0);
                const parts = meanValue.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
        },
        {
            accessor: "condoAVGPriceChange",
            Cell: ({ value, delimiter = "." }) => {
                const parts = value.toFixed(0).toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
            id: "condoAVGPriceChange",
            Footer: () => {
                const delimiter = ".";
                const meanValue = _.mean(_.map(splitDataset, (d) => d.condoAVGPriceChange)).toFixed(0);
                const parts = meanValue.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
        },
        {
            accessor: "condoAVGSize",
            Cell: ({ value, delimiter = "." }) => {
                const parts = value.toFixed(0).toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
            id: "condoAVGSize",
            Footer: () => {
                const delimiter = ".";
                const meanValue = _.mean(_.map(splitDataset, (d) => d.condoAVGSize)).toFixed(0);
                const parts = meanValue.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
        },
        {
            accessor: "condoAVGSizeChange",
            Cell: ({ value, delimiter = "." }) => {
                const parts = value.toFixed(0).toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
            id: "condoAVGSizeChange",
            Footer: () => {
                const delimiter = ".";
                const meanValue = _.mean(_.map(splitDataset, (d) => d.condoAVGSizeChange)).toFixed(0);
                const parts = meanValue.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
        },
        {
            accessor: "condoAVGPriceBySize",
            Cell: ({ value, delimiter = "." }) => {
                const parts = value.toFixed(0).toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
            id: "condoAVGPriceBySize",
            Footer: () => {
                const delimiter = ".";
                const meanValue = _.mean(_.map(splitDataset, (d) => d.condoAVGPriceBySize)).toFixed(0);
                const parts = meanValue.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
        },
        {
            accessor: "condoAVGPriceBySizeChange",
            Cell: ({ value, delimiter = "." }) => {
                const parts = value.toFixed(0).toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
            id: "condoAVGPriceBySizeChange",
            Footer: () => {
                const delimiter = ".";
                const meanValue = _.mean(_.map(splitDataset, (d) => d.condoAVGPriceBySizeChange)).toFixed(0);
                const parts = meanValue.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
        },
    ];

    return columns;
}

