function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateAlert() {
  const createdAt = new Date();
  const durationMinutes = getRandomInt(3, 5);
  const endAt = new Date(createdAt.getTime() + durationMinutes * 60 * 1000);

  const zone = getRandomInt(1, 5);
  let type;

  if (zone === 1 || zone === 5) {
    type = "seisme";
  } else if (zone === 2 || zone === 4) {
    type = "innondation";
  } else {
    type = Math.random() < 0.5 ? "seisme" : "innondation";
  }

  const alertData = {
    status: "En cours",
    intensity: getRandomInt(1, 10),
    zone,
    type,
    created_at: createdAt.toISOString(),
    end_at: endAt.toISOString(),
  };

  console.log(JSON.stringify(alertData));

  fetch("http://localhost:3000/alerts/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(alertData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Script alert sent:", data);
    })
    .catch((error) => {
      console.error("Error sending alert:", error);
    });
}

function startAlertGenerator() {
  console.log("Starting alert generator...");
  (function loop() {
    const delay = getRandomInt(0.1 * 60 * 1000, 0.2 * 60 * 1000);
    setTimeout(() => {
      generateAlert();
      loop();
    }, delay);
  })();
}

startAlertGenerator();
