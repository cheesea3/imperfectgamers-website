/*!
 * colpick Color Picker
 * https://github.com/mrgrain/colpick
 *
 * Copyright 2013, 2015 Moritz Kornher, Jose Vargas, Stefan Petre
 * Released under the MIT license and GPLv2 license
 * https://github.com/mrgrain/colpick/blob/master/LICENSE
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    var colpick = function () {
        var
            tpl = '<div class="colpick"><div class="colpick_color"><div class="colpick_color_overlay1"><div class="colpick_color_overlay2"><div class="colpick_selector_outer"><div class="colpick_selector_inner"></div></div></div></div></div><div class="colpick_hue"><div class="colpick_hue_arrs"><div class="colpick_hue_larr"></div><div class="colpick_hue_rarr"></div></div></div><div class="colpick_new_color"></div><div class="colpick_current_color"></div><div class="colpick_hex_field"><div class="colpick_field_letter">#</div><input type="text" maxlength="6" size="6" /></div><div class="colpick_rgb_r colpick_field"><div class="colpick_field_letter">R</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_rgb_g colpick_field"><div class="colpick_field_letter">G</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_rgb_b colpick_field"><div class="colpick_field_letter">B</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_hsb_h colpick_field"><div class="colpick_field_letter">H</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_hsb_s colpick_field"><div class="colpick_field_letter">S</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_hsb_b colpick_field"><div class="colpick_field_letter">B</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_submit"></div></div>',
            defaults = {
                showEvent: 'click',
                onShow: function () {
                },
                onBeforeShow: function () {
                },
                onHide: function () {
                },
                onChange: function () {
                },
                onSubmit: function () {
                },
                colorScheme: 'light',
                color: 'auto',
                livePreview: true,
                flat: false,
                layout: 'full',
                submit: 1,
                submitText: 'OK',
                height: 156,
                polyfill: false,
                styles: false
            },
            //Fill the inputs of the plugin
            fillRGBFields = function (hsb, cal) {
                var rgb = hsbToRgb(hsb);
                $(cal).data('colpick').fields
                    .eq(1).val(rgb.r).end()
                    .eq(2).val(rgb.g).end()
                    .eq(3).val(rgb.b).end();
            },
            fillHSBFields = function (hsb, cal) {
                $(cal).data('colpick').fields
                    .eq(4).val(Math.round(hsb.h)).end()
                    .eq(5).val(Math.round(hsb.s)).end()
                    .eq(6).val(Math.round(hsb.b)).end();
            },
            fillHexFields = function (hsb, cal) {
                $(cal).data('colpick').fields.eq(0).val(hsbToHex(hsb));
            },
            //Set the round selector position
            setSelector = function (hsb, cal) {
                $(cal).data('colpick').selector.css('backgroundColor', '#' + hsbToHex({h: hsb.h, s: 100, b: 100}));
                $(cal).data('colpick').selectorIndic.css({
                    left: parseInt($(cal).data('colpick').height * hsb.s / 100, 10),
                    top: parseInt($(cal).data('colpick').height * (100 - hsb.b) / 100, 10)
                });
            },
            //Set the hue selector position
            setHue = function (hsb, cal) {
                $(cal).data('colpick').hue.css('top', parseInt($(cal).data('colpick').height - $(cal).data('colpick').height * hsb.h / 360, 10));
            },
            //Set current and new colors
            setCurrentColor = function (hsb, cal) {
                $(cal).data('colpick').currentColor.css('backgroundColor', '#' + hsbToHex(hsb));
            },
            setNewColor = function (hsb, cal) {
                $(cal).data('colpick').newColor.css('backgroundColor', '#' + hsbToHex(hsb));
            },
            //Called when the new color is changed
            change = function () {
                var cal = $(this).parent().parent(), col;
                if (this.parentNode.className.indexOf('_hex') > 0) {
                    cal.data('colpick').color = col = hexToHsb(fixHex(this.value));
                    fillRGBFields(col, cal.get(0));
                    fillHSBFields(col, cal.get(0));
                } else if (this.parentNode.className.indexOf('_hsb') > 0) {
                    cal.data('colpick').color = col = fixHSB({
                        h: parseInt(cal.data('colpick').fields.eq(4).val(), 10),
                        s: parseInt(cal.data('colpick').fields.eq(5).val(), 10),
                        b: parseInt(cal.data('colpick').fields.eq(6).val(), 10)
                    });
                    fillRGBFields(col, cal.get(0));
                    fillHexFields(col, cal.get(0));
                } else {
                    cal.data('colpick').color = col = rgbToHsb(fixRGB({
                        r: parseInt(cal.data('colpick').fields.eq(1).val(), 10),
                        g: parseInt(cal.data('colpick').fields.eq(2).val(), 10),
                        b: parseInt(cal.data('colpick').fields.eq(3).val(), 10)
                    }));
                    fillHexFields(col, cal.get(0));
                    fillHSBFields(col, cal.get(0));
                }
                setSelector(col, cal.get(0));
                setHue(col, cal.get(0));
                setNewColor(col, cal.get(0));
                cal.data('colpick').onChange.apply(cal.parent(), [col, hsbToHex(col), hsbToRgb(col), cal.data('colpick').el, 0]);
            },
            //Change style on blur and on focus of inputs
            blur = function () {
                $(this).parent().removeClass('colpick_focus');
            },
            focus = function () {
                $(this).parent().parent().data('colpick').fields.parent().removeClass('colpick_focus');
                $(this).parent().addClass('colpick_focus');
            },
            //Increment/decrement arrows functions
            downIncrement = function (ev) {
                ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
                var field = $(this).parent().find('input').focus();
                var current = {
                    el: $(this).parent().addClass('colpick_slider'),
                    max: this.parentNode.className.indexOf('_hsb_h') > 0 ? 360 : (this.parentNode.className.indexOf('_hsb') > 0 ? 100 : 255),
                    y: ev.pageY,
                    field: field,
                    val: parseInt(field.val(), 10),
                    preview: $(this).parent().parent().data('colpick').livePreview
                };
                $(document).mouseup(current, upIncrement);
                $(document).mousemove(current, moveIncrement);
            },
            moveIncrement = function (ev) {
                ev.data.field.val(Math.max(0, Math.min(ev.data.max, parseInt(ev.data.val - ev.pageY + ev.data.y, 10))));
                if (ev.data.preview) {
                    change.apply(ev.data.field.get(0), [true]);
                }
                return false;
            },
            upIncrement = function (ev) {
                change.apply(ev.data.field.get(0), [true]);
                ev.data.el.removeClass('colpick_slider').find('input').focus();
                $(document).off('mouseup', upIncrement);
                $(document).off('mousemove', moveIncrement);
                return false;
            },
            //Hue slider functions
            downHue = function (ev) {
                ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
                var current = {
                    cal: $(this).parent(),
                    y: $(this).offset().top
                };
                $(document).on('mouseup touchend', current, upHue);
                $(document).on('mousemove touchmove', current, moveHue);

                var pageY = ((ev.type == 'touchstart') ? ev.originalEvent.changedTouches[0].pageY : ev.pageY );
                change.apply(
                    current.cal.data('colpick')
                        .fields.eq(4).val(parseInt(360 * (current.cal.data('colpick').height - (pageY - current.y)) / current.cal.data('colpick').height, 10))
                        .get(0),
                    [current.cal.data('colpick').livePreview]
                );
                return false;
            },
            moveHue = function (ev) {
                var pageY = ((ev.type == 'touchmove') ? ev.originalEvent.changedTouches[0].pageY : ev.pageY );
                change.apply(
                    ev.data.cal.data('colpick')
                        .fields.eq(4).val(parseInt(360 * (ev.data.cal.data('colpick').height - Math.max(0, Math.min(ev.data.cal.data('colpick').height, (pageY - ev.data.y)))) / ev.data.cal.data('colpick').height, 10))
                        .get(0),
                    [ev.data.preview]
                );
                return false;
            },
            upHue = function (ev) {
                fillRGBFields(ev.data.cal.data('colpick').color, ev.data.cal.get(0));
                fillHexFields(ev.data.cal.data('colpick').color, ev.data.cal.get(0));
                $(document).off('mouseup touchend', upHue);
                $(document).off('mousemove touchmove', moveHue);
                return false;
            },
            //Color selector functions
            downSelector = function (ev) {
                ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
                var current = {
                    cal: $(this).parent(),
                    pos: $(this).offset()
                };
                current.preview = current.cal.data('colpick').livePreview;

                $(document).on('mouseup touchend', current, upSelector);
                $(document).on('mousemove touchmove', current, moveSelector);

                var pageX, pageY;
                if (ev.type == 'touchstart') {
                    pageX = ev.originalEvent.changedTouches[0].pageX;
                    pageY = ev.originalEvent.changedTouches[0].pageY;
                } else {
                    pageX = ev.pageX;
                    pageY = ev.pageY;
                }

                change.apply(
                    current.cal.data('colpick').fields
                        .eq(6).val(parseInt(100 * (current.cal.data('colpick').height - (pageY - current.pos.top)) / current.cal.data('colpick').height, 10)).end()
                        .eq(5).val(parseInt(100 * (pageX - current.pos.left) / current.cal.data('colpick').height, 10))
                        .get(0),
                    [current.preview]
                );
                return false;
            },
            moveSelector = function (ev) {
                var pageX, pageY;
                if (ev.type == 'touchmove') {
                    pageX = ev.originalEvent.changedTouches[0].pageX;
                    pageY = ev.originalEvent.changedTouches[0].pageY;
                } else {
                    pageX = ev.pageX;
                    pageY = ev.pageY;
                }

                change.apply(
                    ev.data.cal.data('colpick').fields
                        .eq(6).val(parseInt(100 * (ev.data.cal.data('colpick').height - Math.max(0, Math.min(ev.data.cal.data('colpick').height, (pageY - ev.data.pos.top)))) / ev.data.cal.data('colpick').height, 10)).end()
                        .eq(5).val(parseInt(100 * (Math.max(0, Math.min(ev.data.cal.data('colpick').height, (pageX - ev.data.pos.left)))) / ev.data.cal.data('colpick').height, 10))
                        .get(0),
                    [ev.data.preview]
                );
                return false;
            },
            upSelector = function (ev) {
                fillRGBFields(ev.data.cal.data('colpick').color, ev.data.cal.get(0));
                fillHexFields(ev.data.cal.data('colpick').color, ev.data.cal.get(0));
                $(document).off('mouseup touchend', upSelector);
                $(document).off('mousemove touchmove', moveSelector);
                return false;
            },
            //Submit button
            clickSubmit = function () {
                var cal = $(this).parent();
                var col = cal.data('colpick').color;
                cal.data('colpick').origColor = col;
                setCurrentColor(col, cal.get(0));
                cal.data('colpick').onSubmit(col, hsbToHex(col), hsbToRgb(col), cal.data('colpick').el);
            },
            //Show/hide the color picker
            show = function (ev) {
                if (ev) {
                    // Prevent the trigger of any direct parent
                    ev.stopPropagation();
                }
                var cal = $('#' + $(this).data('colpickId'));
                if (ev && !cal.data('colpick').polyfill) {
                    ev.preventDefault();
                }
                cal.data('colpick').onBeforeShow.apply(this, [cal.get(0)]);
                var pos = $(this).offset();
                var top = pos.top + this.offsetHeight;
                var left = pos.left;
                var viewPort = getViewport();
                var calW = cal.width();
                if (left + calW > viewPort.l + viewPort.w) {
                    left -= calW;
                }
                cal.css({left: left + 'px', top: top + 'px'});
                if (cal.data('colpick').onShow.apply(this, [cal.get(0)]) != false) {
                    cal.show();
                }
                //Hide when user clicks outside
                $('html').mousedown({cal: cal}, hide);
                cal.mousedown(function (ev) {
                    ev.stopPropagation();
                })
            },
            hide = function (ev) {
                var cal = $('#' + $(this).data('colpickId'));
                if (ev) {
                    cal = ev.data.cal;
                }
                if (cal.data('colpick').onHide.apply(this, [cal.get(0)]) != false) {
                    cal.hide();
                }
                $('html').off('mousedown', hide);
            },
            getViewport = function () {
                var m = document.compatMode == 'CSS1Compat';
                return {
                    l: window.pageXOffset || (m ? document.documentElement.scrollLeft : document.body.scrollLeft),
                    w: window.innerWidth || (m ? document.documentElement.clientWidth : document.body.clientWidth)
                };
            },
            //Fix the values if the user enters a negative or high value
            fixHSB = function (hsb) {
                return {
                    h: Math.min(360, Math.max(0, hsb.h)),
                    s: Math.min(100, Math.max(0, hsb.s)),
                    b: Math.min(100, Math.max(0, hsb.b))
                };
            },
            fixRGB = function (rgb) {
                return {
                    r: Math.min(255, Math.max(0, rgb.r)),
                    g: Math.min(255, Math.max(0, rgb.g)),
                    b: Math.min(255, Math.max(0, rgb.b))
                };
            },
            fixHex = function (hex) {
                var len = 6 - hex.length;
                if (len == 3) {
                    var e = [];
                    for (var j = 0; j < len; j++) {
                        e.push(hex[j]);
                        e.push(hex[j]);
                    }
                    hex = e.join('');
                } else {
                    if (len > 0) {
                        var o = [];
                        for (var i = 0; i < len; i++) {
                            o.push('0');
                        }
                        o.push(hex);
                        hex = o.join('');
                    }
                }
                return hex;
            },
            restoreOriginal = function () {
                var cal = $(this).parent();
                var col = cal.data('colpick').origColor;
                cal.data('colpick').color = col;
                fillRGBFields(col, cal.get(0));
                fillHexFields(col, cal.get(0));
                fillHSBFields(col, cal.get(0));
                setSelector(col, cal.get(0));
                setHue(col, cal.get(0));
                setNewColor(col, cal.get(0));
            };
        return {
            init: function (opt) {
                opt = $.extend({}, defaults, opt || {});
                //Set color
                if (opt.color === 'auto') {
                } else if (typeof opt.color == 'string') {
                    opt.color = hexToHsb(opt.color);
                } else if (opt.color.r != undefined && opt.color.g != undefined && opt.color.b != undefined) {
                    opt.color = rgbToHsb(opt.color);
                } else if (opt.color.h != undefined && opt.color.s != undefined && opt.color.b != undefined) {
                    opt.color = fixHSB(opt.color);
                } else {
                    return this;
                }

                //For each selected DOM element
                return this.each(function () {
                    //If the element does not have an ID
                    if (!$(this).data('colpickId')) {
                        var options = $.extend({}, opt);
                        //Color
                        if (opt.color === 'auto') {
                            options.color = $(this).val() ? hexToHsb($(this).val()) : {h: 0, s: 0, b: 0};
                        }
                        options.origColor = options.color;

                        //Polyfill
                        if (typeof opt.polyfill == 'function') {
                            options.polyfill = opt.polyfill(this);
                        }
                        if (options.polyfill && $(this).is('input') && this.type === "color") {
                            return;
                        }

                        //Generate and assign a random ID
                        var id = 'collorpicker_' + parseInt(Math.random() * 1000);
                        $(this).data('colpickId', id);
                        //Set the tpl's ID and get the HTML
                        var cal = $(tpl).attr('id', id);
                        //Add class according to layout
                        cal.addClass('colpick_' + options.layout + (options.submit ? '' : ' colpick_' + options.layout + '_ns'));
                        //Add class if the color scheme is not default
                        if (options.colorScheme != 'light') {
                            cal.addClass('colpick_' + options.colorScheme);
                        }
                        //Setup submit button
                        cal.find('div.colpick_submit').html(options.submitText).click(clickSubmit);
                        //Setup input fields
                        options.fields = cal.find('input').change(change).blur(blur).focus(focus);
                        cal.find('div.colpick_field_arrs').mousedown(downIncrement).end().find('div.colpick_current_color').click(restoreOriginal);
                        //Setup hue selector
                        options.selector = cal.find('div.colpick_color').on('mousedown touchstart', downSelector);
                        options.selectorIndic = options.selector.find('div.colpick_selector_outer');
                        //Store parts of the plugin
                        options.el = this;
                        options.hue = cal.find('div.colpick_hue_arrs');
                        var huebar = options.hue.parent();
                        //Paint the hue bar
                        var UA = navigator.userAgent.toLowerCase();
                        var isIE = navigator.appName === 'Microsoft Internet Explorer';
                        var IEver = isIE ? parseFloat(UA.match(/msie ([0-9]*[\.0-9]+)/)[1]) : 0;
                        var ngIE = ( isIE && IEver < 10 );
                        var stops = ['#ff0000', '#ff0080', '#ff00ff', '#8000ff', '#0000ff', '#0080ff', '#00ffff', '#00ff80', '#00ff00', '#80ff00', '#ffff00', '#ff8000', '#ff0000'];
                        if (ngIE) {
                            var i, div;
                            for (i = 0; i <= 11; i++) {
                                div = $('<div></div>').attr('style', 'height:8.333333%; filter:progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=' + stops[i] + ', endColorstr=' + stops[i + 1] + '); -ms-filter: "progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=' + stops[i] + ', endColorstr=' + stops[i + 1] + ')";');
                                huebar.append(div);
                            }
                        } else {
                            var stopList = stops.join(',');
                            huebar.attr('style', 'background:-webkit-linear-gradient(top,' + stopList + '); background: -o-linear-gradient(top,' + stopList + '); background: -ms-linear-gradient(top,' + stopList + '); background:-moz-linear-gradient(top,' + stopList + '); -webkit-linear-gradient(top,' + stopList + '); background:linear-gradient(to bottom,' + stopList + '); ');
                        }
                        cal.find('div.colpick_hue').on('mousedown touchstart', downHue);
                        options.newColor = cal.find('div.colpick_new_color');
                        options.currentColor = cal.find('div.colpick_current_color');
                        //Store options and fill with default color
                        cal.data('colpick', options);
                        fillRGBFields(options.color, cal.get(0));
                        fillHSBFields(options.color, cal.get(0));
                        fillHexFields(options.color, cal.get(0));
                        setHue(options.color, cal.get(0));
                        setSelector(options.color, cal.get(0));
                        setCurrentColor(options.color, cal.get(0));
                        setNewColor(options.color, cal.get(0));
                        //Append to body if flat=false, else show in place
                        if (options.flat) {
                            cal.appendTo(options.appendTo || this).show();
                            cal.css(options.styles || {
                                position: 'relative',
                                display: 'block'
                            });
                        } else {
                            cal.appendTo(options.appendTo || document.body);
                            $(this).on(options.showEvent, show);
                            cal.css(options.styles || {
                                position: 'absolute'
                            });
                        }
                    }
                });
            },
            //Shows the picker
            showPicker: function () {
                return this.each(function () {
                    if ($(this).data('colpickId')) {
                        show.apply(this);
                    }
                });
            },
            //Hides the picker
            hidePicker: function () {
                return this.each(function () {
                    if ($(this).data('colpickId')) {
                        hide.apply(this);
                    }
                });
            },
            //Sets a color as new and current (default)
            setColor: function (col, setCurrent) {
                setCurrent = (typeof setCurrent === "undefined") ? 1 : setCurrent;
                if (typeof col == 'string') {
                    col = hexToHsb(col);
                } else if (col.r != undefined && col.g != undefined && col.b != undefined) {
                    col = rgbToHsb(col);
                } else if (col.h != undefined && col.s != undefined && col.b != undefined) {
                    col = fixHSB(col);
                } else {
                    return this;
                }
                return this.each(function () {
                    if ($(this).data('colpickId')) {
                        var cal = $('#' + $(this).data('colpickId'));
                        cal.data('colpick').color = col;
                        cal.data('colpick').origColor = col;
                        fillRGBFields(col, cal.get(0));
                        fillHSBFields(col, cal.get(0));
                        fillHexFields(col, cal.get(0));
                        setHue(col, cal.get(0));
                        setSelector(col, cal.get(0));

                        setNewColor(col, cal.get(0));
                        cal.data('colpick').onChange.apply(cal.parent(), [col, hsbToHex(col), hsbToRgb(col), cal.data('colpick').el, 1]);
                        if (setCurrent) {
                            setCurrentColor(col, cal.get(0));
                        }
                    }
                });
            },
            destroy: function () {
                $('#' + $(this).data('colpickId')).remove();
            }
        };
    }();
    //Color space conversions
    var hexToRgb = function (hex) {
        hex = parseInt(((hex.indexOf('#') > -1) ? hex.substring(1) : hex), 16);
        return {r: hex >> 16, g: (hex & 0x00FF00) >> 8, b: (hex & 0x0000FF)};
    };
    var hexToHsb = function (hex) {
        return rgbToHsb(hexToRgb(hex));
    };
    var rgbToHsb = function (rgb) {
        var hsb = {h: 0, s: 0, b: 0};
        var min = Math.min(rgb.r, rgb.g, rgb.b);
        var max = Math.max(rgb.r, rgb.g, rgb.b);
        var delta = max - min;
        hsb.b = max;
        hsb.s = max != 0 ? 255 * delta / max : 0;
        if (hsb.s != 0) {
            if (rgb.r == max) hsb.h = (rgb.g - rgb.b) / delta;
            else if (rgb.g == max) hsb.h = 2 + (rgb.b - rgb.r) / delta;
            else hsb.h = 4 + (rgb.r - rgb.g) / delta;
        } else hsb.h = -1;
        hsb.h *= 60;
        if (hsb.h < 0) hsb.h += 360;
        hsb.s *= 100 / 255;
        hsb.b *= 100 / 255;
        return hsb;
    };
    var hsbToRgb = function (hsb) {
        var rgb = {};
        var h = hsb.h;
        var s = hsb.s * 255 / 100;
        var v = hsb.b * 255 / 100;
        if (s == 0) {
            rgb.r = rgb.g = rgb.b = v;
        } else {
            var t1 = v;
            var t2 = (255 - s) * v / 255;
            var t3 = (t1 - t2) * (h % 60) / 60;
            if (h == 360) h = 0;
            if (h < 60) {
                rgb.r = t1;
                rgb.b = t2;
                rgb.g = t2 + t3
            }
            else if (h < 120) {
                rgb.g = t1;
                rgb.b = t2;
                rgb.r = t1 - t3
            }
            else if (h < 180) {
                rgb.g = t1;
                rgb.r = t2;
                rgb.b = t2 + t3
            }
            else if (h < 240) {
                rgb.b = t1;
                rgb.r = t2;
                rgb.g = t1 - t3
            }
            else if (h < 300) {
                rgb.b = t1;
                rgb.g = t2;
                rgb.r = t2 + t3
            }
            else if (h < 360) {
                rgb.r = t1;
                rgb.g = t2;
                rgb.b = t1 - t3
            }
            else {
                rgb.r = 0;
                rgb.g = 0;
                rgb.b = 0
            }
        }
        return {r: Math.round(rgb.r), g: Math.round(rgb.g), b: Math.round(rgb.b)};
    };
    var rgbToHex = function (rgb) {
        var hex = [
            rgb.r.toString(16),
            rgb.g.toString(16),
            rgb.b.toString(16)
        ];
        $.each(hex, function (nr, val) {
            if (val.length == 1) {
                hex[nr] = '0' + val;
            }
        });
        return hex.join('');
    };
    var hsbToHex = function (hsb) {
        return rgbToHex(hsbToRgb(hsb));
    };
    $.fn.extend({
        colpick: colpick.init,
        colpickHide: colpick.hidePicker,
        colpickShow: colpick.showPicker,
        colpickSetColor: colpick.setColor,
        colpickDestroy: colpick.destroy
    });
    $.extend({
        colpick: {
            rgbToHex: rgbToHex,
            rgbToHsb: rgbToHsb,
            hsbToHex: hsbToHex,
            hsbToRgb: hsbToRgb,
            hexToHsb: hexToHsb,
            hexToRgb: hexToRgb
        }
    });
}));

/*! @preserve
 * bootbox.js
 * version: 5.3.2
 * author: Nick Payne <nick@kurai.co.uk>
 * license: MIT
 * http://bootboxjs.com/
 */
