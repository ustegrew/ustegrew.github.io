/**
 *  @fileoverview        Widget to present demo program to user. 
 */
define 
(
    [
        "dojo/_base/declare",
        "dojo/store/Memory",
        "gridx/core/model/cache/Sync",
        "dijit/_WidgetBase",
        "dijit/_TemplatedMixin",
        "ace/TAce",
        "dijit/form/Button",
        "gridx/Grid",
        "gridx/modules/VirtualVScroller",
        "gridx/modules/ColumnResizer",
        "gridx/modules/SingleSort",
        "dojo/text!jsdemo/templates/TDebugView.templ.html",
        "require"                                                               /* [7] */
    ],
    function 
    (
        declare, 
        dstore,
        dcache,
        _WidgetBase, 
        _TemplatedMixin,
        TAceEdit,
        Button,
        Grid,
        VirtualVScroller, 
        ColumnResizer, 
        SingleSort,
        template,
        _require                                                                /* [7] */
    )
    {
        var TGUI;
        var ret;

        /**
         * The user interface. Layout:
         *
         * <pre>
         *     .-------------------------------------------------------.
         *     |.-------.                          .--------..--------.|
         *     || Reset |     Navigation bar       | < Prev || Next > ||
         *     |'-------'                          '--------''--------'|
         *     |.---------------------------..------------------------.|
         *     ||                           ||                        ||
         *     ||                           ||                        ||
         *     ||                           ||       Variables        ||
         *     ||          Source           ||          view          ||
         *     ||           code            ||                        ||
         *     ||          viewer           |'------------------------'|
         *     ||                           |.------------------------.|
         *     ||                           ||                        ||
         *     ||                           ||        Comments        ||
         *     ||                           ||                        ||
         *     |'---------------------------''------------------------'|
         *     '-------------------------------------------------------'
         * </pre>
         * 
         * Elements on the user interface:
         * 
         * <dl>
         *     <dt>Navigation bar</dt>
         *     <dd>Provides navigation via three buttons: Next/Previous step, reset.</dd>
         *     
         *     <dt>Source code viewer</dt>
         *     <dd>Shows the source code of the program demonstrated. Current step's
         *         line will be highlited.</dd>
         *     
         *     <dt>Variables view</dt>
         *     <dd>Shows a table with variables the user might want to see.</dd>
         *     
         *     <dt>Comments</dt>
         *     <dd>A panel showing some more detailed information about the current step.</dd>
         * </dl>
         * @class       TGUI
         * @augments    _WidgetBase
         * @augments    _TemplateMixin
         */
        TGUI = 
        {
            /**
             * Sets the status of the UI. Includes source code shown, which line
             * highlited, interesting variables shown, some explanatory comment.
             * 
             * @param   {TSnapshot}     snapshot    The snapshot to show in the interface.
             * @public
             */
            Notify_SetStatus: function (snapshot)
            {
                var i;
                var n;
                var k;
                var v;
                var t;
                var recS;
                var rec;
                var items;
                
                if (this.fBtnPrev)
                {
                    this.fBtnPrev.set ("disabled", (!snapshot.fCanNavStepBackwards));
                }
                
                if (this.fBtnNext)
                {
                    this.fBtnNext.set ("disabled", (!snapshot.fCanNavStepForwards));
                }
                
                if (this.fBtnReset)
                {
                    this.fBtnReset.set ("disabled", (!snapshot.fCanNavReset));
                }
                
                if (this.fPnlEditor)
                {
                    this.fPnlEditor.fEditor.setValue (snapshot.fProgramAllSource);
                    this.fPnlEditor.fEditor.gotoLine (snapshot.fProgramCurrentState + 1);
                    this.fPnlEditor.fEditor.resize   ();
                }
                
                if (this.fPnlDbg)
                {
                    items   = [];
                    n       = snapshot.fProgramCurrentSymbols.GetNumEntries ();
                    if (n >= 1)
                    {
                        for (i = 0; i < n; i++)
                        {
                            k       = snapshot.fProgramCurrentSymbols.GetKey          (i);
                            v       = snapshot.fProgramCurrentSymbols.GetValue_ByKey  (k);
                            recS    = this._GetRecordSanitized                        (v);
                            
                            rec = 
                            {
                                id:         i+1,
                                varName:    k,
                                varType:    recS.type,
                                varValue:   recS.value
                            };
                            items.push (rec);
                        }
                    }
                    this.fPnlDbg.model.clearCache ();
                    this.fPnlDbg.model.store.setData (items);
                    this.fPnlDbg.body.refresh ();
                }
                
                if (this.fPnlComment)
                {
                    this.fPnlComment.innerHTML = snapshot.fProgramCurrentComment;
                }
            },
            
            /**
             * Sets the hosting controller. Has to be done in a separate 
             * setter method, rather than the constructor (otherwise the
             * Dojo framework will flag up 'undefined' reference errors.
             * 
             * @param   {TController}   host    The hosting controller.
             * @public
             */
            SetHost: function (host)
            {
                this.fController = host;
            },
            
            /* -------------------------------------------------------------
             * Property definitions. It's recommended not to access these from 
             * outside, but to use the public Notify_... methods for that.
             * ------------------------------------------------------------- */
            
            /**
             * Dojo demands this property. Template is defined in a separate 
             * file <code>jsdemo/templates/TDebugView.templ.html</code>.
             *
             * @type    String
             * @private
             */
            templateString:     template,                       /* [1], [2] */
            
            fBtnNext:           null,
            fBtnPrev:           null,
            fBtnReset:          null,
            
            /**
             * The hosting controller. Does all the application specific logic.
             *
             * @type        
             * @private
             */
            fController:        null,

            /**
             * Handle for the comment panel (div DOM node).
             *
             * @type        [DOM:DIV]
             * @private
             */
            fPnlComment:        null,

            /**
             * Handle for the debug details panel. 
             *
             * @type        [gridx/Grid]
             * @private
             */
            fPnlDbg:            null,
        
            /**
             * Handle for the source view panel (ace editor component). 
             *
             * @type        [ace/ace]
             * @private
             */
            fPnlEditor:         null,
            
            /**
             * Target size: Width.
             *
             * @type        String
             * @private
             */
            fGeoWidth:          "450px",

            /**
             * Target size: Height.
             *
             * @type        String
             * @private
             */
            fGeoHeight:         "600px;",

            /**
             * Dojo specific cTor.
             */
            constructor: function ()
            {
            },
            
            /* -------------------------------------------------------------
             * Dijit overrides 
             * ------------------------------------------------------------- */
        
            /**
             * Sets up the UI. This overrides the _WidgetBase::startup (). 
             * We don't use the typical way of overriding 
             * _WidgetBase::postCreate (), because this widget includes 
             * child widgets (such as BorderContainer), and it's not 
             * recommended to do JS resizing in the postCreate() method. 
             * We could get fancy and do part of the instantiation in a 
             * postCreate() method, but having everything together in 
             * startup () makes things simpler.
             * 
             * Excerpt, Dojo documentation:
             *     + postCreate
             *          This is typically the workhorse of a custom widget. The 
             *          widget has been rendered (but note that child widgets in 
             *          the containerNode have not!). The widget though may not 
             *          be attached to the DOM yet so you shouldn’t do any sizing 
             *          calculations in this method.
             *     
             *     + startup
             *          If you need to be sure parsing and creation of any child 
             *          widgets has completed, use startup. This is often used 
             *          for layout widgets like BorderContainer. If the widget 
             *          does JS sizing, then startup() should call resize(), 
             *          which does the sizing.
             */
            startup: function ()
            { 
                var _this           = this;
                var kImgBaseUrl     = _require.toUrl ("jsdemo/img");            /* [7] */

                var functor;
                
                /* Run any parent postCreate methods */
                this.inherited (arguments);
                
                /* Create Nav bar.                                                 [4] */
                functor = function ()
                {
                    var btnReset;
                    var btnPrev;
                    var btnNext;
                    var icoReset;
                    var icoPrev;
                    var icoNext;

                    /* ---------------------------------------------------
                     * Get icon URLs 
                     * ---------------------------------------------------*/
                    icoReset = kImgBaseUrl + "/go-first.png";
                    icoPrev  = kImgBaseUrl + "/go-previous.png";
                    icoNext  = kImgBaseUrl + "/go-next.png";
                    
                    /* ---------------------------------------------------
                     * Create RESET button
                     * ---------------------------------------------------*/
                    btnReset = new Button
                    (
                        {
                            label:      "<img src='" + icoReset + "'/>",        /* [5] */
                            disabled:   true,
                            fJSDemo:
                            {
                                fHost: _this
                            },
                            onClick: function ()
                            {
                                var obj;
                                
                                obj = this.fJSDemo.fHost;
                                obj._Handle_BtnReset_Click.call (obj);
                            }
                        }, _this.btnReset
                    );
                    btnReset.startup ();
                    _this.fBtnReset = btnReset;                                 /* <----- Property: fBtnReset */
                    
                    /* ---------------------------------------------------
                     * Create GO PREVIOUS STEP button
                     * ---------------------------------------------------*/
                    btnPrev = new Button
                    (
                        {
                            label:      "<img src='" + icoPrev + "'/>",         /* [5] */
                            disabled:   true,
                            fJSDemo:
                            {
                                fHost: _this
                            },
                            onClick: function ()
                            {
                                var obj;
                                
                                obj = this.fJSDemo.fHost;
                                obj._Handle_BtnPrev_Click.call (obj);
                            }
                        }, _this.btnPrev
                    );
                    btnPrev.startup ();
                    _this.fBtnPrev = btnPrev;                                   /* <----- Property: fBtnPrev */
                    
                    /* ---------------------------------------------------
                     * Create GO NEXT STEP button
                     * ---------------------------------------------------*/
                    btnNext = new Button
                    (
                        {
                            label:      "<img src='" + icoNext + "'/>",         /* [5] */
                            disabled:   true,
                            fJSDemo:
                            {
                                fHost: _this
                            },
                            onClick: function ()
                            {
                                var obj;
                                
                                obj = this.fJSDemo.fHost;
                                obj._Handle_BtnNext_Click.call (obj);
                            }
                        }, _this.btnNext
                    );
                    btnNext.startup ();
                    _this.fBtnNext = btnNext;                                   /* <----- Property: btnNext */
                };
                functor ();

                /* Create the main view [4].
                 * This is the improved design - more screen estate for the 
                 * source view. It takes up more screen estate (~40% wider),
                 * but with about (800 x 450) px it should fit on most laptop 
                 * and desktop displays. Layout:
                 * 
                 * <pre>
                 *     .-------------------------------------------------------.
                 *     |.-------.                          .--------..--------.|
                 *     || Reset |     Navigation bar       | < Prev || Next > ||
                 *     |'-------'                          '--------''--------'|
                 *     |.---------------------------..------------------------.|
                 *     ||                           ||                        ||
                 *     ||                           ||                        ||
                 *     ||                           ||       Variables        ||
                 *     ||          Source           ||          view          ||
                 *     ||           code            ||                        ||
                 *     ||          viewer           |'------------------------'|
                 *     ||                           |.------------------------.|
                 *     ||                           ||                        ||
                 *     ||                           ||        Comments        ||
                 *     ||                           ||                        ||
                 *     |'---------------------------''------------------------'|
                 *     '-------------------------------------------------------'
                 * </pre>
                 */
                functor = function ()
                {
                    var store;
                    var struct;
                    var cache;
                    var pnlDbgGrid;
                    
                    /* ---------------------------------------------------------
                     * Create detail view container. This will contain a 
                     * GridX component which gives us a table with 
                     * resizable columns and sorting capabilities
                     * (user clicks on the resp. header).
                     * ---------------------------------------------------------
                     */
                    /* 1. Create data store. We use this store to manipulate the 
                     *    data shown in the table. */
                    store = new dstore
                    (
                        {
                            data:
                            [
                            ]
                        }
                    );
                    /* 2. Create data structure info block. */
                    struct = [
                        {id: 'varName',     field: 'varName',       name: 'Variable', width: '100px'},
                        {id: 'varValue',    field: 'varValue',      name: 'Value'   , width: '200px'},
                        {id: 'varType',     field: 'varType',       name: 'Type',     width: '100px'}
                    ];
                    /* 3. Create a cache. */
                    cache = dcache;
                    /* 4. Instantiate the grid component */
                    pnlDbgGrid = new Grid 
                    (
                        {
                            id:         "dbgDetails",
                            cacheClass: cache,
                            store:      store,
                            structure:  struct,
                            modules:
                            [
                                VirtualVScroller,
                                ColumnResizer,
                                SingleSort
                            ],
                            style:      "width:475px;height:250px;"
                        }, _this.pnlDbg
                    );
                    pnlDbgGrid.startup ();
                    _this.fPnlDbg       = pnlDbgGrid;                           /* <----- Property: fPnlDbg */
                    _this.fPnlComment   = _this.pnlComment;                     /* <----- Property: fPnlComment */

                    /* ---------------------------------------------------
                     * Integrate ace editor. We must do that after calling
                     * startup () on the main panel.
                     * ---------------------------------------------------*/
                    _this.fPnlEditor = new TAceEdit ();                         /* <----- Property: fPnlEditor */
                    _this.fPnlEditor.Setup
                    (
                        _this.pnlSrc,
                        "javascript",
                        true,
                        false,
                        _this,
                        function ()
                        {
                            this.fController.NotifyInitFinished ();
                        },
                        function (err)
                        {
                            throw "TGUI::startup(): Error loading ace editor. Details:\n" + 
                                  JSON.stringify (err, null, 4);
                        }
                    );
                };
                functor ();
            },
            
            _GetRecordSanitized: function (x)
            {
                var isArray;
                var t;
                var xValue;
                var ret;

                t           = typeof x;
                isArray     = Array.isArray (x);
                ret         = {};
                if (t === "undefined")
                {
                    ret.type    = "undefined";
                    ret.value   = "";
                }
                else if (x === null)
                {
                    ret.type    = "null";
                    ret.value   = "null";
                }
                else if (t === "object")
                {
                    if (isArray)
                    {
                        ret.type = "array";
                    }
                    else
                    {
                        ret.type = "object";
                    }
                    xValue      = JSON.stringify (x);
                    ret.value   = this._GetValueStr (xValue);
                }
                else if (t === "string")
                {
                    ret.type    = "string";
                    xValue      = this._GetValueStr (x);
                    ret.value   = "\"" + xValue + "\"";
                }
                else if (t === "boolean")
                {
                    ret.type    = "boolean";
                    ret.value   = (x === true) ? "true" : "false"; 
                }
                else if (t === "number")
                {
                    if (x == Number.POSITIVE_INFINITY)
                    {
                        ret.type    = "number"
                        ret.value   = "+infinity"
                    }
                    else if (x == Number.NEGATIVE_INFINITY)
                    {
                        ret.type    = "number"
                        ret.value   = "-infinity"
                    }
                    else if (isNaN (x))
                    {
                        ret.type    = "NaN";
                        ret.value   = "Not a number";
                    }
                    else if (x % 1 === 0)
                    {
                        ret.type    = "integer";
                        ret.value   = "" + x;
                    }
                    else if (x % 1 !== 0)
                    {
                        ret.type    = "float";
                        ret.value   = "" + x;
                    }
                    else
                    {
                        ret.type    = "?number?";
                        ret.value   = "" + x;
                    }
                }
                else if (t === "function")
                {
                    xValue      = x.toString ();
                    ret.type    = "function";
                    ret.value   = this._GetValueStr (xValue);
                }
                else
                {
                    xValue      = JSON.stringify (x);
                    ret.type    = "?" + t + "?";
                    ret.value   = this._GetValueStr (xValue);
                }
                
                return ret;
            },
            
            _GetValueStr: function (vStr)
            {
                var ret;
                
                ret = (vStr.length <= 50) ? vStr : vStr.slice (0, 46) + "..."
                
                return ret;
            },
            
            /* -------------------------------------------------------------
             * Event handlers. Not that none of them implemnts any 
             * application logic; each one just notifies the resp. 
             * event to the hosting controller.
             * ------------------------------------------------------------- */
            
            /**
             * Event handler: User clicked NEXT STEP button.
             *
             * @private
             */
            _Handle_BtnNext_Click: function ()
            {
                this.fController.Notify_Navigate_Forwards ();
            },
            
            /**
             * Event handler: User clicked PREVIOUS STEP button.
             *
             * @private
             */
            _Handle_BtnPrev_Click: function ()
            {
                this.fController.Notify_Navigate_Backwards ();
            },
            
            /**
             * Event handler: User clicked RESET button.
             *
             * @private
             */
            _Handle_BtnReset_Click: function ()
            {
                this.fController.Notify_Navigate_Reset ();
            }
        };
        
        ret = declare ("TGUI", [_WidgetBase, _TemplatedMixin], TGUI );
        
        return ret;
    }
);

