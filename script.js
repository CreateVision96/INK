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

    if (selectedEffect === "noise" || selectedEffect === "dither") {
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

    if (selectedEffect === "noise") {
      renderNoise();
    } else if (selectedEffect === "dither") {
      renderDither();
    } else if (selectedEffect === "halftone") {
      renderHalftone();
    }
  });
});

const halftoneSize = document.getElementById("halftone-size");
const halftoneSizeValue = document.getElementById("halftone-size-value");

const halftoneAngle = document.getElementById("halftone-angle");
const halftoneAngleValue = document.getElementById("halftone-angle-value");

const halftoneContrast = document.getElementById("halftone-contrast");
const halftoneContrastValue = document.getElementById(
  "halftone-contrast-value",
);

const halftoneBlur = document.getElementById("halftone-blur");
const halftoneBlurValue = document.getElementById("halftone-blur-value");

const colorMode = document.getElementById("color-mode");
const colorControls = document.getElementById("color-ctrls");

const color1 = document.getElementById("color1");
const color2 = document.getElementById("color2");

colorMode.addEventListener("change", () => {
  if (colorMode.value === "source") {
    colorControls.classList.add("hidden");
  } else {
    colorControls.classList.remove("hidden");
  }
  if (imagePreview.src) {
    renderHalftone();
  }
});

color1.addEventListener("input", () => {
  if (imagePreview.src) {
    renderHalftone();
  }
});

color2.addEventListener("input", () => {
  if (imagePreview.src) {
    renderHalftone();
  }
});

halftoneSize.addEventListener("input", () => {
  halftoneSizeValue.textContent = halftoneSize.value;
  if (imagePreview.src) {
    renderHalftone();
  }
});
halftoneAngle.addEventListener("input", () => {
  halftoneAngleValue.textContent = `${halftoneAngle.value}°`;
  if (imagePreview.src) {
    renderHalftone();
  }
});
halftoneContrast.addEventListener("input", () => {
  halftoneContrastValue.textContent = halftoneContrast.value;
  if (imagePreview.src) {
    renderHalftone();
  }
});

halftoneBlur.addEventListener("input", () => {
  halftoneBlurValue.textContent = halftoneBlur.value;
  if (imagePreview.src) {
    renderHalftone();
  }
});

const noiseAmount = document.getElementById("noise-amount");
const noiseAmountValue = document.getElementById("noise-amount-value");

const noiseSize = document.getElementById("noise-size");
const noiseSizeValue = document.getElementById("noise-size-value");

const noiseDensity = document.getElementById("noise-density");
const noiseDenstyValue = document.getElementById("noise-density-value");

const noiseContrast = document.getElementById("noise-contrast");
const noiseContrastValue = document.getElementById("noise-contrast-value");

const ditherSize = document.getElementById("dither-size");
const ditherSizeValue = document.getElementById("dither-size-value");

const ditherContrast = document.getElementById("dither-contrast");
const ditherContrastValue = document.getElementById("dither-contrast-value");

noiseDensity.addEventListener("input", () => {
  noiseDenstyValue.textContent = noiseDensity.value;
  if (imagePreview.src) {
    renderNoise();
  }
});

noiseContrast.addEventListener("input", () => {
  noiseContrastValue.textContent = noiseContrast.value;
  if (imagePreview.src) {
    renderNoise();
  }
});

noiseAmount.addEventListener("input", () => {
  noiseAmountValue.textContent = noiseAmount.value;

  if (imagePreview.src) {
    renderNoise();
  }
});
noiseSize.addEventListener("input", () => {
  noiseSizeValue.textContent = noiseSize.value;

  if (imagePreview.src) {
    renderNoise();
  }
});

ditherSize.addEventListener("input", () => {
  ditherSizeValue.textContent = ditherSize.value;
  if (imagePreview.src) {
    renderDither();
  }
});
ditherContrast.addEventListener("input", () => {
  ditherContrastValue.textContent = ditherContrast.value;
  if (imagePreview.src) {
    renderDither();
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

      const threshold =
        (bayer[Math.floor(y / size) % 4][Math.floor(x / size) % 4] + 0.5) * 16;

      const value = brightness > threshold ? 255 : 0;

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
