export default function decorate(block) {
  // Create the mortgage calculator form
  const form = document.createElement('form');
  form.className = 'mortgage-calculator-form';

  // Purchase Price Input
  const purchasePrice = document.createElement('div');
  purchasePrice.className = 'form-group';
  purchasePrice.innerHTML = `
    <label for="purchase-price">Purchase price</label>
    <div class="slider-container">
      <input type="range" id="purchase-price" min="25000" max="2500000" value="240000" step="1000">
      <div class="value-display">$<span id="purchase-price-value">240,000</span></div>
    </div>
  `;

  // Down Payment Input
  const downPayment = document.createElement('div');
  downPayment.className = 'form-group';
  downPayment.innerHTML = `
    <label for="down-payment">Down payment</label>
    <div class="slider-container">
      <input type="range" id="down-payment" min="0" max="500000" value="35000" step="1000">
      <div class="value-display">$<span id="down-payment-value">35,000</span></div>
    </div>
    <small>5% or more of purchase price</small>
  `;

  // Mortgage Term Select
  const mortgageTerm = document.createElement('div');
  mortgageTerm.className = 'form-group';
  mortgageTerm.innerHTML = `
    <label for="mortgage-term">Mortgage term</label>
    <select id="mortgage-term">
      <option value="30">30 year fixed</option>
      <option value="15">15 year fixed</option>
      <option value="10">10 year fixed</option>
    </select>
  `;

  // ZIP Code Input
  const zipCode = document.createElement('div');
  zipCode.className = 'form-group';
  zipCode.innerHTML = `
    <label for="zip-code">ZIP code</label>
    <input type="text" id="zip-code" value="94115" pattern="[0-9]{5}">
  `;

  // Result Section
  const result = document.createElement('div');
  result.className = 'mortgage-result';
  result.innerHTML = `
    <div class="monthly-payment">
      <h2>$<span id="monthly-payment-value">1,333</span></h2>
      <p>Monthly Payment</p>
    </div>
    <button type="button" class="apply-now">Apply Now</button>
    <p class="estimate-text">Estimate how much you could be paying monthly for your mortgage.</p>
  `;

  // Append all elements to the form
  form.appendChild(purchasePrice);
  form.appendChild(downPayment);
  form.appendChild(mortgageTerm);
  form.appendChild(zipCode);
  form.appendChild(result);

  // Add event listeners
  form.querySelectorAll('input[type="range"]').forEach((slider) => {
    slider.addEventListener('input', updateValues);
  });

  form.querySelector('.apply-now').addEventListener('click', handleApplyNow);

  // Clear the block and append the form
  block.textContent = '';
  block.appendChild(form);
}

function updateValues(e) {
  const value = parseInt(e.target.value, 10);
  const formattedValue = new Intl.NumberFormat('en-US').format(value);
  
  document.getElementById(`${e.target.id}-value`).textContent = formattedValue;
  calculateMortgage();
}

function calculateMortgage() {
  const purchasePrice = parseFloat(document.getElementById('purchase-price').value);
  const downPayment = parseFloat(document.getElementById('down-payment').value);
  const mortgageTerm = parseInt(document.getElementById('mortgage-term').value, 10);
  
  // Assuming 6% annual interest rate
  const annualRate = 0.06;
  const monthlyRate = annualRate / 12;
  const numberOfPayments = mortgageTerm * 12;
  const principal = purchasePrice - downPayment;

  const monthlyPayment = principal * 
    (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  document.getElementById('monthly-payment-value').textContent = 
    new Intl.NumberFormat('en-US').format(Math.round(monthlyPayment));
}

function handleApplyNow() {
  // Handle the apply now button click
  console.log('Apply Now clicked');
} 