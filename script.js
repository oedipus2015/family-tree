// ==========================
// CSV読み込み
// ==========================
function loadCSV(url) {
  return fetch(url)
    .then(response => response.text())
    .then(text => {
      const lines = text.trim().split("\n");

      const headers = lines[0].split(",");

      const data = lines.slice(1).map(line => {
        const cols = line.split(",");

        let obj = {};
        headers.forEach((header, index) => {
          obj[header.trim()] = cols[index] ? cols[index].trim() : "";
        });

        return obj;
      });

      return data;
    });
}

// ==========================
// ノード変換
// ==========================
function convertToNodes(data) {
  return data.map(row => {
    return {
      id: parseInt(row.id),
      name: row.name || "",
      desc: row.desc || "",
      gender: row.gender || "",

      // ★ 縦ツリーの核心
      pid: row.father ? parseInt(row.father) : null,

      img: row.img || ""
    };
  });
}

// ==========================
// 初期化
// ==========================
document.addEventListener("DOMContentLoaded", () => {

  loadCSV("a.csv").then(data => {

    const nodes = convertToNodes(data);

    console.log(nodes);

    new FamilyTree(document.getElementById("tree"), {

      // ★ 縦ツリー
      orientation: FamilyTree.orientation.top,

      layout: FamilyTree.layout.normal,

      nodeBinding: {
        field_0: "name",
        field_1: "desc",
        img_0: "img"
      },

      scaleInitial: 0.8,
      mouseScrool: FamilyTree.action.zoom,

      nodes: nodes
    });

  });

});
