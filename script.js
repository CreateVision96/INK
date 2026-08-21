const effectBtns = document.querySelectorAll(".effect-btn");
const settingsGrps = document.querySelectorAll(".settings-grp");
const colorSection = document.querySelector(".color-section");

const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

effectBtns.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedEffect = button.dataset.effect;

    if (
      selectedEffect === "noise" ||
      selectedEffect === "dither" ||
      selectedEffect === "pixelate" ||
      selectedEffect === "analog"
    ) {
      colorSection.classList.add("hidden");
    } else {
      colorSection.classList.remove("hidden");
    }

    effectBtns.forEach((item) => {
      item.classList.remove("active");
    });
    button.classList.add("active");

    settingsGrps.forEach((group) => {
      if (group.dataset.settings === selectedEffect) {
        group.classList.remove("hidden");
      } else {
        group.classList.add("hidden");
      }
    });

    renderCurrentEffect();
  });
});

const halftoneSize = document.getElementById("halftone-size");
const halftoneSV = document.getElementById("halftone-size-value");

const halftoneAngle = document.getElementById("halftone-angle");
const halftoneAngleValue = document.getElementById("halftone-angle-value");

const halftoneContrast = document.getElementById("halftone-contrast");
const halftoneContrastValue = document.getElementById(
  "halftone-contrast-value",
);

const halftoneBlur = document.getElementById("halftone-blur");
const halftoneBlurValue = document.getElementById("halftone-blur-value");

const blend = document.getElementById("blend");
const blendValue = document.getElementById("blend-value");

const colorMode = document.getElementById("color-mode");
const colorControls = document.getElementById("color-ctrls");

const color1 = document.getElementById("color1");
const color2 = document.getElementById("color2");

blend.addEventListener("input", () => {
  blendValue.textContent = blend.value;

  if (imagePreview.src) {
    requestAnimationFrame(renderCurrentEffect);
  }
});

colorMode.addEventListener("change", () => {
  if (colorMode.value === "source") {
    colorControls.classList.add("hidden");
  } else {
    colorControls.classList.remove("hidden");
  }
  if (imagePreview.src) {
    requestAnimationFrame(renderCurrentEffect);
  }
});

color1.addEventListener("input", () => {
  if (imagePreview.src) {
    requestAnimationFrame(renderCurrentEffect);
  }
});

color2.addEventListener("input", () => {
  if (imagePreview.src) {
    requestAnimationFrame(renderCurrentEffect);
  }
});

halftoneSize.addEventListener("input", () => {
  halftoneSV.textContent = halftoneSize.value;
  if (imagePreview.src) {
    requestAnimationFrame(renderCurrentEffect);
  }
});
halftoneAngle.addEventListener("input", () => {
  halftoneAngleValue.textContent = `${halftoneAngle.value}°`;
  if (imagePreview.src) {
    requestAnimationFrame(renderCurrentEffect);
  }
});
halftoneContrast.addEventListener("input", () => {
  halftoneContrastValue.textContent = halftoneContrast.value;
  if (imagePreview.src) {
    requestAnimationFrame(renderCurrentEffect);
  }
});

halftoneBlur.addEventListener("input", () => {
  halftoneBlurValue.textContent = halftoneBlur.value;
  if (imagePreview.src) {
    requestAnimationFrame(renderCurrentEffect);
  }
});

const noiseAmount = document.getElementById("noise-amount");
const noiseAmountValue = document.getElementById("noise-amount-value");

const noiseSize = document.getElementById("noise-size");
const noiseSV = document.getElementById("noise-size-value");

const noiseDensity = document.getElementById("noise-density");
const noiseDenstyValue = document.getElementById("noise-density-value");

const noiseContrast = document.getElementById("noise-contrast");
const noiseContrastValue = document.getElementById("noise-contrast-value");

const ditherSize = document.getElementById("dither-size");
const ditherSV = document.getElementById("dither-size-value");

const ditherContrast = document.getElementById("dither-contrast");
const ditherContrastValue = document.getElementById("dither-contrast-value");

const pixelateSize = document.getElementById("pixelate-size");
const pixelateSV = document.getElementById("pixelate-size-value");

