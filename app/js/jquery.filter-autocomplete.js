
( function(){
    'use strict';

    $( function () {

        $( '.search-autocomplite' ).each( function () {
            new FilterAutocomplete( $( this ) );
        } );

    } );

    var FilterAutocomplete = function( obj ){

        //private properties
        var _self = this,
            _obj = obj,
            _input = _obj.find( 'input' ),
            _inputWrap = _obj.find( '.search-autocomplite__inner' ),
            _window = $( window ),
            _map = $( '.filter-map' ),
            _body = $( 'body' ),
            _resultList = $( '.search-autocomplite__result' ),
            _list,
            _listItems,
            _popupListItems = $( '.more-info__district li' ),
            _mapsControl = $( '.range-options__map' ).find( '.map-control > li'),
            _activeControl = _mapsControl.filter('.active'),
            _popupList = $('.more-info__district-col'),
            _popupBtn = _obj.find('.search-autocomplite__list-btn '),
            _flag = true,
            _popup = $('.popup');

        //private methods
        var _checkListPosition = function() {
                var offset = _inputWrap.offset();

                _list.css( {
                    top: offset.top + _inputWrap.height() + 4,
                    left: offset.left,
                    width: _inputWrap.outerWidth()
                } );
            },
            _createList = function(){

                _list = _obj.find( '.search-autocomplite__list' ).clone();

                _list.addClass( 'search-autocomplite__list_hidden' );
                _list.addClass( 'search-autocomplite__list_drop' );

                _listItems = _list.find( 'li' );

                _body.append( _list );

                _list.perfectScrollbar();

            },
            _filterItems = function() {
                var currentListItem;

                _listItems.removeClass( 'filtered' );

                _listItems.each( function() {

                    currentListItem = $( this );

                    if( currentListItem.text().toLowerCase().indexOf( _input.val().toLowerCase() ) == -1 ){
                        currentListItem.addClass( 'filtered' )
                    }

                } );
                _list.perfectScrollbar('update');
            },
            _hideList = function () {
                _listItems.removeClass( 'hover' );
                _list.addClass( 'search-autocomplite__list_hidden' );
            },
            _hover = function( item ){
                _listItems.removeClass( 'hover' );

                item.addClass( 'hover' );

                if( item.position().top >= _list.height() ){
                    _list.scrollTop(  item.position().top + _list.scrollTop() - ( item.outerHeight() * 3 ) );
                } else if ( item.position().top < 0 ){
                    _list.scrollTop(  item.position().top + _list.scrollTop() );

                }
            },
            _hoverNext = function() {
                var items,
                    currentItem,
                    index;

                items = _listItems.filter( ':not(.hidden)' );
                items = items.filter( ':not(.filtered)' );
                currentItem = items.filter( '.hover' );
                index = items.index( currentItem );
                index = (index < 0)?0:index;

                if( currentItem.length ){

                    if( index + 1 === items.length ){
                        _hover( items.eq( 0 ) );
                    } else {
                        _hover( items.eq( index + 1 ) );
                    }

                } else {
                    _hover( items.eq( 0 ) );
                }

            },
            _hoverPrev = function() {
                var items,
                    currentItem,
                    index;

                items = _listItems.filter( ':not(.hidden)' );
                items = items.filter( ':not(.filtered)' );
                currentItem = items.filter( '.hover' );
                index = items.index( currentItem );

                if( currentItem.length ){
                    _hover( items.eq( index - 1 ) );

                } else {
                    _hover( items.eq( -1 ) );
                }
            },
            _init = function(){
                _obj[ 0 ].obj = _self;
                _setList();
                _createList();
                _onEvents();
            },
            _onEvents = function(){

                _mapsControl.on( {
                    click: function() {

                        setTimeout(function () {
                            _activeControl = _mapsControl.filter('.active');
                            _setList( $(this) );
                        },300);
                    }
                } );
                _input.on( {
                    focus: function() {
                        _showList();
                    },
                    click: function( e ) {
                        e.stopPropagation();
                        _showList();
                    },
                    keyup: function(e) {
                        _showList();

                        if( e.keyCode == 27 ){
                            _hideList();
                        } else if( e.keyCode == 40 ){
                            _hoverNext();
                        } else if( e.keyCode == 38 ){
                            _hoverPrev();
                        } else if ( e.keyCode == 13 ){
                            _selectItem();
                        } else {
                            _filterItems();
                        }
                    },
                    keydown: function(e) {

                        if( e.keyCode == 13 ){
                            return false;
                        }
                    },
                    blur: function() {

                    }
                } );
                _listItems.on(  {
                    mousedown: function() {
                        _selectItem();
                    },
                    mouseenter: function() {
                        _hover( $( this ) );
                    }
                } );
                _popupListItems.on(  {
                    click: function() {
                        _selectPopupItem( $(this) )
                    }
                } );
                _resultList.on( 'click','> div',  function() {
                    _unselectItem( [ $( this ).text() ] );
                } );
                _window.on( {
                    scroll: function() {

                        _hideList();
                    },
                    resize: function() {

                        var offset = _inputWrap.offset();

                        _list.css( {
                            top: offset.top - _window.scrollTop() + _inputWrap.height() + 4,
                            left: offset.left,
                            width: _inputWrap.outerWidth()
                        } );

                        _hideList();

                    }
                } );
                _list.on( {
                    click: function(event) {

                        event = event || window.event;

                        if ( event.stopPropagation ) {
                            event.stopPropagation();
                        } else {
                            event.cancelBubble = true;
                        }
                    }
                } );
                _popupBtn.on( {
                    click: function() {

                        _hideList();
                    },
                    focus: function() {

                        _hideList();
                    }
                } );
                _body.on( {
                    click: function() {
                        _hideList();
                    }
                } );
                document.addEventListener('touchstart', function () {
                    _input.blur();
                } );
                _input[0].addEventListener('touchstart', function (e) {
                    e.stopPropagation();
                } );


            },
            _setList = function () {

                var autocompliteList = _obj.find( '.search-autocomplite__list:first-of-type'),
                    districtList = autocompliteList.find( '.district-list'),
                    areaList = districtList.prev();

                if ( _activeControl.hasClass( 'district' ) ) {

                    $( '.search-autocomplite__list_hidden' ).remove();

                    areaList.hide();
                    districtList.show();
                    _createList();
                    _onEvents( _popupListItems.off('click') );
                    _flag = false

                }else{

                    areaList.show();
                    districtList.hide();

                    if (!_flag) {

                        $( '.search-autocomplite__list_hidden' ).remove();

                        _createList();
                        _onEvents( _popupListItems.off('click') );
                        _flag = true

                    }
                }

            },
            _selectItem = function() {

                var _hoveredItem = _listItems.filter( '.hover' );

                if (_obj.hasClass('search-autocomplite_localisation')) {

                    _listItems.removeClass('active');
                    _hoveredItem.addClass('active');

                    _input.val(_elemText( _hoveredItem ));
                    _input.attr('location', _elemText( _hoveredItem ));

                    _hideList();

                    // sessionStorage.setItem('search-autocomplite_localisation', _input.val());

                } else {
                    _hoveredItem.addClass( 'hidden' );

                    _resultList.append( '<div>'+ _elemText( _hoveredItem ) +'<span' +
                        ' class="search-autocomplite__result-close"></span></div>' );

                    _popupListItems.each( function() {

                        var curItem = $( this ),
                            curText = _elemText( curItem );

                        if( curText == _elemText( _hoveredItem ) ){

                            curItem.addClass( 'active' );

                        }

                    } );

                    _refreshMap();
                }

            },
            _unselectItem = function( texts ) {

                var curItem;

                _resultList.find( '> div' ).each( function() {

                    curItem = $( this );

                    $.each( texts, function() {

                        if( curItem.text() == this ){
                            curItem.remove();
                        }

                    } );

                } );

                _listItems.each( function() {

                    curItem = $( this );

                    $.each( texts, function () {

                        if( _elemText( curItem ) == this ){

                            curItem.removeClass( 'hidden' );

                        }

                    } );
                } );

                _popupListItems.each( function() {

                    curItem = $( this );

                    $.each( texts, function () {

                        if(  _elemText(curItem) == texts ){
                            curItem.removeClass( 'active' );
                        }
                        
                    } );

                } );

                _refreshMap();

            },
            _refreshMap = function(){
                var items = [],
                    selectedItems = _listItems.filter( '.hidden' );

                selectedItems.each( function() {

                    items.push( _elemText( $( this ) ) );

                } );

                _map[ 0 ].obj.refresh( items );
            },
            _selectPopupItem = function ( item ) {

                var curItem = item,
                    curText = _elemText( curItem ),
                    curParent = curItem.parents('.more-info__district-col'),
                    curParentIndex = curParent.index();

                if ( curItem.hasClass( 'active' ) ) {

                    _unselectItem( [curText] )

                } else {

                    curItem.addClass( 'active' );

                    _resultList.append( '<div>'+ curText +'<span class="search-autocomplite__result-close"></span></div>' );

                    _listItems.each( function() {

                        var curListItem = $( this ),
                            curListItemText = _elemText( curListItem );

                        if( curListItemText == curText ){

                            curListItem.addClass( 'hidden' );

                        }

                    } );

                    if ( !_mapsControl.eq(curParentIndex).hasClass('active') ) {

                        _mapsControl.eq(curParentIndex).trigger('click');

                    }

                    _refreshMap();

                }

            },
            _elemText = function (elem) {

                var cloned = elem.clone();

                    cloned.find('*').remove();

                return ( cloned.text().trim() )

            },
            _showList = function(){

                _checkListPosition();
                _list.removeClass( 'search-autocomplite__list_hidden' );

            };


        //public properties

        //public methods
        _self.refresh = function( items ) {

            var currentItem,
                currentText;

            _listItems.removeClass( 'hidden' );
            _resultList.html( '' );

            _listItems.each( function () {

                currentItem = $( this );
                currentText = _elemText( currentItem );

                $.each( items, function () {

                    if( currentText == this ){
                        currentItem.addClass( 'hidden' );
                    }

                } );

            } );

            _popupListItems.removeClass( 'active' );

            _popupListItems.each( function () {

                currentItem = $( this );

                $.each( items, function () {

                    if( _elemText( currentItem ) == this ){

                        currentItem.addClass( 'active' );

                    }

                } );

            } );

            $.each( items, function () {

                if ( !(this == 'Ixelles2') ) {

                    _resultList.append( '<div>'+ this +'<span class="search-autocomplite__result-close"></span></div>' );

                }
            } );

        };


        _init();
    };

} )();
