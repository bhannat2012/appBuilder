YUI.add("cookie", function (e, t) {
    function h(e) {
        throw new TypeError(e)
    }

    function p(e) {
        (!s(e) || e === "") && h("Cookie name must be a non-empty string.")
    }

    function d(e) {
        (!s(e) || e === "") && h("Subcookie name must be a non-empty string.")
    }

    var n = e.Lang, r = e.Object, i = null, s = n.isString, o = n.isObject, u = n.isUndefined, a = n.isFunction, f = encodeURIComponent, l = decodeURIComponent, c = e.config.doc;
    e.Cookie = {_createCookieString: function (e, t, n, r) {
        r = r || {};
        var i = f(e) + "=" + (n ? f(t) : t), u = r.expires, a = r.path, l = r.domain;
        return o(r) && (u instanceof Date && (i += "; expires=" + u.toUTCString()), s(a) && a !== "" && (i += "; path=" + a), s(l) && l !== "" && (i += "; domain=" + l), r.secure === !0 && (i += "; secure")), i
    }, _createCookieHashString: function (e) {
        o(e) || h("Cookie._createCookieHashString(): Argument must be an object.");
        var t = [];
        return r.each(e, function (e, n) {
            !a(e) && !u(e) && t.push(f(n) + "=" + f(String(e)))
        }), t.join("&")
    }, _parseCookieHash: function (e) {
        var t = e.split("&"), n = i, r = {};
        if (e.length)for (var s = 0, o = t.length; s < o; s++)n = t[s].split("="), r[l(n[0])] = l(n[1]);
        return r
    }, _parseCookieString: function (e, t, n) {
        var r = {};
        if (s(e) && e.length > 0) {
            var o = t === !1 ? function (e) {
                return e
            } : l, a = e.split(/;\s/g), f = i, c = i, h = i;
            for (var p = 0, d = a.length; p < d; p++) {
                h = a[p].match(/([^=]+)=/i);
                if (h instanceof Array)try {
                    f = l(h[1]), c = o(a[p].substring(h[1].length + 1))
                } catch (v) {
                } else f = l(a[p]), c = "";
                !u(n) && n.reverseCookieLoading ? u(r[f]) && (r[f] = c) : r[f] = c
            }
        }
        return r
    }, _setDoc: function (e) {
        c = e
    }, exists: function (e) {
        p(e);
        var t = this._parseCookieString(c.cookie, !0);
        return t.hasOwnProperty(e)
    }, get: function (e, t) {
        p(e);
        var n, r, s;
        return a(t) ? (s = t, t = {}) : o(t) ? s = t.converter : t = {}, n = this._parseCookieString(c.cookie, !t.raw, t), r = n[e], u(r) ? i : a(s) ? s(r) : r
    }, getSub: function (e, t, n, r) {
        var s = this.getSubs(e, r);
        return s !== i ? (d(t), u(s[t]) ? i : a(n) ? n(s[t]) : s[t]) : i
    }, getSubs: function (e, t) {
        p(e);
        var n = this._parseCookieString(c.cookie, !1, t);
        return s(n[e]) ? this._parseCookieHash(n[e]) : i
    }, remove: function (t, n) {
        return p(t), n = e.merge(n || {}, {expires: new Date(0)}), this.set(t, "", n)
    }, removeSub: function (e, t, n) {
        p(e), d(t), n = n || {};
        var r = this.getSubs(e);
        if (o(r) && r.hasOwnProperty(t)) {
            delete r[t];
            if (!n.removeIfEmpty)return this.setSubs(e, r, n);
            for (var i in r)if (r.hasOwnProperty(i) && !a(r[i]) && !u(r[i]))return this.setSubs(e, r, n);
            return this.remove(e, n)
        }
        return""
    }, set: function (e, t, n) {
        p(e), u(t) && h("Cookie.set(): Value cannot be undefined."), n = n || {};
        var r = this._createCookieString(e, t, !n.raw, n);
        return c.cookie = r, r
    }, setSub: function (e, t, n, r) {
        p(e), d(t), u(n) && h("Cookie.setSub(): Subcookie value cannot be undefined.");
        var i = this.getSubs(e);
        return o(i) || (i = {}), i[t] = n, this.setSubs(e, i, r)
    }, setSubs: function (e, t, n) {
        p(e), o(t) || h("Cookie.setSubs(): Cookie value must be an object.");
        var r = this._createCookieString(e, this._createCookieHashString(t), !1, n);
        return c.cookie = r, r
    }}
}, "patched-dev-3.x", {requires: ["yui-base"]});
