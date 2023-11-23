/* const request = require("request");
var DOMParser = require("xmldom").DOMParser;
var parser = new DOMParser();

async function getResponse(url: any) {
  const options = {
    url: url,
    method: "GET",
    timeout: 10000,
  };
  try {
    return new Promise((resolve, reject) => {
      request.get(options, function (err: any, resp: any) {
        if (err) {
          reject(err);
        } else {
          resolve(resp);
        }
      });
    });
  } catch (e) {
    return null;
  }
}

async function getUrlLinks(url: any) {
  try {
    const response = await getResponse(url);
    if (response.request.responseContent.statusCode != 200) return null;
    const dom = parser.parseFromString(response?.body, "text/html");
    const aList = dom.getElementsByTagName("a");
    let urlList = aList.map((el: any) => {
      const url = el.getAttribute("href");
      if (url == null || url.indexOf("#") == 0 || url == "javascript:;") {
        return null;
      } else if (url?.indexOf("http") == 0) {
        return url;
      }
      const protocol = response.request.req.protocol;
      const hostUrl = response.request.originalHost;
      if (url.indexOf("/") == 0) {
        return protocol + "//" + hostUrl + url;
      } else {
        return protocol + "//" + hostUrl + "/" + url;
      }
    });
    return urlList.filter((url: any) => url != undefined);
  } catch (e) {
    return null;
  }
}

async function getSeedOriginHost(seedUrl) {
  const response = await getResponse(seedUrl);
  console.log(response?.request.originalHost);
  return response?.request.originalHost;
}

async function crawlerTest() {
  const res = await getUrlLinks("https://www.naver.com");
  console.log(res?.body);
}

export default crawlerTest;
 */
