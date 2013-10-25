YUI.add("aui-widget-toolbars", function (e, t) {
    var n = e.WidgetStdMod, r = "boundingBox", i = "toolbars", s = "syncUI", o = "toolbarsChange", u = function () {
    };
    u.ATTRS = {toolbars: {}, toolbarPosition: {value: {body: n.AFTER, footer: n.AFTER, header: n.BEFORE}}}, u.prototype = {toolbars: null, initializer: function () {
        var t = this;
        t.toolbars = {}, e.after(t._syncUIToolbars, t, s), t.after(o, t._afterToolbarsChange)
    }, addToolbar: function (t, n) {
        var i = this;
        return n = i.getToolbarSection(n), i.removeToolbar(n), e.instanceOf(t, e.Toolbar) || (t = new e.Toolbar({children: t, render: i.getStdModNode(n, !0)})), t.addTarget(i), i.toolbars[n] = t, i.setStdModContent(n, t.get(r), i.get("toolbarPosition." + n)), i._syncPrimaryButtonUI(), t
    }, getToolbar: function (e) {
        var t = this;
        return t.toolbars[t.getToolbarSection(e)]
    }, getToolbarSection: function (e) {
        return e || n.FOOTER
    }, removeToolbar: function (e) {
        var t = this, n = t.toolbars[t.getToolbarSection(e)];
        return n && n.destroy(), n
    }, _syncPrimaryButtonUI: function () {
        var t = this, n = t.get(r).one("." + e.ButtonCore.CLASS_NAMES.PRIMARY);
        n && n.focus().focus()
    }, _syncUIToolbars: function () {
        var e = this;
        e._uiSetToolbars(this.get(i))
    }, _uiSetToolbars: function (t) {
        var n = this;
        e.each(t, e.bind(n.addToolbar, n))
    }}, e.WidgetToolbars = u
}, "2.0.0pr7", {requires: ["widget-stdmod", "aui-toolbar"]});
