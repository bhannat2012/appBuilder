YUI().use(
    'aui-tree-view',
    function(Y) {
        // Create an array object for the tree root and child nodes
        var children = [
            {
                children: [
                    {
                        label: 'File X1234567'
                    },
                    {
                        label: 'File Y'
                    },
                    {
                        label: 'File Z'
                    }
                ],
                expanded: true,
                label: 'Project'
            }
        ];

        // Create a TreeView Component
        new Y.TreeView(
            {
                boundingBox: '#myTreeView',
                children: children,
                width:'100%'
            }
        ).render();
    }
);

YUI().use(
    'aui-tabview',
    function(Y) {
        new Y.TabView(
            {
                srcNode: '#myTab'
            }
        ).render();
    }
);

YUI().use(
    'aui-ace-editor',
    function(Y) {
        new Y.AceEditor(
            {
                boundingBox: '#myEditor',
                mode: 'java',
                height:'450px' ,
                width:'100%'
            }
        ).render();
    }
);

$(function () {
    $('#myTab a:last').tab('show')
})