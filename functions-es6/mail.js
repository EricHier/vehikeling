import {key} from "./sendgrid-key.js";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(key);

function sendNotificationMail(userName, email, subject, htmlContent) {
  const message = {
    "personalizations": [{
      "to": [{"email": email, "name": userName}],
      "subject": subject
    }],
    "content": [{"type": "text/html", "value": htmlContent}],
    "from": {"email": "info@vehikeling.de", "name": "vehikeling"},
    "reply_to": {"email": "developer.erichier@gmail.com", "name": "EricHier von vehikeling"}
  };

  sgMail.send(message);
}
