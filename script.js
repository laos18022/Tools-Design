document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     HELPER
  ========================= */

  function copyText(text) {
    if (!text) return;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
        .then(function () {
          showToast("Copied!");
        })
        .catch(function () {
          showToast("Gagal menyalin");
        });
    } else {
      showToast("Clipboard tidak tersedia");
    }
  }

  window.copyText = copyText;


  function showToast(message) {
    var toast = document.getElementById("toast");

    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(function () {
      toast.classList.remove("show");
    }, 1600);
  }


  /* =========================
     COLOR PICKER
  ========================= */

  var colorInput = document.getElementById("colorInput");
  var colorPreview = document.getElementById("colorPreview");

  function hexToRgb(hex) {
    hex = hex.replace("#", "");

    return {
      r: parseInt(hex.substring(0, 2), 16),
      g: parseInt(hex.substring(2, 4), 16),
      b: parseInt(hex.substring(4, 6), 16)
    };
  }


  function rgbToHsl(r, g, b) {

    r /= 255;
    g /= 255;
    b /= 255;

    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);

    var h = 0;
    var s = 0;
    var l = (max + min) / 2;

    if (max !== min) {

      var d = max - min;

      s = l > 0.5
        ? d / (2 - max - min)
        : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;

        case g:
          h = (b - r) / d + 2;
          break;

        case b:
          h = (r - g) / d + 4;
          break;
      }

      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  }


  function updateColor() {

    if (!colorInput || !colorPreview) return;

    var hex = colorInput.value;
    var rgb = hexToRgb(hex);
    var hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    colorPreview.style.background = hex;

    document.getElementById("hexValue").textContent =
      hex.toUpperCase();

    document.getElementById("rgbValue").textContent =
      rgb.r + ", " + rgb.g + ", " + rgb.b;

    document.getElementById("hslValue").textContent =
      hsl.h + ", " + hsl.s + "%, " + hsl.l + "%";
  }


  if (colorInput) {
    colorInput.addEventListener("input", updateColor);
  }


  /* =========================
     PALETTE
  ========================= */

  function randomColor() {

    var letters = "0123456789ABCDEF";
    var color = "#";

    for (var i = 0; i < 6; i++) {
      color += letters[
        Math.floor(Math.random() * 16)
      ];
    }

    return color;
  }


  window.generatePalette = function () {

    var palette = document.getElementById("palette");

    if (!palette) return;

    palette.innerHTML = "";

    for (let i = 0; i < 5; i++) {
  let color = randomColor();
  let box = document.createElement("div");

  box.style.background = color;
  box.title = color + " - klik untuk copy";

  box.addEventListener("click", function () {
    copyText(color);
  });

      palette.appendChild(box);
    }
  };


  /* =========================
     GRADIENT
  ========================= */

  var gradient1 = document.getElementById("gradient1");
  var gradient2 = document.getElementById("gradient2");
  var gradientDirection =
    document.getElementById("gradientDirection");


  function updateGradient() {

    if (!gradient1 || !gradient2 || !gradientDirection) {
      return;
    }

    var c1 = gradient1.value;
    var c2 = gradient2.value;
    var direction = gradientDirection.value;

    var gradient =
      "linear-gradient(" +
      direction +
      ", " +
      c1 +
      ", " +
      c2 +
      ")";

    document.getElementById("gradientPreview")
      .style.background = gradient;

    document.getElementById("gradientCode")
      .textContent = "background: " + gradient + ";";
  }


  if (gradient1) {
    gradient1.addEventListener("input", updateGradient);
  }

  if (gradient2) {
    gradient2.addEventListener("input", updateGradient);
  }

  if (gradientDirection) {
    gradientDirection.addEventListener("change", updateGradient);
  }


  /* =========================
     SHADOW
  ========================= */

  var shadowBlur =
    document.getElementById("shadowBlur");

  var shadowOpacity =
    document.getElementById("shadowOpacity");


  function updateShadow() {

    if (!shadowBlur || !shadowOpacity) return;

    var blur = shadowBlur.value;
    var opacity = shadowOpacity.value / 100;

    var shadow =
      "0 10px " +
      blur +
      "px rgba(0, 0, 0, " +
      opacity +
      ")";

    document.getElementById("shadowPreview")
      .style.boxShadow = shadow;

    document.getElementById("shadowCode")
      .textContent = "box-shadow: " + shadow + ";";
  }


  if (shadowBlur) {
    shadowBlur.addEventListener("input", updateShadow);
  }

  if (shadowOpacity) {
    shadowOpacity.addEventListener("input", updateShadow);
  }


  /* =========================
     GLASSMORPHISM
  ========================= */

  var glassBlur =
    document.getElementById("glassBlur");

  var glassOpacity =
    document.getElementById("glassOpacity");


  function updateGlass() {

    if (!glassBlur || !glassOpacity) return;

    var blur = glassBlur.value;
    var opacity = glassOpacity.value / 100;

    var box = document.getElementById("glassBox");

    box.style.backdropFilter =
      "blur(" + blur + "px)";

    box.style.webkitBackdropFilter =
      "blur(" + blur + "px)";

    box.style.background =
      "rgba(255, 255, 255, " +
      opacity +
      ")";

    document.getElementById("glassCode")
      .textContent =
      "background: rgba(255,255,255," +
      opacity +
      "); backdrop-filter: blur(" +
      blur +
      "px);";
  }


  if (glassBlur) {
    glassBlur.addEventListener("input", updateGlass);
  }

  if (glassOpacity) {
    glassOpacity.addEventListener("input", updateGlass);
  }


  /* =========================
     RATIO
  ========================= */

  var ratioWidth =
    document.getElementById("ratioWidth");

  var ratioHeight =
    document.getElementById("ratioHeight");


  function gcd(a, b) {

    while (b !== 0) {
      var temp = b;
      b = a % b;
      a = temp;
    }

    return Math.abs(a);
  }


  function updateRatio() {

    if (!ratioWidth || !ratioHeight) return;

    var width = Number(ratioWidth.value);
    var height = Number(ratioHeight.value);

    if (width <= 0 || height <= 0) return;

    var divisor = gcd(width, height);

    document.getElementById("ratioResult")
      .textContent =
      (width / divisor) +
      " : " +
      (height / divisor);
  }


  if (ratioWidth) {
    ratioWidth.addEventListener("input", updateRatio);
  }

  if (ratioHeight) {
    ratioHeight.addEventListener("input", updateRatio);
  }


  /* =========================
     SOCIAL MEDIA
  ========================= */

  var socialData = {

    instagram: {
      name: "Instagram Post",
      size: "1080 × 1080 px"
    },

    "instagram-story": {
      name: "Instagram Story",
      size: "1080 × 1920 px"
    },

    tiktok: {
      name: "TikTok",
      size: "1080 × 1920 px"
    },

    youtube: {
      name: "YouTube Thumbnail",
      size: "1280 × 720 px"
    },

    "youtube-short": {
      name: "YouTube Shorts",
      size: "1080 × 1920 px"
    },

    facebook: {
      name: "Facebook Post",
      size: "1200 × 630 px"
    },

    twitter: {
      name: "X / Twitter Post",
      size: "1600 × 900 px"
    }

  };


  window.showSocialSize = function () {

    var select =
      document.getElementById("socialSelect");

    if (!select) return;

    var data = socialData[select.value];

    if (!data) return;

    document.getElementById("socialName")
      .textContent = data.name;

    document.getElementById("socialSize")
      .textContent = data.size;
  };


  window.copySocialSize = function () {

    var select =
      document.getElementById("socialSelect");

    if (!select) return;

    var data = socialData[select.value];

    if (!data) return;

    copyText(data.name + ": " + data.size);
  };


  /* =========================
     BORDER RADIUS
  ========================= */

  var radiusRange =
    document.getElementById("radiusRange");


  function updateRadius() {

    if (!radiusRange) return;

    var value = radiusRange.value;

    document.getElementById("radiusPreview")
      .style.borderRadius = value + "px";

    document.getElementById("radiusValue")
      .textContent = value + "px";

    document.getElementById("radiusCode")
      .textContent =
      "border-radius: " + value + "px;";
  }


  if (radiusRange) {
    radiusRange.addEventListener("input", updateRadius);
  }


  /* =========================
     CSS GENERATOR
  ========================= */

  var cssColor =
    document.getElementById("cssColor");

  var cssRadius =
    document.getElementById("cssRadius");


  function updateCssMini() {

    if (!cssColor || !cssRadius) return;

    var color = cssColor.value;
    var radius = cssRadius.value;

    var preview =
      document.getElementById("cssMiniPreview");

    preview.style.background = color;
    preview.style.borderRadius =
      radius + "px";

    document.getElementById("cssCode")
      .textContent =
      "background: " +
      color +
      "; border-radius: " +
      radius +
      "px;";
  }


  if (cssColor) {
    cssColor.addEventListener("input", updateCssMini);
  }

  if (cssRadius) {
    cssRadius.addEventListener("input", updateCssMini);
  }


  /* =========================
     THEME
  ========================= */

  var themeBtn =
    document.getElementById("themeBtn");


  if (themeBtn) {

    themeBtn.addEventListener("click", function () {

      document.body.classList.toggle("light");

      var isLight =
        document.body.classList.contains("light");

      themeBtn.textContent =
        isLight ? "☾" : "☼";

      localStorage.setItem(
        "theme",
        isLight ? "light" : "dark"
      );

    });

  }


  /* =========================
     LOAD THEME
  ========================= */

  var savedTheme =
    localStorage.getItem("theme");

  if (savedTheme === "light") {

    document.body.classList.add("light");

    if (themeBtn) {
      themeBtn.textContent = "☾";
    }
  }


  /* =========================
     INITIALIZE
  ========================= */

  updateColor();
  updateGradient();
  updateShadow();
  updateGlass();
  updateRatio();
  updateRadius();
  updateCssMini();
  window.showSocialSize();

});