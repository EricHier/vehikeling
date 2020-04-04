"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notificationsTest = exports.scheduledFirestoreExport = undefined;

var _firebaseFunctions = require("firebase-functions");

var functions = _interopRequireWildcard(_firebaseFunctions);

var _notification = require("./notification");

var _backup = require("./backup");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

let scheduledFirestoreExport = exports.scheduledFirestoreExport = functions.pubsub.schedule('0 2 * * *').timeZone('Europe/Berlin').onRun((() => {
  var _ref = _asyncToGenerator(function* (context) {
    try {
      yield (0, _backup.backup)();
    } catch (err) {
      console.error('error running db backup cron', err);
    }
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})());

/*exports.notifications = functions-es6.pubsub
  .schedule('0 10 * * *')
  .timeZone('Europe/Berlin')
  .onRun(async context => {
    await runForUser();
  });*/

let notificationsTest = exports.notificationsTest = functions.https.onRequest((() => {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    yield res.send((yield (0, _notification.runForUser)({ id: "wvdf5RlAYQhys5JC0A6mEQU897J2", notification_hu: true, notification_oil: false })));
  });

  return function (_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
})());