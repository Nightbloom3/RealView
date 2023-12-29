import puppeteer from "puppeteer";

const log = console.log;
const searchTermCLI = process.argv.length >= 3 ? process.argv[2] : "Volbeat";
const searchTermENV = process.env.SEARCHTEXT ?? "Volbeat";

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--lang=da-DK"],
  });
  const page = await browser.newPage();
  try {
    let printValues = {
      videoMatch: "",
      commentsAmount: "",
      videoSuggested: "",
    };

    await page.setViewport({
      width: 1920,
      height: 1080,
      isMobile: false,
      isLandscape: true,
      hasTouch: false,
      deviceScaleFactor: 1,
    });
    await page.goto("https://youtube.com");

    const acceptSelector =
      'button.yt-spec-button-shape-next[aria-label="Acceptér brugen af cookies og andre data til de formål, der er beskrevet"]';
    await page.waitForSelector(acceptSelector);
    await page.click(acceptSelector);
    await page.waitForNavigation();

    await page.waitForSelector("#search-input #search");
    await page.type("#search-input #search", searchTermCLI, { delay: 100 });

    //await page.emulateVisionDeficiency("blurredVision");
    //await page.screenshot({ path: "../test/youtube-home-blurred.jpg" });
    //await page.emulateVisionDeficiency("none");
    //await page.screenshot({ path: "../test/youtube-home.jpg" });

    await Promise.all([
      page.waitForNavigation(),
      //page.click("#search-icon-legacy"),
      page.keyboard.press("Enter"),
    ]);
    //wait till next page
    await page.waitForSelector("ytd-video-renderer h3 a#video-title");
    //await page.screenshot({ path: "../test/search-results.jpg" });

    const firstMatch = await page.$eval(
      "ytd-video-renderer h3 a#video-title",
      (elem) => {
        //runs when a#video-title is found
        return elem.innerText;
      }
    );
    //console.log({ firstMatch });
    printValues.videoMatch = firstMatch;

    await Promise.all([
      page.waitForNavigation(),
      page.click("ytd-video-renderer h3 a#video-title"),
      new Promise((resolve) => setTimeout(resolve, 4000)),
    ]);
    //await page.screenshot({ path: "../test/first-video.jpg" });

    const scrollToComments = async () => {
      const commentsSelector = "ytd-comments";
      await retryAction(async () => {
        await page.evaluate((selector) => {
          const commentsSection = document.querySelector(selector);
          if (commentsSection) {
            commentsSection.scrollIntoView();
          } else {
            throw new Error("Comments section not found");
          }
        }, commentsSelector);
      });
    };

    try {
      await scrollToComments();
      await page.waitForSelector("ytd-comments-header-renderer h2");
      const videoComments = await page.$eval(
        "ytd-comments-header-renderer h2",
        (h2) => {
          return h2.innerText;
        }
      );
      //console.log({ videoComments });
      printValues.commentsAmount = videoComments;

      await page.evaluate(() => {
        window.scrollTo(0, 0);
      });
    } catch (error) {
      console.log("failed to scroll to comments:", error);
    }

    const firstSuggested = await page.$eval(
      "ytd-compact-video-renderer",
      (elem) => {
        return elem.querySelector("h3").innerText;
      }
    );
    //console.log({ firstSuggested });
    printValues.videoSuggested = firstSuggested;

    console.log(printValues);
  } catch (error) {
    console.log("an error occured", error);
  } finally {
    await browser.close();
  }
})();

async function retryAction(action, maxRetries = 3, delay = 2000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await action();
      return result; // Successful action, return the result
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error);
      if (attempt === maxRetries) throw error; // Failed on last attempt, throw error
      await new Promise((resolve) => setTimeout(resolve, delay)); // Wait before the next attempt
    }
  }
}
