function _typeof(obj) { if (typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol") { _typeof = function (_typeof2) { function _typeof(_x) { return _typeof2.apply(this, arguments); } _typeof.toString = function () { return _typeof2.toString(); }; return _typeof; }(function (obj) { return typeof obj === "undefined" ? "undefined" : _typeof(obj); }); } else { _typeof = function (_typeof3) { function _typeof(_x2) { return _typeof3.apply(this, arguments); } _typeof.toString = function () { return _typeof3.toString(); }; return _typeof; }(function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj); }); } return _typeof(obj); }

(function () {
  var bb = 'xxx';
  var t = "<div>" + bb + "</div>";
  window.bb = t;
})();
/*! layer-v3.1.1 Web弹层组件 MIT License  http://layer.layui.com/  By 贤心 */


;
!function (e, t) {
  "use strict";

  var i,
      n,
      a = e.layui && layui.define,
      o = {
    getPath: function () {
      var e = document.currentScript ? document.currentScript.src : function () {
        for (var e, t = document.scripts, i = t.length - 1, n = i; n > 0; n--) {
          if ("interactive" === t[n].readyState) {
            e = t[n].src;
            break;
          }
        }

        return e || t[i].src;
      }();
      return e.substring(0, e.lastIndexOf("/") + 1);
    }(),
    config: {},
    end: {},
    minIndex: 0,
    minLeft: [],
    btn: ["&#x786E;&#x5B9A;", "&#x53D6;&#x6D88;"],
    type: ["dialog", "page", "iframe", "loading", "tips"],
    getStyle: function getStyle(t, i) {
      var n = t.currentStyle ? t.currentStyle : e.getComputedStyle(t, null);
      return n[n.getPropertyValue ? "getPropertyValue" : "getAttribute"](i);
    },
    link: function link(t, i, n) {
      if (r.path) {
        var a = document.getElementsByTagName("head")[0],
            s = document.createElement("link");
        "string" == typeof i && (n = i);
        var l = (n || t).replace(/\.|\//g, ""),
            f = "layuicss-" + l,
            c = 0;
        s.rel = "stylesheet", s.href = r.path + t, s.id = f, document.getElementById(f) || a.appendChild(s), "function" == typeof i && !function u() {
          return ++c > 80 ? e.console && console.error("layer.css: Invalid") : void (1989 === parseInt(o.getStyle(document.getElementById(f), "width")) ? i() : setTimeout(u, 100));
        }();
      }
    }
  },
      r = {
    v: "3.1.1",
    ie: function () {
      var t = navigator.userAgent.toLowerCase();
      return !!(e.ActiveXObject || "ActiveXObject" in e) && ((t.match(/msie\s(\d+)/) || [])[1] || "11");
    }(),
    index: e.layer && e.layer.v ? 1e5 : 0,
    path: o.getPath,
    config: function config(e, t) {
      return e = e || {}, r.cache = o.config = i.extend({}, o.config, e), r.path = o.config.path || r.path, "string" == typeof e.extend && (e.extend = [e.extend]), o.config.path && r.ready(), e.extend ? (a ? layui.addcss("modules/layer/" + e.extend) : o.link("theme/" + e.extend), this) : this;
    },
    ready: function ready(e) {
      var t = "layer",
          i = "",
          n = (a ? "modules/layer/" : "theme/") + "default/layer.css?v=" + r.v + i;
      return a ? layui.addcss(n, e, t) : o.link(n, e, t), this;
    },
    alert: function alert(e, t, n) {
      var a = "function" == typeof t;
      return a && (n = t), r.open(i.extend({
        content: e,
        yes: n
      }, a ? {} : t));
    },
    confirm: function confirm(e, t, n, a) {
      var s = "function" == typeof t;
      return s && (a = n, n = t), r.open(i.extend({
        content: e,
        btn: o.btn,
        yes: n,
        btn2: a
      }, s ? {} : t));
    },
    msg: function msg(e, n, a) {
      var s = "function" == typeof n,
          f = o.config.skin,
          c = (f ? f + " " + f + "-my-reward" : "") || "layui-layer-my-reward",
          u = l.anim.length - 1;
      return s && (a = n), r.open(i.extend({
        content: e,
        time: 3e3,
        shade: !1,
        skin: c,
        title: !1,
        closeBtn: !1,
        btn: !1,
        resize: !1,
        end: a
      }, s && !o.config.skin ? {
        skin: c + " layui-layer-hui",
        anim: u
      } : function () {
        return n = n || {}, (n.icon === -1 || n.icon === t && !o.config.skin) && (n.skin = c + " " + (n.skin || "layui-layer-hui")), n;
      }()));
    },
    load: function load(e, t) {
      return r.open(i.extend({
        type: 3,
        icon: e || 0,
        resize: !1,
        shade: .01
      }, t));
    },
    tips: function tips(e, t, n) {
      return r.open(i.extend({
        type: 4,
        content: [e, t],
        closeBtn: !1,
        time: 3e3,
        shade: !1,
        resize: !1,
        fixed: !1,
        maxWidth: 210
      }, n));
    }
  },
      s = function s(e) {
    var t = this;
    t.index = ++r.index, t.config = i.extend({}, t.config, o.config, e), document.body ? t.creat() : setTimeout(function () {
      t.creat();
    }, 30);
  };

  s.pt = s.prototype;
  var l = ["layui-layer", ".layui-layer-title", ".layui-layer-main", ".layui-layer-dialog", "layui-layer-iframe", "layui-layer-content", "layui-layer-btn", "layui-layer-close"];
  l.anim = ["layer-anim-00", "layer-anim-01", "layer-anim-02", "layer-anim-03", "layer-anim-04", "layer-anim-05", "layer-anim-06"], s.pt.config = {
    type: 0,
    shade: .3,
    fixed: !0,
    move: l[1],
    title: "&#x4FE1;&#x606F;",
    offset: "auto",
    area: "auto",
    closeBtn: 1,
    time: 0,
    zIndex: 19891014,
    maxWidth: 360,
    anim: 0,
    isOutAnim: !0,
    icon: -1,
    moveType: 1,
    resize: !0,
    scrollbar: !0,
    tips: 2
  }, s.pt.vessel = function (e, t) {
    var n = this,
        a = n.index,
        r = n.config,
        s = r.zIndex + a,
        f = "object" == _typeof(r.title),
        c = r.maxmin && (1 === r.type || 2 === r.type),
        u = r.title ? '<div class="layui-layer-title" style="' + (f ? r.title[1] : "") + '">' + (f ? r.title[0] : r.title) + "</div>" : "";

    return r.zIndex = s, t([r.shade ? '<div class="layui-layer-shade" id="layui-layer-shade' + a + '" times="' + a + '" style="' + ("z-index:" + (s - 1) + "; ") + '"></div>' : "", '<div class="' + l[0] + (" layui-layer-" + o.type[r.type]) + (0 != r.type && 2 != r.type || r.shade ? "" : " layui-layer-border") + " " + (r.skin || "") + '" id="' + l[0] + a + '" type="' + o.type[r.type] + '" times="' + a + '" showtime="' + r.time + '" conType="' + (e ? "object" : "string") + '" style="z-index: ' + s + "; width:" + r.area[0] + ";height:" + r.area[1] + (r.fixed ? "" : ";position:absolute;") + '">' + (e && 2 != r.type ? "" : u) + '<div id="' + (r.id || "") + '" class="layui-layer-content' + (0 == r.type && r.icon !== -1 ? " layui-layer-padding" : "") + (3 == r.type ? " layui-layer-loading" + r.icon : "") + '">' + (0 == r.type && r.icon !== -1 ? '<i class="layui-layer-ico layui-layer-ico' + r.icon + '"></i>' : "") + (1 == r.type && e ? "" : r.content || "") + '</div><span class="layui-layer-setwin">' + function () {
      var e = c ? '<a class="layui-layer-min" href="javascript:;"><cite></cite></a><a class="layui-layer-ico layui-layer-max" href="javascript:;"></a>' : "";
      return r.closeBtn && (e += '<a class="layui-layer-ico ' + l[7] + " " + l[7] + (r.title ? r.closeBtn : 4 == r.type ? "1" : "2") + '" href="javascript:;"></a>'), e;
    }() + "</span>" + (r.btn ? function () {
      var e = "";
      "string" == typeof r.btn && (r.btn = [r.btn]);

      for (var t = 0, i = r.btn.length; t < i; t++) {
        e += '<a class="' + l[6] + t + '">' + r.btn[t] + "</a>";
      }

      return '<div class="' + l[6] + " layui-layer-btn-" + (r.btnAlign || "") + '">' + e + "</div>";
    }() : "") + (r.resize ? '<span class="layui-layer-resize"></span>' : "") + "</div>"], u, i('<div class="layui-layer-move"></div>')), n;
  }, s.pt.creat = function () {
    var e = this,
        t = e.config,
        a = e.index,
        s = t.content,
        f = "object" == (typeof s === "undefined" ? "undefined" : _typeof(s)),
        c = i("body");

    if (!t.id || !i("#" + t.id)[0]) {
      switch ("string" == typeof t.area && (t.area = "auto" === t.area ? ["", ""] : [t.area, ""]), t.shift && (t.anim = t.shift), 6 == r.ie && (t.fixed = !1), t.type) {
        case 0:
          t.btn = "btn" in t ? t.btn : o.btn[0], r.closeAll("dialog");
          break;

        case 2:
          var s = t.content = f ? t.content : [t.content || "http://layer.layui.com", "auto"];
          t.content = '<iframe scrolling="' + (t.content[1] || "auto") + '" allowtransparency="true" id="' + l[4] + a + '" name="' + l[4] + a + '" onload="this.className=\'\';" class="layui-layer-load" frameborder="0" src-pop="' + t.content[0] + '"></iframe>';
          break;

        case 3:
          delete t.title, delete t.closeBtn, t.icon === -1 && 0 === t.icon, r.closeAll("loading");
          break;

        case 4:
          f || (t.content = [t.content, "body"]), t.follow = t.content[1], t.content = t.content[0] + '<i class="layui-layer-TipsG"></i>', delete t.title, t.tips = "object" == _typeof(t.tips) ? t.tips : [t.tips, !0], t.tipsMore || r.closeAll("tips");
      }

      if (e.vessel(f, function (n, r, u) {
        c.append(n[0]), f ? function () {
          2 == t.type || 4 == t.type ? function () {
            i("body").append(n[1]);
          }() : function () {
            s.parents("." + l[0])[0] || (s.data("display", s.css("display")).show().addClass("layui-layer-wrap").wrap(n[1]), i("#" + l[0] + a).find("." + l[5]).before(r));
          }();
        }() : c.append(n[1]), i(".layui-layer-move")[0] || c.append(o.moveElem = u), e.layero = i("#" + l[0] + a), t.scrollbar || l.html.css("overflow", "hidden").attr("layer-full", a);
      }).auto(a), i("#layui-layer-shade" + e.index).css({
        "background-color": t.shade[1] || "#000",
        opacity: t.shade[0] || t.shade
      }), 2 == t.type && 6 == r.ie && e.layero.find("iframe").attr("src", s[0]), 4 == t.type ? e.tips() : e.offset(), t.fixed && n.on("resize", function () {
        e.offset(), (/^\d+%$/.test(t.area[0]) || /^\d+%$/.test(t.area[1])) && e.auto(a), 4 == t.type && e.tips();
      }), t.time <= 0 || setTimeout(function () {
        r.close(e.index);
      }, t.time), e.move().callback(), l.anim[t.anim]) {
        var u = "layer-anim " + l.anim[t.anim];
        e.layero.addClass(u).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
          i(this).removeClass(u);
        });
      }

      t.isOutAnim && e.layero.data("isOutAnim", !0);
    }
  }, s.pt.auto = function (e) {
    var t = this,
        a = t.config,
        o = i("#" + l[0] + e);
    "" === a.area[0] && a.maxWidth > 0 && (r.ie && r.ie < 8 && a.btn && o.width(o.innerWidth()), o.outerWidth() > a.maxWidth && o.width(a.maxWidth));

    var s = [o.innerWidth(), o.innerHeight()],
        f = o.find(l[1]).outerHeight() || 0,
        c = o.find("." + l[6]).outerHeight() || 0,
        u = function u(e) {
      e = o.find(e), e.height(s[1] - f - c - 2 * (0 | parseFloat(e.css("padding-top"))));
    };

    switch (a.type) {
      case 2:
        u("iframe");
        break;

      default:
        "" === a.area[1] ? a.maxHeight > 0 && o.outerHeight() > a.maxHeight ? (s[1] = a.maxHeight, u("." + l[5])) : a.fixed && s[1] >= n.height() && (s[1] = n.height(), u("." + l[5])) : u("." + l[5]);
    }

    return t;
  }, s.pt.offset = function () {
    var e = this,
        t = e.config,
        i = e.layero,
        a = [i.outerWidth(), i.outerHeight()],
        o = "object" == _typeof(t.offset);

    e.offsetTop = (n.height() - a[1]) / 2, e.offsetLeft = (n.width() - a[0]) / 2, o ? (e.offsetTop = t.offset[0], e.offsetLeft = t.offset[1] || e.offsetLeft) : "auto" !== t.offset && ("t" === t.offset ? e.offsetTop = 0 : "r" === t.offset ? e.offsetLeft = n.width() - a[0] : "b" === t.offset ? e.offsetTop = n.height() - a[1] : "l" === t.offset ? e.offsetLeft = 0 : "lt" === t.offset ? (e.offsetTop = 0, e.offsetLeft = 0) : "lb" === t.offset ? (e.offsetTop = n.height() - a[1], e.offsetLeft = 0) : "rt" === t.offset ? (e.offsetTop = 0, e.offsetLeft = n.width() - a[0]) : "rb" === t.offset ? (e.offsetTop = n.height() - a[1], e.offsetLeft = n.width() - a[0]) : e.offsetTop = t.offset), t.fixed || (e.offsetTop = /%$/.test(e.offsetTop) ? n.height() * parseFloat(e.offsetTop) / 100 : parseFloat(e.offsetTop), e.offsetLeft = /%$/.test(e.offsetLeft) ? n.width() * parseFloat(e.offsetLeft) / 100 : parseFloat(e.offsetLeft), e.offsetTop += n.scrollTop(), e.offsetLeft += n.scrollLeft()), i.attr("minLeft") && (e.offsetTop = n.height() - (i.find(l[1]).outerHeight() || 0), e.offsetLeft = i.css("left")), i.css({
      top: e.offsetTop,
      left: e.offsetLeft
    });
  }, s.pt.tips = function () {
    var e = this,
        t = e.config,
        a = e.layero,
        o = [a.outerWidth(), a.outerHeight()],
        r = i(t.follow);
    r[0] || (r = i("body"));
    var s = {
      width: r.outerWidth(),
      height: r.outerHeight(),
      top: r.offset().top,
      left: r.offset().left
    },
        f = a.find(".layui-layer-TipsG"),
        c = t.tips[0];
    t.tips[1] || f.remove(), s.autoLeft = function () {
      s.left + o[0] - n.width() > 0 ? (s.tipLeft = s.left + s.width - o[0], f.css({
        right: 12,
        left: "auto"
      })) : s.tipLeft = s.left;
    }, s.where = [function () {
      s.autoLeft(), s.tipTop = s.top - o[1] - 10, f.removeClass("layui-layer-TipsB").addClass("layui-layer-TipsT").css("border-right-color", t.tips[1]);
    }, function () {
      s.tipLeft = s.left + s.width + 10, s.tipTop = s.top, f.removeClass("layui-layer-TipsL").addClass("layui-layer-TipsR").css("border-bottom-color", t.tips[1]);
    }, function () {
      s.autoLeft(), s.tipTop = s.top + s.height + 10, f.removeClass("layui-layer-TipsT").addClass("layui-layer-TipsB").css("border-right-color", t.tips[1]);
    }, function () {
      s.tipLeft = s.left - o[0] - 10, s.tipTop = s.top, f.removeClass("layui-layer-TipsR").addClass("layui-layer-TipsL").css("border-bottom-color", t.tips[1]);
    }], s.where[c - 1](), 1 === c ? s.top - (n.scrollTop() + o[1] + 16) < 0 && s.where[2]() : 2 === c ? n.width() - (s.left + s.width + o[0] + 16) > 0 || s.where[3]() : 3 === c ? s.top - n.scrollTop() + s.height + o[1] + 16 - n.height() > 0 && s.where[0]() : 4 === c && o[0] + 16 - s.left > 0 && s.where[1](), a.find("." + l[5]).css({
      "background-color": t.tips[1],
      "padding-right": t.closeBtn ? "30px" : ""
    }), a.css({
      left: s.tipLeft - (t.fixed ? n.scrollLeft() : 0),
      top: s.tipTop - (t.fixed ? n.scrollTop() : 0)
    });
  }, s.pt.move = function () {
    var e = this,
        t = e.config,
        a = i(document),
        s = e.layero,
        l = s.find(t.move),
        f = s.find(".layui-layer-resize"),
        c = {};
    return t.move && l.css("cursor", "move"), l.on("mousedown", function (e) {
      e.preventDefault(), t.move && (c.moveStart = !0, c.offset = [e.clientX - parseFloat(s.css("left")), e.clientY - parseFloat(s.css("top"))], o.moveElem.css("cursor", "move").show());
    }), f.on("mousedown", function (e) {
      e.preventDefault(), c.resizeStart = !0, c.offset = [e.clientX, e.clientY], c.area = [s.outerWidth(), s.outerHeight()], o.moveElem.css("cursor", "se-resize").show();
    }), a.on("mousemove", function (i) {
      if (c.moveStart) {
        var a = i.clientX - c.offset[0],
            o = i.clientY - c.offset[1],
            l = "fixed" === s.css("position");

        if (i.preventDefault(), c.stX = l ? 0 : n.scrollLeft(), c.stY = l ? 0 : n.scrollTop(), !t.moveOut) {
          var f = n.width() - s.outerWidth() + c.stX,
              u = n.height() - s.outerHeight() + c.stY;
          a < c.stX && (a = c.stX), a > f && (a = f), o < c.stY && (o = c.stY), o > u && (o = u);
        }

        s.css({
          left: a,
          top: o
        });
      }

      if (t.resize && c.resizeStart) {
        var a = i.clientX - c.offset[0],
            o = i.clientY - c.offset[1];
        i.preventDefault(), r.style(e.index, {
          width: c.area[0] + a,
          height: c.area[1] + o
        }), c.isResize = !0, t.resizing && t.resizing(s);
      }
    }).on("mouseup", function (e) {
      c.moveStart && (delete c.moveStart, o.moveElem.hide(), t.moveEnd && t.moveEnd(s)), c.resizeStart && (delete c.resizeStart, o.moveElem.hide());
    }), e;
  }, s.pt.callback = function () {
    function e() {
      var e = a.cancel && a.cancel(t.index, n);
      e === !1 || r.close(t.index);
    }

    var t = this,
        n = t.layero,
        a = t.config;
    t.openLayer(), a.success && (2 == a.type ? n.find("iframe").on("load", function () {
      a.success(n, t.index);
    }) : a.success(n, t.index)), 6 == r.ie && t.IE6(n), n.find("." + l[6]).children("a").on("click", function () {
      var e = i(this).index();
      if (0 === e) a.yes ? a.yes(t.index, n) : a.btn1 ? a.btn1(t.index, n) : r.close(t.index);else {
        var o = a["btn" + (e + 1)] && a["btn" + (e + 1)](t.index, n);
        o === !1 || r.close(t.index);
      }
    }), n.find("." + l[7]).on("click", e), a.shadeClose && i("#layui-layer-shade" + t.index).on("click", function () {
      r.close(t.index);
    }), n.find(".layui-layer-min").on("click", function () {
      var e = a.min && a.min(n);
      e === !1 || r.min(t.index, a);
    }), n.find(".layui-layer-max").on("click", function () {
      i(this).hasClass("layui-layer-maxmin") ? (r.restore(t.index), a.restore && a.restore(n)) : (r.full(t.index, a), setTimeout(function () {
        a.full && a.full(n);
      }, 100));
    }), a.end && (o.end[t.index] = a.end);
  }, o.reselect = function () {
    i.each(i("select"), function (e, t) {
      var n = i(this);
      n.parents("." + l[0])[0] || 1 == n.attr("layer") && i("." + l[0]).length < 1 && n.removeAttr("layer").show(), n = null;
    });
  }, s.pt.IE6 = function (e) {
    i("select").each(function (e, t) {
      var n = i(this);
      n.parents("." + l[0])[0] || "none" === n.css("display") || n.attr({
        layer: "1"
      }).hide(), n = null;
    });
  }, s.pt.openLayer = function () {
    var e = this;
    r.zIndex = e.config.zIndex, r.setTop = function (e) {
      var t = function t() {
        r.zIndex++, e.css("z-index", r.zIndex + 1);
      };

      return r.zIndex = parseInt(e[0].style.zIndex), e.on("mousedown", t), r.zIndex;
    };
  }, o.record = function (e) {
    var t = [e.width(), e.height(), e.position().top, e.position().left + parseFloat(e.css("margin-left"))];
    e.find(".layui-layer-max").addClass("layui-layer-maxmin"), e.attr({
      area: t
    });
  }, o.rescollbar = function (e) {
    l.html.attr("layer-full") == e && (l.html[0].style.removeProperty ? l.html[0].style.removeProperty("overflow") : l.html[0].style.removeAttribute("overflow"), l.html.removeAttr("layer-full"));
  }, e.layer = r, r.getChildFrame = function (e, t) {
    return t = t || i("." + l[4]).attr("times"), i("#" + l[0] + t).find("iframe").contents().find(e);
  }, r.getFrameIndex = function (e) {
    return i("#" + e).parents("." + l[4]).attr("times");
  }, r.iframeAuto = function (e) {
    if (e) {
      var t = r.getChildFrame("html", e).outerHeight(),
          n = i("#" + l[0] + e),
          a = n.find(l[1]).outerHeight() || 0,
          o = n.find("." + l[6]).outerHeight() || 0;
      n.css({
        height: t + a + o
      }), n.find("iframe").css({
        height: t
      });
    }
  }, r.iframeSrc = function (e, t) {
    i("#" + l[0] + e).find("iframe").attr("src", t);
  }, r.style = function (e, t, n) {
    var a = i("#" + l[0] + e),
        r = a.find(".layui-layer-content"),
        s = a.attr("type"),
        f = a.find(l[1]).outerHeight() || 0,
        c = a.find("." + l[6]).outerHeight() || 0;
    a.attr("minLeft");
    s !== o.type[3] && s !== o.type[4] && (n || (parseFloat(t.width) <= 260 && (t.width = 260), parseFloat(t.height) - f - c <= 64 && (t.height = 64 + f + c)), a.css(t), c = a.find("." + l[6]).outerHeight(), s === o.type[2] ? a.find("iframe").css({
      height: parseFloat(t.height) - f - c
    }) : r.css({
      height: parseFloat(t.height) - f - c - parseFloat(r.css("padding-top")) - parseFloat(r.css("padding-bottom"))
    }));
  }, r.min = function (e, t) {
    var a = i("#" + l[0] + e),
        s = a.find(l[1]).outerHeight() || 0,
        f = a.attr("minLeft") || 181 * o.minIndex + "px",
        c = a.css("position");
    o.record(a), o.minLeft[0] && (f = o.minLeft[0], o.minLeft.shift()), a.attr("position", c), r.style(e, {
      width: 180,
      height: s,
      left: f,
      top: n.height() - s,
      position: "fixed",
      overflow: "hidden"
    }, !0), a.find(".layui-layer-min").hide(), "page" === a.attr("type") && a.find(l[4]).hide(), o.rescollbar(e), a.attr("minLeft") || o.minIndex++, a.attr("minLeft", f);
  }, r.restore = function (e) {
    var t = i("#" + l[0] + e),
        n = t.attr("area").split(",");
    t.attr("type");
    r.style(e, {
      width: parseFloat(n[0]),
      height: parseFloat(n[1]),
      top: parseFloat(n[2]),
      left: parseFloat(n[3]),
      position: t.attr("position"),
      overflow: "visible"
    }, !0), t.find(".layui-layer-max").removeClass("layui-layer-maxmin"), t.find(".layui-layer-min").show(), "page" === t.attr("type") && t.find(l[4]).show(), o.rescollbar(e);
  }, r.full = function (e) {
    var t,
        a = i("#" + l[0] + e);
    o.record(a), l.html.attr("layer-full") || l.html.css("overflow", "hidden").attr("layer-full", e), clearTimeout(t), t = setTimeout(function () {
      var t = "fixed" === a.css("position");
      r.style(e, {
        top: t ? 0 : n.scrollTop(),
        left: t ? 0 : n.scrollLeft(),
        width: n.width(),
        height: n.height()
      }, !0), a.find(".layui-layer-min").hide();
    }, 100);
  }, r.title = function (e, t) {
    var n = i("#" + l[0] + (t || r.index)).find(l[1]);
    n.html(e);
  }, r.close = function (e) {
    var t = i("#" + l[0] + e),
        n = t.attr("type"),
        a = "layer-anim-close";

    if (t[0]) {
      var s = "layui-layer-wrap",
          f = function f() {
        if (n === o.type[1] && "object" === t.attr("conType")) {
          t.children(":not(." + l[5] + ")").remove();

          for (var a = t.find("." + s), r = 0; r < 2; r++) {
            a.unwrap();
          }

          a.css("display", a.data("display")).removeClass(s);
        } else {
          if (n === o.type[2]) try {
            var f = i("#" + l[4] + e)[0];
            f.contentWindow.document.write(""), f.contentWindow.close(), t.find("." + l[5])[0].removeChild(f);
          } catch (c) {}
          t[0].innerHTML = "", t.remove();
        }

        "function" == typeof o.end[e] && o.end[e](), delete o.end[e];
      };

      t.data("isOutAnim") && t.addClass("layer-anim " + a), i("#layui-layer-moves, #layui-layer-shade" + e).remove(), 6 == r.ie && o.reselect(), o.rescollbar(e), t.attr("minLeft") && (o.minIndex--, o.minLeft.push(t.attr("minLeft"))), r.ie && r.ie < 10 || !t.data("isOutAnim") ? f() : setTimeout(function () {
        f();
      }, 200);
    }
  }, r.closeAll = function (e) {
    i.each(i("." + l[0]), function () {
      var t = i(this),
          n = e ? t.attr("type") === e : 1;
      n && r.close(t.attr("times")), n = null;
    });
  };

  var f = r.cache || {},
      c = function c(e) {
    return f.skin ? " " + f.skin + " " + f.skin + "-" + e : "";
  };

  r.prompt = function (e, t) {
    var a = "";

    if (e = e || {}, "function" == typeof e && (t = e), e.area) {
      var o = e.area;
      a = 'style="width: ' + o[0] + "; height: " + o[1] + ';"', delete e.area;
    }

    var s,
        l = 2 == e.formType ? '<textarea class="layui-layer-input"' + a + ">" + (e.value || "") + "</textarea>" : function () {
      return '<input type="' + (1 == e.formType ? "password" : "text") + '" class="layui-layer-input" value="' + (e.value || "") + '">';
    }(),
        f = e.success;
    return delete e.success, r.open(i.extend({
      type: 1,
      btn: ["&#x786E;&#x5B9A;", "&#x53D6;&#x6D88;"],
      content: l,
      skin: "layui-layer-prompt" + c("prompt"),
      maxWidth: n.width(),
      success: function success(e) {
        s = e.find(".layui-layer-input"), s.focus(), "function" == typeof f && f(e);
      },
      resize: !1,
      yes: function yes(i) {
        var n = s.val();
        "" === n ? s.focus() : n.length > (e.maxlength || 500) ? r.tips("&#x6700;&#x591A;&#x8F93;&#x5165;" + (e.maxlength || 500) + "&#x4E2A;&#x5B57;&#x6570;", s, {
          tips: 1
        }) : t && t(n, i, s);
      }
    }, e));
  }, r.tab = function (e) {
    e = e || {};
    var t = e.tab || {},
        n = "layui-this",
        a = e.success;
    return delete e.success, r.open(i.extend({
      type: 1,
      skin: "layui-layer-tab" + c("tab"),
      resize: !1,
      title: function () {
        var e = t.length,
            i = 1,
            a = "";
        if (e > 0) for (a = '<span class="' + n + '">' + t[0].title + "</span>"; i < e; i++) {
          a += "<span>" + t[i].title + "</span>";
        }
        return a;
      }(),
      content: '<ul class="layui-layer-tabmain">' + function () {
        var e = t.length,
            i = 1,
            a = "";
        if (e > 0) for (a = '<li class="layui-layer-tabli ' + n + '">' + (t[0].content || "no content") + "</li>"; i < e; i++) {
          a += '<li class="layui-layer-tabli">' + (t[i].content || "no  content") + "</li>";
        }
        return a;
      }() + "</ul>",
      success: function success(t) {
        var o = t.find(".layui-layer-title").children(),
            r = t.find(".layui-layer-tabmain").children();
        o.on("mousedown", function (t) {
          t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0;
          var a = i(this),
              o = a.index();
          a.addClass(n).siblings().removeClass(n), r.eq(o).show().siblings().hide(), "function" == typeof e.change && e.change(o);
        }), "function" == typeof a && a(t);
      }
    }, e));
  }, r.photos = function (t, n, a) {
    function o(e, t, i) {
      var n = new Image();
      return n.src = e, n.complete ? t(n) : (n.onload = function () {
        n.onload = null, t(n);
      }, void (n.onerror = function (e) {
        n.onerror = null, i(e);
      }));
    }

    var s = {};

    if (t = t || {}, t.photos) {
      var l = t.photos.constructor === Object,
          f = l ? t.photos : {},
          u = f.data || [],
          d = f.start || 0;
      s.imgIndex = (0 | d) + 1, t.img = t.img || "img";
      var y = t.success;

      if (delete t.success, l) {
        if (0 === u.length) return r.msg("&#x6CA1;&#x6709;&#x56FE;&#x7247;");
      } else {
        var p = i(t.photos),
            h = function h() {
          u = [], p.find(t.img).each(function (e) {
            var t = i(this);
            t.attr("layer-index", e), u.push({
              alt: t.attr("alt"),
              pid: t.attr("layer-pid"),
              src: t.attr("layer-src-pop") || t.attr("src"),
              thumb: t.attr("src")
            });
          });
        };

        if (h(), 0 === u.length) return;
        if (n || p.on("click", t.img, function () {
          var e = i(this),
              n = e.attr("layer-index");
          r.photos(i.extend(t, {
            photos: {
              start: n,
              data: u,
              tab: t.tab
            },
            full: t.full
          }), !0), h();
        }), !n) return;
      }

      s.imgprev = function (e) {
        s.imgIndex--, s.imgIndex < 1 && (s.imgIndex = u.length), s.tabimg(e);
      }, s.imgnext = function (e, t) {
        s.imgIndex++, s.imgIndex > u.length && (s.imgIndex = 1, t) || s.tabimg(e);
      }, s.keyup = function (e) {
        if (!s.end) {
          var t = e.keyCode;
          e.preventDefault(), 37 === t ? s.imgprev(!0) : 39 === t ? s.imgnext(!0) : 27 === t && r.close(s.index);
        }
      }, s.tabimg = function (e) {
        if (!(u.length <= 1)) return f.start = s.imgIndex - 1, r.close(s.index), r.photos(t, !0, e);
      }, s.event = function () {
        s.bigimg.hover(function () {
          s.imgsee.show();
        }, function () {
          s.imgsee.hide();
        }), s.bigimg.find(".layui-layer-imgprev").on("click", function (e) {
          e.preventDefault(), s.imgprev();
        }), s.bigimg.find(".layui-layer-imgnext").on("click", function (e) {
          e.preventDefault(), s.imgnext();
        }), i(document).on("keyup", s.keyup);
      }, s.loadi = r.load(1, {
        shade: !("shade" in t) && .9,
        scrollbar: !1
      }), o(u[d].src, function (n) {
        r.close(s.loadi), s.index = r.open(i.extend({
          type: 1,
          id: "layui-layer-photos",
          area: function () {
            var a = [n.width, n.height],
                o = [i(e).width() - 100, i(e).height() - 100];

            if (!t.full && (a[0] > o[0] || a[1] > o[1])) {
              var r = [a[0] / o[0], a[1] / o[1]];
              r[0] > r[1] ? (a[0] = a[0] / r[0], a[1] = a[1] / r[0]) : r[0] < r[1] && (a[0] = a[0] / r[1], a[1] = a[1] / r[1]);
            }

            return [a[0] + "px", a[1] + "px"];
          }(),
          title: !1,
          shade: .9,
          shadeClose: !0,
          closeBtn: !1,
          move: ".layui-layer-phimg img",
          moveType: 1,
          scrollbar: !1,
          moveOut: !0,
          isOutAnim: !1,
          skin: "layui-layer-photos" + c("photos"),
          content: '<div class="layui-layer-phimg"><img src-pop="' + u[d].src + '" alt="' + (u[d].alt || "") + '" layer-pid="' + u[d].pid + '"><div class="layui-layer-imgsee">' + (u.length > 1 ? '<span class="layui-layer-imguide"><a href="javascript:;" class="layui-layer-iconext layui-layer-imgprev"></a><a href="javascript:;" class="layui-layer-iconext layui-layer-imgnext"></a></span>' : "") + '<div class="layui-layer-imgbar" style="display:' + (a ? "block" : "") + '"><span class="layui-layer-imgtit"><a href="javascript:;">' + (u[d].alt || "") + "</a><em>" + s.imgIndex + "/" + u.length + "</em></span></div></div></div>",
          success: function success(e, i) {
            s.bigimg = e.find(".layui-layer-phimg"), s.imgsee = e.find(".layui-layer-imguide,.layui-layer-imgbar"), s.event(e), t.tab && t.tab(u[d], e), "function" == typeof y && y(e);
          },
          end: function end() {
            s.end = !0, i(document).off("keyup", s.keyup);
          }
        }, t));
      }, function () {
        r.close(s.loadi), r.msg("&#x5F53;&#x524D;&#x56FE;&#x7247;&#x5730;&#x5740;&#x5F02;&#x5E38;<br>&#x662F;&#x5426;&#x7EE7;&#x7EED;&#x67E5;&#x770B;&#x4E0B;&#x4E00;&#x5F20;&#xFF1F;", {
          time: 3e4,
          btn: ["&#x4E0B;&#x4E00;&#x5F20;", "&#x4E0D;&#x770B;&#x4E86;"],
          yes: function yes() {
            u.length > 1 && s.imgnext(!0, !0);
          }
        });
      });
    }
  }, o.run = function (t) {
    i = t, n = i(e), l.html = i("html"), r.open = function (e) {
      var t = new s(e);
      return t.index;
    };
  }, e.layui && layui.define ? (r.ready(), layui.define("jquery", function (t) {
    r.path = layui.cache.dir, o.run(layui.$), e.layer = r, t("layer", r);
  })) : "function" == typeof define && define.amd ? define(["jquery"], function () {
    return o.run(e.jQuery), r;
  }) : function () {
    o.run(e.jQuery), r.ready();
  }();
}(window);
/*

    countUp.js
    by @inorganik

*/
// target = id of html element or var of previously selected html element where counting occurs
// startVal = the value you want to begin at
// endVal = the value you want to arrive at
// decimals = number of decimal places, default 0
// duration = duration of animation in seconds, default 2
// options = optional object of options (see below)

function countUp(target, startVal, endVal, decimals, duration, options) {
  // make sure requestAnimationFrame and cancelAnimationFrame are defined
  // polyfill for browsers without native support
  // by Opera engineer Erik Möller
  var lastTime = 0;
  var vendors = ['webkit', 'moz', 'ms', 'o'];

  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function () {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
  } // default options


  this.options = options || {
    useEasing: true,
    // toggle easing
    useGrouping: true,
    // 1,000,000 vs 1000000
    separator: ',',
    // character to use as a separator
    decimal: '.' // character to use as a decimal

  };
  if (this.options.separator == '') this.options.useGrouping = false;
  if (this.options.prefix == null) this.options.prefix = '';
  if (this.options.suffix == null) this.options.suffix = '';
  var self = this;
  this.d = typeof target === 'string' ? document.getElementById(target) : target;
  this.startVal = Number(startVal);
  this.endVal = Number(endVal);
  this.countDown = this.startVal > this.endVal ? true : false;
  this.startTime = null;
  this.timestamp = null;
  this.remaining = null;
  this.frameVal = this.startVal;
  this.rAF = null;
  this.decimals = Math.max(0, decimals || 0);
  this.dec = Math.pow(10, this.decimals);
  this.duration = duration * 1000 || 2000;

  this.version = function () {
    return '1.3.3';
  }; // Print value to target


  this.printValue = function (value) {
    var result = !isNaN(value) ? self.formatNumber(value) : '--';

    if (self.d.tagName == 'INPUT') {
      this.d.value = result;
    } else if (self.d.tagName == 'text') {
      this.d.textContent = result;
    } else {
      this.d.innerHTML = result;
    }
  }; // Robert Penner's easeOutExpo


  this.easeOutExpo = function (t, b, c, d) {
    return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b;
  };

  this.count = function (timestamp) {
    if (self.startTime === null) self.startTime = timestamp;
    self.timestamp = timestamp;
    var progress = timestamp - self.startTime;
    self.remaining = self.duration - progress; // to ease or not to ease

    if (self.options.useEasing) {
      if (self.countDown) {
        var i = self.easeOutExpo(progress, 0, self.startVal - self.endVal, self.duration);
        self.frameVal = self.startVal - i;
      } else {
        self.frameVal = self.easeOutExpo(progress, self.startVal, self.endVal - self.startVal, self.duration);
      }
    } else {
      if (self.countDown) {
        var i = (self.startVal - self.endVal) * (progress / self.duration);
        self.frameVal = self.startVal - i;
      } else {
        self.frameVal = self.startVal + (self.endVal - self.startVal) * (progress / self.duration);
      }
    } // don't go past endVal since progress can exceed duration in the last frame


    if (self.countDown) {
      self.frameVal = self.frameVal < self.endVal ? self.endVal : self.frameVal;
    } else {
      self.frameVal = self.frameVal > self.endVal ? self.endVal : self.frameVal;
    } // decimal


    self.frameVal = Math.round(self.frameVal * self.dec) / self.dec; // format and print value

    self.printValue(self.frameVal); // whether to continue

    if (progress < self.duration) {
      self.rAF = requestAnimationFrame(self.count);
    } else {
      if (self.callback != null) self.callback();
    }
  };

  this.start = function (callback) {
    self.callback = callback; // make sure values are valid

    if (!isNaN(self.endVal) && !isNaN(self.startVal)) {
      self.rAF = requestAnimationFrame(self.count);
    } else {
      console.log('countUp error: startVal or endVal is not a number');
      self.printValue();
    }

    return false;
  };

  this.stop = function () {
    cancelAnimationFrame(self.rAF);
  };

  this.reset = function () {
    self.startTime = null;
    self.startVal = startVal;
    cancelAnimationFrame(self.rAF);
    self.printValue(self.startVal);
  };

  this.resume = function () {
    self.stop();
    self.startTime = null;
    self.duration = self.remaining;
    self.startVal = self.frameVal;
    requestAnimationFrame(self.count);
  };

  this.update = function (newEndval) {
    self.stop();
    self.startTime = null;
    self.startVal = self.endVal;
    self.endVal = Number(newEndval);
    self.countDown = self.startVal > self.endVal ? true : false;
    self.rAF = requestAnimationFrame(self.count);
  };

  this.formatNumber = function (nStr) {
    nStr = nStr.toFixed(self.decimals);
    nStr += '';
    var x, x1, x2, rgx;
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? self.options.decimal + x[1] : '';
    rgx = /(\d+)(\d{3})/;

    if (self.options.useGrouping) {
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + self.options.separator + '$2');
      }
    }

    return self.options.prefix + x1 + x2 + self.options.suffix;
  }; // format startVal on initialization


  self.printValue(self.startVal);
} // Example:
// var numAnim = new countUp("SomeElementYouWantToAnimate", 0, 99.99, 2, 2.5);
// numAnim.start();
// numAnim.update(135);
// with optional callback:
// numAnim.start(someMethodToCallOnComplete);
//  json2.js
//  2016-10-28
//  Public Domain.
//  NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
//  See http://www.JSON.org/js.html
//  This code should be minified before deployment.
//  See http://javascript.crockford.com/jsmin.html
//  USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
//  NOT CONTROL.
//  This file creates a global JSON object containing two methods: stringify
//  and parse. This file provides the ES5 JSON capability to ES3 systems.
//  If a project might run on IE8 or earlier, then this file should be included.
//  This file does nothing on ES5 systems.
//      JSON.stringify(value, replacer, space)
//          value       any JavaScript value, usually an object or array.
//          replacer    an optional parameter that determines how object
//                      values are stringified for objects. It can be a
//                      function or an array of strings.
//          space       an optional parameter that specifies the indentation
//                      of nested structures. If it is omitted, the text will
//                      be packed without extra whitespace. If it is a number,
//                      it will specify the number of spaces to indent at each
//                      level. If it is a string (such as "\t" or "&nbsp;"),
//                      it contains the characters used to indent at each level.
//          This method produces a JSON text from a JavaScript value.
//          When an object value is found, if the object contains a toJSON
//          method, its toJSON method will be called and the result will be
//          stringified. A toJSON method does not serialize: it returns the
//          value represented by the name/value pair that should be serialized,
//          or undefined if nothing should be serialized. The toJSON method
//          will be passed the key associated with the value, and this will be
//          bound to the value.
//          For example, this would serialize Dates as ISO strings.
//              Date.prototype.toJSON = function (key) {
//                  function f(n) {
//                      // Format integers to have at least two digits.
//                      return (n < 10)
//                          ? "0" + n
//                          : n;
//                  }
//                  return this.getUTCFullYear()   + "-" +
//                       f(this.getUTCMonth() + 1) + "-" +
//                       f(this.getUTCDate())      + "T" +
//                       f(this.getUTCHours())     + ":" +
//                       f(this.getUTCMinutes())   + ":" +
//                       f(this.getUTCSeconds())   + "Z";
//              };
//          You can provide an optional replacer method. It will be passed the
//          key and value of each member, with this bound to the containing
//          object. The value that is returned from your method will be
//          serialized. If your method returns undefined, then the member will
//          be excluded from the serialization.
//          If the replacer parameter is an array of strings, then it will be
//          used to select the members to be serialized. It filters the results
//          such that only members with keys listed in the replacer array are
//          stringified.
//          Values that do not have JSON representations, such as undefined or
//          functions, will not be serialized. Such values in objects will be
//          dropped; in arrays they will be replaced with null. You can use
//          a replacer function to replace those with JSON values.
//          JSON.stringify(undefined) returns undefined.
//          The optional space parameter produces a stringification of the
//          value that is filled with line breaks and indentation to make it
//          easier to read.
//          If the space parameter is a non-empty string, then that string will
//          be used for indentation. If the space parameter is a number, then
//          the indentation will be that many spaces.
//          Example:
//          text = JSON.stringify(["e", {pluribus: "unum"}]);
//          // text is '["e",{"pluribus":"unum"}]'
//          text = JSON.stringify(["e", {pluribus: "unum"}], null, "\t");
//          // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'
//          text = JSON.stringify([new Date()], function (key, value) {
//              return this[key] instanceof Date
//                  ? "Date(" + this[key] + ")"
//                  : value;
//          });
//          // text is '["Date(---current time---)"]'
//      JSON.parse(text, reviver)
//          This method parses a JSON text to produce an object or array.
//          It can throw a SyntaxError exception.
//          The optional reviver parameter is a function that can filter and
//          transform the results. It receives each of the keys and values,
//          and its return value is used instead of the original value.
//          If it returns what it received, then the structure is not modified.
//          If it returns undefined then the member is deleted.
//          Example:
//          // Parse the text. Values that look like ISO date strings will
//          // be converted to Date objects.
//          myData = JSON.parse(text, function (key, value) {
//              var a;
//              if (typeof value === "string") {
//                  a =
//   /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
//                  if (a) {
//                      return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
//                          +a[5], +a[6]));
//                  }
//              }
//              return value;
//          });
//          myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
//              var d;
//              if (typeof value === "string" &&
//                      value.slice(0, 5) === "Date(" &&
//                      value.slice(-1) === ")") {
//                  d = new Date(value.slice(5, -1));
//                  if (d) {
//                      return d;
//                  }
//              }
//              return value;
//          });
//  This is a reference implementation. You are free to copy, modify, or
//  redistribute.

