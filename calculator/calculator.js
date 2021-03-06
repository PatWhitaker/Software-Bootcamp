window.addEventListener("DOMContentLoaded", function () {
        const form = document.getElementById("calc-form");
        if (form) {
                setupIntialValues();
                form.addEventListener("submit", function (e) {
                        e.preventDefault();
                        update();
                });
        }
});

function getCurrentUIValues() {
        return {
                amount: +document.getElementById("loan-amount").value,
                years: +document.getElementById("loan-years").value,
                rate: +document.getElementById("loan-rate").value,
        };
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
        let amount = 1000.0;
        let years = 5;
        let rate = 5;
        document.getElementById("loan-amount").value = amount;
        document.getElementById("loan-years").value = years;
        document.getElementById("loan-rate").value = rate;
        update();
}

// Get the current values from the UI
// Update the monthly payment
function update() {
        let values = getCurrentUIValues();
        let monthlyPayment = calculateMonthlyPayment(values);
        updateMonthly(monthlyPayment);
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
        let principle = values.amount;
        let interest = values.rate / 12;
        let months = values.years * 12;
        let monthlyPayment = (
                (principle * interest) /
                (1 - (1 + interest) ** -months)
        ).toFixed(2);
        if (!isFinite(monthlyPayment)) {
                return "0.00";
        }
        return monthlyPayment.toString();
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
        let monthlyPayment = document.getElementById("monthly-payment");
        monthlyPayment.innerText = "$" + monthly;
}
