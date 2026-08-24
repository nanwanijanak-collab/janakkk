/* =========================================================
   POST /api/verify-payment
   Confirms a payment really came from Razorpay by checking the
   HMAC signature against the key secret. Without this step a
   "success" handler in the browser proves nothing — anyone can
   call it from the console.
   ========================================================= */
'use strict';

var crypto = require('crypto');

function bad(res, code, msg) {
  res.status(code).json({ ok: false, error: msg });
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return bad(res, 405, 'POST only');

  var keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) return bad(res, 503, 'Payments are not configured');

  var body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { return bad(res, 400, 'Bad JSON'); }
  }

  var orderId = body && body.razorpay_order_id;
  var paymentId = body && body.razorpay_payment_id;
  var signature = body && body.razorpay_signature;
  if (!orderId || !paymentId || !signature) return bad(res, 400, 'Missing payment fields');

  var expected = crypto
    .createHmac('sha256', keySecret)
    .update(orderId + '|' + paymentId)
    .digest('hex');

  // constant-time compare so the check cannot be probed byte by byte
  var a = Buffer.from(expected, 'utf8');
  var b = Buffer.from(String(signature), 'utf8');
  var ok = a.length === b.length && crypto.timingSafeEqual(a, b);

  if (!ok) return bad(res, 400, 'Signature mismatch — payment not verified');

  return res.status(200).json({ ok: true, paymentId: paymentId, orderId: orderId });
};
