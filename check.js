const store = global.captchaStore || (global.captchaStore = {});

export default function handler(req, res) {
  const { captcha_id, answer } = req.query;

  if (!captcha_id || !answer) {
    return res.json({ ok: false, error: "missing_data" });
  }

  const data = store[captcha_id];

  if (!data) {
    return res.json({ ok: false, error: "expired" });
  }

  if (data.answer !== answer) {
    return res.json({ ok: false, error: "wrong" });
  }

  delete store[captcha_id];

  res.json({ ok: true });
}
