let ElasticEmail = require("@elasticemail/elasticemail-client");

let defaultClient = ElasticEmail.ApiClient.instance;

let apikey = defaultClient.authentications["apikey"];
apikey.apiKey =
	"F49B55618A270B9B71F88D3D7E7E2E9D695F10538073F1C8610122AE2A0D56FAB23669554B8E895B0988B6048C90C92F";

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
