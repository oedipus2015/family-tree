document.addEventListener("DOMContentLoaded", () => {

  function parseCSVLine(line) {
    const result = [];
    let current = "";
    let inQuotes = false;
  
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
  
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current);
        current = "";
      } else {
        current += char;
      }
    }
  
    result.push(current);
    return result;
  }  
  fetch("a.csv")
    .then(res => res.text())
    .then(text => {

      const lines = text.trim().split(/\r?\n/);
      const headers = lines[0].split(",");

      let nodes = lines.slice(1).map(line => {

        const cols = parseCSVLine(line);

        let row = {};
        headers.forEach((h, i) => {
          row[h.trim()] = cols[i] ? cols[i].trim() : "";
        });

        const id = parseInt(row.id);
        const pid = row.father ? parseInt(row.father) : null;

        return {
          id: id,
          pid: pid,
          name: row.name || "",
          desc: row.desc || ""
        };
      });

      // ★これが決定打
      nodes.sort((a, b) => a.id - b.id);

      new FamilyTree(document.getElementById("tree"), {
        orientation: FamilyTree.orientation.top,
        layout: FamilyTree.layout.normal,
        nodeBinding: {
          field_0: "name",
          field_1: "desc"
        },
        nodes: nodes
      });

    });

});