(function (root, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals (root is window)
        root.bootbox = factory(root.jQuery);
    }
}(this, function init($, undefined) {
    'use strict';

    //  Polyfills Object.keys, if necessary.
    //  @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
    if (!Object.keys) {
        Object.keys = (function () {
            var hasOwnProperty = Object.prototype.hasOwnProperty,
                hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
                dontEnums = [
                    'toString',
                    'toLocaleString',
                    'valueOf',
                    'hasOwnProperty',
                    'isPrototypeOf',
                    'propertyIsEnumerable',
                    'constructor'
                ],
                dontEnumsLength = dontEnums.length;

            return function (obj) {
                if (typeof obj !== 'function' && (typeof obj !== 'object' || obj === null)) {
                    throw new TypeError('Object.keys called on non-object');
                }

                var result = [], prop, i;

                for (prop in obj) {
                    if (hasOwnProperty.call(obj, prop)) {
                        result.push(prop);
                    }
                }

                if (hasDontEnumBug) {
                    for (i = 0; i < dontEnumsLength; i++) {
                        if (hasOwnProperty.call(obj, dontEnums[i])) {
                            result.push(dontEnums[i]);
                        }
                    }
                }

                return result;
            };
        }());
    }

    var exports = {};

    var VERSION = '5.0.0';
    exports.VERSION = VERSION;

    var locales = {
        ar : {
            OK      : 'Ù…ÙˆØ§ÙÙ‚',
            CANCEL  : 'Ø§Ù„ØºØ§Ø¡',
            CONFIRM : 'ØªØ£ÙƒÙŠØ¯'
        },
        bg_BG : {
            OK      : 'ÐžÐº',
            CANCEL  : 'ÐžÑ‚ÐºÐ°Ð·',
            CONFIRM : 'ÐŸÐ¾Ñ‚Ð²ÑŠÑ€Ð¶Ð´Ð°Ð²Ð°Ð¼'
        },
        br : {
            OK      : 'OK',
            CANCEL  : 'Cancelar',
            CONFIRM : 'Sim'
        },
        cs : {
            OK      : 'OK',
            CANCEL  : 'ZruÅ¡it',
            CONFIRM : 'Potvrdit'
        },
        da : {
            OK      : 'OK',
            CANCEL  : 'Annuller',
            CONFIRM : 'Accepter'
        },
        de : {
            OK      : 'OK',
            CANCEL  : 'Abbrechen',
            CONFIRM : 'Akzeptieren'
        },
        el : {
            OK      : 'Î•Î½Ï„Î¬Î¾ÎµÎ¹',
            CANCEL  : 'Î‘ÎºÏÏÏ‰ÏƒÎ·',
            CONFIRM : 'Î•Ï€Î¹Î²ÎµÎ²Î±Î¯Ï‰ÏƒÎ·'
        },
        en : {
            OK      : 'OK',
            CANCEL  : 'Cancel',
            CONFIRM : 'OK'
        },
        es : {
            OK      : 'OK',
            CANCEL  : 'Cancelar',
            CONFIRM : 'Aceptar'
        },
        eu : {
            OK      : 'OK',
            CANCEL  : 'Ezeztatu',
            CONFIRM : 'Onartu'
        },
        et : {
            OK      : 'OK',
            CANCEL  : 'Katkesta',
            CONFIRM : 'OK'
        },
        fa : {
            OK      : 'Ù‚Ø¨ÙˆÙ„',
            CANCEL  : 'Ù„ØºÙˆ',
            CONFIRM : 'ØªØ§ÛŒÛŒØ¯'
        },
        fi : {
            OK      : 'OK',
            CANCEL  : 'Peruuta',
            CONFIRM : 'OK'
        },
        fr : {
            OK      : 'OK',
            CANCEL  : 'Annuler',
            CONFIRM : 'Confirmer'
        },
        he : {
            OK      : '××™×©×•×¨',
            CANCEL  : '×‘×™×˜×•×œ',
            CONFIRM : '××™×©×•×¨'
        },
        hu : {
            OK      : 'OK',
            CANCEL  : 'MÃ©gsem',
            CONFIRM : 'MegerÅ‘sÃ­t'
        },
        hr : {
            OK      : 'OK',
            CANCEL  : 'Odustani',
            CONFIRM : 'Potvrdi'
        },
        id : {
            OK      : 'OK',
            CANCEL  : 'Batal',
            CONFIRM : 'OK'
        },
        it : {
            OK      : 'OK',
            CANCEL  : 'Annulla',
            CONFIRM : 'Conferma'
        },
        ja : {
            OK      : 'OK',
            CANCEL  : 'ã‚­ãƒ£ãƒ³ã‚»ãƒ«',
            CONFIRM : 'ç¢ºèª'
        },
        ka : {
            OK: 'OK',
            CANCEL: 'áƒ’áƒáƒ£áƒ¥áƒ›áƒ”áƒ‘áƒ',
            CONFIRM: 'áƒ“áƒáƒ“áƒáƒ¡áƒ¢áƒ£áƒ áƒ”áƒ‘áƒ'
        },
        ko : {
            OK: 'OK',
            CANCEL: 'ì·¨ì†Œ',
            CONFIRM: 'í™•ì¸'
        },
        lt : {
            OK      : 'Gerai',
            CANCEL  : 'AtÅ¡aukti',
            CONFIRM : 'Patvirtinti'
        },
        lv : {
            OK      : 'Labi',
            CANCEL  : 'Atcelt',
            CONFIRM : 'ApstiprinÄt'
        },
        nl : {
            OK      : 'OK',
            CANCEL  : 'Annuleren',
            CONFIRM : 'Accepteren'
        },
        no : {
            OK      : 'OK',
            CANCEL  : 'Avbryt',
            CONFIRM : 'OK'
        },
        pl : {
            OK      : 'OK',
            CANCEL  : 'Anuluj',
            CONFIRM : 'PotwierdÅº'
        },
        pt : {
            OK      : 'OK',
            CANCEL  : 'Cancelar',
            CONFIRM : 'Confirmar'
        },
        ru : {
            OK      : 'OK',
            CANCEL  : 'ÐžÑ‚Ð¼ÐµÐ½Ð°',
            CONFIRM : 'ÐŸÑ€Ð¸Ð¼ÐµÐ½Ð¸Ñ‚ÑŒ'
        },
        sk : {
            OK      : 'OK',
            CANCEL  : 'ZruÅ¡iÅ¥',
            CONFIRM : 'PotvrdiÅ¥'
        },
        sl : {
            OK      : 'OK',
            CANCEL  : 'PrekliÄi',
            CONFIRM : 'Potrdi'
        },
        sq : {
            OK      : 'OK',
            CANCEL  : 'Anulo',
            CONFIRM : 'Prano'
        },
        sv : {
            OK      : 'OK',
            CANCEL  : 'Avbryt',
            CONFIRM : 'OK'
        },
        sw: {
            OK      : 'Sawa',
            CANCEL  : 'Ghairi',
            CONFIRM: 'Thibitisha'
        },
        ta:{
            OK      : 'à®šà®°à®¿',
            CANCEL  : 'à®°à®¤à¯à®¤à¯ à®šà¯†à®¯à¯',
            CONFIRM : 'à®‰à®±à¯à®¤à®¿ à®šà¯†à®¯à¯'
        },
        th : {
            OK      : 'à¸•à¸à¸¥à¸‡',
            CANCEL  : 'à¸¢à¸à¹€à¸¥à¸´à¸',
            CONFIRM : 'à¸¢à¸·à¸™à¸¢à¸±à¸™'
        },
        tr : {
            OK      : 'Tamam',
            CANCEL  : 'Ä°ptal',
            CONFIRM : 'Onayla'
        },
        uk : {
            OK      : 'OK',
            CANCEL  : 'Ð’Ñ–Ð´Ð¼Ñ–Ð½Ð°',
            CONFIRM : 'ÐŸÑ€Ð¸Ð¹Ð½ÑÑ‚Ð¸'
        },
        zh_CN : {
            OK      : 'OK',
            CANCEL  : 'å–æ¶ˆ',
            CONFIRM : 'ç¡®è®¤'
        },
        zh_TW : {
            OK      : 'OK',
            CANCEL  : 'å–æ¶ˆ',
            CONFIRM : 'ç¢ºèª'
        }
    };

    var templates = {
        dialog:
            '<div class="bootbox modal" tabindex="-1" role="dialog" aria-hidden="true">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-body"><div class="bootbox-body"></div></div>' +
            '</div>' +
            '</div>' +
            '</div>',
        header:
            '<div class="modal-header">' +
            '<h5 class="modal-title"></h5>' +
            '</div>',
        footer:
            '<div class="modal-footer"></div>',
        closeButton:
            '<button type="button" class="bootbox-close-button close" aria-hidden="true">&times;</button>',
        form:
            '<form class="bootbox-form"></form>',
        button:
            '<button type="button" class="btn"></button>',
        option:
            '<option></option>',
        promptMessage:
            '<div class="bootbox-prompt-message"></div>',
        inputs: {
            text:
                '<input class="bootbox-input bootbox-input-text form-control" autocomplete="off" type="text" />',
            textarea:
                '<textarea class="bootbox-input bootbox-input-textarea form-control"></textarea>',
            email:
                '<input class="bootbox-input bootbox-input-email form-control" autocomplete="off" type="email" />',
            select:
                '<select class="bootbox-input bootbox-input-select form-control"></select>',
            checkbox:
                '<div class="form-check checkbox"><label class="form-check-label"><input class="form-check-input bootbox-input bootbox-input-checkbox" type="checkbox" /></label></div>',
            radio:
                '<div class="form-check radio"><label class="form-check-label"><input class="form-check-input bootbox-input bootbox-input-radio" type="radio" name="bootbox-radio" /></label></div>',
            date:
                '<input class="bootbox-input bootbox-input-date form-control" autocomplete="off" type="date" />',
            time:
                '<input class="bootbox-input bootbox-input-time form-control" autocomplete="off" type="time" />',
            number:
                '<input class="bootbox-input bootbox-input-number form-control" autocomplete="off" type="number" />',
            password:
                '<input class="bootbox-input bootbox-input-password form-control" autocomplete="off" type="password" />',
            range:
                '<input class="bootbox-input bootbox-input-range form-control-range" autocomplete="off" type="range" />'
        }
    };


    var defaults = {
        // default language
        locale: 'en',
        // show backdrop or not. Default to static so user has to interact with dialog
        backdrop: 'static',
        // animate the modal in/out
        animate: true,
        // additional class string applied to the top level dialog
        className: null,
        // whether or not to include a close button
        closeButton: true,
        // show the dialog immediately by default
        show: true,
        // dialog container
        container: 'body',
        // default value (used by the prompt helper)
        value: '',
        // default input type (used by the prompt helper)
        inputType: 'text',
        // switch button order from cancel/confirm (default) to confirm/cancel
        swapButtonOrder: false,
        // center modal vertically in page
        centerVertical: false,
        // Append "multiple" property to the select when using the "prompt" helper
        multiple: false,
        // Automatically scroll modal content when height exceeds viewport height
        scrollable: false
    };


    // PUBLIC FUNCTIONS
    // *************************************************************************************************************

    // Return all currently registered locales, or a specific locale if "name" is defined
    exports.locales = function (name) {
        return name ? locales[name] : locales;
    };


    // Register localized strings for the OK, Confirm, and Cancel buttons
    exports.addLocale = function (name, values) {
        $.each(['OK', 'CANCEL', 'CONFIRM'], function (_, v) {
            if (!values[v]) {
                throw new Error('Please supply a translation for "' + v + '"');
            }
        });

        locales[name] = {
            OK: values.OK,
            CANCEL: values.CANCEL,
            CONFIRM: values.CONFIRM
        };

        return exports;
    };


    // Remove a previously-registered locale
    exports.removeLocale = function (name) {
        if (name !== 'en') {
            delete locales[name];
        }
        else {
            throw new Error('"en" is used as the default and fallback locale and cannot be removed.');
        }

        return exports;
    };


    // Set the default locale
    exports.setLocale = function (name) {
        return exports.setDefaults('locale', name);
    };


    // Override default value(s) of Bootbox.
    exports.setDefaults = function () {
        var values = {};

        if (arguments.length === 2) {
            // allow passing of single key/value...
            values[arguments[0]] = arguments[1];
        } else {
            // ... and as an object too
            values = arguments[0];
        }

        $.extend(defaults, values);

        return exports;
    };


    // Hides all currently active Bootbox modals
    exports.hideAll = function () {
        $('.bootbox').modal('hide');

        return exports;
    };


    // Allows the base init() function to be overridden
    exports.init = function (_$) {
        return init(_$ || $);
    };


    // CORE HELPER FUNCTIONS
    // *************************************************************************************************************

    // Core dialog function
    exports.dialog = function (options) {
        if ($.fn.modal === undefined) {
            throw new Error(
                '"$.fn.modal" is not defined; please double check you have included ' +
                'the Bootstrap JavaScript library. See http://getbootstrap.com/javascript/ ' +
                'for more details.'
            );
        }

        options = sanitize(options);

        if ($.fn.modal.Constructor.VERSION) {
            options.fullBootstrapVersion = $.fn.modal.Constructor.VERSION;
            var i = options.fullBootstrapVersion.indexOf('.');
            options.bootstrap = options.fullBootstrapVersion.substring(0, i);
        }
        else {
            // Assuming version 2.3.2, as that was the last "supported" 2.x version
            options.bootstrap = '2';
            options.fullBootstrapVersion = '2.3.2';
            console.warn('Bootbox will *mostly* work with Bootstrap 2, but we do not officially support it. Please upgrade, if possible.');
        }

        var dialog = $(templates.dialog);
        var innerDialog = dialog.find('.modal-dialog');
        var body = dialog.find('.modal-body');
        var header = $(templates.header);
        var footer = $(templates.footer);
        var buttons = options.buttons;

        var callbacks = {
            onEscape: options.onEscape
        };

        body.find('.bootbox-body').html(options.message);

        // Only attempt to create buttons if at least one has
        // been defined in the options object
        if (getKeyLength(options.buttons) > 0) {
            each(buttons, function (key, b) {
                var button = $(templates.button);
                button.data('bb-handler', key);
                button.addClass(b.className);

                switch(key)
                {
                    case 'ok':
                    case 'confirm':
                        button.addClass('bootbox-accept');
                        break;

                    case 'cancel':
                        button.addClass('bootbox-cancel');
                        break;
                }

                button.html(b.label);
                footer.append(button);

                callbacks[key] = b.callback;
            });

            body.after(footer);
        }

        if (options.animate === true) {
            dialog.addClass('fade');
        }

        if (options.className) {
            dialog.addClass(options.className);
        }

        if (options.size) {
            // Requires Bootstrap 3.1.0 or higher
            if (options.fullBootstrapVersion.substring(0, 3) < '3.1') {
                console.warn('"size" requires Bootstrap 3.1.0 or higher. You appear to be using ' + options.fullBootstrapVersion + '. Please upgrade to use this option.');
            }

            switch(options.size)
            {
                case 'small':
                case 'sm':
                    innerDialog.addClass('modal-sm');
                    break;

                case 'large':
                case 'lg':
                    innerDialog.addClass('modal-lg');
                    break;

                case 'xl':
                case 'extra-large':
                    // Requires Bootstrap 4.2.0 or higher
                    if (options.fullBootstrapVersion.substring(0, 3) < '4.2') {
                        console.warn('Using size "xl"/"extra-large" requires Bootstrap 4.2.0 or higher. You appear to be using ' + options.fullBootstrapVersion + '. Please upgrade to use this option.');
                    }
                    innerDialog.addClass('modal-xl');
                    break;
            }
        }

        if(options.scrollable){
            // Requires Bootstrap 4.3.0 or higher
            if (options.fullBootstrapVersion.substring(0, 3) < '4.3') {
                console.warn('Using "scrollable" requires Bootstrap 4.3.0 or higher. You appear to be using ' + options.fullBootstrapVersion + '. Please upgrade to use this option.');
            }

            innerDialog.addClass('modal-dialog-scrollable');
        }

        if (options.title) {
            body.before(header);
            dialog.find('.modal-title').html(options.title);
        }

        if (options.closeButton) {
            var closeButton = $(templates.closeButton);

            if (options.title) {
                if (options.bootstrap > 3) {
                    dialog.find('.modal-header').append(closeButton);
                }
                else {
                    dialog.find('.modal-header').prepend(closeButton);
                }
            } else {
                closeButton.prependTo(body);
            }
        }

        if(options.centerVertical){
            // Requires Bootstrap 4.0.0-beta.3 or higher
            if (options.fullBootstrapVersion < '4.0.0') {
                console.warn('"centerVertical" requires Bootstrap 4.0.0-beta.3 or higher. You appear to be using ' + options.fullBootstrapVersion + '. Please upgrade to use this option.');
            }

            innerDialog.addClass('modal-dialog-centered');
        }

        // Bootstrap event listeners; these handle extra
        // setup & teardown required after the underlying
        // modal has performed certain actions.

        // make sure we unbind any listeners once the dialog has definitively been dismissed
        dialog.one('hide.bs.modal', function (e) {
            if (e.target === this) {
                dialog.off('escape.close.bb');
                dialog.off('click');
            }
        });

        dialog.one('hidden.bs.modal', function (e) {
            // ensure we don't accidentally intercept hidden events triggered
            // by children of the current dialog. We shouldn't need to handle this anymore,
            // now that Bootstrap namespaces its events, but still worth doing.
            if (e.target === this) {
                dialog.remove();
            }
        });

        dialog.one('shown.bs.modal', function () {
            dialog.find('.bootbox-accept:first').trigger('focus');
        });

        // Bootbox event listeners; used to decouple some
        // behaviours from their respective triggers

        if (options.backdrop !== 'static') {
            // A boolean true/false according to the Bootstrap docs
            // should show a dialog the user can dismiss by clicking on
            // the background.
            // We always only ever pass static/false to the actual
            // $.modal function because with "true" we can't trap
            // this event (the .modal-backdrop swallows it)
            // However, we still want to sort of respect true
            // and invoke the escape mechanism instead
            dialog.on('click.dismiss.bs.modal', function (e) {
                // @NOTE: the target varies in >= 3.3.x releases since the modal backdrop
                // moved *inside* the outer dialog rather than *alongside* it
                if (dialog.children('.modal-backdrop').length) {
                    e.currentTarget = dialog.children('.modal-backdrop').get(0);
                }

                if (e.target !== e.currentTarget) {
                    return;
                }

                dialog.trigger('escape.close.bb');
            });
        }

        dialog.on('escape.close.bb', function (e) {
            // the if statement looks redundant but it isn't; without it
            // if we *didn't* have an onEscape handler then processCallback
            // would automatically dismiss the dialog
            if (callbacks.onEscape) {
                processCallback(e, dialog, callbacks.onEscape);
            }
        });


        dialog.on('click', '.modal-footer button:not(.disabled)', function (e) {
            var callbackKey = $(this).data('bb-handler');

            if (callbackKey !== undefined) {
                // Only process callbacks for buttons we recognize:
                processCallback(e, dialog, callbacks[callbackKey]);
            }
        });

        dialog.on('click', '.bootbox-close-button', function (e) {
            // onEscape might be falsy but that's fine; the fact is
            // if the user has managed to click the close button we
            // have to close the dialog, callback or not
            processCallback(e, dialog, callbacks.onEscape);
        });

        dialog.on('keyup', function (e) {
            if (e.which === 27) {
                dialog.trigger('escape.close.bb');
            }
        });

        // the remainder of this method simply deals with adding our
        // dialogent to the DOM, augmenting it with Bootstrap's modal
        // functionality and then giving the resulting object back
        // to our caller

        $(options.container).append(dialog);

        dialog.modal({
            backdrop: options.backdrop ? 'static' : false,
            keyboard: false,
            show: false
        });

        if (options.show) {
            dialog.modal('show');
        }

        return dialog;
    };


    // Helper function to simulate the native alert() behavior. **NOTE**: This is non-blocking, so any
    // code that must happen after the alert is dismissed should be placed within the callback function
    // for this alert.
    exports.alert = function () {
        var options;

        options = mergeDialogOptions('alert', ['ok'], ['message', 'callback'], arguments);

        // @TODO: can this move inside exports.dialog when we're iterating over each
        // button and checking its button.callback value instead?
        if (options.callback && !$.isFunction(options.callback)) {
            throw new Error('alert requires the "callback" property to be a function when provided');
        }

        // override the ok and escape callback to make sure they just invoke
        // the single user-supplied one (if provided)
        options.buttons.ok.callback = options.onEscape = function () {
            if ($.isFunction(options.callback)) {
                return options.callback.call(this);
            }

            return true;
        };

        return exports.dialog(options);
    };


    // Helper function to simulate the native confirm() behavior. **NOTE**: This is non-blocking, so any
    // code that must happen after the confirm is dismissed should be placed within the callback function
    // for this confirm.
    exports.confirm = function () {
        var options;

        options = mergeDialogOptions('confirm', ['cancel', 'confirm'], ['message', 'callback'], arguments);

        // confirm specific validation; they don't make sense without a callback so make
        // sure it's present
        if (!$.isFunction(options.callback)) {
            throw new Error('confirm requires a callback');
        }

        // overrides; undo anything the user tried to set they shouldn't have
        options.buttons.cancel.callback = options.onEscape = function () {
            return options.callback.call(this, false);
        };

        options.buttons.confirm.callback = function () {
            return options.callback.call(this, true);
        };

        return exports.dialog(options);
    };


    // Helper function to simulate the native prompt() behavior. **NOTE**: This is non-blocking, so any
    // code that must happen after the prompt is dismissed should be placed within the callback function
    // for this prompt.
    exports.prompt = function () {
        var options;
        var promptDialog;
        var form;
        var input;
        var shouldShow;
        var inputOptions;

        // we have to create our form first otherwise
        // its value is undefined when gearing up our options
        // @TODO this could be solved by allowing message to
        // be a function instead...
        form = $(templates.form);

        // prompt defaults are more complex than others in that
        // users can override more defaults
        options = mergeDialogOptions('prompt', ['cancel', 'confirm'], ['title', 'callback'], arguments);

        if (!options.value) {
            options.value = defaults.value;
        }

        if (!options.inputType) {
            options.inputType = defaults.inputType;
        }

        // capture the user's show value; we always set this to false before
        // spawning the dialog to give us a chance to attach some handlers to
        // it, but we need to make sure we respect a preference not to show it
        shouldShow = (options.show === undefined) ? defaults.show : options.show;
        // This is required prior to calling the dialog builder below - we need to
        // add an event handler just before the prompt is shown
        options.show = false;

        // Handles the 'cancel' action
        options.buttons.cancel.callback = options.onEscape = function () {
            return options.callback.call(this, null);
        };

        // Prompt submitted - extract the prompt value. This requires a bit of work,
        // given the different input types available.
        options.buttons.confirm.callback = function () {
            var value;

            if (options.inputType === 'checkbox') {
                value = input.find('input:checked').map(function () {
                    return $(this).val();
                }).get();
            } else if (options.inputType === 'radio') {
                value = input.find('input:checked').val();
            }
            else {
                if (input[0].checkValidity && !input[0].checkValidity()) {
                    // prevents button callback from being called
                    return false;
                } else {
                    if (options.inputType === 'select' && options.multiple === true) {
                        value = input.find('option:selected').map(function () {
                            return $(this).val();
                        }).get();
                    }
                    else{
                        value = input.val();
                    }
                }
            }

            return options.callback.call(this, value);
        };

        // prompt-specific validation
        if (!options.title) {
            throw new Error('prompt requires a title');
        }

        if (!$.isFunction(options.callback)) {
            throw new Error('prompt requires a callback');
        }

        if (!templates.inputs[options.inputType]) {
            throw new Error('Invalid prompt type');
        }

        // create the input based on the supplied type
        input = $(templates.inputs[options.inputType]);

        switch (options.inputType) {
            case 'text':
            case 'textarea':
            case 'email':
            case 'password':
                input.val(options.value);

                if (options.placeholder) {
                    input.attr('placeholder', options.placeholder);
                }

                if (options.pattern) {
                    input.attr('pattern', options.pattern);
                }

                if (options.maxlength) {
                    input.attr('maxlength', options.maxlength);
                }

                if (options.required) {
                    input.prop({ 'required': true });
                }

                if (options.rows && !isNaN(parseInt(options.rows))) {
                    if(options.inputType === 'textarea'){
                        input.attr({ 'rows': options.rows });
                    }
                }

                break;


            case 'date':
            case 'time':
            case 'number':
            case 'range':
                input.val(options.value);

                if (options.placeholder) {
                    input.attr('placeholder', options.placeholder);
                }

                if (options.pattern) {
                    input.attr('pattern', options.pattern);
                }

                if (options.required) {
                    input.prop({ 'required': true });
                }

                // These input types have extra attributes which affect their input validation.
                // Warning: For most browsers, date inputs are buggy in their implementation of 'step', so
                // this attribute will have no effect. Therefore, we don't set the attribute for date inputs.
                // @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date#Setting_maximum_and_minimum_dates
                if (options.inputType !== 'date') {
                    if (options.step) {
                        if (options.step === 'any' || (!isNaN(options.step) && parseInt(options.step) > 0)) {
                            input.attr('step', options.step);
                        }
                        else {
                            throw new Error('"step" must be a valid positive number or the value "any". See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-step for more information.');
                        }
                    }
                }

                if(minAndMaxAreValid(options.inputType, options.min, options.max)){
                    if(options.min !== undefined){
                        input.attr('min', options.min);
                    }
                    if(options.max !== undefined){
                        input.attr('max', options.max);
                    }
                }

                break;


            case 'select':
                var groups = {};
                inputOptions = options.inputOptions || [];

                if (!$.isArray(inputOptions)) {
                    throw new Error('Please pass an array of input options');
                }

                if (!inputOptions.length) {
                    throw new Error('prompt with "inputType" set to "select" requires at least one option');
                }

                // placeholder is not actually a valid attribute for select,
                // but we'll allow it, assuming it might be used for a plugin
                if (options.placeholder) {
                    input.attr('placeholder', options.placeholder);
                }

                if (options.required) {
                    input.prop({ 'required': true });
                }

                if (options.multiple) {
                    input.prop({ 'multiple': true });
                }

                each(inputOptions, function (_, option) {
                    // assume the element to attach to is the input...
                    var elem = input;

                    if (option.value === undefined || option.text === undefined) {
                        throw new Error('each option needs a "value" property and a "text" property');
                    }

                    // ... but override that element if this option sits in a group

                    if (option.group) {
                        // initialise group if necessary
                        if (!groups[option.group]) {
                            groups[option.group] = $('<optgroup />').attr('label', option.group);
                        }

                        elem = groups[option.group];
                    }

                    var o = $(templates.option);
                    o.attr('value', option.value).text(option.text);
                    elem.append(o);
                });

                each(groups, function (_, group) {
                    input.append(group);
                });

                // safe to set a select's value as per a normal input
                input.val(options.value);

                break;


            case 'checkbox':
                var checkboxValues = $.isArray(options.value) ? options.value : [options.value];
                inputOptions = options.inputOptions || [];

                if (!inputOptions.length) {
                    throw new Error('prompt with "inputType" set to "checkbox" requires at least one option');
                }

                // checkboxes have to nest within a containing element, so
                // they break the rules a bit and we end up re-assigning
                // our 'input' element to this container instead
                input = $('<div class="bootbox-checkbox-list"></div>');

                each(inputOptions, function (_, option) {
                    if (option.value === undefined || option.text === undefined) {
                        throw new Error('each option needs a "value" property and a "text" property');
                    }

                    var checkbox = $(templates.inputs[options.inputType]);

                    checkbox.find('input').attr('value', option.value);
                    checkbox.find('label').append('\n' + option.text);

                    // we've ensured values is an array so we can always iterate over it
                    each(checkboxValues, function (_, value) {
                        if (value === option.value) {
                            checkbox.find('input').prop('checked', true);
                        }
                    });

                    input.append(checkbox);
                });
                break;


            case 'radio':
                // Make sure that value is not an array (only a single radio can ever be checked)
                if (options.value !== undefined && $.isArray(options.value)) {
                    throw new Error('prompt with "inputType" set to "radio" requires a single, non-array value for "value"');
                }

                inputOptions = options.inputOptions || [];

                if (!inputOptions.length) {
                    throw new Error('prompt with "inputType" set to "radio" requires at least one option');
                }

                // Radiobuttons have to nest within a containing element, so
                // they break the rules a bit and we end up re-assigning
                // our 'input' element to this container instead
                input = $('<div class="bootbox-radiobutton-list"></div>');

                // Radiobuttons should always have an initial checked input checked in a "group".
                // If value is undefined or doesn't match an input option, select the first radiobutton
                var checkFirstRadio = true;

                each(inputOptions, function (_, option) {
                    if (option.value === undefined || option.text === undefined) {
                        throw new Error('each option needs a "value" property and a "text" property');
                    }

                    var radio = $(templates.inputs[options.inputType]);

                    radio.find('input').attr('value', option.value);
                    radio.find('label').append('\n' + option.text);

                    if (options.value !== undefined) {
                        if (option.value === options.value) {
                            radio.find('input').prop('checked', true);
                            checkFirstRadio = false;
                        }
                    }

                    input.append(radio);
                });

                if (checkFirstRadio) {
                    input.find('input[type="radio"]').first().prop('checked', true);
                }
                break;
        }

        // now place it in our form
        form.append(input);

        form.on('submit', function (e) {
            e.preventDefault();
            // Fix for SammyJS (or similar JS routing library) hijacking the form post.
            e.stopPropagation();

            // @TODO can we actually click *the* button object instead?
            // e.g. buttons.confirm.click() or similar
            promptDialog.find('.bootbox-accept').trigger('click');
        });

        if ($.trim(options.message) !== '') {
            // Add the form to whatever content the user may have added.
            var message = $(templates.promptMessage).html(options.message);
            form.prepend(message);
            options.message = form;
        }
        else {
            options.message = form;
        }

        // Generate the dialog
        promptDialog = exports.dialog(options);

        // clear the existing handler focusing the submit button...
        promptDialog.off('shown.bs.modal');

        // ...and replace it with one focusing our input, if possible
        promptDialog.on('shown.bs.modal', function () {
            // need the closure here since input isn't
            // an object otherwise
            input.focus();
        });

        if (shouldShow === true) {
            promptDialog.modal('show');
        }

        return promptDialog;
    };


    // INTERNAL FUNCTIONS
    // *************************************************************************************************************

    // Map a flexible set of arguments into a single returned object
    // If args.length is already one just return it, otherwise
    // use the properties argument to map the unnamed args to
    // object properties.
    // So in the latter case:
    //  mapArguments(["foo", $.noop], ["message", "callback"])
    //  -> { message: "foo", callback: $.noop }
    function mapArguments(args, properties) {
        var argn = args.length;
        var options = {};

        if (argn < 1 || argn > 2) {
            throw new Error('Invalid argument length');
        }

        if (argn === 2 || typeof args[0] === 'string') {
            options[properties[0]] = args[0];
            options[properties[1]] = args[1];
        } else {
            options = args[0];
        }

        return options;
    }


    //  Merge a set of default dialog options with user supplied arguments
    function mergeArguments(defaults, args, properties) {
        return $.extend(
            // deep merge
            true,
            // ensure the target is an empty, unreferenced object
            {},
            // the base options object for this type of dialog (often just buttons)
            defaults,
            // args could be an object or array; if it's an array properties will
            // map it to a proper options object
            mapArguments(
                args,
                properties
            )
        );
    }


    //  This entry-level method makes heavy use of composition to take a simple
    //  range of inputs and return valid options suitable for passing to bootbox.dialog
    function mergeDialogOptions(className, labels, properties, args) {
        var locale;
        if(args && args[0]){
            locale = args[0].locale || defaults.locale;
            var swapButtons = args[0].swapButtonOrder || defaults.swapButtonOrder;

            if(swapButtons){
                labels = labels.reverse();
            }
        }

        //  build up a base set of dialog properties
        var baseOptions = {
            className: 'bootbox-' + className,
            buttons: createLabels(labels, locale)
        };

        // Ensure the buttons properties generated, *after* merging
        // with user args are still valid against the supplied labels
        return validateButtons(
            // merge the generated base properties with user supplied arguments
            mergeArguments(
                baseOptions,
                args,
                // if args.length > 1, properties specify how each arg maps to an object key
                properties
            ),
            labels
        );
    }


    //  Checks each button object to see if key is valid.
    //  This function will only be called by the alert, confirm, and prompt helpers.
    function validateButtons(options, buttons) {
        var allowedButtons = {};
        each(buttons, function (key, value) {
            allowedButtons[value] = true;
        });

        each(options.buttons, function (key) {
            if (allowedButtons[key] === undefined) {
                throw new Error('button key "' + key + '" is not allowed (options are ' + buttons.join(' ') + ')');
            }
        });

        return options;
    }



    //  From a given list of arguments, return a suitable object of button labels.
    //  All this does is normalise the given labels and translate them where possible.
    //  e.g. "ok", "confirm" -> { ok: "OK", cancel: "Annuleren" }
    function createLabels(labels, locale) {
        var buttons = {};

        for (var i = 0, j = labels.length; i < j; i++) {
            var argument = labels[i];
            var key = argument.toLowerCase();
            var value = argument.toUpperCase();

            buttons[key] = {
                label: getText(value, locale)
            };
        }

        return buttons;
    }



    //  Get localized text from a locale. Defaults to 'en' locale if no locale
    //  provided or a non-registered locale is requested
    function getText(key, locale) {
        var labels = locales[locale];

        return labels ? labels[key] : locales.en[key];
    }



    //  Filter and tidy up any user supplied parameters to this dialog.
    //  Also looks for any shorthands used and ensures that the options
    //  which are returned are all normalized properly
    function sanitize(options) {
        var buttons;
        var total;

        if (typeof options !== 'object') {
            throw new Error('Please supply an object of options');
        }

        if (!options.message) {
            throw new Error('"message" option must not be null or an empty string.');
        }

        // make sure any supplied options take precedence over defaults
        options = $.extend({}, defaults, options);

        // no buttons is still a valid dialog but it's cleaner to always have
        // a buttons object to iterate over, even if it's empty
        if (!options.buttons) {
            options.buttons = {};
        }

        buttons = options.buttons;

        total = getKeyLength(buttons);

        each(buttons, function (key, button, index) {
            if ($.isFunction(button)) {
                // short form, assume value is our callback. Since button
                // isn't an object it isn't a reference either so re-assign it
                button = buttons[key] = {
                    callback: button
                };
            }

            // before any further checks make sure by now button is the correct type
            if ($.type(button) !== 'object') {
                throw new Error('button with key "' + key + '" must be an object');
            }

            if (!button.label) {
                // the lack of an explicit label means we'll assume the key is good enough
                button.label = key;
            }

            if (!button.className) {
                var isPrimary = false;
                if(options.swapButtonOrder){
                    isPrimary = index === 0;
                }
                else{
                    isPrimary = index === total-1;
                }

                if (total <= 2 && isPrimary) {
                    // always add a primary to the main option in a one or two-button dialog
                    button.className = 'btn-primary';
                } else {
                    // adding both classes allows us to target both BS3 and BS4 without needing to check the version
                    button.className = 'btn-secondary btn-default';
                }
            }
        });

        return options;
    }


    //  Returns a count of the properties defined on the object
    function getKeyLength(obj) {
        return Object.keys(obj).length;
    }


    //  Tiny wrapper function around jQuery.each; just adds index as the third parameter
    function each(collection, iterator) {
        var index = 0;
        $.each(collection, function (key, value) {
            iterator(key, value, index++);
        });
    }


    //  Handle the invoked dialog callback
    function processCallback(e, dialog, callback) {
        e.stopPropagation();
        e.preventDefault();

        // by default we assume a callback will get rid of the dialog,
        // although it is given the opportunity to override this

        // so, if the callback can be invoked and it *explicitly returns false*
        // then we'll set a flag to keep the dialog active...
        var preserveDialog = $.isFunction(callback) && callback.call(dialog, e) === false;

        // ... otherwise we'll bin it
        if (!preserveDialog) {
            dialog.modal('hide');
        }
    }

    // Validate `min` and `max` values based on the current `inputType` value
    function minAndMaxAreValid(type, min, max){
        var result = false;
        var minValid = true;
        var maxValid = true;

        if (type === 'date') {
            if (min !== undefined && !(minValid = dateIsValid(min))) {
                console.warn('Browsers which natively support the "date" input type expect date values to be of the form "YYYY-MM-DD" (see ISO-8601 https://www.iso.org/iso-8601-date-and-time-format.html). Bootbox does not enforce this rule, but your min value may not be enforced by this browser.');
            }
            else if (max !== undefined && !(maxValid = dateIsValid(max))) {
                console.warn('Browsers which natively support the "date" input type expect date values to be of the form "YYYY-MM-DD" (see ISO-8601 https://www.iso.org/iso-8601-date-and-time-format.html). Bootbox does not enforce this rule, but your max value may not be enforced by this browser.');
            }
        }
        else if (type === 'time') {
            if (min !== undefined && !(minValid = timeIsValid(min))) {
                throw new Error('"min" is not a valid time. See https://www.w3.org/TR/2012/WD-html-markup-20120315/datatypes.html#form.data.time for more information.');
            }
            else if (max !== undefined && !(maxValid = timeIsValid(max))) {
                throw new Error('"max" is not a valid time. See https://www.w3.org/TR/2012/WD-html-markup-20120315/datatypes.html#form.data.time for more information.');
            }
        }
        else {
            if (min !== undefined && isNaN(min)) {
                throw new Error('"min" must be a valid number. See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-min for more information.');
            }

            if (max !== undefined && isNaN(max)) {
                throw new Error('"max" must be a valid number. See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-max for more information.');
            }
        }

        if(minValid && maxValid){
            if(max <= min){
                throw new Error('"max" must be greater than "min". See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-max for more information.');
            }
            else{
                result = true;
            }
        }

        return result;
    }

    function timeIsValid(value){
        return /([01][0-9]|2[0-3]):[0-5][0-9]?:[0-5][0-9]/.test(value);
    }

    function dateIsValid(value){
        return /(\d{4})-(\d{2})-(\d{2})/.test(value);
    }


    //  Register the default locale
    exports.addLocale('en', {
        OK: 'OK',
        CANCEL: 'Cancel',
        CONFIRM: 'OK'
    });


    //  The Bootbox object
    return exports;
}));
/*!
 * Bootstrap-select v1.13.10 (https://developer.snapappointments.com/bootstrap-select)
 *
 * Copyright 2012-2019 SnapAppointments, LLC
 * Licensed under MIT (https://github.com/snapappointments/bootstrap-select/blob/master/LICENSE)
 */

