document.addEventListener("DOMContentLoaded", () => {

    // ★ JSON を読み込む
    fetch("seiwa-genji.json")
        .then(res => res.json())
        .then(nodes => {

            // ★ OrgChart 初期化
            const chart = new OrgChart(document.getElementById("tree"), {
                template: "olivia",

                nodeBinding: {
                    field_0: "name",
                    field_1: "title",
                    field_2: "desc",
                    img_0: "img"
                },

                editForm: {
                    readOnly: true,
                    photoBinding: "img"
                }
            });

            // ★ desc を textarea に変える魔法のコード（ここが超重要！！）
            OrgChart.templates.olivia.desc =
                '<textarea class="oc-desc" style="width:100%;height:auto;white-space:pre-wrap;word-break:break-word;border:none;background:transparent;" readonly>{val}</textarea>';

            // ★ データ読み込み
            chart.load(nodes);

        })
        .catch(err => {
            console.error("JSON 読み込みエラー:", err);
        });

});
