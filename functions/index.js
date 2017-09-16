const firebase = require('firebase-functions');
var admin = require("firebase-admin");

var serviceAccount = require("./canadiansroam-firebase-adminsdk-v9545-513360c730.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://canadiansroam.firebaseio.com"
});

var metaData = {
  "latest": {
    "type":"website",
    "title":"Canadians Roam",
    "description":"Home page of two Canadians Roaming through Europe while living in Rome.",
    "image":"images/life-in-rome-intro.jpg",
    "author":""
  },
  "life-in-rome": {
    "type":"website",
    "title": "Canadians Roam - Life in Rome",
    "description":"Stories of living in Rome by two Canadians.",
    "image":"images/life-in-rome-intro.jpg",
    "author":""
  },
  "travel": {
    "type":"website",
    "title":"Canadians Roam - Travels",
    "description":"Stories of travelling through Europe by two Canadians.",
    "image":"images/travel-europe.jpg",
    "author":""
  },
  "advice": {
    "type":"website",
    "title":"Canadians Roam - Advice",
    "description":"Advice from lessons we learned about moving to Europe for a year.",
    "image":"images/advice.jpg",
    "author":""
  }
};

function updateMetaData(articles) {
  for (var i=0; i < articles.length-1; i++) {
    if (!metaData[articles[i].id]) {
      metaData[articles[i].id] = {};
      metaData[articles[i].id].type = 'article';
    }
    metaData[articles[i].id].title = articles[i].title;
    metaData[articles[i].id].description = articles[i].summary;
    metaData[articles[i].id].image = articles[i].imgSrc;
    metaData[articles[i].id].author = articles[i].author;
  }
}

// Init metaData in memory on load
var db = admin.database();
var ref = db.ref("/articles");
ref.once("value", function(articles) {
  updateMetaData(articles.val());
});

// when firebase database is updated, update metaData in memory
exports.databaseUpdate = firebase.database.ref('/articles')
.onUpdate(event => {
  // Grab the current value of what was written to the Realtime Database.
  const data = event.data.val();
  updateMetaData(data);
  return;
});