/*jslint
 eval, for, this
 */

/*property
 JSON, apply, call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
 getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
 lastIndex, length, parse, prototype, push, replace, slice, stringify,
 test, toJSON, toString, valueOf
 */
// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.


if ((typeof JSON === "undefined" ? "undefined" : _typeof(JSON)) !== "object") {
  JSON = {};
}

(function () {
  "use strict";

  var rx_one = /^[\],:{}\s]*$/;
  var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
  var rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
  var rx_four = /(?:^|:|,)(?:\s*\[)+/g;
  var rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
  var rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

  function f(n) {
    // Format integers to have at least two digits.
    return n < 10 ? "0" + n : n;
  }

  function this_value() {
    return this.valueOf();
  }

  if (typeof Date.prototype.toJSON !== "function") {
    Date.prototype.toJSON = function () {
      return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null;
    };

    Boolean.prototype.toJSON = this_value;
    Number.prototype.toJSON = this_value;
    String.prototype.toJSON = this_value;
  }

  var gap;
  var indent;
  var meta;
  var rep;

  function quote(string) {
    // If the string contains no control characters, no quote characters, and no
    // backslash characters, then we can safely slap some quotes around it.
    // Otherwise we must also replace the offending characters with safe escape
    // sequences.
    rx_escapable.lastIndex = 0;
    return rx_escapable.test(string) ? "\"" + string.replace(rx_escapable, function (a) {
      var c = meta[a];
      return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
    }) + "\"" : "\"" + string + "\"";
  }

  function str(key, holder) {
    // Produce a string from holder[key].
    var i; // The loop counter.

    var k; // The member key.

    var v; // The member value.

    var length;
    var mind = gap;
    var partial;
    var value = holder[key]; // If the value has a toJSON method, call it to obtain a replacement value.

    if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" && typeof value.toJSON === "function") {
      value = value.toJSON(key);
    } // If we were called with a replacer function, then call the replacer to
    // obtain a replacement value.


    if (typeof rep === "function") {
      value = rep.call(holder, key, value);
    } // What happens next depends on the value's type.


    switch (typeof value === "undefined" ? "undefined" : _typeof(value)) {
      case "string":
        return quote(value);

      case "number":
        // JSON numbers must be finite. Encode non-finite numbers as null.
        return isFinite(value) ? String(value) : "null";

      case "boolean":
      case "null":
        // If the value is a boolean or null, convert it to a string. Note:
        // typeof null does not produce "null". The case is included here in
        // the remote chance that this gets fixed someday.
        return String(value);
      // If the type is "object", we might be dealing with an object or an array or
      // null.

      case "object":
        // Due to a specification blunder in ECMAScript, typeof null is "object",
        // so watch out for that case.
        if (!value) {
          return "null";
        } // Make an array to hold the partial results of stringifying this object value.


        gap += indent;
        partial = []; // Is the value an array?

        if (Object.prototype.toString.apply(value) === "[object Array]") {
          // The value is an array. Stringify every element. Use null as a placeholder
          // for non-JSON values.
          length = value.length;

          for (i = 0; i < length; i += 1) {
            partial[i] = str(i, value) || "null";
          } // Join all of the elements together, separated with commas, and wrap them in
          // brackets.


          v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
          gap = mind;
          return v;
        } // If the replacer is an array, use it to select the members to be stringified.


        if (rep && (typeof rep === "undefined" ? "undefined" : _typeof(rep)) === "object") {
          length = rep.length;

          for (i = 0; i < length; i += 1) {
            if (typeof rep[i] === "string") {
              k = rep[i];
              v = str(k, value);

              if (v) {
                partial.push(quote(k) + (gap ? ": " : ":") + v);
              }
            }
          }
        } else {
          // Otherwise, iterate through all of the keys in the object.
          for (k in value) {
            if (Object.prototype.hasOwnProperty.call(value, k)) {
              v = str(k, value);

              if (v) {
                partial.push(quote(k) + (gap ? ": " : ":") + v);
              }
            }
          }
        } // Join all of the member texts together, separated with commas,
        // and wrap them in braces.


        v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
        gap = mind;
        return v;
    }
  } // If the JSON object does not yet have a stringify method, give it one.


  if (typeof JSON.stringify !== "function") {
    meta = {
      // table of character substitutions
      "\b": "\\b",
      "\t": "\\t",
      "\n": "\\n",
      "\f": "\\f",
      "\r": "\\r",
      "\"": "\\\"",
      "\\": "\\\\"
    };

    JSON.stringify = function (value, replacer, space) {
      // The stringify method takes a value and an optional replacer, and an optional
      // space parameter, and returns a JSON text. The replacer can be a function
      // that can replace values, or an array of strings that will select the keys.
      // A default replacer method can be provided. Use of the space parameter can
      // produce text that is more easily readable.
      var i;
      gap = "";
      indent = ""; // If the space parameter is a number, make an indent string containing that
      // many spaces.

      if (typeof space === "number") {
        for (i = 0; i < space; i += 1) {
          indent += " ";
        } // If the space parameter is a string, it will be used as the indent string.

      } else if (typeof space === "string") {
        indent = space;
      } // If there is a replacer, it must be a function or an array.
      // Otherwise, throw an error.


      rep = replacer;

      if (replacer && typeof replacer !== "function" && ((typeof replacer === "undefined" ? "undefined" : _typeof(replacer)) !== "object" || typeof replacer.length !== "number")) {
        throw new Error("JSON.stringify");
      } // Make a fake root object containing our value under the key of "".
      // Return the result of stringifying the value.


      return str("", {
        "": value
      });
    };
  } // If the JSON object does not yet have a parse method, give it one.


  if (typeof JSON.parse !== "function") {
    JSON.parse = function (text, reviver) {
      // The parse method takes a text and an optional reviver function, and returns
      // a JavaScript value if the text is a valid JSON text.
      var j;

      function walk(holder, key) {
        // The walk method is used to recursively walk the resulting structure so
        // that modifications can be made.
        var k;
        var v;
        var value = holder[key];

        if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object") {
          for (k in value) {
            if (Object.prototype.hasOwnProperty.call(value, k)) {
              v = walk(value, k);

              if (v !== undefined) {
                value[k] = v;
              } else {
                delete value[k];
              }
            }
          }
        }

        return reviver.call(holder, key, value);
      } // Parsing happens in four stages. In the first stage, we replace certain
      // Unicode characters with escape sequences. JavaScript handles many characters
      // incorrectly, either silently deleting them, or treating them as line endings.


      text = String(text);
      rx_dangerous.lastIndex = 0;

      if (rx_dangerous.test(text)) {
        text = text.replace(rx_dangerous, function (a) {
          return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
        });
      } // In the second stage, we run the text against regular expressions that look
      // for non-JSON patterns. We are especially concerned with "()" and "new"
      // because they can cause invocation, and "=" because it can cause mutation.
      // But just to be safe, we want to reject all unexpected forms.
      // We split the second stage into 4 regexp operations in order to work around
      // crippling inefficiencies in IE's and Safari's regexp engines. First we
      // replace the JSON backslash pairs with "@" (a non-JSON character). Second, we
      // replace all simple value tokens with "]" characters. Third, we delete all
      // open brackets that follow a colon or comma or that begin the text. Finally,
      // we look to see that the remaining characters are only whitespace or "]" or
      // "," or ":" or "{" or "}". If that is so, then the text is safe for eval.


      if (rx_one.test(text.replace(rx_two, "@").replace(rx_three, "]").replace(rx_four, ""))) {
        // In the third stage we use the eval function to compile the text into a
        // JavaScript structure. The "{" operator is subject to a syntactic ambiguity
        // in JavaScript: it can begin a block or an object literal. We wrap the text
        // in parens to eliminate the ambiguity.
        j = eval("(" + text + ")"); // In the optional fourth stage, we recursively walk the new structure, passing
        // each name/value pair to a reviver function for possible transformation.

        return typeof reviver === "function" ? walk({
          "": j
        }, "") : j;
      } // If the text is not JSON parseable, then a SyntaxError is thrown.


      throw new SyntaxError("JSON.parse");
    };
  }
})();