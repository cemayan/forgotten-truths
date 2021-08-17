const {
    JSDOM
} = require("jsdom")
const got = require('got');


const vgmUrl = 'https://www.birgun.net';

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


exports.handler = async (event) => {

    const data = await got(vgmUrl);
    const dom = new JSDOM(data.body);

    var arr = [];

    const images =
        dom.window.document.querySelectorAll(".swiper-container .news-card__image-wrapper img");

    for(const el of images) {

        var url = "";
        var alt = "";
        var img = "";
        var timestamp = 0;

        
        try {
             url = el.parentElement.parentElement.getAttribute("href");
             alt = el.getAttribute("alt");
             img = el.getAttribute("src");
             timestamp =  new Date().getTime();
        }catch(e) {
            console.error(e)        
          }

        const obj = {
          "cypher": "CREATE(n:News{name:'"+ alt +"', url: '"+ url +"', image: '"+ img +"', timestamp: "+ timestamp +"}) RETURN n",
          "cacheValue": "news"
        }

       arr.push( got.post(process.env.FORGOTTEN_TRUTHS_CREATE_ENDPOINT,{
                    json: obj
                    }))

    }

    await Promise.all(arr.map(async(data) => {
           await timeout(1000);
    }));
    

    // TODO implement
    const response = {
        statusCode: 200,
        body: "ok!",
    };
    return response;
};