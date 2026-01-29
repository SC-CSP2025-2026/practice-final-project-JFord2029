const url =
  "https://student-api-proxy.onrender.com/api/billboard-charts-api.p.rapidapi.com/https://billboard-charts-api.p.rapidapi.com/top-charts.php";
const options = {
  method: "GET",
  headers: {
    "X-API-Key":
      "efe786bfa815bd9cc3b7d7e2f1b42c2bcdee838b7290b2b0420db3cb54a3793f",
  },
};

fetch(url, options)
  .then((response) =>
    response.json().then((result) => {
      console.log(result.data); // Your API data
      console.log(`Cost: $${result.meta.cost}`);
      console.log(`Remaining: $${result.meta.remaining_budget}`);
    }),
  )
  .catch((error) => {
    console.log(error);
  });
