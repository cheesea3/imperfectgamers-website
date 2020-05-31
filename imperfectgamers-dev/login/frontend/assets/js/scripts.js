! function (t, e, i) {
    "use strict";
    var o = /^.*(youtu\.be\/|youtube\.com\/v\/|youtube\.com\/embed\/|youtube\.com\/watch\?v=|youtube\.com\/watch\?.*\&v=)([^#\&\?]*).*/i;
    t.fn.backstretch = function (i, o) {
        var a, r = arguments;
        return 0 === t(e).scrollTop() && e.scrollTo(0, 0), this.each(function (e) {
            var n = t(this),
                s = n.data("backstretch");
            if (s) {
                if ("string" == typeof r[0] && "function" == typeof s[r[0]]) {
                    var h = s[r[0]].apply(s, Array.prototype.slice.call(r, 1));
                    return h === s && (h = void 0), void(void 0 !== h && ((a = a || [])[e] = h))
                }
                o = t.extend(s.options, o), "object" == typeof s && "destroy" in s && s.destroy(!0)
            }
            if (!i || i && 0 === i.length) {
                var c = n.css("background-image");
                c && "none" !== c ? i = [{
                    url: n.css("backgroundImage").replace(/url\(|\)|"|'/g, "")
                }] : t.error("No images were supplied for Backstretch, or element must have a CSS-defined background image.")
            }
            s = new b(this, i, o || {}), n.data("backstretch", s)
        }), a ? 1 === a.length ? a[0] : a : this
    }, t.backstretch = function (e, i) {
        return t("body").backstretch(e, i).data("backstretch")
    }, t.expr[":"].backstretch = function (e) {
        return void 0 !== t(e).data("backstretch")
    }, t.fn.backstretch.defaults = {
        duration: 5e3,
        transition: "fade",
        transitionDuration: 0,
        animateFirst: !0,
        alignX: .5,
        alignY: .5,
        paused: !1,
        start: 0,
        preload: 2,
        preloadSize: 1,
        resolutionRefreshRate: 2500,
        resolutionChangeRatioThreshold: .1
    };
    var a, r, n, s, h, c, d = {
            wrap: {
                left: 0,
                top: 0,
                overflow: "hidden",
                margin: 0,
                padding: 0,
                height: "100%",
                width: "100%",
                zIndex: -999999
            },
            itemWrapper: {
                position: "absolute",
                display: "none",
                margin: 0,
                padding: 0,
                border: "none",
                width: "100%",
                height: "100%",
                zIndex: -999999
            },
            item: {
                position: "absolute",
                margin: 0,
                padding: 0,
                border: "none",
                width: "100%",
                height: "100%",
                maxWidth: "none"
            }
        },
        l = (a = function (t) {
            for (var e = 1; e < t.length; e++) {
                for (var i = t[e], o = e; t[o - 1] && parseInt(t[o - 1].width, 10) > parseInt(i.width, 10);) t[o] = t[o - 1], --o;
                t[o] = i
            }
            return t
        }, r = function (t, i, o) {
            for (var a, r, n = e.devicePixelRatio || 1, s = C(), h = (S(), i > t ? "portrait" : t > i ? "landscape" : "square"), c = 0, d = 0; d < o.length && ("string" == typeof (r = o[d]) && (r = o[d] = {
                url: r
            }), r.pixelRatio && "auto" !== r.pixelRatio && parseFloat(r.pixelRatio) !== n || r.deviceOrientation && r.deviceOrientation !== s || r.windowOrientation && r.windowOrientation !== s || r.orientation && r.orientation !== h || (c = d, a = t, "auto" === r.pixelRatio && (t *= n), !(r.width >= a))); d++);
            return o[Math.min(d, c)]
        }, n = function (t, e) {
            if ("string" == typeof t) t = t.replace(/{{(width|height)}}/g, e);
            else if (t instanceof Array)
                for (var i = 0; i < t.length; i++) t[i].src ? t[i].src = n(t[i].src, e) : t[i] = n(t[i], e);
            return t
        }, function (e, i) {
            for (var o = e.width(), s = e.height(), h = [], c = function (t, e) {
                return "width" === e ? o : "height" === e ? s : t
            }, d = 0; d < i.length; d++)
                if (t.isArray(i[d])) {
                    i[d] = a(i[d]);
                    var l = r(o, s, i[d]);
                    h.push(l)
                } else {
                    "string" == typeof i[d] && (i[d] = {
                        url: i[d]
                    });
                    var u = t.extend({}, i[d]);
                    u.url = n(u.url, c), h.push(u)
                }
            return h
        }),
        u = function (t) {
            return o.test(t.url) || t.isVideo
        },
        p = (s = [], h = function (t) {
            for (var e = 0; e < s.length; e++)
                if (s[e].src === t.src) return s[e];
            return s.push(t), t
        }, c = function (t, e, i) {
            "function" == typeof e && e.call(t, i)
        }, function e(i, o, a, r, n) {
            if (void 0 !== i) {
                t.isArray(i) || (i = [i]), arguments.length < 5 && "function" == typeof arguments[arguments.length - 1] && (n = arguments[arguments.length - 1]), o = "function" != typeof o && o ? o : 0, a = "function" == typeof a || !a || a < 0 ? i.length : Math.min(a, i.length), r = "function" != typeof r && r ? r : 1, o >= i.length && (o = 0, a = 0), r < 0 && (r = a), r = Math.min(r, a);
                var s = i.slice(o + r, a - r);
                if (i = i.slice(o, r), a = i.length)
                    for (var d, l = 0, p = function () {
                        ++l === a && (c(i, n, !s), e(s, 0, 0, r, n))
                    }, g = 0; g < i.length; g++) u(i[g]) || ((d = new Image).src = i[g].url, (d = h(d)).complete ? p() : t(d).on("load error", p));
                else c(i, n, !0)
            }
        }),
        g = function (e) {
            for (var i = [], o = 0; o < e.length; o++) "string" == typeof e[o] ? i.push({
                url: e[o]
            }) : t.isArray(e[o]) ? i.push(g(e[o])) : i.push(f(e[o]));
            return i
        },
        f = function (t, i) {
            return (t.centeredX || t.centeredY) && (e.console && e.console.log && e.console.log("jquery.backstretch: `centeredX`/`centeredY` is deprecated, please use `alignX`/`alignY`"), t.centeredX && (t.alignX = .5), t.centeredY && (t.alignY = .5)), void 0 !== t.speed && (e.console && e.console.log && e.console.log("jquery.backstretch: `speed` is deprecated, please use `transitionDuration`"), t.transitionDuration = t.speed, t.transition = "fade"), void 0 !== t.resolutionChangeRatioTreshold && (e.console.log("jquery.backstretch: `treshold` is a typo!"), t.resolutionChangeRatioThreshold = t.resolutionChangeRatioTreshold), void 0 !== t.fadeFirst && (t.animateFirst = t.fadeFirst), void 0 !== t.fade && (t.transitionDuration = t.fade, t.transition = "fade"), t.scale && (t.scale = m(t.scale)), y(t)
        },
        y = function (t, e) {
            return "left" === t.alignX ? t.alignX = 0 : "center" === t.alignX ? t.alignX = .5 : "right" === t.alignX ? t.alignX = 1 : (void 0 !== t.alignX || e) && (t.alignX = parseFloat(t.alignX), isNaN(t.alignX) && (t.alignX = .5)), "top" === t.alignY ? t.alignY = 0 : "center" === t.alignY ? t.alignY = .5 : "bottom" === t.alignY ? t.alignY = 1 : (void 0 !== t.alignX || e) && (t.alignY = parseFloat(t.alignY), isNaN(t.alignY) && (t.alignY = .5)), t
        },
        v = {
            cover: "cover",
            fit: "fit",
            "fit-smaller": "fit-smaller",
            fill: "fill"
        };

    function m(t) {
        return v.hasOwnProperty(t) ? t : "cover"
    }
    var b = function (i, o, a) {
        this.options = t.extend({}, t.fn.backstretch.defaults, a || {}), this.firstShow = !0, f(this.options, !0), this.images = g(t.isArray(o) ? o : [o]), this.options.paused && (this.paused = !0), this.options.start >= this.images.length && (this.options.start = this.images.length - 1), this.options.start < 0 && (this.options.start = 0), this.isBody = i === document.body;
        var r = t(e);
        this.$container = t(i), this.$root = this.isBody ? z ? r : t(document) : this.$container, this.originalImages = this.images, this.images = l(this.options.alwaysTestWindowResolution ? r : this.$root, this.originalImages), p(this.images, this.options.start || 0, this.options.preload || 1);
        var n = this.$container.children(".backstretch").first();
        if (this.$wrap = n.length ? n : t('<div class="backstretch"></div>').css(this.options.bypassCss ? {} : d.wrap).appendTo(this.$container), !this.options.bypassCss) {
            if (!this.isBody) {
                var s = this.$container.css("position"),
                    h = this.$container.css("zIndex");
                this.$container.css({
                    position: "static" === s ? "relative" : s,
                    zIndex: "auto" === h ? 0 : h
                }), this.$wrap.css({
                    zIndex: -999998
                })
            }
            this.$wrap.css({
                position: this.isBody && z ? "fixed" : "absolute"
            })
        }
        this.index = this.options.start, this.show(this.index), r.on("resize.backstretch", t.proxy(this.resize, this)).on("orientationchange.backstretch", t.proxy(function () {
            this.isBody && 0 === e.pageYOffset && (e.scrollTo(0, 1), this.resize())
        }, this))
    };
    b.prototype = {
        resize: function () {
            try {
                var i = this.options.alwaysTestWindowResolution ? t(e) : this.$root,
                    o = i.width(),
                    a = i.height(),
                    r = o / (this._lastResizeContainerWidth || 0),
                    n = a / (this._lastResizeContainerHeight || 0),
                    s = this.options.resolutionChangeRatioThreshold || 0;
                if ((o !== this._lastResizeContainerWidth || a !== this._lastResizeContainerHeight) && (Math.abs(r - 1) >= s || isNaN(r) || Math.abs(n - 1) >= s || isNaN(n)) && (this._lastResizeContainerWidth = o, this._lastResizeContainerHeight = a, this.images = l(i, this.originalImages), this.options.preload && p(this.images, (this.index + 1) % this.images.length, this.options.preload), 1 === this.images.length && this._currentImage.url !== this.images[0].url)) {
                    var h = this;
                    clearTimeout(h._selectAnotherResolutionTimeout), h._selectAnotherResolutionTimeout = setTimeout(function () {
                        h.show(0)
                    }, this.options.resolutionRefreshRate)
                }
                var c, d, u = {
                        left: 0,
                        top: 0,
                        right: "auto",
                        bottom: "auto"
                    },
                    g = this.isBody ? this.$root.width() : this.$root.innerWidth(),
                    f = this.isBody ? e.innerHeight ? e.innerHeight : this.$root.height() : this.$root.innerHeight(),
                    y = this.$itemWrapper.data("width"),
                    v = this.$itemWrapper.data("height"),
                    b = y / v || 1,
                    _ = void 0 === this._currentImage.alignX ? this.options.alignX : this._currentImage.alignX,
                    w = void 0 === this._currentImage.alignY ? this.options.alignY : this._currentImage.alignY,
                    $ = m(this._currentImage.scale || this.options.scale);
                if ("fit" === $ || "fit-smaller" === $) {
                    if (d = v, (c = y) > g || d > f || "fit-smaller" === $) {
                        var k = g / f;
                        k > b ? (c = Math.floor(f * b), d = f) : k < b ? (c = g, d = Math.floor(g / b)) : (c = g, d = f)
                    }
                } else "fill" === $ ? (c = g, d = f) : (c = Math.max(f * b, g), d = Math.max(c / b, f));
                u.top = -(d - f) * w, u.left = -(c - g) * _, u.width = c, u.height = d, this.options.bypassCss || this.$wrap.css({
                    width: g,
                    height: f
                }).find(">.backstretch-item").not(".deleteable").each(function () {
                    t(this).find("img,video,iframe").css(u)
                });
                var T = t.Event("backstretch.resize", {
                    relatedTarget: this.$container[0]
                });
                this.$container.trigger(T, this)
            } catch (t) {}
            return this
        },
        show: function (e, i) {
            if (!(Math.abs(e) > this.images.length - 1)) {
                var o = this,
                    a = o.$wrap.find(">.backstretch-item").addClass("deleteable"),
                    r = o.videoWrapper,
                    n = {
                        relatedTarget: o.$container[0]
                    };
                o.$container.trigger(t.Event("backstretch.before", n), [o, e]), this.index = e;
                var s = o.images[e];
                clearTimeout(o._cycleTimeout), delete o.videoWrapper;
                var h = u(s);
                return h ? (o.videoWrapper = new _(s), o.$item = o.videoWrapper.$video.css("pointer-events", "none")) : o.$item = t("<img />"), o.$itemWrapper = t('<div class="backstretch-item">').append(o.$item), this.options.bypassCss ? o.$itemWrapper.css({
                    display: "none"
                }) : (o.$itemWrapper.css(d.itemWrapper), o.$item.css(d.item)), o.$item.bind(h ? "canplay" : "load", function (s) {
                    var c = t(this).parent(),
                        d = c.data("options");
                    i && (d = t.extend({}, d, i));
                    var l = this.naturalWidth || this.videoWidth || this.width,
                        u = this.naturalHeight || this.videoHeight || this.height;
                    c.data("width", l).data("height", u);
                    var p = function (t) {
                            return void 0 !== d[t] ? d[t] : o.options[t]
                        },
                        g = p("transition"),
                        f = p("transitionEasing"),
                        y = p("transitionDuration"),
                        v = function () {
                            r && (r.stop(), r.destroy()), a.remove(), !o.paused && o.images.length > 1 && o.cycle(), o.options.bypassCss || o.isBody || o.$container.css("background-image", "none"), t(["after", "show"]).each(function () {
                                o.$container.trigger(t.Event("backstretch." + this, n), [o, e])
                            }), h && o.videoWrapper.play()
                        };
                    o.firstShow && !o.options.animateFirst || !y || !g ? (c.show(), v()) : function (e) {
                        var i = e.transition || "fade";
                        "string" == typeof i && i.indexOf("|") > -1 && (i = i.split("|")), i instanceof Array && (i = i[Math.round(Math.random() * (i.length - 1))]);
                        var o = e.new,
                            a = e.old ? e.old : t([]);
                        switch (i.toString().toLowerCase()) {
                            default:
                            case "fade":
                                o.fadeIn({
                                    duration: e.duration,
                                    complete: e.complete,
                                    easing: e.easing || void 0
                                });
                                break;
                            case "fadeinout":
                            case "fade_in_out":
                                var r = function () {
                                    o.fadeIn({
                                        duration: e.duration / 2,
                                        complete: e.complete,
                                        easing: e.easing || void 0
                                    })
                                };a.length ? a.fadeOut({
                                duration: e.duration / 2,
                                complete: r,
                                easing: e.easing || void 0
                            }) : r();
                                break;
                            case "pushleft":
                            case "push_left":
                            case "pushright":
                            case "push_right":
                            case "pushup":
                            case "push_up":
                            case "pushdown":
                            case "push_down":
                            case "coverleft":
                            case "cover_left":
                            case "coverright":
                            case "cover_right":
                            case "coverup":
                            case "cover_up":
                            case "coverdown":
                            case "cover_down":
                                var n = i.match(/^(cover|push)_?(.*)$/),
                                    s = "left" === n[2] ? "right" : "right" === n[2] ? "left" : "down" === n[2] ? "top" : "up" === n[2] ? "bottom" : "right",
                                    h = {
                                        display: ""
                                    },
                                    c = {};
                                if (h[s] = "-100%", c[s] = 0, o.css(h).animate(c, {
                                    duration: e.duration,
                                    complete: function () {
                                        o.css(s, ""), e.complete.apply(this, arguments)
                                    },
                                    easing: e.easing || void 0
                                }), "push" === n[1] && a.length) {
                                    var d = {};
                                    d[s] = "100%", a.animate(d, {
                                        duration: e.duration,
                                        complete: function () {
                                            a.css("display", "none")
                                        },
                                        easing: e.easing || void 0
                                    })
                                }
                        }
                    }({
                        new: c,
                        old: a,
                        transition: g,
                        duration: y,
                        easing: f,
                        complete: v
                    }), o.firstShow = !1, o.resize()
                }), o.$itemWrapper.appendTo(o.$wrap), o.$item.attr("alt", s.alt || ""), o.$itemWrapper.data("options", s), h || o.$item.attr("src", s.url), o._currentImage = s, o
            }
        },
        current: function () {
            return this.index
        },
        next: function () {
            var t = Array.prototype.slice.call(arguments, 0);
            return t.unshift(this.index < this.images.length - 1 ? this.index + 1 : 0), this.show.apply(this, t)
        },
        prev: function () {
            var t = Array.prototype.slice.call(arguments, 0);
            return t.unshift(0 === this.index ? this.images.length - 1 : this.index - 1), this.show.apply(this, t)
        },
        pause: function () {
            return this.paused = !0, this.videoWrapper && this.videoWrapper.pause(), this
        },
        resume: function () {
            return this.paused = !1, this.videoWrapper && this.videoWrapper.play(), this.cycle(), this
        },
        cycle: function () {
            if (this.images.length > 1) {
                clearTimeout(this._cycleTimeout);
                var e = this._currentImage && this._currentImage.duration || this.options.duration,
                    i = u(this._currentImage),
                    o = function () {
                        this.$item.off(".cycle"), this.paused || this.next()
                    };
                if (i) {
                    if (!this._currentImage.loop) {
                        var a = 0;
                        this.$item.on("playing.cycle", function () {
                            var e = t(this).data("player");
                            clearTimeout(a), a = setTimeout(function () {
                                e.pause(), e.$video.trigger("ended")
                            }, 1e3 * (e.getDuration() - e.getCurrentTime()))
                        }).on("ended.cycle", function () {
                            clearTimeout(a)
                        })
                    }
                    this.$item.on("error.cycle initerror.cycle", t.proxy(o, this))
                }
                i && !this._currentImage.duration ? this.$item.on("ended.cycle", t.proxy(o, this)) : this._cycleTimeout = setTimeout(t.proxy(o, this), e)
            }
            return this
        },
        destroy: function (i) {
            t(e).off("resize.backstretch orientationchange.backstretch"), this.videoWrapper && this.videoWrapper.destroy(), clearTimeout(this._cycleTimeout), i || this.$wrap.remove(), this.$container.removeData("backstretch")
        }
    };
    var _ = function () {
        this.init.apply(this, arguments)
    };
    _.prototype.init = function (i) {
        var a, r = this,
            n = function () {
                r.$video = a, r.video = a[0]
            },
            s = "video";
        if (i.url instanceof Array || !o.test(i.url) || (s = "youtube"), r.type = s, "youtube" === s) {
            _.loadYoutubeAPI(), r.ytId = i.url.match(o)[2];
            var h = "https://www.youtube.com/embed/" + r.ytId + "?rel=0&autoplay=0&showinfo=0&controls=0&modestbranding=1&cc_load_policy=0&disablekb=1&iv_load_policy=3&loop=0&enablejsapi=1&origin=" + encodeURIComponent(e.location.origin);
            r.__ytStartMuted = !!i.mute || void 0 === i.mute, a = t("<iframe />").attr({
                src_to_load: h
            }).css({
                border: 0,
                margin: 0,
                padding: 0
            }).data("player", r), i.loop && a.on("ended.loop", function () {
                r.__manuallyStopped || r.play()
            }), r.ytReady = !1, n(), e.YT && e.YT.loaded ? (r._initYoutube(), a.trigger("initsuccess")) : t(e).one("youtube_api_load", function () {
                r._initYoutube(), a.trigger("initsuccess")
            })
        } else {
            a = t("<video>").prop("autoplay", !1).prop("controls", !1).prop("loop", !!i.loop).prop("muted", !!i.mute || void 0 === i.mute).prop("preload", "auto").prop("poster", i.poster || "");
            for (var c = i.url instanceof Array ? i.url : [i.url], d = 0; d < c.length; d++) {
                var l = c[d];
                "string" == typeof l && (l = {
                    src: l
                }), t("<source>").attr("src", l.src).attr("type", l.type || null).appendTo(a)
            }
            a[0].canPlayType && c.length ? a.trigger("initsuccess") : a.trigger("initerror"), n()
        }
    }, _.prototype._initYoutube = function () {
        var i = this,
            o = e.YT;
        i.$video.attr("src", i.$video.attr("src_to_load")).removeAttr("src_to_load");
        var a = !!i.$video[0].parentNode;
        if (!a) {
            var r = t("<div>").css("display", "none !important").appendTo(document.body);
            i.$video.appendTo(r)
        }
        var n = new o.Player(i.video, {
            events: {
                onReady: function () {
                    i.__ytStartMuted && n.mute(), a || (i.$video[0].parentNode === r[0] && i.$video.detach(), r.remove()), i.ytReady = !0, i._updateYoutubeSize(), i.$video.trigger("canplay")
                },
                onStateChange: function (t) {
                    switch (t.data) {
                        case o.PlayerState.PLAYING:
                            i.$video.trigger("playing");
                            break;
                        case o.PlayerState.ENDED:
                            i.$video.trigger("ended");
                            break;
                        case o.PlayerState.PAUSED:
                            i.$video.trigger("pause");
                            break;
                        case o.PlayerState.BUFFERING:
                            i.$video.trigger("waiting");
                            break;
                        case o.PlayerState.CUED:
                            i.$video.trigger("canplay")
                    }
                },
                onPlaybackQualityChange: function () {
                    i._updateYoutubeSize(), i.$video.trigger("resize")
                },
                onError: function (t) {
                    i.hasError = !0, i.$video.trigger({
                        type: "error",
                        error: t
                    })
                }
            }
        });
        return i.ytPlayer = n, i
    }, _.prototype._updateYoutubeSize = function () {
        switch (this.ytPlayer.getPlaybackQuality() || "medium") {
            case "small":
                this.video.videoWidth = 426, this.video.videoHeight = 240;
                break;
            case "medium":
                this.video.videoWidth = 640, this.video.videoHeight = 360;
                break;
            default:
            case "large":
                this.video.videoWidth = 854, this.video.videoHeight = 480;
                break;
            case "hd720":
                this.video.videoWidth = 1280, this.video.videoHeight = 720;
                break;
            case "hd1080":
                this.video.videoWidth = 1920, this.video.videoHeight = 1080;
                break;
            case "highres":
                this.video.videoWidth = 2560, this.video.videoHeight = 1440
        }
        return this
    }, _.prototype.play = function () {
        return this.__manuallyStopped = !1, "youtube" === this.type ? this.ytReady && (this.$video.trigger("play"), this.ytPlayer.playVideo()) : this.video.play(), this
    }, _.prototype.pause = function () {
        return this.__manuallyStopped = !1, "youtube" === this.type ? this.ytReady && this.ytPlayer.pauseVideo() : this.video.pause(), this
    }, _.prototype.stop = function () {
        return this.__manuallyStopped = !0, "youtube" === this.type ? this.ytReady && (this.ytPlayer.pauseVideo(), this.ytPlayer.seekTo(0)) : (this.video.pause(), this.video.currentTime = 0), this
    }, _.prototype.destroy = function () {
        return this.ytPlayer && this.ytPlayer.destroy(), this.$video.remove(), this
    }, _.prototype.getCurrentTime = function (t) {
        return "youtube" !== this.type ? this.video.currentTime : this.ytReady ? this.ytPlayer.getCurrentTime() : 0
    }, _.prototype.setCurrentTime = function (t) {
        return "youtube" === this.type ? this.ytReady && this.ytPlayer.seekTo(t, !0) : this.video.currentTime = t, this
    }, _.prototype.getDuration = function () {
        return "youtube" !== this.type ? this.video.duration : this.ytReady ? this.ytPlayer.getDuration() : 0
    }, _.loadYoutubeAPI = function () {
        e.YT && e.__yt_load_event_interval__ || (e.YT || t("script[src*=www\\.youtube\\.com\\/iframe_api]").length || t('<script type="text/javascript" src="https://www.youtube.com/iframe_api">').appendTo("body"), e.__yt_load_event_interval__ = setInterval(function () {
            e.YT && e.YT.loaded && (t(e).trigger("youtube_api_load"), clearTimeout(e.__yt_load_event_interval__), delete e.__yt_load_event_interval__)
        }, 50))
    };
    var w, $, k, T, x, W, I, R, Y, P, C = function () {
            if ("matchMedia" in e) {
                if (e.matchMedia("(orientation: portrait)").matches) return "portrait";
                if (e.matchMedia("(orientation: landscape)").matches) return "landscape"
            }
            return screen.height > screen.width ? "portrait" : "landscape"
        },
        S = function () {
            return e.innerHeight > e.innerWidth ? "portrait" : e.innerWidth > e.innerHeight ? "landscape" : "square"
        },
        z = (w = navigator.userAgent, $ = navigator.platform, k = w.match(/AppleWebKit\/([0-9]+)/), T = !!k && k[1], x = w.match(/Fennec\/([0-9]+)/), W = !!x && x[1], I = w.match(/Opera Mobi\/([0-9]+)/), R = !!I && I[1], Y = w.match(/MSIE ([0-9]+)/), P = !!Y && Y[1], !(($.indexOf("iPhone") > -1 || $.indexOf("iPad") > -1 || $.indexOf("iPod") > -1) && T && T < 534 || e.operamini && "[object OperaMini]" === {}.toString.call(e.operamini) || I && R < 7458 || w.indexOf("Android") > -1 && T && T < 533 || W && W < 6 || "palmGetResource" in e && T && T < 534 || w.indexOf("MeeGo") > -1 && w.indexOf("NokiaBrowser/8.5.0") > -1 || P && P <= 6))
}(jQuery, window);
var backgrounds = 0;

function shuffle(t) {
    var e, i, o;
    for (o = t.length; o; o--) e = Math.floor(Math.random() * o), i = t[o - 1], t[o - 1] = t[e], t[e] = i
}
$(document).ready(function () {
    if (void 0 !== backgrounds && ($("body").append('<div class="overlay"></div>'), 1 == backgrounds.random && shuffle(backgrounds.list), backgrounds.list.length > 0 && "" != backgrounds.list[0])) {
        $.backstretch(backgrounds.list[0], {
            fade: backgrounds.fade
        });
        var t = 1;
        setInterval(function () {
            $.backstretch(backgrounds.list[t], {
                fade: backgrounds.fade
            }), ++t >= backgrounds.list.length && (t = 0)
        }, backgrounds.duration)
    }
});
