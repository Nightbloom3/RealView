//Short function to calculate the whole number of houses that have had their price reduced,
//based on an existing number of houses and a percentage of those houses having had their price reduced
function percentageCalc (percentage, whole) {
    return ((percentage / 100) * whole);
  }
  
//function to merge multiple datasets on the realtor,
//this is so that we do not have multiple instances of
//same realtor when looking at multiple datasets at once
export default function mergeRowsByRealtor(dataset) {
    //Initialization of array to keep the merged dataset
    const mergedData = [];
    //Initialization of empty object to use as a dictionary,
    //so that we can compare each realtor passed through for whether or not it already exists
    const realtorDictionary = {};
  
    //The function should be receiving a concatted list of datasets
    dataset.forEach((row) => {
      const realtor = row.realtor;
  
      //if the realtor already exist combine the values from the existing entry
      //and the realtor that it is just now passing over
      if (realtorDictionary[realtor]) {
        const mergedRow = realtorDictionary[realtor];
  
        //logic block for calculating the new percentage of houses that have their price reduced,
        //has to take place before the new sum of houses are calculated otherwise it will mess with the formular
        const currentRow = Math.round(percentageCalc(mergedRow.priceReducedHousePercentage, mergedRow.housesForSale))
        const mergingRow = Math.round(percentageCalc(row.priceReducedHousePercentage, row.housesForSale))
        const mergingHousesForSale = (mergedRow.housesForSale + row.housesForSale)
        const mergedPercentage = parseFloat((((currentRow + mergingRow) / mergingHousesForSale) * 100).toFixed(2))
  
        //The first few values of the new combined entry are simply either added together
        //or a new average is taken based on the 2 given values
        mergedRow.housesForSale += row.housesForSale;
        mergedRow.avgPricePerM2 = (mergedRow.avgPricePerM2 + row.avgPricePerM2) / 2;
        mergedRow.avgSizeInM2 = (mergedRow.avgSizeInM2 + row.avgSizeInM2) / 2;
        mergedRow.avgTimeListedInDays = (mergedRow.avgTimeListedInDays + row.avgTimeListedInDays) / 2;
        //The priceReducedHousePercentage is set to the result of the above logic, just to make it look a bit more clean
        mergedRow.priceReducedHousePercentage = mergedPercentage
  
        //Now for the avgPercentagePriceReduction, we come a situation where one of two things has to happen,
        //If one of the two values from either the existing entry or the realtor its pasing over amounts to zero,
        //then the existing non-zero value shall simply be added to the zero value, the reason for that is of course
        //that the value here represents the average price reduction on houses that have had their price reduced,
        //and as such, the addition of more data to the list should not change this value unless it is a non-zero value.
        //as for the other scenario, it is a simple case of taking the average of the two non-zero values
        if (mergedRow.avgPercentagePriceReduction === 0 || row.avgPercentagePriceReduction === 0) {
          mergedRow.avgPercentagePriceReduction += row.avgPercentagePriceReduction;
        } 
        else if (mergedRow.avgPercentagePriceReduction > 0 && row.avgPercentagePriceReduction > 0) {
          mergedRow.avgPercentagePriceReduction = (mergedRow.avgPercentagePriceReduction + row.avgPercentagePriceReduction) / 2;
        }
  
        //The infoBlurb is set to the newest infoBlurb,
        //this shouldn't really change anything as the values should be the same either way
        mergedRow.infoBlurb = row.infoBlurb;
  
        //of course if the realtor is not found in the dictionary, then it is added to it as a new entry
      } else {
        const newRow = { ...row };
        realtorDictionary[realtor] = newRow;
      }
    });
    
    // Push merged rows into the mergedData array
    for (const realtor in realtorDictionary) {
      mergedData.push(realtorDictionary[realtor]);
    }
  
    return mergedData;
  };