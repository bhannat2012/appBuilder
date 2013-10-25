YUI.add("aui-event-input", function (e, t) {
    var n = e.Node.DOM_EVENTS;
    if (e.Features.test("event", "input")) {
        n.input = 1;
        return
    }
    n.cut = 1, n.dragend = 1, n.paste = 1;
    var r = "activeElement", i = "ownerDocument", s = "~~aui|input|event~~", o = ["keydown", "paste", "drop", "cut"], u = {cut: 1, drop: 1, paste: 1};
    e.Event.define("input", {on: function (t, n, r) {
        var i = this;
        n._handler = t.on(o, e.bind(i._dispatchEvent, i, r))
    }, delegate: function (t, n, r, i) {
        var u = this;
        n._handles = [], n._handler = t.delegate("focus", function (t) {
            var i = t.target, a = i.getData(s);
            a || (a = i.on(o, e.bind(u._dispatchEvent, u, r)), n._handles.push(a), i.setData(s, a))
        }, i)
    }, detach: function (e, t, n) {
        t._handler.detach()
    }, detachDelegate: function (t, n, r) {
        e.Array.each(n._handles, function (t) {
            var n = e.one(t.evt.el);
            n && n.setData(s, null), t.detach()
        }), n._handler.detach()
    }, _dispatchEvent: function (e, t) {
        var n = this, s = t.target;
        (u[t.type] || s.get(i).get(r) === s) && e.fire(t)
    }})
}, "2.0.0pr7", {requires: ["aui-event-base", "event-delegate", "event-synthetic"]});
