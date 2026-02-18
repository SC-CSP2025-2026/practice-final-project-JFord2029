const getSongsByChart = async (chart) => {
  const url = `https://student-api-proxy.onrender.com/api/billboard-charts-api.p.rapidapi.com/chart.php?id=${chart}`;
  const options = {
    method: "GET",
    headers: {
      "X-API-Key":
        "efe786bfa815bd9cc3b7d7e2f1b42c2bcdee838b7290b2b0420db3cb54a3793f",
    },
  };
  console.log("Inside function");
  const response = await fetch(url, options);
  console.log(response);
  const result = await response.json();
  console.log(result);
  const data = result.data;
  console.log(data);
  const songs = data.songs;
  // console.log(data);

  songs.forEach((song) => {
    console.log(song.artist);
    console.log(song.name);
  });
};
console.log("Running script");
getSongsByChart("vinyl-ablums");
