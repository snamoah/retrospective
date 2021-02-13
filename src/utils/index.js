export default {
  isCode(str) {
    return /^[a-zA-Z0-9]{20}$/.test(str);
  },
  isValidLink(str) {
    const regExp = new RegExp(`${process.env.VUE_APP_BASE_URL}/#/retros/[a-zA-Z0-9]{20}`);
    return regExp.test(str);
  },
  getCodeFromLink(link) {
    const offset = process.env.VUE_APP_BASE_URL.length + 10;
    return link.slice(offset);
  },
  log(...args) {
    console.log('[CUSTOM]: ', ...args);
  },
};
