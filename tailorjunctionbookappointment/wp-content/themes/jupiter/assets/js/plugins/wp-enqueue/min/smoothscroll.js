! function() {
    var u, c, d, o = {
            frameRate: 150,
            animationTime: 400,
            stepSize: 100,
            pulseAlgorithm: !0,
            pulseScale: 4,
            pulseNormalize: 1,
            accelerationDelta: 50,
            accelerationMax: 3,
            keyboardSupport: !0,
            arrowScroll: 50,
            touchpadSupport: !0,
            fixedBackground: !0,
            excluded: ""
        },
        p = o,
        s = !1,
        m = !1,
        r = {
            x: 0,
            y: 0
        },
        f = !1,
        w = document.documentElement,
        a = [],
        i = /^Mac/.test(navigator.platform),
        h = {
            left: 37,
            up: 38,
            right: 39,
            down: 40,
            spacebar: 32,
            pageup: 33,
            pagedown: 34,
            end: 35,
            home: 36
        };

    function l() {
        var e, t, o, n, r, a, i, l;
        !f && document.body && (f = !0, e = document.body, t = document.documentElement, o = window.innerHeight, n = e.scrollHeight, r = function() {
            var e = document.querySelector("#wpadminbar");
            return e ? w.scrollHeight - e.offsetHeight : w.scrollHeight
        }, w = 0 <= document.compatMode.indexOf("CSS") ? t : e, u = e, p.keyboardSupport && B("keydown", S), top != self ? m = !0 : o < n && (e.offsetHeight <= o || t.offsetHeight <= o) && ((a = document.createElement("div")).style.cssText = "position:absolute; z-index:-10000; top:0; left:0; right:0; height:" + r() + "px", document.body.appendChild(a), d = function() {
            i = i || setTimeout(function() {
                s || (a.style.height = "0", a.style.height = r() + "px", i = null)
            }, 500)
        }, setTimeout(d, 10), B("resize", d), window.addResizeListener(document.getElementById("mk-theme-container"), d), (c = new q(d)).observe(e, {
            attributes: !0,
            childList: !0,
            characterData: !1
        }), w.offsetHeight <= o && ((l = document.createElement("div")).style.clear = "both", e.appendChild(l))), p.fixedBackground || s || (e.style.backgroundAttachment = "scroll", t.style.backgroundAttachment = "scroll"))
    }
    var b = [],
        g = !1,
        y = Date.now();

    function v(s, m, f) {
        var e, t, o, n, w, h;
        e = 0 < (e = m) ? 1 : -1, t = 0 < (t = f) ? 1 : -1, r.x === e && r.y === t || (r.x = e, r.y = t, b = [], y = 0), 1 != p.accelerationMax && ((o = Date.now() - y) < p.accelerationDelta && (1 < (n = (1 + 50 / o) / 2) && (n = Math.min(n, p.accelerationMax), m *= n, f *= n)), y = Date.now()), b.push({
            x: m,
            y: f,
            lastX: m < 0 ? .99 : -.99,
            lastY: f < 0 ? .99 : -.99,
            start: Date.now()
        }), g || (w = s === document.body, h = function(e) {
            for (var t = Date.now(), o = 0, n = 0, r = 0; r < b.length; r++) {
                var a = b[r],
                    i = t - a.start,
                    l = i >= p.animationTime,
                    c = l ? 1 : i / p.animationTime;
                p.pulseAlgorithm && (c = j(c));
                var u = a.x * c - a.lastX >> 0,
                    d = a.y * c - a.lastY >> 0;
                o += u, n += d, a.lastX += u, a.lastY += d, l && (b.splice(r, 1), r--)
            }
            w ? window.scrollBy(o, n) : (o && (s.scrollLeft += o), n && (s.scrollTop += n)), m || f || (b = []), b.length ? K(h, s, 1e3 / p.frameRate + 1) : g = !1
        }, K(h, s, 0), g = !0)
    }

    function e(e) {
        f || l();
        var t = e.target,
            o = H(t);
        if (!o || e.defaultPrevented || e.ctrlKey) return !0;
        if (Y(u, "embed") || Y(t, "embed") && /\.pdf/i.test(t.src) || Y(u, "object")) return !0;
        var n = -e.wheelDeltaX || e.deltaX || 0,
            r = -e.wheelDeltaY || e.deltaY || 0;
        if (i && (p.touchpadSupport = !1, e.wheelDeltaX && A(e.wheelDeltaX, 120) && (n = e.wheelDeltaX / Math.abs(e.wheelDeltaX) * -120), e.wheelDeltaY && A(e.wheelDeltaY, 120) && (r = e.wheelDeltaY / Math.abs(e.wheelDeltaY) * -120)), n || r || (r = -e.wheelDelta || 0), 1 === e.deltaMode && (n *= 40, r *= 40), !p.touchpadSupport && function(e) {
                if (!e) return;
                a.length || (a = [e, e, e]);
                return e = Math.abs(e), a.push(e), a.shift(), clearTimeout(k), k = setTimeout(function() {
                    window.localStorage && (localStorage.SS_deltaBuffer = a.join(","))
                }, 1e3), !N(120) && !N(100)
            }(r)) return !0;
        1.2 < Math.abs(n) && (n *= p.stepSize / 120), 1.2 < Math.abs(r) && (r *= p.stepSize / 120), v(o, n, r), T()
    }

    function S(e) {
        var t = e.target,
            o = e.ctrlKey || e.altKey || e.metaKey || e.shiftKey && e.keyCode !== h.spacebar;
        document.body.contains(u) || (u = document.activeElement);
        var n = /^(button|submit|radio|checkbox|file|color|image)$/i;
        if (/^(textarea|select|embed|object)$/i.test(t.nodeName) || Y(t, "input") && !n.test(t.type) || Y(u, "video") || function(e) {
                var t = e.target,
                    o = !1;
                if (-1 != document.URL.indexOf("www.youtube.com/watch"))
                    do {
                        if (o = t.classList && t.classList.contains("html5-video-controls")) break
                    } while (t = t.parentNode);
                return o
            }(e) || t.isContentEditable || e.defaultPrevented || o) return !0;
        if ((Y(t, "button") || Y(t, "input") && n.test(t.type)) && e.keyCode === h.spacebar) return !0;
        var r = 0,
            a = 0,
            i = H(u),
            l = i.clientHeight;
        switch (i == document.body && (l = window.innerHeight), e.keyCode) {
            case h.up:
                a = -p.arrowScroll;
                break;
            case h.down:
                a = p.arrowScroll;
                break;
            case h.spacebar:
                a = -(e.shiftKey ? 1 : -1) * l * .9;
                break;
            case h.pageup:
                a = .9 * -l;
                break;
            case h.pagedown:
                a = .9 * l;
                break;
            case h.home:
                a = -i.scrollTop;
                break;
            case h.end:
                var c = i.scrollHeight - i.scrollTop - l,
                    a = 0 < c ? 10 + c : 0;
                break;
            case h.left:
                r = -p.arrowScroll;
                break;
            case h.right:
                r = p.arrowScroll;
                break;
            default:
                return !0
        }
        v(i, r, a), e.preventDefault(), T()
    }

    function t(e) {
        u = e.target
    }
    var n, x, k, D = (n = 0, function(e) {
            return e.uniqueID || (e.uniqueID = n++)
        }),
        M = {};

    function T() {
        clearTimeout(x), x = setInterval(function() {
            M = {}
        }, 1e3)
    }

    function E(e, t) {
        for (var o = e.length; o--;) M[D(e[o])] = t;
        return t
    }

    function H(e) {
        var t = [],
            o = document.body,
            n = w.scrollHeight;
        do {
            var r = M[D(e)];
            if (r) return E(t, r);
            if (t.push(e), n === e.scrollHeight) {
                var a = C(w) && C(o) || L(w);
                if (m && z(w) || !m && a) return E(t, R())
            } else if (z(e) && L(e)) return E(t, e)
        } while (e = e.parentElement)
    }

    function z(e) {
        return e.clientHeight + 10 < e.scrollHeight
    }

    function C(e) {
        return "hidden" !== getComputedStyle(e, "").getPropertyValue("overflow-y")
    }

    function L(e) {
        var t = getComputedStyle(e, "").getPropertyValue("overflow-y");
        return "scroll" === t || "auto" === t
    }

    function B(e, t) {
        window.addEventListener(e, t, !1)
    }

    function X(e, t) {
        window.removeEventListener(e, t, !1)
    }

    function Y(e, t) {
        return (e.nodeName || "").toLowerCase() === t.toLowerCase()
    }

    function A(e, t) {
        return Math.floor(e / t) == e / t
    }

    function N(e) {
        return A(a[0], e) && A(a[1], e) && A(a[2], e)
    }
    window.localStorage && localStorage.SS_deltaBuffer && (a = localStorage.SS_deltaBuffer.split(","));
    var O, K = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(e, t, o) {
            window.setTimeout(e, o || 1e3 / 60)
        },
        q = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver,
        R = function() {
            var e, t;
            return O || ((e = document.createElement("div")).style.cssText = "height:10000px;width:1px;", document.body.appendChild(e), t = document.body.scrollTop, document.documentElement.scrollTop, window.scrollBy(0, 3), O = document.body.scrollTop != t ? document.body : document.documentElement, window.scrollBy(0, -3), document.body.removeChild(e)), O
        };

    function P(e) {
        var t;
        return ((e *= p.pulseScale) < 1 ? e - (1 - Math.exp(-e)) : (--e, (t = Math.exp(-1)) + (1 - Math.exp(-e)) * (1 - t))) * p.pulseNormalize
    }

    function j(e) {
        return 1 <= e ? 1 : e <= 0 ? 0 : (1 == p.pulseNormalize && (p.pulseNormalize /= P(1)), P(e))
    }
    var I, F = window.navigator.userAgent,
        _ = /Trident/.test(F),
        V = /Edge/.test(F),
        W = /chrome/i.test(F) && !V,
        $ = (/safari/i.test(F), /mobile/i.test(F)),
        U = /Windows NT 6.1/i.test(F) && /rv:11/i.test(F),
        G = (W || U || _ || V) && !$;

    function J(e) {
        for (var t in e) o.hasOwnProperty(t) && (p[t] = e[t])
    }
    "onwheel" in document.createElement("div") ? I = "wheel" : "onmousewheel" in document.createElement("div") && (I = "mousewheel"), I && G && (B(I, e), B("mousedown", t), B("load", l)), J.destroy = function() {
        c && c.disconnect(), X(I, e), X("mousedown", t), X("keydown", S), X("resize", d), X("load", l)
    }, window.SmoothScrollOptions && J(window.SmoothScrollOptions), "function" == typeof define && define.amd ? define(function() {
        return J
    }) : "object" == typeof exports ? module.exports = J : window.SmoothScroll = J
}();