const pixelateContrast = document.getElementById("pixelate-contrast");
const pixelateContrastValue = document.getElementById(
  "pixelate-contrast-value",
);

const analogEffect = document.getElementById("analog-effect");

const photocopytrsh = document.getElementById("photocopy-trsh");

const photocopytrshValue = document.getElementById("photocopy-trsh-value");

const stamptrsh = document.getElementById("stamp-trsh");
const stamptrshValue = document.getElementById("stamp-trsh-value");

const stampSpread = document.getElementById("stamp-spread");
const stampSpreadValue = document.getElementById("stamp-spreadValue");

const stampTex = document.getElementById("stamp-texture");
const stampTexValue = document.getElementById("stamp-texture-value");

pixelateSize.addEventListener("input", () => {
  pixelateSV.textContent = pixelateSize.value;

  if (imagePreview.src) {
    requestAnimationFrame(renderCurrentEffect);
  }
});

pixelateContrast.addEventListener("input", () => {
  pixelateContrastValue.textContent = pixelateContrast.value;
  if (imagePreview.src) {
    requestAnimationFrame(renderCurrentEffect);
  }
});

function updateAnalogSettingsVisibility() {
  const effect = analogEffect.value;

  const photocopySetting = photocopytrsh.closest(".setting");
  const stampThresholdsetting = stamptrsh.closest(".setting");
  const stampSpreadSetting = stampSpread.closest(".setting");
  const stampTextureSetting = stampTex.closest(".setting");

  photocopySetting.classList.add("hidden");
  stampThresholdsetting.classList.add("hidden");
  stampSpreadSetting.classList.add("hidden");
  stampTextureSetting.classList.add("hidden");

  if (effect === "photocopy") {
    photocopySetting.classList.remove("hidden");
  }

  if (effect === "stamp") {
    stampThresholdsetting.classList.remove("hidden");
    stampSpreadSetting.classList.remove("hidden");
    stampTextureSetting.classList.remove("hidden");
  }
}

updateAnalogSettingsVisibility();

analogEffect.addEventListener("change", () => {
  updateAnalogSettingsVisibility();

  if (imagePreview.src) {
    renderCurrentEffect();
  }
});

photocopytrsh.addEventListener("input", () => {
  photocopytrshValue.textContent = photocopytrsh.value;

  if (imagePreview.src && analogEffect.value === "photocopy") {
    requestAnimationFrame(renderCurrentEffect);
  }
});

stamptrsh.addEventListener("input", () => {
  stamptrshValue.textContent = stamptrsh.value;
  if (imagePreview.src && analogEffect.value === "stamp") {
    requestAnimationFrame(renderCurrentEffect);
  }
});

stampSpread.addEventListener("input", () => {
  stampSpreadValue.textContent = stampSpread.value;

  if (imagePreview.src && analogEffect.value === "stamp") {
    requestAnimationFrame(renderCurrentEffect);
  }
});

stampTex.addEventListener("input", () => {
  stampTexValue.textContent = stampTex.value;

  if (imagePreview.src && analogEffect.value === "stamp") {
    requestAnimationFrame(renderCurrentEffect);
  }
});

noiseDensity.addEventListener("input", () => {
  noiseDenstyValue.textContent = noiseDensity.value;
  if (imagePreview.src) {
    requestAnimationFrame(renderCurrentEffect);
  }
});

noiseContrast.addEventListener("input", () => {
  noiseContrastValue.textContent = noiseContrast.value;
  if (imagePreview.src) {
    requestAnimationFrame(renderCurrentEffect);
  }
});

noiseAmount.addEventListener("input", () => {
  noiseAmountValue.textContent = noiseAmount.value;

  if (imagePreview.src) {
    requestAnimationFrame(renderCurrentEffect);
  }
});
noiseSize.addEventListener("input", () => {
  noiseSV.textContent = noiseSize.value;

  if (imagePreview.src) {
    requestAnimationFrame(renderCurrentEffect);
  }
});

