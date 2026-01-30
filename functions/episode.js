export async function onRequestGet({ request }) {
  const url = new URL(request.url);
  const parts = url.pathname.split("/");
  const ep = parseInt(parts[parts.length - 1]);

  if (!ep || ep < 1 || ep > 148) {
    return new Response(JSON.stringify({ error: "Episode not found" }), { status: 404 });
  }

  let src = "";

  if (ep <= 60) {
    src = `https://dn720706.ca.archive.org/0/items/anime-2.0-5/HunterXHunter-${ep}.mp4`;
  } else if (ep <= 100) {
    src = `https://ia601504.us.archive.org/10/items/anime-2.0-100/HunterXHunter-${ep}.mp4`;
  } else {
    src = `https://ia801509.us.archive.org/29/items/anime-2.0-114/HunterXHunter-${ep}.mp4`;
  }

  // Return JSON with the video URL
  return new Response(JSON.stringify({ src }), {
    headers: {
      "Content-Type": "application/json",
      // Optional: allow CORS
      "Access-Control-Allow-Origin": "*"
    },
  });
}
