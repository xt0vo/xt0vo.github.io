let cloaklist;
$.getJSON("/cloaks.json", function (data) {
  cloaklist = data;
});

function cloakExceptions(url) {
  if (url.includes("harrisonburg.instructure.com") == true) {
    return "learn.canvas.net";
  }
  return url;
}

function setCloakCookie(name, url) {
  console.log(name + url);
  if (!(url == null)) {
    document.cookie =
      "tabicon=" + url;
    document.cookie = "tabname=" + name;
    setCloak();
  } else {
    url = cloakExceptions($("#webicon").val());
    document.cookie =
      "tabicon=https://s2.googleusercontent.com/s2/favicons?domain_url=" + url;
    document.cookie = "tabname=" + $("#webname").val();
    setCloak();
  }
}

function clearCloak() {
  document.cookie = "tabicon=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "tabname=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  var link = document.querySelector("link[rel~='icon']");
  link.remove();
  document.title = "Tab Cloak | e-gamepass";
  link = document.createElement("link");
  link.rel = "icon";
  document.head.appendChild(link);
  link.href = "/favicon.png";
}
function loadCloaks() {
  var presetCloaks = document.getElementById("presetCloaks");
  presetCloaks.onchange = (event) => {
    setCloakCookie(
      cloaklist[event.target.value][0],
      cloaklist[event.target.value][1]
    );
  };
}
window.onload = function () {
  loadCloaks();
}