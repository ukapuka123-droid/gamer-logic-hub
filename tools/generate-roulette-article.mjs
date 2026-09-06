import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const slug = 'article-roulette-odds.html';
const dateIso = '2026-09-06';
const imageUrl = 'https://gamer-logic-hub.com/media/roulette-odds-hero.webp';

const locales = {
  ru: {
    dir: '', htmlLang: 'ru', published: 'Опубликовано: 6 сентября 2026', read: '~11 минут чтения',
    eyebrow: 'Вероятность · выплаты · без мифов',
    title: 'Вероятность выигрыша в рулетке: ставки и выплаты — Gamer Logic Hub',
    h1: 'Вероятность выигрыша в рулетке: таблица ставок, выплаты и роль зеро',
    desc: 'Таблица вероятностей и выплат в европейской и американской рулетке. Разбираем красное и чёрное, преимущество казино и Мартингейл.',
    kicker: 'Математика рулетки', cardTag: 'Шансы · House edge', cardText: 'Таблица ставок, европейское и американское колесо, роль зеро и честный разбор Мартингейла.', readMore: 'Читать статью →',
    introTitle: 'Одно зелёное зеро портит красивое 50/50',
    short: '<strong>Коротко:</strong> в европейской рулетке шанс угадать одно число — 1 из 37, а красное или чёрное — 18 из 37, то есть 48,65%, а не 50%. В американском колесе есть ещё и 00, поэтому цифры становятся 1 из 38 и 47,37%. Выплаты при этом не растут — в этом зазоре и живёт преимущество казино.',
    intro: 'Когда я впервые прогнал длинную серию в нашем симуляторе, самое странное ощущение было не от проигрыша. Удивило другое: почти половина коротких отрезков выглядела так, будто найден какой-то ритм. Красное шло серией, потом чёрное «отвечало», баланс подпрыгивал. А на длинной дистанции шум оседал и оставалась скучная, упрямая математика. Колесо не помнит предыдущий спин и ничего нам не должно.',
    wheelTitle: 'Европейское и американское колесо: разница в одном кармане',
    wheel: 'У европейского колеса 37 секторов: числа 1–36 и одно зеро. У американского — 38: добавляется 00. Кажется, мелочь, но именно она почти удваивает стандартный house edge: примерно с 2,70% до 5,26%. Французские правила <em>La Partage</em> или <em>En Prison</em> могут снизить преимущество до 1,35% на равных шансах, когда выпавшее зеро возвращает половину ставки или оставляет её на следующий спин.',
    tableTitle: 'Таблица вероятностей и выплат',
    tableIntro: 'Ниже — голая математика без «горячих чисел». Выплата 35:1 означает чистый выигрыш 35 ставок плюс возврат исходной ставки. Для обычных ставок house edge внутри одного типа колеса одинаков; меняются частота попаданий и размах колебаний.',
    headers: ['Ставка', 'Чисел', 'Выплата', 'Европа', 'Америка'],
    bets: [['Одно число', '1', '35:1', '2,70%', '2,63%'], ['Сплит', '2', '17:1', '5,41%', '5,26%'], ['Стрит', '3', '11:1', '8,11%', '7,89%'], ['Угол', '4', '8:1', '10,81%', '10,53%'], ['Шесть чисел', '6', '5:1', '16,22%', '15,79%'], ['Дюжина / колонка', '12', '2:1', '32,43%', '31,58%'], ['Красное / чёрное', '18', '1:1', '48,65%', '47,37%']],
    formulaTitle: 'Откуда берутся 2,70%: считаем на одной фишке',
    formula: 'Берём ставку 1 единица на красное в европейской рулетке. В 18 случаях из 37 получаем +1, в остальных 19 — теряем 1. Математическое ожидание: <code>(18/37 × 1) + (19/37 × −1) = −1/37 ≈ −2,70%</code>. Это не обещание потерять ровно 2,7 фишки за 100 спинов. Это среднее на огромном числе испытаний; короткая сессия может улететь куда угодно.',
    typeTitle: 'Большая выплата не означает лучшие шансы',
    type: 'На одном числе приятно видеть 35:1, но попадаем мы всего в 2,70% европейских спинов. Красное срабатывает намного чаще, зато платит 1:1. Средний минус одинаков, характер поездки — разный. На числе график дёрганый и нервный, на цвете спокойнее, но зелёный сектор методично берёт своё. Это тот же принцип, который мы разбирали в статье о <a href="article-volatility.html">волатильности</a>: частота результата и его математическая ценность — не одно и то же.',
    independenceTitle: 'После десяти красных чёрное не становится «должно»',
    independence: 'Вот здесь мозг особенно любит подкинуть сюжет. Видишь длинную красную полосу и думаешь: «Ну всё, сейчас точно чёрное». Но в честной рулетке каждый спин — новое испытание. Шанс красного на следующем европейском вращении всё ещё 18/37. Серии неизбежно возникают в случайных данных; это не сигнал и не компенсация. Такой самообман называют ошибкой игрока.',
    martTitle: 'Мартингейл: много маленьких побед и один очень дорогой вечер',
    mart: 'Классический «догон» предлагает удваивать ставку после каждого проигрыша: 1, 2, 4, 8… После победы цепочка якобы возвращает весь минус и даёт одну фишку прибыли. Первые серии действительно выглядят убедительно — и именно поэтому система так цепляет. Но она меняет размер риска, а не вероятность колеса и не математическое ожидание.',
    martHeaders: ['Поражение подряд', 'Следующая ставка', 'Уже поставлено при новом проигрыше'],
    martRows: [['1', '2', '3'], ['3', '8', '15'], ['5', '32', '63'], ['7', '128', '255'], ['10', '1 024', '2 047']],
    martAfter: 'Семь неудач подряд — уже 255 единиц суммарного риска, если проиграна и ставка 128. Десять — 2 047. Рано или поздно упираемся либо в банк, либо в лимит стола. В симуляторе это особенно хорошо видно: баланс долго ползёт вверх маленькими ступеньками, а потом одна серия сносит лестницу целиком. Не магия, просто экспонента с плохим характером.',
    labTitle: 'Проверьте цифры руками',
    lab: 'Таблица полезна, но рулетка лучше всего объясняет себя в движении. В нашем <a href="simulator-roulette-lab.html">симуляторе и калькуляторе вероятностей</a> можно переключить европейское и американское колесо, выбрать ставку и прогнать длинную серию без денег. Попробуйте сначала 20 вращений, затем 10 000: короткий отрезок расскажет драму, длинный — покажет тенденцию.',
    conclusionTitle: 'Что я вынес из эксперимента',
    conclusion: 'Рулетка устроена почти издевательски элегантно. Правила прозрачны, вероятность считается на салфетке, но короткие серии всё равно заставляют искать закономерность. Самый здравый вывод простой: тип ставки управляет ощущением и волатильностью, а не убирает преимущество дома. Если воспринимать колесо как наглядный урок вероятности, оно действительно интересно. Если ждать от него зарплату — математика быстро испортит вайб.',
    faqTitle: 'Частые вопросы',
    faq: [['Какова вероятность выиграть на красном?', '18/37, или 48,65%, на европейском колесе и 18/38, или 47,37%, на американском. Зеро и 00 не относятся ни к красному, ни к чёрному.'], ['Какая рулетка выгоднее по математике?', 'Европейская лучше американской: стандартное преимущество казино составляет около 2,70% против 5,26%. Французские правила La Partage могут снизить его до 1,35% на равных шансах.'], ['Может ли зеро выпасть два раза подряд?', 'Да. Предыдущий результат не запрещает тому же сектору выпасть снова. Для двух зеро подряд на европейском колесе вероятность равна 1/37 × 1/37.'], ['Работает ли Мартингейл?', 'Он часто даёт маленькую прибыль до первой тяжёлой серии, но не меняет отрицательное математическое ожидание. Рост ставок быстро упирается в капитал и лимиты.'], ['Можно ли предсказать следующий цвет по истории?', 'Нет, если колесо и генератор случайных чисел работают корректно. История описывает прошлое, но не меняет вероятность следующего независимого спина.']],
    disclaimer: '<strong>Важно:</strong> материал и симулятор созданы для изучения вероятности. Они не являются советом по игре и не обещают выигрыш. Не используйте деньги, которые не готовы потерять, и соблюдайте возрастные ограничения своей страны.',
    sourcesTitle: 'Источники и дополнительное чтение', popular: 'Продолжить разбор', simulatorCta: 'Открыть симулятор рулетки →'
  },
  en: {
    dir: 'en', htmlLang: 'en', published: 'Published: September 6, 2026', read: '~11 min read', eyebrow: 'Odds · payouts · no myths',
    title: 'Roulette Odds: Bet Probabilities and Payouts — Gamer Logic Hub', h1: 'Roulette odds explained: bets, payouts, zero, and the Martingale trap',
    desc: 'European and American roulette odds and payouts in one table. See how zero creates the house edge and why Martingale does not beat it.',
    kicker: 'Roulette maths', cardTag: 'Odds · House edge', cardText: 'A clear bet table, European vs American wheels, zero, expected value, and the Martingale trap.', readMore: 'Read the article →',
    introTitle: 'One green zero ruins a beautiful 50/50', short: '<strong>In short:</strong> a single number has a 1-in-37 chance on a European wheel, while red or black lands 18 times out of 37: 48.65%, not 50%. An American wheel adds 00, dropping those figures to 1 in 38 and 47.37%. Payouts do not rise to compensate. That gap is the house edge.',
    intro: 'When I first ran a long batch in our simulator, the loss was not the odd part. What got me was how often a short run looked like a pattern. Red caught fire, black answered, and the balance bounced as if the wheel had a plot. Stretch the sample out, though, and the drama settles into stubborn arithmetic. The wheel has no memory, and it definitely does not owe us a colour.',
    wheelTitle: 'European vs American roulette: one pocket, a big difference', wheel: 'A European wheel has 37 pockets: 1–36 plus a single zero. An American wheel has 38 because it adds 00. That tiny-looking change almost doubles the standard house edge, from roughly 2.70% to 5.26%. French rules such as <em>La Partage</em> or <em>En Prison</em> can cut the edge on even-money bets to 1.35% when zero lands.',
    tableTitle: 'Roulette odds and payout table', tableIntro: 'Here is the clean maths—no hot-number folklore. A 35:1 payout means 35 units of profit plus your original stake back. On standard bets, the house edge stays the same within each wheel; hit frequency and swinginess are what change.',
    headers: ['Bet', 'Numbers', 'Payout', 'European', 'American'], bets: [['Straight up', '1', '35:1', '2.70%', '2.63%'], ['Split', '2', '17:1', '5.41%', '5.26%'], ['Street', '3', '11:1', '8.11%', '7.89%'], ['Corner', '4', '8:1', '10.81%', '10.53%'], ['Six line', '6', '5:1', '16.22%', '15.79%'], ['Dozen / column', '12', '2:1', '32.43%', '31.58%'], ['Red / black', '18', '1:1', '48.65%', '47.37%']],
    formulaTitle: 'Where 2.70% comes from', formula: 'Stake one unit on red in European roulette. You gain one unit in 18 of 37 outcomes and lose it in the other 19. Expected value is <code>(18/37 × 1) + (19/37 × −1) = −1/37 ≈ −2.70%</code>. That does not mean every 100-spin session loses exactly 2.7 units. It is a long-run average; a short session can go properly off the rails in either direction.',
    typeTitle: 'A bigger payout is not a better chance', type: 'A 35:1 hit looks juicy, but a single number lands only 2.70% of the time on a European wheel. Red hits far more often and pays only 1:1. The average edge is the same; the ride is not. Single-number play is spiky, colour betting is calmer, and zero still takes its quiet cut. It is the same distinction covered in our <a href="article-volatility.html">volatility guide</a>: frequency and value are different jobs.',
    independenceTitle: 'After ten reds, black is not “due”', independence: 'This is where the brain starts writing fan fiction. A long red streak appears and black suddenly feels inevitable. On a fair wheel, the next European spin is still 18/37 for red. Random sequences naturally contain streaks; they are not messages from the table. Treating the past as a correction schedule is the gambler’s fallacy.',
    martTitle: 'Martingale: lots of tiny wins, one brutal tab', mart: 'Classic Martingale doubles after every loss: 1, 2, 4, 8… A win recovers the chain and leaves one unit of profit. Early runs can look slick, which is exactly why the system has such pull. But it changes bet size, not the wheel’s probability or expected value.',
    martHeaders: ['Losses in a row', 'Next bet', 'Total risk after another loss'], martRows: [['1', '2', '3'], ['3', '8', '15'], ['5', '32', '63'], ['7', '128', '255'], ['10', '1,024', '2,047']],
    martAfter: 'Lose seven in a row and the 128-unit step puts 255 units on the line. At ten, it is 2,047. Eventually the bankroll or table limit says nope. In the simulator the shape is obvious: the balance climbs in polite little stairs, then one cold streak kicks the staircase over. Not magic—just an exponential with an attitude.',
    labTitle: 'Run the numbers yourself', lab: 'A table helps, but roulette makes more sense in motion. Our <a href="simulator-roulette-lab.html">roulette simulator and odds calculator</a> lets you swap European and American wheels, select a bet, and run a long virtual series with no money involved. Try 20 spins, then 10,000: the short run tells a story; the long run shows the tendency.',
    conclusionTitle: 'What the experiment left me with', conclusion: 'Roulette is almost annoyingly elegant. The rules are transparent and the probability fits on a napkin, yet short streaks still tempt us to find a secret rhythm. The sensible takeaway is simple: bet type changes the feel and volatility, not the house edge. As a probability lesson, the wheel is genuinely fascinating. As a salary plan, the maths kills the vibe fast.',
    faqTitle: 'Frequently asked questions', faq: [['What is the chance of winning on red?', '18/37, or 48.65%, on a European wheel and 18/38, or 47.37%, on an American wheel. Zero and 00 are neither red nor black.'], ['Which roulette wheel has the better odds?', 'European beats American mathematically: the standard house edge is about 2.70% rather than 5.26%. La Partage can reduce it to 1.35% on even-money bets.'], ['Can zero land twice in a row?', 'Yes. The previous result does not block the same pocket. Two consecutive zeros on a European wheel have a probability of 1/37 × 1/37.'], ['Does Martingale work?', 'It often produces small wins before a severe streak, but it does not change negative expected value. Stakes quickly collide with bankroll and table limits.'], ['Can spin history predict the next colour?', 'No, assuming a fair wheel or correctly operating RNG. History describes the past; it does not alter the next independent spin.']],
    disclaimer: '<strong>Important:</strong> this article and simulator are for learning probability. They are not gambling advice and cannot promise a win. Never risk money you cannot afford to lose, and follow local age restrictions.', sourcesTitle: 'Sources and further reading', popular: 'Keep exploring', simulatorCta: 'Open the roulette simulator →'
  },
  es: {
    dir: 'es', htmlLang: 'es-AR', published: 'Publicado: 6 de septiembre de 2026', read: '~11 min de lectura', eyebrow: 'Probabilidad · pagos · sin chamuyo',
    title: 'Probabilidades de la ruleta: apuestas y pagos — Gamer Logic Hub', h1: 'Probabilidades de la ruleta: apuestas, pagos, cero y la trampa de la Martingala', desc: 'Tabla de probabilidades y pagos de la ruleta europea y americana. Mirá cómo el cero crea la ventaja de la casa y por qué falla la Martingala.',
    kicker: 'Matemática de la ruleta', cardTag: 'Chances · Ventaja', cardText: 'Tabla de apuestas, rueda europea y americana, el cero y una mirada honesta a la Martingala.', readMore: 'Leer el artículo →',
    introTitle: 'Un cero verde arruina el lindo 50/50', short: '<strong>En criollo:</strong> en la ruleta europea, un número tiene 1 chance en 37 y rojo o negro sale 18 veces cada 37: 48,65%, no 50%. La americana suma el 00 y baja a 1 en 38 y 47,37%. Los pagos no suben para compensar. Ahí vive la ventaja de la casa.',
    intro: 'Cuando mandé una tanda larga en nuestro simulador, lo más raro no fue perder. Fue ver cuántos tramos cortos parecían tener un patrón: el rojo venía embalado, el negro contestaba y el saldo hacía piruetas. Estirás la muestra y el relato se desinfla; queda la matemática, seca pero honesta. La rueda no tiene memoria y no te debe un color.',
    wheelTitle: 'Europea vs americana: un casillero cambia bastante', wheel: 'La rueda europea tiene 37 casilleros: del 1 al 36 y un cero. La americana suma el 00 y llega a 38. Parece poca cosa, pero casi duplica la ventaja estándar de la casa: de 2,70% a 5,26%. Con reglas francesas como <em>La Partage</em> o <em>En Prison</em>, las apuestas pares pueden bajar a 1,35% cuando sale cero.',
    tableTitle: 'Tabla de probabilidades y pagos', tableIntro: 'Acá están los números, sin venderte la de los “números calientes”. Un pago de 35:1 son 35 unidades de ganancia más la devolución de tu apuesta. Dentro de cada rueda cambia la frecuencia y el sacudón, no la ventaja de las apuestas normales.',
    headers: ['Apuesta', 'Números', 'Pago', 'Europea', 'Americana'], bets: [['Pleno', '1', '35:1', '2,70%', '2,63%'], ['Caballo', '2', '17:1', '5,41%', '5,26%'], ['Calle', '3', '11:1', '8,11%', '7,89%'], ['Cuadro', '4', '8:1', '10,81%', '10,53%'], ['Seisena', '6', '5:1', '16,22%', '15,79%'], ['Docena / columna', '12', '2:1', '32,43%', '31,58%'], ['Rojo / negro', '18', '1:1', '48,65%', '47,37%']],
    formulaTitle: 'De dónde sale el 2,70%', formula: 'Jugás una unidad al rojo en la europea. En 18 de 37 resultados ganás +1 y en los otros 19 perdés 1. El valor esperado es <code>(18/37 × 1) + (19/37 × −1) = −1/37 ≈ −2,70%</code>. No significa que cada 100 tiros perdés justo 2,7 fichas: es un promedio enorme. Una sesión corta puede irse al pasto para cualquiera de los dos lados.',
    typeTitle: 'Pago grande no es mejor probabilidad', type: 'El 35:1 del pleno tienta, pero entra apenas en 2,70% de los tiros europeos. El rojo pega mucho más seguido y paga 1:1. El promedio es igual; el viaje, ni de cerca. Es la misma diferencia que explicamos con la <a href="article-volatility.html">volatilidad</a>: frecuencia y valor no son la misma cosa.',
    independenceTitle: 'Después de diez rojos, el negro no está “por salir”', independence: 'Acá la cabeza arma una película bárbara. Ves una racha roja y pensás “ahora sí o sí viene negro”. En una rueda justa, el próximo rojo sigue en 18/37. Las rachas aparecen naturalmente en datos aleatorios; no son mensajes del paño. Confundir pasado con una deuda futura es la falacia del jugador.',
    martTitle: 'Martingala: muchas alegrías chicas y un golpazo', mart: 'La Martingala duplica después de cada pérdida: 1, 2, 4, 8… Cuando ganás, recuperás la cadena y queda una unidad. Al principio parece una maquinita, y por eso engancha. Pero cambia el tamaño de la apuesta, no la probabilidad ni el valor esperado.',
    martHeaders: ['Pérdidas seguidas', 'Próxima apuesta', 'Riesgo total si vuelve a perder'], martRows: [['1', '2', '3'], ['3', '8', '15'], ['5', '32', '63'], ['7', '128', '255'], ['10', '1.024', '2.047']],
    martAfter: 'Con siete pérdidas, la ficha de 128 deja 255 unidades jugadas. Con diez, 2.047. En algún momento la banca o el límite de mesa te corta el mambo. En el simulador se ve clarito: el saldo sube por escaloncitos y una mala racha se come la escalera entera.',
    labTitle: 'Probalo sin poner un peso', lab: 'La tabla ayuda, pero la rueda se entiende mejor en movimiento. En nuestro <a href="simulator-roulette-lab.html">simulador y calculadora de ruleta</a> podés cambiar entre europea y americana, elegir apuesta y correr una tanda virtual. Probá 20 tiros y después 10.000: la tanda corta cuenta una novela; la larga muestra la tendencia.',
    conclusionTitle: 'Con qué me quedé', conclusion: 'La ruleta es elegantemente tramposa para la intuición. Las reglas son claras y la cuenta entra en una servilleta, pero una racha alcanza para hacernos buscar señales. La posta: la apuesta cambia el ritmo y la volatilidad, no borra la ventaja de la casa. Como clase de probabilidad, está buenísima. Como sueldo, te deja pagando.',
    faqTitle: 'Preguntas frecuentes', faq: [['¿Qué chance hay de ganar al rojo?', '18/37 (48,65%) en la europea y 18/38 (47,37%) en la americana. El cero y el 00 no son rojos ni negros.'], ['¿Qué ruleta conviene matemáticamente?', 'La europea: 2,70% de ventaja estándar contra 5,26% en la americana. La Partage puede bajarla a 1,35% en apuestas pares.'], ['¿Puede salir cero dos veces?', 'Sí. El resultado anterior no bloquea ningún casillero. Dos ceros europeos seguidos tienen probabilidad 1/37 × 1/37.'], ['¿Funciona la Martingala?', 'Suele juntar ganancias chicas antes de una racha pesada, pero no cambia el valor esperado negativo. La apuesta choca rápido con el saldo o el límite.'], ['¿El historial predice el próximo color?', 'No, si la rueda o el RNG funcionan correctamente. El historial describe el pasado; no modifica el siguiente tiro independiente.']],
    disclaimer: '<strong>Importante:</strong> este contenido y el simulador sirven para aprender probabilidad. No son consejos de juego ni prometen ganancias. No arriesgues plata que necesitás y respetá la edad legal de tu país.', sourcesTitle: 'Fuentes y lecturas', popular: 'Seguí explorando', simulatorCta: 'Abrir el simulador →'
  },
  id: {
    dir: 'id', htmlLang: 'id', published: 'Diterbitkan: 6 September 2026', read: '~11 menit membaca', eyebrow: 'Peluang · payout · tanpa mitos',
    title: 'Peluang Roulette: Tabel Taruhan dan Payout — Gamer Logic Hub', h1: 'Peluang roulette: tabel taruhan, payout, zero, dan jebakan Martingale', desc: 'Tabel peluang roulette Eropa dan Amerika. Pahami peran zero, house edge, nilai harapan, dan kenapa Martingale bikin boncos.',
    kicker: 'Matematika roulette', cardTag: 'Peluang · House edge', cardText: 'Tabel taruhan, roda Eropa vs Amerika, peran zero, dan bedah Martingale tanpa basa-basi.', readMore: 'Baca artikel →',
    introTitle: 'Satu zero hijau bikin 50:50 cuma kelihatan manis', short: '<strong>Singkatnya:</strong> satu angka di roulette Eropa punya peluang 1 dari 37. Merah atau hitam cuma 18 dari 37 alias 48,65%, bukan 50%. Roda Amerika menambah 00 sehingga jadi 1 dari 38 dan 47,37%. Payout-nya nggak ikut naik. Selisih itulah sumber house edge.',
    intro: 'Waktu pertama kali saya menjalankan seri panjang di simulator, yang bikin kaget bukan hasil minusnya. Potongan pendeknya sering kelihatan seperti punya pola: merah lagi gacor, lalu hitam balas, saldo naik-turun seolah roda sedang kasih kode. Begitu sampelnya dipanjangkan, dramanya luntur dan matematika nongol. Roda nggak punya ingatan dan jelas nggak berutang warna ke kita.',
    wheelTitle: 'Eropa vs Amerika: beda satu kantong, efeknya lumayan pedas', wheel: 'Roda Eropa punya 37 kantong: 1–36 plus satu zero. Roda Amerika punya 38 karena ada 00. Tambahan kecil itu hampir menggandakan house edge standar dari sekitar 2,70% menjadi 5,26%. Aturan Prancis <em>La Partage</em> atau <em>En Prison</em> bisa menurunkannya menjadi 1,35% untuk taruhan 1:1 saat zero keluar.',
    tableTitle: 'Tabel peluang dan payout roulette', tableIntro: 'Ini angka mentahnya, tanpa mitos “nomor panas”. Payout 35:1 berarti untung 35 unit plus modal taruhan kembali. Pada taruhan standar di roda yang sama, house edge tetap; yang berubah adalah frekuensi kena dan seberapa liar swing-nya.',
    headers: ['Taruhan', 'Angka', 'Payout', 'Eropa', 'Amerika'], bets: [['Satu angka', '1', '35:1', '2,70%', '2,63%'], ['Split', '2', '17:1', '5,41%', '5,26%'], ['Street', '3', '11:1', '8,11%', '7,89%'], ['Corner', '4', '8:1', '10,81%', '10,53%'], ['Six line', '6', '5:1', '16,22%', '15,79%'], ['Lusin / kolom', '12', '2:1', '32,43%', '31,58%'], ['Merah / hitam', '18', '1:1', '48,65%', '47,37%']],
    formulaTitle: 'Asal angka 2,70%', formula: 'Pasang 1 unit di merah pada roda Eropa. Dalam 18 dari 37 hasil kita untung +1; dalam 19 sisanya rugi 1. Nilai harapannya <code>(18/37 × 1) + (19/37 × −1) = −1/37 ≈ −2,70%</code>. Bukan berarti tiap 100 spin pasti minus tepat 2,7 unit. Itu rata-rata jangka panjang; sesi pendek bisa melipir ke mana-mana.',
    typeTitle: 'Payout gede bukan berarti peluang lebih enak', type: 'Angka 35:1 memang bikin mata melek, tetapi satu angka cuma kena 2,70% di roda Eropa. Merah lebih sering masuk dan cuma bayar 1:1. Rata-rata house edge sama, sensasi naik-turunnya beda. Ini sejalan dengan artikel <a href="article-volatility.html">volatilitas</a>: frekuensi dan nilai bukan hal yang sama.',
    independenceTitle: 'Setelah sepuluh merah, hitam belum tentu “jatahnya”', independence: 'Di sini otak mulai cocoklogi. Lihat streak merah panjang, rasanya hitam wajib menyusul. Pada roda fair, peluang merah berikutnya tetap 18/37. Streak wajar muncul di data acak; itu bukan kode rahasia. Menganggap masa lalu harus dibayar oleh spin berikutnya adalah gambler’s fallacy.',
    martTitle: 'Martingale: cuan receh berkali-kali, sekali zonk langsung pedih', mart: 'Martingale klasik menggandakan taruhan setiap kalah: 1, 2, 4, 8… Begitu menang, seluruh rangkaian kembali dan tersisa untung satu unit. Awalnya kelihatan mulus, makanya orang gampang gas terus. Masalahnya, sistem ini cuma mengubah ukuran risiko—bukan peluang atau nilai harapan.',
    martHeaders: ['Kalah beruntun', 'Taruhan berikut', 'Total risiko jika kalah lagi'], martRows: [['1', '2', '3'], ['3', '8', '15'], ['5', '32', '63'], ['7', '128', '255'], ['10', '1.024', '2.047']],
    martAfter: 'Tujuh kekalahan membuat langkah 128 unit membawa total risiko ke 255. Sepuluh menjadi 2.047. Cepat atau lambat saldo atau batas meja bilang stop. Di simulator polanya kentara: saldo naik dengan anak tangga kecil, lalu satu streak dingin menendang tangganya sampai ambruk. Bukan sulap, cuma eksponen yang galak.',
    labTitle: 'Tes sendiri tanpa uang asli', lab: 'Tabel membantu, tetapi roulette lebih gampang dipahami saat bergerak. Di <a href="simulator-roulette-lab.html">simulator dan kalkulator roulette</a>, kamu bisa ganti roda Eropa/Amerika, pilih taruhan, dan jalankan seri virtual. Coba 20 spin lalu 10.000: seri pendek bikin cerita, seri panjang menunjukkan arah.',
    conclusionTitle: 'Kesimpulan setelah ngulik', conclusion: 'Roulette itu elegan sekaligus usil ke intuisi. Aturannya transparan, hitungannya muat di tisu, tetapi streak pendek tetap bikin kita mencari pola. Intinya: jenis taruhan mengubah ritme dan volatilitas, bukan menghapus house edge. Buat belajar probabilitas, seru banget. Buat cari gaji, siap-siap boncos.',
    faqTitle: 'Pertanyaan umum', faq: [['Berapa peluang menang di merah?', '18/37 atau 48,65% di roda Eropa dan 18/38 atau 47,37% di roda Amerika. Zero dan 00 bukan merah atau hitam.'], ['Roda mana yang lebih baik secara matematis?', 'Eropa lebih baik: house edge standar sekitar 2,70% dibanding 5,26% di Amerika. La Partage bisa menurunkannya ke 1,35% pada taruhan 1:1.'], ['Bisakah zero keluar dua kali?', 'Bisa. Hasil sebelumnya tidak memblokir kantong yang sama. Dua zero Eropa beruntun berpeluang 1/37 × 1/37.'], ['Apakah Martingale bekerja?', 'Sering memberi untung kecil sebelum streak berat, tetapi tidak mengubah nilai harapan negatif. Taruhan cepat mentok saldo atau batas meja.'], ['Apakah riwayat memprediksi warna berikut?', 'Tidak jika roda atau RNG bekerja dengan benar. Riwayat cuma mencatat masa lalu dan tidak mengubah spin independen berikutnya.']],
    disclaimer: '<strong>Penting:</strong> artikel dan simulator ini untuk belajar probabilitas, bukan saran berjudi atau janji menang. Jangan pakai uang kebutuhan dan patuhi batas usia di wilayahmu.', sourcesTitle: 'Sumber dan bacaan lanjut', popular: 'Lanjut ngulik', simulatorCta: 'Buka simulator roulette →'
  },
  uz: {
    dir: 'uz', htmlLang: 'uz', published: 'Nashr etilgan: 6-sentabr, 2026', read: '~11 daqiqa o‘qish', eyebrow: 'Ehtimollik · to‘lov · afsonalarsiz',
    title: 'Ruletka ehtimoli: tikishlar va to‘lovlar jadvali — Gamer Logic Hub', h1: 'Ruletkada yutish ehtimoli: tikishlar, to‘lovlar, zero va Martingeyl tuzog‘i', desc: 'Yevropa va Amerika ruletkasidagi ehtimol va to‘lovlar. Zero house edge’ni qanday yaratishi va Martingeyl nega ishlamasligini biling.',
    kicker: 'Ruletka matematikasi', cardTag: 'Ehtimol · House edge', cardText: 'Tikishlar jadvali, Yevropa va Amerika g‘ildiragi, zero va Martingeylning rostakam tahlili.', readMore: 'Maqolani o‘qish →',
    introTitle: 'Bitta yashil zero chiroyli 50/50 ni buzadi', short: '<strong>Qisqasi:</strong> Yevropa ruletkasida bitta raqam ehtimoli 1/37. Qizil yoki qora esa 18/37 — 48,65%, 50% emas. Amerika g‘ildiragida 00 ham bor, shuning uchun 1/38 va 47,37% qoladi. To‘lov oshmaydi; house edge mana shu farqda yashaydi.',
    intro: 'Simulyatorda uzun seriyani birinchi marta aylantirganimda minusdan ko‘ra boshqa narsa qiziq tuyuldi: qisqa bo‘laklar doim qandaydir naqshga o‘xshardi. Qizil ketma-ket tushadi, keyin qora “javob beradi”, balans sakraydi. Seriyani uzaytirsangiz, drama tinadi va qaysar matematika qoladi. G‘ildirak oldingi spinlarni eslamaydi, bizdan qarzdor ham emas.',
    wheelTitle: 'Yevropa va Amerika g‘ildiragi: bitta katak, katta farq', wheel: 'Yevropa g‘ildiragida 37 katak bor: 1–36 va bitta zero. Amerikada 00 qo‘shilib, 38 ta bo‘ladi. Arzimagan farqdek, ammo standart house edge 2,70% dan 5,26% gacha deyarli ikki baravar oshadi. Fransuzcha <em>La Partage</em> yoki <em>En Prison</em> qoidasi 1:1 tikishlarda zero tushganda ustunlikni 1,35% gacha pasaytirishi mumkin.',
    tableTitle: 'Ehtimollik va to‘lovlar jadvali', tableIntro: 'Quyida “issiq raqamlar”siz sof hisob. 35:1 to‘lov 35 birlik foyda va dastlabki tikishning qaytishini anglatadi. Bir g‘ildirakdagi odatiy tikishlarda house edge bir xil; tushish tezligi va tebranish o‘zgaradi.',
    headers: ['Tikish', 'Raqam', 'To‘lov', 'Yevropa', 'Amerika'], bets: [['Bitta raqam', '1', '35:1', '2,70%', '2,63%'], ['Split', '2', '17:1', '5,41%', '5,26%'], ['Street', '3', '11:1', '8,11%', '7,89%'], ['Corner', '4', '8:1', '10,81%', '10,53%'], ['Olti raqam', '6', '5:1', '16,22%', '15,79%'], ['O‘nlik / ustun', '12', '2:1', '32,43%', '31,58%'], ['Qizil / qora', '18', '1:1', '48,65%', '47,37%']],
    formulaTitle: '2,70% qayerdan chiqadi?', formula: 'Yevropa ruletkasida qizilga 1 birlik qo‘yamiz. 37 natijaning 18 tasida +1 olamiz, qolgan 19 tasida 1 yo‘qotamiz. Kutilayotgan qiymat: <code>(18/37 × 1) + (19/37 × −1) = −1/37 ≈ −2,70%</code>. Bu 100 spinda aniq 2,7 birlik ketadi degani emas. Bu juda katta seriyadagi o‘rtacha; qisqa sessiya istalgan tomonga uchishi mumkin.',
    typeTitle: 'Katta to‘lov — yaxshi ehtimol degani emas', type: '35:1 zo‘r ko‘rinadi, lekin bitta raqam Yevropa g‘ildiragida atigi 2,70% tushadi. Qizil tez-tez chiqadi, ammo 1:1 to‘laydi. O‘rtacha minus bir xil, sayohat boshqa. Bu <a href="article-volatility.html">volatillik</a> maqolasidagi gapning o‘zi: chastota va qiymat — ikki boshqa narsa.',
    independenceTitle: 'O‘nta qizildan keyin qora “navbatda” emas', independence: 'Shu yerda miyamiz serial yozishni boshlaydi. Uzun qizil seriyani ko‘rib, “endi aniq qora” deymiz. Halol g‘ildirakda keyingi qizil hali ham 18/37. Tasodifiy ma’lumotda seriyalar tabiiy paydo bo‘ladi; ular signal emas. O‘tmish kelajakdan qarz undirishiga ishonish — gambler’s fallacy.',
    martTitle: 'Martingeyl: ko‘p mayda yutuq, bitta og‘ir zarba', mart: 'Klassik Martingeyl har mag‘lubiyatdan keyin tikishni ikki baravar qiladi: 1, 2, 4, 8… Yutuq zanjirni yopib, bir birlik foyda qoldiradi. Avvaliga rosa silliq ko‘rinadi, shuning uchun odamni tortadi. Ammo tizim ehtimolni emas, faqat xavf hajmini o‘zgartiradi.',
    martHeaders: ['Ketma-ket yutqazish', 'Keyingi tikish', 'Yana yutqazilsa jami xavf'], martRows: [['1', '2', '3'], ['3', '8', '15'], ['5', '32', '63'], ['7', '128', '255'], ['10', '1 024', '2 047']],
    martAfter: 'Yetti mag‘lubiyatdan keyingi 128 birlik tikish jami xavfni 255 ga olib boradi. O‘ntada 2 047. Oxiri balans yoki stol limiti “bo‘ldi” deydi. Simulyatorda juda ravshan: balans mayda zinapoyada ko‘tariladi, bir sovuq seriya esa zinani ag‘daradi. Sehr emas — fe’li yomon eksponenta.',
    labTitle: 'Hisobni o‘zingiz sinang', lab: 'Jadval foydali, lekin ruletka harakatda yaxshiroq tushuniladi. <a href="simulator-roulette-lab.html">Ruletka simulyatori va kalkulyatorida</a> Yevropa yoki Amerika g‘ildiragini, tikish turini tanlab, pulsiz uzun virtual seriya o‘tkazish mumkin. Avval 20 spin, keyin 10 000: qisqa seriya hikoya qiladi, uzuni tendensiyani ko‘rsatadi.',
    conclusionTitle: 'Tajriba menga nimani ko‘rsatdi', conclusion: 'Ruletka g‘alati darajada nafis. Qoidasi ochiq, hisob salfetkaga sig‘adi, ammo qisqa seriya baribir yashirin naqsh qidirtiradi. Gapning po‘stkallasi: tikish turi hissiyot va volatillikni o‘zgartiradi, house edge’ni emas. Ehtimollik darsi sifatida qiziq. Maosh rejasi sifatida esa — yo‘q, baribir matematika yutadi.',
    faqTitle: 'Ko‘p so‘raladigan savollar', faq: [['Qizilda yutish ehtimoli qancha?', 'Yevropa g‘ildiragida 18/37 yoki 48,65%, Amerikada 18/38 yoki 47,37%. Zero va 00 qizil ham, qora ham emas.'], ['Qaysi ruletka matematik jihatdan yaxshiroq?', 'Yevropa: standart house edge 2,70%, Amerikada 5,26%. La Partage 1:1 tikishlarda uni 1,35% gacha tushirishi mumkin.'], ['Zero ikki marta ketma-ket tushadimi?', 'Ha. Oldingi natija shu katakni to‘sib qo‘ymaydi. Yevropa g‘ildiragida ikki zero ehtimoli 1/37 × 1/37.'], ['Martingeyl ishlaydimi?', 'Og‘ir seriyagacha mayda foyda berishi mumkin, ammo manfiy kutilayotgan qiymatni o‘zgartirmaydi. Tikish tezda balans yoki limitga uriladi.'], ['Tarix keyingi rangni aytadimi?', 'Yo‘q, agar g‘ildirak yoki RNG to‘g‘ri ishlasa. Tarix o‘tmishni ko‘rsatadi, keyingi mustaqil spinga ta’sir qilmaydi.']],
    disclaimer: '<strong>Muhim:</strong> maqola va simulyator ehtimollikni o‘rganish uchun. Bu o‘yin maslahati yoki yutuq va’dasi emas. Kerakli pulni xavfga qo‘ymang va mamlakatingiz yosh chekloviga rioya qiling.', sourcesTitle: 'Manbalar va qo‘shimcha o‘qish', popular: 'Tahlilni davom ettirish', simulatorCta: 'Ruletka simulyatorini ochish →'
  },
  tg: {
    dir: 'tg', htmlLang: 'tg', published: 'Нашр шуд: 6 сентябри 2026', read: '~11 дақиқа барои хондан', eyebrow: 'Эҳтимолият · пардохт · бе афсона',
    title: 'Эҳтимолияти рулетка: шартҳо ва пардохтҳо — Gamer Logic Hub', h1: 'Эҳтимолияти бурд дар рулетка: шартҳо, пардохт, зеро ва доми Мартингейл', desc: 'Ҷадвали эҳтимолият ва пардохти рулеткаи аврупоӣ ва амрикоӣ. Нақши зеро, бартарии хона ва мушкили Мартингейл.',
    kicker: 'Математикаи рулетка', cardTag: 'Эҳтимол · House edge', cardText: 'Ҷадвали шартҳо, чархи аврупоӣ ва амрикоӣ, зеро ва таҳлили ростини Мартингейл.', readMore: 'Мақоларо хондан →',
    introTitle: 'Як зерои сабз 50/50-и зеборо вайрон мекунад', short: '<strong>Гапи кӯтоҳ:</strong> дар рулеткаи аврупоӣ эҳтимоли як рақам 1 аз 37 аст. Сурх ё сиёҳ 18 аз 37, яъне 48,65%, на 50%. Дар чархи амрикоӣ 00 ҳам ҳаст: 1 аз 38 ва 47,37%. Пардохт зиёд намешавад — бартарии хона дар ҳамин фосила аст.',
    intro: 'Вақте силсилаи дарозро дар симулятор бори аввал гузарондам, на худи бохт, балки намуди қисмҳои кӯтоҳ аҷиб буд. Сурх пай дар пай меомад, сиёҳ гӯё «ҷавоб» медод, баланс меҷаҳид. Силсиларо дароз кунед — драма хомӯш шуда, математикаи якрав мемонад. Чарх спини гузаштаро ёд надорад ва аз мо қарздор нест.',
    wheelTitle: 'Чархи аврупоӣ ва амрикоӣ: як хонача, фарқи калон', wheel: 'Чархи аврупоӣ 37 хонача дорад: 1–36 ва як зеро. Дар амрикоӣ 00 илова шуда, 38 хонача мешавад. Фарқ хурд менамояд, вале house edge аз 2,70% то 5,26% қариб ду баробар меафзояд. Қоидаҳои фаронсавии <em>La Partage</em> ё <em>En Prison</em> метавонанд онро барои шартҳои 1:1 то 1,35% паст кунанд.',
    tableTitle: 'Ҷадвали эҳтимолият ва пардохт', tableIntro: 'Ин ҷо ҳисоби холис аст, бе гапи «рақами гарм». Пардохти 35:1 яъне 35 воҳид фоида ва баргаштани шарти аввал. Дар як навъи чарх house edge-и шартҳои одӣ яксон аст; басомад ва ларзиши натиҷа дигар мешавад.',
    headers: ['Шарт', 'Рақам', 'Пардохт', 'Аврупоӣ', 'Амрикоӣ'], bets: [['Як рақам', '1', '35:1', '2,70%', '2,63%'], ['Split', '2', '17:1', '5,41%', '5,26%'], ['Street', '3', '11:1', '8,11%', '7,89%'], ['Corner', '4', '8:1', '10,81%', '10,53%'], ['Шаш рақам', '6', '5:1', '16,22%', '15,79%'], ['Даҳгона / сутун', '12', '2:1', '32,43%', '31,58%'], ['Сурх / сиёҳ', '18', '1:1', '48,65%', '47,37%']],
    formulaTitle: '2,70% аз куҷо меояд?', formula: 'Ба сурх дар рулеткаи аврупоӣ 1 воҳид мегузорем. Дар 18 натиҷа аз 37 +1 мегирем, дар 19 натиҷаи дигар 1-ро мебозем. Интизории математикӣ: <code>(18/37 × 1) + (19/37 × −1) = −1/37 ≈ −2,70%</code>. Ин маънои онро надорад, ки ҳар 100 спин аниқ 2,7 воҳид мебозад. Ин миёнаи масофаи калон аст; сессияи кӯтоҳ ба ҳар тараф рафта метавонад.',
    typeTitle: 'Пардохти калон эҳтимоли беҳтар нест', type: '35:1 хушсадо аст, аммо як рақам танҳо дар 2,70%-и спинҳои аврупоӣ меафтад. Сурх бештар меояд, вале 1:1 медиҳад. Минуси миёна яксон, роҳ дигар. Ин ҳамон фарқи мақолаи <a href="article-volatility.html">волатилнокӣ</a> аст: басомад ва арзиш як чиз нестанд.',
    independenceTitle: 'Пас аз даҳ сурх, сиёҳ «навбатдор» намешавад', independence: 'Дар ҳамин ҷо майна қисса месозад. Силсилаи сурхро мебинем ва мегӯем: «Акнун ҳатман сиёҳ». Дар чархи одил эҳтимоли сурхи навбатӣ ҳамоно 18/37 аст. Силсилаҳо дар маълумоти тасодуфӣ табиӣ ҳастанд; онҳо сигнал нестанд. Ин иштибоҳи бозигар аст.',
    martTitle: 'Мартингейл: бурдҳои майда ва як зарбаи гарон', mart: 'Мартингейл пас аз ҳар бохт шартро ду баробар мекунад: 1, 2, 4, 8… Бурд занҷирро мепӯшонад ва як воҳид фоида мемонад. Аввалаш бисёр ширин менамояд, барои ҳамин мекашад. Аммо система эҳтимолиятро не, танҳо ҳаҷми хавфро иваз мекунад.',
    martHeaders: ['Бохти пайдарпай', 'Шарти навбатӣ', 'Хавфи умумӣ пас аз бохти дигар'], martRows: [['1', '2', '3'], ['3', '8', '15'], ['5', '32', '63'], ['7', '128', '255'], ['10', '1 024', '2 047']],
    martAfter: 'Пас аз ҳафт бохт қадами 128 воҳид хавфро ба 255 мерасонад. Дар даҳто — 2 047. Охир баланс ё лимити миз мегӯяд: бас. Дар симулятор равшан аст: баланс бо зинаҳои майда боло меравад, баъд як силсилаи сард тамоми зинаро меафтонад. Сеҳр нест — экспонентаи бадфеъл.',
    labTitle: 'Худатон бе пул санҷед', lab: 'Ҷадвал хуб аст, аммо рулетка дар ҳаракат беҳтар фаҳмида мешавад. Дар <a href="simulator-roulette-lab.html">симулятор ва ҳисобкунаки рулетка</a> метавонед чархи аврупоӣ ё амрикоӣ, навъи шарт ва силсилаи виртуалиро интихоб кунед. Аввал 20 спин, баъд 10 000: кӯтоҳаш қисса мегӯяд, дарозаш тамоюлро нишон медиҳад.',
    conclusionTitle: 'Аз таҷриба чӣ гирифтам', conclusion: 'Рулетка хеле нозук сохта шудааст. Қоида равшан, ҳисоб ба як қоғазча меғунҷад, вале силсилаи кӯтоҳ моро боз ба ҷустуҷӯи аломат мебарад. Хулоса одӣ: навъи шарт ҳиссиёт ва волатилнокиро дигар мекунад, house edge-ро не. Барои дарси эҳтимолият — ҷолиб. Барои маош — не, математика кайфро зуд мешиканад.',
    faqTitle: 'Саволҳои маъмул', faq: [['Эҳтимоли бурд ба сурх чанд аст?', 'Дар чархи аврупоӣ 18/37 ё 48,65%, дар амрикоӣ 18/38 ё 47,37%. Зеро ва 00 на сурханд, на сиёҳ.'], ['Кадом рулетка беҳтар аст?', 'Аз рӯи математика аврупоӣ: house edge 2,70% бар зидди 5,26%. La Partage метавонад онро дар шартҳои 1:1 то 1,35% паст кунад.'], ['Зеро ду бор пай дар пай меафтад?', 'Бале. Натиҷаи пешина хоначаи ҳамонро намебандад. Эҳтимоли ду зерои аврупоӣ 1/37 × 1/37 аст.'], ['Мартингейл кор мекунад?', 'То силсилаи вазнин бурдҳои майда медиҳад, вале интизории манфиро дигар намекунад. Шарт зуд ба баланс ё лимит мерасад.'], ['Таърих ранги навбатиро мегӯяд?', 'Не, агар чарх ё RNG дуруст кор кунад. Таърих танҳо гузаштаро менависад ва ба спини мустақили навбатӣ таъсир надорад.']],
    disclaimer: '<strong>Муҳим:</strong> мақола ва симулятор барои омӯзиши эҳтимолиятанд. Ин маслиҳати бозӣ ё ваъдаи бурд нест. Пули заруриро зери хавф нагузоред ва маҳдудияти синни кишвари худро риоя кунед.', sourcesTitle: 'Манбаъҳо ва хониши иловагӣ', popular: 'Таҳлилро идома диҳед', simulatorCta: 'Симулятори рулеткаро кушодан →'
  }
};

