document.addEventListener("DOMContentLoaded", () => {

  fetch("a.csv")
    .then(res => res.text())
    .then(text => {

      const lines = text.trim().split(/\r?\n/);
      const headers = lines[0].split(",");

      let nodes = lines.slice(1).map(line => {

        const cols = line.split(",");

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
