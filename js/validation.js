// Form Validation

function formValid() {
  let emailBox = document.getElementById("email");
  let domainBox = document.getElementById("domain");
  let sourceTypeBox = document.getElementById("sourceType");
  let countryBox = document.getElementById("country");
  let reasonBox = document.getElementById("reason");

  let emailInput = emailBox.value;
  let domainInput = domainBox.value;
  let sourceTypeInput = sourceTypeBox.value;
  let countryInput = countryBox.value;
  let reasonInput = reasonBox.value;

  emailBox.style.backgroundColor = "";
  domainBox.style.backgroundColor = "";
  sourceTypeBox.style.backgroundColor = "";
  countryBox.style.backgroundColor = "";
  reasonBox.style.backgroundColor = "";

  let emailError = document.getElementById("emailError");
  let domainError = document.getElementById("domainError");
  let sourceTypeError = document.getElementById("sourceTypeError");
  let countryError = document.getElementById("countryError");
  let reasonError = document.getElementById("reasonError");

  emailError.innerText = "";
  domainError.innerText = "";
  sourceTypeError.innerText = "";
  countryError.innerText = "";
  reasonError.innerText = "";

  let validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let validDomain = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

  if (emailInput === "") {
    emailError.innerHTML = "<p>Must insert Email!</p>";
    emailBox.style.backgroundColor = "#ffe2e0";
    emailBox.focus();
    return false;
  }

  if (!validEmail.test(emailInput)) {
    emailError.innerHTML = "<p>Must insert valid Email!</p>";
    emailBox.style.backgroundColor = "#ffe2e0";
    emailBox.focus();
    return false;
  }

  if (domainInput === "") {
    domainError.innerHTML = "<p>Must insert Domain!</p>";
    domainBox.style.backgroundColor = "#ffe2e0";
    domainBox.focus();
    return false;
  }

  if (!validDomain.test(domainInput)) {
    domainError.innerHTML = "<p>Must insert valid Domain!</p>";
    domainBox.style.backgroundColor = "#ffe2e0";
    domainBox.focus();
    return false;
  }

  if (sourceTypeInput === "0") {
    sourceTypeError.innerHTML = "<p>Must choose source type!</p>";
    sourceTypeBox.style.backgroundColor = "#ffe2e0";
    sourceTypeBox.focus();
    return false;
  }

  if (countryInput === "0") {
    countryError.innerHTML = "<p>Must choose country!</p>";
    countryBox.style.backgroundColor = "#ffe2e0";
    countryBox.focus();
    return false;
  }

  updateCounterUp();
  addToTable(
    emailInput,
    domainInput,
    sourceTypeInput,
    countryInput,
    reasonInput
  );

  cleanForm();
  saveFormInfo(
    emailInput,
    domainInput,
    sourceTypeInput,
    countryInput,
    reasonInput
  );
}

// Add To table

function addToTable(email, domain, sourceType, country, reason) {
  let table = document.getElementById("table");
  let counter = localStorage.getItem("counter");
  let forms = localStorage.getItem("forms");

  // td - Email

  let tdEmail = document.createElement("td");
  let data1 = document.createTextNode(email);
  tdEmail.appendChild(data1);

  // td - Domain
  let tdDomain = document.createElement("td");
  let data2 = document.createTextNode(domain);
  tdDomain.appendChild(data2);

  // td - Source Type
  let tdSourceType = document.createElement("td");
  let data3 = document.createTextNode(sourceType);
  tdSourceType.appendChild(data3);

  // td - country
  let tdCountry = document.createElement("td");
  let data4 = document.createTextNode(country);
  tdCountry.appendChild(data4);

  // td - Reason
  let tdReason = document.createElement("td");
  let data5 = document.createTextNode(reason);
  tdReason.appendChild(data5);

  // Delete request

  let deleteRequest = document.createElement("td");
  deleteRequest.className = "delete";
  deleteRequest.id = "form" + forms;
  deleteRequest.addEventListener("click", deleteFormRequest);

  // build Table
  let tableBody = document.createElement("tr");
  tableBody.id = "tr" + forms;
  tableBody.appendChild(tdEmail);
  tableBody.appendChild(tdDomain);
  tableBody.appendChild(tdSourceType);
  tableBody.appendChild(tdCountry);
  tableBody.appendChild(tdReason);
  tableBody.appendChild(deleteRequest);

  table.appendChild(tableBody);
}