const sourceLinks = [
  ['UK Gambling Commission — RTP and house edge', 'https://www.gamblingcommission.gov.uk/public-and-players/guide/return-to-player-how-much-gaming-machines-payout'],
  ["Wolfram MathWorld — Gambler's Ruin", 'https://mathworld.wolfram.com/GamblersRuin.html'],
  ['Wolfram MathWorld — Martingale', 'https://mathworld.wolfram.com/Martingale.html']
];

const themeCss = `
/* roulette-odds-theme:start */
.roulette-hero{position:relative;min-height:430px;max-width:980px;margin-top:34px;padding:190px 34px 32px;overflow:hidden;border:1px solid rgba(255,215,0,.28);border-radius:24px;background:linear-gradient(180deg,rgba(9,4,23,.02) 15%,rgba(9,4,23,.32) 48%,rgba(9,4,23,.98) 100%),url("REPLACE_MEDIAroulette-odds-hero.webp") center/cover no-repeat;text-align:left;box-shadow:0 24px 60px rgba(0,0,0,.34)}.roulette-hero h1{position:relative;z-index:2;max-width:760px;margin:0 0 12px;font-size:clamp(27px,5vw,44px);text-shadow:0 3px 18px #090417}.roulette-hero .eyebrow,.roulette-hero .article-publish-date,.roulette-hero .meta{position:relative;z-index:2}.roulette-hero .article-publish-date,.roulette-hero .meta{display:inline-block;margin-right:12px;color:#ddd0ef;font-size:12px}.roulette-lede{font-size:18px}.roulette-callout{margin:26px 0;padding:20px 22px;border:1px solid rgba(255,215,0,.26);border-left:4px solid var(--gold);border-radius:14px;background:linear-gradient(135deg,rgba(255,215,0,.08),rgba(168,85,247,.08))}.roulette-formula{display:block;margin:14px 0;padding:16px;overflow-x:auto;border:1px solid rgba(168,85,247,.28);border-radius:12px;background:#0d081b;color:#f7de75;font-size:15px}.roulette-table th:first-child,.roulette-table td:first-child{text-align:left}.roulette-table td:not(:first-child),.roulette-table th:not(:first-child){text-align:center;white-space:nowrap}.roulette-lab-cta{display:block;margin:28px 0;padding:24px;border:1px solid rgba(76,201,142,.35);border-radius:18px;background:linear-gradient(135deg,rgba(76,201,142,.1),rgba(168,85,247,.12));text-align:center}.roulette-lab-cta strong{display:block;margin-bottom:8px;font-size:20px}.roulette-lab-cta a{display:inline-block;margin-top:12px;padding:10px 16px;border-radius:10px;background:var(--gold);color:#0d081b;font-weight:800}.faq-list details{margin:10px 0;border:1px solid var(--line);border-radius:13px;background:var(--bg-panel)}.faq-list summary{padding:15px 18px;cursor:pointer;font-weight:750}.faq-list details p{margin:0;padding:0 18px 17px;color:var(--text-muted)}.roulette-card{position:relative;isolation:isolate;overflow:hidden;padding-top:150px;background:linear-gradient(180deg,rgba(13,8,27,.05) 15%,rgba(13,8,27,.97) 58%),url("REPLACE_MEDIAroulette-odds-hero.webp") center top/100% auto no-repeat,var(--bg-panel)}.roulette-card>*{position:relative;z-index:2}.roulette-card:after{content:"";position:absolute;inset:0;border-radius:inherit;box-shadow:inset 0 0 38px rgba(168,85,247,.16);pointer-events:none}@media(max-width:620px){.roulette-hero{min-height:390px;margin-top:20px;padding:170px 18px 24px;border-radius:0}.roulette-hero h1{font-size:28px}.roulette-lede{font-size:16px}.roulette-table{font-size:12px}.roulette-card{padding-top:135px}}
/* roulette-odds-theme:end */`;

