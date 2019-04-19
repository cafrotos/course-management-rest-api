const setting = require('../config/setting.json');

module.exports = (key) => {
  key = key.trim();
  let object = setting;
  let __keys;
  if (!key) return null;
  __keys = key.split('.');
  for (let __key of __keys) {
    object = object[__key];
    if (!object) return null;
  }
  return object
}