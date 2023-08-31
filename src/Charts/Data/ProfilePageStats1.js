function Percentage(percentageValue, value) {
  return (value / 100) * percentageValue;
}

export const ProfilePageStats1 = [
  {
    id: 1,
    year: 2001,
    HousesForSale: 207,
    HousesSold: 430,
    HousesAvgPriceSold: 1700000,
    HousesAvgEarnings: Percentage(4, 1700000),
    HousesAvgPriceChange: -340000,
  },
  {
    id: 2,
    year: 2002,
    HousesForSale: 136,
    HousesSold: 234,
    HousesAvgPriceSold: 1840000,
    HousesAvgEarnings: Percentage(5, 1840000),
    HousesAvgPriceChange: -325000,
  },
  {
    id: 3,
    year: 2003,
    HousesForSale: 86,
    HousesSold: 183,
    HousesAvgPriceSold: 1760000,
    HousesAvgEarnings: Percentage(3.5, 1760000),
    HousesAvgPriceChange: -265000,
  },
  {
    id: 4,
    year: 2004,
    HousesForSale: 123,
    HousesSold: 335,
    HousesAvgPriceSold: 1670000,
    HousesAvgEarnings: Percentage(4, 1670000),
    HousesAvgPriceChange: -380000,
  },
  {
    id: 5,
    year: 2005,
    HousesForSale: 155,
    HousesSold: 452,
    HousesAvgPriceSold: 1880000,
    HousesAvgEarnings: Percentage(5.5, 1880000),
    HousesAvgPriceChange: -235000,
  },
  {
    id: 6,
    year: 2006,
    HousesForSale: 56,
    HousesSold: 244,
    HousesAvgPriceSold: 1760000,
    HousesAvgEarnings: Percentage(4.5, 1760000),
    HousesAvgPriceChange: -255000,
  },
];
