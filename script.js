const NAV_URL = "/api/nav";

let funds = [];

async function fetchNAVData() {
  const select = document.getElementById("fundSelect");
  const result = document.getElementById("result");

  try {
    const response = await fetch(NAV_URL);
    if (!response.ok) {
      throw new Error("Could not load NAV data");
    }

    const text = await response.text();
    const lines = text.split(/\r?\n/);

    funds = [];

    lines.forEach((line) => {
      const parts = line.split(";");

      if (parts.length > 4 && !isNaN(parts[4])) {
        funds.push({
          schemeName: parts[3].trim(),
          nav: parseFloat(parts[4]),
        });
      }
    });

    if (funds.length === 0) {
      throw new Error("No valid fund data found");
    }

    populateDropdown();
    result.innerText = "";
  } catch (error) {
    console.error("Error fetching NAV data:", error);
    select.innerHTML = "<option>Unable to load funds</option>";
    result.innerText = "Could not load NAV data. Please try again shortly.";
  }
}

function populateDropdown() {
  const select = document.getElementById("fundSelect");
  select.innerHTML = "";

  funds.forEach((fund, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${fund.schemeName} (Rs ${fund.nav})`;
    select.appendChild(option);
  });
}

function calculateValue() {
  const index = document.getElementById("fundSelect").value;
  const units = parseFloat(document.getElementById("units").value);

  if (isNaN(units) || units <= 0) {
    alert("Please enter valid units");
    return;
  }

  const fund = funds[index];
  if (!fund) {
    alert("Please select a valid fund");
    return;
  }

  const value = fund.nav * units;
  document.getElementById("result").innerText = `Portfolio Value: Rs ${value.toFixed(2)}`;
}

fetchNAVData();
