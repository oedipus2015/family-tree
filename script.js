fetch("seiwa-genji.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("timeline");

    data.forEach(person => {
      const div = document.createElement("div");
      div.className = "item";

      div.innerHTML = `
        <h3>${person.name}</h3>
        <p>${person.title}</p>
        <a href="${person.wiki}" target="_blank">Wikipedia</a>
      `;

      container.appendChild(div);
    });
  });
