YUI.add("widget-parent", function (e, t) {
    function s(t) {
        this.publish("addChild", {defaultTargetOnly: !0, defaultFn: this._defAddChildFn}), this.publish("removeChild", {defaultTargetOnly: !0, defaultFn: this._defRemoveChildFn}), this._items = [];
        var n, r;
        t && t.children && (n = t.children, r = this.after("initializedChange", function (e) {
            this._add(n), r.detach()
        })), e.after(this._renderChildren, this, "renderUI"), e.after(this._bindUIParent, this, "bindUI"), this.after("selectionChange", this._afterSelectionChange), this.after("selectedChange", this._afterParentSelectedChange), this.after("activeDescendantChange", this._afterActiveDescendantChange), this._hDestroyChild = this.after("*:destroy", this._afterDestroyChild), this.after("*:focusedChange", this._updateActiveDescendant)
    }

    var n = e.Lang, r = "rendered", i = "boundingBox";
    s.ATTRS = {defaultChildType: {setter: function (t) {
        var r = e.Attribute.INVALID_VALUE, i = n.isString(t) ? e[t] : t;
        return n.isFunction(i) && (r = i), r
    }}, activeDescendant: {readOnly: !0}, multiple: {value: !1, validator: n.isBoolean, writeOnce: !0, getter: function (e) {
        var t = this.get("root");
        return t && t != this ? t.get("multiple") : e
    }}, selection: {readOnly: !0, setter: "_setSelection", getter: function (t) {
        var r = n.isArray(t) ? new e.ArrayList(t) : t;
        return r
    }}, selected: {setter: function (t) {
        var n = t;
        return t === 1 && !this.get("multiple") && (n = e.Attribute.INVALID_VALUE), n
    }}}, s.prototype = {destructor: function () {
        this._destroyChildren()
    }, _afterDestroyChild: function (e) {
        var t = e.target;
        t.get("parent") == this && t.remove()
    }, _afterSelectionChange: function (t) {
        if (t.target == this && t.src != this) {
            var n = t.newVal, r = 0;
            n && (r = 2, e.instanceOf(n, e.ArrayList) && n.size() === this.size() && (r = 1)), this.set("selected", r, {src: this})
        }
    }, _afterActiveDescendantChange: function (e) {
        var t = this.get("parent");
        t && t._set("activeDescendant", e.newVal)
    }, _afterParentSelectedChange: function (e) {
        var t = e.newVal;
        this == e.target && e.src != this && (t === 0 || t === 1) && this.each(function (e) {
            e.set("selected", t, {src: this})
        }, this)
    }, _setSelection: function (e) {
        var t = null, n;
        return this.get("multiple") && !this.isEmpty() ? (n = [], this.each(function (e) {
            e.get("selected") > 0 && n.push(e)
        }), n.length > 0 && (t = n)) : e.get("selected") > 0 && (t = e), t
    }, _updateSelection: function (e) {
        var t = e.target, n;
        t.get("parent") == this && (e.src != "_updateSelection" && (n = this.get("selection"), !this.get("multiple") && n && e.newVal > 0 && n.set("selected", 0, {src: "_updateSelection"}), this._set("selection", t)), e.src == this && this._set("selection", t, {src: this}))
    }, _updateActiveDescendant: function (e) {
        var t = e.newVal === !0 ? e.target : null;
        this._set("activeDescendant", t)
    }, _createChild: function (t) {
        var r = this.get("defaultChildType"), i = t.childType || t.type, s, o, u;
        return i && (o = n.isString(i) ? e[i] : i), n.isFunction(o) ? u = o : r && (u = r), u ? s = new u(t) : e.error("Could not create a child instance because its constructor is either undefined or invalid."), s
    }, _defAddChildFn: function (t) {
        var r = t.child, i = t.index, s = this._items;
        r.get("parent") && r.remove(), n.isNumber(i) ? s.splice(i, 0, r) : s.push(r), r._set("parent", this), r.addTarget(this), t.index = r.get("index"), r.after("selectedChange", e.bind(this._updateSelection, this))
    }, _defRemoveChildFn: function (e) {
        var t = e.child, n = e.index, r = this._items;
        t.get("focused") && t.blur(), t.get("selected") && t.set("selected", 0), r.splice(n, 1), t.removeTarget(this), t._oldParent = t.get("parent"), t._set("parent", null)
    }, _add: function (t, r) {
        var i, s, o;
        return n.isArray(t) ? (i = [], e.each(t, function (e, t) {
            s = this._add(e, r + t), s && i.push(s)
        }, this), i.length > 0 && (o = i)) : (e.instanceOf(t, e.Widget) ? s = t : s = this._createChild(t), s && this.fire("addChild", {child: s, index: r}) && (o = s)), o
    }, add: function () {
        var t = this._add.apply(this, arguments), r = t ? n.isArray(t) ? t : [t] : [];
        return new e.ArrayList(r)
    }, remove: function (e) {
        var t = this._items[e], n;
        return t && this.fire("removeChild", {child: t, index: e}) && (n = t), n
    }, removeAll: function () {
        var t = [], n;
        return e.each(this._items.concat(), function () {
            n = this.remove(0), n && t.push(n)
        }, this), new e.ArrayList(t)
    }, selectChild: function (e) {
        this.item(e).set("selected", 1)
    }, selectAll: function () {
        this.set("selected", 1)
    }, deselectAll: function () {
        this.set("selected", 0)
    }, _uiAddChild: function (e, t) {
        e.render(t);
        var n = e.get("boundingBox"), s, o = e.next(!1), u;
        o && o.get(r) ? (s = o.get(i), s.insert(n, "before")) : (u = e.previous(!1), u && u.get(r) ? (s = u.get(i), s.insert(n, "after")) : t.contains(n) || t.appendChild(n))
    }, _uiRemoveChild: function (e) {
        e.get("boundingBox").remove()
    }, _afterAddChild: function (e) {
        var t = e.child;
        t.get("parent") == this && this._uiAddChild(t, this._childrenContainer)
    }, _afterRemoveChild: function (e) {
        var t = e.child;
        t._oldParent == this && this._uiRemoveChild(t)
    }, _bindUIParent: function () {
        this.after("addChild", this._afterAddChild), this.after("removeChild", this._afterRemoveChild)
    }, _renderChildren: function () {
        var e = this._childrenContainer || this.get("contentBox");
        this._childrenContainer = e, this.each(function (t) {
            t.render(e)
        })
    }, _destroyChildren: function () {
        this._hDestroyChild.detach(), this.each(function (e) {
            e.destroy()
        })
    }}, e.augment(s, e.ArrayList), e.WidgetParent = s
}, "patched-dev-3.x", {requires: ["arraylist", "base-build", "widget"]});