ditherSize.addEventListener("input", () => {
  ditherSV.textContent = ditherSize.value;
  if (imagePreview.src) {
    requestAnimationFrame(renderCurrentEffect);
  }
});
ditherContrast.addEventListener("input", () => {
  ditherContrastValue.textContent = ditherContrast.value;
  if (imagePreview.src) {
    requestAnimationFrame(renderCurrentEffect);
  }
});

const imageInput = document.getElementById("image-input");
const imagePreview = document.getElementById("preview-img");
const imageArea = document.getElementById("img-pre");

const effectCanvas = document.getElementById("effect-canvas");
const effectCtx = effectCanvas.getContext("2d");

const emptyState = document.getElementById("empty-state");

const imageName = document.getElementById("img-name");
const imageSize = document.getElementById("img-size");

const expBTN = document.getElementById("expBTN");

expBTN.addEventListener("click", () => {
  if (!imagePreview.src) return;

  const link = document.createElement("a");

  link.download = `INK-${imageName.textContent}`;
  link.href = effectCanvas.toDataURL("image/png");

  link.click();
});

const beforeBtn = document.getElementById("before-btn");

beforeBtn.addEventListener("mousedown", () => {
  if (!imagePreview.src) return;

  effectCanvas.style.display = "none";
  imagePreview.style.display = "block";
});

beforeBtn.addEventListener("mouseup", () => {
  if (!imagePreview.src) return;

  imagePreview.style.display = "none";
  effectCanvas.style.display = "block";
});

beforeBtn.addEventListener("mouseleave", () => {
  if (!imagePreview.src) return;

  imagePreview.style.display = "none";
  effectCanvas.style.display = "block";
});

imageArea.addEventListener("click", () => {
  imageInput.click();
});

imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if (!file) return;
  loadImage(file);
});

imageArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  imageArea.classList.add("dragging");
});

imageArea.addEventListener("dragleave", () => {
  imageArea.classList.remove("dragging");
});

imageArea.addEventListener("drop", (event) => {
  event.preventDefault();
  imageArea.classList.remove("dragging");

  const file = event.dataTransfer.files[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) return;
  loadImage(file);
});

function loadImage(file) {
  const imageURL = URL.createObjectURL(file);

  imagePreview.src = imageURL;

  imagePreview.onload = () => {
    emptyState.style.display = "none";
    imagePreview.style.display = "none";

    imageName.textContent = file.name;

    imageSize.textContent = `${imagePreview.naturalWidth} × ${imagePreview.naturalHeight}`;

    const activeEffect =
      document.querySelector(".effect-btn.active").dataset.effect;

    if (activeEffect === "noise") {
      renderNoise();
    } else if (activeEffect === "dither") {
      renderDither();
    } else if (activeEffect === "pixelate") {
      renderPixelate();
    } else if (activeEffect === "analog") {
      renderAnalog();
    } else {
      renderHalftone();
    }
  };
}

function hexToRgb(hex) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

