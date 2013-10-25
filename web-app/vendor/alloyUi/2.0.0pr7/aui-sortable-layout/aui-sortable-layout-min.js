YUI.add("aui-sortable-layout", function (e, t) {
    var n = e.Lang, r = n.isBoolean, i = n.isFunction, s = n.isObject, o = n.isString, u = n.isValue, a = n.toInt, f = Math.ceil, l = e.DD.DDM, c = "append", h = "circle", p = "delegateConfig", d = "down", v = "drag", m = "dragNode", g = "dragNodes", y = "dropContainer", b = "dropNodes", w = "groups", E = "icon", S = "indicator", x = "l", T = "lazyStart", N = "left", C = "marginBottom", k = "marginTop", L = "node", A = "offsetHeight", O = "offsetWidth", M = "placeAfter", _ = "placeBefore", D = "placeholder", P = "prepend", H = "proxy", B = "proxyNode", j = "r", F = "region", I = "right", q = "sortable-layout", R = " ", U = "target", z = "triangle", W = "up", X = "placeholderAlign", V = "quadrantEnter", $ = "quadrantExit", J = "quadrantOver", K = 0, Q = 0, G = 0, Y = 0, Z = function (t) {
        return t instanceof e.NodeList
    }, et = function () {
        return Array.prototype.slice.call(arguments).join(R)
    }, tt = function (t) {
        return Z(t) ? t : e.all(t)
    }, nt = function (e, t) {
        return a(e.getStyle(t))
    }, rt = e.getClassName, it = rt(q, v, S), st = rt(q, v, S, E), ot = rt(q, v, S, E, N), ut = rt(q, v, S, E, I), at = rt(q, v, U, S), ft = rt(E), lt = rt(E, h, z, x), ct = rt(E, h, z, j), ht = '<div class="' + it + '">' + '<div class="' + et(st, ot, ft, ct) + '"></div>' + '<div class="' + et(st, ut, ft, lt) + '"></div>' + "<div>", pt = e.Component.create({NAME: q, ATTRS: {delegateConfig: {value: null, setter: function (t) {
        var n = this, r = e.merge({bubbleTargets: n, dragConfig: {}, nodes: n.get(g), target: !0}, t);
        return e.mix(r.dragConfig, {groups: n.get(w), startCentered: !0}), r
    }, validator: s}, proxyNode: {setter: function (t) {
        return o(t) ? e.Node.create(t) : t
    }}, dragNodes: {validator: o}, dropContainer: {value: function (e) {
        return e
    }, validator: i}, dropNodes: {setter: "_setDropNodes"}, groups: {value: [q]}, lazyStart: {value: !1, validator: r}, placeholder: {value: ht, setter: function (t) {
        var n = o(t) ? e.Node.create(t) : t;
        return n.inDoc() || e.getBody().prepend(n.hide()), K = nt(n, C), Q = nt(n, k), n.addClass(at), G = nt(n, C), Y = nt(n, k), n
    }}, proxy: {value: null, setter: function (t) {
        var n = this, r = {moveOnEnd: !1, positionProxy: !1};
        return n.get(B) && (r.borderStyle = null), e.merge(r, t || {})
    }}}, EXTENDS: e.Base, prototype: {initializer: function () {
        var e = this;
        e.bindUI()
    }, bindUI: function () {
        var e = this;
        e.publish(X, {defaultFn: e._defPlaceholderAlign, queuable: !1, emitFacade: !0, bubbles: !0}), e._bindDDEvents(), e._bindDropZones()
    }, addDropNode: function (t, n) {
        var r = this;
        t = e.one(t), l.getDrop(t) || r.addDropTarget(new e.DD.Drop(e.merge({bubbleTargets: r, groups: r.get(w), node: t}, n)))
    }, addDropTarget: function (e) {
        var t = this;
        e.addToGroup(t.get(w))
    }, alignPlaceholder: function (e, t) {
        var n = this, r = n.get(D);
        n.lazyEvents || r.show(), n._syncPlaceholderSize(), r.setXY(n.getPlaceholderXY(e, t))
    }, calculateDirections: function (e) {
        var t = this, n = t.lastY, r = t.lastX, i = e.lastXY[0], s = e.lastXY[1];
        i != r && (t.XDirection = i < r ? N : I), s != n && (t.YDirection = s < n ? W : d), t.lastX = i, t.lastY = s
    }, calculateQuadrant: function (e, t) {
        var n = this, r = 1, i = t.get(L).get(F), s = e.mouseXY, o = s[0], u = s[1], a = i.top, f = i.left, l = a + (i.bottom - a) / 2, c = f + (i.right - f) / 2;
        return u < l ? r = o > c ? 1 : 2 : r = o < c ? 3 : 4, n.quadrant = r, r
    }, getPlaceholderXY: function (e, t) {
        var n = this, r = n.get(D), i = K, s = Q;
        t && (i = G, s = Y), r.toggleClass(at, t);
        var o = f(e.bottom), u = f(e.left), a = f(e.top), l = u, c = n.quadrant < 3 ? a - (r.get(A) + i) : o + s;
        return[l, c]
    }, removeDropTarget: function (e) {
        var t = this;
        e.removeFromGroup(t.get(w))
    }, _alignCondition: function () {
        var e = this, t = l.activeDrag, n = e.activeDrop;
        if (t && n) {
            var r = t.get(L), i = n.get(L);
            return!r.contains(i)
        }
        return!0
    }, _bindDDEvents: function () {
        var t = this, n = t.get(p), r = t.get(H);
        t.delegate = new e.DD.Delegate(n), t.delegate.dd.plug(e.Plugin.DDProxy, r), t.on("drag:end", e.bind(t._onDragEnd, t)), t.on("drag:enter", e.bind(t._onDragEnter, t)), t.on("drag:exit", e.bind(t._onDragExit, t)), t.on("drag:over", e.bind(t._onDragOver, t)), t.on("drag:start", e.bind(t._onDragStart, t)), t.after("drag:start", e.bind(t._afterDragStart, t)), t.on(V, t._syncPlaceholderUI), t.on($, t._syncPlaceholderUI)
    }, _bindDropZones: function () {
        var e = this, t = e.get(b);
        t && t.each(function (t, n) {
            e.addDropNode(t)
        })
    }, _defPlaceholderAlign: function (e) {
        var t = this, n = t.activeDrop, r = t.get(D);
        if (n && r) {
            var i = n.get("node"), s = !!i.drop;
            t.lastAlignDrop = n, t.alignPlaceholder(n.get(L).get(F), s)
        }
    }, _evOutput: function () {
        var e = this;
        return{drag: l.activeDrag, drop: e.activeDrop, quadrant: e.quadrant, XDirection: e.XDirection, YDirection: e.YDirection}
    }, _fireQuadrantEvents: function () {
        var t = this, n = t._evOutput(), r = t.lastQuadrant, i = t.quadrant;
        i != r && (r && t.fire($, e.merge({lastDrag: t.lastDrag, lastDrop: t.lastDrop, lastQuadrant: t.lastQuadrant, lastXDirection: t.lastXDirection, lastYDirection: t.lastYDirection}, n)), t.fire(V, n)), t.fire(J, n), t.lastDrag = l.activeDrag, t.lastDrop = t.activeDrop, t.lastQuadrant = i, t.lastXDirection = t.XDirection, t.lastYDirection = t.YDirection
    }, _getAppendNode: function () {
        return l.activeDrag.get(L)
    }, _positionNode: function (e) {
        var t = this, n = t.lastAlignDrop || t.activeDrop;
        if (n) {
            var r = t._getAppendNode(), i = n.get(L), s = u(i.drop), o = t.quadrant < 3;
            if (t._alignCondition())if (s)i[o ? _ : M](r); else {
                var a = t.get(y).apply(t, [i]);
                a[o ? P : c](r)
            }
        }
    }, _syncPlaceholderUI: function (e) {
        var t = this;
        t._alignCondition() && t.fire(X, {drop: t.activeDrop, originalEvent: e})
    }, _syncPlaceholderSize: function () {
        var e = this, t = e.activeDrop.get(L), n = e.get(D);
        n && n.set(O, t.get(O))
    }, _syncProxyNodeUI: function (e) {
        var t = this, n = l.activeDrag.get(m), r = t.get(B);
        r && !r.compareTo(n) && (n.append(r), t._syncProxyNodeSize())
    }, _syncProxyNodeSize: function () {
        var e = this, t = l.activeDrag.get(L), n = e.get(B);
        t && n && (n.set(A, t.get(A)), n.set(O, t.get(O)))
    }, _afterDragStart: function (e) {
        var t = this;
        t.get(H) && t._syncProxyNodeUI(e)
    }, _onDragEnd: function (e) {
        var t = this, n = t.get(D), r = t.get(B);
        t.lazyEvents || t._positionNode(e), r && r.remove(), n && n.hide(), t.lastQuadrant = null, t.lastXDirection = null, t.lastYDirection = null
    }, _onDragEnter: function (e) {
        var t = this;
        t.activeDrop = l.activeDrop, t.lazyEvents && t.lastActiveDrop && (t.lazyEvents = !1, t._syncPlaceholderUI(e)), t.lastActiveDrop || (t.lastActiveDrop = l.activeDrop)
    }, _onDragExit: function (e) {
        var t = this;
        t._syncPlaceholderUI(e), t.activeDrop = l.activeDrop, t.lastActiveDrop = l.activeDrop
    }, _onDragOver: function (e) {
        var t = this, n = e.drag;
        t.activeDrop == l.activeDrop && (t.calculateDirections(n), t.calculateQuadrant(n, t.activeDrop), t._fireQuadrantEvents())
    }, _onDragStart: function (e) {
        var t = this;
        t.get(T) && (t.lazyEvents = !0), t.lastActiveDrop =
            null, t.activeDrop = l.activeDrop
    }, _setDropNodes: function (e) {
        var t = this;
        return i(e) && (e = e.call(t)), tt(e)
    }}});
    e.SortableLayout = pt
}, "2.0.0pr7", {requires: ["dd-delegate", "dd-drag", "dd-drop", "dd-proxy", "aui-node", "aui-component"], skinnable: !0});