/*
 * [1]: We MUST define the templateString property!
 *      Otherwise we get a mysterious error that a 'null' resource didn't load. 
 *      During development, when we didn't specify that property, the Network 
 *      monitor showed the following erroneous request:
 *          Request URL: http://localhost:8383/JSDemo/null
 *          Method: GET
 *          Status: Request was cancelled.
 *          
 * [2]: Don't use XML comments in the template - the dojo parser will terminate
 *      with an error.
 *      
 * [3]: Not really the place to say it here, but the more reminders the better:
 *      On the web page including this widget, set class attribute of the body tag
 *      to "claro": <body class="claro"> or whatever the theme demands! 
 *      If the 'class' attribute is missing the UI elements won't be styled 
 *      correctly, irrespective of whether the calling web page includes the 
 *      correct stylesheets or not.
 *      
 * [4]: We use a closure so we don't end up with tons of variable names. UI setup is
 *      complex, so it's good to split it up into lots of small self contained units.
 *      
 * [5]: A naughty hack to put a custom icon into the button. Officially, the label 
 *      property is intended for textual labels. Thankfully the Button class accepts 
 *      a HTML fragment as label. This saves us some css trickery with some iconClass 
 *      and having to think about including yet another style sheet (... sigh ... dojo 
 *      is already hard enough to learn). 
 *      
 * [6]: Resizeable panels don't work very well with the ace editor - We may have to make
 *      the editor panel fixed in size and set the containing panel to overflow:auto
 *      
 * [7]: We have to include dojo.require, otherwise require.toUrl fails with an error
 *      "require.toUrl: Not a function". Reason is that by the time we call this function,
 *      dojo has 'packaged' the toUrl function inside the global require.original 
 *      property. Requiring 'require' gives us an unpackaged require module which 
 *      offers the toUrl function.
 *      
 * [10]:JSObject spec for the program used: TODO
 */
