"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}!function a(o,s,f){function g(t,e){if(!s[t]){if(!o[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(u)return u(t,!0);var r=new Error("Cannot find module '"+t+"'");throw r.code="MODULE_NOT_FOUND",r}var i=s[t]={exports:{}};o[t][0].call(i.exports,function(e){return g(o[t][1][e]||e)},i,i.exports,a,o,s,f)}return s[t].exports}for(var u="function"==typeof require&&require,e=0;e<f.length;e++)g(f[e]);return g}({1:[function(e,t,n){var o={};o.Item=e("./DataLayerItem"),o.utils=e("./DataLayerUtils");var s="datalayer:change",f="datalayer:event",r="datalayer:ready",i="past",a="future",g="all";o.Manager=function(e){this._config=e,this._initialize()},o.Manager.prototype._initialize=function(){var e=this;Array.isArray(e._config.dataLayer)||(e._config.dataLayer=[]),e._dataLayer=e._config.dataLayer,e._state={},e._listeners=[],e._augment(),e._processItems();var t=new o.Item({event:r},-1);e._triggerListeners(t)},o.Manager.prototype._augment=function(){var a=this;a._dataLayer.push=function(e){var r=arguments,i=arguments;if(Object.keys(r).forEach(function(e){var t=r[e],n=new o.Item(t,-1);a._processItem(n),!n.utils.isListenerConfig(t)&&n.isValid()||delete i[e]}),i[0])return Array.prototype.push.apply(this,i)},a._dataLayer.getState=function(){return JSON.parse(JSON.stringify(a._state))}},o.Manager.prototype._processItems=function(){for(var e=this,t=0;t<e._dataLayer.length;t++){var n=new o.Item(e._dataLayer[t],t);e._processItem(n),!n.utils.isListenerConfig(n.getConfig())&&n.isValid()||(e._dataLayer.splice(t,1),t--)}},o.Manager.prototype._processItem=function(e){var t=this;if(e.isValid()){({data:function(e){t._updateState(e),t._triggerListeners(e)},event:function(e){e.getConfig().data&&t._updateState(e),t._triggerListeners(e)},listenerOn:function(e){t._processListenerOn(e)},listenerOff:function(e){t._unregisterListener(e)}})[e.getType()](e)}else{var n="The following item cannot be handled by the data layer because it does not have a valid format: "+JSON.stringify(e.getConfig());console.error(n)}},o.Manager.prototype._processListenerOn=function(e){var t=e.getConfig().scope;switch(t=t||a){case i:this._triggerListenerOnPreviousItems(e);break;case a:this._registerListener(e);break;case g:this._triggerListenerOnPreviousItems(e),this._registerListener(e);break;default:console.error("The listener does not have a valid scope: "+t)}},o.Manager.prototype._triggerListeners=function(n){var r=this;r._listeners.forEach(function(e){var t=new o.Item(e,-1);r._triggerListener(t,n)})},o.Manager.prototype._triggerListenerOnPreviousItems=function(e){var t=e.getIndex();if(!(0===t||0===this._dataLayer.length||t>this._dataLayer.length-1))for(var n=t&&-1!==t?t:this._dataLayer.length,r=0;r<n;r++){var i=this._dataLayer[r],a=new o.Item(i,r);this._triggerListener(e,a)}},o.Manager.prototype._triggerListener=function(e,t){var n=e.getConfig(),r=t.getConfig(),i=!1;if(t.utils.isDataConfig(r)?n.on===s&&(i=!0):t.utils.isEventConfig(r)&&(n.on!==f&&n.on!==r.event||(i=!0),r.data&&n.on===s&&(i=!0)),i){var a=JSON.parse(JSON.stringify(t.getConfig()));n.handler(a)}},o.Manager.prototype._registerListener=function(e){var t=e.getConfig();0===this._getRegisteredListeners(t).length&&(this._listeners.push(t),console.debug("listener registered on -",t.on))},o.Manager.prototype._unregisterListener=function(e){var t=e.getConfig(),n=JSON.parse(JSON.stringify(t));n.on=t.off,n.handler=t.handler,delete n.off;for(var r=this._getRegisteredListeners(n),i=0;i<r.length;i++)-1<r[i]&&(this._listeners.splice(r[i],1),console.debug("listener unregistered on -",n.on))},o.Manager.prototype._updateState=function(e){o.utils.deepMerge(this._state,e.getConfig().data)},o.Manager.prototype._getRegisteredListeners=function(e){for(var t=[],n=0;n<this._listeners.length;n++){var r=this._listeners[n];if(e.on!==r.on);else{if(e.handler&&e.handler.toString()!==r.handler.toString())continue;t.push(n)}}return t},new o.Manager({dataLayer:window.dataLayer}),t.exports=o},{"./DataLayerItem":2,"./DataLayerUtils":3}],2:[function(e,t,n){var r={},a="data",o="event",s="listenerOn",f="listenerOff";r.Item=function(e,t){var n,r,i=this;i._config=e,i._index=t,i._type=(n=e,i.utils.isDataConfig(n)?r=a:i.utils.isEventConfig(n)?r=o:i.utils.isListenerOnConfig(n)?r=s:i.utils.isListenerOffConfig(n)&&(r=f),r),i._valid=!!i._type},r.Item.prototype.getIndex=function(){return this._index},r.Item.prototype.isValid=function(){return this._valid},r.Item.prototype.getType=function(){return this._type},r.Item.prototype.getConfig=function(){return this._config},r.Item.prototype.utils={isDataConfig:function(e){return!!e&&(1===Object.keys(e).length&&e.data)},isEventConfig:function(e){if(!e)return!1;var t=Object.keys(e);return 1===t.length&&e.event||2===t.length&&e.event&&(e.info||e.data)||3===t.length&&e.event&&e.info&&e.data},isListenerConfig:function(e){return this.isListenerOnConfig(e)||this.isListenerOffConfig(e)},isListenerOnConfig:function(e){if(!e)return!1;var t=Object.keys(e);return 2===t.length&&e.on&&e.handler||3===t.length&&e.on&&e.handler&&(e.scope||e.selector)||4===t.length&&e.on&&e.handler&&e.scope&&e.selector},isListenerOffConfig:function(e){if(!e)return!1;var t=Object.keys(e);return 1===t.length&&e.off||2===t.length&&e.off&&e.handler||3===t.length&&e.off&&e.handler&&(e.scope||e.selector)||4===t.length&&e.off&&e.handler&&e.scope&&e.selector}},t.exports=r.Item},{}],3:[function(e,t,n){var r={utils:{}};r.utils.deepMerge=function(t,n){var r={},i=this;i.isObject(t)&&i.isObject(n)&&Object.keys(n).forEach(function(e){i.isObject(n[e])?(t[e]||(r[e]={},Object.assign(t,r)),i.deepMerge(t[e],n[e])):void 0===n[e]?delete t[e]:(r[e]=n[e],Object.assign(t,r))})},r.utils.isObject=function(e){return e&&"object"===_typeof(e)&&!Array.isArray(e)},t.exports=r.utils},{}]},{},[1]);
//# sourceMappingURL=datalayer.js.map
