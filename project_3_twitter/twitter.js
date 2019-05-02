const puppeteer = require('puppeteer');

const BASE_URL = 'https://twitter.com/';
const LOGIN_URL = 'https://twitter.com/login';
const USERNAME_URL = (username) => `https://twitter.com/${username}`;

let browser = null;
let page = null;

const twitter = {
  initialize: async () => {
    browser = await puppeteer.launch({
      headless: false
    });
    page = await browser.newPage();
    await page.goto(BASE_URL);
  },
  login: async (username, password) => {
    await page.goto(LOGIN_URL);
    await page.waitFor('form[class="t1-form clearfix signin js-signin"] input[name="session[username_or_email]"]');
    await page.type('form[class="t1-form clearfix signin js-signin"] input[name="session[username_or_email]"]', username, { delay: 25 });
    await page.type('form[class="t1-form clearfix signin js-signin"] input[name="session[password]"]', password, { delay: 25 });
    await page.click('button[type="submit"][class="submit EdgeButton EdgeButton--primary EdgeButtom--medium"]');
    await page.waitFor('#tweet-box-home-timeline');
    await page.waitFor(1000);
  },
  postTweet: async (message) => {
    const url = await page.url();
    if (url != BASE_URL) {
      await page.goto(BASE_URL);
    }

    await page.waitFor('#tweet-box-home-timeline');
    await page.click('#tweet-box-home-timeline');
    await page.waitFor(500);
    await page.keyboard.type(message, { delay: 50 });
    await page.click('button[class="tweet-action EdgeButton EdgeButton--primary js-tweet-btn"]');
  },
  getUser: async (username) => {
    const url = await page.url();
    if (url != USERNAME_URL(username)) {
      await page.goto(USERNAME_URL(username));
    }
    await page.waitFor('.ProfileHeaderCard-name > a');
    let details = await page.evaluate(() => {
      return {
        fullName: document.querySelector('.ProfileHeaderCard-name > a') ? document.querySelector('.ProfileHeaderCard-name > a').innerText : '',
        description: document.querySelector('.ProfileHeaderCard-bio.u-dir') ? document.querySelector('.ProfileHeaderCard-bio.u-dir').innerText : '',
        followersCount: document.querySelector('li[class="ProfileNav-item ProfileNav-item--followers"] > a > span[data-count]') ? document.querySelector('li[class="ProfileNav-item ProfileNav-item--followers"] > a > span[data-count]').getAttribute('data-count') : '',
        followingCount: document.querySelector('li[class="ProfileNav-item ProfileNav-item--following"] > a > span[data-count]') ? document.querySelector('li[class="ProfileNav-item ProfileNav-item--following"] > a > span[data-count]').getAttribute('data-count') : '',
        tweets: document.querySelector('li[class="ProfileNav-item ProfileNav-item--tweets is-active"] > a > span[data-count]') ? document.querySelector('li[class="ProfileNav-item ProfileNav-item--tweets is-active"] > a > span[data-count]').getAttribute('data-count') : '',
        registrationDate: document.querySelector('span.ProfileHeaderCard-joinDateText.js-tooltip.u-dir') ? document.querySelector('span.ProfileHeaderCard-joinDateText.js-tooltip.u-dir').innerText : '',
      }
    })
    return details;
  },
  getTweets: async (username, count = 10) => {

    const url = await page.url();

    if (url != USERNAME_URL(username)) {
      await page.goto(USERNAME_URL(username));
    }

    await page.waitFor('#stream-items-id');

    let tweetsArray = await page.$$('#stream-items-id > li');
    let lastTweetsArrayLength = 0;
    let tweets = [];

    while(tweetsArray.length < count){
      await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
      await page.waitFor(2000);

      tweetsArray = await page.$$('#stream-items-id > li');
      
      if(lastTweetsArrayLength == tweetsArray.length) break;
      
      lastTweetsArrayLength = tweetsArray.length;
    }

    for (let tweetElement of tweetsArray) {
      let tweet = {
        tweetText: await tweetElement.$eval('div[class="js-tweet-text-container"]', element => element.innerText),
        tweetResponses: await tweetElement.$eval('div[class="ProfileTweet-action ProfileTweet-action--reply"] span[class="ProfileTweet-actionCountForPresentation"', element => element.innerText),
        tweetFavorites: await tweetElement.$eval('div[class="ProfileTweet-action ProfileTweet-action--favorite js-toggleState"] span[class="ProfileTweet-actionCountForPresentation"', element => element.innerText),
        tweetPostTime: await tweetElement.$eval('a[class="tweet-timestamp js-permalink js-nav js-tooltip"]', element => element.getAttribute('title')),
        
      }
      tweets.push(tweet)
    }

    return tweets.slice(0, count);

 

  },
  end: async () => {
    await browser.close();
  }
}

module.exports = twitter;