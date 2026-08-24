/* =========================================================
   POST /api/create-order
   Creates a Razorpay order. The amount is computed here from
   the server's own price list — the browser only ever says
   *which* items and how many, never what they cost.
   ========================================================= */
'use strict';

var PRICES = require('./_prices');

var MAX_QTY = 10;          // per line
var MAX_LINES = 20;        // per order

function bad(res, code, msg) {
  res.status(code).json({ error: msg });
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return bad(res, 405, 'POST only');

  var keyId = process.env.RAZORPAY_KEY_ID;
  var keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    return bad(res, 503,
      'Payments are not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in the Vercel project.');
  }

  var body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { return bad(res, 400, 'Bad JSON'); }
  }
  var items = body && body.items;
  if (!Array.isArray(items) || !items.length) return bad(res, 400, 'Cart is empty');
  if (items.length > MAX_LINES) return bad(res, 400, 'Too many lines');

  /* ---- price the order from PRICES, rejecting anything that does not check out ---- */
  var amount = 0;
  var lines = [];
  for (var i = 0; i < items.length; i++) {
    var it = items[i] || {};
    var p = PRICES[it.id];
    if (!p) return bad(res, 400, 'Unknown product: ' + it.id);
    if (!p.available) return bad(res, 409, p.title + ' is sold out');

    var qty = parseInt(it.qty, 10);
    if (!(qty >= 1 && qty <= MAX_QTY)) return bad(res, 400, 'Bad quantity for ' + p.title);

    // a variant is required whenever the product has more than one
    var v = null;
    if (p.sizes && p.sizes.length) {
      v = p.sizes.filter(function (s) { return s.id === String(it.variantId); })[0];
      if (!v) return bad(res, 400, 'Pick a size for ' + p.title);
      if (!v.available) return bad(res, 409, p.title + ' (' + v.label + ') is sold out');
    }

    var unit = (v && v.price) || p.price;   // server price, not the client's
    amount += unit * qty;
    lines.push(p.title + (v && !/default/i.test(v.label) ? ' / ' + v.label : '') + ' x ' + qty);
  }

  if (amount <= 0) return bad(res, 400, 'Nothing to charge');

  /* ---- create the order on Razorpay ---- */
  var auth = Buffer.from(keyId + ':' + keySecret).toString('base64');
  var receipt = 'um_' + Date.now().toString(36);

  try {
    var r = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + auth,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100),   // paise
        currency: 'INR',
        receipt: receipt,
        notes: { items: lines.join(', ').slice(0, 480) }
      })
    });

    var data = await r.json();
    if (!r.ok) {
      var m = (data && data.error && data.error.description) || 'Razorpay rejected the order';
      return bad(res, 502, m);
    }

    // key_id is public — the browser needs it to open checkout. The secret never leaves here.
    return res.status(200).json({
      orderId: data.id,
      amount: data.amount,
      currency: data.currency,
      keyId: keyId,
      receipt: receipt
    });
  } catch (e) {
    return bad(res, 502, 'Could not reach Razorpay');
  }
};
