let ElasticEmail = require("@elasticemail/elasticemail-client");
const key = process.env.API_KEY;
let defaultClient = ElasticEmail.ApiClient.instance;

let apikey = defaultClient.authentications["apikey"];
apikey.apiKey = key;

const sendEmail = (recipentEmail, callback, content) => {
	let api = new ElasticEmail.EmailsApi();
	const emailConfig = ElasticEmail.EmailMessageData.constructFromObject({
		Recipients: [new ElasticEmail.EmailRecipient(recipentEmail)],
		Content: {
			Body: [
				ElasticEmail.BodyPart.constructFromObject({
					ContentType: "HTML",
					Content: content,
				}),
			],
			Subject: "From Glowcity",
			From: "alhamdu7624@gmail.com",
		},
	});

	api.emailsPost(emailConfig, callback);
};

module.exports = sendEmail;
