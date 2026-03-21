// ==========================
// CSV 1行パース（カンマ対策）
// ==========================
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

// ==========================
// メイン処理
// ==========================
document.addEventListener("DOMContentLoaded", () => {

  fetch("a.csv")
    .then(res => res.text())
    .then(text => {

      // 改行対応
      const lines = text.trim().split(/\r?\n/);

      // ヘッダー
      const headers = lines[0].split(",");

      // ==========================
      // ノード生成
      // ==========================
      let nodes = lines.slice(1).map(line => {

        const cols = parseCSVLine(line);

        let row = {};
        headers.forEach((h, i) => {
          row[h.trim()] = cols[i] ? cols[i].trim() : "";
        });

        // ==========================
        // ★ 完全型変換（最重要）
        // ==========================
        const id = Number(String(row.id).trim());

        const cleanFather = String(row.father)
          .replace(/[^\d]/g, "")   // 数字以外除去
          .trim();

        const pid = cleanFather !== "" ? Number(cleanFather) : null;

        // デバッグ
        console.log("ID:", id, "PID:", pid);

        return {
          id: id,
          pid: pid,
          name: row.name || "",
          desc: row.desc || "",
          gender: row.gender || "",
          img: row.img || ""
        };
      });

      // ==========================
      // ★ 並び順修正（親→子）
      // ==========================
      nodes.sort((a, b) => a.id - b.id);

      console.log("FINAL NODES:", nodes);

      // ==========================
      // ツリー生成
      // ==========================
      new FamilyTree(document.getElementById("tree"), {

        // 縦ツリー
        orientation: FamilyTree.orientation.top,

        // レイアウト安定
        layout: FamilyTree.layout.normal,

        // ★ 強制ルート指定（最終保険）
        roots: [1],

        // 表示設定
        nodeBinding: {
          field_0: "name",
          field_1: "desc",
          img_0: "img"
        },

        // 操作
        scaleInitial: 0.8,
        mouseScrool: FamilyTree.action.zoom,

        nodes: nodes
      });

    })
    .catch(err => {
      console.error("CSV読み込みエラー:", err);
    });

});