const popularLinks = (t) => `<section class="popular-articles" aria-label="${t.popular}"><h2>${t.popular}</h2><div class="popular-list">
<a class="popular-link" href="article-rtp-slots.html"><span class="popular-icon">◆</span><span>RTP</span><span class="popular-arrow">→</span></a>
<a class="popular-link" href="article-volatility.html"><span class="popular-icon">◆</span><span>Volatility</span><span class="popular-arrow">→</span></a>
<a class="popular-link" href="article-can-you-win.html"><span class="popular-icon">◆</span><span>House edge</span><span class="popular-arrow">→</span></a>
</div></section>`;

const table = (headers, rows, cls = '') => `<div class="table-scroll roulette-table ${cls}"><table><thead><tr>${headers.map(x => `<th>${x}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map((x, i) => `<td>${i === 0 ? `<strong>${x}</strong>` : x}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;

function articleMain(t, prefix) {
  const faq = t.faq.map(([q, a], i) => `<details${i === 0 ? ' open' : ''}><summary>${q}</summary><p>${a}</p></details>`).join('');
  const sources = sourceLinks.map(([label, url]) => `<li><a href="${url}" rel="noopener" target="_blank">${label}</a></li>`).join('');
  const labText = t.lab.replace(/<a[^>]*>(.*?)<\/a>/, '$1');
  return `<main>
<section class="hero roulette-hero"><span class="eyebrow">${t.eyebrow}</span><h1>${t.h1}</h1><time class="article-publish-date" datetime="${dateIso}">${t.published}</time><p class="meta">${t.read}</p></section>
<article class="article narrow">
<h2>${t.introTitle}</h2><p class="lede roulette-lede">${t.short}</p><p>${t.intro}</p>
<h2>${t.wheelTitle}</h2><p>${t.wheel}</p>
<h2>${t.tableTitle}</h2><p>${t.tableIntro}</p>${table(t.headers, t.bets)}
<h2>${t.formulaTitle}</h2><div class="callout"><p>${t.formula}</p></div>
<h2>${t.typeTitle}</h2><p>${t.type}</p>
<h2>${t.independenceTitle}</h2><p>${t.independence}</p>
<h2>${t.martTitle}</h2><p>${t.mart}</p>${table(t.martHeaders, t.martRows, 'martingale-table')}<p>${t.martAfter}</p>
<section class="cta"><h2>${t.labTitle}</h2><p>${labText}</p><a href="simulator-roulette-lab.html">${t.simulatorCta}</a></section>
<h2>${t.conclusionTitle}</h2><p>${t.conclusion}</p>
<section class="faq-list" aria-labelledby="faq-title"><h2 id="faq-title">${t.faqTitle}</h2>${faq}</section>
<div class="disclaimer">${t.disclaimer}</div>${popularLinks(t)}
<div class="sources"><h3>${t.sourcesTitle}</h3><ul>${sources}</ul></div>
</article></main>`;
}

function alternateLinks() {
  return `<link href="https://gamer-logic-hub.com/${slug}" hreflang="ru" rel="alternate"/>
<link href="https://gamer-logic-hub.com/en/${slug}" hreflang="en" rel="alternate"/>
<link href="https://gamer-logic-hub.com/uz/${slug}" hreflang="uz" rel="alternate"/>
<link href="https://gamer-logic-hub.com/tg/${slug}" hreflang="tg" rel="alternate"/>
<link href="https://gamer-logic-hub.com/es/${slug}" hreflang="es-AR" rel="alternate"/>
<link href="https://gamer-logic-hub.com/id/${slug}" hreflang="id" rel="alternate"/>
<link href="https://gamer-logic-hub.com/${slug}" hreflang="x-default" rel="alternate"/>`;
}

function schema(t, canonical) {
  return { '@context': 'https://schema.org', '@graph': [
    { '@type': 'Article', headline: t.h1, description: t.desc, image: { '@type': 'ImageObject', url: imageUrl, width: 1536, height: 1024 }, datePublished: dateIso, dateModified: dateIso, inLanguage: t.htmlLang, mainEntityOfPage: canonical, author: { '@type': 'Organization', name: 'Gamer Logic Hub' }, publisher: { '@type': 'Organization', name: 'Gamer Logic Hub', logo: { '@type': 'ImageObject', url: 'https://gamer-logic-hub.com/apple-touch-icon.png' } } },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Gamer Logic Hub', item: `https://gamer-logic-hub.com/${t.dir ? `${t.dir}/` : ''}index.html` }, { '@type': 'ListItem', position: 2, name: t.kicker, item: canonical }] },
    { '@type': 'FAQPage', mainEntity: t.faq.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })) }
  ] };
}

