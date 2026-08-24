/* =========================================================
   URBAN MONKEY — shared site core
   chrome · catalog · cart · checkout · motion
   ========================================================= */
(function (w, d) {
  'use strict';

  /* ---------------- brand + links (real profiles) ---------------- */
  var LINKS = {
    instagram: 'https://www.instagram.com/urbanmonkeyindia/',
    youtube: 'https://www.youtube.com/@urbanmonkeyIND',
    whatsapp: 'https://wa.me/918591466259?text=' + encodeURIComponent(
      'Hello, I have a query related to your product. Can you please help me?')
  };

  var LOGO_MARK = 'assets/img/brand/um-mark.png';
  var LOGO_WORD = 'assets/img/brand/um-logo.svg';

  var ICON = {
    instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.22 1 .48 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c0 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2 0-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c0-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2m0-2.2C8.7 0 8.3 0 7 .1 5.7.1 4.8.3 4.1.6c-.8.3-1.4.7-2 1.4-.7.6-1.1 1.2-1.4 2-.3.7-.5 1.6-.6 2.9C0 8.3 0 8.7 0 12s0 3.7.1 5c.1 1.3.3 2.2.6 2.9.3.8.7 1.4 1.4 2 .6.7 1.2 1.1 2 1.4.7.3 1.6.5 2.9.6 1.3.1 1.7.1 5 .1s3.7 0 5-.1c1.3-.1 2.2-.3 2.9-.6.8-.3 1.4-.7 2-1.4.7-.6 1.1-1.2 1.4-2 .3-.7.5-1.6.6-2.9.1-1.3.1-1.7.1-5s0-3.7-.1-5c-.1-1.3-.3-2.2-.6-2.9-.3-.8-.7-1.4-1.4-2-.6-.7-1.2-1.1-2-1.4-.7-.3-1.6-.5-2.9-.6C15.7 0 15.3 0 12 0z"/><path d="M12 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/><circle cx="18.4" cy="5.6" r="1.44"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.5 14.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.1-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.2-.6-.4z"/><path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.6 4.1 1.6 5.9L0 24l6.4-1.7c1.7 1 3.6 1.4 5.6 1.4 6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.4-8.3zM12 21.6c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.7-.2-.4a9.8 9.8 0 0 1-1.5-5.2c0-5.5 4.4-9.9 9.9-9.9 2.6 0 5.1 1 7 2.9a9.8 9.8 0 0 1 2.9 7c-.1 5.5-4.5 9.9-10 9.9z"/></svg>',
    cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M3 4h2.2l2.1 11.4a1.6 1.6 0 0 0 1.6 1.3h8.4a1.6 1.6 0 0 0 1.6-1.3L20.5 8H6"/><circle cx="9.5" cy="20" r="1.2"/><circle cx="17.5" cy="20" r="1.2"/></svg>',
    x: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg>'
  };

  /* ---------------- utils ---------------- */
  function el(tag, cls, html) {
    var n = d.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function money(n) {
    return '₹' + Number(n).toLocaleString('en-IN', { maximumFractionDigits: 0 });
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  var reduced = w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function isMobile() { return w.matchMedia('(max-width: 760px)').matches; }
  // rough "slow connection" probe — used to skip heavy video
  function isSlow() {
    var c = navigator.connection;
    if (!c) return false;
    if (c.saveData) return true;
    return /(^|-)2g$/.test(c.effectiveType || '');
  }

  function socialHTML(cls) {
    return '<div class="' + cls + '">' +
      '<a href="' + LINKS.instagram + '" target="_blank" rel="noopener" aria-label="Urban Monkey on Instagram">' + ICON.instagram + '</a>' +
      '<a href="' + LINKS.youtube + '" target="_blank" rel="noopener" aria-label="Urban Monkey on YouTube">' + ICON.youtube + '</a>' +
      '<a href="' + LINKS.whatsapp + '" target="_blank" rel="noopener" aria-label="Chat with Urban Monkey on WhatsApp">' + ICON.whatsapp + '</a>' +
      '</div>';
  }

  /* =========================================================
     HEADER / FOOTER
     ========================================================= */
  function mountHeader(active) {
    var h = el('header', 'hdr');
    h.innerHTML =
      '<a class="hdr__brand" href="index.html" data-nav aria-label="Urban Monkey home">' +
        '<img class="hdr__mark" src="' + LOGO_MARK + '" alt="" width="30" height="30">' +
        '<span class="hdr__word"><img src="' + LOGO_WORD + '" alt="Urban Monkey"></span>' +
      '</a>' +
      '<nav class="nav" id="nav">' +
        '<a href="index.html" data-nav data-k="home">Urban Monkey</a>' +
        '<a href="index.html#caps" data-nav data-k="caps">Caps</a>' +
        '<a href="index.html#hoodies" data-nav data-k="hoodies">Hoodies</a>' +
        '<a href="index.html#eyewear" data-nav data-k="eyewear">Eyewear</a>' +
        '<a href="try.html" class="is-key" data-nav data-k="try">Try &amp; Use</a>' +
      '</nav>' +
      '<div class="hdr__side">' +
        socialHTML('social') +
        '<button class="cart-btn" id="cartOpen" aria-label="Open cart">' +
          '<span class="lbl">Cart</span><span class="cart-count" id="cartCount">0</span>' +
        '</button>' +
        '<button class="burger" id="burger" aria-label="Menu" aria-expanded="false"><i></i><i></i></button>' +
      '</div>';
    d.body.insertBefore(h, d.body.firstChild);

    if (active) {
      var a = h.querySelector('[data-k="' + active + '"]');
      if (a) a.classList.add('active');
    }

    // compact on scroll
    var last = -1;
    function onScroll() {
      var y = w.scrollY || w.pageYOffset;
      var c = y > 60;
      if (c !== last) { h.classList.toggle('compact', c); last = c; }
    }
    w.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // mobile menu
    var burger = h.querySelector('#burger');
    burger.addEventListener('click', function () {
      var open = d.body.classList.toggle('menu-open');
      burger.setAttribute('aria-expanded', String(open));
    });
    h.querySelectorAll('#nav a').forEach(function (a) {
      a.addEventListener('click', function () {
        d.body.classList.remove('menu-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
    return h;
  }

  function mountFooter() {
    var f = el('footer', 'ftr');
    f.innerHTML =
      '<div class="ftr__grid">' +
        '<div>' +
          '<div class="ftr__word"><img src="' + LOGO_WORD + '" alt="Urban Monkey"></div>' +
          '<p class="lede" style="font-size:.86rem;max-width:34ch">Headwear, hoodies and eyewear for the street. Made in India, worn everywhere.</p>' +
          socialHTML('ftr__social') +
        '</div>' +
        '<div><h4>Shop</h4><ul>' +
          '<li><a href="index.html#caps" data-nav>Caps</a></li>' +
          '<li><a href="index.html#hoodies" data-nav>Hoodies</a></li>' +
          '<li><a href="index.html#eyewear" data-nav>Eyewear</a></li>' +
          '<li><a href="try.html" data-nav>Try &amp; Use</a></li>' +
        '</ul></div>' +
        '<div><h4>Company</h4><ul>' +
          '<li><a href="#" data-static>About</a></li>' +
          '<li><a href="' + LINKS.whatsapp + '" target="_blank" rel="noopener">Contact</a></li>' +
          '<li><a href="#" data-static>Shipping &amp; Returns</a></li>' +
          '<li><a href="#" data-static>Privacy Policy</a></li>' +
        '</ul></div>' +
        '<div><h4>Reach us</h4><ul>' +
          '<li><a href="' + LINKS.whatsapp + '" target="_blank" rel="noopener">WhatsApp&nbsp;→ +91 85914 66259</a></li>' +
          '<li><a href="' + LINKS.instagram + '" target="_blank" rel="noopener">@urbanmonkeyindia</a></li>' +
          '<li><a href="' + LINKS.youtube + '" target="_blank" rel="noopener">YouTube&nbsp;→ @urbanmonkeyIND</a></li>' +
        '</ul></div>' +
      '</div>' +
      '<div class="ftr__base"><span>© ' + new Date().getFullYear() + ' Urban Monkey®</span>' +
      '<span>Prices in INR · Secure payments by Razorpay</span></div>';
    d.body.appendChild(f);
  }

  /* =========================================================
     CART
     ========================================================= */
  var CART_KEY = 'um_cart_v1';
  var cart = [];
  try { cart = JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { cart = []; }

  function cartSave() {
    try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) {}
  }
  function cartCount() {
    return cart.reduce(function (s, i) { return s + i.qty; }, 0);
  }
  function cartTotal() {
    return cart.reduce(function (s, i) { return s + i.qty * i.price; }, 0);
  }
  function cartAdd(item) {
    var k = cart.filter(function (i) { return i.id === item.id && i.variant === item.variant; })[0];
    if (k) k.qty += item.qty || 1;
    else cart.push({
      id: item.id, variant: item.variant, variantId: item.variantId,
      title: item.title, price: item.price, img: item.img, qty: item.qty || 1
    });
    cartSave(); renderCart(true); toast('Added to cart');
  }
  function cartSet(idx, qty) {
    if (qty <= 0) cart.splice(idx, 1);
    else cart[idx].qty = qty;
    cartSave(); renderCart();
  }

  var drawer, scrim, countEl;

  function mountCart() {
    scrim = el('div', 'scrim');
    drawer = el('aside', 'drawer');
    drawer.setAttribute('aria-label', 'Cart');
    drawer.innerHTML =
      '<div class="drawer__hd"><h3>Cart</h3><button class="x" id="cartClose" aria-label="Close cart">' + ICON.x + '</button></div>' +
      '<div class="drawer__body" id="cartBody"></div>' +
      '<div class="drawer__ft" id="cartFoot"></div>';
    d.body.appendChild(scrim);
    d.body.appendChild(drawer);

    scrim.addEventListener('click', closeCart);
    drawer.querySelector('#cartClose').addEventListener('click', closeCart);
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeCart(); });

    var open = d.getElementById('cartOpen');
    if (open) open.addEventListener('click', openCart);
    countEl = d.getElementById('cartCount');
    renderCart();
  }
  function openCart() {
    scrim.classList.add('on'); drawer.classList.add('on');
    d.body.classList.add('no-scroll');
  }
  function closeCart() {
    scrim.classList.remove('on'); drawer.classList.remove('on');
    d.body.classList.remove('no-scroll');
  }

  function renderCart(bump) {
    var n = cartCount();
    if (countEl) {
      countEl.textContent = n;
      countEl.classList.toggle('on', n > 0);
      if (bump) {
        countEl.classList.remove('bump');
        void countEl.offsetWidth;
        countEl.classList.add('bump');
      }
    }
    var body = d.getElementById('cartBody');
    var foot = d.getElementById('cartFoot');
    if (!body) return;

    if (!cart.length) {
      body.innerHTML = '<div class="drawer__empty">Your cart is empty</div>';
      foot.innerHTML = '<a class="btn btn--ghost btn--block" href="index.html#caps" data-nav>Start shopping</a>';
      return;
    }

    body.innerHTML = cart.map(function (i, idx) {
      return '<div class="li">' +
        '<img class="li__img" src="' + esc(i.img) + '" alt="' + esc(i.title) + '" loading="lazy">' +
        '<div>' +
          '<div class="li__n">' + esc(i.title) + '</div>' +
          '<div class="li__v">' + esc(i.variant) + '</div>' +
          '<div class="li__row">' +
            '<div class="qty">' +
              '<button data-act="dec" data-i="' + idx + '" aria-label="Decrease quantity">−</button>' +
              '<span>' + i.qty + '</span>' +
              '<button data-act="inc" data-i="' + idx + '" aria-label="Increase quantity">+</button>' +
            '</div>' +
            '<div class="li__p">' + money(i.price * i.qty) + '</div>' +
          '</div>' +
          '<button class="li__x" data-act="rm" data-i="' + idx + '">Remove</button>' +
        '</div>' +
      '</div>';
    }).join('');

    var sub = cartTotal();
    foot.innerHTML =
      '<div class="sum"><span>Subtotal</span><span>' + money(sub) + '</span></div>' +
      '<div class="sum"><span>Shipping</span><span>Calculated at checkout</span></div>' +
      '<div class="sum sum--total"><span>Total</span><span>' + money(sub) + '</span></div>' +
      '<button class="btn btn--solid btn--block" id="checkout">Checkout · ' + money(sub) + '</button>' +
      '<p class="drawer__note">Secure payment via Razorpay — UPI, cards, net banking and wallets.</p>';

    body.querySelectorAll('[data-act]').forEach(function (b) {
      b.addEventListener('click', function () {
        var i = +b.dataset.i, act = b.dataset.act;
        if (act === 'inc') cartSet(i, cart[i].qty + 1);
        else if (act === 'dec') cartSet(i, cart[i].qty - 1);
        else cartSet(i, 0);
      });
    });
    var co = foot.querySelector('#checkout');
    if (co) co.addEventListener('click', checkout);
  }

  /* ---------------- toast ---------------- */
  var toastEl, toastT;
  function toast(msg) {
    if (!toastEl) { toastEl = el('div', 'toast'); d.body.appendChild(toastEl); }
    toastEl.textContent = msg;
    toastEl.classList.add('on');
    clearTimeout(toastT);
    toastT = setTimeout(function () { toastEl.classList.remove('on'); }, 2200);
  }

  /* =========================================================
     CHECKOUT — Razorpay (order created and verified server-side)
     ========================================================= */
  // Used only when /api is not reachable (e.g. opening the site off a plain
  // static server with no functions). Real orders are priced and verified
  // server-side in /api/create-order and /api/verify-payment.
  var RZP_TEST_KEY = 'rzp_test_1DP5mmOlF5G5ag'; // Razorpay's public demo key

  function loadRzp() {
    return new Promise(function (res, rej) {
      if (w.Razorpay) return res(true);
      var s = d.createElement('script');
      s.src = 'https://checkout.razorpay.com/v1/checkout.js';
      s.onload = function () { res(true); };
      s.onerror = function () { rej(new Error('offline')); };
      d.head.appendChild(s);
    });
  }

  /* Ask the server to price the cart and open a real Razorpay order.
     Resolves to null when there is no /api behind the site, so a plain
     static host still demos checkout instead of dead-ending. */
  function createOrder() {
    return fetch('api/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: cart.map(function (i) {
          return { id: i.id, variantId: i.variantId, qty: i.qty };
        })
      })
    }).then(function (r) {
      if (r.status === 404 || r.status === 503) return null;   // no functions deployed
      return r.json().then(function (data) {
        if (!r.ok) throw new Error(data && data.error ? data.error : 'Order failed');
        return data;
      });
    }).catch(function (e) {
      if (e instanceof TypeError) return null;                 // network / no endpoint
      throw e;
    });
  }

  function checkout() {
    if (!cart.length) return;
    var btn = d.getElementById('checkout');
    if (btn) { btn.disabled = true; btn.textContent = 'Opening Razorpay…'; }

    function fail(msg) {
      if (btn) { btn.disabled = false; renderCart(); }
      toast(msg);
    }

    Promise.all([createOrder(), loadRzp()]).then(function (out) {
      var order = out[0];
      var live = !!order;

      var opts = {
        key: live ? order.keyId : RZP_TEST_KEY,
        amount: live ? order.amount : Math.round(cartTotal() * 100),
        currency: 'INR',
        name: 'Urban Monkey®',
        description: cartCount() + ' item' + (cartCount() > 1 ? 's' : ''),
        image: LOGO_MARK,
        theme: { color: '#7fb0d4' },
        notes: {
          items: cart.map(function (i) { return i.title + ' × ' + i.qty; }).join(', ')
        },
        modal: {
          ondismiss: function () {
            if (btn) { btn.disabled = false; renderCart(); }
            toast('Checkout cancelled');
          }
        },
        handler: function (resp) {
          if (!live) return orderDone(resp.razorpay_payment_id);
          // never trust the browser's word that payment succeeded
          if (btn) btn.textContent = 'Verifying…';
          fetch('api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(resp)
          }).then(function (r) { return r.json(); })
            .then(function (v) {
              if (v && v.ok) orderDone(resp.razorpay_payment_id);
              else fail('Payment could not be verified — contact us before reordering');
            })
            .catch(function () {
              fail('Payment taken but verification failed — contact us with ID ' + resp.razorpay_payment_id);
            });
        }
      };
      if (live) opts.order_id = order.orderId;

      var rzp = new w.Razorpay(opts);
      rzp.on('payment.failed', function (r) {
        fail('Payment failed — ' + ((r.error && r.error.description) || 'try again'));
      });
      rzp.open();
    }).catch(function (e) {
      fail(e && e.message ? e.message : 'Could not reach Razorpay — check connection');
    });
  }

  function orderDone(paymentId) {
    var n = cartCount(), amt = cartTotal();
    cart = []; cartSave(); renderCart();
    var body = d.getElementById('cartBody');
    var foot = d.getElementById('cartFoot');
    if (body) {
      body.innerHTML =
        '<div style="padding:56px 4px;text-align:center">' +
          '<div class="eyebrow" style="margin-bottom:18px">Order confirmed</div>' +
          '<h3 class="h-mid" style="margin-bottom:14px">Thank you</h3>' +
          '<p class="lede" style="font-size:.86rem;margin:0 auto">' + n + ' item' + (n > 1 ? 's' : '') +
          ' · ' + money(amt) + '</p>' +
          '<p class="mono" style="font-size:.6rem;color:var(--paper-faint);margin-top:20px;word-break:break-all">' +
          esc(paymentId) + '</p>' +
        '</div>';
    }
    if (foot) foot.innerHTML = '<button class="btn btn--ghost btn--block" id="coDone">Keep shopping</button>';
    var b = d.getElementById('coDone');
    if (b) b.addEventListener('click', closeCart);
    openCart();
  }

  /* =========================================================
     MOTION — reveals + parallax
     ========================================================= */
  function initReveal(root) {
    var nodes = (root || d).querySelectorAll('.rv, .rv-mask, .rv-img');
    if (reduced || !('IntersectionObserver' in w)) {
      nodes.forEach(function (n) { n.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    nodes.forEach(function (n) { io.observe(n); });
  }

  // GPU-friendly parallax: transform only, batched in one rAF loop
  var pxItems = [], pxTicking = false;
  function initParallax(root) {
    if (reduced || isMobile()) return;
    (root || d).querySelectorAll('[data-px]').forEach(function (n) {
      pxItems.push({ n: n, s: parseFloat(n.dataset.px) || 0.12 });
    });
    if (!pxItems.length) return;
    w.addEventListener('scroll', pxRequest, { passive: true });
    w.addEventListener('resize', pxRequest);
    pxRequest();
  }
  function pxRequest() {
    if (pxTicking) return;
    pxTicking = true;
    requestAnimationFrame(pxRun);
  }
  function pxRun() {
    pxTicking = false;
    var vh = w.innerHeight;
    for (var i = 0; i < pxItems.length; i++) {
      var it = pxItems[i], r = it.n.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) continue;
      var mid = r.top + r.height / 2;
      var off = (mid - vh / 2) / vh;          // -1 … 1
      it.n.style.transform = 'translate3d(0,' + (off * it.s * 100).toFixed(2) + 'px,0)';
    }
  }

  /* ---------------- lazy autoplay video ---------------- */
  // Only play what's on screen; skip entirely on slow links (poster/image fallback).
  function initVideo(root) {
    var vids = (root || d).querySelectorAll('video[data-lazy]');
    var slow = isSlow();
    vids.forEach(function (v) {
      v.muted = true; v.playsInline = true; v.setAttribute('playsinline', '');
      v.loop = v.hasAttribute('data-loop');
      if (slow) { v.removeAttribute('data-lazy'); v.classList.add('is-off'); return; }
      if (!('IntersectionObserver' in w)) { swap(v); return; }
    });
    if (slow || !('IntersectionObserver' in w)) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting) { swap(v); v.play().catch(function () {}); }
        else if (!v.paused) v.pause();
      });
    }, { rootMargin: '250px 0px', threshold: 0.01 });
    vids.forEach(function (v) { io.observe(v); });

    function swap(v) {
      if (v.dataset.loaded) return;
      v.dataset.loaded = '1';
      var src = v.dataset.lazy;
      if (src) {
        var s = d.createElement('source');
        s.src = src; s.type = 'video/mp4';
        v.appendChild(s);
        v.load();
      }
    }
  }

  /* =========================================================
     PAGE TRANSITION — brief logo reveal between pages
     ========================================================= */
  var curtain;
  function mountCurtain() {
    curtain = el('div');
    curtain.id = 'curtain';
    curtain.innerHTML = '<img src="' + LOGO_MARK + '" alt="">';
    d.body.appendChild(curtain);

    // intercept internal navigation
    d.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('a[data-nav]') : null;
      if (!a) return;
      var href = a.getAttribute('href');
      if (!href || href.charAt(0) === '#') return;
      if (a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey) return;

      // same-page anchor on this page → let it scroll
      var hash = href.indexOf('#');
      if (hash > -1) {
        var path = href.slice(0, hash);
        var here = location.pathname.split('/').pop() || 'index.html';
        if (path === here || path === '') return;
      }
      e.preventDefault();
      goTo(href);
    });

    // handle bfcache / back button so the curtain never sticks
    w.addEventListener('pageshow', function (ev) {
      if (ev.persisted) curtain.classList.remove('on');
    });
  }
  function goTo(href) {
    if (reduced) { location.href = href; return; }
    curtain.classList.add('on');
    setTimeout(function () { location.href = href; }, 620);
  }

  /* =========================================================
     LOADER SEQUENCE
     ========================================================= */
  function runLoader() {
    var loader = d.getElementById('loader');
    d.body.classList.add('is-loading');

    function finish() {
      d.body.classList.remove('is-loading');
      if (loader) loader.classList.add('done');
      // 2. hero reveals, 3. nav settles in
      setTimeout(function () { d.body.classList.add('hero-in'); }, 60);
      setTimeout(function () { d.body.classList.add('nav-in'); }, 620);
      setTimeout(function () { if (loader && loader.parentNode) loader.parentNode.removeChild(loader); }, 1400);
    }

    var wait = reduced ? 200 : 2050;
    if (d.readyState === 'complete') setTimeout(finish, wait);
    else w.addEventListener('load', function () { setTimeout(finish, wait); });
    // never let a stalled asset trap the page
    setTimeout(finish, wait + 3200);
  }

  /* =========================================================
     CATALOG
     ========================================================= */
  var catalogPromise = null;
  function getCatalog() {
    if (!catalogPromise) {
      // data/catalog.js inlines the catalog so the site also runs straight from file://
      if (w.__UM_CATALOG) {
        catalogPromise = Promise.resolve(w.__UM_CATALOG);
      } else {
        catalogPromise = fetch('data/catalog.json').then(function (r) {
          if (!r.ok) throw new Error('catalog ' + r.status);
          return r.json();
        });
      }
    }
    return catalogPromise;
  }
  function allProducts(cat) {
    return ['caps', 'hoodies', 'eyewear'].reduce(function (a, k) {
      return a.concat((cat[k] || []).map(function (p) { p._cat = k; return p; }));
    }, []);
  }
  function findProduct(cat, id) {
    return allProducts(cat).filter(function (p) { return p.id === id; })[0] || null;
  }

  /* ---------------- product card markup ---------------- */
  function cardHTML(p, eager) {
    var sold = !p.available;
    var off = (p.compareAt && p.compareAt > p.price)
      ? Math.round((1 - p.price / p.compareAt) * 100) : 0;
    var cut = p.cut || {};
    var a = cut.a || p.img.a900;
    var b = cut.b || p.img.b900 || a;
    return '<a class="card rv' + (sold ? ' sold' : '') + '" href="product.html?id=' + encodeURIComponent(p.id) + '" data-nav>' +
      '<div class="card__frame rv-img">' +
        (sold ? '<span class="tag-sold">Sold out</span>' : '') +
        (off && !sold ? '<span class="tag-off">−' + off + '%</span>' : '') +
        '<img class="card__img card__img--a" src="' + esc(a) + '" alt="' + esc(p.title) + '"' +
          (eager ? '' : ' loading="lazy"') + ' decoding="async">' +
        '<img class="card__img card__img--b" src="' + esc(b) + '" alt="" loading="lazy" decoding="async" aria-hidden="true">' +
        '<span class="card__cta"><span>' + (sold ? 'Sold out' : 'View') + '</span><span>' + (sold ? '' : 'Try &amp; Use') + '</span></span>' +
      '</div>' +
      '<div class="card__meta">' +
        '<span class="card__name">' + esc(p.title) + '</span>' +
        '<span class="card__price">' +
          (off ? '<s>' + money(p.compareAt) + '</s>' : '') + money(p.price) +
        '</span>' +
      '</div>' +
      '<div class="card__type">' + esc(p.type) + '</div>' +
    '</a>';
  }

  /* ---------------- boot ---------------- */
  function boot(opts) {
    opts = opts || {};
    mountHeader(opts.active);
    mountCurtain();
    mountCart();
    if (opts.loader !== false) runLoader();
    else { d.body.classList.add('hero-in', 'nav-in'); }
  }

  /* ---------------- expose ---------------- */
  w.UM = {
    LINKS: LINKS, ICON: ICON, LOGO_MARK: LOGO_MARK, LOGO_WORD: LOGO_WORD,
    el: el, money: money, esc: esc, toast: toast,
    reduced: reduced, isMobile: isMobile, isSlow: isSlow,
    boot: boot, mountFooter: mountFooter,
    initReveal: initReveal, initParallax: initParallax, initVideo: initVideo,
    getCatalog: getCatalog, allProducts: allProducts, findProduct: findProduct,
    cardHTML: cardHTML,
    cartAdd: cartAdd, openCart: openCart, closeCart: closeCart,
    checkout: checkout
  };
})(window, document);
