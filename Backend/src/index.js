import puppeteer from  'puppeteer'

(async() => {
    const browser = await puppeteer.launch({headless: 'new'});
    const page = await browser.newPage();

    //await page.goto('https://www.boliga.dk/resultat')
    await page.goto('https://www.boliga.dk/bolig/2056500/oestvaenget_99a_7490_aulum')

    const url = await page.url();
    console.log(url);
    const content = await page.content();
    //console.log(content);

    await page.screenshot({path: '../test/sampleBoliga1.jpg', fullPage: true})
    await page.screenshot({path: '../test/sampleBoliga2.jpg', clip: {x : 200, y : 200, width: 500, height: 500}, encoding: 'binary', type: 'jpeg'})

    //await page.type(' input.selector', 'text');
    //await page.waitForSelector()

    await browser.close();
})()