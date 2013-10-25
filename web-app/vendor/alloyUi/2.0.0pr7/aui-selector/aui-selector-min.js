YUI.add("aui-selector", function (e, t) {
    var n = e.Lang, r = n.isString, i = e.Selector, s = e.getClassName, o = e.getClassName("hide"), u = new RegExp(o);
    i._isNodeHidden = function (e) {
        var t = e.offsetWidth, n = e.offsetHeight, r = e.nodeName.toLowerCase() == "tr", i = e.className, s = e.style, o = !1;
        return r || (t == 0 && n == 0 ? o = !0 : t > 0 && n > 0 && (o = !1)), o = o || s.display == "none" || s.visibility == "hidden" || u.test(i), o
    };
    var a = function (e) {
        return function (t) {
            return t.type == e
        }
    };
    e.mix(i.pseudos, {button: function (e) {
        return e.type === "button" || e.nodeName.toLowerCase() === "button"
    }, checkbox: a("checkbox"), checked: function (e) {
        return e.checked === !0
    }, disabled: function (e) {
        return e.disabled === !0
    }, empty: function (e) {
        return!e.firstChild
    }, enabled: function (e) {
        return e.disabled === !1 && e.type !== "hidden"
    }, file: a("file"), header: function (e) {
        return/h\d/i.test(e.nodeName)
    }, hidden: function (e) {
        return i._isNodeHidden(e)
    }, image: a("image"), input: function (e) {
        return/input|select|textarea|button/i.test(e.nodeName)
    }, parent: function (e) {
        return!!e.firstChild
    }, password: a("password"), radio: a("radio"), reset: a("reset"), selected: function (e) {
        return e.parentNode.selectedIndex, e.selected === !0
    }, submit: a("submit"), text: a("text"), visible: function (e) {
        return!i._isNodeHidden(e)
    }})
}, "2.0.0pr7", {requires: ["selector-css3", "aui-classnamemanager"]});
