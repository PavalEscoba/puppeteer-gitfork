const puppeteer = require('puppeteer');

(async () => {
  // const browser = await puppeteer.launch({
  //   headless: true
  // });
  // const page = await browser.newPage();
  // await page.goto('https://tut.by');
  // await page.pdf({
  //   path: './tut.pdf',
  //   format: 'A4'
  // });

  // await browser.close();

  // 2nd example
  // const browser = await puppeteer.launch({
  //   headless: true
  // });
  // const page = await browser.newPage();
  // await page.goto('https://tut.by');

  // const title = await page.title();
  // console.log('title:', title);

  // const url = await page.url();
  // console.log('url:', url);


  // 3d example. Emulate the phone
  // const devices = require('puppeteer/DeviceDescriptors');

  // const browser = await puppeteer.launch({headless: false});
  // const page = await browser.newPage();

  // await page.emulate(devices['iPhone X']);

  // await page.goto('https://tut.by');
  // await browser.close();

  // 4th example. To log in the instagram
  // const browser = await puppeteer.launch({headless: false});
  // const page = await browser.newPage();
  // await page.goto('http://instagram.com')
  // await page.waitFor('a[href="/accounts/login/?source=auth_switcher"]');
  // await page.click('a[href="/accounts/login/?source=auth_switcher"]');
  // await page.waitFor(500);

  // await page.waitFor('input[name="username"]');
  // await page.type('input[name="username"]', 'your login');
  // await page.type('input[name="password"]', 'your password');
  // await page.click('#react-root > section > main > div > article > div > div:nth-child(1) > div > form > div:nth-child(4) > button');


  // 5th example how to speed up the loading
  // const browser = await puppeteer.launch({ headless: false });
  // const page = await browser.newPage();

  // await page.setRequestInterception(true);
  // page.on('request', (request) => {
  //   if (['stylesheet', 'font', 'image'].includes(request.resourceType())) {
  //     request.abort();
  //   }
  //   else {
  //     request.continue();
  //   }
  // })


  // await page.goto('https://oz.by');
  // // await browser.close();
  // const browser = await puppeteer.launch({ headless: false });
  // const page = await browser.newPage();

  // await page.authenticate({username: 'pasha', password: '134'})
  // await page.goto('https://httpbin.org//basic-auth/pasha/1234');
  // await browser.close();

  // 6th how to log in on twitter
  // const twitter = require('./twitter');
  // const USERNAME = 'paval_escoba';
  // const PASSWORD = '2P4a0v1a8l6'

  // await twitter.initialize();
  // await twitter.login(USERNAME, PASSWORD);
  // await twitter.postTweet('Hello. This post is written using Google Puppeteer')

  // debugger;
  // // await browser.close();

  // 7th example. Scraping userdata.
  const twitter = require('./twitter');
  const USERNAME = 'paval_escoba';
  const PASSWORD = '2P4a0v1a8l6'

  await twitter.initialize();
  // await twitter.login(USERNAME, PASSWORD);

  // let details = await twitter.getUser('lessprit')
  const  lessprit =  await twitter.getTweets('lessprit', 150);
  console.log(lessprit);
  // await browser.close();
})()