for (const t of Object.values(locales)) {
  const dir = path.join(root, t.dir);
  const base = path.join(dir, 'article-provably-fair-rng.html');
  const out = path.join(dir, slug);
  const prefix = t.dir ? '../' : '';
  const canonical = `https://gamer-logic-hub.com/${t.dir ? `${t.dir}/` : ''}${slug}`;
  let html = fs.readFileSync(base, 'utf8');
  html = html.replace(/<html lang="[^"]+">/, `<html lang="${t.htmlLang}">`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${t.title}</title>`)
    .replace(/<meta name="description" content="[^"]*"\/?\s*>|<meta content="[^"]*" name="description"\/?\s*>/, `<meta name="description" content="${t.desc}">`)
    .replace(/<link href="[^"]+" rel="canonical"\/>/, `<link href="${canonical}" rel="canonical"/>`)
    .replace(/<link href="[^"]+" hreflang="ru" rel="alternate"\/>[\s\S]*?<link href="[^"]+" hreflang="x-default" rel="alternate"\/>/, alternateLinks())
    .replace(/<meta name="twitter:title" content="[^"]*"\/?\s*>|<meta content="[^"]*" name="twitter:title"\/?\s*>/, `<meta name="twitter:title" content="${t.title}">`)
    .replace(/<meta name="twitter:description" content="[^"]*"\/?\s*>|<meta content="[^"]*" name="twitter:description"\/?\s*>/, `<meta name="twitter:description" content="${t.desc}">`)
    .replace(/<meta name="twitter:image" content="[^"]*"\/?\s*>|<meta content="[^"]*" name="twitter:image"\/?\s*>/, `<meta name="twitter:image" content="${imageUrl}">`)
    .replace(/<meta property="og:title" content="[^"]*"\/?\s*>|<meta content="[^"]*" property="og:title"\/?\s*>/, `<meta property="og:title" content="${t.title}">`)
    .replace(/<meta property="og:description" content="[^"]*"\/?\s*>|<meta content="[^"]*" property="og:description"\/?\s*>/, `<meta property="og:description" content="${t.desc}">`)
    .replace(/<meta property="og:url" content="[^"]*"\/?\s*>|<meta content="[^"]*" property="og:url"\/?\s*>/, `<meta property="og:url" content="${canonical}">`)
    .replace(/<meta property="og:image" content="[^"]*"\/?\s*>|<meta content="[^"]*" property="og:image"\/?\s*>/, `<meta property="og:image" content="${imageUrl}">`)
    .replace(/<meta property="og:image:width" content="[^"]*"\/?\s*>|<meta content="[^"]*" property="og:image:width"\/?\s*>/, '<meta property="og:image:width" content="1536">')
    .replace(/<meta property="og:image:height" content="[^"]*"\/?\s*>|<meta content="[^"]*" property="og:image:height"\/?\s*>/, '<meta property="og:image:height" content="1024">')
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">${JSON.stringify(schema(t, canonical))}</script>`)
    .replace(/(<link rel="stylesheet" href="[^"]+">)/, `$1\n<link rel="stylesheet" href="${prefix}media/roulette-odds-article.css?v=20260906-4">`)
    .replaceAll('article-provably-fair-rng.html', slug)
    .replace(/<main>[\s\S]*?<\/main>/, articleMain(t, prefix));
  fs.writeFileSync(out, html, 'utf8');
}

for (const t of Object.values(locales)) {
  const file = path.join(root, t.dir, 'articles.html');
  const prefix = t.dir ? '../' : '';
  let html = fs.readFileSync(file, 'utf8');
  const card = `<a class="card roulette-card" href="${slug}"><div class="tags"><span class="tag">${t.kicker}</span><span class="tag">${t.cardTag}</span></div><h3>${t.h1}</h3><p>${t.cardText}</p><span class="read-more">${t.readMore}</span><time class="card-date" datetime="${dateIso}">${t.published}</time></a>\n`;
  if (!html.includes(`href="${slug}"`)) html = html.replace('<div class="card-grid">', `<div class="card-grid">${card}`);
  else html = html.replace(/<a class="card roulette-card" href="article-roulette-odds\.html">[\s\S]*?<\/a>\s*/, card);
  const css = themeCss.replaceAll('REPLACE_MEDIA', prefix + 'media/');
  if (html.includes('/* roulette-odds-theme:start */')) html = html.replace(/\/\* roulette-odds-theme:start \*\/[\s\S]*?\/\* roulette-odds-theme:end \*\//, css.trim());
  else html = html.replace('</style>', `${css}\n</style>`);
  html = html.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/, (match, json) => {
    try {
      const data = JSON.parse(json); const items = data?.mainEntity?.itemListElement;
      if (!Array.isArray(items) || items.some(x => String(x.url || '').endsWith(slug))) return match;
      items.unshift({ '@type': 'ListItem', position: 1, url: `https://gamer-logic-hub.com/${t.dir ? `${t.dir}/` : ''}${slug}`, name: t.h1 });
      items.forEach((x, i) => { x.position = i + 1; });
      return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
    } catch { return match; }
  });
  fs.writeFileSync(file, html, 'utf8');
}

const sitemapPath = path.join(root, 'sitemap.xml');
let sitemap = fs.readFileSync(sitemapPath, 'utf8');
sitemap = sitemap.replace(new RegExp(`\\s*<url><loc>https:\\/\\/gamer-logic-hub\\.com\\/(?:en\\/|es\\/|id\\/|uz\\/|tg\\/)?${slug.replaceAll('.', '\\.') }<\\/loc>[\\s\\S]*?<\\/url>`, 'g'), '');
const alt = alternateLinks().replaceAll('<link href=', '<xhtml:link href=').replaceAll(' rel="alternate"/>', ' rel="alternate"/>').replaceAll('\n', '');
const entries = Object.values(locales).map(t => `  <url><loc>https://gamer-logic-hub.com/${t.dir ? `${t.dir}/` : ''}${slug}</loc>${alt}<lastmod>${dateIso}</lastmod></url>`).join('\n');
sitemap = sitemap.replace('</urlset>', `${entries}\n</urlset>`);
fs.writeFileSync(sitemapPath, sitemap, 'utf8');
