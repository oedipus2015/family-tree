document.addEventListener("DOMContentLoaded", () => {

    fetch("seiwa-genji.json")
        .then(res => res.json())
        .then(nodes => {

            const chart = new OrgChart(document.getElementById("tree"), {
                template: "olivia",

                nodeBinding: {
                    field_0: "name",
                    field_1: "title",
                    img_0: "img",
                    wiki: "wiki"
                },

            editForm: {
                readOnly: true,
                photoBinding: "img",
            
                buttons: {
                    wiki: {
                        icon: OrgChart.icon.link,
                        text: "Wikipedia",
                        onClick: function (nodeId) {
                            const node = chart.get(nodeId);
                            if (node.wiki) {
                                window.open(node.wiki, "_blank");
                            }
                        }
                    }
                }
            }

                nodeClick: (node) => {
                    showPanel(node);
                }
            });

            OrgChart.templates.olivia.link =
                '<a href="{val}" target="_blank" style="position:absolute;bottom:5px;right:5px;">' +
                    '<img src="https://upload.wikimedia.org/wikipedia/commons/6/63/Wikipedia-logo.png" style="width:20px;height:20px;">' +
                '</a>';
            
            chart.load(nodes);


        })
        .catch(err => {
            console.error("JSON 読み込みエラー:", err);
        });

});


// ★ 右パネル表示
function showPanel(node) {
    document.getElementById("panel-img").src = node.img || "";
    document.getElementById("panel-name").textContent = node.name || "";
    document.getElementById("panel-title").textContent = node.title || "";

    // ★ textarea に入れる（改行OK）
    document.getElementById("panel-desc").value = node.desc || "";

    document.getElementById("side-panel").classList.remove("hidden");
}

function hidePanel() {
    document.getElementById("side-panel").classList.add("hidden");
}