(function (root, factory) {
    if (root === undefined && window !== undefined) root = window;
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module unless amdModuleId is set
        define(["jquery"], function (a0) {
            return (factory(a0));
        });
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require("jquery"));
    } else {
        factory(root["jQuery"]);
    }
}(this, function (jQuery) {

    (function ($) {
        'use strict';

        var DISALLOWED_ATTRIBUTES = ['sanitize', 'whiteList', 'sanitizeFn'];

        var uriAttrs = [
            'background',
            'cite',
            'href',
            'itemtype',
            'longdesc',
            'poster',
            'src',
            'xlink:href'
        ];

        var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;

        var DefaultWhitelist = {
            // Global attributes allowed on any supplied element below.
            '*': ['class', 'dir', 'id', 'lang', 'role', 'tabindex', 'style', ARIA_ATTRIBUTE_PATTERN],
            a: ['target', 'href', 'title', 'rel'],
            area: [],
            b: [],
            br: [],
            col: [],
            code: [],
            div: [],
            em: [],
            hr: [],
            h1: [],
            h2: [],
            h3: [],
            h4: [],
            h5: [],
            h6: [],
            i: [],
            img: ['src', 'alt', 'title', 'width', 'height'],
            li: [],
            ol: [],
            p: [],
            pre: [],
            s: [],
            small: [],
            span: [],
            sub: [],
            sup: [],
            strong: [],
            u: [],
            ul: []
        }

        /**
         * A pattern that recognizes a commonly useful subset of URLs that are safe.
         *
         * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
         */
        var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi;

        /**
         * A pattern that matches safe data URLs. Only matches image, video and audio types.
         *
         * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
         */
        var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;

        function allowedAttribute (attr, allowedAttributeList) {
            var attrName = attr.nodeName.toLowerCase()

            if ($.inArray(attrName, allowedAttributeList) !== -1) {
                if ($.inArray(attrName, uriAttrs) !== -1) {
                    return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN))
                }

                return true
            }

            var regExp = $(allowedAttributeList).filter(function (index, value) {
                return value instanceof RegExp
            })

            // Check if a regular expression validates the attribute.
            for (var i = 0, l = regExp.length; i < l; i++) {
                if (attrName.match(regExp[i])) {
                    return true
                }
            }

            return false
        }

        function sanitizeHtml (unsafeElements, whiteList, sanitizeFn) {
            if (sanitizeFn && typeof sanitizeFn === 'function') {
                return sanitizeFn(unsafeElements);
            }

            var whitelistKeys = Object.keys(whiteList);

            for (var i = 0, len = unsafeElements.length; i < len; i++) {
                var elements = unsafeElements[i].querySelectorAll('*');

                for (var j = 0, len2 = elements.length; j < len2; j++) {
                    var el = elements[j];
                    var elName = el.nodeName.toLowerCase();

                    if (whitelistKeys.indexOf(elName) === -1) {
                        el.parentNode.removeChild(el);

                        continue;
                    }

                    var attributeList = [].slice.call(el.attributes);
                    var whitelistedAttributes = [].concat(whiteList['*'] || [], whiteList[elName] || []);

                    for (var k = 0, len3 = attributeList.length; k < len3; k++) {
                        var attr = attributeList[k];

                        if (!allowedAttribute(attr, whitelistedAttributes)) {
                            el.removeAttribute(attr.nodeName);
                        }
                    }
                }
            }
        }

        // Polyfill for browsers with no classList support
        // Remove in v2
        if (!('classList' in document.createElement('_'))) {
            (function (view) {
                if (!('Element' in view)) return;

                var classListProp = 'classList',
                    protoProp = 'prototype',
                    elemCtrProto = view.Element[protoProp],
                    objCtr = Object,
                    classListGetter = function () {
                        var $elem = $(this);

                        return {
                            add: function (classes) {
                                classes = Array.prototype.slice.call(arguments).join(' ');
                                return $elem.addClass(classes);
                            },
                            remove: function (classes) {
                                classes = Array.prototype.slice.call(arguments).join(' ');
                                return $elem.removeClass(classes);
                            },
                            toggle: function (classes, force) {
                                return $elem.toggleClass(classes, force);
                            },
                            contains: function (classes) {
                                return $elem.hasClass(classes);
                            }
                        }
                    };

                if (objCtr.defineProperty) {
                    var classListPropDesc = {
                        get: classListGetter,
                        enumerable: true,
                        configurable: true
                    };
                    try {
                        objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
                    } catch (ex) { // IE 8 doesn't support enumerable:true
                        // adding undefined to fight this issue https://github.com/eligrey/classList.js/issues/36
                        // modernie IE8-MSW7 machine has IE8 8.0.6001.18702 and is affected
                        if (ex.number === undefined || ex.number === -0x7FF5EC54) {
                            classListPropDesc.enumerable = false;
                            objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
                        }
                    }
                } else if (objCtr[protoProp].__defineGetter__) {
                    elemCtrProto.__defineGetter__(classListProp, classListGetter);
                }
            }(window));
        }

        var testElement = document.createElement('_');

        testElement.classList.add('c1', 'c2');

        if (!testElement.classList.contains('c2')) {
            var _add = DOMTokenList.prototype.add,
                _remove = DOMTokenList.prototype.remove;

            DOMTokenList.prototype.add = function () {
                Array.prototype.forEach.call(arguments, _add.bind(this));
            }

            DOMTokenList.prototype.remove = function () {
                Array.prototype.forEach.call(arguments, _remove.bind(this));
            }
        }

        testElement.classList.toggle('c3', false);

        // Polyfill for IE 10 and Firefox <24, where classList.toggle does not
        // support the second argument.
        if (testElement.classList.contains('c3')) {
            var _toggle = DOMTokenList.prototype.toggle;

            DOMTokenList.prototype.toggle = function (token, force) {
                if (1 in arguments && !this.contains(token) === !force) {
                    return force;
                } else {
                    return _toggle.call(this, token);
                }
            };
        }

        testElement = null;

        // shallow array comparison
        function isEqual (array1, array2) {
            return array1.length === array2.length && array1.every(function (element, index) {
                return element === array2[index];
            });
        };

        // <editor-fold desc="Shims">
        if (!String.prototype.startsWith) {
            (function () {
                'use strict'; // needed to support `apply`/`call` with `undefined`/`null`
                var defineProperty = (function () {
                    // IE 8 only supports `Object.defineProperty` on DOM elements
                    try {
                        var object = {};
                        var $defineProperty = Object.defineProperty;
                        var result = $defineProperty(object, object, object) && $defineProperty;
                    } catch (error) {
                    }
                    return result;
                }());
                var toString = {}.toString;
                var startsWith = function (search) {
                    if (this == null) {
                        throw new TypeError();
                    }
                    var string = String(this);
                    if (search && toString.call(search) == '[object RegExp]') {
                        throw new TypeError();
                    }
                    var stringLength = string.length;
                    var searchString = String(search);
                    var searchLength = searchString.length;
                    var position = arguments.length > 1 ? arguments[1] : undefined;
                    // `ToInteger`
                    var pos = position ? Number(position) : 0;
                    if (pos != pos) { // better `isNaN`
                        pos = 0;
                    }
                    var start = Math.min(Math.max(pos, 0), stringLength);
                    // Avoid the `indexOf` call if no match is possible
                    if (searchLength + start > stringLength) {
                        return false;
                    }
                    var index = -1;
                    while (++index < searchLength) {
                        if (string.charCodeAt(start + index) != searchString.charCodeAt(index)) {
                            return false;
                        }
                    }
                    return true;
                };
                if (defineProperty) {
                    defineProperty(String.prototype, 'startsWith', {
                        'value': startsWith,
                        'configurable': true,
                        'writable': true
                    });
                } else {
                    String.prototype.startsWith = startsWith;
                }
            }());
        }

        if (!Object.keys) {
            Object.keys = function (
                o, // object
                k, // key
                r  // result array
            ) {
                // initialize object and result
                r = [];
                // iterate over object keys
                for (k in o) {
                    // fill result array with non-prototypical keys
                    r.hasOwnProperty.call(o, k) && r.push(k);
                }
                // return result
                return r;
            };
        }

        if (HTMLSelectElement && !HTMLSelectElement.prototype.hasOwnProperty('selectedOptions')) {
            Object.defineProperty(HTMLSelectElement.prototype, 'selectedOptions', {
                get: function () {
                    return this.querySelectorAll(':checked');
                }
            });
        }

        function getSelectedOptions (select, ignoreDisabled) {
            var selectedOptions = select.selectedOptions,
                options = [],
                opt;

            if (ignoreDisabled) {
                for (var i = 0, len = selectedOptions.length; i < len; i++) {
                    opt = selectedOptions[i];

                    if (!(opt.disabled || opt.parentNode.tagName === 'OPTGROUP' && opt.parentNode.disabled)) {
                        options.push(opt);
                    }
                }

                return options;
            }

            return selectedOptions;
        }

        // much faster than $.val()
        function getSelectValues (select, selectedOptions) {
            var value = [],
                options = selectedOptions || select.selectedOptions,
                opt;

            for (var i = 0, len = options.length; i < len; i++) {
                opt = options[i];

                if (!(opt.disabled || opt.parentNode.tagName === 'OPTGROUP' && opt.parentNode.disabled)) {
                    value.push(opt.value || opt.text);
                }
            }

            if (!select.multiple) {
                return !value.length ? null : value[0];
            }

            return value;
        }

        // set data-selected on select element if the value has been programmatically selected
        // prior to initialization of bootstrap-select
        // * consider removing or replacing an alternative method *
        var valHooks = {
            useDefault: false,
            _set: $.valHooks.select.set
        };

        $.valHooks.select.set = function (elem, value) {
            if (value && !valHooks.useDefault) $(elem).data('selected', true);

            return valHooks._set.apply(this, arguments);
        };

        var changedArguments = null;

        var EventIsSupported = (function () {
            try {
                new Event('change');
                return true;
            } catch (e) {
                return false;
            }
        })();

        $.fn.triggerNative = function (eventName) {
            var el = this[0],
                event;

            if (el.dispatchEvent) { // for modern browsers & IE9+
                if (EventIsSupported) {
                    // For modern browsers
                    event = new Event(eventName, {
                        bubbles: true
                    });
                } else {
                    // For IE since it doesn't support Event constructor
                    event = document.createEvent('Event');
                    event.initEvent(eventName, true, false);
                }

                el.dispatchEvent(event);
            } else if (el.fireEvent) { // for IE8
                event = document.createEventObject();
                event.eventType = eventName;
                el.fireEvent('on' + eventName, event);
            } else {
                // fall back to jQuery.trigger
                this.trigger(eventName);
            }
        };
        // </editor-fold>

        function stringSearch (li, searchString, method, normalize) {
            var stringTypes = [
                    'display',
                    'subtext',
                    'tokens'
                ],
                searchSuccess = false;

            for (var i = 0; i < stringTypes.length; i++) {
                var stringType = stringTypes[i],
                    string = li[stringType];

                if (string) {
                    string = string.toString();

                    // Strip HTML tags. This isn't perfect, but it's much faster than any other method
                    if (stringType === 'display') {
                        string = string.replace(/<[^>]+>/g, '');
                    }

                    if (normalize) string = normalizeToBase(string);
                    string = string.toUpperCase();

                    if (method === 'contains') {
                        searchSuccess = string.indexOf(searchString) >= 0;
                    } else {
                        searchSuccess = string.startsWith(searchString);
                    }

                    if (searchSuccess) break;
                }
            }

            return searchSuccess;
        }

        function toInteger (value) {
            return parseInt(value, 10) || 0;
        }

        // Borrowed from Lodash (_.deburr)
        /** Used to map Latin Unicode letters to basic Latin letters. */
        var deburredLetters = {
            // Latin-1 Supplement block.
            '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
            '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
            '\xc7': 'C',  '\xe7': 'c',
            '\xd0': 'D',  '\xf0': 'd',
            '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
            '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
            '\xcc': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
            '\xec': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
            '\xd1': 'N',  '\xf1': 'n',
            '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
            '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
            '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
            '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
            '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
            '\xc6': 'Ae', '\xe6': 'ae',
            '\xde': 'Th', '\xfe': 'th',
            '\xdf': 'ss',
            // Latin Extended-A block.
            '\u0100': 'A',  '\u0102': 'A', '\u0104': 'A',
            '\u0101': 'a',  '\u0103': 'a', '\u0105': 'a',
            '\u0106': 'C',  '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
            '\u0107': 'c',  '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
            '\u010e': 'D',  '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
            '\u0112': 'E',  '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
            '\u0113': 'e',  '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
            '\u011c': 'G',  '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
            '\u011d': 'g',  '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
            '\u0124': 'H',  '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
            '\u0128': 'I',  '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
            '\u0129': 'i',  '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
            '\u0134': 'J',  '\u0135': 'j',
            '\u0136': 'K',  '\u0137': 'k', '\u0138': 'k',
            '\u0139': 'L',  '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
            '\u013a': 'l',  '\u013c': 'l', '\u013e': 'l', '\u0140': 'l', '\u0142': 'l',
            '\u0143': 'N',  '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
            '\u0144': 'n',  '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
            '\u014c': 'O',  '\u014e': 'O', '\u0150': 'O',
            '\u014d': 'o',  '\u014f': 'o', '\u0151': 'o',
            '\u0154': 'R',  '\u0156': 'R', '\u0158': 'R',
            '\u0155': 'r',  '\u0157': 'r', '\u0159': 'r',
            '\u015a': 'S',  '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
            '\u015b': 's',  '\u015d': 's', '\u015f': 's', '\u0161': 's',
            '\u0162': 'T',  '\u0164': 'T', '\u0166': 'T',
            '\u0163': 't',  '\u0165': 't', '\u0167': 't',
            '\u0168': 'U',  '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
            '\u0169': 'u',  '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
            '\u0174': 'W',  '\u0175': 'w',
            '\u0176': 'Y',  '\u0177': 'y', '\u0178': 'Y',
            '\u0179': 'Z',  '\u017b': 'Z', '\u017d': 'Z',
            '\u017a': 'z',  '\u017c': 'z', '\u017e': 'z',
            '\u0132': 'IJ', '\u0133': 'ij',
            '\u0152': 'Oe', '\u0153': 'oe',
            '\u0149': "'n", '\u017f': 's'
        };

        /** Used to match Latin Unicode letters (excluding mathematical operators). */
        var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

        /** Used to compose unicode character classes. */
        var rsComboMarksRange = '\\u0300-\\u036f',
            reComboHalfMarksRange = '\\ufe20-\\ufe2f',
            rsComboSymbolsRange = '\\u20d0-\\u20ff',
            rsComboMarksExtendedRange = '\\u1ab0-\\u1aff',
            rsComboMarksSupplementRange = '\\u1dc0-\\u1dff',
            rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange + rsComboMarksExtendedRange + rsComboMarksSupplementRange;

        /** Used to compose unicode capture groups. */
        var rsCombo = '[' + rsComboRange + ']';

        /**
         * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
         * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
         */
        var reComboMark = RegExp(rsCombo, 'g');

        function deburrLetter (key) {
            return deburredLetters[key];
        };

        function normalizeToBase (string) {
            string = string.toString();
            return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
        }

        // List of HTML entities for escaping.
        var escapeMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            '`': '&#x60;'
        };

        // Functions for escaping and unescaping strings to/from HTML interpolation.
        var createEscaper = function (map) {
            var escaper = function (match) {
                return map[match];
            };
            // Regexes for identifying a key that needs to be escaped.
            var source = '(?:' + Object.keys(map).join('|') + ')';
            var testRegexp = RegExp(source);
            var replaceRegexp = RegExp(source, 'g');
            return function (string) {
                string = string == null ? '' : '' + string;
                return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
            };
        };

        var htmlEscape = createEscaper(escapeMap);

        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */

        var keyCodeMap = {
            32: ' ',
            48: '0',
            49: '1',
            50: '2',
            51: '3',
            52: '4',
            53: '5',
            54: '6',
            55: '7',
            56: '8',
            57: '9',
            59: ';',
            65: 'A',
            66: 'B',
            67: 'C',
            68: 'D',
            69: 'E',
            70: 'F',
            71: 'G',
            72: 'H',
            73: 'I',
            74: 'J',
            75: 'K',
            76: 'L',
            77: 'M',
            78: 'N',
            79: 'O',
            80: 'P',
            81: 'Q',
            82: 'R',
            83: 'S',
            84: 'T',
            85: 'U',
            86: 'V',
            87: 'W',
            88: 'X',
            89: 'Y',
            90: 'Z',
            96: '0',
            97: '1',
            98: '2',
            99: '3',
            100: '4',
            101: '5',
            102: '6',
            103: '7',
            104: '8',
            105: '9'
        };

        var keyCodes = {
            ESCAPE: 27, // KeyboardEvent.which value for Escape (Esc) key
            ENTER: 13, // KeyboardEvent.which value for Enter key
            SPACE: 32, // KeyboardEvent.which value for space key
            TAB: 9, // KeyboardEvent.which value for tab key
            ARROW_UP: 38, // KeyboardEvent.which value for up arrow key
            ARROW_DOWN: 40 // KeyboardEvent.which value for down arrow key
        }

        var version = {
            success: false,
            major: '3'
        };

        try {
            version.full = ($.fn.dropdown.Constructor.VERSION || '').split(' ')[0].split('.');
            version.major = version.full[0];
            version.success = true;
        } catch (err) {
            // do nothing
        }

        var selectId = 0;

        var EVENT_KEY = '.bs.select';

        var classNames = {
            DISABLED: 'disabled',
            DIVIDER: 'divider',
            SHOW: 'open',
            DROPUP: 'dropup',
            MENU: 'dropdown-menu',
            MENURIGHT: 'dropdown-menu-right',
            MENULEFT: 'dropdown-menu-left',
            // to-do: replace with more advanced template/customization options
            BUTTONCLASS: 'btn-default',
            POPOVERHEADER: 'popover-title',
            ICONBASE: 'glyphicon',
            TICKICON: 'glyphicon-ok'
        }

        var Selector = {
            MENU: '.' + classNames.MENU
        }

        var elementTemplates = {
            span: document.createElement('span'),
            i: document.createElement('i'),
            subtext: document.createElement('small'),
            a: document.createElement('a'),
            li: document.createElement('li'),
            whitespace: document.createTextNode('\u00A0'),
            fragment: document.createDocumentFragment()
        }

        elementTemplates.a.setAttribute('role', 'option');
        elementTemplates.subtext.className = 'text-muted';

        elementTemplates.text = elementTemplates.span.cloneNode(false);
        elementTemplates.text.className = 'text';

        elementTemplates.checkMark = elementTemplates.span.cloneNode(false);

        var REGEXP_ARROW = new RegExp(keyCodes.ARROW_UP + '|' + keyCodes.ARROW_DOWN);
        var REGEXP_TAB_OR_ESCAPE = new RegExp('^' + keyCodes.TAB + '$|' + keyCodes.ESCAPE);

        var generateOption = {
            li: function (content, classes, optgroup) {
                var li = elementTemplates.li.cloneNode(false);

                if (content) {
                    if (content.nodeType === 1 || content.nodeType === 11) {
                        li.appendChild(content);
                    } else {
                        li.innerHTML = content;
                    }
                }

                if (typeof classes !== 'undefined' && classes !== '') li.className = classes;
                if (typeof optgroup !== 'undefined' && optgroup !== null) li.classList.add('optgroup-' + optgroup);

                return li;
            },

            a: function (text, classes, inline) {
                var a = elementTemplates.a.cloneNode(true);

                if (text) {
                    if (text.nodeType === 11) {
                        a.appendChild(text);
                    } else {
                        a.insertAdjacentHTML('beforeend', text);
                    }
                }

                if (typeof classes !== 'undefined' && classes !== '') a.className = classes;
                if (version.major === '4') a.classList.add('dropdown-item');
                if (inline) a.setAttribute('style', inline);

                return a;
            },

            text: function (options, useFragment) {
                var textElement = elementTemplates.text.cloneNode(false),
                    subtextElement,
                    iconElement;

                if (options.content) {
                    textElement.innerHTML = options.content;
                } else {
                    textElement.textContent = options.text;

                    if (options.icon) {
                        var whitespace = elementTemplates.whitespace.cloneNode(false);

                        // need to use <i> for icons in the button to prevent a breaking change
                        // note: switch to span in next major release
                        iconElement = (useFragment === true ? elementTemplates.i : elementTemplates.span).cloneNode(false);
                        iconElement.className = options.iconBase + ' ' + options.icon;

                        elementTemplates.fragment.appendChild(iconElement);
                        elementTemplates.fragment.appendChild(whitespace);
                    }

                    if (options.subtext) {
                        subtextElement = elementTemplates.subtext.cloneNode(false);
                        subtextElement.textContent = options.subtext;
                        textElement.appendChild(subtextElement);
                    }
                }

                if (useFragment === true) {
                    while (textElement.childNodes.length > 0) {
                        elementTemplates.fragment.appendChild(textElement.childNodes[0]);
                    }
                } else {
                    elementTemplates.fragment.appendChild(textElement);
                }

                return elementTemplates.fragment;
            },

            label: function (options) {
                var textElement = elementTemplates.text.cloneNode(false),
                    subtextElement,
                    iconElement;

                textElement.innerHTML = options.label;

                if (options.icon) {
                    var whitespace = elementTemplates.whitespace.cloneNode(false);

                    iconElement = elementTemplates.span.cloneNode(false);
                    iconElement.className = options.iconBase + ' ' + options.icon;

                    elementTemplates.fragment.appendChild(iconElement);
                    elementTemplates.fragment.appendChild(whitespace);
                }

                if (options.subtext) {
                    subtextElement = elementTemplates.subtext.cloneNode(false);
                    subtextElement.textContent = options.subtext;
                    textElement.appendChild(subtextElement);
                }

                elementTemplates.fragment.appendChild(textElement);

                return elementTemplates.fragment;
            }
        }

        var Selectpicker = function (element, options) {
            var that = this;

            // bootstrap-select has been initialized - revert valHooks.select.set back to its original function
            if (!valHooks.useDefault) {
                $.valHooks.select.set = valHooks._set;
                valHooks.useDefault = true;
            }

            this.$element = $(element);
            this.$newElement = null;
            this.$button = null;
            this.$menu = null;
            this.options = options;
            this.selectpicker = {
                main: {},
                search: {},
                current: {}, // current changes if a search is in progress
                view: {},
                keydown: {
                    keyHistory: '',
                    resetKeyHistory: {
                        start: function () {
                            return setTimeout(function () {
                                that.selectpicker.keydown.keyHistory = '';
                            }, 800);
                        }
                    }
                }
            };
            // If we have no title yet, try to pull it from the html title attribute (jQuery doesnt' pick it up as it's not a
            // data-attribute)
            if (this.options.title === null) {
                this.options.title = this.$element.attr('title');
            }

            // Format window padding
            var winPad = this.options.windowPadding;
            if (typeof winPad === 'number') {
                this.options.windowPadding = [winPad, winPad, winPad, winPad];
            }

            // Expose public methods
            this.val = Selectpicker.prototype.val;
            this.render = Selectpicker.prototype.render;
            this.refresh = Selectpicker.prototype.refresh;
            this.setStyle = Selectpicker.prototype.setStyle;
            this.selectAll = Selectpicker.prototype.selectAll;
            this.deselectAll = Selectpicker.prototype.deselectAll;
            this.destroy = Selectpicker.prototype.destroy;
            this.remove = Selectpicker.prototype.remove;
            this.show = Selectpicker.prototype.show;
            this.hide = Selectpicker.prototype.hide;

            this.init();
        };

        Selectpicker.VERSION = '1.13.10';

        // part of this is duplicated in i18n/defaults-en_US.js. Make sure to update both.
        Selectpicker.DEFAULTS = {
            noneSelectedText: 'Nothing selected',
            noneResultsText: 'No results matched {0}',
            countSelectedText: function (numSelected, numTotal) {
                return (numSelected == 1) ? '{0} item selected' : '{0} items selected';
            },
            maxOptionsText: function (numAll, numGroup) {
                return [
                    (numAll == 1) ? 'Limit reached ({n} item max)' : 'Limit reached ({n} items max)',
                    (numGroup == 1) ? 'Group limit reached ({n} item max)' : 'Group limit reached ({n} items max)'
                ];
            },
            selectAllText: 'Select All',
            deselectAllText: 'Deselect All',
            doneButton: false,
            doneButtonText: 'Close',
            multipleSeparator: ', ',
            styleBase: 'btn',
            style: classNames.BUTTONCLASS,
            size: 'auto',
            title: null,
            selectedTextFormat: 'values',
            width: false,
            container: false,
            hideDisabled: false,
            showSubtext: false,
            showIcon: true,
            showContent: true,
            dropupAuto: true,
            header: false,
            liveSearch: false,
            liveSearchPlaceholder: null,
            liveSearchNormalize: false,
            liveSearchStyle: 'contains',
            actionsBox: false,
            iconBase: classNames.ICONBASE,
            tickIcon: classNames.TICKICON,
            showTick: false,
            template: {
                caret: '<span class="caret"></span>'
            },
            maxOptions: false,
            mobile: false,
            selectOnTab: false,
            dropdownAlignRight: false,
            windowPadding: 0,
            virtualScroll: 600,
            display: false,
            sanitize: true,
            sanitizeFn: null,
            whiteList: DefaultWhitelist
        };

        Selectpicker.prototype = {

            constructor: Selectpicker,

            init: function () {
                var that = this,
                    id = this.$element.attr('id');

                selectId++;
                this.selectId = 'bs-select-' + selectId;

                this.$element[0].classList.add('bs-select-hidden');

                this.multiple = this.$element.prop('multiple');
                this.autofocus = this.$element.prop('autofocus');

                if (this.$element[0].classList.contains('show-tick')) {
                    this.options.showTick = true;
                }

                this.$newElement = this.createDropdown();
                this.$element
                    .after(this.$newElement)
                    .prependTo(this.$newElement);

                this.$button = this.$newElement.children('button');
                this.$menu = this.$newElement.children(Selector.MENU);
                this.$menuInner = this.$menu.children('.inner');
                this.$searchbox = this.$menu.find('input');

                this.$element[0].classList.remove('bs-select-hidden');

                if (this.options.dropdownAlignRight === true) this.$menu[0].classList.add(classNames.MENURIGHT);

                if (typeof id !== 'undefined') {
                    this.$button.attr('data-id', id);
                }

                this.checkDisabled();
                this.clickListener();

                if (this.options.liveSearch) {
                    this.liveSearchListener();
                    this.focusedParent = this.$searchbox[0];
                } else {
                    this.focusedParent = this.$menuInner[0];
                }

                this.setStyle();
                this.render();
                this.setWidth();
                if (this.options.container) {
                    this.selectPosition();
                } else {
                    this.$element.on('hide' + EVENT_KEY, function () {
                        if (that.isVirtual()) {
                            // empty menu on close
                            var menuInner = that.$menuInner[0],
                                emptyMenu = menuInner.firstChild.cloneNode(false);

                            // replace the existing UL with an empty one - this is faster than $.empty() or innerHTML = ''
                            menuInner.replaceChild(emptyMenu, menuInner.firstChild);
                            menuInner.scrollTop = 0;
                        }
                    });
                }
                this.$menu.data('this', this);
                this.$newElement.data('this', this);
                if (this.options.mobile) this.mobile();

                this.$newElement.on({
                    'hide.bs.dropdown': function (e) {
                        that.$element.trigger('hide' + EVENT_KEY, e);
                    },
                    'hidden.bs.dropdown': function (e) {
                        that.$element.trigger('hidden' + EVENT_KEY, e);
                    },
                    'show.bs.dropdown': function (e) {
                        that.$element.trigger('show' + EVENT_KEY, e);
                    },
                    'shown.bs.dropdown': function (e) {
                        that.$element.trigger('shown' + EVENT_KEY, e);
                    }
                });

                if (that.$element[0].hasAttribute('required')) {
                    this.$element.on('invalid' + EVENT_KEY, function () {
                        that.$button[0].classList.add('bs-invalid');

                        that.$element
                            .on('shown' + EVENT_KEY + '.invalid', function () {
                                that.$element
                                    .val(that.$element.val()) // set the value to hide the validation message in Chrome when menu is opened
                                    .off('shown' + EVENT_KEY + '.invalid');
                            })
                            .on('rendered' + EVENT_KEY, function () {
                                // if select is no longer invalid, remove the bs-invalid class
                                if (this.validity.valid) that.$button[0].classList.remove('bs-invalid');
                                that.$element.off('rendered' + EVENT_KEY);
                            });

                        that.$button.on('blur' + EVENT_KEY, function () {
                            that.$element.trigger('focus').trigger('blur');
                            that.$button.off('blur' + EVENT_KEY);
                        });
                    });
                }

                setTimeout(function () {
                    that.createLi();
                    that.$element.trigger('loaded' + EVENT_KEY);
                });
            },

            createDropdown: function () {
                // Options
                // If we are multiple or showTick option is set, then add the show-tick class
                var showTick = (this.multiple || this.options.showTick) ? ' show-tick' : '',
                    multiselectable = this.multiple ? ' aria-multiselectable="true"' : '',
                    inputGroup = '',
                    autofocus = this.autofocus ? ' autofocus' : '';

                if (version.major < 4 && this.$element.parent().hasClass('input-group')) {
                    inputGroup = ' input-group-btn';
                }

                // Elements
                var drop,
                    header = '',
                    searchbox = '',
                    actionsbox = '',
                    donebutton = '';

                if (this.options.header) {
                    header =
                        '<div class="' + classNames.POPOVERHEADER + '">' +
                        '<button type="button" class="close" aria-hidden="true">&times;</button>' +
                        this.options.header +
                        '</div>';
                }

                if (this.options.liveSearch) {
                    searchbox =
                        '<div class="bs-searchbox">' +
                        '<input type="text" class="form-control" autocomplete="off"' +
                        (
                            this.options.liveSearchPlaceholder === null ? ''
                                :
                                ' placeholder="' + htmlEscape(this.options.liveSearchPlaceholder) + '"'
                        ) +
                        ' role="combobox" aria-label="Search" aria-controls="' + this.selectId + '" aria-autocomplete="list">' +
                        '</div>';
                }

                if (this.multiple && this.options.actionsBox) {
                    actionsbox =
                        '<div class="bs-actionsbox">' +
                        '<div class="btn-group btn-group-sm btn-block">' +
                        '<button type="button" class="actions-btn bs-select-all btn ' + classNames.BUTTONCLASS + '">' +
                        this.options.selectAllText +
                        '</button>' +
                        '<button type="button" class="actions-btn bs-deselect-all btn ' + classNames.BUTTONCLASS + '">' +
                        this.options.deselectAllText +
                        '</button>' +
                        '</div>' +
                        '</div>';
                }

                if (this.multiple && this.options.doneButton) {
                    donebutton =
                        '<div class="bs-donebutton">' +
                        '<div class="btn-group btn-block">' +
                        '<button type="button" class="btn btn-sm ' + classNames.BUTTONCLASS + '">' +
                        this.options.doneButtonText +
                        '</button>' +
                        '</div>' +
                        '</div>';
                }

                drop =
                    '<div class="dropdown bootstrap-select' + showTick + inputGroup + '">' +
                    '<button type="button" class="' + this.options.styleBase + ' dropdown-toggle" ' + (this.options.display === 'static' ? 'data-display="static"' : '') + 'data-toggle="dropdown"' + autofocus + ' role="combobox" aria-owns="' + this.selectId + '" aria-haspopup="listbox" aria-expanded="false">' +
                    '<div class="filter-option">' +
                    '<div class="filter-option-inner">' +
                    '<div class="filter-option-inner-inner"></div>' +
                    '</div> ' +
                    '</div>' +
                    (
                        version.major === '4' ? ''
                            :
                            '<span class="bs-caret">' +
                            this.options.template.caret +
                            '</span>'
                    ) +
                    '</button>' +
                    '<div class="' + classNames.MENU + ' ' + (version.major === '4' ? '' : classNames.SHOW) + '">' +
                    header +
                    searchbox +
                    actionsbox +
                    '<div class="inner ' + classNames.SHOW + '" role="listbox" id="' + this.selectId + '" tabindex="-1" ' + multiselectable + '>' +
                    '<ul class="' + classNames.MENU + ' inner ' + (version.major === '4' ? classNames.SHOW : '') + '" role="presentation">' +
                    '</ul>' +
                    '</div>' +
                    donebutton +
                    '</div>' +
                    '</div>';

                return $(drop);
            },

            setPositionData: function () {
                this.selectpicker.view.canHighlight = [];
                this.selectpicker.view.size = 0;

                for (var i = 0; i < this.selectpicker.current.data.length; i++) {
                    var li = this.selectpicker.current.data[i],
                        canHighlight = true;

                    if (li.type === 'divider') {
                        canHighlight = false;
                        li.height = this.sizeInfo.dividerHeight;
                    } else if (li.type === 'optgroup-label') {
                        canHighlight = false;
                        li.height = this.sizeInfo.dropdownHeaderHeight;
                    } else {
                        li.height = this.sizeInfo.liHeight;
                    }

                    if (li.disabled) canHighlight = false;

                    this.selectpicker.view.canHighlight.push(canHighlight);

                    if (canHighlight) {
                        this.selectpicker.view.size++;
                        li.posinset = this.selectpicker.view.size;
                    }

                    li.position = (i === 0 ? 0 : this.selectpicker.current.data[i - 1].position) + li.height;
                }
            },

            isVirtual: function () {
                return (this.options.virtualScroll !== false) && (this.selectpicker.main.elements.length >= this.options.virtualScroll) || this.options.virtualScroll === true;
            },

            createView: function (isSearching, setSize, refresh) {
                var that = this,
                    scrollTop = 0,
                    active = [],
                    selected,
                    prevActive;

                this.selectpicker.current = isSearching ? this.selectpicker.search : this.selectpicker.main;

                this.setPositionData();

                if (setSize) {
                    if (refresh) {
                        scrollTop = this.$menuInner[0].scrollTop;
                    } else if (!that.multiple) {
                        var element = that.$element[0],
                            selectedIndex = (element.options[element.selectedIndex] || {}).liIndex;

                        if (typeof selectedIndex === 'number' && that.options.size !== false) {
                            var selectedData = that.selectpicker.main.data[selectedIndex],
                                position = selectedData && selectedData.position;

                            if (position) {
                                scrollTop = position - ((that.sizeInfo.menuInnerHeight + that.sizeInfo.liHeight) / 2);
                            }
                        }
                    }
                }

                scroll(scrollTop, true);

                this.$menuInner.off('scroll.createView').on('scroll.createView', function (e, updateValue) {
                    if (!that.noScroll) scroll(this.scrollTop, updateValue);
                    that.noScroll = false;
                });

                function scroll (scrollTop, init) {
                    var size = that.selectpicker.current.elements.length,
                        chunks = [],
                        chunkSize,
                        chunkCount,
                        firstChunk,
                        lastChunk,
                        currentChunk,
                        prevPositions,
                        positionIsDifferent,
                        previousElements,
                        menuIsDifferent = true,
                        isVirtual = that.isVirtual();

                    that.selectpicker.view.scrollTop = scrollTop;

                    if (isVirtual === true) {
                        // if an option that is encountered that is wider than the current menu width, update the menu width accordingly
                        if (that.sizeInfo.hasScrollBar && that.$menu[0].offsetWidth > that.sizeInfo.totalMenuWidth) {
                            that.sizeInfo.menuWidth = that.$menu[0].offsetWidth;
                            that.sizeInfo.totalMenuWidth = that.sizeInfo.menuWidth + that.sizeInfo.scrollBarWidth;
                            that.$menu.css('min-width', that.sizeInfo.menuWidth);
                        }
                    }

                    chunkSize = Math.ceil(that.sizeInfo.menuInnerHeight / that.sizeInfo.liHeight * 1.5); // number of options in a chunk
                    chunkCount = Math.round(size / chunkSize) || 1; // number of chunks

                    for (var i = 0; i < chunkCount; i++) {
                        var endOfChunk = (i + 1) * chunkSize;

                        if (i === chunkCount - 1) {
                            endOfChunk = size;
                        }

                        chunks[i] = [
                            (i) * chunkSize + (!i ? 0 : 1),
                            endOfChunk
                        ];

                        if (!size) break;

                        if (currentChunk === undefined && scrollTop <= that.selectpicker.current.data[endOfChunk - 1].position - that.sizeInfo.menuInnerHeight) {
                            currentChunk = i;
                        }
                    }

                    if (currentChunk === undefined) currentChunk = 0;

                    prevPositions = [that.selectpicker.view.position0, that.selectpicker.view.position1];

                    // always display previous, current, and next chunks
                    firstChunk = Math.max(0, currentChunk - 1);
                    lastChunk = Math.min(chunkCount - 1, currentChunk + 1);

                    that.selectpicker.view.position0 = isVirtual === false ? 0 : (Math.max(0, chunks[firstChunk][0]) || 0);
                    that.selectpicker.view.position1 = isVirtual === false ? size : (Math.min(size, chunks[lastChunk][1]) || 0);

                    positionIsDifferent = prevPositions[0] !== that.selectpicker.view.position0 || prevPositions[1] !== that.selectpicker.view.position1;

                    if (that.activeIndex !== undefined) {
                        prevActive = that.selectpicker.main.elements[that.prevActiveIndex];
                        active = that.selectpicker.main.elements[that.activeIndex];
                        selected = that.selectpicker.main.elements[that.selectedIndex];

                        if (init) {
                            if (that.activeIndex !== that.selectedIndex) {
                                that.defocusItem(active);
                            }
                            that.activeIndex = undefined;
                        }

                        if (that.activeIndex && that.activeIndex !== that.selectedIndex) {
                            that.defocusItem(selected);
                        }
                    }

                    if (that.prevActiveIndex !== undefined && that.prevActiveIndex !== that.activeIndex && that.prevActiveIndex !== that.selectedIndex) {
                        that.defocusItem(prevActive);
                    }

                    if (init || positionIsDifferent) {
                        previousElements = that.selectpicker.view.visibleElements ? that.selectpicker.view.visibleElements.slice() : [];

                        if (isVirtual === false) {
                            that.selectpicker.view.visibleElements = that.selectpicker.current.elements;
                        } else {
                            that.selectpicker.view.visibleElements = that.selectpicker.current.elements.slice(that.selectpicker.view.position0, that.selectpicker.view.position1);
                        }

                        that.setOptionStatus();

                        // if searching, check to make sure the list has actually been updated before updating DOM
                        // this prevents unnecessary repaints
                        if (isSearching || (isVirtual === false && init)) menuIsDifferent = !isEqual(previousElements, that.selectpicker.view.visibleElements);

                        // if virtual scroll is disabled and not searching,
                        // menu should never need to be updated more than once
                        if ((init || isVirtual === true) && menuIsDifferent) {
                            var menuInner = that.$menuInner[0],
                                menuFragment = document.createDocumentFragment(),
                                emptyMenu = menuInner.firstChild.cloneNode(false),
                                marginTop,
                                marginBottom,
                                elements = that.selectpicker.view.visibleElements,
                                toSanitize = [];

                            // replace the existing UL with an empty one - this is faster than $.empty()
                            menuInner.replaceChild(emptyMenu, menuInner.firstChild);

                            for (var i = 0, visibleElementsLen = elements.length; i < visibleElementsLen; i++) {
                                var element = elements[i],
                                    elText,
                                    elementData;

                                if (that.options.sanitize) {
                                    elText = element.lastChild;

                                    if (elText) {
                                        elementData = that.selectpicker.current.data[i + that.selectpicker.view.position0];

                                        if (elementData && elementData.content && !elementData.sanitized) {
                                            toSanitize.push(elText);
                                            elementData.sanitized = true;
                                        }
                                    }
                                }

                                menuFragment.appendChild(element);
                            }

                            if (that.options.sanitize && toSanitize.length) {
                                sanitizeHtml(toSanitize, that.options.whiteList, that.options.sanitizeFn);
                            }

                            if (isVirtual === true) {
                                marginTop = (that.selectpicker.view.position0 === 0 ? 0 : that.selectpicker.current.data[that.selectpicker.view.position0 - 1].position);
                                marginBottom = (that.selectpicker.view.position1 > size - 1 ? 0 : that.selectpicker.current.data[size - 1].position - that.selectpicker.current.data[that.selectpicker.view.position1 - 1].position);

                                menuInner.firstChild.style.marginTop = marginTop + 'px';
                                menuInner.firstChild.style.marginBottom = marginBottom + 'px';
                            } else {
                                menuInner.firstChild.style.marginTop = 0;
                                menuInner.firstChild.style.marginBottom = 0;
                            }

                            menuInner.firstChild.appendChild(menuFragment);
                        }
                    }

                    that.prevActiveIndex = that.activeIndex;

                    if (!that.options.liveSearch) {
                        that.$menuInner.trigger('focus');
                    } else if (isSearching && init) {
                        var index = 0,
                            newActive;

                        if (!that.selectpicker.view.canHighlight[index]) {
                            index = 1 + that.selectpicker.view.canHighlight.slice(1).indexOf(true);
                        }

                        newActive = that.selectpicker.view.visibleElements[index];

                        that.defocusItem(that.selectpicker.view.currentActive);

                        that.activeIndex = (that.selectpicker.current.data[index] || {}).index;

                        that.focusItem(newActive);
                    }
                }

                $(window)
                    .off('resize' + EVENT_KEY + '.' + this.selectId + '.createView')
                    .on('resize' + EVENT_KEY + '.' + this.selectId + '.createView', function () {
                        var isActive = that.$newElement.hasClass(classNames.SHOW);

                        if (isActive) scroll(that.$menuInner[0].scrollTop);
                    });
            },

            focusItem: function (li, liData, noStyle) {
                if (li) {
                    liData = liData || this.selectpicker.main.data[this.activeIndex];
                    var a = li.firstChild;

                    if (a) {
                        a.setAttribute('aria-setsize', this.selectpicker.view.size);
                        a.setAttribute('aria-posinset', liData.posinset);

                        if (noStyle !== true) {
                            this.focusedParent.setAttribute('aria-activedescendant', a.id);
                            li.classList.add('active');
                            a.classList.add('active');
                        }
                    }
                }
            },

            defocusItem: function (li) {
                if (li) {
                    li.classList.remove('active');
                    if (li.firstChild) li.firstChild.classList.remove('active');
                }
            },

            setPlaceholder: function () {
                var updateIndex = false;

                if (this.options.title && !this.multiple) {
                    if (!this.selectpicker.view.titleOption) this.selectpicker.view.titleOption = document.createElement('option');

                    // this option doesn't create a new <li> element, but does add a new option at the start,
                    // so startIndex should increase to prevent having to check every option for the bs-title-option class
                    updateIndex = true;

                    var element = this.$element[0],
                        isSelected = false,
                        titleNotAppended = !this.selectpicker.view.titleOption.parentNode;

                    if (titleNotAppended) {
                        // Use native JS to prepend option (faster)
                        this.selectpicker.view.titleOption.className = 'bs-title-option';
                        this.selectpicker.view.titleOption.value = '';

                        // Check if selected or data-selected attribute is already set on an option. If not, select the titleOption option.
                        // the selected item may have been changed by user or programmatically before the bootstrap select plugin runs,
                        // if so, the select will have the data-selected attribute
                        var $opt = $(element.options[element.selectedIndex]);
                        isSelected = $opt.attr('selected') === undefined && this.$element.data('selected') === undefined;
                    }

                    if (titleNotAppended || this.selectpicker.view.titleOption.index !== 0) {
                        element.insertBefore(this.selectpicker.view.titleOption, element.firstChild);
                    }

                    // Set selected *after* appending to select,
                    // otherwise the option doesn't get selected in IE
                    // set using selectedIndex, as setting the selected attr to true here doesn't work in IE11
                    if (isSelected) element.selectedIndex = 0;
                }

                return updateIndex;
            },

            createLi: function () {
                var that = this,
                    iconBase = this.options.iconBase,
                    optionSelector = ':not([hidden]):not([data-hidden="true"])',
                    mainElements = [],
                    mainData = [],
                    widestOptionLength = 0,
                    optID = 0,
                    startIndex = this.setPlaceholder() ? 1 : 0; // append the titleOption if necessary and skip the first option in the loop

                if (this.options.hideDisabled) optionSelector += ':not(:disabled)';

                if ((that.options.showTick || that.multiple) && !elementTemplates.checkMark.parentNode) {
                    elementTemplates.checkMark.className = iconBase + ' ' + that.options.tickIcon + ' check-mark';
                    elementTemplates.a.appendChild(elementTemplates.checkMark);
                }

                var selectOptions = this.$element[0].querySelectorAll('select > *' + optionSelector);

                function addDivider (config) {
                    var previousData = mainData[mainData.length - 1];

                    // ensure optgroup doesn't create back-to-back dividers
                    if (
                        previousData &&
                        previousData.type === 'divider' &&
                        (previousData.optID || config.optID)
                    ) {
                        return;
                    }

                    config = config || {};
                    config.type = 'divider';

                    mainElements.push(
                        generateOption.li(
                            false,
                            classNames.DIVIDER,
                            (config.optID ? config.optID + 'div' : undefined)
                        )
                    );

                    mainData.push(config);
                }

                function addOption (option, config) {
                    config = config || {};

                    config.divider = option.getAttribute('data-divider') === 'true';

                    if (config.divider) {
                        addDivider({
                            optID: config.optID
                        });
                    } else {
                        var liIndex = mainData.length,
                            cssText = option.style.cssText,
                            inlineStyle = cssText ? htmlEscape(cssText) : '',
                            optionClass = (option.className || '') + (config.optgroupClass || '');

                        if (config.optID) optionClass = 'opt ' + optionClass;

                        config.text = option.textContent;

                        config.content = option.getAttribute('data-content');
                        config.tokens = option.getAttribute('data-tokens');
                        config.subtext = option.getAttribute('data-subtext');
                        config.icon = option.getAttribute('data-icon');
                        config.iconBase = iconBase;

                        var textElement = generateOption.text(config);
                        var liElement = generateOption.li(
                            generateOption.a(
                                textElement,
                                optionClass,
                                inlineStyle
                            ),
                            '',
                            config.optID
                        );

                        if (liElement.firstChild) {
                            liElement.firstChild.id = that.selectId + '-' + liIndex;
                        }

                        mainElements.push(liElement);

                        option.liIndex = liIndex;

                        config.display = config.content || config.text;
                        config.type = 'option';
                        config.index = liIndex;
                        config.option = option;
                        config.disabled = config.disabled || option.disabled;

                        mainData.push(config);

                        var combinedLength = 0;

                        // count the number of characters in the option - not perfect, but should work in most cases
                        if (config.display) combinedLength += config.display.length;
                        if (config.subtext) combinedLength += config.subtext.length;
                        // if there is an icon, ensure this option's width is checked
                        if (config.icon) combinedLength += 1;

                        if (combinedLength > widestOptionLength) {
                            widestOptionLength = combinedLength;

                            // guess which option is the widest
                            // use this when calculating menu width
                            // not perfect, but it's fast, and the width will be updating accordingly when scrolling
                            that.selectpicker.view.widestOption = mainElements[mainElements.length - 1];
                        }
                    }
                }

                function addOptgroup (index, selectOptions) {
                    var optgroup = selectOptions[index],
                        previous = selectOptions[index - 1],
                        next = selectOptions[index + 1],
                        options = optgroup.querySelectorAll('option' + optionSelector);

                    if (!options.length) return;

                    var config = {
                            label: htmlEscape(optgroup.label),
                            subtext: optgroup.getAttribute('data-subtext'),
                            icon: optgroup.getAttribute('data-icon'),
                            iconBase: iconBase
                        },
                        optgroupClass = ' ' + (optgroup.className || ''),
                        headerIndex,
                        lastIndex;

                    optID++;

                    if (previous) {
                        addDivider({ optID: optID });
                    }

                    var labelElement = generateOption.label(config);

                    mainElements.push(
                        generateOption.li(labelElement, 'dropdown-header' + optgroupClass, optID)
                    );

                    mainData.push({
                        display: config.label,
                        subtext: config.subtext,
                        type: 'optgroup-label',
                        optID: optID
                    });

                    for (var j = 0, len = options.length; j < len; j++) {
                        var option = options[j];

                        if (j === 0) {
                            headerIndex = mainData.length - 1;
                            lastIndex = headerIndex + len;
                        }

                        addOption(option, {
                            headerIndex: headerIndex,
                            lastIndex: lastIndex,
                            optID: optID,
                            optgroupClass: optgroupClass,
                            disabled: optgroup.disabled
                        });
                    }

                    if (next) {
                        addDivider({ optID: optID });
                    }
                }

                for (var len = selectOptions.length; startIndex < len; startIndex++) {
                    var item = selectOptions[startIndex];

                    if (item.tagName !== 'OPTGROUP') {
                        addOption(item, {});
                    } else {
                        addOptgroup(startIndex, selectOptions);
                    }
                }

                this.selectpicker.main.elements = mainElements;
                this.selectpicker.main.data = mainData;

                this.selectpicker.current = this.selectpicker.main;
            },

            findLis: function () {
                return this.$menuInner.find('.inner > li');
            },

            render: function () {
                // ensure titleOption is appended and selected (if necessary) before getting selectedOptions
                this.setPlaceholder();

                var that = this,
                    element = this.$element[0],
                    selectedOptions = getSelectedOptions(element, this.options.hideDisabled),
                    selectedCount = selectedOptions.length,
                    button = this.$button[0],
                    buttonInner = button.querySelector('.filter-option-inner-inner'),
                    multipleSeparator = document.createTextNode(this.options.multipleSeparator),
                    titleFragment = elementTemplates.fragment.cloneNode(false),
                    showCount,
                    countMax,
                    hasContent = false;

                button.classList.toggle('bs-placeholder', that.multiple ? !selectedCount : !getSelectValues(element, selectedOptions));

                this.tabIndex();

                if (this.options.selectedTextFormat === 'static') {
                    titleFragment = generateOption.text({ text: this.options.title }, true);
                } else {
                    showCount = this.multiple && this.options.selectedTextFormat.indexOf('count') !== -1 && selectedCount > 1;

                    // determine if the number of selected options will be shown (showCount === true)
                    if (showCount) {
                        countMax = this.options.selectedTextFormat.split('>');
                        showCount = (countMax.length > 1 && selectedCount > countMax[1]) || (countMax.length === 1 && selectedCount >= 2);
                    }

                    // only loop through all selected options if the count won't be shown
                    if (showCount === false) {
                        for (var selectedIndex = 0; selectedIndex < selectedCount; selectedIndex++) {
                            if (selectedIndex < 50) {
                                var option = selectedOptions[selectedIndex],
                                    titleOptions = {},
                                    thisData = {
                                        content: option.getAttribute('data-content'),
                                        subtext: option.getAttribute('data-subtext'),
                                        icon: option.getAttribute('data-icon')
                                    };

                                if (this.multiple && selectedIndex > 0) {
                                    titleFragment.appendChild(multipleSeparator.cloneNode(false));
                                }

                                if (option.title) {
                                    titleOptions.text = option.title;
                                } else if (thisData.content && that.options.showContent) {
                                    titleOptions.content = thisData.content.toString();
                                    hasContent = true;
                                } else {
                                    if (that.options.showIcon) {
                                        titleOptions.icon = thisData.icon;
                                        titleOptions.iconBase = this.options.iconBase;
                                    }
                                    if (that.options.showSubtext && !that.multiple && thisData.subtext) titleOptions.subtext = ' ' + thisData.subtext;
                                    titleOptions.text = option.textContent.trim();
                                }

                                titleFragment.appendChild(generateOption.text(titleOptions, true));
                            } else {
                                break;
                            }
                        }

                        // add ellipsis
                        if (selectedCount > 49) {
                            titleFragment.appendChild(document.createTextNode('...'));
                        }
                    } else {
                        var optionSelector = ':not([hidden]):not([data-hidden="true"]):not([data-divider="true"])';
                        if (this.options.hideDisabled) optionSelector += ':not(:disabled)';

                        // If this is a multiselect, and selectedTextFormat is count, then show 1 of 2 selected, etc.
                        var totalCount = this.$element[0].querySelectorAll('select > option' + optionSelector + ', optgroup' + optionSelector + ' option' + optionSelector).length,
                            tr8nText = (typeof this.options.countSelectedText === 'function') ? this.options.countSelectedText(selectedCount, totalCount) : this.options.countSelectedText;

                        titleFragment = generateOption.text({
                            text: tr8nText.replace('{0}', selectedCount.toString()).replace('{1}', totalCount.toString())
                        }, true);
                    }
                }

                if (this.options.title == undefined) {
                    // use .attr to ensure undefined is returned if title attribute is not set
                    this.options.title = this.$element.attr('title');
                }

                // If the select doesn't have a title, then use the default, or if nothing is set at all, use noneSelectedText
                if (!titleFragment.childNodes.length) {
                    titleFragment = generateOption.text({
                        text: typeof this.options.title !== 'undefined' ? this.options.title : this.options.noneSelectedText
                    }, true);
                }

                // strip all HTML tags and trim the result, then unescape any escaped tags
                button.title = titleFragment.textContent.replace(/<[^>]*>?/g, '').trim();

                if (this.options.sanitize && hasContent) {
                    sanitizeHtml([titleFragment], that.options.whiteList, that.options.sanitizeFn);
                }

                buttonInner.innerHTML = '';
                buttonInner.appendChild(titleFragment);

                if (version.major < 4 && this.$newElement[0].classList.contains('bs3-has-addon')) {
                    var filterExpand = button.querySelector('.filter-expand'),
                        clone = buttonInner.cloneNode(true);

                    clone.className = 'filter-expand';

                    if (filterExpand) {
                        button.replaceChild(clone, filterExpand);
                    } else {
                        button.appendChild(clone);
                    }
                }

                this.$element.trigger('rendered' + EVENT_KEY);
            },

            /**
             * @param [style]
             * @param [status]
             */
            setStyle: function (newStyle, status) {
                var button = this.$button[0],
                    newElement = this.$newElement[0],
                    style = this.options.style.trim(),
                    buttonClass;

                if (this.$element.attr('class')) {
                    this.$newElement.addClass(this.$element.attr('class').replace(/selectpicker|mobile-device|bs-select-hidden|validate\[.*\]/gi, ''));
                }

                if (version.major < 4) {
                    newElement.classList.add('bs3');

                    if (newElement.parentNode.classList.contains('input-group') &&
                        (newElement.previousElementSibling || newElement.nextElementSibling) &&
                        (newElement.previousElementSibling || newElement.nextElementSibling).classList.contains('input-group-addon')
                    ) {
                        newElement.classList.add('bs3-has-addon');
                    }
                }

                if (newStyle) {
                    buttonClass = newStyle.trim();
                } else {
                    buttonClass = style;
                }

                if (status == 'add') {
                    if (buttonClass) button.classList.add.apply(button.classList, buttonClass.split(' '));
                } else if (status == 'remove') {
                    if (buttonClass) button.classList.remove.apply(button.classList, buttonClass.split(' '));
                } else {
                    if (style) button.classList.remove.apply(button.classList, style.split(' '));
                    if (buttonClass) button.classList.add.apply(button.classList, buttonClass.split(' '));
                }
            },

            liHeight: function (refresh) {
                if (!refresh && (this.options.size === false || this.sizeInfo)) return;

                if (!this.sizeInfo) this.sizeInfo = {};

                var newElement = document.createElement('div'),
                    menu = document.createElement('div'),
                    menuInner = document.createElement('div'),
                    menuInnerInner = document.createElement('ul'),
                    divider = document.createElement('li'),
                    dropdownHeader = document.createElement('li'),
                    li = document.createElement('li'),
                    a = document.createElement('a'),
                    text = document.createElement('span'),
                    header = this.options.header && this.$menu.find('.' + classNames.POPOVERHEADER).length > 0 ? this.$menu.find('.' + classNames.POPOVERHEADER)[0].cloneNode(true) : null,
                    search = this.options.liveSearch ? document.createElement('div') : null,
                    actions = this.options.actionsBox && this.multiple && this.$menu.find('.bs-actionsbox').length > 0 ? this.$menu.find('.bs-actionsbox')[0].cloneNode(true) : null,
                    doneButton = this.options.doneButton && this.multiple && this.$menu.find('.bs-donebutton').length > 0 ? this.$menu.find('.bs-donebutton')[0].cloneNode(true) : null,
                    firstOption = this.$element.find('option')[0];

                this.sizeInfo.selectWidth = this.$newElement[0].offsetWidth;

                text.className = 'text';
                a.className = 'dropdown-item ' + (firstOption ? firstOption.className : '');
                newElement.className = this.$menu[0].parentNode.className + ' ' + classNames.SHOW;
                newElement.style.width = this.sizeInfo.selectWidth + 'px';
                if (this.options.width === 'auto') menu.style.minWidth = 0;
                menu.className = classNames.MENU + ' ' + classNames.SHOW;
                menuInner.className = 'inner ' + classNames.SHOW;
                menuInnerInner.className = classNames.MENU + ' inner ' + (version.major === '4' ? classNames.SHOW : '');
                divider.className = classNames.DIVIDER;
                dropdownHeader.className = 'dropdown-header';

                text.appendChild(document.createTextNode('\u200b'));
                a.appendChild(text);
                li.appendChild(a);
                dropdownHeader.appendChild(text.cloneNode(true));

                if (this.selectpicker.view.widestOption) {
                    menuInnerInner.appendChild(this.selectpicker.view.widestOption.cloneNode(true));
                }

                menuInnerInner.appendChild(li);
                menuInnerInner.appendChild(divider);
                menuInnerInner.appendChild(dropdownHeader);
                if (header) menu.appendChild(header);
                if (search) {
                    var input = document.createElement('input');
                    search.className = 'bs-searchbox';
                    input.className = 'form-control';
                    search.appendChild(input);
                    menu.appendChild(search);
                }
                if (actions) menu.appendChild(actions);
                menuInner.appendChild(menuInnerInner);
                menu.appendChild(menuInner);
                if (doneButton) menu.appendChild(doneButton);
                newElement.appendChild(menu);

                document.body.appendChild(newElement);

                var liHeight = li.offsetHeight,
                    dropdownHeaderHeight = dropdownHeader ? dropdownHeader.offsetHeight : 0,
                    headerHeight = header ? header.offsetHeight : 0,
                    searchHeight = search ? search.offsetHeight : 0,
                    actionsHeight = actions ? actions.offsetHeight : 0,
                    doneButtonHeight = doneButton ? doneButton.offsetHeight : 0,
                    dividerHeight = $(divider).outerHeight(true),
                    // fall back to jQuery if getComputedStyle is not supported
                    menuStyle = window.getComputedStyle ? window.getComputedStyle(menu) : false,
                    menuWidth = menu.offsetWidth,
                    $menu = menuStyle ? null : $(menu),
                    menuPadding = {
                        vert: toInteger(menuStyle ? menuStyle.paddingTop : $menu.css('paddingTop')) +
                            toInteger(menuStyle ? menuStyle.paddingBottom : $menu.css('paddingBottom')) +
                            toInteger(menuStyle ? menuStyle.borderTopWidth : $menu.css('borderTopWidth')) +
                            toInteger(menuStyle ? menuStyle.borderBottomWidth : $menu.css('borderBottomWidth')),
                        horiz: toInteger(menuStyle ? menuStyle.paddingLeft : $menu.css('paddingLeft')) +
                            toInteger(menuStyle ? menuStyle.paddingRight : $menu.css('paddingRight')) +
                            toInteger(menuStyle ? menuStyle.borderLeftWidth : $menu.css('borderLeftWidth')) +
                            toInteger(menuStyle ? menuStyle.borderRightWidth : $menu.css('borderRightWidth'))
                    },
                    menuExtras = {
                        vert: menuPadding.vert +
                            toInteger(menuStyle ? menuStyle.marginTop : $menu.css('marginTop')) +
                            toInteger(menuStyle ? menuStyle.marginBottom : $menu.css('marginBottom')) + 2,
                        horiz: menuPadding.horiz +
                            toInteger(menuStyle ? menuStyle.marginLeft : $menu.css('marginLeft')) +
                            toInteger(menuStyle ? menuStyle.marginRight : $menu.css('marginRight')) + 2
                    },
                    scrollBarWidth;

                menuInner.style.overflowY = 'scroll';

                scrollBarWidth = menu.offsetWidth - menuWidth;

                document.body.removeChild(newElement);

                this.sizeInfo.liHeight = liHeight;
                this.sizeInfo.dropdownHeaderHeight = dropdownHeaderHeight;
                this.sizeInfo.headerHeight = headerHeight;
                this.sizeInfo.searchHeight = searchHeight;
                this.sizeInfo.actionsHeight = actionsHeight;
                this.sizeInfo.doneButtonHeight = doneButtonHeight;
                this.sizeInfo.dividerHeight = dividerHeight;
                this.sizeInfo.menuPadding = menuPadding;
                this.sizeInfo.menuExtras = menuExtras;
                this.sizeInfo.menuWidth = menuWidth;
                this.sizeInfo.totalMenuWidth = this.sizeInfo.menuWidth;
                this.sizeInfo.scrollBarWidth = scrollBarWidth;
                this.sizeInfo.selectHeight = this.$newElement[0].offsetHeight;

                this.setPositionData();
            },

            getSelectPosition: function () {
                var that = this,
                    $window = $(window),
                    pos = that.$newElement.offset(),
                    $container = $(that.options.container),
                    containerPos;

                if (that.options.container && $container.length && !$container.is('body')) {
                    containerPos = $container.offset();
                    containerPos.top += parseInt($container.css('borderTopWidth'));
                    containerPos.left += parseInt($container.css('borderLeftWidth'));
                } else {
                    containerPos = { top: 0, left: 0 };
                }

                var winPad = that.options.windowPadding;

                this.sizeInfo.selectOffsetTop = pos.top - containerPos.top - $window.scrollTop();
                this.sizeInfo.selectOffsetBot = $window.height() - this.sizeInfo.selectOffsetTop - this.sizeInfo.selectHeight - containerPos.top - winPad[2];
                this.sizeInfo.selectOffsetLeft = pos.left - containerPos.left - $window.scrollLeft();
                this.sizeInfo.selectOffsetRight = $window.width() - this.sizeInfo.selectOffsetLeft - this.sizeInfo.selectWidth - containerPos.left - winPad[1];
                this.sizeInfo.selectOffsetTop -= winPad[0];
                this.sizeInfo.selectOffsetLeft -= winPad[3];
            },

            setMenuSize: function (isAuto) {
                this.getSelectPosition();

                var selectWidth = this.sizeInfo.selectWidth,
                    liHeight = this.sizeInfo.liHeight,
                    headerHeight = this.sizeInfo.headerHeight,
                    searchHeight = this.sizeInfo.searchHeight,
                    actionsHeight = this.sizeInfo.actionsHeight,
                    doneButtonHeight = this.sizeInfo.doneButtonHeight,
                    divHeight = this.sizeInfo.dividerHeight,
                    menuPadding = this.sizeInfo.menuPadding,
                    menuInnerHeight,
                    menuHeight,
                    divLength = 0,
                    minHeight,
                    _minHeight,
                    maxHeight,
                    menuInnerMinHeight,
                    estimate;

                if (this.options.dropupAuto) {
                    // Get the estimated height of the menu without scrollbars.
                    // This is useful for smaller menus, where there might be plenty of room
                    // below the button without setting dropup, but we can't know
                    // the exact height of the menu until createView is called later
                    estimate = liHeight * this.selectpicker.current.elements.length + menuPadding.vert;
                    this.$newElement.toggleClass(classNames.DROPUP, this.sizeInfo.selectOffsetTop - this.sizeInfo.selectOffsetBot > this.sizeInfo.menuExtras.vert && estimate + this.sizeInfo.menuExtras.vert + 50 > this.sizeInfo.selectOffsetBot);
                }

                if (this.options.size === 'auto') {
                    _minHeight = this.selectpicker.current.elements.length > 3 ? this.sizeInfo.liHeight * 3 + this.sizeInfo.menuExtras.vert - 2 : 0;
                    menuHeight = this.sizeInfo.selectOffsetBot - this.sizeInfo.menuExtras.vert;
                    minHeight = _minHeight + headerHeight + searchHeight + actionsHeight + doneButtonHeight;
                    menuInnerMinHeight = Math.max(_minHeight - menuPadding.vert, 0);

                    if (this.$newElement.hasClass(classNames.DROPUP)) {
                        menuHeight = this.sizeInfo.selectOffsetTop - this.sizeInfo.menuExtras.vert;
                    }

                    maxHeight = menuHeight;
                    menuInnerHeight = menuHeight - headerHeight - searchHeight - actionsHeight - doneButtonHeight - menuPadding.vert;
                } else if (this.options.size && this.options.size != 'auto' && this.selectpicker.current.elements.length > this.options.size) {
                    for (var i = 0; i < this.options.size; i++) {
                        if (this.selectpicker.current.data[i].type === 'divider') divLength++;
                    }

                    menuHeight = liHeight * this.options.size + divLength * divHeight + menuPadding.vert;
                    menuInnerHeight = menuHeight - menuPadding.vert;
                    maxHeight = menuHeight + headerHeight + searchHeight + actionsHeight + doneButtonHeight;
                    minHeight = menuInnerMinHeight = '';
                }

                if (this.options.dropdownAlignRight === 'auto') {
                    this.$menu.toggleClass(classNames.MENURIGHT, this.sizeInfo.selectOffsetLeft > this.sizeInfo.selectOffsetRight && this.sizeInfo.selectOffsetRight < (this.sizeInfo.totalMenuWidth - selectWidth));
                }

                this.$menu.css({
                    'max-height': maxHeight + 'px',
                    'overflow': 'hidden',
                    'min-height': minHeight + 'px'
                });

                this.$menuInner.css({
                    'max-height': menuInnerHeight + 'px',
                    'overflow-y': 'auto',
                    'min-height': menuInnerMinHeight + 'px'
                });

                // ensure menuInnerHeight is always a positive number to prevent issues calculating chunkSize in createView
                this.sizeInfo.menuInnerHeight = Math.max(menuInnerHeight, 1);

                if (this.selectpicker.current.data.length && this.selectpicker.current.data[this.selectpicker.current.data.length - 1].position > this.sizeInfo.menuInnerHeight) {
                    this.sizeInfo.hasScrollBar = true;
                    this.sizeInfo.totalMenuWidth = this.sizeInfo.menuWidth + this.sizeInfo.scrollBarWidth;

                    this.$menu.css('min-width', this.sizeInfo.totalMenuWidth);
                }

                if (this.dropdown && this.dropdown._popper) this.dropdown._popper.update();
            },

            setSize: function (refresh) {
                this.liHeight(refresh);

                if (this.options.header) this.$menu.css('padding-top', 0);
                if (this.options.size === false) return;

                var that = this,
                    $window = $(window);

                this.setMenuSize();

                if (this.options.liveSearch) {
                    this.$searchbox
                        .off('input.setMenuSize propertychange.setMenuSize')
                        .on('input.setMenuSize propertychange.setMenuSize', function () {
                            return that.setMenuSize();
                        });
                }

                if (this.options.size === 'auto') {
                    $window
                        .off('resize' + EVENT_KEY + '.' + this.selectId + '.setMenuSize' + ' scroll' + EVENT_KEY + '.' + this.selectId + '.setMenuSize')
                        .on('resize' + EVENT_KEY + '.' + this.selectId + '.setMenuSize' + ' scroll' + EVENT_KEY + '.' + this.selectId + '.setMenuSize', function () {
                            return that.setMenuSize();
                        });
                } else if (this.options.size && this.options.size != 'auto' && this.selectpicker.current.elements.length > this.options.size) {
                    $window.off('resize' + EVENT_KEY + '.' + this.selectId + '.setMenuSize' + ' scroll' + EVENT_KEY + '.' + this.selectId + '.setMenuSize');
                }

                that.createView(false, true, refresh);
            },

            setWidth: function () {
                var that = this;

                if (this.options.width === 'auto') {
                    requestAnimationFrame(function () {
                        that.$menu.css('min-width', '0');

                        that.$element.on('loaded' + EVENT_KEY, function () {
                            that.liHeight();
                            that.setMenuSize();

                            // Get correct width if element is hidden
                            var $selectClone = that.$newElement.clone().appendTo('body'),
                                btnWidth = $selectClone.css('width', 'auto').children('button').outerWidth();

                            $selectClone.remove();

                            // Set width to whatever's larger, button title or longest option
                            that.sizeInfo.selectWidth = Math.max(that.sizeInfo.totalMenuWidth, btnWidth);
                            that.$newElement.css('width', that.sizeInfo.selectWidth + 'px');
                        });
                    });
                } else if (this.options.width === 'fit') {
                    // Remove inline min-width so width can be changed from 'auto'
                    this.$menu.css('min-width', '');
                    this.$newElement.css('width', '').addClass('fit-width');
                } else if (this.options.width) {
                    // Remove inline min-width so width can be changed from 'auto'
                    this.$menu.css('min-width', '');
                    this.$newElement.css('width', this.options.width);
                } else {
                    // Remove inline min-width/width so width can be changed
                    this.$menu.css('min-width', '');
                    this.$newElement.css('width', '');
                }
                // Remove fit-width class if width is changed programmatically
                if (this.$newElement.hasClass('fit-width') && this.options.width !== 'fit') {
                    this.$newElement[0].classList.remove('fit-width');
                }
            },

            selectPosition: function () {
                this.$bsContainer = $('<div class="bs-container" />');

                var that = this,
                    $container = $(this.options.container),
                    pos,
                    containerPos,
                    actualHeight,
                    getPlacement = function ($element) {
                        var containerPosition = {},
                            // fall back to dropdown's default display setting if display is not manually set
                            display = that.options.display || (
                                // Bootstrap 3 doesn't have $.fn.dropdown.Constructor.Default
                                $.fn.dropdown.Constructor.Default ? $.fn.dropdown.Constructor.Default.display
                                    : false
                            );

                        that.$bsContainer.addClass($element.attr('class').replace(/form-control|fit-width/gi, '')).toggleClass(classNames.DROPUP, $element.hasClass(classNames.DROPUP));
                        pos = $element.offset();

                        if (!$container.is('body')) {
                            containerPos = $container.offset();
                            containerPos.top += parseInt($container.css('borderTopWidth')) - $container.scrollTop();
                            containerPos.left += parseInt($container.css('borderLeftWidth')) - $container.scrollLeft();
                        } else {
                            containerPos = { top: 0, left: 0 };
                        }

                        actualHeight = $element.hasClass(classNames.DROPUP) ? 0 : $element[0].offsetHeight;

                        // Bootstrap 4+ uses Popper for menu positioning
                        if (version.major < 4 || display === 'static') {
                            containerPosition.top = pos.top - containerPos.top + actualHeight;
                            containerPosition.left = pos.left - containerPos.left;
                        }

                        containerPosition.width = $element[0].offsetWidth;

                        that.$bsContainer.css(containerPosition);
                    };

                this.$button.on('click.bs.dropdown.data-api', function () {
                    if (that.isDisabled()) {
                        return;
                    }

                    getPlacement(that.$newElement);

                    that.$bsContainer
                        .appendTo(that.options.container)
                        .toggleClass(classNames.SHOW, !that.$button.hasClass(classNames.SHOW))
                        .append(that.$menu);
                });

                $(window)
                    .off('resize' + EVENT_KEY + '.' + this.selectId + ' scroll' + EVENT_KEY + '.' + this.selectId)
                    .on('resize' + EVENT_KEY + '.' + this.selectId + ' scroll' + EVENT_KEY + '.' + this.selectId, function () {
                        var isActive = that.$newElement.hasClass(classNames.SHOW);

                        if (isActive) getPlacement(that.$newElement);
                    });

                this.$element.on('hide' + EVENT_KEY, function () {
                    that.$menu.data('height', that.$menu.height());
                    that.$bsContainer.detach();
                });
            },

            setOptionStatus: function (selectedOnly) {
                var that = this;

                that.noScroll = false;

                if (that.selectpicker.view.visibleElements && that.selectpicker.view.visibleElements.length) {
                    for (var i = 0; i < that.selectpicker.view.visibleElements.length; i++) {
                        var liData = that.selectpicker.current.data[i + that.selectpicker.view.position0],
                            option = liData.option;

                        if (option) {
                            if (selectedOnly !== true) {
                                that.setDisabled(
                                    liData.index,
                                    liData.disabled
                                );
                            }

                            that.setSelected(
                                liData.index,
                                option.selected
                            );
                        }
                    }
                }
            },

            /**
             * @param {number} index - the index of the option that is being changed
             * @param {boolean} selected - true if the option is being selected, false if being deselected
             */
            setSelected: function (index, selected) {
                var li = this.selectpicker.main.elements[index],
                    liData = this.selectpicker.main.data[index],
                    activeIndexIsSet = this.activeIndex !== undefined,
                    thisIsActive = this.activeIndex === index,
                    prevActive,
                    a,
                    // if current option is already active
                    // OR
                    // if the current option is being selected, it's NOT multiple, and
                    // activeIndex is undefined:
                    //  - when the menu is first being opened, OR
                    //  - after a search has been performed, OR
                    //  - when retainActive is false when selecting a new option (i.e. index of the newly selected option is not the same as the current activeIndex)
                    keepActive = thisIsActive || (selected && !this.multiple && !activeIndexIsSet);

                liData.selected = selected;

                a = li.firstChild;

                if (selected) {
                    this.selectedIndex = index;
                }

                li.classList.toggle('selected', selected);

                if (keepActive) {
                    this.focusItem(li, liData);
                    this.selectpicker.view.currentActive = li;
                    this.activeIndex = index;
                } else {
                    this.defocusItem(li);
                }

                if (a) {
                    a.classList.toggle('selected', selected);

                    if (selected) {
                        a.setAttribute('aria-selected', true);
                    } else {
                        if (this.multiple) {
                            a.setAttribute('aria-selected', false);
                        } else {
                            a.removeAttribute('aria-selected');
                        }
                    }
                }

                if (!keepActive && !activeIndexIsSet && selected && this.prevActiveIndex !== undefined) {
                    prevActive = this.selectpicker.main.elements[this.prevActiveIndex];

                    this.defocusItem(prevActive);
                }
            },

            /**
             * @param {number} index - the index of the option that is being disabled
             * @param {boolean} disabled - true if the option is being disabled, false if being enabled
             */
            setDisabled: function (index, disabled) {
                var li = this.selectpicker.main.elements[index],
                    a;

                this.selectpicker.main.data[index].disabled = disabled;

                a = li.firstChild;

                li.classList.toggle(classNames.DISABLED, disabled);

                if (a) {
                    if (version.major === '4') a.classList.toggle(classNames.DISABLED, disabled);

                    if (disabled) {
                        a.setAttribute('aria-disabled', disabled);
                        a.setAttribute('tabindex', -1);
                    } else {
                        a.removeAttribute('aria-disabled');
                        a.setAttribute('tabindex', 0);
                    }
                }
            },

            isDisabled: function () {
                return this.$element[0].disabled;
            },

            checkDisabled: function () {
                var that = this;

                if (this.isDisabled()) {
                    this.$newElement[0].classList.add(classNames.DISABLED);
                    this.$button.addClass(classNames.DISABLED).attr('tabindex', -1).attr('aria-disabled', true);
                } else {
                    if (this.$button[0].classList.contains(classNames.DISABLED)) {
                        this.$newElement[0].classList.remove(classNames.DISABLED);
                        this.$button.removeClass(classNames.DISABLED).attr('aria-disabled', false);
                    }

                    if (this.$button.attr('tabindex') == -1 && !this.$element.data('tabindex')) {
                        this.$button.removeAttr('tabindex');
                    }
                }

                this.$button.on('click', function () {
                    return !that.isDisabled();
                });
            },

            tabIndex: function () {
                if (this.$element.data('tabindex') !== this.$element.attr('tabindex') &&
                    (this.$element.attr('tabindex') !== -98 && this.$element.attr('tabindex') !== '-98')) {
                    this.$element.data('tabindex', this.$element.attr('tabindex'));
                    this.$button.attr('tabindex', this.$element.data('tabindex'));
                }

                this.$element.attr('tabindex', -98);
            },

            clickListener: function () {
                var that = this,
                    $document = $(document);

                $document.data('spaceSelect', false);

                this.$button.on('keyup', function (e) {
                    if (/(32)/.test(e.keyCode.toString(10)) && $document.data('spaceSelect')) {
                        e.preventDefault();
                        $document.data('spaceSelect', false);
                    }
                });

                this.$newElement.on('show.bs.dropdown', function () {
                    if (version.major > 3 && !that.dropdown) {
                        that.dropdown = that.$button.data('bs.dropdown');
                        that.dropdown._menu = that.$menu[0];
                    }
                });

                this.$button.on('click.bs.dropdown.data-api', function () {
                    if (!that.$newElement.hasClass(classNames.SHOW)) {
                        that.setSize();
                    }
                });

                function setFocus () {
                    if (that.options.liveSearch) {
                        that.$searchbox.trigger('focus');
                    } else {
                        that.$menuInner.trigger('focus');
                    }
                }

                function checkPopperExists () {
                    if (that.dropdown && that.dropdown._popper && that.dropdown._popper.state.isCreated) {
                        setFocus();
                    } else {
                        requestAnimationFrame(checkPopperExists);
                    }
                }

                this.$element.on('shown' + EVENT_KEY, function () {
                    if (that.$menuInner[0].scrollTop !== that.selectpicker.view.scrollTop) {
                        that.$menuInner[0].scrollTop = that.selectpicker.view.scrollTop;
                    }

                    if (version.major > 3) {
                        requestAnimationFrame(checkPopperExists);
                    } else {
                        setFocus();
                    }
                });

                // ensure posinset and setsize are correct before selecting an option via a click
                this.$menuInner.on('mouseenter', 'li a', function (e) {
                    var hoverLi = this.parentElement,
                        position0 = that.isVirtual() ? that.selectpicker.view.position0 : 0,
                        index = Array.prototype.indexOf.call(hoverLi.parentElement.children, hoverLi),
                        hoverData = that.selectpicker.current.data[index + position0];

                    that.focusItem(hoverLi, hoverData, true);
                });

                this.$menuInner.on('click', 'li a', function (e, retainActive) {
                    var $this = $(this),
                        element = that.$element[0],
                        position0 = that.isVirtual() ? that.selectpicker.view.position0 : 0,
                        clickedData = that.selectpicker.current.data[$this.parent().index() + position0],
                        clickedIndex = clickedData.index,
                        prevValue = getSelectValues(element),
                        prevIndex = element.selectedIndex,
                        prevOption = element.options[prevIndex],
                        triggerChange = true;

                    // Don't close on multi choice menu
                    if (that.multiple && that.options.maxOptions !== 1) {
                        e.stopPropagation();
                    }

                    e.preventDefault();

                    // Don't run if the select is disabled
                    if (!that.isDisabled() && !$this.parent().hasClass(classNames.DISABLED)) {
                        var $options = that.$element.find('option'),
                            option = clickedData.option,
                            $option = $(option),
                            state = option.selected,
                            $optgroup = $option.parent('optgroup'),
                            $optgroupOptions = $optgroup.find('option'),
                            maxOptions = that.options.maxOptions,
                            maxOptionsGrp = $optgroup.data('maxOptions') || false;

                        if (clickedIndex === that.activeIndex) retainActive = true;

                        if (!retainActive) {
                            that.prevActiveIndex = that.activeIndex;
                            that.activeIndex = undefined;
                        }

                        if (!that.multiple) { // Deselect all others if not multi select box
                            prevOption.selected = false;
                            option.selected = true;
                            that.setSelected(clickedIndex, true);
                        } else { // Toggle the one we have chosen if we are multi select.
                            option.selected = !state;

                            that.setSelected(clickedIndex, !state);
                            $this.trigger('blur');

                            if (maxOptions !== false || maxOptionsGrp !== false) {
                                var maxReached = maxOptions < $options.filter(':selected').length,
                                    maxReachedGrp = maxOptionsGrp < $optgroup.find('option:selected').length;

                                if ((maxOptions && maxReached) || (maxOptionsGrp && maxReachedGrp)) {
                                    if (maxOptions && maxOptions == 1) {
                                        $options.prop('selected', false);
                                        $option.prop('selected', true);

                                        for (var i = 0; i < $options.length; i++) {
                                            that.setSelected(i, false);
                                        }

                                        that.setSelected(clickedIndex, true);
                                    } else if (maxOptionsGrp && maxOptionsGrp == 1) {
                                        $optgroup.find('option:selected').prop('selected', false);
                                        $option.prop('selected', true);

                                        for (var i = 0; i < $optgroupOptions.length; i++) {
                                            var option = $optgroupOptions[i];
                                            that.setSelected($options.index(option), false);
                                        }

                                        that.setSelected(clickedIndex, true);
                                    } else {
                                        var maxOptionsText = typeof that.options.maxOptionsText === 'string' ? [that.options.maxOptionsText, that.options.maxOptionsText] : that.options.maxOptionsText,
                                            maxOptionsArr = typeof maxOptionsText === 'function' ? maxOptionsText(maxOptions, maxOptionsGrp) : maxOptionsText,
                                            maxTxt = maxOptionsArr[0].replace('{n}', maxOptions),
                                            maxTxtGrp = maxOptionsArr[1].replace('{n}', maxOptionsGrp),
                                            $notify = $('<div class="notify"></div>');
                                        // If {var} is set in array, replace it
                                        /** @deprecated */
                                        if (maxOptionsArr[2]) {
                                            maxTxt = maxTxt.replace('{var}', maxOptionsArr[2][maxOptions > 1 ? 0 : 1]);
                                            maxTxtGrp = maxTxtGrp.replace('{var}', maxOptionsArr[2][maxOptionsGrp > 1 ? 0 : 1]);
                                        }

                                        $option.prop('selected', false);

                                        that.$menu.append($notify);

                                        if (maxOptions && maxReached) {
                                            $notify.append($('<div>' + maxTxt + '</div>'));
                                            triggerChange = false;
                                            that.$element.trigger('maxReached' + EVENT_KEY);
                                        }

                                        if (maxOptionsGrp && maxReachedGrp) {
                                            $notify.append($('<div>' + maxTxtGrp + '</div>'));
                                            triggerChange = false;
                                            that.$element.trigger('maxReachedGrp' + EVENT_KEY);
                                        }

                                        setTimeout(function () {
                                            that.setSelected(clickedIndex, false);
                                        }, 10);

                                        $notify.delay(750).fadeOut(300, function () {
                                            $(this).remove();
                                        });
                                    }
                                }
                            }
                        }

                        if (!that.multiple || (that.multiple && that.options.maxOptions === 1)) {
                            that.$button.trigger('focus');
                        } else if (that.options.liveSearch) {
                            that.$searchbox.trigger('focus');
                        }

                        // Trigger select 'change'
                        if (triggerChange) {
                            if (that.multiple || prevIndex !== element.selectedIndex) {
                                // $option.prop('selected') is current option state (selected/unselected). prevValue is the value of the select prior to being changed.
                                changedArguments = [option.index, $option.prop('selected'), prevValue];
                                that.$element
                                    .triggerNative('change');
                            }
                        }
                    }
                });

                this.$menu.on('click', 'li.' + classNames.DISABLED + ' a, .' + classNames.POPOVERHEADER + ', .' + classNames.POPOVERHEADER + ' :not(.close)', function (e) {
                    if (e.currentTarget == this) {
                        e.preventDefault();
                        e.stopPropagation();
                        if (that.options.liveSearch && !$(e.target).hasClass('close')) {
                            that.$searchbox.trigger('focus');
                        } else {
                            that.$button.trigger('focus');
                        }
                    }
                });

                this.$menuInner.on('click', '.divider, .dropdown-header', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (that.options.liveSearch) {
                        that.$searchbox.trigger('focus');
                    } else {
                        that.$button.trigger('focus');
                    }
                });

                this.$menu.on('click', '.' + classNames.POPOVERHEADER + ' .close', function () {
                    that.$button.trigger('click');
                });

                this.$searchbox.on('click', function (e) {
                    e.stopPropagation();
                });

                this.$menu.on('click', '.actions-btn', function (e) {
                    if (that.options.liveSearch) {
                        that.$searchbox.trigger('focus');
                    } else {
                        that.$button.trigger('focus');
                    }

                    e.preventDefault();
                    e.stopPropagation();

                    if ($(this).hasClass('bs-select-all')) {
                        that.selectAll();
                    } else {
                        that.deselectAll();
                    }
                });

                this.$element
                    .on('change' + EVENT_KEY, function () {
                        that.render();
                        that.$element.trigger('changed' + EVENT_KEY, changedArguments);
                        changedArguments = null;
                    })
                    .on('focus' + EVENT_KEY, function () {
                        if (!that.options.mobile) that.$button.trigger('focus');
                    });
            },

            liveSearchListener: function () {
                var that = this,
                    noResults = document.createElement('li');

                this.$button.on('click.bs.dropdown.data-api', function () {
                    if (!!that.$searchbox.val()) {
                        that.$searchbox.val('');
                    }
                });

                this.$searchbox.on('click.bs.dropdown.data-api focus.bs.dropdown.data-api touchend.bs.dropdown.data-api', function (e) {
                    e.stopPropagation();
                });

                this.$searchbox.on('input propertychange', function () {
                    var searchValue = that.$searchbox.val();

                    that.selectpicker.search.elements = [];
                    that.selectpicker.search.data = [];

                    if (searchValue) {
                        var i,
                            searchMatch = [],
                            q = searchValue.toUpperCase(),
                            cache = {},
                            cacheArr = [],
                            searchStyle = that._searchStyle(),
                            normalizeSearch = that.options.liveSearchNormalize;

                        if (normalizeSearch) q = normalizeToBase(q);

                        that._$lisSelected = that.$menuInner.find('.selected');

                        for (var i = 0; i < that.selectpicker.main.data.length; i++) {
                            var li = that.selectpicker.main.data[i];

                            if (!cache[i]) {
                                cache[i] = stringSearch(li, q, searchStyle, normalizeSearch);
                            }

                            if (cache[i] && li.headerIndex !== undefined && cacheArr.indexOf(li.headerIndex) === -1) {
                                if (li.headerIndex > 0) {
                                    cache[li.headerIndex - 1] = true;
                                    cacheArr.push(li.headerIndex - 1);
                                }

                                cache[li.headerIndex] = true;
                                cacheArr.push(li.headerIndex);

                                cache[li.lastIndex + 1] = true;
                            }

                            if (cache[i] && li.type !== 'optgroup-label') cacheArr.push(i);
                        }

                        for (var i = 0, cacheLen = cacheArr.length; i < cacheLen; i++) {
                            var index = cacheArr[i],
                                prevIndex = cacheArr[i - 1],
                                li = that.selectpicker.main.data[index],
                                liPrev = that.selectpicker.main.data[prevIndex];

                            if (li.type !== 'divider' || (li.type === 'divider' && liPrev && liPrev.type !== 'divider' && cacheLen - 1 !== i)) {
                                that.selectpicker.search.data.push(li);
                                searchMatch.push(that.selectpicker.main.elements[index]);
                            }
                        }

                        that.activeIndex = undefined;
                        that.noScroll = true;
                        that.$menuInner.scrollTop(0);
                        that.selectpicker.search.elements = searchMatch;
                        that.createView(true);

                        if (!searchMatch.length) {
                            noResults.className = 'no-results';
                            noResults.innerHTML = that.options.noneResultsText.replace('{0}', '"' + htmlEscape(searchValue) + '"');
                            that.$menuInner[0].firstChild.appendChild(noResults);
                        }
                    } else {
                        that.$menuInner.scrollTop(0);
                        that.createView(false);
                    }
                });
            },

            _searchStyle: function () {
                return this.options.liveSearchStyle || 'contains';
            },

            val: function (value) {
                var element = this.$element[0];

                if (typeof value !== 'undefined') {
                    var prevValue = getSelectValues(element);

                    changedArguments = [null, null, prevValue];

                    this.$element
                        .val(value)
                        .trigger('changed' + EVENT_KEY, changedArguments);

                    if (this.$newElement.hasClass(classNames.SHOW)) {
                        if (this.multiple) {
                            this.setOptionStatus(true);
                        } else {
                            var liSelectedIndex = (element.options[element.selectedIndex] || {}).liIndex;

                            if (typeof liSelectedIndex === 'number') {
                                this.setSelected(this.selectedIndex, false);
                                this.setSelected(liSelectedIndex, true);
                            }
                        }
                    }

                    this.render();

                    changedArguments = null;

                    return this.$element;
                } else {
                    return this.$element.val();
                }
            },

            changeAll: function (status) {
                if (!this.multiple) return;
                if (typeof status === 'undefined') status = true;

                var element = this.$element[0],
                    previousSelected = 0,
                    currentSelected = 0,
                    prevValue = getSelectValues(element);

                element.classList.add('bs-select-hidden');

                for (var i = 0, len = this.selectpicker.current.elements.length; i < len; i++) {
                    var liData = this.selectpicker.current.data[i],
                        option = liData.option;

                    if (option && !liData.disabled && liData.type !== 'divider') {
                        if (liData.selected) previousSelected++;
                        option.selected = status;
                        if (status) currentSelected++;
                    }
                }

                element.classList.remove('bs-select-hidden');

                if (previousSelected === currentSelected) return;

                this.setOptionStatus();

                changedArguments = [null, null, prevValue];

                this.$element
                    .triggerNative('change');
            },

            selectAll: function () {
                return this.changeAll(true);
            },

            deselectAll: function () {
                return this.changeAll(false);
            },

            toggle: function (e) {
                e = e || window.event;

                if (e) e.stopPropagation();

                this.$button.trigger('click.bs.dropdown.data-api');
            },

            keydown: function (e) {
                var $this = $(this),
                    isToggle = $this.hasClass('dropdown-toggle'),
                    $parent = isToggle ? $this.closest('.dropdown') : $this.closest(Selector.MENU),
                    that = $parent.data('this'),
                    $items = that.findLis(),
                    index,
                    isActive,
                    liActive,
                    activeLi,
                    offset,
                    updateScroll = false,
                    downOnTab = e.which === keyCodes.TAB && !isToggle && !that.options.selectOnTab,
                    isArrowKey = REGEXP_ARROW.test(e.which) || downOnTab,
                    scrollTop = that.$menuInner[0].scrollTop,
                    isVirtual = that.isVirtual(),
                    position0 = isVirtual === true ? that.selectpicker.view.position0 : 0;

                isActive = that.$newElement.hasClass(classNames.SHOW);

                if (
                    !isActive &&
                    (
                        isArrowKey ||
                        (e.which >= 48 && e.which <= 57) ||
                        (e.which >= 96 && e.which <= 105) ||
                        (e.which >= 65 && e.which <= 90)
                    )
                ) {
                    that.$button.trigger('click.bs.dropdown.data-api');

                    if (that.options.liveSearch) {
                        that.$searchbox.trigger('focus');
                        return;
                    }
                }

                if (e.which === keyCodes.ESCAPE && isActive) {
                    e.preventDefault();
                    that.$button.trigger('click.bs.dropdown.data-api').trigger('focus');
                }

                if (isArrowKey) { // if up or down
                    if (!$items.length) return;

                    liActive = that.selectpicker.main.elements[that.activeIndex];
                    index = liActive ? Array.prototype.indexOf.call(liActive.parentElement.children, liActive) : -1;

                    if (index !== -1) {
                        that.defocusItem(liActive);
                    }

                    if (e.which === keyCodes.ARROW_UP) { // up
                        if (index !== -1) index--;
                        if (index + position0 < 0) index += $items.length;

                        if (!that.selectpicker.view.canHighlight[index + position0]) {
                            index = that.selectpicker.view.canHighlight.slice(0, index + position0).lastIndexOf(true) - position0;
                            if (index === -1) index = $items.length - 1;
                        }
                    } else if (e.which === keyCodes.ARROW_DOWN || downOnTab) { // down
                        index++;
                        if (index + position0 >= that.selectpicker.view.canHighlight.length) index = 0;

                        if (!that.selectpicker.view.canHighlight[index + position0]) {
                            index = index + 1 + that.selectpicker.view.canHighlight.slice(index + position0 + 1).indexOf(true);
                        }
                    }

                    e.preventDefault();

                    var liActiveIndex = position0 + index;

                    if (e.which === keyCodes.ARROW_UP) { // up
                        // scroll to bottom and highlight last option
                        if (position0 === 0 && index === $items.length - 1) {
                            that.$menuInner[0].scrollTop = that.$menuInner[0].scrollHeight;

                            liActiveIndex = that.selectpicker.current.elements.length - 1;
                        } else {
                            activeLi = that.selectpicker.current.data[liActiveIndex];
                            offset = activeLi.position - activeLi.height;

                            updateScroll = offset < scrollTop;
                        }
                    } else if (e.which === keyCodes.ARROW_DOWN || downOnTab) { // down
                        // scroll to top and highlight first option
                        if (index === 0) {
                            that.$menuInner[0].scrollTop = 0;

                            liActiveIndex = 0;
                        } else {
                            activeLi = that.selectpicker.current.data[liActiveIndex];
                            offset = activeLi.position - that.sizeInfo.menuInnerHeight;

                            updateScroll = offset > scrollTop;
                        }
                    }

                    liActive = that.selectpicker.current.elements[liActiveIndex];

                    that.activeIndex = that.selectpicker.current.data[liActiveIndex].index;

                    that.focusItem(liActive);

                    that.selectpicker.view.currentActive = liActive;

                    if (updateScroll) that.$menuInner[0].scrollTop = offset;

                    if (that.options.liveSearch) {
                        that.$searchbox.trigger('focus');
                    } else {
                        $this.trigger('focus');
                    }
                } else if (
                    (!$this.is('input') && !REGEXP_TAB_OR_ESCAPE.test(e.which)) ||
                    (e.which === keyCodes.SPACE && that.selectpicker.keydown.keyHistory)
                ) {
                    var searchMatch,
                        matches = [],
                        keyHistory;

                    e.preventDefault();

                    that.selectpicker.keydown.keyHistory += keyCodeMap[e.which];

                    if (that.selectpicker.keydown.resetKeyHistory.cancel) clearTimeout(that.selectpicker.keydown.resetKeyHistory.cancel);
                    that.selectpicker.keydown.resetKeyHistory.cancel = that.selectpicker.keydown.resetKeyHistory.start();

                    keyHistory = that.selectpicker.keydown.keyHistory;

                    // if all letters are the same, set keyHistory to just the first character when searching
                    if (/^(.)\1+$/.test(keyHistory)) {
                        keyHistory = keyHistory.charAt(0);
                    }

                    // find matches
                    for (var i = 0; i < that.selectpicker.current.data.length; i++) {
                        var li = that.selectpicker.current.data[i],
                            hasMatch;

                        hasMatch = stringSearch(li, keyHistory, 'startsWith', true);

                        if (hasMatch && that.selectpicker.view.canHighlight[i]) {
                            matches.push(li.index);
                        }
                    }

                    if (matches.length) {
                        var matchIndex = 0;

                        $items.removeClass('active').find('a').removeClass('active');

                        // either only one key has been pressed or they are all the same key
                        if (keyHistory.length === 1) {
                            matchIndex = matches.indexOf(that.activeIndex);

                            if (matchIndex === -1 || matchIndex === matches.length - 1) {
                                matchIndex = 0;
                            } else {
                                matchIndex++;
                            }
                        }

                        searchMatch = matches[matchIndex];

                        activeLi = that.selectpicker.main.data[searchMatch];

                        if (scrollTop - activeLi.position > 0) {
                            offset = activeLi.position - activeLi.height;
                            updateScroll = true;
                        } else {
                            offset = activeLi.position - that.sizeInfo.menuInnerHeight;
                            // if the option is already visible at the current scroll position, just keep it the same
                            updateScroll = activeLi.position > scrollTop + that.sizeInfo.menuInnerHeight;
                        }

                        liActive = that.selectpicker.main.elements[searchMatch];

                        that.activeIndex = matches[matchIndex];

                        that.focusItem(liActive);

                        if (liActive) liActive.firstChild.focus();

                        if (updateScroll) that.$menuInner[0].scrollTop = offset;

                        $this.trigger('focus');
                    }
                }

                // Select focused option if "Enter", "Spacebar" or "Tab" (when selectOnTab is true) are pressed inside the menu.
                if (
                    isActive &&
                    (
                        (e.which === keyCodes.SPACE && !that.selectpicker.keydown.keyHistory) ||
                        e.which === keyCodes.ENTER ||
                        (e.which === keyCodes.TAB && that.options.selectOnTab)
                    )
                ) {
                    if (e.which !== keyCodes.SPACE) e.preventDefault();

                    if (!that.options.liveSearch || e.which !== keyCodes.SPACE) {
                        that.$menuInner.find('.active a').trigger('click', true); // retain active class
                        $this.trigger('focus');

                        if (!that.options.liveSearch) {
                            // Prevent screen from scrolling if the user hits the spacebar
                            e.preventDefault();
                            // Fixes spacebar selection of dropdown items in FF & IE
                            $(document).data('spaceSelect', true);
                        }
                    }
                }
            },

            mobile: function () {
                this.$element[0].classList.add('mobile-device');
            },

            refresh: function () {
                // update options if data attributes have been changed
                var config = $.extend({}, this.options, this.$element.data());
                this.options = config;

                this.checkDisabled();
                this.setStyle();
                this.render();
                this.createLi();
                this.setWidth();

                this.setSize(true);

                this.$element.trigger('refreshed' + EVENT_KEY);
            },

            hide: function () {
                this.$newElement.hide();
            },

            show: function () {
                this.$newElement.show();
            },

            remove: function () {
                this.$newElement.remove();
                this.$element.remove();
            },

            destroy: function () {
                this.$newElement.before(this.$element).remove();

                if (this.$bsContainer) {
                    this.$bsContainer.remove();
                } else {
                    this.$menu.remove();
                }

                this.$element
                    .off(EVENT_KEY)
                    .removeData('selectpicker')
                    .removeClass('bs-select-hidden selectpicker');

                $(window).off(EVENT_KEY + '.' + this.selectId);
            }
        };

        // SELECTPICKER PLUGIN DEFINITION
        // ==============================
        function Plugin (option) {
            // get the args of the outer function..
            var args = arguments;
            // The arguments of the function are explicitly re-defined from the argument list, because the shift causes them
            // to get lost/corrupted in android 2.3 and IE9 #715 #775
            var _option = option;

            [].shift.apply(args);

            // if the version was not set successfully
            if (!version.success) {
                // try to retreive it again
                try {
                    version.full = ($.fn.dropdown.Constructor.VERSION || '').split(' ')[0].split('.');
                } catch (err) {
                    // fall back to use BootstrapVersion if set
                    if (Selectpicker.BootstrapVersion) {
                        version.full = Selectpicker.BootstrapVersion.split(' ')[0].split('.');
                    } else {
                        version.full = [version.major, '0', '0'];

                        console.warn(
                            'There was an issue retrieving Bootstrap\'s version. ' +
                            'Ensure Bootstrap is being loaded before bootstrap-select and there is no namespace collision. ' +
                            'If loading Bootstrap asynchronously, the version may need to be manually specified via $.fn.selectpicker.Constructor.BootstrapVersion.',
                            err
                        );
                    }
                }

                version.major = version.full[0];
                version.success = true;
            }

            if (version.major === '4') {
                // some defaults need to be changed if using Bootstrap 4
                // check to see if they have already been manually changed before forcing them to update
                var toUpdate = [];

                if (Selectpicker.DEFAULTS.style === classNames.BUTTONCLASS) toUpdate.push({ name: 'style', className: 'BUTTONCLASS' });
                if (Selectpicker.DEFAULTS.iconBase === classNames.ICONBASE) toUpdate.push({ name: 'iconBase', className: 'ICONBASE' });
                if (Selectpicker.DEFAULTS.tickIcon === classNames.TICKICON) toUpdate.push({ name: 'tickIcon', className: 'TICKICON' });

                classNames.DIVIDER = 'dropdown-divider';
                classNames.SHOW = 'show';
                classNames.BUTTONCLASS = 'btn-light';
                classNames.POPOVERHEADER = 'popover-header';
                classNames.ICONBASE = '';
                classNames.TICKICON = 'bs-ok-default';

                for (var i = 0; i < toUpdate.length; i++) {
                    var option = toUpdate[i];
                    Selectpicker.DEFAULTS[option.name] = classNames[option.className];
                }
            }

            var value;
            var chain = this.each(function () {
                var $this = $(this);
                if ($this.is('select')) {
                    var data = $this.data('selectpicker'),
                        options = typeof _option == 'object' && _option;

                    if (!data) {
                        var dataAttributes = $this.data();

                        for (var dataAttr in dataAttributes) {
                            if (dataAttributes.hasOwnProperty(dataAttr) && $.inArray(dataAttr, DISALLOWED_ATTRIBUTES) !== -1) {
                                delete dataAttributes[dataAttr];
                            }
                        }

                        var config = $.extend({}, Selectpicker.DEFAULTS, $.fn.selectpicker.defaults || {}, dataAttributes, options);
                        config.template = $.extend({}, Selectpicker.DEFAULTS.template, ($.fn.selectpicker.defaults ? $.fn.selectpicker.defaults.template : {}), dataAttributes.template, options.template);
                        $this.data('selectpicker', (data = new Selectpicker(this, config)));
                    } else if (options) {
                        for (var i in options) {
                            if (options.hasOwnProperty(i)) {
                                data.options[i] = options[i];
                            }
                        }
                    }

                    if (typeof _option == 'string') {
                        if (data[_option] instanceof Function) {
                            value = data[_option].apply(data, args);
                        } else {
                            value = data.options[_option];
                        }
                    }
                }
            });

            if (typeof value !== 'undefined') {
                // noinspection JSUnusedAssignment
                return value;
            } else {
                return chain;
            }
        }

        var old = $.fn.selectpicker;
        $.fn.selectpicker = Plugin;
        $.fn.selectpicker.Constructor = Selectpicker;

        // SELECTPICKER NO CONFLICT
        // ========================
        $.fn.selectpicker.noConflict = function () {
            $.fn.selectpicker = old;
            return this;
        };

        $(document)
            .off('keydown.bs.dropdown.data-api')
            .on('keydown' + EVENT_KEY, '.bootstrap-select [data-toggle="dropdown"], .bootstrap-select [role="listbox"], .bootstrap-select .bs-searchbox input', Selectpicker.prototype.keydown)
            .on('focusin.modal', '.bootstrap-select [data-toggle="dropdown"], .bootstrap-select [role="listbox"], .bootstrap-select .bs-searchbox input', function (e) {
                e.stopPropagation();
            });

        // SELECTPICKER DATA-API
        // =====================
        $(window).on('load' + EVENT_KEY + '.data-api', function () {
            $('.selectpicker').each(function () {
                var $selectpicker = $(this);
                Plugin.call($selectpicker, $selectpicker.data());
            })
        });
    })(jQuery);


}));
//# sourceMappingURL=bootstrap-select.js.map
/** @license
 * DHTML Snowstorm! JavaScript-based snow for web pages
 * Making it snow on the internets since 2003. You're welcome.
 * -----------------------------------------------------------
 * Version 1.44.20131208 (Previous rev: 1.44.20131125)
 * Copyright (c) 2007, Scott Schiller. All rights reserved.
 * Code provided under the BSD License
 * http://schillmania.com/projects/snowstorm/license.txt
 */

