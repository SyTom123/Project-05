// Ham them cookie
export const setCookie = (cname, cvalue, exdays) => {
    var d= new Date();
    d.setTime(d.getTime()+  exdays * 24 * 60 * 60 * 1000);
    var expires = "expires" +  d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
// Hàm lấy cookie
export const getCookie = (cname) => {
    var name = cname + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };
  
  // Hàm xoa cookie
  export const deleteCookie = (cname) => {
    document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
  };
  // Hàm xoa het cookie
  export const deleteAllCookie = () => {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
      document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    }
  };