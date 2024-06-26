import express from "express";
import  cors from'cors';

import 'dotenv/config'
import { sendSms } from "./lib.js";

const PORT = process.env.PORT;
const { json, urlencoded } = express;

const app = express();

app.use(json());
app.use(cors());

app.use(
    urlencoded({
        extended: true,
    })
);


app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

app.get("/delivery", (req, res) => {
  res.send("Delivery",res);
});

app.post('/send', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    const { phone, message } = req.body;

    console.log("req.body",req.body)


    sendSms(phone, message ) 
        .then((data) => res.json({ success: true, data:data ,message:message}))
        .catch((err) => res.json({ success: false, message: err }));
});

app.listen(3000, () => {
    console.log(`Server listening at http://localhost:${3000}`);
});
