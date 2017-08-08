const staticIndex = `<!doctype html>
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
</html>`;

exports.staticIndex = staticIndex;
