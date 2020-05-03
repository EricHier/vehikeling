import {key} from "./sendgrid-key.js";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(key);

export function sendNotificationMail(userName, email, car, type) {
  userName = userName.split(" ")[0];

  let carName = car.name.length !== 0 ? car.name : (car.hersteller.length !== 0 ? car.hersteller + " " + car.model : car.model );
  let subject = "Dein Auto " + carName + " braucht ein" + (type === "hu" ? "e HU " : "en Ölwechsel ") + " | vehikeling";
  let content = "Hi " + userName + ", \n\n" +
    "es gibt zu deinem Auto " + carName + " eine neue Benachrichtigung: \n\n" +
    "<strong>" + (type === "hu" ? "Eine Hauptuntersuchung ist wieder fällig. " : "Ein Ölwechsel ist wieder fällig. ") + "</strong> \n\n" +
    "Wenn du diese Benachrichtigungen nicht mehr erhalten möchtest kannst du diese in den Profileinstellungen deaktivieren. \n\n" +
    "Viele Grüße \n\n" +
    "Eric von vehikeling";

  const message = {
    "personalizations": [{
      "to": [{"email": email, "name": userName}],
      "subject": subject
    }],
    "content": [{"type": "text/html", "value": content}],
    "from": {"email": "info@vehikeling.de", "name": "vehikeling"},
    "reply_to": {"email": "developer.erichier@gmail.com", "name": "Eric von vehikeling"}
  };

  sgMail.send(message);
}
