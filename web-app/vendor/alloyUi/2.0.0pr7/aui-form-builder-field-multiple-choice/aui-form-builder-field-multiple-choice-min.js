YUI.add("aui-form-builder-field-multiple-choice", function (e, t) {
    var n = e.Lang, r = n.isArray, i = e.Array, s = "acceptChildren", o = "editor", u = "field", a = "form-builder", f = "form-builder-multiple-choice-field", l = "form-builder-options-editor", c = "hidden", h = "label", t = "name", p = "optionTemplate", d = "options", v = "predefinedValue", m = "render", g = "selected", y = "showLabel", b = "templateNode", w = ",", E = "", S = " ", x = e.getClassName, T = function (e) {
        var t = {};
        return i.each(e, function (e, n, r) {
            t[e.value] = e.label
        }), t
    }, N = x(a, u), C = x(a, d, o, c), k = e.Component.create({NAME: l, ATTRS: {editable: {setter: function () {
        return!1
    }}}, EXTENDS: e.RadioCellEditor, prototype: {ELEMENT_TEMPLATE: '<div class="' + C + '"></div>', initializer: function () {
        var e = this;
        e.after(m, function () {
            e._onEditEvent()
        })
    }, _handleSaveEvent: function (e) {
        var t = this;
        t.saveOptions(), k.superclass._handleSaveEvent.apply(this, arguments)
    }}}), L = e.Component.create({NAME: f, ATTRS: {acceptChildren: {value: !1, readOnly: !0}, options: {value: [
        {label: "option 1", value: "value 1"},
        {label: "option 2", value: "value 2"},
        {label: "option 3", value: "value 3"}
    ]}, optionTemplate: {value: '<option value="{value}">{label}</option>'}, predefinedValue: {setter: function (e) {
        return r(e) ? e : [e]
    }}}, UI_ATTRS: [s, h, t, d, v, y], CSS_PREFIX: N, EXTENDS: e.FormBuilderField, prototype: {initializer: function () {
        var t = this, n = t.get(d);
        t.predefinedValueEditor = new e.DropDownCellEditor({options: T(n)})
    }, getPropertyModel: function () {
        var t = this, n = t.get(d), s = t.getStrings(), o = e.FormBuilderMultipleChoiceField.superclass.getPropertyModel.apply(t, arguments);
        return i.each(o, function (n, i, s) {
            n.attributeName === v && (s[i] = e.merge(n, {editor: t.predefinedValueEditor, formatter: function (n) {
                var i = t.predefinedValueEditor.get(d), s = n.data.value;
                r(s) || (s = [s]);
                var o = e.Array.map(s, function (e) {
                    return i[e]
                });
                return o.join(w + S)
            }}))
        }), o.push({attributeName: d, editor: new k({editable: !0, on: {optionsChange: function (e) {
            t.predefinedValueEditor.set(d, e.newVal)
        }}, options: T(n), inputFormatter: function () {
            var t = [];
            return e.each(this.get(d), function (r, s, o) {
                var u = {label: r, value: s};
                i.each(n, function (t) {
                    t.value === s && (u = e.merge(t, u))
                }), t.push(u)
            }), t
        }}), formatter: function (t) {
            var n = [];
            return e.each(t.data.value, function (e, t, r) {
                n.push(e.label)
            }), n.join(w + S)
        }, name: s[d]}), o
    }, _uiSetOptions: function (t) {
        var r = this, i = [];
        e.each(t, function (e, t, s) {
            i.push(n.sub(r.get(p), {label: e.label, value: e.value}))
        }), r.optionNodes = e.NodeList.create(i.join(E)), r.get(b).setContent(r.optionNodes), r._uiSetPredefinedValue(r.get(v))
    }, _uiSetPredefinedValue: function (e) {
        var t = this, n = t.optionNodes;
        if (!n)return;
        n.set(g, !1), i.each(e, function (e) {
            n.filter('[value="' + e + '"]').set(g, !0)
        })
    }}});
    e.FormBuilderMultipleChoiceField = L, e.FormBuilder.types["multiple-choice"] = e.FormBuilderMultipleChoiceField
}, "2.0.0pr7", {requires: ["aui-form-builder-field-base"]});
