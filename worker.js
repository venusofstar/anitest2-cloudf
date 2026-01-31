// ================= ANIME MOVIES =================
const animeMovies = {
  silentvoice: {
    title: "A Silent Voice - Tagalog Dubbed",
    src: "https://dn720404.ca.archive.org/0/items/perfect-scholarship/Perfect%20Scholarship.mp4"
  },
  yourname: {
    title: "Your Name - Tagalog Dubbed",
    src: "https://dn720409.ca.archive.org/0/items/yur-ne-m/YUr-NeM.mp4"
  },
  weathering: {
    title: "Weathering With You - Tagalog Dubbed",
    src: "https://dn720406.ca.archive.org/0/items/wwthiyou_202301/wwthiYOU.mp4"
  },
  hxhphantom: {
    title: "Hunter × Hunter: Phantom Rouge - Tagalog Dubbed",
    src: "https://ia804501.us.archive.org/2/items/yur-ne-m/hter2x%20Ph%C3%B1tom%20ROG.mp4"
  },
  hxhlastmission: {
    title: "Hunter X Hunter: The Last Mission - Tagalog Dubbed",
    src: "https://dn720409.ca.archive.org/0/items/yur-ne-m/Ha%C3%B1ta2x%20LstMisyo%C3%B1.mp4"
  }
};

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // ================= HOME =================
  if (pathname === "/" || pathname === "/index.html") {
    return fetch("https://your-domain.com/index.html"); // Replace with your actual public HTML file hosted somewhere
  }

  // ================= ANIME MOVIES =================
  if (pathname.startsWith("/api/movie/")) {
    const id = pathname.split("/").pop();
    const movie = animeMovies[id];
    if (!movie) return jsonResponse({ error: "Movie not found" }, 404);
    return jsonResponse(movie);
  }

  // ================= ANIME SERIES =================

  // Hunter X Hunter
  if (pathname.startsWith("/api/hxh/")) {
    const ep = parseInt(pathname.split("/").pop());
    if (!ep || ep < 1 || ep > 148) return jsonResponse({ error: "Episode not found" }, 404);

    let src = "";
    if (ep <= 60) {
      src = `https://dn720706.ca.archive.org/0/items/anime-2.0-5/%F0%9D%97%94%F0%9D%97%BB%F0%9D%97%B6%F0%9D%97%BA%F0%9D%97%B2%20%F0%9D%9F%AE.%F0%9D%9F%AC%20-%20${ep}.mp4`;
    } else if (ep <= 100) {
      src = `https://ia601504.us.archive.org/10/items/anime-2.0-100/%F0%9D%97%94%F0%9D%97%BB%F0%9D%97%B6%F0%9D%97%BA%F0%9D%97%B2%20%F0%9D%9F%AE.%F0%9D%9F%AC%20-%20${ep}.mp4`;
    } else {
      src = `https://ia801509.us.archive.org/29/items/anime-2.0-114/%F0%9D%97%94%F0%9D%97%BB%F0%9D%97%B6%F0%9D%97%BA%F0%9D%97%B2%20%F0%9D%9F%AE.%F0%9D%9F%AC%20-%20${ep}.mp4`;
    }
    return jsonResponse({ src });
  }

  // Black Clover
  if (pathname.startsWith("/api/blackclover/")) {
    const ep = parseInt(pathname.split("/").pop());
    if (!ep || ep < 1 || ep > 102) return jsonResponse({ error: "Episode not found" }, 404);

    const epStr = ep.toString().padStart(2, "0");
    const src = `https://file.garden/Z5iMyklJBX3zDDC5/BClover/Black%20Clover%20S1-Ep${epStr}.mp4`;
    return jsonResponse({ src });
  }

  // Bleach
  if (pathname.startsWith("/api/bleach/")) {
    const ep = parseInt(pathname.split("/").pop());
    if (!ep || ep < 1 || ep > 167) return jsonResponse({ error: "Episode not found" }, 404);

    const src = ep < 10
      ? `https://dn720401.ca.archive.org/0/items/ble-ach-episode-166/BL%E1%B4%87ACh%20Episode%200${ep}.mp4`
      : `https://dn720401.ca.archive.org/0/items/ble-ach-episode-166/BL%E1%B4%87ACh%20Episode%20${ep}.mp4`;

    return jsonResponse({ src });
  }

  // Doraemon
  if (pathname.startsWith("/api/doraemonseries/")) {
    const ep = Number(pathname.split("/").pop());
    if (!Number.isInteger(ep) || ep < 1 || ep > 60) {
      return jsonResponse({ error: "Episode not found" }, 404);
    }

    const src = `https://dn720308.ca.archive.org/0/items/draem-0-n-32/DRaem0N-${ep}.mp4`;
    return jsonResponse({ src });
  }

  // If no route matched
  return jsonResponse({ error: "Not found" }, 404);
}

// Helper function for JSON responses
function jsonResponse(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
  });
}
