import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

admin.initializeApp(functions.config().firebase);

let db = admin.firestore();
let usersRef = db.collection("users");

/*
usersRef.get().then(async snapshot => {
  for (const doc of snapshot) {

    let user = doc.data();
    user.id = doc.id;

    await runForUser(user);

  }
});*/

export async function runForUser (user) {
  let answer = "For user " + user.id;

  answer += "Days Sindce Epoch: " + getDaysSinceEpoch() + "<br>";

  try {
    let uID = user.id;
    let hu = user.notification_hu * 30;
    let oil = user.notification_oil * 30;

    let cars = await getCarsForUserID(uID);

    answer += " found " + cars.length + " cars <br>";

    for (const car of cars) {

      let carID = car.id;
      let services_hu = await getServicesForCarIDFilteredByCategory(uID, carID, "HU / AU");
      let services_oil = await getServicesForCarIDFilteredByCategory(uID, carID, "Ölwechsel");

      let latest_hu = await getLatestFromServicesArray(services_hu);
      let latest_oil = await getLatestFromServicesArray(services_oil);

      answer += "For car " + carID + " found " + services_hu.length + "x HU-Entries <br>";
      answer += "Latest: " + JSON.stringify(latest_hu.daysSinceEpoch) + " <br>";


      answer += "For car " + carID + " found " + services_oil.length + "x Oil-Entries<br>";
      answer += "Latest: " + JSON.stringify(latest_oil.daysSinceEpoch) + "<br>";

      latest_hu.daysSinceEpoch += hu;
      latest_oil.daysSinceEpoch += oil;

      let hu_diff = latest_hu.daysSinceEpoch - getDaysSinceEpoch();
      let oil_diff = latest_oil.daysSinceEpoch - getDaysSinceEpoch();

      answer += "How many days to HU notification: " + hu_diff+ "<br>";
      answer += "How many days to Oil notification: " + oil_diff + "<br><br>";

      if (hu_diff === 0)
        sendHUNotificationForCar(uID, carID);
      if (oil_diff === 0)
        sendOilNotificationForCar(uID, carID);

    }

  } catch (e) {
    console.log(e);
    answer += e;
  }

  return answer;
}

function sendHUNotificationForCar (uID, carID) {

}

function sendOilNotificationForCar (uID, carID) {

}

function getDaysSinceEpoch () {
  return new Date().setHours(0, 0, 0, 0) / 8.64e7;
}

async function getLatestFromServicesArray (serviceArray) {
  let arr = await serviceArray.map(item => {
    let copy = item;

    let date = new Date(Date.parse(copy.date));
    date.setHours(0,0,0,0);

    copy.daysSinceEpoch = Math.floor(date / 8.64e7);
    return copy;
  });

  const compare = (a, b) => {
    if ( a.daysSinceEpoch < b.daysSinceEpoch ){
      return -1;
    }
    if ( a.daysSinceEpoch > b.daysSinceEpoch ){
      return 1;
    }
    return 0;
  }

  if (arr.length === 0)
    return { daysSinceEpoch: 0 };

  if (arr.length === 1)
    return arr[0];

  arr = await arr.sort(compare);

  return arr[arr.length - 1];
}

async function getServicesForCarIDFilteredByCategory (uID, carID, category) {
  let arr = await getServicesForCarID(uID, carID);
  return  arr.filter(item => item.category === category);
}

async function getServicesForCarID (uID, carID) {
  let servicesRef = await db.collection("user").doc(uID).collection("cars").doc(carID).collection("services");

  let snapshot = await servicesRef.get();
  let services = [];

  for (const doc of snapshot.docs) {
    let service = doc.data();
    service.id = doc.id;
    services.push(service);
  }

  return services;
}

async function getCarsForUserID (uID) {
  let carsRef = db.collection("user").doc(uID).collection("cars");

  let snapshot = await carsRef.get();
  let cars = [];

  await snapshot.forEach(doc => {
    let car = doc.data();
    car.id = doc.id;
    cars.push(car);
  });

  return cars;
}
