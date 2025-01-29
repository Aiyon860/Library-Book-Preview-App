document.addEventListener("DOMContentLoaded", function() {
  const minPriceSlider = document.getElementById("min-price");
  const maxPriceSlider = document.getElementById("max-price");
  const minPriceInput = document.getElementById("min-price-input");
  const maxPriceInput = document.getElementById("max-price-input");

  const minDiscountSlider = document.getElementById("min-disc");
  const maxDiscountSlider = document.getElementById("max-disc");
  const minDiscountInput = document.getElementById("min-disc-input");
  const maxDiscountInput = document.getElementById("max-disc-input");

  function syncValues(source, target) {
    target.value = source.value;
  }

  function validateRangePrice() {
    const minVal = parseInt(minPriceSlider.value);
    const maxVal = parseInt(maxPriceSlider.value);

    if (minVal > maxVal) {
      minPriceSlider.value = maxVal;
      minPriceInput.value = maxVal;
    } 
    if (maxVal < minVal) {
      maxPriceSlider.value = minVal;
      maxPriceInput.value = minVal;
    }
  }

  function validateRangeDiscount() {
    const minVal = parseInt(minDiscountSlider.value);
    const maxVal = parseInt(maxDiscountSlider.value);

    if (minVal > maxVal) {
      minDiscountSlider.value = maxVal;
      minDiscountInput.value = maxVal;
    } 
    if (maxVal < minVal) {
      maxDiscountSlider.value = minVal;
      maxDiscountInput.value = minVal;
    }
  }

  /* PRICE */
  // Sync sliders with number inputs
  minPriceSlider.addEventListener("input", function() {
    syncValues(minPriceSlider, minPriceInput);
    validateRangePrice();
  });

  maxPriceSlider.addEventListener("input", function() {
    syncValues(maxPriceSlider, maxPriceInput);
    validateRangePrice();
  });

  // Sync number inputs with sliders
  minPriceInput.addEventListener("input", function() {
    syncValues(minPriceInput, minPriceSlider);
    validateRangePrice();
  });

  maxPriceInput.addEventListener("input", function() {
    syncValues(maxPriceInput, maxPriceSlider);
    validateRangePrice();
  });

  /* DISCOUNT */
  // Sync sliders with number inputs
  minDiscountSlider.addEventListener("input", function() {
    syncValues(minDiscountSlider, minDiscountInput);
    validateRangeDiscount();
  });

  maxDiscountSlider.addEventListener("input", function() {
    syncValues(maxDiscountSlider, maxDiscountInput);
    validateRangeDiscount();
  });

  // Sync number inputs with sliders
  minDiscountInput.addEventListener("input", function() {
    syncValues(minDiscountInput, minDiscountSlider);
    validateRangeDiscount();
  });

  maxDiscountInput.addEventListener("input", function() {
    syncValues(maxDiscountInput, maxDiscountSlider);
    validateRangePrice();
  });
});