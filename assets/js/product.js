/* =========================================================
   Product detail — image first, real Add to Cart
   ========================================================= */
(function (w, d) {
  'use strict';
  var UM = w.UM;

  var CAT_LABEL = { caps: 'Caps', hoodies: 'Hoodies', eyewear: 'Eyewear' };

  function qs(k) {
    return new URLSearchParams(location.search).get(k);
  }

  UM.boot({ active: 'home', loader: false });

  var id = qs('id');
  var host = d.getElementById('pdp');

  /* Point the page's share card at this product. Crawlers that do not run
     JavaScript still get the generic card baked into product.html. */
  function setShareCard(p) {
    var origin = location.origin;
    var img = (p.img && (p.img.m1600 || p.img.a1600 || p.img.a900)) || '';
    var meta = {
      'og:title': p.title + ' — Urban Monkey®',
      'og:description': (p.description || '').slice(0, 160) || 'Urban Monkey — worn on the street.',
      'og:url': location.href,
      'twitter:title': p.title + ' — Urban Monkey®'
    };
    if (img) {
      meta['og:image'] = origin + '/' + img;
      meta['twitter:image'] = origin + '/' + img;
    }
    Object.keys(meta).forEach(function (k) {
      var sel = /^og:/.test(k) ? 'meta[property="' + k + '"]' : 'meta[name="' + k + '"]';
      var el = d.querySelector(sel);
      if (!el) {
        el = d.createElement('meta');
        el.setAttribute(/^og:/.test(k) ? 'property' : 'name', k);
        d.head.appendChild(el);
      }
      el.setAttribute('content', meta[k]);
    });
    var can = d.querySelector('link[rel=canonical]');
    if (!can) { can = d.createElement('link'); can.rel = 'canonical'; d.head.appendChild(can); }
    can.href = origin + '/product.html?id=' + encodeURIComponent(p.id);
  }

  UM.getCatalog().then(function (cat) {
    var p = UM.findProduct(cat, id);
    if (!p) return notFound();

    d.title = p.title + ' — Urban Monkey®';
    setShareCard(p);

    var cut = p.cut || {};
    var hero = cut.lg || cut.a || p.img.a1600 || p.img.a900;
    var alt = cut.b || p.img.b900;
    var model = p.img.m1600;

    var off = (p.compareAt && p.compareAt > p.price)
      ? Math.round((1 - p.price / p.compareAt) * 100) : 0;

    // one-size products come through as a single "Default Title" variant
    var sizes = (p.sizes || []).map(function (s) {
      return { id: s.id, label: /default/i.test(s.label) ? 'One size' : s.label, available: s.available };
    });
    var canTryOn = p._cat === 'caps' || p._cat === 'hoodies' || p._cat === 'eyewear';

    host.innerHTML =
      '<section class="pdp">' +
        '<a class="pdp__back" href="index.html#' + p._cat + '" data-nav>← ' + (CAT_LABEL[p._cat] || 'Shop') + '</a>' +
        '<div class="pdp__grid">' +

          '<div class="pdp__media">' +
            '<div class="pdp__hero rv-img in">' +
              '<img src="' + UM.esc(hero) + '" alt="' + UM.esc(p.title) + '" id="pdpHero" decoding="async">' +
            '</div>' +
            (alt && alt !== hero
              ? '<div class="pdp__alt rv-img"><img src="' + UM.esc(alt) + '" alt="" loading="lazy" decoding="async"></div>'
              : '') +
          '</div>' +

          '<aside class="pdp__info">' +
            '<p class="eyebrow">' + UM.esc(p.type) + '</p>' +
            '<h1 class="pdp__title">' + UM.esc(p.title) + '</h1>' +
            '<div class="pdp__price">' +
              (off ? '<s>' + UM.money(p.compareAt) + '</s>' : '') +
              '<b>' + UM.money(p.price) + '</b>' +
              (off ? '<em>' + off + '% off</em>' : '') +
            '</div>' +
            (p.available ? '' : '<p class="pdp__oos">Sold out — this piece has run out.</p>') +
            '<p class="pdp__desc">' + UM.esc(p.description || '') + '</p>' +

            '<div class="pdp__opts">' +
              '<div class="pdp__optHd"><span>' + (sizes.length > 1 ? 'Size' : 'Fit') + '</span>' +
                '<span id="sizeNote"></span></div>' +
              '<div class="sizes" id="sizes">' +
                sizes.map(function (s, i) {
                  return '<button class="size' + (s.available ? '' : ' out') + '" data-i="' + i + '"' +
                    (s.available ? '' : ' disabled aria-disabled="true"') + '>' + UM.esc(s.label) + '</button>';
                }).join('') +
              '</div>' +
            '</div>' +

            '<div class="pdp__buy">' +
              '<button class="btn btn--solid btn--block" id="addBtn"' + (p.available ? '' : ' disabled') + '>' +
                (p.available ? 'Add to cart' : 'Sold out') + '</button>' +
              (canTryOn
                ? '<a class="btn btn--ghost btn--block" href="try.html?id=' + encodeURIComponent(p.id) + '" data-nav>Try &amp; Use — see it on you</a>'
                : '') +
            '</div>' +

            '<ul class="pdp__facts">' +
              '<li><span>Ships</span><b>2–5 working days</b></li>' +
              '<li><span>Returns</span><b>7 days, unworn</b></li>' +
              '<li><span>Payment</span><b>Razorpay · test mode</b></li>' +
            '</ul>' +
          '</aside>' +
        '</div>' +

        (model
          ? '<div class="pdp__editorial rv-img">' +
              '<img src="' + UM.esc(model) + '" alt="' + UM.esc(p.title) + ' on model" loading="lazy" decoding="async">' +
            '</div>'
          : '') +

        '<div class="pdp__more"><div class="wrap">' +
          '<div class="cat__head"><h2 class="h-mid rv-mask"><span>More ' + (CAT_LABEL[p._cat] || '') + '</span></h2></div>' +
          '<div class="pgrid" id="more"></div>' +
        '</div></div>' +
      '</section>';

    /* ---------------- size selection ---------------- */
    var chosen = -1;
    var note = d.getElementById('sizeNote');
    var sizeWrap = d.getElementById('sizes');

    // a single available option is preselected — nothing to choose
    var firstAvail = sizes.findIndex(function (s) { return s.available; });
    if (sizes.length === 1 && firstAvail === 0) select(0);

    sizeWrap.addEventListener('click', function (e) {
      var b = e.target.closest('.size');
      if (!b || b.disabled) return;
      select(+b.dataset.i);
    });
    function select(i) {
      chosen = i;
      sizeWrap.querySelectorAll('.size').forEach(function (b) {
        b.classList.toggle('on', +b.dataset.i === i);
      });
      note.textContent = '';
      note.classList.remove('warn');
    }

    /* ---------------- add to cart ---------------- */
    d.getElementById('addBtn').addEventListener('click', function () {
      if (!p.available) return;
      if (chosen < 0) {
        note.textContent = 'Pick a size';
        note.classList.add('warn');
        sizeWrap.classList.remove('shake'); void sizeWrap.offsetWidth; sizeWrap.classList.add('shake');
        return;
      }
      var s = sizes[chosen];
      UM.cartAdd({
        id: p.id,
        variant: s.label,
        variantId: s.id,
        title: p.title,
        price: p.price,
        img: (p.cut && p.cut.a) || p.img.a900,
        qty: 1
      });
      UM.openCart();
    });

    /* ---------------- more from category ---------------- */
    var more = (cat[p._cat] || []).filter(function (x) { return x.id !== p.id; }).slice(0, 5);
    d.getElementById('more').innerHTML = more.map(function (x, i) {
      return UM.cardHTML(x).replace('class="card rv', 'data-delay="' + (i % 4) + '" class="card rv');
    }).join('');

    UM.mountFooter();
    UM.initReveal();
    UM.initParallax();
  }).catch(function (e) {
    notFound(e.message);
  });

  function notFound(msg) {
    host.innerHTML =
      '<section class="sec" style="min-height:70svh;display:grid;place-items:center;text-align:center">' +
        '<div><p class="eyebrow">404</p><h1 class="h-big">Not in this drop</h1>' +
        '<p class="lede" style="margin:22px auto 30px">' + UM.esc(msg || 'That product could not be found.') + '</p>' +
        '<a class="btn" href="index.html" data-nav>Back to the shop</a></div>' +
      '</section>';
    UM.mountFooter();
    UM.initReveal();
  }
})(window, document);
