import puppeteer from "puppeteer";

const webpage = "https://www.estate.dk/til-salg";
//const housingType = process.argv.length >= 3 ? process.argv[2] : 'andelsbolig'

(async () => {
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
    await page.goto(webpage);

    try {
        const acceptSelector = '.coi-banner__accept[aria-label="Accepter alle"]'
        await page.waitForSelector(acceptSelector);
        await page.click(acceptSelector);
        new Promise(resolve => setTimeout (resolve, 2000))

        const linkSelector = '.filters-panel__seo-tags-container .filters-panel__seo-tag';
        const linkText = 'Andelsbolig';

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
        
        const houseTilesSelector = '.list__item .tile .tile__image-container'
        const houseTiles = await page.$$(houseTilesSelector);

        if (houseTiles.length > 0) {
            await houseTiles[0].click();
        } else {
            console.log("Failed")
        }
        await page.waitForNavigation();
        new Promise(resolve => setTimeout (resolve, 2000))

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
            const tags = document.querySelectorAll('.case-facts__box-inner-wrap strong');
            if (tags) {
                const residentalArea = tags[0].textContent.trim();
                const basementArea = tags[1].textContent.trim();
                const livingRoomRoom = tags[2].textContent.trim();
                const built = tags[3].textContent.trim();
                const priceHistory = tags[4].textContent.trim();

                return {
                    residentalArea: residentalArea,
                    basementArea: basementArea,
                    livingRoomRoom: livingRoomRoom,
                    built: built,
                    priceHistory: priceHistory,
                }
            }
        });

        const {address, postalCity} = cityInformation;
        const {residentalArea, basementArea, livingRoomRoom, built, priceHistory} = houseInformation
        console.log("Address: " + address);
        console.log("Postal City: " + postalCity);
        console.log("Residental Area: " + residentalArea)
        console.log("Basement Area: " + basementArea)
        console.log("Living Rooms and Rooms: " + livingRoomRoom)
        console.log("Year Built or rebuilt: " + built)
        console.log("Price History: " + priceHistory)

        const postalCityRegex = /^(\d{4})\s(.+)$/;
        const LivingRoomRoomRegex = /(\d+)\/(\d+)/;
        const postalCityMatch = postalCity.match(postalCityRegex);
        const livingRoomRoomMatch = livingRoomRoom.match(LivingRoomRoomRegex)

        const postalNumber = postalCityMatch[1];
        const city = postalCityMatch[2];
        const livingRooms = livingRoomRoomMatch[1];
        const rooms = livingRoomRoomMatch[2];

        console.log("Postalnumber: " + postalNumber);
        console.log("City: " + city);
        console.log("Living Rooms: " + livingRooms)
        console.log("Rooms: " + rooms)

        
    } catch (error) {
        console.log("Error: " + error)
    } finally {
        await browser.close();
    }
})()