const request = require('request-promise');
const cheerio = require('cheerio');
(
  async () => {
    const USERNAME = 'aniola_19';
    const BASE_URL = `https://www.instagram.com/${USERNAME}`;

    const response = await request(BASE_URL);
    const $ = cheerio.load(response);

    const scriptRaw = $('script[type="text/javascript"]').eq(3).html();

    const script = /window._sharedData = (.+);/g.exec(scriptRaw)
    const { entry_data: { ProfilePage: { [0]: { graphql: { user } } } } } = JSON.parse(script[1]);

    const instagramData = {
      folowers: user.edge_followed_by.count,
      following_number: user.edge_follow.count,
      uploads: user.edge_owner_to_timeline_media.count,
      full_name: user.full_name,
      picture_url: user.profile_pic_url_hd
    }
    const { entry_data: { ProfilePage: { [0]: { graphql: { user: { edge_owner_to_timeline_media } } } } } } = JSON.parse(script[1]);

    console.log(edge_owner_to_timeline_media)
  }
)();