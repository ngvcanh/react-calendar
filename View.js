import{b as t}from"./tslib.es6-7131be58.js";import{jsx as i}from"react/jsx-runtime";import{forwardRef as r,useMemo as o}from"react";import{CSS_CLASS_SCROLLBAR as e}from"./constant.js";import a from"./mergeClass.js";import m from"./useScrollbar.js";import{i as s}from"./setCss-a578d9ff.js";import"./requestAnimationFrame.js";import"./getValues.js";import"./isEqual-3670d1c6.js";import"./merge-818d5aef.js";import"./isUndefined-9db4dc0d.js";import"./getInnerWidth.js";import"./getInnerHeight.js";import"./cssProperty.js";import"./toCamelCase.js";import"./prefixStyle.js";import"./addPxToStyle.js";var n=r((function(r,n){var l=r.children,c=r.autoHeight,p=r.autoHeightMin,d=r.autoHeightMax,g=r.universal,u=r.didMountUniversal,f=(0,m(r).getScrollbarWidth)(),j=a(e),h=o((function(){return t(t({marginRight:f?-f:0,marginBottom:f?-f:0},c&&t({position:"relative",top:"auto",left:"auto",right:"auto",bottom:"auto",minHeight:s(p)?"calc(".concat(p," + ").concat(f,"px)"):(null!=p?p:0)+f,maxHeight:s(d)?"calc(".concat(d," + ").concat(f,"px)"):(null!=d?d:0)+f},g&&!u&&{minHeight:p,maxHeight:d})),g&&!u&&{overflow:"hidden",marginRight:0,marginBottom:0})}),[f,c,p,d,g,u]);return i("div",t({className:j+"-view",style:h,ref:n},{children:l}))}));n.displayName="ScrollbarView";export{n as default};
