YUI.add("paginator-url", function (e, t) {
    function n() {
    }

    n.ATTRS = {pageUrl: {}}, n.prototype = {prevPageUrl: function () {
        return this.hasPrevPage() && this.formatPageUrl(this.get("page") - 1) || null
    }, nextPageUrl: function () {
        return this.hasNextPage() && this.formatPageUrl(this.get("page") + 1) || null
    }, formatPageUrl: function (t) {
        var n = this.get("pageUrl");
        return n ? e.Lang.sub(n, {page: t || this.get("page")}) : null
    }}, e.namespace("Paginator").Url = n, e.Base.mix(e.Paginator, [n])
}, "patched-dev-3.x", {requires: ["paginator"]});