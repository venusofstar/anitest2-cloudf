export async function onRequestGet({ request, env, params }) {
  // Cloudflare Pages automatically passes URL params
  const url = new URL(request.url);
  const ep = parseInt(url.pathname.split("/").pop());

  let src = "";

  if (ep >= 1 && ep <= 60) {
    src = `https://dn720706.ca.archive.org/0/items/anime-2.0-5/%F0%9D%97%94%F0%9D%97%BB%F0%9D%97%B6%F0%9D%97%BA%F0%9D%97%B2%20%F0%9D%9F%AE.%F0%9D%9F%AC%20-%20${ep}.mp4`;
  } else if (ep <= 100) {
    src = `https://ia601504.us.archive.org/10/items/anime-2.0-100/%F0%9D%97%94%F0%9D%97%BB%F0%9D%97%B6%F0%9D%97%BA%F0%9D%97%B2%20%F0%9D%9F%AE.%F0%9D%9F%AC%20-%20${ep}.mp4`;
  } else if (ep <= 148) {
    src = `https://ia801509.us.archive.org/29/items/anime-2.0-114/%F0%9D%97%94%F0%9D%97%BB%F0%9D%97%B6%F0%9D%97%BA%F0%9D%97%B2%20%F0%9D%9F%AE.%F0%9D%9F%AC%20-%20${ep}.mp4`;
  } else {
    return new Response(JSON.stringify({ error: "Episode not found" }), { status: 404 });
  }

  return new Response(JSON.stringify({ src }), {
    headers: { "Content-Type": "application/json" },
  });
}
