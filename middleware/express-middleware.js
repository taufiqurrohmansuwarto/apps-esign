import { expressWrapper } from "next-connect";
const compression = require("compression");
const FingerPrint = require("express-fingerprint");

export const expressCompression = expressWrapper(compression());
export const expressFingerPrint = expressWrapper(
  FingerPrint({
    parameters: [
      FingerPrint.useragent,
      FingerPrint.acceptHeaders,
      FingerPrint.geoip,
    ],
  })
);
