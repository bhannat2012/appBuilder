YUI.add("event-synthetic", function (e, t) {
    function c(e, t) {
        this.handle = e, this.emitFacade = t
    }

    function h(e, t, n) {
        this.handles = [], this.el = e, this.key = n, this.domkey = t
    }

    function p() {
        this._init.apply(this, arguments)
    }

    var n = e.CustomEvent, r = e.Env.evt.dom_map, i = e.Array, s = e.Lang, o = s.isObject, u = s.isString, a = s.isArray, f = e.Selector.query, l = function () {
    };
    c.prototype.fire = function (t) {
        var n = i(arguments, 0, !0), r = this.handle, s = r.evt, u = r.sub, a = u.context, f = u.filter, l = t || {}, c;
        if (this.emitFacade) {
            if (!t || !t.preventDefault)l = s._getFacade(), o(t) && !t.preventDefault ? (e.mix(l, t, !0), n[0] = l) : n.unshift(l);
            l.type = s.type, l.details = n.slice(), f && (l.container = s.host)
        } else f && o(t) && t.currentTarget && n.shift();
        return u.context = a || l.currentTarget || s.host, c = s.fire.apply(s, n), u.context = a, c
    }, h.prototype = {constructor: h, type: "_synth", fn: l, capture: !1, register: function (e) {
        e.evt.registry = this, this.handles.push(e)
    }, unregister: function (t) {
        var n = this.handles, i = r[this.domkey], s;
        for (s = n.length - 1; s >= 0; --s)if (n[s].sub === t) {
            n.splice(s, 1);
            break
        }
        n.length || (delete i[this.key], e.Object.size(i) || delete r[this.domkey])
    }, detachAll: function () {
        var e = this.handles, t = e.length;
        while (--t >= 0)e[t].detach()
    }}, e.mix(p, {Notifier: c, SynthRegistry: h, getRegistry: function (t, n, i) {
        var s = t._node, o = e.stamp(s), u = "event:" + o + n + "_synth", a = r[o];
        return i && (a || (a = r[o] = {}), a[u] || (a[u] = new h(s, o, u))), a && a[u] || null
    }, _deleteSub: function (e) {
        if (e && e.fn) {
            var t = this.eventDef, r = e.filter ? "detachDelegate" : "detach";
            this._subscribers = [], n.keepDeprecatedSubs && (this.subscribers = {}), t[r](e.node, e, this.notifier, e.filter), this.registry.unregister(e), delete e.fn, delete e.node, delete e.context
        }
    }, prototype: {constructor: p, _init: function () {
        var e = this.publishConfig || (this.publishConfig = {});
        this.emitFacade = "emitFacade"in e ? e.emitFacade : !0, e.emitFacade = !1
    }, processArgs: l, on: l, detach: l, delegate: l, detachDelegate: l, _on: function (t, n) {
        var r = [], s = t.slice(), o = this.processArgs(t, n), a = t[2], l = n ? "delegate" : "on", c, h;
        return c = u(a) ? f(a) : i(a || e.one(e.config.win)), !c.length && u(a) ? (h = e.on("available", function () {
            e.mix(h, e[l].apply(e, s), !0)
        }, a), h) : (e.Array.each(c, function (i) {
            var s = t.slice(), u;
            i = e.one(i), i && (n && (u = s.splice(3, 1)[0]), s.splice(0, 4, s[1], s[3]), (!this.preventDups || !this.getSubs(i, t, null, !0)) && r.push(this._subscribe(i, l, s, o, u)))
        }, this), r.length === 1 ? r[0] : new e.EventHandle(r))
    }, _subscribe: function (t, n, r, i, s) {
        var o = new e.CustomEvent(this.type, this.publishConfig), u = o.on.apply(o, r), a = new c(u, this.emitFacade), f = p.getRegistry(t, this.type, !0), l = u.sub;
        return l.node = t, l.filter = s, i && this.applyArgExtras(i, l), e.mix(o, {eventDef: this, notifier: a, host: t, currentTarget: t, target: t, el: t._node, _delete: p._deleteSub}, !0), u.notifier = a, f.register(u), this[n](t, l, a, s), u
    }, applyArgExtras: function (e, t) {
        t._extra = e
    }, _detach: function (t) {
        var n = t[2], r = u(n) ? f(n) : i(n), s, o, a, l, c;
        t.splice(2, 1);
        for (o = 0, a = r.length; o < a; ++o) {
            s = e.one(r[o]);
            if (s) {
                l = this.getSubs(s, t);
                if (l)for (c = l.length - 1; c >= 0; --c)l[c].detach()
            }
        }
    }, getSubs: function (e, t, n, r) {
        var i = p.getRegistry(e, this.type), s = [], o, u, a, f;
        if (i) {
            o = i.handles, n || (n = this.subMatch);
            for (u = 0, a = o.length; u < a; ++u) {
                f = o[u];
                if (n.call(this, f.sub, t)) {
                    if (r)return f;
                    s.push(o[u])
                }
            }
        }
        return s.length && s
    }, subMatch: function (e, t) {
        return!t[1] || e.fn === t[1]
    }}}, !0), e.SyntheticEvent = p, e.Event.define = function (t, n, r) {
        var s, o, f;
        t && t.type ? (s = t, r = n) : n && (s = e.merge({type: t}, n));
        if (s) {
            if (r || !e.Node.DOM_EVENTS[s.type])o = function () {
                p.apply(this, arguments)
            }, e.extend(o, p, s), f = new o, t = f.type, e.Node.DOM_EVENTS[t] = e.Env.evt.plugins[t] = {eventDef: f, on: function () {
                return f._on(i(arguments))
            }, delegate: function () {
                return f._on(i(arguments), !0)
            }, detach: function () {
                return f._detach(i(arguments))
            }}
        } else(u(t) || a(t)) && e.Array.each(i(t), function (t) {
            e.Node.DOM_EVENTS[t] = 1
        });
        return f
    }
}, "patched-dev-3.x", {requires: ["node-base", "event-custom-complex"]});