function renderHalftone() {
  const width = imagePreview.naturalWidth;
  const height = imagePreview.naturalHeight;

  if (!width || !height) return;

  const size = Number(halftoneSize.value);
  const angle = Number(halftoneAngle.value);
  const contrast = Number(halftoneContrast.value);

  effectCanvas.width = width;
  effectCanvas.height = height;

  effectCtx.clearRect(0, 0, width, height);
  effectCtx.filter = `blur(${halftoneBlur.value}px)`;
  effectCtx.drawImage(imagePreview, 0, 0, width, height);

  effectCtx.filter = "none";

  const imageData = effectCtx.getImageData(0, 0, width, height);

  const pixels = imageData.data;

  let backgroundColor;
  if (colorMode.value === "source") {
    backgroundColor = "#FFFFFF";
  } else {
    const color = hexToRgb(color1.value);
    backgroundColor = `rgb(
        ${color.r},
        ${color.g},
        ${color.b}
        )`;
  }

  effectCtx.fillStyle = backgroundColor;

  effectCtx.fillRect(0, 0, width, height);

  const contrastFactor = contrast / 100;
  const radians = (angle * Math.PI) / 180;

  const cos = Math.cos(radians);
  const sin = Math.sin(radians);

  const cellSize = size;

  const centerX = width / 2;
  const centerY = height / 2;

  const diagonal = Math.sqrt(width * width + height * height);

  for (let screenY = -diagonal; screenY <= diagonal; screenY += cellSize) {
    for (let screenX = -diagonal; screenX <= diagonal; screenX += cellSize) {
      const canvasX = centerX + screenX * cos - screenY * sin;

      const canvasY = centerY + screenX * sin + screenY * cos;

      const imageX = canvasX;

      const imageY = canvasY;

      if (imageX < 0 || imageX >= width || imageY < 0 || imageY >= height) {
        continue;
      }

      const sampleX = Math.floor(imageX);
      const sampleY = Math.floor(imageY);

      const index = (sampleY * width + sampleX) * 4;

      const r = pixels[index];
      const g = pixels[index + 1];
      const b = pixels[index + 2];

      let brightness = 0.299 * r + 0.587 * g + 0.114 * b;

      brightness = 128 + (brightness - 128) * contrastFactor;

      brightness = Math.max(0, Math.min(255, brightness));

      const luminance = brightness / 255;
      const inverseLuminance = 1 - luminance;

      const radius = cellSize * 0.5 * inverseLuminance;

      let dotColor;
      if (colorMode.value === "two") {
        const color = hexToRgb(color2.value);

        dotColor = `rgb(
                    ${color.r},
                    ${color.g},
                    ${color.b})`;
      } else if (colorMode.value === "gradient") {
        const start = hexToRgb(color1.value);
        const end = hexToRgb(color2.value);

        const t = inverseLuminance;

        const red = Math.round(start.r + (end.r - start.r) * t);

        const green = Math.round(start.g + (end.g - start.g) * t);

        const blue = Math.round(start.b + (end.b - start.b) * t);

        dotColor = `rgb(${red}, ${green}, ${blue})`;
      } else if (colorMode.value === "source") {
        dotColor = `rgb(${r}, ${g}, ${b})`;
      }

      if (radius < 0.25) {
        continue;
      }

      effectCtx.fillStyle = dotColor;
      effectCtx.beginPath();

      effectCtx.arc(canvasX, canvasY, radius, 0, Math.PI * 2);

      effectCtx.fill();
    }
  }

  effectCanvas.style.display = "block";
}

function renderNoise() {
  const width = imagePreview.naturalWidth;
  const height = imagePreview.naturalHeight;

  if (!width || !height) return;

  const amount = Number(noiseAmount.value);
  const size = Number(noiseSize.value);
  const density = Number(noiseDensity.value);
  const contrast = Number(noiseContrast.value);

  effectCanvas.width = width;
  effectCanvas.height = height;

  effectCtx.clearRect(0, 0, width, height);

  effectCtx.drawImage(imagePreview, 0, 0, width, height);

  const imageData = effectCtx.getImageData(0, 0, width, height);

  const pixels = imageData.data;

  const contrastFactor = contrast / 100;

  for (let y = 0; y < height; y += size) {
    for (let x = 0; x < width; x += size) {
      if (Math.random() * 100 > density) {
        continue;
      }
      let noise = (Math.random() - 0.5) * amount * 2;

      for (let yy = 0; yy < size && y + yy < height; yy++) {
        for (let xx = 0; xx < size && x + xx < width; xx++) {
          const index = ((y + yy) * width + (x + xx)) * 4;

          for (let c = 0; c < 3; c++) {
            let value = pixels[index + c];

            value = 128 + (value - 128) * contrastFactor;

            value = value + noise;

            pixels[index + c] = Math.max(0, Math.min(255, value));
          }
        }
      }
    }
  }
  effectCtx.putImageData(imageData, 0, 0);
  effectCanvas.style.display = "block";
}