/*jslint nomen: true, plusplus: true, sloppy: true, vars: true, white: true */
/*global window, document, navigator, clearInterval, setInterval */

var snowStorm = (function(window, document) {

    // --- common properties ---

    this.autoStart = false;          // Whether the snow should start automatically or not.
    this.excludeMobile = true;      // Snow is likely to be bad news for mobile phones' CPUs (and batteries.) Enable at your own risk.
    this.flakesMax = 128;           // Limit total amount of snow made (falling + sticking)
    this.flakesMaxActive = 64;      // Limit amount of snow falling at once (less = lower CPU use)
    this.animationInterval = 33;    // Theoretical "miliseconds per frame" measurement. 20 = fast + smooth, but high CPU use. 50 = more conservative, but slower
    this.useGPU = true;             // Enable transform-based hardware acceleration, reduce CPU load.
    this.className = null;          // CSS class name for further customization on snow elements
    this.excludeMobile = true;      // Snow is likely to be bad news for mobile phones' CPUs (and batteries.) By default, be nice.
    this.flakeBottom = null;        // Integer for Y axis snow limit, 0 or null for "full-screen" snow effect
    this.followMouse = true;        // Snow movement can respond to the user's mouse
    this.snowColor = '#fff';        // Don't eat (or use?) yellow snow.
    this.snowCharacter = '&bull;';  // &bull; = bullet, &middot; is square on some systems etc.
    this.snowStick = true;          // Whether or not snow should "stick" at the bottom. When off, will never collect.
    this.targetElement = null;      // element which snow will be appended to (null = document.body) - can be an element ID eg. 'myDiv', or a DOM node reference
    this.useMeltEffect = true;      // When recycling fallen snow (or rarely, when falling), have it "melt" and fade out if browser supports it
    this.useTwinkleEffect = false;  // Allow snow to randomly "flicker" in and out of view while falling
    this.usePositionFixed = false;  // true = snow does not shift vertically when scrolling. May increase CPU load, disabled by default - if enabled, used only where supported
    this.usePixelPosition = false;  // Whether to use pixel values for snow top/left vs. percentages. Auto-enabled if body is position:relative or targetElement is specified.

    // --- less-used bits ---

    this.freezeOnBlur = true;       // Only snow when the window is in focus (foreground.) Saves CPU.
    this.flakeLeftOffset = 0;       // Left margin/gutter space on edge of container (eg. browser window.) Bump up these values if seeing horizontal scrollbars.
    this.flakeRightOffset = 0;      // Right margin/gutter space on edge of container
    this.flakeWidth = 8;            // Max pixel width reserved for snow element
    this.flakeHeight = 8;           // Max pixel height reserved for snow element
    this.vMaxX = 5;                 // Maximum X velocity range for snow
    this.vMaxY = 4;                 // Maximum Y velocity range for snow
    this.zIndex = 0;                // CSS stacking order applied to each snowflake

    // --- "No user-serviceable parts inside" past this point, yadda yadda ---

    var storm = this,
        features,
        // UA sniffing and backCompat rendering mode checks for fixed position, etc.
        isIE = navigator.userAgent.match(/msie/i),
        isIE6 = navigator.userAgent.match(/msie 6/i),
        isMobile = navigator.userAgent.match(/mobile|opera m(ob|in)/i),
        isBackCompatIE = (isIE && document.compatMode === 'BackCompat'),
        noFixed = (isBackCompatIE || isIE6),
        screenX = null, screenX2 = null, screenY = null, scrollY = null, docHeight = null, vRndX = null, vRndY = null,
        windOffset = 1,
        windMultiplier = 2,
        flakeTypes = 6,
        fixedForEverything = false,
        targetElementIsRelative = false,
        opacitySupported = (function(){
            try {
                document.createElement('div').style.opacity = '0.5';
            } catch(e) {
                return false;
            }
            return true;
        }()),
        didInit = false,
        docFrag = document.createDocumentFragment();

    features = (function() {

        var getAnimationFrame;

        /**
         * hat tip: paul irish
         * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
         * https://gist.github.com/838785
         */

        function timeoutShim(callback) {
            window.setTimeout(callback, 1000/(storm.animationInterval || 20));
        }

        var _animationFrame = (window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            timeoutShim);

        // apply to window, avoid "illegal invocation" errors in Chrome
        getAnimationFrame = _animationFrame ? function() {
            return _animationFrame.apply(window, arguments);
        } : null;

        var testDiv;

        testDiv = document.createElement('div');

        function has(prop) {

            // test for feature support
            var result = testDiv.style[prop];
            return (result !== undefined ? prop : null);

        }

        // note local scope.
        var localFeatures = {

            transform: {
                ie:  has('-ms-transform'),
                moz: has('MozTransform'),
                opera: has('OTransform'),
                webkit: has('webkitTransform'),
                w3: has('transform'),
                prop: null // the normalized property value
            },

            getAnimationFrame: getAnimationFrame

        };

        localFeatures.transform.prop = (
            localFeatures.transform.w3 ||
            localFeatures.transform.moz ||
            localFeatures.transform.webkit ||
            localFeatures.transform.ie ||
            localFeatures.transform.opera
        );

        testDiv = null;

        return localFeatures;

    }());

    this.timer = null;
    this.flakes = [];
    this.disabled = false;
    this.active = false;
    this.meltFrameCount = 20;
    this.meltFrames = [];

    this.setXY = function(o, x, y) {

        if (!o) {
            return false;
        }

        if (storm.usePixelPosition || targetElementIsRelative) {

            o.style.left = (x - storm.flakeWidth) + 'px';
            o.style.top = (y - storm.flakeHeight) + 'px';

        } else if (noFixed) {

            o.style.right = (100-(x/screenX*100)) + '%';
            // avoid creating vertical scrollbars
            o.style.top = (Math.min(y, docHeight-storm.flakeHeight)) + 'px';

        } else {

            if (!storm.flakeBottom) {

                // if not using a fixed bottom coordinate...
                o.style.right = (100-(x/screenX*100)) + '%';
                o.style.bottom = (100-(y/screenY*100)) + '%';

            } else {

                // absolute top.
                o.style.right = (100-(x/screenX*100)) + '%';
                o.style.top = (Math.min(y, docHeight-storm.flakeHeight)) + 'px';

            }

        }

    };

    this.events = (function() {

        var old = (!window.addEventListener && window.attachEvent), slice = Array.prototype.slice,
            evt = {
                add: (old?'attachEvent':'addEventListener'),
                remove: (old?'detachEvent':'removeEventListener')
            };

        function getArgs(oArgs) {
            var args = slice.call(oArgs), len = args.length;
            if (old) {
                args[1] = 'on' + args[1]; // prefix
                if (len > 3) {
                    args.pop(); // no capture
                }
            } else if (len === 3) {
                args.push(false);
            }
            return args;
        }

        function apply(args, sType) {
            var element = args.shift(),
                method = [evt[sType]];
            if (old) {
                element[method](args[0], args[1]);
            } else {
                element[method].apply(element, args);
            }
        }

        function addEvent() {
            apply(getArgs(arguments), 'add');
        }

        function removeEvent() {
            apply(getArgs(arguments), 'remove');
        }

        return {
            add: addEvent,
            remove: removeEvent
        };

    }());

    function rnd(n,min) {
        if (isNaN(min)) {
            min = 0;
        }
        return (Math.random()*n)+min;
    }

    function plusMinus(n) {
        return (parseInt(rnd(2),10)===1?n*-1:n);
    }

    this.randomizeWind = function() {
        var i;
        vRndX = plusMinus(rnd(storm.vMaxX,0.2));
        vRndY = rnd(storm.vMaxY,0.2);
        if (this.flakes) {
            for (i=0; i<this.flakes.length; i++) {
                if (this.flakes[i].active) {
                    this.flakes[i].setVelocities();
                }
            }
        }
    };

    this.scrollHandler = function() {
        var i;
        // "attach" snowflakes to bottom of window if no absolute bottom value was given
        scrollY = (storm.flakeBottom ? 0 : parseInt(window.scrollY || document.documentElement.scrollTop || (noFixed ? document.body.scrollTop : 0), 10));
        if (isNaN(scrollY)) {
            scrollY = 0; // Netscape 6 scroll fix
        }
        if (!fixedForEverything && !storm.flakeBottom && storm.flakes) {
            for (i=0; i<storm.flakes.length; i++) {
                if (storm.flakes[i].active === 0) {
                    storm.flakes[i].stick();
                }
            }
        }
    };

    this.resizeHandler = function() {
        if (window.innerWidth || window.innerHeight) {
            screenX = window.innerWidth - 16 - storm.flakeRightOffset;
            screenY = (storm.flakeBottom || window.innerHeight);
        } else {
            screenX = (document.documentElement.clientWidth || document.body.clientWidth || document.body.scrollWidth) - (!isIE ? 8 : 0) - storm.flakeRightOffset;
            screenY = storm.flakeBottom || document.documentElement.clientHeight || document.body.clientHeight || document.body.scrollHeight;
        }
        docHeight = document.body.offsetHeight;
        screenX2 = parseInt(screenX/2,10);
    };

    this.resizeHandlerAlt = function() {
        screenX = storm.targetElement.offsetWidth - storm.flakeRightOffset;
        screenY = storm.flakeBottom || storm.targetElement.offsetHeight;
        screenX2 = parseInt(screenX/2,10);
        docHeight = document.body.offsetHeight;
    };

    this.freeze = function() {
        // pause animation
        if (!storm.disabled) {
            storm.disabled = 1;
        } else {
            return false;
        }
        storm.timer = null;
    };

    this.resume = function() {
        if (storm.disabled) {
            storm.disabled = 0;
        } else {
            return false;
        }
        storm.timerInit();
    };

    this.toggleSnow = function() {
        if (!storm.flakes.length) {
            // first run
            storm.start();
        } else {
            storm.active = !storm.active;
            if (storm.active) {
                storm.show();
                storm.resume();
            } else {
                storm.stop();
                storm.freeze();
            }
        }
    };

    this.stop = function() {
        var i;
        this.freeze();
        for (i=0; i<this.flakes.length; i++) {
            this.flakes[i].o.style.display = 'none';
        }
        storm.events.remove(window,'scroll',storm.scrollHandler);
        storm.events.remove(window,'resize',storm.resizeHandler);
        if (storm.freezeOnBlur) {
            if (isIE) {
                storm.events.remove(document,'focusout',storm.freeze);
                storm.events.remove(document,'focusin',storm.resume);
            } else {
                storm.events.remove(window,'blur',storm.freeze);
                storm.events.remove(window,'focus',storm.resume);
            }
        }
    };

    this.show = function() {
        var i;
        for (i=0; i<this.flakes.length; i++) {
            this.flakes[i].o.style.display = 'block';
        }
    };

    this.SnowFlake = function(type,x,y) {
        var s = this;
        this.type = type;
        this.x = x||parseInt(rnd(screenX-20),10);
        this.y = (!isNaN(y)?y:-rnd(screenY)-12);
        this.vX = null;
        this.vY = null;
        this.vAmpTypes = [1,1.2,1.4,1.6,1.8]; // "amplification" for vX/vY (based on flake size/type)
        this.vAmp = this.vAmpTypes[this.type] || 1;
        this.melting = false;
        this.meltFrameCount = storm.meltFrameCount;
        this.meltFrames = storm.meltFrames;
        this.meltFrame = 0;
        this.twinkleFrame = 0;
        this.active = 1;
        this.fontSize = (10+(this.type/5)*10);
        this.o = document.createElement('div');
        this.o.innerHTML = storm.snowCharacter;
        if (storm.className) {
            this.o.setAttribute('class', storm.className);
        }
        this.o.style.color = storm.snowColor;
        this.o.style.position = (fixedForEverything?'fixed':'absolute');
        if (storm.useGPU && features.transform.prop) {
            // GPU-accelerated snow.
            this.o.style[features.transform.prop] = 'translate3d(0px, 0px, 0px)';
        }
        this.o.style.width = storm.flakeWidth+'px';
        this.o.style.height = storm.flakeHeight+'px';
        this.o.style.fontFamily = 'arial,verdana';
        this.o.style.cursor = 'default';
        this.o.style.overflow = 'hidden';
        this.o.style.fontWeight = 'normal';
        this.o.style.zIndex = storm.zIndex;
        docFrag.appendChild(this.o);

        this.refresh = function() {
            if (isNaN(s.x) || isNaN(s.y)) {
                // safety check
                return false;
            }
            storm.setXY(s.o, s.x, s.y);
        };

        this.stick = function() {
            if (noFixed || (storm.targetElement !== document.documentElement && storm.targetElement !== document.body)) {
                s.o.style.top = (screenY+scrollY-storm.flakeHeight)+'px';
            } else if (storm.flakeBottom) {
                s.o.style.top = storm.flakeBottom+'px';
            } else {
                s.o.style.display = 'none';
                s.o.style.bottom = '0%';
                s.o.style.position = 'fixed';
                s.o.style.display = 'block';
            }
        };

        this.vCheck = function() {
            if (s.vX>=0 && s.vX<0.2) {
                s.vX = 0.2;
            } else if (s.vX<0 && s.vX>-0.2) {
                s.vX = -0.2;
            }
            if (s.vY>=0 && s.vY<0.2) {
                s.vY = 0.2;
            }
        };

        this.move = function() {
            var vX = s.vX*windOffset, yDiff;
            s.x += vX;
            s.y += (s.vY*s.vAmp);
            if (s.x >= screenX || screenX-s.x < storm.flakeWidth) { // X-axis scroll check
                s.x = 0;
            } else if (vX < 0 && s.x-storm.flakeLeftOffset < -storm.flakeWidth) {
                s.x = screenX-storm.flakeWidth-1; // flakeWidth;
            }
            s.refresh();
            yDiff = screenY+scrollY-s.y+storm.flakeHeight;
            if (yDiff<storm.flakeHeight) {
                s.active = 0;
                if (storm.snowStick) {
                    s.stick();
                } else {
                    s.recycle();
                }
            } else {
                if (storm.useMeltEffect && s.active && s.type < 3 && !s.melting && Math.random()>0.998) {
                    // ~1/1000 chance of melting mid-air, with each frame
                    s.melting = true;
                    s.melt();
                    // only incrementally melt one frame
                    // s.melting = false;
                }
                if (storm.useTwinkleEffect) {
                    if (s.twinkleFrame < 0) {
                        if (Math.random() > 0.97) {
                            s.twinkleFrame = parseInt(Math.random() * 8, 10);
                        }
                    } else {
                        s.twinkleFrame--;
                        if (!opacitySupported) {
                            s.o.style.visibility = (s.twinkleFrame && s.twinkleFrame % 2 === 0 ? 'hidden' : 'visible');
                        } else {
                            s.o.style.opacity = (s.twinkleFrame && s.twinkleFrame % 2 === 0 ? 0 : 1);
                        }
                    }
                }
            }
        };

        this.animate = function() {
            // main animation loop
            // move, check status, die etc.
            s.move();
        };

        this.setVelocities = function() {
            s.vX = vRndX+rnd(storm.vMaxX*0.12,0.1);
            s.vY = vRndY+rnd(storm.vMaxY*0.12,0.1);
        };

        this.setOpacity = function(o,opacity) {
            if (!opacitySupported) {
                return false;
            }
            o.style.opacity = opacity;
        };

        this.melt = function() {
            if (!storm.useMeltEffect || !s.melting) {
                s.recycle();
            } else {
                if (s.meltFrame < s.meltFrameCount) {
                    s.setOpacity(s.o,s.meltFrames[s.meltFrame]);
                    s.o.style.fontSize = s.fontSize-(s.fontSize*(s.meltFrame/s.meltFrameCount))+'px';
                    s.o.style.lineHeight = storm.flakeHeight+2+(storm.flakeHeight*0.75*(s.meltFrame/s.meltFrameCount))+'px';
                    s.meltFrame++;
                } else {
                    s.recycle();
                }
            }
        };

        this.recycle = function() {
            s.o.style.display = 'none';
            s.o.style.position = (fixedForEverything?'fixed':'absolute');
            s.o.style.bottom = 'auto';
            s.setVelocities();
            s.vCheck();
            s.meltFrame = 0;
            s.melting = false;
            s.setOpacity(s.o,1);
            s.o.style.padding = '0px';
            s.o.style.margin = '0px';
            s.o.style.fontSize = s.fontSize+'px';
            s.o.style.lineHeight = (storm.flakeHeight+2)+'px';
            s.o.style.textAlign = 'center';
            s.o.style.verticalAlign = 'baseline';
            s.x = parseInt(rnd(screenX-storm.flakeWidth-20),10);
            s.y = parseInt(rnd(screenY)*-1,10)-storm.flakeHeight;
            s.refresh();
            s.o.style.display = 'block';
            s.active = 1;
        };

        this.recycle(); // set up x/y coords etc.
        this.refresh();

    };

    this.snow = function() {
        var active = 0, flake = null, i, j;
        for (i=0, j=storm.flakes.length; i<j; i++) {
            if (storm.flakes[i].active === 1) {
                storm.flakes[i].move();
                active++;
            }
            if (storm.flakes[i].melting) {
                storm.flakes[i].melt();
            }
        }
        if (active<storm.flakesMaxActive) {
            flake = storm.flakes[parseInt(rnd(storm.flakes.length),10)];
            if (flake.active === 0) {
                flake.melting = true;
            }
        }
        if (storm.timer) {
            features.getAnimationFrame(storm.snow);
        }
    };

    this.createSnow = function(limit,allowInactive) {
        var i;
        for (i=0; i<limit; i++) {
            storm.flakes[storm.flakes.length] = new storm.SnowFlake(parseInt(rnd(flakeTypes),10));
            if (allowInactive || i>storm.flakesMaxActive) {
                storm.flakes[storm.flakes.length-1].active = -1;
            }
        }
        storm.targetElement.appendChild(docFrag);
    };

    this.timerInit = function() {
        storm.timer = true;
        storm.snow();
    };

    this.init = function() {
        var i;
        for (i=0; i<storm.meltFrameCount; i++) {
            storm.meltFrames.push(1-(i/storm.meltFrameCount));
        }
        storm.randomizeWind();
        storm.createSnow(storm.flakesMax); // create initial batch
        storm.events.add(window,'resize',storm.resizeHandler);
        storm.events.add(window,'scroll',storm.scrollHandler);
        if (storm.freezeOnBlur) {
            if (isIE) {
                storm.events.add(document,'focusout',storm.freeze);
                storm.events.add(document,'focusin',storm.resume);
            } else {
                storm.events.add(window,'blur',storm.freeze);
                storm.events.add(window,'focus',storm.resume);
            }
        }
        storm.resizeHandler();
        storm.scrollHandler();
        if (storm.followMouse) {
            storm.events.add(isIE?document:window,'mousemove',storm.mouseMove);
        }
        storm.animationInterval = Math.max(20,storm.animationInterval);
        storm.timerInit();
    };

    this.start = function(bFromOnLoad) {
        if (!didInit) {
            didInit = true;
        } else if (bFromOnLoad) {
            // already loaded and running
            return true;
        }
        if (typeof storm.targetElement === 'string') {
            var targetID = storm.targetElement;
            storm.targetElement = document.getElementById(targetID);
            if (!storm.targetElement) {
                throw new Error('Snowstorm: Unable to get targetElement "'+targetID+'"');
            }
        }
        if (!storm.targetElement) {
            storm.targetElement = (document.body || document.documentElement);
        }
        if (storm.targetElement !== document.documentElement && storm.targetElement !== document.body) {
            // re-map handler to get element instead of screen dimensions
            storm.resizeHandler = storm.resizeHandlerAlt;
            //and force-enable pixel positioning
            storm.usePixelPosition = true;
        }
        storm.resizeHandler(); // get bounding box elements
        storm.usePositionFixed = (storm.usePositionFixed && !noFixed && !storm.flakeBottom); // whether or not position:fixed is to be used
        if (window.getComputedStyle) {
            // attempt to determine if body or user-specified snow parent element is relatlively-positioned.
            try {
                targetElementIsRelative = (window.getComputedStyle(storm.targetElement, null).getPropertyValue('position') === 'relative');
            } catch(e) {
                // oh well
                targetElementIsRelative = false;
            }
        }
        fixedForEverything = storm.usePositionFixed;
        if (screenX && screenY && !storm.disabled) {
            storm.init();
            storm.active = true;
        }
    };

    function doDelayedStart() {
        window.setTimeout(function() {
            storm.start(true);
        }, 20);
        // event cleanup
        storm.events.remove(isIE?document:window,'mousemove',doDelayedStart);
    }

    function doStart() {
        if (!storm.excludeMobile || !isMobile) {
            doDelayedStart();
        }
        // event cleanup
        storm.events.remove(window, 'load', doStart);
    }

    // hooks for starting the snow
    if (storm.autoStart) {
        storm.events.add(window, 'load', doStart, false);
    }

    return this;

}(window, document));

