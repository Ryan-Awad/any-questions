const getCookie = (name) => { // https://stackoverflow.com/a/21125098/10273599
  var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
}

export default getCookie;