const token = process.env.WHATSAPP_TOKEN;
const numberId = process.env.WHATSAPP_NUMBER_ID;
const url = `https://graph.facebook.com/v22.0/${numberId}/messages`;
export const sendOrderLink = async ({ phone, link }: { phone: string, link: string }) => {
    // add try catch
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "messaging_product": "whatsapp",
                "to": phone,
                "type": "template",
                "template": {
                    "name": "order_link",
                    "language": {
                        "code": "en"
                    },
                    "components": [
                        {
                            "type": "body",
                            "parameters": [
                                {
                                    "type": "text",
                                    "text": link,
                                    "parameter_name": "link"
                                }
                            ]
                        }
                    ]
                }
            })
        });
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch (error) {
        console.log(error);
        return error;
    }
};
export const sendAuthenticationCode = async ({ to, code }: { to: string, code: string }) => {
    console.log("sendAuthenticationCode", to, code);
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "messaging_product": "whatsapp",
                "recipient_type": "individual",
                "to": to,
                "type": "template",
                "template": {
                    "name": "verification_msg",
                    "language": {
                        "code": "en"
                    },
                    "components": [
                        {
                            "type": "body",
                            "parameters": [
                                {
                                    "type": "text",
                                    "text": code
                                }
                            ]
                        },
                        {
                            "type": "button",
                            "sub_type": "url",
                            "index": "0",
                            "parameters": [
                                {
                                    "type": "text",
                                    "text": code
                                }
                            ]
                        }
                    ]
                }
            })
        });
        const data = await response.json();
        console.log("sendAuthenticationCode", data);
        return data;
    }
    catch (error) {
        console.log(error);
        return error;
    }
};