(function ($) {
    "use strict";

    $.fn.halloweenBats = function (options) {

        var defaults = {
            image: 'img/bats.png', // Path to the image.
            zIndex: 10000, // The z-index you need.
            amount: 5, // Bat amount.
            width: 35, // Image width.
            height: 20, // Animation frame height.
            frames: 4, // Amount of animation frames.
            speed: 20, // Higher value = faster.
            flickering: 15, // Higher value = slower.
            target: 'body' // Target element
        };

        options = $.extend({}, defaults, options);

        var Bat,
            bats = [],
            $body= $(options.target),
            innerWidth = $body.innerWidth(),
            innerHeight = $body.innerHeight(),
            counter;

        Bat = function () {
            var self = this,
                $bat = $('<div class="halloweenBat"/>'),
                x,
                y,
                tx,
                ty,
                dx,
                dy,
                frame;

            /**
             * @param {string} direction
             * @returns {number}
             */
            self.randomPosition = function (direction) {
                var screenLength,
                    imageLength;

                if (direction === 'horizontal') {
                    screenLength = innerWidth;
                    imageLength = options.width;
                }
                else {
                    screenLength = innerHeight;
                    imageLength = options.height;
                }

                return Math.random() * (screenLength - imageLength);
            };

            self.applyPosition = function () {
                $bat.css({
                    left: x + 'px',
                    top: y + 'px'
                });
            };

            self.move = function () {
                var left,
                    top,
                    length,
                    dLeft,
                    dTop,
                    ddLeft,
                    ddTop;

                left = tx - x;
                top = ty - y;

                length = Math.sqrt(left * left + top * top);
                length = Math.max(1, length);

                dLeft = options.speed * (left / length);
                dTop = options.speed * (top / length);

                ddLeft = (dLeft - dx) / options.flickering;
                ddTop = (dTop - dy) / options.flickering;

                dx += ddLeft;
                dy += ddTop;

                x += dx;
                y += dy;

                x = Math.max(0, Math.min(x, innerWidth - options.width));
                y = Math.max(0, Math.min(y, innerHeight - options.height));

                self.applyPosition();

                if (Math.random() > 0.95 ) {
                    tx = self.randomPosition('horizontal');
                    ty = self.randomPosition('vertical');
                }
            };

            self.animate = function () {
                frame += 1;

                if (frame >= options.frames) {
                    frame -= options.frames;
                }

                $bat.css(
                    'backgroundPosition',
                    '0 ' + (frame * -options.height) + 'px'
                );
            };


            x = self.randomPosition('horizontal');
            y = self.randomPosition('vertical');
            tx = self.randomPosition('horizontal');
            ty = self.randomPosition('vertical');
            dx = -5 + Math.random() * 10;
            dy = -5 + Math.random() * 10;

            frame = Math.random() * options.frames;
            frame = Math.round(frame);

            $body.append($bat);
            $bat.css({
                position: 'absolute',
                left: x + 'px',
                top: y + 'px',
                zIndex: options.zIndex,
                width: options.width + 'px',
                height: options.height + 'px',
                backgroundImage: 'url(' + options.image + ')',
                backgroundRepeat: 'no-repeat'
            });

            window.setInterval(self.move, 40);
            window.setInterval(self.animate, 200);
        };

        for (counter = 0; counter < options.amount; ++counter) {
            bats.push(new Bat());
        }

        $(window).resize(function() {
            innerWidth = $body.innerWidth();
            innerHeight = $body.innerHeight();
        });
    };
}(jQuery));
$(function(){
    $('input[type="checkbox"]').each(function(){
        var self = $(this),
            label = self.next(),
            label_text = label.text();

        label.remove();
        self.iCheck({
            checkboxClass: 'icheckbox_line-red',
            insert: '<div class="icheck_line-icon"></div>' + label_text
        });
    });

    $('input[type="radio"]').each(function(){
        var self = $(this),
            label = self.next(),
            label_text = label.text();

        label.remove();
        self.iCheck({
            radioClass: 'iradio_line-red',
            insert: '<div class="icheck_line-icon"></div>' + label_text
        });
    });

    $("[data-toggle='tooltip']").tooltip();

    // Toggle main menu slide
    $('.toggle-menu').click(function () {
        $('.full-content-wrapper').toggleClass("toggle");
    });

    // Add a max heigt to .main-menu-outer-box for scrolling
    $(function () {
        var mainMenuOuterBoxMaxHeight = $(window).height() - 80 - $('.version-marker').outerHeight();
        $('.main-menu-outer-box').css("max-height", mainMenuOuterBoxMaxHeight);
    });
    $(window).resize(function () {
        var mainMenuOuterBoxMaxHeight = $(window).height() - 80 - $('.version-marker').outerHeight();
        $('.main-menu-outer-box').css("max-height", mainMenuOuterBoxMaxHeight);
    });

    $('.client_theme_picker').on('change', function(e){
        e.stopImmediatePropagation();
        document.cookie = "prometheus_theme=" + $(this).val();
        location.reload();
    });

    $('.client_language_picker').on('change', function(e){
        e.stopImmediatePropagation();
        document.cookie = "prometheus_language=" + $(this).val();
        location.reload();
    });

    // tinymce
    tinymce.init({
        selector: '.tinymce',
        skin: 'prometheus',
        content_style: 'body {color: gray !important; font-family: arial;}',
        plugins: 'paste textcolor colorpicker advlist autolink link image imagetools lists charmap preview autoresize wordcount contextmenu searchreplace directionality textpattern table media directionality insertdatetime code',
        toolbar: 'undo redo | styleselect | forecolor backcolor bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | media | table | searchreplace | insertdatetime | ltr rtl | code',

        forced_root_block : false,
        convert_newlines_to_brs: false,
        paste_as_text: true,
        branding: false,

        setup: function(editor){
            editor.on('change', function () {
                editor.save();
            });
        }
    });
});

