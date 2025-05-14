const baseURL = "https://open.er-api.com/v6/latest/";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const exchangeIcon=document.querySelector(".exchange-icon");

exchangeIcon.addEventListener("click", () => {
  let temp=fromCurr.value;
  fromCurr.value=toCurr.value;
  toCurr.value=temp;

  loadFlag(fromCurr);
  loadFlag(toCurr);

  btn.click();
});

// Populate currency dropdowns dynamically from countryList
dropdowns.forEach((select) => {
  for (let currCode in countryList) {
    let option = document.createElement("option");
    option.value = currCode;
    option.innerText = currCode;
    select.appendChild(option);
  }
});

// Set default selections
fromCurr.value = "USD";
toCurr.value = "INR";

// Load initial flags
loadFlag(fromCurr);
loadFlag(toCurr);


dropdowns.forEach((select) => {
  select.addEventListener("change", (e) => {
    loadFlag(e.target);
  });
});

// Function to set correct flag image
function loadFlag(select) {
  const currencyCode = select.value;
  const countryCode = countryList[currencyCode];
  const img = select.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${countryCode}/shiny/64.png`;
}

btn.addEventListener("click", async (e) => {
  e.preventDefault();

  const amount = document.querySelector("input").value;
  if (isNaN(amount) || amount <= 0) {
    msg.innerText = "Please enter a valid amount";
    return;
  }

  try {
    const URL = `${baseURL}${fromCurr.value}`;
    const res = await fetch(URL);
    const data = await res.json();
    const rate = data.rates[toCurr.value];
    const converted = (amount * rate).toFixed(2);
    msg.innerText = `${amount} ${fromCurr.value} = ${converted} ${toCurr.value}`;
  } catch (error) {
    msg.innerText = "Error fetching exchange rate.";
    console.error(error);
  }
});
