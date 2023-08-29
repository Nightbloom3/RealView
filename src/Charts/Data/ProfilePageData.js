function Percentage(percentageValue, value) {
  return (value / 100) * percentageValue;
}

export const ProfilePageData = [
  {
    id: 1,
    year: 2001,
    HousesAcquired: 207,
    HousesSold: 430,
    HousesAvgPriceSold: 1700000,
    HousesAvgEarnings: Percentage(4, 1700000),
    HousesAvgPriceChange: -340000,
  },
  {
    id: 2,
    year: 2002,
    HousesAcquired: 136,
    HousesSold: 234,
    HousesAvgPriceSold: 1840000,
    HousesAvgEarnings: Percentage(5, 1840000),
    HousesAvgPriceChange: -325000,
  },
  {
    id: 3,
    year: 2003,
    HousesAcquired: 86,
    HousesSold: 67,
    HousesAvgPriceSold: 1760000,
    HousesAvgEarnings: Percentage(3.5, 1760000),
    HousesAvgPriceChange: -265000,
  },
  {
    id: 4,
    year: 2004,
    HousesAcquired: 123,
    HousesSold: 122,
    HousesAvgPriceSold: 1670000,
    HousesAvgEarnings: Percentage(4, 1670000),
    HousesAvgPriceChange: -380000,
  },
  {
    id: 5,
    year: 2005,
    HousesAcquired: 155,
    HousesSold: 237,
    HousesAvgPriceSold: 1880000,
    HousesAvgEarnings: Percentage(5.5, 1880000),
    HousesAvgPriceChange: -235000,
  },
  {
    id: 6,
    year: 2006,
    HousesAcquired: 56,
    HousesSold: 82,
    HousesAvgPriceSold: 1760000,
    HousesAvgEarnings: Percentage(4.5, 1760000),
    HousesAvgPriceChange: -255000,
  },
];
