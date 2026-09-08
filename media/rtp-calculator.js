(() => {
  const root = document.querySelector('[data-rtp-calculator-page]');
  if (!root) return;

  const locale = document.documentElement.lang || 'en';
  const number = new Intl.NumberFormat(locale, { maximumFractionDigits: 2 });
  const read = input => Number.parseFloat(input.value.replace(',', '.'));
  const signed = value => `${value > 0 ? '+' : value < 0 ? '−' : ''}${number.format(Math.abs(value))}`;

  const actual = root.querySelector('[data-actual-rtp]');
  const wagered = actual.querySelector('[data-wagered]');
  const returned = actual.querySelector('[data-returned]');
  const actualRtp = actual.querySelector('[data-actual-result]');
  const actualEdge = actual.querySelector('[data-actual-edge]');
  const actualNet = actual.querySelector('[data-actual-net]');
  const actualError = actual.querySelector('[data-error]');
  actual.addEventListener('submit', event => event.preventDefault());

  const updateActual = () => {
    const wager = read(wagered);
    const payout = read(returned);
    const valid = Number.isFinite(wager) && wager > 0 && wager <= 1e12 && Number.isFinite(payout) && payout >= 0 && payout <= 1e12;
    actualError.classList.toggle('is-visible', !valid);
    if (!valid) return;
    const rtp = payout / wager * 100;
    actualRtp.textContent = `${number.format(rtp)}%`;
    actualEdge.textContent = `${number.format(100 - rtp)}%`;
    actualNet.textContent = signed(payout - wager);
    actualNet.classList.toggle('positive', payout > wager);
  };

  const bonus = root.querySelector('[data-bonus-ev]');
  const priceInput = bonus.querySelector('[data-buy-price]');
  const rtpInput = bonus.querySelector('[data-buy-rtp]');
  const expectedPayout = bonus.querySelector('[data-buy-payout]');
  const expectedNet = bonus.querySelector('[data-buy-net]');
  const modelEdge = bonus.querySelector('[data-buy-edge]');
  const bonusError = bonus.querySelector('[data-error]');
  bonus.addEventListener('submit', event => event.preventDefault());

  const updateBonus = () => {
    const price = read(priceInput);
    const rtp = read(rtpInput);
    const valid = Number.isFinite(price) && price > 0 && price <= 100000 && Number.isFinite(rtp) && rtp > 0 && rtp <= 100;
    bonusError.classList.toggle('is-visible', !valid);
    if (!valid) return;
    const payout = price * rtp / 100;
    expectedPayout.textContent = `${number.format(payout)}×`;
    expectedNet.textContent = `${signed(payout - price)}×`;
    modelEdge.textContent = `${number.format(100 - rtp)}%`;
  };

  actual.addEventListener('input', updateActual);
  bonus.addEventListener('input', updateBonus);
  updateActual();
  updateBonus();
})();
