module.exports.replace = function (text, pattern, replacement) {
  if (typeof text !== 'string') {
    return text;
  }
  return text.replace(new RegExp(pattern, 'g'), replacement);
};