$('.ids').on('click', function(){
    var steam64 = $(this).find('.steam64').text();
    var steamid = $(this).find('.steamid').text();

    var curtext = $(this).find('.userid').text();

    if(curtext == steam64){
        $(this).find('.userid').text(steamid);
    } else {
        $(this).find('.userid').text(steam64);
    }
});


/**
 * Packages
 */

function chooseFile() {
    $("#img").click();
}

$("#display_check").on("ifChanged", function() {
    var done = ($(this).is(':checked')) ? true : false;
    if(done) {
        $('#display_img').show();
    } else {
        $('#display_img').hide();
    }
});

$("#custom_price").on("ifChanged", function() {
    var done = ($(this).is(':checked')) ? true : false;
    if(done) {
        $('#price_options').hide();
        $('#price_options2').show();
    } else {
        $('#price_options').show();
        $('#price_options2').hide();
    }
});

$("#alternative_pp_check").on("ifChanged", function() {
    var done = ($(this).is(':checked')) ? true : false;
    if(done) {
        $('#alternative_pp').show();
    } else {
        $('#alternative_pp').hide();
    }
});

$("#pkg_permanent").on("ifChanged", function() {
    var done = ($(this).is(':checked')) ? true : false;
    if(done) {
        $('#days').hide();
        $('#subscription').hide();
        $('#link_expire').hide();

    } else {
        $('#days').show();
        $('#subscription').show();
        $('#link_expire').show();
    }
});

