define("ace/ext/language_tools", ["require", "exports", "module", "ace/snippets", "ace/autocomplete", "ace/config", "ace/autocomplete/text_completer", "ace/editor"], function (e, t, n) {
    var r = e("../snippets").snippetManager, i = e("../autocomplete").Autocomplete, s = e("../config"), o = e("../autocomplete/text_completer"), u = {getCompletions: function (e, t, n, r, i) {
        var s = t.$mode.$keywordList || [];
        s = s.filter(function (e) {
            return e.lastIndexOf(r, 0) == 0
        }), i(null, s.map(function (e) {
            return{name: e, value: e, score: 0, meta: "keyword"}
        }))
    }}, a = {getCompletions: function (e, t, n, i, s) {
        var o = r.$getScope(e), u = r.snippetMap, a = [];
        [o, "_"].forEach(function (e) {
            var t = u[e] || [];
            for (var n = t.length; n--;) {
                var r = t[n];
                r.tabTrigger && r.tabTrigger.indexOf(i) === 0 && a.push({caption: r.tabTrigger, snippet: r.content, meta: "snippet"})
            }
        }, this), s(null, a)
    }}, f = [a, o, u];
    t.addCompleter = function (e) {
        f.push(e)
    };
    var l = {name: "expandSnippet", exec: function (e) {
        var t = r.expandWithTab(e);
        t || e.execCommand("indent")
    }, bindKey: "tab"}, c = function (e, t) {
        var n = t.session.$mode, i = n.$id;
        r.files || (r.files = {});
        if (i && !r.files[i]) {
            var o = i.replace("mode", "snippets");
            s.loadModule(o, function (e) {
                e && (r.files[i] = e, e.snippets = r.parseSnippetFile(e.snippetText), r.register(e.snippets, e.scope))
            })
        }
    }, h = e("../editor").Editor;
    e("../config").defineOptions(h.prototype, "editor", {enableBasicAutocompletion: {set: function (e) {
        e ? (this.completers = f, this.commands.addCommand(i.startCommand)) : this.commands.removeCommand(i.startCommand)
    }, value: !1}, enableSnippets: {set: function (e) {
        e ? (this.commands.addCommand(l), this.on("changeMode", c), c(null, this)) : (this.commands.removeCommand(l), this.off("changeMode", c))
    }, value: !1}})
}), define("ace/snippets", ["require", "exports", "module", "ace/lib/lang", "ace/range", "ace/keyboard/hash_handler", "ace/tokenizer", "ace/lib/dom"], function (t, n, r) {
    var i = t("./lib/lang"), s = t("./range").Range, o = t("./keyboard/hash_handler").HashHandler, u = t("./tokenizer").Tokenizer, a = s.comparePoints, f = function () {
        this.snippetMap = {}, this.snippetNameMap = {}
    };
    (function () {
        this.getTokenizer = function () {
            function e(e, t, n) {
                return e = e.substr(1), /^\d+$/.test(e) && !n.inFormatString ? [
                    {tabstopId: parseInt(e, 10)}
                ] : [
                    {text: e}
                ]
            }

            function t(e) {
                return"(?:[^\\\\" + e + "]|\\\\.)"
            }

            return f.$tokenizer = new u({start: [
                {regex: /:/, onMatch: function (e, t, n) {
                    return n.length && n[0].expectIf ? (n[0].expectIf = !1, n[0].elseBranch = n[0], [n[0]]) : ":"
                }},
                {regex: /\\./, onMatch: function (e, t, n) {
                    var r = e[1];
                    return r == "}" && n.length ? e = r : "`$\\".indexOf(r) != -1 ? e = r : n.inFormatString && (r == "n" ? e = "\n" : r == "t" ? e = "\n" : "ulULE".indexOf(r) != -1 && (e = {changeCase: r, local: r > "a"})), [e]
                }},
                {regex: /}/, onMatch: function (e, t, n) {
                    return[n.length ? n.shift() : e]
                }},
                {regex: /\$(?:\d+|\w+)/, onMatch: e},
                {regex: /\$\{[\dA-Z_a-z]+/, onMatch: function (t, n, r) {
                    var i = e(t.substr(1), n, r);
                    return r.unshift(i[0]), i
                }, next: "snippetVar"},
                {regex: /\n/, token: "newline", merge: !1}
            ], snippetVar: [
                {regex: "\\|" + t("\\|") + "*\\|", onMatch: function (e, t, n) {
                    n[0].choices = e.slice(1, -1).split(",")
                }, next: "start"},
                {regex: "/(" + t("/") + "+)/(?:(" + t("/") + "*)/)(\\w*):?", onMatch: function (e, t, n) {
                    var r = n[0];
                    return r.fmtString = e, e = this.splitRegex.exec(e), r.guard = e[1], r.fmt = e[2], r.flag = e[3], ""
                }, next: "start"},
                {regex: "`" + t("`") + "*`", onMatch: function (e, t, n) {
                    return n[0].code = e.splice(1, -1), ""
                }, next: "start"},
                {regex: "\\?", onMatch: function (e, t, n) {
                    n[0] && (n[0].expectIf = !0)
                }, next: "start"},
                {regex: "([^:}\\\\]|\\\\.)*:?", token: "", next: "start"}
            ], formatString: [
                {regex: "/(" + t("/") + "+)/", token: "regex"},
                {regex: "", onMatch: function (e, t, n) {
                    n.inFormatString = !0
                }, next: "start"}
            ]}), f.prototype.getTokenizer = function () {
                return f.$tokenizer
            }, f.$tokenizer
        }, this.tokenizeTmSnippet = function (e, t) {
            return this.getTokenizer().getLineTokens(e, t).tokens.map(function (e) {
                return e.value || e
            })
        }, this.$getDefaultValue = function (t, n) {
            if (/^[A-Z]\d+$/.test(n)) {
                var r = n.substr(1);
                return(this.variables[n[0] + "__"] || {})[r]
            }
            if (/^\d+$/.test(n))return(this.variables.__ || {})[n];
            n = n.replace(/^TM_/, "");
            if (!t)return;
            var i = t.session;
            switch (n) {
                case"CURRENT_WORD":
                    var s = i.getWordRange();
                case"SELECTION":
                case"SELECTED_TEXT":
                    return i.getTextRange(s);
                case"CURRENT_LINE":
                    return i.getLine(e.getCursorPosition().row);
                case"LINE_INDEX":
                    return e.getCursorPosition().column;
                case"LINE_NUMBER":
                    return e.getCursorPosition().row + 1;
                case"SOFT_TABS":
                    return i.getUseSoftTabs() ? "YES" : "NO";
                case"TAB_SIZE":
                    return i.getTabSize();
                case"FILENAME":
                case"FILEPATH":
                    return"ace.ajax.org";
                case"FULLNAME":
                    return"Ace"
            }
        }, this.variables = {}, this.getVariableValue = function (e, t) {
            return this.variables.hasOwnProperty(t) ? this.variables[t](e, t) || "" : this.$getDefaultValue(e, t) || ""
        }, this.tmStrFormat = function (e, t, n) {
            var r = t.flag || "", i = t.guard;
            i = new RegExp(i, r.replace(/[^gi]/, ""));
            var s = this.tokenizeTmSnippet(t.fmt, "formatString"), o = this, u = e.replace(i, function () {
                o.variables.__ = arguments;
                var e = o.resolveVariables(s, n), t = "E";
                for (var r = 0; r < e.length; r++) {
                    var i = e[r];
                    if (typeof i == "object") {
                        e[r] = "";
                        if (i.changeCase && i.local) {
                            var u = e[r + 1];
                            u && typeof u == "string" && (i.changeCase == "u" ? e[r] = u[0].toUpperCase() : e[r] = u[0].toLowerCase(), e[r + 1] = u.substr(1))
                        } else i.changeCase && (t = i.changeCase)
                    } else t == "U" ? e[r] = i.toUpperCase() : t == "L" && (e[r] = i.toLowerCase())
                }
                return e.join("")
            });
            return this.variables.__ = null, u
        }, this.resolveVariables = function (e, t) {
            function o(t) {
                var n = e.indexOf(t, r + 1);
                n != -1 && (r = n)
            }

            var n = [];
            for (var r = 0; r < e.length; r++) {
                var i = e[r];
                if (typeof i == "string")n.push(i); else {
                    if (typeof i != "object")continue;
                    if (i.skip)o(i); else {
                        if (i.processed < r)continue;
                        if (i.text) {
                            var s = this.getVariableValue(t, i.text);
                            s && i.fmtString && (s = this.tmStrFormat(s, i)), i.processed = r, i.expectIf == null ? s && (n.push(s), o(i)) : s ? i.skip = i.elseBranch : o(i)
                        } else i.tabstopId != null ? n.push(i) : i.changeCase != null && n.push(i)
                    }
                }
            }
            return n
        }, this.insertSnippet = function (e, t) {
            var n = e.getCursorPosition(), r = e.session.getLine(n.row), i = r.match(/^\s*/)[0], s = e.session.getTabString(), o = this.tokenizeTmSnippet(t);
            o = this.resolveVariables(o, e), o = o.map(function (e) {
                return e == "\n" ? e + i : typeof e == "string" ? e.replace(/\t/g, s) : e
            });
            var u = [];
            o.forEach(function (e, t) {
                if (typeof e != "object")return;
                var n = e.tabstopId;
                u[n] || (u[n] = [], u[n].index = n, u[n].value = "");
                if (u[n].indexOf(e) != -1)return;
                u[n].push(e);
                var r = o.indexOf(e, t + 1);
                if (r == -1)return;
                var i = o.slice(t + 1, r).join("");
                i && (u[n].value = i)
            }), u.forEach(function (e) {
                e.value && e.forEach(function (t) {
                    var n = o.indexOf(t), r = o.indexOf(t, n + 1);
                    r == -1 ? o.splice(n + 1, 0, e.value, t) : r == n + 1 && o.splice(n + 1, 0, e.value)
                })
            });
            var a = 0, f = 0, c = "";
            o.forEach(function (e) {
                typeof e == "string" ? (e[0] == "\n" ? (f = e.length - 1, a++) : f += e.length, c += e) : e.start ? e.end = {row: a, column: f} : e.start = {row: a, column: f}
            });
            var h = e.getSelectionRange(), p = e.session.replace(h, c), d = new l(e);
            d.addTabstops(u, h.start, p), d.tabNext()
        }, this.$getScope = function (e) {
            var t = e.session.$mode.$id || "";
            t = t.split("/").pop();
            if (e.session.$mode.$modes) {
                var n = e.getCursorPosition(), r = e.session.getState(n.row);
                r.substring && (r.substring(0, 3) == "js-" ? t = "javascript" : r.substring(0, 4) == "css-" ? t = "css" : r.substring(0, 4) == "php-" && (t = "php"))
            }
            return t
        }, this.expandWithTab = function (e) {
            var t = e.getCursorPosition(), n = e.session.getLine(t.row), r = n.substring(0, t.column), i = n.substr(t.column), s = this.$getScope(e), o = this.snippetMap, u;
            return[s, "_"].some(function (e) {
                var t = o[e];
                return t && (u = this.findMatchingSnippet(t, r, i)), !!u
            }, this), u ? (e.session.doc.removeInLine(t.row, t.column - u.replaceBefore.length, t.column + u.replaceAfter.length), this.variables.M__ = u.matchBefore, this.variables.T__ = u.matchAfter, this.insertSnippet(e, u.content), this.variables.M__ = this.variables.T__ = null, !0) : !1
        }, this.findMatchingSnippet = function (e, t, n) {
            for (var r = e.length; r--;) {
                var i = e[r];
                if (i.startRe && !i.startRe.test(t))continue;
                if (i.endRe && !i.endRe.test(n))continue;
                if (!i.startRe && !i.endRe)continue;
                return i.matchBefore = i.startRe ? i.startRe.exec(t) : [""], i.matchAfter = i.endRe ? i.endRe.exec(n) : [""], i.replaceBefore = i.triggerRe ? i.triggerRe.exec(t)[0] : "", i.replaceAfter = i.endTriggerRe ? i.endTriggerRe.exec(n)[0] : "", i
            }
        }, this.snippetMap = {}, this.snippetNameMap = {}, this.register = function (e, t) {
            function o(e) {
                return e && !/^\^?\(.*\)\$?$|^\\b$/.test(e) && (e = "(?:" + e + ")"), e || ""
            }

            function u(e, t, n) {
                return e = o(e), t = o(t), n ? (e = t + e, e && e[e.length - 1] != "$" && (e += "$")) : (e += t, e && e[0] != "^" && (e = "^" + e)), new RegExp(e)
            }

            function a(e) {
                e.scope || (e.scope = t || "_"), t = e.scope, n[t] || (n[t] = [], r[t] = {});
                var o = r[t];
                if (e.name) {
                    var a = o[e.name];
                    a && s.unregister(a), o[e.name] = e
                }
                n[t].push(e), e.tabTrigger && !e.trigger && (!e.guard && /^\w/.test(e.tabTrigger) && (e.guard = "\\b"), e.trigger = i.escapeRegExp(e.tabTrigger)), e.startRe = u(e.trigger, e.guard, !0), e.triggerRe = new RegExp(e.trigger, "", !0), e.endRe = u(e.endTrigger, e.endGuard, !0), e.endTriggerRe = new RegExp(e.endTrigger, "", !0)
            }

            var n = this.snippetMap, r = this.snippetNameMap, s = this;
            e.content ? a(e) : Array.isArray(e) && e.forEach(a)
        }, this.unregister = function (e, t) {
            function i(e) {
                var i = r[e.scope || t];
                if (i && i[e.name]) {
                    delete i[e.name];
                    var s = n[e.scope || t], o = s && s.indexOf(e);
                    o >= 0 && s.splice(o, 1)
                }
            }

            var n = this.snippetMap, r = this.snippetNameMap;
            e.content ? i(e) : Array.isArray(e) && e.forEach(i)
        }, this.parseSnippetFile = function (e) {
            e = e.replace(/\r/, "");
            var t = [], n = {}, r = /^#.*|^({[\s\S]*})\s*$|^(\S+) (.*)$|^((?:\n*\t.*)+)/gm, i;
            while (i = r.exec(e)) {
                if (i[1])try {
                    n = JSON.parse(i[1]), t.push(n)
                } catch (s) {
                }
                if (i[4])n.content = i[4].replace(/^\t/gm, ""), t.push(n), n = {}; else {
                    var o = i[2], u = i[3];
                    if (o == "regex") {
                        var a = /\/((?:[^\/\\]|\\.)*)|$/g;
                        n.guard = a.exec(u)[1], n.trigger = a.exec(u)[1], n.endTrigger = a.exec(u)[1], n.endGuard = a.exec(u)[1]
                    } else o == "snippet" ? (n.tabTrigger = u.match(/^\S*/)[0], n.name || (n.name = u)) : n[o] = u
                }
            }
            return t
        }, this.getSnippetByName = function (e, t) {
            var n = t && this.$getScope(t), r = this.snippetNameMap, i;
            return[n, "_"].some(function (t) {
                var n = r[t];
                return n && (i = n[e]), !!i
            }, this), i
        }
    }).call(f.prototype);
    var l = function (e) {
        if (e.tabstopManager)return e.tabstopManager;
        e.tabstopManager = this, this.$onChange = this.onChange.bind(this), this.$onChangeSelection = i.delayedCall(this.onChangeSelection.bind(this)).schedule, this.$onChangeSession = this.onChangeSession.bind(this), this.$onAfterExec = this.onAfterExec.bind(this), this.attach(e)
    };
    (function () {
        this.attach = function (e) {
            this.index = -1, this.ranges = [], this.tabstops = [], this.selectedTabstop = null, this.editor = e, this.editor.on("change", this.$onChange), this.editor.on("changeSelection", this.$onChangeSelection), this.editor.on("changeSession", this.$onChangeSession), this.editor.commands.on("afterExec", this.$onAfterExec), this.editor.keyBinding.addKeyboardHandler(this.keyboardHandler)
        }, this.detach = function () {
            this.tabstops.forEach(this.removeTabstopMarkers, this), this.ranges = null, this.tabstops = null, this.selectedTabstop = null, this.editor.removeListener("change", this.$onChange), this.editor.removeListener("changeSelection", this.$onChangeSelection), this.editor.removeListener("changeSession", this.$onChangeSession), this.editor.commands.removeListener("afterExec", this.$onAfterExec), this.editor.keyBinding.removeKeyboardHandler(this.keyboardHandler), this.editor.tabstopManager = null, this.editor = null
        }, this.onChange = function (e) {
            var t = e.data.range, n = e.data.action[0] == "r", r = t.start, i = t.end, s = r.row, o = i.row, u = o - s, f = i.column - r.column;
            n && (u = -u, f = -f);
            if (!this.$inChange && n) {
                var l = this.selectedTabstop, c = !l.some(function (e) {
                    return a(e.start, r) <= 0 && a(e.end, i) >= 0
                });
                if (c)return this.detach()
            }
            var h = this.ranges;
            for (var p = 0; p < h.length; p++) {
                var d = h[p];
                if (d.end.row < r.row)continue;
                if (a(r, d.start) < 0 && a(i, d.end) > 0) {
                    this.removeRange(d), p--;
                    continue
                }
                d.start.row == s && d.start.column > r.column && (d.start.column += f), d.end.row == s && d.end.column >= r.column && (d.end.column += f), d.start.row >= s && (d.start.row += u), d.end.row >= s && (d.end.row += u), a(d.start, d.end) > 0 && this.removeRange(d)
            }
            h.length || this.detach()
        }, this.updateLinkedFields = function () {
            var e = this.selectedTabstop;
            if (!e.hasLinkedRanges)return;
            this.$inChange = !0;
            var t = this.editor.session, r = t.getTextRange(e.firstNonLinked);
            for (var i = e.length; i--;) {
                var s = e[i];
                if (!s.linked)continue;
                var o = n.snippetManager.tmStrFormat(r, s.original);
                t.replace(s, o)
            }
            this.$inChange = !1
        }, this.onAfterExec = function (e) {
            e.command && !e.command.readOnly && this.updateLinkedFields()
        }, this.onChangeSelection = function () {
            if (!this.editor)return;
            var e = this.editor.selection.lead, t = this.editor.selection.anchor, n = this.editor.selection.isEmpty();
            for (var r = this.ranges.length; r--;) {
                if (this.ranges[r].linked)continue;
                var i = this.ranges[r].contains(e.row, e.column), s = n || this.ranges[r].contains(t.row, t.column);
                if (i && s)return
            }
            this.detach()
        }, this.onChangeSession = function () {
            this.detach()
        }, this.tabNext = function (e) {
            var t = this.tabstops.length - 1, n = this.index + (e || 1);
            n = Math.min(Math.max(n, 0), t), this.selectTabstop(n), n == t && this.detach()
        }, this.selectTabstop = function (e) {
            var t = this.tabstops[this.index];
            t && this.addTabstopMarkers(t), this.index = e, t = this.tabstops[this.index];
            if (!t || !t.length)return;
            this.selectedTabstop = t;
            if (!this.editor.inVirtualSelectionMode) {
                var n = this.editor.multiSelect;
                n.toSingleRange(t.firstNonLinked.clone());
                for (var r = t.length; r--;) {
                    if (t.hasLinkedRanges && t[r].linked)continue;
                    n.addRange(t[r].clone(), !0)
                }
            } else this.editor.selection.setRange(t.firstNonLinked);
            this.editor.keyBinding.addKeyboardHandler(this.keyboardHandler)
        }, this.addTabstops = function (e, t, n) {
            if (!e[0]) {
                var r = s.fromPoints(n, n);
                h(r.start, t), h(r.end, t), e[0] = [r], e[0].index = 0
            }
            var i = this.index, o = [i, 0], u = this.ranges, a = this.editor;
            e.forEach(function (e) {
                for (var n = e.length; n--;) {
                    var r = e[n], i = s.fromPoints(r.start, r.end || r.start);
                    c(i.start, t), c(i.end, t), i.original = r, i.tabstop = e, u.push(i), e[n] = i, r.fmtString ? (i.linked = !0, e.hasLinkedRanges = !0) : e.firstNonLinked || (e.firstNonLinked = i)
                }
                e.firstNonLinked || (e.hasLinkedRanges = !1), o.push(e), this.addTabstopMarkers(e)
            }, this), o.push(o.splice(2, 1)[0]), this.tabstops.splice.apply(this.tabstops, o)
        }, this.addTabstopMarkers = function (e) {
            var t = this.editor.session;
            e.forEach(function (e) {
                e.markerId || (e.markerId = t.addMarker(e, "ace_snippet-marker", "text"))
            })
        }, this.removeTabstopMarkers = function (e) {
            var t = this.editor.session;
            e.forEach(function (e) {
                t.removeMarker(e.markerId), e.markerId = null
            })
        }, this.removeRange = function (e) {
            var t = e.tabstop.indexOf(e);
            e.tabstop.splice(t, 1), t = this.ranges.indexOf(e), this.ranges.splice(t, 1), this.editor.session.removeMarker(e.markerId)
        }, this.keyboardHandler = new o, this.keyboardHandler.bindKeys({Tab: function (e) {
            e.tabstopManager.tabNext(1)
        }, "Shift-Tab": function (e) {
            e.tabstopManager.tabNext(-1)
        }, Esc: function (e) {
            e.tabstopManager.detach()
        }, Return: function (e) {
            return!1
        }})
    }).call(l.prototype);
    var c = function (e, t) {
        e.row == 0 && (e.column += t.column), e.row += t.row
    }, h = function (e, t) {
        e.row == t.row && (e.column -= t.column), e.row -= t.row
    };
    t("./lib/dom").importCssString(".ace_snippet-marker {    -moz-box-sizing: border-box;    box-sizing: border-box;    background: rgba(194, 193, 208, 0.09);    border: 1px dotted rgba(211, 208, 235, 0.62);    position: absolute;}"), n.snippetManager = new f
}), define("ace/autocomplete", ["require", "exports", "module", "ace/keyboard/hash_handler", "ace/autocomplete/popup", "ace/autocomplete/util", "ace/lib/event", "ace/lib/lang", "ace/snippets"], function (e, t, n) {
    var r = e("./keyboard/hash_handler").HashHandler, i = e("./autocomplete/popup").AcePopup, s = e("./autocomplete/util"), o = e("./lib/event"), u = e("./lib/lang"), a = e("./snippets").snippetManager, f = function () {
        this.keyboardHandler = new r, this.keyboardHandler.bindKeys(this.commands), this.blurListener = this.blurListener.bind(this), this.changeListener = this.changeListener.bind(this), this.mousedownListener = this.mousedownListener.bind(this), this.mousewheelListener = this.mousewheelListener.bind(this), this.changeTimer = u.delayedCall(function () {
            this.updateCompletions(!0)
        }.bind(this))
    };
    (function () {
        this.$init = function () {
            this.popup = new i(document.body || document.documentElement), this.popup.on("click", function (e) {
                this.insertMatch(), e.stop()
            }.bind(this))
        }, this.openPopup = function (e, t) {
            this.popup || this.$init(), this.popup.setData(this.completions.filtered);
            var n = e.renderer;
            if (!t) {
                var r = n.layerConfig.lineHeight, i = n.$cursorLayer.getPixelPosition(null, !0), s = e.container.getBoundingClientRect();
                i.top += s.top - n.layerConfig.offset, i.left += s.left, i.left += n.$gutterLayer.gutterWidth, this.popup.show(i, r)
            }
            n.updateText()
        }, this.detach = function () {
            this.editor.keyBinding.removeKeyboardHandler(this.keyboardHandler), this.editor.removeEventListener("changeSelection", this.changeListener), this.editor.removeEventListener("blur", this.changeListener), this.editor.removeEventListener("mousedown", this.changeListener), this.changeTimer.cancel(), this.popup && this.popup.hide(), this.activated = !1
        }, this.changeListener = function (e) {
            this.activated ? this.changeTimer.schedule() : this.detach()
        }, this.blurListener = function () {
            document.activeElement != this.editor.textInput.getElement() && this.detach()
        }, this.mousedownListener = function (e) {
            this.detach()
        }, this.mousewheelListener = function (e) {
            this.detach()
        }, this.goTo = function (e) {
            var t = this.popup.getRow(), n = this.popup.session.getLength() - 1;
            switch (e) {
                case"up":
                    t = t <= 0 ? n : t - 1;
                    break;
                case"down":
                    t = t >= n ? 0 : t + 1;
                    break;
                case"start":
                    t = 0;
                    break;
                case"end":
                    t = n
            }
            this.popup.setRow(t)
        }, this.insertMatch = function (e) {
            this.detach(), e || (e = this.popup.getData(this.popup.getRow()));
            if (!e)return!1;
            if (e.completer && e.completer.insertMatch)e.completer.insertMatch(this.editor); else {
                if (this.completions.filterText) {
                    var t = this.editor.selection.getRange();
                    t.start.column -= this.completions.filterText.length, this.editor.session.remove(t)
                }
                e.snippet ? a.insertSnippet(this.editor, e.snippet) : this.editor.insert(e.value || e)
            }
        }, this.commands = {Up: function (e) {
            e.completer.goTo("up")
        }, Down: function (e) {
            e.completer.goTo("down")
        }, "Ctrl-Up|Ctrl-Home": function (e) {
            e.completer.goTo("start")
        }, "Ctrl-Down|Ctrl-End": function (e) {
            e.completer.goTo("end")
        }, Esc: function (e) {
            e.completer.detach()
        }, Space: function (e) {
            e.completer.detach(), e.insert(" ")
        }, Return: function (e) {
            e.completer.insertMatch()
        }, "Shift-Return": function (e) {
            e.completer.insertMatch(!0)
        }, Tab: function (e) {
            e.completer.insertMatch()
        }, PageUp: function (e) {
            e.completer.popup.gotoPageDown()
        }, PageDown: function (e) {
            e.completer.popup.gotoPageUp()
        }}, this.gatherCompletions = function (e, t) {
            var n = e.getSession(), r = e.getCursorPosition(), i = n.getLine(r.row), o = s.retrievePrecedingIdentifier(i, r.column), u = [];
            return s.parForEach(e.completers, function (t, i) {
                t.getCompletions(e, n, r, o, function (e, t) {
                    e || (u = u.concat(t)), i()
                })
            }, function () {
                u.sort(function (e, t) {
                    return t.score - e.score
                }), t(null, {prefix: o, matches: u})
            }), !0
        }, this.showPopup = function (e) {
            this.editor && this.detach(), this.activated = !0, this.editor = e, e.completer != this && (e.completer && e.completer.detach(), e.completer = this), e.keyBinding.addKeyboardHandler(this.keyboardHandler), e.on("changeSelection", this.changeListener), e.on("blur", this.blurListener), e.on("mousedown", this.mousedownListener), this.updateCompletions()
        }, this.updateCompletions = function (e) {
            this.gatherCompletions(this.editor, function (t, n) {
                var r = n && n.matches;
                if (!r || !r.length)return this.detach();
                this.completions = new l(r), this.completions.setFilter(n.prefix), this.openPopup(this.editor, e), this.popup.setHighlight(n.prefix)
            }.bind(this))
        }, this.cancelContextMenu = function () {
            var e = function (t) {
                this.editor.off("nativecontextmenu", e), t && t.domEvent && o.stopEvent(t.domEvent)
            }.bind(this);
            setTimeout(e, 10), this.editor.on("nativecontextmenu", e)
        }
    }).call(f.prototype), f.startCommand = {name: "startAutocomplete", exec: function (e) {
        e.completer || (e.completer = new f), e.completer.showPopup(e), e.completer.cancelContextMenu()
    }, bindKey: "Ctrl-Space|Ctrl-Shift-Space|Alt-Space"};
    var l = function (e, t) {
        this.all = e, this.filtered = e.concat(), this.filterText = ""
    };
    (function () {
        this.setFilter = function (e) {
            this.filterText = e
        }
    }).call(l.prototype), t.Autocomplete = f, t.FilteredList = l
}), define("ace/autocomplete/popup", ["require", "exports", "module", "ace/edit_session", "ace/virtual_renderer", "ace/editor", "ace/range", "ace/lib/event", "ace/lib/lang", "ace/lib/dom"], function (e, t, n) {
    var r = e("../edit_session").EditSession, i = e("../virtual_renderer").VirtualRenderer, s = e("../editor").Editor, o = e("../range").Range, u = e("../lib/event"), a = e("../lib/lang"), f = e("../lib/dom"), l = function (e) {
        var t = new i(e);
        t.$maxLines = 4;
        var n = new s(t);
        return n.setHighlightActiveLine(!1), n.setShowPrintMargin(!1), n.renderer.setShowGutter(!1), n.renderer.setHighlightGutterLine(!1), n.$mouseHandler.$focusWaitTimout = 0, n
    }, c = function (e) {
        var t = f.createElement("div"), n = new l(t);
        e && e.appendChild(t), t.style.display = "none", n.renderer.content.style.cursor = "default", n.renderer.setStyle("ace_autocomplete");
        var r = function () {
        };
        n.focus = r, n.$isFocused = !0, n.renderer.$cursorLayer.restartTimer = r, n.renderer.$cursorLayer.element.style.opacity = 0, n.renderer.$maxLines = 8, n.renderer.$keepTextAreaAtCursor = !1, n.setHighlightActiveLine(!0), n.session.highlight(""), n.session.$searchHighlight.clazz = "ace_highlight-marker", n.on("mousedown", function (e) {
            var t = e.getDocumentPosition();
            n.moveCursorToPosition(t), n.selection.clearSelection(), e.stop()
        });
        var i = new o(-1, 0, -1, Infinity);
        i.id = n.session.addMarker(i, "ace_line-hover", "fullLine"), n.on("mousemove", function (e) {
            var t = e.getDocumentPosition().row;
            i.start.row = i.end.row = t, n.session._emit("changeBackMarker")
        });
        var s = function () {
            i.start.row = i.end.row = -1, n.session._emit("changeBackMarker")
        };
        u.addListener(n.container, "mouseout", s), n.on("hide", s), n.on("changeSelection", s), n.on("mousewheel", function (e) {
            setTimeout(function () {
                n._signal("mousemove", e)
            })
        }), n.session.doc.getLength = function () {
            return n.data.length
        }, n.session.doc.getLine = function (e) {
            var t = n.data[e];
            return typeof t == "string" ? t : t && t.value || ""
        };
        var c = n.session.bgTokenizer;
        return c.$tokenizeRow = function (e) {
            var t = n.data[e], r = [];
            if (!t)return r;
            typeof t == "string" && (t = {value: t}), t.caption || (t.caption = t.value), r.push({type: t.className || "", value: t.caption});
            if (t.meta) {
                var i = n.renderer.$size.scrollerWidth / n.renderer.layerConfig.characterWidth;
                t.meta.length + t.caption.length < i - 2 && r.push({type: "rightAlignedText", value: t.meta})
            }
            return r
        }, c.$updateOnChange = r, n.session.$computeWidth = function () {
            return this.screenWidth = 0
        }, n.data = [], n.setData = function (e) {
            n.data = e || [], n.setValue(a.stringRepeat("\n", e.length), -1)
        }, n.getData = function (e) {
            return n.data[e]
        }, n.getRow = function () {
            var e = this.getCursorPosition().row;
            return e == 0 && !this.getHighlightActiveLine() && (e = -1), e
        }, n.setRow = function (e) {
            n.setHighlightActiveLine(e != -1), n.selection.clearSelection(), n.moveCursorTo(e, 0)
        }, n.setHighlight = function (e) {
            n.session.highlight(e), n.session._emit("changeFrontMarker")
        }, n.hide = function () {
            this.container.style.display = "none", this._signal("hide")
        }, n.show = function (e, t) {
            var n = this.container;
            e.top > window.innerHeight / 2 + t ? (n.style.top = "", n.style.bottom = window.innerHeight - e.top + "px") : (e.top += t, n.style.top = e.top + "px", n.style.bottom = ""), n.style.left = e.left + "px", n.style.display = "", this.renderer.$textLayer.checkForSizeChanges(), this._signal("show")
        }, n
    };
    f.importCssString(".ace_autocomplete.ace-tm .ace_marker-layer .ace_active-line {    background-color: #abbffe;}.ace_autocomplete.ace-tm .ace_line-hover {    border: 1px solid #abbffe;    position: absolute;    background: rgba(233,233,253,0.4);    z-index: 2;    margin-top: -1px;}.ace_rightAlignedText {    color: gray;    display: inline-block;    position: absolute;    right: 4px;    text-align: right;    z-index: -1;}.ace_autocomplete {    width: 200px;    z-index: 200000;    background: #f8f8f8;    border: 1px lightgray solid;    position: fixed;    box-shadow: 2px 3px 5px rgba(0,0,0,.2);}"), t.AcePopup = c
}), define("ace/autocomplete/util", ["require", "exports", "module"], function (e, t, n) {
    t.parForEach = function (e, t, n) {
        var r = 0, i = e.length;
        i === 0 && n();
        for (var s = 0; s < i; s++)t(e[s], function (e, t) {
            r++, r === i && n(e, t)
        })
    };
    var r = /[a-zA-Z_0-9\$-]/;
    t.retrievePrecedingIdentifier = function (e, t, n) {
        n = n || r;
        var i = [];
        for (var s = t - 1; s >= 0; s--) {
            if (!n.test(e[s]))break;
            i.push(e[s])
        }
        return i.reverse().join("")
    }, t.retrieveFollowingIdentifier = function (e, t, n) {
        n = n || r;
        var i = [];
        for (var s = t; s < e.length; s++) {
            if (!n.test(e[s]))break;
            i.push(e[s])
        }
        return i
    }
}), define("ace/autocomplete/text_completer", ["require", "exports", "module", "ace/range"], function (e, t, n) {
    function s(e, t) {
        var n = e.getTextRange(r.fromPoints({row: 0, column: 0}, t));
        return n.split(i).length - 1
    }

    function o(e, t) {
        var n = [];
        for (var r = 0; r < t.length; r++)t[r].lastIndexOf(e, 0) === 0 && n.push(t[r]);
        return n
    }

    function u(e, t) {
        var n = s(e, t), r = e.getValue().split(i), o = Object.create(null), u = r[n];
        return r.forEach(function (e, t) {
            if (!e || e === u)return;
            var i = Math.abs(n - t), s = r.length - i;
            o[e] ? o[e] = Math.max(s, o[e]) : o[e] = s
        }), o
    }

    var r = e("ace/range").Range, i = /[^a-zA-Z_0-9\$\-]+/;
    t.getCompletions = function (e, t, n, r, i) {
        var s = u(t, n, r), a = o(r, Object.keys(s));
        i(null, a.map(function (e) {
            return{name: e, value: e, score: s[e], meta: "local"}
        }))
    }
})