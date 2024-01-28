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
