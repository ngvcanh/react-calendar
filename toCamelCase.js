var e=/\s/,t=/(_|-|\.|:)/,r=/([a-z][A-Z]|[A-Z][a-z])/,n=/[\W_]+(.|$)/g,o=/(.)([A-Z]+)/g;function u(e){return e.replace(n,(function(e,t){return t?" "+t:""}))}function a(e){return e.replace(o,(function(e,t,r){return t+" "+r.toLowerCase().split("").join(" ")}))}function c(n){return e.test(n)?n.toLowerCase():t.test(n)?(u(n)||n).toLowerCase():r.test(n)?a(n).toLowerCase():n.toLowerCase()}function s(e){return c(e).replace(/[\W_]+(.|$)/g,(function(e,t){return t?" "+t:""})).trim()}function i(e){return s(e).replace(/\s(\w)/g,(function(e,t){return t.toUpperCase()}))}export{i as default,c as toNoCase,s as toSpaceCase,a as uncamelize,u as unseparate};