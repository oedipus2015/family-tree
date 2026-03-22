document.addEventListener("DOMContentLoaded", () => {

    fetch("seiwa-genji.json")
        .then(res => res.json())
        .then(nodes => {

            const chart = new OrgChart(document.getElementById("tree"), {
                template: "olivia",

                nodeBinding: {
                    field_0: "name",
                    field_1: "title",
                    field_2: "desc",
                    img_0: "img",
                    wiki: "wiki"
                },

                // ★ 標準ポップアップを開く
                nodeClick: OrgChart.action.edit,

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
            });

            // ★ ここは削除！ textarea に変えると壊れる
            // OrgChart.templates.olivia.field_2 = ...

            chart.load(nodes);

        })
        .catch(err => {
            console.error("JSON 読み込みエラー:", err);
        });

});
