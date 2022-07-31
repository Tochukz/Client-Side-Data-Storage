window.onload = function() {
  let visited = getCookie('visited') || 0;
  setCookie('visited', ++visited, Infinity);
  getElem("visted").textContent = `You have visited this page ${visited} times`;
};


function setCookie(key, value) {
  const expires = getNextMonth().toGMTString(); // Wed, 31 Aug 2022 20:19:46 GMT
  document.cookie = `${key}=${value}; expires=${expires}`;
}

function getCookie(key) {
  const cookieStr = document.cookie;
  const cookies = cookieStr.split('; ');
  const cookiePairs = {};
  cookies.forEach(item => {
    const pair = item.split('=');
    cookiePairs[pair[0]] = pair[1];
  });
  return cookiePairs[key];
}

function getNextMonth() {
  const date = new Date();
  const month = date.getMonth();
  if (month >= 11) {
    const year = date.getFullYear() + 1;
    date.setFullYear(year);
    date.setMonth(0);
    return date;
  }
  date.setMonth(date.getMonth() + 1);
  return date;
}

function getElem(id) {
  return document.getElementById(id);
}