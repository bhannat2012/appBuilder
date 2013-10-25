YUI.add("series-plot-util", function (e, t) {
    function s(e) {
        var t = {markers: {getter: function () {
            return this._markers
        }}};
        this.addAttrs(t, e)
    }

    var n = e.Lang, r = e.ClassNameManager.getClassName, i = r("seriesmarker");
    s.prototype = {_plotDefaults: null, drawPlots: function () {
        if (!this.get("xcoords") || this.get("xcoords").length < 1)return;
        var t = n.isNumber, r = e.clone(this.get("styles").marker), i = r.width, s = r.height, o = this.get("xcoords"), u = this.get("ycoords"), a = 0, f = o.length, l = u[0], c, h, p = i / 2, d = s / 2, v, m, g = null, y = null, b = this.get("graphOrder"), w = this.get("groupMarkers");
        if (w) {
            v = [], m = [];
            for (; a < f; ++a)v.push(parseFloat(o[a] - p)), m.push(parseFloat(u[a] - d));
            this._createGroupMarker({xvalues: v, yvalues: m, fill: r.fill, border: r.border, dimensions: {width: i, height: s}, graphOrder: b, shape: r.shape});
            return
        }
        n.isArray(r.fill.color) && (g = r.fill.color.concat()), n.isArray(r.border.color) && (y = r.border.color.concat()), this._createMarkerCache();
        for (; a < f; ++a) {
            l = parseFloat(u[a] - d), c = parseFloat(o[a] - p);
            if (!t(c) || !t(l)) {
                this._markers.push(null);
                continue
            }
            g && (r.fill.color = g[a % g.length]), y && (r.border.color = y[a % y.length]), r.x = c, r.y = l, h = this.getMarker(r, b, a)
        }
        this._clearMarkerCache()
    }, _groupShapes: {circle: e.CircleGroup, rect: e.RectGroup, ellipse: e.EllipseGroup, diamond: e.DiamondGroup}, _getGroupShape: function (e) {
        return n.isString(e) && (e = this._groupShapes[e]), e
    }, _getPlotDefaults: function () {
        var e = {fill: {type: "solid", alpha: 1, colors: null, alphas: null, ratios: null}, border: {weight: 1, alpha: 1}, width: 10, height: 10, shape: "circle"};
        return e.fill.color = this._getDefaultColor(this.get("graphOrder"), "fill"), e.border.color = this._getDefaultColor(this.get("graphOrder"), "border"), e
    }, _markers: null, _markerCache: null, getMarker: function (e, t, n) {
        var r, i = e.border;
        e.id = this._getChart().get("id") + "_" + t + "_" + n, i.opacity = i.alpha, e.stroke = i, e.fill.opacity = e.fill.alpha;
        if (this._markerCache.length > 0) {
            while (!r) {
                if (this._markerCache.length < 1) {
                    r = this._createMarker(e);
                    break
                }
                r = this._markerCache.shift()
            }
            r.set(e)
        } else r = this._createMarker(e);
        return this._markers.push(r), r
    }, _createMarker: function (t) {
        var n = this.get("graphic"), r, s = e.clone(t);
        return s.type = s.shape, r = n.addShape(s), r.addClass(i), r
    }, _createMarkerCache: function () {
        this._groupMarker && (this._groupMarker.destroy(), this._groupMarker = null), this._markers && this._markers.length > 0 ? this._markerCache = this._markers.concat() : this._markerCache = [], this._markers = []
    }, _createGroupMarker: function (e) {
        var t, n = this.get("markers"), r = e.border, i, s, o;
        if (n && n.length > 0) {
            while (n.length > 0)t = n.shift(), t.destroy();
            this.set("markers", [])
        }
        r.opacity = r.alpha, s = {id: this._getChart().get("id") + "_" + e.graphOrder, stroke: r, fill: e.fill, dimensions: e.dimensions, xvalues: e.xvalues, yvalues: e.yvalues}, s.fill.opacity = e.fill.alpha, o = this._getGroupShape(e.shape), o && (s.type = o), e.hasOwnProperty("radius") && !isNaN(e.radius) && (s.dimensions.radius = e.radius), this._groupMarker && this._groupMarker.destroy(), i = this.get("graphic"), this._groupMarker = i.addShape(s), i._redraw()
    }, _toggleVisible: function (e) {
        var t, n = this.get("markers"), r = 0, i;
        if (n) {
            i = n.length;
            for (; r < i; ++r)t = n[r], t && t.set("visible", e)
        }
    }, _clearMarkerCache: function () {
        var e;
        while (this._markerCache.length > 0)e = this._markerCache.shift(), e && e.destroy()
    }, updateMarkerState: function (t, n) {
        if (this._markers && this._markers[n]) {
            var r, i, s = e.clone(this.get("styles").marker), o = this._getState(t), u = this.get("xcoords"), a = this.get("ycoords"), f = this._markers[n], l = o === "off" || !s[o] ? s : s[o];
            l.fill.color = this._getItemColor(l.fill.color, n), l.border.color = this._getItemColor(l.border.color, n), l.stroke = l.border, f.set(l), r = l.width, i = l.height, f.set("x", u[n] - r / 2), f.set("y", a[n] - i / 2), f.set("visible", this.get("visible"))
        }
    }, _getItemColor: function (e, t) {
        return n.isArray(e) ? e[t % e.length] : e
    }, _setStyles: function (t) {
        return t = this._parseMarkerStyles(t), e.Renderer.prototype._setStyles.apply(this, [t])
    }, _parseMarkerStyles: function (e) {
        if (e.marker) {
            var t = this._getPlotDefaults();
            e.marker = this._mergeStyles(e.marker, t), e.marker.over && (e.marker.over = this._mergeStyles(e.marker.over, e.marker)), e.marker.down && (e.marker.down = this._mergeStyles(e.marker.down, e.marker))
        }
        return e
    }, _getState: function (e) {
        var t;
        switch (e) {
            case"mouseout":
                t = "off";
                break;
            case"mouseover":
                t = "over";
                break;
            case"mouseup":
                t = "over";
                break;
            case"mousedown":
                t = "down"
        }
        return t
    }, _stateSyles: null, drawSeries: function () {
        this.drawPlots()
    }, _getDefaultStyles: function () {
        var e = this._mergeStyles({marker: this._getPlotDefaults()}, this.constructor.superclass._getDefaultStyles());
        return e
    }}, e.augment(s, e.Attribute), e.Plots = s
}, "patched-dev-3.x");
