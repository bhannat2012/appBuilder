YUI.add("axis", function (e, t) {
    var n = e.config, r = n.doc, i = e.Lang, s = i.isString, o = e.DOM, u, a, f, l;
    u = function () {
    }, u.prototype = {_getDefaultMargins: function () {
        return{top: 0, left: 0, right: 4, bottom: 0}
    }, setTickOffsets: function () {
        var e = this, t = e.get("styles").majorTicks, n = t.length, r = n * .5, i = t.display;
        e.set("topTickOffset", 0), e.set("bottomTickOffset", 0);
        switch (i) {
            case"inside":
                e.set("rightTickOffset", n), e.set("leftTickOffset", 0);
                break;
            case"outside":
                e.set("rightTickOffset", 0), e.set("leftTickOffset", n);
                break;
            case"cross":
                e.set("rightTickOffset", r), e.set("leftTickOffset", r);
                break;
            default:
                e.set("rightTickOffset", 0), e.set("leftTickOffset", 0)
        }
    }, drawTick: function (e, t, n) {
        var r = this, i = r.get("styles"), s = i.padding, o = n.length, u = {x: s.left, y: t.y}, a = {x: o + s.left, y: t.y};
        r.drawLine(e, u, a)
    }, getLineStart: function () {
        var e = this.get("styles"), t = e.padding, n = e.majorTicks, r = n.length, i = n.display, s = {x: t.left, y: 0};
        return i === "outside" ? s.x += r : i === "cross" && (s.x += r / 2), s
    }, getLabelPoint: function (e) {
        return{x: e.x - this.get("leftTickOffset"), y: e.y}
    }, updateMaxLabelSize: function (e, t) {
        var n = this, r = this._labelRotationProps, i = r.rot, s = r.absRot, o = r.sinRadians, u = r.cosRadians, a;
        i === 0 ? a = e : s === 90 ? a = t : a = u * e + o * t, n._maxLabelSize = Math.max(n._maxLabelSize, a)
    }, getExplicitlySized: function (e) {
        if (this._explicitWidth) {
            var t = this, n = t._explicitWidth, r = t._totalTitleSize, i = t.get("leftTickOffset"), s = e.label.margin.right;
            return t._maxLabelSize = n - (i + s + r), !0
        }
        return!1
    }, positionTitle: function (e) {
        var t = this, n = t._titleBounds, r = t.get("styles").title.margin, i = t._titleRotationProps, s = n.right - n.left, o = e.offsetWidth, u = e.offsetHeight, a = o * -0.5 + s * .5, f = t.get("height") * .5 - u * .5;
        i.labelWidth = o, i.labelHeight = u, r && r.left && (a += r.left), i.x = a, i.y = f, i.transformOrigin = [.5, .5], t._rotate(e, i)
    }, positionLabel: function (e, t, n, r) {
        var i = this, s = i.get("leftTickOffset"), o = this._totalTitleSize, u = t.x + o - s, a = t.y, f = this._labelRotationProps, l = f.rot, c = f.absRot, h = i._maxLabelSize, p = this._labelWidths[r], d = this._labelHeights[r];
        l === 0 ? (u -= p, a -= d * .5) : l === 90 ? u -= p * .5 : l === -90 ? (u -= p * .5, a -= d) : (u -= p + d * c / 360, a -= d * .5), f.labelWidth = p, f.labelHeight = d, f.x = Math.round(h + u), f.y = Math.round(a), this._rotate(e, f)
    }, _setRotationCoords: function (e) {
        var t = e.rot, n = e.absRot, r, i, s = e.labelWidth, o = e.labelHeight;
        t === 0 ? (r = s, i = o * .5) : t === 90 ? (i = 0, r = s * .5) : t === -90 ? (r = s * .5, i = o) : (r = s + o * n / 360, i = o * .5), e.x -= r, e.y -= i
    }, _getTransformOrigin: function (e) {
        var t;
        return e === 0 ? t = [0, 0] : e === 90 ? t = [.5, 0] : e === -90 ? t = [.5, 1] : t = [1, .5], t
    }, offsetNodeForTick: function () {
    }, setCalculatedSize: function () {
        var e = this, t = this.get("graphic"), n = e.get("styles"), r = n.label, i = e.get("leftTickOffset"), s = e._maxLabelSize, o = this._totalTitleSize, u = Math.round(o + i + s + r.margin.right);
        this._explicitWidth && (u = this._explicitWidth), this.set("calculatedWidth", u), t.set("x", u - i)
    }}, e.LeftAxisLayout = u, a = function () {
    }, a.prototype = {_getDefaultMargins: function () {
        return{top: 0, left: 4, right: 0, bottom: 0}
    }, setTickOffsets: function () {
        var e = this, t = e.get("styles").majorTicks, n = t.length, r = n * .5, i = t.display;
        e.set("topTickOffset", 0), e.set("bottomTickOffset", 0);
        switch (i) {
            case"inside":
                e.set("leftTickOffset", n), e.set("rightTickOffset", 0);
                break;
            case"outside":
                e.set("leftTickOffset", 0), e.set("rightTickOffset", n);
                break;
            case"cross":
                e.set("rightTickOffset", r), e.set("leftTickOffset", r);
                break;
            default:
                e.set("leftTickOffset", 0), e.set("rightTickOffset", 0)
        }
    }, drawTick: function (e, t, n) {
        var r = this, i = r.get("styles"), s = i.padding, o = n.length, u = {x: s.left, y: t.y}, a = {x: s.left + o, y: t.y};
        r.drawLine(e, u, a)
    }, getLineStart: function () {
        var e = this, t = e.get("styles"), n = t.padding, r = t.majorTicks, i = r.length, s = r.display, o = {x: n.left, y: n.top};
        return s === "inside" ? o.x += i : s === "cross" && (o.x += i / 2), o
    }, getLabelPoint: function (e) {
        return{x: e.x + this.get("rightTickOffset"), y: e.y}
    }, updateMaxLabelSize: function (e, t) {
        var n = this, r = this._labelRotationProps, i = r.rot, s = r.absRot, o = r.sinRadians, u = r.cosRadians, a;
        i === 0 ? a = e : s === 90 ? a = t : a = u * e + o * t, n._maxLabelSize = Math.max(n._maxLabelSize, a)
    }, getExplicitlySized: function (e) {
        if (this._explicitWidth) {
            var t = this, n = t._explicitWidth, r = this._totalTitleSize, i = t.get("rightTickOffset"), s = e.label.margin.right;
            return t._maxLabelSize = n - (i + s + r), !0
        }
        return!1
    }, positionTitle: function (e) {
        var t = this, n = t._titleBounds, r = t.get("styles").title.margin, i = t._titleRotationProps, s = e.offsetWidth, o = e.offsetHeight, u = n.right - n.left, a = this.get("width") - s * .5 - u * .5, f = t.get("height") * .5 - o * .5;
        i.labelWidth = s, i.labelHeight = o, r && r.right && (a -= r.left), i.x = a, i.y = f, i.transformOrigin = [.5, .5], t._rotate(e, i)
    }, positionLabel: function (e, t, n, r) {
        var i = this, s = i.get("rightTickOffset"), o = n.label, u = 0, a = t.x, f = t.y, l = this._labelRotationProps, c = l.rot, h = l.absRot, p = this._labelWidths[r], d = this._labelHeights[r];
        o.margin && o.margin.left && (u = o.margin.left), c === 0 ? f -= d * .5 : c === 90 ? (a -= p * .5, f -= d) : c === -90 ? a -= p * .5 : (f -= d * .5, a += d / 2 * h / 90), a += u, a += s, l.labelWidth = p, l.labelHeight = d, l.x = Math.round(a), l.y = Math.round(f), this._rotate(e, l)
    }, _setRotationCoords: function (e) {
        var t = e.rot, n = e.absRot, r = 0, i = 0, s = e.labelWidth, o = e.labelHeight;
        t === 0 ? i = o * .5 : t === 90 ? (r = s * .5, i = o) : t === -90 ? r = s * .5 : (i = o * .5, r = o / 2 * n / 90), e.x -= r, e.y -= i
    }, _getTransformOrigin: function (e) {
        var t;
        return e === 0 ? t = [0, 0] : e === 90 ? t = [.5, 1] : e === -90 ? t = [.5, 0] : t = [0, .5], t
    }, offsetNodeForTick: function (e) {
        var t = this, n = t.get("leftTickOffset"), r = 0 - n;
        e.setStyle("left", r)
    }, setCalculatedSize: function () {
        var e = this, t = e.get("styles"), n = t.label, r = this._totalTitleSize, i = Math.round(e.get("rightTickOffset") + e._maxLabelSize + r + n.margin.left);
        this._explicitWidth && (i = this._explicitWidth), e.set("calculatedWidth", i), e.get("contentBox").setStyle("width", i)
    }}, e.RightAxisLayout = a, f = function () {
    }, f.prototype = {_getDefaultMargins: function () {
        return{top: 4, left: 0, right: 0, bottom: 0}
    }, setTickOffsets: function () {
        var e = this, t = e.get("styles").majorTicks, n = t.length, r = n * .5, i = t.display;
        e.set("leftTickOffset", 0), e.set("rightTickOffset", 0);
        switch (i) {
            case"inside":
                e.set("topTickOffset", n), e.set("bottomTickOffset", 0);
                break;
            case"outside":
                e.set("topTickOffset", 0), e.set("bottomTickOffset", n);
                break;
            case"cross":
                e.set("topTickOffset", r), e.set("bottomTickOffset", r);
                break;
            default:
                e.set("topTickOffset", 0), e.set("bottomTickOffset", 0)
        }
    }, getLineStart: function () {
        var e = this.get("styles"), t = e.padding, n = e.majorTicks, r = n.length, i = n.display, s = {x: 0, y: t.top};
        return i === "inside" ? s.y += r : i === "cross" && (s.y += r / 2), s
    }, drawTick: function (e, t, n) {
        var r = this, i = r.get("styles"), s = i.padding, o = n.length, u = {x: t.x, y: s.top}, a = {x: t.x, y: o + s.top};
        r.drawLine(e, u, a)
    }, getLabelPoint: function (e) {
        return{x: e.x, y: e.y + this.get("bottomTickOffset")}
    }, updateMaxLabelSize: function (e, t) {
        var n = this, r = this._labelRotationProps, i = r.rot, s = r.absRot, o = r.sinRadians, u = r.cosRadians, a;
        i === 0 ? a = t : s === 90 ? a = e : a = o * e + u * t, n._maxLabelSize = Math.max(n._maxLabelSize, a)
    }, getExplicitlySized: function (e) {
        if (this._explicitHeight) {
            var t = this, n = t._explicitHeight, r = t._totalTitleSize, i = t.get("bottomTickOffset"), s = e.label.margin.right;
            return t._maxLabelSize = n - (i + s + r), !0
        }
        return!1
    }, positionTitle: function (e) {
        var t = this, n = t._titleBounds, r = t.get("styles").title.margin, i = t._titleRotationProps, s = n.bottom - n.top, o = e.offsetWidth, u = e.offsetHeight, a = t.get("width") * .5 - o * .5, f = t.get("height") - u / 2 - s / 2;
        i.labelWidth = o, i.labelHeight = u, r && r.bottom && (f -= r.bottom), i.x = a, i.y = f, i.transformOrigin = [.5, .5], t._rotate(e, i)
    }, positionLabel: function (e, t, n, r) {
        var i = this, s = i.get("bottomTickOffset"), o = n.label, u = 0, a = i._labelRotationProps, f = a.rot, l = a.absRot, c = Math.round(t.x), h = Math.round(t.y), p = i._labelWidths[r], d = i._labelHeights[r];
        o.margin && o.margin.top && (u = o.margin.top), f > 0 ? h -= d / 2 * f / 90 : f < 0 ? (c -= p, h -= d / 2 * l / 90) : c -= p * .5, h += u, h += s, a.labelWidth = p, a.labelHeight = d, a.x = c, a.y = h, i._rotate(e, a)
    }, _setRotationCoords: function (e) {
        var t = e.rot, n = e.absRot, r = e.labelWidth, i = e.labelHeight, s, o;
        t > 0 ? (s = 0, o = i / 2 * t / 90) : t < 0 ? (s = r, o = i / 2 * n / 90) : (s = r * .5, o = 0), e.x -= s, e.y -= o
    }, _getTransformOrigin: function (e) {
        var t;
        return e > 0 ? t = [0, .5] : e < 0 ? t = [1, .5] : t = [0, 0], t
    }, offsetNodeForTick: function (e) {
        var t = this;
        e.setStyle("top", 0 - t.get("topTickOffset"))
    }, setCalculatedSize: function () {
        var e = this, t = e.get("styles"), n = t.label, r = e._totalTitleSize, i = Math.round(e.get("bottomTickOffset") + e._maxLabelSize + n.margin.top + r);
        e._explicitHeight && (i = e._explicitHeight), e.set("calculatedHeight", i)
    }}, e.BottomAxisLayout = f, l = function () {
    }, l.prototype = {_getDefaultMargins: function () {
        return{top: 0, left: 0, right: 0, bottom: 4}
    }, setTickOffsets: function () {
        var e = this, t = e.get("styles").majorTicks, n = t.length, r = n * .5, i = t.display;
        e.set("leftTickOffset", 0), e.set("rightTickOffset", 0);
        switch (i) {
            case"inside":
                e.set("bottomTickOffset", n), e.set("topTickOffset", 0);
                break;
            case"outside":
                e.set("bottomTickOffset", 0), e.set("topTickOffset", n);
                break;
            case"cross":
                e.set("topTickOffset", r), e.set("bottomTickOffset", r);
                break;
            default:
                e.set("topTickOffset", 0), e.set("bottomTickOffset", 0)
        }
    }, getLineStart: function () {
        var e = this, t = e.get("styles"), n = t.padding, r = t.majorTicks, i = r.length, s = r.display, o = {x: 0, y: n.top};
        return s === "outside" ? o.y += i : s === "cross" && (o.y += i / 2), o
    }, drawTick: function (e, t, n) {
        var r = this, i = r.get("styles"), s = i.padding, o = n.length, u = {x: t.x, y: s.top}, a = {x: t.x, y: o + s.top};
        r.drawLine(e, u, a)
    }, getLabelPoint: function (e) {
        return{x: e.x, y: e.y - this.get("topTickOffset")}
    }, updateMaxLabelSize: function (e, t) {
        var n = this, r = this._labelRotationProps, i = r.rot, s = r.absRot, o = r.sinRadians, u = r.cosRadians, a;
        i === 0 ? a = t : s === 90 ? a = e : a = o * e + u * t, n._maxLabelSize = Math.max(n._maxLabelSize, a)
    }, getExplicitlySized: function (e) {
        if (this._explicitHeight) {
            var t = this, n = t._explicitHeight, r = t._totalTitleSize, i = t.get("topTickOffset"), s = e.label.margin.right;
            return t._maxLabelSize = n - (i + s + r), !0
        }
        return!1
    }, positionTitle: function (e) {
        var t = this, n = t._titleBounds, r = t.get("styles").title.margin, i = t._titleRotationProps, s = e.offsetWidth, o = e.offsetHeight, u = n.bottom - n.top, a = t.get("width") * .5 - s * .5, f = u / 2 - o / 2;
        i.labelWidth = s, i.labelHeight = o, r && r.top && (f += r.top), i.x = a, i.y = f, i.transformOrigin = [.5, .5], t._rotate(e, i)
    }, positionLabel: function (e, t, n, r) {
        var i = this, s = this._totalTitleSize, o = i._maxLabelSize, u = t.x, a = t.y + s + o, f = this._labelRotationProps, l = f.rot, c = f.absRot, h = this._labelWidths[r], p = this._labelHeights[r];
        l === 0 ? (u -= h * .5, a -= p) : l === 90 ? (u -= h, a -= p * .5) : l === -90 ? a -= p * .5 : l > 0 ? (u -= h, a -= p - p * l / 180) : a -= p - p * c / 180, f.x = Math.round(u), f.y = Math.round(a), f.labelWidth = h, f.labelHeight = p, this._rotate(e, f)
    }, _setRotationCoords: function (e) {
        var t = e.rot, n = e.absRot, r = e.labelWidth, i = e.labelHeight, s, o;
        t === 0 ? (s = r * .5, o = i) : t === 90 ? (s = r, o = i * .5) : t === -90 ? o = i * .5 : t > 0 ? (s = r, o = i - i * t / 180) : o = i - i * n / 180, e.x -= s, e.y -= o
    }, _getTransformOrigin: function (e) {
        var t;
        return e === 0 ? t = [0, 0] : e === 90 ? t = [1, .5] : e === -90 ? t = [0, .5] : e > 0 ? t = [1, .5] : t = [0, .5], t
    }, offsetNodeForTick: function () {
    }, setCalculatedSize: function () {
        var e = this, t = e.get("graphic"), n = e.get("styles"), r = n.label.margin, i = r.bottom + e._maxLabelSize, s = e._totalTitleSize, o = this.get("topTickOffset"), u = Math.round(o + i + s);
        this._explicitHeight && (u = this._explicitHeight), e.set("calculatedHeight", u), t.set("y", u - o)
    }}, e.TopAxisLayout = l, e.Axis = e.Base.create("axis", e.Widget, [e.AxisBase], {getLabelByIndex: function (e, t) {
        var n = this.get("position"), r = n === "left" || n === "right" ? "vertical" : "horizontal";
        return this._getLabelByIndex(e, t, r)
    }, bindUI: function () {
        this.after("dataReady", e.bind(this._dataChangeHandler, this)), this.after("dataUpdate", e.bind(this._dataChangeHandler, this)), this.after("stylesChange", this._updateHandler), this.after("overlapGraphChange", this._updateHandler), this.after("positionChange", this._positionChangeHandler), this.after("widthChange", this._handleSizeChange), this.after("heightChange", this._handleSizeChange), this.after("calculatedWidthChange", this._handleSizeChange), this.after("calculatedHeightChange", this._handleSizeChange)
    }, _calculatedWidth: 0, _calculatedHeight: 0, _dataChangeHandler: function () {
        this.get("rendered") && this._drawAxis()
    }, _positionChangeHandler: function (e) {
        this._updateGraphic(e.newVal), this._updateHandler()
    }, _updateGraphic: function (e) {
        var t = this.get("graphic");
        e === "none" ? t && t.destroy() : t || this._setCanvas()
    }, _updateHandler: function () {
        this.get("rendered") && this._drawAxis()
    }, renderUI: function () {
        this._updateGraphic(this.get("position"))
    }, syncUI: function () {
        var e = this._layout, t, n, r, i, s;
        if (e) {
            t = e._getDefaultMargins(), n = this.get("styles"), r = n.label.margin, i = n.title.margin;
            for (s in t)t.hasOwnProperty(s) && (r[s] = r[s] === undefined ? t[s] : r[s], i[s] = i[s] === undefined ?
                t[s] : i[s])
        }
        this._drawAxis()
    }, _setCanvas: function () {
        var t = this.get("contentBox"), n = this.get("boundingBox"), r = this.get("position"), i = this._parentNode, s = this.get("width"), o = this.get("height");
        n.setStyle("position", "absolute"), n.setStyle("zIndex", 2), s = s ? s + "px" : i.getStyle("width"), o = o ? o + "px" : i.getStyle("height"), r === "top" || r === "bottom" ? t.setStyle("width", s) : t.setStyle("height", o), t.setStyle("position", "relative"), t.setStyle("left", "0px"), t.setStyle("top", "0px"), this.set("graphic", new e.Graphic), this.get("graphic").render(t)
    }, _getDefaultStyles: function () {
        var t = {majorTicks: {display: "inside", length: 4, color: "#dad8c9", weight: 1, alpha: 1}, minorTicks: {display: "none", length: 2, color: "#dad8c9", weight: 1}, line: {weight: 1, color: "#dad8c9", alpha: 1}, majorUnit: {determinant: "count", count: 11, distance: 75}, top: "0px", left: "0px", width: "100px", height: "100px", label: {color: "#808080", alpha: 1, fontSize: "85%", rotation: 0, margin: {top: undefined, right: undefined, bottom: undefined, left: undefined}}, title: {color: "#808080", alpha: 1, fontSize: "85%", rotation: undefined, margin: {top: undefined, right: undefined, bottom: undefined, left: undefined}}, hideOverlappingLabelTicks: !1};
        return e.merge(e.Renderer.prototype._getDefaultStyles(), t)
    }, _handleSizeChange: function (e) {
        var t = e.attrName, n = this.get("position"), r = n === "left" || n === "right", i = this.get("contentBox"), s = n === "bottom" || n === "top";
        i.setStyle("width", this.get("width")), i.setStyle("height", this.get("height")), (s && t === "width" || r && t === "height") && this._drawAxis()
    }, _layoutClasses: {top: l, bottom: f, left: u, right: a}, drawLine: function (e, t, n) {
        e.moveTo(t.x, t.y), e.lineTo(n.x, n.y)
    }, _getTextRotationProps: function (e) {
        if (e.rotation === undefined)switch (this.get("position")) {
            case"left":
                e.rotation = -90;
                break;
            case"right":
                e.rotation = 90;
                break;
            default:
                e.rotation = 0
        }
        var t = Math.min(90, Math.max(-90, e.rotation)), n = Math.abs(t), r = Math.PI / 180, i = parseFloat(parseFloat(Math.sin(n * r)).toFixed(8)), s = parseFloat(parseFloat(Math.cos(n * r)).toFixed(8));
        return{rot: t, absRot: n, radCon: r, sinRadians: i, cosRadians: s, textAlpha: e.alpha}
    }, _drawAxis: function () {
        if (this._drawing) {
            this._callLater = !0;
            return
        }
        this._drawing = !0, this._callLater = !1;
        if (this._layout) {
            var e = this.get("styles"), t = e.line, n = e.label, r = e.majorTicks, i = r.display !== "none", s, o = e.majorUnit, u, a, f = 0, l = this._layout, c, h, p, d, v, m = this.get("labelFunction"), g = this.get("labelFunctionScope"), y = this.get("labelFormat"), b = this.get("graphic"), w = this.get("path"), E, S, x = this.get("position"), T, N, C, k, L, A = x === "left" || x === "right" ? "vertical" : "horizontal";
            this._labelWidths = [], this._labelHeights = [], b.set("autoDraw", !1), w.clear(), w.set("stroke", {weight: t.weight, color: t.color, opacity: t.alpha}), this._labelRotationProps = this._getTextRotationProps(n), this._labelRotationProps.transformOrigin = l._getTransformOrigin(this._labelRotationProps.rot), l.setTickOffsets.apply(this), c = this.getLength(), u = this.getTotalMajorUnits(), L = this.getEdgeOffset(u, c), this.set("edgeOffset", L), h = l.getLineStart.apply(this);
            if (this._labelValuesExplicitlySet)T = this._getDataFromLabelValues(h, this.get("labelValues"), L, c, A), k = T.points, N = T.values, u = k.length; else {
                a = this.getMajorUnitDistance(u, c, o), k = this._getPoints(h, u, L, a, A), N = [];
                for (f = 0; f < u; f += 1)N.push(this._getLabelByIndex(f, u, A))
            }
            this.get("hideFirstMajorUnit") && (k.shift(), N.shift(), u -= 1), this.get("hideLastMajorUnit") && (k.pop(), N.pop(), u -= 1);
            if (u < 1)this._clearLabelCache(); else {
                s = this.getFirstPoint(h), this.drawLine(w, h, this.getLineEnd(s));
                if (i) {
                    E = this.get("tickPath"), E.clear(), E.set("stroke", {weight: r.weight, color: r.color, opacity: r.alpha});
                    for (f = 0; f < u; f += 1)C = k[f], C && l.drawTick.apply(this, [E, k[f], r])
                }
                this._createLabelCache(), this._tickPoints = k, this._maxLabelSize = 0, this._totalTitleSize = 0, this._titleSize = 0, this._setTitle(), S = l.getExplicitlySized.apply(this, [e]);
                for (f = 0; f < u; f += 1)C = k[f], C && (p = this.getLabel(C, n), this._labels.push(p), this.get("appendLabelFunction")(p, m.apply(g, [N[f], y])), d = Math.round(p.offsetWidth), v = Math.round(p.offsetHeight), S || this._layout.updateMaxLabelSize.apply(this, [d, v]), this._labelWidths.push(d), this._labelHeights.push(v));
                this._clearLabelCache(), this.get("overlapGraph") && l.offsetNodeForTick.apply(this, [this.get("contentBox")]), l.setCalculatedSize.apply(this), this._titleTextField && this._layout.positionTitle.apply(this, [this._titleTextField]), u = this._labels.length;
                for (f = 0; f < u; ++f)l.positionLabel.apply(this, [this.get("labels")[f], this._tickPoints[f], e, f])
            }
        }
        this._drawing = !1, this._callLater ? this._drawAxis() : (this._updatePathElement(), this.fire("axisRendered"))
    }, _setTotalTitleSize: function (t) {
        var n = this._titleTextField, r = n.offsetWidth, i = n.offsetHeight, s = this._titleRotationProps.rot, o, u, a = t.margin, f = this.get("position"), l = new e.Matrix;
        l.rotate(s), o = l.getContentRect(r, i), f === "left" || f === "right" ? (u = o.right - o.left, a && (u += a.left + a.right)) : (u = o.bottom - o.top, a && (u += a.top + a.bottom)), this._titleBounds = o, this._totalTitleSize = u
    }, _updatePathElement: function () {
        var e = this._path, t = this._tickPath, n = !1, r = this.get("graphic");
        e && (n = !0, e.end()), t && (n = !0, t.end()), n && r._redraw()
    }, _setTitle: function () {
        var e, t, n, i = this.get("title"), s = this._titleTextField, o;
        if (i !== null && i !== undefined) {
            n = {rotation: "rotation", margin: "margin", alpha: "alpha"}, t = this.get("styles").title, s ? r.createElementNS || s.style.filter && (s.style.filter = null) : (s = r.createElement("span"), s.style.display = "block", s.style.whiteSpace = "nowrap", s.setAttribute("class", "axisTitle"), this.get("contentBox").append(s)), s.style.position = "absolute";
            for (e in t)t.hasOwnProperty(e) && !n.hasOwnProperty(e) && (s.style[e] = t[e]);
            this.get("appendTitleFunction")(s, i), this._titleTextField = s, this._titleRotationProps = this._getTextRotationProps(t), this._setTotalTitleSize(t)
        } else s && (o = s.parentNode, o && o.removeChild(s), this._titleTextField = null, this._totalTitleSize = 0)
    }, getLabel: function (t, n) {
        var i, s, o = this._labelCache, u = {rotation: "rotation", margin: "margin", alpha: "alpha"};
        o && o.length > 0 ? s = o.shift() : (s = r.createElement("span"), s.className = e.Lang.trim([s.className, "axisLabel"].join(" ")), this.get("contentBox").append(s)), r.createElementNS || s.style.filter && (s.style.filter = null), s.style.display = "block"
            , s.style.whiteSpace = "nowrap", s.style.position = "absolute";
        for (i in n)n.hasOwnProperty(i) && !u.hasOwnProperty(i) && (s.style[i] = n[i]);
        return s
    }, _createLabelCache: function () {
        if (this._labels)while (this._labels.length > 0)this._labelCache.push(this._labels.shift()); else this._clearLabelCache();
        this._labels = []
    }, _clearLabelCache: function () {
        if (this._labelCache) {
            var t = this._labelCache.length, n = 0, r;
            for (; n < t; ++n)r = this._labelCache[n], this._removeChildren(r), e.Event.purgeElement(r, !0), r.parentNode.removeChild(r)
        }
        this._labelCache = []
    }, getLineEnd: function (e) {
        var t = this.get("width"), n = this.get("height"), r = this.get("position");
        return r === "top" || r === "bottom" ? {x: t, y: e.y} : {x: e.x, y: n}
    }, getLength: function () {
        var e, t = this.get("styles"), n = t.padding, r = this.get("width"), i = this.get("height"), s = this.get("position");
        return s === "top" || s === "bottom" ? e = r - (n.left + n.right) : e = i - (n.top + n.bottom), e
    }, getFirstPoint: function (e) {
        var t = this.get("styles"), n = this.get("position"), r = t.padding, i = {x: e.x, y: e.y};
        return n === "top" || n === "bottom" ? i.x += r.left + this.get("edgeOffset") : i.y += this.get("height") - (r.top + this.get("edgeOffset")), i
    }, _getPoints: function (e, t, n, r, i) {
        var s = [], o, u = this.get("styles"), a, f, l, c, h, p;
        i === "vertical" ? (a = "x", f = "y", h = u.padding.top) : (a = "y", f = "x", h = u.padding.left), l = e[a], p = n + h;
        for (o = 0; o < t; o += 1)c = {}, c[a] = l, c[f] = p, s.push(c), p += r;
        return s
    }, _rotate: function (t, n) {
        var s = n.rot, u = n.x, a = n.y, f, l, c = new e.Matrix, h = n.transformOrigin || [0, 0], p;
        r.createElementNS ? (c.translate(u, a), c.rotate(s), o.setStyle(t, "transformOrigin", h[0] * 100 + "% " + h[1] * 100 + "%"), o.setStyle(t, "transform", c.toCSSText())) : (l = n.textAlpha, i.isNumber(l) && l < 1 && l > -1 && !isNaN(l) && (f = "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + Math.round(l * 100) + ")"), s !== 0 ? (c.rotate(s), p = c.getContentRect(n.labelWidth, n.labelHeight), c.init(), c.translate(p.left, p.top), c.translate(u, a), this._simulateRotateWithTransformOrigin(c, s, h, n.labelWidth, n.labelHeight), f ? f += " " : f = "", f += c.toFilterText(), t.style.left = c.dx + "px", t.style.top = c.dy + "px") : (t.style.left = u + "px", t.style.top = a + "px"), f && (t.style.filter = f))
    }, _simulateRotateWithTransformOrigin: function (e, t, n, r, i) {
        var s = n[0] * r, o = n[1] * i;
        s = isNaN(s) ? 0 : s, o = isNaN(o) ? 0 : o, e.translate(s, o), e.rotate(t), e.translate(-s, -o)
    }, getMaxLabelBounds: function () {
        return this._getLabelBounds(this.getMaximumValue())
    }, getMinLabelBounds: function () {
        return this._getLabelBounds(this.getMinimumValue())
    }, _getLabelBounds: function (t) {
        var n = this._layout, r = this.get("styles").label, i = new e.Matrix, s, o = this._getTextRotationProps(r);
        return o.transformOrigin = n._getTransformOrigin(o.rot), s = this.getLabel({x: 0, y: 0}, r), this.get("appendLabelFunction")(s, this.get("labelFunction").apply(this, [t, this.get("labelFormat")])), o.labelWidth = s.offsetWidth, o.labelHeight = s.offsetHeight, this._removeChildren(s), e.Event.purgeElement(s, !0), s.parentNode.removeChild(s), o.x = 0, o.y = 0, n._setRotationCoords(o), i.translate(o.x, o.y), this._simulateRotateWithTransformOrigin(i, o.rot, o.transformOrigin, o.labelWidth, o.labelHeight), i.getContentRect(o.labelWidth, o.labelHeight)
    }, _removeChildren: function (e) {
        if (e.hasChildNodes()) {
            var t;
            while (e.firstChild)t = e.firstChild, this._removeChildren(t), e.removeChild(t)
        }
    }, destructor: function () {
        var e = this.get("contentBox").getDOMNode(), t = this.get("labels"), n = this.get("graphic"), r, i = t ? t.length : 0;
        if (i > 0)while (t.length > 0)r = t.shift(), this._removeChildren(r), e.removeChild(r), r = null;
        n && n.destroy()
    }, _maxLabelSize: 0, _setText: function (e, t) {
        e.innerHTML = "", i.isNumber(t) ? t += "" : t || (t = ""), s(t) && (t = r.createTextNode(t)), e.appendChild(t)
    }, getTotalMajorUnits: function () {
        var e, t = this.get("styles").majorUnit, n = this.getLength();
        return t.determinant === "count" ? e = t.count : t.determinant === "distance" && (e = n / t.distance + 1), e
    }, getMajorUnitDistance: function (e, t, n) {
        var r;
        return n.determinant === "count" ? (this.get("calculateEdgeOffset") || (e -= 1), r = t / e) : n.determinant === "distance" && (r = n.distance), r
    }, _hasDataOverflow: function () {
        return this.get("setMin") || this.get("setMax") ? !0 : !1
    }, getMinimumValue: function () {
        return this.get("minimum")
    }, getMaximumValue: function () {
        return this.get("maximum")
    }}, {ATTRS: {width: {lazyAdd: !1, getter: function () {
        return this._explicitWidth ? this._explicitWidth : this._calculatedWidth
    }, setter: function (e) {
        return this._explicitWidth = e, e
    }}, height: {lazyAdd: !1, getter: function () {
        return this._explicitHeight ? this._explicitHeight : this._calculatedHeight
    }, setter: function (e) {
        return this._explicitHeight = e, e
    }}, calculatedWidth: {getter: function () {
        return this._calculatedWidth
    }, setter: function (e) {
        return this._calculatedWidth = e, e
    }}, calculatedHeight: {getter: function () {
        return this._calculatedHeight
    }, setter: function (e) {
        return this._calculatedHeight = e, e
    }}, edgeOffset: {value: 0}, graphic: {}, path: {readOnly: !0, getter: function () {
        if (!this._path) {
            var e = this.get("graphic");
            e && (this._path = e.addShape({type: "path"}))
        }
        return this._path
    }}, tickPath: {readOnly: !0, getter: function () {
        if (!this._tickPath) {
            var e = this.get("graphic");
            e && (this._tickPath = e.addShape({type: "path"}))
        }
        return this._tickPath
    }}, node: {}, position: {lazyAdd: !1, setter: function (e) {
        var t = this._layoutClasses[e];
        return e && e !== "none" && (this._layout = new t), e
    }}, topTickOffset: {value: 0}, bottomTickOffset: {value: 0}, leftTickOffset: {value: 0}, rightTickOffset: {value: 0}, labels: {readOnly: !0, getter: function () {
        return this._labels
    }}, tickPoints: {readOnly: !0, getter: function () {
        return this.get("position") === "none" ? this.get("styles").majorUnit.count : this._tickPoints
    }}, overlapGraph: {value: !0, validator: function (e) {
        return i.isBoolean(e)
    }}, maxLabelSize: {getter: function () {
        return this._maxLabelSize
    }, setter: function (e) {
        return this._maxLabelSize = e, e
    }}, title: {value: null}, appendLabelFunction: {valueFn: function () {
        return this._setText
    }}, appendTitleFunction: {valueFn: function () {
        return this._setText
    }}, labelValues: {lazyAdd: !1, setter: function (e) {
        var t = arguments[2];
        return!e || t && t.src && t.src === "internal" ? this._labelValuesExplicitlySet = !1 : this._labelValuesExplicitlySet = !0, e
    }}, hideFirstMajorUnit: {value: !1}, hideLastMajorUnit: {value: !1}}}), e.AxisType = e.Base.create("baseAxis", e.Axis, [], {})
}, "patched-dev-3.x", {requires: ["dom", "widget", "widget-position"
    , "widget-stack", "graphics", "axis-base"]});