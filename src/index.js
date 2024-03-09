const redirect = {
  "tiktok.com": "tiktxk.com",
  "www.tiktok.com": "tiktxk.com",
  "instagram.com": "www.ddinstagram.com",
  "www.instagram.com": "www.ddinstagram.com",
  "twitter.com": "vxtwitter.com",
  "www.twitter.com": "vxtwitter.com",
  "x.com": "fixvx.com",
  "www.x.com": "fixvx.com",
}

export default {
  async fetch(request) {
    try {
      const url = new URL(request.url)
      const path = url.pathname.substring(1)
      const newURL = new URL(path.startsWith("http") ? path : "https://" + path)

      // MP4 video embed.
      const newAsString = newURL.toString()
      if (newAsString.endsWith(".mp4")) {
        return new Response(
          `
        <html>
          <head>
            <title>Video embed</title>
            <meta property="og:site_name" content="Video embed">
            <meta property="og:type" content="video.other">
            <meta property="og:title" content="Video embed">
            <meta property="og:video" content="${newAsString}">
            <meta property="og:video:type" content="video/mp4">
            <meta property="og:video:secure_url" content="${newAsString}">
            <meta property="og:video:height" content="1080">
            <meta property="og:video:width" content="1920">
          </head>
          <body>
            <a href="${newAsString}">Click here to go to your destination.</a>
          </body>
        </html>
        `,
          {
            headers: {
              "Content-Type": "text/html",
            },
          }
        )
      }

      const replacement = redirect[newURL.host]
      if (replacement) {
        newURL.host = replacement
      } else {
        return new Response("Not found", { status: 404 })
      }
      return Response.redirect(newURL.toString(), 307)
    } catch {
      console.warn(`Invalid URL: ${request.url}`)
      return new Response("Not found", { status: 404 })
    }
  },
}
