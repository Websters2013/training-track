( function(){
    "use strict";

    $( function () {

        $.each( $('.search'), function() {

            new FilterAutocomplete ( $(this) );

        } );

    } );

    var FilterAutocomplete = function( obj ){

        //private properties
        var _obj = obj,
            _input = _obj.find( 'input' ),
            _site = $( '.site' ),
            _autocompliteList, _listItems, _data;

        //private methods
        var _init = function(){
                _setList();
            },
            _elemText = function ( elem ) {

                var cloned = elem.clone();

                cloned.find( '*' ).remove();

                return ( cloned.text().trim() )

            },
            _filterListItems = function() {
                var currentListItem;

                _listItems.removeClass( 'filtered' );

                _listItems.each( function() {

                    currentListItem = $( this );

                    if( currentListItem.text().toLowerCase().indexOf( _input.val().toLowerCase() ) == -1 ){
                        currentListItem.addClass( 'filtered' )
                    }

                } );

                _autocompliteList.find( 'div' ).perfectScrollbar('update');
            },
            _hideList = function () {

                _listItems.removeClass( 'hover' );
                _autocompliteList.removeClass( 'show' );

                _input.trigger( 'blur' );
                _input.removeClass( 'not-valid' );
                _obj.removeClass( 'site__field_not-valid' );

            },
            _hoverListItem = function( item ){

                _listItems.removeClass( 'hover' );

                item.addClass( 'hover' );

                if( item.position().top >= _autocompliteList.height() ){
                    _autocompliteList.scrollTop(  item.position().top + _autocompliteList.scrollTop() - ( item.outerHeight() * 3 ) );
                } else if ( item.position().top < 0 ){
                    _autocompliteList.scrollTop(  item.position().top + _autocompliteList.scrollTop() );
                }

            },
            _hoverNextListItem = function() {
                var items,
                    currentItem,
                    index;

                items = _listItems.filter( ':not( .filtered )' );
                currentItem = items.filter( '.hover' );
                index = items.index( currentItem );
                index = (index < 0)?0:index;

                if( currentItem.length ){

                    if( index + 1 === items.length ){
                        _hoverListItem( items.eq( 0 ) );
                    } else {
                        _hoverListItem( items.eq( index + 1 ) );
                    }

                } else {
                    _hoverListItem( items.eq( 0 ) );
                }

            },
            _hoverPrevListItem = function() {
                var items,
                    currentItem,
                    index;

                items = _listItems.filter( ':not( .filtered )' );
                currentItem = items.filter( '.hover' );
                index = items.index( currentItem );

                if( currentItem.length ){
                    _hoverListItem( items.eq( index - 1 ) );
                } else {
                    _hoverListItem( items.eq( -1 ) );
                }

            },
            _onEvents = function(){

                _site.on(
                    'click', function ( e ) {

                        if ( _autocompliteList.hasClass( 'show' ) && $( e.target ).closest( _obj ).length == 0  ){
                            _hideList();
                        }

                    }
                );

                _input.on( {
                    focus: function() {
                        _showList();
                        _filterListItems();
                    },
                    keyup: function(e) {
                        _showList();

                        if( e.keyCode == 27 ){
                            _hideList(); //esc
                        } else if( e.keyCode == 40 ){
                            _hoverNextListItem(); //down arrow
                        } else if( e.keyCode == 38 ){
                            _hoverPrevListItem(); //up arrow
                        } else if ( e.keyCode == 13 ) {
                            _selectListItem(); // enter
                            $( this ).trigger( 'blur' );
                            return false;
                        } else {
                            _filterListItems();
                        }
                    }
                } );

                _listItems.on(  {
                    click: function() {
                        _selectListItem();
                    },
                    mouseenter: function() {
                        _hoverListItem( $( this ) );
                    }
                } );

            },
            _selectListItem = function() {

                var _hoveredItem = _listItems.filter( '.hover' );

                if ( _hoveredItem.length == 0 ) {
                    _hideList();
                    return false;
                }

                _input.val ( _elemText( _hoveredItem ) );

                _hideList();

            },
            _setList = function () {

                _obj.append( '<div class="search-autocomplite__list"><div><ul></ul></div></div>' );
                _autocompliteList =  _obj.find( '.search-autocomplite__list' );

                $.getJSON('php/popular.search.json', function( kml ) {

                    _data = kml;

                    var dataList = _autocompliteList.find( 'ul' );

                    for ( var i = 0; i < _data.length; i++ ) {

                        var curData = _data[i],
                            name = curData.Name_Fr;

                        dataList.append('<li>'+name+'</li>')

                    }

                    setTimeout(function () {
                        _listItems = _autocompliteList.find( 'li' );
                        _autocompliteList.find( 'div' ).perfectScrollbar();
                        _onEvents();
                    }, 100);

                });

            },
            _showList = function(){
                _autocompliteList.addClass( 'show' );
                return false;
            };

        //public properties

        //public methods

        _init();
    };

} )();
