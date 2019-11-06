const hash = (str, salt) => {
  let hashedStr = '';

  const fullStr = salt + str;

  for (let i = 0; i < fullStr.length; ++i) {
    hashedStr += fullStr.charCodeAt(i);
  }

  return hashedStr;
};

module.exports = hash;
