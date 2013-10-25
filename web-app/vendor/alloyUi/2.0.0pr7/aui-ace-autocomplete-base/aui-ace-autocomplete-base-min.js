YUI.add("aui-ace-autocomplete-base", function (e, t) {
    var n = e.Lang, r = e.Array, i = e.Do, s = e.DOM, o = "exec", u = "fillMode", a = "host", f = "insertText", l = "processor", c = 1, h = 0, p = -1, d = 0, v = "ace-autocomplete-base", m = "addSuggestion", g = "change", y = "changeCursor", b = "cursorChange", w = "cursorOut", E = "destroy", S = "filters", x = "golinedown", T = "golineup", N = "gotoend", C = "gotolineend", k = "gotolinestart", L = "gotopagedown", A = "gotopageup", O = "gotostart", M = "match", _ = "onTextInput", D = "removeText", P = "renderUI", H = "results", B = "resultsError", j = "showAutoComplete", F = "showListKey", I = "sorters", q = function () {
    };
    q.prototype = {initializer: function () {
        var t = this, n;
        t._editorCommands = [], e.after(t._bindUIACBase, t, P), n = t.get(l), n && !n.get(a) && n.set(a, t), t._onResultsErrorFn = e.bind("_onResultsError", t), t._onResultsSuccessFn = e.bind("_onResultsSuccess", t)
    }, _addSuggestion: function (e) {
        var t = this, n, r, s, o, a, f, c, h;
        return t._lockEditor = !0, s = t._getEditor(), r = t.get(l).getSuggestion(t._matchParams.match, e), t.get(u) === q.FILL_MODE_OVERWRITE ? (o = t._matchParams, h = o.row, c = o.column - o.match.content.length, n = s.getCursorPosition(), f = require("ace/range").Range, a = new f(h, c, n.row, n.column), s.getSession().replace(a, r)) : s.insert(r), s.focus(), t._lockEditor = !1, t.fire(m, r), new i.Halt(null)
    }, _bindUIACBase: function () {
        var t = this, n;
        t.publish(b, {defaultFn: t._defaultCursorChangeFn}), n = t._getEditor(), t._onChangeFn = e.bind("_onEditorChange", t), n.on(g, t._onChangeFn), n.commands.addCommand({name: j, bindKey: e.merge(t.get(F), {sender: "editor|cli"}), exec: function (e, r, i) {
            var s = n.getCursorPosition();
            t._processAutoComplete(s.row, s.column)
        }}), t._onEditorChangeCursorFn = e.bind("_onEditorChangeCursor", t), n.getSelection().on(y, t._onEditorChangeCursorFn), t.on(E, t._destroyUIACBase, t)
    }, _defaultCursorChangeFn: function (e) {
        var t = this, n, r, i, s, o;
        i = t._getEditor(), r = i.getCursorPosition(), o = r.row, n = r.column, s = t._matchParams, (o !== s.row || n < s.match.start) && t.fire(w)
    }, _destroyUIACBase: function () {
        var e = this, t;
        t = e._getEditor(), t.commands.removeCommand(j), t.removeListener(g, e._onChangeFn), t.getSelection().removeListener(y, e._onEditorChangeCursorFn), e._removeAutoCompleteCommands()
    }, _getEditor: function () {
        var e = this;
        return e.get(a).getEditor()
    }, _filterResults: function (e, t) {
        var n = this, r, i, s, o;
        r = n.get(S);
        for (i = 0, s = r.length; i < s; ++i) {
            t = r[i].call(n, e, t.concat());
            if (!t.length)break
        }
        o = n.get(I);
        for (i = 0, s = o.length; i < s; ++i) {
            t = o[i].call(n, e, t.concat());
            if (!t.length)break
        }
        return t
    }, _handleEnter: function (e) {
        var t = this, n;
        if (e === "\n" || e === "	")return n = t._getSelectedEntry(), t._addSuggestion(n)
    }, _onEditorChange: function (e) {
        var t = this, n, r, i, s, o, u;
        r = e.data, i = r.action, !t._lockEditor && (i === f || i === D) && (s = r.range, n = s.start.column, o = s.end.row, u = s.start.row, i === f && u === o && t._processAutoComplete(u, n + 1), t.fire(i, {column: n, dataRange: s, endRow: o, startRow: u}))
    }, _onEditorChangeCursor: function (e) {
        var t = this;
        t.fire(b, t._getEditor().getCursorPosition())
    }, _onResultsError: function (e) {
        var t = this;
        t.fire(B, e)
    }, _onResultsSuccess: function (e) {
        var t = this;
        t.set(H, e)
    }, _overwriteCommands: function () {
        var e = this, t, n;
        n = e._getEditor(), t = n.commands.commands, e._editorCommands.push(i.before(e._handleEnter, n, _, e), i.before(e._handleKey, t[x], o, e, 40), i.before(e._handleKey, t[T], o, e, 38), i.before(e._handleKey, t[N], o, e, 35), i.before(e._handleKey, t[C], o, e, 35), i.before(e._handleKey, t[k], o, e, 36), i.before(e._handleKey, t[L], o, e, 34), i.before(e._handleKey, t[A], o, e, 33), i.before(e._handleKey, t[O], o, e, 36))
    }, _phraseMatch: function (e, t, n) {
        return e ? r.filter(t, function (t) {
            var r = !0;
            return t === e ? r = !1 : (n || (t = t.toLowerCase(), e = e.toLowerCase()), t.indexOf(e) === -1 && (r = !1)), r
        }) : t
    }, _processAutoComplete: function (e, t) {
        var r = this, i, o, u, a, f, c;
        i = t, u = r._getEditor(), a = u.getSession().getLine(e), a = a.substring(0, t), c = r.get(l), f = c.getMatch(a), n.isObject(f) && (o = u.renderer.textToScreenCoordinates(e, t), o.pageX += s.docScrollX(), o.pageY += s.docScrollY(), r._matchParams = {column: t, match: f, row: e}, c.getResults(f, r._onResultsSuccessFn, r._onResultsErrorFn)), r.fire(M, {column: t, coords: o, line: a, match: f, row: e})
    }, _removeAutoCompleteCommands: function () {
        var t = this;
        (new e.EventHandle(t._editorCommands)).detach(), t._editorCommands.length = 0
    }, _sortAscLength: function (e, t, n) {
        return t.sort(function (t, r) {
            var i, s, o;
            return o = 0, n || (t = t.toLowerCase(), r = r.toLowerCase()), i = t.indexOf(e), s = r.indexOf(e), i === 0 && s === 0 ? o = t.localeCompare(r) : i === 0 ? o = -1 : s === 0 ? o = 1 : o = t.localeCompare(r), o
        })
    }, _validateFillMode: function (e) {
        return e === q.FILL_MODE_OVERWRITE || e === q.FILL_MODE_INSERT
    }}, q.FILL_MODE_INSERT = c, q.FILL_MODE_OVERWRITE = h, q.NAME = v, q.NS = v, q.ATTRS = {fillMode: {validator: "_validateFillMode", value: q.FILL_MODE_OVERWRITE}, filters: {valueFn: function () {
        var e = this;
        return[e._phraseMatch]
    }}, processor: {validator: function (e) {
        return n.isObject(e) || n.isFunction(e)
    }}, showListKey: {validator: n.isObject, value: {mac: "Alt-Space", win: "Ctrl-Space"}}, sorters: {valueFn: function () {
        var e = this;
        return[e._sortAscLength]
    }}}, e.AceEditor.AutoCompleteBase = q
}, "2.0.0pr7", {requires: ["aui-ace-editor"]});
