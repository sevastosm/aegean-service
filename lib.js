
import 'dotenv/config'
export const sendSms = async(to,text)=> {
fetch('https://rest.nexmo.com/sms/json', {
  method: 'POST',
  body: new URLSearchParams({
    'from': 'Aegean Taxi',
    'text': text,
    'to': to,
    'api_key': 'd97056fa',
    'api_secret': 'aWjeRvyt34lNrber'
  })
}) .then(resp => console.log("RESP",resp))
        .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
}

