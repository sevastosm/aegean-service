import "dotenv/config";
export const sendSms = async (to: string, text: string) => {
  fetch("https://rest.nexmo.com/sms/json", {
    method: "POST",
    body: new URLSearchParams({
      from: "Aegean Taxi",
      text: text,
      to: to,
      api_key: "d97056fa",
      api_secret: "aWjeRvyt34lNrber",
    }),
  })
    .then(async (resp) => console.log("RESP", await resp.json()))
    .catch((err) => {
      console.log("There was an error sending the messages.");
      console.error(err);
    });
};