$("#pkg_label").on("change", function() {
    var count = $(this).val()
    var amount = $("#inputs").children().length

    if (count > 0 && count != 'none') {
        $("#labels").show();
    } else {
        $("#labels").hide();
    }

    for (i=amount;i<count;i++){
        $("<input class='form-control' style='margin-top: 5px;' placeholder='Label " + i + "' name='labels[]'>").appendTo("#inputs");
    }

    var difference = amount - count;

    for(var i = 0; i < difference; i++) {
        $("input:last-child", $('#inputs')).remove();
    }
})

/**
 * Actions
 */

$(".action_checkbox").on("ifChanged", function() {
    var done = ($(this).is(':checked')) ? true : false;

    if(done) {
        $(this).parents('.checkbox').find('.options').show();
    } else {
        $(this).parents('.checkbox').find('.options').hide();
    }
});

$("#rank_before").on("ifChanged", function() {
    var done = ($(this).is(':checked')) ? true : false;
    if(done) {
        $('#rank_after').hide();
    } else {
        $('#rank_after').show();
    }
});

$("#rank_prefix_tick").on("ifChanged", function() {
    var done = ($(this).is(':checked')) ? true : false;
    if(done) {
        $('#rank_after2').show();
        $('#rank_normal').hide();
    } else {
        $('#rank_after2').hide();
        $('#rank_normal').show();
    }
});

