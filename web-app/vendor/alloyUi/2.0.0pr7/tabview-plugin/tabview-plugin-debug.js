YUI.add('tabview-plugin', function (Y, NAME) {

    function TabviewPlugin() {
        TabviewPlugin.superclass.constructor.apply(this, arguments);
    }

    TabviewPlugin.NAME = 'tabviewPlugin';
    TabviewPlugin.NS = 'tabs';

    Y.extend(TabviewPlugin, Y.TabviewBase);

    Y.namespace('Plugin');
    Y.Plugin.Tabview = TabviewPlugin;


}, 'patched-dev-3.x', {"requires": ["tabview-base"]});
