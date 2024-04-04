/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";

import "dotenv/config";
import { sendSms } from "./lib";

import request from "request";
import { error } from "firebase-functions/logger";

const { json, urlencoded } = express;

const app = express();

app.use(json());
app.use(cors());

app.use(
  urlencoded({
    extended: true,
  })
);

app.get("/", (req: any, res: any) => {
  res.send("Hello from Aegean-Service !!!");
});

app.get("/delivery", (req: any, res: any) => {
  res.send("Delivery", res);
});

app.post("/send", (req: any, res: any) => {
  res.set("Access-Control-Allow-Origin", "*");

  const { phone, message } = req.body;

  console.log("req.body", req.body);

  sendSms(phone, message)
    .then((data) => res.json({ success: true, data: data, message: message }))
    .catch((err) => res.json({ success: false, message: err }));
});

const verifyCaptcha = async (req: any, res: any) => {
  const secretKey = "6Lc_Wq8pAAAAAOF5YUwbLVVPyxD2SzeoLB2OArny";

  if (!req.body.captcha) {
    console.log("err");
    return res.json({ success: false, msg: "Capctha is not checked" });
  }

  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.token}`;

  await request(verifyUrl, (err, response, body) => {
    if (err) {
      console.log(err);
      res.json({ error_from_api: error });
    }

    body = JSON.parse(body);

    if (!body.success && body.success === undefined) {
      return res.json({
        success: false,
        msg: "captcha verification failed",
      });
    } else if (body.score < 0.5) {
      return res.json({
        success: false,
        msg: "you might be a bot, sorry!",
        score: body.score,
      });
    }

    // return json message or continue with your function. Example: loading new page, ect
    return res.json({
      data: {
        success: true,
        msg: "captcha verification passed",
        score: body.score,
      },
    });
  });
};

app.post("/verify", verifyCaptcha);

// Catch all other routes and return 404 Not Found
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Define your Cloud Function
exports.api = functions.https.onRequest(app);
