import puppeteer from "puppeteer";

const housingType = process.argv.length >= 3 ? process.argv[2] : 'Andelsbolig';

(async () => {
    console.log(housingType)
    const propertyDataArray = []
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    /*await page.setViewport({
        width: 1920,
        height: 1080,
        isMobile: false,
        isLandscape: true,
        hasTouch: false,
        deviceScaleFactor: 1
    });*/

    const webpage = "https://www.estate.dk/til-salg";
    await page.goto(webpage);


    try {
        const acceptSelector = '.coi-banner__accept[aria-label="Accepter alle"]'
        await page.waitForSelector(acceptSelector);
        await page.click(acceptSelector);
        new Promise(resolve => setTimeout (resolve, 2000))

        const linkSelector = '.filters-panel__seo-tags-container .filters-panel__seo-tag';
        const linkText = housingType;

        await page.evaluate((selector, text) => {
            const elements = Array.from(document.querySelectorAll(selector));
            console.log(elements)
            const targetElements = elements.find(el => el.textContent.trim() === text)
            if (targetElements) {
                targetElements.click()
            }
        }, linkSelector, linkText)
        await page.waitForNavigation();
        new Promise(resolve => setTimeout (resolve, 2000))

        await page.waitForSelector(".total-pages-text");
        let maxPages = await page.$eval(".total-pages-text", (span) => {
            return span.innerText;
        });

        for (let h = 1; h < maxPages; h++) {

            let houseTilesSelector = '.list__item .tile:has(.tile__top-wrap .tile__logo'
            let houseTiles = await page.$$(houseTilesSelector);

            let i = 0;
            while (i < houseTiles.length) {
                await houseTiles[i].click();
                await Promise.all([
                    page.waitForNavigation({ waitUntil: 'networkidle0' }),
                    page.waitForSelector('.case-info__property__info__main__title__address'),
                    new Promise(resolve => setTimeout(resolve, 2000)),
                ]);
        
                let propertyData = await getPropertyData(page);
                propertyDataArray.push(propertyData);
        
                await Promise.all([
                    page.goBack(),
                    page.waitForNavigation({ waitUntil: 'networkidle0' }),
                    new Promise(resolve => setTimeout(resolve, 2000)),
                ]);
        
                let refreshedHouseTiles = await page.$$('.list__item .tile:has(.tile__top-wrap .tile__logo');
                houseTiles = refreshedHouseTiles;
        
                i++;
            }


            Promise.all([
                page.waitForSelector(".pagination__button.-next"),
                page.click(".pagination__button.-next"),
            ])

            await page.waitForNavigation({ waitUntil: 'networkidle0' }).catch((error) => {
                console.log('Navigation error:', error);
            });

            new Promise(resolve => setTimeout (resolve, 3000))


        }


    } catch (error) {
        console.log("Error: " + error)
    } finally {
        console.log(propertyDataArray)
        await browser.close();
    }
})()

async function getPropertyData(page) {
    const cityInformation = await page.evaluate(() => {
        const tags = document.querySelectorAll('.case-info__property__info__main__title__address');
        if (tags) {
            const addressText = tags[0].textContent.trim();
            const postalCityText = tags[1].textContent.trim(); 

            return {
                address: addressText,
                postalCity: postalCityText,
            }
        }
        return null;
    });

    const houseInformation = await page.evaluate(() => {
        const tags = document.querySelectorAll('.case-facts__box-inner-wrap');
        
        let residentalArea = '';
        let basementArea = '';
        let livingRoomRoom = '';
        let builtRebuilt = '';
        let priceHistory = '';

        tags.forEach(tag => {
            const label = tag.querySelector('span')?.textContent.trim();
            const value = tag.querySelector('strong')?.textContent.trim();

            if (label && value) {
                switch (label) {
                    case 'Boligareal:':
                        residentalArea = value;
                        break;
                    case 'Kælderstørrelse:':
                        basementArea = value;
                        break;
                    case 'Stue/Værelser:':
                        livingRoomRoom = value;
                        break;
                    case 'Bygget/Ombygget:':
                        builtRebuilt = value;
                        break;
                    case 'Prishistorik:':
                        priceHistory = value;
                        break;
                    default:
                        break;
                }
            }
        });

        return {
            residentalArea: residentalArea,
            basementArea: basementArea,
            livingRoomRoom: livingRoomRoom,
            builtRebuilt: builtRebuilt,
            priceHistory: priceHistory,
        }
    });

    const {address, postalCity} = cityInformation;
    const {residentalArea, basementArea, livingRoomRoom, builtRebuilt, priceHistory} = houseInformation

    const postalCityRegex = /(\d{4})\s(.+)$/;
    const postalCityMatch = postalCity.match(postalCityRegex);

    const LivingRoomRoomRegex = /(\d+)\/(\d+)/;
    const livingRoomRoomMatch = livingRoomRoom.match(LivingRoomRoomRegex);

    const builtRebuiltRegex = /(\d+)\/(\d+)/;
    const builtRebuiltMatch = builtRebuilt.match(builtRebuiltRegex);

    const postalNumber = postalCityMatch[1];
    const city = postalCityMatch[2];

    const livingRooms = livingRoomRoomMatch[1];
    const rooms = livingRoomRoomMatch[2];

    const built = builtRebuiltMatch ? builtRebuiltMatch[1] : builtRebuilt;
    const rebuilt = builtRebuiltMatch ? builtRebuiltMatch[2] : "N/A";

    const propertyData = {
        address: address,
        postalNumber: postalNumber,
        city: city,
        residentalArea: residentalArea,
        basementArea: basementArea,
        livingRooms: livingRooms,
        rooms: rooms,
        built: built,
        rebuilt: rebuilt,
        priceHistory: priceHistory,
    }        

    return propertyData;
}