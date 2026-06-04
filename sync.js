/*!
 * Socket.IO v4.7.5
 * (c) 2014-2024 Guillermo Rauch
 * Released under the MIT License.
 */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).io=t()}(this,(function(){"use strict";function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(i=r.key,o=void 0,"symbol"==typeof(o=function(e,t){if("object"!=typeof e||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(i,"string"))?o:String(o)),r)}var i,o}function r(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}function i(){return i=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},i.apply(this,arguments)}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&a(e,t)}function s(e){return s=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},s(e)}function a(e,t){return a=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},a(e,t)}function c(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}function u(e,t,n){return u=c()?Reflect.construct.bind():function(e,t,n){var r=[null];r.push.apply(r,t);var i=new(Function.bind.apply(e,r));return n&&a(i,n.prototype),i},u.apply(null,arguments)}function h(e){var t="function"==typeof Map?new Map:void 0;return h=function(e){if(null===e||(n=e,-1===Function.toString.call(n).indexOf("[native code]")))return e;var n;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(e))return t.get(e);t.set(e,r)}function r(){return u(e,arguments,s(this).constructor)}return r.prototype=Object.create(e.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),a(r,e)},h(e)}function f(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function l(e){var t=c();return function(){var n,r=s(e);if(t){var i=s(this).constructor;n=Reflect.construct(r,arguments,i)}else n=r.apply(this,arguments);return function(e,t){if(t&&("object"==typeof t||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return f(e)}(this,n)}}function p(){return p="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=s(e)););return e}(e,t);if(r){var i=Object.getOwnPropertyDescriptor(r,t);return i.get?i.get.call(arguments.length<3?e:n):i.value}},p.apply(this,arguments)}function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function y(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return d(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,i=function(){};return{s:i,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,s=!0,a=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return s=e.done,e},e:function(e){a=!0,o=e},f:function(){try{s||null==n.return||n.return()}finally{if(a)throw o}}}}var v=Object.create(null);v.open="0",v.close="1",v.ping="2",v.pong="3",v.message="4",v.upgrade="5",v.noop="6";var g=Object.create(null);Object.keys(v).forEach((function(e){g[v[e]]=e}));var m,b={type:"error",data:"parser error"},k="function"==typeof Blob||"undefined"!=typeof Blob&&"[object BlobConstructor]"===Object.prototype.toString.call(Blob),w="function"==typeof ArrayBuffer,_=function(e){return"function"==typeof ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer instanceof ArrayBuffer},E=function(e,t,n){var r=e.type,i=e.data;return k&&i instanceof Blob?t?n(i):A(i,n):w&&(i instanceof ArrayBuffer||_(i))?t?n(i):A(new Blob([i]),n):n(v[r]+(i||""))},A=function(e,t){var n=new FileReader;return n.onload=function(){var e=n.result.split(",")[1];t("b"+(e||""))},n.readAsDataURL(e)};function O(e){return e instanceof Uint8Array?e:e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)}for(var T="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",R="undefined"==typeof Uint8Array?[]:new Uint8Array(256),C=0;C<64;C++)R[T.charCodeAt(C)]=C;var B,S="function"==typeof ArrayBuffer,N=function(e,t){if("string"!=typeof e)return{type:"message",data:x(e,t)};var n=e.charAt(0);return"b"===n?{type:"message",data:L(e.substring(1),t)}:g[n]?e.length>1?{type:g[n],data:e.substring(1)}:{type:g[n]}:b},L=function(e,t){if(S){var n=function(e){var t,n,r,i,o,s=.75*e.length,a=e.length,c=0;"="===e[e.length-1]&&(s--,"="===e[e.length-2]&&s--);var u=new ArrayBuffer(s),h=new Uint8Array(u);for(t=0;t<a;t+=4)n=R[e.charCodeAt(t)],r=R[e.charCodeAt(t+1)],i=R[e.charCodeAt(t+2)],o=R[e.charCodeAt(t+3)],h[c++]=n<<2|r>>4,h[c++]=(15&r)<<4|i>>2,h[c++]=(3&i)<<6|63&o;return u}(e);return x(n,t)}return{base64:!0,data:e}},x=function(e,t){return"blob"===t?e instanceof Blob?e:new Blob([e]):e instanceof ArrayBuffer?e:e.buffer},P=String.fromCharCode(30);function j(){return new TransformStream({transform:function(e,t){!function(e,t){k&&e.data instanceof Blob?e.data.arrayBuffer().then(O).then(t):w&&(e.data instanceof ArrayBuffer||_(e.data))?t(O(e.data)):E(e,!1,(function(e){m||(m=new TextEncoder),t(m.encode(e))}))}(e,(function(n){var r,i=n.length;if(i<126)r=new Uint8Array(1),new DataView(r.buffer).setUint8(0,i);else if(i<65536){r=new Uint8Array(3);var o=new DataView(r.buffer);o.setUint8(0,126),o.setUint16(1,i)}else{r=new Uint8Array(9);var s=new DataView(r.buffer);s.setUint8(0,127),s.setBigUint64(1,BigInt(i))}e.data&&"string"!=typeof e.data&&(r[0]|=128),t.enqueue(r),t.enqueue(n)}))}})}function q(e){return e.reduce((function(e,t){return e+t.length}),0)}function D(e,t){if(e[0].length===t)return e.shift();for(var n=new Uint8Array(t),r=0,i=0;i<t;i++)n[i]=e[0][r++],r===e[0].length&&(e.shift(),r=0);return e.length&&r<e[0].length&&(e[0]=e[0].slice(r)),n}function U(e){if(e)return function(e){for(var t in U.prototype)e[t]=U.prototype[t];return e}(e)}U.prototype.on=U.prototype.addEventListener=function(e,t){return this._callbacks=this._callbacks||{},(this._callbacks["$"+e]=this._callbacks["$"+e]||[]).push(t),this},U.prototype.once=function(e,t){function n(){this.off(e,n),t.apply(this,arguments)}return n.fn=t,this.on(e,n),this},U.prototype.off=U.prototype.removeListener=U.prototype.removeAllListeners=U.prototype.removeEventListener=function(e,t){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var n,r=this._callbacks["$"+e];if(!r)return this;if(1==arguments.length)return delete this._callbacks["$"+e],this;for(var i=0;i<r.length;i++)if((n=r[i])===t||n.fn===t){r.splice(i,1);break}return 0===r.length&&delete this._callbacks["$"+e],this},U.prototype.emit=function(e){this._callbacks=this._callbacks||{};for(var t=new Array(arguments.length-1),n=this._callbacks["$"+e],r=1;r<arguments.length;r++)t[r-1]=arguments[r];if(n){r=0;for(var i=(n=n.slice(0)).length;r<i;++r)n[r].apply(this,t)}return this},U.prototype.emitReserved=U.prototype.emit,U.prototype.listeners=function(e){return this._callbacks=this._callbacks||{},this._callbacks["$"+e]||[]},U.prototype.hasListeners=function(e){return!!this.listeners(e).length};var I="undefined"!=typeof self?self:"undefined"!=typeof window?window:Function("return this")();function F(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return n.reduce((function(t,n){return e.hasOwnProperty(n)&&(t[n]=e[n]),t}),{})}var M=I.setTimeout,V=I.clearTimeout;function H(e,t){t.useNativeTimers?(e.setTimeoutFn=M.bind(I),e.clearTimeoutFn=V.bind(I)):(e.setTimeoutFn=I.setTimeout.bind(I),e.clearTimeoutFn=I.clearTimeout.bind(I))}var K,Y=function(e){o(i,e);var n=l(i);function i(e,r,o){var s;return t(this,i),(s=n.call(this,e)).description=r,s.context=o,s.type="TransportError",s}return r(i)}(h(Error)),W=function(e){o(i,e);var n=l(i);function i(e){var r;return t(this,i),(r=n.call(this)).writable=!1,H(f(r),e),r.opts=e,r.query=e.query,r.socket=e.socket,r}return r(i,[{key:"onError",value:function(e,t,n){return p(s(i.prototype),"emitReserved",this).call(this,"error",new Y(e,t,n)),this}},{key:"open",value:function(){return this.readyState="opening",this.doOpen(),this}},{key:"close",value:function(){return"opening"!==this.readyState&&"open"!==this.readyState||(this.doClose(),this.onClose()),this}},{key:"send",value:function(e){"open"===this.readyState&&this.write(e)}},{key:"onOpen",value:function(){this.readyState="open",this.writable=!0,p(s(i.prototype),"emitReserved",this).call(this,"open")}},{key:"onData",value:function(e){var t=N(e,this.socket.binaryType);this.onPacket(t)}},{key:"onPacket",value:function(e){p(s(i.prototype),"emitReserved",this).call(this,"packet",e)}},{key:"onClose",value:function(e){this.readyState="closed",p(s(i.prototype),"emitReserved",this).call(this,"close",e)}},{key:"pause",value:function(e){}},{key:"createUri",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e+"://"+this._hostname()+this._port()+this.opts.path+this._query(t)}},{key:"_hostname",value:function(){var e=this.opts.hostname;return-1===e.indexOf(":")?e:"["+e+"]"}},{key:"_port",value:function(){return this.opts.port&&(this.opts.secure&&Number(443!==this.opts.port)||!this.opts.secure&&80!==Number(this.opts.port))?":"+this.opts.port:""}},{key:"_query",value:function(e){var t=function(e){var t="";for(var n in e)e.hasOwnProperty(n)&&(t.length&&(t+="&"),t+=encodeURIComponent(n)+"="+encodeURIComponent(e[n]));return t}(e);return t.length?"?"+t:""}}]),i}(U),z="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""),J=64,$={},Q=0,X=0;function G(e){var t="";do{t=z[e%J]+t,e=Math.floor(e/J)}while(e>0);return t}function Z(){var e=G(+new Date);return e!==K?(Q=0,K=e):e+"."+G(Q++)}for(;X<J;X++)$[z[X]]=X;var ee=!1;try{ee="undefined"!=typeof XMLHttpRequest&&"withCredentials"in new XMLHttpRequest}catch(e){}var te=ee;function ne(e){var t=e.xdomain;try{if("undefined"!=typeof XMLHttpRequest&&(!t||te))return new XMLHttpRequest}catch(e){}if(!t)try{return new(I[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")}catch(e){}}function re(){}var ie=null!=new ne({xdomain:!1}).responseType,oe=function(e){o(s,e);var n=l(s);function s(e){var r;if(t(this,s),(r=n.call(this,e)).polling=!1,"undefined"!=typeof location){var i="https:"===location.protocol,o=location.port;o||(o=i?"443":"80"),r.xd="undefined"!=typeof location&&e.hostname!==location.hostname||o!==e.port}var a=e&&e.forceBase64;return r.supportsBinary=ie&&!a,r.opts.withCredentials&&(r.cookieJar=void 0),r}return r(s,[{key:"name",get:function(){return"polling"}},{key:"doOpen",value:function(){this.poll()}},{key:"pause",value:function(e){var t=this;this.readyState="pausing";var n=function(){t.readyState="paused",e()};if(this.polling||!this.writable){var r=0;this.polling&&(r++,this.once("pollComplete",(function(){--r||n()}))),this.writable||(r++,this.once("drain",(function(){--r||n()})))}else n()}},{key:"poll",value:function(){this.polling=!0,this.doPoll(),this.emitReserved("poll")}},{key:"onData",value:function(e){var t=this;(function(e,t){for(var n=e.split(P),r=[],i=0;i<n.length;i++){var o=N(n[i],t);if(r.push(o),"error"===o.type)break}return r})(e,this.socket.binaryType).forEach((function(e){if("opening"===t.readyState&&"open"===e.type&&t.onOpen(),"close"===e.type)return t.onClose({description:"transport closed by the server"}),!1;t.onPacket(e)})),"closed"!==this.readyState&&(this.polling=!1,this.emitReserved("pollComplete"),"open"===this.readyState&&this.poll())}},{key:"doClose",value:function(){var e=this,t=function(){e.write([{type:"close"}])};"open"===this.readyState?t():this.once("open",t)}},{key:"write",value:function(e){var t=this;this.writable=!1,function(e,t){var n=e.length,r=new Array(n),i=0;e.forEach((function(e,o){E(e,!1,(function(e){r[o]=e,++i===n&&t(r.join(P))}))}))}(e,(function(e){t.doWrite(e,(function(){t.writable=!0,t.emitReserved("drain")}))}))}},{key:"uri",value:function(){var e=this.opts.secure?"https":"http",t=this.query||{};return!1!==this.opts.timestampRequests&&(t[this.opts.timestampParam]=Z()),this.supportsBinary||t.sid||(t.b64=1),this.createUri(e,t)}},{key:"request",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return i(e,{xd:this.xd,cookieJar:this.cookieJar},this.opts),new se(this.uri(),e)}},{key:"doWrite",value:function(e,t){var n=this,r=this.request({method:"POST",data:e});r.on("success",t),r.on("error",(function(e,t){n.onError("xhr post error",e,t)}))}},{key:"doPoll",value:function(){var e=this,t=this.request();t.on("data",this.onData.bind(this)),t.on("error",(function(t,n){e.onError("xhr poll error",t,n)})),this.pollXhr=t}}]),s}(W),se=function(e){o(i,e);var n=l(i);function i(e,r){var o;return t(this,i),H(f(o=n.call(this)),r),o.opts=r,o.method=r.method||"GET",o.uri=e,o.data=void 0!==r.data?r.data:null,o.create(),o}return r(i,[{key:"create",value:function(){var e,t=this,n=F(this.opts,"agent","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","autoUnref");n.xdomain=!!this.opts.xd;var r=this.xhr=new ne(n);try{r.open(this.method,this.uri,!0);try{if(this.opts.extraHeaders)for(var o in r.setDisableHeaderCheck&&r.setDisableHeaderCheck(!0),this.opts.extraHeaders)this.opts.extraHeaders.hasOwnProperty(o)&&r.setRequestHeader(o,this.opts.extraHeaders[o])}catch(e){}if("POST"===this.method)try{r.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch(e){}try{r.setRequestHeader("Accept","*/*")}catch(e){}null===(e=this.opts.cookieJar)||void 0===e||e.addCookies(r),"withCredentials"in r&&(r.withCredentials=this.opts.withCredentials),this.opts.requestTimeout&&(r.timeout=this.opts.requestTimeout),r.onreadystatechange=function(){var e;3===r.readyState&&(null===(e=t.opts.cookieJar)||void 0===e||e.parseCookies(r)),4===r.readyState&&(200===r.status||1223===r.status?t.onLoad():t.setTimeoutFn((function(){t.onError("number"==typeof r.status?r.status:0)}),0))},r.send(this.data)}catch(e){return void this.setTimeoutFn((function(){t.onError(e)}),0)}"undefined"!=typeof document&&(this.index=i.requestsCount++,i.requests[this.index]=this)}},{key:"onError",value:function(e){this.emitReserved("error",e,this.xhr),this.cleanup(!0)}},{key:"cleanup",value:function(e){if(void 0!==this.xhr&&null!==this.xhr){if(this.xhr.onreadystatechange=re,e)try{this.xhr.abort()}catch(e){}"undefined"!=typeof document&&delete i.requests[this.index],this.xhr=null}}},{key:"onLoad",value:function(){var e=this.xhr.responseText;null!==e&&(this.emitReserved("data",e),this.emitReserved("success"),this.cleanup())}},{key:"abort",value:function(){this.cleanup()}}]),i}(U);if(se.requestsCount=0,se.requests={},"undefined"!=typeof document)if("function"==typeof attachEvent)attachEvent("onunload",ae);else if("function"==typeof addEventListener){addEventListener("onpagehide"in I?"pagehide":"unload",ae,!1)}function ae(){for(var e in se.requests)se.requests.hasOwnProperty(e)&&se.requests[e].abort()}var ce="function"==typeof Promise&&"function"==typeof Promise.resolve?function(e){return Promise.resolve().then(e)}:function(e,t){return t(e,0)},ue=I.WebSocket||I.MozWebSocket,he="undefined"!=typeof navigator&&"string"==typeof navigator.product&&"reactnative"===navigator.product.toLowerCase(),fe=function(e){o(i,e);var n=l(i);function i(e){var r;return t(this,i),(r=n.call(this,e)).supportsBinary=!e.forceBase64,r}return r(i,[{key:"name",get:function(){return"websocket"}},{key:"doOpen",value:function(){if(this.check()){var e=this.uri(),t=this.opts.protocols,n=he?{}:F(this.opts,"agent","perMessageDeflate","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","localAddress","protocolVersion","origin","maxPayload","family","checkServerIdentity");this.opts.extraHeaders&&(n.headers=this.opts.extraHeaders);try{this.ws=he?new ue(e,t,n):t?new ue(e,t):new ue(e)}catch(e){return this.emitReserved("error",e)}this.ws.binaryType=this.socket.binaryType,this.addEventListeners()}}},{key:"addEventListeners",value:function(){var e=this;this.ws.onopen=function(){e.opts.autoUnref&&e.ws._socket.unref(),e.onOpen()},this.ws.onclose=function(t){return e.onClose({description:"websocket connection closed",context:t})},this.ws.onmessage=function(t){return e.onData(t.data)},this.ws.onerror=function(t){return e.onError("websocket error",t)}}},{key:"write",value:function(e){var t=this;this.writable=!1;for(var n=function(){var n=e[r],i=r===e.length-1;E(n,t.supportsBinary,(function(e){try{t.ws.send(e)}catch(e){}i&&ce((function(){t.writable=!0,t.emitReserved("drain")}),t.setTimeoutFn)}))},r=0;r<e.length;r++)n()}},{key:"doClose",value:function(){void 0!==this.ws&&(this.ws.close(),this.ws=null)}},{key:"uri",value:function(){var e=this.opts.secure?"wss":"ws",t=this.query||{};return this.opts.timestampRequests&&(t[this.opts.timestampParam]=Z()),this.supportsBinary||(t.b64=1),this.createUri(e,t)}},{key:"check",value:function(){return!!ue}}]),i}(W),le=function(e){o(i,e);var n=l(i);function i(){return t(this,i),n.apply(this,arguments)}return r(i,[{key:"name",get:function(){return"webtransport"}},{key:"doOpen",value:function(){var e=this;"function"==typeof WebTransport&&(this.transport=new WebTransport(this.createUri("https"),this.opts.transportOptions[this.name]),this.transport.closed.then((function(){e.onClose()})).catch((function(t){e.onError("webtransport error",t)})),this.transport.ready.then((function(){e.transport.createBidirectionalStream().then((function(t){var n=function(e,t){B||(B=new TextDecoder);var n=[],r=0,i=-1,o=!1;return new TransformStream({transform:function(s,a){for(n.push(s);;){if(0===r){if(q(n)<1)break;var c=D(n,1);o=128==(128&c[0]),i=127&c[0],r=i<126?3:126===i?1:2}else if(1===r){if(q(n)<2)break;var u=D(n,2);i=new DataView(u.buffer,u.byteOffset,u.length).getUint16(0),r=3}else if(2===r){if(q(n)<8)break;var h=D(n,8),f=new DataView(h.buffer,h.byteOffset,h.length),l=f.getUint32(0);if(l>Math.pow(2,21)-1){a.enqueue(b);break}i=l*Math.pow(2,32)+f.getUint32(4),r=3}else{if(q(n)<i)break;var p=D(n,i);a.enqueue(N(o?p:B.decode(p),t)),r=0}if(0===i||i>e){a.enqueue(b);break}}}})}(Number.MAX_SAFE_INTEGER,e.socket.binaryType),r=t.readable.pipeThrough(n).getReader(),i=j();i.readable.pipeTo(t.writable),e.writer=i.writable.getWriter();!function t(){r.read().then((function(n){var r=n.done,i=n.value;r||(e.onPacket(i),t())})).catch((function(e){}))}();var o={type:"open"};e.query.sid&&(o.data='{"sid":"'.concat(e.query.sid,'"}')),e.writer.write(o).then((function(){return e.onOpen()}))}))})))}},{key:"write",value:function(e){var t=this;this.writable=!1;for(var n=function(){var n=e[r],i=r===e.length-1;t.writer.write(n).then((function(){i&&ce((function(){t.writable=!0,t.emitReserved("drain")}),t.setTimeoutFn)}))},r=0;r<e.length;r++)n()}},{key:"doClose",value:function(){var e;null===(e=this.transport)||void 0===e||e.close()}}]),i}(W),pe={websocket:fe,webtransport:le,polling:oe},de=/^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,ye=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];function ve(e){var t=e,n=e.indexOf("["),r=e.indexOf("]");-1!=n&&-1!=r&&(e=e.substring(0,n)+e.substring(n,r).replace(/:/g,";")+e.substring(r,e.length));for(var i,o,s=de.exec(e||""),a={},c=14;c--;)a[ye[c]]=s[c]||"";return-1!=n&&-1!=r&&(a.source=t,a.host=a.host.substring(1,a.host.length-1).replace(/;/g,":"),a.authority=a.authority.replace("[","").replace("]","").replace(/;/g,":"),a.ipv6uri=!0),a.pathNames=function(e,t){var n=/\/{2,9}/g,r=t.replace(n,"/").split("/");"/"!=t.slice(0,1)&&0!==t.length||r.splice(0,1);"/"==t.slice(-1)&&r.splice(r.length-1,1);return r}(0,a.path),a.queryKey=(i=a.query,o={},i.replace(/(?:^|&)([^&=]*)=?([^&]*)/g,(function(e,t,n){t&&(o[t]=n)})),o),a}var ge=function(n){o(a,n);var s=l(a);function a(n){var r,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return t(this,a),(r=s.call(this)).binaryType="arraybuffer",r.writeBuffer=[],n&&"object"===e(n)&&(o=n,n=null),n?(n=ve(n),o.hostname=n.host,o.secure="https"===n.protocol||"wss"===n.protocol,o.port=n.port,n.query&&(o.query=n.query)):o.host&&(o.hostname=ve(o.host).host),H(f(r),o),r.secure=null!=o.secure?o.secure:"undefined"!=typeof location&&"https:"===location.protocol,o.hostname&&!o.port&&(o.port=r.secure?"443":"80"),r.hostname=o.hostname||("undefined"!=typeof location?location.hostname:"localhost"),r.port=o.port||("undefined"!=typeof location&&location.port?location.port:r.secure?"443":"80"),r.transports=o.transports||["polling","websocket","webtransport"],r.writeBuffer=[],r.prevBufferLen=0,r.opts=i({path:"/engine.io",agent:!1,withCredentials:!1,upgrade:!0,timestampParam:"t",rememberUpgrade:!1,addTrailingSlash:!0,rejectUnauthorized:!0,perMessageDeflate:{threshold:1024},transportOptions:{},closeOnBeforeunload:!1},o),r.opts.path=r.opts.path.replace(/\/$/,"")+(r.opts.addTrailingSlash?"/":""),"string"==typeof r.opts.query&&(r.opts.query=function(e){for(var t={},n=e.split("&"),r=0,i=n.length;r<i;r++){var o=n[r].split("=");t[decodeURIComponent(o[0])]=decodeURIComponent(o[1])}return t}(r.opts.query)),r.id=null,r.upgrades=null,r.pingInterval=null,r.pingTimeout=null,r.pingTimeoutTimer=null,"function"==typeof addEventListener&&(r.opts.closeOnBeforeunload&&(r.beforeunloadEventListener=function(){r.transport&&(r.transport.removeAllListeners(),r.transport.close())},addEventListener("beforeunload",r.beforeunloadEventListener,!1)),"localhost"!==r.hostname&&(r.offlineEventListener=function(){r.onClose("transport close",{description:"network connection lost"})},addEventListener("offline",r.offlineEventListener,!1))),r.open(),r}return r(a,[{key:"createTransport",value:function(e){var t=i({},this.opts.query);t.EIO=4,t.transport=e,this.id&&(t.sid=this.id);var n=i({},this.opts,{query:t,socket:this,hostname:this.hostname,secure:this.secure,port:this.port},this.opts.transportOptions[e]);return new pe[e](n)}},{key:"open",value:function(){var e,t=this;if(this.opts.rememberUpgrade&&a.priorWebsocketSuccess&&-1!==this.transports.indexOf("websocket"))e="websocket";else{if(0===this.transports.length)return void this.setTimeoutFn((function(){t.emitReserved("error","No transports available")}),0);e=this.transports[0]}this.readyState="opening";try{e=this.createTransport(e)}catch(e){return this.transports.shift(),void this.open()}e.open(),this.setTransport(e)}},{key:"setTransport",value:function(e){var t=this;this.transport&&this.transport.removeAllListeners(),this.transport=e,e.on("drain",this.onDrain.bind(this)).on("packet",this.onPacket.bind(this)).on("error",this.onError.bind(this)).on("close",(function(e){return t.onClose("transport close",e)}))}},{key:"probe",value:function(e){var t=this,n=this.createTransport(e),r=!1;a.priorWebsocketSuccess=!1;var i=function(){r||(n.send([{type:"ping",data:"probe"}]),n.once("packet",(function(e){if(!r)if("pong"===e.type&&"probe"===e.data){if(t.upgrading=!0,t.emitReserved("upgrading",n),!n)return;a.priorWebsocketSuccess="websocket"===n.name,t.transport.pause((function(){r||"closed"!==t.readyState&&(f(),t.setTransport(n),n.send([{type:"upgrade"}]),t.emitReserved("upgrade",n),n=null,t.upgrading=!1,t.flush())}))}else{var i=new Error("probe error");i.transport=n.name,t.emitReserved("upgradeError",i)}})))};function o(){r||(r=!0,f(),n.close(),n=null)}var s=function(e){var r=new Error("probe error: "+e);r.transport=n.name,o(),t.emitReserved("upgradeError",r)};function c(){s("transport closed")}function u(){s("socket closed")}function h(e){n&&e.name!==n.name&&o()}var f=function(){n.removeListener("open",i),n.removeListener("error",s),n.removeListener("close",c),t.off("close",u),t.off("upgrading",h)};n.once("open",i),n.once("error",s),n.once("close",c),this.once("close",u),this.once("upgrading",h),-1!==this.upgrades.indexOf("webtransport")&&"webtransport"!==e?this.setTimeoutFn((function(){r||n.open()}),200):n.open()}},{key:"onOpen",value:function(){if(this.readyState="open",a.priorWebsocketSuccess="websocket"===this.transport.name,this.emitReserved("open"),this.flush(),"open"===this.readyState&&this.opts.upgrade)for(var e=0,t=this.upgrades.length;e<t;e++)this.probe(this.upgrades[e])}},{key:"onPacket",value:function(e){if("opening"===this.readyState||"open"===this.readyState||"closing"===this.readyState)switch(this.emitReserved("packet",e),this.emitReserved("heartbeat"),this.resetPingTimeout(),e.type){case"open":this.onHandshake(JSON.parse(e.data));break;case"ping":this.sendPacket("pong"),this.emitReserved("ping"),this.emitReserved("pong");break;case"error":var t=new Error("server error");t.code=e.data,this.onError(t);break;case"message":this.emitReserved("data",e.data),this.emitReserved("message",e.data)}}},{key:"onHandshake",value:function(e){this.emitReserved("handshake",e),this.id=e.sid,this.transport.query.sid=e.sid,this.upgrades=this.filterUpgrades(e.upgrades),this.pingInterval=e.pingInterval,this.pingTimeout=e.pingTimeout,this.maxPayload=e.maxPayload,this.onOpen(),"closed"!==this.readyState&&this.resetPingTimeout()}},{key:"resetPingTimeout",value:function(){var e=this;this.clearTimeoutFn(this.pingTimeoutTimer),this.pingTimeoutTimer=this.setTimeoutFn((function(){e.onClose("ping timeout")}),this.pingInterval+this.pingTimeout),this.opts.autoUnref&&this.pingTimeoutTimer.unref()}},{key:"onDrain",value:function(){this.writeBuffer.splice(0,this.prevBufferLen),this.prevBufferLen=0,0===this.writeBuffer.length?this.emitReserved("drain"):this.flush()}},{key:"flush",value:function(){if("closed"!==this.readyState&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length){var e=this.getWritablePackets();this.transport.send(e),this.prevBufferLen=e.length,this.emitReserved("flush")}}},{key:"getWritablePackets",value:function(){if(!(this.maxPayload&&"polling"===this.transport.name&&this.writeBuffer.length>1))return this.writeBuffer;for(var e,t=1,n=0;n<this.writeBuffer.length;n++){var r=this.writeBuffer[n].data;if(r&&(t+="string"==typeof(e=r)?function(e){for(var t=0,n=0,r=0,i=e.length;r<i;r++)(t=e.charCodeAt(r))<128?n+=1:t<2048?n+=2:t<55296||t>=57344?n+=3:(r++,n+=4);return n}(e):Math.ceil(1.33*(e.byteLength||e.size))),n>0&&t>this.maxPayload)return this.writeBuffer.slice(0,n);t+=2}return this.writeBuffer}},{key:"write",value:function(e,t,n){return this.sendPacket("message",e,t,n),this}},{key:"send",value:function(e,t,n){return this.sendPacket("message",e,t,n),this}},{key:"sendPacket",value:function(e,t,n,r){if("function"==typeof t&&(r=t,t=void 0),"function"==typeof n&&(r=n,n=null),"closing"!==this.readyState&&"closed"!==this.readyState){(n=n||{}).compress=!1!==n.compress;var i={type:e,data:t,options:n};this.emitReserved("packetCreate",i),this.writeBuffer.push(i),r&&this.once("flush",r),this.flush()}}},{key:"close",value:function(){var e=this,t=function(){e.onClose("forced close"),e.transport.close()},n=function n(){e.off("upgrade",n),e.off("upgradeError",n),t()},r=function(){e.once("upgrade",n),e.once("upgradeError",n)};return"opening"!==this.readyState&&"open"!==this.readyState||(this.readyState="closing",this.writeBuffer.length?this.once("drain",(function(){e.upgrading?r():t()})):this.upgrading?r():t()),this}},{key:"onError",value:function(e){a.priorWebsocketSuccess=!1,this.emitReserved("error",e),this.onClose("transport error",e)}},{key:"onClose",value:function(e,t){"opening"!==this.readyState&&"open"!==this.readyState&&"closing"!==this.readyState||(this.clearTimeoutFn(this.pingTimeoutTimer),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),"function"==typeof removeEventListener&&(removeEventListener("beforeunload",this.beforeunloadEventListener,!1),removeEventListener("offline",this.offlineEventListener,!1)),this.readyState="closed",this.id=null,this.emitReserved("close",e,t),this.writeBuffer=[],this.prevBufferLen=0)}},{key:"filterUpgrades",value:function(e){for(var t=[],n=0,r=e.length;n<r;n++)~this.transports.indexOf(e[n])&&t.push(e[n]);return t}}]),a}(U);ge.protocol=4,ge.protocol;var me="function"==typeof ArrayBuffer,be=function(e){return"function"==typeof ArrayBuffer.isView?ArrayBuffer.isView(e):e.buffer instanceof ArrayBuffer},ke=Object.prototype.toString,we="function"==typeof Blob||"undefined"!=typeof Blob&&"[object BlobConstructor]"===ke.call(Blob),_e="function"==typeof File||"undefined"!=typeof File&&"[object FileConstructor]"===ke.call(File);function Ee(e){return me&&(e instanceof ArrayBuffer||be(e))||we&&e instanceof Blob||_e&&e instanceof File}function Ae(t,n){if(!t||"object"!==e(t))return!1;if(Array.isArray(t)){for(var r=0,i=t.length;r<i;r++)if(Ae(t[r]))return!0;return!1}if(Ee(t))return!0;if(t.toJSON&&"function"==typeof t.toJSON&&1===arguments.length)return Ae(t.toJSON(),!0);for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)&&Ae(t[o]))return!0;return!1}function Oe(e){var t=[],n=e.data,r=e;return r.data=Te(n,t),r.attachments=t.length,{packet:r,buffers:t}}function Te(t,n){if(!t)return t;if(Ee(t)){var r={_placeholder:!0,num:n.length};return n.push(t),r}if(Array.isArray(t)){for(var i=new Array(t.length),o=0;o<t.length;o++)i[o]=Te(t[o],n);return i}if("object"===e(t)&&!(t instanceof Date)){var s={};for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(s[a]=Te(t[a],n));return s}return t}function Re(e,t){return e.data=Ce(e.data,t),delete e.attachments,e}function Ce(t,n){if(!t)return t;if(t&&!0===t._placeholder){if("number"==typeof t.num&&t.num>=0&&t.num<n.length)return n[t.num];throw new Error("illegal attachments")}if(Array.isArray(t))for(var r=0;r<t.length;r++)t[r]=Ce(t[r],n);else if("object"===e(t))for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(t[i]=Ce(t[i],n));return t}var Be,Se=["connect","connect_error","disconnect","disconnecting","newListener","removeListener"];!function(e){e[e.CONNECT=0]="CONNECT",e[e.DISCONNECT=1]="DISCONNECT",e[e.EVENT=2]="EVENT",e[e.ACK=3]="ACK",e[e.CONNECT_ERROR=4]="CONNECT_ERROR",e[e.BINARY_EVENT=5]="BINARY_EVENT",e[e.BINARY_ACK=6]="BINARY_ACK"}(Be||(Be={}));var Ne=function(){function e(n){t(this,e),this.replacer=n}return r(e,[{key:"encode",value:function(e){return e.type!==Be.EVENT&&e.type!==Be.ACK||!Ae(e)?[this.encodeAsString(e)]:this.encodeAsBinary({type:e.type===Be.EVENT?Be.BINARY_EVENT:Be.BINARY_ACK,nsp:e.nsp,data:e.data,id:e.id})}},{key:"encodeAsString",value:function(e){var t=""+e.type;return e.type!==Be.BINARY_EVENT&&e.type!==Be.BINARY_ACK||(t+=e.attachments+"-"),e.nsp&&"/"!==e.nsp&&(t+=e.nsp+","),null!=e.id&&(t+=e.id),null!=e.data&&(t+=JSON.stringify(e.data,this.replacer)),t}},{key:"encodeAsBinary",value:function(e){var t=Oe(e),n=this.encodeAsString(t.packet),r=t.buffers;return r.unshift(n),r}}]),e}();function Le(e){return"[object Object]"===Object.prototype.toString.call(e)}var xe=function(e){o(i,e);var n=l(i);function i(e){var r;return t(this,i),(r=n.call(this)).reviver=e,r}return r(i,[{key:"add",value:function(e){var t;if("string"==typeof e){if(this.reconstructor)throw new Error("got plaintext data when reconstructing a packet");var n=(t=this.decodeString(e)).type===Be.BINARY_EVENT;n||t.type===Be.BINARY_ACK?(t.type=n?Be.EVENT:Be.ACK,this.reconstructor=new Pe(t),0===t.attachments&&p(s(i.prototype),"emitReserved",this).call(this,"decoded",t)):p(s(i.prototype),"emitReserved",this).call(this,"decoded",t)}else{if(!Ee(e)&&!e.base64)throw new Error("Unknown type: "+e);if(!this.reconstructor)throw new Error("got binary data when not reconstructing a packet");(t=this.reconstructor.takeBinaryData(e))&&(this.reconstructor=null,p(s(i.prototype),"emitReserved",this).call(this,"decoded",t))}}},{key:"decodeString",value:function(e){var t=0,n={type:Number(e.charAt(0))};if(void 0===Be[n.type])throw new Error("unknown packet type "+n.type);if(n.type===Be.BINARY_EVENT||n.type===Be.BINARY_ACK){for(var r=t+1;"-"!==e.charAt(++t)&&t!=e.length;);var o=e.substring(r,t);if(o!=Number(o)||"-"!==e.charAt(t))throw new Error("Illegal attachments");n.attachments=Number(o)}if("/"===e.charAt(t+1)){for(var s=t+1;++t;){if(","===e.charAt(t))break;if(t===e.length)break}n.nsp=e.substring(s,t)}else n.nsp="/";var a=e.charAt(t+1);if(""!==a&&Number(a)==a){for(var c=t+1;++t;){var u=e.charAt(t);if(null==u||Number(u)!=u){--t;break}if(t===e.length)break}n.id=Number(e.substring(c,t+1))}if(e.charAt(++t)){var h=this.tryParse(e.substr(t));if(!i.isPayloadValid(n.type,h))throw new Error("invalid payload");n.data=h}return n}},{key:"tryParse",value:function(e){try{return JSON.parse(e,this.reviver)}catch(e){return!1}}},{key:"destroy",value:function(){this.reconstructor&&(this.reconstructor.finishedReconstruction(),this.reconstructor=null)}}],[{key:"isPayloadValid",value:function(e,t){switch(e){case Be.CONNECT:return Le(t);case Be.DISCONNECT:return void 0===t;case Be.CONNECT_ERROR:return"string"==typeof t||Le(t);case Be.EVENT:case Be.BINARY_EVENT:return Array.isArray(t)&&("number"==typeof t[0]||"string"==typeof t[0]&&-1===Se.indexOf(t[0]));case Be.ACK:case Be.BINARY_ACK:return Array.isArray(t)}}}]),i}(U),Pe=function(){function e(n){t(this,e),this.packet=n,this.buffers=[],this.reconPack=n}return r(e,[{key:"takeBinaryData",value:function(e){if(this.buffers.push(e),this.buffers.length===this.reconPack.attachments){var t=Re(this.reconPack,this.buffers);return this.finishedReconstruction(),t}return null}},{key:"finishedReconstruction",value:function(){this.reconPack=null,this.buffers=[]}}]),e}(),je=Object.freeze({__proto__:null,protocol:5,get PacketType(){return Be},Encoder:Ne,Decoder:xe});function qe(e,t,n){return e.on(t,n),function(){e.off(t,n)}}var De=Object.freeze({connect:1,connect_error:1,disconnect:1,disconnecting:1,newListener:1,removeListener:1}),Ue=function(e){o(a,e);var n=l(a);function a(e,r,o){var s;return t(this,a),(s=n.call(this)).connected=!1,s.recovered=!1,s.receiveBuffer=[],s.sendBuffer=[],s._queue=[],s._queueSeq=0,s.ids=0,s.acks={},s.flags={},s.io=e,s.nsp=r,o&&o.auth&&(s.auth=o.auth),s._opts=i({},o),s.io._autoConnect&&s.open(),s}return r(a,[{key:"disconnected",get:function(){return!this.connected}},{key:"subEvents",value:function(){if(!this.subs){var e=this.io;this.subs=[qe(e,"open",this.onopen.bind(this)),qe(e,"packet",this.onpacket.bind(this)),qe(e,"error",this.onerror.bind(this)),qe(e,"close",this.onclose.bind(this))]}}},{key:"active",get:function(){return!!this.subs}},{key:"connect",value:function(){return this.connected||(this.subEvents(),this.io._reconnecting||this.io.open(),"open"===this.io._readyState&&this.onopen()),this}},{key:"open",value:function(){return this.connect()}},{key:"send",value:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.unshift("message"),this.emit.apply(this,t),this}},{key:"emit",value:function(e){if(De.hasOwnProperty(e))throw new Error('"'+e.toString()+'" is a reserved event name');for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];if(n.unshift(e),this._opts.retries&&!this.flags.fromQueue&&!this.flags.volatile)return this._addToQueue(n),this;var i={type:Be.EVENT,data:n,options:{}};if(i.options.compress=!1!==this.flags.compress,"function"==typeof n[n.length-1]){var o=this.ids++,s=n.pop();this._registerAckCallback(o,s),i.id=o}var a=this.io.engine&&this.io.engine.transport&&this.io.engine.transport.writable;return this.flags.volatile&&(!a||!this.connected)||(this.connected?(this.notifyOutgoingListeners(i),this.packet(i)):this.sendBuffer.push(i)),this.flags={},this}},{key:"_registerAckCallback",value:function(e,t){var n,r=this,i=null!==(n=this.flags.timeout)&&void 0!==n?n:this._opts.ackTimeout;if(void 0!==i){var o=this.io.setTimeoutFn((function(){delete r.acks[e];for(var n=0;n<r.sendBuffer.length;n++)r.sendBuffer[n].id===e&&r.sendBuffer.splice(n,1);t.call(r,new Error("operation has timed out"))}),i),s=function(){r.io.clearTimeoutFn(o);for(var e=arguments.length,n=new Array(e),i=0;i<e;i++)n[i]=arguments[i];t.apply(r,n)};s.withError=!0,this.acks[e]=s}else this.acks[e]=t}},{key:"emitWithAck",value:function(e){for(var t=this,n=arguments.length,r=new Array(n>1?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i];return new Promise((function(n,i){var o=function(e,t){return e?i(e):n(t)};o.withError=!0,r.push(o),t.emit.apply(t,[e].concat(r))}))}},{key:"_addToQueue",value:function(e){var t,n=this;"function"==typeof e[e.length-1]&&(t=e.pop());var r={id:this._queueSeq++,tryCount:0,pending:!1,args:e,flags:i({fromQueue:!0},this.flags)};e.push((function(e){if(r===n._queue[0]){if(null!==e)r.tryCount>n._opts.retries&&(n._queue.shift(),t&&t(e));else if(n._queue.shift(),t){for(var i=arguments.length,o=new Array(i>1?i-1:0),s=1;s<i;s++)o[s-1]=arguments[s];t.apply(void 0,[null].concat(o))}return r.pending=!1,n._drainQueue()}})),this._queue.push(r),this._drainQueue()}},{key:"_drainQueue",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(this.connected&&0!==this._queue.length){var t=this._queue[0];t.pending&&!e||(t.pending=!0,t.tryCount++,this.flags=t.flags,this.emit.apply(this,t.args))}}},{key:"packet",value:function(e){e.nsp=this.nsp,this.io._packet(e)}},{key:"onopen",value:function(){var e=this;"function"==typeof this.auth?this.auth((function(t){e._sendConnectPacket(t)})):this._sendConnectPacket(this.auth)}},{key:"_sendConnectPacket",value:function(e){this.packet({type:Be.CONNECT,data:this._pid?i({pid:this._pid,offset:this._lastOffset},e):e})}},{key:"onerror",value:function(e){this.connected||this.emitReserved("connect_error",e)}},{key:"onclose",value:function(e,t){this.connected=!1,delete this.id,this.emitReserved("disconnect",e,t),this._clearAcks()}},{key:"_clearAcks",value:function(){var e=this;Object.keys(this.acks).forEach((function(t){if(!e.sendBuffer.some((function(e){return String(e.id)===t}))){var n=e.acks[t];delete e.acks[t],n.withError&&n.call(e,new Error("socket has been disconnected"))}}))}},{key:"onpacket",value:function(e){if(e.nsp===this.nsp)switch(e.type){case Be.CONNECT:e.data&&e.data.sid?this.onconnect(e.data.sid,e.data.pid):this.emitReserved("connect_error",new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));break;case Be.EVENT:case Be.BINARY_EVENT:this.onevent(e);break;case Be.ACK:case Be.BINARY_ACK:this.onack(e);break;case Be.DISCONNECT:this.ondisconnect();break;case Be.CONNECT_ERROR:this.destroy();var t=new Error(e.data.message);t.data=e.data.data,this.emitReserved("connect_error",t)}}},{key:"onevent",value:function(e){var t=e.data||[];null!=e.id&&t.push(this.ack(e.id)),this.connected?this.emitEvent(t):this.receiveBuffer.push(Object.freeze(t))}},{key:"emitEvent",value:function(e){if(this._anyListeners&&this._anyListeners.length){var t,n=y(this._anyListeners.slice());try{for(n.s();!(t=n.n()).done;){t.value.apply(this,e)}}catch(e){n.e(e)}finally{n.f()}}p(s(a.prototype),"emit",this).apply(this,e),this._pid&&e.length&&"string"==typeof e[e.length-1]&&(this._lastOffset=e[e.length-1])}},{key:"ack",value:function(e){var t=this,n=!1;return function(){if(!n){n=!0;for(var r=arguments.length,i=new Array(r),o=0;o<r;o++)i[o]=arguments[o];t.packet({type:Be.ACK,id:e,data:i})}}}},{key:"onack",value:function(e){var t=this.acks[e.id];"function"==typeof t&&(delete this.acks[e.id],t.withError&&e.data.unshift(null),t.apply(this,e.data))}},{key:"onconnect",value:function(e,t){this.id=e,this.recovered=t&&this._pid===t,this._pid=t,this.connected=!0,this.emitBuffered(),this.emitReserved("connect"),this._drainQueue(!0)}},{key:"emitBuffered",value:function(){var e=this;this.receiveBuffer.forEach((function(t){return e.emitEvent(t)})),this.receiveBuffer=[],this.sendBuffer.forEach((function(t){e.notifyOutgoingListeners(t),e.packet(t)})),this.sendBuffer=[]}},{key:"ondisconnect",value:function(){this.destroy(),this.onclose("io server disconnect")}},{key:"destroy",value:function(){this.subs&&(this.subs.forEach((function(e){return e()})),this.subs=void 0),this.io._destroy(this)}},{key:"disconnect",value:function(){return this.connected&&this.packet({type:Be.DISCONNECT}),this.destroy(),this.connected&&this.onclose("io client disconnect"),this}},{key:"close",value:function(){return this.disconnect()}},{key:"compress",value:function(e){return this.flags.compress=e,this}},{key:"volatile",get:function(){return this.flags.volatile=!0,this}},{key:"timeout",value:function(e){return this.flags.timeout=e,this}},{key:"onAny",value:function(e){return this._anyListeners=this._anyListeners||[],this._anyListeners.push(e),this}},{key:"prependAny",value:function(e){return this._anyListeners=this._anyListeners||[],this._anyListeners.unshift(e),this}},{key:"offAny",value:function(e){if(!this._anyListeners)return this;if(e){for(var t=this._anyListeners,n=0;n<t.length;n++)if(e===t[n])return t.splice(n,1),this}else this._anyListeners=[];return this}},{key:"listenersAny",value:function(){return this._anyListeners||[]}},{key:"onAnyOutgoing",value:function(e){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.push(e),this}},{key:"prependAnyOutgoing",value:function(e){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.unshift(e),this}},{key:"offAnyOutgoing",value:function(e){if(!this._anyOutgoingListeners)return this;if(e){for(var t=this._anyOutgoingListeners,n=0;n<t.length;n++)if(e===t[n])return t.splice(n,1),this}else this._anyOutgoingListeners=[];return this}},{key:"listenersAnyOutgoing",value:function(){return this._anyOutgoingListeners||[]}},{key:"notifyOutgoingListeners",value:function(e){if(this._anyOutgoingListeners&&this._anyOutgoingListeners.length){var t,n=y(this._anyOutgoingListeners.slice());try{for(n.s();!(t=n.n()).done;){t.value.apply(this,e.data)}}catch(e){n.e(e)}finally{n.f()}}}}]),a}(U);function Ie(e){e=e||{},this.ms=e.min||100,this.max=e.max||1e4,this.factor=e.factor||2,this.jitter=e.jitter>0&&e.jitter<=1?e.jitter:0,this.attempts=0}Ie.prototype.duration=function(){var e=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var t=Math.random(),n=Math.floor(t*this.jitter*e);e=0==(1&Math.floor(10*t))?e-n:e+n}return 0|Math.min(e,this.max)},Ie.prototype.reset=function(){this.attempts=0},Ie.prototype.setMin=function(e){this.ms=e},Ie.prototype.setMax=function(e){this.max=e},Ie.prototype.setJitter=function(e){this.jitter=e};var Fe=function(n){o(s,n);var i=l(s);function s(n,r){var o,a;t(this,s),(o=i.call(this)).nsps={},o.subs=[],n&&"object"===e(n)&&(r=n,n=void 0),(r=r||{}).path=r.path||"/socket.io",o.opts=r,H(f(o),r),o.reconnection(!1!==r.reconnection),o.reconnectionAttempts(r.reconnectionAttempts||1/0),o.reconnectionDelay(r.reconnectionDelay||1e3),o.reconnectionDelayMax(r.reconnectionDelayMax||5e3),o.randomizationFactor(null!==(a=r.randomizationFactor)&&void 0!==a?a:.5),o.backoff=new Ie({min:o.reconnectionDelay(),max:o.reconnectionDelayMax(),jitter:o.randomizationFactor()}),o.timeout(null==r.timeout?2e4:r.timeout),o._readyState="closed",o.uri=n;var c=r.parser||je;return o.encoder=new c.Encoder,o.decoder=new c.Decoder,o._autoConnect=!1!==r.autoConnect,o._autoConnect&&o.open(),o}return r(s,[{key:"reconnection",value:function(e){return arguments.length?(this._reconnection=!!e,this):this._reconnection}},{key:"reconnectionAttempts",value:function(e){return void 0===e?this._reconnectionAttempts:(this._reconnectionAttempts=e,this)}},{key:"reconnectionDelay",value:function(e){var t;return void 0===e?this._reconnectionDelay:(this._reconnectionDelay=e,null===(t=this.backoff)||void 0===t||t.setMin(e),this)}},{key:"randomizationFactor",value:function(e){var t;return void 0===e?this._randomizationFactor:(this._randomizationFactor=e,null===(t=this.backoff)||void 0===t||t.setJitter(e),this)}},{key:"reconnectionDelayMax",value:function(e){var t;return void 0===e?this._reconnectionDelayMax:(this._reconnectionDelayMax=e,null===(t=this.backoff)||void 0===t||t.setMax(e),this)}},{key:"timeout",value:function(e){return arguments.length?(this._timeout=e,this):this._timeout}},{key:"maybeReconnectOnOpen",value:function(){!this._reconnecting&&this._reconnection&&0===this.backoff.attempts&&this.reconnect()}},{key:"open",value:function(e){var t=this;if(~this._readyState.indexOf("open"))return this;this.engine=new ge(this.uri,this.opts);var n=this.engine,r=this;this._readyState="opening",this.skipReconnect=!1;var i=qe(n,"open",(function(){r.onopen(),e&&e()})),o=function(n){t.cleanup(),t._readyState="closed",t.emitReserved("error",n),e?e(n):t.maybeReconnectOnOpen()},s=qe(n,"error",o);if(!1!==this._timeout){var a=this._timeout,c=this.setTimeoutFn((function(){i(),o(new Error("timeout")),n.close()}),a);this.opts.autoUnref&&c.unref(),this.subs.push((function(){t.clearTimeoutFn(c)}))}return this.subs.push(i),this.subs.push(s),this}},{key:"connect",value:function(e){return this.open(e)}},{key:"onopen",value:function(){this.cleanup(),this._readyState="open",this.emitReserved("open");var e=this.engine;this.subs.push(qe(e,"ping",this.onping.bind(this)),qe(e,"data",this.ondata.bind(this)),qe(e,"error",this.onerror.bind(this)),qe(e,"close",this.onclose.bind(this)),qe(this.decoder,"decoded",this.ondecoded.bind(this)))}},{key:"onping",value:function(){this.emitReserved("ping")}},{key:"ondata",value:function(e){try{this.decoder.add(e)}catch(e){this.onclose("parse error",e)}}},{key:"ondecoded",value:function(e){var t=this;ce((function(){t.emitReserved("packet",e)}),this.setTimeoutFn)}},{key:"onerror",value:function(e){this.emitReserved("error",e)}},{key:"socket",value:function(e,t){var n=this.nsps[e];return n?this._autoConnect&&!n.active&&n.connect():(n=new Ue(this,e,t),this.nsps[e]=n),n}},{key:"_destroy",value:function(e){for(var t=0,n=Object.keys(this.nsps);t<n.length;t++){var r=n[t];if(this.nsps[r].active)return}this._close()}},{key:"_packet",value:function(e){for(var t=this.encoder.encode(e),n=0;n<t.length;n++)this.engine.write(t[n],e.options)}},{key:"cleanup",value:function(){this.subs.forEach((function(e){return e()})),this.subs.length=0,this.decoder.destroy()}},{key:"_close",value:function(){this.skipReconnect=!0,this._reconnecting=!1,this.onclose("forced close"),this.engine&&this.engine.close()}},{key:"disconnect",value:function(){return this._close()}},{key:"onclose",value:function(e,t){this.cleanup(),this.backoff.reset(),this._readyState="closed",this.emitReserved("close",e,t),this._reconnection&&!this.skipReconnect&&this.reconnect()}},{key:"reconnect",value:function(){var e=this;if(this._reconnecting||this.skipReconnect)return this;var t=this;if(this.backoff.attempts>=this._reconnectionAttempts)this.backoff.reset(),this.emitReserved("reconnect_failed"),this._reconnecting=!1;else{var n=this.backoff.duration();this._reconnecting=!0;var r=this.setTimeoutFn((function(){t.skipReconnect||(e.emitReserved("reconnect_attempt",t.backoff.attempts),t.skipReconnect||t.open((function(n){n?(t._reconnecting=!1,t.reconnect(),e.emitReserved("reconnect_error",n)):t.onreconnect()})))}),n);this.opts.autoUnref&&r.unref(),this.subs.push((function(){e.clearTimeoutFn(r)}))}}},{key:"onreconnect",value:function(){var e=this.backoff.attempts;this._reconnecting=!1,this.backoff.reset(),this.emitReserved("reconnect",e)}}]),s}(U),Me={};function Ve(t,n){"object"===e(t)&&(n=t,t=void 0);var r,i=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments.length>2?arguments[2]:void 0,r=e;n=n||"undefined"!=typeof location&&location,null==e&&(e=n.protocol+"//"+n.host),"string"==typeof e&&("/"===e.charAt(0)&&(e="/"===e.charAt(1)?n.protocol+e:n.host+e),/^(https?|wss?):\/\//.test(e)||(e=void 0!==n?n.protocol+"//"+e:"https://"+e),r=ve(e)),r.port||(/^(http|ws)$/.test(r.protocol)?r.port="80":/^(http|ws)s$/.test(r.protocol)&&(r.port="443")),r.path=r.path||"/";var i=-1!==r.host.indexOf(":")?"["+r.host+"]":r.host;return r.id=r.protocol+"://"+i+":"+r.port+t,r.href=r.protocol+"://"+i+(n&&n.port===r.port?"":":"+r.port),r}(t,(n=n||{}).path||"/socket.io"),o=i.source,s=i.id,a=i.path,c=Me[s]&&a in Me[s].nsps;return n.forceNew||n["force new connection"]||!1===n.multiplex||c?r=new Fe(o,n):(Me[s]||(Me[s]=new Fe(o,n)),r=Me[s]),i.query&&!n.query&&(n.query=i.queryKey),r.socket(i.path,n)}return i(Ve,{Manager:Fe,Socket:Ue,io:Ve,connect:Ve}),Ve}));

// Spicetify Sync Extension - v2
(function SpicetifySync() {
  const { Player, Platform, React, ReactDOM } = Spicetify;
  if (!Player || !Platform || !React || !ReactDOM) {
    if ((SpicetifySync._retries = (SpicetifySync._retries || 0) + 1) < 20)
      setTimeout(SpicetifySync, 300);
    return;
  }

  const PROTOCOL_VERSION = 1;

  // --------------------------------------------------------------------------
  // State
  // --------------------------------------------------------------------------
  let socket         = null;
  let role           = null;
  let serverIP       = localStorage.getItem("sync_serverIP") || "spicetify-sync-server.onrender.com";
  let username       = localStorage.getItem("sync_username") || "User";
  let isConnected    = false;
  let reconnecting   = false;
  let cohostMode     = false;
  let roomCode       = localStorage.getItem("sync_roomCode") || "";
  let lastVolume     = null;
  let lastGuestCount = null;
  let guestCount     = 0;
  let lastRoomInfo   = { hosts: 0, guests: 0 };
  let waitingForHost      = false;
  let lastConnectClick    = 0;
  let syncCheckTimer      = null;
  let lastSyncDrift       = null;
  let sessionHistory      = []; // [{ name, artist, uri }], newest first, max 10
  let mySkipVoted         = false;
  let _lastButtonLabel    = null;
  let _lastRoomInfoHtml   = null;
  let participants        = [];
  let participantsTimer   = null;
  let spotifyDisplayName  = null;       // real account name from UserAPI (admin gate)
  let adminToken          = null;       // session-only, never persisted
  let adminRefreshTimer   = null;
  let adminTopbarBtn      = null;       // Spicetify.Topbar.Button instance
  const ADMIN_USERNAME    = "Norgon";

  // Prevents event echo: applying a remote command triggers local Player events
  // (onplaypause, songchange) that would re-broadcast it. suppressFor() increments
  // the counter; listeners return early while it's > 0.
  let suppressCount = 0;
  function suppressFor(ms) {
    suppressCount++;
    setTimeout(() => { suppressCount = Math.max(0, suppressCount - 1); }, ms);
  }

  function isController() {
    return role === "host" || (cohostMode && role === "guest");
  }

  function escHtml(v) {
    return String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  const MAX_POSITION_MS = 86400000; // 24 h — max reasonable track position

  function isSpotifyUri(v) {
    return typeof v === "string" && /^spotify:[a-z]+:[A-Za-z0-9]{22}$/.test(v);
  }
  function isSafeNum(v, min = 0, max = Infinity) {
    return typeof v === "number" && isFinite(v) && v >= min && v <= max;
  }

  // --------------------------------------------------------------------------
  // Settings + i18n
  // --------------------------------------------------------------------------
  const settings = {
    autoConnect: localStorage.getItem("sync_autoConnect") === "true",
    lang:        localStorage.getItem("sync_lang") || "auto",
    showCode:    localStorage.getItem("sync_showCode") === "true",
    volumeSync:  localStorage.getItem("sync_volumeSync") === "true",
    syncDelay:   Math.max(0, Math.min(500, parseInt(localStorage.getItem("sync_syncDelay") || "0", 10) || 0)),
    soundNotif:  localStorage.getItem("sync_soundNotif") !== "false",
  };
  function saveSetting(key, value) {
    localStorage.setItem(`sync_${key}`, String(value));
    settings[key] = value;
  }

  const I18N = {
    en: {
      appName: "Spicetify Sync",
      server: "Server", serverPh: "localhost or ngrok URL",
      username: "Username", usernamePh: "Your name",
      roomCode: "Room Code", roomCodePh: "6-char code (guests only)",
      yourCode: "Your room code", copyCode: "Copy",
      codeCopied: "Code copied!",
      host: "Host", guest: "Guest",
      disconnect: "Disconnect", cancel: "Cancel",
      statusHost: "You are the host",
      statusGuest: "Connected as guest",
      statusCohost: "Connected — co-host mode",
      statusRecon: "Reconnecting…",
      statusReconN: (n) => `Reconnecting… (attempt ${n})`,
      statusWaiting: "Waiting for host…",
      cohostLabel: "Co-host mode", cohostDesc: "Guests can skip, play & pause",
      cohostNote: "You can control playback for everyone.",
      settingsTitle: "Settings", back: "← Back",
      autoConnect: "Auto-connect", autoConnectDesc: "Reconnect on Spotify start",
      language: "Language",
      langAuto: "Auto (system)", langFr: "Français", langEn: "English",
      showCode: "Show code in toolbar", showCodeDesc: "Display active room code next to the button",
      volumeSync: "Volume sync", volumeSyncDesc: "Sync volume between host and guests",
      syncDelay: "Sync delay (ms)", syncDelayDesc: "Extra offset to compensate custom latency",
      soundNotif: "Notification sounds", soundNotifDesc: "Play a sound when guests join or leave",
      sectionGeneral: "General", sectionSession: "Session",
      connectedAs: (r, name) => `Connected as ${r} (${name})`,
      cohostModeOn: "Co-host mode ON — you can now control playback.",
      cohostModeOff: "Co-host mode OFF.",
      cannotReach: "Cannot reach server — retrying…",
      reconnFailed: "Could not connect after 10 attempts.",
      connLost: "Connection lost — reconnecting…",
      hostConnected: "Host connected — syncing…",
      hostLeft: "Host disconnected.",
    },
    fr: {
      appName: "Spicetify Sync",
      server: "Serveur", serverPh: "localhost ou URL ngrok",
      username: "Nom d'utilisateur", usernamePh: "Votre nom",
      roomCode: "Code de room", roomCodePh: "Code à 6 caractères (invités)",
      yourCode: "Votre code de room", copyCode: "Copier",
      codeCopied: "Code copié !",
      host: "Hôte", guest: "Invité",
      disconnect: "Déconnecter", cancel: "Annuler",
      statusHost: "Vous êtes l'hôte",
      statusGuest: "Connecté en tant qu'invité",
      statusCohost: "Connecté — mode co-hôte",
      statusRecon: "Reconnexion…",
      statusReconN: (n) => `Reconnexion… (tentative ${n})`,
      statusWaiting: "En attente de l'hôte…",
      cohostLabel: "Mode co-hôte", cohostDesc: "Les invités contrôlent la lecture",
      cohostNote: "Vous pouvez contrôler la lecture pour tous.",
      settingsTitle: "Paramètres", back: "← Retour",
      autoConnect: "Connexion automatique", autoConnectDesc: "Se reconnecter au démarrage",
      language: "Langue",
      langAuto: "Auto (système)", langFr: "Français", langEn: "English",
      showCode: "Afficher le code dans la barre", showCodeDesc: "Affiche le code de room actif à côté du bouton",
      volumeSync: "Sync du volume", volumeSyncDesc: "Synchronise le volume entre hôte et invités",
      syncDelay: "Délai de sync (ms)", syncDelayDesc: "Décalage supplémentaire pour compenser la latence",
      soundNotif: "Sons de notification", soundNotifDesc: "Joue un son quand un invité rejoint ou quitte",
      sectionGeneral: "Général", sectionSession: "Session",
      connectedAs: (r, name) => `Connecté en tant que ${r} (${name})`,
      cohostModeOn: "Mode co-hôte activé — vous pouvez contrôler la lecture.",
      cohostModeOff: "Mode co-hôte désactivé.",
      cannotReach: "Impossible de joindre le serveur — reconnexion…",
      reconnFailed: "Impossible de se connecter après 10 tentatives.",
      connLost: "Connexion perdue — reconnexion…",
      hostConnected: "Hôte connecté — synchronisation…",
      hostLeft: "Hôte déconnecté.",
    },
  };
  function getLang() {
    if (settings.lang === "fr") return "fr";
    if (settings.lang === "en") return "en";
    return (navigator.language || "en").toLowerCase().startsWith("fr") ? "fr" : "en";
  }
  function t(key, ...args) {
    const lang = getLang();
    const v = (I18N[lang] ?? I18N.en)[key] ?? I18N.en[key] ?? key;
    return typeof v === "function" ? v(...args) : v;
  }

  // --------------------------------------------------------------------------
  // Web Audio beep — backup ctx.close() if onended doesn't fire
  // --------------------------------------------------------------------------
  function playBeep(join) {
    if (!settings.soundNotif) return;
    try {
      const ctx  = new (window.AudioContext || window.webkitAudioContext)();
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      if (join) {
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.setValueAtTime(1100, ctx.currentTime + 0.08);
      } else {
        osc.frequency.setValueAtTime(660, ctx.currentTime);
        osc.frequency.setValueAtTime(440, ctx.currentTime + 0.08);
      }
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.22);
      osc.onended = () => { try { ctx.close(); } catch (_) {} };
      setTimeout(() => { if (ctx.state !== "closed") ctx.close().catch(() => {}); }, 500);
    } catch (_) {}
  }

  // --------------------------------------------------------------------------
  // Socket.io bundled inline — no CDN dependency
  function loadSocketIO(callback) { callback(); }

  // Single source of truth for the server base URL (used by connect + admin).
  function buildServerURL() {
    const isLocal = serverIP === "localhost" || serverIP === "127.0.0.1";
    const isIP    = /^[\d.]+$/.test(serverIP);
    return isLocal ? `http://${serverIP}:3000`
         : isIP    ? `https://${serverIP}:3000`
                   : `https://${serverIP}`;
  }

  // --------------------------------------------------------------------------
  // Admin dashboard (gated to the Spotify account named ADMIN_USERNAME).
  // The username gate is cosmetic — the real protection is the server token.
  // Token is typed in the panel, hashed (SHA-256) and sent as x-admin-token;
  // it is never persisted to localStorage.
  // --------------------------------------------------------------------------
  async function sha256Hex(str) {
    const buf = await window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
    return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
  }

  async function fetchAdminData() {
    if (!adminToken) return;
    try {
      const hash = await sha256Hex(adminToken);
      const res = await fetch(`${buildServerURL()}/admin`, { headers: { "x-admin-token": hash } });
      if (res.status === 429) return;              // polled too fast — skip this tick
      if (res.status === 401) {
        showNotification("Admin: invalid token.", true);
        adminToken = null;
        stopAdminRefresh();
        showAdminAuth(true);
        return;
      }
      if (res.status === 503) { showNotification("Admin: disabled on server (no ADMIN_TOKEN).", true); stopAdminRefresh(); return; }
      if (!res.ok) return;
      renderAdminData(await res.json());
    } catch (_) { /* network error — next tick retries */ }
  }

  async function kickRoom(code) {
    if (!adminToken || !/^[A-Z0-9]{6}$/i.test(code)) return;
    try {
      const hash = await sha256Hex(adminToken);
      const res = await fetch(`${buildServerURL()}/admin/kick`, {
        method:  "POST",
        headers: { "x-admin-token": hash, "content-type": "application/json" },
        body:    JSON.stringify({ code }),
      });
      if (res.ok) { showNotification(`Room ${code} kicked.`); fetchAdminData(); }
      else        showNotification("Kick failed.", true);
    } catch (_) { showNotification("Kick failed.", true); }
  }

  function startAdminRefresh() { stopAdminRefresh(); fetchAdminData(); adminRefreshTimer = setInterval(fetchAdminData, 6000); }
  function stopAdminRefresh()  { clearInterval(adminRefreshTimer); adminRefreshTimer = null; }

  // Admin button lives in the Spicetify topbar (top of the screen).
  // Created only when the Spotify account is ADMIN_USERNAME — strict gate.
  function maybeRevealAdminButton() {
    if (spotifyDisplayName !== ADMIN_USERNAME) return;
    if (adminTopbarBtn) return;                 // already created
    if (!window.Spicetify?.Topbar?.Button) return;
    const shieldSvg =
      '<svg role="img" height="16" width="16" viewBox="0 0 16 16" fill="currentColor">' +
      '<path d="M8 1 2 3.2v4.3c0 4 3.4 6.4 6 7.3 2.6-.9 6-3.3 6-7.3V3.2L8 1z"/></svg>';
    adminTopbarBtn = new window.Spicetify.Topbar.Button(
      "Spicetify Sync Admin",
      shieldSvg,
      () => { if (!getPanel()) buildPanel(); openAdminPane(); },
      false
    );
  }

  function openAdminPane() {
    const p = getPanel(); if (!p) return;
    qs(p, "#sync-main-content").style.display = "none";
    const sc = qs(p, "#sync-settings-content"); if (sc) sc.style.display = "none";
    qs(p, "#sync-admin-content").style.display = "flex";
    if (adminToken) { showAdminAuth(false); startAdminRefresh(); }
    else            showAdminAuth(true);
  }

  function showAdminAuth(needAuth) {
    const p = getPanel(); if (!p) return;
    const auth = p.querySelector("#sync-admin-auth");
    const data = p.querySelector("#sync-admin-data");
    if (auth) auth.style.display = needAuth ? "flex" : "none";
    if (data) data.style.display = needAuth ? "none" : "block";
  }

  function adminStat(label, val) {
    return `<div style="flex:1;min-width:58px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:8px;text-align:center">` +
      `<div style="font-size:18px;font-weight:900;color:var(--spice-button,#1db954)">${escHtml(val ?? 0)}</div>` +
      `<div style="font-size:9px;color:var(--spice-subtext,#a7a7a7);text-transform:uppercase;letter-spacing:0.06em">${escHtml(label)}</div></div>`;
  }

  function adminRoomRow(r) {
    const members = Array.isArray(r.members)
      ? r.members.map((m) => `${escHtml(m.username)} (${escHtml(m.role)})`).join(", ")
      : "";
    return `<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:8px;margin-bottom:6px">` +
      `<div style="display:flex;align-items:center;justify-content:space-between;gap:6px">` +
        `<span style="font-family:monospace;font-weight:800;font-size:13px;color:var(--spice-text,#fff)">${escHtml(r.code)}</span>` +
        `<button class="sync-admin-kick" data-code="${escHtml(r.code)}" style="padding:3px 10px;background:rgba(226,33,52,0.15);border:1px solid rgba(226,33,52,0.4);border-radius:50px;color:#e22134;font-size:10px;font-weight:700;cursor:pointer;font-family:inherit;flex-shrink:0">Kick room</button>` +
      `</div>` +
      `<div style="font-size:10px;color:var(--spice-subtext,#a7a7a7);margin-top:4px;line-height:1.4;overflow:hidden;text-overflow:ellipsis">${members || "—"}</div></div>`;
  }

  function renderAdminData(data) {
    const wrap = document.getElementById("sync-admin-data");
    if (!wrap || !data) return;
    const s     = data.stats || {};
    const rooms = Array.isArray(data.rooms) ? data.rooms : [];
    const log   = Array.isArray(data.connectionLog) ? data.connectionLog : [];
    const SECT  = "font-size:9px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:var(--spice-subtext,#a7a7a7);margin-bottom:4px";
    let html = `<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px">` +
      adminStat("Connected", s.connected) + adminStat("Rooms", s.activeRooms) +
      adminStat("Total", s.totalConnections) + adminStat("Peak", s.peakConnections) + `</div>`;
    html += `<div style="${SECT}">Active rooms</div>`;
    html += rooms.length
      ? rooms.map(adminRoomRow).join("")
      : `<div style="font-size:11px;color:var(--spice-subtext,#a7a7a7);margin-bottom:6px">No active rooms</div>`;
    html += `<div style="${SECT};margin-top:10px">Recent connections</div>`;
    html += log.length
      ? log.map((l) =>
          `<div style="font-size:10px;color:var(--spice-subtext,#a7a7a7);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">` +
          `<span style="color:var(--spice-text,#fff)">${escHtml(l.username)}</span> · ${escHtml(l.role)} · ${escHtml(l.roomCode)}</div>`
        ).join("")
      : `<div style="font-size:11px;color:var(--spice-subtext,#a7a7a7)">No connections yet</div>`;
    wrap.innerHTML = html;
    wrap.querySelectorAll(".sync-admin-kick").forEach((btn) => {
      btn.addEventListener("click", () => kickRoom(btn.dataset.code));
    });
  }

  // Host creates the room; server assigns a code via room_created.
  // Guest joins with the 6-char code. Both roles re-register using the
  // closure-captured selectedRole on every Socket.io auto-reconnect.
  function connect(selectedRole) {
    localStorage.setItem("sync_lastRole", selectedRole);
    stopSeekPoll();
    if (socket) { socket.disconnect(); socket = null; }
    reconnecting    = false;
    cohostMode      = false;
    lastVolume      = null;
    lastGuestCount  = null;
    guestCount      = 0;
    lastRoomInfo    = { hosts: 0, guests: 0 };
    waitingForHost  = false;
    registerPlayerListeners();

    loadSocketIO(() => {
      if (!/^[a-zA-Z0-9.\-]+(:\d{1,5})?$/.test(serverIP)) {
        showNotification("Invalid server address.", true);
        reconnecting = false;
        resetPanelUI();
        return;
      }
      const serverURL = buildServerURL();

      socket = window.io(serverURL, {
        transports: ["websocket"],
        reconnectionDelay: 1000,
        reconnectionDelayMax: 8000,
        reconnectionAttempts: 10,
      });

      socket.on("connect", () => {
        isConnected  = true;
        role         = selectedRole;
        reconnecting = false;
        lastVolume   = null;
        const regPayload = { role, username, roomCode, version: PROTOCOL_VERSION };
        if (role === "host" && roomCode) regPayload.requestedCode = roomCode;
        socket.emit("register", regPayload);
        updateButtonState();
        const disc = document.querySelector("#sync-panel #sync-disconnect-btn");
        if (disc && disc.textContent === t("cancel")) disc.textContent = t("disconnect");
      });

      socket.on("registered", ({ role: r }) => {
        role           = r;
        waitingForHost = false;
        showNotification(t("connectedAs", r, username));
        setConnectedPanelUI(r);
        if (r === "guest") socket.emit("request_sync");
        if (r === "host")  startSyncCheck();
        startSeekPoll();
      });

      socket.on("connect_error", () => {
        if (!reconnecting) showNotification(t("cannotReach"), true);
        reconnecting = true;
        updateButtonState();
        setReconnectingPanelUI();
      });

      socket.on("reconnect_attempt", (n) => {
        reconnecting = true;
        updateButtonState();
        setReconnectingPanelUI(n);
      });

      socket.on("reconnect_failed", () => {
        showNotification(t("reconnFailed"), true);
        reconnecting = false;
        disconnect();
        resetPanelUI();
      });

      socket.on("error", ({ message = "Unknown error" } = {}) => {
        showNotification(`Error: ${message}`, true);
        reconnecting = false;
        disconnect();
        resetPanelUI();
      });

      socket.on("disconnect", (reason) => {
        isConnected    = false;
        role           = null;
        waitingForHost = false;
        participants   = [];
        stopParticipantsTimer();
        stopSyncCheck();
        stopSeekPoll();
        updateButtonState();
        updateToolbarCode();
        updateToolbarGuestCount(0);
        if (reason === "io client disconnect") {
          reconnecting = false;
          resetPanelUI();
        } else {
          reconnecting = true;
          showNotification(t("connLost"));
          setReconnectingPanelUI();
        }
      });

      socket.on("room_update", ({ hosts, guests }) => {
        if (!isSafeNum(hosts, 0) || !isSafeNum(guests, 0)) return;
        if (lastGuestCount !== null && guests !== lastGuestCount) {
          playBeep(guests > lastGuestCount);
        }
        lastGuestCount = guests;
        guestCount     = guests;
        lastRoomInfo   = { hosts, guests };
        updateRoomInfo(hosts, guests);
        updateToolbarGuestCount(guests);
      });

      socket.on("cohost_mode_changed", ({ enabled }) => {
        cohostMode = Boolean(enabled);
        updateCohostSection();
        updateButtonState();
        if (role === "guest" && !waitingForHost) {
          showNotification(cohostMode ? t("cohostModeOn") : t("cohostModeOff"));
        }
      });

      socket.on("room_created", ({ code } = {}) => {
        if (typeof code !== "string" || !/^[A-Z0-9]{6}$/i.test(code)) return;
        roomCode = code.toUpperCase();
        localStorage.setItem("sync_roomCode", roomCode);
        updateToolbarCode();
        const p = getPanel();
        if (!p) return;
        const codeEl = qs(p, "#sync-host-room-code");
        if (codeEl) codeEl.textContent = roomCode;
        const section = qs(p, "#sync-host-code-section");
        if (section) section.style.display = "block";
      });

      socket.on("waiting_for_host", () => { waitingForHost = true; setWaitingPanelUI(); updateButtonState(); });

      socket.on("host_connected", () => {
        waitingForHost = false;
        if (role === "guest" && isConnected) {
          socket.emit("request_sync");
          showNotification(t("hostConnected"));
          setConnectedPanelUI(role);
          updateRoomInfo(lastRoomInfo.hosts, lastRoomInfo.guests);
        }
        updateButtonState();
      });

      socket.on("host_left", () => {
        if (waitingForHost) return;
        waitingForHost = true;
        cohostMode     = false;
        showNotification(t("hostLeft"), true);
        setWaitingPanelUI();
        updateButtonState();
      });

      socket.on("play", async ({ uri, position, contextUri } = {}) => {
        if (!isConnected || !isSpotifyUri(uri)) return;
        if (position != null && !isSafeNum(position, 0, MAX_POSITION_MS)) return;
        try {
          if (Player.data?.item?.uri !== uri) {
            suppressFor(1200);
            if (contextUri && isSpotifyUri(contextUri) && contextUri !== uri) {
              await Player.playUri(contextUri, {}, { skipTo: { uri }, seekTo: position || 0 });
            } else {
              await Player.playUri(uri, {}, { seekTo: position || 0 });
            }
            resetSeekBaseline(position || 0);
          } else {
            suppressFor(500);
            if (position != null) await Player.seek(position);
            await Player.play();
            resetSeekBaseline(position ?? null);
          }
        } catch (e) { console.error("[Sync] play:", e); }
      });

      socket.on("pause", async ({ position } = {}) => {
        if (!isConnected) return;
        if (position != null && !isSafeNum(position, 0, MAX_POSITION_MS)) return;
        suppressFor(600);
        try {
          if (position != null) await Player.seek(position);
          await Player.pause();
          resetSeekBaseline(position ?? null);
        } catch (e) { console.error("[Sync] pause:", e); }
      });

      socket.on("seek", async ({ position, sentAt } = {}) => {
        if (!isConnected || !isSafeNum(position, 0, MAX_POSITION_MS)) return;
        suppressFor(800);
        try {
          const halfRtt = (sentAt && isSafeNum(sentAt, 0))
            ? Math.min(Math.max(0, (Date.now() - sentAt) / 2), 1500)
            : 0;
          const adjPos = Math.min(position + halfRtt + settings.syncDelay, MAX_POSITION_MS);
          await Player.seek(adjPos);
          resetSeekBaseline(adjPos);
        } catch (e) { console.error("[Sync] seek:", e); }
      });

      let changeSeq = 0;
      socket.on("change_track", async ({ uri, position, contextUri } = {}) => {
        if (!isConnected || !isSpotifyUri(uri)) return;
        addToHistory(Player.data?.item);
        mySkipVoted = false;
        updateSkipVoteUI(0, 1, false);
        if (position != null && !isSafeNum(position, 0, MAX_POSITION_MS)) return;
        const safePos = position ?? 0;
        const seq = ++changeSeq;
        suppressFor(1200);
        try {
          if (contextUri && isSpotifyUri(contextUri) && contextUri !== uri) {
            await Player.playUri(contextUri, {}, { skipTo: { uri }, seekTo: safePos });
          } else {
            await Player.playUri(uri, {}, { seekTo: safePos });
          }
          if (seq !== changeSeq) return;
          resetSeekBaseline(safePos);
        } catch (e) {
          console.error("[Sync] change_track:", e);
          if (seq !== changeSeq) return;
          try {
            await Player.playUri(uri, {}, { seekTo: safePos });
            if (seq === changeSeq) resetSeekBaseline(safePos);
          } catch (e2) { console.error("[Sync] change_track fallback:", e2); }
        }
      });

      let syncSeq = 0;
      socket.on("sync_state", async ({ uri, position, isPlaying, contextUri, sentAt } = {}) => {
        if (role !== "guest" || !isSpotifyUri(uri) || !isSafeNum(position, 0, MAX_POSITION_MS)) return;
        const seq = ++syncSeq;
        suppressFor(1500);
        try {
          const latency = (sentAt && isSafeNum(sentAt, 0) && isPlaying)
            ? Math.min(Math.max(0, (Date.now() - sentAt) / 2), 1500)
            : 0;
          const adjPos = Math.min(position + latency + settings.syncDelay, MAX_POSITION_MS);
          if (Player.data?.item?.uri !== uri) {
            try {
              if (contextUri && isSpotifyUri(contextUri) && contextUri !== uri) {
                await Player.playUri(contextUri, {}, { skipTo: { uri }, seekTo: adjPos });
              } else {
                await Player.playUri(uri, {}, { seekTo: adjPos });
              }
            } catch (_) {
              try { await Player.playUri(uri, {}, { seekTo: adjPos }); } catch (_) {}
            }
            if (seq !== syncSeq) return;
            resetSeekBaseline(adjPos);
            if (!isPlaying) {
              await new Promise((r) => setTimeout(r, 800));
              if (seq === syncSeq) { suppressFor(600); await Player.pause(); }
            }
          } else {
            await Player.seek(adjPos);
            if (seq !== syncSeq) return;
            resetSeekBaseline(adjPos);
            if (isPlaying) {
              await Player.play();
            } else {
              await Player.pause();
            }
          }
        } catch (e) { console.error("[Sync] sync_state:", e); }
      });

      socket.on("sync_requested", ({ guestId } = {}) => {
        if (role !== "host" || typeof guestId !== "string") return;
        const state = Player.data;
        if (!state?.item?.uri) return;
        socket.emit("sync_state", {
          guestId,
          uri:        state.item.uri,
          position:   state.positionAsOfTimestamp || 0,
          isPlaying:  !state.isPaused,
          contextUri: state.context?.uri ?? null,
          sentAt:     Date.now(),
        });
      });

      socket.on("volume_change", async ({ volume } = {}) => {
        if (!isConnected || role !== "guest" || !settings.volumeSync) return;
        if (!isSafeNum(volume, 0, 1)) return;
        lastVolume = volume;
        try {
          await Spicetify.Platform.PlaybackAPI.setVolume(volume);
        } catch (_) {
          try { Spicetify.Player.setVolume?.(volume); } catch (_) {}
        }
      });

      socket.on("vote_count", ({ count, total, needed } = {}) => {
        if (!isSafeNum(count, 0) || !isSafeNum(needed, 1)) return;
        updateSkipVoteUI(count, needed, mySkipVoted);
      });

      socket.on("skip_threshold_reached", async () => {
        if (role !== "host" || !isConnected) return;
        suppressFor(2000);
        try {
          await Spicetify.Player.next?.();
        } catch (_) {
          try { await Spicetify.Platform.PlayerAPI?.skipToNext?.(); } catch (_) {}
        }
      });

      socket.on("skip_votes_cleared", () => {
        mySkipVoted = false;
        updateSkipVoteUI(0, 1, false);
      });

      socket.on("participants_update", ({ participants: list } = {}) => {
        if (!Array.isArray(list)) return;
        participants = list.filter((p) =>
          typeof p.id === "string" && typeof p.username === "string" &&
          ["host","guest","cohost"].includes(p.role) && isSafeNum(p.connectedAt, 0)
        );
        renderParticipants();
        startParticipantsTimer();
        const sec = document.getElementById("sync-participants-section");
        if (sec && isConnected && !waitingForHost) sec.style.display = "flex";
      });

      socket.on("promoted_to_host", () => {
        role = "host";
        cohostMode = false;
        waitingForHost = false;
        resetSeekBaseline();
        showNotification("You are now the host!", false);
        startSyncCheck();
        setConnectedPanelUI("host");
        updateButtonState();
      });

      socket.on("kicked", () => {
        showNotification("You have been removed from the room.", true);
        disconnect();
        resetPanelUI();
      });

      socket.on("sync_ping", ({ uri, position, isPlaying, sentAt } = {}) => {
        if (role !== "guest" || !isConnected || waitingForHost) return;
        if (!isSpotifyUri(uri) || !isSafeNum(position, 0, MAX_POSITION_MS) || !isSafeNum(sentAt, 0)) return;
        const state = Player.data;
        if (!state?.item?.uri) return;
        const uriMatch = state.item.uri === uri;
        if (!uriMatch) {
          updateSyncIndicator(Infinity, false);
          if (!suppressCount) socket.emit("request_sync");
          return;
        }
        const elapsed     = Math.max(0, Date.now() - sentAt);
        const expectedPos = Math.min(position + (isPlaying ? elapsed : 0), MAX_POSITION_MS);
        const guestPos    = state.positionAsOfTimestamp || 0;
        const drift       = Math.abs(guestPos - expectedPos);
        updateSyncIndicator(drift, true);
        if (drift > 2000 && !suppressCount) socket.emit("request_sync");
      });
    });
  }

  function disconnect() {
    reconnecting   = false;
    cohostMode     = false;
    lastGuestCount = null;
    guestCount     = 0;
    lastRoomInfo   = { hosts: 0, guests: 0 };
    waitingForHost = false;
    lastSyncDrift      = null;
    _lastRoomInfoHtml  = null;
    participants       = [];
    stopParticipantsTimer();
    stopSyncCheck();
    stopSeekPoll();
    unregisterPlayerListeners();
    if (socket) { socket.disconnect(); socket = null; }
    isConnected = false;
    role        = null;
    updateButtonState();
    updateToolbarCode();
    updateToolbarGuestCount(0);
  }

  // --------------------------------------------------------------------------
  // Player listener functions + registration tracking
  // --------------------------------------------------------------------------
  let playerListenersRegistered = false;

  function onSongChange() {
    resetSeekBaseline();
    addToHistory(Player.data?.item);
    if (!isController() || suppressCount > 0 || !socket?.connected) return;
    const state = Player.data;
    if (!state?.item?.uri) return;
    socket.emit("change_track", {
      uri:        state.item.uri,
      position:   state.positionAsOfTimestamp || 0,
      contextUri: state.context?.uri ?? null,
    });
    suppressFor(2000);
  }

  function onPlayPause() {
    if (!isController() || suppressCount > 0 || !socket?.connected) return;
    const state = Player.data;
    if (!state?.item?.uri) return;
    const position = state.positionAsOfTimestamp || 0;
    if (state.isPaused) {
      socket.emit("pause", { position });
    } else {
      socket.emit("play", {
        uri:        state.item.uri,
        position,
        contextUri: state.context?.uri ?? null,
      });
    }
    suppressFor(800);
  }

  function onVolumeChange() {
    if (!isController() || suppressCount > 0 || !socket?.connected || !settings.volumeSync) return;
    const vol = Player.data?.volume ?? null;
    if (vol === null || vol === lastVolume) return;
    lastVolume = vol;
    socket.emit("volume_change", { volume: vol });
  }

  function registerPlayerListeners() {
    if (playerListenersRegistered) return;
    playerListenersRegistered = true;
    Player.addEventListener("songchange", onSongChange);
    Player.addEventListener("onplaypause", onPlayPause);
    Player.addEventListener("onvolumechange", onVolumeChange);
  }

  function unregisterPlayerListeners() {
    if (!playerListenersRegistered) return;
    playerListenersRegistered = false;
    Player.removeEventListener("songchange", onSongChange);
    Player.removeEventListener("onplaypause", onPlayPause);
    Player.removeEventListener("onvolumechange", onVolumeChange);
  }

  // --------------------------------------------------------------------------
  // Seek poll — adaptive timing (50ms playing, 200ms paused)
  //         Detects manual seeks by comparing actual playhead against expected
  //         position (baseline + elapsed). Deviation > 500ms triggers a
  //         150ms-debounced broadcast, absorbing rapid scrubbing into one event.
  // --------------------------------------------------------------------------
  let seekPollTimer    = null;
  let seekPollPos      = null;
  let seekPollTime     = null;
  let seekPollPending  = false;
  let seekPollDebounce = null;

  function resetSeekBaseline(knownPos) {
    seekPollPos     = (knownPos != null) ? knownPos : (Player.data?.positionAsOfTimestamp ?? null);
    seekPollTime    = Date.now();
    seekPollPending = false;
    clearTimeout(seekPollDebounce);
  }

  function startSeekPoll() {
    if (seekPollTimer) return;
    resetSeekBaseline();
    function step() {
      const state = Player.data;
      if (!state?.item?.uri) {
        seekPollTimer = setTimeout(step, 200);
        return;
      }
      const now    = Date.now();
      const pos    = state.positionAsOfTimestamp || 0;
      const paused = state.isPaused;
      const delay  = paused ? 200 : 50;

      if (!isController() || !socket?.connected) {
        seekPollPos  = pos; seekPollTime = now;
        clearTimeout(seekPollDebounce); seekPollPending = false;
        seekPollTimer = setTimeout(step, delay);
        return;
      }
      if (suppressCount > 0) {
        clearTimeout(seekPollDebounce); seekPollPending = false;
        seekPollPos  = pos; seekPollTime = now;
        seekPollTimer = setTimeout(step, delay);
        return;
      }
      if (seekPollPos !== null) {
        const elapsed   = paused ? 0 : now - seekPollTime;
        const expected  = seekPollPos + elapsed;
        const deviation = Math.abs(pos - expected);
        if (deviation > 500) {
          if (!seekPollPending) {
            seekPollPending = true;
            seekPollDebounce = setTimeout(() => {
              seekPollPending = false;
              if (!socket?.connected) return;
              const emitPos  = Player.data?.positionAsOfTimestamp || pos;
              const emitNow  = Date.now();
              seekPollPos  = emitPos;
              seekPollTime = emitNow;
              socket.emit("seek", { position: emitPos, sentAt: emitNow });
              suppressFor(500);
            }, 150);
          }
          seekPollTime  = now;
          seekPollTimer = setTimeout(step, delay);
          return;
        }
        if (seekPollPending) { clearTimeout(seekPollDebounce); seekPollPending = false; }
      }
      seekPollPos   = pos;
      seekPollTime  = now;
      seekPollTimer = setTimeout(step, delay);
    }
    seekPollTimer = setTimeout(step, 50);
  }

  function stopSeekPoll() {
    clearTimeout(seekPollTimer);
    clearTimeout(seekPollDebounce);
    seekPollTimer    = null;
    seekPollDebounce = null;
    seekPollPos      = null;
    seekPollTime     = null;
    seekPollPending  = false;
  }

  // --------------------------------------------------------------------------
  // Sync check — host broadcasts state every 10s; guests measure drift
  // --------------------------------------------------------------------------
  function startSyncCheck() {
    stopSyncCheck();
    syncCheckTimer = setInterval(() => {
      if (!socket?.connected || role !== "host") { stopSyncCheck(); return; }
      const state = Player.data;
      if (!state?.item?.uri) return;
      socket.emit("sync_ping", {
        uri:       state.item.uri,
        position:  state.positionAsOfTimestamp || 0,
        isPlaying: !state.isPaused,
        sentAt:    Date.now(),
      });
    }, 10000);
  }

  function stopSyncCheck() {
    clearInterval(syncCheckTimer);
    syncCheckTimer = null;
  }

  function updateSyncIndicator(drift, uriMatch) {
    lastSyncDrift = isFinite(drift) ? drift : Infinity;
    const el = document.getElementById("sync-indicator");
    if (!el) return;
    let text, color, bg;
    if (!uriMatch) {
      text = "⚠ Wrong track";  color = "#e22134"; bg = "rgba(226,33,52,0.12)";
    } else if (drift < 500) {
      text = "✓ In sync";      color = "#1db954"; bg = "rgba(29,185,84,0.12)";
    } else if (drift < 2000) {
      text = `~ ${Math.round(drift)} ms`;  color = "#f59b00"; bg = "rgba(245,155,0,0.12)";
    } else {
      text = `⚠ ${(drift / 1000).toFixed(1)} s`;  color = "#e22134"; bg = "rgba(226,33,52,0.12)";
    }
    el.textContent = text;
    el.style.color = color;
    el.style.background = bg;
    el.style.display = "block";
  }

  function hideSyncIndicator() {
    const el = document.getElementById("sync-indicator");
    if (el) el.style.display = "none";
  }

  // --------------------------------------------------------------------------
  // Session history
  // --------------------------------------------------------------------------
  function addToHistory(item) {
    if (!item?.uri || !item.name) return;
    if (sessionHistory.length && sessionHistory[0].uri === item.uri) return;
    sessionHistory.unshift({
      name:   item.name,
      artist: item.artists?.[0]?.name || item.artist_name || "",
      uri:    item.uri,
    });
    if (sessionHistory.length > 10) sessionHistory.pop();
    updateHistoryUI();
  }

  function updateHistoryUI() {
    const el = document.getElementById("sync-history-list");
    if (!el) return;
    if (!sessionHistory.length) { el.innerHTML = ""; return; }
    el.innerHTML = sessionHistory.slice(0, 5).map((tr) =>
      `<div style="font-size:11px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--spice-subtext,#a7a7a7)">` +
      `<span style="color:var(--spice-text,#fff)">${escHtml(tr.name)}</span>` +
      (tr.artist ? ` · ${escHtml(tr.artist)}` : "") +
      `</div>`
    ).join("");
  }

  function updateSkipVoteUI(count, needed, voted) {
    const btn = document.getElementById("sync-skip-btn");
    const lbl = document.getElementById("sync-skip-count");
    if (btn) { btn.disabled = !!voted; btn.style.opacity = voted ? "0.5" : "1"; }
    if (lbl) lbl.textContent = count > 0 ? `${count}/${needed}` : "";
  }

  // --------------------------------------------------------------------------
  // Participants list
  // --------------------------------------------------------------------------
  function formatDuration(ms) {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const h = Math.floor(m / 60);
    if (h > 0) return `${h}h${String(m % 60).padStart(2, "0")}m`;
    return `${m}m${String(s % 60).padStart(2, "0")}s`;
  }

  function updateParticipantDurations() {
    const now = Date.now();
    document.querySelectorAll(".sync-dur[data-at]").forEach((el) => {
      const at = parseInt(el.dataset.at, 10);
      if (!isNaN(at)) el.textContent = formatDuration(now - at);
    });
  }

  function renderParticipants() {
    const el = document.getElementById("sync-participants-list");
    if (!el) return;
    if (!participants.length) { el.innerHTML = ""; return; }
    el.innerHTML = participants.map((p) => {
      const roleLabel = p.role === "host" ? "Host" : p.role === "cohost" ? "Co-host" : "Guest";
      const isMe      = p.id === socket?.id;
      const canAct    = role === "host" && !isMe && p.role !== "host";
      return `<div class="sync-p-row" data-id="${escHtml(p.id)}"
        style="display:flex;align-items:center;justify-content:space-between;
               padding:4px 6px;border-radius:5px;
               background:${isMe ? "rgba(29,185,84,0.08)" : "transparent"};
               cursor:${canAct ? "pointer" : "default"};transition:background 0.1s">
        <span style="font-size:11px;color:var(--spice-text,#fff);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:120px">
          ${escHtml(p.username)}${isMe ? " ✦" : ""}
        </span>
        <span style="font-size:10px;color:var(--spice-subtext,#a7a7a7);white-space:nowrap;flex-shrink:0;margin-left:4px">
          ${roleLabel} · <span class="sync-dur" data-at="${p.connectedAt}"></span>
        </span>
      </div>`;
    }).join("");
    updateParticipantDurations();
    el.querySelectorAll(".sync-p-row").forEach((row) => {
      const canAct = role === "host" && row.dataset.id !== socket?.id;
      if (!canAct) return;
      const p = participants.find((x) => x.id === row.dataset.id);
      if (!p || p.role === "host") return;
      row.addEventListener("mouseenter", () => { if (!document.getElementById("sync-context-menu")) row.style.background = "rgba(255,255,255,0.06)"; });
      row.addEventListener("mouseleave", () => { if (!document.getElementById("sync-context-menu")) row.style.background = "transparent"; });
      row.addEventListener("click", (e) => { e.stopPropagation(); showContextMenu(row.dataset.id, e.clientX, e.clientY); });
    });
  }

  function startParticipantsTimer() {
    stopParticipantsTimer();
    participantsTimer = setInterval(updateParticipantDurations, 1000);
  }

  function stopParticipantsTimer() {
    clearInterval(participantsTimer);
    participantsTimer = null;
  }

  function showContextMenu(targetId, x, y) {
    closeContextMenu();
    const menu = document.createElement("div");
    menu.id = "sync-context-menu";
    // Clamp to viewport
    const vw = window.innerWidth, vh = window.innerHeight;
    const ml = Math.min(x, vw - 170), mt = Math.min(y, vh - 90);
    menu.style.cssText = `position:fixed;left:${ml}px;top:${mt}px;z-index:99999;` +
      `background:var(--spice-card,#282828);border:1px solid rgba(255,255,255,0.1);` +
      `border-radius:8px;padding:4px;box-shadow:0 4px 16px rgba(0,0,0,0.5);min-width:160px`;
    const mkBtn = (label, color, cb) => {
      const b = document.createElement("button");
      b.textContent = label;
      b.style.cssText = `display:block;width:100%;padding:7px 10px;background:none;border:none;` +
        `color:${color};font-size:12px;text-align:left;cursor:pointer;border-radius:5px;font-family:inherit`;
      b.addEventListener("mouseenter", () => b.style.background = "rgba(255,255,255,0.08)");
      b.addEventListener("mouseleave", () => b.style.background = "none");
      b.addEventListener("click", () => { closeContextMenu(); cb(); });
      return b;
    };
    menu.appendChild(mkBtn("Promote to host", "var(--spice-text,#fff)", () => {
      if (socket?.connected) socket.emit("promote_guest", { targetId });
    }));
    menu.appendChild(mkBtn("Kick", "#e22134", () => {
      if (socket?.connected) socket.emit("kick_participant", { targetId });
    }));
    document.body.appendChild(menu);
    setTimeout(() => document.addEventListener("click", closeContextMenu, { once: true }), 0);
  }

  function closeContextMenu() {
    const m = document.getElementById("sync-context-menu");
    if (m) m.remove();
  }

  function showTransferPopup() {
    const guests = participants.filter((p) => p.role !== "host");
    if (!guests.length) { disconnect(); resetPanelUI(); return; }
    const overlay = document.createElement("div");
    overlay.id = "sync-transfer-popup";
    overlay.style.cssText = "position:fixed;inset:0;z-index:99998;background:rgba(0,0,0,0.55);display:flex;align-items:center;justify-content:center";
    const box = document.createElement("div");
    box.style.cssText = "background:var(--spice-card,#282828);border-radius:12px;padding:16px;width:240px;border:1px solid rgba(255,255,255,0.1);box-shadow:0 8px 32px rgba(0,0,0,0.6)";
    const title = document.createElement("div");
    title.textContent = "Transfer host before leaving?";
    title.style.cssText = "font-size:13px;font-weight:700;margin-bottom:12px;color:var(--spice-text,#fff)";
    const list = document.createElement("div");
    list.style.cssText = "display:flex;flex-direction:column;gap:4px;margin-bottom:14px;max-height:130px;overflow-y:auto";
    const btns = document.createElement("div");
    btns.style.cssText = "display:flex;gap:6px";
    const transferBtn = document.createElement("button");
    transferBtn.textContent = "Transfer & Leave";
    transferBtn.disabled = true;
    transferBtn.style.cssText = "flex:1;padding:8px;background:var(--spice-button,#1db954);border:none;border-radius:50px;color:var(--spice-button-text,#000);font-weight:700;cursor:pointer;font-size:11px;font-family:inherit;opacity:0.4;transition:opacity 0.15s";
    const leaveBtn = document.createElement("button");
    leaveBtn.textContent = "Leave";
    leaveBtn.style.cssText = "flex:1;padding:8px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:50px;color:var(--spice-text,#fff);font-weight:700;cursor:pointer;font-size:11px;font-family:inherit";
    btns.appendChild(transferBtn); btns.appendChild(leaveBtn);
    box.appendChild(title); box.appendChild(list); box.appendChild(btns);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
    let selectedId = null;
    guests.forEach((p) => {
      const row = document.createElement("div");
      row.style.cssText = "padding:5px 8px;border-radius:6px;cursor:pointer;font-size:11px;color:var(--spice-text,#fff);border:1px solid transparent;transition:all 0.1s";
      row.textContent = p.username;
      row.addEventListener("mouseenter", () => { if (selectedId !== p.id) row.style.background = "rgba(255,255,255,0.06)"; });
      row.addEventListener("mouseleave", () => { if (selectedId !== p.id) row.style.background = "none"; });
      row.addEventListener("click", () => {
        list.querySelectorAll("div").forEach((r) => { r.style.borderColor = "transparent"; r.style.background = "none"; });
        row.style.borderColor = "var(--spice-button,#1db954)";
        row.style.background = "rgba(29,185,84,0.1)";
        selectedId = p.id;
        transferBtn.disabled = false;
        transferBtn.style.opacity = "1";
      });
      list.appendChild(row);
    });
    transferBtn.addEventListener("click", () => {
      if (!selectedId || !socket?.connected) return;
      socket.emit("promote_guest", { targetId: selectedId });
      overlay.remove();
      setTimeout(() => { disconnect(); resetPanelUI(); }, 150);
    });
    leaveBtn.addEventListener("click", () => { overlay.remove(); disconnect(); resetPanelUI(); });
    overlay.addEventListener("click", (e) => { if (e.target === overlay) overlay.remove(); });
  }

  // --------------------------------------------------------------------------
  // Panel UI helpers
  // --------------------------------------------------------------------------
  function getPanel() { return document.getElementById("sync-panel"); }
  function qs(parent, sel) { return parent.querySelector(sel); }

  function resetPanelUI() {
    const p = getPanel(); if (!p) return;
    qs(p, "#sync-inputs-section").style.display    = "flex";
    qs(p, "#sync-connect-btns").style.display      = "flex";
    qs(p, "#sync-status-section").style.display    = "none";
    qs(p, "#sync-room-info").style.display         = "none";
    qs(p, "#sync-host-code-section").style.display = "none";
    qs(p, "#sync-cohost-row").style.display        = "none";
    const disc = qs(p, "#sync-disconnect-btn");
    disc.style.display = "none";
    disc.textContent   = t("disconnect");
    const indR = qs(p, "#sync-indicator");
    if (indR) indR.style.display = "none";
    ["#sync-participants-section","#sync-history-section","#sync-skip-row"].forEach(sel => {
      const el = qs(p, sel); if (el) el.style.display = "none";
    });
    mySkipVoted = false;
  }

  function setConnectedPanelUI(r) {
    const p = getPanel(); if (!p) return;
    qs(p, "#sync-inputs-section").style.display  = "none";
    qs(p, "#sync-connect-btns").style.display    = "none";
    const disc = qs(p, "#sync-disconnect-btn");
    disc.style.display = "block";
    disc.textContent   = t("disconnect");
    qs(p, "#sync-status-section").style.display  = "flex";
    const st = qs(p, "#sync-status-text");
    st.textContent = r === "host" ? t("statusHost") : t("statusGuest");
    st.style.color = r === "host" ? "var(--spice-button, #1db954)" : "#1e90ff";
    qs(p, "#sync-cohost-row").style.display        = r === "host" ? "flex" : "none";
    qs(p, "#sync-guest-cohost-note").style.display = "none";
    const ind = qs(p, "#sync-indicator");
    if (ind) ind.style.display = r === "host" ? "none" : (lastSyncDrift !== null ? "block" : "none");
    const psec = qs(p, "#sync-participants-section");
    if (psec) { psec.style.display = participants.length ? "flex" : "none"; renderParticipants(); }
    const hist = qs(p, "#sync-history-section");
    if (hist) { hist.style.display = "flex"; updateHistoryUI(); }
    const skipRow = qs(p, "#sync-skip-row");
    if (skipRow) skipRow.style.display = r === "guest" && !cohostMode ? "flex" : "none";
    const hcs = qs(p, "#sync-host-code-section");
    if (r === "host" && roomCode) {
      const codeEl = qs(p, "#sync-host-room-code");
      if (codeEl) codeEl.textContent = roomCode;
      hcs.style.display = "block";
    } else {
      hcs.style.display = "none";
    }
  }

  function setReconnectingPanelUI(attempt) {
    const p = getPanel(); if (!p) return;
    qs(p, "#sync-inputs-section").style.display    = "none";
    qs(p, "#sync-connect-btns").style.display      = "none";
    const disc = qs(p, "#sync-disconnect-btn");
    disc.style.display = "block";
    disc.textContent   = t("cancel");
    qs(p, "#sync-status-section").style.display    = "flex";
    const st = qs(p, "#sync-status-text");
    st.textContent = attempt > 1 ? t("statusReconN", attempt) : t("statusRecon");
    st.style.color = "#f59b00";
    qs(p, "#sync-cohost-row").style.display        = "none";
    qs(p, "#sync-guest-cohost-note").style.display = "none";
    qs(p, "#sync-room-info").style.display         = "none";
    qs(p, "#sync-host-code-section").style.display = "none";
    ["#sync-participants-section","#sync-history-section","#sync-skip-row","#sync-indicator"].forEach(sel => {
      const el = qs(p, sel); if (el) el.style.display = "none";
    });
  }

  function setWaitingPanelUI() {
    const p = getPanel(); if (!p) return;
    qs(p, "#sync-inputs-section").style.display    = "none";
    qs(p, "#sync-connect-btns").style.display      = "none";
    const disc = qs(p, "#sync-disconnect-btn");
    disc.style.display = "block";
    disc.textContent   = t("disconnect");
    qs(p, "#sync-status-section").style.display    = "flex";
    const st = qs(p, "#sync-status-text");
    st.textContent = t("statusWaiting");
    st.style.color = "#f59b00";
    qs(p, "#sync-cohost-row").style.display        = "none";
    qs(p, "#sync-guest-cohost-note").style.display = "none";
    qs(p, "#sync-room-info").style.display         = "none";
    const ind = qs(p, "#sync-indicator");
    if (ind) ind.style.display = "none";
    ["#sync-participants-section","#sync-history-section","#sync-skip-row"].forEach(sel => {
      const el = qs(p, sel); if (el) el.style.display = "none";
    });
  }

  function updateRoomInfo(hosts, guests) {
    const p = getPanel(); if (!p) return;
    const ri = qs(p, "#sync-room-info");
    if (!isConnected || waitingForHost) { ri.style.display = "none"; return; }
    ri.style.display = "flex";
    const h = escHtml(hosts);
    const g = escHtml(guests);
    const newHtml =
      `<span style="color:var(--spice-button,#1db954)">${h} host${hosts !== 1 ? "s" : ""}</span>` +
      `<span style="color:rgba(255,255,255,0.2);margin:0 6px">·</span>` +
      `<span style="color:#1e90ff">${g} guest${guests !== 1 ? "s" : ""}</span>` +
      (cohostMode
        ? `<span style="color:rgba(255,255,255,0.2);margin:0 6px">·</span>` +
          `<span style="color:var(--spice-button,#1db954);font-weight:700">co-host on</span>`
        : "");
    if (newHtml !== _lastRoomInfoHtml) { _lastRoomInfoHtml = newHtml; ri.innerHTML = newHtml; }
  }

  function updateCohostSection() {
    const p = getPanel(); if (!p) return;
    const toggle = qs(p, "#sync-cohost-toggle");
    if (toggle) toggle.checked = cohostMode;
    if (role === "guest") {
      const note = qs(p, "#sync-guest-cohost-note");
      if (note) note.style.display = (cohostMode && !waitingForHost) ? "block" : "none";
      const st = qs(p, "#sync-status-text");
      if (st && isConnected && !waitingForHost) {
        st.textContent = cohostMode ? t("statusCohost") : t("statusGuest");
        st.style.color = cohostMode ? "var(--spice-button,#1db954)" : "#1e90ff";
      }
      const skipRow = qs(p, "#sync-skip-row");
      if (skipRow) skipRow.style.display = (isConnected && !waitingForHost && !cohostMode) ? "flex" : "none";
    }
    updateRoomInfo(lastRoomInfo.hosts, lastRoomInfo.guests);
  }

  // --------------------------------------------------------------------------
  // Notifications, toolbar elements, button state
  // --------------------------------------------------------------------------
  function showNotification(message, isError = false) {
    Spicetify.showNotification(message, isError);
  }

  function updateToolbarCode() {
    const el = document.getElementById("sync-toolbar-code");
    if (!el) return;
    if (settings.showCode && isConnected && roomCode) {
      el.textContent = roomCode;
      el.style.display = "block";
    } else {
      el.style.display = "none";
    }
  }

  function updateToolbarGuestCount(n) {
    const el = document.getElementById("sync-toolbar-guests");
    if (!el) return;
    if (isConnected && n > 0) {
      el.textContent = String(n);
      el.style.display = "block";
    } else {
      el.style.display = "none";
    }
  }

  function updateButtonState() {
    const btn = document.getElementById("sync-toggle-btn");
    if (!btn) return;
    const svgEl = btn.querySelector("svg");
    const color = "var(--spice-button, #1db954)";
    let label;
    if (isConnected && role === "host") {
      label = cohostMode ? "Sync: hosting (co-host on)" : "Sync: hosting";
    } else if (isConnected && role === "guest" && waitingForHost) {
      label = "Sync: waiting for host";
    } else if (isConnected && role === "guest") {
      label = cohostMode ? "Sync: co-host mode" : "Sync: listening";
    } else if (reconnecting) {
      label = "Sync: reconnecting";
    } else {
      label = t("appName");
    }
    if (label === _lastButtonLabel) { updateToolbarCode(); updateToolbarGuestCount(guestCount); return; }
    _lastButtonLabel = label;
    btn.style.color = color;
    if (svgEl) {
      svgEl.style.fill   = color;
      svgEl.style.stroke = color;
      svgEl.style.color  = color;
    }
    btn.setAttribute("aria-label", label);
    btn.setAttribute("data-tooltip", label);
    updateToolbarCode();
    updateToolbarGuestCount(guestCount);
  }

  // --------------------------------------------------------------------------
  // CSS injection
  // --------------------------------------------------------------------------
  function injectStyles() {
    if (document.getElementById("sync-styles")) return;
    const s = document.createElement("style");
    s.id = "sync-styles";
    s.textContent = `
      @keyframes syncPopIn {
        from { opacity: 0; transform: translateY(6px) scale(0.98); }
        to   { opacity: 1; transform: translateY(0)   scale(1);    }
      }
      @keyframes syncPopOut {
        from { opacity: 1; transform: translateY(0)   scale(1);    }
        to   { opacity: 0; transform: translateY(6px) scale(0.98); }
      }
      #sync-panel { animation: syncPopIn 0.18s cubic-bezier(0.4,0,0.2,1) forwards; }

      #sync-toggle-btn { cursor: default !important; }
      #sync-toggle-btn:hover { cursor: default !important; }
      #sync-toggle-btn::before, #sync-toggle-btn::after { content: none !important; display: none !important; }

      #sync-toolbar-code {
        display: none;
        position: absolute;
        bottom: -6px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 11px;
        font-weight: 800;
        font-family: monospace;
        letter-spacing: 0.08em;
        color: inherit;
        white-space: nowrap;
        line-height: 1;
        pointer-events: none;
        margin-top: 5px;
      }

      #sync-toolbar-guests {
        display: none;
        position: absolute;
        bottom: 1px;
        right: 2px;
        font-size: 8px;
        font-weight: 800;
        font-family: monospace;
        color: inherit;
        line-height: 1;
        pointer-events: none;
      }

      .sync-btn-tooltip {
        position: absolute;
        bottom: calc(100% + 6px);
        left: 50%;
        transform: translateX(-50%);
        background: #000;
        color: inherit;
        font-size: 13px;
        font-weight: 400;
        font-family: inherit;
        padding: 4px 8px;
        border-radius: 4px;
        white-space: nowrap;
        pointer-events: none;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.1s;
        box-shadow: 0 1px 4px rgba(0,0,0,0.25);
      }
      .sync-btn-tooltip--visible { opacity: 1; }

      .sync-toggle {
        position: relative; display: inline-block;
        width: 42px; height: 24px; flex-shrink: 0; cursor: pointer;
      }
      .sync-toggle input { opacity: 0; width: 0; height: 0; position: absolute; }
      .sync-toggle-track {
        position: absolute; inset: 0;
        background: rgba(255,255,255,0.18);
        border-radius: 24px;
        transition: background 0.2s;
        pointer-events: none;
      }
      .sync-toggle-track::before {
        content: '';
        position: absolute; height: 18px; width: 18px;
        left: 3px; top: 3px;
        background: white; border-radius: 50%;
        transition: transform 0.2s;
        box-shadow: 0 1px 4px rgba(0,0,0,0.4);
      }
      .sync-toggle input:checked + .sync-toggle-track { background: var(--spice-button, #1db954); }
      .sync-toggle input:checked + .sync-toggle-track::before { transform: translateX(18px); }

      .sync-select {
        width: 100%;
        padding: 8px 10px;
        background: var(--spice-main, rgba(0,0,0,0.25));
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 6px;
        color: var(--spice-text, #fff);
        font-size: 12px;
        font-family: inherit;
        outline: none;
        cursor: pointer;
        -webkit-appearance: none;
        appearance: none;
      }
      .sync-select:focus { border-color: rgba(255,255,255,0.25); }

      .sync-slider {
        width: 100%;
        -webkit-appearance: none;
        appearance: none;
        height: 4px;
        border-radius: 2px;
        background: rgba(255,255,255,0.18);
        outline: none;
        cursor: pointer;
      }
      .sync-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 14px; height: 14px;
        border-radius: 50%;
        background: var(--spice-button, #1db954);
        cursor: pointer;
      }
      .sync-slider::-moz-range-thumb {
        width: 14px; height: 14px;
        border-radius: 50%;
        background: var(--spice-button, #1db954);
        cursor: pointer;
        border: none;
      }
    `;
    document.head.appendChild(s);
  }

  // --------------------------------------------------------------------------
  // Panel
  // --------------------------------------------------------------------------
  function closePanel() {
    const p = getPanel(); if (!p) return;
    stopAdminRefresh();
    p.style.animation = "syncPopOut 0.16s cubic-bezier(0.4,0,0.2,1) forwards";
    p.addEventListener("animationend", () => p.remove(), { once: true });
  }

  function buildPanel() {
    injectStyles();
    const panel = document.createElement("div");
    panel.id = "sync-panel";
    panel.style.cssText = [
      "position:fixed", "bottom:96px", "right:16px", "width:272px",
      "z-index:9999",
      "background:var(--spice-card,#282828)",
      "border-radius:12px",
      "border:1px solid rgba(255,255,255,0.08)",
      "box-shadow:0 8px 32px rgba(0,0,0,0.6),0 2px 8px rgba(0,0,0,0.25)",
      "display:flex", "flex-direction:column", "overflow:hidden",
      "font-family:var(--font-family,CircularSp,-apple-system,sans-serif)",
      "color:var(--spice-text,#ffffff)", "font-size:13px",
    ].join(";");

    const INP = [
      "width:100%", "box-sizing:border-box", "padding:8px 10px",
      "background:var(--spice-main,rgba(0,0,0,0.25))",
      "border:1px solid rgba(255,255,255,0.08)", "border-radius:6px",
      "color:var(--spice-text,#fff)", "font-size:12px",
      "outline:none", "font-family:inherit", "transition:border-color 0.15s",
    ].join(";");

    const LBL = [
      "font-size:10px", "font-weight:700", "letter-spacing:0.08em",
      "text-transform:uppercase", "color:var(--spice-subtext,#a7a7a7)",
      "margin-bottom:5px", "display:block",
    ].join(";");

    const BTN_PRI = [
      "flex:1", "padding:9px",
      "background:var(--spice-button,#1db954)", "border:none",
      "border-radius:50px", "color:var(--spice-button-text,#000)",
      "font-weight:700", "cursor:pointer", "font-size:12px",
      "letter-spacing:0.02em", "font-family:inherit",
      "transition:opacity 0.15s,transform 0.1s",
    ].join(";");

    const BTN_GHO = [
      "flex:1", "padding:9px", "background:transparent",
      "border:1px solid rgba(255,255,255,0.35)", "border-radius:50px",
      "color:var(--spice-text,#fff)", "font-weight:700", "cursor:pointer",
      "font-size:12px", "letter-spacing:0.02em", "font-family:inherit",
      "transition:opacity 0.15s,transform 0.1s",
    ].join(";");

    const ICON_BTN =
      "background:none;border:none;cursor:pointer;" +
      "color:var(--spice-subtext,#a7a7a7);" +
      "display:flex;align-items:center;justify-content:center;" +
      "width:24px;height:24px;border-radius:50%;padding:0;transition:background 0.15s";

    const SROW =
      "display:flex;align-items:center;justify-content:space-between;" +
      "padding:10px 12px;background:rgba(255,255,255,0.04);" +
      "border-radius:8px;border:1px solid rgba(255,255,255,0.06)";

    const SDESC = "font-size:10px;color:var(--spice-subtext,#a7a7a7);line-height:1.4";

    panel.innerHTML = `
<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 14px 10px;border-bottom:1px solid rgba(255,255,255,0.06);flex-shrink:0">
  <div style="display:flex;align-items:center;gap:8px">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--spice-button,#1db954)">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
    </svg>
    <span style="font-size:13px;font-weight:700;letter-spacing:-0.01em">${t("appName")}</span>
  </div>
  <div style="display:flex;gap:2px;align-items:center">
    <button id="sync-settings-btn" style="${ICON_BTN}" title="${t("settingsTitle")}">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
    </button>
    <button id="sync-panel-close" style="${ICON_BTN}">
      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <line x1="1" y1="1" x2="11" y2="11"/><line x1="11" y1="1" x2="1" y2="11"/>
      </svg>
    </button>
  </div>
</div>

<div id="sync-main-content" style="padding:14px;display:flex;flex-direction:column;gap:12px">
  <div id="sync-inputs-section" style="display:flex;flex-direction:column;gap:10px">
    <div>
      <span style="${LBL}">${t("server")}</span>
      <div style="display:flex;gap:6px;align-items:center">
        <input id="sync-ip" type="text" style="${INP};flex:1;color:var(--spice-subtext,#a7a7a7);cursor:default" readonly/>
        <button id="sync-ip-edit" style="padding:4px 10px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:6px;color:var(--spice-subtext,#a7a7a7);font-size:10px;font-weight:700;cursor:pointer;font-family:inherit;flex-shrink:0;transition:opacity 0.15s;white-space:nowrap">Edit</button>
      </div>
    </div>
    <div>
      <span style="${LBL}">${t("username")}</span>
      <input id="sync-username" type="text" placeholder="${t("usernamePh")}" style="${INP}" maxlength="32"/>
    </div>
    <div>
      <span style="${LBL}">${t("roomCode")}</span>
      <input id="sync-room-code" type="text" placeholder="${t("roomCodePh")}" style="${INP}" maxlength="6"/>
    </div>
  </div>
  <div id="sync-connect-btns" style="display:flex;gap:6px">
    <button id="sync-host-btn" style="${BTN_PRI}">${t("host")}</button>
    <button id="sync-guest-btn" style="${BTN_GHO}">${t("guest")}</button>
  </div>
  <div id="sync-status-section" style="display:none;flex-direction:column;gap:10px">
    <div id="sync-status-text" style="font-size:13px;font-weight:600;color:var(--spice-button,#1db954)">…</div>
    <div id="sync-indicator" style="display:none;font-size:11px;font-weight:700;padding:3px 10px;border-radius:50px;text-align:center;letter-spacing:0.01em;color:#1db954;background:rgba(29,185,84,0.12)"></div>
    <div id="sync-host-code-section" style="display:none;padding:10px 12px;background:rgba(29,185,84,0.07);border:1px solid rgba(29,185,84,0.2);border-radius:8px;text-align:center">
      <div style="font-size:10px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--spice-subtext,#a7a7a7);margin-bottom:8px">${t("yourCode")}</div>
      <div id="sync-host-room-code" style="font-size:26px;font-weight:900;letter-spacing:0.25em;color:var(--spice-button,#1db954);font-family:monospace">______</div>
      <button id="sync-copy-code-btn" style="margin-top:8px;padding:4px 14px;background:transparent;border:1px solid rgba(29,185,84,0.4);border-radius:50px;color:var(--spice-button,#1db954);font-size:11px;font-weight:700;cursor:pointer;font-family:inherit;transition:background 0.15s">${t("copyCode")}</button>
    </div>
    <div id="sync-guest-cohost-note" style="display:none;padding:8px 10px;background:rgba(29,185,84,0.09);border:1px solid rgba(29,185,84,0.18);border-radius:7px;font-size:11px;color:var(--spice-button,#1db954);line-height:1.4">
      ${t("cohostNote")}
    </div>
  </div>
  <div id="sync-room-info" style="display:none;align-items:center;justify-content:center;flex-wrap:wrap;gap:4px;font-size:11px;color:var(--spice-subtext,#a7a7a7)"></div>

  <div id="sync-participants-section" style="display:none;flex-direction:column;gap:6px">
    <div style="font-size:9px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:var(--spice-subtext,#a7a7a7)">Participants</div>
    <div id="sync-participants-list" style="display:flex;flex-direction:column;gap:2px"></div>
  </div>

  <div id="sync-history-section" style="display:none;flex-direction:column;gap:4px">
    <div style="font-size:9px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:var(--spice-subtext,#a7a7a7)">Played this session</div>
    <div id="sync-history-list" style="display:flex;flex-direction:column;gap:3px"></div>
  </div>

  <div id="sync-skip-row" style="display:none;align-items:center;gap:8px">
    <button id="sync-skip-btn" style="flex:1;padding:7px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:50px;color:var(--spice-text,#fff);font-size:11px;font-weight:700;cursor:pointer;font-family:inherit;transition:opacity 0.15s">🗳 Vote to skip</button>
    <span id="sync-skip-count" style="font-size:11px;color:var(--spice-subtext,#a7a7a7);min-width:30px;text-align:right"></span>
  </div>

  <div id="sync-cohost-row" style="display:none;${SROW}">
    <div style="flex:1;min-width:0;margin-right:10px">
      <div style="font-size:12px;font-weight:600;margin-bottom:2px">${t("cohostLabel")}</div>
      <div style="${SDESC}">${t("cohostDesc")}</div>
    </div>
    <label class="sync-toggle">
      <input type="checkbox" id="sync-cohost-toggle">
      <span class="sync-toggle-track"></span>
    </label>
  </div>
  <button id="sync-disconnect-btn" style="display:none;width:100%;padding:9px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:50px;color:var(--spice-text,#fff);font-weight:700;cursor:pointer;font-size:12px;letter-spacing:0.02em;font-family:inherit;transition:opacity 0.15s">${t("disconnect")}</button>
</div>

<div id="sync-settings-content" style="display:none;padding:14px;flex-direction:column;gap:14px">
  <button id="sync-settings-back" style="width:100%;padding:9px 12px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:8px;color:var(--spice-text,#fff);font-weight:600;cursor:pointer;font-size:12px;font-family:inherit;text-align:left;transition:opacity 0.15s">${t("back")}</button>

  <div style="font-size:9px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:var(--spice-subtext,#a7a7a7)">${t("sectionGeneral")}</div>

  <div>
    <span style="${LBL}">${t("language")}</span>
    <select id="sync-s-lang" class="sync-select">
      <option value="auto">${t("langAuto")}</option>
      <option value="fr">${t("langFr")}</option>
      <option value="en">${t("langEn")}</option>
    </select>
  </div>

  <div style="${SROW}">
    <div style="flex:1;min-width:0;margin-right:10px">
      <div style="font-size:12px;font-weight:600;margin-bottom:2px">${t("autoConnect")}</div>
      <div style="${SDESC}">${t("autoConnectDesc")}</div>
    </div>
    <label class="sync-toggle"><input type="checkbox" id="sync-s-autoconnect"><span class="sync-toggle-track"></span></label>
  </div>

  <div style="${SROW}">
    <div style="flex:1;min-width:0;margin-right:10px">
      <div style="font-size:12px;font-weight:600;margin-bottom:2px">${t("soundNotif")}</div>
      <div style="${SDESC}">${t("soundNotifDesc")}</div>
    </div>
    <label class="sync-toggle"><input type="checkbox" id="sync-s-soundnotif"><span class="sync-toggle-track"></span></label>
  </div>

  <div style="font-size:9px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:var(--spice-subtext,#a7a7a7);margin-top:4px">${t("sectionSession")}</div>

  <div style="${SROW}">
    <div style="flex:1;min-width:0;margin-right:10px">
      <div style="font-size:12px;font-weight:600;margin-bottom:2px">${t("showCode")}</div>
      <div style="${SDESC}">${t("showCodeDesc")}</div>
    </div>
    <label class="sync-toggle"><input type="checkbox" id="sync-s-showcode"><span class="sync-toggle-track"></span></label>
  </div>

  <div style="${SROW}">
    <div style="flex:1;min-width:0;margin-right:10px">
      <div style="font-size:12px;font-weight:600;margin-bottom:2px">${t("volumeSync")}</div>
      <div style="${SDESC}">${t("volumeSyncDesc")}</div>
    </div>
    <label class="sync-toggle"><input type="checkbox" id="sync-s-volumesync"><span class="sync-toggle-track"></span></label>
  </div>

  <div>
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:2px">
      <span style="${LBL};margin-bottom:0">${t("syncDelay")}</span>
      <span id="sync-s-delay-val" style="font-size:11px;font-weight:600;color:var(--spice-button,#1db954)">${settings.syncDelay} ms</span>
    </div>
    <div style="${SDESC};margin-bottom:6px">${t("syncDelayDesc")}</div>
    <input type="range" id="sync-s-delay" class="sync-slider" min="0" max="500" step="10" value="${settings.syncDelay}"/>
  </div>
</div>

<div id="sync-admin-content" style="display:none;padding:14px;flex-direction:column;gap:12px">
  <button id="sync-admin-back" style="width:100%;padding:9px 12px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:8px;color:var(--spice-text,#fff);font-weight:600;cursor:pointer;font-size:12px;font-family:inherit;text-align:left;transition:opacity 0.15s">${t("back")}</button>

  <div id="sync-admin-auth" style="display:flex;flex-direction:column;gap:8px">
    <span style="${LBL}">Admin token</span>
    <input id="sync-admin-token" type="password" placeholder="Enter admin token" style="${INP}" autocomplete="off"/>
    <button id="sync-admin-auth-btn" style="${BTN_PRI};flex:none;width:100%">Authenticate</button>
  </div>

  <div id="sync-admin-data" style="display:none"></div>
</div>`;

    document.body.appendChild(panel);
    qs(panel, "#sync-cohost-row").style.display = "none";

    qs(panel, "#sync-ip").value        = serverIP;
    qs(panel, "#sync-username").value  = username;
    qs(panel, "#sync-room-code").value = "";

    function addInputFocus(id) {
      const el = qs(panel, `#${id}`);
      el.addEventListener("focus", () => { el.style.borderColor = "rgba(255,255,255,0.25)"; });
      el.addEventListener("blur",  () => { el.style.borderColor = "rgba(255,255,255,0.08)"; });
    }
    addInputFocus("sync-username");
    addInputFocus("sync-room-code");

    const ipInput = qs(panel, "#sync-ip");
    const ipEditBtn = qs(panel, "#sync-ip-edit");
    ipEditBtn.addEventListener("mouseover", () => { ipEditBtn.style.opacity = "0.7"; });
    ipEditBtn.addEventListener("mouseout",  () => { ipEditBtn.style.opacity = "1"; });
    ipEditBtn.addEventListener("click", () => {
      ipInput.removeAttribute("readonly");
      ipInput.style.color  = "var(--spice-text,#fff)";
      ipInput.style.cursor = "";
      ipInput.addEventListener("focus", () => { ipInput.style.borderColor = "rgba(255,255,255,0.25)"; });
      ipInput.addEventListener("blur",  () => { ipInput.style.borderColor = "rgba(255,255,255,0.08)"; });
      ipEditBtn.style.display = "none";
      ipInput.focus();
      ipInput.select();
    });

    const roomCodeInput = qs(panel, "#sync-room-code");
    roomCodeInput.addEventListener("input", () => {
      roomCodeInput.value = roomCodeInput.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    });

    function addIconHover(id) {
      const el = qs(panel, `#${id}`);
      el.addEventListener("mouseover", () => { el.style.background = "rgba(255,255,255,0.1)"; });
      el.addEventListener("mouseout",  () => { el.style.background = "none"; });
    }
    addIconHover("sync-settings-btn");
    addIconHover("sync-panel-close");

    function addOpacityHover(id, opacity = ".7") {
      const el = qs(panel, `#${id}`);
      el.addEventListener("mouseover",  () => { el.style.opacity = opacity; });
      el.addEventListener("mouseout",   () => { el.style.opacity = "1"; });
    }
    addOpacityHover("sync-disconnect-btn");
    addOpacityHover("sync-settings-back");

    function addPrimaryBtnEffects(id, hoverOpacity) {
      const el = qs(panel, `#${id}`);
      addOpacityHover(id, hoverOpacity);
      el.addEventListener("mousedown",  () => { el.style.transform = "scale(0.97)"; });
      el.addEventListener("mouseup",    () => { el.style.transform = ""; });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
    }
    addPrimaryBtnEffects("sync-host-btn",  ".85");
    addPrimaryBtnEffects("sync-guest-btn", ".7");

    const copyBtn = qs(panel, "#sync-copy-code-btn");
    copyBtn.addEventListener("mouseover", () => { copyBtn.style.background = "rgba(29,185,84,0.12)"; });
    copyBtn.addEventListener("mouseout",  () => { copyBtn.style.background = "transparent"; });

    function saveInputs(selectedRole) {
      serverIP = qs(panel, "#sync-ip").value.trim() || "spicetify-sync-server.onrender.com";
      username = qs(panel, "#sync-username").value.trim().slice(0, 32) || "User";
      const inputCode = qs(panel, "#sync-room-code").value.trim().toUpperCase();
      roomCode = selectedRole === "guest" ? inputCode : (inputCode || roomCode);
      localStorage.setItem("sync_serverIP", serverIP);
      localStorage.setItem("sync_username", username);
      localStorage.setItem("sync_roomCode", roomCode);
    }

    qs(panel, "#sync-host-btn").addEventListener("click", () => {
      const now = Date.now();
      if (now - lastConnectClick < 1000) return;
      lastConnectClick = now;
      saveInputs("host"); connect("host");
    });
    qs(panel, "#sync-guest-btn").addEventListener("click", () => {
      const now = Date.now();
      if (now - lastConnectClick < 1000) return;
      if (!qs(panel, "#sync-room-code").value.trim()) {
        showNotification(t("roomCodePh"), true);
        return;
      }
      lastConnectClick = now;
      saveInputs("guest"); connect("guest");
    });
    qs(panel, "#sync-disconnect-btn").addEventListener("click", () => {
      if (role === "host" && participants.some((p) => p.role !== "host")) {
        showTransferPopup();
      } else {
        disconnect();
        resetPanelUI();
      }
    });

    const skipBtn = qs(panel, "#sync-skip-btn");
    if (skipBtn) {
      skipBtn.addEventListener("click", () => {
        if (mySkipVoted || !socket?.connected || role !== "guest") return;
        mySkipVoted = true;
        socket.emit("vote_skip");
        updateSkipVoteUI(1, Math.ceil(guestCount / 2) || 1, true);
      });
    }
    copyBtn.addEventListener("click", () => {
      if (!roomCode) return;
      navigator.clipboard.writeText(roomCode).then(() => showNotification(t("codeCopied"))).catch(() => {});
    });
    qs(panel, "#sync-panel-close").addEventListener("click", () => closePanel());

    qs(panel, "#sync-settings-btn").addEventListener("click", () => {
      qs(panel, "#sync-main-content").style.display    = "none";
      qs(panel, "#sync-settings-content").style.display = "flex";
    });
    qs(panel, "#sync-settings-back").addEventListener("click", () => {
      qs(panel, "#sync-settings-content").style.display = "none";
      qs(panel, "#sync-main-content").style.display     = "flex";
    });

    qs(panel, "#sync-admin-back").addEventListener("click", () => {
      stopAdminRefresh();
      qs(panel, "#sync-admin-content").style.display = "none";
      qs(panel, "#sync-main-content").style.display  = "flex";
    });
    qs(panel, "#sync-admin-auth-btn").addEventListener("click", () => {
      const tokenInput = qs(panel, "#sync-admin-token");
      const v = tokenInput.value.trim();
      if (!v) return;
      adminToken = v;
      tokenInput.value = "";
      showAdminAuth(false);
      startAdminRefresh();
    });

    qs(panel, "#sync-cohost-toggle").addEventListener("change", (e) => {
      if (role !== "host" || !socket?.connected) { e.target.checked = cohostMode; return; }
      socket.emit("set_cohost_mode", { enabled: e.target.checked });
    });

    const autoEl = qs(panel, "#sync-s-autoconnect");
    autoEl.checked = settings.autoConnect;
    autoEl.addEventListener("change", (e) => saveSetting("autoConnect", e.target.checked));

    const langEl = qs(panel, "#sync-s-lang");
    langEl.value = settings.lang;
    langEl.addEventListener("change", (e) => {
      saveSetting("lang", e.target.value);
      stopAdminRefresh();
      panel.remove();
      buildPanel();
      const np = getPanel();
      if (np) {
        qs(np, "#sync-main-content").style.display    = "none";
        qs(np, "#sync-settings-content").style.display = "flex";
      }
    });

    const showCodeEl = qs(panel, "#sync-s-showcode");
    showCodeEl.checked = settings.showCode;
    showCodeEl.addEventListener("change", (e) => {
      saveSetting("showCode", e.target.checked);
      updateToolbarCode();
    });

    const volumeSyncEl = qs(panel, "#sync-s-volumesync");
    volumeSyncEl.checked = settings.volumeSync;
    volumeSyncEl.addEventListener("change", (e) => saveSetting("volumeSync", e.target.checked));

    const soundNotifEl = qs(panel, "#sync-s-soundnotif");
    soundNotifEl.checked = settings.soundNotif;
    soundNotifEl.addEventListener("change", (e) => saveSetting("soundNotif", e.target.checked));

    const delaySlider = qs(panel, "#sync-s-delay");
    const delayVal    = qs(panel, "#sync-s-delay-val");
    delaySlider.addEventListener("input", (e) => {
      const v = parseInt(e.target.value, 10);
      delayVal.textContent = `${v} ms`;
      saveSetting("syncDelay", v);
    });

    if (isConnected) {
      if (waitingForHost) {
        setWaitingPanelUI();
      } else {
        setConnectedPanelUI(role);
        updateCohostSection();
        updateRoomInfo(lastRoomInfo.hosts, lastRoomInfo.guests);
        if (role === "guest" && lastSyncDrift !== null) updateSyncIndicator(lastSyncDrift, lastSyncDrift !== Infinity);
        updateHistoryUI();
        updateSkipVoteUI(0, 1, mySkipVoted);
        if (participants.length) { renderParticipants(); startParticipantsTimer(); }
      }
    } else if (reconnecting) {
      setReconnectingPanelUI();
    }
  }

  // --------------------------------------------------------------------------
  // Toolbar button
  // --------------------------------------------------------------------------
  function createToolbarButton() {
    const btn = document.createElement("button");
    btn.id = "sync-toggle-btn";
    btn.setAttribute("aria-label", t("appName"));
    btn.setAttribute("data-tooltip", t("appName"));
    // IMPORTANT: copy classes from native button — do not change this mechanism
    const nativeBtn = document.querySelector(".main-nowPlayingBar-extraControls button");
    if (nativeBtn && nativeBtn.className) {
      btn.className = nativeBtn.className;
    } else {
      btn.style.cssText = "background:none;border:none;padding:4px 8px;border-radius:4px";
    }
    btn.style.cursor         = "default";
    btn.style.display        = "flex";
    btn.style.alignItems     = "center";
    btn.style.justifyContent = "center";
    btn.style.position       = "relative";

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "20");
    svg.setAttribute("height", "20");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "currentColor");
    svg.innerHTML =
      '<circle cx="6" cy="12" r="3"/>' +
      '<circle cx="18" cy="6" r="3"/>' +
      '<circle cx="18" cy="18" r="3"/>' +
      '<line x1="8.83" y1="10.59" x2="15.17" y2="7.41" stroke="currentColor" stroke-width="1.5"/>' +
      '<line x1="8.83" y1="13.41" x2="15.17" y2="16.59" stroke="currentColor" stroke-width="1.5"/>';
    btn.appendChild(svg);

    const codeLabel = document.createElement("span");
    codeLabel.id = "sync-toolbar-code";
    btn.appendChild(codeLabel);

    const guestBadge = document.createElement("span");
    guestBadge.id = "sync-toolbar-guests";
    btn.appendChild(guestBadge);

    const tooltip = document.createElement("div");
    tooltip.className = "sync-btn-tooltip";
    tooltip.textContent = "Spicetify Sync";
    btn.appendChild(tooltip);

    btn.addEventListener("mouseenter", () => tooltip.classList.add("sync-btn-tooltip--visible"));
    btn.addEventListener("mouseleave", () => tooltip.classList.remove("sync-btn-tooltip--visible"));
    btn.addEventListener("click", () => {
      if (getPanel()) { closePanel(); return; }
      buildPanel();
    });

    const bar =
      document.querySelector(".main-nowPlayingBar-extraControls") ||
      document.querySelector("[class*='extraControls']") ||
      document.querySelector(".player-controls__right");

    if (bar) {
      bar.prepend(btn);
    } else {
      btn.style.cssText +=
        ";position:fixed;bottom:20px;right:20px;z-index:9998;" +
        "background:var(--spice-sidebar,#1a1a1a);border-radius:50%;width:36px;height:36px";
      document.body.appendChild(btn);
    }

    maybeRevealAdminButton();
    updateButtonState();
  }

  // --------------------------------------------------------------------------
  // Auto-detect Spotify display name as default username
  // Source: https://spicetify.app/docs — Platform.UserAPI.getUser() and CosmosAsync
  // --------------------------------------------------------------------------
  async function tryGetSpotifyUsername() {
    // Capture the real account display name even if a custom username is saved,
    // because the admin gate keys off the Spotify account, not the editable field.
    const apply = (name) => {
      if (!name || typeof name !== "string" || !name.trim()) return false;
      spotifyDisplayName = name.trim();
      if (!localStorage.getItem("sync_username")) {
        username = spotifyDisplayName.slice(0, 32);
        localStorage.setItem("sync_username", username);
      }
      maybeRevealAdminButton();
      return true;
    };
    try {
      // Method 1 (official): Platform.UserAPI.getUser() -> displayName
      const user = await Spicetify.Platform.UserAPI.getUser();
      if (apply(user?.displayName)) return;
    } catch (_) {}
    try {
      // Method 2 (fallback): Spotify Web API via CosmosAsync (auth injected automatically)
      const me = await Spicetify.CosmosAsync.get("https://api.spotify.com/v1/me");
      apply(me?.display_name);
    } catch (_) {}
  }

  // --------------------------------------------------------------------------
  // Auto-connect
  // --------------------------------------------------------------------------
  function maybeAutoConnect() {
    if (!settings.autoConnect) return;
    const lastRole = localStorage.getItem("sync_lastRole");
    if (lastRole !== "host" && lastRole !== "guest") return;
    if (isConnected || reconnecting) return;
    setTimeout(() => {
      if (!isConnected && !reconnecting) connect(lastRole);
    }, 1500);
  }

  // --------------------------------------------------------------------------
  // Init — cap DOM readiness poll at 20 attempts
  // --------------------------------------------------------------------------
  function init() {
    let attempts = 0;
    function tryInit() {
      const ready =
        document.querySelector(".main-nowPlayingBar-extraControls") ||
        document.querySelector("[class*='extraControls']") ||
        document.querySelector(".player-controls__right");
      if (ready) {
        injectStyles();
        createToolbarButton();
        registerPlayerListeners();
        maybeAutoConnect();
        tryGetSpotifyUsername();
      } else if (++attempts < 20) {
        setTimeout(tryInit, 500);
      }
    }
    tryInit();
  }

  init();
})();
