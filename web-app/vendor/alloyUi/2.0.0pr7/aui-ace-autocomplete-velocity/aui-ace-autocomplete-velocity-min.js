YUI.add("aui-ace-autocomplete-velocity",function(e,t){var n=e.Lang,r=e.AceEditor.AutoCompleteBase,i=0,s=1,o="aui-ace-autocomplete-velocity",u="directivesMatcher",a="variablesMatcher",f=e.Base.create(o,e.AceEditor.TemplateProcessor,[],{getMatch:function(e){var t=this,n,r;return(r=e.lastIndexOf("#"))>=0?(e=e.substring(r),t.get(u).test(e)&&(n={content:e.substring(1),start:r,type:i})):(r=e.lastIndexOf("$"))>=0&&(e=e.substring(r),t.get(a).test(e)&&(n={content:e.substring(1),start:r,type:s})),n}},{NAME:o,NS:o,ATTRS:{directives:{validator:n.isArray,value:["else","elseif","foreach","if","include","macro","parse","set","stop"]},directivesMatcher:{setter:"_setRegexValue",value:/#[\w]*[^#]*$/},host:{validator:n.isObject},variables:{validator:n.isObject},variablesMatcher:{setter:"_setRegexValue",value:/\$[\w., ()"]*(?:[^$]|\\\$)*$/}}});e.AceEditor.AutoCompleteVelocity=f},"2.0.0pr7",{requires:["aui-ace-autocomplete-templateprocessor"]});