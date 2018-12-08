String.prototype.toCamelCase = function() {
  let resultString = this.replace(/[$,#,.]/gi, "");
  let positions = [].concat(
    resultString.searchAll(/_/g),
    resultString.searchAll(/ /g),
    resultString.searchAll(/-/g),
    resultString.searchAll(/[a-z][A-Z]/g)
  );
  resultString = resultString.toLowerCase();
  for (index in positions) {
      let position = (positions[index] +1);
    resultString = resultString.replaceAt(
      position,
      resultString.charAt(position).toUpperCase()
    );
  }
  return resultString.clear().replace(/[_, ,-]/gi, "");
};

String.prototype.searchAll = function(regex) {
  let pos = 0;
  let result = this;
  let arr = [];
  let searchPos;
  while (pos >= 0) {
     searchPos = result.search(regex);
    if (searchPos < 0) break;
      result = result.substr(searchPos + 1);
      pos = (pos == 0) ? searchPos : pos + searchPos + 1;
      arr.push(pos);
  }
  return arr;
};

String.prototype.replaceAt = function(index, replacement) {
  return (
    this.substr(0, index) +
    replacement +
    this.substr(index + replacement.length)
  );
};

String.prototype.splice = function(start, delCount, newSubStr) {
  return (
    this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount))
  );
};

String.prototype.clear = function() {
  return this.replace(new RegExp("[ÁÀÂÃ]", "gi"), "a")
    .replace(new RegExp("[ÉÈÊ]", "gi"), "e")
    .replace(new RegExp("[ÍÌÎ]", "gi"), "i")
    .replace(new RegExp("[ÓÒÔÕ]", "gi"), "o")
    .replace(new RegExp("[ÚÙÛ]", "gi"), "u")
    .replace(new RegExp("[Ç]", "gi"), "c");
};

String.prototype.toUnderscore = function() {
  let resultString = this.replace(/[$,#,.]/gi, "");
  let position = resultString.search(/[a-z][A-Z]/g);
  while (position >= 0) {
    resultString = resultString.splice(position + 1, 0, "_");
    position = resultString.search(/[a-z][A-Z]/g);
  }
  return resultString
    .clear()
    .toUpperCase()
    .replace(/[ ,-]/gi, "_");
};
