'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.backup = undefined;

let backup = exports.backup = (() => {
  var _ref = _asyncToGenerator(function* () {
    console.log('start firebase backup');

    const auth = new _googleAuthLibrary.GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/datastore', 'https://www.googleapis.com/auth/cloud-platform']
    });
    const client = yield auth.getClient();

    const { storageBucket, projectId } = FIREBASE_CONFIG;
    const url = `https://firestore.googleapis.com/v1beta1/projects/${projectId}/databases/(default):exportDocuments`;
    const backupFileName = new Date().toISOString();
    const backupUrl = `gs://${storageBucket}/${BACKUP_FOLDER}/${backupFileName}.json`;

    yield client.request({
      url,
      method: 'POST',
      data: { outputUriPrefix: backupUrl }
    });

    console.log('end firebase backup');
  });

  return function backup() {
    return _ref.apply(this, arguments);
  };
})();

var _googleAuthLibrary = require('google-auth-library');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const FIREBASE_CONFIG = JSON.parse(process.env.FIREBASE_CONFIG || '{}');
const BACKUP_FOLDER = 'backup-firestore-vehikeling';