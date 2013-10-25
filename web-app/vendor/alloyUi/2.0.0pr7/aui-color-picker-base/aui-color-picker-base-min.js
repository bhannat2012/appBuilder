YUI.add("aui-color-picker-base", function (e, t) {
    function z(e) {
    }

    var n = e.Array, r = e.Widget, i = e.Lang, s = e.getClassName, o = "color-picker-inline", u = "data-index", a = "data-value", f = "#FFF", l = 10, c = "FF0000", h = ".", p = "", d = -1, v = "#", m = "boundingBox", g = "click", y = "clickoutside", b = "color", w = "colorChange", E = "colorPalette", S = "contentBox", x = "hsvPalette", T = "items", N = "sourceRecentColor", C = "recentColors", k = "renderColorPalette", L = "renderHSVPalette", A = "select", O = "selected", M = "selectedChange", _ = "strings", D = "trigger", P = "unselect", H = "visible", B = "visibleChange", j = "zIndex", F = s("color-picker-nocolor"), I = s("color-picker-nocolor-icon"), q = s("color-picker-trigger"), R = s("hsv-trigger"), U = s("actions-container");
    z.prototype = {TPL_HEADER_CONTENT: "<h3>{header}</h3>", TPL_ACTIONS: '<div class="row-fluid ' + U + '"></div', TPL_HSV_TRIGGER: '<div class="span6 ' + R + '">{more}</div>', TPL_NO_COLOR: '<div class="span6 ' + F + '">' + '<a href class="btn-link"><i class="' + I + ' icon-remove-circle"></i>{none}</a>' + "</div>", _currentTrigger: null, _eventHandles: null, _hsvPaletteModal: null, initializer: function () {
        var t = this;
        t._eventHandles = [], e.after(t._rendererUICPBase, t, "renderer")
    }, destructor: function () {
        var t = this;
        t._recentColorsPalette && t._recentColorsPalette.destroy(), t._colorPalette && t._colorPalette.destroy(), (new e.EventHandle(t._eventHandles)).detach()
    }, reset: function () {
        var e = this;
        e.set(b, p, {src: r.UI_SRC}), e._colorPalette && e._colorPalette.set(O, d, {src: r.UI_SRC}), e._recentColorsPalette && e._recentColorsPalette.set(O, d, {src: r.UI_SRC})
    }, _bindTrigger: function () {
        var t = this, n, r;
        n = t.get(D), r = t.get("triggerEvent"), i.isString(n) ? t._eventHandles.push(e.getBody().delegate(r, t._onTriggerInteraction, n, t)) : t._eventHandles.push(n.on(r, t._onTriggerInteraction, t))
    }, _bindHSVPalette: function () {
        var e = this, t;
        t = e.get(L), t && (e._eventHandles.push(e._hsvTrigger.on(g, e._onHSVTriggerClick, e)), e._recentColorsPalette.on(M, e._onRecentColorPaletteSelectChange, e))
    }, _bindNoColor: function () {
        var e = this;
        e._eventHandles.push(e._noColorNode.on(g, e._onNoColorClick, e))
    }, _bindUICPBase: function () {
        var e = this;
        e._bindNoColor(), e._bindHSVPalette(), e._bindTrigger(), e.on(w, e._onColorChange, e), e.on(B, e._onVisibleChange, e)
    }, _defaultValueRecentColors: function () {
        var e = this, t, n;
        return t = e.get("defaultColor"), n = {name: e.get(_).noColor, value: t}, {columns: l, items: [n, n, n, n, n, n, n, n, n, n]}
    }, _getCurrentTrigger: function () {
        var e = this;
        return e._currentTrigger
    }, _getDefaultAttributeValue: function (t) {
        var n = this, r, i;
        return i = n.get(b), r = n.get(t), i && e.mix(r, {selected: i}), r
    }, _findRecentColorEmptySpot: function (e) {
        var t = this, r, i;
        return r = t.get("defaultColor"), i = d, e || (e = t._recentColorsPalette.get(T)), n.some(e, function (e, t) {
            var n = e.value === r;
            return n && (i = t), n
        }), i
    }, _getHSVPalette: function () {
        var t = this, n, r, s;
        return t._hsvPaletteModal || (n = t.get(S), r = t.get(_), s = t.get(j) || 0, s += 2, t._hsvPaletteModal = (new e.HSVAPaletteModal({centered: !0, headerContent: i.sub(t.TPL_HEADER_CONTENT, {header: r.header}), hsv: t.get(x), modal: !0, resizable: !1, toolbars: {footer: [
            {label: r.cancel, on: {click: function () {
                t._hsvPaletteModal.hide()
            }}},
            {label: r.ok, on: {click: function () {
                t._onHSVPaletteOK()
            }}, primary: !0}
        ]}, zIndex: s})).render()), t._hsvPaletteModal
    }, _onColorChange: function (e) {
        var t = this;
        e.src !== N && e.src !== r.UI_SRC && t.hide(), e.src !== r.UI_SRC && t.fire("select", {color: e.newVal, trigger: e.trigger})
    }, _onColorPaletteSelectChange: function (e) {
        var t = this, n, s, o;
        e.src !== r.UI_SRC && (t.get(L) && t._recentColorsPalette.set(O, d, {src: r.UI_SRC}), e.newVal === d ? t.set(b, p, {trigger: t._currentTrigger}) : (s = t._colorPalette.get(T)[e.newVal], n = i.isObject(s) ? s.name : s, t.set(b, n, {trigger: t._currentTrigger})))
    }, _onHSVPaletteOK: function (e) {
        var t = this, n, s, o, u;
        n = v + t._hsvPaletteModal.get(O), u = t._recentColorsPalette.get(T), t._colorPalette.set(O, d, {src: r.UI_SRC}), i.isNumber(t._recentColorIndex) ? (u[t._recentColorIndex] = n, t._recentColorsPalette.set(O, t._recentColorIndex, {src: r.UI_SRC})) : (s = t._findRecentColorEmptySpot(u), s > d ? u[s] = n : u.push(n), t._recentColorsPalette.set(O, s, {src: r.UI_SRC})), t._recentColorsPalette.set(T, u), t.set(b, n, {src: N, trigger: t._currentTrigger}), t._hsvPaletteModal.hide()
    }, _onHSVTriggerClick: function () {
        var e = this, t;
        e._recentColorIndex = null, t = e._getHSVPalette(), t.set(O, c), e._clickOutsideHandle && e._clickOutsideHandle.detach(), t.show()
    }, _onNoColorClick: function (e) {
        var t = this;
        e.halt(), t.set(b, p, {trigger: t._currentTrigger})
    }, _onRecentColorPaletteSelectChange: function (e) {
        var t = this, n, s;
        e.src !== r.UI_SRC && (t._colorPalette.set(O, d, {src: r.UI_SRC}), e.newVal === d ? t.set(b, p, {trigger: t._currentTrigger}) : (s = t._recentColorsPalette.get(T)[e.newVal], n = i.isObject(s) ? s.name : s, t.set(b, n, {trigger: t._currentTrigger})))
    }, _onRecentColorClick: function (e) {
        var t = this, n, r, s, o;
        o = e.item, n = o.getAttribute(a), t._recentColorIndex = i.toInt(o.getAttribute(u)), n === f && (e.preventDefault(), r = t._getHSVPalette(), r.set(O, c), t._clickOutsideHandle && t._clickOutsideHandle.detach(), r.show())
    }, _onTriggerInteraction: function (e) {
        var t = this, n;
        n = e.currentTarget, n === t._currentTrigger ? t.set(H, !t.get(H)) : (t.set("align.node", n), t.set(H, !0), t._currentTrigger = n, t.get(S).one(".palette-item-inner").focus())
    }, _onVisibleChange: function (t) {
        var n = this;
        n._clickOutsideHandle && n._clickOutsideHandle.detach(), t.newVal ? (n.reset(), e.later(0, n, function (e) {
            n._clickOutsideHandle = n.get(m).once(y, n.hide, n)
        }, n)) : n._currentTrigger && n._currentTrigger.focus()
    }, _renderActionsContainer: function () {
        var t = this, n;
        n = t.getStdModNode(e.WidgetStdMod.BODY), t._actionsContainer = n.appendChild(t.TPL_ACTIONS)
    }, _renderColorPalette: function () {
        var t = this, n, r, i;
        n = t.getStdModNode(e.WidgetStdMod.BODY), i = t._getDefaultAttributeValue(E), t._colorPalette = (new e.ColorPalette(i)).render(n), t._colorPalette.on(M, t._onColorPaletteSelectChange, t)
    }, _renderHSVTrigger: function () {
        var e = this, t, n;
        n = e.get(_), e._hsvTrigger = e._actionsContainer.appendChild(i.sub(e.TPL_HSV_TRIGGER, {more: n.more}))
    }, _renderNoColor: function () {
        var e = this;
        e._noColorNode = e._actionsContainer.appendChild(i.sub(e.TPL_NO_COLOR, {none: e.get("strings").none}))
    }, _renderRecentColors: function () {
        var t = this, n, r, i, s;
        i = t._getDefaultAttributeValue(C), n = t.getStdModNode
            (e.WidgetStdMod.BODY), s = new e.ColorPalette(i), s.render(n), s.on([A, P], t._onRecentColorClick, t), t._recentColorsPalette = s
    }, _rendererUICPBase: function () {
        var e = this, t, n;
        t = e.get(k), t && e._renderColorPalette(), n = e.get(L), e._renderActionsContainer(), n && (e._renderHSVTrigger(), e._renderRecentColors()), e._renderNoColor(), e._bindUICPBase()
    }, _validateTrigger: function (t) {
        var n = this;
        return t instanceof e.Node || t instanceof e.NodeList || i.isString(t)
    }}, z.ATTRS = {bodyContent: {value: p}, color: {validator: i.isString}, colorPalette: {validator: i.isObject, value: {columns: l, items: ["#000000", "#434343", "#666666", "#999999", "#b7b7b7", "#cccccc", "#d9d9d9", "#efefef", "#f3f3f3", "#ffffff", "#980000", "#FF0000", "#FF9900", "#FFFF00", "#00FF00", "#00FFFF", "#4A86E8", "#0000FF", "#9900FF", "#FF00FF", "#E6B8AF", "#F4CCCC", "#FCE5CD", "#FFF2CC", "#D9EAD3", "#D0E0E3", "#C9DAF8", "#CFE2F3", "#D9D2E9", "#EAD1DC", "#DD7E6B", "#EA9999", "#F9CB9C", "#FFE599", "#B6D7A8", "#A2C4C9", "#A4C2F4", "#9FC5E8", "#B4A7D6", "#D5A6BD", "#CC4125", "#E06666", "#F6B26B", "#FFD966", "#93C47D", "#76A5AF", "#6D9EEB", "#6FA8DC", "#8E7CC3", "#C27BA0", "#A61C00", "#CC0000", "#E69138", "#F1C232", "#6AA84F", "#45818E", "#3C78D8", "#3D85C6", "#674EA7", "#A64D79", "#85200C", "#990000", "#B45F06", "#BF9000", "#38761D", "#134F5C", "#1155CC", "#0B5394", "#351C75", "#741B47", "#5B0F00", "#660000", "#783F04", "#7F6000", "#274E13", "#0C343D", "#1C4587", "#073763", "#20124D", "#4C1130"]}}, currentTrigger: {getter: "_getCurrentTrigger", readOnly: !0}, defaultColor: {validator: i.isString, value: f}, hsvPalette: {validator: i.isObject, value: {alpha: !1}}, recentColors: {validator: i.isObject, valueFn: "_defaultValueRecentColors"}, renderColorPalette: {validator: i.isBoolean, value: !0}, renderHSVPalette: {validator: i.isBoolean, value: !0, writeOnce: !0}, strings: {value: {cancel: "Cancel", header: "Choose custom color", more: "More colors...", noColor: "No color", none: "None", ok: "OK"}}, trigger: {validator: "_validateTrigger", value: h + q}, triggerEvent: {validator: i.isString, value: g}}, z.CSS_PREFIX = s(o), z.NAME = o, e.ColorPickerBase = z
}, "2.0.0pr7", {requires: ["aui-color-palette", "aui-hsva-palette-modal", "event-outside"], skinnable: !0});
