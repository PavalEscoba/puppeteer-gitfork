const request = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');

const URL = 'https://github.com/SIARHEI-SMANTSAR/priority-queue/network/members';
const URLS = [ 'https://github.com/SIARHEI-SMANTSAR/love-triangle/network/members',
  'https://github.com/SIARHEI-SMANTSAR/priority-queue/network/members'];
let forksData = [];
(async () => {
  let i = 1;
  for (let url of URLS) {
    
    const response = await request({
      uri: url, 
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

    // let namesOfForkersString = $('div.repo').text().trim().replace(/\s/g, '');
    let namesOfForkersString = $('div.repo').text().replace(/\s/g, '').replace(/priority-queue/g, 'priority-queue, ').replace(/love-triangle/g, 'love-triangle, ');
    //let namesOfForkersString = $('div.repo').text().trim().replace(/\s/g, '');
    let arrayOfForkers = namesOfForkersString.split(',').slice(1,4);
    const authorName = $('span.author').text().trim();
    const numberOfForks = $('a.social-count[href$=members]').text().trim();

    // to practice array. each() method is from cheerio lib docs
    // let watchStarsForkArray = [];
    // $('a.social-count').each((i, elem) => {
    //   const item = $(elem).text().trim();
    //   watchStarsForkArray.push(item);
    // });
    forksData.push({
      i,
      arrayOfForkers,
      authorName,
      numberOfForks
    })
    console.log('forksData:', forksData)

    
    // console.log('i:', i)
    // console.log('arrayOfForkers:', arrayOfForkers);
    // console.log('authorName:', authorName);
    // console.log('numberOfForks:', numberOfForks);
    // console.log('watchStarsForkArray:', watchStarsForkArray);
    //const firtsThree = arrayOfForkers.slice(0, 3).map(url => 'https://github.com/' + url.trim());
    //console.log('firstThree:', firtsThree)
    i += 1;
  }
  fs.writeFileSync('./data.json', JSON.stringify(forksData), 'utf-8')
})();