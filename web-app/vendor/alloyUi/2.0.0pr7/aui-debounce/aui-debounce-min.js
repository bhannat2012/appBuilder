YUI.add("aui-debounce",function(e,t){var n=e.Lang,r=e.Array,i=n.isArray,s=n.isString,o=n.isUndefined,u=[],a=function(e,t,n,i){return o(e)?t:r(e,n||0,i!==!1)};e.debounce=function(t,n,r,i){var f,l;s(t)&&r&&(t=e.bind(t,r)),n=n||0,i=a(arguments,u,3);var c=function(){clearInterval(f),f=null},h=function(){c();var e=t.apply(r,l||i||u);return l=null,e},p=function(e,s,c,p){m.cancel(),e=o(e)?n:e,t=p||t,r=c||r,s!==i&&(l=a(s,u,0,!1).concat(i));if(!(e>0))return h();f=setInterval(h,e)},d=function(){f&&c()},v=function(e){d(),e=e||0},m=function(){var e=arguments.length?arguments:i;return m.delay(n,e,r||this)};return m.cancel=d,m.delay=p,m.setDelay=v,m}},"2.0.0pr7");
