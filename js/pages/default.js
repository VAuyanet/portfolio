document.onreadystatechange = function () {
  if (document.readyState === "interactive") {
    initBlazy();
  }
};

function initBlazy() {
  var bLazy = new Blazy();
}