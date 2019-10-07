// Get list Of Countries

function getCountries() {
  $.ajax({
    method: "GET",
    // http://country.io/names.json Using Proxy
    url:
      "https://jsonp.afeld.me/?callback=&url=http%3A%2F%2Fcountry.io%2Fnames.json",
    success: function(response) {
      displayCountries(response);
    },
    error: function(err) {
      alert("Error: " + err.status);
    }
  });
}

function displayCountries(countries) {
  let listOfCountries = countries;
  let inputCountries = document.getElementById("country");
  let allCountries;
  for (x in countries) {
    let option =
      "<option vlaue='" +
      listOfCountries[x] +
      "'>" +
      listOfCountries[x] +
      "</option>";
    allCountries = allCountries + option;
  }
  let firstOption =
    "<option value='0' selected disabled>Choose country</option>";
  inputCountries.innerHTML = firstOption + allCountries;
}

getCountries();
