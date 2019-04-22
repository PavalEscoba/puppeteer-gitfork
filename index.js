const request = require('request-promise');
const cheerio = require('cheerio');

const URL = 'https://github.com/SIARHEI-SMANTSAR/priority-queue/network/members';

(async () => {
  const response = await request({
    uri: URL,
    headers: {
      'User-Agent': 'Request-Promise',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'be,ru;q=0.9,ru-RU;q=0.8,en-US;q=0.7,en;q=0.6,uk;q=0.5',
      'Cache-Control': 'max-age=0',
      'Connection': 'keep-alive',
      'Host': 'github.com',
      'If-None-Match': 'W/"29a20db06ed030e910f22a1b679645eb"',
      'Referer': 'https://github.com/SIARHEI-SMANTSAR/priority-queue',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36'
    },
    gzip: true
  });

  let $ = cheerio.load(response);

  let authorName = $('div.repo').text().trim().replace(/\s/g, '').replace(/priority-queue/g, 'priority-queue, ');
  let nav = $('nav.d-flex a').text()
  let aName = authorName.split(',');
  // let array = $('div.repo  a:last-of-type').attr('href');

  console.log(aName);
  console.log(nav);
})();