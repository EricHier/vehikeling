const {GoogleAuth} = require('google-auth-library')

const FIREBASE_CONFIG = JSON.parse(process.env.FIREBASE_CONFIG || '{}')
const BACKUP_FOLDER = 'backup-firestore-vehikeling'

module.exports = async function backup() {
  console.log('start firebase backup')

  const auth = new GoogleAuth({
    scopes: [
      'https://www.googleapis.com/auth/datastore',
      'https://www.googleapis.com/auth/cloud-platform',
    ],
  })
  const client = await auth.getClient()

  const {storageBucket, projectId} = FIREBASE_CONFIG
  const url = `https://firestore.googleapis.com/v1beta1/projects/${projectId}/databases/(default):exportDocuments`
  const backupFileName = new Date().toISOString()
  const backupUrl = `gs://${storageBucket}/${BACKUP_FOLDER}/${backupFileName}.json`

  await client.request({
    url,
    method: 'POST',
    data: {outputUriPrefix: backupUrl},
  })

  console.log('end firebase backup')
}