function renderDither() {
  const width = imagePreview.naturalWidth;
  const height = imagePreview.naturalHeight;

  if (!width || !height) return;

  const size = Number(ditherSize.value);
  const contrast = Number(ditherContrast.value);

  effectCanvas.width = width;
  effectCanvas.height = height;

  effectCtx.clearRect(0, 0, width, height);

  effectCtx.drawImage(imagePreview, 0, 0, width, height);

  const imageData = effectCtx.getImageData(0, 0, width, height);

  const pixels = imageData.data;

  const bayer = [
    [0, 8, 2, 10],
    [12, 4, 14, 6],
    [3, 11, 1, 9],
    [15, 7, 13, 5],
  ];

  const contrastFactor = contrast / 100;

  for (let y = 0; y < height; y += size) {
    for (let x = 0; x < width; x += size) {
      const index = (y * width + x) * 4;

      let brightness =
        0.299 * pixels[index] +
        0.587 * pixels[index + 1] +
        0.114 * pixels[index + 2];

      brightness = 128 + (brightness - 128) * contrastFactor;

      brightness = Math.max(0, Math.min(255, brightness));

      const trsh =
        (bayer[Math.floor(y / size) % 4][Math.floor(x / size) % 4] + 0.5) * 16;

      const value = brightness > trsh ? 255 : 0;

      for (let yy = 0; yy < size && y + yy < height; yy++) {
        for (let xx = 0; xx < size && x + xx < width; xx++) {
          const pixelIndex = ((y + yy) * width + (x + xx)) * 4;

          pixels[pixelIndex] = value;
          pixels[pixelIndex + 1] = value;
          pixels[pixelIndex + 2] = value;
        }
      }
    }
  }

  effectCtx.putImageData(imageData, 0, 0);

  effectCanvas.style.display = "block";
}

function renderPixelate() {
  const width = imagePreview.naturalWidth;
  const height = imagePreview.naturalHeight;

  if (!width || !height) return;

  const size = Number(pixelateSize.value);
  const contrast = Number(pixelateContrast.value);

  effectCanvas.width = width;
  effectCanvas.height = height;

  effectCtx.clearRect(0, 0, width, height);
  effectCtx.imageSmoothingEnabled = false;

  const smallWidth = Math.max(1, Math.round(width / size));
  const smallHeight = Math.max(1, Math.round(height / size));

  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = smallWidth;
  tempCanvas.height = smallHeight;

  const tempCtx = tempCanvas.getContext("2d");
  tempCtx.imageSmoothingEnabled = true;
  tempCtx.filter = `contrast(${contrast}%)`;
  tempCtx.drawImage(imagePreview, 0, 0, smallWidth, smallHeight);
  tempCtx.filter = "none";

  effectCtx.drawImage(
    tempCanvas,
    0,
    0,
    smallWidth,
    smallHeight,
    0,
    0,
    width,
    height,
  );

  effectCanvas.style.display = "block";
}

function renderCurrentEffect() {
  const activeEffect =
    document.querySelector(".effect-btn.active").dataset.effect;

  if (activeEffect === "noise") {
    renderNoise();
  } else if (activeEffect === "dither") {
    renderDither();
  } else if (activeEffect === "pixelate") {
    renderPixelate();
  } else if (activeEffect === "analog") {
    renderAnalog();
  } else {
    renderHalftone();
  }

  const blendAmount = Number(blend.value) / 100;

  if (blendAmount < 1) {
    effectCtx.globalAlpha = 1 - blendAmount;
    effectCtx.drawImage(imagePreview, 0, 0);
    effectCtx.globalAlpha = 1;
  }
}

function renderAnalog() {
  const effect = analogEffect.value;

  if (effect === "photocopy") {
    renderPhotocopy();
  } else if (effect === "stamp") {
    renderStamp();
  } else if (effect === "newsprint") {
    renderNewsprint();
  }
}

function renderPhotocopy() {
  const width = imagePreview.naturalWidth;
  const height = imagePreview.naturalHeight;

  if (!width || !height) return;

  effectCanvas.width = width;
  effectCanvas.height = height;

  effectCtx.clearRect(0, 0, width, height);

  effectCtx.drawImage(imagePreview, 0, 0, width, height);

  const imageData = effectCtx.getImageData(0, 0, width, height);
  const pixels = imageData.data;

  for (let i = 0; i < pixels.length; i += 4) {
    const brightness =
      0.299 * pixels[i] + 0.587 * pixels[i + 1] + 0.114 * pixels[i + 2];

    const value = brightness > Number(photocopytrsh.value) ? 255 : 0;

    pixels[i] = value;
    pixels[i + 1] = value;
    pixels[i + 2] = value;
  }

  effectCtx.putImageData(imageData, 0, 0);
  effectCanvas.style.display = "block";
}

