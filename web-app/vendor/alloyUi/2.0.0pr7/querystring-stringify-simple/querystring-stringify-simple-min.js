YUI.add("querystring-stringify-simple", function (e, t) {
    var n = e.namespace("QueryString"), r = encodeURIComponent;
    n.stringify = function (t, n) {
        var i = [], s = n && n.arrayKey ? !0 : !1, o, u, a;
        for (o in t)if (t.hasOwnProperty(o))if (e.Lang.isArray(t[o]))for (u = 0, a = t[o].length; u < a; u++)i.push(r(s ? o + "[]" : o) + "=" + r(t[o][u])); else i.push(r(o) + "=" + r(t[o]));
        return i.join("&")
    }
}, "patched-dev-3.x", {requires: ["yui-base"]});
