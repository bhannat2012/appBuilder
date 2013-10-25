YUI.add("series-line-stacked", function (e, t) {
    e.StackedLineSeries = e.Base.create("stackedLineSeries", e.LineSeries, [e.StackingUtil], {setAreaData: function () {
        e.StackedLineSeries.superclass.setAreaData.apply(this), this._stackCoordinates.apply(this)
    }}, {ATTRS: {type: {value: "stackedLine"}}})
}, "patched-dev-3.x", {requires: ["series-stacked", "series-line"]});
