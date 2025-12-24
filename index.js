import { createCanvas } from "canvas";
import crypto from "crypto";

const store = global.captchaStore || (global.captchaStore = {});

export default async function handler(req, res) {
  const answer = Math.floor(1000 + Math.random() * 9000).toString();
  const captchaId = crypto.randomUUID();

  // Canvas
  const canvas = createCanvas(200, 80);
  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, 200, 80);

  // Noise lines
  for (let i = 0; i < 6; i++) {
    ctx.strokeStyle = "#ccc";
    ctx.beginPath();
    ctx.moveTo(Math.random() * 200, Math.random() * 80);
    ctx.lineTo(Math.random() * 200, Math.random() * 80);
    ctx.stroke();
  }

  // Text
  ctx.font = "48px sans-serif";
  ctx.fillStyle = "#000";
  ctx.fillText(answer, 35, 55);

  // Store captcha
  store[captchaId] = {
    answer,
    created: Date.now()
  };

  const image = canvas.toBuffer("image/png").toString("base64");

  res.json({
    captcha_id: captchaId,
    image_base64: image
  });
}
