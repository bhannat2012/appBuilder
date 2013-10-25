YUI.add("app-base",function(e,t){var n=e.Lang,r=e.Object,i=e.PjaxBase,s=e.Router,o=e.View,u=e.ClassNameManager.getClassName,a=e.config.win,f;f=e.Base.create("app",e.Base,[o,s,i],{views:{},initializer:function(t){function i(t,r){n[r]=e.merge(n[r],t)}t||(t={});var n={};r.each(this.views,i),r.each(t.views,i),this.views=n,this._viewInfoMap={},this.after("activeViewChange",e.bind("_afterActiveViewChange",this)),this.get("serverRouting")||this._pjaxBindUI()},createView:function(t,i){var s=this.getViewInfo(t),u=s&&s.type||o,a,f;return a=n.isString(u)?r.getValue(e,u.split(".")):u,f=new a(i),this._viewInfoMap[e.stamp(f,!0)]=s,f},getViewInfo:function(t){return n.isString(t)?this.views[t]:t&&this._viewInfoMap[e.stamp(t,!0)]},render:function(){var t=e.App.CLASS_NAMES,n=this.get("container"),r=this.get("viewContainer"),i=this.get("activeView"),s=i&&i.get("container"),o=n.compareTo(r);return n.addClass(t.app),r.addClass(t.views),i&&!r.contains(s)&&r.appendChild(s),!n.contains(r)&&!o&&n.appendChild(r),this},showView:function(t,r,i,s){var o,u;return i||(i={}),s?i=e.merge(i,{callback:s}):n.isFunction(i)&&(i={callback:i}),n.isString(t)&&(o=this.getViewInfo(t),o&&o.preserve&&o.instance?(t=o.instance,this._viewInfoMap[e.stamp(t,!0)]=o):(t=this.createView(t,r),u=!0)),i.update&&!u&&t.setAttrs(r),"render"in i?i.render&&t.render():u&&t.render(),this._set("activeView",t,{options:i})},_attachView:function(e,t){if(!e)return;var n=this.getViewInfo(e),r=this.get("viewContainer");e.addTarget(this),n&&(n.instance=e),r[t?"prepend":"append"](e.get("container"))},_destroyContainer:function(){var t=e.App.CLASS_NAMES,n=this.get("container"),r=this.get("viewContainer"),i=n.compareTo(r);if(e.one("body").compareTo(n)){this.detachEvents(),n.removeClass(t.app),i?n.removeClass(t.views):r.remove(!0);return}r.remove(!0),i||n.remove(!0)},_detachView:function(t){if(!t)return;var n=this.getViewInfo(t)||{};n.preserve?t.remove():(t.destroy({remove:!0}),delete this._viewInfoMap[e.stamp(t,!0)],t===n.instance&&delete n.instance),t.removeTarget(this)},_getViewContainer:function(e){return!e&&!this._viewContainer&&(e=this._viewContainer=this.create(),this._set("viewContainer",e)),e},_initHtml5:function(){return this.get("serverRouting")===!1?!1:s.html5},_isChildView:function(e,t){var n=this.getViewInfo(e),r=this.getViewInfo(t);return n&&r?this.getViewInfo(n.parent)===r:!1},_isParentView:function(e,t){var n=this.getViewInfo(e),r=this.getViewInfo(t);return n&&r?this.getViewInfo(r.parent)===n:!1},_navigate:function(t,n){return this.get("serverRouting")||(n=e.merge({force:!0},n)),i.prototype._navigate.call(this,t,n)},_save:function(t,n){var r;return this.get("serverRouting")&&!this.get("html5")?this._hasSameOrigin(t)?(a&&(r=this._joinURL(t||""),n?a.location.replace(r):a.location=r),this):(e.error("Security error: The new URL must be of the same origin as the current URL."),this):s.prototype._save.apply(this,arguments)},_uiSetActiveView:function(e,t,n){n||(n={});var r=n.callback,i=this._isChildView(e,t),s=!i&&this._isParentView(e,t),o=!!n.prepend||s;if(e===t)return r&&r.call(this,e);this._attachView(e,o),this._detachView(t),r&&r.call(this,e)},_afterActiveViewChange:function(e){this._uiSetActiveView(e.newVal,e.prevVal,e.options)}},{ATTRS:{activeView:{value:null,readOnly:!0},container:{valueFn:function(){return e.one("body")}},html5:{valueFn:"_initHtml5"},linkSelector:{value:"a"},serverRouting:{valueFn:function(){return e.App.serverRouting},writeOnce:"initOnly"},viewContainer:{getter:"_getViewContainer",setter:e.one,writeOnce:!0}},_NON_ATTRS_CFG:["views"]}),e.namespace("App").Base=f,e.App=e.mix(e.Base.create("app",f,[]),e.App,!0),e.App.CLASS_NAMES={app:u("app"),views:u("app","views")}},"patched-dev-3.x",{requires:["classnamemanager","pjax-base","router","view"]});
