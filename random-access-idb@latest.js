!function (t) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = t(); else if ("function" == typeof define && define.amd) define([], t); else {
        var e;
        e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, e.randomAccessIdb = t()
    }
}(function () {
    return function t(e, n, r) {
        function i(s, u) {
            if (!n[s]) {
                if (!e[s]) {
                    var f = "function" == typeof require && require;
                    if (!u && f) return f(s, !0);
                    if (o) return o(s, !0);
                    var a = new Error("Cannot find module '" + s + "'");
                    throw a.code = "MODULE_NOT_FOUND", a
                }
                var h = n[s] = {exports: {}};
                e[s][0].call(h.exports, function (t) {
                    var n = e[s][1][t];
                    return i(n ? n : t)
                }, h, h.exports, t, e, n, r)
            }
            return n[s].exports
        }

        for (var o = "function" == typeof require && require, s = 0; s < r.length; s++) i(r[s]);
        return i
    }({
        1: [function (t, e, n) {
            (function (e) {
                "use strict";

                function r() {
                    try {
                        var t = new Uint8Array(1);
                        return t.__proto__ = {
                            __proto__: Uint8Array.prototype, foo: function () {
                                return 42
                            }
                        }, 42 === t.foo() && "function" == typeof t.subarray && 0 === t.subarray(1, 1).byteLength
                    } catch (t) {
                        return !1
                    }
                }

                function i() {
                    return s.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
                }

                function o(t, e) {
                    if (i() < e) throw new RangeError("Invalid typed array length");
                    return s.TYPED_ARRAY_SUPPORT ? (t = new Uint8Array(e), t.__proto__ = s.prototype) : (null === t && (t = new s(e)), t.length = e), t
                }

                function s(t, e, n) {
                    if (!(s.TYPED_ARRAY_SUPPORT || this instanceof s)) return new s(t, e, n);
                    if ("number" == typeof t) {
                        if ("string" == typeof e) throw new Error("If encoding is specified then the first argument must be a string");
                        return h(this, t)
                    }
                    return u(this, t, e, n)
                }

                function u(t, e, n, r) {
                    if ("number" == typeof e) throw new TypeError('"value" argument must not be a number');
                    return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer ? p(t, e, n, r) : "string" == typeof e ? c(t, e, n) : d(t, e)
                }

                function f(t) {
                    if ("number" != typeof t) throw new TypeError('"size" argument must be a number');
                    if (t < 0) throw new RangeError('"size" argument must not be negative')
                }

                function a(t, e, n, r) {
                    return f(e), e <= 0 ? o(t, e) : void 0 !== n ? "string" == typeof r ? o(t, e).fill(n, r) : o(t, e).fill(n) : o(t, e)
                }

                function h(t, e) {
                    if (f(e), t = o(t, e < 0 ? 0 : 0 | g(e)), !s.TYPED_ARRAY_SUPPORT) for (var n = 0; n < e; ++n) t[n] = 0;
                    return t
                }

                function c(t, e, n) {
                    if ("string" == typeof n && "" !== n || (n = "utf8"), !s.isEncoding(n)) throw new TypeError('"encoding" must be a valid string encoding');
                    var r = 0 | v(e, n);
                    t = o(t, r);
                    var i = t.write(e, n);
                    return i !== r && (t = t.slice(0, i)), t
                }

                function l(t, e) {
                    var n = e.length < 0 ? 0 : 0 | g(e.length);
                    t = o(t, n);
                    for (var r = 0; r < n; r += 1) t[r] = 255 & e[r];
                    return t
                }

                function p(t, e, n, r) {
                    if (e.byteLength, n < 0 || e.byteLength < n) throw new RangeError("'offset' is out of bounds");
                    if (e.byteLength < n + (r || 0)) throw new RangeError("'length' is out of bounds");
                    return e = void 0 === n && void 0 === r ? new Uint8Array(e) : void 0 === r ? new Uint8Array(e, n) : new Uint8Array(e, n, r), s.TYPED_ARRAY_SUPPORT ? (t = e, t.__proto__ = s.prototype) : t = l(t, e), t
                }

                function d(t, e) {
                    if (s.isBuffer(e)) {
                        var n = 0 | g(e.length);
                        return t = o(t, n), 0 === t.length ? t : (e.copy(t, 0, 0, n), t)
                    }
                    if (e) {
                        if ("undefined" != typeof ArrayBuffer && e.buffer instanceof ArrayBuffer || "length" in e) return "number" != typeof e.length || G(e.length) ? o(t, 0) : l(t, e);
                        if ("Buffer" === e.type && $(e.data)) return l(t, e.data)
                    }
                    throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
                }

                function g(t) {
                    if (t >= i()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + i().toString(16) + " bytes");
                    return 0 | t
                }

                function y(t) {
                    return +t != t && (t = 0), s.alloc(+t)
                }

                function v(t, e) {
                    if (s.isBuffer(t)) return t.length;
                    if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)) return t.byteLength;
                    "string" != typeof t && (t = "" + t);
                    var n = t.length;
                    if (0 === n) return 0;
                    for (var r = !1; ;) switch (e) {
                        case"ascii":
                        case"latin1":
                        case"binary":
                            return n;
                        case"utf8":
                        case"utf-8":
                        case void 0:
                            return K(t).length;
                        case"ucs2":
                        case"ucs-2":
                        case"utf16le":
                        case"utf-16le":
                            return 2 * n;
                        case"hex":
                            return n >>> 1;
                        case"base64":
                            return J(t).length;
                        default:
                            if (r) return K(t).length;
                            e = ("" + e).toLowerCase(), r = !0
                    }
                }

                function w(t, e, n) {
                    var r = !1;
                    if ((void 0 === e || e < 0) && (e = 0), e > this.length) return "";
                    if ((void 0 === n || n > this.length) && (n = this.length), n <= 0) return "";
                    if (n >>>= 0, e >>>= 0, n <= e) return "";
                    for (t || (t = "utf8"); ;) switch (t) {
                        case"hex":
                            return O(this, e, n);
                        case"utf8":
                        case"utf-8":
                            return P(this, e, n);
                        case"ascii":
                            return S(this, e, n);
                        case"latin1":
                        case"binary":
                            return k(this, e, n);
                        case"base64":
                            return L(this, e, n);
                        case"ucs2":
                        case"ucs-2":
                        case"utf16le":
                        case"utf-16le":
                            return I(this, e, n);
                        default:
                            if (r) throw new TypeError("Unknown encoding: " + t);
                            t = (t + "").toLowerCase(), r = !0
                    }
                }

                function b(t, e, n) {
                    var r = t[e];
                    t[e] = t[n], t[n] = r
                }

                function m(t, e, n, r, i) {
                    if (0 === t.length) return -1;
                    if ("string" == typeof n ? (r = n, n = 0) : n > 2147483647 ? n = 2147483647 : n < -2147483648 && (n = -2147483648), n = +n, isNaN(n) && (n = i ? 0 : t.length - 1), n < 0 && (n = t.length + n), n >= t.length) {
                        if (i) return -1;
                        n = t.length - 1
                    } else if (n < 0) {
                        if (!i) return -1;
                        n = 0
                    }
                    if ("string" == typeof e && (e = s.from(e, r)), s.isBuffer(e)) return 0 === e.length ? -1 : _(t, e, n, r, i);
                    if ("number" == typeof e) return e = 255 & e, s.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? i ? Uint8Array.prototype.indexOf.call(t, e, n) : Uint8Array.prototype.lastIndexOf.call(t, e, n) : _(t, [e], n, r, i);
                    throw new TypeError("val must be string, number or Buffer")
                }

                function _(t, e, n, r, i) {
                    function o(t, e) {
                        return 1 === s ? t[e] : t.readUInt16BE(e * s)
                    }

                    var s = 1, u = t.length, f = e.length;
                    if (void 0 !== r && (r = String(r).toLowerCase(), "ucs2" === r || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {
                        if (t.length < 2 || e.length < 2) return -1;
                        s = 2, u /= 2, f /= 2, n /= 2
                    }
                    var a;
                    if (i) {
                        var h = -1;
                        for (a = n; a < u; a++) if (o(t, a) === o(e, h === -1 ? 0 : a - h)) {
                            if (h === -1 && (h = a), a - h + 1 === f) return h * s
                        } else h !== -1 && (a -= a - h), h = -1
                    } else for (n + f > u && (n = u - f), a = n; a >= 0; a--) {
                        for (var c = !0, l = 0; l < f; l++) if (o(t, a + l) !== o(e, l)) {
                            c = !1;
                            break
                        }
                        if (c) return a
                    }
                    return -1
                }

                function E(t, e, n, r) {
                    n = Number(n) || 0;
                    var i = t.length - n;
                    r ? (r = Number(r), r > i && (r = i)) : r = i;
                    var o = e.length;
                    if (o % 2 !== 0) throw new TypeError("Invalid hex string");
                    r > o / 2 && (r = o / 2);
                    for (var s = 0; s < r; ++s) {
                        var u = parseInt(e.substr(2 * s, 2), 16);
                        if (isNaN(u)) return s;
                        t[n + s] = u
                    }
                    return s
                }

                function A(t, e, n, r) {
                    return Z(K(e, t.length - n), t, n, r)
                }

                function T(t, e, n, r) {
                    return Z(V(e), t, n, r)
                }

                function R(t, e, n, r) {
                    return T(t, e, n, r)
                }

                function B(t, e, n, r) {
                    return Z(J(e), t, n, r)
                }

                function x(t, e, n, r) {
                    return Z(X(e, t.length - n), t, n, r)
                }

                function L(t, e, n) {
                    return 0 === e && n === t.length ? H.fromByteArray(t) : H.fromByteArray(t.slice(e, n))
                }

                function P(t, e, n) {
                    n = Math.min(t.length, n);
                    for (var r = [], i = e; i < n;) {
                        var o = t[i], s = null, u = o > 239 ? 4 : o > 223 ? 3 : o > 191 ? 2 : 1;
                        if (i + u <= n) {
                            var f, a, h, c;
                            switch (u) {
                                case 1:
                                    o < 128 && (s = o);
                                    break;
                                case 2:
                                    f = t[i + 1], 128 === (192 & f) && (c = (31 & o) << 6 | 63 & f, c > 127 && (s = c));
                                    break;
                                case 3:
                                    f = t[i + 1], a = t[i + 2], 128 === (192 & f) && 128 === (192 & a) && (c = (15 & o) << 12 | (63 & f) << 6 | 63 & a, c > 2047 && (c < 55296 || c > 57343) && (s = c));
                                    break;
                                case 4:
                                    f = t[i + 1], a = t[i + 2], h = t[i + 3], 128 === (192 & f) && 128 === (192 & a) && 128 === (192 & h) && (c = (15 & o) << 18 | (63 & f) << 12 | (63 & a) << 6 | 63 & h, c > 65535 && c < 1114112 && (s = c))
                            }
                        }
                        null === s ? (s = 65533, u = 1) : s > 65535 && (s -= 65536, r.push(s >>> 10 & 1023 | 55296), s = 56320 | 1023 & s), r.push(s), i += u
                    }
                    return U(r)
                }

                function U(t) {
                    var e = t.length;
                    if (e <= tt) return String.fromCharCode.apply(String, t);
                    for (var n = "", r = 0; r < e;) n += String.fromCharCode.apply(String, t.slice(r, r += tt));
                    return n
                }

                function S(t, e, n) {
                    var r = "";
                    n = Math.min(t.length, n);
                    for (var i = e; i < n; ++i) r += String.fromCharCode(127 & t[i]);
                    return r
                }

                function k(t, e, n) {
                    var r = "";
                    n = Math.min(t.length, n);
                    for (var i = e; i < n; ++i) r += String.fromCharCode(t[i]);
                    return r
                }

                function O(t, e, n) {
                    var r = t.length;
                    (!e || e < 0) && (e = 0), (!n || n < 0 || n > r) && (n = r);
                    for (var i = "", o = e; o < n; ++o) i += W(t[o]);
                    return i
                }

                function I(t, e, n) {
                    for (var r = t.slice(e, n), i = "", o = 0; o < r.length; o += 2) i += String.fromCharCode(r[o] + 256 * r[o + 1]);
                    return i
                }

                function Y(t, e, n) {
                    if (t % 1 !== 0 || t < 0) throw new RangeError("offset is not uint");
                    if (t + e > n) throw new RangeError("Trying to access beyond buffer length")
                }

                function M(t, e, n, r, i, o) {
                    if (!s.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
                    if (e > i || e < o) throw new RangeError('"value" argument is out of bounds');
                    if (n + r > t.length) throw new RangeError("Index out of range")
                }

                function C(t, e, n, r) {
                    e < 0 && (e = 65535 + e + 1);
                    for (var i = 0, o = Math.min(t.length - n, 2); i < o; ++i) t[n + i] = (e & 255 << 8 * (r ? i : 1 - i)) >>> 8 * (r ? i : 1 - i)
                }

                function D(t, e, n, r) {
                    e < 0 && (e = 4294967295 + e + 1);
                    for (var i = 0, o = Math.min(t.length - n, 4); i < o; ++i) t[n + i] = e >>> 8 * (r ? i : 3 - i) & 255
                }

                function j(t, e, n, r, i, o) {
                    if (n + r > t.length) throw new RangeError("Index out of range");
                    if (n < 0) throw new RangeError("Index out of range")
                }

                function N(t, e, n, r, i) {
                    return i || j(t, e, n, 4, 3.4028234663852886e38, -3.4028234663852886e38), Q.write(t, e, n, r, 23, 4), n + 4
                }

                function z(t, e, n, r, i) {
                    return i || j(t, e, n, 8, 1.7976931348623157e308, -1.7976931348623157e308), Q.write(t, e, n, r, 52, 8), n + 8
                }

                function F(t) {
                    if (t = q(t).replace(et, ""), t.length < 2) return "";
                    for (; t.length % 4 !== 0;) t += "=";
                    return t
                }

                function q(t) {
                    return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
                }

                function W(t) {
                    return t < 16 ? "0" + t.toString(16) : t.toString(16)
                }

                function K(t, e) {
                    e = e || 1 / 0;
                    for (var n, r = t.length, i = null, o = [], s = 0; s < r; ++s) {
                        if (n = t.charCodeAt(s), n > 55295 && n < 57344) {
                            if (!i) {
                                if (n > 56319) {
                                    (e -= 3) > -1 && o.push(239, 191, 189);
                                    continue
                                }
                                if (s + 1 === r) {
                                    (e -= 3) > -1 && o.push(239, 191, 189);
                                    continue
                                }
                                i = n;
                                continue
                            }
                            if (n < 56320) {
                                (e -= 3) > -1 && o.push(239, 191, 189), i = n;
                                continue
                            }
                            n = (i - 55296 << 10 | n - 56320) + 65536
                        } else i && (e -= 3) > -1 && o.push(239, 191, 189);
                        if (i = null, n < 128) {
                            if ((e -= 1) < 0) break;
                            o.push(n)
                        } else if (n < 2048) {
                            if ((e -= 2) < 0) break;
                            o.push(n >> 6 | 192, 63 & n | 128)
                        } else if (n < 65536) {
                            if ((e -= 3) < 0) break;
                            o.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128)
                        } else {
                            if (!(n < 1114112)) throw new Error("Invalid code point");
                            if ((e -= 4) < 0) break;
                            o.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128)
                        }
                    }
                    return o
                }

                function V(t) {
                    for (var e = [], n = 0; n < t.length; ++n) e.push(255 & t.charCodeAt(n));
                    return e
                }

                function X(t, e) {
                    for (var n, r, i, o = [], s = 0; s < t.length && !((e -= 2) < 0); ++s) n = t.charCodeAt(s), r = n >> 8, i = n % 256, o.push(i), o.push(r);
                    return o
                }

                function J(t) {
                    return H.toByteArray(F(t))
                }

                function Z(t, e, n, r) {
                    for (var i = 0; i < r && !(i + n >= e.length || i >= t.length); ++i) e[i + n] = t[i];
                    return i
                }

                function G(t) {
                    return t !== t
                }

                var H = t("base64-js"), Q = t("ieee754"), $ = t("isarray");
                n.Buffer = s, n.SlowBuffer = y, n.INSPECT_MAX_BYTES = 50, s.TYPED_ARRAY_SUPPORT = void 0 !== e.TYPED_ARRAY_SUPPORT ? e.TYPED_ARRAY_SUPPORT : r(), n.kMaxLength = i(), s.poolSize = 8192, s._augment = function (t) {
                    return t.__proto__ = s.prototype, t
                }, s.from = function (t, e, n) {
                    return u(null, t, e, n)
                }, s.TYPED_ARRAY_SUPPORT && (s.prototype.__proto__ = Uint8Array.prototype, s.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && s[Symbol.species] === s && Object.defineProperty(s, Symbol.species, {
                    value: null,
                    configurable: !0
                })), s.alloc = function (t, e, n) {
                    return a(null, t, e, n)
                }, s.allocUnsafe = function (t) {
                    return h(null, t)
                }, s.allocUnsafeSlow = function (t) {
                    return h(null, t)
                }, s.isBuffer = function (t) {
                    return !(null == t || !t._isBuffer)
                }, s.compare = function (t, e) {
                    if (!s.isBuffer(t) || !s.isBuffer(e)) throw new TypeError("Arguments must be Buffers");
                    if (t === e) return 0;
                    for (var n = t.length, r = e.length, i = 0, o = Math.min(n, r); i < o; ++i) if (t[i] !== e[i]) {
                        n = t[i], r = e[i];
                        break
                    }
                    return n < r ? -1 : r < n ? 1 : 0
                }, s.isEncoding = function (t) {
                    switch (String(t).toLowerCase()) {
                        case"hex":
                        case"utf8":
                        case"utf-8":
                        case"ascii":
                        case"latin1":
                        case"binary":
                        case"base64":
                        case"ucs2":
                        case"ucs-2":
                        case"utf16le":
                        case"utf-16le":
                            return !0;
                        default:
                            return !1
                    }
                }, s.concat = function (t, e) {
                    if (!$(t)) throw new TypeError('"list" argument must be an Array of Buffers');
                    if (0 === t.length) return s.alloc(0);
                    var n;
                    if (void 0 === e) for (e = 0, n = 0; n < t.length; ++n) e += t[n].length;
                    var r = s.allocUnsafe(e), i = 0;
                    for (n = 0; n < t.length; ++n) {
                        var o = t[n];
                        if (!s.isBuffer(o)) throw new TypeError('"list" argument must be an Array of Buffers');
                        o.copy(r, i), i += o.length
                    }
                    return r
                }, s.byteLength = v, s.prototype._isBuffer = !0, s.prototype.swap16 = function () {
                    var t = this.length;
                    if (t % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
                    for (var e = 0; e < t; e += 2) b(this, e, e + 1);
                    return this
                }, s.prototype.swap32 = function () {
                    var t = this.length;
                    if (t % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
                    for (var e = 0; e < t; e += 4) b(this, e, e + 3), b(this, e + 1, e + 2);
                    return this
                }, s.prototype.swap64 = function () {
                    var t = this.length;
                    if (t % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
                    for (var e = 0; e < t; e += 8) b(this, e, e + 7), b(this, e + 1, e + 6), b(this, e + 2, e + 5), b(this, e + 3, e + 4);
                    return this
                }, s.prototype.toString = function () {
                    var t = 0 | this.length;
                    return 0 === t ? "" : 0 === arguments.length ? P(this, 0, t) : w.apply(this, arguments)
                }, s.prototype.equals = function (t) {
                    if (!s.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
                    return this === t || 0 === s.compare(this, t)
                }, s.prototype.inspect = function () {
                    var t = "", e = n.INSPECT_MAX_BYTES;
                    return this.length > 0 && (t = this.toString("hex", 0, e).match(/.{2}/g).join(" "), this.length > e && (t += " ... ")), "<Buffer " + t + ">"
                }, s.prototype.compare = function (t, e, n, r, i) {
                    if (!s.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
                    if (void 0 === e && (e = 0), void 0 === n && (n = t ? t.length : 0), void 0 === r && (r = 0), void 0 === i && (i = this.length), e < 0 || n > t.length || r < 0 || i > this.length) throw new RangeError("out of range index");
                    if (r >= i && e >= n) return 0;
                    if (r >= i) return -1;
                    if (e >= n) return 1;
                    if (e >>>= 0, n >>>= 0, r >>>= 0, i >>>= 0, this === t) return 0;
                    for (var o = i - r, u = n - e, f = Math.min(o, u), a = this.slice(r, i), h = t.slice(e, n), c = 0; c < f; ++c) if (a[c] !== h[c]) {
                        o = a[c], u = h[c];
                        break
                    }
                    return o < u ? -1 : u < o ? 1 : 0
                }, s.prototype.includes = function (t, e, n) {
                    return this.indexOf(t, e, n) !== -1
                }, s.prototype.indexOf = function (t, e, n) {
                    return m(this, t, e, n, !0)
                }, s.prototype.lastIndexOf = function (t, e, n) {
                    return m(this, t, e, n, !1)
                }, s.prototype.write = function (t, e, n, r) {
                    if (void 0 === e) r = "utf8", n = this.length, e = 0; else if (void 0 === n && "string" == typeof e) r = e, n = this.length, e = 0; else {
                        if (!isFinite(e)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                        e = 0 | e, isFinite(n) ? (n = 0 | n, void 0 === r && (r = "utf8")) : (r = n, n = void 0)
                    }
                    var i = this.length - e;
                    if ((void 0 === n || n > i) && (n = i), t.length > 0 && (n < 0 || e < 0) || e > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                    r || (r = "utf8");
                    for (var o = !1; ;) switch (r) {
                        case"hex":
                            return E(this, t, e, n);
                        case"utf8":
                        case"utf-8":
                            return A(this, t, e, n);
                        case"ascii":
                            return T(this, t, e, n);
                        case"latin1":
                        case"binary":
                            return R(this, t, e, n);
                        case"base64":
                            return B(this, t, e, n);
                        case"ucs2":
                        case"ucs-2":
                        case"utf16le":
                        case"utf-16le":
                            return x(this, t, e, n);
                        default:
                            if (o) throw new TypeError("Unknown encoding: " + r);
                            r = ("" + r).toLowerCase(), o = !0
                    }
                }, s.prototype.toJSON = function () {
                    return {type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0)}
                };
                var tt = 4096;
                s.prototype.slice = function (t, e) {
                    var n = this.length;
                    t = ~~t, e = void 0 === e ? n : ~~e, t < 0 ? (t += n, t < 0 && (t = 0)) : t > n && (t = n), e < 0 ? (e += n, e < 0 && (e = 0)) : e > n && (e = n), e < t && (e = t);
                    var r;
                    if (s.TYPED_ARRAY_SUPPORT) r = this.subarray(t, e), r.__proto__ = s.prototype; else {
                        var i = e - t;
                        r = new s(i, void 0);
                        for (var o = 0; o < i; ++o) r[o] = this[o + t]
                    }
                    return r
                }, s.prototype.readUIntLE = function (t, e, n) {
                    t = 0 | t, e = 0 | e, n || Y(t, e, this.length);
                    for (var r = this[t], i = 1, o = 0; ++o < e && (i *= 256);) r += this[t + o] * i;
                    return r
                }, s.prototype.readUIntBE = function (t, e, n) {
                    t = 0 | t, e = 0 | e, n || Y(t, e, this.length);
                    for (var r = this[t + --e], i = 1; e > 0 && (i *= 256);) r += this[t + --e] * i;
                    return r
                }, s.prototype.readUInt8 = function (t, e) {
                    return e || Y(t, 1, this.length), this[t]
                }, s.prototype.readUInt16LE = function (t, e) {
                    return e || Y(t, 2, this.length), this[t] | this[t + 1] << 8
                }, s.prototype.readUInt16BE = function (t, e) {
                    return e || Y(t, 2, this.length), this[t] << 8 | this[t + 1]
                }, s.prototype.readUInt32LE = function (t, e) {
                    return e || Y(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
                }, s.prototype.readUInt32BE = function (t, e) {
                    return e || Y(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
                }, s.prototype.readIntLE = function (t, e, n) {
                    t = 0 | t, e = 0 | e, n || Y(t, e, this.length);
                    for (var r = this[t], i = 1, o = 0; ++o < e && (i *= 256);) r += this[t + o] * i;
                    return i *= 128, r >= i && (r -= Math.pow(2, 8 * e)), r
                }, s.prototype.readIntBE = function (t, e, n) {
                    t = 0 | t, e = 0 | e, n || Y(t, e, this.length);
                    for (var r = e, i = 1, o = this[t + --r]; r > 0 && (i *= 256);) o += this[t + --r] * i;
                    return i *= 128, o >= i && (o -= Math.pow(2, 8 * e)), o
                }, s.prototype.readInt8 = function (t, e) {
                    return e || Y(t, 1, this.length), 128 & this[t] ? (255 - this[t] + 1) * -1 : this[t]
                }, s.prototype.readInt16LE = function (t, e) {
                    e || Y(t, 2, this.length);
                    var n = this[t] | this[t + 1] << 8;
                    return 32768 & n ? 4294901760 | n : n
                }, s.prototype.readInt16BE = function (t, e) {
                    e || Y(t, 2, this.length);
                    var n = this[t + 1] | this[t] << 8;
                    return 32768 & n ? 4294901760 | n : n
                }, s.prototype.readInt32LE = function (t, e) {
                    return e || Y(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
                }, s.prototype.readInt32BE = function (t, e) {
                    return e || Y(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
                }, s.prototype.readFloatLE = function (t, e) {
                    return e || Y(t, 4, this.length), Q.read(this, t, !0, 23, 4)
                }, s.prototype.readFloatBE = function (t, e) {
                    return e || Y(t, 4, this.length), Q.read(this, t, !1, 23, 4)
                }, s.prototype.readDoubleLE = function (t, e) {
                    return e || Y(t, 8, this.length), Q.read(this, t, !0, 52, 8)
                }, s.prototype.readDoubleBE = function (t, e) {
                    return e || Y(t, 8, this.length), Q.read(this, t, !1, 52, 8)
                }, s.prototype.writeUIntLE = function (t, e, n, r) {
                    if (t = +t, e = 0 | e, n = 0 | n, !r) {
                        var i = Math.pow(2, 8 * n) - 1;
                        M(this, t, e, n, i, 0)
                    }
                    var o = 1, s = 0;
                    for (this[e] = 255 & t; ++s < n && (o *= 256);) this[e + s] = t / o & 255;
                    return e + n
                }, s.prototype.writeUIntBE = function (t, e, n, r) {
                    if (t = +t, e = 0 | e, n = 0 | n, !r) {
                        var i = Math.pow(2, 8 * n) - 1;
                        M(this, t, e, n, i, 0)
                    }
                    var o = n - 1, s = 1;
                    for (this[e + o] = 255 & t; --o >= 0 && (s *= 256);) this[e + o] = t / s & 255;
                    return e + n
                }, s.prototype.writeUInt8 = function (t, e, n) {
                    return t = +t, e = 0 | e, n || M(this, t, e, 1, 255, 0), s.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), this[e] = 255 & t, e + 1
                }, s.prototype.writeUInt16LE = function (t, e, n) {
                    return t = +t, e = 0 | e, n || M(this, t, e, 2, 65535, 0), s.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : C(this, t, e, !0), e + 2
                }, s.prototype.writeUInt16BE = function (t, e, n) {
                    return t = +t, e = 0 | e, n || M(this, t, e, 2, 65535, 0), s.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : C(this, t, e, !1), e + 2
                }, s.prototype.writeUInt32LE = function (t, e, n) {
                    return t = +t, e = 0 | e, n || M(this, t, e, 4, 4294967295, 0), s.TYPED_ARRAY_SUPPORT ? (this[e + 3] = t >>> 24, this[e + 2] = t >>> 16, this[e + 1] = t >>> 8, this[e] = 255 & t) : D(this, t, e, !0), e + 4
                }, s.prototype.writeUInt32BE = function (t, e, n) {
                    return t = +t, e = 0 | e, n || M(this, t, e, 4, 4294967295, 0), s.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : D(this, t, e, !1), e + 4
                }, s.prototype.writeIntLE = function (t, e, n, r) {
                    if (t = +t, e = 0 | e, !r) {
                        var i = Math.pow(2, 8 * n - 1);
                        M(this, t, e, n, i - 1, -i)
                    }
                    var o = 0, s = 1, u = 0;
                    for (this[e] = 255 & t; ++o < n && (s *= 256);) t < 0 && 0 === u && 0 !== this[e + o - 1] && (u = 1), this[e + o] = (t / s >> 0) - u & 255;
                    return e + n
                }, s.prototype.writeIntBE = function (t, e, n, r) {
                    if (t = +t, e = 0 | e, !r) {
                        var i = Math.pow(2, 8 * n - 1);
                        M(this, t, e, n, i - 1, -i)
                    }
                    var o = n - 1, s = 1, u = 0;
                    for (this[e + o] = 255 & t; --o >= 0 && (s *= 256);) t < 0 && 0 === u && 0 !== this[e + o + 1] && (u = 1), this[e + o] = (t / s >> 0) - u & 255;
                    return e + n
                }, s.prototype.writeInt8 = function (t, e, n) {
                    return t = +t, e = 0 | e, n || M(this, t, e, 1, 127, -128), s.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), t < 0 && (t = 255 + t + 1), this[e] = 255 & t, e + 1
                }, s.prototype.writeInt16LE = function (t, e, n) {
                    return t = +t, e = 0 | e, n || M(this, t, e, 2, 32767, -32768), s.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : C(this, t, e, !0), e + 2
                }, s.prototype.writeInt16BE = function (t, e, n) {
                    return t = +t, e = 0 | e, n || M(this, t, e, 2, 32767, -32768), s.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : C(this, t, e, !1), e + 2
                }, s.prototype.writeInt32LE = function (t, e, n) {
                    return t = +t, e = 0 | e, n || M(this, t, e, 4, 2147483647, -2147483648), s.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8, this[e + 2] = t >>> 16, this[e + 3] = t >>> 24) : D(this, t, e, !0), e + 4
                }, s.prototype.writeInt32BE = function (t, e, n) {
                    return t = +t, e = 0 | e, n || M(this, t, e, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), s.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : D(this, t, e, !1), e + 4
                }, s.prototype.writeFloatLE = function (t, e, n) {
                    return N(this, t, e, !0, n)
                }, s.prototype.writeFloatBE = function (t, e, n) {
                    return N(this, t, e, !1, n)
                }, s.prototype.writeDoubleLE = function (t, e, n) {
                    return z(this, t, e, !0, n)
                }, s.prototype.writeDoubleBE = function (t, e, n) {
                    return z(this, t, e, !1, n)
                }, s.prototype.copy = function (t, e, n, r) {
                    if (n || (n = 0), r || 0 === r || (r = this.length), e >= t.length && (e = t.length), e || (e = 0), r > 0 && r < n && (r = n), r === n) return 0;
                    if (0 === t.length || 0 === this.length) return 0;
                    if (e < 0) throw new RangeError("targetStart out of bounds");
                    if (n < 0 || n >= this.length) throw new RangeError("sourceStart out of bounds");
                    if (r < 0) throw new RangeError("sourceEnd out of bounds");
                    r > this.length && (r = this.length), t.length - e < r - n && (r = t.length - e + n);
                    var i, o = r - n;
                    if (this === t && n < e && e < r) for (i = o - 1; i >= 0; --i) t[i + e] = this[i + n]; else if (o < 1e3 || !s.TYPED_ARRAY_SUPPORT) for (i = 0; i < o; ++i) t[i + e] = this[i + n]; else Uint8Array.prototype.set.call(t, this.subarray(n, n + o), e);
                    return o
                }, s.prototype.fill = function (t, e, n, r) {
                    if ("string" == typeof t) {
                        if ("string" == typeof e ? (r = e, e = 0, n = this.length) : "string" == typeof n && (r = n, n = this.length), 1 === t.length) {
                            var i = t.charCodeAt(0);
                            i < 256 && (t = i)
                        }
                        if (void 0 !== r && "string" != typeof r) throw new TypeError("encoding must be a string");
                        if ("string" == typeof r && !s.isEncoding(r)) throw new TypeError("Unknown encoding: " + r)
                    } else "number" == typeof t && (t = 255 & t);
                    if (e < 0 || this.length < e || this.length < n) throw new RangeError("Out of range index");
                    if (n <= e) return this;
                    e >>>= 0, n = void 0 === n ? this.length : n >>> 0, t || (t = 0);
                    var o;
                    if ("number" == typeof t) for (o = e; o < n; ++o) this[o] = t; else {
                        var u = s.isBuffer(t) ? t : K(new s(t, r).toString()), f = u.length;
                        for (o = 0; o < n - e; ++o) this[o + e] = u[o % f]
                    }
                    return this
                };
                var et = /[^+\/0-9A-Za-z-_]/g
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {"base64-js": 2, ieee754: 3, isarray: 4}], 2: [function (t, e, n) {
            "use strict";

            function r(t) {
                var e = t.length;
                if (e % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
                return "=" === t[e - 2] ? 2 : "=" === t[e - 1] ? 1 : 0
            }

            function i(t) {
                return 3 * t.length / 4 - r(t)
            }

            function o(t) {
                var e, n, i, o, s, u, f = t.length;
                s = r(t), u = new c(3 * f / 4 - s), i = s > 0 ? f - 4 : f;
                var a = 0;
                for (e = 0, n = 0; e < i; e += 4, n += 3) o = h[t.charCodeAt(e)] << 18 | h[t.charCodeAt(e + 1)] << 12 | h[t.charCodeAt(e + 2)] << 6 | h[t.charCodeAt(e + 3)], u[a++] = o >> 16 & 255, u[a++] = o >> 8 & 255, u[a++] = 255 & o;
                return 2 === s ? (o = h[t.charCodeAt(e)] << 2 | h[t.charCodeAt(e + 1)] >> 4, u[a++] = 255 & o) : 1 === s && (o = h[t.charCodeAt(e)] << 10 | h[t.charCodeAt(e + 1)] << 4 | h[t.charCodeAt(e + 2)] >> 2, u[a++] = o >> 8 & 255, u[a++] = 255 & o), u
            }

            function s(t) {
                return a[t >> 18 & 63] + a[t >> 12 & 63] + a[t >> 6 & 63] + a[63 & t]
            }

            function u(t, e, n) {
                for (var r, i = [], o = e; o < n; o += 3) r = (t[o] << 16) + (t[o + 1] << 8) + t[o + 2], i.push(s(r));
                return i.join("")
            }

            function f(t) {
                for (var e, n = t.length, r = n % 3, i = "", o = [], s = 16383, f = 0, h = n - r; f < h; f += s) o.push(u(t, f, f + s > h ? h : f + s));
                return 1 === r ? (e = t[n - 1], i += a[e >> 2], i += a[e << 4 & 63], i += "==") : 2 === r && (e = (t[n - 2] << 8) + t[n - 1], i += a[e >> 10], i += a[e >> 4 & 63], i += a[e << 2 & 63], i += "="), o.push(i), o.join("")
            }

            n.byteLength = i, n.toByteArray = o, n.fromByteArray = f;
            for (var a = [], h = [], c = "undefined" != typeof Uint8Array ? Uint8Array : Array, l = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", p = 0, d = l.length; p < d; ++p) a[p] = l[p], h[l.charCodeAt(p)] = p;
            h["-".charCodeAt(0)] = 62, h["_".charCodeAt(0)] = 63
        }, {}], 3: [function (t, e, n) {
            n.read = function (t, e, n, r, i) {
                var o, s, u = 8 * i - r - 1, f = (1 << u) - 1, a = f >> 1, h = -7, c = n ? i - 1 : 0, l = n ? -1 : 1,
                    p = t[e + c];
                for (c += l, o = p & (1 << -h) - 1, p >>= -h, h += u; h > 0; o = 256 * o + t[e + c], c += l, h -= 8) ;
                for (s = o & (1 << -h) - 1, o >>= -h, h += r; h > 0; s = 256 * s + t[e + c], c += l, h -= 8) ;
                if (0 === o) o = 1 - a; else {
                    if (o === f) return s ? NaN : (p ? -1 : 1) * (1 / 0);
                    s += Math.pow(2, r), o -= a
                }
                return (p ? -1 : 1) * s * Math.pow(2, o - r)
            }, n.write = function (t, e, n, r, i, o) {
                var s, u, f, a = 8 * o - i - 1, h = (1 << a) - 1, c = h >> 1,
                    l = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0, p = r ? 0 : o - 1, d = r ? 1 : -1,
                    g = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
                for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (u = isNaN(e) ? 1 : 0, s = h) : (s = Math.floor(Math.log(e) / Math.LN2), e * (f = Math.pow(2, -s)) < 1 && (s--, f *= 2), e += s + c >= 1 ? l / f : l * Math.pow(2, 1 - c), e * f >= 2 && (s++, f /= 2), s + c >= h ? (u = 0, s = h) : s + c >= 1 ? (u = (e * f - 1) * Math.pow(2, i), s += c) : (u = e * Math.pow(2, c - 1) * Math.pow(2, i), s = 0)); i >= 8; t[n + p] = 255 & u, p += d, u /= 256, i -= 8) ;
                for (s = s << i | u, a += i; a > 0; t[n + p] = 255 & s, p += d, s /= 256, a -= 8) ;
                t[n + p - d] |= 128 * g
            }
        }, {}], 4: [function (t, e, n) {
            var r = {}.toString;
            e.exports = Array.isArray || function (t) {
                return "[object Array]" == r.call(t)
            }
        }, {}], 5: [function (t, e, n) {
            function r() {
                this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0
            }

            function i(t) {
                return "function" == typeof t
            }

            function o(t) {
                return "number" == typeof t
            }

            function s(t) {
                return "object" == typeof t && null !== t
            }

            function u(t) {
                return void 0 === t
            }

            e.exports = r, r.EventEmitter = r, r.prototype._events = void 0, r.prototype._maxListeners = void 0, r.defaultMaxListeners = 10, r.prototype.setMaxListeners = function (t) {
                if (!o(t) || t < 0 || isNaN(t)) throw TypeError("n must be a positive number");
                return this._maxListeners = t, this
            }, r.prototype.emit = function (t) {
                var e, n, r, o, f, a;
                if (this._events || (this._events = {}), "error" === t && (!this._events.error || s(this._events.error) && !this._events.error.length)) {
                    if (e = arguments[1], e instanceof Error) throw e;
                    var h = new Error('Uncaught, unspecified "error" event. (' + e + ")");
                    throw h.context = e, h
                }
                if (n = this._events[t], u(n)) return !1;
                if (i(n)) switch (arguments.length) {
                    case 1:
                        n.call(this);
                        break;
                    case 2:
                        n.call(this, arguments[1]);
                        break;
                    case 3:
                        n.call(this, arguments[1], arguments[2]);
                        break;
                    default:
                        o = Array.prototype.slice.call(arguments, 1), n.apply(this, o)
                } else if (s(n)) for (o = Array.prototype.slice.call(arguments, 1), a = n.slice(), r = a.length, f = 0; f < r; f++) a[f].apply(this, o);
                return !0
            }, r.prototype.addListener = function (t, e) {
                var n;
                if (!i(e)) throw TypeError("listener must be a function");
                return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", t, i(e.listener) ? e.listener : e), this._events[t] ? s(this._events[t]) ? this._events[t].push(e) : this._events[t] = [this._events[t], e] : this._events[t] = e, s(this._events[t]) && !this._events[t].warned && (n = u(this._maxListeners) ? r.defaultMaxListeners : this._maxListeners, n && n > 0 && this._events[t].length > n && (this._events[t].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[t].length), "function" == typeof console.trace && console.trace())), this
            }, r.prototype.on = r.prototype.addListener, r.prototype.once = function (t, e) {
                function n() {
                    this.removeListener(t, n), r || (r = !0, e.apply(this, arguments))
                }

                if (!i(e)) throw TypeError("listener must be a function");
                var r = !1;
                return n.listener = e, this.on(t, n), this
            }, r.prototype.removeListener = function (t, e) {
                var n, r, o, u;
                if (!i(e)) throw TypeError("listener must be a function");
                if (!this._events || !this._events[t]) return this;
                if (n = this._events[t], o = n.length, r = -1, n === e || i(n.listener) && n.listener === e) delete this._events[t], this._events.removeListener && this.emit("removeListener", t, e); else if (s(n)) {
                    for (u = o; u-- > 0;) if (n[u] === e || n[u].listener && n[u].listener === e) {
                        r = u;
                        break
                    }
                    if (r < 0) return this;
                    1 === n.length ? (n.length = 0, delete this._events[t]) : n.splice(r, 1), this._events.removeListener && this.emit("removeListener", t, e)
                }
                return this
            }, r.prototype.removeAllListeners = function (t) {
                var e, n;
                if (!this._events) return this;
                if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[t] && delete this._events[t], this;
                if (0 === arguments.length) {
                    for (e in this._events) "removeListener" !== e && this.removeAllListeners(e);
                    return this.removeAllListeners("removeListener"), this._events = {}, this
                }
                if (n = this._events[t], i(n)) this.removeListener(t, n); else if (n) for (; n.length;) this.removeListener(t, n[n.length - 1]);
                return delete this._events[t], this
            }, r.prototype.listeners = function (t) {
                var e;
                return e = this._events && this._events[t] ? i(this._events[t]) ? [this._events[t]] : this._events[t].slice() : []
            }, r.prototype.listenerCount = function (t) {
                if (this._events) {
                    var e = this._events[t];
                    if (i(e)) return 1;
                    if (e) return e.length
                }
                return 0
            }, r.listenerCount = function (t, e) {
                return t.listenerCount(e)
            }
        }, {}], 6: [function (t, e, n) {
            function r(t) {
                return !!t.constructor && "function" == typeof t.constructor.isBuffer && t.constructor.isBuffer(t)
            }

            function i(t) {
                return "function" == typeof t.readFloatLE && "function" == typeof t.slice && r(t.slice(0, 0))
            }

            e.exports = function (t) {
                return null != t && (r(t) || i(t) || !!t._isBuffer)
            }
        }, {}], 7: [function (t, e, n) {
            function r() {
                throw new Error("setTimeout has not been defined")
            }

            function i() {
                throw new Error("clearTimeout has not been defined")
            }

            function o(t) {
                if (c === setTimeout) return setTimeout(t, 0);
                if ((c === r || !c) && setTimeout) return c = setTimeout, setTimeout(t, 0);
                try {
                    return c(t, 0)
                } catch (e) {
                    try {
                        return c.call(null, t, 0)
                    } catch (e) {
                        return c.call(this, t, 0)
                    }
                }
            }

            function s(t) {
                if (l === clearTimeout) return clearTimeout(t);
                if ((l === i || !l) && clearTimeout) return l = clearTimeout, clearTimeout(t);
                try {
                    return l(t)
                } catch (e) {
                    try {
                        return l.call(null, t)
                    } catch (e) {
                        return l.call(this, t)
                    }
                }
            }

            function u() {
                y && d && (y = !1, d.length ? g = d.concat(g) : v = -1, g.length && f())
            }

            function f() {
                if (!y) {
                    var t = o(u);
                    y = !0;
                    for (var e = g.length; e;) {
                        for (d = g, g = []; ++v < e;) d && d[v].run();
                        v = -1, e = g.length
                    }
                    d = null, y = !1, s(t)
                }
            }

            function a(t, e) {
                this.fun = t, this.array = e
            }

            function h() {
            }

            var c, l, p = e.exports = {};
            !function () {
                try {
                    c = "function" == typeof setTimeout ? setTimeout : r
                } catch (t) {
                    c = r
                }
                try {
                    l = "function" == typeof clearTimeout ? clearTimeout : i
                } catch (t) {
                    l = i
                }
            }();
            var d, g = [], y = !1, v = -1;
            p.nextTick = function (t) {
                var e = new Array(arguments.length - 1);
                if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
                g.push(new a(t, e)), 1 !== g.length || y || o(f)
            }, a.prototype.run = function () {
                this.fun.apply(null, this.array)
            }, p.title = "browser", p.browser = !0, p.env = {}, p.argv = [], p.version = "", p.versions = {}, p.on = h, p.addListener = h, p.once = h, p.off = h, p.removeListener = h, p.removeAllListeners = h, p.emit = h, p.binding = function (t) {
                throw new Error("process.binding is not supported")
            }, p.cwd = function () {
                return "/"
            }, p.chdir = function (t) {
                throw new Error("process.chdir is not supported")
            }, p.umask = function () {
                return 0
            }
        }, {}], 8: [function (t, e, n) {
            (function (n) {
                function r(t) {
                    return this instanceof r ? (o.call(this), t || (t = {}), "string" == typeof t && (t = {name: t}), this.size = t.size || 4096, this.name = t.name, this.length = t.length || 0, void(this._getdb = t.db)) : new r(t)
                }

                function i(t, e) {
                    t.addEventListener("success", function (t) {
                        e(null, t)
                    }), t.addEventListener("error", e)
                }

                var o = t("abstract-random-access"), s = t("inherits"), u = t("next-tick"), f = t("once"),
                    a = t("./lib/blocks.js"), h = t("buffer-from"), c = t("buffer-alloc"), l = "\0";
                e.exports = function (t, e) {
                    function n(t) {
                        o ? u(function () {
                            t(o)
                        }) : s.push(t)
                    }

                    e || (e = {});
                    var i = e.idb || ("undefined" != typeof window ? window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB : null);
                    if (!i) throw new Error("indexedDB not present and not given");
                    var o = null, s = [];
                    if ("function" == typeof i.open) {
                        var f = i.open(t);
                        f.addEventListener("upgradeneeded", function () {
                            o = f.result, o.createObjectStore("data")
                        }), f.addEventListener("success", function () {
                            o = f.result, s.forEach(function (t) {
                                t(o)
                            }), s = null
                        })
                    } else o = i;
                    return function (t, i) {
                        return "object" == typeof t && (i = t, t = i.name), i || (i = {}), i.name = t, new r(Object.assign({db: n}, e, i))
                    }
                }, s(r, o), r.prototype._blocks = function (t, e) {
                    return a(this.size, t, e)
                }, r.prototype._read = function (t, e, r) {
                    var o = this;
                    r = f(r);
                    var s = [];
                    o._store("readonly", function (u, f) {
                        if ((o.length || 0) < t + e) return r(new Error("Could not satisfy length"));
                        if (u) return r(u);
                        for (var a = o._blocks(t, t + e), p = a.length + 1, d = a.length > 0 ? a[0].block : 0, g = 0; g < a.length; g++) (function (t) {
                            var e = o.name + l + t.block;
                            i(f.get(e), function (e, i) {
                                return e ? r(e) : (s[t.block - d] = i.target.result ? h(i.target.result.subarray(t.start, t.end)) : c(t.end - t.start), void(0 === --p && r(null, n.concat(s))))
                            })
                        })(a[g]);
                        0 === --p && r(null, n.concat(s))
                    })
                }, r.prototype._write = function (t, e, n) {
                    function r(r, i, s) {
                        for (var u = 0, f = 0; u < i.length; u++) {
                            var a = i[u], h = a.end - a.start;
                            h === o.size ? block = e.slice(f, f + h) : (block = s[u], e.copy(block, a.start, f, f + h)), r.put(block, o.name + l + a.block), f += h
                        }
                        var c = Math.max(o.length || 0, t + e.length);
                        r.put(c, o.name + l + "length"), r.transaction.addEventListener("complete", function () {
                            o.length = c, n(null)
                        }), r.transaction.addEventListener("error", n)
                    }

                    var o = this;
                    n = f(n), o._store("readwrite", function (s, u) {
                        if (s) return n(s);
                        for (var f = o._blocks(t, t + e.length), a = 1, p = {}, d = 0; d < f.length; d++) (function (t, e) {
                            if (t.end - t.start !== o.size) {
                                a++;
                                var s = o.name + l + t.block;
                                i(u.get(s), function (t, i) {
                                    return t ? n(t) : (p[e] = h(i.target.result || c(o.size)), void(0 === --a && r(u, f, p)))
                                })
                            }
                        })(f[d], d);
                        0 === --a && r(u, f, p)
                    })
                }, r.prototype._store = function (t, e) {
                    e = f(e);
                    var n = this;
                    n._getdb(function (n) {
                        var r = n.transaction(["data"], t), i = r.objectStore("data");
                        r.addEventListener("error", e), e(null, i)
                    })
                }, r.prototype._open = function (t) {
                    var e = this;
                    this._getdb(function (n) {
                        e._store("readonly", function (n, r) {
                            i(r.get(e.name + l + "length"), function (n, r) {
                                e.length = r.target.result || 0, t(null)
                            })
                        })
                    })
                }
            }).call(this, t("buffer").Buffer)
        }, {
            "./lib/blocks.js": 9,
            "abstract-random-access": 10,
            buffer: 1,
            "buffer-alloc": 11,
            "buffer-from": 14,
            inherits: 15,
            "next-tick": 16,
            once: 18
        }], 9: [function (t, e, n) {
            e.exports = function (t, e, n) {
                for (var r = [], i = Math.floor(e / t) * t; i < n; i += t) r.push({
                    block: Math.floor(i / t),
                    start: Math.max(i, e) % t,
                    end: Math.min(i + t, n) % t || t
                });
                return r
            }
        }, {}], 10: [function (t, e, n) {
            (function (n, r) {
                function i(t) {
                    return this instanceof i ? (u.call(this), this.opened = !1, this._opening = null, this._closing = null, void(t && (t.read && (this._read = t.read),
                    t.write && (this._write = t.write), t.open && (this._open = t.open), t.close && (this._close = t.close), t.end && (this._end = t.end), t.unlink && (this._unlink = t.unlink)))) : new i(t)
                }

                function o(t, e, n, r) {
                    t.open(function (i) {
                        return i ? r(i) : void t.write(e, n, r)
                    })
                }

                function s(t, e, n, r) {
                    t.open(function (i) {
                        return i ? r(i) : void t.read(e, n, r)
                    })
                }

                var u = t("events").EventEmitter, f = t("inherits"), a = function () {
                };
                e.exports = i, f(i, u), i.prototype.open = function (t) {
                    function e(t) {
                        t || (n.opened = !0);
                        var e = n._opening;
                        n._opening = null, n.emit("open");
                        for (var r = 0; r < e.length; r++) e[r](t)
                    }

                    if (t || (t = a), this.opened) return r.nextTick(t);
                    var n = this;
                    this._opening ? this._opening.push(t) : (this._opening = [t], this._open(e))
                }, i.prototype._open = function (t) {
                    r.nextTick(t)
                }, i.prototype.write = function (t, e, r) {
                    if (r || (r = a), "number" != typeof t) throw new Error("Scalar offset");
                    if (!n.isBuffer(e)) throw new Error("Buffer");
                    return this.opened ? void this._write(t, e, r) : o(this, t, e, r)
                }, i.prototype._write = function (t, e, n) {
                    r.nextTick(function () {
                        n(new Error("Write not implemented"))
                    })
                }, i.prototype.read = function (t, e, n) {
                    if ("number" != typeof t) throw new Error("Scalar offset");
                    if ("number" != typeof e) throw new Error("Scalar length");
                    if ("function" != typeof n) throw new Error("Callback");
                    return this.opened ? void this._read(t, e, n) : s(this, t, e, n)
                }, i.prototype._read = function (t, e, n) {
                    r.nextTick(function () {
                        n(new Error("Read not implemented"))
                    })
                }, i.prototype.close = function (t) {
                    function e(e) {
                        return e ? t(e) : void(r._closing ? r._closing.push(t) : (r._closing = [t], r._close(n)))
                    }

                    function n(t) {
                        t || (r.opened = !1);
                        var e = r._closing;
                        r._closing = null, r.emit("close");
                        for (var n = 0; n < e.length; n++) e[n](t)
                    }

                    t || (t = a);
                    var r = this;
                    this.opened ? e() : this.open(e)
                }, i.prototype._close = function (t) {
                    r.nextTick(t)
                }, i.prototype.end = function (t, e) {
                    function n(n) {
                        return n ? e(n) : void r._end(t, e)
                    }

                    if ("function" == typeof t) return this.end(null, t);
                    e || (e = a);
                    var r = this;
                    this.opened ? n() : this.open(n)
                }, i.prototype._end = function (t, e) {
                    r.nextTick(e)
                }, i.prototype.unlink = function (t) {
                    function e(e) {
                        return e ? t(e) : void n._unlink(t)
                    }

                    t || (t = a);
                    var n = this;
                    this.opened ? e() : this.open(e)
                }, i.prototype._unlink = function (t) {
                    r.nextTick(t)
                }
            }).call(this, {isBuffer: t("../../../../../../home/admin/browserify-cdn/node_modules/browserify/node_modules/insert-module-globals/node_modules/is-buffer/index.js")}, t("_process"))
        }, {
            "../../../../../../home/admin/browserify-cdn/node_modules/browserify/node_modules/insert-module-globals/node_modules/is-buffer/index.js": 6,
            _process: 7,
            events: 5,
            inherits: 15
        }], 11: [function (t, e, n) {
            (function (n) {
                var r = t("buffer-fill"), i = t("buffer-alloc-unsafe");
                e.exports = function (t, e, o) {
                    if ("number" != typeof t) throw new TypeError('"size" argument must be a number');
                    if (t < 0) throw new RangeError('"size" argument must not be negative');
                    if (n.alloc) return n.alloc(t, e, o);
                    var s = i(t);
                    return 0 === t ? s : void 0 === e ? r(s, 0) : ("string" != typeof o && (o = void 0), r(s, e, o))
                }
            }).call(this, t("buffer").Buffer)
        }, {buffer: 1, "buffer-alloc-unsafe": 12, "buffer-fill": 13}], 12: [function (t, e, n) {
            (function (t) {
                function n(e) {
                    if ("number" != typeof e) throw new TypeError('"size" argument must be a number');
                    if (e < 0) throw new RangeError('"size" argument must not be negative');
                    return t.allocUnsafe ? t.allocUnsafe(e) : new t(e)
                }

                e.exports = n
            }).call(this, t("buffer").Buffer)
        }, {buffer: 1}], 13: [function (t, e, n) {
            (function (t) {
                function n(t) {
                    return 1 === t.length && t.charCodeAt(0) < 256
                }

                function r(t, e, n, r) {
                    if (n < 0 || r > t.length) throw new RangeError("Out of range index");
                    return n >>>= 0, r = void 0 === r ? t.length : r >>> 0, r > n && t.fill(e, n, r), t
                }

                function i(t, e, n, r) {
                    if (n < 0 || r > t.length) throw new RangeError("Out of range index");
                    if (r <= n) return t;
                    n >>>= 0, r = void 0 === r ? t.length : r >>> 0;
                    for (var i = n, o = e.length; i <= r - o;) e.copy(t, i), i += o;
                    return i !== r && e.copy(t, i, 0, r - i), t
                }

                function o(e, o, u, f, a) {
                    if (s) return e.fill(o, u, f, a);
                    if ("number" == typeof o) return r(e, o, u, f);
                    if ("string" == typeof o) {
                        if ("string" == typeof u ? (a = u, u = 0, f = e.length) : "string" == typeof f && (a = f, f = e.length), void 0 !== a && "string" != typeof a) throw new TypeError("encoding must be a string");
                        if ("latin1" === a && (a = "binary"), "string" == typeof a && !t.isEncoding(a)) throw new TypeError("Unknown encoding: " + a);
                        if ("" === o) return r(e, 0, u, f);
                        if (n(o)) return r(e, o.charCodeAt(0), u, f);
                        o = new t(o, a)
                    }
                    return t.isBuffer(o) ? i(e, o, u, f) : r(e, 0, u, f)
                }

                var s = function () {
                    try {
                        if (!t.isEncoding("latin1")) return !1;
                        var e = t.alloc ? t.alloc(4) : new t(4);
                        return e.fill("ab", "ucs2"), "61006200" === e.toString("hex")
                    } catch (t) {
                        return !1
                    }
                }();
                e.exports = o
            }).call(this, t("buffer").Buffer)
        }, {buffer: 1}], 14: [function (t, e, n) {
            (function (t) {
                function n(t) {
                    return "ArrayBuffer" === s.call(t).slice(8, -1)
                }

                function r(e, n, r) {
                    n >>>= 0;
                    var i = e.byteLength - n;
                    if (i < 0) throw new RangeError("'offset' is out of bounds");
                    if (void 0 === r) r = i; else if (r >>>= 0, r > i) throw new RangeError("'length' is out of bounds");
                    return u ? t.from(e.slice(n, n + r)) : new t(new Uint8Array(e.slice(n, n + r)))
                }

                function i(e, n) {
                    if ("string" == typeof n && "" !== n || (n = "utf8"), !t.isEncoding(n)) throw new TypeError('"encoding" must be a valid string encoding');
                    return u ? t.from(e, n) : new t(e, n)
                }

                function o(e, o, s) {
                    if ("number" == typeof e) throw new TypeError('"value" argument must not be a number');
                    return n(e) ? r(e, o, s) : "string" == typeof e ? i(e, o) : u ? t.from(e) : new t(e)
                }

                var s = Object.prototype.toString,
                    u = "function" == typeof t.alloc && "function" == typeof t.allocUnsafe && "function" == typeof t.from;
                e.exports = o
            }).call(this, t("buffer").Buffer)
        }, {buffer: 1}], 15: [function (t, e, n) {
            "function" == typeof Object.create ? e.exports = function (t, e) {
                t.super_ = e, t.prototype = Object.create(e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                })
            } : e.exports = function (t, e) {
                t.super_ = e;
                var n = function () {
                };
                n.prototype = e.prototype, t.prototype = new n, t.prototype.constructor = t
            }
        }, {}], 16: [function (t, e, n) {
            (function (t) {
                "use strict";
                var n, r;
                n = function (t) {
                    if ("function" != typeof t) throw new TypeError(t + " is not a function");
                    return t
                }, r = function (t) {
                    var e, r, i = document.createTextNode(""), o = 0;
                    return new t(function () {
                        var t;
                        if (e) r && (e = r.concat(e)); else {
                            if (!r) return;
                            e = r
                        }
                        if (r = e, e = null, "function" == typeof r) return t = r, r = null, void t();
                        for (i.data = o = ++o % 2; r;) t = r.shift(), r.length || (r = null), t()
                    }).observe(i, {characterData: !0}), function (t) {
                        return n(t), e ? void("function" == typeof e ? e = [e, t] : e.push(t)) : (e = t, void(i.data = o = ++o % 2))
                    }
                }, e.exports = function () {
                    if ("object" == typeof t && t && "function" == typeof t.nextTick) return t.nextTick;
                    if ("object" == typeof document && document) {
                        if ("function" == typeof MutationObserver) return r(MutationObserver);
                        if ("function" == typeof WebKitMutationObserver) return r(WebKitMutationObserver)
                    }
                    return "function" == typeof setImmediate ? function (t) {
                        setImmediate(n(t))
                    } : "function" == typeof setTimeout || "object" == typeof setTimeout ? function (t) {
                        setTimeout(n(t), 0)
                    } : null
                }()
            }).call(this, t("_process"))
        }, {_process: 7}], 17: [function (t, e, n) {
            function r(t, e) {
                function n() {
                    for (var e = new Array(arguments.length), n = 0; n < e.length; n++) e[n] = arguments[n];
                    var r = t.apply(this, e), i = e[e.length - 1];
                    return "function" == typeof r && r !== i && Object.keys(i).forEach(function (t) {
                        r[t] = i[t]
                    }), r
                }

                if (t && e) return r(t)(e);
                if ("function" != typeof t) throw new TypeError("need wrapper function");
                return Object.keys(t).forEach(function (e) {
                    n[e] = t[e]
                }), n
            }

            e.exports = r
        }, {}], 18: [function (t, e, n) {
            function r(t) {
                var e = function () {
                    return e.called ? e.value : (e.called = !0, e.value = t.apply(this, arguments))
                };
                return e.called = !1, e
            }

            function i(t) {
                var e = function () {
                    if (e.called) throw new Error(e.onceError);
                    return e.called = !0, e.value = t.apply(this, arguments)
                }, n = t.name || "Function wrapped with `once`";
                return e.onceError = n + " shouldn't be called more than once", e.called = !1, e
            }

            var o = t("wrappy");
            e.exports = o(r), e.exports.strict = o(i), r.proto = r(function () {
                Object.defineProperty(Function.prototype, "once", {
                    value: function () {
                        return r(this)
                    }, configurable: !0
                }), Object.defineProperty(Function.prototype, "onceStrict", {
                    value: function () {
                        return i(this)
                    }, configurable: !0
                })
            })
        }, {wrappy: 17}]
    }, {}, [8])(8)
});