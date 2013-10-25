YUI.add('aui-base-core', function (A, NAME) {

var Y = A;
YUI.Env.aliases = YUI.Env.aliases || {};
Y.mix(YUI.Env.aliases, {
    "aui-autosize": ["aui-autosize-iframe"],
    "aui-base": ["oop","yui-throttle","aui-classnamemanager","aui-debounce","aui-base-core","aui-base-lang","aui-node-base"],
    "aui-button": ["aui-button-core"],
    "aui-collection": ["aui-map","aui-set","aui-linkedset"],
    "aui-datatable": ["aui-datatable-edit","aui-datatable-highlight","aui-datatable-selection","aui-datatable-property-list"],
    "aui-diagram-builder": ["aui-diagram-builder-base","aui-diagram-builder-connector","aui-diagram-builder-impl"],
    "aui-event": ["aui-event-base","aui-event-delegate-change","aui-event-delegate-submit"],
    "aui-form-builder": ["aui-form-builder-base","aui-form-builder-field-base","aui-form-builder-field-button","aui-form-builder-field-checkbox","aui-form-builder-field-fieldset","aui-form-builder-field-file-upload","aui-form-builder-field-multiple-choice","aui-form-builder-field-radio","aui-form-builder-field-select","aui-form-builder-field-text","aui-form-builder-field-textarea"],
    "aui-image-viewer": ["aui-image-viewer-base","aui-image-viewer-gallery","aui-image-viewer-media"],
    "aui-io": ["aui-io-request"],
    "aui-node": ["aui-node-base"],
    "aui-rating": ["aui-rating-base","aui-rating-thumb"],
    "aui-scheduler": ["aui-scheduler-base","aui-scheduler-event-recorder","aui-scheduler-view-agenda","aui-scheduler-view-day","aui-scheduler-view-month","aui-scheduler-view-table-dd","aui-scheduler-view-table","aui-scheduler-view-week"],
    "aui-search": ["aui-search-tst"],
    "aui-sortable": ["aui-sortable-layout","aui-sortable-list"],
    "aui-toggler": ["aui-toggler-base","aui-toggler-delegate"],
    "aui-tooltip": ["aui-tooltip-base","aui-tooltip-delegate"],
    "aui-tree": ["aui-tree-data","aui-tree-io","aui-tree-node","aui-tree-paginator","aui-tree-view"],
    "aui-widget": ["aui-widget-cssclass","aui-widget-toolbars"],
    "aui-widget-core": ["aui-widget-cssclass"]
});
/* This file is auto-generated by (yogi loader --yes --mix --js js/aui-loader.js --json js/aui-loader.json --start ../) */

/*jshint maxlen:900, eqeqeq: false */

/**
 * YUI 3 module metadata
 * @module loader
 * @submodule loader-yui3
 */
YUI.Env[Y.version].modules = YUI.Env[Y.version].modules || {};
Y.mix(YUI.Env[Y.version].modules, {
    "aui-ace-autocomplete-base": {
        "requires": [
            "aui-ace-editor"
        ]
    },
    "aui-ace-autocomplete-freemarker": {
        "requires": [
            "aui-ace-autocomplete-templateprocessor"
        ]
    },
    "aui-ace-autocomplete-list": {
        "requires": [
            "aui-ace-autocomplete-base",
            "overlay",
            "widget-autohide"
        ],
        "skinnable": true
    },
    "aui-ace-autocomplete-plugin": {
        "requires": [
            "aui-ace-autocomplete-list",
            "plugin"
        ]
    },
    "aui-ace-autocomplete-templateprocessor": {
        "requires": [
            "aui-ace-autocomplete-base"
        ]
    },
    "aui-ace-autocomplete-velocity": {
        "requires": [
            "aui-ace-autocomplete-templateprocessor"
        ]
    },
    "aui-ace-editor": {
        "requires": [
            "aui-node",
            "aui-component"
        ]
    },
    "aui-aria": {
        "requires": [
            "plugin",
            "aui-component"
        ]
    },
    "aui-arraysort": {
        "requires": [
            "arraysort"
        ]
    },
    "aui-audio": {
        "requires": [
            "aui-node",
            "aui-component",
            "querystring-stringify-simple"
        ],
        "skinnable": true
    },
    "aui-autosize": {
        "use": [
            "aui-autosize-iframe"
        ]
    },
    "aui-autosize-iframe": {
        "requires": [
            "plugin",
            "aui-component",
            "aui-timer",
            "aui-node-base"
        ]
    },
    "aui-base": {
        "use": [
            "oop",
            "yui-throttle",
            "aui-classnamemanager",
            "aui-debounce",
            "aui-base-core",
            "aui-base-lang",
            "aui-node-base"
        ]
    },
    "aui-base-core": {},
    "aui-base-html5-shiv": {
        "condition": {
            "name": "aui-base-html5-shiv",
            "trigger": "aui-base",
            "ua": "ie"
        }
    },
    "aui-base-lang": {},
    "aui-button": {
        "use": [
            "aui-button-core"
        ]
    },
    "aui-button-core": {
        "requires": [
            "button",
            "button-group",
            "button-plugin",
            "aui-component",
            "aui-widget-cssclass",
            "aui-widget-toggle"
        ]
    },
    "aui-button-search-cancel": {
        "requires": [
            "array-invoke",
            "base",
            "base-build",
            "event-focus",
            "node-screen",
            "node-event-delegate",
            "aui-node-base",
            "aui-classnamemanager",
            "aui-event-input"
        ]
    },
    "aui-carousel": {
        "requires": [
            "anim",
            "node-event-delegate",
            "aui-component"
        ],
        "skinnable": true
    },
    "aui-char-counter": {
        "requires": [
            "aui-node",
            "aui-event-input",
            "aui-component"
        ]
    },
    "aui-classnamemanager": {
        "requires": [
            "classnamemanager"
        ]
    },
    "aui-collection": {
        "use": [
            "aui-map",
            "aui-set",
            "aui-linkedset"
        ]
    },
    "aui-color-palette": {
        "requires": [
            "array-extras",
            "aui-palette",
            "color-base",
            "node-core",
            "aui-widget-cssclass",
            "aui-widget-toggle"
        ],
        "skinnable": true
    },
    "aui-color-picker-base": {
        "requires": [
            "aui-color-palette",
            "aui-hsva-palette-modal",
            "event-outside"
        ],
        "skinnable": true
    },
    "aui-color-picker-popover": {
        "requires": [
            "aui-color-picker-base",
            "aui-popover",
            "aui-widget-cssclass",
            "aui-widget-toggle"
        ],
        "skinnable": true
    },
    "aui-component": {
        "requires": [
            "aui-classnamemanager",
            "aui-widget-cssclass",
            "aui-widget-toggle",
            "base-build",
            "widget-base"
        ]
    },
    "aui-datatable": {
        "use": [
            "aui-datatable-edit",
            "aui-datatable-highlight",
            "aui-datatable-selection",
            "aui-datatable-property-list"
        ]
    },
    "aui-datatable-core": {
        "requires": [
            "datatable-base",
            "event-key",
            "aui-event-base"
        ],
        "skinnable": true
    },
    "aui-datatable-edit": {
        "requires": [
            "datatable-base",
            "calendar",
            "overlay",
            "sortable",
            "aui-datatype",
            "aui-toolbar",
            "aui-form-validator",
            "aui-datatable-core"
        ],
        "skinnable": true
    },
    "aui-datatable-highlight": {
        "requires": [
            "aui-datatable-selection"
        ],
        "skinnable": true
    },
    "aui-datatable-property-list": {
        "requires": [
            "datatable-scroll",
            "datatable-sort",
            "aui-datatable-core",
            "aui-datatable-edit",
            "aui-datatable-highlight",
            "aui-datatable-selection",
            "aui-widget-cssclass",
            "aui-widget-toggle"
        ],
        "skinnable": true
    },
    "aui-datatable-selection": {
        "requires": [
            "aui-datatable-core"
        ],
        "skinnable": true
    },
    "aui-datatype": {
        "requires": [
            "datatype",
            "aui-datatype-date-parse"
        ]
    },
    "aui-datatype-date-parse": {
        "requires": [
            "aui-base-lang",
            "datatype-date-format",
            "datatype-date-parse",
            "intl"
        ]
    },
    "aui-datepicker": {
        "requires": [
            "calendar",
            "base",
            "base-build",
            "aui-datepicker-delegate",
            "aui-datepicker-popover"
        ],
        "skinnable": true
    },
    "aui-datepicker-delegate": {
        "requires": [
            "node-event-delegate",
            "event-focus",
            "aui-event-input",
            "aui-datatype-date-parse"
        ]
    },
    "aui-datepicker-native": {
        "requires": [
            "base",
            "base-build",
            "aui-node-base",
            "aui-datepicker-delegate"
        ]
    },
    "aui-datepicker-popover": {
        "requires": [
            "aui-classnamemanager",
            "aui-popover"
        ]
    },
    "aui-debounce": {},
    "aui-diagram-builder": {
        "use": [
            "aui-diagram-builder-base",
            "aui-diagram-builder-connector",
            "aui-diagram-builder-impl"
        ]
    },
    "aui-diagram-builder-base": {
        "requires": [
            "dd",
            "collection",
            "aui-tabview",
            "aui-datatable-property-list"
        ],
        "skinnable": true
    },
    "aui-diagram-builder-connector": {
        "requires": [
            "arraylist-add",
            "arraylist-filter",
            "json",
            "graphics",
            "dd"
        ],
        "skinnable": true
    },
    "aui-diagram-builder-impl": {
        "requires": [
            "overlay",
            "aui-map",
            "aui-diagram-builder-base",
            "aui-diagram-builder-connector"
        ],
        "skinnable": true
    },
    "aui-event": {
        "use": [
            "aui-event-base",
            "aui-event-delegate-change",
            "aui-event-delegate-submit"
        ]
    },
    "aui-event-base": {
        "requires": [
            "event-base"
        ]
    },
    "aui-event-delegate-change": {
        "requires": [
            "aui-event-base",
            "event-delegate",
            "event-synthetic"
        ]
    },
    "aui-event-delegate-submit": {
        "requires": [
            "aui-event-base",
            "event-delegate",
            "event-synthetic"
        ]
    },
    "aui-event-input": {
        "condition": {
            "name": "aui-event-input",
            "test": function (A) {
    var supportsDOMEvent  = A.supportsDOMEvent,
        testFeature = A.Features.test,
        addFeature = A.Features.add;

    if (testFeature('event', 'input') === undefined) {
        addFeature('event', 'input', {
            test: function() {
                return supportsDOMEvent(document.createElement('textarea'), 'input');
            }
        });
    }

    return !testFeature('event', 'input');
},
            "trigger": "aui-event"
        },
        "requires": [
            "aui-event-base",
            "event-delegate",
            "event-synthetic"
        ]
    },
    "aui-form-builder": {
        "skinnable": true,
        "use": [
            "aui-form-builder-base",
            "aui-form-builder-field-base",
            "aui-form-builder-field-button",
            "aui-form-builder-field-checkbox",
            "aui-form-builder-field-fieldset",
            "aui-form-builder-field-file-upload",
            "aui-form-builder-field-multiple-choice",
            "aui-form-builder-field-radio",
            "aui-form-builder-field-select",
            "aui-form-builder-field-text",
            "aui-form-builder-field-textarea"
        ]
    },
    "aui-form-builder-base": {
        "requires": [
            "transition",
            "aui-button",
            "aui-collection",
            "aui-diagram-builder-base",
            "aui-sortable-list",
            "aui-tabview"
        ],
        "skinnable": true
    },
    "aui-form-builder-field-base": {
        "requires": [
            "panel",
            "aui-datatype"
        ],
        "skinnable": true
    },
    "aui-form-builder-field-button": {
        "requires": [
            "aui-form-builder-field-base"
        ]
    },
    "aui-form-builder-field-checkbox": {
        "requires": [
            "aui-form-builder-field-base"
        ]
    },
    "aui-form-builder-field-fieldset": {
        "requires": [
            "aui-form-builder-field-base"
        ]
    },
    "aui-form-builder-field-file-upload": {
        "requires": [
            "aui-form-builder-field-base"
        ]
    },
    "aui-form-builder-field-multiple-choice": {
        "requires": [
            "aui-form-builder-field-base"
        ]
    },
    "aui-form-builder-field-radio": {
        "requires": [
            "aui-form-builder-field-base"
        ]
    },
    "aui-form-builder-field-select": {
        "requires": [
            "aui-form-builder-field-base"
        ]
    },
    "aui-form-builder-field-text": {
        "requires": [
            "aui-form-builder-field-base"
        ]
    },
    "aui-form-builder-field-textarea": {
        "requires": [
            "aui-form-builder-field-base"
        ]
    },
    "aui-form-validator": {
        "requires": [
            "escape",
            "selector-css3",
            "node-event-delegate",
            "aui-node",
            "aui-component",
            "aui-event-input"
        ]
    },
    "aui-hsv-palette": {
        "requires": [
            "aui-classnamemanager",
            "aui-widget-cssclass",
            "aui-widget-toggle",
            "aui-event-input",
            "base-build",
            "clickable-rail",
            "color-hsv",
            "dd-constrain",
            "slider",
            "widget"
        ],
        "skinnable": true
    },
    "aui-hsva-palette": {
        "requires": [
            "aui-hsv-palette"
        ],
        "skinnable": true
    },
    "aui-hsva-palette-modal": {
        "requires": [
            "aui-hsva-palette",
            "aui-modal"
        ],
        "skinnable": true
    },
    "aui-image-cropper": {
        "requires": [
            "resize-base",
            "resize-constrain",
            "dd-constrain",
            "aui-node-base",
            "aui-component"
        ],
        "skinnable": true
    },
    "aui-image-viewer": {
        "use": [
            "aui-image-viewer-base",
            "aui-image-viewer-gallery",
            "aui-image-viewer-media"
        ]
    },
    "aui-image-viewer-base": {
        "requires": [
            "anim",
            "widget",
            "widget-modality",
            "widget-position",
            "widget-position-align",
            "widget-position-constrain",
            "widget-stack",
            "widget-stdmod",
            "aui-event",
            "aui-node-base",
            "aui-widget-cssclass",
            "aui-widget-toggle"
        ],
        "skinnable": true
    },
    "aui-image-viewer-gallery": {
        "requires": [
            "aui-image-viewer-base",
            "aui-pagination",
            "aui-toolbar"
        ],
        "skinnable": true
    },
    "aui-image-viewer-media": {
        "requires": [
            "plugin",
            "aui-image-viewer-base",
            "aui-pagination",
            "aui-toolbar"
        ]
    },
    "aui-io": {
        "use": [
            "aui-io-request"
        ]
    },
    "aui-io-request": {
        "requires": [
            "io-base",
            "json",
            "plugin",
            "querystring-stringify",
            "aui-component"
        ]
    },
    "aui-linkedset": {
        "requires": [
            "aui-set"
        ]
    },
    "aui-map": {
        "requires": [
            "base-build"
        ]
    },
    "aui-messaging": {
        "requires": [
            "querystring",
            "aui-timer"
        ]
    },
    "aui-modal": {
        "requires": [
            "widget",
            "widget-autohide",
            "widget-buttons",
            "widget-modality",
            "widget-position",
            "widget-position-align",
            "widget-position-constrain",
            "widget-stack",
            "widget-stdmod",
            "dd-plugin",
            "dd-constrain",
            "resize-plugin",
            "aui-classnamemanager",
            "aui-widget-cssclass",
            "aui-widget-toggle",
            "aui-widget-toolbars"
        ]
    },
    "aui-node": {
        "use": [
            "aui-node-base"
        ]
    },
    "aui-node-base": {
        "requires": [
            "array-extras",
            "aui-base-lang",
            "aui-classnamemanager",
            "aui-debounce",
            "node"
        ]
    },
    "aui-node-html5": {
        "condition": {
            "name": "aui-node-html5",
            "trigger": "aui-node",
            "ua": "ie"
        },
        "requires": [
            "collection",
            "aui-node-base"
        ]
    },
    "aui-pagination": {
        "requires": [
            "node-event-delegate",
            "aui-node",
            "aui-component",
            "widget-htmlparser"
        ]
    },
    "aui-palette": {
        "requires": [
            "base-build",
            "event-hover",
            "widget",
            "aui-classnamemanager",
            "aui-base",
            "aui-widget-cssclass",
            "aui-widget-toggle"
        ],
        "skinnable": true
    },
    "aui-parse-content": {
        "requires": [
            "async-queue",
            "plugin",
            "io-base",
            "aui-component",
            "aui-node-base"
        ]
    },
    "aui-popover": {
        "requires": [
            "transition",
            "widget",
            "widget-autohide",
            "widget-buttons",
            "widget-modality",
            "widget-position",
            "widget-position-align",
            "widget-position-constrain",
            "widget-stack",
            "widget-stdmod",
            "aui-classnamemanager",
            "aui-widget-cssclass",
            "aui-widget-toggle",
            "aui-widget-toolbars",
            "aui-widget-trigger",
            "aui-widget-position-align-suggestion",
            "aui-component",
            "aui-node-base"
        ]
    },
    "aui-progressbar": {
        "requires": [
            "aui-node",
            "aui-component",
            "aui-aria"
        ]
    },
    "aui-rating": {
        "use": [
            "aui-rating-base",
            "aui-rating-thumb"
        ]
    },
    "aui-rating-base": {
        "requires": [
            "widget-htmlparser",
            "widget-uievents",
            "aui-component",
            "aui-node-base"
        ],
        "skinnable": true
    },
    "aui-rating-thumb": {
        "requires": [
            "aui-rating-base"
        ]
    },
    "aui-scheduler": {
        "use": [
            "aui-scheduler-base",
            "aui-scheduler-event-recorder",
            "aui-scheduler-view-agenda",
            "aui-scheduler-view-day",
            "aui-scheduler-view-month",
            "aui-scheduler-view-table-dd",
            "aui-scheduler-view-table",
            "aui-scheduler-view-week"
        ]
    },
    "aui-scheduler-base": {
        "requires": [
            "model",
            "model-list",
            "widget-stdmod",
            "color-hsl",
            "aui-event-base",
            "aui-node-base",
            "aui-component",
            "aui-datatype",
            "aui-button"
        ],
        "skinnable": true
    },
    "aui-scheduler-event-recorder": {
        "requires": [
            "querystring",
            "io-form",
            "overlay",
            "aui-scheduler-base",
            "aui-popover"
        ],
        "skinnable": true
    },
    "aui-scheduler-view-agenda": {
        "requires": [
            "aui-scheduler-base"
        ],
        "skinnable": true
    },
    "aui-scheduler-view-day": {
        "requires": [
            "dd-drag",
            "dd-delegate",
            "dd-drop",
            "dd-constrain",
            "aui-scheduler-view-table"
        ],
        "skinnable": true
    },
    "aui-scheduler-view-month": {
        "requires": [
            "aui-scheduler-view-table"
        ],
        "skinnable": true
    },
    "aui-scheduler-view-table": {
        "requires": [
            "overlay",
            "aui-scheduler-base"
        ],
        "skinnable": true
    },
    "aui-scheduler-view-table-dd": {
        "requires": [
            "dd-drag",
            "dd-delegate",
            "dd-drop",
            "aui-scheduler-view-table"
        ]
    },
    "aui-scheduler-view-week": {
        "requires": [
            "aui-scheduler-view-day"
        ],
        "skinnable": true
    },
    "aui-search": {
        "use": [
            "aui-search-tst"
        ]
    },
    "aui-search-tst": {
        "requires": [
            "aui-component"
        ]
    },
    "aui-selector": {
        "requires": [
            "selector-css3",
            "aui-classnamemanager"
        ]
    },
    "aui-set": {
        "requires": [
            "aui-map"
        ]
    },
    "aui-sortable": {
        "use": [
            "aui-sortable-layout",
            "aui-sortable-list"
        ]
    },
    "aui-sortable-layout": {
        "requires": [
            "dd-delegate",
            "dd-drag",
            "dd-drop",
            "dd-proxy",
            "aui-node",
            "aui-component"
        ],
        "skinnable": true
    },
    "aui-sortable-list": {
        "requires": [
            "dd-drag",
            "dd-drop",
            "dd-proxy",
            "aui-node",
            "aui-component"
        ]
    },
    "aui-tabview": {
        "requires": [
            "tabview",
            "aui-component"
        ]
    },
    "aui-text-data-unicode": {
        "requires": [
            "text"
        ]
    },
    "aui-text-unicode": {
        "requires": [
            "aui-text-data-unicode"
        ]
    },
    "aui-timepicker": {
        "requires": [
            "autocomplete-list",
            "autocomplete-list-keys",
            "aui-datepicker-delegate",
            "aui-datepicker-popover"
        ],
        "skinnable": true
    },
    "aui-timepicker-native": {
        "requires": [
            "base",
            "base-build",
            "aui-node-base",
            "aui-datepicker-delegate",
            "aui-datepicker-native"
        ]
    },
    "aui-timer": {
        "requires": [
            "oop"
        ]
    },
    "aui-toggler": {
        "use": [
            "aui-toggler-base",
            "aui-toggler-delegate"
        ]
    },
    "aui-toggler-base": {
        "requires": [
            "transition",
            "aui-selector",
            "aui-event-base",
            "aui-node",
            "aui-component"
        ],
        "skinnable": true
    },
    "aui-toggler-delegate": {
        "requires": [
            "array-invoke",
            "node-event-delegate",
            "aui-toggler-base"
        ]
    },
    "aui-toolbar": {
        "requires": [
            "arraylist",
            "arraylist-add",
            "aui-component",
            "aui-button-core"
        ]
    },
    "aui-tooltip": {
        "use": [
            "aui-tooltip-base",
            "aui-tooltip-delegate"
        ]
    },
    "aui-tooltip-base": {
        "requires": [
            "event-mouseenter",
            "transition",
            "widget",
            "widget-autohide",
            "widget-position",
            "widget-position-align",
            "widget-position-constrain",
            "widget-stack",
            "widget-stdmod",
            "aui-classnamemanager",
            "aui-component",
            "aui-widget-cssclass",
            "aui-widget-toggle",
            "aui-widget-trigger",
            "aui-widget-position-align-suggestion",
            "aui-node-base"
        ]
    },
    "aui-tooltip-delegate": {
        "requires": [
            "node-event-delegate",
            "aui-tooltip-base"
        ]
    },
    "aui-tree": {
        "use": [
            "aui-tree-data",
            "aui-tree-io",
            "aui-tree-node",
            "aui-tree-paginator",
            "aui-tree-view"
        ]
    },
    "aui-tree-data": {
        "requires": [
            "aui-base-core",
            "aui-base-lang",
            "aui-node-base",
            "aui-timer",
            "aui-component"
        ]
    },
    "aui-tree-io": {
        "requires": [
            "aui-component",
            "aui-io"
        ]
    },
    "aui-tree-node": {
        "requires": [
            "json",
            "querystring-stringify",
            "aui-tree-data",
            "aui-tree-io",
            "aui-tree-paginator"
        ]
    },
    "aui-tree-paginator": {
        "requires": [
            "yui-base"
        ]
    },
    "aui-tree-view": {
        "requires": [
            "dd-delegate",
            "dd-proxy",
            "aui-tree-node",
            "aui-tree-paginator",
            "aui-tree-io"
        ],
        "skinnable": true
    },
    "aui-url": {
        "requires": [
            "oop",
            "querystring-parse",
            "querystring-stringify"
        ]
    },
    "aui-video": {
        "requires": [
            "querystring-stringify-simple",
            "aui-node",
            "aui-component",
            "aui-debounce"
        ],
        "skinnable": true
    },
    "aui-viewport": {
        "requires": [
            "aui-node",
            "aui-component"
        ]
    },
    "aui-widget": {
        "use": [
            "aui-widget-cssclass",
            "aui-widget-toolbars"
        ]
    },
    "aui-widget-core": {
        "use": [
            "aui-widget-cssclass"
        ]
    },
    "aui-widget-cssclass": {
        "requires": [
            "widget-base"
        ]
    },
    "aui-widget-position-align-suggestion": {
        "requires": [
            "widget-position-align",
            "widget-stdmod"
        ]
    },
    "aui-widget-toggle": {},
    "aui-widget-toolbars": {
        "requires": [
            "widget-stdmod",
            "aui-toolbar"
        ]
    },
    "aui-widget-trigger": {
        "requires": [
            "node"
        ]
    }
});
YUI.Env[Y.version].md5 = '627f43396a530ddf385e28d45cac287b';
/*
 * Alloy JavaScript Library
 * http://alloy.liferay.com/
 *
 * Copyright (c) 2010 Liferay Inc.
 * http://alloy.liferay.com/LICENSE.txt
 *
 * Nate Cavanaugh (nathan.cavanaugh@liferay.com)
 * Eduardo Lundgren (eduardo.lundgren@liferay.com)
 *
 * Attribution/Third-party licenses
 * http://alloy.liferay.com/ATTRIBUTION.txt
 */

 // Simple version of http://perfectionkills.com/detecting-event-support-without-browser-sniffing/
A.supportsDOMEvent = function(domNode, eventName) {
	eventName = 'on' + eventName;

	if (!(eventName in domNode)) {
		if (!domNode.setAttribute) {
			domNode = A.config.doc.createElement('div');
		}

		if (domNode.setAttribute) {
			domNode.setAttribute(eventName, '');
			return (typeof domNode[eventName] === 'function');
		}
	}

	domNode = null;

	return true;
};(function() {
	var slice = Array.prototype.slice;

	YUI.prototype.ready = function() {
		var instance = this,
			xargs = arguments,
			index = xargs.length - 1,
			modules = slice.call(arguments, 0, index);

		modules.unshift('event-base');
		modules.push(function(instance) {
			var args = arguments;

			instance.on('domready', function() {
				xargs[index].apply(this, args);
			});
		});
		instance.use.apply(instance, modules);
	};
}());

}, '2.0.0pr7');
