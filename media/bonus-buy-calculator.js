(() => {
  const calculator = document.querySelector('[data-buy-calculator]');
  if (!calculator) return;

  const priceInput = calculator.querySelector('[data-buy-price]');
  const rtpInput = calculator.querySelector('[data-buy-rtp]');
  const payout = calculator.querySelector('[data-buy-payout]');
  const loss = calculator.querySelector('[data-buy-loss]');
  const edge = calculator.querySelector('[data-buy-edge]');
  const error = calculator.querySelector('[data-buy-error]');
  const locale = document.documentElement.lang || 'ru';
  const format = new Intl.NumberFormat(locale, { maximumFractionDigits: 2 });

  const update = () => {
    const price = Number.parseFloat(priceInput.value.replace(',', '.'));
    const rtp = Number.parseFloat(rtpInput.value.replace(',', '.'));
    const valid = Number.isFinite(price) && price > 0 && price <= 100000 && Number.isFinite(rtp) && rtp > 0 && rtp <= 100;
    error.classList.toggle('is-visible', !valid);
    if (!valid) return;

    const expectedPayout = price * rtp / 100;
    const expectedLoss = price - expectedPayout;
    payout.textContent = `${format.format(expectedPayout)}×`;
    loss.textContent = `−${format.format(expectedLoss)}×`;
    edge.textContent = `${format.format(100 - rtp)}%`;
  };

  priceInput.addEventListener('input', update);
  rtpInput.addEventListener('input', update);
  update();
})();
