! function($) {
    function mk_text_typer() {
        "use strict";
        $("[data-typer-targets]").each(function() {
            var that = this;
            MK.core.loadDependencies([MK.core.path.plugins + "jquery.typed.js"], function() {
                var $this = $(that),
                    $first_string = [$this.text()],
                    $rest_strings = $this.attr("data-typer-targets").split(","),
                    $strings = $first_string.concat($rest_strings);
                $this.text(""), $this.typed({
                    strings: $strings,
                    typeSpeed: 30,
                    backDelay: 1200,
                    loop: !0,
                    loopCount: !1
                })
            })
        })
    }

    function mk_tab_slider_func() {
        "use strict";
        $(".mk-tab-slider").each(function() {
            var that = this;
            MK.core.loadDependencies([MK.core.path.plugins + "jquery.swiper.js"], function() {
                function repaintFirefox() {
                    $content.css("display", "block"), setTimeout(function() {
                        mk_tab_slider.reInit(), $content.css("display", "table")
                    }, 100)
                }
                var $this = $(that),
                    id = $this.data("id"),
                    $autoplayTime = $this.data("autoplay"),
                    $content = $(".mk-slider-content"),
                    mk_tab_slider = $this.swiper({
                        wrapperClass: "mk-tab-slider-wrapper",
                        slideClass: "mk-tab-slider-item",
                        calculateHeight: !0,
                        speed: 500,
                        autoplay: !isTest && $autoplayTime,
                        onSlideChangeStart: function() {
                            $('.mk-tab-slider-nav[data-id="' + id + '"]').find(".active").removeClass("active"), $('.mk-tab-slider-nav[data-id="' + id + '"]').find("a").eq(mk_tab_slider.activeIndex).addClass("active")
                        }
                    });
                $('.mk-tab-slider-nav[data-id="' + id + '"]').find("a").first().addClass("active"), $('.mk-tab-slider-nav[data-id="' + id + '"]').find("a").on("touchstart mousedown", function(e) {
                    e.preventDefault(), $('.mk-tab-slider-nav[data-id="' + id + '"]').find(".active").removeClass("active"), $(this).addClass("active"), mk_tab_slider.swipeTo($(this).index())
                }), $('.mk-tab-slider-nav[data-id="' + id + '"]').find("a").on("click", function(e) {
                    e.preventDefault()
                }), repaintFirefox(), $(window).on("resize", repaintFirefox)
            })
        })
    }

    function mk_one_page_scroller() {
        "use strict";
        $(".mk-edge-one-pager").each(function() {
            var self = this;
            MK.core.loadDependencies([MK.core.path.plugins + "jquery.fullpage.js"], function() {
                function swipeTo(href, e) {
                    if (href = "_" + href, ~href.indexOf("#")) {
                        var section = href.split("#")[1];
                        ~anchorArr.indexOf(section) && (void 0 !== e && e.preventDefault(), scrollable ? $.fn.fullpage.moveTo(section) : MK.utils.scrollToAnchor('[data-title="' + section + '"]'))
                    }
                }
                var $this = $(self),
                    anchorArr = [];
                $this.find(".section").each(function() {
                    anchorArr.push($(this).attr("data-title"))
                });
                var scrollable = !0;
                $this.find(".section").each(function() {
                    var $section = $(this),
                        $content = $section.find(".edge-slide-content");
                    $section.height();
                    $content.innerHeight() + 30 > $(window).height() && (scrollable = !1)
                }), scrollable || $this.find(".section").each(function() {
                    $(this).addClass("active").css({
                        "padding-bottom": "50px"
                    })
                }), scrollable && $this.fullpage({
                    verticalCentered: !1,
                    resize: !0,
                    slidesColor: ["#ccc", "#fff"],
                    anchors: anchorArr,
                    scrollingSpeed: 600,
                    easing: "easeInQuart",
                    menu: !1,
                    navigation: !0,
                    navigationPosition: "right",
                    navigationTooltips: !1,
                    slidesNavigation: !0,
                    slidesNavPosition: "bottom",
                    loopBottom: !1,
                    loopTop: !1,
                    loopHorizontal: !0,
                    autoScrolling: !0,
                    scrollOverflow: !1,
                    css3: !0,
                    paddingTop: 0,
                    paddingBottom: 0,
                    normalScrollElements: ".mk-header, .mk-responsive-wrap",
                    normalScrollElementTouchThreshold: 5,
                    keyboardScrolling: !0,
                    touchSensitivity: 15,
                    continuousVertical: !1,
                    animateAnchor: !0,
                    onLeave: function(index, nextIndex, direction) {
                        var currentSkin = $this.find(".one-pager-slide").eq(nextIndex - 1).attr("data-header-skin");
                        MK.utils.eventManager.publish("firstElSkinChange", currentSkin), $("#fullPage-nav").removeClass("light-skin dark-skin").addClass(currentSkin + "-skin")
                    },
                    afterRender: function() {
                        var $nav = $("#fullPage-nav");
                        setTimeout(function() {
                            var currentSkin = $this.find(".one-pager-slide").eq(0).attr("data-header-skin");
                            MK.utils.eventManager.publish("firstElSkinChange", currentSkin), $nav.length && $nav.removeClass("light-skin dark-skin").addClass(currentSkin + "-skin")
                        }, 300);
                        var $slide = $this.find(".section"),
                            headerHeight = MK.val.offsetHeaderHeight(0),
                            windowHeight = $(window).height();
                        if ($slide.height(windowHeight - headerHeight), $nav.length) {
                            $nav.css({
                                top: "calc(50% + " + headerHeight / 2 + "px)",
                                marginTop: 0
                            });
                            var style = $this.attr("data-pagination");
                            $nav.addClass("pagination-" + style)
                        }
                        setTimeout(mk_one_pager_resposnive, 1e3)
                    },
                    afterResize: function() {
                        var $slide = $this.find(".section"),
                            headerHeight = MK.val.offsetHeaderHeight(0),
                            windowHeight = $(window).height();
                        $slide.height(windowHeight - headerHeight), $("#fullPage-nav").css({
                            top: "calc(50% + " + headerHeight / 2 + "px)",
                            marginTop: 0
                        }), setTimeout(mk_one_pager_resposnive, 1e3), console.log("Reposition pager content.")
                    }
                });
                var loc = window.location;
                loc.hash && swipeTo(loc.hash), $(document).on("click", "a", function(e) {
                    swipeTo($(e.currentTarget).attr("href"), e)
                })
            })
        })
    }

    function mk_one_pager_resposnive() {
        "use strict";
        $(".mk-edge-one-pager").each(function() {
            var $pager = $(this),
                headerHeight = MK.val.offsetHeaderHeight(0),
                windowHeight = $(window).height() - headerHeight;
            $pager.find(".one-pager-slide").each(function() {
                var $slide = $(this),
                    $content = $slide.find(".edge-slide-content");
                if ($slide.hasClass("left_center") || $slide.hasClass("center_center") || $slide.hasClass("right_center")) {
                    var contentHeight = $content.height(),
                        distanceFromTop = (windowHeight - contentHeight) / 2;
                    distanceFromTop = distanceFromTop < 50 ? 50 + headerHeight : distanceFromTop, $content.css("marginTop", distanceFromTop)
                }
                if ($slide.hasClass("left_bottom") || $slide.hasClass("center_bottom") || $slide.hasClass("right_bottom")) {
                    var distanceFromTop = windowHeight - $content.height() - 90;
                    $content.css("marginTop", distanceFromTop)
                }
            });
            var $row = $pager.parents(".vc_row.vc_row-fluid.mk-fullwidth-true");
            if ($row.length > 0) {
                var $wrapper = $(".mk-main-wrapper-holder"),
                    $grid = $row.children(".mk-grid"),
                    rowWidth = $row.width(),
                    wrapperWidth = $wrapper.width();
                if (rowWidth >= wrapperWidth || $grid.length > 0) return;
                var $content = $wrapper.find(".theme-content"),
                    oriPos = $content.position(),
                    oriPadLeft = $content.css("padding-left"),
                    oriLeft = parseInt(oriPos.left) + parseInt(oriPadLeft);
                if (wrapperWidth <= 0 || oriLeft <= 0) return;
                $row.css({
                    width: wrapperWidth,
                    left: -1 * oriLeft
                })
            }
        })
    }

    function mk_gallery() {
        "use strict";
        $(".mk-gallery .mk-gallery-item.hover-overlay_layer .item-holder").each(function() {
            function updatePosition() {
                var parentHeight = itemHolder.outerHeight(),
                    contentHeight = galleryDesc.innerHeight(),
                    paddingVal = (parentHeight - contentHeight) / 2;
                galleryDesc.css({
                    top: paddingVal
                })
            }
            var itemHolder = $(this),
                galleryDesc = itemHolder.find(".gallery-desc");
            updatePosition(), $(window).on("resize", function() {
                setTimeout(function() {
                    updatePosition()
                }, 1e3)
            })
        }), $(window).width() <= 1024 && $(".mk-gallery .mk-gallery-item").on("click", function(e) {
            var clicks = $(this).data("clicks");
            $(this).toggleClass("hover-state"), $(this).data("clicks", !clicks)
        })
    }

    function mk_theatre_responsive_calculator() {
        var $laptopContainer = $(".laptop-theatre-slider"),
            $computerContainer = $(".desktop-theatre-slider");
        $laptopContainer.each(function() {
            var $this = $(this),
                $window = $(window),
                $windowWidth = $window.outerWidth(),
                $width = ($window.outerHeight(), $this.outerWidth()),
                $height = $this.outerHeight(),
                $player = $this.find(".player-container");
            $windowWidth > $width && $player.css({
                "padding-left": parseInt(143 * $width / 1200),
                "padding-right": parseInt(143 * $width / 1200),
                "padding-top": parseInt(38 * $height / 690),
                "padding-bottom": parseInt(78 * $height / 690)
            })
        }), $computerContainer.each(function() {
            var $this = $(this),
                $window = $(window),
                $windowWidth = $window.outerWidth(),
                $width = ($window.outerHeight(), $this.outerWidth()),
                $height = $this.outerHeight(),
                $player = $this.find(".player-container");
            $windowWidth > $width && $player.css({
                "padding-left": parseInt(49 * $width / 1200),
                "padding-right": parseInt(52 * $width / 1200),
                "padding-top": parseInt(60 * $height / 969),
                "padding-bottom": parseInt(290 * $height / 969)
            })
        })
    }

    function mk_mobile_tablet_responsive_calculator() {
        var $laptopSlideshow = $(".mk-laptop-slideshow-shortcode"),
            $lcdSlideshow = $(".mk-lcd-slideshow");
        $.exists(".mk-laptop-slideshow-shortcode") && $laptopSlideshow.each(function() {
            var $this = $(this),
                $window = $(window),
                $width = ($window.outerWidth(), $window.outerHeight(), $this.outerWidth()),
                $height = $this.outerHeight();
            $this.find(".slideshow-container").css({
                "padding-left": parseInt(102 * $width / 836),
                "padding-right": parseInt(102 * $width / 836),
                "padding-top": parseInt(28 * $height / 481),
                "padding-bottom": parseInt(52 * $height / 481)
            })
        }), $.exists(".mk-lcd-slideshow") && $lcdSlideshow.each(function() {
            var $this = $(this),
                $window = $(window),
                $width = ($window.outerWidth(), $window.outerHeight(), $this.outerWidth()),
                $height = $this.outerHeight();
            $this.find(".slideshow-container").css({
                "padding-left": parseInt(36 * $width / 886),
                "padding-right": parseInt(39 * $width / 886),
                "padding-top": parseInt(35 * $height / 713),
                "padding-bottom": parseInt(213 * $height / 713)
            })
        })
    }

    function mk_start_tour_resize() {
        $(".mk-header-start-tour").each(function() {
            function updateStartTour() {
                $windowWidth < mk_responsive_nav_width ? ($this.removeClass("hidden"), $this.addClass("show")) : $padding < $linkWidth ? ($this.removeClass("show"), $this.addClass("hidden")) : ($this.removeClass("hidden"), $this.addClass("show"))
            }
            var $windowWidth = $(document).width(),
                $this = $(this),
                $linkWidth = $this.width() + 15,
                $padding = ($windowWidth - mk_responsive_nav_width) / 2;
            setTimeout(function() {
                updateStartTour()
            }, 300)
        })
    }

    function mk_header_social_resize() {
        $(".mk-header-social.header-section").each(function() {
            function updateStartTour() {
                $windowWidth < mk_responsive_nav_width ? ($this.removeClass("hidden"), $this.addClass("show")) : $padding < $linkWidth ? ($this.removeClass("show"), $this.addClass("hidden")) : ($this.removeClass("hidden"), $this.addClass("show"))
            }
            var $windowWidth = $(document).width(),
                $this = $(this),
                $linkWidth = $this.width() + 15,
                $padding = ($windowWidth - mk_responsive_nav_width) / 2;
            setTimeout(function() {
                updateStartTour()
            }, 300)
        })
    }

    function mk_page_section_social_video_bg() {
        $(".mk-page-section.social-hosted").each(function() {
            var player, $container = $(this),
                $sound = $container.data("sound"),
                $source = $container.data("source"),
                timer = 1e3;
            if ($("body").hasClass(".compose-mode") && (timer = 2e3), "youtube" == $source) {
                var youtube = $container.find("iframe")[0];
                try {
                    player = new YT.Player(youtube, {
                        events: {
                            onReady: function() {
                                player.playVideo(), 0 == $sound && player.mute()
                            }
                        }
                    })
                } catch (e) {
                    console.log(e)
                }
            }
            if ("vimeo" == $source) {
                var vimeo = $container.find("iframe")[0];
                player = $f(vimeo), setTimeout(function() {
                    player.api("play"), !1 === $sound && player.api("setVolume", 0)
                }, timer)
            }
        })
    }

    function videoLoadState() {
        $(".mk-section-video video").each(function() {
            var mkVideo = this;
            mkVideo.play(), this.onload = function() {
                setTimeout(function() {
                    $(mkVideo).animate({
                        opacity: 1
                    }, 300)
                }, 1e3)
            }()
        })
    }

    function mkPositionSidebar() {
        var top, themeContent = $(".theme-content"),
            lastFullWidthChild = themeContent.find(".vc_row-full-width").last(),
            sidebar = $("#theme-page > .mk-main-wrapper-holder > .theme-page-wrapper > #mk-sidebar");
        if (!lastFullWidthChild.length) return void sidebar.removeAttr("style");
        top = lastFullWidthChild.offset().top - themeContent.offset().top, sidebar.css("padding-top", top)
    }

    function mk_accordion_toggles_tooltip() {
        "use strict";
        $(".box-close-btn").on("click", function() {
            return $(this).parent().fadeOut(300), !1
        })
    }

    function mk_portfolio_ajax() {
        "use strict";

        function init() {
            var $portfolio = $(".portfolio-grid.portfolio-ajax-enabled");
            $portfolio.length && MK.core.loadDependencies([MK.core.path.plugins + "jquery.ajax.portfolio.js"], function() {
                setTimeout(function() {
                    $portfolio.each(function() {
                        $(this).ajaxPortfolio({
                            extraOffset: headerHeight
                        })
                    })
                }, 100)
            })
        }
        var headerHeight = 0;
        $.exists("#wpadminbar") && (headerHeight += $("#wpadminbar").height()), $.exists(".mk-vm-menuwrapper") || (headerHeight += parseInt($(".mk-header").attr("data-sticky-height"))), init(), MK.utils.eventManager.subscribe("ajaxLoaded", init)
    }

    function mk_ajax_search() {
        "use strict";

        function onSearchBoxInput(e) {
            var target = e.target || e.srcElement,
                newValue = target.value;
            searchTerm !== newValue && (searchTerm = newValue, ul.innerHTML = "", searchTerm.length >= minimumLengthToSearch && ($mkAjaxSearchInput.addClass("ajax-searching"), requestCounter++, $.getJSON(ajaxurl + querySpliter + "callback=?&action=mk_ajax_search&security=" + security + "&_wp_http_referer=" + wpHttpReferer + "&term=" + searchTerm).done(showSearchResult).fail(showErrorMessage)))
        }

        function showSearchResult(data) {
            if (responseCounter++, isCorrectResponse()) {
                if (data.length > 0)
                    for (var i = 0; i < data.length; i++) {
                        var item = data[i];
                        $("<li>").append('<a href="' + item.link + '">' + item.image + '<span class="search-title">' + item.label + '</span><span class="search-date">' + item.date + "</span></a>").appendTo(ul)
                    } else ul.innerHTML = '<li class="mk-nav-search-result-zero">No Result.</li>';
                $mkAjaxSearchInput.parent("form").removeClass("ajax-searching").addClass("ajax-search-complete")
            }
        }

        function showErrorMessage() {
            responseCounter++, isCorrectResponse() && (ul.innerHTML = '<li class="mk-nav-search-error-message">Can not search! Please try again.</li>')
        }

        function isCorrectResponse() {
            return requestCounter === responseCounter
        }
        if ("beside_nav" === mk_ajax_search_option) {
            var searchTerm, minimumLengthToSearch = 3,
                $mkAjaxSearchInput = $("#mk-ajax-search-input"),
                security = $mkAjaxSearchInput.siblings('input[name="security"]').val(),
                wpHttpReferer = $mkAjaxSearchInput.siblings('input[name="_wp_http_referer"]').val(),
                querySpliter = ajaxurl.indexOf("?") > -1 ? "&" : "?",
                ul = document.getElementById("mk-nav-search-result"),
                requestCounter = 0,
                responseCounter = 0;
            $mkAjaxSearchInput.on("paste input propertychange", onSearchBoxInput)
        }
    }

    function mk_backgrounds_parallax() {
        "use strict";
        1 == mk_header_parallax && $(".mk-header-bg").addClass("mk-parallax-enabled"), 1 == mk_body_parallax && $("body").addClass("mk-parallax-enabled"), 1 == mk_banner_parallax && $(".mk-header").addClass("mk-parallax-enabled"), 1 == mk_footer_parallax && $("#mk-footer").addClass("mk-parallax-enabled"), $(".mk-parallax-enabled").each(function() {
            var $this = $(this);
            MK.utils.isMobile() || MK.core.loadDependencies([MK.core.path.plugins + "jquery.parallax.js"], function() {
                $this.parallax("49%", .3)
            })
        }), $(".mk-fullwidth-slideshow.parallax-slideshow").each(function() {
            var $this = $(this);
            MK.utils.isMobile() || MK.core.loadDependencies([MK.core.path.plugins + "jquery.parallax.js"], function() {
                var speed_factor = $this.attr("data-speedFactor");
                $this.parallax("49%", speed_factor)
            })
        })
    }

    function loop_audio_init() {
        function jsPlayerloaded(audio, $thisControls) {
            var minutes = Math.floor(audio.duration / 60),
                seconds = Math.floor(audio.duration % 60);
            isNaN(minutes) || $thisControls.find(".jp-duration").text(minutes + ":" + seconds), $thisControls.removeClass("jp-audio-loading").addClass("jp-audio-loaded")
        }
        $.exists(".jp-jplayer") && $(".jp-jplayer.mk-blog-audio").each(function() {
            var $this = $(this),
                $thisControls = $this.next(".jp-audio"),
                audio = $this.find(".mk-audio")[0];
            $thisControls.find(".jp-current-time").text("0:0"), $thisControls.find(".jp-volume-bar-value").css("width", 25), audio.addEventListener("loadeddata", jsPlayerloaded(audio, $thisControls), !1), audio.addEventListener("loadedmetadata", function() {
                var minutes = Math.floor(audio.duration / 60),
                    seconds = Math.floor(audio.duration % 60);
                isNaN(minutes) || $thisControls.find(".jp-duration").text(minutes + ":" + seconds), $thisControls.removeClass("jp-audio-loading").addClass("jp-audio-loaded")
            }), audio.addEventListener("timeupdate", function() {
                var minutes = Math.floor(audio.currentTime / 60),
                    seconds = Math.floor(audio.currentTime % 60);
                $thisControls.find(".jp-current-time").text(minutes + ":" + seconds);
                var position = (audio.currentTime - 0) / (audio.duration - 0) * 100 + 0;
                $thisControls.find(".jp-play-bar").css("width", position + "%")
            }), audio.addEventListener("ended", function() {
                $thisControls.removeClass("jp-audio-playing"), $thisControls.find(".jp-play-bar").css("width", 0), $thisControls.find(".jp-current-time").text("0:0")
            }), $thisControls.find(".jp-play").on("click", function() {
                audio.play(), $thisControls.addClass("jp-audio-playing").removeClass("jp-audio-paused")
            }), $thisControls.find(".jp-pause").on("click", function() {
                audio.pause(), $thisControls.addClass("jp-audio-paused").removeClass("jp-audio-playing")
            }), $thisControls.find(".jp-volume-bar svg").on("click", function() {
                audio.muted = !audio.muted, $(this).parent().toggleClass("jp-muted")
            }), $thisControls.find(".inner-value-adjust").on("click", function(e) {
                var position = e.pageX - $(this).offset().left,
                    volume = (position - 0) / 25 * 1 + 0;
                audio.volume = volume, $(this).find(".jp-volume-bar-value").css("width", position)
            }), $thisControls.find(".jp-seek-bar").on("click", function(e) {
                var position = e.pageX - $(this).offset().left,
                    currnetTime = (position - 0) / ($(this).width() - 0) * (audio.duration - 0) + 0;
                audio.currentTime = currnetTime, $thisControls.find(".jp-play-bar").css("width", currnetTime + "%")
            })
        })
    }

    function mk_blog_carousel() {
        "use strict";
        $.exists(".mk-blog-showcase") && $(".mk-blog-showcase ul li").each(function() {
            $(this).mouseenter(function() {
                $(this).siblings("li").removeClass("mk-blog-first-el").end().addClass("mk-blog-first-el")
            })
        })
    }

    function mk_contact_form() {
        "use strict";

        function validateForm(e, invalidClassName) {
            e.preventDefault();
            for (var form = e.target || e.srcElement, inputs = getFormInputs(form), isValidForm = !0, hasCaptchaField = !1, i = 0; i < inputs.length; i++) {
                var input = inputs[i];
                switch (input.value = String(input.value).trim(), input.type) {
                    case "hidden":
                        break;
                    case "checkbox":
                        isValidForm = validateCheckBox(input, invalidClassName) && isValidForm;
                        break;
                    case "email":
                        isValidForm = validateEmail(input, invalidClassName) && isValidForm;
                        break;
                    case "textarea":
                        isValidForm = validateText(input, invalidClassName) && isValidForm;
                        break;
                    case "text":
                        "captcha" === input.dataset.type ? (isValidForm = validateText(input, invalidClassName) && isValidForm, hasCaptchaField = !0) : isValidForm = "email" === input.dataset.type ? validateEmail(input, invalidClassName) && isValidForm : validateText(input, invalidClassName) && isValidForm;
                        break;
                    default:
                        console.warn("Implement validation for " + input.name + ":" + input.type)
                }
            }
            isValidForm && (hasCaptchaField ? validateCaptcha(form, invalidClassName, sendForm) : sendForm(form))
        }

        function validateCaptcha(form, invalidClassName, captchaIsValidCallback) {
            var input = form.querySelectorAll('[data-type="captcha"]')[0];
            if (0 === input.value.length) return addClass(input, invalidClassName), !1;
            window.get.captcha(input.value).done(function(data) {
                loadCaptcha(), input.value = "", "ok" !== data ? (addClass(input, invalidClassName), addClass(input, "contact-captcha-invalid"), removeClass(input, "contact-captcha-valid"), input.placeholder = mk_captcha_invalid_txt) : (removeClass(input, invalidClassName), removeClass(input, "contact-captcha-invalid"), addClass(input, "contact-captcha-valid"), input.placeholder = mk_captcha_correct_txt, captchaIsValidCallback(form))
            })
        }

        function sendForm(form) {
            var $form = $(form),
                data = getFormData(form);
            progressButton.loader($form), $.post(ajaxurl, data, function(response) {
                var res = JSON.parse(response);
                res.action_Status ? (progressButton.success($form), $form.find(".text-input").val(""), $form.find("textarea").val(""), $form.find("input[type=checkbox]").attr("checked", !1), $form.find(".contact-form-message").slideDown().addClass("state-success").html(res.message), setTimeout(function() {
                    $form.find(".contact-form-message").slideUp()
                }, 5e3)) : (progressButton.error($form), $form.find(".contact-form-message").removeClass("state-success").html(res.message))
            })
        }

        function initializeCaptchas() {
            for (var captchaChangeImageButtons = document.getElementsByClassName("captcha-change-image"), i = 0; i < captchaChangeImageButtons.length; i++) captchaChangeImageButtons[i].addEventListener("click", loadCaptcha)
        }

        function loadCaptcha(e) {
            function appendImage(captchaImageURL) {
                0 === captchaImageHolder.find(".captcha-image").length ? captchaImageHolder.html('<img src="' + captchaImageURL + '" class="captcha-image" alt="captcha txt">') : captchaImageHolder.find(".captcha-image").attr("src", captchaImageURL + "?" + (new Date).getTime())
            }
            e && e.preventDefault(), $.post(ajaxurl, {
                action: "mk_create_captcha_image"
            }, appendImage)
        }

        function getFormInputs(form) {
            return form.querySelectorAll("input,textarea")
        }

        function getFormData(form) {
            for (var data = {
                    action: "mk_contact_form"
                }, inputs = getFormInputs(form), i = 0; i < inputs.length; i++) data[inputs[i].name] = inputs[i].value;
            return data
        }
        var mkContactForms = document.getElementsByClassName("mk-contact-form");
        if (0 !== mkContactForms.length) {
            for (var captchaImageHolder = $(".captcha-image-holder"), i = 0; i < mkContactForms.length; i++) ! function(form, activeClassName, invalidClassName) {
                function setActiveClass() {
                    addClass(this.parentNode, activeClassName)
                }

                function unsetActiveClass() {
                    "" === this.value && removeClass(this.parentNode, activeClassName)
                }
                for (var inputs = getFormInputs(form), i = 0; i < inputs.length; i++) ! function(input) {
                    input.addEventListener("focus", setActiveClass), input.addEventListener("blur", unsetActiveClass)
                }(inputs[i]);
                form.addEventListener("submit", function(e) {
                    validateForm(e, invalidClassName)
                })
            }(mkContactForms[i], "is-active", "mk-invalid");
            captchaImageHolder.length > 0 && $(window).on("load", initializeCaptchas)
        }
    }

    function mk_login_form() {
        $("form.mk-login-form").each(function() {
            var $this = $(this);
            $this.on("submit", function(e) {
                $("p.mk-login-status", $this).show().text(ajax_login_object.loadingmessage), $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: ajax_login_object.ajaxurl,
                    data: {
                        action: "ajaxlogin",
                        username: $("#username", $this).val(),
                        password: $("#password", $this).val(),
                        security: $("#security", $this).val()
                    },
                    success: function(data) {
                        $("p.mk-login-status", $this).text(data.message), !0 === data.loggedin && (document.location.href = ajax_login_object.redirecturl)
                    }
                }), e.preventDefault()
            })
        })
    }

    function mk_click_events() {
        "use strict";
        $(".mk-header-login, .mk-header-signup, .mk-side-dashboard, .mk-quick-contact-wrapper, .mk-dashboard-trigger, .blog-share-container, .news-share-buttons, .main-nav-side-search, #mk-fullscreen-search-wrapper, #fullscreen-navigation").on("click", function(event) {
            event.stopPropagation ? event.stopPropagation() : window.event && (window.event.cancelBubble = !0)
        }), $("html").on("click", function() {
            $(".mk-login-register, .mk-header-subscribe, #mk-quick-contact, .single-share-buttons, .single-share-box, .blog-social-share, .news-share-buttons, #mk-nav-search-wrapper").fadeOut(300), $(".mk-quick-contact-link").removeClass("quick-contact-active")
        }), $(".mk-fullscreen-search-overlay").on("click", function() {
            $(this).removeClass("mk-fullscreen-search-overlay-show")
        }), $(".mk-forget-password").on("click", function() {
            $(".mk-forget-panel").siblings().hide().end().show()
        }), $(".mk-create-account").on("click", function() {
            $("#mk-register-panel").siblings().hide().end().show()
        }), $(".mk-return-login").on("click", function() {
            $("#mk-login-panel").siblings().hide().end().show()
        }), $(".mk-quick-contact-link").on("click", function() {
            var $this = $(this),
                $quickContact = $("#mk-quick-contact");
            return $this.hasClass("quick-contact-active") ? ($quickContact.removeClass("quick-contact-anim").fadeOut(100), $this.removeClass("quick-contact-active")) : ($quickContact.addClass("quick-contact-anim").fadeIn(250), $this.addClass("quick-contact-active")), !1
        })
    }

    function mk_social_share_global() {
        "use strict";
        $(".twitter-share").on("click", function() {
            var $this = $(this),
                $url = $this.attr("data-url"),
                $title = $this.attr("data-title");
            return window.open("http://twitter.com/intent/tweet?text=" + $title + " " + $url, "twitterWindow", "height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0"), !1
        }), $(".pinterest-share").on("click", function() {
            var $this = $(this),
                $url = $this.attr("data-url"),
                $title = $this.attr("data-title"),
                $image = $this.attr("data-image");
            return window.open("http://pinterest.com/pin/create/button/?url=" + $url + "&media=" + $image + "&description=" + $title, "twitterWindow", "height=320,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0"), !1
        }), $(".facebook-share").on("click", function() {
            var $url = $(this).attr("data-url");
            return window.open("https://www.facebook.com/sharer/sharer.php?u=" + $url, "facebookWindow", "height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0"), !1
        }), $(".googleplus-share").on("click", function() {
            var $url = $(this).attr("data-url");
            return window.open("https://plus.google.com/share?url=" + $url, "googlePlusWindow", "height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0"), !1
        }), $(".linkedin-share").on("click", function() {
            var $this = $(this),
                $url = $this.attr("data-url"),
                $title = $this.attr("data-title"),
                $desc = $this.attr("data-desc");
            return window.open("http://www.linkedin.com/shareArticle?mini=true&url=" + $url + "&title=" + $title + "&summary=" + $desc, "linkedInWindow", "height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0"), !1
        })
    }

    function mk_event_countdown() {
        $.exists(".mk-event-countdown") && MK.core.loadDependencies([MK.core.path.plugins + "jquery.countdown.js"], function() {
            $(".mk-event-countdown").each(function() {
                if (!isTest) {
                    var $this = $(this),
                        $date = $this.attr("data-date"),
                        $offset = $this.attr("data-offset");
                    $this.downCount({
                        date: $date,
                        offset: $offset
                    })
                }
            })
        })
    }

    function mk_flexslider_init() {
        var $lcd = $(".mk-lcd-slideshow"),
            $laptop = $(".mk-laptop-slideshow-shortcode");
        $lcd.length && $lcd.find(".mk-lcd-image").fadeIn(), $laptop.length && $laptop.find(".mk-laptop-image").fadeIn(), $(".js-flexslider").each(function() {
            ($(this).parents(".mk-tabs").length || $(this).parents(".mk-accordion").length) && $(this).removeData("flexslider");
            var $this = $(this),
                $selector = $this.attr("data-selector"),
                $animation = $this.attr("data-animation"),
                $easing = $this.attr("data-easing"),
                $direction = $this.attr("data-direction"),
                $smoothHeight = "true" == $this.attr("data-smoothHeight"),
                $slideshowSpeed = $this.attr("data-slideshowSpeed"),
                $animationSpeed = $this.attr("data-animationSpeed"),
                $controlNav = "true" == $this.attr("data-controlNav"),
                $directionNav = "true" == $this.attr("data-directionNav"),
                $pauseOnHover = "true" == $this.attr("data-pauseOnHover"),
                $isCarousel = "true" == $this.attr("data-isCarousel");
            if (void 0 !== $selector) var $selector_class = $selector;
            else var $selector_class = ".mk-flex-slides > li";
            if (!0 === $isCarousel) var $itemWidth = parseInt($this.attr("data-itemWidth")),
                $itemMargin = parseInt($this.attr("data-itemMargin")),
                $minItems = parseInt($this.attr("data-minItems")),
                $maxItems = parseInt($this.attr("data-maxItems")),
                $move = parseInt($this.attr("data-move"));
            else var $itemWidth = $itemMargin = $minItems = $maxItems = $move = 0;
            MK.core.loadDependencies([MK.core.path.plugins + "jquery.flexslider.js"], function() {
                $this.flexslider({
                    selector: $selector_class,
                    animation: $animation,
                    easing: $easing,
                    direction: $direction,
                    smoothHeight: $smoothHeight,
                    slideshow: !isTest,
                    slideshowSpeed: $slideshowSpeed,
                    animationSpeed: $animationSpeed,
                    controlNav: $controlNav,
                    directionNav: $directionNav,
                    pauseOnHover: $pauseOnHover,
                    prevText: "",
                    nextText: "",
                    itemWidth: $itemWidth,
                    itemMargin: $itemMargin,
                    minItems: $minItems,
                    maxItems: $maxItems,
                    move: $move
                })
            })
        })
    }

    function mk_header_searchform() {
        $(".mk-search-trigger").on("click", function() {
            setTimeout(function() {
                $("#mk-ajax-search-input").focus()
            }, 500)
        }), $(".mk-header-toolbar .mk-header-searchform .text-input").on("focus", function() {
            if ($(".mk-header-toolbar .mk-header-searchform .text-input").hasClass("on-close-state")) return $(".mk-header-toolbar .mk-header-searchform .text-input").removeClass("on-close-state").animate({
                width: "200px"
            }, 200), !1
        }), $(".mk-header-toolbar .mk-header-searchform").on("click", function(event) {
            event.stopPropagation ? event.stopPropagation() : window.event && (window.event.cancelBubble = !0)
        }), $("html").on("click", function() {
            $(this).find(".mk-header-toolbar .mk-header-searchform .text-input").addClass("on-close-state").animate({
                width: 90
            }, 300)
        }), "Edge" === MK.utils.browser.name && $("#mk-fullscreen-search-input").on("keydown", function(e) {
            13 == e.which && (e.preventDefault(), $("#mk-fullscreen-searchform").submit())
        })
    }

    function mk_hover_events() {
        "use strict";
        $(".shopping-cart-header").hover(function() {
            $(this).find(".mk-shopping-cart-box").stop(!0, !0).fadeIn(250)
        }, function() {
            $(this).find(".mk-shopping-cart-box").stop(!0, !0).delay(500).fadeOut(250)
        }), $(".widget-sub-navigation > ul > li, .widget_nav_menu ul.menu > li, .widget_product_categories ul > .cat-item").each(function() {
            var $this = $(this),
                $subLevel = $this.find("ul").first();
            ($this.hasClass("page_item_has_children") || $this.hasClass("menu-item-has-children") || $this.hasClass("cat-parent")) && ($this.on("click", function() {
                $this.hasClass("toggle-active") ? ($subLevel.stop(!0, !0).slideUp(700), $this.removeClass("toggle-active")) : ($subLevel.stop(!0, !0).slideDown(700), $this.addClass("toggle-active"))
            }), $subLevel.on("click", function(e) {
                e.stopPropagation()
            }))
        });
        $(".mk-fullscreen-trigger").on("click", function(e) {
            $(".mk-fullscreen-search-overlay").addClass("mk-fullscreen-search-overlay-show"), setTimeout(function() {
                $("#mk-fullscreen-search-input").focus()
            }, 300), e.preventDefault()
        }), $(".mk-fullscreen-close").on("click", function(e) {
            $(".mk-fullscreen-search-overlay").removeClass("mk-fullscreen-search-overlay-show"), e.preventDefault()
        })
    }

    function mk_unfold_footer() {
        var $this = $("#mk-footer"),
            $spacer = $("#mk-footer-unfold-spacer"),
            $footerHeight = $this.outerHeight();
        window.matchMedia("(max-width: 767px)").matches ? $spacer.css("height", 0) : $this.hasClass("mk-footer-unfold") && $spacer.css("height", $footerHeight)
    }

    function mk_lightbox_init() {
        $(".mk-lightbox").fancybox({
            loop: !0
        }), $.fancybox.defaults.hash = !1
    }

    function mk_milestone() {
        "use strict";
        !isTest && $.exists(".mk-milestone") && $(".mk-milestone").each(function() {
            var $this = $(this),
                stop_number = $this.find(".milestone-number").attr("data-stop"),
                animation_speed = parseInt($this.find(".milestone-number").attr("data-speed")),
                build = function() {
                    $this.hasClass("scroll-animated") || ($this.addClass("scroll-animated"), $({
                        countNum: $this.find(".milestone-number").text()
                    }).animate({
                        countNum: stop_number
                    }, {
                        duration: animation_speed,
                        easing: "linear",
                        step: function() {
                            $this.find(".milestone-number").text(Math.floor(this.countNum))
                        },
                        complete: function() {
                            $this.find(".milestone-number").text(this.countNum)
                        }
                    }))
                };
            MK.utils.isMobile() ? build() : MK.utils.scrollSpy(this, {
                position: "bottom",
                after: build
            })
        })
    }

    function mk_portfolio_widget() {
        "use strict";
        $(".widget_recent_portfolio li").each(function() {
            $(this).find(".portfolio-widget-thumb").on("hover", function() {
                $(this).siblings(".portfolio-widget-info").animate({
                    opacity: 1
                }, 200)
            }, function() {
                $(this).siblings(".portfolio-widget-info").animate({
                    opacity: 0
                }, 200)
            })
        })
    }

    function mk_skill_meter() {
        "use strict";
        $.exists(".mk-skill-meter") && (MK.utils.isMobile() ? $(".mk-skill-meter .progress-outer").each(function() {
            var $this = $(this);
            $this.hasClass("scroll-animated") || ($this.addClass("scroll-animated"), $this.css({
                width: $(this).attr("data-width") + "%"
            }))
        }) : $(".mk-skill-meter .progress-outer").each(function() {
            var $this = $(this),
                build = function() {
                    $this.hasClass("scroll-animated") || ($this.addClass("scroll-animated"), $this.animate({
                        width: $this.attr("data-width") + "%"
                    }, 2e3))
                };
            MK.utils.scrollSpy(this, {
                position: "bottom",
                after: build
            })
        }))
    }

    function addClass(tag, className) {
        tag.className += " " + className
    }

    function removeClass(tag, className) {
        tag.className = tag.className.replace(new RegExp(className, "g"), "")
    }

    function validateEmail(input, invalidClassName) {
        var value = input.value.trim();
        return (input.required || value.length > 0) && !/^([a-z0-9_\.\-\+]+)@([\da-z\.\-]+)\.([a-z\.]{2,63})$/i.test(value) ? (invalidClassName && addClass(input, invalidClassName), !1) : (invalidClassName && removeClass(input, invalidClassName), !0)
    }

    function validateText(input, invalidClassName) {
        var value = input.value.trim();
        return input.required && 0 === value.length ? (invalidClassName && addClass(input, invalidClassName), !1) : (invalidClassName && removeClass(input, invalidClassName), !0)
    }

    function validateCheckBox(input, invalidClassName) {
        return input.required && 0 == input.checked ? (invalidClassName && addClass(input, invalidClassName), !1) : (invalidClassName && removeClass(input, invalidClassName), !0)
    }

    function product_loop_add_cart() {
        var $body = $("body");
        $body.on("click", ".add_to_cart_button", function() {
            var $holder = $(this).parents(".product:eq(0)"),
                $i = $holder.find(".product-loading-icon");
            $holder.addClass("adding-to-cart").removeClass("added-to-cart"), $i.html('<svg class="mk-svg-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M437.011 74.99c-46.326-46.328-110.318-74.99-181.011-74.99-109.744 0-203.345 69.064-239.749 166.094l59.938 22.477c27.302-72.773 97.503-124.571 179.811-124.571 53.02 0 101.01 21.5 135.753 56.247l-71.753 71.753h192v-192l-74.989 74.99zm-181.011 373.01c-53.02 0-101.013-21.496-135.756-56.244l71.756-71.756h-192v192l74.997-74.997c46.323 46.331 110.309 74.997 181.003 74.997 109.745 0 203.346-69.064 239.75-166.094l-59.938-22.477c-27.302 72.773-97.503 124.571-179.812 124.571z"/></svg>')
        }), $body.bind("added_to_cart", function() {
            var $holder = $(".adding-to-cart"),
                $i = $holder.find(".product-loading-icon");
            $holder.removeClass("adding-to-cart").addClass("added-to-cart"), $i.html('<svg class="mk-svg-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M432 64l-240 240-112-112-80 80 192 192 320-320z"/></svg>')
        })
    }
    var MK = {
        api: {},
        ui: {},
        component: {}
    };
    window.MK = MK, console.log(23423),
        function(root, factory) {
            "function" == typeof define && define.amd ? define(factory) : "object" == typeof exports ? module.exports = factory() : root.ResizeSensor = factory()
        }("undefined" != typeof window ? window : this, function() {
            function forEachElement(elements, callback) {
                var elementsType = Object.prototype.toString.call(elements),
                    isCollectionTyped = "[object Array]" === elementsType || "[object NodeList]" === elementsType || "[object HTMLCollection]" === elementsType || "[object Object]" === elementsType || "undefined" != typeof jQuery && elements instanceof jQuery || "undefined" != typeof Elements && elements instanceof Elements,
                    i = 0,
                    j = elements.length;
                if (isCollectionTyped)
                    for (; i < j; i++) callback(elements[i]);
                else callback(elements)
            }

            function getElementSize(element) {
                if (!element.getBoundingClientRect) return {
                    width: element.offsetWidth,
                    height: element.offsetHeight
                };
                var rect = element.getBoundingClientRect();
                return {
                    width: Math.round(rect.width),
                    height: Math.round(rect.height)
                }
            }
            if ("undefined" == typeof window) return null;
            var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function(fn) {
                    return window.setTimeout(fn, 20)
                },
                ResizeSensor = function(element, callback) {
                    function EventQueue() {
                        var q = [];
                        this.add = function(ev) {
                            q.push(ev)
                        };
                        var i, j;
                        this.call = function() {
                            for (i = 0, j = q.length; i < j; i++) q[i].call()
                        }, this.remove = function(ev) {
                            var newQueue = [];
                            for (i = 0, j = q.length; i < j; i++) q[i] !== ev && newQueue.push(q[i]);
                            q = newQueue
                        }, this.length = function() {
                            return q.length
                        }
                    }

                    function attachResizeEvent(element, resized) {
                        if (element) {
                            if (element.resizedAttached) return void element.resizedAttached.add(resized);
                            element.resizedAttached = new EventQueue, element.resizedAttached.add(resized), element.resizeSensor = document.createElement("div"), element.resizeSensor.dir = "ltr", element.resizeSensor.className = "resize-sensor";
                            var style = "position: absolute; left: -10px; top: -10px; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;",
                                styleChild = "position: absolute; left: 0; top: 0; transition: 0s;";
                            element.resizeSensor.style.cssText = style, element.resizeSensor.innerHTML = '<div class="resize-sensor-expand" style="' + style + '"><div style="' + styleChild + '"></div></div><div class="resize-sensor-shrink" style="' + style + '"><div style="' + styleChild + ' width: 200%; height: 200%"></div></div>', element.appendChild(element.resizeSensor);
                            var position = window.getComputedStyle(element).getPropertyPriority("position");
                            "absolute" !== position && "relative" !== position && "fixed" !== position && (element.style.position = "relative");
                            var dirty, rafId, expand = element.resizeSensor.childNodes[0],
                                expandChild = expand.childNodes[0],
                                shrink = element.resizeSensor.childNodes[1],
                                size = getElementSize(element),
                                lastWidth = size.width,
                                lastHeight = size.height,
                                reset = function() {
                                    var invisible = 0 === element.offsetWidth && 0 === element.offsetHeight;
                                    if (invisible) {
                                        var saveDisplay = element.style.display;
                                        element.style.display = "block"
                                    }
                                    expandChild.style.width = "100000px", expandChild.style.height = "100000px", expand.scrollLeft = 1e5, expand.scrollTop = 1e5, shrink.scrollLeft = 1e5, shrink.scrollTop = 1e5, invisible && (element.style.display = saveDisplay)
                                };
                            element.resizeSensor.resetSensor = reset;
                            var onResized = function() {
                                    rafId = 0, dirty && (lastWidth = void 0, lastHeight = void 0, element.resizedAttached && element.resizedAttached.call())
                                },
                                onScroll = function() {
                                    var size = getElementSize(element),
                                        newWidth = size.width,
                                        newHeight = size.height;
                                    dirty = newWidth != lastWidth || newHeight != lastHeight, dirty && !rafId && (rafId = requestAnimationFrame(onResized)), reset()
                                },
                                addEvent = function(el, name, cb) {
                                    el.attachEvent ? el.attachEvent("on" + name, cb) : el.addEventListener(name, cb)
                                };
                            addEvent(expand, "scroll", onScroll), addEvent(shrink, "scroll", onScroll), requestAnimationFrame(reset)
                        }
                    }
                    forEachElement(element, function(elem) {
                        attachResizeEvent(elem, callback)
                    }), this.detach = function(ev) {
                        ResizeSensor.detach(element, ev)
                    }, this.reset = function() {
                        element.resizeSensor.resetSensor()
                    }
                };
            return ResizeSensor.reset = function(element, ev) {
                forEachElement(element, function(elem) {
                    elem.resizeSensor.resetSensor()
                })
            }, ResizeSensor.detach = function(element, ev) {
                forEachElement(element, function(elem) {
                    elem && (elem.resizedAttached && "function" == typeof ev && (elem.resizedAttached.remove(ev), elem.resizedAttached.length()) || elem.resizeSensor && (elem.contains(elem.resizeSensor) && elem.removeChild(elem.resizeSensor), delete elem.resizeSensor, delete elem.resizedAttached))
                })
            }, ResizeSensor
        }),
        function(root, factory) {
            "function" == typeof define && define.amd ? define(["./ResizeSensor.js"], factory) : "object" == typeof exports ? module.exports = factory(require("./ResizeSensor.js")) : (root.ElementQueries = factory(root.ResizeSensor), root.ElementQueries.listen())
        }("undefined" != typeof window ? window : this, function(ResizeSensor) {
            var ElementQueries = function() {
                function getEmSize(element) {
                    element || (element = document.documentElement);
                    var fontSize = window.getComputedStyle(element, null).fontSize;
                    return parseFloat(fontSize) || 16
                }

                function getElementSize(element) {
                    if (!element.getBoundingClientRect) return {
                        width: element.offsetWidth,
                        height: element.offsetHeight
                    };
                    var rect = element.getBoundingClientRect();
                    return {
                        width: Math.round(rect.width),
                        height: Math.round(rect.height)
                    }
                }

                function convertToPx(element, value) {
                    var numbers = value.split(/\d/),
                        units = numbers[numbers.length - 1];
                    switch (value = parseFloat(value), units) {
                        case "px":
                            return value;
                        case "em":
                            return value * getEmSize(element);
                        case "rem":
                            return value * getEmSize();
                        case "vw":
                            return value * document.documentElement.clientWidth / 100;
                        case "vh":
                            return value * document.documentElement.clientHeight / 100;
                        case "vmin":
                        case "vmax":
                            var vw = document.documentElement.clientWidth / 100,
                                vh = document.documentElement.clientHeight / 100;
                            return value * (0, Math["vmin" === units ? "min" : "max"])(vw, vh);
                        default:
                            return value
                    }
                }

                function SetupInformation(element, id) {
                    this.element = element;
                    var key, option, elementSize, value, actualValue, attrValues, attrValue, attrName, attributes = ["min-width", "min-height", "max-width", "max-height"];
                    this.call = function() {
                        elementSize = getElementSize(this.element), attrValues = {};
                        for (key in allQueries[id]) allQueries[id].hasOwnProperty(key) && (option = allQueries[id][key], value = convertToPx(this.element, option.value), actualValue = "width" === option.property ? elementSize.width : elementSize.height, attrName = option.mode + "-" + option.property, attrValue = "", "min" === option.mode && actualValue >= value && (attrValue += option.value), "max" === option.mode && actualValue <= value && (attrValue += option.value), attrValues[attrName] || (attrValues[attrName] = ""), attrValue && -1 === (" " + attrValues[attrName] + " ").indexOf(" " + attrValue + " ") && (attrValues[attrName] += " " + attrValue));
                        for (var k in attributes) attributes.hasOwnProperty(k) && (attrValues[attributes[k]] ? this.element.setAttribute(attributes[k], attrValues[attributes[k]].substr(1)) : this.element.removeAttribute(attributes[k]))
                    }
                }

                function setupElement(element, id) {
                    element.elementQueriesSetupInformation || (element.elementQueriesSetupInformation = new SetupInformation(element, id)), element.elementQueriesSensor || (element.elementQueriesSensor = new ResizeSensor(element, function() {
                        element.elementQueriesSetupInformation.call()
                    })), element.elementQueriesSetupInformation.call()
                }

                function queueQuery(selector, mode, property, value) {
                    if (void 0 === allQueries[selector]) {
                        allQueries[selector] = [];
                        var id = idToSelectorMapping.length;
                        cssStyleElement.innerHTML += "\n" + selector + " {animation: 0.1s element-queries;}", cssStyleElement.innerHTML += "\n" + selector + " > .resize-sensor {min-width: " + id + "px;}", idToSelectorMapping.push(selector)
                    }
                    allQueries[selector].push({
                        mode: mode,
                        property: property,
                        value: value
                    })
                }

                function getQuery(container) {
                    var query;
                    if (document.querySelectorAll && (query = container ? container.querySelectorAll.bind(container) : document.querySelectorAll.bind(document)), query || "undefined" == typeof $$ || (query = $$), query || "undefined" == typeof jQuery || (query = jQuery), !query) throw "No document.querySelectorAll, jQuery or Mootools's $$ found.";
                    return query
                }

                function findElementQueriesElements(container) {
                    var query = getQuery(container);
                    for (var selector in allQueries)
                        if (allQueries.hasOwnProperty(mode))
                            for (var elements = query(selector, container), i = 0, j = elements.length; i < j; i++) setupElement(elements[i], selector)
                }

                function attachResponsiveImage(element) {
                    function check() {
                        var i, imageToDisplay = !1;
                        for (i in children) children.hasOwnProperty(i) && rules[i].minWidth && element.offsetWidth > rules[i].minWidth && (imageToDisplay = i);
                        if (imageToDisplay || (imageToDisplay = defaultImageId), lastActiveImage !== imageToDisplay)
                            if (loadedImages[imageToDisplay]) children[lastActiveImage].style.display = "none", children[imageToDisplay].style.display = "block", lastActiveImage = imageToDisplay;
                            else {
                                var image = new Image;
                                image.onload = function() {
                                    children[imageToDisplay].src = sources[imageToDisplay], children[lastActiveImage].style.display = "none", children[imageToDisplay].style.display = "block", loadedImages[imageToDisplay] = !0, lastActiveImage = imageToDisplay
                                }, image.src = sources[imageToDisplay]
                            }
                        else children[imageToDisplay].src = sources[imageToDisplay]
                    }
                    var children = [],
                        rules = [],
                        sources = [],
                        defaultImageId = 0,
                        lastActiveImage = -1,
                        loadedImages = [];
                    for (var i in element.children)
                        if (element.children.hasOwnProperty(i) && element.children[i].tagName && "img" === element.children[i].tagName.toLowerCase()) {
                            children.push(element.children[i]);
                            var minWidth = element.children[i].getAttribute("min-width") || element.children[i].getAttribute("data-min-width"),
                                src = element.children[i].getAttribute("data-src") || element.children[i].getAttribute("url");
                            sources.push(src);
                            var rule = {
                                minWidth: minWidth
                            };
                            rules.push(rule), minWidth ? element.children[i].style.display = "none" : (defaultImageId = children.length - 1, element.children[i].style.display = "block")
                        }
                    lastActiveImage = defaultImageId, element.resizeSensor = new ResizeSensor(element, check), check()
                }

                function findResponsiveImages() {
                    for (var query = getQuery(), elements = query("[data-responsive-image],[responsive-image]"), i = 0, j = elements.length; i < j; i++) attachResponsiveImage(elements[i])
                }

                function extractQuery(css) {
                    var match, smatch, attrs, attrMatch;
                    for (css = css.replace(/'/g, '"'); null !== (match = regex.exec(css));)
                        for (smatch = match[1] + match[3], attrs = match[2]; null !== (attrMatch = attrRegex.exec(attrs));) queueQuery(smatch, attrMatch[1], attrMatch[2], attrMatch[3])
                }

                function readRules(rules) {
                    var selector = "";
                    if (rules)
                        if ("string" == typeof rules) rules = rules.toLowerCase(), -1 === rules.indexOf("min-width") && -1 === rules.indexOf("max-width") || extractQuery(rules);
                        else
                            for (var i = 0, j = rules.length; i < j; i++) 1 === rules[i].type ? (selector = rules[i].selectorText || rules[i].cssText, -1 !== selector.indexOf("min-height") || -1 !== selector.indexOf("max-height") ? extractQuery(selector) : -1 === selector.indexOf("min-width") && -1 === selector.indexOf("max-width") || extractQuery(selector)) : 4 === rules[i].type ? readRules(rules[i].cssRules || rules[i].rules) : 3 === rules[i].type && readRules(rules[i].styleSheet.cssRules)
                }
                var cssStyleElement, allQueries = {},
                    idToSelectorMapping = [],
                    regex = /,?[\s\t]*([^,\n]*?)((?:\[[\s\t]*?(?:min|max)-(?:width|height)[\s\t]*?[~$\^]?=[\s\t]*?"[^"]*?"[\s\t]*?])+)([^,\n\s\{]*)/gim,
                    attrRegex = /\[[\s\t]*?(min|max)-(width|height)[\s\t]*?[~$\^]?=[\s\t]*?"([^"]*?)"[\s\t]*?]/gim,
                    defaultCssInjected = !1;
                this.init = function() {
                    var animationStart = "animationstart";
                    void 0 !== document.documentElement.style.webkitAnimationName ? animationStart = "webkitAnimationStart" : void 0 !== document.documentElement.style.MozAnimationName ? animationStart = "mozanimationstart" : void 0 !== document.documentElement.style.OAnimationName && (animationStart = "oanimationstart"), document.body.addEventListener(animationStart, function(e) {
                        var element = e.target;
                        if (-1 !== window.getComputedStyle(element, null).getPropertyValue("animation-name").indexOf("element-queries")) {
                            element.elementQueriesSensor = new ResizeSensor(element, function() {
                                element.elementQueriesSetupInformation && element.elementQueriesSetupInformation.call()
                            });
                            var sensorStyles = window.getComputedStyle(element.resizeSensor, null),
                                id = sensorStyles.getPropertyValue("min-width");
                            id = parseInt(id.replace("px", "")), setupElement(e.target, idToSelectorMapping[id])
                        }
                    }), defaultCssInjected || (cssStyleElement = document.createElement("style"), cssStyleElement.type = "text/css", cssStyleElement.innerHTML = "[responsive-image] > img, [data-responsive-image] {overflow: hidden; padding: 0; } [responsive-image] > img, [data-responsive-image] > img {width: 100%;}", cssStyleElement.innerHTML += "\n@keyframes element-queries { 0% { visibility: inherit; } }", document.getElementsByTagName("head")[0].appendChild(cssStyleElement), defaultCssInjected = !0);
                    for (var i = 0, j = document.styleSheets.length; i < j; i++) try {
                        document.styleSheets[i].href && 0 === document.styleSheets[i].href.indexOf("file://") && console.log("CssElementQueries: unable to parse local css files, " + document.styleSheets[i].href), readRules(document.styleSheets[i].cssRules || document.styleSheets[i].rules || document.styleSheets[i].cssText)
                    } catch (e) {}
                    findResponsiveImages()
                }, this.findElementQueriesElements = function(container) {
                    findElementQueriesElements(container)
                }, this.update = function() {
                    this.init()
                }
            };
            ElementQueries.update = function() {
                ElementQueries.instance.update()
            }, ElementQueries.detach = function(element) {
                element.elementQueriesSetupInformation ? (element.elementQueriesSensor.detach(), delete element.elementQueriesSetupInformation, delete element.elementQueriesSensor) : element.resizeSensor && (element.resizeSensor.detach(), delete element.resizeSensor)
            }, ElementQueries.init = function() {
                ElementQueries.instance || (ElementQueries.instance = new ElementQueries), ElementQueries.instance.init()
            };
            var domLoaded = function(callback) {
                if (document.addEventListener) document.addEventListener("DOMContentLoaded", callback, !1);
                else if (/KHTML|WebKit|iCab/i.test(navigator.userAgent)) var DOMLoadTimer = setInterval(function() {
                    /loaded|complete/i.test(document.readyState) && (callback(), clearInterval(DOMLoadTimer))
                }, 10);
                else window.onload = callback
            };
            return ElementQueries.findElementQueriesElements = function(container) {
                ElementQueries.instance.findElementQueriesElements(container)
            }, ElementQueries.listen = function() {
                domLoaded(ElementQueries.init)
            }, ElementQueries
        }),
        function($) {
            "use strict";
            $.exists = function(selector) {
                return $(selector).length > 0
            }, $.getCachedScript = function(url) {
                var options = {
                    dataType: "script",
                    cache: !0,
                    url: url
                };
                return $.ajax(options)
            }, $.fn.mk_imagesLoaded = function() {
                var $imgs = this.find('img[src!=""]');
                if (!$imgs.length) return $.Deferred().resolve().promise();
                var dfds = [];
                return $imgs.each(function() {
                    var dfd = $.Deferred();
                    dfds.push(dfd);
                    var img = new Image;
                    img.onload = function() {
                        dfd.resolve()
                    }, img.onerror = function() {
                        dfd.resolve()
                    }, img.src = this.src
                }), $.when.apply($, dfds)
            }
        }(jQuery),
        function() {
            function resetTriggers(element) {
                var triggers = element.__resizeTriggers__,
                    expand = triggers.firstElementChild,
                    contract = triggers.lastElementChild,
                    expandChild = expand.firstElementChild;
                contract.scrollLeft = contract.scrollWidth, contract.scrollTop = contract.scrollHeight, expandChild.style.width = expand.offsetWidth + 1 + "px", expandChild.style.height = expand.offsetHeight + 1 + "px", expand.scrollLeft = expand.scrollWidth, expand.scrollTop = expand.scrollHeight
            }

            function checkTriggers(element) {
                return element.offsetWidth != element.__resizeLast__.width || element.offsetHeight != element.__resizeLast__.height
            }

            function scrollListener(e) {
                var element = this;
                resetTriggers(this), this.__resizeRAF__ && cancelFrame(this.__resizeRAF__), this.__resizeRAF__ = requestFrame(function() {
                    checkTriggers(element) && (element.__resizeLast__.width = element.offsetWidth, element.__resizeLast__.height = element.offsetHeight, element.__resizeListeners__.forEach(function(fn) {
                        fn.call(element, e)
                    }))
                })
            }

            function createStyles() {
                if (!stylesCreated) {
                    var css = (animationKeyframes || "") + ".resize-triggers { " + (animationStyle || "") + 'visibility: hidden; opacity: 0; } .resize-triggers, .resize-triggers > div, .contract-trigger:before { content: " "; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; } .resize-triggers > div { background: #eee; overflow: auto; } .contract-trigger:before { width: 200%; height: 200%; }',
                        head = document.head || document.getElementsByTagName("head")[0],
                        style = document.createElement("style");
                    style.type = "text/css", style.styleSheet ? style.styleSheet.cssText = css : style.appendChild(document.createTextNode(css)), head.appendChild(style), stylesCreated = !0
                }
            }
            var attachEvent = document.attachEvent,
                stylesCreated = !1;
            if (!attachEvent) {
                var requestFrame = function() {
                        var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function(fn) {
                            return window.setTimeout(fn, 20)
                        };
                        return function(fn) {
                            return raf(fn)
                        }
                    }(),
                    cancelFrame = function() {
                        var cancel = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.clearTimeout;
                        return function(id) {
                            return cancel(id)
                        }
                    }(),
                    animation = !1,
                    keyframeprefix = "",
                    animationstartevent = "animationstart",
                    domPrefixes = "Webkit Moz O ms".split(" "),
                    startEvents = "webkitAnimationStart animationstart oAnimationStart MSAnimationStart".split(" "),
                    pfx = "",
                    elm = document.createElement("fakeelement");
                if (void 0 !== elm.style.animationName && (animation = !0), !1 === animation)
                    for (var i = 0; i < domPrefixes.length; i++)
                        if (void 0 !== elm.style[domPrefixes[i] + "AnimationName"]) {
                            pfx = domPrefixes[i], pfx + "Animation", keyframeprefix = "-" + pfx.toLowerCase() + "-", animationstartevent = startEvents[i], animation = !0;
                            break
                        }
                var animationName = "resizeanim",
                    animationKeyframes = "@" + keyframeprefix + "keyframes " + animationName + " { from { opacity: 0; } to { opacity: 0; } } ",
                    animationStyle = keyframeprefix + "animation: 1ms " + animationName + "; "
            }
            window.addResizeListener = function(element, fn) {
                attachEvent ? element.attachEvent("onresize", fn) : (element.__resizeTriggers__ || ("static" == getComputedStyle(element).position && (element.style.position = "relative"), createStyles(), element.__resizeLast__ = {}, element.__resizeListeners__ = [], (element.__resizeTriggers__ = document.createElement("div")).className = "resize-triggers", element.__resizeTriggers__.innerHTML = '<div class="expand-trigger"><div></div></div><div class="contract-trigger"></div>', element.appendChild(element.__resizeTriggers__), resetTriggers(element), element.addEventListener("scroll", scrollListener, !0), animationstartevent && element.__resizeTriggers__.addEventListener(animationstartevent, function(e) {
                    e.animationName == animationName && resetTriggers(element)
                })), element.__resizeListeners__.push(fn))
            }, window.removeResizeListener = function(element, fn) {
                attachEvent ? element.detachEvent("onresize", fn) : (element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1), element.__resizeListeners__.length || (element.removeEventListener("scroll", scrollListener), element.__resizeTriggers__ = !element.removeChild(element.__resizeTriggers__)))
            }
        }(),
        function(window, document) {
            function addStyleSheet(ownerDocument, cssText) {
                var p = ownerDocument.createElement("p"),
                    parent = ownerDocument.getElementsByTagName("head")[0] || ownerDocument.documentElement;
                return p.innerHTML = "x<style>" + cssText + "</style>", parent.insertBefore(p.lastChild, parent.firstChild)
            }

            function getElements() {
                var elements = html5.elements;
                return "string" == typeof elements ? elements.split(" ") : elements
            }

            function addElements(newElements, ownerDocument) {
                var elements = html5.elements;
                "string" != typeof elements && (elements = elements.join(" ")), "string" != typeof newElements && (newElements = newElements.join(" ")), html5.elements = elements + " " + newElements, shivDocument(ownerDocument)
            }

            function getExpandoData(ownerDocument) {
                var data = expandoData[ownerDocument[expando]];
                return data || (data = {}, expanID++, ownerDocument[expando] = expanID, expandoData[expanID] = data), data
            }

            function createElement(nodeName, ownerDocument, data) {
                if (ownerDocument || (ownerDocument = document), supportsUnknownElements) return ownerDocument.createElement(nodeName);
                data || (data = getExpandoData(ownerDocument));
                var node;
                return node = data.cache[nodeName] ? data.cache[nodeName].cloneNode() : saveClones.test(nodeName) ? (data.cache[nodeName] = data.createElem(nodeName)).cloneNode() : data.createElem(nodeName), !node.canHaveChildren || reSkip.test(nodeName) || node.tagUrn ? node : data.frag.appendChild(node)
            }

            function createDocumentFragment(ownerDocument, data) {
                if (ownerDocument || (ownerDocument = document), supportsUnknownElements) return ownerDocument.createDocumentFragment();
                data = data || getExpandoData(ownerDocument);
                for (var clone = data.frag.cloneNode(), i = 0, elems = getElements(), l = elems.length; i < l; i++) clone.createElement(elems[i]);
                return clone
            }

            function shivMethods(ownerDocument, data) {
                data.cache || (data.cache = {}, data.createElem = ownerDocument.createElement, data.createFrag = ownerDocument.createDocumentFragment, data.frag = data.createFrag()), ownerDocument.createElement = function(nodeName) {
                    return html5.shivMethods ? createElement(nodeName, ownerDocument, data) : data.createElem(nodeName)
                }, ownerDocument.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + getElements().join().replace(/[\w\-:]+/g, function(nodeName) {
                    return data.createElem(nodeName), data.frag.createElement(nodeName), 'c("' + nodeName + '")'
                }) + ");return n}")(html5, data.frag)
            }

            function shivDocument(ownerDocument) {
                ownerDocument || (ownerDocument = document);
                var data = getExpandoData(ownerDocument);
                return !html5.shivCSS || supportsHtml5Styles || data.hasCSS || (data.hasCSS = !!addStyleSheet(ownerDocument, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), supportsUnknownElements || shivMethods(ownerDocument, data), ownerDocument
            }
            var supportsHtml5Styles, supportsUnknownElements, options = window.html5 || {},
                reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
                saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
                expando = "_html5shiv",
                expanID = 0,
                expandoData = {};
            ! function() {
                try {
                    var a = document.createElement("a");
                    a.innerHTML = "<xyz></xyz>", supportsHtml5Styles = "hidden" in a, supportsUnknownElements = 1 == a.childNodes.length || function() {
                        document.createElement("a");
                        var frag = document.createDocumentFragment();
                        return void 0 === frag.cloneNode || void 0 === frag.createDocumentFragment || void 0 === frag.createElement
                    }()
                } catch (e) {
                    supportsHtml5Styles = !0, supportsUnknownElements = !0
                }
            }();
            var html5 = {
                elements: options.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",
                version: "3.7.3",
                shivCSS: !1 !== options.shivCSS,
                supportsUnknownElements: supportsUnknownElements,
                shivMethods: !1 !== options.shivMethods,
                type: "default",
                shivDocument: shivDocument,
                createElement: createElement,
                createDocumentFragment: createDocumentFragment,
                addElements: addElements
            };
            window.html5 = html5, shivDocument(document), "object" == typeof module && module.exports && (module.exports = html5)
        }("undefined" != typeof window ? window : this, document), window.matchMedia || (window.matchMedia = function() {
            "use strict";
            var styleMedia = window.styleMedia || window.media;
            if (!styleMedia) {
                var style = document.createElement("style"),
                    script = document.getElementsByTagName("script")[0],
                    info = null;
                style.type = "text/css", style.id = "matchmediajs-test", script.parentNode.insertBefore(style, script), info = "getComputedStyle" in window && window.getComputedStyle(style, null) || style.currentStyle, styleMedia = {
                    matchMedium: function(media) {
                        var text = "@media " + media + "{ #matchmediajs-test { width: 1px; } }";
                        return style.styleSheet ? style.styleSheet.cssText = text : style.textContent = text, "1px" === info.width
                    }
                }
            }
            return function(media) {
                return {
                    matches: styleMedia.matchMedium(media || "all"),
                    media: media || "all"
                }
            }
        }()),
        function(global) {
            "use strict";

            function noop() {}

            function safeActiveElement() {
                try {
                    return document.activeElement
                } catch (err) {}
            }

            function inArray(arr, item) {
                for (var i = 0, len = arr.length; i < len; i++)
                    if (arr[i] === item) return !0;
                return !1
            }

            function addEventListener(elem, event, fn) {
                return elem.addEventListener ? elem.addEventListener(event, fn, !1) : elem.attachEvent ? elem.attachEvent("on" + event, fn) : void 0
            }

            function moveCaret(elem, index) {
                var range;
                elem.createTextRange ? (range = elem.createTextRange(), range.move("character", index), range.select()) : elem.selectionStart && (elem.focus(), elem.setSelectionRange(index, index))
            }

            function changeType(elem, type) {
                try {
                    return elem.type = type, !0
                } catch (e) {
                    return !1
                }
            }

            function handleElem(node, callback) {
                if (node && node.getAttribute(ATTR_CURRENT_VAL)) callback(node);
                else
                    for (var elem, handleInputs = node ? node.getElementsByTagName("input") : inputs, handleTextareas = node ? node.getElementsByTagName("textarea") : textareas, handleInputsLength = handleInputs ? handleInputs.length : 0, handleTextareasLength = handleTextareas ? handleTextareas.length : 0, len = handleInputsLength + handleTextareasLength, i = 0; i < len; i++) elem = i < handleInputsLength ? handleInputs[i] : handleTextareas[i - handleInputsLength], callback(elem)
            }

            function disablePlaceholders(node) {
                handleElem(node, hidePlaceholder)
            }

            function enablePlaceholders(node) {
                handleElem(node, showPlaceholder)
            }

            function hidePlaceholder(elem, keydownValue) {
                var valueChanged = !!keydownValue && elem.value !== keydownValue,
                    isPlaceholderValue = elem.value === elem.getAttribute(ATTR_CURRENT_VAL);
                if ((valueChanged || isPlaceholderValue) && "true" === elem.getAttribute(ATTR_ACTIVE)) {
                    elem.removeAttribute(ATTR_ACTIVE), elem.value = elem.value.replace(elem.getAttribute(ATTR_CURRENT_VAL), ""), elem.className = elem.className.replace(classNameRegExp, "");
                    var maxLength = elem.getAttribute(ATTR_MAXLENGTH);
                    parseInt(maxLength, 10) >= 0 && (elem.setAttribute("maxLength", maxLength), elem.removeAttribute(ATTR_MAXLENGTH));
                    var type = elem.getAttribute(ATTR_INPUT_TYPE);
                    return type && (elem.type = type), !0
                }
                return !1
            }

            function showPlaceholder(elem) {
                var val = elem.getAttribute(ATTR_CURRENT_VAL);
                if ("" === elem.value && val) {
                    elem.setAttribute(ATTR_ACTIVE, "true"), elem.value = val, elem.className += " " + placeholderClassName;
                    elem.getAttribute(ATTR_MAXLENGTH) || (elem.setAttribute(ATTR_MAXLENGTH, elem.maxLength), elem.removeAttribute("maxLength"));
                    return elem.getAttribute(ATTR_INPUT_TYPE) ? elem.type = "text" : "password" === elem.type && changeType(elem, "text") && elem.setAttribute(ATTR_INPUT_TYPE, "password"), !0
                }
                return !1
            }

            function makeFocusHandler(elem) {
                return function() {
                    hideOnInput && elem.value === elem.getAttribute(ATTR_CURRENT_VAL) && "true" === elem.getAttribute(ATTR_ACTIVE) ? moveCaret(elem, 0) : hidePlaceholder(elem)
                }
            }

            function makeBlurHandler(elem) {
                return function() {
                    showPlaceholder(elem)
                }
            }

            function makeSubmitHandler(form) {
                return function() {
                    disablePlaceholders(form)
                }
            }

            function makeKeydownHandler(elem) {
                return function(e) {
                    if (keydownVal = elem.value, "true" === elem.getAttribute(ATTR_ACTIVE) && keydownVal === elem.getAttribute(ATTR_CURRENT_VAL) && inArray(badKeys, e.keyCode)) return e.preventDefault && e.preventDefault(), !1
                }
            }

            function makeKeyupHandler(elem) {
                return function() {
                    hidePlaceholder(elem, keydownVal), "" === elem.value && (elem.blur(), moveCaret(elem, 0))
                }
            }

            function makeClickHandler(elem) {
                return function() {
                    elem === safeActiveElement() && elem.value === elem.getAttribute(ATTR_CURRENT_VAL) && "true" === elem.getAttribute(ATTR_ACTIVE) && moveCaret(elem, 0)
                }
            }

            function newElement(elem) {
                var form = elem.form;
                form && "string" == typeof form && (form = document.getElementById(form), form.getAttribute(ATTR_FORM_HANDLED) || (addEventListener(form, "submit", makeSubmitHandler(form)), form.setAttribute(ATTR_FORM_HANDLED, "true"))), addEventListener(elem, "focus", makeFocusHandler(elem)), addEventListener(elem, "blur", makeBlurHandler(elem)), hideOnInput && (addEventListener(elem, "keydown", makeKeydownHandler(elem)), addEventListener(elem, "keyup", makeKeyupHandler(elem)), addEventListener(elem, "click", makeClickHandler(elem))), elem.setAttribute(ATTR_EVENTS_BOUND, "true"), elem.setAttribute(ATTR_CURRENT_VAL, placeholder), (hideOnInput || elem !== safeActiveElement()) && showPlaceholder(elem)
            }
            var test = document.createElement("input"),
                nativeSupport = void 0 !== test.placeholder;
            if (global.Placeholders = {
                    nativeSupport: nativeSupport,
                    disable: nativeSupport ? noop : disablePlaceholders,
                    enable: nativeSupport ? noop : enablePlaceholders
                }, !nativeSupport) {
                var keydownVal, validTypes = ["text", "search", "url", "tel", "email", "password", "number", "textarea"],
                    badKeys = [27, 33, 34, 35, 36, 37, 38, 39, 40, 8, 46],
                    placeholderClassName = "placeholdersjs",
                    classNameRegExp = new RegExp("(?:^|\\s)" + placeholderClassName + "(?!\\S)"),
                    ATTR_CURRENT_VAL = "data-placeholder-value",
                    ATTR_ACTIVE = "data-placeholder-active",
                    ATTR_INPUT_TYPE = "data-placeholder-type",
                    ATTR_FORM_HANDLED = "data-placeholder-submit",
                    ATTR_EVENTS_BOUND = "data-placeholder-bound",
                    ATTR_MAXLENGTH = "data-placeholder-maxlength",
                    head = document.getElementsByTagName("head")[0],
                    root = document.documentElement,
                    Placeholders = global.Placeholders,
                    inputs = document.getElementsByTagName("input"),
                    textareas = document.getElementsByTagName("textarea"),
                    hideOnInput = "false" === root.getAttribute("data-placeholder-focus"),
                    liveUpdates = "false" !== root.getAttribute("data-placeholder-live"),
                    styleElem = document.createElement("style");
                styleElem.type = "text/css";
                var styleRules = document.createTextNode("." + placeholderClassName + " {color:#ccc;}");
                styleElem.styleSheet ? styleElem.styleSheet.cssText = styleRules.nodeValue : styleElem.appendChild(styleRules), head.insertBefore(styleElem, head.firstChild);
                for (var placeholder, elem, i = 0, len = inputs.length + textareas.length; i < len; i++) elem = i < inputs.length ? inputs[i] : textareas[i - inputs.length], (placeholder = elem.attributes.placeholder) && (placeholder = placeholder.nodeValue) && inArray(validTypes, elem.type) && newElement(elem);
                var timer = setInterval(function() {
                    for (var i = 0, len = inputs.length + textareas.length; i < len; i++) elem = i < inputs.length ? inputs[i] : textareas[i - inputs.length], placeholder = elem.attributes.placeholder, placeholder ? (placeholder = placeholder.nodeValue) && inArray(validTypes, elem.type) && (elem.getAttribute(ATTR_EVENTS_BOUND) || newElement(elem), (placeholder !== elem.getAttribute(ATTR_CURRENT_VAL) || "password" === elem.type && !elem.getAttribute(ATTR_INPUT_TYPE)) && ("password" === elem.type && !elem.getAttribute(ATTR_INPUT_TYPE) && changeType(elem, "text") && elem.setAttribute(ATTR_INPUT_TYPE, "password"), elem.value === elem.getAttribute(ATTR_CURRENT_VAL) && (elem.value = placeholder), elem.setAttribute(ATTR_CURRENT_VAL, placeholder))) : elem.getAttribute(ATTR_ACTIVE) && (hidePlaceholder(elem), elem.removeAttribute(ATTR_CURRENT_VAL));
                    liveUpdates || clearInterval(timer)
                }, 100);
                addEventListener(global, "beforeunload", function() {
                    Placeholders.disable()
                })
            }
        }(this),
        function() {
            var lastTime, vendors, x;
            for (lastTime = 0, vendors = ["webkit", "moz"], x = 0; x < vendors.length && !window.requestAnimationFrame;) window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] || window[vendors[x] + "CancelRequestAnimationFrame"], ++x;
            window.requestAnimationFrame || (window.requestAnimationFrame = function(callback, element) {
                var currTime, id, timeToCall;
                return currTime = (new Date).getTime(), timeToCall = Math.max(0, 16 - (currTime - lastTime)), id = window.setTimeout(function() {
                    callback(currTime + timeToCall)
                }, timeToCall), lastTime = currTime + timeToCall, id
            }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(id) {
                clearTimeout(id)
            })
        }(),
        function($) {
            "use strict";
            var MK = window.MK || {};
            MK.core = {};
            var _loadedDependencies = [],
                _inQueue = {};
            MK.core.initAll = function(scope) {
                var $el = $(scope).find(".js-el"),
                    $components = $el.filter("[data-mk-component]"),
                    component = null,
                    init = function(name, el) {
                        var $el = $(el);
                        $el.data("init-" + name) || ("function" != typeof MK.component[name] ? console.log("Component init error: ", name) : (component = new MK.component[name](el), component.init(), $el.data("init-" + name, !0), MK.utils.eventManager.publish("component-inited")))
                    };
                $components.each(function() {
                    var self = this,
                        $this = $(this),
                        names = $this.data("mk-component");
                    if ("string" == typeof names) {
                        init(names, self)
                    } else names.forEach(function(name) {
                        init(name, self)
                    })
                })
            }, MK.core.loadDependencies = function(dependencies, callback) {
                var _callback = callback || function() {};
                if (!dependencies) return void _callback();
                var newDeps = dependencies.map(function(dep) {
                    return -1 === _loadedDependencies.indexOf(dep) && (void 0 === _inQueue[dep] ? dep : (_inQueue[dep].push(_callback), !0))
                });
                if (!0 !== newDeps[0]) {
                    if (!1 === newDeps[0]) return void _callback();
                    var queue = newDeps.map(function(script) {
                            return _inQueue[script] = [_callback], $.getCachedScript(script)
                        }),
                        onLoad = function() {
                            newDeps.map(function(loaded) {
                                _inQueue[loaded].forEach(function(callback) {
                                    callback()
                                }), delete _inQueue[loaded], _loadedDependencies.push(loaded)
                            })
                        };
                    $.when.apply(null, queue).done(onLoad)
                }
            }, MK.core.path = {
                theme: mk_theme_dir,
                plugins: mk_theme_js_path + "/plugins/async/min/",
                ajaxUrl: window.PHP.ajax
            }
        }(jQuery),
        function($) {
            "use strict";
            var MK = window.MK || {};
            MK.utils = window.MK.utils || {}, MK.utils.actions = {}, MK.utils.actions.activate = function(el) {
                $(el).addClass("is-active")
            }, MK.utils.actions.deactivate = function(el) {
                $(el).removeClass("is-active")
            }
        }(jQuery),
        function($) {
            "use strict";
            var MK = window.MK || {};
            MK.utils = window.MK.utils || {}, MK.utils.browser = function() {
                var dataBrowser = [{
                        string: navigator.userAgent,
                        subString: "Edge",
                        identity: "Edge"
                    }, {
                        string: navigator.userAgent,
                        subString: "Chrome",
                        identity: "Chrome"
                    }, {
                        string: navigator.userAgent,
                        subString: "MSIE",
                        identity: "IE"
                    }, {
                        string: navigator.userAgent,
                        subString: "Trident",
                        identity: "IE"
                    }, {
                        string: navigator.userAgent,
                        subString: "Firefox",
                        identity: "Firefox"
                    }, {
                        string: navigator.userAgent,
                        subString: "Safari",
                        identity: "Safari"
                    }, {
                        string: navigator.userAgent,
                        subString: "Opera",
                        identity: "Opera"
                    }],
                    versionSearchString = null,
                    searchVersion = function(dataString) {
                        var index = dataString.indexOf(versionSearchString);
                        if (-1 !== index) {
                            var rv = dataString.indexOf("rv:");
                            return "Trident" === versionSearchString && -1 !== rv ? parseFloat(dataString.substring(rv + 3)) : parseFloat(dataString.substring(index + versionSearchString.length + 1))
                        }
                    },
                    name = function(data) {
                        for (var i = 0; i < data.length; i++) {
                            var dataString = data[i].string;
                            if (versionSearchString = data[i].subString, -1 !== dataString.indexOf(data[i].subString)) return data[i].identity
                        }
                    }(dataBrowser) || "Other",
                    version = searchVersion(navigator.userAgent) || searchVersion(navigator.appVersion) || "Unknown";
                return $("html").addClass(name).addClass(name + version), {
                    name: name,
                    version: version
                }
            }(), MK.utils.OS = function() {
                return -1 != navigator.appVersion.indexOf("Win") ? "Windows" : -1 != navigator.appVersion.indexOf("Mac") ? "OSX" : -1 != navigator.appVersion.indexOf("X11") ? "UNIX" : -1 != navigator.appVersion.indexOf("Linux") ? "Linux" : void 0
            }(), MK.utils.isMobile = function() {
                return function() {
                    return navigator.userAgent.match(/Android/i)
                }() || function() {
                    return navigator.userAgent.match(/BlackBerry/i)
                }() || function() {
                    return navigator.userAgent.match(/iPhone|iPad|iPod/i)
                }() || function() {
                    return navigator.userAgent.match(/Opera Mini/i)
                }() || function() {
                    return navigator.userAgent.match(/IEMobile/i)
                }() || matchMedia("(max-width: 1024px)").matches
            }, MK.utils.isResponsiveMenuState = function() {
                return window.matchMedia("(max-width: " + mk_responsive_nav_width + "px)").matches
            }, MK.utils.getUrlParameter = function(sParam) {
                var sParameterName, i, sPageURL = decodeURIComponent(window.location.search.substring(1)),
                    sURLVariables = sPageURL.split("&");
                for (i = 0; i < sURLVariables.length; i++)
                    if (sParameterName = sURLVariables[i].split("="), sParameterName[0] === sParam) return void 0 === sParameterName[1] || sParameterName[1]
            }, MK.utils.isSmoothScroll = function() {
                return "true" === mk_smooth_scroll
            }(), MK.utils.showBackgroundVideo = function() {
                return "true" === mk_show_background_video
            }()
        }(jQuery),
        function($) {
            "use strict";
            var MK = window.MK || {};
            MK.utils = window.MK.utils || {}, MK.utils.eventManager = {}, MK.utils.eventManager.subscribe = function(evt, func) {
                $(this).on(evt, func)
            }, MK.utils.eventManager.unsubscribe = function(evt, func) {
                $(this).off(evt, func)
            }, MK.utils.eventManager.publish = function(evt, params) {
                $(this).trigger(evt, [params])
            }
        }(jQuery),
        function($) {
            "use strict";
            var MK = window.MK || {};
            MK.utils = window.MK.utils || {}, MK.utils.fullscreen = {}, MK.utils.launchIntoFullscreen = function(element) {
                element.requestFullscreen ? element.requestFullscreen() : element.mozRequestFullScreen ? element.mozRequestFullScreen() : element.webkitRequestFullscreen ? element.webkitRequestFullscreen() : element.msRequestFullscreen && element.msRequestFullscreen()
            }, MK.utils.exitFullscreen = function() {
                document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen()
            }
        }(jQuery),
        function($) {
            "use strict";
            var MK = window.MK || {};
            MK.utils = window.MK.utils || {}, MK.utils.misc = {}, MK.utils.offsets = function($els) {
                return $.map($els, function(el) {
                    return $(el).offset().top
                })
            }, MK.utils.nextHigherVal = function(val, arr) {
                var i = 0,
                    higher = null,
                    check = function() {
                        val > arr[i] ? (i += 1, check()) : higher = arr[i]
                    };
                return check(), higher
            }, MK.utils.throttle = function(delay, fn) {
                var last, deferTimer;
                return function() {
                    var context = this,
                        args = arguments,
                        now = +new Date;
                    last && now < last + delay ? (clearTimeout(deferTimer), deferTimer = setTimeout(function() {
                        last = now, fn.apply(context, args)
                    }, delay)) : (last = now, fn.apply(context, args))
                }
            }, MK.utils.isElementInViewport = function(el) {
                return el.getBoundingClientRect().top < window.innerHeight
            }
        }(jQuery),
        function($) {
            "use strict";
            var MK = window.MK || {};
            MK.utils = window.MK.utils || {}, MK.utils.scrollTo = function(offset) {
                $("html, body").stop().animate({
                    scrollTop: offset
                }, {
                    duration: 1200,
                    easing: "easeInOutExpo"
                })
            }, MK.utils.scrollToAnchor = function(hash) {
                hash = hash.substring(1).replace(/[!"#$%&'()*+,./:;<=>?@[\]^`{|}~]/g, "\\$&"), hash = "#" + hash;
                var $target = $(hash);
                if ($target.length) {
                    var offset = $target.offset().top;
                    offset -= MK.val.offsetHeaderHeight(offset), "#top-of-page" === hash ? window.history.replaceState(void 0, void 0, " ") : window.history.replaceState(void 0, void 0, hash), MK.utils.scrollTo(offset)
                }
            }, MK.utils.scroll = function() {
                function preventDefault(e) {
                    e = e || window.event, e.preventDefault(), e.returnValue = !1
                }

                function wheel(e) {
                    preventDefault(e)
                }

                function keydown(e) {
                    for (var i = keys.length; i--;)
                        if (e.keyCode === keys[i]) return void preventDefault(e)
                }

                function disableScroll() {
                    window.addEventListener && window.addEventListener("DOMMouseScroll", wheel, !1), window.onmousewheel = document.onmousewheel = wheel, document.onkeydown = keydown
                }

                function enableScroll() {
                    window.removeEventListener && window.removeEventListener("DOMMouseScroll", wheel, !1), window.onmousewheel = document.onmousewheel = document.onkeydown = null
                }
                var keys = [38, 40];
                return {
                    disable: disableScroll,
                    enable: enableScroll
                }
            }(), MK.utils.detectAnchor = function(el) {
                var $this = $(el),
                    loc = window.location,
                    href = (loc.origin, loc.pathname, $this.attr("href")),
                    linkSplit = href ? href.split("#") : "",
                    hrefHash = (linkSplit[0] && linkSplit[0], linkSplit[1] ? linkSplit[1] : "");
                return void 0 !== hrefHash && "" !== hrefHash && "#" + hrefHash
            }, MK.utils.scrollToURLHash = function() {
                var loc = window.location,
                    hash = loc.hash;
                hash.length && hash.substring(1).length && (hash = hash.replace("!loading", ""), setTimeout(function() {
                    MK.utils.scrollToAnchor(hash)
                }, 1e3), setTimeout(function() {
                    window.history.replaceState(void 0, void 0, hash)
                }, 1001))
            }, MK.utils.scrollSpy = function(toSpy, config) {
                var $window = $(window),
                    container = document.getElementById("mk-theme-container"),
                    isObj = "object" == typeof toSpy,
                    offset = isObj ? MK.val.dynamicOffset(toSpy, config.position, config.threshold) : function() {
                        return toSpy
                    },
                    height = isObj ? MK.val.dynamicHeight(toSpy) : function() {
                        return 0
                    },
                    cacheVals = {},
                    _p = "before",
                    checkPosition = function() {
                        var s = MK.val.scroll(),
                            o = offset(),
                            h = height();
                        s < o && "before" !== _p ? (config.before && config.before(), _p = "before") : s >= o && s <= o + h && "active" !== _p ? (config.active && config.active(o), _p = "active") : s > o + h && "after" !== _p && (config.after && config.after(o + h), _p = "after")
                    },
                    rAF = function() {
                        window.requestAnimationFrame(checkPosition)
                    },
                    exportVals = function() {
                        return cacheVals
                    },
                    updateCache = function() {
                        var o = offset(),
                            h = height();
                        cacheVals = {
                            before: o - $window.height(),
                            active: o,
                            after: o + h
                        }
                    };
                config.cache && config.cache(exportVals), checkPosition(), $window.on("load", checkPosition), $window.on("resize", checkPosition), $window.on("mouseup", checkPosition), window.addResizeListener(container, checkPosition), $window.on("scroll", rAF), updateCache(), $window.on("load", updateCache), $window.on("resize", updateCache), window.addResizeListener(container, updateCache)
            }
        }(jQuery),
        function($) {
            "use strict";
            $("body").on("click touchend", ".js-taphover", function(e) {
                var $link = $(e.currentTarget),
                    $target = $(e.target);
                if ($link.hasClass("hover")) return !0;
                MK.utils.isMobile() && (!$target.hasClass("hover-icon") && !$target.closest(".hover-icon").length || $target.closest(".js-taphover").hasClass("hover") || e.preventDefault(), $link.addClass("hover"), $(".js-taphover").not(e.currentTarget).removeClass("hover"), e.stopPropagation())
            }), $(document).on("click", function(e) {
                $(".js-taphover").removeClass("hover")
            })
        }(jQuery),
        function($) {
            "use strict";

            function calc() {
                wrapperHeight = $wrapper.height(), wrapperWidth = $wrapper.width(), wrapperAspectRatio = wrapperHeight / wrapperWidth * 100
            }

            function apply() {
                var width = wrapperAspectRatio / baseAspectRatio * 100,
                    widthOverflow = width - 100;
                $videoHolder.css({
                    "padding-top": wrapperAspectRatio + "%",
                    width: width + "%",
                    left: -widthOverflow / 2 + "%"
                })
            }

            function reset() {
                $videoHolder.css({
                    "padding-top": baseAspectRatio + "%",
                    width: "100%",
                    left: 0
                })
            }

            function setCover() {
                reset(), calc(), wrapperAspectRatio > baseAspectRatio && apply()
            }
            var wrapperHeight, wrapperWidth, wrapperAspectRatio, $videoHolder = $(".mk-center-video"),
                $wrapper = $videoHolder.parent(),
                baseAspectRatio = 56.25;
            $(window).on("load", setCover), $(window).on("resize", setCover)
        }(jQuery),
        function($) {
            "use strict";
            var MK = window.MK || {};
            MK.val = {}, MK.val.scroll = function() {
                var offset = 0,
                    $window = $(window),
                    hasPageYOffset = void 0 !== window.pageYOffset,
                    body = document.documentElement || document.body.parentNode || document.body,
                    update = function() {
                        offset = hasPageYOffset ? window.pageYOffset : body.scrollTop
                    },
                    rAF = function() {
                        window.requestAnimationFrame(update)
                    };
                return update(), $window.on("load", update), $window.on("resize", update), $window.on("scroll", rAF),
                    function() {
                        return offset
                    }
            }(), MK.val.viewportPercentHeight = function(percent) {
                return $(window).height() * (percent / 100)
            }, MK.val.adminbarHeight = function() {
                return php.hasAdminbar ? window.matchMedia("( max-width: 782px )").matches ? 46 : 32 : 0
            }, MK.val.stickyOffset = function() {
                var $header = $(".mk-header").not(".js-header-shortcode").first();
                if (!$header.length) return function() {
                    return 0
                };
                var $toolbar = $header.find(".mk-header-toolbar"),
                    config = $header.data(),
                    hasToolbar = $toolbar.length,
                    toolbarHeight = hasToolbar ? $toolbar.height() : 0,
                    isVertical = 4 === config.headerStyle,
                    headerHeight = isVertical ? 0 : config.height,
                    type = "number" == typeof config.stickyOffset && "number" || "header" === config.stickyOffset && "header" || "percent",
                    stickyOffset = 0,
                    setOffset = function() {
                        toolbarHeight = hasToolbar ? $toolbar.height() : 0, MK.utils.isResponsiveMenuState() && (headerHeight = config.responsiveHeight, hasToolbar && $toolbar.is(":hidden") && (toolbarHeight = 0)), "number" === type ? stickyOffset = config.stickyOffset : "header" === type ? stickyOffset = headerHeight + toolbarHeight + MK.val.adminbarHeight() : "percent" === type && (stickyOffset = MK.val.viewportPercentHeight(parseInt(config.stickyOffset)))
                    };
                return setOffset(), $(window).on("resize", setOffset),
                    function() {
                        return stickyOffset
                    }
            }(), MK.val.offsetHeaderHeight = function() {
                var $header = $(".mk-header").not(".js-header-shortcode").first();
                if (!$header.length) return function() {
                    return 0
                };
                var $toolbar = $header.find(".mk-header-toolbar"),
                    config = $header.data(),
                    stickyHeight = config.stickyHeight,
                    desktopHeight = config.height,
                    mobileHeight = config.responsiveHeight,
                    isTransparent = $header.hasClass("transparent-header"),
                    isSticky = config.stickyStyle.length,
                    isStickyLazy = "lazy" === config.stickyStyle,
                    isVertical = 4 === config.headerStyle,
                    hasToolbar = $toolbar.length,
                    toolbarHeight = hasToolbar ? $toolbar.height() : 0;
                2 === config.headerStyle && (stickyHeight = $header.find(".mk-header-nav-container").outerHeight());
                var $innerHeader = $header.find(".mk-header-inner"),
                    headerHeight = ($innerHeader.length, function(offset) {
                        toolbarHeight = hasToolbar ? $toolbar.height() : 0;
                        var stickyOffset = MK.val.stickyOffset();
                        if (MK.utils.isResponsiveMenuState()) {
                            hasToolbar && $toolbar.is(":hidden") && (toolbarHeight = 0);
                            var headerBorder = 0;
                            headerBorder = parseInt($innerHeader.css("border-bottom-width"));
                            var totalHeight = mobileHeight + MK.val.adminbarHeight() + toolbarHeight + headerBorder;
                            return offset <= totalHeight ? totalHeight : MK.val.adminbarHeight()
                        }
                        if (offset <= stickyOffset) return isVertical ? hasToolbar ? toolbarHeight + MK.val.adminbarHeight() : MK.val.adminbarHeight() : isTransparent ? MK.val.adminbarHeight() : desktopHeight + toolbarHeight + MK.val.adminbarHeight();
                        if (offset > stickyOffset) {
                            if (isVertical) return MK.val.adminbarHeight();
                            if (!isSticky) return MK.val.adminbarHeight();
                            if (isStickyLazy) return MK.val.adminbarHeight();
                            if (isSticky) return stickyHeight + MK.val.adminbarHeight()
                        }
                        return 0
                    });
                return function(offset) {
                    return headerHeight(offset - MK.val.adminbarHeight())
                }
            }(), MK.val.dynamicOffset = function(el, position, threshold) {
                var $window = $(window),
                    $el = $(el),
                    pos = position || "top",
                    thr = threshold || 0,
                    container = document.getElementById("mk-theme-container"),
                    currentPos = 0,
                    offset = 0,
                    winH = 0,
                    rect = 0,
                    x = 0,
                    update = function() {
                        winH = $window.height(), rect = $el[0].getBoundingClientRect(), offset = rect.top + MK.val.scroll(), x = "top" === pos ? MK.val.offsetHeaderHeight(offset) : winH + (rect.height - thr), currentPos = offset - x - 1
                    };
                return update(), $window.on("load", update), $window.on("resize", update), window.addResizeListener(container, update),
                    function() {
                        return currentPos
                    }
            }, MK.val.dynamicHeight = function(el) {
                var $window = $(window),
                    $el = $(el),
                    container = document.getElementById("mk-theme-container"),
                    currentHeight = 0,
                    update = function() {
                        currentHeight = $el.outerHeight()
                    };
                return update(), $window.on("load", update), $window.on("resize", update), window.addResizeListener(container, update),
                    function() {
                        return currentHeight
                    }
            }
        }(jQuery), jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
            def: "easeOutQuad",
            swing: function(a, b, c, d, e) {
                return jQuery.easing[jQuery.easing.def](a, b, c, d, e)
            },
            easeInQuad: function(a, b, c, d, e) {
                return d * (b /= e) * b + c
            },
            easeOutQuad: function(a, b, c, d, e) {
                return -d * (b /= e) * (b - 2) + c
            },
            easeInOutQuad: function(a, b, c, d, e) {
                return (b /= e / 2) < 1 ? d / 2 * b * b + c : -d / 2 * (--b * (b - 2) - 1) + c
            },
            easeInCubic: function(a, b, c, d, e) {
                return d * (b /= e) * b * b + c
            },
            easeOutCubic: function(a, b, c, d, e) {
                return d * ((b = b / e - 1) * b * b + 1) + c
            },
            easeInOutCubic: function(a, b, c, d, e) {
                return (b /= e / 2) < 1 ? d / 2 * b * b * b + c : d / 2 * ((b -= 2) * b * b + 2) + c
            },
            easeInQuart: function(a, b, c, d, e) {
                return d * (b /= e) * b * b * b + c
            },
            easeOutQuart: function(a, b, c, d, e) {
                return -d * ((b = b / e - 1) * b * b * b - 1) + c
            },
            easeInOutQuart: function(a, b, c, d, e) {
                return (b /= e / 2) < 1 ? d / 2 * b * b * b * b + c : -d / 2 * ((b -= 2) * b * b * b - 2) + c
            },
            easeInQuint: function(a, b, c, d, e) {
                return d * (b /= e) * b * b * b * b + c
            },
            easeOutQuint: function(a, b, c, d, e) {
                return d * ((b = b / e - 1) * b * b * b * b + 1) + c
            },
            easeInOutQuint: function(a, b, c, d, e) {
                return (b /= e / 2) < 1 ? d / 2 * b * b * b * b * b + c : d / 2 * ((b -= 2) * b * b * b * b + 2) + c
            },
            easeInSine: function(a, b, c, d, e) {
                return -d * Math.cos(b / e * (Math.PI / 2)) + d + c
            },
            easeOutSine: function(a, b, c, d, e) {
                return d * Math.sin(b / e * (Math.PI / 2)) + c
            },
            easeInOutSine: function(a, b, c, d, e) {
                return -d / 2 * (Math.cos(Math.PI * b / e) - 1) + c
            },
            easeInExpo: function(a, b, c, d, e) {
                return 0 == b ? c : d * Math.pow(2, 10 * (b / e - 1)) + c
            },
            easeOutExpo: function(a, b, c, d, e) {
                return b == e ? c + d : d * (1 - Math.pow(2, -10 * b / e)) + c
            },
            easeInOutExpo: function(a, b, c, d, e) {
                return 0 == b ? c : b == e ? c + d : (b /= e / 2) < 1 ? d / 2 * Math.pow(2, 10 * (b - 1)) + c : d / 2 * (2 - Math.pow(2, -10 * --b)) + c
            },
            easeInCirc: function(a, b, c, d, e) {
                return -d * (Math.sqrt(1 - (b /= e) * b) - 1) + c
            },
            easeOutCirc: function(a, b, c, d, e) {
                return d * Math.sqrt(1 - (b = b / e - 1) * b) + c
            },
            easeInOutCirc: function(a, b, c, d, e) {
                return (b /= e / 2) < 1 ? -d / 2 * (Math.sqrt(1 - b * b) - 1) + c : d / 2 * (Math.sqrt(1 - (b -= 2) * b) + 1) + c
            },
            easeInElastic: function(a, b, c, d, e) {
                var f = 1.70158,
                    g = 0,
                    h = d;
                if (0 == b) return c;
                if (1 == (b /= e)) return c + d;
                if (g || (g = .3 * e), h < Math.abs(d)) {
                    h = d;
                    var f = g / 4
                } else var f = g / (2 * Math.PI) * Math.asin(d / h);
                return -h * Math.pow(2, 10 * (b -= 1)) * Math.sin(2 * (b * e - f) * Math.PI / g) + c
            },
            easeOutElastic: function(a, b, c, d, e) {
                var f = 1.70158,
                    g = 0,
                    h = d;
                if (0 == b) return c;
                if (1 == (b /= e)) return c + d;
                if (g || (g = .3 * e), h < Math.abs(d)) {
                    h = d;
                    var f = g / 4
                } else var f = g / (2 * Math.PI) * Math.asin(d / h);
                return h * Math.pow(2, -10 * b) * Math.sin(2 * (b * e - f) * Math.PI / g) + d + c
            },
            easeInOutElastic: function(a, b, c, d, e) {
                var f = 1.70158,
                    g = 0,
                    h = d;
                if (0 == b) return c;
                if (2 == (b /= e / 2)) return c + d;
                if (g || (g = .3 * e * 1.5), h < Math.abs(d)) {
                    h = d;
                    var f = g / 4
                } else var f = g / (2 * Math.PI) * Math.asin(d / h);
                return b < 1 ? -.5 * h * Math.pow(2, 10 * (b -= 1)) * Math.sin(2 * (b * e - f) * Math.PI / g) + c : h * Math.pow(2, -10 * (b -= 1)) * Math.sin(2 * (b * e - f) * Math.PI / g) * .5 + d + c
            },
            easeInBack: function(a, b, c, d, e, f) {
                return void 0 == f && (f = 1.70158), d * (b /= e) * b * ((f + 1) * b - f) + c
            },
            easeOutBack: function(a, b, c, d, e, f) {
                return void 0 == f && (f = 1.70158), d * ((b = b / e - 1) * b * ((f + 1) * b + f) + 1) + c
            },
            easeInOutBack: function(a, b, c, d, e, f) {
                return void 0 == f && (f = 1.70158), (b /= e / 2) < 1 ? d / 2 * b * b * ((1 + (f *= 1.525)) * b - f) + c : d / 2 * ((b -= 2) * b * ((1 + (f *= 1.525)) * b + f) + 2) + c
            },
            easeInBounce: function(a, b, c, d, e) {
                return d - jQuery.easing.easeOutBounce(a, e - b, 0, d, e) + c
            },
            easeOutBounce: function(a, b, c, d, e) {
                return (b /= e) < 1 / 2.75 ? 7.5625 * d * b * b + c : b < 2 / 2.75 ? d * (7.5625 * (b -= 1.5 / 2.75) * b + .75) + c : b < 2.5 / 2.75 ? d * (7.5625 * (b -= 2.25 / 2.75) * b + .9375) + c : d * (7.5625 * (b -= 2.625 / 2.75) * b + .984375) + c
            },
            easeInOutBounce: function(a, b, c, d, e) {
                return b < e / 2 ? .5 * jQuery.easing.easeInBounce(a, 2 * b, 0, d, e) + c : .5 * jQuery.easing.easeOutBounce(a, 2 * b - e, 0, d, e) + .5 * d + c
            }
        }),
        function(window, document, $, undefined) {
            "use strict";

            function _run(e, opts) {
                var $target, value, instance, items = [],
                    index = 0;
                e && e.isDefaultPrevented() || (e.preventDefault(), opts = opts || {}, e && e.data && (opts = mergeOpts(e.data.options, opts)), $target = opts.$target || $(e.currentTarget).trigger("blur"), (instance = $.fancybox.getInstance()) && instance.$trigger && instance.$trigger.is($target) || (opts.selector ? items = $(opts.selector) : (value = $target.attr("data-fancybox") || "", value ? (items = e.data ? e.data.items : [], items = items.length ? items.filter('[data-fancybox="' + value + '"]') : $('[data-fancybox="' + value + '"]')) : items = [$target]), index = $(items).index($target), index < 0 && (index = 0), instance = $.fancybox.open(items, opts, index), instance.$trigger = $target))
            }
            if (window.console = window.console || {
                    info: function(stuff) {}
                }, $) {
                if ($.fn.fancybox) return void console.info("fancyBox already initialized");
                var defaults = {
                        closeExisting: !1,
                        loop: !1,
                        gutter: 50,
                        keyboard: !0,
                        preventCaptionOverlap: !0,
                        arrows: !0,
                        infobar: !0,
                        smallBtn: "auto",
                        toolbar: "auto",
                        buttons: ["zoom", "slideShow", "thumbs", "close"],
                        idleTime: 3,
                        protect: !1,
                        modal: !1,
                        image: {
                            preload: !1
                        },
                        ajax: {
                            settings: {
                                data: {
                                    fancybox: !0
                                }
                            }
                        },
                        iframe: {
                            tpl: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" allowfullscreen="allowfullscreen" allow="autoplay; fullscreen" src=""></iframe>',
                            preload: !0,
                            css: {},
                            attr: {
                                scrolling: "auto"
                            }
                        },
                        video: {
                            tpl: '<video class="fancybox-video" controls controlsList="nodownload" poster="{{poster}}"><source src="{{src}}" type="{{format}}" />Sorry, your browser doesn\'t support embedded videos, <a href="{{src}}">download</a> and watch with your favorite video player!</video>',
                            format: "",
                            autoStart: !0
                        },
                        defaultType: "image",
                        animationEffect: "zoom",
                        animationDuration: 366,
                        zoomOpacity: "auto",
                        transitionEffect: "fade",
                        transitionDuration: 366,
                        slideClass: "",
                        baseClass: "",
                        baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-inner"><div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div><div class="fancybox-toolbar">{{buttons}}</div><div class="fancybox-navigation">{{arrows}}</div><div class="fancybox-stage"></div><div class="fancybox-caption"><div class="fancybox-caption__body"></div></div></div></div>',
                        spinnerTpl: '<div class="fancybox-loading"></div>',
                        errorTpl: '<div class="fancybox-error"><p>{{ERROR}}</p></div>',
                        btnTpl: {
                            download: '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}" href="javascript:;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.62 17.09V19H5.38v-1.91zm-2.97-6.96L17 11.45l-5 4.87-5-4.87 1.36-1.32 2.68 2.64V5h1.92v7.77z"/></svg></a>',
                            zoom: '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.7 17.3l-3-3a5.9 5.9 0 0 0-.6-7.6 5.9 5.9 0 0 0-8.4 0 5.9 5.9 0 0 0 0 8.4 5.9 5.9 0 0 0 7.7.7l3 3a1 1 0 0 0 1.3 0c.4-.5.4-1 0-1.5zM8.1 13.8a4 4 0 0 1 0-5.7 4 4 0 0 1 5.7 0 4 4 0 0 1 0 5.7 4 4 0 0 1-5.7 0z"/></svg></button>',
                            close: '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"/></svg></button>',
                            arrowLeft: '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z"/></svg></div></button>',
                            arrowRight: '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z"/></svg></div></button>',
                            smallBtn: '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"/></svg></button>'
                        },
                        parentEl: "body",
                        hideScrollbar: !0,
                        autoFocus: !0,
                        backFocus: !0,
                        trapFocus: !0,
                        fullScreen: {
                            autoStart: !1
                        },
                        touch: {
                            vertical: !0,
                            momentum: !0
                        },
                        hash: null,
                        media: {},
                        slideShow: {
                            autoStart: !1,
                            speed: 3e3
                        },
                        thumbs: {
                            autoStart: !1,
                            hideOnClose: !0,
                            parentEl: ".fancybox-container",
                            axis: "y"
                        },
                        wheel: "auto",
                        onInit: $.noop,
                        beforeLoad: $.noop,
                        afterLoad: $.noop,
                        beforeShow: $.noop,
                        afterShow: $.noop,
                        beforeClose: $.noop,
                        afterClose: $.noop,
                        onActivate: $.noop,
                        onDeactivate: $.noop,
                        clickContent: function(current, event) {
                            return "image" === current.type && "zoom"
                        },
                        clickSlide: "close",
                        clickOutside: "close",
                        dblclickContent: !1,
                        dblclickSlide: !1,
                        dblclickOutside: !1,
                        mobile: {
                            preventCaptionOverlap: !1,
                            idleTime: !1,
                            clickContent: function(current, event) {
                                return "image" === current.type && "toggleControls"
                            },
                            clickSlide: function(current, event) {
                                return "image" === current.type ? "toggleControls" : "close"
                            },
                            dblclickContent: function(current, event) {
                                return "image" === current.type && "zoom"
                            },
                            dblclickSlide: function(current, event) {
                                return "image" === current.type && "zoom"
                            }
                        },
                        lang: "en",
                        i18n: {
                            en: {
                                CLOSE: "Close",
                                NEXT: "Next",
                                PREV: "Previous",
                                ERROR: "The requested content cannot be loaded. <br/> Please try again later.",
                                PLAY_START: "Start slideshow",
                                PLAY_STOP: "Pause slideshow",
                                FULL_SCREEN: "Full screen",
                                THUMBS: "Thumbnails",
                                DOWNLOAD: "Download",
                                SHARE: "Share",
                                ZOOM: "Zoom"
                            },
                            de: {
                                CLOSE: "Schlie&szlig;en",
                                NEXT: "Weiter",
                                PREV: "Zur&uuml;ck",
                                ERROR: "Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es sp&auml;ter nochmal.",
                                PLAY_START: "Diaschau starten",
                                PLAY_STOP: "Diaschau beenden",
                                FULL_SCREEN: "Vollbild",
                                THUMBS: "Vorschaubilder",
                                DOWNLOAD: "Herunterladen",
                                SHARE: "Teilen",
                                ZOOM: "Vergr&ouml;&szlig;ern"
                            }
                        }
                    },
                    $W = $(window),
                    $D = $(document),
                    called = 0,
                    isQuery = function(obj) {
                        return obj && obj.hasOwnProperty && obj instanceof $
                    },
                    requestAFrame = function() {
                        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || function(callback) {
                            return window.setTimeout(callback, 1e3 / 60)
                        }
                    }(),
                    cancelAFrame = function() {
                        return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || function(id) {
                            window.clearTimeout(id)
                        }
                    }(),
                    transitionEnd = function() {
                        var t, el = document.createElement("fakeelement"),
                            transitions = {
                                transition: "transitionend",
                                OTransition: "oTransitionEnd",
                                MozTransition: "transitionend",
                                WebkitTransition: "webkitTransitionEnd"
                            };
                        for (t in transitions)
                            if (void 0 !== el.style[t]) return transitions[t];
                        return "transitionend"
                    }(),
                    forceRedraw = function($el) {
                        return $el && $el.length && $el[0].offsetHeight
                    },
                    mergeOpts = function(opts1, opts2) {
                        var rez = $.extend(!0, {}, opts1, opts2);
                        return $.each(opts2, function(key, value) {
                            $.isArray(value) && (rez[key] = value)
                        }), rez
                    },
                    inViewport = function(elem) {
                        var elemCenter, rez;
                        return !(!elem || elem.ownerDocument !== document) && ($(".fancybox-container").css("pointer-events", "none"), elemCenter = {
                            x: elem.getBoundingClientRect().left + elem.offsetWidth / 2,
                            y: elem.getBoundingClientRect().top + elem.offsetHeight / 2
                        }, rez = document.elementFromPoint(elemCenter.x, elemCenter.y) === elem, $(".fancybox-container").css("pointer-events", ""), rez)
                    },
                    FancyBox = function(content, opts, index) {
                        var self = this;
                        self.opts = mergeOpts({
                            index: index
                        }, $.fancybox.defaults), $.isPlainObject(opts) && (self.opts = mergeOpts(self.opts, opts)), $.fancybox.isMobile && (self.opts = mergeOpts(self.opts, self.opts.mobile)), self.id = self.opts.id || ++called, self.currIndex = parseInt(self.opts.index, 10) || 0, self.prevIndex = null, self.prevPos = null, self.currPos = 0, self.firstRun = !0, self.group = [], self.slides = {}, self.addContent(content), self.group.length && self.init()
                    };
                $.extend(FancyBox.prototype, {
                        init: function() {
                            var $container, buttonStr, self = this,
                                firstItem = self.group[self.currIndex],
                                firstItemOpts = firstItem.opts;
                            firstItemOpts.closeExisting && $.fancybox.close(!0), $("body").addClass("fancybox-active"), !$.fancybox.getInstance() && !1 !== firstItemOpts.hideScrollbar && !$.fancybox.isMobile && document.body.scrollHeight > window.innerHeight && ($("head").append('<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar{margin-right:' + (window.innerWidth - document.documentElement.clientWidth) + "px;}</style>"), $("body").addClass("compensate-for-scrollbar")), buttonStr = "", $.each(firstItemOpts.buttons, function(index, value) {
                                buttonStr += firstItemOpts.btnTpl[value] || ""
                            }), $container = $(self.translate(self, firstItemOpts.baseTpl.replace("{{buttons}}", buttonStr).replace("{{arrows}}", firstItemOpts.btnTpl.arrowLeft + firstItemOpts.btnTpl.arrowRight))).attr("id", "fancybox-container-" + self.id).addClass(firstItemOpts.baseClass).data("FancyBox", self).appendTo(firstItemOpts.parentEl), self.$refs = {
                                container: $container
                            }, ["bg", "inner", "infobar", "toolbar", "stage", "caption", "navigation"].forEach(function(item) {
                                self.$refs[item] = $container.find(".fancybox-" + item)
                            }), self.trigger("onInit"), self.activate(), self.jumpTo(self.currIndex)
                        },
                        translate: function(obj, str) {
                            var arr = obj.opts.i18n[obj.opts.lang] || obj.opts.i18n.en;
                            return str.replace(/\{\{(\w+)\}\}/g, function(match, n) {
                                return void 0 === arr[n] ? match : arr[n]
                            })
                        },
                        addContent: function(content) {
                            var thumbs, self = this,
                                items = $.makeArray(content);
                            $.each(items, function(i, item) {
                                var $item, type, found, src, srcParts, obj = {},
                                    opts = {};
                                $.isPlainObject(item) ? (obj = item, opts = item.opts || item) : "object" === $.type(item) && $(item).length ? ($item = $(item), opts = $item.data() || {}, opts = $.extend(!0, {}, opts, opts.options), opts.$orig = $item, obj.src = self.opts.src || opts.src || $item.attr("href"), obj.type || obj.src || (obj.type = "inline", obj.src = item)) : obj = {
                                    type: "html",
                                    src: item + ""
                                }, obj.opts = $.extend(!0, {}, self.opts, opts), $.isArray(opts.buttons) && (obj.opts.buttons = opts.buttons), $.fancybox.isMobile && obj.opts.mobile && (obj.opts = mergeOpts(obj.opts, obj.opts.mobile)), type = obj.type || obj.opts.type, src = obj.src || "", !type && src && ((found = src.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i)) ? (type = "video", obj.opts.video.format || (obj.opts.video.format = "video/" + ("ogv" === found[1] ? "ogg" : found[1]))) : src.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i) ? type = "image" : src.match(/\.(pdf)((\?|#).*)?$/i) ? (type = "iframe", obj = $.extend(!0, obj, {
                                    contentType: "pdf",
                                    opts: {
                                        iframe: {
                                            preload: !1
                                        }
                                    }
                                })) : "#" === src.charAt(0) && (type = "inline")), type ? obj.type = type : self.trigger("objectNeedsType", obj), obj.contentType || (obj.contentType = $.inArray(obj.type, ["html", "inline", "ajax"]) > -1 ? "html" : obj.type), obj.index = self.group.length, "auto" == obj.opts.smallBtn && (obj.opts.smallBtn = $.inArray(obj.type, ["html", "inline", "ajax"]) > -1), "auto" === obj.opts.toolbar && (obj.opts.toolbar = !obj.opts.smallBtn), obj.$thumb = obj.opts.$thumb || null, obj.opts.$trigger && obj.index === self.opts.index && (obj.$thumb = obj.opts.$trigger.find("img:first"), obj.$thumb.length && (obj.opts.$orig = obj.opts.$trigger)), obj.$thumb && obj.$thumb.length || !obj.opts.$orig || (obj.$thumb = obj.opts.$orig.find("img:first")), obj.$thumb && !obj.$thumb.length && (obj.$thumb = null), obj.thumb = obj.opts.thumb || (obj.$thumb ? obj.$thumb[0].src : null), "function" === $.type(obj.opts.caption) && (obj.opts.caption = obj.opts.caption.apply(item, [self, obj])), "function" === $.type(self.opts.caption) && (obj.opts.caption = self.opts.caption.apply(item, [self, obj])), obj.opts.caption instanceof $ || (obj.opts.caption = void 0 === obj.opts.caption ? "" : obj.opts.caption + ""), "ajax" === obj.type && (srcParts = src.split(/\s+/, 2), srcParts.length > 1 && (obj.src = srcParts.shift(), obj.opts.filter = srcParts.shift())), obj.opts.modal && (obj.opts = $.extend(!0, obj.opts, {
                                    trapFocus: !0,
                                    infobar: 0,
                                    toolbar: 0,
                                    smallBtn: 0,
                                    keyboard: 0,
                                    slideShow: 0,
                                    fullScreen: 0,
                                    thumbs: 0,
                                    touch: 0,
                                    clickContent: !1,
                                    clickSlide: !1,
                                    clickOutside: !1,
                                    dblclickContent: !1,
                                    dblclickSlide: !1,
                                    dblclickOutside: !1
                                })), self.group.push(obj)
                            }), Object.keys(self.slides).length && (self.updateControls(), (thumbs = self.Thumbs) && thumbs.isActive && (thumbs.create(), thumbs.focus()))
                        },
                        addEvents: function() {
                            var self = this;
                            self.removeEvents(), self.$refs.container.on("click.fb-close", "[data-fancybox-close]", function(e) {
                                e.stopPropagation(), e.preventDefault(), self.close(e)
                            }).on("touchstart.fb-prev click.fb-prev", "[data-fancybox-prev]", function(e) {
                                e.stopPropagation(), e.preventDefault(), self.previous()
                            }).on("touchstart.fb-next click.fb-next", "[data-fancybox-next]", function(e) {
                                e.stopPropagation(), e.preventDefault(), self.next()
                            }).on("click.fb", "[data-fancybox-zoom]", function(e) {
                                self[self.isScaledDown() ? "scaleToActual" : "scaleToFit"]()
                            }), $W.on("orientationchange.fb resize.fb", function(e) {
                                e && e.originalEvent && "resize" === e.originalEvent.type ? (self.requestId && cancelAFrame(self.requestId), self.requestId = requestAFrame(function() {
                                    self.update(e)
                                })) : (self.current && "iframe" === self.current.type && self.$refs.stage.hide(), setTimeout(function() {
                                    self.$refs.stage.show(), self.update(e)
                                }, $.fancybox.isMobile ? 600 : 250))
                            }), $D.on("keydown.fb", function(e) {
                                var instance = $.fancybox ? $.fancybox.getInstance() : null,
                                    current = instance.current,
                                    keycode = e.keyCode || e.which;
                                if (9 == keycode) return void(current.opts.trapFocus && self.focus(e));
                                if (!(!current.opts.keyboard || e.ctrlKey || e.altKey || e.shiftKey || $(e.target).is("input,textarea,video,audio,select"))) return 8 === keycode || 27 === keycode ? (e.preventDefault(), void self.close(e)) : 37 === keycode || 38 === keycode ? (e.preventDefault(), void self.previous()) : 39 === keycode || 40 === keycode ? (e.preventDefault(), void self.next()) : void self.trigger("afterKeydown", e, keycode)
                            }), self.group[self.currIndex].opts.idleTime && (self.idleSecondsCounter = 0, $D.on("mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle", function(e) {
                                self.idleSecondsCounter = 0, self.isIdle && self.showControls(), self.isIdle = !1
                            }), self.idleInterval = window.setInterval(function() {
                                ++self.idleSecondsCounter >= self.group[self.currIndex].opts.idleTime && !self.isDragging && (self.isIdle = !0, self.idleSecondsCounter = 0, self.hideControls())
                            }, 1e3))
                        },
                        removeEvents: function() {
                            var self = this;
                            $W.off("orientationchange.fb resize.fb"), $D.off("keydown.fb .fb-idle"), this.$refs.container.off(".fb-close .fb-prev .fb-next"), self.idleInterval && (window.clearInterval(self.idleInterval), self.idleInterval = null)
                        },
                        previous: function(duration) {
                            return this.jumpTo(this.currPos - 1, duration)
                        },
                        next: function(duration) {
                            return this.jumpTo(this.currPos + 1, duration)
                        },
                        jumpTo: function(pos, duration) {
                            var firstRun, isMoved, loop, current, previous, slidePos, stagePos, prop, diff, self = this,
                                groupLen = self.group.length;
                            if (!(self.isDragging || self.isClosing || self.isAnimating && self.firstRun)) {
                                if (pos = parseInt(pos, 10), !(loop = self.current ? self.current.opts.loop : self.opts.loop) && (pos < 0 || pos >= groupLen)) return !1;
                                if (firstRun = self.firstRun = !Object.keys(self.slides).length, previous = self.current, self.prevIndex = self.currIndex, self.prevPos = self.currPos, current = self.createSlide(pos), groupLen > 1 && ((loop || current.index < groupLen - 1) && self.createSlide(pos + 1), (loop || current.index > 0) && self.createSlide(pos - 1)), self.current = current, self.currIndex = current.index, self.currPos = current.pos, self.trigger("beforeShow", firstRun), self.updateControls(), current.forcedDuration = void 0, $.isNumeric(duration) ? current.forcedDuration = duration : duration = current.opts[firstRun ? "animationDuration" : "transitionDuration"], duration = parseInt(duration, 10), isMoved = self.isMoved(current), current.$slide.addClass("fancybox-slide--current"), firstRun) return current.opts.animationEffect && duration && self.$refs.container.css("transition-duration", duration + "ms"), self.$refs.container.addClass("fancybox-is-open").trigger("focus"),
                                    self.loadSlide(current), void self.preload("image");
                                slidePos = $.fancybox.getTranslate(previous.$slide), stagePos = $.fancybox.getTranslate(self.$refs.stage), $.each(self.slides, function(index, slide) {
                                    $.fancybox.stop(slide.$slide, !0)
                                }), previous.pos !== current.pos && (previous.isComplete = !1), previous.$slide.removeClass("fancybox-slide--complete fancybox-slide--current"), isMoved ? (diff = slidePos.left - (previous.pos * slidePos.width + previous.pos * previous.opts.gutter), $.each(self.slides, function(index, slide) {
                                    slide.$slide.removeClass("fancybox-animated").removeClass(function(index, className) {
                                        return (className.match(/(^|\s)fancybox-fx-\S+/g) || []).join(" ")
                                    });
                                    var leftPos = slide.pos * slidePos.width + slide.pos * slide.opts.gutter;
                                    $.fancybox.setTranslate(slide.$slide, {
                                        top: 0,
                                        left: leftPos - stagePos.left + diff
                                    }), slide.pos !== current.pos && slide.$slide.addClass("fancybox-slide--" + (slide.pos > current.pos ? "next" : "previous")), forceRedraw(slide.$slide), $.fancybox.animate(slide.$slide, {
                                        top: 0,
                                        left: (slide.pos - current.pos) * slidePos.width + (slide.pos - current.pos) * slide.opts.gutter
                                    }, duration, function() {
                                        slide.$slide.css({
                                            transform: "",
                                            opacity: ""
                                        }).removeClass("fancybox-slide--next fancybox-slide--previous"), slide.pos === self.currPos && self.complete()
                                    })
                                })) : duration && current.opts.transitionEffect && (prop = "fancybox-animated fancybox-fx-" + current.opts.transitionEffect, previous.$slide.addClass("fancybox-slide--" + (previous.pos > current.pos ? "next" : "previous")), $.fancybox.animate(previous.$slide, prop, duration, function() {
                                    previous.$slide.removeClass(prop).removeClass("fancybox-slide--next fancybox-slide--previous")
                                }, !1)), current.isLoaded ? self.revealContent(current) : self.loadSlide(current), self.preload("image")
                            }
                        },
                        createSlide: function(pos) {
                            var $slide, index, self = this;
                            return index = pos % self.group.length, index = index < 0 ? self.group.length + index : index, !self.slides[pos] && self.group[index] && ($slide = $('<div class="fancybox-slide"></div>').appendTo(self.$refs.stage), self.slides[pos] = $.extend(!0, {}, self.group[index], {
                                pos: pos,
                                $slide: $slide,
                                isLoaded: !1
                            }), self.updateSlide(self.slides[pos])), self.slides[pos]
                        },
                        scaleToActual: function(x, y, duration) {
                            var imgPos, posX, posY, scaleX, scaleY, self = this,
                                current = self.current,
                                $content = current.$content,
                                canvasWidth = $.fancybox.getTranslate(current.$slide).width,
                                canvasHeight = $.fancybox.getTranslate(current.$slide).height,
                                newImgWidth = current.width,
                                newImgHeight = current.height;
                            self.isAnimating || self.isMoved() || !$content || "image" != current.type || !current.isLoaded || current.hasError || (self.isAnimating = !0, $.fancybox.stop($content), x = void 0 === x ? .5 * canvasWidth : x, y = void 0 === y ? .5 * canvasHeight : y, imgPos = $.fancybox.getTranslate($content), imgPos.top -= $.fancybox.getTranslate(current.$slide).top, imgPos.left -= $.fancybox.getTranslate(current.$slide).left, scaleX = newImgWidth / imgPos.width, scaleY = newImgHeight / imgPos.height, posX = .5 * canvasWidth - .5 * newImgWidth, posY = .5 * canvasHeight - .5 * newImgHeight, newImgWidth > canvasWidth && (posX = imgPos.left * scaleX - (x * scaleX - x), posX > 0 && (posX = 0), posX < canvasWidth - newImgWidth && (posX = canvasWidth - newImgWidth)), newImgHeight > canvasHeight && (posY = imgPos.top * scaleY - (y * scaleY - y), posY > 0 && (posY = 0), posY < canvasHeight - newImgHeight && (posY = canvasHeight - newImgHeight)), self.updateCursor(newImgWidth, newImgHeight), $.fancybox.animate($content, {
                                top: posY,
                                left: posX,
                                scaleX: scaleX,
                                scaleY: scaleY
                            }, duration || 366, function() {
                                self.isAnimating = !1
                            }), self.SlideShow && self.SlideShow.isActive && self.SlideShow.stop())
                        },
                        scaleToFit: function(duration) {
                            var end, self = this,
                                current = self.current,
                                $content = current.$content;
                            self.isAnimating || self.isMoved() || !$content || "image" != current.type || !current.isLoaded || current.hasError || (self.isAnimating = !0, $.fancybox.stop($content), end = self.getFitPos(current), self.updateCursor(end.width, end.height), $.fancybox.animate($content, {
                                top: end.top,
                                left: end.left,
                                scaleX: end.width / $content.width(),
                                scaleY: end.height / $content.height()
                            }, duration || 366, function() {
                                self.isAnimating = !1
                            }))
                        },
                        getFitPos: function(slide) {
                            var maxWidth, maxHeight, minRatio, aspectRatio, self = this,
                                $content = slide.$content,
                                $slide = slide.$slide,
                                width = slide.width || slide.opts.width,
                                height = slide.height || slide.opts.height,
                                rez = {};
                            return !!(slide.isLoaded && $content && $content.length) && (maxWidth = $.fancybox.getTranslate(self.$refs.stage).width, maxHeight = $.fancybox.getTranslate(self.$refs.stage).height, maxWidth -= parseFloat($slide.css("paddingLeft")) + parseFloat($slide.css("paddingRight")) + parseFloat($content.css("marginLeft")) + parseFloat($content.css("marginRight")), maxHeight -= parseFloat($slide.css("paddingTop")) + parseFloat($slide.css("paddingBottom")) + parseFloat($content.css("marginTop")) + parseFloat($content.css("marginBottom")), width && height || (width = maxWidth, height = maxHeight), minRatio = Math.min(1, maxWidth / width, maxHeight / height), width *= minRatio, height *= minRatio, width > maxWidth - .5 && (width = maxWidth), height > maxHeight - .5 && (height = maxHeight), "image" === slide.type ? (rez.top = Math.floor(.5 * (maxHeight - height)) + parseFloat($slide.css("paddingTop")), rez.left = Math.floor(.5 * (maxWidth - width)) + parseFloat($slide.css("paddingLeft"))) : "video" === slide.contentType && (aspectRatio = slide.opts.width && slide.opts.height ? width / height : slide.opts.ratio || 16 / 9, height > width / aspectRatio ? height = width / aspectRatio : width > height * aspectRatio && (width = height * aspectRatio)), rez.width = width, rez.height = height, rez)
                        },
                        update: function(e) {
                            var self = this;
                            $.each(self.slides, function(key, slide) {
                                self.updateSlide(slide, e)
                            })
                        },
                        updateSlide: function(slide, e) {
                            var self = this,
                                $content = slide && slide.$content,
                                width = slide.width || slide.opts.width,
                                height = slide.height || slide.opts.height,
                                $slide = slide.$slide;
                            self.adjustCaption(slide), $content && (width || height || "video" === slide.contentType) && !slide.hasError && ($.fancybox.stop($content), $.fancybox.setTranslate($content, self.getFitPos(slide)), slide.pos === self.currPos && (self.isAnimating = !1, self.updateCursor())), self.adjustLayout(slide), $slide.length && ($slide.trigger("refresh"), slide.pos === self.currPos && self.$refs.toolbar.add(self.$refs.navigation.find(".fancybox-button--arrow_right")).toggleClass("compensate-for-scrollbar", $slide.get(0).scrollHeight > $slide.get(0).clientHeight)), self.trigger("onUpdate", slide, e)
                        },
                        centerSlide: function(duration) {
                            var self = this,
                                current = self.current,
                                $slide = current.$slide;
                            !self.isClosing && current && ($slide.siblings().css({
                                transform: "",
                                opacity: ""
                            }), $slide.parent().children().removeClass("fancybox-slide--previous fancybox-slide--next"), $.fancybox.animate($slide, {
                                top: 0,
                                left: 0,
                                opacity: 1
                            }, void 0 === duration ? 0 : duration, function() {
                                $slide.css({
                                    transform: "",
                                    opacity: ""
                                }), current.isComplete || self.complete()
                            }, !1))
                        },
                        isMoved: function(slide) {
                            var slidePos, stagePos, current = slide || this.current;
                            return !!current && (stagePos = $.fancybox.getTranslate(this.$refs.stage), slidePos = $.fancybox.getTranslate(current.$slide), !current.$slide.hasClass("fancybox-animated") && (Math.abs(slidePos.top - stagePos.top) > .5 || Math.abs(slidePos.left - stagePos.left) > .5))
                        },
                        updateCursor: function(nextWidth, nextHeight) {
                            var canPan, isZoomable, self = this,
                                current = self.current,
                                $container = self.$refs.container;
                            current && !self.isClosing && self.Guestures && ($container.removeClass("fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-zoomOut fancybox-can-swipe fancybox-can-pan"), canPan = self.canPan(nextWidth, nextHeight), isZoomable = !!canPan || self.isZoomable(), $container.toggleClass("fancybox-is-zoomable", isZoomable), $("[data-fancybox-zoom]").prop("disabled", !isZoomable), canPan ? $container.addClass("fancybox-can-pan") : isZoomable && ("zoom" === current.opts.clickContent || $.isFunction(current.opts.clickContent) && "zoom" == current.opts.clickContent(current)) ? $container.addClass("fancybox-can-zoomIn") : current.opts.touch && (current.opts.touch.vertical || self.group.length > 1) && "video" !== current.contentType && $container.addClass("fancybox-can-swipe"))
                        },
                        isZoomable: function() {
                            var fitPos, self = this,
                                current = self.current;
                            if (current && !self.isClosing && "image" === current.type && !current.hasError) {
                                if (!current.isLoaded) return !0;
                                if ((fitPos = self.getFitPos(current)) && (current.width > fitPos.width || current.height > fitPos.height)) return !0
                            }
                            return !1
                        },
                        isScaledDown: function(nextWidth, nextHeight) {
                            var self = this,
                                rez = !1,
                                current = self.current,
                                $content = current.$content;
                            return void 0 !== nextWidth && void 0 !== nextHeight ? rez = nextWidth < current.width && nextHeight < current.height : $content && (rez = $.fancybox.getTranslate($content), rez = rez.width < current.width && rez.height < current.height), rez
                        },
                        canPan: function(nextWidth, nextHeight) {
                            var self = this,
                                current = self.current,
                                pos = null,
                                rez = !1;
                            return "image" === current.type && (current.isComplete || nextWidth && nextHeight) && !current.hasError && (rez = self.getFitPos(current), void 0 !== nextWidth && void 0 !== nextHeight ? pos = {
                                width: nextWidth,
                                height: nextHeight
                            } : current.isComplete && (pos = $.fancybox.getTranslate(current.$content)), pos && rez && (rez = Math.abs(pos.width - rez.width) > 1.5 || Math.abs(pos.height - rez.height) > 1.5)), rez
                        },
                        loadSlide: function(slide) {
                            var type, $slide, ajaxLoad, self = this;
                            if (!slide.isLoading && !slide.isLoaded) {
                                if (slide.isLoading = !0, !1 === self.trigger("beforeLoad", slide)) return slide.isLoading = !1, !1;
                                switch (type = slide.type, $slide = slide.$slide, $slide.off("refresh").trigger("onReset").addClass(slide.opts.slideClass), type) {
                                    case "image":
                                        self.setImage(slide);
                                        break;
                                    case "iframe":
                                        self.setIframe(slide);
                                        break;
                                    case "html":
                                        self.setContent(slide, slide.src || slide.content);
                                        break;
                                    case "video":
                                        self.setContent(slide, slide.opts.video.tpl.replace(/\{\{src\}\}/gi, slide.src).replace("{{format}}", slide.opts.videoFormat || slide.opts.video.format || "").replace("{{poster}}", slide.thumb || ""));
                                        break;
                                    case "inline":
                                        $(slide.src).length ? self.setContent(slide, $(slide.src)) : self.setError(slide);
                                        break;
                                    case "ajax":
                                        self.showLoading(slide), ajaxLoad = $.ajax($.extend({}, slide.opts.ajax.settings, {
                                            url: slide.src,
                                            success: function(data, textStatus) {
                                                "success" === textStatus && self.setContent(slide, data)
                                            },
                                            error: function(jqXHR, textStatus) {
                                                jqXHR && "abort" !== textStatus && self.setError(slide)
                                            }
                                        })), $slide.one("onReset", function() {
                                            ajaxLoad.abort()
                                        });
                                        break;
                                    default:
                                        self.setError(slide)
                                }
                                return !0
                            }
                        },
                        setImage: function(slide) {
                            var ghost, self = this;
                            setTimeout(function() {
                                var $img = slide.$image;
                                self.isClosing || !slide.isLoading || $img && $img.length && $img[0].complete || slide.hasError || self.showLoading(slide)
                            }, 50), self.checkSrcset(slide), slide.$content = $('<div class="fancybox-content"></div>').addClass("fancybox-is-hidden").appendTo(slide.$slide.addClass("fancybox-slide--image")), !1 !== slide.opts.preload && slide.opts.width && slide.opts.height && slide.thumb && (slide.width = slide.opts.width, slide.height = slide.opts.height, ghost = document.createElement("img"), ghost.onerror = function() {
                                $(this).remove(), slide.$ghost = null
                            }, ghost.onload = function() {
                                self.afterLoad(slide)
                            }, slide.$ghost = $(ghost).addClass("fancybox-image").appendTo(slide.$content).attr("src", slide.thumb)), self.setBigImage(slide)
                        },
                        checkSrcset: function(slide) {
                            var found, temp, pxRatio, windowWidth, srcset = slide.opts.srcset || slide.opts.image.srcset;
                            if (srcset) {
                                pxRatio = window.devicePixelRatio || 1, windowWidth = window.innerWidth * pxRatio, temp = srcset.split(",").map(function(el) {
                                    var ret = {};
                                    return el.trim().split(/\s+/).forEach(function(el, i) {
                                        var value = parseInt(el.substring(0, el.length - 1), 10);
                                        if (0 === i) return ret.url = el;
                                        value && (ret.value = value, ret.postfix = el[el.length - 1])
                                    }), ret
                                }), temp.sort(function(a, b) {
                                    return a.value - b.value
                                });
                                for (var j = 0; j < temp.length; j++) {
                                    var el = temp[j];
                                    if ("w" === el.postfix && el.value >= windowWidth || "x" === el.postfix && el.value >= pxRatio) {
                                        found = el;
                                        break
                                    }
                                }!found && temp.length && (found = temp[temp.length - 1]), found && (slide.src = found.url, slide.width && slide.height && "w" == found.postfix && (slide.height = slide.width / slide.height * found.value, slide.width = found.value), slide.opts.srcset = srcset)
                            }
                        },
                        setBigImage: function(slide) {
                            var self = this,
                                img = document.createElement("img"),
                                $img = $(img);
                            slide.$image = $img.one("error", function() {
                                self.setError(slide)
                            }).one("load", function() {
                                var sizes;
                                slide.$ghost || (self.resolveImageSlideSize(slide, this.naturalWidth, this.naturalHeight), self.afterLoad(slide)), self.isClosing || (slide.opts.srcset && (sizes = slide.opts.sizes, sizes && "auto" !== sizes || (sizes = (slide.width / slide.height > 1 && $W.width() / $W.height() > 1 ? "100" : Math.round(slide.width / slide.height * 100)) + "vw"), $img.attr("sizes", sizes).attr("srcset", slide.opts.srcset)), slide.$ghost && setTimeout(function() {
                                    slide.$ghost && !self.isClosing && slide.$ghost.hide()
                                }, Math.min(300, Math.max(1e3, slide.height / 1600))), self.hideLoading(slide))
                            }).addClass("fancybox-image").attr("src", slide.src).appendTo(slide.$content), (img.complete || "complete" == img.readyState) && $img.naturalWidth && $img.naturalHeight ? $img.trigger("load") : img.error && $img.trigger("error")
                        },
                        resolveImageSlideSize: function(slide, imgWidth, imgHeight) {
                            var maxWidth = parseInt(slide.opts.width, 10),
                                maxHeight = parseInt(slide.opts.height, 10);
                            slide.width = imgWidth, slide.height = imgHeight, maxWidth > 0 && (slide.width = maxWidth, slide.height = Math.floor(maxWidth * imgHeight / imgWidth)), maxHeight > 0 && (slide.width = Math.floor(maxHeight * imgWidth / imgHeight), slide.height = maxHeight)
                        },
                        setIframe: function(slide) {
                            var $iframe, self = this,
                                opts = slide.opts.iframe,
                                $slide = slide.$slide;
                            slide.$content = $('<div class="fancybox-content' + (opts.preload ? " fancybox-is-hidden" : "") + '"></div>').css(opts.css).appendTo($slide), $slide.addClass("fancybox-slide--" + slide.contentType), slide.$iframe = $iframe = $(opts.tpl.replace(/\{rnd\}/g, (new Date).getTime())).attr(opts.attr).appendTo(slide.$content), opts.preload ? (self.showLoading(slide), $iframe.on("load.fb error.fb", function(e) {
                                this.isReady = 1, slide.$slide.trigger("refresh"), self.afterLoad(slide)
                            }), $slide.on("refresh.fb", function() {
                                var $contents, $body, $content = slide.$content,
                                    frameWidth = opts.css.width,
                                    frameHeight = opts.css.height;
                                if (1 === $iframe[0].isReady) {
                                    try {
                                        $contents = $iframe.contents(), $body = $contents.find("body")
                                    } catch (ignore) {}
                                    $body && $body.length && $body.children().length && ($slide.css("overflow", "visible"), $content.css({
                                        width: "100%",
                                        "max-width": "100%",
                                        height: "9999px"
                                    }), void 0 === frameWidth && (frameWidth = Math.ceil(Math.max($body[0].clientWidth, $body.outerWidth(!0)))), $content.css("width", frameWidth || "").css("max-width", ""), void 0 === frameHeight && (frameHeight = Math.ceil(Math.max($body[0].clientHeight, $body.outerHeight(!0)))), $content.css("height", frameHeight || ""), $slide.css("overflow", "auto")), $content.removeClass("fancybox-is-hidden")
                                }
                            })) : self.afterLoad(slide), $iframe.attr("src", slide.src), $slide.one("onReset", function() {
                                try {
                                    $(this).find("iframe").hide().unbind().attr("src", "//about:blank")
                                } catch (ignore) {}
                                $(this).off("refresh.fb").empty(), slide.isLoaded = !1, slide.isRevealed = !1
                            })
                        },
                        setContent: function(slide, content) {
                            var self = this;
                            self.isClosing || (self.hideLoading(slide), slide.$content && $.fancybox.stop(slide.$content), slide.$slide.empty(), isQuery(content) && content.parent().length ? ((content.hasClass("fancybox-content") || content.parent().hasClass("fancybox-content")) && content.parents(".fancybox-slide").trigger("onReset"), slide.$placeholder = $("<div>").hide().insertAfter(content), content.css("display", "inline-block")) : slide.hasError || ("string" === $.type(content) && (content = $("<div>").append($.trim(content)).contents()), slide.opts.filter && (content = $("<div>").html(content).find(slide.opts.filter))), slide.$slide.one("onReset", function() {
                                $(this).find("video,audio").trigger("pause"), slide.$placeholder && (slide.$placeholder.after(content.removeClass("fancybox-content").hide()).remove(), slide.$placeholder = null), slide.$smallBtn && (slide.$smallBtn.remove(), slide.$smallBtn = null), slide.hasError || ($(this).empty(), slide.isLoaded = !1, slide.isRevealed = !1)
                            }), $(content).appendTo(slide.$slide), $(content).is("video,audio") && ($(content).addClass("fancybox-video"), $(content).wrap("<div></div>"), slide.contentType = "video", slide.opts.width = slide.opts.width || $(content).attr("width"), slide.opts.height = slide.opts.height || $(content).attr("height")), slide.$content = slide.$slide.children().filter("div,form,main,video,audio,article,.fancybox-content").first(), slide.$content.siblings().hide(), slide.$content.length || (slide.$content = slide.$slide.wrapInner("<div></div>").children().first()), slide.$content.addClass("fancybox-content"), slide.$slide.addClass("fancybox-slide--" + slide.contentType), self.afterLoad(slide))
                        },
                        setError: function(slide) {
                            slide.hasError = !0, slide.$slide.trigger("onReset").removeClass("fancybox-slide--" + slide.contentType).addClass("fancybox-slide--error"), slide.contentType = "html", this.setContent(slide, this.translate(slide, slide.opts.errorTpl)), slide.pos === this.currPos && (this.isAnimating = !1)
                        },
                        showLoading: function(slide) {
                            var self = this;
                            (slide = slide || self.current) && !slide.$spinner && (slide.$spinner = $(self.translate(self, self.opts.spinnerTpl)).appendTo(slide.$slide).hide().fadeIn("fast"))
                        },
                        hideLoading: function(slide) {
                            var self = this;
                            (slide = slide || self.current) && slide.$spinner && (slide.$spinner.stop().remove(), delete slide.$spinner)
                        },
                        afterLoad: function(slide) {
                            var self = this;
                            self.isClosing || (slide.isLoading = !1, slide.isLoaded = !0, self.trigger("afterLoad", slide), self.hideLoading(slide), !slide.opts.smallBtn || slide.$smallBtn && slide.$smallBtn.length || (slide.$smallBtn = $(self.translate(slide, slide.opts.btnTpl.smallBtn)).appendTo(slide.$content)), slide.opts.protect && slide.$content && !slide.hasError && (slide.$content.on("contextmenu.fb", function(e) {
                                return 2 == e.button && e.preventDefault(), !0
                            }), "image" === slide.type && $('<div class="fancybox-spaceball"></div>').appendTo(slide.$content)), self.adjustCaption(slide), self.adjustLayout(slide), slide.pos === self.currPos && self.updateCursor(), self.revealContent(slide))
                        },
                        adjustCaption: function(slide) {
                            var $clone, self = this,
                                current = slide || self.current,
                                caption = current.opts.caption,
                                preventOverlap = current.opts.preventCaptionOverlap,
                                $caption = self.$refs.caption,
                                captionH = !1;
                            $caption.toggleClass("fancybox-caption--separate", preventOverlap), preventOverlap && caption && caption.length && (current.pos !== self.currPos ? ($clone = $caption.clone().appendTo($caption.parent()), $clone.children().eq(0).empty().html(caption), captionH = $clone.outerHeight(!0), $clone.empty().remove()) : self.$caption && (captionH = self.$caption.outerHeight(!0)), current.$slide.css("padding-bottom", captionH || ""))
                        },
                        adjustLayout: function(slide) {
                            var scrollHeight, marginBottom, inlinePadding, actualPadding, self = this,
                                current = slide || self.current;
                            current.isLoaded && !0 !== current.opts.disableLayoutFix && (current.$content.css("margin-bottom", ""), current.$content.outerHeight() > current.$slide.height() + .5 && (inlinePadding = current.$slide[0].style["padding-bottom"], actualPadding = current.$slide.css("padding-bottom"), parseFloat(actualPadding) > 0 && (scrollHeight = current.$slide[0].scrollHeight, current.$slide.css("padding-bottom", 0), Math.abs(scrollHeight - current.$slide[0].scrollHeight) < 1 && (marginBottom = actualPadding), current.$slide.css("padding-bottom", inlinePadding))), current.$content.css("margin-bottom", marginBottom))
                        },
                        revealContent: function(slide) {
                            var effect, effectClassName, duration, opacity, self = this,
                                $slide = slide.$slide,
                                end = !1,
                                start = !1,
                                isMoved = self.isMoved(slide),
                                isRevealed = slide.isRevealed;
                            return slide.isRevealed = !0, effect = slide.opts[self.firstRun ? "animationEffect" : "transitionEffect"], duration = slide.opts[self.firstRun ? "animationDuration" : "transitionDuration"], duration = parseInt(void 0 === slide.forcedDuration ? duration : slide.forcedDuration, 10), !isMoved && slide.pos === self.currPos && duration || (effect = !1), "zoom" === effect && (slide.pos === self.currPos && duration && "image" === slide.type && !slide.hasError && (start = self.getThumbPos(slide)) ? end = self.getFitPos(slide) : effect = "fade"), "zoom" === effect ? (self.isAnimating = !0, end.scaleX = end.width / start.width, end.scaleY = end.height / start.height, opacity = slide.opts.zoomOpacity, "auto" == opacity && (opacity = Math.abs(slide.width / slide.height - start.width / start.height) > .1), opacity && (start.opacity = .1, end.opacity = 1), $.fancybox.setTranslate(slide.$content.removeClass("fancybox-is-hidden"), start), forceRedraw(slide.$content), void $.fancybox.animate(slide.$content, end, duration, function() {
                                self.isAnimating = !1, self.complete()
                            })) : (self.updateSlide(slide), effect ? ($.fancybox.stop($slide), effectClassName = "fancybox-slide--" + (slide.pos >= self.prevPos ? "next" : "previous") + " fancybox-animated fancybox-fx-" + effect, $slide.addClass(effectClassName).removeClass("fancybox-slide--current"), slide.$content.removeClass("fancybox-is-hidden"), forceRedraw($slide), "image" !== slide.type && slide.$content.hide().show(0), void $.fancybox.animate($slide, "fancybox-slide--current", duration, function() {
                                $slide.removeClass(effectClassName).css({
                                    transform: "",
                                    opacity: ""
                                }), slide.pos === self.currPos && self.complete()
                            }, !0)) : (slide.$content.removeClass("fancybox-is-hidden"), isRevealed || !isMoved || "image" !== slide.type || slide.hasError || slide.$content.hide().fadeIn("fast"), void(slide.pos === self.currPos && self.complete())))
                        },
                        getThumbPos: function(slide) {
                            var thumbPos, btw, brw, bbw, blw, rez = !1,
                                $thumb = slide.$thumb;
                            return !(!$thumb || !inViewport($thumb[0])) && (thumbPos = $.fancybox.getTranslate($thumb), btw = parseFloat($thumb.css("border-top-width") || 0), brw = parseFloat($thumb.css("border-right-width") || 0), bbw = parseFloat($thumb.css("border-bottom-width") || 0), blw = parseFloat($thumb.css("border-left-width") || 0), rez = {
                                top: thumbPos.top + btw,
                                left: thumbPos.left + blw,
                                width: thumbPos.width - brw - blw,
                                height: thumbPos.height - btw - bbw,
                                scaleX: 1,
                                scaleY: 1
                            }, thumbPos.width > 0 && thumbPos.height > 0 && rez)
                        },
                        complete: function() {
                            var $el, self = this,
                                current = self.current,
                                slides = {};
                            !self.isMoved() && current.isLoaded && (current.isComplete || (current.isComplete = !0, current.$slide.siblings().trigger("onReset"), self.preload("inline"), forceRedraw(current.$slide), current.$slide.addClass("fancybox-slide--complete"), $.each(self.slides, function(key, slide) {
                                slide.pos >= self.currPos - 1 && slide.pos <= self.currPos + 1 ? slides[slide.pos] = slide : slide && ($.fancybox.stop(slide.$slide), slide.$slide.off().remove())
                            }), self.slides = slides), self.isAnimating = !1, self.updateCursor(), self.trigger("afterShow"), current.opts.video.autoStart && current.$slide.find("video,audio").filter(":visible:first").trigger("play").one("ended", function() {
                                Document.exitFullscreen ? Document.exitFullscreen() : this.webkitExitFullscreen && this.webkitExitFullscreen(), self.next()
                            }), current.opts.autoFocus && "html" === current.contentType && ($el = current.$content.find("input[autofocus]:enabled:visible:first"), $el.length ? $el.trigger("focus") : self.focus(null, !0)), current.$slide.scrollTop(0).scrollLeft(0))
                        },
                        preload: function(type) {
                            var prev, next, self = this;
                            self.group.length < 2 || (next = self.slides[self.currPos + 1], prev = self.slides[self.currPos - 1], prev && prev.type === type && self.loadSlide(prev), next && next.type === type && self.loadSlide(next))
                        },
                        focus: function(e, firstRun) {
                            var focusableItems, focusedItemIndex, self = this,
                                focusableStr = ["a[href]", "area[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "button:not([disabled]):not([aria-hidden])", "iframe", "object", "embed", "video", "audio", "[contenteditable]", '[tabindex]:not([tabindex^="-"])'].join(",");
                            self.isClosing || (focusableItems = !e && self.current && self.current.isComplete ? self.current.$slide.find("*:visible" + (firstRun ? ":not(.fancybox-close-small)" : "")) : self.$refs.container.find("*:visible"), focusableItems = focusableItems.filter(focusableStr).filter(function() {
                                return "hidden" !== $(this).css("visibility") && !$(this).hasClass("disabled")
                            }), focusableItems.length ? (focusedItemIndex = focusableItems.index(document.activeElement), e && e.shiftKey ? (focusedItemIndex < 0 || 0 == focusedItemIndex) && (e.preventDefault(), focusableItems.eq(focusableItems.length - 1).trigger("focus")) : (focusedItemIndex < 0 || focusedItemIndex == focusableItems.length - 1) && (e && e.preventDefault(), focusableItems.eq(0).trigger("focus"))) : self.$refs.container.trigger("focus"))
                        },
                        activate: function() {
                            var self = this;
                            $(".fancybox-container").each(function() {
                                var instance = $(this).data("FancyBox");
                                instance && instance.id !== self.id && !instance.isClosing && (instance.trigger("onDeactivate"), instance.removeEvents(), instance.isVisible = !1)
                            }), self.isVisible = !0, (self.current || self.isIdle) && (self.update(), self.updateControls()), self.trigger("onActivate"), self.addEvents()
                        },
                        close: function(e, d) {
                            var effect, duration, $content, domRect, opacity, start, end, self = this,
                                current = self.current,
                                done = function() {
                                    self.cleanUp(e)
                                };
                            return !self.isClosing && (self.isClosing = !0, !1 === self.trigger("beforeClose", e) ? (self.isClosing = !1, requestAFrame(function() {
                                self.update()
                            }), !1) : (self.removeEvents(), $content = current.$content, effect = current.opts.animationEffect, duration = $.isNumeric(d) ? d : effect ? current.opts.animationDuration : 0, current.$slide.removeClass("fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated"), !0 !== e ? $.fancybox.stop(current.$slide) : effect = !1, current.$slide.siblings().trigger("onReset").remove(), duration && self.$refs.container.removeClass("fancybox-is-open").addClass("fancybox-is-closing").css("transition-duration", duration + "ms"), self.hideLoading(current), self.hideControls(!0), self.updateCursor(), "zoom" !== effect || $content && duration && "image" === current.type && !self.isMoved() && !current.hasError && (end = self.getThumbPos(current)) || (effect = "fade"), "zoom" === effect ? ($.fancybox.stop($content), domRect = $.fancybox.getTranslate($content), start = {
                                top: domRect.top,
                                left: domRect.left,
                                scaleX: domRect.width / end.width,
                                scaleY: domRect.height / end.height,
                                width: end.width,
                                height: end.height
                            }, opacity = current.opts.zoomOpacity, "auto" == opacity && (opacity = Math.abs(current.width / current.height - end.width / end.height) > .1), opacity && (end.opacity = 0), $.fancybox.setTranslate($content, start), forceRedraw($content), $.fancybox.animate($content, end, duration, done), !0) : (effect && duration ? $.fancybox.animate(current.$slide.addClass("fancybox-slide--previous").removeClass("fancybox-slide--current"), "fancybox-animated fancybox-fx-" + effect, duration, done) : !0 === e ? setTimeout(done, duration) : done(), !0)))
                        },
                        cleanUp: function(e) {
                            var instance, x, y, self = this,
                                $focus = self.current.opts.$orig;
                            self.current.$slide.trigger("onReset"), self.$refs.container.empty().remove(), self.trigger("afterClose", e), self.current.opts.backFocus && ($focus && $focus.length && $focus.is(":visible") || ($focus = self.$trigger), $focus && $focus.length && (x = window.scrollX, y = window.scrollY, $focus.trigger("focus"), $("html, body").scrollTop(y).scrollLeft(x))), self.current = null, instance = $.fancybox.getInstance(), instance ? instance.activate() : ($("body").removeClass("fancybox-active compensate-for-scrollbar"), $("#fancybox-style-noscroll").remove())
                        },
                        trigger: function(name, slide) {
                            var rez, args = Array.prototype.slice.call(arguments, 1),
                                self = this,
                                obj = slide && slide.opts ? slide : self.current;
                            if (obj ? args.unshift(obj) : obj = self, args.unshift(self), $.isFunction(obj.opts[name]) && (rez = obj.opts[name].apply(obj, args)), !1 === rez) return rez;
                            "afterClose" !== name && self.$refs ? self.$refs.container.trigger(name + ".fb", args) : $D.trigger(name + ".fb", args)
                        },
                        updateControls: function() {
                            var self = this,
                                current = self.current,
                                index = current.index,
                                $container = self.$refs.container,
                                $caption = self.$refs.caption,
                                caption = current.opts.caption;
                            current.$slide.trigger("refresh"), caption && caption.length ? (self.$caption = $caption, $caption.children().eq(0).html(caption)) : self.$caption = null, self.hasHiddenControls || self.isIdle || self.showControls(), $container.find("[data-fancybox-count]").html(self.group.length), $container.find("[data-fancybox-index]").html(index + 1), $container.find("[data-fancybox-prev]").prop("disabled", !current.opts.loop && index <= 0), $container.find("[data-fancybox-next]").prop("disabled", !current.opts.loop && index >= self.group.length - 1), "image" === current.type ? $container.find("[data-fancybox-zoom]").show().end().find("[data-fancybox-download]").attr("href", current.opts.image.src || current.src).show() : current.opts.toolbar && $container.find("[data-fancybox-download],[data-fancybox-zoom]").hide(), $(document.activeElement).is(":hidden,[disabled]") && self.$refs.container.trigger("focus")
                        },
                        hideControls: function(andCaption) {
                            var self = this,
                                arr = ["infobar", "toolbar", "nav"];
                            !andCaption && self.current.opts.preventCaptionOverlap || arr.push("caption"), this.$refs.container.removeClass(arr.map(function(i) {
                                return "fancybox-show-" + i
                            }).join(" ")), this.hasHiddenControls = !0
                        },
                        showControls: function() {
                            var self = this,
                                opts = self.current ? self.current.opts : self.opts,
                                $container = self.$refs.container;
                            self.hasHiddenControls = !1, self.idleSecondsCounter = 0, $container.toggleClass("fancybox-show-toolbar", !(!opts.toolbar || !opts.buttons)).toggleClass("fancybox-show-infobar", !!(opts.infobar && self.group.length > 1)).toggleClass("fancybox-show-caption", !!self.$caption).toggleClass("fancybox-show-nav", !!(opts.arrows && self.group.length > 1)).toggleClass("fancybox-is-modal", !!opts.modal)
                        },
                        toggleControls: function() {
                            this.hasHiddenControls ? this.showControls() : this.hideControls()
                        }
                    }), $.fancybox = {
                        version: "3.5.7",
                        defaults: defaults,
                        getInstance: function(command) {
                            var instance = $('.fancybox-container:not(".fancybox-is-closing"):last').data("FancyBox"),
                                args = Array.prototype.slice.call(arguments, 1);
                            return instance instanceof FancyBox && ("string" === $.type(command) ? instance[command].apply(instance, args) : "function" === $.type(command) && command.apply(instance, args), instance)
                        },
                        open: function(items, opts, index) {
                            return new FancyBox(items, opts, index)
                        },
                        close: function(all) {
                            var instance = this.getInstance();
                            instance && (instance.close(), !0 === all && this.close(all))
                        },
                        destroy: function() {
                            this.close(!0), $D.add("body").off("click.fb-start", "**")
                        },
                        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
                        use3d: function() {
                            var div = document.createElement("div");
                            return window.getComputedStyle && window.getComputedStyle(div) && window.getComputedStyle(div).getPropertyValue("transform") && !(document.documentMode && document.documentMode < 11)
                        }(),
                        getTranslate: function($el) {
                            var domRect;
                            return !(!$el || !$el.length) && (domRect = $el[0].getBoundingClientRect(), {
                                top: domRect.top || 0,
                                left: domRect.left || 0,
                                width: domRect.width,
                                height: domRect.height,
                                opacity: parseFloat($el.css("opacity"))
                            })
                        },
                        setTranslate: function($el, props) {
                            var str = "",
                                css = {};
                            if ($el && props) return void 0 === props.left && void 0 === props.top || (str = (void 0 === props.left ? $el.position().left : props.left) + "px, " + (void 0 === props.top ? $el.position().top : props.top) + "px", str = this.use3d ? "translate3d(" + str + ", 0px)" : "translate(" + str + ")"), void 0 !== props.scaleX && void 0 !== props.scaleY ? str += " scale(" + props.scaleX + ", " + props.scaleY + ")" : void 0 !== props.scaleX && (str += " scaleX(" + props.scaleX + ")"), str.length && (css.transform = str), void 0 !== props.opacity && (css.opacity = props.opacity), void 0 !== props.width && (css.width = props.width), void 0 !== props.height && (css.height = props.height), $el.css(css)
                        },
                        animate: function($el, to, duration, callback, leaveAnimationName) {
                            var from, self = this;
                            $.isFunction(duration) && (callback = duration, duration = null), self.stop($el), from = self.getTranslate($el), $el.on(transitionEnd, function(e) {
                                (!e || !e.originalEvent || $el.is(e.originalEvent.target) && "z-index" != e.originalEvent.propertyName) && (self.stop($el), $.isNumeric(duration) && $el.css("transition-duration", ""), $.isPlainObject(to) ? void 0 !== to.scaleX && void 0 !== to.scaleY && self.setTranslate($el, {
                                    top: to.top,
                                    left: to.left,
                                    width: from.width * to.scaleX,
                                    height: from.height * to.scaleY,
                                    scaleX: 1,
                                    scaleY: 1
                                }) : !0 !== leaveAnimationName && $el.removeClass(to), $.isFunction(callback) && callback(e))
                            }), $.isNumeric(duration) && $el.css("transition-duration", duration + "ms"), $.isPlainObject(to) ? (void 0 !== to.scaleX && void 0 !== to.scaleY && (delete to.width, delete to.height, $el.parent().hasClass("fancybox-slide--image") && $el.parent().addClass("fancybox-is-scaling")), $.fancybox.setTranslate($el, to)) : $el.addClass(to), $el.data("timer", setTimeout(function() {
                                $el.trigger(transitionEnd)
                            }, duration + 33))
                        },
                        stop: function($el, callCallback) {
                            $el && $el.length && (clearTimeout($el.data("timer")), callCallback && $el.trigger(transitionEnd), $el.off(transitionEnd).css("transition-duration", ""), $el.parent().removeClass("fancybox-is-scaling"))
                        }
                    }, $.fn.fancybox = function(options) {
                        var selector;
                        return options = options || {}, selector = options.selector || !1, selector ? $("body").off("click.fb-start", selector).on("click.fb-start", selector, {
                            options: options
                        }, _run) : this.off("click.fb-start").on("click.fb-start", {
                            items: this,
                            options: options
                        }, _run), this
                    }, $D.on("click.fb-start", "[data-fancybox]", _run), $D.on("click.fb-start", "[data-fancybox-trigger]", function(e) {
                        $('[data-fancybox="' + $(this).attr("data-fancybox-trigger") + '"]').eq($(this).attr("data-fancybox-index") || 0).trigger("click.fb-start", {
                            $trigger: $(this)
                        })
                    }),
                    function() {
                        var $pressed = null;
                        $D.on("mousedown mouseup focus blur", ".fancybox-button", function(e) {
                            switch (e.type) {
                                case "mousedown":
                                    $pressed = $(this);
                                    break;
                                case "mouseup":
                                    $pressed = null;
                                    break;
                                case "focusin":
                                    $(".fancybox-button").removeClass("fancybox-focus"), $(this).is($pressed) || $(this).is("[disabled]") || $(this).addClass("fancybox-focus");
                                    break;
                                case "focusout":
                                    $(".fancybox-button").removeClass("fancybox-focus")
                            }
                        })
                    }()
            }
        }(window, document, jQuery),
        function($) {
            "use strict";
            var defaults = {
                    youtube: {
                        matcher: /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
                        params: {
                            autoplay: 1,
                            autohide: 1,
                            fs: 1,
                            rel: 0,
                            hd: 1,
                            wmode: "transparent",
                            enablejsapi: 1,
                            html5: 1
                        },
                        paramPlace: 8,
                        type: "iframe",
                        url: "https://www.youtube-nocookie.com/embed/$4",
                        thumb: "https://img.youtube.com/vi/$4/hqdefault.jpg"
                    },
                    vimeo: {
                        matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
                        params: {
                            autoplay: 1,
                            hd: 1,
                            show_title: 1,
                            show_byline: 1,
                            show_portrait: 0,
                            fullscreen: 1
                        },
                        paramPlace: 3,
                        type: "iframe",
                        url: "//player.vimeo.com/video/$2"
                    },
                    instagram: {
                        matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
                        type: "image",
                        url: "//$1/p/$2/media/?size=l"
                    },
                    gmap_place: {
                        matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
                        type: "iframe",
                        url: function(rez) {
                            return "//maps.google." + rez[2] + "/?ll=" + (rez[9] ? rez[9] + "&z=" + Math.floor(rez[10]) + (rez[12] ? rez[12].replace(/^\//, "&") : "") : rez[12] + "").replace(/\?/, "&") + "&output=" + (rez[12] && rez[12].indexOf("layer=c") > 0 ? "svembed" : "embed")
                        }
                    },
                    gmap_search: {
                        matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
                        type: "iframe",
                        url: function(rez) {
                            return "//maps.google." + rez[2] + "/maps?q=" + rez[5].replace("query=", "q=").replace("api=1", "") + "&output=embed"
                        }
                    }
                },
                format = function(url, rez, params) {
                    if (url) return params = params || "", "object" === $.type(params) && (params = $.param(params, !0)), $.each(rez, function(key, value) {
                        url = url.replace("$" + key, value || "")
                    }), params.length && (url += (url.indexOf("?") > 0 ? "&" : "?") + params), url
                };
            $(document).on("objectNeedsType.fb", function(e, instance, item) {
                var media, thumb, rez, params, urlParams, paramObj, provider, url = item.src || "",
                    type = !1;
                media = $.extend(!0, {}, defaults, item.opts.media), $.each(media, function(providerName, providerOpts) {
                    if (rez = url.match(providerOpts.matcher)) {
                        if (type = providerOpts.type, provider = providerName, paramObj = {}, providerOpts.paramPlace && rez[providerOpts.paramPlace]) {
                            urlParams = rez[providerOpts.paramPlace], "?" == urlParams[0] && (urlParams = urlParams.substring(1)), urlParams = urlParams.split("&");
                            for (var m = 0; m < urlParams.length; ++m) {
                                var p = urlParams[m].split("=", 2);
                                2 == p.length && (paramObj[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " ")))
                            }
                        }
                        return params = $.extend(!0, {}, providerOpts.params, item.opts[providerName], paramObj), url = "function" === $.type(providerOpts.url) ? providerOpts.url.call(this, rez, params, item) : format(providerOpts.url, rez, params), thumb = "function" === $.type(providerOpts.thumb) ? providerOpts.thumb.call(this, rez, params, item) : format(providerOpts.thumb, rez), "youtube" === providerName ? url = url.replace(/&t=((\d+)m)?(\d+)s/, function(match, p1, m, s) {
                            return "&start=" + ((m ? 60 * parseInt(m, 10) : 0) + parseInt(s, 10))
                        }) : "vimeo" === providerName && (url = url.replace("&%23", "#")), !1
                    }
                }), type ? (item.opts.thumb || item.opts.$thumb && item.opts.$thumb.length || (item.opts.thumb = thumb), "iframe" === type && (item.opts = $.extend(!0, item.opts, {
                    iframe: {
                        preload: !1,
                        attr: {
                            scrolling: "no"
                        }
                    }
                })), $.extend(item, {
                    type: type,
                    src: url,
                    origSrc: item.src,
                    contentSource: provider,
                    contentType: "image" === type ? "image" : "gmap_place" == provider || "gmap_search" == provider ? "map" : "video"
                })) : url && (item.type = item.opts.defaultType)
            });
            var VideoAPILoader = {
                youtube: {
                    src: "https://www.youtube.com/iframe_api",
                    class: "YT",
                    loading: !1,
                    loaded: !1
                },
                vimeo: {
                    src: "https://player.vimeo.com/api/player.js",
                    class: "Vimeo",
                    loading: !1,
                    loaded: !1
                },
                load: function(vendor) {
                    var script, _this = this;
                    if (this[vendor].loaded) return void setTimeout(function() {
                        _this.done(vendor)
                    });
                    this[vendor].loading || (this[vendor].loading = !0, script = document.createElement("script"), script.type = "text/javascript", script.src = this[vendor].src, "youtube" === vendor ? window.onYouTubeIframeAPIReady = function() {
                        _this[vendor].loaded = !0, _this.done(vendor)
                    } : script.onload = function() {
                        _this[vendor].loaded = !0, _this.done(vendor)
                    }, document.body.appendChild(script))
                },
                done: function(vendor) {
                    var instance, $el, player;
                    "youtube" === vendor && delete window.onYouTubeIframeAPIReady, (instance = $.fancybox.getInstance()) && ($el = instance.current.$content.find("iframe"), "youtube" === vendor && void 0 !== YT && YT ? player = new YT.Player($el.attr("id"), {
                        events: {
                            onStateChange: function(e) {
                                0 == e.data && instance.next()
                            }
                        }
                    }) : "vimeo" === vendor && void 0 !== Vimeo && Vimeo && (player = new Vimeo.Player($el), player.on("ended", function() {
                        instance.next()
                    })))
                }
            };
            $(document).on({
                "afterShow.fb": function(e, instance, current) {
                    instance.group.length > 1 && ("youtube" === current.contentSource || "vimeo" === current.contentSource) && VideoAPILoader.load(current.contentSource)
                }
            })
        }(jQuery),
        function(window, document, $) {
            "use strict";
            var requestAFrame = function() {
                    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || function(callback) {
                        return window.setTimeout(callback, 1e3 / 60)
                    }
                }(),
                cancelAFrame = function() {
                    return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || function(id) {
                        window.clearTimeout(id)
                    }
                }(),
                getPointerXY = function(e) {
                    var result = [];
                    e = e.originalEvent || e || window.e, e = e.touches && e.touches.length ? e.touches : e.changedTouches && e.changedTouches.length ? e.changedTouches : [e];
                    for (var key in e) e[key].pageX ? result.push({
                        x: e[key].pageX,
                        y: e[key].pageY
                    }) : e[key].clientX && result.push({
                        x: e[key].clientX,
                        y: e[key].clientY
                    });
                    return result
                },
                distance = function(point2, point1, what) {
                    return point1 && point2 ? "x" === what ? point2.x - point1.x : "y" === what ? point2.y - point1.y : Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)) : 0
                },
                isClickable = function($el) {
                    if ($el.is('a,area,button,[role="button"],input,label,select,summary,textarea,video,audio,iframe') || $.isFunction($el.get(0).onclick) || $el.data("selectable")) return !0;
                    for (var i = 0, atts = $el[0].attributes, n = atts.length; i < n; i++)
                        if ("data-fancybox-" === atts[i].nodeName.substr(0, 14)) return !0;
                    return !1
                },
                hasScrollbars = function(el) {
                    var overflowY = window.getComputedStyle(el)["overflow-y"],
                        overflowX = window.getComputedStyle(el)["overflow-x"],
                        vertical = ("scroll" === overflowY || "auto" === overflowY) && el.scrollHeight > el.clientHeight,
                        horizontal = ("scroll" === overflowX || "auto" === overflowX) && el.scrollWidth > el.clientWidth;
                    return vertical || horizontal
                },
                isScrollable = function($el) {
                    for (var rez = !1;;) {
                        if (rez = hasScrollbars($el.get(0))) break;
                        if ($el = $el.parent(), !$el.length || $el.hasClass("fancybox-stage") || $el.is("body")) break
                    }
                    return rez
                },
                Guestures = function(instance) {
                    var self = this;
                    self.instance = instance, self.$bg = instance.$refs.bg, self.$stage = instance.$refs.stage, self.$container = instance.$refs.container, self.destroy(), self.$container.on("touchstart.fb.touch mousedown.fb.touch", $.proxy(self, "ontouchstart"))
                };
            Guestures.prototype.destroy = function() {
                var self = this;
                self.$container.off(".fb.touch"), $(document).off(".fb.touch"), self.requestId && (cancelAFrame(self.requestId), self.requestId = null), self.tapped && (clearTimeout(self.tapped), self.tapped = null)
            }, Guestures.prototype.ontouchstart = function(e) {
                var self = this,
                    $target = $(e.target),
                    instance = self.instance,
                    current = instance.current,
                    $slide = current.$slide,
                    $content = current.$content,
                    isTouchDevice = "touchstart" == e.type;
                if (isTouchDevice && self.$container.off("mousedown.fb.touch"), (!e.originalEvent || 2 != e.originalEvent.button) && $slide.length && $target.length && !isClickable($target) && !isClickable($target.parent()) && ($target.is("img") || !(e.originalEvent.clientX > $target[0].clientWidth + $target.offset().left))) {
                    if (!current || instance.isAnimating || current.$slide.hasClass("fancybox-animated")) return e.stopPropagation(), void e.preventDefault();
                    self.realPoints = self.startPoints = getPointerXY(e), self.startPoints.length && (current.touch && e.stopPropagation(), self.startEvent = e, self.canTap = !0, self.$target = $target, self.$content = $content, self.opts = current.opts.touch, self.isPanning = !1, self.isSwiping = !1, self.isZooming = !1, self.isScrolling = !1, self.canPan = instance.canPan(), self.startTime = (new Date).getTime(), self.distanceX = self.distanceY = self.distance = 0, self.canvasWidth = Math.round($slide[0].clientWidth), self.canvasHeight = Math.round($slide[0].clientHeight), self.contentLastPos = null, self.contentStartPos = $.fancybox.getTranslate(self.$content) || {
                        top: 0,
                        left: 0
                    }, self.sliderStartPos = $.fancybox.getTranslate($slide), self.stagePos = $.fancybox.getTranslate(instance.$refs.stage), self.sliderStartPos.top -= self.stagePos.top, self.sliderStartPos.left -= self.stagePos.left, self.contentStartPos.top -= self.stagePos.top, self.contentStartPos.left -= self.stagePos.left, $(document).off(".fb.touch").on(isTouchDevice ? "touchend.fb.touch touchcancel.fb.touch" : "mouseup.fb.touch mouseleave.fb.touch", $.proxy(self, "ontouchend")).on(isTouchDevice ? "touchmove.fb.touch" : "mousemove.fb.touch", $.proxy(self, "ontouchmove")), $.fancybox.isMobile && document.addEventListener("scroll", self.onscroll, !0), ((self.opts || self.canPan) && ($target.is(self.$stage) || self.$stage.find($target).length) || ($target.is(".fancybox-image") && e.preventDefault(), $.fancybox.isMobile && $target.parents(".fancybox-caption").length)) && (self.isScrollable = isScrollable($target) || isScrollable($target.parent()), $.fancybox.isMobile && self.isScrollable || e.preventDefault(), (1 === self.startPoints.length || current.hasError) && (self.canPan ? ($.fancybox.stop(self.$content), self.isPanning = !0) : self.isSwiping = !0, self.$container.addClass("fancybox-is-grabbing")), 2 === self.startPoints.length && "image" === current.type && (current.isLoaded || current.$ghost) && (self.canTap = !1, self.isSwiping = !1, self.isPanning = !1, self.isZooming = !0, $.fancybox.stop(self.$content), self.centerPointStartX = .5 * (self.startPoints[0].x + self.startPoints[1].x) - $(window).scrollLeft(), self.centerPointStartY = .5 * (self.startPoints[0].y + self.startPoints[1].y) - $(window).scrollTop(), self.percentageOfImageAtPinchPointX = (self.centerPointStartX - self.contentStartPos.left) / self.contentStartPos.width, self.percentageOfImageAtPinchPointY = (self.centerPointStartY - self.contentStartPos.top) / self.contentStartPos.height, self.startDistanceBetweenFingers = distance(self.startPoints[0], self.startPoints[1]))))
                }
            }, Guestures.prototype.onscroll = function(e) {
                var self = this;
                self.isScrolling = !0, document.removeEventListener("scroll", self.onscroll, !0)
            }, Guestures.prototype.ontouchmove = function(e) {
                var self = this;
                return void 0 !== e.originalEvent.buttons && 0 === e.originalEvent.buttons ? void self.ontouchend(e) : self.isScrolling ? void(self.canTap = !1) : (self.newPoints = getPointerXY(e), void((self.opts || self.canPan) && self.newPoints.length && self.newPoints.length && (self.isSwiping && !0 === self.isSwiping || e.preventDefault(), self.distanceX = distance(self.newPoints[0], self.startPoints[0], "x"), self.distanceY = distance(self.newPoints[0], self.startPoints[0], "y"), self.distance = distance(self.newPoints[0], self.startPoints[0]), self.distance > 0 && (self.isSwiping ? self.onSwipe(e) : self.isPanning ? self.onPan() : self.isZooming && self.onZoom()))))
            }, Guestures.prototype.onSwipe = function(e) {
                var angle, self = this,
                    instance = self.instance,
                    swiping = self.isSwiping,
                    left = self.sliderStartPos.left || 0;
                if (!0 !== swiping) "x" == swiping && (self.distanceX > 0 && (self.instance.group.length < 2 || 0 === self.instance.current.index && !self.instance.current.opts.loop) ? left += Math.pow(self.distanceX, .8) : self.distanceX < 0 && (self.instance.group.length < 2 || self.instance.current.index === self.instance.group.length - 1 && !self.instance.current.opts.loop) ? left -= Math.pow(-self.distanceX, .8) : left += self.distanceX), self.sliderLastPos = {
                    top: "x" == swiping ? 0 : self.sliderStartPos.top + self.distanceY,
                    left: left
                }, self.requestId && (cancelAFrame(self.requestId), self.requestId = null), self.requestId = requestAFrame(function() {
                    self.sliderLastPos && ($.each(self.instance.slides, function(index, slide) {
                        var pos = slide.pos - self.instance.currPos;
                        $.fancybox.setTranslate(slide.$slide, {
                            top: self.sliderLastPos.top,
                            left: self.sliderLastPos.left + pos * self.canvasWidth + pos * slide.opts.gutter
                        })
                    }), self.$container.addClass("fancybox-is-sliding"))
                });
                else if (Math.abs(self.distance) > 10) {
                    if (self.canTap = !1, instance.group.length < 2 && self.opts.vertical ? self.isSwiping = "y" : instance.isDragging || !1 === self.opts.vertical || "auto" === self.opts.vertical && $(window).width() > 800 ? self.isSwiping = "x" : (angle = Math.abs(180 * Math.atan2(self.distanceY, self.distanceX) / Math.PI), self.isSwiping = angle > 45 && angle < 135 ? "y" : "x"), "y" === self.isSwiping && $.fancybox.isMobile && self.isScrollable) return void(self.isScrolling = !0);
                    instance.isDragging = self.isSwiping, self.startPoints = self.newPoints, $.each(instance.slides, function(index, slide) {
                        var slidePos, stagePos;
                        $.fancybox.stop(slide.$slide), slidePos = $.fancybox.getTranslate(slide.$slide), stagePos = $.fancybox.getTranslate(instance.$refs.stage), slide.$slide.css({
                            transform: "",
                            opacity: "",
                            "transition-duration": ""
                        }).removeClass("fancybox-animated").removeClass(function(index, className) {
                            return (className.match(/(^|\s)fancybox-fx-\S+/g) || []).join(" ")
                        }), slide.pos === instance.current.pos && (self.sliderStartPos.top = slidePos.top - stagePos.top, self.sliderStartPos.left = slidePos.left - stagePos.left), $.fancybox.setTranslate(slide.$slide, {
                            top: slidePos.top - stagePos.top,
                            left: slidePos.left - stagePos.left
                        })
                    }), instance.SlideShow && instance.SlideShow.isActive && instance.SlideShow.stop()
                }
            }, Guestures.prototype.onPan = function() {
                var self = this;
                if (distance(self.newPoints[0], self.realPoints[0]) < ($.fancybox.isMobile ? 10 : 5)) return void(self.startPoints = self.newPoints);
                self.canTap = !1, self.contentLastPos = self.limitMovement(), self.requestId && cancelAFrame(self.requestId), self.requestId = requestAFrame(function() {
                    $.fancybox.setTranslate(self.$content, self.contentLastPos)
                })
            }, Guestures.prototype.limitMovement = function() {
                var minTranslateX, minTranslateY, maxTranslateX, maxTranslateY, newOffsetX, newOffsetY, self = this,
                    canvasWidth = self.canvasWidth,
                    canvasHeight = self.canvasHeight,
                    distanceX = self.distanceX,
                    distanceY = self.distanceY,
                    contentStartPos = self.contentStartPos,
                    currentOffsetX = contentStartPos.left,
                    currentOffsetY = contentStartPos.top,
                    currentWidth = contentStartPos.width,
                    currentHeight = contentStartPos.height;
                return newOffsetX = currentWidth > canvasWidth ? currentOffsetX + distanceX : currentOffsetX, newOffsetY = currentOffsetY + distanceY, minTranslateX = Math.max(0, .5 * canvasWidth - .5 * currentWidth), minTranslateY = Math.max(0, .5 * canvasHeight - .5 * currentHeight), maxTranslateX = Math.min(canvasWidth - currentWidth, .5 * canvasWidth - .5 * currentWidth), maxTranslateY = Math.min(canvasHeight - currentHeight, .5 * canvasHeight - .5 * currentHeight), distanceX > 0 && newOffsetX > minTranslateX && (newOffsetX = minTranslateX - 1 + Math.pow(-minTranslateX + currentOffsetX + distanceX, .8) || 0), distanceX < 0 && newOffsetX < maxTranslateX && (newOffsetX = maxTranslateX + 1 - Math.pow(maxTranslateX - currentOffsetX - distanceX, .8) || 0), distanceY > 0 && newOffsetY > minTranslateY && (newOffsetY = minTranslateY - 1 + Math.pow(-minTranslateY + currentOffsetY + distanceY, .8) || 0), distanceY < 0 && newOffsetY < maxTranslateY && (newOffsetY = maxTranslateY + 1 - Math.pow(maxTranslateY - currentOffsetY - distanceY, .8) || 0), {
                    top: newOffsetY,
                    left: newOffsetX
                }
            }, Guestures.prototype.limitPosition = function(newOffsetX, newOffsetY, newWidth, newHeight) {
                var self = this,
                    canvasWidth = self.canvasWidth,
                    canvasHeight = self.canvasHeight;
                return newWidth > canvasWidth ? (newOffsetX = newOffsetX > 0 ? 0 : newOffsetX, newOffsetX = newOffsetX < canvasWidth - newWidth ? canvasWidth - newWidth : newOffsetX) : newOffsetX = Math.max(0, canvasWidth / 2 - newWidth / 2), newHeight > canvasHeight ? (newOffsetY = newOffsetY > 0 ? 0 : newOffsetY, newOffsetY = newOffsetY < canvasHeight - newHeight ? canvasHeight - newHeight : newOffsetY) : newOffsetY = Math.max(0, canvasHeight / 2 - newHeight / 2), {
                    top: newOffsetY,
                    left: newOffsetX
                }
            }, Guestures.prototype.onZoom = function() {
                var self = this,
                    contentStartPos = self.contentStartPos,
                    currentWidth = contentStartPos.width,
                    currentHeight = contentStartPos.height,
                    currentOffsetX = contentStartPos.left,
                    currentOffsetY = contentStartPos.top,
                    endDistanceBetweenFingers = distance(self.newPoints[0], self.newPoints[1]),
                    pinchRatio = endDistanceBetweenFingers / self.startDistanceBetweenFingers,
                    newWidth = Math.floor(currentWidth * pinchRatio),
                    newHeight = Math.floor(currentHeight * pinchRatio),
                    translateFromZoomingX = (currentWidth - newWidth) * self.percentageOfImageAtPinchPointX,
                    translateFromZoomingY = (currentHeight - newHeight) * self.percentageOfImageAtPinchPointY,
                    centerPointEndX = (self.newPoints[0].x + self.newPoints[1].x) / 2 - $(window).scrollLeft(),
                    centerPointEndY = (self.newPoints[0].y + self.newPoints[1].y) / 2 - $(window).scrollTop(),
                    translateFromTranslatingX = centerPointEndX - self.centerPointStartX,
                    translateFromTranslatingY = centerPointEndY - self.centerPointStartY,
                    newOffsetX = currentOffsetX + (translateFromZoomingX + translateFromTranslatingX),
                    newOffsetY = currentOffsetY + (translateFromZoomingY + translateFromTranslatingY),
                    newPos = {
                        top: newOffsetY,
                        left: newOffsetX,
                        scaleX: pinchRatio,
                        scaleY: pinchRatio
                    };
                self.canTap = !1, self.newWidth = newWidth, self.newHeight = newHeight, self.contentLastPos = newPos, self.requestId && cancelAFrame(self.requestId), self.requestId = requestAFrame(function() {
                    $.fancybox.setTranslate(self.$content, self.contentLastPos)
                })
            }, Guestures.prototype.ontouchend = function(e) {
                var self = this,
                    swiping = self.isSwiping,
                    panning = self.isPanning,
                    zooming = self.isZooming,
                    scrolling = self.isScrolling;
                if (self.endPoints = getPointerXY(e), self.dMs = Math.max((new Date).getTime() - self.startTime, 1), self.$container.removeClass("fancybox-is-grabbing"), $(document).off(".fb.touch"), document.removeEventListener("scroll", self.onscroll, !0), self.requestId && (cancelAFrame(self.requestId), self.requestId = null), self.isSwiping = !1, self.isPanning = !1, self.isZooming = !1, self.isScrolling = !1, self.instance.isDragging = !1, self.canTap) return self.onTap(e);
                self.speed = 100, self.velocityX = self.distanceX / self.dMs * .5, self.velocityY = self.distanceY / self.dMs * .5, panning ? self.endPanning() : zooming ? self.endZooming() : self.endSwiping(swiping, scrolling)
            }, Guestures.prototype.endSwiping = function(swiping, scrolling) {
                var self = this,
                    ret = !1,
                    len = self.instance.group.length,
                    distanceX = Math.abs(self.distanceX),
                    canAdvance = "x" == swiping && len > 1 && (self.dMs > 130 && distanceX > 10 || distanceX > 50);
                self.sliderLastPos = null, "y" == swiping && !scrolling && Math.abs(self.distanceY) > 50 ? ($.fancybox.animate(self.instance.current.$slide, {
                    top: self.sliderStartPos.top + self.distanceY + 150 * self.velocityY,
                    opacity: 0
                }, 200), ret = self.instance.close(!0, 250)) : canAdvance && self.distanceX > 0 ? ret = self.instance.previous(300) : canAdvance && self.distanceX < 0 && (ret = self.instance.next(300)), !1 !== ret || "x" != swiping && "y" != swiping || self.instance.centerSlide(200), self.$container.removeClass("fancybox-is-sliding")
            }, Guestures.prototype.endPanning = function() {
                var newOffsetX, newOffsetY, newPos, self = this;
                self.contentLastPos && (!1 === self.opts.momentum || self.dMs > 350 ? (newOffsetX = self.contentLastPos.left, newOffsetY = self.contentLastPos.top) : (newOffsetX = self.contentLastPos.left + 500 * self.velocityX, newOffsetY = self.contentLastPos.top + 500 * self.velocityY), newPos = self.limitPosition(newOffsetX, newOffsetY, self.contentStartPos.width, self.contentStartPos.height), newPos.width = self.contentStartPos.width, newPos.height = self.contentStartPos.height, $.fancybox.animate(self.$content, newPos, 366))
            }, Guestures.prototype.endZooming = function() {
                var newOffsetX, newOffsetY, newPos, reset, self = this,
                    current = self.instance.current,
                    newWidth = self.newWidth,
                    newHeight = self.newHeight;
                self.contentLastPos && (newOffsetX = self.contentLastPos.left, newOffsetY = self.contentLastPos.top, reset = {
                    top: newOffsetY,
                    left: newOffsetX,
                    width: newWidth,
                    height: newHeight,
                    scaleX: 1,
                    scaleY: 1
                }, $.fancybox.setTranslate(self.$content, reset), newWidth < self.canvasWidth && newHeight < self.canvasHeight ? self.instance.scaleToFit(150) : newWidth > current.width || newHeight > current.height ? self.instance.scaleToActual(self.centerPointStartX, self.centerPointStartY, 150) : (newPos = self.limitPosition(newOffsetX, newOffsetY, newWidth, newHeight), $.fancybox.animate(self.$content, newPos, 150)))
            }, Guestures.prototype.onTap = function(e) {
                var where, self = this,
                    $target = $(e.target),
                    instance = self.instance,
                    current = instance.current,
                    endPoints = e && getPointerXY(e) || self.startPoints,
                    tapX = endPoints[0] ? endPoints[0].x - $(window).scrollLeft() - self.stagePos.left : 0,
                    tapY = endPoints[0] ? endPoints[0].y - $(window).scrollTop() - self.stagePos.top : 0,
                    process = function(prefix) {
                        var action = current.opts[prefix];
                        if ($.isFunction(action) && (action = action.apply(instance, [current, e])), action) switch (action) {
                            case "close":
                                instance.close(self.startEvent);
                                break;
                            case "toggleControls":
                                instance.toggleControls();
                                break;
                            case "next":
                                instance.next();
                                break;
                            case "nextOrClose":
                                instance.group.length > 1 ? instance.next() : instance.close(self.startEvent);
                                break;
                            case "zoom":
                                "image" == current.type && (current.isLoaded || current.$ghost) && (instance.canPan() ? instance.scaleToFit() : instance.isScaledDown() ? instance.scaleToActual(tapX, tapY) : instance.group.length < 2 && instance.close(self.startEvent))
                        }
                    };
                if ((!e.originalEvent || 2 != e.originalEvent.button) && ($target.is("img") || !(tapX > $target[0].clientWidth + $target.offset().left))) {
                    if ($target.is(".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container")) where = "Outside";
                    else if ($target.is(".fancybox-slide")) where = "Slide";
                    else {
                        if (!instance.current.$content || !instance.current.$content.find($target).addBack().filter($target).length) return;
                        where = "Content"
                    }
                    if (self.tapped) {
                        if (clearTimeout(self.tapped), self.tapped = null, Math.abs(tapX - self.tapX) > 50 || Math.abs(tapY - self.tapY) > 50) return this;
                        process("dblclick" + where)
                    } else self.tapX = tapX, self.tapY = tapY, current.opts["dblclick" + where] && current.opts["dblclick" + where] !== current.opts["click" + where] ? self.tapped = setTimeout(function() {
                        self.tapped = null, instance.isAnimating || process("click" + where)
                    }, 500) : process("click" + where);
                    return this
                }
            }, $(document).on("onActivate.fb", function(e, instance) {
                instance && !instance.Guestures && (instance.Guestures = new Guestures(instance))
            }).on("beforeClose.fb", function(e, instance) {
                instance && instance.Guestures && instance.Guestures.destroy()
            })
        }(window, document, jQuery),
        function(document, $) {
            "use strict";
            $.extend(!0, $.fancybox.defaults, {
                btnTpl: {
                    slideShow: '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.5 5.4v13.2l11-6.6z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.33 5.75h2.2v12.5h-2.2V5.75zm5.15 0h2.2v12.5h-2.2V5.75z"/></svg></button>'
                },
                slideShow: {
                    autoStart: !1,
                    speed: 3e3,
                    progress: !0
                }
            });
            var SlideShow = function(instance) {
                this.instance = instance, this.init()
            };
            $.extend(SlideShow.prototype, {
                timer: null,
                isActive: !1,
                $button: null,
                init: function() {
                    var self = this,
                        instance = self.instance,
                        opts = instance.group[instance.currIndex].opts.slideShow;
                    self.$button = instance.$refs.toolbar.find("[data-fancybox-play]").on("click", function() {
                        self.toggle()
                    }), instance.group.length < 2 || !opts ? self.$button.hide() : opts.progress && (self.$progress = $('<div class="fancybox-progress"></div>').appendTo(instance.$refs.inner))
                },
                set: function(force) {
                    var self = this,
                        instance = self.instance,
                        current = instance.current;
                    current && (!0 === force || current.opts.loop || instance.currIndex < instance.group.length - 1) ? self.isActive && "video" !== current.contentType && (self.$progress && $.fancybox.animate(self.$progress.show(), {
                        scaleX: 1
                    }, current.opts.slideShow.speed), self.timer = setTimeout(function() {
                        instance.current.opts.loop || instance.current.index != instance.group.length - 1 ? instance.next() : instance.jumpTo(0)
                    }, current.opts.slideShow.speed)) : (self.stop(), instance.idleSecondsCounter = 0, instance.showControls())
                },
                clear: function() {
                    var self = this;
                    clearTimeout(self.timer), self.timer = null, self.$progress && self.$progress.removeAttr("style").hide()
                },
                start: function() {
                    var self = this,
                        current = self.instance.current;
                    current && (self.$button.attr("title", (current.opts.i18n[current.opts.lang] || current.opts.i18n.en).PLAY_STOP).removeClass("fancybox-button--play").addClass("fancybox-button--pause"), self.isActive = !0, current.isComplete && self.set(!0), self.instance.trigger("onSlideShowChange", !0))
                },
                stop: function() {
                    var self = this,
                        current = self.instance.current;
                    self.clear(), self.$button.attr("title", (current.opts.i18n[current.opts.lang] || current.opts.i18n.en).PLAY_START).removeClass("fancybox-button--pause").addClass("fancybox-button--play"), self.isActive = !1, self.instance.trigger("onSlideShowChange", !1), self.$progress && self.$progress.removeAttr("style").hide()
                },
                toggle: function() {
                    var self = this;
                    self.isActive ? self.stop() : self.start()
                }
            }), $(document).on({
                "onInit.fb": function(e, instance) {
                    instance && !instance.SlideShow && (instance.SlideShow = new SlideShow(instance))
                },
                "beforeShow.fb": function(e, instance, current, firstRun) {
                    var SlideShow = instance && instance.SlideShow;
                    firstRun ? SlideShow && current.opts.slideShow.autoStart && SlideShow.start() : SlideShow && SlideShow.isActive && SlideShow.clear()
                },
                "afterShow.fb": function(e, instance, current) {
                    var SlideShow = instance && instance.SlideShow;
                    SlideShow && SlideShow.isActive && SlideShow.set()
                },
                "afterKeydown.fb": function(e, instance, current, keypress, keycode) {
                    var SlideShow = instance && instance.SlideShow;
                    !SlideShow || !current.opts.slideShow || 80 !== keycode && 32 !== keycode || $(document.activeElement).is("button,a,input") || (keypress.preventDefault(), SlideShow.toggle())
                },
                "beforeClose.fb onDeactivate.fb": function(e, instance) {
                    var SlideShow = instance && instance.SlideShow;
                    SlideShow && SlideShow.stop()
                }
            }), $(document).on("visibilitychange", function() {
                if ("3.5.7" == $.fancybox.version) {
                    var instance = $.fancybox.getInstance(),
                        SlideShow = instance && instance.SlideShow;
                    SlideShow && SlideShow.isActive && (document.hidden ? SlideShow.clear() : SlideShow.set())
                }
            })
        }(document, jQuery),
        function(document, $) {
            "use strict";
            var fn = function() {
                for (var fnMap = [
                        ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
                        ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"],
                        ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"],
                        ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"],
                        ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]
                    ], ret = {}, i = 0; i < fnMap.length; i++) {
                    var val = fnMap[i];
                    if (val && val[1] in document) {
                        for (var j = 0; j < val.length; j++) ret[fnMap[0][j]] = val[j];
                        return ret
                    }
                }
                return !1
            }();
            if (fn) {
                var FullScreen = {
                    request: function(elem) {
                        elem = elem || document.documentElement, elem[fn.requestFullscreen](elem.ALLOW_KEYBOARD_INPUT)
                    },
                    exit: function() {
                        document[fn.exitFullscreen]()
                    },
                    toggle: function(elem) {
                        elem = elem || document.documentElement, this.isFullscreen() ? this.exit() : this.request(elem)
                    },
                    isFullscreen: function() {
                        return Boolean(document[fn.fullscreenElement])
                    },
                    enabled: function() {
                        return Boolean(document[fn.fullscreenEnabled])
                    }
                };
                $.extend(!0, $.fancybox.defaults, {
                    btnTpl: {
                        fullScreen: '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fsenter" title="{{FULL_SCREEN}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5zm3-8H5v2h5V5H8zm6 11h2v-3h3v-2h-5zm2-11V5h-2v5h5V8z"/></svg></button>'
                    },
                    fullScreen: {
                        autoStart: !1
                    }
                }), $(document).on(fn.fullscreenchange, function() {
                    var isFullscreen = FullScreen.isFullscreen(),
                        instance = $.fancybox.getInstance();
                    instance && (instance.current && "image" === instance.current.type && instance.isAnimating && (instance.isAnimating = !1, instance.update(!0, !0, 0), instance.isComplete || instance.complete()), instance.trigger("onFullscreenChange", isFullscreen), instance.$refs.container.toggleClass("fancybox-is-fullscreen", isFullscreen), instance.$refs.toolbar.find("[data-fancybox-fullscreen]").toggleClass("fancybox-button--fsenter", !isFullscreen).toggleClass("fancybox-button--fsexit", isFullscreen))
                })
            }
            $(document).on({
                "onInit.fb": function(e, instance) {
                    var $container;
                    if (!fn) return void instance.$refs.toolbar.find("[data-fancybox-fullscreen]").remove();
                    instance && instance.group[instance.currIndex].opts.fullScreen ? ($container = instance.$refs.container, $container.on("click.fb-fullscreen", "[data-fancybox-fullscreen]", function(e) {
                        e.stopPropagation(), e.preventDefault(), FullScreen.toggle()
                    }), instance.opts.fullScreen && !0 === instance.opts.fullScreen.autoStart && FullScreen.request(), instance.FullScreen = FullScreen) : instance && instance.$refs.toolbar.find("[data-fancybox-fullscreen]").hide()
                },
                "afterKeydown.fb": function(e, instance, current, keypress, keycode) {
                    instance && instance.FullScreen && 70 === keycode && (keypress.preventDefault(), instance.FullScreen.toggle())
                },
                "beforeClose.fb": function(e, instance) {
                    instance && instance.FullScreen && instance.$refs.container.hasClass("fancybox-is-fullscreen") && FullScreen.exit()
                }
            })
        }(document, jQuery),
        function(document, $) {
            "use strict";
            var CLASS = "fancybox-thumbs";
            $.fancybox.defaults = $.extend(!0, {
                btnTpl: {
                    thumbs: '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14.59 14.59h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76H5.65V5.65z"/></svg></button>'
                },
                thumbs: {
                    autoStart: !1,
                    hideOnClose: !0,
                    parentEl: ".fancybox-container",
                    axis: "y"
                }
            }, $.fancybox.defaults);
            var FancyThumbs = function(instance) {
                this.init(instance)
            };
            $.extend(FancyThumbs.prototype, {
                $button: null,
                $grid: null,
                $list: null,
                isVisible: !1,
                isActive: !1,
                init: function(instance) {
                    var self = this,
                        group = instance.group,
                        enabled = 0;
                    self.instance = instance, self.opts = group[instance.currIndex].opts.thumbs, instance.Thumbs = self, self.$button = instance.$refs.toolbar.find("[data-fancybox-thumbs]");
                    for (var i = 0, len = group.length; i < len && (group[i].thumb && enabled++, !(enabled > 1)); i++);
                    enabled > 1 && self.opts ? (self.$button.removeAttr("style").on("click", function() {
                        self.toggle()
                    }), self.isActive = !0) : self.$button.hide()
                },
                create: function() {
                    var src, self = this,
                        instance = self.instance,
                        parentEl = self.opts.parentEl,
                        list = [];
                    self.$grid || (self.$grid = $('<div class="' + CLASS + " " + CLASS + "-" + self.opts.axis + '"></div>').appendTo(instance.$refs.container.find(parentEl).addBack().filter(parentEl)), self.$grid.on("click", "a", function() {
                        instance.jumpTo($(this).attr("data-index"))
                    })), self.$list || (self.$list = $('<div class="' + CLASS + '__list">').appendTo(self.$grid)), $.each(instance.group, function(i, item) {
                        src = item.thumb, src || "image" !== item.type || (src = item.src), list.push('<a href="javascript:;" tabindex="0" data-index="' + i + '"' + (src && src.length ? ' style="background-image:url(' + src + ')"' : 'class="fancybox-thumbs-missing"') + "></a>")
                    }), self.$list[0].innerHTML = list.join(""), "x" === self.opts.axis && self.$list.width(parseInt(self.$grid.css("padding-right"), 10) + instance.group.length * self.$list.children().eq(0).outerWidth(!0))
                },
                focus: function(duration) {
                    var thumb, thumbPos, self = this,
                        $list = self.$list,
                        $grid = self.$grid;
                    self.instance.current && (thumb = $list.children().removeClass("fancybox-thumbs-active").filter('[data-index="' + self.instance.current.index + '"]').addClass("fancybox-thumbs-active"), thumbPos = thumb.position(), "y" === self.opts.axis && (thumbPos.top < 0 || thumbPos.top > $list.height() - thumb.outerHeight()) ? $list.stop().animate({
                        scrollTop: $list.scrollTop() + thumbPos.top
                    }, duration) : "x" === self.opts.axis && (thumbPos.left < $grid.scrollLeft() || thumbPos.left > $grid.scrollLeft() + ($grid.width() - thumb.outerWidth())) && $list.parent().stop().animate({
                        scrollLeft: thumbPos.left
                    }, duration))
                },
                update: function() {
                    var that = this;
                    that.instance.$refs.container.toggleClass("fancybox-show-thumbs", this.isVisible), that.isVisible ? (that.$grid || that.create(), that.instance.trigger("onThumbsShow"),
                        that.focus(0)) : that.$grid && that.instance.trigger("onThumbsHide"), that.instance.update()
                },
                hide: function() {
                    this.isVisible = !1, this.update()
                },
                show: function() {
                    this.isVisible = !0, this.update()
                },
                toggle: function() {
                    this.isVisible = !this.isVisible, this.update()
                }
            }), $(document).on({
                "onInit.fb": function(e, instance) {
                    var Thumbs;
                    instance && !instance.Thumbs && (Thumbs = new FancyThumbs(instance), Thumbs.isActive && !0 === Thumbs.opts.autoStart && Thumbs.show())
                },
                "beforeShow.fb": function(e, instance, item, firstRun) {
                    var Thumbs = instance && instance.Thumbs;
                    Thumbs && Thumbs.isVisible && Thumbs.focus(firstRun ? 0 : 250)
                },
                "afterKeydown.fb": function(e, instance, current, keypress, keycode) {
                    var Thumbs = instance && instance.Thumbs;
                    Thumbs && Thumbs.isActive && 71 === keycode && (keypress.preventDefault(), Thumbs.toggle())
                },
                "beforeClose.fb": function(e, instance) {
                    var Thumbs = instance && instance.Thumbs;
                    Thumbs && Thumbs.isVisible && !1 !== Thumbs.opts.hideOnClose && Thumbs.$grid.hide()
                }
            })
        }(document, jQuery),
        function(document, $) {
            "use strict";

            function escapeHtml(string) {
                var entityMap = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#39;",
                    "/": "&#x2F;",
                    "`": "&#x60;",
                    "=": "&#x3D;"
                };
                return String(string).replace(/[&<>"'`=\/]/g, function(s) {
                    return entityMap[s]
                })
            }
            $.extend(!0, $.fancybox.defaults, {
                btnTpl: {
                    share: '<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2.55 19c1.4-8.4 9.1-9.8 11.9-9.8V5l7 7-7 6.3v-3.5c-2.8 0-10.5 2.1-11.9 4.2z"/></svg></button>'
                },
                share: {
                    url: function(instance, item) {
                        return !instance.currentHash && "inline" !== item.type && "html" !== item.type && (item.origSrc || item.src) || window.location
                    },
                    tpl: '<div class="fancybox-share"><h1>{{SHARE}}</h1><p><a class="fancybox-share__button fancybox-share__button--fb" href="https://www.facebook.com/sharer/sharer.php?u={{url}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m287 456v-299c0-21 6-35 35-35h38v-63c-7-1-29-3-55-3-54 0-91 33-91 94v306m143-254h-205v72h196" /></svg><span>Facebook</span></a><a class="fancybox-share__button fancybox-share__button--tw" href="https://twitter.com/intent/tweet?url={{url}}&text={{descr}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m456 133c-14 7-31 11-47 13 17-10 30-27 37-46-15 10-34 16-52 20-61-62-157-7-141 75-68-3-129-35-169-85-22 37-11 86 26 109-13 0-26-4-37-9 0 39 28 72 65 80-12 3-25 4-37 2 10 33 41 57 77 57-42 30-77 38-122 34 170 111 378-32 359-208 16-11 30-25 41-42z" /></svg><span>Twitter</span></a><a class="fancybox-share__button fancybox-share__button--pt" href="https://www.pinterest.com/pin/create/button/?url={{url}}&description={{descr}}&media={{media}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m265 56c-109 0-164 78-164 144 0 39 15 74 47 87 5 2 10 0 12-5l4-19c2-6 1-8-3-13-9-11-15-25-15-45 0-58 43-110 113-110 62 0 96 38 96 88 0 67-30 122-73 122-24 0-42-19-36-44 6-29 20-60 20-81 0-19-10-35-31-35-25 0-44 26-44 60 0 21 7 36 7 36l-30 125c-8 37-1 83 0 87 0 3 4 4 5 2 2-3 32-39 42-75l16-64c8 16 31 29 56 29 74 0 124-67 124-157 0-69-58-132-146-132z" fill="#fff"/></svg><span>Pinterest</span></a></p><p><input class="fancybox-share__input" type="text" value="{{url_raw}}" onclick="select()" /></p></div>'
                }
            }), $(document).on("click", "[data-fancybox-share]", function() {
                var url, tpl, instance = $.fancybox.getInstance(),
                    current = instance.current || null;
                current && ("function" === $.type(current.opts.share.url) && (url = current.opts.share.url.apply(current, [instance, current])), tpl = current.opts.share.tpl.replace(/\{\{media\}\}/g, "image" === current.type ? encodeURIComponent(current.src) : "").replace(/\{\{url\}\}/g, encodeURIComponent(url)).replace(/\{\{url_raw\}\}/g, escapeHtml(url)).replace(/\{\{descr\}\}/g, instance.$caption ? encodeURIComponent(instance.$caption.text()) : ""), $.fancybox.open({
                    src: instance.translate(instance, tpl),
                    type: "html",
                    opts: {
                        touch: !1,
                        animationEffect: !1,
                        afterLoad: function(shareInstance, shareCurrent) {
                            instance.$refs.container.one("beforeClose.fb", function() {
                                shareInstance.close(null, 0)
                            }), shareCurrent.$content.find(".fancybox-share__button").on("click", function() {
                                return window.open(this.href, "Share", "width=550, height=450"), !1
                            })
                        },
                        mobile: {
                            autoFocus: !1
                        }
                    }
                }))
            })
        }(document, jQuery),
        function(window, document, $) {
            "use strict";

            function parseUrl() {
                var hash = window.location.hash.substr(1),
                    rez = hash.split("-"),
                    index = rez.length > 1 && /^\+?\d+$/.test(rez[rez.length - 1]) ? parseInt(rez.pop(-1), 10) || 1 : 1,
                    gallery = rez.join("-");
                return {
                    hash: hash,
                    index: index < 1 ? 1 : index,
                    gallery: gallery
                }
            }

            function triggerFromUrl(url) {
                "" !== url.gallery && $("[data-fancybox='" + $.escapeSelector(url.gallery) + "']").eq(url.index - 1).focus().trigger("click.fb-start")
            }

            function getGalleryID(instance) {
                var opts, ret;
                return !!instance && (opts = instance.current ? instance.current.opts : instance.opts, "" !== (ret = opts.hash || (opts.$orig ? opts.$orig.data("fancybox") || opts.$orig.data("fancybox-trigger") : "")) && ret)
            }
            $.escapeSelector || ($.escapeSelector = function(sel) {
                return (sel + "").replace(/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g, function(ch, asCodePoint) {
                    return asCodePoint ? "\0" === ch ? "�" : ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " " : "\\" + ch
                })
            }), $(function() {
                "3.5.7" == $.fancybox.version && !1 !== $.fancybox.defaults.hash && ($(document).on({
                    "onInit.fb": function(e, instance) {
                        var url, gallery;
                        !1 !== instance.group[instance.currIndex].opts.hash && (url = parseUrl(), (gallery = getGalleryID(instance)) && url.gallery && gallery == url.gallery && (instance.currIndex = url.index - 1))
                    },
                    "beforeShow.fb": function(e, instance, current, firstRun) {
                        var gallery;
                        current && !1 !== current.opts.hash && (gallery = getGalleryID(instance)) && (instance.currentHash = gallery + (instance.group.length > 1 ? "-" + (current.index + 1) : ""), window.location.hash !== "#" + instance.currentHash && (firstRun && !instance.origHash && (instance.origHash = window.location.hash), instance.hashTimer && clearTimeout(instance.hashTimer), instance.hashTimer = setTimeout(function() {
                            "replaceState" in window.history ? (window.history[firstRun ? "pushState" : "replaceState"]({}, document.title, window.location.pathname + window.location.search + "#" + instance.currentHash), firstRun && (instance.hasCreatedHistory = !0)) : window.location.hash = instance.currentHash, instance.hashTimer = null
                        }, 300)))
                    },
                    "beforeClose.fb": function(e, instance, current) {
                        current && !1 !== current.opts.hash && (clearTimeout(instance.hashTimer), instance.currentHash && instance.hasCreatedHistory ? window.history.back() : instance.currentHash && ("replaceState" in window.history ? window.history.replaceState({}, document.title, window.location.pathname + window.location.search + (instance.origHash || "")) : window.location.hash = instance.origHash), instance.currentHash = null)
                    }
                }), $(window).on("hashchange.fb", function() {
                    var url = parseUrl(),
                        fb = null;
                    $.each($(".fancybox-container").get().reverse(), function(index, value) {
                        var tmp = $(value).data("FancyBox");
                        if (tmp && tmp.currentHash) return fb = tmp, !1
                    }), fb ? fb.currentHash === url.gallery + "-" + url.index || 1 === url.index && fb.currentHash == url.gallery || (fb.currentHash = null, fb.close()) : "" !== url.gallery && triggerFromUrl(url)
                }), setTimeout(function() {
                    "3.5.7" == $.fancybox.version && ($.fancybox.getInstance() || triggerFromUrl(parseUrl()))
                }, 50))
            })
        }(window, document, jQuery),
        function(document, $) {
            "use strict";
            var prevTime = (new Date).getTime();
            $(document).on({
                "onInit.fb": function(e, instance, current) {
                    instance.$refs.stage.on("mousewheel DOMMouseScroll wheel MozMousePixelScroll", function(e) {
                        var current = instance.current,
                            currTime = (new Date).getTime();
                        instance.group.length < 2 || !1 === current.opts.wheel || "auto" === current.opts.wheel && "image" !== current.type || (e.preventDefault(), e.stopPropagation(), current.$slide.hasClass("fancybox-animated") || (e = e.originalEvent || e, currTime - prevTime < 250 || (prevTime = currTime, instance[(-e.deltaY || -e.deltaX || e.wheelDelta || -e.detail) < 0 ? "next" : "previous"]())))
                    })
                }
            })
        }(document, jQuery),
        function($, window, document, undefined) {
            function CustomMenu(element, options) {
                this.element = element, this.options = $.extend({}, defaults, options), this._defaults = defaults, this._name = pluginName, this.init()
            }
            var pluginName = "MegaMenu",
                defaults = {
                    propertyName: "value"
                },
                menus = [];
            CustomMenu.prototype = {
                isOpen: !1,
                timeout: null,
                init: function() {
                    var that = this;
                    $(this).each(function(index, menu) {
                        that.node = menu.element, that.addListeners(menu.element);
                        var $menu = $(menu.element);
                        $menu.addClass("dropdownJavascript"), menus.push(menu.element), $menu.find("ul > li").each(function(index, submenu) {
                            $(submenu).find("ul").length > 0 && $(submenu).addClass("with-menu")
                        })
                    })
                },
                addListeners: function(menu) {
                    var that = this;
                    $(menu).on("mouseover", function(e) {
                        that.handleMouseOver.call(that, e)
                    }).on("mouseout", function(e) {
                        that.handleMouseOut.call(that, e)
                    })
                },
                handleMouseOver: function(e) {
                    var that = this;
                    this.clearTimeout();
                    for (var item = e.target || e.srcElement;
                        "LI" != item.nodeName && item != this.node;) item = item.parentNode;
                    "LI" == item.nodeName && (this.toOpen = item, this.timeout = setTimeout(function() {
                        that.open.call(that)
                    }, this.options.delay))
                },
                handleMouseOut: function() {
                    var that = this;
                    this.clearTimeout();
                    var _delayOut = this.options.delay;
                    _delayOut = 400, this.timeout = setTimeout(function() {
                        that.close.call(that)
                    }, _delayOut)
                },
                clearTimeout: function() {
                    this.timeout && (clearTimeout(this.timeout), this.timeout = null)
                },
                open: function() {
                    var that = this;
                    this.isOpen = !0;
                    var items = $(this.toOpen).parent().children("li");
                    $(items).each(function(index, item) {
                        $(item).find("ul").each(function(index, submenu) {
                            if (item != that.toOpen) $(item).removeClass("dropdownOpen"), that.close(item);
                            else if (!$(item).hasClass("dropdownOpen")) {
                                $(item).addClass("dropdownOpen");
                                for (var left = 0, node = submenu; node;) left += Math.abs(node.offsetLeft), node = node.offsetParent;
                                var right = left + submenu.offsetWidth;
                                $(submenu).outerHeight(), $(submenu).offset().top, $(window).scrollTop(), window.innerHeight;
                                $(item).removeClass("dropdownRightToLeft"), left < 0 && $(item).addClass("dropdownLeftToRight"), right > document.body.clientWidth && $(item).addClass("dropdownRightToLeft")
                            }
                        })
                    })
                },
                close: function(node) {
                    node || (this.isOpen = !1, node = this.node), $(node).find("li").each(function(index, item) {
                        $(item).removeClass("dropdownOpen")
                    })
                }
            }, $.fn[pluginName] = function(options) {
                return this.each(function() {
                    $.data(this, "plugin_" + pluginName) || $.data(this, "plugin_" + pluginName, new CustomMenu(this, options))
                })
            }
        }(jQuery, window, document),
        function(window, document, undefined) {
            function is(obj, type) {
                return typeof obj === type
            }

            function cssToDOM(name) {
                return name.replace(/([a-z])-([a-z])/g, function(str, m1, m2) {
                    return m1 + m2.toUpperCase()
                }).replace(/^-/, "")
            }

            function contains(str, substr) {
                return !!~("" + str).indexOf(substr)
            }

            function createElement() {
                return "function" != typeof document.createElement ? document.createElement(arguments[0]) : isSVG ? document.createElementNS.call(document, "http://www.w3.org/2000/svg", arguments[0]) : document.createElement.apply(document, arguments)
            }

            function getBody() {
                var body = document.body;
                return body || (body = createElement(isSVG ? "svg" : "body"), body.fake = !0), body
            }

            function injectElementWithStyles(rule, callback, nodes, testnames) {
                var style, ret, node, docOverflow, mod = "modernizr",
                    div = createElement("div"),
                    body = getBody();
                if (parseInt(nodes, 10))
                    for (; nodes--;) node = createElement("div"), node.id = testnames ? testnames[nodes] : mod + (nodes + 1), div.appendChild(node);
                return style = createElement("style"), style.type = "text/css", style.id = "s" + mod, (body.fake ? body : div).appendChild(style), body.appendChild(div), style.styleSheet ? style.styleSheet.cssText = rule : style.appendChild(document.createTextNode(rule)), div.id = mod, body.fake && (body.style.background = "", body.style.overflow = "hidden", docOverflow = docElement.style.overflow, docElement.style.overflow = "hidden", docElement.appendChild(body)), ret = callback(div, rule), body.fake ? (body.parentNode.removeChild(body), docElement.style.overflow = docOverflow, docElement.offsetHeight) : div.parentNode.removeChild(div), !!ret
            }

            function fnBind(fn, that) {
                return function() {
                    return fn.apply(that, arguments)
                }
            }

            function testDOMProps(props, obj, elem) {
                var item;
                for (var i in props)
                    if (props[i] in obj) return !1 === elem ? props[i] : (item = obj[props[i]], is(item, "function") ? fnBind(item, elem || obj) : item);
                return !1
            }

            function domToCSS(name) {
                return name.replace(/([A-Z])/g, function(str, m1) {
                    return "-" + m1.toLowerCase()
                }).replace(/^ms-/, "-ms-")
            }

            function nativeTestProps(props, value) {
                var i = props.length;
                if ("CSS" in window && "supports" in window.CSS) {
                    for (; i--;)
                        if (window.CSS.supports(domToCSS(props[i]), value)) return !0;
                    return !1
                }
                if ("CSSSupportsRule" in window) {
                    for (var conditionText = []; i--;) conditionText.push("(" + domToCSS(props[i]) + ":" + value + ")");
                    return conditionText = conditionText.join(" or "), injectElementWithStyles("@supports (" + conditionText + ") { #modernizr { position: absolute; } }", function(node) {
                        return "absolute" == getComputedStyle(node, null).position
                    })
                }
                return undefined
            }

            function testProps(props, prefixed, value, skipValueTest) {
                function cleanElems() {
                    afterInit && (delete mStyle.style, delete mStyle.modElem)
                }
                if (skipValueTest = !is(skipValueTest, "undefined") && skipValueTest, !is(value, "undefined")) {
                    var result = nativeTestProps(props, value);
                    if (!is(result, "undefined")) return result
                }
                for (var afterInit, i, propsLength, prop, before, elems = ["modernizr", "tspan", "samp"]; !mStyle.style && elems.length;) afterInit = !0, mStyle.modElem = createElement(elems.shift()), mStyle.style = mStyle.modElem.style;
                for (propsLength = props.length, i = 0; i < propsLength; i++)
                    if (prop = props[i], before = mStyle.style[prop], contains(prop, "-") && (prop = cssToDOM(prop)), mStyle.style[prop] !== undefined) {
                        if (skipValueTest || is(value, "undefined")) return cleanElems(), "pfx" != prefixed || prop;
                        try {
                            mStyle.style[prop] = value
                        } catch (e) {}
                        if (mStyle.style[prop] != before) return cleanElems(), "pfx" != prefixed || prop
                    }
                return cleanElems(), !1
            }

            function testPropsAll(prop, prefixed, elem, value, skipValueTest) {
                var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
                    props = (prop + " " + cssomPrefixes.join(ucProp + " ") + ucProp).split(" ");
                return is(prefixed, "string") || is(prefixed, "undefined") ? testProps(props, prefixed, value, skipValueTest) : (props = (prop + " " + domPrefixes.join(ucProp + " ") + ucProp).split(" "), testDOMProps(props, prefixed, elem))
            }

            function testAllProps(prop, value, skipValueTest) {
                return testPropsAll(prop, undefined, undefined, value, skipValueTest)
            }
            var classes = [],
                tests = [],
                ModernizrProto = {
                    _version: "3.3.1",
                    _config: {
                        classPrefix: "",
                        enableClasses: !0,
                        enableJSClass: !0,
                        usePrefixes: !0
                    },
                    _q: [],
                    on: function(test, cb) {
                        var self = this;
                        setTimeout(function() {
                            cb(self[test])
                        }, 0)
                    },
                    addTest: function(name, fn, options) {
                        tests.push({
                            name: name,
                            fn: fn,
                            options: options
                        })
                    },
                    addAsyncTest: function(fn) {
                        tests.push({
                            name: null,
                            fn: fn
                        })
                    }
                },
                Modernizr = function() {};
            Modernizr.prototype = ModernizrProto, Modernizr = new Modernizr;
            var prefixes = ModernizrProto._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : ["", ""];
            ModernizrProto._prefixes = prefixes;
            var docElement = document.documentElement,
                isSVG = "svg" === docElement.nodeName.toLowerCase();
            isSVG || function(window, document) {
                function addStyleSheet(ownerDocument, cssText) {
                    var p = ownerDocument.createElement("p"),
                        parent = ownerDocument.getElementsByTagName("head")[0] || ownerDocument.documentElement;
                    return p.innerHTML = "x<style>" + cssText + "</style>", parent.insertBefore(p.lastChild, parent.firstChild)
                }

                function getElements() {
                    var elements = html5.elements;
                    return "string" == typeof elements ? elements.split(" ") : elements
                }

                function addElements(newElements, ownerDocument) {
                    var elements = html5.elements;
                    "string" != typeof elements && (elements = elements.join(" ")), "string" != typeof newElements && (newElements = newElements.join(" ")), html5.elements = elements + " " + newElements, shivDocument(ownerDocument)
                }

                function getExpandoData(ownerDocument) {
                    var data = expandoData[ownerDocument[expando]];
                    return data || (data = {}, expanID++, ownerDocument[expando] = expanID, expandoData[expanID] = data), data
                }

                function createElement(nodeName, ownerDocument, data) {
                    if (ownerDocument || (ownerDocument = document), supportsUnknownElements) return ownerDocument.createElement(nodeName);
                    data || (data = getExpandoData(ownerDocument));
                    var node;
                    return node = data.cache[nodeName] ? data.cache[nodeName].cloneNode() : saveClones.test(nodeName) ? (data.cache[nodeName] = data.createElem(nodeName)).cloneNode() : data.createElem(nodeName), !node.canHaveChildren || reSkip.test(nodeName) || node.tagUrn ? node : data.frag.appendChild(node)
                }

                function createDocumentFragment(ownerDocument, data) {
                    if (ownerDocument || (ownerDocument = document), supportsUnknownElements) return ownerDocument.createDocumentFragment();
                    data = data || getExpandoData(ownerDocument);
                    for (var clone = data.frag.cloneNode(), i = 0, elems = getElements(), l = elems.length; i < l; i++) clone.createElement(elems[i]);
                    return clone
                }

                function shivMethods(ownerDocument, data) {
                    data.cache || (data.cache = {}, data.createElem = ownerDocument.createElement, data.createFrag = ownerDocument.createDocumentFragment, data.frag = data.createFrag()), ownerDocument.createElement = function(nodeName) {
                        return html5.shivMethods ? createElement(nodeName, ownerDocument, data) : data.createElem(nodeName)
                    }, ownerDocument.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + getElements().join().replace(/[\w\-:]+/g, function(nodeName) {
                        return data.createElem(nodeName), data.frag.createElement(nodeName), 'c("' + nodeName + '")'
                    }) + ");return n}")(html5, data.frag)
                }

                function shivDocument(ownerDocument) {
                    ownerDocument || (ownerDocument = document);
                    var data = getExpandoData(ownerDocument);
                    return !html5.shivCSS || supportsHtml5Styles || data.hasCSS || (data.hasCSS = !!addStyleSheet(ownerDocument, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), supportsUnknownElements || shivMethods(ownerDocument, data), ownerDocument
                }
                var supportsHtml5Styles, supportsUnknownElements, options = window.html5 || {},
                    reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
                    saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
                    expando = "_html5shiv",
                    expanID = 0,
                    expandoData = {};
                ! function() {
                    try {
                        var a = document.createElement("a");
                        a.innerHTML = "<xyz></xyz>", supportsHtml5Styles = "hidden" in a, supportsUnknownElements = 1 == a.childNodes.length || function() {
                            document.createElement("a");
                            var frag = document.createDocumentFragment();
                            return void 0 === frag.cloneNode || void 0 === frag.createDocumentFragment || void 0 === frag.createElement
                        }()
                    } catch (e) {
                        supportsHtml5Styles = !0, supportsUnknownElements = !0
                    }
                }();
                var html5 = {
                    elements: options.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",
                    version: "3.7.3",
                    shivCSS: !1 !== options.shivCSS,
                    supportsUnknownElements: supportsUnknownElements,
                    shivMethods: !1 !== options.shivMethods,
                    type: "default",
                    shivDocument: shivDocument,
                    createElement: createElement,
                    createDocumentFragment: createDocumentFragment,
                    addElements: addElements
                };
                window.html5 = html5, shivDocument(document), "object" == typeof module && module.exports && (module.exports = html5)
            }(void 0 !== window ? window : this, document);
            var omPrefixes = "Moz O ms Webkit",
                domPrefixes = ModernizrProto._config.usePrefixes ? omPrefixes.toLowerCase().split(" ") : [];
            ModernizrProto._domPrefixes = domPrefixes;
            var cssomPrefixes = ModernizrProto._config.usePrefixes ? omPrefixes.split(" ") : [];
            ModernizrProto._cssomPrefixes = cssomPrefixes;
            var atRule = function(prop) {
                var rule, length = prefixes.length,
                    cssrule = window.CSSRule;
                if (void 0 === cssrule) return undefined;
                if (!prop) return !1;
                if (prop = prop.replace(/^@/, ""), (rule = prop.replace(/-/g, "_").toUpperCase() + "_RULE") in cssrule) return "@" + prop;
                for (var i = 0; i < length; i++) {
                    var prefix = prefixes[i];
                    if (prefix.toUpperCase() + "_" + rule in cssrule) return "@-" + prefix.toLowerCase() + "-" + prop
                }
                return !1
            };
            ModernizrProto.atRule = atRule;
            var testStyles = ModernizrProto.testStyles = injectElementWithStyles,
                modElem = {
                    elem: createElement("modernizr")
                };
            Modernizr._q.push(function() {
                delete modElem.elem
            });
            var mStyle = {
                style: modElem.elem.style
            };
            Modernizr._q.unshift(function() {
                delete mStyle.style
            });
            ModernizrProto.testProp = function(prop, value, useValue) {
                return testProps([prop], undefined, value, useValue)
            };
            ModernizrProto.testAllProps = testPropsAll;
            ModernizrProto.prefixed = function(prop, obj, elem) {
                return 0 === prop.indexOf("@") ? atRule(prop) : (-1 != prop.indexOf("-") && (prop = cssToDOM(prop)), obj ? testPropsAll(prop, obj, elem) : testPropsAll(prop, "pfx"))
            };
            ModernizrProto.testAllProps = testAllProps, Modernizr.addTest("cssanimations", testAllProps("animationName", "a", !0)), Modernizr.addTest("csstransitions", testAllProps("transition", "all", !0)), Modernizr.addTest("touchevents", function() {
                    var bool;
                    if ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch) bool = !0;
                    else {
                        var query = ["@media (", prefixes.join("touch-enabled),("), "heartz", ")", "{#modernizr{top:9px;position:absolute}}"].join("");
                        testStyles(query, function(node) {
                            bool = 9 === node.offsetTop
                        })
                    }
                    return bool
                }),
                function() {
                    var featureNames, feature, aliasIdx, result, nameIdx, featureName, featureNameSplit;
                    for (var featureIdx in tests)
                        if (tests.hasOwnProperty(featureIdx)) {
                            if (featureNames = [], feature = tests[featureIdx], feature.name && (featureNames.push(feature.name.toLowerCase()), feature.options && feature.options.aliases && feature.options.aliases.length))
                                for (aliasIdx = 0; aliasIdx < feature.options.aliases.length; aliasIdx++) featureNames.push(feature.options.aliases[aliasIdx].toLowerCase());
                            for (result = is(feature.fn, "function") ? feature.fn() : feature.fn, nameIdx = 0; nameIdx < featureNames.length; nameIdx++) featureName = featureNames[nameIdx], featureNameSplit = featureName.split("."), 1 === featureNameSplit.length ? Modernizr[featureNameSplit[0]] = result : (!Modernizr[featureNameSplit[0]] || Modernizr[featureNameSplit[0]] instanceof Boolean || (Modernizr[featureNameSplit[0]] = new Boolean(Modernizr[featureNameSplit[0]])), Modernizr[featureNameSplit[0]][featureNameSplit[1]] = result), classes.push((result ? "" : "no-") + featureNameSplit.join("-"))
                        }
                }(),
                function(classes) {
                    var className = docElement.className,
                        classPrefix = Modernizr._config.classPrefix || "";
                    if (isSVG && (className = className.baseVal), Modernizr._config.enableJSClass) {
                        var reJS = new RegExp("(^|\\s)" + classPrefix + "no-js(\\s|$)");
                        className = className.replace(reJS, "$1" + classPrefix + "js$2")
                    }
                    Modernizr._config.enableClasses && (className += " " + classPrefix + classes.join(" " + classPrefix), isSVG ? docElement.className.baseVal = className : docElement.className = className)
                }(classes), delete ModernizrProto.addTest, delete ModernizrProto.addAsyncTest;
            for (var i = 0; i < Modernizr._q.length; i++) Modernizr._q[i]();
            window.Modernizr = Modernizr
        }(window, document), $(function() {
            ParallaxScroll.init()
        });
    var ParallaxScroll = {
        showLogs: !1,
        round: 1e3,
        init: function() {
            if (this._log("init"), this._inited) return this._log("Already Inited"), void(this._inited = !0);
            this._requestAnimationFrame = function() {
                return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback, element) {
                    window.setTimeout(callback, 1e3 / 60)
                }
            }(), this._onScroll(!0)
        },
        _inited: !1,
        _properties: ["x", "y", "z", "rotateX", "rotateY", "rotateZ", "scaleX", "scaleY", "scaleZ", "scale"],
        _requestAnimationFrame: null,
        _log: function(message) {
            this.showLogs && console.log("Parallax Scroll / " + message)
        },
        _onScroll: function(noSmooth) {
            var scroll = $(document).scrollTop(),
                windowHeight = $(window).height();
            this._log("onScroll " + scroll), $("[data-parallax]").each($.proxy(function(index, el) {
                var $el = $(el),
                    properties = [],
                    applyProperties = !1,
                    style = $el.data("style");
                void 0 == style && (style = $el.attr("style") || "", $el.data("style", style));
                var iData, datas = [$el.data("parallax")];
                for (iData = 2; $el.data("parallax" + iData); iData++) datas.push($el.data("parallax-" + iData));
                var datasLength = datas.length;
                for (iData = 0; iData < datasLength; iData++) {
                    var data = datas[iData],
                        scrollFrom = data["from-scroll"];
                    void 0 == scrollFrom && (scrollFrom = Math.max(0, $(el).offset().top - windowHeight)), scrollFrom |= 0;
                    var scrollDistance = data.distance,
                        scrollTo = data["to-scroll"];
                    void 0 == scrollDistance && void 0 == scrollTo && (scrollDistance = windowHeight), scrollDistance = Math.max(0 | scrollDistance, 1);
                    var easing = data.easing,
                        easingReturn = data["easing-return"];
                    if (void 0 != easing && $.easing && $.easing[easing] || (easing = null), void 0 != easingReturn && $.easing && $.easing[easingReturn] || (easingReturn = easing), easing) {
                        var totalTime = data.duration;
                        void 0 == totalTime && (totalTime = scrollDistance), totalTime = Math.max(0 | totalTime, 1);
                        var totalTimeReturn = data["duration-return"];
                        void 0 == totalTimeReturn && (totalTimeReturn = totalTime), scrollDistance = 1;
                        var currentTime = $el.data("current-time");
                        void 0 == currentTime && (currentTime = 0)
                    }
                    void 0 == scrollTo && (scrollTo = scrollFrom + scrollDistance), scrollTo |= 0;
                    var smoothness = data.smoothness;
                    void 0 == smoothness && (smoothness = 30), smoothness |= 0, (noSmooth || 0 == smoothness) && (smoothness = 1), smoothness |= 0;
                    var scrollCurrent = scroll;
                    scrollCurrent = Math.max(scrollCurrent, scrollFrom), scrollCurrent = Math.min(scrollCurrent, scrollTo), easing && (void 0 == $el.data("sens") && $el.data("sens", "back"), scrollCurrent > scrollFrom && ("back" == $el.data("sens") ? (currentTime = 1, $el.data("sens", "go")) : currentTime++), scrollCurrent < scrollTo && ("go" == $el.data("sens") ? (currentTime = 1, $el.data("sens", "back")) : currentTime++), noSmooth && (currentTime = totalTime), $el.data("current-time", currentTime)), this._properties.map($.proxy(function(prop) {
                        var defaultProp = 0,
                            to = data[prop];
                        if (void 0 != to) {
                            "scale" == prop || "scaleX" == prop || "scaleY" == prop || "scaleZ" == prop ? defaultProp = 1 : to |= 0;
                            var prev = $el.data("_" + prop);
                            void 0 == prev && (prev = defaultProp);
                            var next = (scrollCurrent - scrollFrom) / (scrollTo - scrollFrom) * (to - defaultProp) + defaultProp,
                                val = prev + (next - prev) / smoothness;
                            if (easing && currentTime > 0 && currentTime <= totalTime) {
                                var from = defaultProp;
                                "back" == $el.data("sens") && (from = to, to = -to, easing = easingReturn, totalTime = totalTimeReturn), val = $.easing[easing](null, currentTime, from, to, totalTime)
                            }
                            val = Math.ceil(val * this.round) / this.round, val == prev && next == to && (val = to), properties[prop] || (properties[prop] = 0), properties[prop] += val, prev != properties[prop] && ($el.data("_" + prop, properties[prop]), applyProperties = !0)
                        }
                    }, this))
                }
                if (applyProperties) {
                    if (void 0 != properties.z) {
                        var perspective = data.perspective;
                        void 0 == perspective && (perspective = 800);
                        var $parent = $el.parent();
                        $parent.data("style") || $parent.data("style", $parent.attr("style") || ""), $parent.attr("style", "perspective:" + perspective + "px; -webkit-perspective:" + perspective + "px; " + $parent.data("style"))
                    }
                    void 0 == properties.scaleX && (properties.scaleX = 1), void 0 == properties.scaleY && (properties.scaleY = 1), void 0 == properties.scaleZ && (properties.scaleZ = 1), void 0 != properties.scale && (properties.scaleX *= properties.scale, properties.scaleY *= properties.scale, properties.scaleZ *= properties.scale);
                    var translate3d = "translate3d(" + (properties.x ? properties.x : 0) + "px, " + (properties.y ? properties.y : 0) + "px, " + (properties.z ? properties.z : 0) + "px)",
                        rotate3d = "rotateX(" + (properties.rotateX ? properties.rotateX : 0) + "deg) rotateY(" + (properties.rotateY ? properties.rotateY : 0) + "deg) rotateZ(" + (properties.rotateZ ? properties.rotateZ : 0) + "deg)",
                        scale3d = "scaleX(" + properties.scaleX + ") scaleY(" + properties.scaleY + ") scaleZ(" + properties.scaleZ + ")",
                        cssTransform = translate3d + " " + rotate3d + " " + scale3d + ";";
                    this._log(cssTransform), $el.attr("style", "transform:" + cssTransform + " -webkit-transform:" + cssTransform + " " + style)
                }
            }, this)), window.requestAnimationFrame ? window.requestAnimationFrame($.proxy(this._onScroll, this, !1)) : this._requestAnimationFrame($.proxy(this._onScroll, this, !1))
        }
    };
    ! function($, window, undefined) {
        "use strict";
        var Modernizr = window.Modernizr,
            $body = $("body");
        $.DLMenu = function(options, element) {
            this.$el = $(element), this._init(options)
        }, $.DLMenu.defaults = {
            animationClasses: {
                classin: "mk-vm-animate-in-" + mk_vertical_header_anim,
                classout: "mk-vm-animate-out-" + mk_vertical_header_anim
            },
            onLevelClick: function(el, name) {
                return !1
            },
            onLinkClick: function(el, ev) {
                return !1
            }
        }, $.DLMenu.prototype = {
            _init: function(options) {
                this.options = $.extend(!0, {}, $.DLMenu.defaults, options), this._config();
                var animEndEventNames = {
                        WebkitAnimation: "webkitAnimationEnd",
                        OAnimation: "oAnimationEnd",
                        msAnimation: "MSAnimationEnd",
                        animation: "animationend"
                    },
                    transEndEventNames = {
                        WebkitTransition: "webkitTransitionEnd",
                        MozTransition: "transitionend",
                        OTransition: "oTransitionEnd",
                        msTransition: "MSTransitionEnd",
                        transition: "transitionend"
                    };
                this.animEndEventName = animEndEventNames[Modernizr.prefixed("animation")] + ".dlmenu", this.transEndEventName = transEndEventNames[Modernizr.prefixed("transition")] + ".dlmenu", this.animEndEventNameUnsufixed = animEndEventNames[Modernizr.prefixed("animation")], this.transEndEventNameUnsufixed = transEndEventNames[Modernizr.prefixed("transition")], this.supportAnimations = Modernizr.cssanimations, this.supportTransitions = Modernizr.csstransitions, this._initEvents()
            },
            _config: function() {
                this.open = !1, this.$trigger = this.$el.children(".mk-vm-trigger"), this.$menu = this.$el.children("ul.mk-vm-menu"), this.$menuitems = this.$menu.find("li:not(.mk-vm-back)"), this.$back = this.$menu.find("li.mk-vm-back")
            },
            _initEvents: function() {
                var self = this;
                $(".mk-vm-menuwrapper a").on("transitionend", function(event) {
                    event.stopPropagation()
                }), this.$menuitems.on("click.dlmenu", "a", function(event) {
                    var $item = $(event.delegateTarget),
                        $submenu = $(event.currentTarget).siblings("ul.sub-menu");
                    if ($submenu.length > 0) {
                        var $flyin = $submenu.clone().css("opacity", 0).insertAfter(self.$menu),
                            onAnimationEndFn = function() {
                                var $parent = $item.parents(".mk-vm-subviewopen:first");
                                self.$menu.off(self.animEndEventName).removeClass(self.options.animationClasses.classout).addClass("mk-vm-subview"), $item.addClass("mk-vm-subviewopen"), $parent.removeClass("mk-vm-subviewopen").addClass("mk-vm-subview"), $flyin.remove();
                                var $txt = $item.find(".meni-item-text");
                                $txt.css("opacity", .99), setTimeout(function() {
                                    $txt.css("opacity", 1)
                                }, 0)
                            };
                        return setTimeout(function() {
                            $flyin.addClass(self.options.animationClasses.classin), self.$menu.addClass(self.options.animationClasses.classout), self.supportAnimations ? self.$menu.on(self.animEndEventName, onAnimationEndFn) : onAnimationEndFn.call(), self.options.onLevelClick($item, $item.children("a:first").text())
                        }), !1
                    }
                    self.options.onLinkClick($item, event)
                }), this.$back.on("click.dlmenu", function(event) {
                    var $this = $(this),
                        $submenu = $this.parents("ul.sub-menu:first"),
                        $item = $submenu.parent(),
                        $flyin = $submenu.clone().insertAfter(self.$menu),
                        onAnimationEndFn = function() {
                            self.$menu.off(self.animEndEventName).removeClass(self.options.animationClasses.classin), $flyin.remove()
                        };
                    return setTimeout(function() {
                        $flyin.addClass(self.options.animationClasses.classout), self.$menu.addClass(self.options.animationClasses.classin), self.supportAnimations ? self.$menu.on(self.animEndEventName, onAnimationEndFn) : onAnimationEndFn.call(), $item.removeClass("mk-vm-subviewopen");
                        var $subview = $this.parents(".mk-vm-subview:first");
                        $subview.is("li") && $subview.addClass("mk-vm-subviewopen"), $subview.removeClass("mk-vm-subview")
                    }), !1
                })
            },
            closeMenu: function() {
                this.open && this._closeMenu()
            },
            _closeMenu: function() {
                var self = this,
                    onTransitionEndFn = function() {
                        self.$menu.off(self.transEndEventName), self._resetMenu()
                    };
                this.$menu.removeClass("mk-vm-menuopen"), this.$menu.addClass("mk-vm-menu-toggle"), this.$trigger.removeClass("mk-vm-active"), this.supportTransitions ? this.$menu.on(this.transEndEventName, onTransitionEndFn) : onTransitionEndFn.call(), this.open = !1
            },
            openMenu: function() {
                this.open || this._openMenu()
            },
            _openMenu: function() {
                var self = this;
                $body.off("click").on("click.dlmenu", function() {
                    self._closeMenu()
                }), this.$menu.addClass("mk-vm-menuopen mk-vm-menu-toggle").on(this.transEndEventName, function() {
                    $(this).removeClass("mk-vm-menu-toggle")
                }), this.$trigger.addClass("mk-vm-active"), this.open = !0
            },
            _resetMenu: function() {
                this.$menu.removeClass("mk-vm-subview"), this.$menuitems.removeClass("mk-vm-subview mk-vm-subviewopen")
            }
        };
        var logError = function(message) {
            window.console && window.console.error(message)
        };
        $.fn.dlmenu = function(options) {
            if ("string" == typeof options) {
                var args = Array.prototype.slice.call(arguments, 1);
                this.each(function() {
                    var instance = $.data(this, "dlmenu");
                    return instance ? $.isFunction(instance[options]) && "_" !== options.charAt(0) ? void instance[options].apply(instance, args) : void logError("no such method '" + options + "' for dlmenu instance") : void logError("cannot call methods on dlmenu prior to initialization; attempted to call method '" + options + "'")
                })
            } else this.each(function() {
                var instance = $.data(this, "dlmenu");
                instance ? instance._init() : instance = $.data(this, "dlmenu", new $.DLMenu(options, this))
            });
            return this
        }
    }(jQuery, window),
    function($) {
        "use strict";
        $(".mk-main-navigation .menu-item-has-children").children("a").attr("aria-haspopup", "true"), $(".animated-column-item").attr("aria-haspopup", "true")
    }(jQuery),
    function($) {
        "use strict";

        function init() {
            $(".mk-accordion").each(function() {
                new Accordion(this)
            })
        }
        var Accordion = function(el) {
            var timeout, that = this,
                $el = $(el),
                initial = $el.data("initialindex");
            this.$el = $el, this.$single = $("." + this.dom.single, $el), this.isExpendable = "toggle-action" === $el.data("style"), this.bindClicks(), $(window).on("load", function() {
                -1 !== initial && that.show(that.$single.eq(initial), !0)
            }), $(window).on("resize", function() {
                clearTimeout(timeout), timeout = setTimeout(that.bindClicks.bind(that), 500)
            })
        };
        Accordion.prototype.dom = {
            single: "mk-accordion-single",
            tab: "mk-accordion-tab",
            pane: "mk-accordion-pane",
            current: "current",
            mobileToggle: "mobile-false",
            mobileBreakPoint: 767
        }, Accordion.prototype.bindClicks = function() {
            if (this.$single.off("click", "." + this.dom.tab), !window.matchMedia("(max-width: " + this.dom.mobileBreakPoint + "px)").matches || !this.$el.hasClass(this.dom.mobileToggle)) {
                this.$single.on("click", "." + this.dom.tab, this.handleEvent.bind(this));
                var $current = $("." + this.dom.current, this.$el);
                "none" === $("." + this.dom.pane, $current).css("display") && this.show($current)
            }
        }, Accordion.prototype.handleEvent = function(e) {
            e.preventDefault(), e.stopPropagation();
            var $single = $(e.delegateTarget);
            $single.hasClass(this.dom.current) ? this.isExpendable && this.hide($single) : this.show($single)
        }, Accordion.prototype.hide = function($single) {
            $single.removeClass(this.dom.current), $("." + this.dom.pane, $single).slideUp()
        }, Accordion.prototype.show = function($single, initial) {
            if (!this.isExpendable) {
                var that = this;
                this.hide($("." + this.dom.current, that.$el))
            }
            $single.addClass(this.dom.current), $("." + this.dom.pane, $single).slideDown("", function() {
                !initial && $(this).parents(".mk-accordion").hasClass("scroll-click") && (void 0 === $single.prev() && ($single = $single.prev()), window.scrollTo({
                    top: $single.offset().top - 100,
                    left: 0,
                    behavior: "smooth"
                }))
            })
        }, init(), $(window).on("vc_reload", init)
    }(jQuery),
    function($) {
        "use strict";
        var SkillDiagram = function(el) {
            this.el = el
        };
        SkillDiagram.prototype = {
            init: function() {
                this.cacheElements(), this.createDiagram(), this.$skills.each(this.createSkill.bind(this))
            },
            cacheElements: function() {
                this.$el = $(this.el), this.$skills = this.$el.find(".mk-meter-arch"), this.config = this.$el.data(), this.config.radius = this.config.dimension / 2
            },
            random: function(l, u) {
                return Math.floor(Math.random() * (u - l + 1) + l)
            },
            createDiagram: function() {
                var self = this;
                $(this.el).find("svg").remove(), this.diagram = Raphael(this.el, this.config.dimension, this.config.dimension), this.diagram.setViewBox(0, 0, this.config.dimension, this.config.dimension, !0), this.diagram.setSize("90%", "90%"), this.diagram.circle(this.config.radius, this.config.radius, 80).attr({
                    stroke: "none",
                    fill: this.config.circleColor
                }), this.title = this.diagram.text(this.config.radius, this.config.radius, this.config.defaultText).attr({
                    font: "22px helvetica",
                    fill: this.config.defaultTextColor
                }).toFront(), this.diagram.customAttributes.arc = function(value, color, rad) {
                    var v = 3.6 * value,
                        alpha = 360 == v ? 359.99 : v,
                        r = self.random(91, 240),
                        a = (r - alpha) * Math.PI / 180,
                        b = r * Math.PI / 180;
                    return {
                        path: [
                            ["M", self.config.radius + rad * Math.cos(b), self.config.radius - rad * Math.sin(b)],
                            ["A", rad, rad, 0, +(alpha > 180), 1, self.config.radius + rad * Math.cos(a), self.config.radius - rad * Math.sin(a)]
                        ],
                        stroke: color
                    }
                }
            },
            createSkill: function(id, el) {
                var self = this,
                    $this = $(el),
                    config = $this.data(),
                    newRad = 72 + 27 * (id + 1);
                this.diagram.path().attr({
                    "stroke-width": 28,
                    arc: [config.percent, config.color, newRad]
                }).mouseover(function() {
                    self.showSkill(this, config.name, config.percent)
                }).mouseout(function() {
                    self.hideSkill(this)
                })
            },
            showSkill: function(self, name, percent) {
                var $this = self;
                "VML" != Raphael.type && $this.toFront(), $this.animate({
                    "stroke-width": 50,
                    opacity: .9
                }, 800, "elastic"), this.title.stop().animate({
                    opacity: 0
                }, 250, ">", function() {
                    this.attr({
                        text: name + "\n" + percent + "%"
                    }).animate({
                        opacity: 1
                    }, 250, "<")
                }).toFront()
            },
            hideSkill: function(self) {
                var $this = self,
                    self = this;
                $this.stop().animate({
                    "stroke-width": 28,
                    opacity: 1
                }, 1e3, "elastic"), self.title.stop().animate({
                    opacity: 0
                }, 250, ">", function() {
                    self.title.attr({
                        text: self.config.defaultText
                    }).animate({
                        opacity: 1
                    }, 250, "<")
                })
            }
        };
        var init = function() {
            "undefined" != typeof Raphael && $(".mk-skill-diagram").each(function() {
                new SkillDiagram(this).init()
            })
        };
        init(), $(window).on("vc_reload", init)
    }(jQuery),
    function($) {
        "use strict";

        function tabDelegation() {
            var $this = $(this);
            $this.data().tab && $this.on("click", "a", openInTab)
        }

        function openInTab(e) {
            e.preventDefault();
            var $this = $(this),
                url = $this.attr("href");
            window.open(url, "_blank")
        }
        $('[data-js="tab-delegation"]').each(tabDelegation)
    }(jQuery),
    function($) {
        "use strict";
        var init = function() {
            var Toggle = function(el) {
                var that = this,
                    $el = $(el);
                this.$el = $el, $el.on("click", function() {
                    $el.hasClass("active-toggle") ? that.close() : that.open()
                })
            };
            Toggle.prototype.dom = {
                pane: "mk-toggle-pane",
                active: "active-toggle"
            }, Toggle.prototype.open = function() {
                var $this = this.$el;
                $this.addClass(this.dom.active), $this.siblings("." + this.dom.pane).slideDown(200)
            }, Toggle.prototype.close = function() {
                var $this = this.$el;
                $this.removeClass(this.dom.active), $this.siblings("." + this.dom.pane).slideUp(200)
            };
            var $toggle = $(".mk-toggle-title");
            $toggle.length && $toggle.each(function() {
                new Toggle(this)
            })
        };
        $(window).on("load vc_reload", init)
    }(jQuery), window.ajaxInit = function() {
            mk_lightbox_init(), mk_click_events(), mk_social_share_global(), mk_gallery(), loop_audio_init()
        }, window.ajaxDelayedInit = function() {
            mk_flexslider_init()
        }, $(document).ready(function() {
            mk_lightbox_init(), mk_login_form(), mk_backgrounds_parallax(), mk_flexslider_init(), mk_event_countdown(), mk_skill_meter(), mk_milestone(), mk_ajax_search(), mk_hover_events(), mk_portfolio_ajax(), product_loop_add_cart(), loop_audio_init(), mk_portfolio_widget(), mk_contact_form(), mk_blog_carousel(), mk_header_searchform(), mk_click_events(), mk_text_typer(), mk_tab_slider_func(), mkPositionSidebar(), $(window).on("load", function() {
                mk_unfold_footer(), mk_accordion_toggles_tooltip(), mk_gallery(), mk_theatre_responsive_calculator(), mk_start_tour_resize(), mk_header_social_resize(), mk_page_section_social_video_bg(), mk_one_page_scroller(), setTimeout(function() {
                    mk_mobile_tablet_responsive_calculator()
                }, 300), console.log("ready for rock")
            });
            var onDebouncedResize = function() {
                    mk_theatre_responsive_calculator(), mk_mobile_tablet_responsive_calculator(), mk_accordion_toggles_tooltip(), mk_start_tour_resize(), mk_header_social_resize(), setTimeout(function() {
                        mk_unfold_footer()
                    }, 300)
                },
                debounceResize = null;
            $(window).on("resize", function() {
                null !== debounceResize && clearTimeout(debounceResize), debounceResize = setTimeout(onDebouncedResize, 300)
            });
            var onDebouncedScroll = function() {
                    mk_skill_meter(), mk_milestone()
                },
                debounceScroll = null;
            $(window).on("scroll", function() {
                null !== debounceScroll && clearTimeout(debounceScroll), debounceScroll = setTimeout(onDebouncedScroll, 100)
            }), MK.utils.isMobile() && $("body").addClass("no-transform")
        }), $(window).on("vc_reload", function() {
            mk_flexslider_init(), loop_audio_init(), mk_tab_slider_func(), mk_event_countdown(), videoLoadState(), mk_page_section_social_video_bg(), mk_hover_events(), setTimeout(function() {
                mkPositionSidebar()
            }, 200)
        }), $(document).on("click", ".vc_control-btn-delete", function() {
            $(window).trigger("vc_reload")
        }), $(document).on("sortupdate", ".ui-sortable", function() {
            $(window).trigger("vc_reload")
        }), videoLoadState(),
        function($) {
            function initialize() {
                var $gmap = $(".gmap_widget");
                $gmap.length && "undefined" != typeof google && $gmap.each(run)
            }

            function run() {
                var $mapHolder = $(this),
                    myLatlng = new google.maps.LatLng($mapHolder.data("latitude"), $mapHolder.data("longitude")),
                    mapOptions = $mapHolder.data("options");
                mapOptions.mapTypeId = google.maps.MapTypeId.ROADMAP, mapOptions.center = myLatlng;
                var map = new google.maps.Map(this, mapOptions);
                new google.maps.Marker({
                    position: myLatlng,
                    map: map
                })
            }
            $(window).on("load vc_reload", initialize)
        }(jQuery),
        function($) {
            function run() {
                var options = $(this).data("options");
                options.template = '<a class="featured-image ' + options.tmp_col + '-columns" href="{{link}}" target="_' + options.tmp_target + '"><div class="item-holder"><img src="{{image}}" /><div class="image-hover-overlay"></div></div></a>', new Instafeed(options).run()
            }
            $(window).on("load", function() {
                var $feeds = $(".mk-instagram-feeds");
                $feeds.length && $feeds.each(run)
            })
        }(jQuery),
        function($) {
            $(window).on("load", function() {
                setTimeout(function() {
                    $(".chrome-flipbox-backface-fix").removeClass("chrome-flipbox-backface-fix")
                }, 300)
            })
        }(jQuery),
        function($) {
            $(window).on("load", function() {
                $(".vc_tta-tab a").on("click", function() {
                    setTimeout(function() {
                        $(window).trigger("resize")
                    }, 100)
                })
            })
        }(jQuery),
        function($) {
            $(window).on("load", function() {
                $("#mk-vm-menu .menu-item-has-children, #mk-vm-menu .mk-vm-back").on("mouseenter", function() {
                    var $header_inner = $(this).closest(".mk-header-inner"),
                        $header_inner_height = $header_inner.outerHeight(),
                        $header_bg = $header_inner.find(".mk-header-bg"),
                        total_height = 0;
                    $header_bg.css("height", "100%"), setTimeout(function() {
                        $header_inner.children(":visible").each(function() {
                            total_height += $(this).outerHeight(!0)
                        }), total_height -= $header_bg.height(), total_height < $header_inner_height ? $header_bg.css("height", "100%") : $header_bg.css("height", total_height + "px")
                    }, 600)
                })
            })
        }(jQuery),
        function($) {
            function set_lightbox_href() {
                var $product_img = $(this).find("img"),
                    $lightbox = $(this).find(".mk-lightbox");
                setTimeout(function() {
                    var image_url = $product_img.attr("src"),
                        image_suffix = image_url.substr(image_url.lastIndexOf(".") - image_url.length),
                        image_url = image_url.slice(0, image_url.lastIndexOf("-"));
                    $lightbox.attr("href", image_url + image_suffix)
                }, 300)
            }
            $(window).on("load", function() {
                if (!($(".woo-variation-gallery-thumbnail-wrapper").length > 0)) {
                    var $variations_form = $(".variations_form");
                    if ($variations_form.length) {
                        var $varitions_selects = $variations_form.find(".variations").find(".value").find("select");
                        $varitions_selects.on("change", function() {
                            var $all_img_container = $(".mk-product-image .mk-woocommerce-main-image");
                            $all_img_container.length && $($all_img_container).each(set_lightbox_href)
                        }), $varitions_selects.trigger("change")
                    }
                }
            })
        }(jQuery), MK.utils.showBackgroundVideo || function($) {
            MK.utils.isMobile() && ($(".mk-section-video video").remove(), $(".mk-section-video").addClass("mk-section-video-disable"))
        }(jQuery),
        function($) {
            $(window).on("load", function() {
                $(document).on("yith-wcan-ajax-filtered yith_infs_added_elem yith-wcan-ajax-reset-filtered", function() {
                    setTimeout(function() {
                        MK.utils.eventManager.publish("ajaxLoaded"), MK.core.initAll(document)
                    }, 1e3)
                }), $(document).on("yith-wcan-ajax-filtered yith-wcan-ajax-reset-filtered", function() {
                    setTimeout(function() {
                        $(".woocommerce-ordering").on("change", "select.orderby", function() {
                            $(this).closest("form").submit()
                        })
                    }, 1e3)
                })
            })
        }(jQuery),
        function(e) {
            var a = window.location,
                n = a.hash;
            if (n.length && n.substring(1).length) {
                var hSuf = n.substring(1).replace(/[!"#$%&'()*+,./:;<=>?@[\]^`{|}~]/g, "\\$&");
                if (!e(".vc_row, .mk-main-wrapper-holder, .mk-page-section, #comments").filter("#" + hSuf).length) return;
                n = n.replace("!loading", "");
                var i = n + "!loading";
                a.hash = i
            }
        }(jQuery);
    var progressButton = {
        loader: function(form) {
            MK.core.loadDependencies([MK.core.path.plugins + "tweenmax.js"], function() {
                var $form = form,
                    progressBar = $form.find(".mk-progress-button .mk-progress-inner"),
                    buttonText = $form.find(".mk-progress-button .mk-progress-button-content");
                (new TimelineLite).to(progressBar, 0, {
                    width: "100%",
                    scaleX: 0,
                    scaleY: 1
                }).to(buttonText, .3, {
                    y: -5
                }).to(progressBar, 1.5, {
                    scaleX: 1,
                    ease: Power2.easeInOut
                }, "-=.1").to(buttonText, .3, {
                    y: 0
                }).to(progressBar, .3, {
                    scaleY: 0
                })
            })
        },
        success: function(form) {
            MK.core.loadDependencies([MK.core.path.plugins + "tweenmax.js"], function() {
                function hideSuccessMessage() {
                    progressButtonSuccess.reverse()
                }
                var $form = form,
                    buttonText = $form.find(".mk-button .mk-progress-button-content, .mk-contact-button .mk-progress-button-content"),
                    successIcon = $form.find(".mk-progress-button .state-success"),
                    progressButtonSuccess = new TimelineLite({
                        onComplete: hideSuccessMessage
                    });
                progressButtonSuccess.to(buttonText, .3, {
                    paddingRight: 20,
                    ease: Power2.easeInOut
                }, "+=1").to(successIcon, .3, {
                    opacity: 1
                }).to(successIcon, 2, {
                    opacity: 1
                })
            })
        },
        error: function(form) {
            MK.core.loadDependencies([MK.core.path.plugins + "tweenmax.js"], function() {
                function hideErrorMessage() {
                    progressButtonError.reverse()
                }
                var $form = form,
                    buttonText = $form.find(".mk-button .mk-progress-button-content, .mk-contact-button .mk-progress-button-content"),
                    errorIcon = $form.find(".mk-progress-button .state-error"),
                    progressButtonError = new TimelineLite({
                        onComplete: hideErrorMessage
                    });
                progressButtonError.to(buttonText, .3, {
                    paddingRight: 20
                }, "+=1").to(errorIcon, .3, {
                    opacity: 1
                }).to(errorIcon, 2, {
                    opacity: 1
                })
            })
        }
    };
    $("#mc-embedded-subscribe-form").on("submit", function(e) {
            var $this = $(this);
            e.preventDefault(), $.ajax({
                url: MK.core.path.ajaxUrl,
                type: "POST",
                data: {
                    action: "mk_ajax_subscribe",
                    email: $this.find(".mk-subscribe--email").val(),
                    list_id: $this.find(".mk-subscribe--list-id").val(),
                    optin: $this.find(".mk-subscribe--optin").val()
                },
                success: function(res) {
                    $this.parent().find(".mk-subscribe--message").html($.parseJSON(res).message)
                }
            })
        }), "undefined" != typeof exports && (exports.addClass = addClass, exports.removeClass = removeClass),
        function(root, factory) {
            "function" == typeof define && define.amd ? define([], factory) : "object" == typeof exports ? module.exports = factory() : root.debounce = factory()
        }(this, function() {
            "use strict";
            return function(callback, delay) {
                var timeout;
                return function() {
                    var context = this,
                        args = arguments;
                    clearTimeout(timeout), timeout = setTimeout(function() {
                        callback.apply(context, args)
                    }, delay)
                }
            }
        }), "undefined" != typeof exports && (exports.validateEmail = validateEmail, exports.validateText = validateText),
        function($) {
            "use strict";

            function deactivate() {
                $contactBtn.removeClass("is-active"), $backBtn.removeClass("is-active")
            }

            function activate() {
                $contactBtn.addClass("is-active"), $backBtn.addClass("is-active")
            }
            var $wrapper = $(".js-bottom-corner-btns"),
                $contactBtn = $wrapper.find(".js-bottom-corner-btn--contact"),
                $backBtn = $wrapper.find(".js-bottom-corner-btn--back");
            $contactBtn.length;
            $backBtn.length && MK.utils.scrollSpy(400, {
                before: deactivate,
                after: activate
            })
        }(jQuery),
        function($) {
            "use strict";
            $(".mk-fullscreen-nav-close, .mk-fullscreen-nav-wrapper, #fullscreen-navigation a").on("click", function(e) {
                $(".mk-fullscreen-nav").removeClass("opened"), $(".mk-dashboard-trigger").removeClass("fullscreen-active"), $("body").removeClass("fullscreen-nav-opened");
                var anchor = MK.utils.detectAnchor(this),
                    $this = $(this);
                if (anchor.length) {
                    var href = $this.attr("href").split("#")[0]; - 1 !== window.location.href.indexOf(href) && e.preventDefault(), MK.utils.scrollToAnchor(anchor)
                } else "#" === $this.attr("href") && e.preventDefault()
            }), $(".fullscreen-navigation-ul .menu-sub-level-arrow").on("click", function() {
                $(this).siblings(".sub-menu").slideToggle()
            })
        }(jQuery),
        function($) {
            "use strict";
            var $navList = $(".main-navigation-ul"),
                megaMenu = function() {
                    $navList.MegaMenu({
                        type: "vertical",
                        delay: 200
                    })
                };
            $(window).on("load", megaMenu)
        }(jQuery),
        function($) {
            "use strict";
            var onePageNavItem = function() {
                    var $this = $(this),
                        link = $this.find("a"),
                        anchor = MK.utils.detectAnchor(link);
                    if (anchor.length) {
                        $this.removeClass("current-menu-item current-menu-ancestor current-menu-parent");
                        var activeNav = function(state) {
                            return function() {
                                $this[state ? "addClass" : "removeClass"]("current-menu-item"), window.history.replaceState(void 0, void 0, [state ? anchor : " "])
                            }
                        };
                        MK.utils.scrollSpy($(anchor)[0], {
                            before: activeNav(!1),
                            active: activeNav(!0),
                            after: activeNav(!1)
                        })
                    }
                },
                $navItems = $(".js-main-nav").find("li");
            $(window).on("load", function() {
                setTimeout(function() {
                    $navItems.each(onePageNavItem)
                }, 1e3)
            })
        }(jQuery),
        function($) {
            "use strict";

            function toggleResMenu(e) {
                e.preventDefault();
                var $this = $(this),
                    $headerInner = $this.parents("header"),
                    $resMenu = $headerInner.find(".mk-responsive-wrap"),
                    searchBox = $(".responsive-searchform .text-input");
                $("#wpadminbar").height();
                $body.hasClass("mk-opened-nav") ? ($this.removeClass("is-active"), $body.removeClass("mk-opened-nav").addClass("mk-closed-nav").trigger("mk-closed-nav"), $resMenu.hide(), $post_nav.removeClass("post-nav-backward")) : ($this.addClass("is-active"), $body.removeClass("mk-closed-nav").addClass("mk-opened-nav").trigger("mk-opened-nav"), $resMenu.show(), $post_nav.addClass("post-nav-backward")), searchBox.hasClass("input-focused") && searchBox.removeClass("input-focused")
            }
            var $window = $(window),
                $body = $("body"),
                $resMenuWrap = $(".mk-responsive-wrap"),
                $post_nav = $(".mk-post-nav"),
                $toolbar = $(".mk-header-toolbar"),
                $resMenuLink = $(".mk-nav-responsive-link"),
                hasResMenu = $resMenuWrap.length > 0,
                windowHeight = $window.height(),
                screenHeight = screen.height;
            if ($(".mk-toolbar-resposnive-icon").on("click", function(e) {
                    e.preventDefault(), console.log("clicked"), $body.hasClass("toolbar-opened") ? ($body.removeClass("toolbar-opened").addClass("toolbar-closed"), $toolbar.hide()) : ($body.removeClass("toolbar-closed").addClass("toolbar-opened"), $toolbar.show())
                }), hasResMenu || $(".vc_mk_header")) {
                $resMenuLink.each(function() {
                    $(this).on("click", toggleResMenu)
                }), $(window).on("vc_reload", function() {
                    $(".vc_mk_header .mk-nav-responsive-link").each(function() {
                        $(this).on("click", toggleResMenu)
                    })
                });
                var isVirtualKeyboard = function() {
                        var currentWindowHeight = $window.height(),
                            currentScreenHeight = screen.height,
                            searchBox = $(".responsive-searchform .text-input"),
                            searchBoxIsFocused = !1;
                        return searchBox.on("touchstart touchend", function(e) {
                            searchBox.addClass("input-focused")
                        }), searchBoxIsFocused = searchBox.is(":focus") || searchBox.hasClass("input-focused"), !(!$body.hasClass("mk-opened-nav") || !searchBoxIsFocused || currentScreenHeight != screenHeight || currentWindowHeight == windowHeight)
                    },
                    hideResMenu = function() {
                        MK.utils.isResponsiveMenuState() && (isVirtualKeyboard() || ($body.hasClass("mk-opened-nav") && $resMenuLink.filter(".is-active").trigger("click"), $resMenuWrap.hide()))
                    };
                $resMenuWrap.on("click", "a", hideResMenu)
            }
        }(jQuery),
        function($) {
            "use strict";

            function toggleSubMenu(e) {
                e.preventDefault();
                var $this = $(this);
                $this.hasClass("mk-nav-sub-closed") ? $this.siblings("ul").slideDown(450).end().removeClass("mk-nav-sub-closed").addClass("mk-nav-sub-opened") : $this.siblings("ul").slideUp(450).end().removeClass("mk-nav-sub-opened").addClass("mk-nav-sub-closed")
            }

            function toggleFullMenu(e) {
                e.preventDefault();
                var $this = $(this),
                    $body = $("body"),
                    $fullscreen_box = $(".mk-fullscreen-nav");
                $this.hasClass("dashboard-style") ? $this.hasClass("dashboard-active") ? ($this.removeClass("dashboard-active"), $body.removeClass("dashboard-opened")) : ($this.addClass("dashboard-active"), $body.addClass("dashboard-opened")) : $this.hasClass("fullscreen-style") && ($this.hasClass("fullscreen-active") ? ($this.removeClass("fullscreen-active"), $body.removeClass("fullscreen-nav-opened"), $fullscreen_box.removeClass("opened")) : ($this.addClass("fullscreen-active"), $body.addClass("fullscreen-nav-opened"), $fullscreen_box.addClass("opened")))
            }
            var $header = $(".mk-header");
            ($header.length > 0 || $(".vc_mk_header")) && ($header.attr("data-header-style"), $(".sidedash-navigation-ul > li").each(function() {
                $(this).children("ul").siblings("a").after('<span class="mk-nav-arrow mk-nav-sub-closed"><svg class="mk-svg-icon" data-name="mk-moon-arrow-down" data-cacheid="2" style=" height:14px; width: 14px; " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M512 192l-96-96-160 160-160-160-96 96 256 255.999z"></path></svg></span>')
            }), $(".mk-nav-arrow").each(function() {
                $(this).stop(!0).on("click", toggleSubMenu)
            }), $(".mk-dashboard-trigger").each(function() {
                $(this).on("click", toggleFullMenu)
            }), $(window).on("vc_reload", function() {
                $(".vc_mk_header .mk-dashboard-trigger").each(function() {
                    $(this).on("click", toggleFullMenu)
                }), $(".vc_mk_header .mk-nav-arrow").each(function() {
                    $(this).stop(!0).on("click", toggleSubMenu)
                })
            }), $("html").on("click", function() {
                $("body").removeClass("dashboard-opened"), $(".mk-dashboard-trigger").removeClass("dashboard-active")
            }))
        }(jQuery),
        function($) {
            "use strict";
            var $verticalMenu = $("#mk-vm-menu"),
                verticalMenu = function() {
                    $verticalMenu.data("vertical-menu") || MK.utils.isResponsiveMenuState() || ($verticalMenu.dlmenu(), $verticalMenu.data("vertical-menu", !0))
                };
            verticalMenu(), $(window).on("resize", verticalMenu)
        }(jQuery),
        function($) {
            "use strict";
            $(".mk-main-navigation > .main-navigation-ul > .menu-item-language").addClass("no-mega-menu").css("visibility", "visible"), $(".mk-main-navigation .menu-item-language > a").addClass("menu-item-link")
        }(jQuery),
        function($) {
            "use strict";

            function changeSkin(e, skin) {
                $header.attr("data-transparent-skin", skin);
                var contrast = "light" === skin ? "dark" : "light";
                $header.addClass(skin + "-skin"), $header.removeClass(contrast + "-skin")
            }
            var $header = $(".mk-header").first();
            if ($header.length > 0) {
                var $window = $(window),
                    $document = $(document),
                    $headerHolder = $header.find(".mk-header-holder"),
                    $paddingWrapper = $header.find(".mk-header-padding-wrapper"),
                    config = $header.data(),
                    isStickyLazy = "lazy" === config.stickyStyle,
                    isStickyFixed = "fixed" === config.stickyStyle,
                    isStickySlide = "slide" === config.stickyStyle;
                (function() {
                    return 4 !== config.headerStyle
                })() && MK.utils.eventManager.subscribe("firstElSkinChange", changeSkin), isStickyLazy ? 2 !== config.headerStyle && function() {
                    var wScrollCurrent = 0,
                        wScrollBefore = 0,
                        wScrollDiff = 0,
                        wHeight = 0,
                        dHeight = 0,
                        setSizes = function() {
                            dHeight = $document.height(), wHeight = $window.height()
                        },
                        onScroll = function() {
                            wScrollCurrent = MK.val.scroll(), wScrollDiff = wScrollBefore - wScrollCurrent, wScrollCurrent <= 0 ? ($headerHolder.removeClass("header--hidden"), $header.removeClass("a-sticky"), $("body").trigger("mk:header-unsticky")) : wScrollDiff > 0 && $headerHolder.hasClass("header--hidden") ? ($headerHolder.removeClass("header--hidden"), $header.addClass("a-sticky"), $("body").trigger("mk:header-sticky")) : wScrollDiff < 0 && (wScrollCurrent + wHeight >= dHeight && $headerHolder.hasClass("header--hidden") ? ($headerHolder.removeClass("header--hidden"), $header.addClass("a-sticky"), $("body").trigger("mk:header-sticky")) : ($headerHolder.addClass("header--hidden"), $header.removeClass("a-sticky"), $("body").trigger("mk:header-unsticky"))), wScrollBefore = wScrollCurrent
                        };
                    setSizes(), onScroll(), $window.on("resize", MK.utils.throttle(100, setSizes)), $window.on("scroll", MK.utils.throttle(500, onScroll))
                }() : isStickyFixed ? function() {
                    var scrollPos, sticked = !1,
                        toggleState = function() {
                            if ((scrollPos = MK.val.scroll() + MK.val.adminbarHeight()) > MK.val.stickyOffset() && !MK.utils.isResponsiveMenuState()) {
                                if (sticked) return;
                                $header.addClass("a-sticky"), sticked = !0, $("body").trigger("mk:header-sticky")
                            } else {
                                if (!sticked) return;
                                $header.removeClass("a-sticky"), sticked = !1, $("body").trigger("mk:header-unsticky")
                            }
                        };
                    toggleState(), $window.on("scroll", MK.utils.throttle(100, toggleState)), $window.on("resize", MK.utils.throttle(100, toggleState))
                }() : isStickySlide && function() {
                    var sticked = !1,
                        onScroll = function() {
                            if (MK.val.scroll() > MK.val.stickyOffset()) {
                                if (sticked) return;
                                $header.addClass("pre-sticky"), $paddingWrapper.addClass("enable-padding"), setTimeout(function() {
                                    $header.addClass("a-sticky"), $("body").trigger("mk:header-sticky")
                                }, 1), sticked = !0
                            } else {
                                if (!sticked) return;
                                $header.removeClass("a-sticky"), $header.removeClass("pre-sticky"), $paddingWrapper.removeClass("enable-padding"), sticked = !1, $("body").trigger("mk:header-unsticky")
                            }
                        };
                    onScroll(), $window.on("scroll", MK.utils.throttle(100, onScroll))
                }()
            }
        }(jQuery),
        function($) {
            "use strict";

            function normalizeClick() {
                $(this).on("click", handleClick)
            }

            function handleClick(e) {
                "none" !== $(e.currentTarget).find("> ul").css("display") || (e.preventDefault(), e.stopPropagation())
            }
            "ontouchstart" in document.documentElement && $(".mk-main-navigation .menu-item-has-children").each(normalizeClick)
        }(jQuery),
        function($) {
            "use strict";
            MK.ui.preloader = {
                dom: {
                    overlay: ".mk-body-loader-overlay"
                },
                hide: function() {
                    $(this.dom.overlay).fadeOut(600, "easeInOutExpo", function() {
                        $("body").removeClass("loading")
                    })
                }
            }
        }(jQuery),
        function($) {
            "use strict";
            var _ajaxUrl = MK.core.path.ajaxUrl,
                _instances = {};
            MK.utils.ajaxLoader = function(el) {
                var id = "#" + $(el).attr("id");
                if (void 0 !== _instances[id]) return _instances[id];
                this.id = id, this.el = el, this.isLoading = !1, this.xhrCounter = 0
            }, MK.utils.ajaxLoader.prototype = {
                init: function() {
                    this.initialized && void 0 === window.vc_iframe || (this.createInstance(), this.cacheElements(), this.initialized = !0)
                },
                cacheElements: function() {
                    this.$container = $(this.el), this.id = "#" + this.$container.attr("id"), this.categories = this.$container.data("loop-categories"), this.data = {}, this.data.action = "mk_load_more", this.data.query = this.$container.data("query"), this.data.atts = this.$container.data("loop-atts"), this.data.loop_iterator = this.$container.data("loop-iterator"), this.data.author = this.$container.data("loop-author"), this.data.posts = this.$container.data("loop-posts"), this.data.safe_load_more = this.$container.siblings("#safe_load_more").val(), this.data._wp_http_referer = this.$container.siblings('input[name="_wp_http_referer"]').val(), this.data.paged = 1, this.data.maxPages = this.$container.data("max-pages"), this.data.term = this.categories
                },
                createInstance: function() {
                    _instances[this.id] = this
                },
                load: function(unique) {
                    var self = this,
                        seq = ++this.xhrCounter;
                    if (this.isLoading = !0, this.$container.siblings(".mk-ajax-loaded-posts").length) {
                        var loaded_posts = this.$container.siblings(".mk-ajax-loaded-posts").attr("data-loop-loaded-posts");
                        1 != this.$container.attr("data-pagination-style") && (self.data.loaded_posts = loaded_posts.split(","))
                    }
                    return $.when($.ajax({
                        url: _ajaxUrl,
                        type: "POST",
                        data: self.data
                    })).done(function(response) {
                        self.onDone(response, unique, seq)
                    })
                },
                onDone: function(response, unique, seq) {
                    if (seq === this.xhrCounter) {
                        var self = this;
                        response = $.parseJSON(response), response.unique = unique, response.id = this.id, this.$container.siblings(".mk-ajax-loaded-posts").length && this.$container.siblings(".mk-ajax-loaded-posts").attr("data-loop-loaded-posts", response.loaded_posts), this.setData({
                            maxPages: response.maxPages,
                            found_posts: response.found_posts,
                            loop_iterator: response.i
                        }), $(response.content).mk_imagesLoaded().then(function() {
                            MK.utils.eventManager.publish("ajaxLoaded", response), self.isLoading = !1, self.initNewComponents()
                        })
                    } else console.log("XHR request nr " + seq + " aborted")
                },
                setData: function(atts) {
                    for (var att in atts) "term" === att && "*" === atts[att] ? this.data.term = "" : this.data[att] = atts[att]
                },
                getData: function(att) {
                    return this.data[att]
                },
                initNewComponents: function() {
                    window.ajaxInit(), setTimeout(window.ajaxDelayedInit, 1e3), MK.core.initAll(this.el)
                }
            }
        }(jQuery), MK.component.BackgroundImageSetter = function($) {
            "use strict";

            function run($layers) {
                $layers.filter(function() {
                    return !this.hasAttribute("mk-img-loaded")
                }).each(applyBg)
            }

            function applyBg() {
                var $this = $(this),
                    imgs = $this.data("mk-img-set");
                $this.css("background-image", "url(" + module.getImage(imgs) + ")"), $this.find(".mk-adaptive-image").attr("src", module.getImage(imgs))
            }

            function handleResize($layers) {
                updateScreenSize(), hasSwitched() && (updateDevice(), run($layers))
            }

            function getScreenSize() {
                return {
                    w: $win.width(),
                    h: $win.height()
                }
            }

            function getDevice() {
                return screen.w > 1024 ? {
                    class: "desktop",
                    id: 2
                } : screen.w > 736 ? {
                    class: "tablet",
                    id: 1
                } : {
                    class: "mobile",
                    id: 0
                }
            }

            function getOrientation() {
                return screen.w > screen.h ? "landscape" : "portrait"
            }

            function updateScreenSize() {
                screen = getScreenSize()
            }

            function updateDevice() {
                lastOrientation !== orientation && (orientation = lastOrientation), lastDevice.id > device.id && (device = lastDevice)
            }

            function hasSwitched() {
                return lastOrientation = getOrientation(), lastDevice = getDevice(), lastOrientation !== orientation || lastDevice.class !== device.class
            }
            var module = {},
                $win = $(window),
                screen = getScreenSize(),
                orientation = getOrientation(),
                device = getDevice(),
                lastOrientation = orientation,
                lastDevice = device;
            return module.getImage = function(imgs) {
                if ("false" === imgs.responsive) return imgs.landscape.desktop ? imgs.landscape.desktop : imgs.landscape.external ? imgs.landscape.external : "";
                var hasOrientation = !!imgs[orientation],
                    imgOriented = imgs[hasOrientation ? orientation : Object.keys(imgs)[0]];
                return imgOriented[device.class] ? imgOriented[device.class] : imgOriented.external ? imgOriented.external : ""
            }, module.init = function($layers) {
                run($layers), $layers.attr("mk-img-loaded", "")
            }, module.onResize = function($layers) {
                $win.on("resize", MK.utils.throttle(500, function() {
                    handleResize($layers)
                }))
            }, module
        }(jQuery), jQuery(function($) {
            var init = function() {
                $allLayers = $("[data-mk-img-set]").filter(function(index) {
                    return !$(this).hasClass("mk-section-image") && !$(this).hasClass("background-layer") && !$(this).hasClass("mk-video-section-touch")
                }), MK.component.BackgroundImageSetter.onResize($allLayers), MK.component.BackgroundImageSetter.init($allLayers)
            };
            init(), $(window).on("vc_reload", init)
        }),
        function($) {
            "use strict";
            var val = MK.val;
            MK.component.FullHeight = function(el) {
                var $window = $(window),
                    $this = $(el),
                    config = $this.data("fullheight-config"),
                    container = document.getElementById("mk-theme-container"),
                    minH = config && config.min ? config.min : 0,
                    winH = null,
                    height = null,
                    update_count = 0,
                    testing = MK.utils.getUrlParameter("testing"),
                    offset = null;
                "IE" === MK.utils.browser.name && $this.css("height", "1px");
                var update = function() {
                    0 === update_count && (winH = $window.height(), offset = $this.offset().top - 1, height = Math.max(minH, winH - val.offsetHeaderHeight(offset)), $this.css("min-height", height), void 0 !== testing && update_count++)
                };
                return {
                    init: function() {
                        update(), $window.on("resize", update), $window.on("scroll", update), window.addResizeListener(container, update)
                    }
                }
            }
        }(jQuery),
        function($) {
            "use strict";
            var utils = (MK.core, MK.utils);
            MK.core.path;
            MK.ui.FullScreenGallery = function(element, settings) {
                this.element = element, this.config = settings, this.isFullScreen = !1
            }, MK.ui.FullScreenGallery.prototype = {
                dom: {
                    fullScrBtn: ".slick-full-screen",
                    exitFullScrBtn: ".slick-minimize",
                    playBtn: ".slick-play",
                    pauseBtn: ".slick-pause",
                    shareBtn: ".slick-share",
                    socialShare: ".slick-social-share",
                    wrapper: ".slick-slider-wrapper",
                    slider: ".slick-slides",
                    slides: ".slick-slide",
                    dots: ".slick-dot",
                    active: ".slick-active",
                    hiddenClass: "is-hidden",
                    dataId: "slick-index"
                },
                tpl: {
                    dot: '<div class="slick-dot"></div>',
                    next: '<a href="javascript:;" class="slick-next"> <svg width="33px" height="65px"> <polyline fill="none" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points=" 0.5,0.5 32.5,32.5 0.5,64.5"/> </svg> </a>',
                    prev: '<a href="javascript:;" class="slick-prev"> <svg  width="33px" height="65px"> <polyline fill="none" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points=" 32.5,64.5 0.5,32.5 32.5,0.5"/> </svg> </a>'
                },
                init: function() {
                    var self = this;
                    self.cacheElements(), self.getViewportSizes(), self.updateSizes("window"), self.create(), self.updateCacheElements(), self.createPagination(), self.bindEvents()
                },
                create: function() {
                    var self = this;
                    this.slick = this.$gallery.slick({
                        dots: !0,
                        arrows: !0,
                        infinite: !0,
                        speed: 300,
                        slidesToShow: 1,
                        centerMode: !0,
                        centerPadding: "0px",
                        variableWidth: !0,
                        autoplay: !1,
                        autoplaySpeed: 3e3,
                        useTransform: !0,
                        prevArrow: self.tpl.prev,
                        nextArrow: self.tpl.next,
                        customPaging: function(slider, i) {
                            return self.tpl.dot
                        }
                    })
                },
                cacheElements: function() {
                    this.$window = $(window), this.$gallery = $(this.element), this.$fullScrBtn = $(this.dom.fullScrBtn), this.$exitFullScrBtn = $(this.dom.exitFullScrBtn), this.$playBtn = $(this.dom.playBtn), this.$pauseBtn = $(this.dom.pauseBtn), this.$shareBtn = $(this.dom.shareBtn), this.$socialShare = $(this.dom.socialShare), this.$wrapper = $(this.dom.wrapper), this.$slider = $(this.dom.slider), this.$slides = $(this.dom.slides), this.$imgs = this.$slides.find("img"), this.$originalImgs = this.$imgs
                },
                updateCacheElements: function() {
                    this.$slides = $(this.dom.slides), this.$imgs = this.$slides.find("img"), this.$dots = $(this.dom.dots)
                },
                bindEvents: function() {
                    var self = this;
                    this.$fullScrBtn.on("click", this.toFullScreen.bind(this)), this.$exitFullScrBtn.on("click", this.exitFullScreen.bind(this)), this.$playBtn.on("click", this.play.bind(this)), this.$pauseBtn.on("click", this.pause.bind(this)), this.$shareBtn.on("click", this.toggleShare.bind(this)), this.$socialShare.on("click", "a", this.socialShare.bind(this)), this.$window.on("resize", this.onResize.bind(this)), this.$window.on("keydown", function(e) {
                        39 === e.keyCode && self.$gallery.slick("slickNext"), 37 === e.keyCode && self.$gallery.slick("slickPrev")
                    }), $(document).on("fullscreenchange mozfullscreenchange webkitfullscreenchange msfullcreenchange", this.exitFullScreen.bind(this))
                },
                getViewportSizes: function() {
                    this.screen = {
                        w: screen.width,
                        h: screen.height
                    }, this.window = {
                        w: this.$window.width(),
                        h: this.$window.height()
                    }
                },
                updateSizes: function(viewport) {
                    this.$wrapper.width(this[viewport].w), this.$wrapper.height("100%"), this.$imgs.height("100%")
                },
                createPagination: function() {
                    var self = this;
                    this.$dots.each(function(i) {
                        var img = self.$originalImgs.eq(i).attr("src");
                        $(this).css({
                            "background-image": "url(" + img + ")"
                        })
                    })
                },
                play: function(e) {
                    e.preventDefault(), this.$playBtn.addClass(this.dom.hiddenClass), this.$pauseBtn.removeClass(this.dom.hiddenClass), $(this.element).slick("slickPlay")
                },
                pause: function(e) {
                    e.preventDefault(), this.$pauseBtn.addClass(this.dom.hiddenClass), this.$playBtn.removeClass(this.dom.hiddenClass), $(this.element).slick("slickPause")
                },
                toggleShare: function(e) {
                    e.preventDefault(), this.$socialShare.toggleClass(this.dom.hiddenClass)
                },
                getCurentId: function() {
                    return this.$slides.filter(this.dom.active).data(this.dom.dataId)
                },
                toFullScreen: function() {
                    var self = this;
                    this.$fullScrBtn.addClass(this.dom.hiddenClass), this.$exitFullScrBtn.removeClass(this.dom.hiddenClass), this.$slider.hide().fadeIn(500), utils.launchIntoFullscreen(document.documentElement), this.updateSizes("screen"), $(this.element).slick("slickGoTo", this.getCurentId(), !0), setTimeout(function() {
                        self.isFullScreen = !0
                    }, 1e3)
                },
                exitFullScreen: function() {
                    this.isFullScreen && (this.$exitFullScrBtn.addClass(this.dom.hiddenClass), this.$fullScrBtn.removeClass(this.dom.hiddenClass), utils.exitFullscreen(), this.updateSizes("window"), $(this.element).slick("slickGoTo", this.getCurentId(), !0), this.isFullScreen = !1)
                },
                onResize: function() {
                    this.getViewportSizes(), this.updateSizes(this.isFullScreen ? "screen" : "window"), $(this.element).slick("refresh"), $(this.element).slick("slickGoTo", this.getCurentId(), !0), this.updateCacheElements(), this.createPagination()
                },
                socialShare: function(e) {
                    e.preventDefault();
                    var name, $this = $(e.currentTarget),
                        network = $this.data("network"),
                        id = this.config.id,
                        url = this.config.url,
                        title = this.$wrapper.find(".slick-title").text(),
                        picture = this.$slides.filter(this.dom.active).children().first().attr("src");
                    switch (network) {
                        case "facebook":
                            url = "https://www.facebook.com/sharer/sharer.php?picture=" + picture + "&u=" + url + "#id=" + id, name = "Facebook Share";
                            break;
                        case "twitter":
                            url = "http://twitter.com/intent/tweet?text=" + url + "#id=" + id, name = "Twitter Share";
                            break;
                        case "pinterest":
                            url = "http://pinterest.com/pin/create/bookmarklet/?media=" + picture + "&url=" + url + "&is_video=false&description=" + title, name = "Pinterest Share"
                    }
                    window.open(url, name, "height=380 ,width=660, resizable=0, toolbar=0, menubar=0, status=0, location=0, scrollbars=0")
                }
            }
        }(jQuery),
        function($) {
            "use strict";
            MK.component.Grid = function(el) {
                var $container = $(el),
                    config = $container.data("grid-config"),
                    isSlideshow = $container.closest('[data-mk-component="SwipeSlideshow"]').length,
                    miniGridConfig = {
                        container: el,
                        item: config.item + ":not(.is-hidden)",
                        gutter: 0
                    },
                    prepareForGrid = function() {
                        var $item = $(this);
                        "none" === $item.css("display") ? $item.addClass("is-hidden") : $item.removeClass("is-hidden")
                    },
                    create = function() {
                        function draw() {
                            $container.find(config.item).each(prepareForGrid), minigrid(miniGridConfig)
                        }

                        function redraw() {
                            timer && clearTimeout(timer), timer = setTimeout(draw, 100)
                        }
                        var timer = null;
                        draw(), $(window).off("resize", redraw), $(window).on("resize", redraw), MK.utils.eventManager.subscribe("item-expanded", redraw), MK.utils.eventManager.subscribe("ajaxLoaded", redraw), MK.utils.eventManager.subscribe("staticFilter", redraw)
                    };
                return {
                    init: function() {
                        isSlideshow || MK.core.loadDependencies([MK.core.path.plugins + "minigrid.js"], create)
                    }
                }
            }
        }(jQuery),
        function($) {
            "use strict";

            function createAll(scope) {
                for (var i = 0, l = families.length; i < l; i++) {
                    var family = families[i][0],
                        prefix = families[i][1],
                        $icons = getIcons(family, prefix, scope);
                    $icons.length && (_roundCount++, setTimeout(createIcons, 0, $icons, family, prefix))
                }
            }

            function getIcons(family, prefix, scope) {
                var $scope = $(scope),
                    $icons = $scope.find("[class*=" + prefix + "]"),
                    extraClassNames = extend[family];
                return extraClassNames ? (extraClassNames.forEach(function(className) {
                    var $icon = $scope.find(className);
                    $icons = $icons.add($icon)
                }), $icons) : $icons
            }

            function createIcons($icons, family, prefix, i, unicode) {
                var id = i || 0,
                    icon = $icons[id];
                if (!icon) return _roundCount--, void getIconsSprite(insertIcons, $icons, _roundCount, _config);
                var css = getComputedStyle(icon, ":before"),
                    classAttr = icon.getAttribute("class"),
                    name = !!classAttr && matchClass(classAttr.split(" "), prefix),
                    h = getComputedStyle(icon).fontSize,
                    config = createConfig(css, name, family, unicode, h),
                    cache = JSON.stringify(config);
                config && (_cache[cache] ? void 0 === _iconMap[cache] ? _iconMap[cache] = [$icons.eq(id)] : _iconMap[cache].push($icons.eq(id)) : (void 0 === _iconMap[cache] ? _iconMap[cache] = [$icons.eq(id)] : _iconMap[cache].push($icons.eq(id)), _cache[cache] = _cacheId.toString(), config.id = _cacheId, _config.push(config), _cacheId++)), createIcons($icons, family, prefix, ++id)
            }

            function insertIcons(sprite, $icons) {
                var $sprite = $(sprite),
                    idMap = ($sprite.find("svg"), invert(_cache));
                $sprite.each(function() {
                    var $svg = $(this),
                        id = $svg.attr("data-cacheid"),
                        configKey = idMap[id];
                    _cache[configKey] = this
                }), Object.keys(_iconMap).forEach(function(cacheKey) {
                    _iconMap[cacheKey].forEach(function($icons) {
                        $icons.each(function() {
                            var $svg = $(_cache[cacheKey]).clone(),
                                $icon = $(this);
                            $svg.length && function() {
                                $icon.parents(".pricing-features") || $icon.not(".mk-jupiter-icon-xing").not(".mk-jupiter-icon-square-xing").not(".mk-jupiter-icon-simple-xing").find(".mk-svg-icon").not('[data-name="mk-moon-zoom-in"]').remove()
                            }(), $icon.find("svg").length || ($icon.parents(".widget ul").length ? $icon.prepend($svg) : $icon.append($svg))
                        })
                    })
                }), MK.utils.eventManager.publish("iconsInsert")
            }

            function createConfig(css, name, family, unicode, height) {
                var hasGradient = checkGradient(css),
                    hasDirection = extractGradient("direction", css.background),
                    config = {
                        family: family,
                        unicode: unicode || decodeUnicode(css.content),
                        name: name,
                        gradient_type: !!hasGradient && extractGradient("type", css.background),
                        gradient_start: !!hasGradient && extractGradient("start", css.background),
                        gradient_stop: !!hasGradient && extractGradient("stop", css.background),
                        gradient_direction: !!hasDirection && extractGradient("direction", css.background).replace(" ", "-"),
                        height: height
                    };
                return !(!config.name && !config.unicode) && config
            }

            function matchClass(classes, prefix) {
                for (var i = 0, l = classes.length; i < l; i++)
                    if (-1 !== classes[i].indexOf(prefix)) return classes[i]
            }

            function checkGradient(css) {
                var bg = css.background;
                return (-1 !== bg.indexOf("radial") || -1 !== bg.indexOf("linear")) && bg
            }

            function extractGradient(attr, grad) {
                if (!grad) return !1;
                var f, t, isRadial = -1 !== grad.indexOf("radial"),
                    isLinear = -1 !== grad.indexOf("linear"),
                    hasDirection = -1 !== grad.indexOf("(to");
                if ("type" === attr) {
                    if (isRadial) return "radial";
                    if (isLinear) return "linear"
                } else if ("start" === attr) f = getStrPosition(grad, "rgb(", 1), t = getStrPosition(grad, "0%", 1);
                else if ("stop" === attr) f = getStrPosition(grad, "rgb(", 2), t = getStrPosition(grad, "100%", 1);
                else {
                    if ("direction" !== attr) return !1;
                    if (!hasDirection) return !1;
                    f = getStrPosition(grad, "(to", 1) + 4, t = getStrPosition(grad, ", rgb(", 1)
                }
                return grad.slice(f, t)
            }

            function getStrPosition(str, m, i) {
                return str.split(m, i).join(m).length
            }

            function decodeUnicode(content) {
                return !(!content || "none" === content) && escape(content).replace(/%22/g, "").replace("%u", "").toLowerCase()
            }

            function invert(obj) {
                var new_obj = {};
                for (var prop in obj) obj.hasOwnProperty(prop) && (new_obj[obj[prop]] = prop);
                return new_obj
            }
            var families = [
                    ["awesome-icons", "mk-icon-"],
                    ["icomoon", "mk-moon-"],
                    ["pe-line-icons", "mk-li-"],
                    ["theme-icons", "mk-jupiter-icon-"]
                ],
                extend = {
                    "awesome-icons": [],
                    icomoon: [],
                    "pe-line-icons": [],
                    "theme-icons": []
                },
                _cache = {},
                _cacheId = 0,
                _config = [],
                _roundCount = 0,
                _iconMap = {},
                getIconsSprite = function() {
                    function run(callback) {
                        var config = encodeURIComponent(JSON.stringify(_config));
                        $.ajax({
                            url: MK.core.path.ajaxUrl,
                            method: "POST",
                            data: {
                                action: "mk_get_icon",
                                iterator: iterator++,
                                config: config
                            },
                            success: function(sprite) {
                                callback(sprite, $icons), _config = [], _iconMap = {}, $icons = null
                            },
                            error: function(err) {
                                console.log("Icon load problem")
                            }
                        })
                    }
                    var $icons = null,
                        iterator = 0;
                    return function(callback, $els, count) {
                        $icons ? $icons.add($els) : $icons = $els, count || run(callback)
                    }
                }();
            $(window).on("load", function() {
                setTimeout(function() {
                    createAll(document), $(".mk-header").length && createAll(".mk-header"), $(".js-flexslider, .mk-flexslider").length && createAll(".js-flexslider, .mk-flexslider"), $(".mk-accordion").length && createAll(".mk-accordion")
                }, 1e3)
            }), MK.utils.eventManager.subscribe("ajaxLoaded", function() {
                setTimeout(createAll, 100, ".js-loop")
            }), MK.utils.eventManager.subscribe("ajax-preview", function() {
                setTimeout(createAll, 100, ".ajax-container")
            }), MK.utils.eventManager.subscribe("photoAlbum-open", function() {
                setTimeout(createAll, 100, ".gallery-share")
            }), MK.utils.eventManager.subscribe("quickViewOpen", function() {
                setTimeout(createAll, 300, ".mk-modal-content")
            })
        }(jQuery),
        function(t, e) {
            "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
        }("undefined" != typeof window ? window : this, function() {
            function t() {}
            var e = t.prototype;
            return e.on = function(t, e) {
                if (t && e) {
                    var i = this._events = this._events || {},
                        n = i[t] = i[t] || [];
                    return -1 == n.indexOf(e) && n.push(e), this
                }
            }, e.once = function(t, e) {
                if (t && e) {
                    this.on(t, e);
                    var i = this._onceEvents = this._onceEvents || {};
                    return (i[t] = i[t] || {})[e] = !0, this
                }
            }, e.off = function(t, e) {
                var i = this._events && this._events[t];
                if (i && i.length) {
                    var n = i.indexOf(e);
                    return -1 != n && i.splice(n, 1), this
                }
            }, e.emitEvent = function(t, e) {
                var i = this._events && this._events[t];
                if (i && i.length) {
                    var n = 0,
                        o = i[n];
                    e = e || [];
                    for (var r = this._onceEvents && this._onceEvents[t]; o;) {
                        var s = r && r[o];
                        s && (this.off(t, o), delete r[o]), o.apply(this, e), n += s ? 0 : 1, o = i[n]
                    }
                    return this
                }
            }, t
        }),
        function(t, e) {
            "use strict";
            "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function(i) {
                return e(t, i)
            }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter")) : t.imagesLoaded = e(t, t.EvEmitter)
        }(window, function(t, e) {
            function i(t, e) {
                for (var i in e) t[i] = e[i];
                return t
            }

            function n(t) {
                var e = [];
                if (Array.isArray(t)) e = t;
                else if ("number" == typeof t.length)
                    for (var i = 0; i < t.length; i++) e.push(t[i]);
                else e.push(t);
                return e
            }

            function o(t, e, r) {
                return this instanceof o ? ("string" == typeof t && (t = document.querySelectorAll(t)), this.elements = n(t), this.options = i({}, this.options), "function" == typeof e ? r = e : i(this.options, e), r && this.on("always", r), this.getImages(), h && (this.jqDeferred = new h.Deferred), void setTimeout(function() {
                    this.check()
                }.bind(this))) : new o(t, e, r)
            }

            function r(t) {
                this.img = t
            }

            function s(t, e) {
                this.url = t, this.element = e, this.img = new Image
            }
            var h = t.jQuery,
                a = t.console;
            o.prototype = Object.create(e.prototype), o.prototype.options = {}, o.prototype.getImages = function() {
                this.images = [], this.elements.forEach(this.addElementImages, this)
            }, o.prototype.addElementImages = function(t) {
                "IMG" == t.nodeName && this.addImage(t), !0 === this.options.background && this.addElementBackgroundImages(t);
                var e = t.nodeType;
                if (e && d[e]) {
                    for (var i = t.querySelectorAll("img"), n = 0; n < i.length; n++) {
                        var o = i[n];
                        this.addImage(o)
                    }
                    if ("string" == typeof this.options.background) {
                        var r = t.querySelectorAll(this.options.background);
                        for (n = 0; n < r.length; n++) {
                            var s = r[n];
                            this.addElementBackgroundImages(s)
                        }
                    }
                }
            };
            var d = {
                1: !0,
                9: !0,
                11: !0
            };
            return o.prototype.addElementBackgroundImages = function(t) {
                var e = getComputedStyle(t);
                if (e)
                    for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(e.backgroundImage); null !== n;) {
                        var o = n && n[2];
                        o && this.addBackground(o, t), n = i.exec(e.backgroundImage)
                    }
            }, o.prototype.addImage = function(t) {
                var e = new r(t);
                this.images.push(e)
            }, o.prototype.addBackground = function(t, e) {
                var i = new s(t, e);
                this.images.push(i)
            }, o.prototype.check = function() {
                function t(t, i, n) {
                    setTimeout(function() {
                        e.progress(t, i, n)
                    })
                }
                var e = this;
                return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function(e) {
                    e.once("progress", t), e.check()
                }) : void this.complete()
            }, o.prototype.progress = function(t, e, i) {
                this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded, this.emitEvent("progress", [this, t, e]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t), this.progressedCount == this.images.length && this.complete(), this.options.debug && a && a.log("progress: " + i, t, e)
            }, o.prototype.complete = function() {
                var t = this.hasAnyBroken ? "fail" : "done";
                if (this.isComplete = !0, this.emitEvent(t, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
                    var e = this.hasAnyBroken ? "reject" : "resolve";
                    this.jqDeferred[e](this)
                }
            }, r.prototype = Object.create(e.prototype), r.prototype.check = function() {
                return this.getIsImageComplete() ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void(this.proxyImage.src = this.img.src))
            }, r.prototype.getIsImageComplete = function() {
                return this.img.complete && void 0 !== this.img.naturalWidth
            }, r.prototype.confirm = function(t, e) {
                this.isLoaded = t, this.emitEvent("progress", [this, this.img, e])
            }, r.prototype.handleEvent = function(t) {
                var e = "on" + t.type;
                this[e] && this[e](t)
            }, r.prototype.onload = function() {
                this.confirm(!0, "onload"), this.unbindEvents()
            }, r.prototype.onerror = function() {
                this.confirm(!1, "onerror"), this.unbindEvents()
            }, r.prototype.unbindEvents = function() {
                this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
            }, s.prototype = Object.create(r.prototype), s.prototype.check = function() {
                this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url, this.getIsImageComplete() && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
            }, s.prototype.unbindEvents = function() {
                this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
            }, s.prototype.confirm = function(t, e) {
                this.isLoaded = t, this.emitEvent("progress", [this, this.element, e])
            }, o.makeJQueryPlugin = function(e) {
                (e = e || t.jQuery) && (h = e, h.fn.imagesLoaded = function(t, e) {
                    return new o(this, t, e).jqDeferred.promise(h(this))
                })
            }, o.makeJQueryPlugin(), o
        }),
        function($, window) {
            "use strict";

            function pagination() {
                function bindHandlers() {
                    isLoadBtn && $loadBtn.on("click", handleClick), isInfiniteScroll && $window.on("scroll", handleScroll), isHandlerBinded = !0
                }

                function unbindHandlers() {
                    isLoadBtn && $loadBtn.off("click", handleClick), isInfiniteScroll && $window.off("scroll", handleScroll), isHandlerBinded = !1
                }

                function handleClick(e) {
                    e.preventDefault(), ajaxLoader.isLoading || loadMore()
                }

                function handleScroll() {
                    scrollY() > scrollCheckPoint() && !ajaxLoader.isLoading && loadMore()
                }

                function loadMore() {
                    loadingIndicatorStart();
                    var page = ajaxLoader.getData("paged");
                    ajaxLoader.setData({
                        paged: ++page
                    }), ajaxLoader.load(unique)
                }

                function onLoad(e, response) {
                    void 0 !== response && response.id === id && (ajaxLoader.getData("found_posts") <= 0 && ajaxLoader.getData("paged") >= ajaxLoader.getData("maxPages") ? loadingIndicatorHide() : loadingIndicatorShow(), response.unique === unique && $container.append(response.content), loadingIndicatorStop())
                }

                function loadingIndicatorStart() {
                    isLoadBtn ? $loadBtn.addClass("is-active") : isInfiniteScroll && MK.ui.loader.add(".js-load-more-scroll")
                }

                function loadingIndicatorStop() {
                    isLoadBtn ? $loadBtn.removeClass("is-active") : isInfiniteScroll && MK.ui.loader.remove(".js-load-more-scroll")
                }

                function loadingIndicatorShow() {
                    isHandlerBinded || (isLoadBtn ? $loadBtn.show() : isInfiniteScroll && $loadScroll.show(), bindHandlers())
                }

                function loadingIndicatorHide() {
                    isHandlerBinded && (isLoadBtn ? $loadBtn.hide() : isInfiniteScroll && $loadScroll.hide(), unbindHandlers())
                }

                function spyScrollCheckPoint() {
                    var containerO = 0,
                        containerH = dynamicHeight($superContainer),
                        winH = dynamicHeight(window),
                        setVals = function() {
                            containerO = $superContainer.offset().top
                        };
                    return setVals(), $window.on("resize", function() {
                            requestAnimationFrame(setVals)
                        }),
                        function() {
                            return containerH() + containerO - 2 * winH()
                        }
                }
                var unique = Date.now(),
                    $container = $(this),
                    $superContainer = $container.parent(),
                    $loadBtn = $container.siblings(".js-loadmore-holder").find(".js-loadmore-button"),
                    $loadScroll = $(".js-load-more-scroll"),
                    style = $container.data("pagination-style"),
                    id = ($container.data("max-pages"), "#" + $container.attr("id")),
                    ajaxLoader = new MK.utils.ajaxLoader(id),
                    isLoadBtn = 2 === style,
                    isInfiniteScroll = 3 === style,
                    scrollCheckPoint = null,
                    isHandlerBinded = !1;
                ajaxLoader.init(),
                    function() {
                        MK.utils.eventManager.subscribe("ajaxLoaded", onLoad), bindHandlers(), isInfiniteScroll && (scrollCheckPoint = spyScrollCheckPoint()), $window.on("vc_reload", function() {
                            $window.off("scroll", handleScroll)
                        })
                    }()
            }
            var scrollY = MK.val.scroll,
                dynamicHeight = MK.val.dynamicHeight,
                $window = $(window);
            $(".js-loop").each(pagination), $window.on("vc_reload", function() {
                $(".js-loop").each(pagination)
            })
        }(jQuery, window),
        function($) {
            "use strict";

            function isHidden(el) {
                return null === el.offsetParent
            }
            MK.component.Masonry = function(el) {
                var $window = $(window),
                    $container = $(el),
                    config = $container.data("masonry-config"),
                    $masonryItems = $container.find(config.item),
                    cols = config.cols || 8,
                    wall = null,
                    init = function() {
                        MK.core.loadDependencies([MK.core.path.plugins + "freewall.js"], onDepLoad)
                    },
                    onDepLoad = function() {
                        masonry(), $window.on("resize", onResize), MK.utils.eventManager.subscribe("ajaxLoaded", onPostAddition), MK.utils.eventManager.subscribe("staticFilter", resize)
                    },
                    masonry = function() {
                        if (!isHidden(el)) {
                            var newCols;
                            newCols = window.matchMedia("(max-width:600px)").matches ? 2 : window.matchMedia("(max-width:850px)").matches ? 4 : cols;
                            var colW = $container.width() / newCols;
                            wall = new Freewall(config.container), wall.reset({
                                selector: config.item + ":not(.is-hidden)",
                                gutterX: 0,
                                gutterY: 0,
                                cellW: colW,
                                cellH: colW
                            }), wall.fillHoles(), wall.fitWidth(), $masonryItems.each(function() {
                                $(this).data("loaded", !0)
                            })
                        }
                    },
                    destroyContainer = function() {
                        $container.removeAttr("style").removeData("wall-height").removeData("wall-width").removeData("min-width").removeData("total-col").removeData("total-row").removeAttr("data-wall-height").removeAttr("data-wall-width").removeAttr("data-min-width").removeAttr("data-total-col").removeAttr("data-total-row")
                    },
                    destroyItem = function() {
                        $(this).removeAttr("style").removeData("delay").removeData("height").removeData("width").removeData("state").removeAttr("data-delay").removeAttr("data-height").removeAttr("data-width").removeAttr("data-state")
                    },
                    destroyAll = function() {
                        wall && (wall.destroy(), destroyContainer(), $masonryItems.each(destroyItem))
                    },
                    onResize = function() {
                        requestAnimationFrame(resize)
                    },
                    resize = function() {
                        destroyAll(), masonry()
                    },
                    onPostAddition = function() {
                        $masonryItems = $container.find(config.item), $masonryItems.each(function() {
                            var $item = $(this);
                            $item.data("loaded") || $item.css("visibility", "hidden")
                        }), $container.mk_imagesLoaded().then(function() {
                            destroyAll(), masonry()
                        })
                    };
                return {
                    init: init
                }
            }
        }(jQuery),
        function($) {
            "use strict";
            MK.component.Pagination = function(el) {
                this.el = el
            }, MK.component.Pagination.prototype = {
                init: function() {
                    this.cacheElements(), this.bindEvents(), this.onInitLoad()
                },
                cacheElements: function() {
                    this.lastId = 1, this.unique = Date.now(), this.$pagination = $(this.el), this.$container = this.$pagination.prev(".js-loop"), this.$pageLinks = this.$pagination.find(".js-pagination-page"), this.$nextLink = this.$pagination.find(".js-pagination-next"), this.$prevLink = this.$pagination.find(".js-pagination-prev"), this.$current = this.$pagination.find(".js-current-page"), this.$maxPages = this.$pagination.find(".pagination-max-pages"), this.containerId = "#" + this.$container.attr("id"), this.pagePathname = window.location.pathname, this.pageSearch = window.location.search, this.popState = !1, this.ajaxLoader = new MK.utils.ajaxLoader("#" + this.$container.attr("id")), this.ajaxLoader.init()
                },
                bindEvents: function() {
                    this.$pageLinks.on("click", this.pageClick.bind(this)), this.$nextLink.on("click", this.nextClick.bind(this)), this.$prevLink.on("click", this.prevClick.bind(this)), MK.utils.eventManager.subscribe("ajaxLoaded", this.onLoad.bind(this))
                },
                pageClick: function(e) {
                    e.preventDefault();
                    var $this = $(e.currentTarget),
                        id = parseFloat($this.attr("data-page-id"));
                    id > this.ajaxLoader.getData("maxPages") || id < 1 || (this.load(id, $this), this.updatePagedNumUrl(id))
                },
                nextClick: function(e) {
                    e.preventDefault(), this.ajaxLoader.getData("paged") !== this.ajaxLoader.getData("maxPages") && (this.load(++this.lastId, $(e.currentTarget)), this.updatePagedNumUrl(this.lastId))
                },
                prevClick: function(e) {
                    e.preventDefault(), 1 !== this.ajaxLoader.getData("paged") && (this.load(--this.lastId, $(e.currentTarget)), this.updatePagedNumUrl(this.lastId))
                },
                load: function(id, $el) {
                    this.lastId = id, this.ajaxLoader.setData({
                        paged: id
                    }), this.ajaxLoader.load(this.unique), this.removeIndicator(), MK.ui.loader.add($el)
                },
                onLoad: function(e, response) {
                    void 0 !== response && response.id === this.containerId && (this.updatePagination(), this.lastId = this.ajaxLoader.getData("paged"), response.unique === this.unique && (this.removeIndicator(), this.scrollPage(), this.$container.html(response.content)))
                },
                updatePagination: function() {
                    var self = this,
                        isFirst = 1 === this.ajaxLoader.getData("paged"),
                        isLast = this.ajaxLoader.getData("paged") === this.ajaxLoader.getData("maxPages");
                    isFirst ? this.$prevLink.addClass("is-vis-hidden") : this.$prevLink.removeClass("is-vis-hidden"), isLast ? this.$nextLink.addClass("is-vis-hidden") : this.$nextLink.removeClass("is-vis-hidden"), this.$current.html(this.ajaxLoader.getData("paged")), this.$maxPages.html(this.ajaxLoader.getData("maxPages"));
                    this.ajaxLoader.getData("maxPages") > 10 ? this.$pageLinks.each(function(i) {
                        var id = self.lastId - 5;
                        id = Math.max(id, 1), id = Math.min(id, self.ajaxLoader.getData("maxPages") - 10 + 1), id += i, $(this).html(id).attr("data-page-id", id).show(), 0 === i && id > 1 && $(this).html("..."), 9 === i && id < self.ajaxLoader.getData("maxPages") && $(this).html("...")
                    }) : this.$pageLinks.each(function(i) {
                        var $link = $(this),
                            id = i + 1;
                        $link.html(id).attr("data-page-id", id), 1 === self.ajaxLoader.getData("maxPages") ? self.$pageLinks.hide() : i > self.ajaxLoader.getData("maxPages") - 1 ? $link.hide() : $link.show()
                    }), this.$pageLinks.filter('[data-page-id="' + this.ajaxLoader.getData("paged") + '"]').addClass("current-page").siblings().removeClass("current-page")
                },
                scrollPage: function() {
                    var containerOffset = this.$container.offset().top,
                        offset = containerOffset - MK.val.offsetHeaderHeight(containerOffset) - 20;
                    this.$container.find("a:first").focus(), MK.utils.scrollTo(offset)
                },
                removeIndicator: function() {
                    MK.ui.loader.remove(".js-pagination-page, .js-pagination-next, .js-pagination-prev")
                },
                onInitLoad: function() {
                    var initPagedID = this.$pagination.data("init-pagination");
                    if (initPagedID && initPagedID > 1 && (this.$current.html(initPagedID), this.$pageLinks.filter('[data-page-id="' + initPagedID + '"]').addClass("current-page").siblings().removeClass("current-page")), "onpopstate" in window) {
                        var thisPop = this;
                        window.onpopstate = function(event) {
                            var id = 1;
                            if ("object" == typeof event.state && event.state) {
                                var state = event.state;
                                if (state.hasOwnProperty("MkPagination")) {
                                    var currentState = state.MkPagination;
                                    currentState.hasOwnProperty("paged") && (id = parseFloat(currentState.paged))
                                }
                            } else id = parseFloat(thisPop.getURLPagedID());
                            thisPop.popState = !0, thisPop.$pageLinks.filter('[data-page-id="' + id + '"]').trigger("click")
                        }
                    }
                },
                updatePagedNumUrl: function(id) {
                    if ("history" in window && "pushState" in history && id && !this.popState) {
                        var fullPage = this.pagePathname + this.pageSearch,
                            isQueryPage = !1,
                            newPage = "page/" + id + "/",
                            expPage = /page\/\d+\/?/;
                        !!!this.pagePathname.match(/\/page\/\d+/) && this.pageSearch && (isQueryPage = this.pageSearch.match(/page\=\d+/)) && (newPage = "page=" + id, expPage = /page\=\d+/), 1 === id && (newPage = "", isQueryPage && (expPage = this.pageSearch.match(/\&+/) ? /page\=\d+\&?/ : /\?page\=\d+\&?/));
                        var newURL = this.pagePathname + newPage + this.pageSearch;
                        fullPage.match(expPage) && (newURL = fullPage.replace(expPage, newPage));
                        var historyState = {
                            MkPagination: {
                                url: newURL,
                                paged: id
                            }
                        };
                        this.popState = !1, window.history.pushState(historyState, null, newURL)
                    }
                    this.popState = !1
                },
                getURLPagedID: function() {
                    var pathname = window.location.pathname,
                        search = window.location.search,
                        pagedId = 1,
                        result = "",
                        isPagedExist = !1;
                    return result = pathname.match(/\/page\/(\d+)/), result && (isPagedExist = !0, pagedId = result.hasOwnProperty(1) ? result[1] : 1), !isPagedExist && search && (result = search.match(/page\=(\d+)/)) && (isPagedExist = !0, pagedId = result.hasOwnProperty(1) ? result[1] : 1), pagedId
                }
            }
        }(jQuery),
        function($) {
            "use strict";
            var val = MK.val;
            MK.utils;
            MK.component.Parallax = function(el) {
                var $this = $(el),
                    obj = $this[0],
                    $window = $(window),
                    container = document.getElementById("mk-theme-container"),
                    config = $this.data("parallax-config"),
                    headerHeight = ($(config.holder), null),
                    offset = null,
                    elHeight = null,
                    ticking = !1,
                    isMobile = null,
                    clientRect = null,
                    update = function() {
                        if (obj.style.transform = null, obj.style.top = null, obj.style.bottom = null, isMobile = MK.utils.isMobile()) return void $this.css("height", "");
                        clientRect = $this[0].getBoundingClientRect(), offset = clientRect.top, elHeight = clientRect.height, headerHeight = val.offsetHeaderHeight(offset), offset = offset - headerHeight + val.scroll(), setPosition(), setSize()
                    },
                    h = 0,
                    winH = 0,
                    proportion = 0,
                    height = 0,
                    setSize = function() {
                        if ($this.css("height", ""), winH = $window.height() - headerHeight, h = obj.getBoundingClientRect().height, config.speed <= 1 && config.speed > 0) 0 === offset ? $this.css({
                            backgroundAttachment: "scroll",
                            "will-change": "transform"
                        }) : $this.css({
                            height: h + (winH - h) * config.speed,
                            backgroundAttachment: "scroll",
                            "will-change": "transform"
                        });
                        else if (config.speed > 1 && h <= winH) $this.css({
                            height: winH + 2 * (winH * config.speed - winH),
                            top: -(winH * config.speed - winH),
                            backgroundAttachment: "scroll",
                            "will-change": "transform"
                        });
                        else if (config.speed > 1 && h > winH) proportion = h / winH, height = winH + (winH * config.speed - winH) * (1 + proportion), $this.css({
                            height: height,
                            top: -(height - winH * config.speed),
                            backgroundAttachment: "scroll",
                            "will-change": "transform"
                        });
                        else if (config.speed < 0 && h >= winH) height = h * (1 - config.speed), $this.css({
                            height: height + (height - h),
                            top: h - height,
                            backgroundAttachment: "scroll",
                            "will-change": "transform"
                        });
                        else if (config.speed < 0 && h < winH) {
                            var display = (winH + h) / winH;
                            height = h * -config.speed * display, $this.css({
                                height: h + 2 * height,
                                top: -height,
                                backgroundAttachment: "scroll",
                                "will-change": "transform"
                            })
                        }
                    },
                    currentPoint = null,
                    startPoint = null,
                    endPoint = null,
                    scrollY = (config.opacity && $this.find(config.opacity), null),
                    setPosition = function() {
                        if (startPoint = offset - winH, endPoint = offset + elHeight + winH - headerHeight, (scrollY = val.scroll()) < startPoint || scrollY > endPoint) return void(ticking = !1);
                        currentPoint = (-offset + scrollY) * config.speed, $this.css({
                            "-webkit-transform": "translateY(" + currentPoint + "px) translateZ(0)",
                            "-moz-transform": "translateY(" + currentPoint + "px) translateZ(0)",
                            "-ms-transform": "translateY(" + currentPoint + "px) translateZ(0)",
                            "-o-transform": "translateY(" + currentPoint + "px) translateZ(0)",
                            transform: "translateY(" + currentPoint + "px) translateZ(0)"
                        }), ticking = !1
                    },
                    requestTick = function() {
                        ticking || isMobile || (ticking = !0, window.requestAnimationFrame(setPosition))
                    };
                return {
                    init: function() {
                        MK.utils.isSmoothScroll && (update(), setTimeout(update, 100), $window.on("load", update), $window.on("resize", update), window.addResizeListener(container, update), $window.on("scroll", requestTick))
                    }
                }
            }
        }(jQuery),
        function($) {
            "use strict";
            MK.component.Preloader = function(el) {
                this.el = el
            }, MK.component.Preloader.prototype = {
                init: function() {
                    this.cacheElements(), this.bindEvents()
                },
                cacheElements: function() {
                    this.$preloader = $(this.el)
                },
                bindEvents: function() {
                    this.onLoad()
                },
                onLoad: function() {
                    setTimeout(this.hidePreloader.bind(this), 300)
                },
                hidePreloader: function() {
                    this.$preloader.hide()
                }
            }
        }(jQuery),
        function($) {
            "use strict";
            MK.ui.loader = {
                tpl: function() {
                    return '<div class="mk-loading-indicator"><div class="mk-loading-indicator__inner"><div class="mk-loading-indicator__icon"></div><img style="height:100%; width:auto;" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"></div></div>'
                },
                add: function(item) {
                    $(item).append(this.tpl)
                },
                remove: function(item) {
                    item ? $(item).find(".mk-loading-indicator").remove() : $(".mk-loading-indicator").remove()
                }
            }
        }(jQuery),
        function($) {
            if ("Edge" === MK.utils.browser.name || "IE" === MK.utils.browser.name) {
                var val = 1,
                    $edgeClipper = $(".mk-slider-slide"),
                    $sectionClipper = $(".clipper-true"),
                    $bgLayer = $(".background-layer"),
                    onScroll = function() {
                        val *= -1, $edgeClipper.length && $edgeClipper.each(redraw), $sectionClipper.length && $sectionClipper.each(redraw), $bgLayer.length && $bgLayer.each(redraw)
                    },
                    redraw = function() {
                        $(this).css("margin-top", val / 100)
                    };
                $(window).on("scroll", function() {
                    window.requestAnimationFrame(onScroll)
                })
            }
        }(jQuery), MK.component.ResponsiveImageSetter = function($) {
            "use strict";

            function run($imgs) {
                $imgs.filter(function() {
                    return !this.hasAttribute("mk-img-src-setted")
                }).each(setSrcAttr)
            }

            function setSrcAttr() {
                var $img = $(this),
                    set = $img.data("mk-image-src-set");
                "false" === set.responsive && isRetina && set["2x"] ? $img.attr("src", set["2x"]) : "false" === set.responsive ? $img.attr("src", set.default) : 1 === viewportClass && isRetina && set["2x"] ? $img.attr("src", set["2x"]) : 0 === viewportClass && set.mobile ? $img.attr("src", set.mobile) : $img.attr("src", set.default), $img.load(function() {
                    $(window).trigger("mk-image-loaded")
                })
            }

            function getViewportClass() {
                return window.matchMedia("(max-width: 736px)").matches ? 0 : 1
            }

            function handleResize($imgs) {
                if ($imgs.length) {
                    var currentViewportClass = getViewportClass();
                    currentViewportClass > viewportClass && (viewportClass = currentViewportClass, run($imgs))
                }
            }
            var module = {},
                viewportClass = getViewportClass(),
                isRetina = window.devicePixelRatio >= 2;
            return module.init = function($imgs) {
                $imgs.length && (run($imgs), $imgs.attr("mk-img-src-setted", ""))
            }, module.onResize = function($imgs) {
                $(window).on("resize", MK.utils.throttle(500, function() {
                    handleResize($imgs)
                }))
            }, module.handleAjax = function() {
                setTimeout(function() {
                    var $newImgs = $("img[data-mk-image-src-set]").filter(function() {
                        return !this.hasAttribute("mk-lazyload")
                    });
                    $newImgs.length && run($newImgs)
                }, 100)
            }, module
        }(jQuery), jQuery(function($) {
            var init = function() {
                $allImages = $("img[data-mk-image-src-set]").filter(function(index) {
                    var isNotPortfolioImage = !$(this).hasClass("portfolio-image"),
                        isNotBlogImage = 0 == $(this).closest(".mk-blog-container").length,
                        isNotSwiperImage = !$(this).hasClass("swiper-slide-image"),
                        isNotGalleryImage = !$(this).hasClass("mk-gallery-image");
                    return isNotPortfolioImage && isNotBlogImage && isNotSwiperImage && isNotGalleryImage
                }), MK.component.ResponsiveImageSetter.onResize($allImages), MK.component.ResponsiveImageSetter.init($allImages), MK.utils.eventManager.subscribe("ajaxLoaded", MK.component.ResponsiveImageSetter.handleAjax), MK.utils.eventManager.subscribe("ajax-preview", MK.component.ResponsiveImageSetter.handleAjax), MK.utils.eventManager.subscribe("quickViewOpen", MK.component.ResponsiveImageSetter.handleAjax)
            };
            init(), $(window).on("vc_reload", init)
        }),
        function($) {
            "use strict";
            var utils = MK.utils,
                val = MK.val,
                $topLevelSections = $("#theme-page > .vc_row, #theme-page > .mk-main-wrapper-holder, #theme-page > .mk-page-section");
            $(document).on("click", ".mk-skip-to-next", function() {
                var $this = $(this),
                    btnHeight = $this.hasClass("edge-skip-slider") ? 150 : 76,
                    offset = $this.offset().top + btnHeight,
                    nextOffset = utils.nextHigherVal(utils.offsets($topLevelSections), [offset]);
                utils.scrollTo(nextOffset - val.offsetHeaderHeight(nextOffset))
            })
        }(jQuery),
        function($) {
            "use strict";

            function MkfullWidthRow() {
                var $windowWidth = $(document).width(),
                    $elements = $('[data-mk-full-width="true"]'),
                    direction = $("body.rtl").length ? "right" : "left",
                    verticalHeader = !!$("body.vertical-header-enabled").length,
                    verticalHeaderWidth = $(".header-style-4 .mk-header-inner").outerWidth() > 270 ? 0 : 270,
                    verticalHeaderRtl = $("body.rtl").length ? -1 : 1,
                    verticalHeaderRtlWidth = $("body.rtl.vertical-header-enabled").length ? verticalHeaderWidth : 0,
                    verticalHeaderRight = $("body.vertical-header-right").length ? -1 : 1,
                    verticalHeaderWidthBoxed = 0,
                    boxed = $("body.mk-boxed-enabled").length,
                    boxedOffset = boxed ? ($(window).width() - $("#theme-page").outerWidth()) / 2 : 0,
                    boxedMaxWidth = boxed ? $("#theme-page").outerWidth() : "auto";
                verticalHeader && boxed && (verticalHeaderWidthBoxed = $(".header-style-4 .mk-header-inner").outerWidth() > 270 ? 0 : verticalHeaderRtl * verticalHeaderRight * 135);
                var transparentHeader = $(".transparent-header").length;
                transparentHeader > 0 && (verticalHeaderWidthBoxed = 0), $.each($elements, function(key, item) {
                    var css, $el = $(this);
                    $el.addClass("vc_hidden");
                    var $el_full = $el.next(".vc_row-full-width");
                    if ($el_full.length || ($el_full = $el.parent().next(".vc_row-full-width")), $el_full.length) {
                        var el_margin_left = parseInt($el.css("margin-left"), 10),
                            el_margin_right = parseInt($el.css("margin-right"), 10),
                            offset = 0 - $el_full.offset().left - el_margin_left,
                            width = $(window).width();
                        if (css = {
                                position: "relative",
                                "box-sizing": "border-box",
                                width: $(window).width(),
                                maxWidth: boxedMaxWidth
                            }, css[direction] = offset + boxedOffset + verticalHeaderWidthBoxed + verticalHeaderRight * verticalHeaderRtlWidth, $el.css(css), !$el.data("mkStretchContent")) {
                            var padding = -1 * offset;
                            0 > padding && (padding = 0);
                            var paddingRight = width - padding - $el_full.width() + el_margin_left + el_margin_right;
                            padding -= paddingRight, 0 > paddingRight && (paddingRight = 0) && (css = {}, "right" === direction ? (css["padding-left"] = padding + "px", css["padding-right"] = 0) : (css["padding-right"] = padding + "px", css["padding-left"] = 0), $el.css(css))
                        }
                        if (verticalHeader && !boxed && !transparentHeader && !css.hasOwnProperty("padding-left") && !css.hasOwnProperty("padding-right")) {
                            var side = "left"; - 1 === verticalHeaderRight && (side = "right");
                            var el_padding_dir = parseInt($el.css("padding-" + side), 10),
                                header_padding_dir = $(".header-style-4 .mk-header-inner").outerWidth();
                            if (el_padding_dir != header_padding_dir) {
                                $windowWidth > mk_responsive_nav_width ? $el[0].style.setProperty("padding-" + side, header_padding_dir + "px", "important") : $el[0].style.removeProperty("padding-" + side);
                                var $el_page_section = $el.find(".mk-page-section.full_layout");
                                $el_page_section.length > 0 && $el_page_section[0].style.setProperty("padding-" + side, "unset", "important")
                            }
                        }
                        $el.attr("data-mk-full-width-init", "true"), $el.removeClass("vc_hidden"), $(document).trigger("vc-full-width-row-single", {
                            el: $el,
                            offset: offset,
                            marginLeft: el_margin_left,
                            marginRight: el_margin_right,
                            elFull: $el_full,
                            width: width
                        })
                    }
                }), $(document).trigger("mk-full-width-row", $elements)
            }
            MkfullWidthRow();
            var debounceResize = null;
            $(window).on("resize", function() {
                null !== debounceResize && clearTimeout(debounceResize), debounceResize = setTimeout(MkfullWidthRow, 100)
            })
        }(jQuery),
        function($) {
            "use strict";
            MK.ui.Slider = function(container, config) {
                var defaults = {
                    slide: ".mk-slider-slide",
                    nav: ".mk-slider-nav",
                    effect: "roulete",
                    ease: "easeOutQuart",
                    slidesPerView: 1,
                    slidesToView: 1,
                    transitionTime: 700,
                    displayTime: 3e3,
                    autoplay: !0,
                    hasNav: !0,
                    hasPagination: !0,
                    paginationTpl: "<span></span>",
                    paginationEl: "#pagination",
                    draggable: !0,
                    fluidHeight: !1,
                    pauseOnHover: !1,
                    lazyload: !1,
                    activeClass: "is-active",
                    edgeSlider: !1,
                    spinnerTpl: '<div class="mk-slider-spinner-wrap"><div class="mk-slider-spinner-fallback"></div><svg class="mk-slider-spinner" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg"><circle class="mk-slider-spinner-path" fill="none" stroke-width="4" stroke-linecap="round" cx="33" cy="33" r="30"></circle></svg></div>',
                    onInitialize: function() {},
                    onAfterSlide: function(id) {},
                    onBeforeSlide: function(id) {}
                };
                this.state = {
                    id: 0,
                    moveForward: !0,
                    running: !1,
                    zIFlow: null,
                    stop: !1
                }, this.config = $.extend(defaults, config), this.container = container, this.initPerView = this.config.slidesPerView, this.activeTimer = null, this.autoplay = null, this.timer = null, this.timerRemaining = parseInt(this.config.displayTime), this.config.lazyload = JSON.parse(this.config.lazyload), this.config.edgeSlider = JSON.parse(this.config.edgeSlider), this.imageLoader = null, imagesLoaded.prototype.abort = function() {
                    this.progress = this.complete = function() {}
                }
            }, MK.ui.Slider.prototype = {
                init: function() {
                    if (this.setPerViewItems(), this.cacheElements(), this.getSlideSize(), this.bindEvents(), this.setSize(), this.setPos(), this.updateId(-1), this.updateId(1), this.val = this.dynamicVal(), this.timeline = this.prepareTimeline(this.config.transitionTime), this.timeline.build(), this.config.hasPagination && this.buildPagination(), this.config.autoplay && document.hasFocus() && this.setTimer(), "function" == typeof this.config.onInitialize && this.config.onInitialize(this.slides), !0 === this.config.fluidHeight && ($(this.slides).height("auto"), $(this.container).css("transition", "height 200ms ease-out"), this.setHeight(0)), "toHighest" === this.config.fluidHeight && this.setHeightToHighest(), $(this.slides).each(this.createTimer), this.config.lazyload && this.config.edgeSlider) {
                        if (0 === $(this.slides[this.state.id]).find("video").length) {
                            var $slideImg = $(this.slides[this.state.id]).children("[data-mk-img-set]");
                            MK.component.BackgroundImageSetter.init($slideImg)
                        }
                        $(this.config.spinnerTpl).prependTo(this.$slides)
                    } else MK.component.BackgroundImageSetter.init($(this.slides).children("[data-mk-img-set]"))
                },
                cacheElements: function() {
                    this.container = this.isNode(this.container) ? this.container : document.querySelectorAll(this.container)[0], this.slides = this.container.querySelectorAll(this.config.slide), this.$slides = $(this.slides), this.config.hasNav && (this.$nav = $(this.config.nav)), this.config.hasPagination && (this.$pagination = $(this.config.paginationEl))
                },
                bindEvents: function() {
                    var $window = $(window);
                    this.config.slidesPerView > 1 && $window.on("resize", this.setPerViewItems.bind(this)), this.config.hasNav && this.eventsNav(), this.config.hasPagination && this.eventsPag(), this.config.draggable && this.dragHandler(), this.config.autoplay && ($window.on("focus", this.windowActive.bind(this)), $window.on("blur", this.windowInactive.bind(this))), this.config.pauseOnHover && ($(this.container).on("mouseleave", this.setTimer.bind(this)), $(this.container).on("mouseenter", this.unsetTimer.bind(this))), "toHighest" === this.config.fluidHeight && $window.on("resize", this.setHeightToHighest.bind(this))
                },
                setPerViewItems: function() {
                    window.matchMedia("(max-width: 500px)").matches ? this.config.slidesPerView = 1 : window.matchMedia("(max-width: 767px)").matches && this.initPerView >= 2 ? this.config.slidesPerView = 2 : window.matchMedia("(max-width: 1024px)").matches && this.initPerView >= 3 ? this.config.slidesPerView = 3 : this.config.slidesPerView = this.initPerView, void 0 !== this.slides && (this.getSlideSize(), this.setSize(), this.setPos(), this.timeline = this.prepareTimeline(this.config.transitionTime), this.timeline.build())
                },
                eventsNav: function() {
                    this.$nav.on("click", "a", this.handleNav.bind(this))
                },
                eventsPag: function() {
                    this.$pagination.on("click", "a", this.handlePagination.bind(this))
                },
                handleNav: function(e) {
                    if (e.preventDefault(), !this.state.running) {
                        this.state.running = !0;
                        var $this = $(e.currentTarget),
                            moveForward = "next" === $this.data("direction");
                        this.config.autoplay && (this.unsetTimer(), setTimeout(this.setTimer.bind(this), this.config.transitionTime)), this.state.moveForward = moveForward, this.timeline.build(), this.timeline.play(), this.setActive(this.nextId(moveForward ? 1 : -1)), this.config.fluidHeight && this.setHeight(this.nextId(moveForward ? 1 : -1))
                    }
                },
                handlePagination: function(e) {
                    e.preventDefault();
                    var $this = $(e.currentTarget),
                        id = $this.index();
                    this.goTo(id)
                },
                reset: function() {
                    this.state.stop = !0, this.state.id = 0, this.setPos(), this.unsetTimer(), this.setTimer()
                },
                goTo: function(id) {
                    if (!this.state.running) {
                        this.state.running = !0;
                        var lastId = this.state.id;
                        lastId !== id && (this.state.moveForward = lastId < id, this.config.autoplay && (this.unsetTimer(), setTimeout(this.setTimer.bind(this), this.config.transitionTime)), this.timeline.build(Math.abs(lastId - id)), this.timeline.play(), this.setActive(id), this.config.fluidHeight && this.setHeight(id))
                    }
                },
                windowActive: function() {
                    this.setTimer(!1, !0), $(this.container).removeClass("is-paused")
                },
                windowInactive: function() {
                    this.unsetTimer(), $(this.container).addClass("is-paused")
                },
                updateId: function(val) {
                    this.state.id = this.nextId(val)
                },
                nextId: function(val) {
                    var len = this.slides.length,
                        insertVal = this.state.id + val;
                    return insertVal = insertVal >= 0 ? insertVal : len + val, insertVal = insertVal >= len ? 0 : insertVal
                },
                setStyle: function(obj, style) {
                    var hasT = style.transform,
                        t = {
                            x: hasT ? style.transform.translateX : null,
                            y: hasT ? style.transform.translateY : null,
                            scale: hasT ? style.transform.scale : null,
                            rotate: hasT ? style.transform.rotate : null,
                            rotateX: hasT ? style.transform.rotateX : null,
                            rotateY: hasT ? style.transform.rotateY : null
                        },
                        x = t.x ? "translateX(" + t.x + "%)" : "translateX(0)",
                        y = t.y ? "translateY(" + t.y + "%)" : "translateY(0)",
                        s = t.scale ? "scale(" + t.scale + ")" : "scale(1)",
                        r = t.rotate ? "rotate(" + t.rotate + "deg)" : "rotate(0)",
                        rX = t.rotateX ? "rotateX(" + t.rotateX + "deg)" : "",
                        rY = t.rotateY ? "rotateY(" + t.rotateY + "deg)" : "",
                        o = style.opacity,
                        h = style.height,
                        w = style.width,
                        c = "translateZ(0)" + x + y + s + r + rX + rY;
                    c.length && (obj.style.webkitTransform = c, obj.style.msTransform = c, obj.style.transform = c), "number" == typeof o && (obj.style.opacity = o), h && (obj.style.height = h + "%"), w && (obj.style.width = w + "%")
                },
                setPos: function() {
                    if (void 0 !== this.slides) {
                        var id = this.state.id,
                            i = 0,
                            len = this.slides.length,
                            animation = this.animation[this.config.effect],
                            axis = animation.axis,
                            animNext = animation.next,
                            animActi = animation.active,
                            animPrev = animation.prev,
                            perView = this.config.slidesPerView,
                            slideId = null,
                            style = {};
                        for (style.transform = {}; i < len; i += 1) i < perView ? (style = animActi, style.transform["translate" + axis] = 100 * i) : (style = this.state.moveForward ? animNext : animPrev, style.transform["translate" + axis] = this.state.moveForward ? 100 * perView : -100), this.slides[i].style.zIndex = 0, slideId = (i + id) % len, this.setStyle(this.slides[slideId], style)
                    }
                },
                setSize: function() {
                    if (void 0 !== this.slides) {
                        var i = 0,
                            len = this.slides.length,
                            axis = this.animation[this.config.effect].axis,
                            slideSize = this.slideSize,
                            style = {};
                        for ("Y" === axis ? style.height = slideSize[axis] : style.width = slideSize[axis]; i < len; i += 1) this.setStyle(this.slides[i], style)
                    }
                },
                setHeight: function(id) {
                    var $slides = $(this.slides),
                        $activeSlide = $slides.eq(id),
                        currentHeight = $activeSlide.height();
                    $(this.container).height(currentHeight)
                },
                setHeightToHighest: function() {
                    var $slides = $(this.slides),
                        height = 0;
                    $slides.each(function() {
                        height = Math.max(height, $(this).find("> div").outerHeight())
                    }), $(this.container).height(height)
                },
                prepareTimeline: function(time) {
                    var timeProg, build, move, add, play, reverse, progress, kill, self = this,
                        iteration = 0,
                        totalIter = time / (1e3 / 60),
                        animLoop = [],
                        aL = 0,
                        loops = 1,
                        ease = this.config.ease,
                        len = this.slides.length,
                        perView = this.config.slidesPerView,
                        animation = this.animation[this.config.effect],
                        animAxis = animation.axis,
                        animNext = animation.next,
                        animActi = animation.active,
                        animPrev = animation.prev,
                        style = {},
                        slideId = null,
                        zIFlow = null;
                    return style.transform = {}, build = function(repeats) {
                        var currentEase = ease;
                        if (loops = repeats || loops) {
                            loops > 1 && (currentEase = "linearEase"), kill(), self.setPos();
                            for (var id = self.state.id, moveForward = self.state.moveForward, i = 0, axisMove = moveForward ? -100 : 100; i <= perView; i += 1) slideId = (moveForward ? i + id : i + id - 1) % len, slideId = slideId < 0 ? len + slideId : slideId, style = 0 === i ? moveForward ? animPrev : animActi : i === perView ? moveForward ? animActi : animNext : animActi, zIFlow = self.state.moveForward ? animNext.zIndex : animPrev.zIndex, zIFlow && (self.slides[slideId].style.zIndex = "+" === zIFlow ? i + 1 : len - i), style.transform["translate" + animAxis] = axisMove, add(self.slides[slideId], style, currentEase)
                        }
                    }, add = function(slide, toStyles, ease) {
                        if (void 0 === slide) throw "Add at least one slide";
                        var fromStyles = slide.style,
                            style = self.refStyle(toStyles, fromStyles);
                        animLoop.push([slide, style, ease]), aL += 1
                    }, move = function(startProg, mode) {
                        if (!isTest) {
                            var currentTotalIter = totalIter;
                            if (loops > 1 && (currentTotalIter = totalIter / 5), self.state.running || (self.state.running = !0), startProg && (iteration = Math.ceil(startProg * currentTotalIter)), timeProg = iteration / currentTotalIter, progress(timeProg), iteration >= currentTotalIter && "play" === mode || iteration <= 0 && "reverse" === mode) return self.state.running = !1, iteration = 0, kill(), self.updateId(self.state.moveForward ? 1 : -1), loops -= 1, loops > 0 && (build(), play()), void(loops || (loops = 1, self.timerRemaining = parseInt(self.config.displayTime), self.config.onAfterSlide(self.state.id)));
                            "play" === mode ? iteration += 1 : iteration -= 1, requestAnimationFrame(function() {
                                self.state.stop || move(0, mode)
                            })
                        }
                    }, play = function(startProg) {
                        var $nextSlide = $(self.slides[self.nextId(self.state.moveForward ? 1 : -1)]);
                        if (self.config.lazyload && self.config.edgeSlider) {
                            var $slideImg = $nextSlide.find("[data-mk-img-set]");
                            $slideImg.length && MK.component.BackgroundImageSetter.init($slideImg)
                        }
                        self.config.onBeforeSlide(self.nextId(self.state.moveForward ? 1 : -1));
                        var start = startProg || 0;
                        iteration = 0, self.state.stop = !1, move(start, "play")
                    }, reverse = function(startProg) {
                        move(startProg || 1, "reverse")
                    }, progress = function(progVal) {
                        var currentStyle, aI = 0;
                        for (aI; aI < aL; aI++) 1 !== progVal && 0 !== progVal ? currentStyle = self.currentStyle(progVal, animLoop[aI][1], animLoop[aI][2]) : 1 === progVal ? currentStyle = self.currentStyle(progVal, animLoop[aI][1], "linearEase") : 0 === progVal && (currentStyle = self.currentStyle(progVal, animLoop[aI][1], "linearEase")), self.setStyle(animLoop[aI][0], currentStyle)
                    }, kill = function() {
                        animLoop = [], aL = 0
                    }, {
                        build: build,
                        add: add,
                        play: play,
                        reverse: reverse,
                        progress: progress
                    }
                },
                refStyle: function(toStyles, fromStyles) {
                    var initVal, changeVal, endVal, dynamicEnd, styleProp, transProp, transform, axis = this.animation[this.config.effect].axis,
                        style = {};
                    for (styleProp in toStyles)
                        if ("transform" === styleProp) {
                            transform = this.getTransforms(fromStyles), style.transform = {};
                            for (transProp in toStyles.transform) "translateZ" !== transProp && (initVal = transform[transProp] || 0, dynamicEnd = transProp === "translate" + axis ? initVal : 0, endVal = toStyles.transform[transProp] + dynamicEnd, changeVal = endVal - initVal, style.transform[transProp] = [initVal, changeVal])
                        } else {
                            if ("zIndex" === styleProp) continue;
                            initVal = parseFloat(fromStyles[styleProp]) || 0, endVal = toStyles[styleProp], changeVal = endVal - initVal, style[styleProp] = [initVal, changeVal]
                        }
                    return style
                },
                currentStyle: function(progress, style, ease) {
                    var currentVals, styleProp, transProp, self = this,
                        currentStyle = {};
                    for (styleProp in style)
                        if ("transform" === styleProp) {
                            currentStyle.transform = {};
                            for (transProp in style.transform) "translateZ" !== transProp && (currentVals = style.transform[transProp], currentStyle.transform[transProp] = self.ease[ease](progress, currentVals[0], currentVals[1], 1))
                        } else currentVals = style[styleProp], currentStyle[styleProp] = self.ease[ease](progress, currentVals[0], currentVals[1], 1);
                    return currentStyle
                },
                setActive: function(id) {
                    var $slides = $(this.slides),
                        className = this.config.activeClass;
                    if ($slides.removeClass(className), this.config.hasPagination) {
                        var $pagination = this.$pagination.find("a");
                        $pagination.removeClass(className), $pagination.eq(id).addClass(className)
                    }
                    this.activeTimer && (clearTimeout(this.activeTimer), this.imageLoader && this.imageLoader.abort());
                    var self = this;
                    this.activeTimer = setTimeout(function() {
                        var $currentSlide = $slides.eq(id);
                        if (self.config.lazyload && self.config.edgeSlider)
                            if ($currentSlide.find(".mk-section-video").length && $currentSlide.children(".mk-video-section-touch").length) {
                                var imgSet = $currentSlide.children(".mk-video-section-touch").data("mk-img-set"),
                                    exactImg = MK.component.BackgroundImageSetter.getImage(imgSet),
                                    $bgImage = $("<img>").attr("src", exactImg);
                                self.imageLoader = imagesLoaded($bgImage[0], function(instance) {
                                    $currentSlide.children(".mk-slider-spinner-wrap").addClass("mk-slider-spinner-wrap-hidden"), setTimeout(function() {
                                        $currentSlide.children(".mk-slider-spinner-wrap").hide()
                                    }, 200), $currentSlide.addClass(className)
                                })
                            } else if ($currentSlide.find(".mk-section-video").length && 0 === $currentSlide.children(".mk-video-section-touch").length) $currentSlide.children(".mk-slider-spinner-wrap").addClass("mk-slider-spinner-wrap-hidden"), setTimeout(function() {
                            $currentSlide.children(".mk-slider-spinner-wrap").hide()
                        }, 200), $currentSlide.addClass(className);
                        else if ($currentSlide.children("[data-mk-img-set]").length) {
                            var imgSet = $currentSlide.children("[data-mk-img-set]").data("mk-img-set"),
                                exactImg = MK.component.BackgroundImageSetter.getImage(imgSet),
                                $bgImage = $("<img>").attr("src", exactImg);
                            self.unsetTimer(), self.imageLoader = imagesLoaded($bgImage[0], function(instance) {
                                $currentSlide.children(".mk-slider-spinner-wrap").addClass("mk-slider-spinner-wrap-hidden"), setTimeout(function() {
                                    $currentSlide.children(".mk-slider-spinner-wrap").hide()
                                }, 200), self.setTimer(!1, !1, $currentSlide.data("timer") || Number(self.config.displayTime)), $currentSlide.addClass(className)
                            })
                        } else $currentSlide.children(".mk-slider-spinner-wrap").addClass("mk-slider-spinner-wrap-hidden"), setTimeout(function() {
                            $currentSlide.children(".mk-slider-spinner-wrap").hide()
                        }, 200), self.setTimer(!1, !1, $currentSlide.data("timer") || Number(self.config.displayTime)), $currentSlide.addClass(className);
                        else $currentSlide.addClass(className)
                    }, this.config.transitionTime)
                },
                createTimer: function() {
                    var $slide = $(this),
                        video = $slide.find("video").get(0);
                    if (video) var interval = setInterval(function() {
                        video.readyState > 0 && ($slide.data("timer", 1e3 * video.duration), $slide.attr("data-timer", 1e3 * video.duration), clearInterval(interval))
                    }, 100)
                },
                setTimer: function(isFirst, isPaused, fixed_time) {
                    var create, run, customTimer = this.$slides.eq(this.nextId(this.state.moveForward ? 1 : -1)).data("timer"),
                        trans = parseInt(this.config.transitionTime),
                        interval = customTimer || parseInt(this.config.displayTime),
                        timer = interval + trans,
                        self = this,
                        first = isFirst || !0,
                        fixed_time = fixed_time || 0;
                    this.timer = !0, this.lastSetTimer = Date.now(), create = function() {
                        self.autoplay && clearTimeout(self.autoplay), self.timer && (self.state.moveForward = !0, self.timeline.build(), self.timeline.play(), self.setActive(self.nextId(1)), self.config.fluidHeight && self.setHeight(self.nextId(1)), first = !1, self.lastSetTimer = Date.now(), run())
                    }, run = function(newInterval) {
                        customTimer = self.$slides.eq(self.nextId(self.state.moveForward ? 1 : -1)).data("timer"), interval = customTimer || parseInt(self.config.displayTime), timer = interval + trans;
                        var time = newInterval || timer;
                        self.autoplay = setTimeout(create, time)
                    }, fixed_time ? run(fixed_time) : isPaused ? run(this.timerRemaining) : run()
                },
                unsetTimer: function() {
                    this.timer = !1, this.lastUnsetTimer = Date.now(), this.timerRemaining -= this.lastUnsetTimer - this.lastSetTimer, this.autoplay && clearTimeout(this.autoplay)
                },
                buildPagination: function() {
                    for (var i = 0, len = this.slides.length, tpl = ""; i < len; i += 1) tpl += '<a href="javascript:;">' + this.config.paginationTpl + "</a>";
                    this.$pagination.html(tpl), this.setActive(0)
                },
                getSlideSize: function() {
                    this.slideSize = {
                        X: 100 / this.config.slidesPerView,
                        Y: 100 / this.config.slidesPerView
                    }
                },
                getTransforms: function(style) {
                    var match, transform = style.transform || style.webkitTransform || style.mozTransform,
                        regex = /(\w+)\(([^)]*)\)/g,
                        T = {};
                    if ("string" != typeof transform) throw "Transform prop is not a string.";
                    if (transform) {
                        for (; match = regex.exec(transform);) T[match[1]] = parseFloat(match[2]);
                        return T
                    }
                },
                isNode: function(o) {
                    return "object" == typeof Node ? o instanceof Node : o && "object" == typeof o && "number" == typeof o.nodeType && "string" == typeof o.nodeName
                },
                dragHandler: function() {
                    var dragStart, dragMove, dragEnd, progress, self = this,
                        $container = $(this.container),
                        prevBuild = !1,
                        nextBuild = !1,
                        dragging = !1;
                    progress = function(moveX) {
                        return moveX / self.val.viewportW()
                    }, dragStart = function(moveX, startX) {}, dragMove = function(moveX) {
                        self.state.running || (moveX < -5 ? (nextBuild ? self.timeline.progress(-progress(moveX)) : (self.state.moveForward = !0, self.timeline.build(), nextBuild = !0, prevBuild = !1, self.unsetTimer()), dragging = !0) : moveX > 5 && (prevBuild ? self.timeline.progress(progress(moveX)) : (self.state.moveForward = !1, self.timeline.build(), prevBuild = !0, nextBuild = !1, self.unsetTimer()), dragging = !0))
                    }, dragEnd = function(moveX) {
                        if (dragging) {
                            var prog = progress(moveX),
                                absProg = prog < 0 ? -prog : prog;
                            absProg > .1 ? (self.timeline.play(absProg), self.setActive(self.nextId(prog < 0 ? 1 : -1)), self.config.fluidHeight && self.setHeight(self.nextId(prog < 0 ? 1 : -1))) : (self.timeline.reverse(absProg), prog < 0 ? self.updateId(-1) : self.updateId(1)), prevBuild = !1, nextBuild = !1, dragging = !1, self.config.autoplay && self.setTimer(!1)
                        }
                    }, this.drag($container, dragStart, dragMove, dragEnd)
                },
                drag: function($el, startFn, moveFn, stopFn) {
                    var touchX, movX, evt, prevent, start, move, stop;
                    prevent = function(e) {
                        e.preventDefault()
                    }, start = function(e) {
                        $el.on("mousemove", prevent), $el.on("touchmove", move), $el.on("mousemove", move), evt = "touchstart" === e.type ? e.originalEvent.touches[0] : e, touchX = evt.pageX, "function" == typeof startFn && startFn(movX, touchX)
                    }, move = function(e) {
                        evt = "touchmove" === e.type ? e.originalEvent.touches[0] : e, movX = evt.pageX - touchX, "function" == typeof moveFn && moveFn(movX)
                    }, stop = function(e) {
                        $el.off("mousemove", prevent), $el.off("touchmove", move), $el.off("mousemove", move), "function" == typeof stopFn && stopFn(movX)
                    }, $el.on("touchstart", start), $el.on("mousedown", start), $el.on("touchend", stop), $el.on("touchleave", stop), $el.on("touchcancel", stop), $el.on("mouseup", stop), $el.on("mouseleave", stop)
                },
                dynamicVal: function() {
                    var update, getViewportW, viewportW, $window = $(window);
                    return update = function() {
                        viewportW = $window.width()
                    }, getViewportW = function() {
                        return viewportW
                    }, update(), $window.on("load", update), $window.on("resize", update), {
                        viewportW: getViewportW
                    }
                }
            }, MK.ui.Slider.prototype.animation = {
                slide: {
                    axis: "X",
                    next: {
                        transform: {}
                    },
                    active: {
                        transform: {}
                    },
                    prev: {
                        transform: {}
                    }
                },
                vertical_slide: {
                    axis: "Y",
                    next: {
                        transform: {}
                    },
                    active: {
                        transform: {}
                    },
                    prev: {
                        transform: {}
                    }
                },
                perspective_flip: {
                    axis: "Y",
                    next: {
                        transform: {
                            rotateX: 80
                        }
                    },
                    active: {
                        transform: {
                            rotateX: 0
                        }
                    },
                    prev: {
                        transform: {
                            rotateX: 0
                        }
                    }
                },
                zoom: {
                    axis: "Z",
                    next: {
                        opacity: 0,
                        transform: {
                            scale: .9
                        }
                    },
                    active: {
                        opacity: 1,
                        transform: {
                            scale: 1
                        }
                    },
                    prev: {
                        opacity: 0,
                        transform: {
                            scale: 1.1
                        }
                    }
                },
                fade: {
                    axis: "Z",
                    next: {
                        opacity: 0,
                        transform: {}
                    },
                    active: {
                        opacity: 1,
                        transform: {}
                    },
                    prev: {
                        opacity: 0,
                        transform: {}
                    }
                },
                kenburned: {
                    axis: "Z",
                    next: {
                        opacity: 0,
                        transform: {}
                    },
                    active: {
                        opacity: 1,
                        transform: {}
                    },
                    prev: {
                        opacity: 0,
                        transform: {}
                    }
                },
                zoom_out: {
                    axis: "Z",
                    next: {
                        zIndex: "+",
                        opacity: 1,
                        transform: {
                            translateY: 100,
                            scale: 1
                        }
                    },
                    active: {
                        opacity: 1,
                        transform: {
                            translateY: 0,
                            scale: 1
                        }
                    },
                    prev: {
                        zIndex: "+",
                        opacity: 0,
                        transform: {
                            translateY: 0,
                            scale: .5
                        }
                    }
                },
                horizontal_curtain: {
                    axis: "Z",
                    next: {
                        zIndex: "+",
                        transform: {
                            translateX: 100
                        }
                    },
                    active: {
                        transform: {
                            translateX: 0
                        }
                    },
                    prev: {
                        zIndex: "+",
                        transform: {
                            translateX: -70
                        }
                    }
                },
                roulete: {
                    axis: "X",
                    next: {
                        opacity: .5,
                        transform: {
                            scale: .5,
                            rotate: 10,
                            translateY: 20
                        }
                    },
                    active: {
                        opacity: 1,
                        transform: {
                            scale: 1,
                            rotate: 0,
                            translateY: 0
                        }
                    },
                    prev: {
                        opacity: .3,
                        transform: {
                            scale: .5,
                            rotate: -10,
                            translateY: 20
                        }
                    }
                }
            }, MK.ui.Slider.prototype.ease = {
                linearEase: function(currentIteration, startValue, changeInValue, totalIterations) {
                    return changeInValue * currentIteration / totalIterations + startValue
                },
                easeInQuad: function(currentIteration, startValue, changeInValue, totalIterations) {
                    return changeInValue * (currentIteration /= totalIterations) * currentIteration + startValue
                },
                easeOutQuad: function(currentIteration, startValue, changeInValue, totalIterations) {
                    return -changeInValue * (currentIteration /= totalIterations) * (currentIteration - 2) + startValue
                },
                easeInOutQuad: function(currentIteration, startValue, changeInValue, totalIterations) {
                    return (currentIteration /= totalIterations / 2) < 1 ? changeInValue / 2 * currentIteration * currentIteration + startValue : -changeInValue / 2 * (--currentIteration * (currentIteration - 2) - 1) + startValue
                },
                easeInCubic: function(currentIteration, startValue, changeInValue, totalIterations) {
                    return changeInValue * Math.pow(currentIteration / totalIterations, 3) + startValue
                },
                easeOutCubic: function(currentIteration, startValue, changeInValue, totalIterations) {
                    return changeInValue * (Math.pow(currentIteration / totalIterations - 1, 3) + 1) + startValue
                },
                easeInOutCubic: function(currentIteration, startValue, changeInValue, totalIterations) {
                    return (currentIteration /= totalIterations / 2) < 1 ? changeInValue / 2 * Math.pow(currentIteration, 3) + startValue : changeInValue / 2 * (Math.pow(currentIteration - 2, 3) + 2) + startValue
                },
                easeInQuart: function(currentIteration, startValue, changeInValue, totalIterations) {
                    return changeInValue * Math.pow(currentIteration / totalIterations, 4) + startValue
                },
                easeOutQuart: function(currentIteration, startValue, changeInValue, totalIterations) {
                    return -changeInValue * (Math.pow(currentIteration / totalIterations - 1, 4) - 1) + startValue
                },
                easeInOutQuart: function(currentIteration, startValue, changeInValue, totalIterations) {
                    return (currentIteration /= totalIterations / 2) < 1 ? changeInValue / 2 * Math.pow(currentIteration, 4) + startValue : -changeInValue / 2 * (Math.pow(currentIteration - 2, 4) - 2) + startValue
                },
                easeInQuint: function(currentIteration, startValue, changeInValue, totalIterations) {
                    return changeInValue * Math.pow(currentIteration / totalIterations, 5) + startValue
                },
                easeOutQuint: function(currentIteration, startValue, changeInValue, totalIterations) {
                    return changeInValue * (Math.pow(currentIteration / totalIterations - 1, 5) + 1) + startValue
                },
                easeInOutQuint: function(currentIteration, startValue, changeInValue, totalIterations) {
                    return (currentIteration /= totalIterations / 2) < 1 ? changeInValue / 2 * Math.pow(currentIteration, 5) + startValue : changeInValue / 2 * (Math.pow(currentIteration - 2, 5) + 2) + startValue
                },
                easeInSine: function(currentIteration, startValue, changeInValue, totalIterations) {
                    return changeInValue * (1 - Math.cos(currentIteration / totalIterations * (Math.PI / 2))) + startValue
                },
                easeOutSine: function(currentIteration, startValue, changeInValue, totalIterations) {
                    return changeInValue * Math.sin(currentIteration / totalIterations * (Math.PI / 2)) + startValue
                },
                easeInOutSine: function(currentIteration, startValue, changeInValue, totalIterations) {
                    return changeInValue / 2 * (1 - Math.cos(Math.PI * currentIteration / totalIterations)) + startValue
                },
                easeInExpo: function(currentIteration, startValue, changeInValue, totalIterations) {
                    return changeInValue * Math.pow(2, 10 * (currentIteration / totalIterations - 1)) + startValue
                },
                easeOutExpo: function(currentIteration, startValue, changeInValue, totalIterations) {
                    return changeInValue * (1 - Math.pow(2, -10 * currentIteration / totalIterations)) + startValue
                },
                easeInOutExpo: function(currentIteration, startValue, changeInValue, totalIterations) {
                    return (currentIteration /= totalIterations / 2) < 1 ? changeInValue / 2 * Math.pow(2, 10 * (currentIteration - 1)) + startValue : changeInValue / 2 * (2 - Math.pow(2, -10 * --currentIteration)) + startValue
                },
                easeInCirc: function(currentIteration, startValue, changeInValue, totalIterations) {
                    return changeInValue * (1 - Math.sqrt(1 - (currentIteration /= totalIterations) * currentIteration)) + startValue
                },
                easeOutCirc: function(currentIteration, startValue, changeInValue, totalIterations) {
                    return changeInValue * Math.sqrt(1 - (currentIteration = currentIteration / totalIterations - 1) * currentIteration) + startValue
                },
                easeInOutCirc: function(currentIteration, startValue, changeInValue, totalIterations) {
                    return (currentIteration /= totalIterations / 2) < 1 ? changeInValue / 2 * (1 - Math.sqrt(1 - currentIteration * currentIteration)) + startValue : changeInValue / 2 * (Math.sqrt(1 - (currentIteration -= 2) * currentIteration) + 1) + startValue
                }
            }
        }(jQuery),
        function($) {
            "use strict";
            MK.component.SocialShare = function(el) {
                var networks = {
                    twitter: "http://twitter.com/intent/tweet?text={title}&url={url}",
                    pinterest: "http://pinterest.com/pin/create/button/?url={url}&media={image}&description={title}",
                    facebook: "https://www.facebook.com/sharer/sharer.php?u={url}",
                    googleplus: "https://plus.google.com/share?url={url}",
                    linkedin: "http://www.linkedin.com/shareArticle?mini=true&url={url}&title={title}&summary={desc}",
                    digg: "http://digg.com/submit?url={url}&title={title}",
                    reddit: "http://reddit.com/submit?url={url}&title={title}"
                };
                this.networks = networks, this.el = el
            }, MK.component.SocialShare.prototype = {
                init: function() {
                    this.cacheElements(), this.bindEvents()
                },
                cacheElements: function() {
                    this.$this = $(this.el)
                },
                bindEvents: function() {
                    var thisObject = this;
                    $.each(this.networks, function(key, value) {
                        thisObject.$tempClass = $("." + key + "-share"), thisObject.$tempClass.click(thisObject.openSharingDialog.bind(self, this, key))
                    })
                },
                openSharingDialog: function(url, site, args) {
                    for (var urlWrapper = url, rx = new RegExp("{[a-z]*}", "g"), match = rx.exec(url); null != match;) {
                        var pureAttr = match[0].replace("{", "").replace("}", ""),
                            attValue = $(args.currentTarget).attr("data-" + pureAttr);
                        void 0 !== attValue && null !== attValue || (attValue = ""), attValue = attValue.replace("#", "%23"), urlWrapper = urlWrapper.replace(match, attValue), match = rx.exec(url)
                    }
                    window.open(urlWrapper, site + "Window", "height=320,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0")
                }
            };
            var $body = $("body");
            $body.length && $body.each(function() {
                new MK.component.SocialShare(this).init()
            })
        }(jQuery),
        function($) {
            "use strict";
            MK.component.Sortable = function(el) {
                this.el = el
            }, MK.component.Sortable.prototype = {
                init: function() {
                    this.cacheElements(), this.bindEvents()
                },
                cacheElements: function() {
                    this.unique = Date.now(), this.$filter = $(this.el), this.config = this.$filter.data("sortable-config"), this.ajaxLoader = new MK.utils.ajaxLoader(this.config.container), this.ajaxLoader.init(), this.$container = $(this.config.container), this.$navItems = this.$filter.find("a"), this.$filterItems = this.$container.find(this.config.item)
                },
                bindEvents: function() {
                    this.$navItems.on("click", this.handleClick.bind(this)), MK.utils.eventManager.subscribe("ajaxLoaded", this.onLoad.bind(this))
                },
                handleClick: function(e) {
                    e.preventDefault();
                    var $item = $(e.currentTarget),
                        term = $item.data("filter");
                    this.$navItems.removeClass("current"), $item.addClass("current"), "ajax" === this.config.mode ? this.inDB(term, $item) : this.inPage(term)
                },
                inDB: function(term, $item) {
                    MK.ui.loader.remove(this.$filter), MK.ui.loader.add($item), this.$container.siblings(".mk-ajax-loaded-posts").length && this.$container.siblings(".mk-ajax-loaded-posts").attr("data-loop-loaded-posts", ""), this.ajaxLoader.setData({
                        paged: 1,
                        term: term
                    }), this.ajaxLoader.load(this.unique)
                },
                inPage: function(term) {
                    var $filterItems = this.$container.find(this.config.item);
                    $filterItems.removeClass("is-hidden");
                    var className = term.replace(/, /g, ", .");
                    "*" !== term && $filterItems.not("." + className).addClass("is-hidden"), MK.utils.eventManager.publish("staticFilter")
                },
                onLoad: function(e, response) {
                    "static" === this.config.mode && this.$navItems.removeClass("current").first().addClass("current"), void 0 !== response && response.id === this.config.container && (MK.ui.loader.remove(this.$filter), response.unique === this.unique && (this.$container.html(response.content), this.ajaxLoader.setData({
                        paged: 1
                    })))
                }
            }
        }(jQuery),
        function($) {
            "use strict";
            $("iframe").each(function() {
                var $iframe = $(this);
                "P" === $iframe.parent().get(0).tagName && $iframe.wrap('<div class="mk-video-container"></div>')
            })
        }(jQuery),
        function($) {
            "use strict";

            function toggle(e) {
                e.preventDefault(), e.stopPropagation();
                var $this = $(e.currentTarget);
                $this.hasClass("mk-toggle-active") ? ($(".mk-box-to-trigger").fadeOut(200), $this.removeClass("mk-toggle-active")) : ($(".mk-box-to-trigger").fadeOut(200), $this.parent().find(".mk-box-to-trigger").fadeIn(250), $(".mk-toggle-trigger").removeClass("mk-toggle-active"), $this.addClass("mk-toggle-active"))
            }

            function assignToggle() {
                setTimeout(function() {
                    $(".mk-toggle-trigger").off("click", toggle), $(".mk-toggle-trigger").on("click", toggle)
                }, 100)
            }
            $(document).on("click", function(e) {
                $(".mk-toggle-trigger").removeClass("mk-toggle-active")
            }), assignToggle(), MK.utils.eventManager.subscribe("ajaxLoaded", assignToggle), MK.utils.eventManager.subscribe("ajax-preview", assignToggle), $(window).on("vc_reload", function() {
                assignToggle(), MK.utils.eventManager.subscribe("ajaxLoaded", assignToggle), MK.utils.eventManager.subscribe("ajax-preview", assignToggle)
            })
        }(jQuery),
        function($) {
            "use strict";
            if (MK.utils.isMobile()) return void $(".mk-animate-element").removeClass("mk-animate-element");
            var init = function() {
                    var $rootLevelEls = $(".js-master-row, .widget");
                    $rootLevelEls.each(spyViewport), $rootLevelEls.each(function() {
                        ($(this).find(".mk-animate-element").each(spyViewport), "Firefox" === MK.utils.browser.name) && ($(this).find(".right-to-left").length > 0 && $("#theme-page").css("overflow-x", "hidden"))
                    })
                },
                spyViewport = function(i) {
                    var self = this;
                    MK.utils.scrollSpy(this, {
                        position: "bottom",
                        threshold: 200,
                        after: function() {
                            animate.call(self, i)
                        }
                    })
                },
                animate = function(i) {
                    var $this = $(this);
                    setTimeout(function() {
                        $this.addClass("mk-in-viewport")
                    }, 100 * i)
                };
            $(window).on("load vc_reload", init)
        }(jQuery),
        function($) {
            "use strict";
            MK.component.Tabs = function(el) {
                var defaults = {
                    activeClass: "is-active"
                };
                this.config = defaults, this.el = el
            }, MK.component.Tabs.prototype = {
                init: function() {
                    this.cacheElements(), this.bindEvents()
                },
                cacheElements: function() {
                    this.$this = $(this.el), this.$tabs = this.$this.find(".mk-tabs-tab"), this.$panes = this.$this.find(".mk-tabs-pane"), this.currentId = 0
                },
                bindEvents: function() {
                    this.$tabs.on("click", this.switchPane.bind(this))
                },
                switchPane: function(evt) {
                    evt.preventDefault();
                    var clickedId = $(evt.currentTarget).index();
                    this.hide(this.currentId), this.show(clickedId), this.currentId = clickedId, MK.utils.eventManager.publish("item-expanded")
                },
                show: function(id) {
                    this.$tabs.eq(id).addClass(this.config.activeClass), this.$panes.eq(id).addClass(this.config.activeClass)
                },
                hide: function(id) {
                    this.$tabs.eq(id).removeClass(this.config.activeClass), this.$panes.eq(id).removeClass(this.config.activeClass)
                }
            }
        }(jQuery),
        function($) {
            "use strict";

            function smoothScrollToAnchor(evt) {
                var anchor = MK.utils.detectAnchor(this),
                    $this = $(evt.currentTarget),
                    loc = window.location,
                    currentPage = loc.origin + loc.pathname,
                    href = $this.attr("href"),
                    linkSplit = href ? href.split("#") : "",
                    hrefPage = linkSplit[0] ? linkSplit[0] : "";
                linkSplit[1] && linkSplit[1];
                anchor.length ? (hrefPage !== currentPage && "" !== hrefPage || evt.preventDefault(), MK.utils.scrollToAnchor(anchor)) : "#" === $this.attr("href") && evt.preventDefault()
            }
            $(window).on("load", function() {
                MK.core.initAll(document), MK.utils.scrollToURLHash(), setTimeout(function() {
                    MK.ui.preloader.hide(), $(".mk-preloader").hide(), $("body").removeClass("loading")
                }, 150)
            }), $(window).on("vc_reload", function() {
                setTimeout(function() {
                    MK.core.initAll(document)
                }, 100)
            }), $(document).on("click", ".js-smooth-scroll, .js-main-nav a", smoothScrollToAnchor), $(".side_dashboard_menu a").on("click", smoothScrollToAnchor)
        }(jQuery)
}(jQuery),
function($) {
    "use strict";
    $(".js-header-shortcode").each(function() {
        var $this = $(this),
            $parent_page_section = $this.parents(".mk-page-section"),
            $parent_row = $this.parents(".js-master-row");
        $parent_page_section.attr("id") && $this.detach().appendTo($parent_page_section), $parent_page_section.css({
            overflow: "visible"
        }), $parent_row.css({
            overflow: "visible"
        }), $this.parent().css("z-index", 99999)
    })
}(jQuery),
function($) {
    "use strict";
    var AjaxModal = function(el) {
        this.el = el;
        var $this = $(el),
            action = $this.data("action"),
            id = $this.data("id");
        this.load(action, id)
    };
    AjaxModal.prototype = {
        init: function(html) {
            var self = this;
            $("body").append(html), this.cacheElements(), this.bindEvents(), this.$modal.addClass("is-active"), MK.core.initAll(self.$modal.get(0)), $(".variations_form").each(function() {
                $(this).wc_variation_form().find(".variations select:eq(0)").change()
            }), MK.utils.scroll.disable(), MK.ui.loader.remove(), MK.utils.eventManager.publish("quickViewOpen")
        },
        cacheElements: function() {
            this.$modal = $(".mk-modal"), this.$slider = this.$modal.find(".mk-slider-holder"), this.$container = this.$modal.find(".mk-modal-container"), this.$closeBtn = this.$modal.find(".js-modal-close")
        },
        bindEvents: function() {
            this.$container.on("click", function(e) {
                e.stopPropagation()
            }), this.$closeBtn.on("click", this.handleClose.bind(this)), this.$modal.on("click", this.handleClose.bind(this))
        },
        handleClose: function(e) {
            e.preventDefault(), MK.utils.scroll.enable(), this.close()
        },
        close: function() {
            this.$modal.remove()
        },
        load: function(action, id) {
            $.ajax({
                url: MK.core.path.ajaxUrl,
                data: {
                    action: action,
                    id: id
                },
                success: this.init.bind(this),
                error: this.error.bind(this)
            })
        },
        error: function(response) {
            console.log(response)
        }
    };
    var createModal = function(e) {
        e.preventDefault();
        var el = e.currentTarget;
        MK.ui.loader.add($(el).parents(".product-loop-thumb")), new AjaxModal(el)
    };
    $(document).on("click", ".js-ajax-modal", createModal), $(window).on("vc_reload", function() {
        $(".mk-product-loop").each(function() {
            var id = $(this).attr("id"),
                el = "#" + id + " > .products.js-el";
            $(el).data("init-Grid", !0), new MK.component.Grid(el).init()
        })
    })
}(jQuery);