// Clean Form

function cleanForm() {
  document.getElementById("email").value = "";
  document.getElementById("domain").value = "";
  document.getElementById("sourceType").value = "0";
  document.getElementById("country").value = "0";
  document.getElementById("reason").value = "";
}

// Update Counter - Add request

function updateCounterUp() {
  let counter = localStorage.getItem("counter");
  if (counter === null) {
    counter === 0;
  }
  let forms = localStorage.getItem("forms");
  if (forms === null) {
    forms === 0;
  }
  counter++;
  forms++;
  localStorage.setItem("counter", counter);
  localStorage.setItem("forms", forms);
}

// save form info

function saveFormInfo(email, domain, sourceType, country, reason) {
  let forms = localStorage.getItem("forms");
  let request = {
    id: "form" + forms,
    email: email,
    domain: domain,
    sourceType: sourceType,
    country: country,
    reason: reason
  };
  let makeItJson = JSON.stringify(request);
  localStorage.setItem("form" + forms, makeItJson);
}

// delete form request

function deleteFormRequest() {
  let counter = localStorage.getItem("counter");
  this.parentNode.parentNode.removeChild(this.parentNode);
  localStorage.removeItem(this.id);
  counter--;
  localStorage.setItem("counter", counter);
}

// delete all table

function closeAllRequests() {
  let counter = localStorage.getItem("counter");
  document.getElementById("table").innerHTML =
    "<tr class='tableHeader'><th>Email</th><th>Domain</th>  <th>Source Type</th>  <th>Country</th>  <th>Reason</th>  <th>Delete</th></tr>";
  localStorage.clear();
  counter = 0;
  localStorage.setItem("counter", counter);
}

// onload Restore requests

async function restoreRequests() {
  let forms = localStorage.getItem("forms");

  for (i = 0; i <= forms; i++) {
    let formInfo = localStorage.getItem("form" + i);
    let trInfo = await JSON.parse(formInfo);
    setTimeout(() => {
      addToTableByRestore(
        trInfo.id,
        trInfo.email,
        trInfo.domain,
        trInfo.sourceType,
        trInfo.country,
        trInfo.reason
      );
    }, 100);
  }
}

// Add to table By Restore

function addToTableByRestore(id, email, domain, sourceType, country, reason) {
  let table = document.getElementById("table");
  let counter = localStorage.getItem("counter");
  let forms = localStorage.getItem("forms");

  // td - Email

  let tdEmail = document.createElement("td");
  let data1 = document.createTextNode(email);
  tdEmail.appendChild(data1);

  // td - Domain
  let tdDomain = document.createElement("td");
  let data2 = document.createTextNode(domain);
  tdDomain.appendChild(data2);

  // td - Source Type
  let tdSourceType = document.createElement("td");
  let data3 = document.createTextNode(sourceType);
  tdSourceType.appendChild(data3);

  // td - country
  let tdCountry = document.createElement("td");
  let data4 = document.createTextNode(country);
  tdCountry.appendChild(data4);

  // td - Reason
  let tdReason = document.createElement("td");
  let data5 = document.createTextNode(reason);
  tdReason.appendChild(data5);

  // Delete request

  let deleteRequest = document.createElement("td");
  deleteRequest.className = "delete";
  deleteRequest.id = id;
  deleteRequest.addEventListener("click", deleteFormRequest);

  // build Table
  let tableBody = document.createElement("tr");
  tableBody.id = id;
  tableBody.appendChild(tdEmail);
  tableBody.appendChild(tdDomain);
  tableBody.appendChild(tdSourceType);
  tableBody.appendChild(tdCountry);
  tableBody.appendChild(tdReason);
  tableBody.appendChild(deleteRequest);

  table.appendChild(tableBody);
}
