/***************/

/* CRÉDITOS: githu.com/ds6

/****************/

// libs/nsfw.js
const axios = require("axios");
const cheerio = require("cheerio");
const { Blob, FormData } = require("formdata-node");
const { FormDataEncoder } = require("form-data-encoder");
const { Readable } = require("stream");

module.exports = class Checker {
  constructor() {
    this.base = "https://www.nyckel.com";
    this.invokeEndpoint = "/v1/functions";
    this.identifierPath = "/pretrained-classifiers/nsfw-identifier";
    this.headers = {
      authority: "www.nyckel.com",
      origin: this.base,
      referer: `${this.base}${this.identifierPath}`,
      "user-agent": "Postify/1.0.0",
      "x-requested-with": "XMLHttpRequest"
    };
  }

  async #getFunctionId() {
    try {
      const res = await axios.get(this.base + this.identifierPath, {
        headers: this.headers
      });
      const $ = cheerio.load(res.data);
      const src = $('script[src*="embed-image.js"]').attr("src");
      const fid = src?.match(/[?&]id=([^&]+)/)?.[1];
      if (!fid) throw new Error("Function ID no encontrado.");
      return { status: true, id: fid };
    } catch (err) {
      return { status: false, msg: err.message };
    }
  }

  /**
   * @param {Buffer} buffer
   * @param {string} mimeType "image/png"|"image/jpeg"|"image/webp"|"image/bmp"
   */
  async response(buffer, mimeType = "image/png") {
    const fn = await this.#getFunctionId();
    if (!fn.status) return { status: false, msg: fn.msg };

    // Extensión según mimeType
    let ext = mimeType.split("/")[1];
    if (ext === "jpeg") ext = "jpg";
    const filename = `image.${ext}`;

    // Prepara FormData
    const blob = new Blob([buffer], { type: mimeType });
    const form = new FormData();
    form.append("file", blob, filename);

    // Usa form-data-encoder para multipart/form-data correcto 0
    const encoder = new FormDataEncoder(form);
    const bodyStream = Readable.from(encoder.encode());

    const resp = await axios.post(
      `${this.base}${this.invokeEndpoint}/${fn.id}/invoke`,
      bodyStream,
      {
        headers: {
          ...this.headers,
          ...encoder.headers
        }
      }
    );

    let { labelName, confidence } = resp.data;
    if (confidence > 0.97) {
      const cap = Math.random() * (0.992 - 0.97) + 0.97;
      confidence = Math.min(confidence, cap);
    }

    const pct = (confidence * 100).toFixed(2) + "%";
    if (labelName === "Porn") {
      return {
        status: true,
        result: {
          NSFW: true,
          percentage: pct,
          response: "🔞 *NSFW detectado. Ten cuidado al compartir.*"
        }
      };
    } else {
      return {
        status: true,
        result: {
          NSFW: false,
          percentage: pct,
          response: "✅ *Contenido seguro.*"
        }
      };
    }
  }
};
