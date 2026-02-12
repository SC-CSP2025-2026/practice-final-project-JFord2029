const API_KEY =
  "efe786bfa815bd9cc3b7d7e2f1b42c2bcdee838b7290b2b0420db3cb54a3793f";

const charts = {
  POP: "pop-songs",
  TOP: "hot-100",
  COUNTRY: "country-songs",
};

async function getSongs(type) {
  const chartId = charts[type];

  if (!chartId) {
    alert("Invalid chart type.");
    return;
  }

  const url = `https://billboard-charts-api.p.rapidapi.com/charts.php?id=${chartId}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-key":
          efe786bfa815bd9cc3b7d7e2f1b42c2bcdee838b7290b2b0420db3cb54a3793f,
        "x-rapidapi-host": "billboard-charts-api.p.rapidapi.com",
      },
    });

    const data = await res.json();
    displaySongs(data.content);
  } catch (err) {
    console.error(err);
    document.getElementById("songs").innerHTML =
      "<p>Failed to load songs. Check API key or internet.</p>";
  }
}

function displaySongs(songs) {
  const container = document.getElementById("songs");
  container.innerHTML = "";

  const ul = document.createElement("ul");

  songs.slice(0, 20).forEach((song) => {
    const li = document.createElement("li");
    li.textContent = `${song.rank}. ${song.title} — ${song.artist}`;
    ul.appendChild(li);
  });

  container.appendChild(ul);
}
