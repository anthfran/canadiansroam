const functions = require('firebase-functions');
const data = {
  "latest": {
    "type":"website",
    "title":"Canadians Roam",
    "description":"Home page of two Canadians Roaming through Europe while living in Rome.",
    "image":"life-in-rome-intro.jpg",
    "author":""
  },
  "life-in-rome": {
    "type":"website",
    "title": "Canadians Roam - Life in Rome",
    "description":"Stories of living in Rome by two Canadians.",
    "image":"life-in-rome-intro.jpg",
    "author":""
  },
  "travel": {
    "type":"website",
    "title":"Canadians Roam - Travels",
    "description":"Stories of travelling through Europe by two Canadians.",
    "image":"travel-europe.jpg",
    "author":""
  },
  "advice": {
    "type":"website",
    "title":"Canadians Roam - Advice",
    "description":"Advice from lessons we learned about moving to Europe for a year.",
    "image":"advice.jpg",
    "author":""
  },
  "visa-application": {
    "type":"article",
    "title":"One Year European Working Holiday VISA Application",
    "description":"Information not provided by the Italian consulate that we wish we knew before applying.",
    "image":"schengen-visa.jpg",
    "author":"Anthony Francella"
  },
  "permissio-de-soggiorno": {
    "type":"article",
    "title":"Appling for a Permissio de Soggiorno",
    "description":"test",
    "image":"",
    "author":""
    }
};

exports.meta = functions.https.onRequest((req, res) => {
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
    res.status(200).send(`
      <!doctype html>
      <html lang="en">
      <head>
        <meta property="og:type" content="${data[page]['type']}" />
        <meta property="og:title" content="${data[page]['title']}" />
        <meta property="og:description" content="${data[page]['description']}" />
        <meta property="og:image" content="https://canadiansroam.com/data/images/${data[page]['image']}" />
        <meta property="og:site_name" content="Canadins Roam" />
        <meta property="og:url" content="https://canadiansroam.com${req.url}" />
        <meta property="fb:app_id" content="1547851938590583" />

        <meta name="twitter:card" content="summary">
        <meta name="twitter:url" content="https://canadiansroam.com${req.url}">
        <meta name="twitter:title" content="${data[page]['title']}">
        <meta name="twitter:description" content="${data[page]['description']}">
        <meta name="twitter:image:src" content="https://canadiansroam.com/data/images/${data[page]['image']}">

        <script type="application/ld+json">
        {
          "@context": "http://schema.org",
          "@type": "NewsArticle",
          "mainEntityOfPage": "https://canadiansroam.com${req.url}",
          "headline": "${data[page]['title']}",
          "datePublished": "2017-06-02T14:00:00+00:00",
          "dateModified": "2017-06-02T06:21:30.434480+00:00",
          "description": "${data[page]['description']}",
          "author": {
            "@type": "Person",
            "name": "${data[page]['author']}"
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
            "url": "https://canadiansroam.com/data/images/${data[page]['image']}",
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
      </html>
    `);
  } else {
    res.status(200).send(`
      <!doctype html>
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
      </html>
    `);
  }
});