exports.meta = firebase.https.onRequest((req, res) => {
  console.log(metaData);
  const agent = req.headers['user-agent'];
  console.log(agent);
  if (agent.match(/^(Googlebot|bingbot|msnbot|facebookexternalhit|Facebot|Twitterbot|Google-Structured-Data-Testing-Tool|WhatsApp)/g) != null) {
    var page;
    if (req.url.indexOf('/article/') >=0 ) {
      page = req.url.substr(9);
      page = page.substr(page.indexOf('/') + 1);
    } else if (req.url.indexOf('/list/') >= 0) {
      page = req.url.substr(6);
    } else {
      page = 'latest';
    }
    console.log(page);
    // index with meta tags
    res.status(200).send(`
      <!doctype html>
      <html lang="en">
        <head>
          <meta property="og:type" content="${metaData[page]['type']}" />
          <meta property="og:title" content="${metaData[page]['title']}" />
          <meta property="og:description" content="${metaData[page]['description']}" />
          <meta property="og:image" content="https://canadiansroam.com/data/${metaData[page]['image']}" />
          <meta property="og:site_name" content="Canadins Roam" />
          <meta property="og:url" content="https://canadiansroam.com${req.url}" />
          <meta property="fb:app_id" content="1547851938590583" />

          <meta name="twitter:card" content="summary">
          <meta name="twitter:url" content="https://canadiansroam.com${req.url}">
          <meta name="twitter:title" content="${metaData[page]['title']}">
          <meta name="twitter:description" content="${metaData[page]['description']}">
          <meta name="twitter:image:src" content="https://canadiansroam.com/data/images/${metaData[page]['image']}">

          <script type="application/ld+json">
          {
            "@context": "http://schema.org",
            "@type": "NewsArticle",
            "mainEntityOfPage": "https://canadiansroam.com${req.url}",
            "headline": "${metaData[page]['title']}",
            "datePublished": "2017-06-02T14:00:00+00:00",
            "dateModified": "2017-06-02T06:21:30.434480+00:00",
            "description": "${metaData[page]['description']}",
            "author": {
              "@type": "Person",
              "name": "${metaData[page]['author']}"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Canadians Roam",
              "logo": {
                "@type": "ImageObject",
                "url": "https://canadiansroam.com/images/canadiansroam-icon-192.png",
                "width": "192",
                "height": "192"
              }
            },
            "image": {
              "@type": "ImageObject",
              "url": "https://canadiansroam.com/data/images/${metaData[page]['image']}",
              "width": "500",
              "height": "332"
            }
          }
          </script>
          <title>Canadians Roam</title>

          <link rel="shortcut icon" sizes="32x32" href="/images/canadiansroam-icon-32.png">
          <meta name="theme-color" content="#009246">

          <link rel="manifest" href="/manifest.json">

          <meta name="mobile-web-app-capable" content="yes">
          <meta name="application-name" content="Canadians Roam">
          <meta name="apple-mobile-web-app-capable" content="yes">
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
          <meta name="apple-mobile-web-app-title" content="Canadians Roam">

          <link rel="apple-touch-icon" href="/images/manifest/icon-48x48.png">
          <link rel="apple-touch-icon" sizes="72x72" href="/images/canadiansroam-icon-72.png">
          <link rel="apple-touch-icon" sizes="96x96" href="/images/canadiansroam-icon-96.png">
          <link rel="apple-touch-icon" sizes="144x144" href="/images/canadiansroam-icon-144.png">
          <link rel="apple-touch-icon" sizes="192x192" href="/images/canadiansroam-icon-192.png">

          <meta name="msapplication-TileImage" content="/images/canadiansroam-icon-144.png">
          <meta name="msapplication-TileColor" content="#CE2B37">
          <meta name="msapplication-tap-highlight" content="no">


          <script src="/bower_components/webcomponentsjs/webcomponents-loader.js"></script>
          <link rel="import" href="/src/news-app.html">
          <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
          <script>
          (adsbygoogle = window.adsbygoogle || []).push({
            google_ad_client: "ca-pub-9280083858789197",
            enable_page_level_ads: true
          });
          </script>
          <style>

          body {
            margin: 0px;
            background-color: #FAFAFA;
            color: #383838;
            font-family: sans-serif;
            min-height: 100vh;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          }

          /* styling for render while resources are loading */
          news-app[unresolved] {
            display: block;
            height: 45px;
            padding-top: 40px;
            padding-left: 10px;
            font-size: 39px;
            font-weight: 600;
            letter-spacing: 4px;
            text-align: center;
          }

          /* mobile */
          @media (max-width: 767px) {
            body {
              background-image: linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.25) 15%, rgba(0,0,0,0.25) 30%, rgba(0,0,0,0.7) 48%, rgba(0,0,0,1) 60%);
              background-repeat: no-repeat;
              background-size: 100% 100vh;
            }

            body.fixed-viewport-height {
              background-size: 100% 600px;
            }

            news-app[unresolved] {
              height: 22px;
              padding-top: 21px;
              font-size: 20px;
              color: #FFF; /* --app-cover-text-color */
            }
          }

          </style>

        </head>
        <body>
          <news-app unresolved app-title="Canadians Roam">Canadians Roam</news-app>
        </body>
      </html>`);
  } else {
    // default index
    res.status(200).send(`<!doctype html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, minimum-scale=1.0, initial-scale=1.0, user-scalable=yes">
        <title>Canadians Roam</title>

        <link rel="shortcut icon" sizes="32x32" href="/images/canadiansroam-icon-32.png">
        <meta name="theme-color" content="#009246">

        <link rel="manifest" href="/manifest.json">

        <meta name="mobile-web-app-capable" content="yes">
        <meta name="application-name" content="Canadians Roam">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
        <meta name="apple-mobile-web-app-title" content="Canadians Roam">

        <link rel="apple-touch-icon" href="/images/manifest/icon-48x48.png">
        <link rel="apple-touch-icon" sizes="72x72" href="/images/canadiansroam-icon-72.png">
        <link rel="apple-touch-icon" sizes="96x96" href="/images/canadiansroam-icon-96.png">
        <link rel="apple-touch-icon" sizes="144x144" href="/images/canadiansroam-icon-144.png">
        <link rel="apple-touch-icon" sizes="192x192" href="/images/canadiansroam-icon-192.png">

        <meta name="msapplication-TileImage" content="/images/canadiansroam-icon-144.png">
        <meta name="msapplication-TileColor" content="#CE2B37">
        <meta name="msapplication-tap-highlight" content="no">


        <script src="/bower_components/webcomponentsjs/webcomponents-loader.js"></script>
        <link rel="import" href="/src/news-app.html">
        <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        <script>
          (adsbygoogle = window.adsbygoogle || []).push({
            google_ad_client: "ca-pub-9280083858789197",
            enable_page_level_ads: true
          });
        </script>
        <style>

          body {
            margin: 0px;
            background-color: #FAFAFA;
            color: #383838;
            font-family: sans-serif;
            min-height: 100vh;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          }

          /* styling for render while resources are loading */
          news-app[unresolved] {
            display: block;
            height: 45px;
            padding-top: 40px;
            padding-left: 10px;
            font-size: 39px;
            font-weight: 600;
            letter-spacing: 4px;
            text-align: center;
          }

          /* mobile */
          @media (max-width: 767px) {
            body.fixed-viewport-height {
              background-size: 100% 600px;
            }

            news-app[unresolved] {
              height: 22px;
              padding-top: 21px;
              font-size: 20px;
              color: #FFF; /* --app-cover-text-color */
            }
          }

        </style>

      </head>
      <body>

        <news-app unresolved app-title="Canadians Roam">Canadians Roam</news-app>

      </body>
      </html>
    `);
  }
});
