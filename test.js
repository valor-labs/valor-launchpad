// const bcrypt = require('bcrypt');
// bcrypt.hash('123123', 10).then(console.log)
// bcrypt.hash('123123', 10).then(console.log)
//
// /*
// $2b$10$cl2S5LdH3J/pDuJux/Zu3u5xpQ6IfuQ90SQaZBTPn6RcysfzlO4by
// $2b$10$5evUvseAApEgcGlGD.dPyeLjIBkz8UtB0jR46wfdbwrFBQqkHWqze
//  */
//
// bcrypt.compare('123123', '$2b$10$cl2S5LdH3J/pDuJux/Zu3u5xpQ6IfuQ90SQaZBTPn6RcysfzlO4by').then(console.log)
// bcrypt.compare('123123', '$2b$10$5evUvseAApEgcGlGD.dPyeLjIBkz8UtB0jR46wfdbwrFBQqkHWqze').then(console.log)
const uuid = require('uuid');
console.log(uuid.v4());
