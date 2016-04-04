/**
 *  @fileoverview        Main interface for a course.
 */
define 
(
    [
        "dojo/_base/declare",
        "dijit/_WidgetBase",
        "dojo/Deferred",
        "dojo/dom",
        "dojo/dom-construct",
        "dojo/on",
        "dojo/store/Memory",
        "dijit/tree/ObjectStoreModel",
        "dijit/Tree",
        "dijit/layout/BorderContainer", 
        "dijit/layout/ContentPane",
        "dijit/TitlePane",
        "courseware/gui/TWorksheet/TWorksheet"
    ],
    function 
    (
        declare,
        _WidgetBase,
        TDeferred,
        dom,
        domConstruct,
        on,
        MemoryStore,
        ObjectStoreModel,
        Tree,
        BorderContainer,
        ContentPane,
        TitlePane,
        TWorksheet
    )
    {
        var TCourseWareGUI;
        var ret;

        /**
         * Class for the main course UI.
         * 
         * <pre>    
         *     .-------------------------------------.
         *     | Heading                             |
         *     '-------------------------------------'
         *     |.--------------..-------------------.|
         *     ||              ||      Article      ||
         *     ||              ||                   ||
         *     ||              ||                   ||
         *     ||              ||                   ||
         *     ||              ||                   ||
         *     ||   Content    ||                   ||
         *     ||    (tree)    ||                   ||
         *     ||              ||                   ||
         *     ||              ||                   ||
         *     ||              ||                   ||
         *     ||              ||                   ||
         *     ||              ||                   ||
         *     ||              ||     Exercises     ||
         *     |'--------------''-------------------'|
         *     '-------------------------------------'
         * </pre>
         * 
         * Elements on the user interface:
         * 
         * <dl>
         *     <dt>Heading</dt>
         *     <dd>The heading text. Changes with each particular lesson loaded.</dd>
         *     
         *     <dt>Content (tree)</dt>
         *     <dd>A tree with clickable links to the resp. lessons and ext. resources.</dd>
         *     
         *     <dt>Article view</dt>
         *     <dd>A title pane showing the resp. article</dd>
         *     
         *     <dt>Exercises</dt>
         *     <dd>A title pane showing the exercises for the currently loaded lesson.</dd>
         * </dl>
         * 
         * @class       TCourseWareGUI
         * @augments    _WidgetBase
         * @augments    _TemplateMixin
         */
        TCourseWareGUI = 
        {
            /**
             * The default (dummy) data.
             * 
             * @type        String
             * @private
             */
            fData: 
            [
                {
                    id:                     "root",
                    type:                   "folder",
                    name:                   "",
                    heading:                "",
                    description:            "",
                    hasChildren:            false
                }
            ],
            
            fLoadState:
            {
                hasArticle:         false,
                hasExercise:        false
            },
            
            fHost: null,
            
            /**
             * The panel holding the article content.
             * 
             * @type        dijit/TitlePane
             * @private
             */
            fPnlArticle: null,

            /**
             * The panel holding the exercises.
             * 
             * @type        dijit/TitlePane
             * @private
             */
            fPnlExercises: null,

            /**
             * The panel holding the Heading.
             * 
             * @type        DOM DIV
             * @private
             */
            fPnlHeading: null,
            
            /**
             * The panel holding the entire CourseWare UI.
             * 
             * @type        dijit/layout/BorderContainer
             * @private
             */
            fPnlMain: null,

            /**
             * The panel holding the content tree.
             * 
             * @type        dijit/layout/ContentPane
             * @private
             */
            fPnlMainL: null,

            /**
             * The panel holding the article and exercises.
             * 
             * @type        dijit/layout/ContentPane
             * @private
             */
            fPnlMainR: null,
            
            /**
             * The ID of the data's root node.
             * 
             * @type        String
             * @private
             */
            fRootID: "root",
            
            /**
             * The Dojo tree object holding the contents (LH side)
             * 
             * @type        dijit/Tree
             * @private
             */
            fTree: null,
            
            /**
             * The worksheet module, for the student to work on the exercises.
             */
            fWorksheet: null,
            
            /**
             * Loads the course as specified by the descriptor. This 
             * 
             * @param   {JSObject}      descriptor      The couse's descriptor, containing 
             *                                          information on all lessons and ext. 
             *                                          resources.
             * @public
             */
            LoadCourse: function (descriptor)
            {
                var x;

                this.fRootID = descriptor.rootNodeID;
                this.fTree.doLoadNew (descriptor);
            },
    
            /**
             * Loads the start article, i.e. the first lesson in the course.
             * 
             * @public
             */
            LoadInitialArticle: function ()
            {
                var x;
                
                x = this._GetDescriptor ({isStartNode: true});
                this._LoadArticle (x);
            },
            
            /**
             * Dojo specific cTor.
             * 
             * @param   {type} params
             * @param   {type} srcNodeRef
             * @returns {undefined}
             */
            constructor: function (params)
            {
                this.fHost = params.fHost;
            },
            
            destroy: function ()
            {
                if (this.fWorksheet != null)
                {
                    this.fWorksheet.destroy ();
                }
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
                var _host = this;
                
                var pnlMain;
                var pnlMainL;
                var pnlMainLCnt;
                var pnlMainR;
                var tStor;
                var tMod;
                var pnlMainLCntTree;
                var pnlMainRCnt;
                var pnlMainRCntArticle;
                var pnlMainRCntExercises;

                this.fPnlHeading = domConstruct.create 
                (
                    "div",
                    {
                        style:      "color: #7a5d1d; " +
                                    "font-size: 2em; " +
                                    "font-weight: bold; " +
                                    "border-bottom: 2px solid slategray; " +
                                    "padding-left: 5px; padding-bottom: 5px;",
                        innerHTML:  "Heading"
                    }
                );                                                              /* <--- Property: fPnlHeading                   */

                /* L-R Splitter panel */
                pnlMain = new BorderContainer
                (
                    {
                        style:      "width: 100%;height: 100%"
                    }
                );
                /* LH panel (content tree) */
                pnlMainL = new ContentPane
                (
                    {
                        region:     "left",
                        splitter:   true,
                        style:      "width: 250px;"
                    }
                );
                /* RH panel (article + exercises) */
                pnlMainR = new ContentPane
                (
                    {
                        region:     "center"
                    }
                );
                
                this.fPnlMain   = pnlMain;                                      /* <--- Property: fPnlMain                      */
                this.fPnlMainL  = pnlMainL;                                     /* <--- Property: fPnlMainL                     */
                this.fPnlMainR  = pnlMainR;                                     /* <--- Property: fPnlMainR                     */

                /* Setup wrappers for LH / RH panel. wrappers provide scroll bar. */
                pnlMainLCnt = domConstruct.place 
                (
                    "<div style='width:100%;height:100%;overflow-y:scroll'></div>",
                    pnlMainL.domNode,
                    "only"
                );
                pnlMainRCnt        = domConstruct.place
                (
                    "<div style='width:100%;height:100%;overflow-y:scroll'></div>",
                    pnlMainR.domNode,
                    "only"
                );

                /* Tree in L panel */
                tStor = new MemoryStore
                (
                    {
                        data: _host.fData,
                        getChildren: function (obj)
                        {
                            var ret;

                            ret = this.query ({parent: this.getIdentity (obj)});

                            return ret;
                        },
                        getRootNode: function ()
                        {
                            var ret;
                            
                            ret = this.query ({id: _host.fRootID});
                            
                            return ret;
                        }
                    }
                );
                tMod = new ObjectStoreModel
                (
                    {
                        id:         "model",
                        store:      tStor,
                        query:
                        {
                            id: _host.fRootID
                        },
                        mayHaveChildren: function (item)
                        {
                            var hasProp;
                            var ret;

                            hasProp = item.hasOwnProperty("hasChildren");
                            ret     = (item.hasChildren === true);

                            return ret;
                        }
                    }
                );
                pnlMainLCntTree = new Tree
                (
                    {
                        model:      tMod,
                        autoExpand: true,
                        onClick: function (item)
                        {
                            _host._LoadArticle (item);
                        },
                        doLoadNew: function (descriptor)
                        {
                            /* Renew all data in the dijit tree component.      [20] */
                            var rootID;
                            var data;

                            rootID = descriptor.rootNodeID;
                            data   = descriptor.descriptor;

                            /* Deselect all nodes */
                            this.dndController.selectNone ();

                            /* Completely delete every node from the tree GUI */
                            this._itemNodesMap  = {};
                            this.rootNode.state = "UNCHECKED";
                            this.model.root     = null;

                            /* Destroy the widget */
                            this.rootNode.destroyRecursive ();

                            /* Load new data */
                            this.model.query = {id: rootID};
                            this.model.store.setData (data);
                            this._load ();
                        }
                    }
                );
                this.fTree = pnlMainLCntTree;                                           /* <--- Property: fTree                         */

                pnlMainRCntArticle = new TitlePane
                (
                    {
                        title:      "Lesson title here",
                        content:    "Article here",
                        style:      "margin-right:10px;margin-bottom:2em;"
                    }
                );
                this.fPnlArticle = pnlMainRCntArticle;                                  /* <--- Property: fPnlArticle                   */

                pnlMainRCntExercises = new TitlePane
                (
                    {
                        title:      "Exercises",
                        content:    "No homework today, yay!",
                        style:      "margin-right:10px;"
                    }
                );
                this.fPnlExercises = pnlMainRCntExercises;                              /* <--- Property: fPnlExercises                 */

                on
                (
                    this.fPnlArticle,
                    "load", 
                    function ()
                    {
                        _host.fLoadState.hasArticle = true;
                        if (_host.fLoadState.hasArticle  &&  _host.fLoadState.hasExercise)
                        {
                            _host._NotifyFinishedLoadArticle ();
                        }
                    }
                );
                on 
                (
                    this.fPnlExercises,
                    "load", 
                    function ()
                    {
                        _host.fLoadState.hasExercise = true;
                        if (_host.fLoadState.hasArticle  &&  _host.fLoadState.hasExercise)
                        {
                            _host._NotifyFinishedLoadArticle ();
                        }
                    }
                );

                pnlMain.addChild                (pnlMainL);
                pnlMain.addChild                (pnlMainR);
                pnlMainLCntTree.placeAt         (pnlMainLCnt);
                pnlMainRCntArticle.placeAt      (pnlMainRCnt, "first");
                pnlMainRCntExercises.placeAt    (pnlMainRCnt, "last");
                pnlMainLCntTree.startup         ();
                pnlMainRCntArticle.startup      ();
                pnlMainRCntExercises.startup    ();
                domConstruct.place              (this.fPnlHeading, this.domNode, "first");
                domConstruct.place              (pnlMain.domNode,  this.domNode, "last" );
                pnlMain.startup                 ();
            },
            
            _AssertKnownCategory: function (c)
            {
                var kCats = ["folder", "lesson", "external"];
                
                var i;
                
                i = kCats.indexOf (c);
                if (i <= -0.5)                                                  /* [10] */
                {
                    throw "TCourseWareGUI::_AssertKnownCategory: Unknown category '" + 
                          c + 
                          "' in descriptor: " +
                          JSON.stringify (descriptor, null, 4);
                }
            },

            _GetDescriptor: function (query)
            {
                var queryStr;
                var repoStr;
                var items;
                var isArray;
                var n;
                var x;
                var ret;
                
                queryStr   = JSON.stringify (query, null, 4);
                repoStr    = JSON.stringify (this.fTree.model.store, null, 4);
                items      = this.fTree.model.store.query (query);
                isArray    = Array.isArray (items);
                if (! isArray)
                {
                    throw "TCourseWareGUI::_LoadArticle: Can't find article for query '" + 
                          queryStr + 
                          "' in repository:\n" +
                          repoStr;
                }
                
                n = items.length;
                if (n <= 0)
                {
                    throw "TCourseWareGUI::_LoadArticle: Can't find article for query '" + 
                          queryStr + 
                          "' in repository:\n" +
                          repoStr;
                }
                
                ret = items[0];

                return ret;
            },
    
            /**
             * Loads the article (lesson) as specified by the descriptor with the given <code>id</code>.
             * 
             * @param   {JSObject}    descriptor      The article's descriptor 
             * @private
             */
            _LoadArticle: function (descriptor)
            {
                var _this = this;
                var cat;
                var d;
                
                cat = descriptor.category;
                this._AssertKnownCategory (cat);

                d = new TDeferred ();
                if (this.fWorksheet != null)
                {
                    this.fWorksheet.RequestTerminate().promise.then
                    (
                        function ()
                        {
                            _this.fWorksheet.destroy ();
                            _this.fWorksheet = null;
                            d.resolve ();
                        }
                    );
                }
                else
                {
                    d.resolve ();
                }
                
                d.promise.then
                (
                    function ()
                    {
                        if (cat === "folder")                                           /* [11] */
                        {
                            _this._LoadFolder (descriptor);
                        }
                        else if (cat === "lesson")
                        {
                            _this._LoadLesson (descriptor);
                        }
                        else if (cat === "external")
                        {
                            _this._LoadExternal (descriptor);
                        }
                    }
                );
            },

            _LoadFolder: function (item)
            {
                this.fPnlHeading.innerHTML = item.heading;
            },

            _LoadLesson: function (item)
            {
                var _this = this;
                
                /* Notify hosting component, so it can clean up before unloading  */
                this.fHost.NotifyUnloadingArticle ();
                
                /* Open both title panels, so they actually load their contents.
                 * dijit/TitlePane doesn't load when it's closed. */
                this.fPnlArticle.set ("open", true);
                this.fPnlExercises.set ("open", true);
                
                /* Reset load states. NotifyArticleLoaded will be called when both 
                 * panels indicate that they have loaded their resp. content 
                 * (via onLoad callback                                             */
                this.fLoadState.hasArticle      = false;
                this.fLoadState.hasExercise     = false;
                
                /* Set content */
                this.fPnlHeading.innerHTML      = item.heading;
                this.fPnlArticle.set    ("title", item.heading);
                this.fPnlArticle.set    ("href",  item.urlArticle);
                this.fPnlExercises.set  ("href",  item.urlExercises).then
                (
                    function ()
                    {
                        var d;
                        var p;
                        
                        d = _this._Worksheet_Initialize ();
                        p = d.promise;
                        
                        return p; 
                    }
                ).then
                (
                    function ()
                    {
                        return _this.fPnlExercises.set ("open", false);
                    }
                );
            },

            _LoadExternal: function (item)
            {
                this.fPnlHeading.innerHTML = item.heading;
            },
            
            _NotifyFinishedLoadArticle: function ()
            {
                this.fHost.NotifyHasLoadedArticle ();
            },
            
            _Worksheet_Create: function ()
            {
                var _this = this;
                
                this.fWorksheet = new TWorksheet 
                (
                    {
                        fHost:          this,
                        fNodeAnchor:    this.fPnlMainR.domNode.firstChild,
                        onFinishedLoad: function () 
                        {
                            console.log ("Worksheet loaded");
                        },
                        onRequestCopyAllToClipboard: function ()
                        {
                            console.log (JSON.stringify (_this.fWorksheet.GetAllSolutions ()));
                        },
                        onRequestLoadSolution: function (id) 
                        {
                            _this.fWorksheet.SetCurrentSolution ("Exercise: " + id);
                        },
                        onRequestSaveSolution: function () 
                        {
                            console.log (JSON.stringify (_this.fWorksheet.GetCurrentSolution ()));
                        }
                    }
                );
                this.fWorksheet.startup ();
            },
            
            /**
             * Converts the exercise part into a worksheet, so the student can work on the solutions.
             */
            _Worksheet_Initialize: function ()
            {
                var _this = this;
                var d0;
                var d1;
                
                d0 = new TDeferred ();
                
                if (this.fWorksheet != null)
                {
                    d1 = this.fWorksheet.RequestTerminate ();
                    d1.promise.then
                    (
                        function ()
                        {
                            _this.fWorksheet.destroy ();
                            _this._Worksheet_Create ();
                            d0.resolve ();
                        }
                    );
                }
                else
                {
                    _this._Worksheet_Create ();
                    d0.resolve ();
                }
                
                return d0;
            }
        };
    
        ret = declare ("TCourseWareGUI", [_WidgetBase], TCourseWareGUI);
    
        return ret;
    }
);

/*
    [10]:   Array.indexOf (item) returns -1 if the item wasn't found. To make sure
            that we catch this reliably we test for i <= -0.5 rather than i === -1.
            Just in case i happens to be a floating point number.

    [11]:   I could equally well use a switch statement - however, using strings in 
            the case clauses just doesn't feel right. I've never seen strings in 
            case statements in any other language either.

    [20]:   Renewing data is normally not provided in the standard tree.
            Therefore we needed this hackish solution. With help from:
                http://stackoverflow.com/a/5430590
 */      
