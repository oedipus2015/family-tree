document.addEventListener("DOMContentLoaded", () => {

  fetch("a.csv")
    .then(res => res.text())
    .then(text => {

      // Windows対策込み
      const lines = text.trim().split(/\r?\n/);

      const headers = lines[0].split(",");

      const nodes = lines.slice(1).map(line => {
        const cols = line.split(",");

        let row = {};
        headers.forEach((h, i) => {
          row[h.trim()] = cols[i] ? cols[i].trim() : "";
        });

        // ★ ここが超重要
        const id = Number(row.id);
        const pid = row.father !== "" ? Number(row.father) : null;

        return {
          id: id,
          pid: pid,

          name: row.name || "",
          desc: row.desc || "",
          gender: row.gender || "",
          img: row.img || ""
        };
      });

      // デバッグ（確認用）
      console.log(nodes);

      // ★ ツリー生成
      new FamilyTree(document.getElementById("tree"), {
        orientation: FamilyTree.orientation.top, // ←縦
        layout: FamilyTree.layout.normal,

        nodeBinding: {
          field_0: "name",
          field_1: "desc"
        },

        nodes: nodes
      });

    });

});
