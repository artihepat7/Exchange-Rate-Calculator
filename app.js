//https://api.exchangerate-api.com/v4/latest/USD

const currencyEle_one = document.getElementById("currency-one");
const currencyEle_two = document.getElementById("currency-two");
const amountEle_one = document.getElementById("amount-one");
const amountEle_two = document.getElementById("amount-two");

const swap = document.getElementById("swap");
const text = document.getElementById("rate");

function calculate() {
  const currency_one = currencyEle_one.value;
  const currency_two = currencyEle_two.value;
  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //   console.log(
      //     `1 ${currency_one} = ${data.rates[currency_two]} ${currency_two}`
      //   );
      const rate = data.rates[currency_two];
      text.innerHTML = `1 ${currency_one} = ${rate} ${currency_two}`;

      amountEle_two.value = (amountEle_one.value * rate).toFixed(2);
    });
}

//event listeners
currencyEle_one.addEventListener("change", calculate);
currencyEle_two.addEventListener("change", calculate);
amountEle_one.addEventListener("input", calculate);
amountEle_two.addEventListener("input", calculate);
calculate();

swap.addEventListener("click", function () {
  const temp = currencyEle_one.value;
  currencyEle_one.value = currencyEle_two.value;
  currencyEle_two.value = temp;
  calculate();
});
