YUI.add("aui-color-picker-popover", function (e, t) {
    var n = e.Lang, r = e.Node, i = e.getClassName, s = "color-picker-popover", o = e.Base.create(s, e.Popover, [e.ColorPickerBase, e.WidgetAutohide, e.WidgetCssClass, e.WidgetToggle], {}, {ATTRS: {align: {validator: n.isObject, value: {points: [e.WidgetPositionAlign.TC, e.WidgetPositionAlign.BC]}}, visible: {validator: n.isBoolean, value: !1}}, NAME: s, NS: s});
    e.ColorPickerPopover = o
}, "2.0.0pr7", {requires: ["aui-color-picker-base", "aui-popover", "aui-widget-cssclass", "aui-widget-toggle"], skinnable: !0});