function renderNewsprint() {
  const width = imagePreview.naturalWidth;
  const height = imagePreview.naturalHeight;

  if (!width || !height) return;

  effectCanvas.width = width;
  effectCanvas.height = height;

  effectCtx.clearRect(0, 0, width, height);
  effectCtx.drawImage(imagePreview, 0, 0, width, height);

  const imageData = effectCtx.getImageData(0, 0, width, height);
  const pixels = imageData.data;

  effectCtx.fillStyle = "#ffffff";
  effectCtx.fillRect(0, 0, width, height);
  effectCtx.fillStyle = "#000000";

  const cellSize = 6;
  const angle = 45;
  const radians = (angle * Math.PI) / 180;

  const cos = Math.cos(radians);
  const sin = Math.sin(radians);

  const centerX = width / 2;
  const centerY = height / 2;

  const diagonal = Math.sqrt(width * width + height * height);

  for (let screenY = -diagonal; screenY <= diagonal; screenY += cellSize) {
    for (let screenX = -diagonal; screenX <= diagonal; screenX += cellSize) {
      const canvasX = centerX + screenX * cos - screenY * sin;
      const canvasY = centerY + screenX * sin + screenY * cos;

      if (canvasX < 0 || canvasX >= width || canvasY < 0 || canvasY >= height) {
        continue;
      }

      const sampleX = Math.floor(canvasX);
      const sampleY = Math.floor(canvasY);
      const index = (sampleY * width + sampleX) * 4;

      const brightness =
        0.299 * pixels[index] +
        0.587 * pixels[index + 1] +
        0.114 * pixels[index + 2];

      const inverseLuminance = 1 - brightness / 255;
      const radius = cellSize * 0.5 * inverseLuminance;

      if (radius < 0.25) {
        continue;
      }

      effectCtx.beginPath();
      effectCtx.arc(canvasX, canvasY, radius, 0, Math.PI * 2);
      effectCtx.fill();
    }
  }

  effectCanvas.style.display = "block";
}

function renderStamp() {
  const width = imagePreview.naturalWidth;
  const height = imagePreview.naturalHeight;

  if (!width || !height) return;

  const trsh = Number(stamptrsh.value);
  const spread = Number(stampSpread.value);
  const tex = Number(stampTex.value);

  effectCanvas.width = width;
  effectCanvas.height = height;

  effectCtx.clearRect(0, 0, width, height);

  effectCtx.drawImage(imagePreview, 0, 0, width, height);

  const imageData = effectCtx.getImageData(0, 0, width, height);
  const pixels = imageData.data;

  for (let i = 0; i < pixels.length; i += 4) {
    const brightness =
      0.299 * pixels[i] + 0.587 * pixels[i + 1] + 0.114 * pixels[i + 2];

    const value = brightness > trsh ? 255 : 0;

    pixels[i] = value;
    pixels[i + 1] = value;
    pixels[i + 2] = value;
  }

  if (spread > 0) {
    const originalPixels = new Uint8Array(pixels);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;

        if (originalPixels[index] === 0) {
          for (let dy = -spread; dy <= spread; dy++) {
            for (let dx = -spread; dx <= spread; dx++) {
              const newX = x + dx;
              const newY = y + dy;

              if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
                const newIndex = (newY * width + newX) * 4;

                pixels[newIndex] = 0;
                pixels[newIndex + 1] = 0;
                pixels[newIndex + 2] = 0;
              }
            }
          }
        }
      }
    }
  }

  if (tex > 0) {
    for (let i = 0; i < pixels.length; i += 4) {
      if (pixels[i] === 0 && Math.random() * 100 < tex) {
        pixels[i] = 255;
        pixels[i + 1] = 255;
        pixels[i + 2] = 255;
      }
    }
  }
  effectCtx.putImageData(imageData, 0, 0);
  effectCanvas.style.display = "block";
}
