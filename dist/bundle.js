/*! For license information please see bundle.js.LICENSE.txt */
(() => {
  "use strict";
  var t = {
      776: (t, e, n) => {
        n.r(e), n.d(e, { default: () => rt });
        var r = {
            update: null,
            begin: null,
            loopBegin: null,
            changeBegin: null,
            change: null,
            changeComplete: null,
            loopComplete: null,
            complete: null,
            loop: 1,
            direction: "normal",
            autoplay: !0,
            timelineOffset: 0,
          },
          o = {
            duration: 1e3,
            delay: 0,
            endDelay: 0,
            easing: "easeOutElastic(1, .5)",
            round: 0,
          },
          a = [
            "translateX",
            "translateY",
            "translateZ",
            "rotate",
            "rotateX",
            "rotateY",
            "rotateZ",
            "scale",
            "scaleX",
            "scaleY",
            "scaleZ",
            "skew",
            "skewX",
            "skewY",
            "perspective",
            "matrix",
            "matrix3d",
          ],
          i = { CSS: {}, springs: {} };
        function u(t, e, n) {
          return Math.min(Math.max(t, e), n);
        }
        function c(t, e) {
          return t.indexOf(e) > -1;
        }
        function s(t, e) {
          return t.apply(null, e);
        }
        var l = {
          arr: function (t) {
            return Array.isArray(t);
          },
          obj: function (t) {
            return c(Object.prototype.toString.call(t), "Object");
          },
          pth: function (t) {
            return l.obj(t) && t.hasOwnProperty("totalLength");
          },
          svg: function (t) {
            return t instanceof SVGElement;
          },
          inp: function (t) {
            return t instanceof HTMLInputElement;
          },
          dom: function (t) {
            return t.nodeType || l.svg(t);
          },
          str: function (t) {
            return "string" == typeof t;
          },
          fnc: function (t) {
            return "function" == typeof t;
          },
          und: function (t) {
            return void 0 === t;
          },
          nil: function (t) {
            return l.und(t) || null === t;
          },
          hex: function (t) {
            return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(t);
          },
          rgb: function (t) {
            return /^rgb/.test(t);
          },
          hsl: function (t) {
            return /^hsl/.test(t);
          },
          col: function (t) {
            return l.hex(t) || l.rgb(t) || l.hsl(t);
          },
          key: function (t) {
            return (
              !r.hasOwnProperty(t) &&
              !o.hasOwnProperty(t) &&
              "targets" !== t &&
              "keyframes" !== t
            );
          },
        };
        function f(t) {
          var e = /\(([^)]+)\)/.exec(t);
          return e
            ? e[1].split(",").map(function (t) {
                return parseFloat(t);
              })
            : [];
        }
        function d(t, e) {
          var n = f(t),
            r = u(l.und(n[0]) ? 1 : n[0], 0.1, 100),
            o = u(l.und(n[1]) ? 100 : n[1], 0.1, 100),
            a = u(l.und(n[2]) ? 10 : n[2], 0.1, 100),
            c = u(l.und(n[3]) ? 0 : n[3], 0.1, 100),
            s = Math.sqrt(o / r),
            d = a / (2 * Math.sqrt(o * r)),
            p = d < 1 ? s * Math.sqrt(1 - d * d) : 0,
            h = d < 1 ? (d * s - c) / p : -c + s;
          function y(t) {
            var n = e ? (e * t) / 1e3 : t;
            return (
              (n =
                d < 1
                  ? Math.exp(-n * d * s) *
                    (1 * Math.cos(p * n) + h * Math.sin(p * n))
                  : (1 + h * n) * Math.exp(-n * s)),
              0 === t || 1 === t ? t : 1 - n
            );
          }
          return e
            ? y
            : function () {
                var e = i.springs[t];
                if (e) return e;
                for (var n = 1 / 6, r = 0, o = 0; ; )
                  if (1 === y((r += n))) {
                    if (++o >= 16) break;
                  } else o = 0;
                var a = r * n * 1e3;
                return (i.springs[t] = a), a;
              };
        }
        function p(t) {
          return (
            void 0 === t && (t = 10),
            function (e) {
              return Math.ceil(u(e, 1e-6, 1) * t) * (1 / t);
            }
          );
        }
        var h,
          y,
          v = (function () {
            var t = 0.1;
            function e(t, e) {
              return 1 - 3 * e + 3 * t;
            }
            function n(t, e) {
              return 3 * e - 6 * t;
            }
            function r(t) {
              return 3 * t;
            }
            function o(t, o, a) {
              return ((e(o, a) * t + n(o, a)) * t + r(o)) * t;
            }
            function a(t, o, a) {
              return 3 * e(o, a) * t * t + 2 * n(o, a) * t + r(o);
            }
            return function (e, n, r, i) {
              if (0 <= e && e <= 1 && 0 <= r && r <= 1) {
                var u = new Float32Array(11);
                if (e !== n || r !== i)
                  for (var c = 0; c < 11; ++c) u[c] = o(c * t, e, r);
                return function (c) {
                  return (e === n && r === i) || 0 === c || 1 === c
                    ? c
                    : o(
                        (function (n) {
                          for (var i = 0, c = 1; 10 !== c && u[c] <= n; ++c)
                            i += t;
                          --c;
                          var s = i + ((n - u[c]) / (u[c + 1] - u[c])) * t,
                            l = a(s, e, r);
                          return l >= 0.001
                            ? (function (t, e, n, r) {
                                for (var i = 0; i < 4; ++i) {
                                  var u = a(e, n, r);
                                  if (0 === u) return e;
                                  e -= (o(e, n, r) - t) / u;
                                }
                                return e;
                              })(n, s, e, r)
                            : 0 === l
                              ? s
                              : (function (t, e, n, r, a) {
                                  var i,
                                    u,
                                    c = 0;
                                  do {
                                    (i = o((u = e + (n - e) / 2), r, a) - t) > 0
                                      ? (n = u)
                                      : (e = u);
                                  } while (Math.abs(i) > 1e-7 && ++c < 10);
                                  return u;
                                })(n, i, i + t, e, r);
                        })(c),
                        n,
                        i,
                      );
                };
              }
            };
          })(),
          m =
            ((h = {
              linear: function () {
                return function (t) {
                  return t;
                };
              },
            }),
            (y = {
              Sine: function () {
                return function (t) {
                  return 1 - Math.cos((t * Math.PI) / 2);
                };
              },
              Expo: function () {
                return function (t) {
                  return t ? Math.pow(2, 10 * t - 10) : 0;
                };
              },
              Circ: function () {
                return function (t) {
                  return 1 - Math.sqrt(1 - t * t);
                };
              },
              Back: function () {
                return function (t) {
                  return t * t * (3 * t - 2);
                };
              },
              Bounce: function () {
                return function (t) {
                  for (var e, n = 4; t < ((e = Math.pow(2, --n)) - 1) / 11; );
                  return (
                    1 / Math.pow(4, 3 - n) -
                    7.5625 * Math.pow((3 * e - 2) / 22 - t, 2)
                  );
                };
              },
              Elastic: function (t, e) {
                void 0 === t && (t = 1), void 0 === e && (e = 0.5);
                var n = u(t, 1, 10),
                  r = u(e, 0.1, 2);
                return function (t) {
                  return 0 === t || 1 === t
                    ? t
                    : -n *
                        Math.pow(2, 10 * (t - 1)) *
                        Math.sin(
                          ((t - 1 - (r / (2 * Math.PI)) * Math.asin(1 / n)) *
                            (2 * Math.PI)) /
                            r,
                        );
                };
              },
            }),
            ["Quad", "Cubic", "Quart", "Quint"].forEach(function (t, e) {
              y[t] = function () {
                return function (t) {
                  return Math.pow(t, e + 2);
                };
              };
            }),
            Object.keys(y).forEach(function (t) {
              var e = y[t];
              (h["easeIn" + t] = e),
                (h["easeOut" + t] = function (t, n) {
                  return function (r) {
                    return 1 - e(t, n)(1 - r);
                  };
                }),
                (h["easeInOut" + t] = function (t, n) {
                  return function (r) {
                    return r < 0.5
                      ? e(t, n)(2 * r) / 2
                      : 1 - e(t, n)(-2 * r + 2) / 2;
                  };
                }),
                (h["easeOutIn" + t] = function (t, n) {
                  return function (r) {
                    return r < 0.5
                      ? (1 - e(t, n)(1 - 2 * r)) / 2
                      : (e(t, n)(2 * r - 1) + 1) / 2;
                  };
                });
            }),
            h);
        function b(t, e) {
          if (l.fnc(t)) return t;
          var n = t.split("(")[0],
            r = m[n],
            o = f(t);
          switch (n) {
            case "spring":
              return d(t, e);
            case "cubicBezier":
              return s(v, o);
            case "steps":
              return s(p, o);
            default:
              return s(r, o);
          }
        }
        function g(t) {
          try {
            return document.querySelectorAll(t);
          } catch (t) {
            return;
          }
        }
        function w(t, e) {
          for (
            var n = t.length,
              r = arguments.length >= 2 ? arguments[1] : void 0,
              o = [],
              a = 0;
            a < n;
            a++
          )
            if (a in t) {
              var i = t[a];
              e.call(r, i, a, t) && o.push(i);
            }
          return o;
        }
        function x(t) {
          return t.reduce(function (t, e) {
            return t.concat(l.arr(e) ? x(e) : e);
          }, []);
        }
        function E(t) {
          return l.arr(t)
            ? t
            : (l.str(t) && (t = g(t) || t),
              t instanceof NodeList || t instanceof HTMLCollection
                ? [].slice.call(t)
                : [t]);
        }
        function k(t, e) {
          return t.some(function (t) {
            return t === e;
          });
        }
        function O(t) {
          var e = {};
          for (var n in t) e[n] = t[n];
          return e;
        }
        function j(t, e) {
          var n = O(t);
          for (var r in t) n[r] = e.hasOwnProperty(r) ? e[r] : t[r];
          return n;
        }
        function S(t, e) {
          var n = O(t);
          for (var r in e) n[r] = l.und(t[r]) ? e[r] : t[r];
          return n;
        }
        function T(t) {
          var e =
            /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(
              t,
            );
          if (e) return e[1];
        }
        function P(t, e) {
          return l.fnc(t) ? t(e.target, e.id, e.total) : t;
        }
        function M(t, e) {
          return t.getAttribute(e);
        }
        function L(t, e, n) {
          if (k([n, "deg", "rad", "turn"], T(e))) return e;
          var r = i.CSS[e + n];
          if (!l.und(r)) return r;
          var o = document.createElement(t.tagName),
            a =
              t.parentNode && t.parentNode !== document
                ? t.parentNode
                : document.body;
          a.appendChild(o),
            (o.style.position = "absolute"),
            (o.style.width = 100 + n);
          var u = 100 / o.offsetWidth;
          a.removeChild(o);
          var c = u * parseFloat(e);
          return (i.CSS[e + n] = c), c;
        }
        function A(t, e, n) {
          if (e in t.style) {
            var r = e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
              o = t.style[e] || getComputedStyle(t).getPropertyValue(r) || "0";
            return n ? L(t, o, n) : o;
          }
        }
        function C(t, e) {
          return l.dom(t) &&
            !l.inp(t) &&
            (!l.nil(M(t, e)) || (l.svg(t) && t[e]))
            ? "attribute"
            : l.dom(t) && k(a, e)
              ? "transform"
              : l.dom(t) && "transform" !== e && A(t, e)
                ? "css"
                : null != t[e]
                  ? "object"
                  : void 0;
        }
        function I(t) {
          if (l.dom(t)) {
            for (
              var e,
                n = t.style.transform || "",
                r = /(\w+)\(([^)]*)\)/g,
                o = new Map();
              (e = r.exec(n));

            )
              o.set(e[1], e[2]);
            return o;
          }
        }
        function _(t, e, n, r) {
          switch (C(t, e)) {
            case "transform":
              return (function (t, e, n, r) {
                var o = c(e, "scale")
                    ? 1
                    : 0 +
                      (function (t) {
                        return c(t, "translate") || "perspective" === t
                          ? "px"
                          : c(t, "rotate") || c(t, "skew")
                            ? "deg"
                            : void 0;
                      })(e),
                  a = I(t).get(e) || o;
                return (
                  n && (n.transforms.list.set(e, a), (n.transforms.last = e)),
                  r ? L(t, a, r) : a
                );
              })(t, e, r, n);
            case "css":
              return A(t, e, n);
            case "attribute":
              return M(t, e);
            default:
              return t[e] || 0;
          }
        }
        function B(t, e) {
          var n = /^(\*=|\+=|-=)/.exec(t);
          if (!n) return t;
          var r = T(t) || 0,
            o = parseFloat(e),
            a = parseFloat(t.replace(n[0], ""));
          switch (n[0][0]) {
            case "+":
              return o + a + r;
            case "-":
              return o - a + r;
            case "*":
              return o * a + r;
          }
        }
        function D(t, e) {
          if (l.col(t))
            return (function (t) {
              return l.rgb(t)
                ? (n = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec((e = t)))
                  ? "rgba(" + n[1] + ",1)"
                  : e
                : l.hex(t)
                  ? (function (t) {
                      var e = t.replace(
                          /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
                          function (t, e, n, r) {
                            return e + e + n + n + r + r;
                          },
                        ),
                        n = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
                      return (
                        "rgba(" +
                        parseInt(n[1], 16) +
                        "," +
                        parseInt(n[2], 16) +
                        "," +
                        parseInt(n[3], 16) +
                        ",1)"
                      );
                    })(t)
                  : l.hsl(t)
                    ? (function (t) {
                        var e,
                          n,
                          r,
                          o =
                            /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(t) ||
                            /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(
                              t,
                            ),
                          a = parseInt(o[1], 10) / 360,
                          i = parseInt(o[2], 10) / 100,
                          u = parseInt(o[3], 10) / 100,
                          c = o[4] || 1;
                        function s(t, e, n) {
                          return (
                            n < 0 && (n += 1),
                            n > 1 && (n -= 1),
                            n < 1 / 6
                              ? t + 6 * (e - t) * n
                              : n < 0.5
                                ? e
                                : n < 2 / 3
                                  ? t + (e - t) * (2 / 3 - n) * 6
                                  : t
                          );
                        }
                        if (0 == i) e = n = r = u;
                        else {
                          var l = u < 0.5 ? u * (1 + i) : u + i - u * i,
                            f = 2 * u - l;
                          (e = s(f, l, a + 1 / 3)),
                            (n = s(f, l, a)),
                            (r = s(f, l, a - 1 / 3));
                        }
                        return (
                          "rgba(" +
                          255 * e +
                          "," +
                          255 * n +
                          "," +
                          255 * r +
                          "," +
                          c +
                          ")"
                        );
                      })(t)
                    : void 0;
              var e, n;
            })(t);
          if (/\s/g.test(t)) return t;
          var n = T(t),
            r = n ? t.substr(0, t.length - n.length) : t;
          return e ? r + e : r;
        }
        function N(t, e) {
          return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
        }
        function F(t) {
          for (var e, n = t.points, r = 0, o = 0; o < n.numberOfItems; o++) {
            var a = n.getItem(o);
            o > 0 && (r += N(e, a)), (e = a);
          }
          return r;
        }
        function R(t) {
          if (t.getTotalLength) return t.getTotalLength();
          switch (t.tagName.toLowerCase()) {
            case "circle":
              return (function (t) {
                return 2 * Math.PI * M(t, "r");
              })(t);
            case "rect":
              return (function (t) {
                return 2 * M(t, "width") + 2 * M(t, "height");
              })(t);
            case "line":
              return (function (t) {
                return N(
                  { x: M(t, "x1"), y: M(t, "y1") },
                  { x: M(t, "x2"), y: M(t, "y2") },
                );
              })(t);
            case "polyline":
              return F(t);
            case "polygon":
              return (function (t) {
                var e = t.points;
                return F(t) + N(e.getItem(e.numberOfItems - 1), e.getItem(0));
              })(t);
          }
        }
        function H(t, e) {
          var n = e || {},
            r =
              n.el ||
              (function (t) {
                for (var e = t.parentNode; l.svg(e) && l.svg(e.parentNode); )
                  e = e.parentNode;
                return e;
              })(t),
            o = r.getBoundingClientRect(),
            a = M(r, "viewBox"),
            i = o.width,
            u = o.height,
            c = n.viewBox || (a ? a.split(" ") : [0, 0, i, u]);
          return {
            el: r,
            viewBox: c,
            x: c[0] / 1,
            y: c[1] / 1,
            w: i,
            h: u,
            vW: c[2],
            vH: c[3],
          };
        }
        function Z(t, e, n) {
          function r(n) {
            void 0 === n && (n = 0);
            var r = e + n >= 1 ? e + n : 0;
            return t.el.getPointAtLength(r);
          }
          var o = H(t.el, t.svg),
            a = r(),
            i = r(-1),
            u = r(1),
            c = n ? 1 : o.w / o.vW,
            s = n ? 1 : o.h / o.vH;
          switch (t.property) {
            case "x":
              return (a.x - o.x) * c;
            case "y":
              return (a.y - o.y) * s;
            case "angle":
              return (180 * Math.atan2(u.y - i.y, u.x - i.x)) / Math.PI;
          }
        }
        function z(t, e) {
          var n = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g,
            r = D(l.pth(t) ? t.totalLength : t, e) + "";
          return {
            original: r,
            numbers: r.match(n) ? r.match(n).map(Number) : [0],
            strings: l.str(t) || e ? r.split(n) : [],
          };
        }
        function q(t) {
          return w(t ? x(l.arr(t) ? t.map(E) : E(t)) : [], function (t, e, n) {
            return n.indexOf(t) === e;
          });
        }
        function G(t) {
          var e = q(t);
          return e.map(function (t, n) {
            return {
              target: t,
              id: n,
              total: e.length,
              transforms: { list: I(t) },
            };
          });
        }
        function W(t, e) {
          var n = O(e);
          if (
            (/^spring/.test(n.easing) && (n.duration = d(n.easing)), l.arr(t))
          ) {
            var r = t.length;
            2 !== r || l.obj(t[0])
              ? l.fnc(e.duration) || (n.duration = e.duration / r)
              : (t = { value: t });
          }
          var o = l.arr(t) ? t : [t];
          return o
            .map(function (t, n) {
              var r = l.obj(t) && !l.pth(t) ? t : { value: t };
              return (
                l.und(r.delay) && (r.delay = n ? 0 : e.delay),
                l.und(r.endDelay) &&
                  (r.endDelay = n === o.length - 1 ? e.endDelay : 0),
                r
              );
            })
            .map(function (t) {
              return S(t, n);
            });
        }
        var Y = {
          css: function (t, e, n) {
            return (t.style[e] = n);
          },
          attribute: function (t, e, n) {
            return t.setAttribute(e, n);
          },
          object: function (t, e, n) {
            return (t[e] = n);
          },
          transform: function (t, e, n, r, o) {
            if ((r.list.set(e, n), e === r.last || o)) {
              var a = "";
              r.list.forEach(function (t, e) {
                a += e + "(" + t + ") ";
              }),
                (t.style.transform = a);
            }
          },
        };
        function U(t, e) {
          G(t).forEach(function (t) {
            for (var n in e) {
              var r = P(e[n], t),
                o = t.target,
                a = T(r),
                i = _(o, n, a, t),
                u = B(D(r, a || T(i)), i),
                c = C(o, n);
              Y[c](o, n, u, t.transforms, !0);
            }
          });
        }
        function V(t, e) {
          return w(
            x(
              t.map(function (t) {
                return e.map(function (e) {
                  return (function (t, e) {
                    var n = C(t.target, e.name);
                    if (n) {
                      var r = (function (t, e) {
                          var n;
                          return t.tweens.map(function (r) {
                            var o = (function (t, e) {
                                var n = {};
                                for (var r in t) {
                                  var o = P(t[r], e);
                                  l.arr(o) &&
                                    1 ===
                                      (o = o.map(function (t) {
                                        return P(t, e);
                                      })).length &&
                                    (o = o[0]),
                                    (n[r] = o);
                                }
                                return (
                                  (n.duration = parseFloat(n.duration)),
                                  (n.delay = parseFloat(n.delay)),
                                  n
                                );
                              })(r, e),
                              a = o.value,
                              i = l.arr(a) ? a[1] : a,
                              u = T(i),
                              c = _(e.target, t.name, u, e),
                              s = n ? n.to.original : c,
                              f = l.arr(a) ? a[0] : s,
                              d = T(f) || T(c),
                              p = u || d;
                            return (
                              l.und(i) && (i = s),
                              (o.from = z(f, p)),
                              (o.to = z(B(i, f), p)),
                              (o.start = n ? n.end : 0),
                              (o.end =
                                o.start + o.delay + o.duration + o.endDelay),
                              (o.easing = b(o.easing, o.duration)),
                              (o.isPath = l.pth(a)),
                              (o.isPathTargetInsideSVG =
                                o.isPath && l.svg(e.target)),
                              (o.isColor = l.col(o.from.original)),
                              o.isColor && (o.round = 1),
                              (n = o),
                              o
                            );
                          });
                        })(e, t),
                        o = r[r.length - 1];
                      return {
                        type: n,
                        property: e.name,
                        animatable: t,
                        tweens: r,
                        duration: o.end,
                        delay: r[0].delay,
                        endDelay: o.endDelay,
                      };
                    }
                  })(t, e);
                });
              }),
            ),
            function (t) {
              return !l.und(t);
            },
          );
        }
        function $(t, e) {
          var n = t.length,
            r = function (t) {
              return t.timelineOffset ? t.timelineOffset : 0;
            },
            o = {};
          return (
            (o.duration = n
              ? Math.max.apply(
                  Math,
                  t.map(function (t) {
                    return r(t) + t.duration;
                  }),
                )
              : e.duration),
            (o.delay = n
              ? Math.min.apply(
                  Math,
                  t.map(function (t) {
                    return r(t) + t.delay;
                  }),
                )
              : e.delay),
            (o.endDelay = n
              ? o.duration -
                Math.max.apply(
                  Math,
                  t.map(function (t) {
                    return r(t) + t.duration - t.endDelay;
                  }),
                )
              : e.endDelay),
            o
          );
        }
        var X = 0,
          J = [],
          Q = (function () {
            var t;
            function e(n) {
              for (var r = J.length, o = 0; o < r; ) {
                var a = J[o];
                a.paused ? (J.splice(o, 1), r--) : (a.tick(n), o++);
              }
              t = o > 0 ? requestAnimationFrame(e) : void 0;
            }
            return (
              "undefined" != typeof document &&
                document.addEventListener("visibilitychange", function () {
                  tt.suspendWhenDocumentHidden &&
                    (K()
                      ? (t = cancelAnimationFrame(t))
                      : (J.forEach(function (t) {
                          return t._onDocumentVisibility();
                        }),
                        Q()));
                }),
              function () {
                t ||
                  (K() && tt.suspendWhenDocumentHidden) ||
                  !(J.length > 0) ||
                  (t = requestAnimationFrame(e));
              }
            );
          })();
        function K() {
          return !!document && document.hidden;
        }
        function tt(t) {
          void 0 === t && (t = {});
          var e,
            n = 0,
            a = 0,
            i = 0,
            c = 0,
            s = null;
          function f(t) {
            var e =
              window.Promise &&
              new Promise(function (t) {
                return (s = t);
              });
            return (t.finished = e), e;
          }
          var d = (function (t) {
            var e = j(r, t),
              n = j(o, t),
              a = (function (t, e) {
                var n = [],
                  r = e.keyframes;
                for (var o in (r &&
                  (e = S(
                    (function (t) {
                      for (
                        var e = w(
                            x(
                              t.map(function (t) {
                                return Object.keys(t);
                              }),
                            ),
                            function (t) {
                              return l.key(t);
                            },
                          ).reduce(function (t, e) {
                            return t.indexOf(e) < 0 && t.push(e), t;
                          }, []),
                          n = {},
                          r = function (r) {
                            var o = e[r];
                            n[o] = t.map(function (t) {
                              var e = {};
                              for (var n in t)
                                l.key(n)
                                  ? n == o && (e.value = t[n])
                                  : (e[n] = t[n]);
                              return e;
                            });
                          },
                          o = 0;
                        o < e.length;
                        o++
                      )
                        r(o);
                      return n;
                    })(r),
                    e,
                  )),
                e))
                  l.key(o) && n.push({ name: o, tweens: W(e[o], t) });
                return n;
              })(n, t),
              i = G(t.targets),
              u = V(i, a),
              c = $(u, n),
              s = X;
            return (
              X++,
              S(e, {
                id: s,
                children: [],
                animatables: i,
                animations: u,
                duration: c.duration,
                delay: c.delay,
                endDelay: c.endDelay,
              })
            );
          })(t);
          function p() {
            var t = d.direction;
            "alternate" !== t &&
              (d.direction = "normal" !== t ? "normal" : "reverse"),
              (d.reversed = !d.reversed),
              e.forEach(function (t) {
                return (t.reversed = d.reversed);
              });
          }
          function h(t) {
            return d.reversed ? d.duration - t : t;
          }
          function y() {
            (n = 0), (a = h(d.currentTime) * (1 / tt.speed));
          }
          function v(t, e) {
            e && e.seek(t - e.timelineOffset);
          }
          function m(t) {
            for (var e = 0, n = d.animations, r = n.length; e < r; ) {
              var o = n[e],
                a = o.animatable,
                i = o.tweens,
                c = i.length - 1,
                s = i[c];
              c &&
                (s =
                  w(i, function (e) {
                    return t < e.end;
                  })[0] || s);
              for (
                var l = u(t - s.start - s.delay, 0, s.duration) / s.duration,
                  f = isNaN(l) ? 1 : s.easing(l),
                  p = s.to.strings,
                  h = s.round,
                  y = [],
                  v = s.to.numbers.length,
                  m = void 0,
                  b = 0;
                b < v;
                b++
              ) {
                var g = void 0,
                  x = s.to.numbers[b],
                  E = s.from.numbers[b] || 0;
                (g = s.isPath
                  ? Z(s.value, f * x, s.isPathTargetInsideSVG)
                  : E + f * (x - E)),
                  h && ((s.isColor && b > 2) || (g = Math.round(g * h) / h)),
                  y.push(g);
              }
              var k = p.length;
              if (k) {
                m = p[0];
                for (var O = 0; O < k; O++) {
                  p[O];
                  var j = p[O + 1],
                    S = y[O];
                  isNaN(S) || (m += j ? S + j : S + " ");
                }
              } else m = y[0];
              Y[o.type](a.target, o.property, m, a.transforms),
                (o.currentValue = m),
                e++;
            }
          }
          function b(t) {
            d[t] && !d.passThrough && d[t](d);
          }
          function g(t) {
            var r = d.duration,
              o = d.delay,
              l = r - d.endDelay,
              y = h(t);
            (d.progress = u((y / r) * 100, 0, 100)),
              (d.reversePlayback = y < d.currentTime),
              e &&
                (function (t) {
                  if (d.reversePlayback) for (var n = c; n--; ) v(t, e[n]);
                  else for (var r = 0; r < c; r++) v(t, e[r]);
                })(y),
              !d.began && d.currentTime > 0 && ((d.began = !0), b("begin")),
              !d.loopBegan &&
                d.currentTime > 0 &&
                ((d.loopBegan = !0), b("loopBegin")),
              y <= o && 0 !== d.currentTime && m(0),
              ((y >= l && d.currentTime !== r) || !r) && m(r),
              y > o && y < l
                ? (d.changeBegan ||
                    ((d.changeBegan = !0),
                    (d.changeCompleted = !1),
                    b("changeBegin")),
                  b("change"),
                  m(y))
                : d.changeBegan &&
                  ((d.changeCompleted = !0),
                  (d.changeBegan = !1),
                  b("changeComplete")),
              (d.currentTime = u(y, 0, r)),
              d.began && b("update"),
              t >= r &&
                ((a = 0),
                d.remaining && !0 !== d.remaining && d.remaining--,
                d.remaining
                  ? ((n = i),
                    b("loopComplete"),
                    (d.loopBegan = !1),
                    "alternate" === d.direction && p())
                  : ((d.paused = !0),
                    d.completed ||
                      ((d.completed = !0),
                      b("loopComplete"),
                      b("complete"),
                      !d.passThrough && "Promise" in window && (s(), f(d)))));
          }
          return (
            f(d),
            (d.reset = function () {
              var t = d.direction;
              (d.passThrough = !1),
                (d.currentTime = 0),
                (d.progress = 0),
                (d.paused = !0),
                (d.began = !1),
                (d.loopBegan = !1),
                (d.changeBegan = !1),
                (d.completed = !1),
                (d.changeCompleted = !1),
                (d.reversePlayback = !1),
                (d.reversed = "reverse" === t),
                (d.remaining = d.loop),
                (e = d.children);
              for (var n = (c = e.length); n--; ) d.children[n].reset();
              ((d.reversed && !0 !== d.loop) ||
                ("alternate" === t && 1 === d.loop)) &&
                d.remaining++,
                m(d.reversed ? d.duration : 0);
            }),
            (d._onDocumentVisibility = y),
            (d.set = function (t, e) {
              return U(t, e), d;
            }),
            (d.tick = function (t) {
              (i = t), n || (n = i), g((i + (a - n)) * tt.speed);
            }),
            (d.seek = function (t) {
              g(h(t));
            }),
            (d.pause = function () {
              (d.paused = !0), y();
            }),
            (d.play = function () {
              d.paused &&
                (d.completed && d.reset(),
                (d.paused = !1),
                J.push(d),
                y(),
                Q());
            }),
            (d.reverse = function () {
              p(), (d.completed = !d.reversed), y();
            }),
            (d.restart = function () {
              d.reset(), d.play();
            }),
            (d.remove = function (t) {
              nt(q(t), d);
            }),
            d.reset(),
            d.autoplay && d.play(),
            d
          );
        }
        function et(t, e) {
          for (var n = e.length; n--; )
            k(t, e[n].animatable.target) && e.splice(n, 1);
        }
        function nt(t, e) {
          var n = e.animations,
            r = e.children;
          et(t, n);
          for (var o = r.length; o--; ) {
            var a = r[o],
              i = a.animations;
            et(t, i), i.length || a.children.length || r.splice(o, 1);
          }
          n.length || r.length || e.pause();
        }
        (tt.version = "3.2.1"),
          (tt.speed = 1),
          (tt.suspendWhenDocumentHidden = !0),
          (tt.running = J),
          (tt.remove = function (t) {
            for (var e = q(t), n = J.length; n--; ) nt(e, J[n]);
          }),
          (tt.get = _),
          (tt.set = U),
          (tt.convertPx = L),
          (tt.path = function (t, e) {
            var n = l.str(t) ? g(t)[0] : t,
              r = e || 100;
            return function (t) {
              return {
                property: t,
                el: n,
                svg: H(n),
                totalLength: R(n) * (r / 100),
              };
            };
          }),
          (tt.setDashoffset = function (t) {
            var e = R(t);
            return t.setAttribute("stroke-dasharray", e), e;
          }),
          (tt.stagger = function (t, e) {
            void 0 === e && (e = {});
            var n = e.direction || "normal",
              r = e.easing ? b(e.easing) : null,
              o = e.grid,
              a = e.axis,
              i = e.from || 0,
              u = "first" === i,
              c = "center" === i,
              s = "last" === i,
              f = l.arr(t),
              d = f ? parseFloat(t[0]) : parseFloat(t),
              p = f ? parseFloat(t[1]) : 0,
              h = T(f ? t[1] : t) || 0,
              y = e.start || 0 + (f ? d : 0),
              v = [],
              m = 0;
            return function (t, e, l) {
              if (
                (u && (i = 0),
                c && (i = (l - 1) / 2),
                s && (i = l - 1),
                !v.length)
              ) {
                for (var b = 0; b < l; b++) {
                  if (o) {
                    var g = c ? (o[0] - 1) / 2 : i % o[0],
                      w = c ? (o[1] - 1) / 2 : Math.floor(i / o[0]),
                      x = g - (b % o[0]),
                      E = w - Math.floor(b / o[0]),
                      k = Math.sqrt(x * x + E * E);
                    "x" === a && (k = -x), "y" === a && (k = -E), v.push(k);
                  } else v.push(Math.abs(i - b));
                  m = Math.max.apply(Math, v);
                }
                r &&
                  (v = v.map(function (t) {
                    return r(t / m) * m;
                  })),
                  "reverse" === n &&
                    (v = v.map(function (t) {
                      return a ? (t < 0 ? -1 * t : -t) : Math.abs(m - t);
                    }));
              }
              return (
                y + (f ? (p - d) / m : d) * (Math.round(100 * v[e]) / 100) + h
              );
            };
          }),
          (tt.timeline = function (t) {
            void 0 === t && (t = {});
            var e = tt(t);
            return (
              (e.duration = 0),
              (e.add = function (n, r) {
                var a = J.indexOf(e),
                  i = e.children;
                function u(t) {
                  t.passThrough = !0;
                }
                a > -1 && J.splice(a, 1);
                for (var c = 0; c < i.length; c++) u(i[c]);
                var s = S(n, j(o, t));
                s.targets = s.targets || t.targets;
                var f = e.duration;
                (s.autoplay = !1),
                  (s.direction = e.direction),
                  (s.timelineOffset = l.und(r) ? f : B(r, f)),
                  u(e),
                  e.seek(s.timelineOffset);
                var d = tt(s);
                u(d), i.push(d);
                var p = $(i, t);
                return (
                  (e.delay = p.delay),
                  (e.endDelay = p.endDelay),
                  (e.duration = p.duration),
                  e.seek(0),
                  e.reset(),
                  e.autoplay && e.play(),
                  e
                );
              }),
              e
            );
          }),
          (tt.easing = b),
          (tt.penner = m),
          (tt.random = function (t, e) {
            return Math.floor(Math.random() * (e - t + 1)) + t;
          });
        const rt = tt;
      },
      974: () => {
        function t(e) {
          return (
            (t =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            t(e)
          );
        }
        function e(t, e) {
          for (var r = 0; r < e.length; r++) {
            var o = e[r];
            (o.enumerable = o.enumerable || !1),
              (o.configurable = !0),
              "value" in o && (o.writable = !0),
              Object.defineProperty(t, n(o.key), o);
          }
        }
        function n(e) {
          var n = (function (e) {
            if ("object" != t(e) || !e) return e;
            var n = e[Symbol.toPrimitive];
            if (void 0 !== n) {
              var r = n.call(e, "string");
              if ("object" != t(r)) return r;
              throw new TypeError(
                "@@toPrimitive must return a primitive value.",
              );
            }
            return String(e);
          })(e);
          return "symbol" == t(n) ? n : n + "";
        }
        function r(t) {
          var e = "function" == typeof Map ? new Map() : void 0;
          return (
            (r = function (t) {
              if (
                null === t ||
                !(function (t) {
                  try {
                    return (
                      -1 !== Function.toString.call(t).indexOf("[native code]")
                    );
                  } catch (e) {
                    return "function" == typeof t;
                  }
                })(t)
              )
                return t;
              if ("function" != typeof t)
                throw new TypeError(
                  "Super expression must either be null or a function",
                );
              if (void 0 !== e) {
                if (e.has(t)) return e.get(t);
                e.set(t, n);
              }
              function n() {
                return (function (t, e, n) {
                  if (o()) return Reflect.construct.apply(null, arguments);
                  var r = [null];
                  r.push.apply(r, e);
                  var i = new (t.bind.apply(t, r))();
                  return n && a(i, n.prototype), i;
                })(t, arguments, i(this).constructor);
              }
              return (
                (n.prototype = Object.create(t.prototype, {
                  constructor: {
                    value: n,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0,
                  },
                })),
                a(n, t)
              );
            }),
            r(t)
          );
        }
        function o() {
          try {
            var t = !Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {}),
            );
          } catch (t) {}
          return (o = function () {
            return !!t;
          })();
        }
        function a(t, e) {
          return (
            (a = Object.setPrototypeOf
              ? Object.setPrototypeOf.bind()
              : function (t, e) {
                  return (t.__proto__ = e), t;
                }),
            a(t, e)
          );
        }
        function i(t) {
          return (
            (i = Object.setPrototypeOf
              ? Object.getPrototypeOf.bind()
              : function (t) {
                  return t.__proto__ || Object.getPrototypeOf(t);
                }),
            i(t)
          );
        }
        var u = (function (n) {
          function r() {
            return (
              (function (t, e) {
                if (!(t instanceof e))
                  throw new TypeError("Cannot call a class as a function");
              })(this, r),
              (function (e, n, r) {
                return (
                  (n = i(n)),
                  (function (e, n) {
                    if (n && ("object" == t(n) || "function" == typeof n))
                      return n;
                    if (void 0 !== n)
                      throw new TypeError(
                        "Derived constructors may only return object or undefined",
                      );
                    return (function (t) {
                      if (void 0 === t)
                        throw new ReferenceError(
                          "this hasn't been initialised - super() hasn't been called",
                        );
                      return t;
                    })(e);
                  })(
                    e,
                    o()
                      ? Reflect.construct(n, r || [], i(e).constructor)
                      : n.apply(e, r),
                  )
                );
              })(this, r, arguments)
            );
          }
          return (
            (function (t, e) {
              if ("function" != typeof e && null !== e)
                throw new TypeError(
                  "Super expression must either be null or a function",
                );
              (t.prototype = Object.create(e && e.prototype, {
                constructor: { value: t, writable: !0, configurable: !0 },
              })),
                Object.defineProperty(t, "prototype", { writable: !1 }),
                e && a(t, e);
            })(r, n),
            (u = r),
            (c = [
              {
                key: "connectedCallback",
                value: function () {
                  this.innerHTML =
                    '\n      <header>\n        <h1>My Notes</h1>\n        <button id="add-note-btn">+ Add new</button>\n      </header>\n    ';
                },
              },
            ]) && e(u.prototype, c),
            Object.defineProperty(u, "prototype", { writable: !1 }),
            u
          );
          var u, c;
        })(r(HTMLElement));
        customElements.define("app-bar", u);
      },
      197: () => {
        function t(e) {
          return (
            (t =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            t(e)
          );
        }
        function e(t, e) {
          for (var r = 0; r < e.length; r++) {
            var o = e[r];
            (o.enumerable = o.enumerable || !1),
              (o.configurable = !0),
              "value" in o && (o.writable = !0),
              Object.defineProperty(t, n(o.key), o);
          }
        }
        function n(e) {
          var n = (function (e) {
            if ("object" != t(e) || !e) return e;
            var n = e[Symbol.toPrimitive];
            if (void 0 !== n) {
              var r = n.call(e, "string");
              if ("object" != t(r)) return r;
              throw new TypeError(
                "@@toPrimitive must return a primitive value.",
              );
            }
            return String(e);
          })(e);
          return "symbol" == t(n) ? n : n + "";
        }
        function r(t) {
          var e = "function" == typeof Map ? new Map() : void 0;
          return (
            (r = function (t) {
              if (
                null === t ||
                !(function (t) {
                  try {
                    return (
                      -1 !== Function.toString.call(t).indexOf("[native code]")
                    );
                  } catch (e) {
                    return "function" == typeof t;
                  }
                })(t)
              )
                return t;
              if ("function" != typeof t)
                throw new TypeError(
                  "Super expression must either be null or a function",
                );
              if (void 0 !== e) {
                if (e.has(t)) return e.get(t);
                e.set(t, n);
              }
              function n() {
                return (function (t, e, n) {
                  if (o()) return Reflect.construct.apply(null, arguments);
                  var r = [null];
                  r.push.apply(r, e);
                  var i = new (t.bind.apply(t, r))();
                  return n && a(i, n.prototype), i;
                })(t, arguments, i(this).constructor);
              }
              return (
                (n.prototype = Object.create(t.prototype, {
                  constructor: {
                    value: n,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0,
                  },
                })),
                a(n, t)
              );
            }),
            r(t)
          );
        }
        function o() {
          try {
            var t = !Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {}),
            );
          } catch (t) {}
          return (o = function () {
            return !!t;
          })();
        }
        function a(t, e) {
          return (
            (a = Object.setPrototypeOf
              ? Object.setPrototypeOf.bind()
              : function (t, e) {
                  return (t.__proto__ = e), t;
                }),
            a(t, e)
          );
        }
        function i(t) {
          return (
            (i = Object.setPrototypeOf
              ? Object.getPrototypeOf.bind()
              : function (t) {
                  return t.__proto__ || Object.getPrototypeOf(t);
                }),
            i(t)
          );
        }
        var u = (function (n) {
          function r() {
            return (
              (function (t, e) {
                if (!(t instanceof e))
                  throw new TypeError("Cannot call a class as a function");
              })(this, r),
              (function (e, n, r) {
                return (
                  (n = i(n)),
                  (function (e, n) {
                    if (n && ("object" == t(n) || "function" == typeof n))
                      return n;
                    if (void 0 !== n)
                      throw new TypeError(
                        "Derived constructors may only return object or undefined",
                      );
                    return (function (t) {
                      if (void 0 === t)
                        throw new ReferenceError(
                          "this hasn't been initialised - super() hasn't been called",
                        );
                      return t;
                    })(e);
                  })(
                    e,
                    o()
                      ? Reflect.construct(n, r || [], i(e).constructor)
                      : n.apply(e, r),
                  )
                );
              })(this, r, arguments)
            );
          }
          return (
            (function (t, e) {
              if ("function" != typeof e && null !== e)
                throw new TypeError(
                  "Super expression must either be null or a function",
                );
              (t.prototype = Object.create(e && e.prototype, {
                constructor: { value: t, writable: !0, configurable: !0 },
              })),
                Object.defineProperty(t, "prototype", { writable: !1 }),
                e && a(t, e);
            })(r, n),
            (u = r),
            (c = [
              {
                key: "connectedCallback",
                value: function () {
                  var t = this.getAttribute("text").replace(/\n/g, "<br>");
                  this.innerHTML = "<p>".concat(t, "</p>");
                },
              },
            ]) && e(u.prototype, c),
            Object.defineProperty(u, "prototype", { writable: !1 }),
            u
          );
          var u, c;
        })(r(HTMLElement));
        customElements.define("body-text", u);
      },
      533: () => {
        function t(e) {
          return (
            (t =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            t(e)
          );
        }
        function e(t, e) {
          for (var r = 0; r < e.length; r++) {
            var o = e[r];
            (o.enumerable = o.enumerable || !1),
              (o.configurable = !0),
              "value" in o && (o.writable = !0),
              Object.defineProperty(t, n(o.key), o);
          }
        }
        function n(e) {
          var n = (function (e) {
            if ("object" != t(e) || !e) return e;
            var n = e[Symbol.toPrimitive];
            if (void 0 !== n) {
              var r = n.call(e, "string");
              if ("object" != t(r)) return r;
              throw new TypeError(
                "@@toPrimitive must return a primitive value.",
              );
            }
            return String(e);
          })(e);
          return "symbol" == t(n) ? n : n + "";
        }
        function r(t) {
          var e = "function" == typeof Map ? new Map() : void 0;
          return (
            (r = function (t) {
              if (
                null === t ||
                !(function (t) {
                  try {
                    return (
                      -1 !== Function.toString.call(t).indexOf("[native code]")
                    );
                  } catch (e) {
                    return "function" == typeof t;
                  }
                })(t)
              )
                return t;
              if ("function" != typeof t)
                throw new TypeError(
                  "Super expression must either be null or a function",
                );
              if (void 0 !== e) {
                if (e.has(t)) return e.get(t);
                e.set(t, n);
              }
              function n() {
                return (function (t, e, n) {
                  if (o()) return Reflect.construct.apply(null, arguments);
                  var r = [null];
                  r.push.apply(r, e);
                  var i = new (t.bind.apply(t, r))();
                  return n && a(i, n.prototype), i;
                })(t, arguments, i(this).constructor);
              }
              return (
                (n.prototype = Object.create(t.prototype, {
                  constructor: {
                    value: n,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0,
                  },
                })),
                a(n, t)
              );
            }),
            r(t)
          );
        }
        function o() {
          try {
            var t = !Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {}),
            );
          } catch (t) {}
          return (o = function () {
            return !!t;
          })();
        }
        function a(t, e) {
          return (
            (a = Object.setPrototypeOf
              ? Object.setPrototypeOf.bind()
              : function (t, e) {
                  return (t.__proto__ = e), t;
                }),
            a(t, e)
          );
        }
        function i(t) {
          return (
            (i = Object.setPrototypeOf
              ? Object.getPrototypeOf.bind()
              : function (t) {
                  return t.__proto__ || Object.getPrototypeOf(t);
                }),
            i(t)
          );
        }
        var u = (function (n) {
          function r() {
            return (
              (function (t, e) {
                if (!(t instanceof e))
                  throw new TypeError("Cannot call a class as a function");
              })(this, r),
              (function (e, n, r) {
                return (
                  (n = i(n)),
                  (function (e, n) {
                    if (n && ("object" == t(n) || "function" == typeof n))
                      return n;
                    if (void 0 !== n)
                      throw new TypeError(
                        "Derived constructors may only return object or undefined",
                      );
                    return (function (t) {
                      if (void 0 === t)
                        throw new ReferenceError(
                          "this hasn't been initialised - super() hasn't been called",
                        );
                      return t;
                    })(e);
                  })(
                    e,
                    o()
                      ? Reflect.construct(n, r || [], i(e).constructor)
                      : n.apply(e, r),
                  )
                );
              })(this, r, arguments)
            );
          }
          return (
            (function (t, e) {
              if ("function" != typeof e && null !== e)
                throw new TypeError(
                  "Super expression must either be null or a function",
                );
              (t.prototype = Object.create(e && e.prototype, {
                constructor: { value: t, writable: !0, configurable: !0 },
              })),
                Object.defineProperty(t, "prototype", { writable: !1 }),
                e && a(t, e);
            })(r, n),
            (u = r),
            (c = [
              {
                key: "connectedCallback",
                value: function () {
                  var t = this.getAttribute("title"),
                    e = this.getAttribute("body"),
                    n = document.getElementById("flag").value;
                  this.innerHTML = '\n      <div class="note">\n        <h2>'
                    .concat(t, '</h2>\n        <body-text text="')
                    .concat(
                      e,
                      '"></body-text>\n        <button class="remove-btn" title="Delete"><i class="fas fa-trash-alt"></i></button>\n        ',
                    )
                    .concat(
                      n
                        ? '<button class="archive-btn" title="Archive"><i class="fas fa-box"></i></button>'
                        : '<button class="unarchive-btn" title="Unarchive"><i class="fas fa-box-open"></i></button>',
                      "\n      </div>\n    ",
                    );
                },
              },
            ]) && e(u.prototype, c),
            Object.defineProperty(u, "prototype", { writable: !1 }),
            u
          );
          var u, c;
        })(r(HTMLElement));
        customElements.define("note-item", u);
      },
      591: (t, e) => {
        function n(t) {
          return (
            (n =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            n(t)
          );
        }
        function r() {
          r = function () {
            return e;
          };
          var t,
            e = {},
            o = Object.prototype,
            a = o.hasOwnProperty,
            i =
              Object.defineProperty ||
              function (t, e, n) {
                t[e] = n.value;
              },
            u = "function" == typeof Symbol ? Symbol : {},
            c = u.iterator || "@@iterator",
            s = u.asyncIterator || "@@asyncIterator",
            l = u.toStringTag || "@@toStringTag";
          function f(t, e, n) {
            return (
              Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              }),
              t[e]
            );
          }
          try {
            f({}, "");
          } catch (t) {
            f = function (t, e, n) {
              return (t[e] = n);
            };
          }
          function d(t, e, n, r) {
            var o = e && e.prototype instanceof g ? e : g,
              a = Object.create(o.prototype),
              u = new C(r || []);
            return i(a, "_invoke", { value: P(t, n, u) }), a;
          }
          function p(t, e, n) {
            try {
              return { type: "normal", arg: t.call(e, n) };
            } catch (t) {
              return { type: "throw", arg: t };
            }
          }
          e.wrap = d;
          var h = "suspendedStart",
            y = "suspendedYield",
            v = "executing",
            m = "completed",
            b = {};
          function g() {}
          function w() {}
          function x() {}
          var E = {};
          f(E, c, function () {
            return this;
          });
          var k = Object.getPrototypeOf,
            O = k && k(k(I([])));
          O && O !== o && a.call(O, c) && (E = O);
          var j = (x.prototype = g.prototype = Object.create(E));
          function S(t) {
            ["next", "throw", "return"].forEach(function (e) {
              f(t, e, function (t) {
                return this._invoke(e, t);
              });
            });
          }
          function T(t, e) {
            function r(o, i, u, c) {
              var s = p(t[o], t, i);
              if ("throw" !== s.type) {
                var l = s.arg,
                  f = l.value;
                return f && "object" == n(f) && a.call(f, "__await")
                  ? e.resolve(f.__await).then(
                      function (t) {
                        r("next", t, u, c);
                      },
                      function (t) {
                        r("throw", t, u, c);
                      },
                    )
                  : e.resolve(f).then(
                      function (t) {
                        (l.value = t), u(l);
                      },
                      function (t) {
                        return r("throw", t, u, c);
                      },
                    );
              }
              c(s.arg);
            }
            var o;
            i(this, "_invoke", {
              value: function (t, n) {
                function a() {
                  return new e(function (e, o) {
                    r(t, n, e, o);
                  });
                }
                return (o = o ? o.then(a, a) : a());
              },
            });
          }
          function P(e, n, r) {
            var o = h;
            return function (a, i) {
              if (o === v) throw Error("Generator is already running");
              if (o === m) {
                if ("throw" === a) throw i;
                return { value: t, done: !0 };
              }
              for (r.method = a, r.arg = i; ; ) {
                var u = r.delegate;
                if (u) {
                  var c = M(u, r);
                  if (c) {
                    if (c === b) continue;
                    return c;
                  }
                }
                if ("next" === r.method) r.sent = r._sent = r.arg;
                else if ("throw" === r.method) {
                  if (o === h) throw ((o = m), r.arg);
                  r.dispatchException(r.arg);
                } else "return" === r.method && r.abrupt("return", r.arg);
                o = v;
                var s = p(e, n, r);
                if ("normal" === s.type) {
                  if (((o = r.done ? m : y), s.arg === b)) continue;
                  return { value: s.arg, done: r.done };
                }
                "throw" === s.type &&
                  ((o = m), (r.method = "throw"), (r.arg = s.arg));
              }
            };
          }
          function M(e, n) {
            var r = n.method,
              o = e.iterator[r];
            if (o === t)
              return (
                (n.delegate = null),
                ("throw" === r &&
                  e.iterator.return &&
                  ((n.method = "return"),
                  (n.arg = t),
                  M(e, n),
                  "throw" === n.method)) ||
                  ("return" !== r &&
                    ((n.method = "throw"),
                    (n.arg = new TypeError(
                      "The iterator does not provide a '" + r + "' method",
                    )))),
                b
              );
            var a = p(o, e.iterator, n.arg);
            if ("throw" === a.type)
              return (
                (n.method = "throw"), (n.arg = a.arg), (n.delegate = null), b
              );
            var i = a.arg;
            return i
              ? i.done
                ? ((n[e.resultName] = i.value),
                  (n.next = e.nextLoc),
                  "return" !== n.method && ((n.method = "next"), (n.arg = t)),
                  (n.delegate = null),
                  b)
                : i
              : ((n.method = "throw"),
                (n.arg = new TypeError("iterator result is not an object")),
                (n.delegate = null),
                b);
          }
          function L(t) {
            var e = { tryLoc: t[0] };
            1 in t && (e.catchLoc = t[1]),
              2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
              this.tryEntries.push(e);
          }
          function A(t) {
            var e = t.completion || {};
            (e.type = "normal"), delete e.arg, (t.completion = e);
          }
          function C(t) {
            (this.tryEntries = [{ tryLoc: "root" }]),
              t.forEach(L, this),
              this.reset(!0);
          }
          function I(e) {
            if (e || "" === e) {
              var r = e[c];
              if (r) return r.call(e);
              if ("function" == typeof e.next) return e;
              if (!isNaN(e.length)) {
                var o = -1,
                  i = function n() {
                    for (; ++o < e.length; )
                      if (a.call(e, o))
                        return (n.value = e[o]), (n.done = !1), n;
                    return (n.value = t), (n.done = !0), n;
                  };
                return (i.next = i);
              }
            }
            throw new TypeError(n(e) + " is not iterable");
          }
          return (
            (w.prototype = x),
            i(j, "constructor", { value: x, configurable: !0 }),
            i(x, "constructor", { value: w, configurable: !0 }),
            (w.displayName = f(x, l, "GeneratorFunction")),
            (e.isGeneratorFunction = function (t) {
              var e = "function" == typeof t && t.constructor;
              return (
                !!e &&
                (e === w || "GeneratorFunction" === (e.displayName || e.name))
              );
            }),
            (e.mark = function (t) {
              return (
                Object.setPrototypeOf
                  ? Object.setPrototypeOf(t, x)
                  : ((t.__proto__ = x), f(t, l, "GeneratorFunction")),
                (t.prototype = Object.create(j)),
                t
              );
            }),
            (e.awrap = function (t) {
              return { __await: t };
            }),
            S(T.prototype),
            f(T.prototype, s, function () {
              return this;
            }),
            (e.AsyncIterator = T),
            (e.async = function (t, n, r, o, a) {
              void 0 === a && (a = Promise);
              var i = new T(d(t, n, r, o), a);
              return e.isGeneratorFunction(n)
                ? i
                : i.next().then(function (t) {
                    return t.done ? t.value : i.next();
                  });
            }),
            S(j),
            f(j, l, "Generator"),
            f(j, c, function () {
              return this;
            }),
            f(j, "toString", function () {
              return "[object Generator]";
            }),
            (e.keys = function (t) {
              var e = Object(t),
                n = [];
              for (var r in e) n.push(r);
              return (
                n.reverse(),
                function t() {
                  for (; n.length; ) {
                    var r = n.pop();
                    if (r in e) return (t.value = r), (t.done = !1), t;
                  }
                  return (t.done = !0), t;
                }
              );
            }),
            (e.values = I),
            (C.prototype = {
              constructor: C,
              reset: function (e) {
                if (
                  ((this.prev = 0),
                  (this.next = 0),
                  (this.sent = this._sent = t),
                  (this.done = !1),
                  (this.delegate = null),
                  (this.method = "next"),
                  (this.arg = t),
                  this.tryEntries.forEach(A),
                  !e)
                )
                  for (var n in this)
                    "t" === n.charAt(0) &&
                      a.call(this, n) &&
                      !isNaN(+n.slice(1)) &&
                      (this[n] = t);
              },
              stop: function () {
                this.done = !0;
                var t = this.tryEntries[0].completion;
                if ("throw" === t.type) throw t.arg;
                return this.rval;
              },
              dispatchException: function (e) {
                if (this.done) throw e;
                var n = this;
                function r(r, o) {
                  return (
                    (u.type = "throw"),
                    (u.arg = e),
                    (n.next = r),
                    o && ((n.method = "next"), (n.arg = t)),
                    !!o
                  );
                }
                for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                  var i = this.tryEntries[o],
                    u = i.completion;
                  if ("root" === i.tryLoc) return r("end");
                  if (i.tryLoc <= this.prev) {
                    var c = a.call(i, "catchLoc"),
                      s = a.call(i, "finallyLoc");
                    if (c && s) {
                      if (this.prev < i.catchLoc) return r(i.catchLoc, !0);
                      if (this.prev < i.finallyLoc) return r(i.finallyLoc);
                    } else if (c) {
                      if (this.prev < i.catchLoc) return r(i.catchLoc, !0);
                    } else {
                      if (!s)
                        throw Error("try statement without catch or finally");
                      if (this.prev < i.finallyLoc) return r(i.finallyLoc);
                    }
                  }
                }
              },
              abrupt: function (t, e) {
                for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                  var r = this.tryEntries[n];
                  if (
                    r.tryLoc <= this.prev &&
                    a.call(r, "finallyLoc") &&
                    this.prev < r.finallyLoc
                  ) {
                    var o = r;
                    break;
                  }
                }
                o &&
                  ("break" === t || "continue" === t) &&
                  o.tryLoc <= e &&
                  e <= o.finallyLoc &&
                  (o = null);
                var i = o ? o.completion : {};
                return (
                  (i.type = t),
                  (i.arg = e),
                  o
                    ? ((this.method = "next"), (this.next = o.finallyLoc), b)
                    : this.complete(i)
                );
              },
              complete: function (t, e) {
                if ("throw" === t.type) throw t.arg;
                return (
                  "break" === t.type || "continue" === t.type
                    ? (this.next = t.arg)
                    : "return" === t.type
                      ? ((this.rval = this.arg = t.arg),
                        (this.method = "return"),
                        (this.next = "end"))
                      : "normal" === t.type && e && (this.next = e),
                  b
                );
              },
              finish: function (t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                  var n = this.tryEntries[e];
                  if (n.finallyLoc === t)
                    return this.complete(n.completion, n.afterLoc), A(n), b;
                }
              },
              catch: function (t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                  var n = this.tryEntries[e];
                  if (n.tryLoc === t) {
                    var r = n.completion;
                    if ("throw" === r.type) {
                      var o = r.arg;
                      A(n);
                    }
                    return o;
                  }
                }
                throw Error("illegal catch attempt");
              },
              delegateYield: function (e, n, r) {
                return (
                  (this.delegate = {
                    iterator: I(e),
                    resultName: n,
                    nextLoc: r,
                  }),
                  "next" === this.method && (this.arg = t),
                  b
                );
              },
            }),
            e
          );
        }
        function o(t, e, n, r, o, a, i) {
          try {
            var u = t[a](i),
              c = u.value;
          } catch (t) {
            return void n(t);
          }
          u.done ? e(c) : Promise.resolve(c).then(r, o);
        }
        function a(t) {
          return function () {
            var e = this,
              n = arguments;
            return new Promise(function (r, a) {
              var i = t.apply(e, n);
              function u(t) {
                o(i, r, a, u, c, "next", t);
              }
              function c(t) {
                o(i, r, a, u, c, "throw", t);
              }
              u(void 0);
            });
          };
        }
        function i(t, e) {
          for (var n = 0; n < e.length; n++) {
            var r = e[n];
            (r.enumerable = r.enumerable || !1),
              (r.configurable = !0),
              "value" in r && (r.writable = !0),
              Object.defineProperty(t, u(r.key), r);
          }
        }
        function u(t) {
          var e = (function (t) {
            if ("object" != n(t) || !t) return t;
            var e = t[Symbol.toPrimitive];
            if (void 0 !== e) {
              var r = e.call(t, "string");
              if ("object" != n(r)) return r;
              throw new TypeError(
                "@@toPrimitive must return a primitive value.",
              );
            }
            return String(t);
          })(t);
          return "symbol" == n(e) ? e : e + "";
        }
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0);
        var c = "https://notes-api.dicoding.dev/v2",
          s = (function () {
            return (
              (t = function t() {
                !(function (t, e) {
                  if (!(t instanceof e))
                    throw new TypeError("Cannot call a class as a function");
                })(this, t);
              }),
              (e = [
                {
                  key: "search",
                  value:
                    ((f = a(
                      r().mark(function t() {
                        var e, n;
                        return r().wrap(
                          function (t) {
                            for (;;)
                              switch ((t.prev = t.next)) {
                                case 0:
                                  return (
                                    (t.prev = 0),
                                    (t.next = 3),
                                    fetch("".concat(c, "/notes"))
                                  );
                                case 3:
                                  if (
                                    !(
                                      (e = t.sent).status >= 200 &&
                                      e.status < 300
                                    )
                                  ) {
                                    t.next = 12;
                                    break;
                                  }
                                  return (t.next = 7), e.json();
                                case 7:
                                  return (
                                    (n = t.sent),
                                    console.log(n, "get notes"),
                                    t.abrupt("return", n)
                                  );
                                case 12:
                                  throw new Error("Something went wrong");
                                case 13:
                                  t.next = 18;
                                  break;
                                case 15:
                                  return (
                                    (t.prev = 15),
                                    (t.t0 = t.catch(0)),
                                    t.abrupt("return", Promise.reject(t.t0))
                                  );
                                case 18:
                                case "end":
                                  return t.stop();
                              }
                          },
                          t,
                          null,
                          [[0, 15]],
                        );
                      }),
                    )),
                    function () {
                      return f.apply(this, arguments);
                    }),
                },
                {
                  key: "insert",
                  value:
                    ((l = a(
                      r().mark(function t(e, n) {
                        var o, a;
                        return r().wrap(
                          function (t) {
                            for (;;)
                              switch ((t.prev = t.next)) {
                                case 0:
                                  return (
                                    (t.prev = 0),
                                    (t.next = 3),
                                    fetch("".concat(c, "/notes"), {
                                      method: "POST",
                                      headers: {
                                        "Content-Type": "application/json",
                                      },
                                      body: JSON.stringify({
                                        title: e,
                                        body: n,
                                      }),
                                    })
                                  );
                                case 3:
                                  if (
                                    !(
                                      (o = t.sent).status >= 200 &&
                                      o.status < 300
                                    )
                                  ) {
                                    t.next = 12;
                                    break;
                                  }
                                  return (t.next = 7), o.json();
                                case 7:
                                  return (
                                    (a = t.sent),
                                    console.log(a, "insert note"),
                                    t.abrupt("return", a)
                                  );
                                case 12:
                                  throw new Error("Something went wrong");
                                case 13:
                                  t.next = 18;
                                  break;
                                case 15:
                                  return (
                                    (t.prev = 15),
                                    (t.t0 = t.catch(0)),
                                    t.abrupt("return", Promise.reject(t.t0))
                                  );
                                case 18:
                                case "end":
                                  return t.stop();
                              }
                          },
                          t,
                          null,
                          [[0, 15]],
                        );
                      }),
                    )),
                    function (t, e) {
                      return l.apply(this, arguments);
                    }),
                },
                {
                  key: "delete",
                  value:
                    ((s = a(
                      r().mark(function t(e) {
                        var n, o;
                        return r().wrap(
                          function (t) {
                            for (;;)
                              switch ((t.prev = t.next)) {
                                case 0:
                                  return (
                                    (t.prev = 0),
                                    (t.next = 3),
                                    fetch("".concat(c, "/notes/").concat(e), {
                                      method: "DELETE",
                                      headers: {
                                        "Content-Type": "application/json",
                                      },
                                    })
                                  );
                                case 3:
                                  if (
                                    !(
                                      (n = t.sent).status >= 200 &&
                                      n.status < 300
                                    )
                                  ) {
                                    t.next = 12;
                                    break;
                                  }
                                  return (t.next = 7), n.json();
                                case 7:
                                  return (
                                    (o = t.sent),
                                    console.log(o, "delete note"),
                                    t.abrupt("return", o)
                                  );
                                case 12:
                                  throw new Error("Something went wrong");
                                case 13:
                                  t.next = 18;
                                  break;
                                case 15:
                                  return (
                                    (t.prev = 15),
                                    (t.t0 = t.catch(0)),
                                    t.abrupt("return", Promise.reject(t.t0))
                                  );
                                case 18:
                                case "end":
                                  return t.stop();
                              }
                          },
                          t,
                          null,
                          [[0, 15]],
                        );
                      }),
                    )),
                    function (t) {
                      return s.apply(this, arguments);
                    }),
                },
                {
                  key: "searchArc",
                  value:
                    ((u = a(
                      r().mark(function t() {
                        var e, n;
                        return r().wrap(
                          function (t) {
                            for (;;)
                              switch ((t.prev = t.next)) {
                                case 0:
                                  return (
                                    (t.prev = 0),
                                    (t.next = 3),
                                    fetch("".concat(c, "/notes/archived"))
                                  );
                                case 3:
                                  if (
                                    !(
                                      (e = t.sent).status >= 200 &&
                                      e.status < 300
                                    )
                                  ) {
                                    t.next = 12;
                                    break;
                                  }
                                  return (t.next = 7), e.json();
                                case 7:
                                  return (
                                    (n = t.sent),
                                    console.log(n, "get archive"),
                                    t.abrupt("return", n)
                                  );
                                case 12:
                                  throw new Error("Something went wrong");
                                case 13:
                                  t.next = 18;
                                  break;
                                case 15:
                                  return (
                                    (t.prev = 15),
                                    (t.t0 = t.catch(0)),
                                    t.abrupt("return", Promise.reject(t.t0))
                                  );
                                case 18:
                                case "end":
                                  return t.stop();
                              }
                          },
                          t,
                          null,
                          [[0, 15]],
                        );
                      }),
                    )),
                    function () {
                      return u.apply(this, arguments);
                    }),
                },
                {
                  key: "archive",
                  value:
                    ((o = a(
                      r().mark(function t(e) {
                        var n, o;
                        return r().wrap(
                          function (t) {
                            for (;;)
                              switch ((t.prev = t.next)) {
                                case 0:
                                  return (
                                    (t.prev = 0),
                                    (t.next = 3),
                                    fetch(
                                      ""
                                        .concat(c, "/notes/")
                                        .concat(e, "/archive"),
                                      {
                                        method: "POST",
                                        headers: {
                                          "Content-Type": "application/json",
                                        },
                                      },
                                    )
                                  );
                                case 3:
                                  if (
                                    !(
                                      (n = t.sent).status >= 200 &&
                                      n.status < 300
                                    )
                                  ) {
                                    t.next = 12;
                                    break;
                                  }
                                  return (t.next = 7), n.json();
                                case 7:
                                  return (
                                    (o = t.sent),
                                    console.log(o, "archive"),
                                    t.abrupt("return", o)
                                  );
                                case 12:
                                  throw new Error("Something went wrong");
                                case 13:
                                  t.next = 18;
                                  break;
                                case 15:
                                  return (
                                    (t.prev = 15),
                                    (t.t0 = t.catch(0)),
                                    t.abrupt("return", Promise.reject(t.t0))
                                  );
                                case 18:
                                case "end":
                                  return t.stop();
                              }
                          },
                          t,
                          null,
                          [[0, 15]],
                        );
                      }),
                    )),
                    function (t) {
                      return o.apply(this, arguments);
                    }),
                },
                {
                  key: "unarchive",
                  value:
                    ((n = a(
                      r().mark(function t(e) {
                        var n, o;
                        return r().wrap(
                          function (t) {
                            for (;;)
                              switch ((t.prev = t.next)) {
                                case 0:
                                  return (
                                    (t.prev = 0),
                                    (t.next = 3),
                                    fetch(
                                      ""
                                        .concat(c, "/notes/")
                                        .concat(e, "/unarchive"),
                                      {
                                        method: "POST",
                                        headers: {
                                          "Content-Type": "application/json",
                                        },
                                      },
                                    )
                                  );
                                case 3:
                                  if (
                                    !(
                                      (n = t.sent).status >= 200 &&
                                      n.status < 300
                                    )
                                  ) {
                                    t.next = 12;
                                    break;
                                  }
                                  return (t.next = 7), n.json();
                                case 7:
                                  return (
                                    (o = t.sent),
                                    console.log(o, "unarchive"),
                                    t.abrupt("return", o)
                                  );
                                case 12:
                                  throw new Error("Something went wrong");
                                case 13:
                                  t.next = 18;
                                  break;
                                case 15:
                                  return (
                                    (t.prev = 15),
                                    (t.t0 = t.catch(0)),
                                    t.abrupt("return", Promise.reject(t.t0))
                                  );
                                case 18:
                                case "end":
                                  return t.stop();
                              }
                          },
                          t,
                          null,
                          [[0, 15]],
                        );
                      }),
                    )),
                    function (t) {
                      return n.apply(this, arguments);
                    }),
                },
              ]),
              e && i(t, e),
              Object.defineProperty(t, "prototype", { writable: !1 }),
              t
            );
            var t, e, n, o, u, s, l, f;
          })();
        e.default = s;
      },
      998: (t, e) => {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.notesData = void 0),
          (e.notesData = [
            {
              id: "notes-jT-jjsyz61J8XKiI",
              title: "Welcome to Notes, Dimas!",
              body: "Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.",
              createdAt: "2022-07-28T10:03:12.594Z",
              archived: !1,
            },
            {
              id: "notes-aB-cdefg12345",
              title: "Meeting Agenda",
              body: "Discuss project updates and assign tasks for the upcoming week.",
              createdAt: "2022-08-05T15:30:00.000Z",
              archived: !1,
            },
            {
              id: "notes-XyZ-789012345",
              title: "Shopping List",
              body: "Milk, eggs, bread, fruits, and vegetables.",
              createdAt: "2022-08-10T08:45:23.120Z",
              archived: !1,
            },
            {
              id: "notes-1a-2b3c4d5e6f",
              title: "Personal Goals",
              body: "Read two books per month, exercise three times a week, learn a new language.",
              createdAt: "2022-08-15T18:12:55.789Z",
              archived: !1,
            },
            {
              id: "notes-LMN-456789",
              title: "Recipe: Spaghetti Bolognese",
              body: "Ingredients: ground beef, tomatoes, onions, garlic, pasta. Steps:...",
              createdAt: "2022-08-20T12:30:40.200Z",
              archived: !1,
            },
            {
              id: "notes-QwErTyUiOp",
              title: "Workout Routine",
              body: "Monday: Cardio, Tuesday: Upper body, Wednesday: Rest, Thursday: Lower body, Friday: Cardio.",
              createdAt: "2022-08-25T09:15:17.890Z",
              archived: !1,
            },
            {
              id: "notes-abcdef-987654",
              title: "Book Recommendations",
              body: "1. 'The Alchemist' by Paulo Coelho\n2. '1984' by George Orwell\n3. 'To Kill a Mockingbird' by Harper Lee",
              createdAt: "2022-09-01T14:20:05.321Z",
              archived: !1,
            },
            {
              id: "notes-zyxwv-54321",
              title: "Daily Reflections",
              body: "Write down three positive things that happened today and one thing to improve tomorrow.",
              createdAt: "2022-09-07T20:40:30.150Z",
              archived: !1,
            },
            {
              id: "notes-poiuyt-987654",
              title: "Travel Bucket List",
              body: "1. Paris, France\n2. Kyoto, Japan\n3. Santorini, Greece\n4. New York City, USA",
              createdAt: "2022-09-15T11:55:44.678Z",
              archived: !1,
            },
            {
              id: "notes-asdfgh-123456",
              title: "Coding Projects",
              body: "1. Build a personal website\n2. Create a mobile app\n3. Contribute to an open-source project",
              createdAt: "2022-09-20T17:10:12.987Z",
              archived: !1,
            },
            {
              id: "notes-5678-abcd-efgh",
              title: "Project Deadline",
              body: "Complete project tasks by the deadline on October 1st.",
              createdAt: "2022-09-28T14:00:00.000Z",
              archived: !1,
            },
            {
              id: "notes-9876-wxyz-1234",
              title: "Health Checkup",
              body: "Schedule a routine health checkup with the doctor.",
              createdAt: "2022-10-05T09:30:45.600Z",
              archived: !1,
            },
            {
              id: "notes-qwerty-8765-4321",
              title: "Financial Goals",
              body: "1. Create a monthly budget\n2. Save 20% of income\n3. Invest in a retirement fund.",
              createdAt: "2022-10-12T12:15:30.890Z",
              archived: !1,
            },
            {
              id: "notes-98765-54321-12345",
              title: "Holiday Plans",
              body: "Research and plan for the upcoming holiday destination.",
              createdAt: "2022-10-20T16:45:00.000Z",
              archived: !1,
            },
            {
              id: "notes-1234-abcd-5678",
              title: "Language Learning",
              body: "Practice Spanish vocabulary for 30 minutes every day.",
              createdAt: "2022-10-28T08:00:20.120Z",
              archived: !1,
            },
          ]);
      },
      919: (t, e, n) => {
        n.d(e, { A: () => u });
        var r = n(601),
          o = n.n(r),
          a = n(314),
          i = n.n(a)()(o());
        i.push([
          t.id,
          'body {\n  background: linear-gradient(to bottom, #96b6c5, #eee0c9);\n  color: #333;\n  font-family: "Roboto", sans-serif;\n  padding: 20px;\n  margin: 0;\n}\n\nheader {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 20px;\n  background-color: #fff;\n  border-radius: 15px;\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n  margin-bottom: 20px;\n  max-width: 100%;\n}\n\n@media (max-width: 768px) {\n  header {\n    flex-direction: column;\n    align-items: center;\n    padding: 10px;\n  }\n}\n\nheader h1 {\n  margin: 0;\n  font-size: 24px;\n  color: #333;\n  text-align: center;\n}\n\n#add-note-btn {\n  background-color: #96b6c5;\n  color: #fff;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 25px;\n  cursor: pointer;\n  font-size: 16px;\n  transition: background-color 0.3s;\n}\n\n#add-note-btn:hover {\n  background-color: #adc4ce;\n}\n\n#notes-container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 20px;\n}\n\n.note {\n  background-color: #fff;\n  padding: 15px;\n  border-radius: 15px;\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n  position: relative;\n}\n\n.note h2 {\n  color: #96b6c5;\n  margin: 0 0 10px;\n  font-size: 18px;\n}\n\n.note body-text p {\n  margin: 0;\n  white-space: normal; /* Ensure text wraps */\n  word-wrap: break-word; /* Untuk menangani karakter \\n */\n}\n\n.note .actions {\n  position: absolute;\n  bottom: 10px;\n  right: 10px;\n  display: flex;\n  gap: 10px;\n}\n\n.note .remove-btn {\n  position: absolute;\n  bottom: 10px;\n  right: 10px;\n  display: flex;\n  gap: 10px;\n  background-color: rgba(255, 0, 0, 0.2);\n  padding: 5px 10px;\n  font-size: 10px;\n}\n\n.note .remove-btn:hover {\n  background-color: rgba(255, 0, 0, 0.5);\n}\n\n.note .archive-btn {\n  position: absolute;\n  bottom: 10px;\n  right: 40px;\n  display: flex;\n  gap: 10px;\n  background-color: rgba(24, 0, 178, 0.2);\n  padding: 5px 10px; /* Reduced padding for a smaller button */\n  font-size: 10px; /* Reduced font size for a smaller button */\n}\n\n.note .archive-btn:hover {\n  background-color: rgba(24, 0, 178, 0.5);\n}\n\n.note .unarchive-btn {\n  position: absolute;\n  bottom: 10px;\n  right: 40px;\n  display: flex;\n  gap: 10px;\n  background-color: rgba(0, 100, 0, 0.2);\n  padding: 5px 10px;\n  font-size: 10px;\n}\n\n.note .unarchive-btn:hover {\n  background-color: rgba(0, 100, 0, 0.5);\n}\n\nbutton {\n  padding: 10px 20px;\n  font-size: 16px;\n  background-color: #96b6c5;\n  color: #fff;\n  border: none;\n  border-radius: 25px;\n  cursor: pointer;\n  transition: background-color 0.3s;\n}\n\nbutton:hover {\n  background-color: #adc4ce;\n}\n\n/* Modal Styling */\n.modal {\n  display: none; /* Hidden by default */\n  position: fixed; /* Stay in place */\n  z-index: 1; /* Sit on top */\n  left: 0;\n  top: 0;\n  width: 100%; /* Full width */\n  height: 100%; /* Full height */\n  overflow: auto; /* Enable scroll if needed */\n  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */\n}\n\n.modal-content {\n  background-color: #fefefe;\n  margin: 5% auto; /* 15% from the top and centered */\n  padding: 20px;\n  border: 1px solid #888;\n  width: 80%; /* Could be more or less, depending on screen size */\n  border-radius: 15px;\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n}\n\n.close-btn {\n  color: #aaa;\n  float: right;\n  font-size: 28px;\n  font-weight: bold;\n}\n\n.close-btn:hover,\n.close-btn:focus {\n  color: black;\n  text-decoration: none;\n  cursor: pointer;\n}\n\n.hidden {\n  display: none;\n}\n\nform {\n  margin-top: 20px;\n  padding: 20px;\n  background-color: #fff;\n  border: 1px solid #adc4ce;\n  border-radius: 15px;\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n}\n\ninput,\ntextarea {\n  display: block;\n  width: 98%;\n  margin-bottom: 15px;\n  padding: 10px;\n  font-size: 16px;\n  border: 1px solid #96b6c5;\n  background-color: #f1f0e8;\n  border-radius: 5px;\n}\n\n.flag-btn {\n  margin: 10px;\n}\n',
          "",
        ]);
        const u = i;
      },
      314: (t) => {
        t.exports = function (t) {
          var e = [];
          return (
            (e.toString = function () {
              return this.map(function (e) {
                var n = "",
                  r = void 0 !== e[5];
                return (
                  e[4] && (n += "@supports (".concat(e[4], ") {")),
                  e[2] && (n += "@media ".concat(e[2], " {")),
                  r &&
                    (n += "@layer".concat(
                      e[5].length > 0 ? " ".concat(e[5]) : "",
                      " {",
                    )),
                  (n += t(e)),
                  r && (n += "}"),
                  e[2] && (n += "}"),
                  e[4] && (n += "}"),
                  n
                );
              }).join("");
            }),
            (e.i = function (t, n, r, o, a) {
              "string" == typeof t && (t = [[null, t, void 0]]);
              var i = {};
              if (r)
                for (var u = 0; u < this.length; u++) {
                  var c = this[u][0];
                  null != c && (i[c] = !0);
                }
              for (var s = 0; s < t.length; s++) {
                var l = [].concat(t[s]);
                (r && i[l[0]]) ||
                  (void 0 !== a &&
                    (void 0 === l[5] ||
                      (l[1] = "@layer"
                        .concat(l[5].length > 0 ? " ".concat(l[5]) : "", " {")
                        .concat(l[1], "}")),
                    (l[5] = a)),
                  n &&
                    (l[2]
                      ? ((l[1] = "@media "
                          .concat(l[2], " {")
                          .concat(l[1], "}")),
                        (l[2] = n))
                      : (l[2] = n)),
                  o &&
                    (l[4]
                      ? ((l[1] = "@supports ("
                          .concat(l[4], ") {")
                          .concat(l[1], "}")),
                        (l[4] = o))
                      : (l[4] = "".concat(o))),
                  e.push(l));
              }
            }),
            e
          );
        };
      },
      601: (t) => {
        t.exports = function (t) {
          return t[1];
        };
      },
      966: (t, e, n) => {
        n.r(e), n.d(e, { default: () => m });
        var r = n(72),
          o = n.n(r),
          a = n(825),
          i = n.n(a),
          u = n(659),
          c = n.n(u),
          s = n(56),
          l = n.n(s),
          f = n(540),
          d = n.n(f),
          p = n(113),
          h = n.n(p),
          y = n(919),
          v = {};
        (v.styleTagTransform = h()),
          (v.setAttributes = l()),
          (v.insert = c().bind(null, "head")),
          (v.domAPI = i()),
          (v.insertStyleElement = d()),
          o()(y.A, v);
        const m = y.A && y.A.locals ? y.A.locals : void 0;
      },
      72: (t) => {
        var e = [];
        function n(t) {
          for (var n = -1, r = 0; r < e.length; r++)
            if (e[r].identifier === t) {
              n = r;
              break;
            }
          return n;
        }
        function r(t, r) {
          for (var a = {}, i = [], u = 0; u < t.length; u++) {
            var c = t[u],
              s = r.base ? c[0] + r.base : c[0],
              l = a[s] || 0,
              f = "".concat(s, " ").concat(l);
            a[s] = l + 1;
            var d = n(f),
              p = {
                css: c[1],
                media: c[2],
                sourceMap: c[3],
                supports: c[4],
                layer: c[5],
              };
            if (-1 !== d) e[d].references++, e[d].updater(p);
            else {
              var h = o(p, r);
              (r.byIndex = u),
                e.splice(u, 0, { identifier: f, updater: h, references: 1 });
            }
            i.push(f);
          }
          return i;
        }
        function o(t, e) {
          var n = e.domAPI(e);
          return (
            n.update(t),
            function (e) {
              if (e) {
                if (
                  e.css === t.css &&
                  e.media === t.media &&
                  e.sourceMap === t.sourceMap &&
                  e.supports === t.supports &&
                  e.layer === t.layer
                )
                  return;
                n.update((t = e));
              } else n.remove();
            }
          );
        }
        t.exports = function (t, o) {
          var a = r((t = t || []), (o = o || {}));
          return function (t) {
            t = t || [];
            for (var i = 0; i < a.length; i++) {
              var u = n(a[i]);
              e[u].references--;
            }
            for (var c = r(t, o), s = 0; s < a.length; s++) {
              var l = n(a[s]);
              0 === e[l].references && (e[l].updater(), e.splice(l, 1));
            }
            a = c;
          };
        };
      },
      659: (t) => {
        var e = {};
        t.exports = function (t, n) {
          var r = (function (t) {
            if (void 0 === e[t]) {
              var n = document.querySelector(t);
              if (
                window.HTMLIFrameElement &&
                n instanceof window.HTMLIFrameElement
              )
                try {
                  n = n.contentDocument.head;
                } catch (t) {
                  n = null;
                }
              e[t] = n;
            }
            return e[t];
          })(t);
          if (!r)
            throw new Error(
              "Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.",
            );
          r.appendChild(n);
        };
      },
      540: (t) => {
        t.exports = function (t) {
          var e = document.createElement("style");
          return t.setAttributes(e, t.attributes), t.insert(e, t.options), e;
        };
      },
      56: (t, e, n) => {
        t.exports = function (t) {
          var e = n.nc;
          e && t.setAttribute("nonce", e);
        };
      },
      825: (t) => {
        t.exports = function (t) {
          if ("undefined" == typeof document)
            return { update: function () {}, remove: function () {} };
          var e = t.insertStyleElement(t);
          return {
            update: function (n) {
              !(function (t, e, n) {
                var r = "";
                n.supports && (r += "@supports (".concat(n.supports, ") {")),
                  n.media && (r += "@media ".concat(n.media, " {"));
                var o = void 0 !== n.layer;
                o &&
                  (r += "@layer".concat(
                    n.layer.length > 0 ? " ".concat(n.layer) : "",
                    " {",
                  )),
                  (r += n.css),
                  o && (r += "}"),
                  n.media && (r += "}"),
                  n.supports && (r += "}");
                var a = n.sourceMap;
                a &&
                  "undefined" != typeof btoa &&
                  (r +=
                    "\n/*# sourceMappingURL=data:application/json;base64,".concat(
                      btoa(unescape(encodeURIComponent(JSON.stringify(a)))),
                      " */",
                    )),
                  e.styleTagTransform(r, t, e.options);
              })(e, t, n);
            },
            remove: function () {
              !(function (t) {
                if (null === t.parentNode) return !1;
                t.parentNode.removeChild(t);
              })(e);
            },
          };
        };
      },
      113: (t) => {
        t.exports = function (t, e) {
          if (e.styleSheet) e.styleSheet.cssText = t;
          else {
            for (; e.firstChild; ) e.removeChild(e.firstChild);
            e.appendChild(document.createTextNode(t));
          }
        };
      },
    },
    e = {};
  function n(r) {
    var o = e[r];
    if (void 0 !== o) return o.exports;
    var a = (e[r] = { id: r, exports: {} });
    return t[r](a, a.exports, n), a.exports;
  }
  (n.n = (t) => {
    var e = t && t.__esModule ? () => t.default : () => t;
    return n.d(e, { a: e }), e;
  }),
    (n.d = (t, e) => {
      for (var r in e)
        n.o(e, r) &&
          !n.o(t, r) &&
          Object.defineProperty(t, r, { enumerable: !0, get: e[r] });
    }),
    (n.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
    (n.r = (t) => {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (n.nc = void 0),
    n(998),
    n(966),
    n(974),
    n(197),
    n(533);
  var r = a(n(591)),
    o = a(n(776));
  function a(t) {
    return t && t.__esModule ? t : { default: t };
  }
  document.addEventListener("DOMContentLoaded", function () {
    var t = document.getElementById("notes-container"),
      e = document.createElement("div");
    function n() {
      (e.style.display = "block"),
        (document.body.style.pointerEvents = "none"),
        (document.body.style.opacity = "0.4"),
        (0, o.default)({
          targets: e,
          opacity: 1,
          duration: 500,
          easing: "easeInOutSine",
        });
    }
    function a() {
      (e.style.display = "none"),
        (document.body.style.pointerEvents = "auto"),
        (document.body.style.opacity = "1"),
        (0, o.default)({
          targets: e,
          opacity: 0,
          duration: 500,
          easing: "easeInOutSine",
        });
    }
    function i() {
      var t = document.getElementById("modal");
      t.classList.toggle("hidden"),
        (t.style.display = "block" === t.style.display ? "none" : "block"),
        (0, o.default)({
          targets: t,
          opacity: [0, 1],
          duration: 500,
          easing: "easeInOutSine",
        });
    }
    function u() {
      r.default
        .search()
        .then(function (e) {
          a(),
            e.data.forEach(function (e) {
              var n = document.createElement("note-item");
              n.setAttribute("title", e.title),
                n.setAttribute("body", e.body),
                t.appendChild(n),
                (0, o.default)({
                  targets: n,
                  opacity: [0, 1],
                  duration: 500,
                  easing: "easeInOutSine",
                });
            });
        })
        .catch(function (t) {
          a(), alert("Error loading notes: ".concat(t.message));
        });
    }
    e.classList.add("loader"),
      document.body.appendChild(e),
      (e.innerText = "Loading..."),
      n(),
      u(),
      document
        .getElementById("notes-container")
        .addEventListener("click", function (t) {
          if (t.target.classList.contains("remove-btn")) {
            var e = t.target.closest("note-item"),
              o = e.getAttribute("id");
            confirm("Are you sure you want to delete this note?") &&
              (n(),
              r.default
                .delete(o)
                .then(function (t) {
                  a(), e.remove();
                })
                .catch(function (t) {
                  a(), alert("Error deleting note: ".concat(t.message));
                }));
          }
          if (t.target.classList.contains("archive-btn")) {
            var i = t.target.closest("note-item"),
              u = i.getAttribute("id");
            confirm("Are you sure you want to archive this note?") &&
              (n(),
              r.default
                .archive(u)
                .then(function (t) {
                  a(), i.remove();
                })
                .catch(function (t) {
                  a(), alert("Error archiving note: ".concat(t.message));
                }));
          }
          if (t.target.classList.contains("unarchive-btn")) {
            var c = t.target.closest("note-item"),
              s = c.getAttribute("id");
            confirm("Are you sure you want to unarchive this note?") &&
              (n(),
              r.default
                .unarchive(s)
                .then(function (t) {
                  a(), c.remove();
                })
                .catch(function (t) {
                  a(), alert("Error unarchiving note: ".concat(t.message));
                }));
          }
        }),
      document
        .getElementById("add-note-form")
        .addEventListener("submit", function (t) {
          t.preventDefault();
          var e = document.getElementById("note-title").value,
            u = document.getElementById("note-body").value,
            c = { id: Date.now(), title: e, body: u },
            s = document.createElement("note-item");
          s.setAttribute("title", c.title),
            s.setAttribute("body", c.body),
            n(),
            r.default
              .insert(c.title, c.body)
              .then(function (t) {
                a(),
                  document.getElementById("notes-container").appendChild(s),
                  (0, o.default)({
                    targets: s,
                    opacity: [0, 1],
                    duration: 500,
                    easing: "easeInOutSine",
                  });
              })
              .catch(function (t) {
                a(), alert("Error adding note: ".concat(t.message));
              }),
            document.getElementById("add-note-form").reset(),
            i();
        }),
      document
        .querySelector("app-bar button")
        .addEventListener("click", function () {
          i();
        }),
      document
        .querySelector(".close-btn")
        .addEventListener("click", function () {
          i();
        }),
      document
        .querySelector(".flag-btn")
        .addEventListener("click", function () {
          var t = document.getElementById("flag"),
            e = document.querySelector(".flag-btn");
          "x" === t.value
            ? ((t.value = null),
              (e.style.opacity = "0.5"),
              r.default
                .searchArc()
                .then(function (e) {
                  var n = document.getElementById("notes-container");
                  (n.innerHTML = ""),
                    e.data.forEach(function (t) {
                      var e = document.createElement("note-item");
                      e.setAttribute("title", t.title),
                        e.setAttribute("body", t.body),
                        n.appendChild(e);
                    }),
                    null === t.value &&
                      (noteElement.innerHTML = noteElement.innerHTML.replace(
                        "archive-btn",
                        "unarchive-btn",
                      ));
                })
                .catch(function (t) {
                  alert("Error fetching archived notes: ".concat(t.message));
                }))
            : ((document.getElementById("notes-container").innerHTML = ""),
              u(),
              (t.value = "x"),
              (e.style.opacity = "1"));
        }),
      window.addEventListener("click", function (t) {
        var e = document.getElementById("modal");
        t.target === e && i();
      });
  });
})();
