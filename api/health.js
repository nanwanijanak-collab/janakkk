/* GET /api/health — quick check that functions run and payments are configured. */
'use strict';

module.exports = (req, res) => {
  res.status(200).json({
    ok: true,
    node: process.version,
    razorpayConfigured: !!(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET)
  });
};
