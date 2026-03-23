FamilyTree.templates.custom = {
    size: [200, 80],
    node:
        '<rect x="0" y="0" width="200" height="80" fill="#fff" stroke="#000"></rect>' +
        '<text x="10" y="40" font-size="16">{val}</text>',
    field_0: '{val}'
};

const chart = new FamilyTree(document.getElementById("tree"), {
    template: "custom",
    nodeBinding: {
        field_0: "name"
    }
});
