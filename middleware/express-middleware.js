import { expressWrapper } from "next-connect";
import auth from "./auth";

const compression = require("compression");
const FingerPrint = require("express-fingerprint");
const ip = require("express-ip");

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

export const expressIp = expressWrapper(ip().getIpInfoMiddleware);

export const authWithIp = [
  expressFingerPrint,
  expressIp,
  expressCompression,
  auth,
];
