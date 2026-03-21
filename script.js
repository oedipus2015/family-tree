// ==========================
// ログ関数
// ==========================
function log(msg, type="info") {
    const logDiv = document.getElementById("log");

    let color = "#00ff00";
    if (type === "error") color = "#ff4444";
    if (type === "warn") color = "#ffff00";

    const time = new Date().toLocaleTimeString();

    logDiv.innerHTML += `<span style="color:${color}">[${time}] ${msg}</span><br>`;
    logDiv.scrollTop = logDiv.scrollHeight;
}

function toggleLog() {
    const logDiv = document.getElementById("log");
    logDiv.style.display = (logDiv.style.display === "none") ? "block" : "none";
}

function clearLog() {
    document.getElementById("log").innerHTML = "";
}

// ==========================
// 数値変換
// ==========================
function toNum(v) {
    if (!v) return null;
    const n = Number(v);
    return isNaN(n) ? null : n;
}

// ==========================
// 自動CSV読み込み
// ==========================
window.addEventListener("DOMContentLoaded", () => {
    loadCSV("a.csv?v=" + Date.now());
});

function loadCSV(path) {
    log("CSV自動読み込み開始");

    fetch(path)
        .then(res => {
            if (!res.ok) throw new Error("CSV取得失敗");
            return res.text();
        })
        .then(csv => {
            log("CSV取得OK");
            parseCSV(csv);
        })
        .catch(err => {
            log("エラー: " + err.message, "error");
        });
}

// ==========================
// CSV解析
// ==========================
function parseCSV(csv) {
    const lines = csv.split(/\r?\n/);
    log("行数: " + lines.length);

    const dataLines = lines.slice(1);

    const nodes = [];
    const spouseMap = {};

    dataLines.forEach((line, index) => {
        if (!line.trim()) return;

        const cols = line.split(",").map(v => v.trim());
        
        while (cols.length < 6) {
        	cols.push("");
    	}

        if (cols.length < 6) {
            log("列不足: " + line, "warn");
            return;
        }

        const id = toNum(cols[0]);
        const name = cols[1];
        const desc = cols[2];
        const father = toNum(cols[4]);
        const img = cols[5];

        log("pid type: " + typeof father + " value:" + father);

        let node = {
            id: id,
            name: name,
            desc: desc,
            img: img || "img/dummy.jpg"
        };

		// 父だけで構築
		if (father) {
		    node.pid = father;
		}

		log("node: " + JSON.stringify(node));

        nodes.push(node);
    });

    log("ノード数: " + nodes.length);

    if (nodes.length === 0) {
        log("ノードが空", "error");
        return;
    }

    // ==========================
    // テンプレート
    // ==========================

    // ==========================
    // 描画
    // ==========================
	nodes.sort((a, b) => a.id - b.id);

	const rootIds = nodes.filter(n => !n.pid).map(n => n.id);

	const tree = new FamilyTree(document.getElementById("tree"), {
	    template: "myTemplate",
	    nodes: nodes,

	    nodeBinding: {
	        field_0: "desc",
	        field_1: "name",
	        img_0: "img"
	    },

	    layout: FamilyTree.layout.tree,
	    orientation: FamilyTree.orientation.top,

	    scaleInitial: FamilyTree.match.boundary
	});

    tree.on('click', function(sender, args){
        alert(args.node.name + "\n" + args.node.desc);
    });

    setTimeout(() => {
        tree.fit();
        tree.center();
    }, 500);

    log("描画完了");
}