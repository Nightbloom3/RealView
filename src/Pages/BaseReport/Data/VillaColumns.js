import _ from "lodash"

export function GenerateVillaColumns({splitDataset}) {

    const columns = [
        {
            accessor: "postalNumber",
            Footer: "Sum, average",
        },
        {   
            accessor: "villaCases",
            Cell: ({ value, delimiter = "." }) => {
                const parts = value.toFixed(0).toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
            id: "villaCases",
            Footer: () => {
                const delimiter = ".";
                const sumValue = _.sum(_.map(splitDataset, (d) => d.villaCases)).toFixed(0);
                const parts = sumValue.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
        },
        {
            accessor: "villaInflux",
            Cell: ({ value, delimiter = "." }) => {
                const parts = value.toFixed(0).toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
            id: "villaInflux",
            Footer: () => {
                const delimiter = ".";
                const sumValue = _.sum(_.map(splitDataset, (d) => d.villaInflux)).toFixed(0);
                const parts = sumValue.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
        },
        {
            accessor: "villaDeparture",
            Cell: ({ value, delimiter = "." }) => {
                const parts = value.toFixed(0).toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
            id: "villaDeparture",
            Footer: () => {
                const delimiter = ".";
                const sumValue = _.sum(_.map(splitDataset, (d) => d.villaDeparture)).toFixed(0);
                const parts = sumValue.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
        },
        {
            accessor: "villaAVGPrice",
            Cell: ({ value, delimiter = "." }) => {
                const parts = value.toFixed(0).toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
            id: "villaAVGPrice",
            Footer: () => {
                const delimiter = ".";
                const meanValue = _.mean(_.map(splitDataset, (d) => d.villaAVGPrice)).toFixed(0);
                const parts = meanValue.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
        },
        {
            accessor: "villaAVGPriceChange",
            Cell: ({ value, delimiter = "." }) => {
                const parts = value.toFixed(0).toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
            id: "villaAVGPriceChange",
            Footer: () => {
                const delimiter = ".";
                const meanValue = _.mean(_.map(splitDataset, (d) => d.villaAVGPriceChange)).toFixed(0);
                const parts = meanValue.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
        },
        {
            accessor: "villaAVGSize",
            Cell: ({ value, delimiter = "." }) => {
                const parts = value.toFixed(0).toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
            id: "villaAVGSize",
            Footer: () => {
                const delimiter = ".";
                const meanValue = _.mean(_.map(splitDataset, (d) => d.villaAVGSize)).toFixed(0);
                const parts = meanValue.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
        },
        {
            accessor: "villaAVGSizeChange",
            Cell: ({ value, delimiter = "." }) => {
                const parts = value.toFixed(0).toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
            id: "villaAVGSizeChange",
            Footer: () => {
                const delimiter = ".";
                const meanValue = _.mean(_.map(splitDataset, (d) => d.villaAVGSizeChange)).toFixed(0);
                const parts = meanValue.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
        },
        {
            accessor: "villaAVGPriceBySize",
            Cell: ({ value, delimiter = "." }) => {
                const parts = value.toFixed(0).toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
            id: "villaAVGPriceBySize",
            Footer: () => {
                const delimiter = ".";
                const meanValue = _.mean(_.map(splitDataset, (d) => d.villaAVGPriceBySize)).toFixed(0);
                const parts = meanValue.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
        },
        {
            accessor: "villaAVGPriceBySizeChange",
            Cell: ({ value, delimiter = "." }) => {
                const parts = value.toFixed(0).toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
            id: "villaAVGPriceBySizeChange",
            Footer: () => {
                const delimiter = ".";
                const meanValue = _.mean(_.map(splitDataset, (d) => d.villaAVGPriceBySizeChange)).toFixed(0);
                const parts = meanValue.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
                return parts.join(".");
            },
        },
    ];

    return columns;
}

