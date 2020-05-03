import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import {sendNotificationMail} from "./mail";

admin.initializeApp(functions.config().firebase);

let db = admin.firestore();
let usersRef = db.collection("user");

export function run() {
  usersRef.get().then(snapshot => {
    snapshot.forEach((doc) => {

      let user = doc.data();
      user.uid = doc.id;

      console.log("User: ",user.uid);

      runForUser(user);
    });
  });
}

export async function runForUser (user) {
  let authUser = await admin.auth().getUser(user.uid);
  user.email = authUser.email;
  user.displayName = authUser.displayName;

  try {
    let uID = user.uid;
    let hu = user.notification_hu * 30;
    let oil = user.notification_oil * 30;

    let cars = await getCarsForUserID(uID);

    for (const car of cars) {

      let carID = car.id;
      let services_hu = await getServicesForCarIDFilteredByCategory(uID, carID, "HU / AU");
      let services_oil = await getServicesForCarIDFilteredByCategory(uID, carID, "Ölwechsel");

      let latest_hu = await getLatestFromServicesArray(services_hu);
      let latest_oil = await getLatestFromServicesArray(services_oil);

      latest_hu.daysSinceEpoch += hu;
      latest_oil.daysSinceEpoch += oil;

      let hu_diff = latest_hu.daysSinceEpoch - getDaysSinceEpoch();
      let oil_diff = latest_oil.daysSinceEpoch - getDaysSinceEpoch();

      if (user.uid === "yFUcy157M5T6wfOZgHmwz39Nant2") {
        console.log(user.email, hu_diff, oil_diff);
      }

      if (hu_diff === 0)
        sendNotificationMail(user.displayName, user.email, car, "hu");
      if (oil_diff === 0)
        sendNotificationMail(user.displayName, user.email, car, "oil");

    }

  } catch (e) {
    console.log(e);
  }
}

function getCarNameFromCar (car) {
  return car.name.length !== 0 ? car.name : (car.hersteller.length !== 0 ? car.hersteller + " " + car.model : car.model);
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
