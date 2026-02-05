const API_KEY =
  "efe786bfa815bd9cc3b7d7e2f1b42c2bcdee838b7290b2b0420db3cb54a3793f";
const API_HOST = "billboard-charts-api.p.rapidapi.com";

function getSongs(genre) {
  // Map the button genre to the correct Billboard chart
  let chart = "";
  if (genre === "POP") chart = "billboard-200";
  else if (genre === "TOP") chart = "hot-100";
  else if (genre === "COUNTRY") chart = "country-100";
  else {
    console.error("Unknown genre:", genre);
    return;
  }

  document.getElementById("songs").innerHTML = "<p>Loading songs...</p>";
  const url = `https://student-api-proxy.onrender.com/api/${billboardchartsapi.p.rapidapi.com}/top-charts?chart=${chart}`;

  console.log("Fetching from URL:", url);

  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(
      () => reject(new Error("Request timeout after 30 seconds")),
      30000,
    );
  });

  Promise.race([
    fetch(url, {
      method: "GET",
      headers: {
        efe786bfa815bd9cc3b7d7e2f1b42c2bcdee838b7290b2b0420db3cb54a3793f:
          API_KEY,
      },
    }),
    timeoutPromise,
  ])
    .then((response) => {
      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      if (!response.ok) {
        return response.text().then((text) => {
          let errorMsg = `API request failed: ${response.status} ${response.statusText}`;
          try {
            const errJson = JSON.parse(text);
            errorMsg += ` - ${JSON.stringify(errJson)}`;
            console.error("Error response:", errJson);
          } catch (e) {
            console.error("Error response text:", text);
            errorMsg += ` - ${text}`;
          }
          throw new Error(errorMsg);
        });
      }
      return response.json();
    })
    .then((result) => {
      console.log("Full API response:", result);

      let songs = [];

      if (result.data) {
        if (Array.isArray(result.data)) {
          songs = result.data;
        } else if (result.data.content && Array.isArray(result.data.content)) {
          songs = result.data.content;
        } else if (result.data.charts && Array.isArray(result.data.charts)) {
          songs = result.data.charts;
        } else if (result.data.entries && Array.isArray(result.data.entries)) {
          songs = result.data.entries;
        } else if (result.data.data && Array.isArray(result.data.data)) {
          songs = result.data.data;
        }
      } else if (Array.isArray(result)) {
        songs = result;
      }

      console.log("Extracted songs:", songs);

      if (songs.length === 0) {
        console.warn("No songs found. Full response:", result);
        document.getElementById("songs").innerHTML =
          "<p>No songs found. Check console for API response details.</p>";
        return;
      }

      displaySongs(songs);
    })
    .catch((error) => {
      const errorMsg = error.message || "Unknown error";
      document.getElementById("songs").innerHTML =
        `<p>Failed to load songs: ${errorMsg}</p>`;
      console.error("Error details:", error);
    });
}

function displaySongs(songs) {
  if (!songs || songs.length === 0) {
    document.getElementById("songs").innerHTML = "<p>No songs found.</p>";
    return;
  }

  let html = "<h3>Top Songs</h3><ul>";

  songs.slice(0, 10).forEach((song, index) => {
    const title = song.title || "Unknown Title";
    const artist = song.artist || "Unknown Artist";
    html += `<li>${index + 1}. ${title} – ${artist}</li>`;
  });

  html += "</ul>";
  document.getElementById("songs").innerHTML = html;
}
