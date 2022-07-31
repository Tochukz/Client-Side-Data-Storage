window.onload = function() {
  console.log('window loaded!');
  setCookies();
  setCookiesWithMetaData();
  readCookies();
  deleteCookie('OS');
}

function setCookies() {
  document.cookie = "name=Chucks";
  // Cookie values should be URL-safe
  const position = encodeURIComponent("Software Architech");
  document.cookie = `position=${position}`;
}

function setCookiesWithMetaData() {
  const date = getNextMonth();
  const expires = date.toGMTString(); // Wed, 31 Aug 2022 19:31:41 GMT
  document.cookie = `lang=JavaScript; expires=${expires}`;
  document.cookie = `OS=Windows7; expires=${expires}; domain=127.0.0.1`;
}

function readCookies() {
  const cookieStr = document.cookie;
  const cookies = cookieStr.split('; ');
  const cookiePairs = {};
  cookies.forEach(item => {
    const pair = item.split('=');
    cookiePairs[pair[0]] = pair[1];
  });
  console.log(cookiePairs);
}

function deleteCookie(key) {
  const expires = getYesterday();
  document.cookie = `${key}=Whatever; expires=${expires}`;
  readCookies();
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

function getYesterday() {
  let date = new Date();
  const day = date.getDate();
  if (day == 0) {
    date = getNextMonth();
    date.setDate(0);
    return date;
  }
  date.setDate(day - 1);
  return date;
}