YUI.add("anim-scroll", function (e, t) {
    var n = Number;
    e.Anim.behaviors.scroll = {set: function (e, t, r, i, s, o, u) {
        var a = e._node, f = [u(s, n(r[0]), n(i[0]) - n(r[0]), o), u(s, n(r[1]), n(i[1]) - n(r[1]), o)];
        f[0] && a.set("scrollLeft", f[0]), f[1] && a.set("scrollTop", f[1])
    }, get: function (e) {
        var t = e._node;
        return[t.get("scrollLeft"), t.get("scrollTop")]
    }}
}, "patched-dev-3.x", {requires: ["anim-base"]});