$("#custom_action_after").on("ifChanged", function() {
    var done = ($(this).is(':checked')) ? true : false;
    if(done) {
        $('#code_after').show();
    } else {
        $('#code_after').hide();
    }
});

$("#teamspeak_group_tick").on("ifChanged", function() {
    var done = ($(this).is(':checked')) ? true : false;
    if(done) {
        $('#teamspeak_group_options').show();
    } else {
        $('#teamspeak_group_options').hide();
    }
});

$("#teamspeak_channel_tick").on("ifChanged", function() {
    var done = ($(this).is(':checked')) ? true : false;
    if(done) {
        $('#teamspeak_channel_options').show();
    } else {
        $('#teamspeak_channel_options').hide();
    }
});

$("#updateButton").click(function() {
    var $this = $(this);

    $this.text("Updating ...");
});

$(function() {
    $( "#datepicker" ).datepicker();
    $( "#datepicker2" ).datepicker();
});

/**
 * Theme editor
 */

$('.color_box').colpick({
    layout:'rgbhex',
    submit: 0,
    colorScheme:'light',
    onChange:function(hsb,hex,rgb,el,bySetColor) {
        $(el).css('border-left','3px solid #'+ hex + '');
        $(el).val = rgb['r'] + ',' + rgb['g'] + ',' + rgb['b'];
        if(!bySetColor) $(el).val(rgb['r'] + ',' + rgb['g'] + ',' + rgb['b']);

        if($(el).attr('forclass') != ""){
            var changeClass = $(el).attr('forclass');
            var changeType = $(el).attr('classtype');

            //$(changeClass).css(changeType, 'rgb('+ rgb["r"] +', '+ rgb["g"] +', '+ rgb['b'] +') !important;');

            $(changeClass).each(function () {
                this.style.setProperty(changeType, 'rgb('+ rgb["r"] +', '+ rgb["g"] +', '+ rgb['b'] +')', 'important');
            });
        }
    }
}).keyup(function(){
    $(this).colpickSetColor(this.value);
});

$(document).ready(function() {
    $(".buy-btn-free").click(function() {
        $(this).addClass("disabled");
    });
});

/**
 * Admin sidebar
 */

$(function() {
    $('#sidebarButton').on('click', function(){
        $('#sidebar').fadeToggle(500);

        var state = 0;

        if($('#maincontent').hasClass('col-md-9')){
            setTimeout(function(){
                $('#maincontent').removeClass('col-md-9');
                $('#maincontent').addClass('col-md-12');

                state = 0;
            }, 500);
        } else if($('#maincontent').hasClass('col-md-12')){
            $('#maincontent').removeClass('col-md-12');
            $('#maincontent').addClass('col-md-9');

            state = 1;
        }

        $.ajax({
            url: "inc/ajax/sidebar.php",
            type: "POST",
            data: "action=setState&state=" + state,
            cache: false,
            success: function (response) {}
        });
    });
});

function getUrlParameter(sParam){
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}

/*!
 * iCheck v1.0.2, http://git.io/arlzeA
 * ===================================
 * Powerful jQuery and Zepto plugin for checkboxes and radio buttons customization
 *
 * (c) 2013 Damir Sultanov, http://fronteed.com
 * MIT Licensed
 */

(function($) {

    // Cached vars
    var _iCheck = 'iCheck',
        _iCheckHelper = _iCheck + '-helper',
        _checkbox = 'checkbox',
        _radio = 'radio',
        _checked = 'checked',
        _unchecked = 'un' + _checked,
        _disabled = 'disabled',
        _determinate = 'determinate',
        _indeterminate = 'in' + _determinate,
        _update = 'update',
        _type = 'type',
        _click = 'click',
        _touch = 'touchbegin.i touchend.i',
        _add = 'addClass',
        _remove = 'removeClass',
        _callback = 'trigger',
        _label = 'label',
        _cursor = 'cursor',
        _mobile = /ipad|iphone|ipod|android|blackberry|windows phone|opera mini|silk/i.test(navigator.userAgent);

    // Plugin init
    $.fn[_iCheck] = function(options, fire) {

        // Walker
        var handle = 'input[type="' + _checkbox + '"], input[type="' + _radio + '"]',
            stack = $(),
            walker = function(object) {
                object.each(function() {
                    var self = $(this);

                    if (self.is(handle)) {
                        stack = stack.add(self);
                    } else {
                        stack = stack.add(self.find(handle));
                    }
                });
            };

        // Check if we should operate with some method
        if (/^(check|uncheck|toggle|indeterminate|determinate|disable|enable|update|destroy)$/i.test(options)) {

            // Normalize method's name
            options = options.toLowerCase();

            // Find checkboxes and radio buttons
            walker(this);

            return stack.each(function() {
                var self = $(this);

                if (options == 'destroy') {
                    tidy(self, 'ifDestroyed');
                } else {
                    operate(self, true, options);
                }

                // Fire method's callback
                if ($.isFunction(fire)) {
                    fire();
                }
            });

            // Customization
        } else if (typeof options == 'object' || !options) {

            // Check if any options were passed
            var settings = $.extend({
                    checkedClass: _checked,
                    disabledClass: _disabled,
                    indeterminateClass: _indeterminate,
                    labelHover: true
                }, options),

                selector = settings.handle,
                hoverClass = settings.hoverClass || 'hover',
                focusClass = settings.focusClass || 'focus',
                activeClass = settings.activeClass || 'active',
                labelHover = !!settings.labelHover,
                labelHoverClass = settings.labelHoverClass || 'hover',

                // Setup clickable area
                area = ('' + settings.increaseArea).replace('%', '') | 0;

            // Selector limit
            if (selector == _checkbox || selector == _radio) {
                handle = 'input[type="' + selector + '"]';
            }

            // Clickable area limit
            if (area < -50) {
                area = -50;
            }

            // Walk around the selector
            walker(this);

            return stack.each(function() {
                var self = $(this);

                // If already customized
                tidy(self);

                var node = this,
                    id = node.id,

                    // Layer styles
                    offset = -area + '%',
                    size = 100 + (area * 2) + '%',
                    layer = {
                        position: 'absolute',
                        top: offset,
                        left: offset,
                        display: 'block',
                        width: size,
                        height: size,
                        margin: 0,
                        padding: 0,
                        background: '#fff',
                        border: 0,
                        opacity: 0
                    },

                    // Choose how to hide input
                    hide = _mobile ? {
                        position: 'absolute',
                        visibility: 'hidden'
                    } : area ? layer : {
                        position: 'absolute',
                        opacity: 0
                    },

                    // Get proper class
                    className = node[_type] == _checkbox ? settings.checkboxClass || 'i' + _checkbox : settings.radioClass || 'i' + _radio,

                    // Find assigned labels
                    label = $(_label + '[for="' + id + '"]').add(self.closest(_label)),

                    // Check ARIA option
                    aria = !!settings.aria,

                    // Set ARIA placeholder
                    ariaID = _iCheck + '-' + Math.random().toString(36).substr(2,6),

                    // Parent & helper
                    parent = '<div class="' + className + '" ' + (aria ? 'role="' + node[_type] + '" ' : ''),
                    helper;

                // Set ARIA "labelledby"
                if (aria) {
                    label.each(function() {
                        parent += 'aria-labelledby="';

                        if (this.id) {
                            parent += this.id;
                        } else {
                            this.id = ariaID;
                            parent += ariaID;
                        }

                        parent += '"';
                    });
                }

                // Wrap input
                parent = self.wrap(parent + '/>')[_callback]('ifCreated').parent().append(settings.insert);

                // Layer addition
                helper = $('<ins class="' + _iCheckHelper + '"/>').css(layer).appendTo(parent);

                // Finalize customization
                self.data(_iCheck, {o: settings, s: self.attr('style')}).css(hide);
                !!settings.inheritClass && parent[_add](node.className || '');
                !!settings.inheritID && id && parent.attr('id', _iCheck + '-' + id);
                parent.css('position') == 'static' && parent.css('position', 'relative');
                operate(self, true, _update);

                // Label events
                if (label.length) {
                    label.on(_click + '.i mouseover.i mouseout.i ' + _touch, function(event) {
                        var type = event[_type],
                            item = $(this);

                        // Do nothing if input is disabled
                        if (!node[_disabled]) {

                            // Click
                            if (type == _click) {
                                if ($(event.target).is('a')) {
                                    return;
                                }
                                operate(self, false, true);

                                // Hover state
                            } else if (labelHover) {

                                // mouseout|touchend
                                if (/ut|nd/.test(type)) {
                                    parent[_remove](hoverClass);
                                    item[_remove](labelHoverClass);
                                } else {
                                    parent[_add](hoverClass);
                                    item[_add](labelHoverClass);
                                }
                            }

                            if (_mobile) {
                                event.stopPropagation();
                            } else {
                                return false;
                            }
                        }
                    });
                }

                // Input events
                self.on(_click + '.i focus.i blur.i keyup.i keydown.i keypress.i', function(event) {
                    var type = event[_type],
                        key = event.keyCode;

                    // Click
                    if (type == _click) {
                        return false;

                        // Keydown
                    } else if (type == 'keydown' && key == 32) {
                        if (!(node[_type] == _radio && node[_checked])) {
                            if (node[_checked]) {
                                off(self, _checked);
                            } else {
                                on(self, _checked);
                            }
                        }

                        return false;

                        // Keyup
                    } else if (type == 'keyup' && node[_type] == _radio) {
                        !node[_checked] && on(self, _checked);

                        // Focus/blur
                    } else if (/us|ur/.test(type)) {
                        parent[type == 'blur' ? _remove : _add](focusClass);
                    }
                });

                // Helper events
                helper.on(_click + ' mousedown mouseup mouseover mouseout ' + _touch, function(event) {
                    var type = event[_type],

                        // mousedown|mouseup
                        toggle = /wn|up/.test(type) ? activeClass : hoverClass;

                    // Do nothing if input is disabled
                    if (!node[_disabled]) {

                        // Click
                        if (type == _click) {
                            operate(self, false, true);

                            // Active and hover states
                        } else {

                            // State is on
                            if (/wn|er|in/.test(type)) {

                                // mousedown|mouseover|touchbegin
                                parent[_add](toggle);

                                // State is off
                            } else {
                                parent[_remove](toggle + ' ' + activeClass);
                            }

                            // Label hover
                            if (label.length && labelHover && toggle == hoverClass) {

                                // mouseout|touchend
                                label[/ut|nd/.test(type) ? _remove : _add](labelHoverClass);
                            }
                        }

                        if (_mobile) {
                            event.stopPropagation();
                        } else {
                            return false;
                        }
                    }
                });
            });
        } else {
            return this;
        }
    };

    // Do something with inputs
    function operate(input, direct, method) {
        var node = input[0],
            state = /er/.test(method) ? _indeterminate : /bl/.test(method) ? _disabled : _checked,
            active = method == _update ? {
                checked: node[_checked],
                disabled: node[_disabled],
                indeterminate: input.attr(_indeterminate) == 'true' || input.attr(_determinate) == 'false'
            } : node[state];

        // Check, disable or indeterminate
        if (/^(ch|di|in)/.test(method) && !active) {
            on(input, state);

            // Uncheck, enable or determinate
        } else if (/^(un|en|de)/.test(method) && active) {
            off(input, state);

            // Update
        } else if (method == _update) {

            // Handle states
            for (var each in active) {
                if (active[each]) {
                    on(input, each, true);
                } else {
                    off(input, each, true);
                }
            }

        } else if (!direct || method == 'toggle') {

            // Helper or label was clicked
            if (!direct) {
                input[_callback]('ifClicked');
            }

            // Toggle checked state
            if (active) {
                if (node[_type] !== _radio) {
                    off(input, state);
                }
            } else {
                on(input, state);
            }
        }
    }

    // Add checked, disabled or indeterminate state
    function on(input, state, keep) {
        var node = input[0],
            parent = input.parent(),
            checked = state == _checked,
            indeterminate = state == _indeterminate,
            disabled = state == _disabled,
            callback = indeterminate ? _determinate : checked ? _unchecked : 'enabled',
            regular = option(input, callback + capitalize(node[_type])),
            specific = option(input, state + capitalize(node[_type]));

        // Prevent unnecessary actions
        if (node[state] !== true) {

            // Toggle assigned radio buttons
            if (!keep && state == _checked && node[_type] == _radio && node.name) {
                var form = input.closest('form'),
                    inputs = 'input[name="' + node.name + '"]';

                inputs = form.length ? form.find(inputs) : $(inputs);

                inputs.each(function() {
                    if (this !== node && $(this).data(_iCheck)) {
                        off($(this), state);
                    }
                });
            }

            // Indeterminate state
            if (indeterminate) {

                // Add indeterminate state
                node[state] = true;

                // Remove checked state
                if (node[_checked]) {
                    off(input, _checked, 'force');
                }

                // Checked or disabled state
            } else {

                // Add checked or disabled state
                if (!keep) {
                    node[state] = true;
                }

                // Remove indeterminate state
                if (checked && node[_indeterminate]) {
                    off(input, _indeterminate, false);
                }
            }

            // Trigger callbacks
            callbacks(input, checked, state, keep);
        }

        // Add proper cursor
        if (node[_disabled] && !!option(input, _cursor, true)) {
            parent.find('.' + _iCheckHelper).css(_cursor, 'default');
        }

        // Add state class
        parent[_add](specific || option(input, state) || '');

        // Set ARIA attribute
        if (!!parent.attr('role') && !indeterminate) {
            parent.attr('aria-' + (disabled ? _disabled : _checked), 'true');
        }

        // Remove regular state class
        parent[_remove](regular || option(input, callback) || '');
    }

    // Remove checked, disabled or indeterminate state
    function off(input, state, keep) {
        var node = input[0],
            parent = input.parent(),
            checked = state == _checked,
            indeterminate = state == _indeterminate,
            disabled = state == _disabled,
            callback = indeterminate ? _determinate : checked ? _unchecked : 'enabled',
            regular = option(input, callback + capitalize(node[_type])),
            specific = option(input, state + capitalize(node[_type]));

        // Prevent unnecessary actions
        if (node[state] !== false) {

            // Toggle state
            if (indeterminate || !keep || keep == 'force') {
                node[state] = false;
            }

            // Trigger callbacks
            callbacks(input, checked, callback, keep);
        }

        // Add proper cursor
        if (!node[_disabled] && !!option(input, _cursor, true)) {
            parent.find('.' + _iCheckHelper).css(_cursor, 'pointer');
        }

        // Remove state class
        parent[_remove](specific || option(input, state) || '');

        // Set ARIA attribute
        if (!!parent.attr('role') && !indeterminate) {
            parent.attr('aria-' + (disabled ? _disabled : _checked), 'false');
        }

        // Add regular state class
        parent[_add](regular || option(input, callback) || '');
    }

    // Remove all traces
    function tidy(input, callback) {
        if (input.data(_iCheck)) {

            // Remove everything except input
            input.parent().html(input.attr('style', input.data(_iCheck).s || ''));

            // Callback
            if (callback) {
                input[_callback](callback);
            }

            // Unbind events
            input.off('.i').unwrap();
            $(_label + '[for="' + input[0].id + '"]').add(input.closest(_label)).off('.i');
        }
    }

    // Get some option
    function option(input, state, regular) {
        if (input.data(_iCheck)) {
            return input.data(_iCheck).o[state + (regular ? '' : 'Class')];
        }
    }

    // Capitalize some string
    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Executable handlers
    function callbacks(input, checked, callback, keep) {
        if (!keep) {
            if (checked) {
                input[_callback]('ifToggled');
            }

            input[_callback]('ifChanged')[_callback]('if' + capitalize(callback));
        }
    }
})(window.jQuery || window.Zepto);
