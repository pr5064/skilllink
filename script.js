let generated = 0;
let used = 0;
let lights = 0;
let cctv = 0;
let sensors = 0;

function updateValues() {
  let powerGenerated = (Math.random() * 2 + 1) / 3600; // ~1–3W in kWh/sec
  generated += powerGenerated;

  // Random simulated usage distribution
  lights += powerGenerated * 0.4;
  cctv += powerGenerated * 0.3;
  sensors += powerGenerated * 0.2;
  used = lights + cctv + sensors;

  let saved = generated - used;
  if (saved < 0) saved = 0;

  document.getElementById("generated").textContent = generated.toFixed(2);
  document.getElementById("used").textContent = used.toFixed(2);
  document.getElementById("saved").textContent = saved.toFixed(2);

  document.getElementById("lights").textContent = lights.toFixed(2);
  document.getElementById("cctv").textContent = cctv.toFixed(2);
  document.getElementById("sensors").textContent = sensors.toFixed(2);

  updateSuggestion(saved);
}

function updateSuggestion(savedKWh) {
  let message = "";
  if (savedKWh >= 0.5) {
    message = `You can power 10 LED streetlights for 5 hours!`;
  } else if (savedKWh >= 0.1) {
    message = `Enough to charge 200 smartphones.`;
  } else {
    message = `Saving up... Keep generating!`;
  }
  document.getElementById("suggestion").textContent = message;
}

setInterval(updateValues, 1000); // update every second
// Your existing simulation code goes here (the one you provided earlier)
// ...

// Example:
// setInterval(updateValues, 1000);
