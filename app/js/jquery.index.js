( function(){

    $(function(){

        $('.rate_check').each( function() {
            new Rate( $(this) );
        } );

        $('.step').each( function() {
            new Step( $(this) );
        } );

        $('.site').each( function() {
            new Site( $(this) );
        } );

        $('.menu').each( function() {
            new Menu( $(this) );
        } );

        $('.photos').each( function() {
            new Photos( $(this) );
        } );

        $('.page-title__triangle').each( function() {
            new DrawTriangle( $(this) );
        } );

        $('.quote__triangle').each( function() {
            new QuoteTriangle( $(this) );
        } );

        $('.words').each( function() {
            new Words( $(this) );
        } );

        $('.comments').each( function() {
            new Comments( $(this) );
        } );

        $('.js-anchor').each( function() {
            new Anchor( $(this) );
        } );

        $('.testimonials').each( function() {
            new Testimonials( $(this) );
        } );

    });

    var Anchor = function ( obj ) {
        var _obj = obj,
            _body = $( 'html, body' );

        var _onEvents = function() {

                _obj.on( {
                    click: function() {

                        var curBtn = $( this );

                        _body.animate( {
                            scrollTop: $( curBtn.attr( 'href' ) ).offset().top
                        }, 600);

                        return false;
                    }
                } );

            },
            _construct = function() {
                _onEvents();
            };

        _construct()
    };

    var Comments = function(obj) {

        //private properties
        var _obj = obj,
            _commentsList = _obj.find('.comments__list'),
            _hideItems = _commentsList.find('.hide'),
            _btn = _obj.find('.comments__more'),
            _hideComments = _obj.find('.comments__count');

        //private methods
        var _addEvents = function() {

                _btn.on({
                    'click': function () {
                        var curElem = $(this);

                        if ( curElem.hasClass('active') ) {
                            _hideMore();
                        } else {
                            _showMore();
                        }

                        return false;
                    }
                });

            },
            _showMore = function () {
                _hideItems.each(function (i) {
                    var curElem = $(this);

                    curElem.slideDown(300);

                    setTimeout(function () {
                        _btn.addClass('active');
                    }, 300)
                });
            },
            _hideMore = function () {
                _hideItems.each(function (i) {
                    var curElem = $(this);

                    curElem.slideUp(300);

                    setTimeout(function () {
                        _btn.removeClass('active');
                    }, 300)
                });
            },
            _init = function() {
                _addEvents();
                _hideComments.text(_hideItems.length);
            };

        //public properties

        //public methods

        _init();
    };

    var Site = function(obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _window = $( window ),
            _canMove = true;

        //private methods
        var _addEvents = function() {

                _window.on( {
                    'scroll': function() {
                        var scrollTop = $(window).scrollTop();
                        _move( scrollTop );
                    },
                    'load': function() {
                        var scrollTop = $(window).scrollTop();
                        _changeCanMove();
                        _move( scrollTop );
                    },
                    'resize': function() {
                        _changeCanMove();
                    }
                } );

            },
            _changeCanMove = function() {
                var siteWidth = $('.site').outerWidth();

                if ( siteWidth < 1200 ) {
                    _canMove = false;
                } else {
                    _canMove = true;
                }
            },
            _paralax = function( elem, x, y, koef ) {
                var translate = 'translate3d(' + Math.round(x*koef) + 'px, ' + Math.round(y*koef) + 'px, 0px )';

                if (!_canMove) {
                    translate = 'translate3d(0px, 0px)';
                }

                elem.css( {
                    'transform': translate
                } );
            },
            _move = function( scrollTop ){
                var winHeight = $(window).height();

                $( '.easier' ).each( function() {
                    var curElem = $(this),
                        items = curElem.find('.easier__photos-line'),
                        curTop = curElem.offset().top,
                        curHeight = curElem.height(),
                        curKoef = -.05;

                    items.each( function() {
                        var curItem = $(this);

                        curKoef = -curKoef;
                        if ( ( scrollTop <= ( curTop + curHeight ) && ( ( winHeight + scrollTop ) >= curTop ) ) ) {

                            if ( curTop < winHeight ) {
                                _paralax( curItem, 0, scrollTop, curKoef);
                            } else {
                                _paralax( curItem, 0, scrollTop - (curTop - winHeight), curKoef);
                            }
                        }
                    } );
                } );

                $( '.coach' ).each( function() {
                    var curElem = $(this),
                        items = curElem.find('.coach__photos-line'),
                        curTop = curElem.offset().top,
                        curHeight = curElem.height(),
                        curKoef = -.05;

                    items.each( function() {
                        var curItem = $(this);

                        curKoef = -curKoef;
                        if ( ( scrollTop <= ( curTop + curHeight ) && ( ( winHeight + scrollTop ) >= curTop ) ) ) {

                            if ( curTop < winHeight ) {
                                _paralax( curItem, 0, scrollTop, curKoef);
                            } else {
                                _paralax( curItem, 0, scrollTop - (curTop - winHeight), curKoef);
                            }
                        }
                    } );
                } );

            },
            _init = function() {
                _obj[ 0 ].obj = _self;
                _addEvents();
            };

        //public properties

        //public methods

        _init();
    };

    var Step = function(obj) {

        //private properties
        var _obj = obj,
            _slider = _obj.find('.swiper-container'),
            _steps = _obj.find('.swiper-pagination'),
            _items = _obj.find('.swiper-slide'),
            _next = _obj.find('.step__next'),
            _prev = _obj.find('.step__prev'),
            _submit = _obj.find('.step__submit'),
            _window = $(window),
            _swiper,
            _fields = _obj.find( ':required' ),
            _request = new XMLHttpRequest(),
            _radioButtons = _obj.find('.sex input'),
            _radioRequired = _obj.find('#radioSex'),
            _selectRequiredWraps = _obj.find('.site__form-select-required'),
            _selectRequiredItems = _selectRequiredWraps.find('select');

        //private methods
        var _addEvents = function() {

                _obj.on({
                    'submit': function () {

                        console.log('submit');
                        return false;
                    }
                });

                _radioButtons.on({
                    'click': function () {
                        var curValue = $(this).val();

                        _radioRequired.val(curValue);
                    }
                });

                _selectRequiredItems.on({
                    'change': function () {
                        var curElem = $(this),
                            curValue = curElem.val(),
                            curInput = curElem.find('input');

                        curInput.val(curValue);
                    }
                });

                _window.on({
                    'resize': function () {

                        if ( _obj.parent('.popup__content') ) {
                            _checkPopupWidth();
                            _swiper.update();
                        } else {
                            _swiper.update();
                        }

                        var stepWidth = 100/_items.length + '%';
                        _items.each(function () {
                            _steps.append('<div class="steps" style="width: ' + stepWidth + '"></div>');
                        });
                    },
                    'load': function () {
                        if ( _obj.parent('.popup__content') ) {
                            _checkPopupWidth();
                            _initSlider();
                        } else {
                            _initSlider();
                        }
                    }
                });

                _next.on({
                    'click': function () {

                        var activeSlide = $(this).parents('.swiper-slide-active');

                        if ( _checkStep( activeSlide ) ) {

                            _swiper.slideNext();
                        }
                        return false;
                    }
                });

                _submit.on({
                    'click': function () {

                        var activeSlide = $(this).parents('.swiper-slide-active');

                        if ( _checkStep( activeSlide ) ) {

                            _sendRequest();
                        }

                        return false;
                    }
                });

                _fields.on({
                    'focus': function () {
                        $( this ).removeClass( 'not-touched' );
                        $( this ).removeClass( 'not-valid' );
                    }
                });

            },
            _makeNotValid = function ( field ) {
                field.addClass( 'not-valid' );
                field.removeClass( 'valid' );
            },
            _makeValid = function ( field ) {
                field.removeClass( 'not-valid' );
                field.addClass( 'valid' );
            },
            _validateEmail = function ( email ) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            },
            _validateField = function ( field ) {
                var type = field.attr( 'type' );

                if ( type == 'email' ) {
                    if( !_validateEmail( field.val() ) ){
                        _makeNotValid( field );
                        return false;
                    }
                } else {
                    if ( field.val() == '' ) {
                        _makeNotValid( field );
                        return false;
                    }
                }
                _makeValid( field );
                return true;
            },
            _setStartSelectValue = function() {
                _selectRequiredWraps.each(function () {
                    var curElem = $(this),
                        curValue = curElem.find('select').val(),
                        curInput = curElem.find('input');

                    curInput.val(curValue);
                });
            },
            _checkPopupWidth = function() {
                var curWidth = $(window).width() - 20;

                if ( curWidth > 589 ) {
                    curWidth = 589;
                }
                _obj.parent('.popup__content').css({ 'width': curWidth + 'px' });
            },
            _checkStep = function (curStep) {

                var requaredInputs = curStep.find( ':required' ),
                    notValid = false;

                requaredInputs.each(function () {
                    var curElem = $(this),
                        curValue = curElem.val();

                    if ( !_validateField(curElem) ) {
                        notValid = true;
                    }
                });

                if ( notValid ) {
                    return false;
                } else  {
                    return true;
                }
            },
            _sendRequest = function () {

                _request.abort();
                _request = $.ajax({
                    url: _obj.data('action'),
                    data: {
                        address: _obj.serialize()
                    },
                    dataType: 'html',
                    timeout: 20000,
                    type: 'get',
                    success: function () {

                        _obj.find('.swiper-slide-active').addClass('success');
                        console.log('success');
                        _swiper.slideNext();
                    },
                    error: function (XMLHttpRequest) {
                        if (XMLHttpRequest.statusText != "abort") {
                            console.error(XMLHttpRequest);
                        }
                    }
                });

                // currentItem.addClass('loading');
            },
            _initSlider = function() {
                _swiper = new Swiper(_slider, {
                    pagination: _steps,
                    // nextButton: _next,
                    prevButton: _prev,
                    paginationType: 'progress',
                    spaceBetween: 30,
                    effect: 'fade',
                    touchRatio: 0,
                    paginationClickable: true,
                    onInit: function () {
                        setTimeout(function () {
                            var stepWidth = 100/_items.length + '%';
                            _items.each(function (i) {
                                _steps.append('<div class="steps" style="width: ' + stepWidth + '"></div>');
                            });
                        }, 100)
                    }
                });
            },
            _init = function() {
                _addEvents();
                _setStartSelectValue();
            };

        //public properties

        //public methods

        _init();
    };

    var Menu = function(obj) {

        //private properties
        var _obj = obj,
            _btn = $( '.menu-btn' ),
            _scrollConteiner = $( 'html' ),
            _loader = $('.loader');

        //private methods
        var _addEvents = function() {

                _btn.on({
                    'click': function() {

                        if ( !_obj.hasClass( 'open' ) ) {
                            _btn.addClass('active');
                            _showMenu();
                        } else {
                            _btn.removeClass('active');
                            _hideMenu();
                        }
                    }
                });

                $(window).on({
                    'load': function() {

                        _loader.addClass('hide');
                    }
                });


                $('body').on({
                    'mousewheel': function(e) {
                        if (_obj.hasClass('open')) {
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    }
                })

            },
            _getScrollWidth = function (){
                var scrollDiv = document.createElement( 'div'),
                    scrollBarWidth;

                scrollDiv.className = 'scrollbar-measure';

                document.body.appendChild( scrollDiv );

                scrollBarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

                document.body.removeChild(scrollDiv);

                return scrollBarWidth;
            },
            _showMenu = function() {
                _obj.addClass( 'open' );
                _scrollConteiner.css( {
                    overflowY: 'hidden',
                    paddingRight: _getScrollWidth()
                } );
            },
            _hideMenu = function() {
                _obj.removeClass( 'open' );
                _scrollConteiner.css( {
                    overflowY: 'auto',
                    paddingRight: 0
                } );
            },
            _init = function() {
                _addEvents();
            };

        //public properties

        //public methods

        _init();
    };

    var Photos = function(obj) {

        //private properties
        var _obj = obj,
            _thumbnailSlider = _obj.find('.swiper-container'),
            _bigSliderWrap = $(' .big-photos'),
            _bigSlider = _bigSliderWrap.find('.swiper-container'),
            _scrollConteiner = $( 'html' );

        //private methods
        var _addEvents = function() {

                _scrollConteiner.on({
                    'click': function() {
                    }
                });

            },
            _initSlider = function() {

                var bigSwiper = new Swiper(_bigSlider, {
                    nextButton: _bigSliderWrap.find('.swiper-button-next'),
                    prevButton: _bigSliderWrap.find('.swiper-button-prev')
                });

                var swiper = new Swiper(_thumbnailSlider, {
                    nextButton: _obj.find('.swiper-button-next'),
                    prevButton: _obj.find('.swiper-button-prev'),
                    slidesPerView: 3,
                    paginationClickable: true,
                    spaceBetween: 30,
                    breakpoints: {
                        // when window width is <= 480px
                        480: {
                            slidesPerView: 1
                        },
                        // when window width is <= 640px
                        748: {
                            slidesPerView: 2
                        }
                    },
                    onClick: function (sw) {
                        bigSwiper.slideTo(sw['clickedIndex'], 0);
                    }
                });

                // bigSwiper.params.control = swiper;
                // swiper.params.control = bigSwiper;
            },
            _init = function() {
                _addEvents();
                _initSlider();
            };

        //public properties

        //public methods

        _init();
    };

    var Testimonials = function( obj ) {

        //private properties
        var _obj = obj,
            _sliderContent = _obj.find( '.testimonials__content' ),
            _sliderThumbs = _obj.find( '.testimonials__logos' );

        //private methods
        var _initSliders = function() {

                _sliderContent.slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    touchThreshold: 18,
                    autoplay: true,
                    arrows: false,
                    autoplaySpeed: 5000,
                    asNavFor: _sliderThumbs
                });

                _sliderThumbs.slick({
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    asNavFor: _sliderContent,
                    centerMode: true,
                    arrows: false,
                    touchThreshold: 18,
                    focusOnSelect: true,
                    centerPadding: 0,
                    responsive: [
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 3
                            }
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 1
                            }
                        }
                    ]
                });

            },
            _onEvent = function() {

            },
            _init = function() {
                _onEvent();
                _initSliders ();
            };

        //public properties

        //public methods

        _init();
    };

    var DrawTriangle = function(obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _fill = _obj.data('fill'),
            _lineWidth = 5;

        //private methods
        var _addEvents = function() {

            $(window).on({
                'resize': function () {

                    if ( $(window).width() < 1200 ) {
                        _lineWidth = 5;
                    } else {
                        _lineWidth = 2
                    }

                    _draw(_fill);
                }
            });

            },
            _draw = function(fill) {
                var canvas = _obj[0],
                    ctx = canvas.getContext('2d');

                canvas.width = 744;
                canvas.height = 567;

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                ctx.beginPath();
                ctx.lineWidth = _lineWidth;
                ctx.strokeStyle = fill;
                ctx.moveTo(253, 182);
                ctx.lineTo(372, 0);
                ctx.lineTo(491, 182);
                ctx.moveTo(664, 449);
                ctx.lineTo(744, 567);
                ctx.lineTo(0, 567);
                ctx.lineTo(80, 449);
                ctx.moveTo(80, 449);
                ctx.closePath();
                ctx.stroke();


                ctx.beginPath();
                ctx.lineWidth = _lineWidth*1.8;
                ctx.strokeStyle = fill;
                ctx.moveTo(0, 567);
                ctx.lineTo(744, 567);
                ctx.closePath();
                ctx.stroke();
            },
            _init = function() {
                _obj[ 0 ].obj = _self;
                _addEvents();
                if ( $(window).width() < 992 ) {
                    _lineWidth = 5;
                } else {
                    _lineWidth = 2
                }
                _draw(_fill);
            };

        //public properties

        //public methods
        _self.drawTriangle = function ( fill ) {
            _draw(fill);
        };

        _init();
    };

    var QuoteTriangle = function(obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _fill = _obj.data('fill');

        //private methods
        var _addEvents = function() {


            },
            _draw = function(fill) {
                var canvas = _obj[0],
                    ctx = canvas.getContext('2d');

                canvas.width = 262;
                canvas.height = 224;

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.strokeStyle = fill;
                ctx.moveTo(0, 224);
                ctx.lineTo(32, 170);
                ctx.moveTo(91, 68);
                ctx.lineTo(131, 0);
                ctx.lineTo(171, 68);
                ctx.moveTo(230, 170);
                ctx.lineTo(262, 224);
                ctx.moveTo(262, 224);
                ctx.closePath();
                ctx.stroke();

                ctx.beginPath();
                ctx.lineWidth = 4;
                ctx.strokeStyle = fill;
                ctx.moveTo(262, 224);
                ctx.lineTo(0, 224);
                ctx.moveTo(0, 224);
                ctx.closePath();
                ctx.stroke();
            },
            _init = function() {
                _obj[ 0 ].obj = _self;
                _addEvents();
                _draw(_fill);
            };

        //public properties

        //public methods
        _self.drawTriangle = function ( fill ) {
            _draw(fill);
        };

        _init();
    };

    var Words = function(obj) {

        //private properties
        var _obj = obj,
            _items = _obj.find('span'),
            _itemsLength = _items.length - 1,
            _activeIndex = 0,
            _startTime = 0,
            _duration = _obj.data('duration') || 2000;

        //private methods
        var _addEvents = function() {

                $(window).on({
                    'load': function () {

                        _step();
                    }
                });

            },
            _step = function(time) {
                var delta = time - _startTime;

                if ( delta > _duration ) {
                    _startTime = time;

                    _items.eq(_activeIndex).addClass('is-hidden');
                    _items.eq(_activeIndex).removeClass('is-visible');

                    if ( _activeIndex < _itemsLength ) {
                        _activeIndex++;
                    } else  {
                        _activeIndex = 0;
                    }

                    _items.eq(_activeIndex).removeClass('is-hidden');
                    _items.eq(_activeIndex).addClass('is-visible');

                    if ( _obj.parents('.page-title') ) {

                        _drawTriangle(_items.eq(_activeIndex).data('fill'));
                    }
                }
                window.requestAnimationFrame(_step);
            },
            _drawTriangle = function (fill) {
                var triangle = _obj.parents('.page-title').find('.page-title__triangle');

                if (triangle.length) {
                    $('.page-title__triangle')[0].obj.drawTriangle(fill);
                }
            },
            _setMaxWidth = function() {
                var maxWidth = 0;
                _items.each(function () {
                    var curWidth = $(this).width();

                    if ( curWidth > maxWidth ) {
                        maxWidth = curWidth;
                    }
                });
                _obj.css({ 'width': maxWidth + 'px' });
            },
            _init = function() {
                _addEvents();
                _setMaxWidth();
                _items.eq(_activeIndex).removeClass('is-hidden');
                _items.eq(_activeIndex).addClass('is-visible');
                _drawTriangle(_items.eq(_activeIndex).data('fill'));
            };

        //public properties

        //public methods

        _init();
    };

    var Rate = function(obj) {

        //private properties
        var _obj = obj,
            _wrap = _obj.find('.rate__wrap'),
            _objWidth = _obj.width(),
            _objLeft = _obj.offset().left,
            _savePosition = 0,
            _curPosition = 0;

        //private methods
        var _addEvents = function() {

                _obj.on({
                    'mousemove': function (e) {
                        _curPosition = e.offsetX/$(this).outerWidth()*100;
                        _wrap.css({ 'width': _curPosition + '%' });
                    },
                    'mouseleave': function () {
                        _wrap.css({ 'width': _savePosition + '%' });
                    },
                    'click': function () {
                        _savePosition = _curPosition;
                    }
                });

            },
            _init = function() {
                _addEvents();
            };

        //public properties

        //public methods

        _init();
    };

} )();