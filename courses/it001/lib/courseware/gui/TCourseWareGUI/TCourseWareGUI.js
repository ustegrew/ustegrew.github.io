/**
 *  @fileoverview        Main GUI for the courseware module.
 */
define
(
    [
        "dojo/_base/declare",
        "dijit/_WidgetBase",
        "dojo/Deferred",
        "courseware/util/validator/TValidatorJSON",
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
        JSObjectValidator,
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
         * <p><br/></p>
         *
         * <b>Elements on the user interface</b>
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
             * JSON schema to validate the CourseWare GUI's configuration descriptor.
             *
             * @constant
             * @type        JSON schema
             * @private
             */
            kSchemaParams:
            {
                "$schema":      "http://json-schema.org/draft-03/schema#",
                "title":        "Text window descriptor",
                "description":  "Descriptor for the CourseWareGUI descriptor",
                "type":         "object",
                properties:
                {
                    "fHost":
                    {
                        "description":      "The object hosting this GUI",
                        "type":             "object"
                    }
                }
            },

            /**
             * The default (dummy) data for the content nodes.
             *
             * @type        JSON
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

            /**
             * The client using this UI.
             *
             * @type        courseware/TCourseWare
             * @private
             */
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
             *
             * @ty
             */
            fWorksheet: null,

            /**
             * Loads the course as specified by the descriptor. This will load the
             * descriptor and set the LH content tree.
             *
             * @param   {JSObject}      descriptor      The couse's descriptor, containing
             *                                          information on all lessons and ext.
             *                                          resources.
             */
            LoadCourse: function (descriptor)
            {
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
             * cTor.
             *
             * @param {JSON}    params      The CourseWare GUI's configuration.  Must
             *                              conform to {@link TCourseWareGUI.kSchemaParams}.
             */
            constructor: function (params)
            {
                JSObjectValidator.AssertValid (params, this.kSchemaParams, "constructor");
                this.fHost = params.fHost;
            },

            /**
             * dTor.
             */
            destroy: function ()
            {
                if (this.fWorksheet != null)
                {
                    this.fWorksheet.destroy ();
                }
            },

            /**
             * Startup method. Sets up the CourseWare GUI.
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

            /**
             * Tests whether the given category ID is known. Throws an exception
             * if it's not known.
             *
             * @param   {String}    c       The category tested.
             *
             * @throws  {String}    Exception with error message if the
             *                      category is unknown.
             */
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

            /**
             * Returns the descriptor of node the user clicked on in the content tree.
             *
             * @param       {JSObject}      query
             * @returns     {JSObject}      The descriptor of the requested node.
             * @throws {String} An exception containing details, if there wasn't any matching node.
             */
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
                    throw "TCourseWareGUI::_GetDescriptor: Can't find article for query '" +
                          queryStr +
                          "' in repository:\n" +
                          repoStr;
                }

                n = items.length;
                if (n <= 0)
                {
                    throw "TCourseWareGUI::_GetDescriptor: Can't find article for query '" +
                          queryStr +
                          "' in repository:\n" +
                          repoStr;
                }

                ret = items[0];

                return ret;
            },

            /**
             * Loads the article/lesson/ext. resource as specified by the 
             * descriptor with the given <code>id</code>.
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
                    this.fWorksheet.RequestTerminate().then
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

                d.then
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

            /**
             * Loads the folder as specified by the given <code>item</code>.
             * 
             * @param   {JSON}          item        A descriptor specifying the folder to load.
             * @private
             */
            _LoadFolder: function (item)
            {
                this.fPnlHeading.innerHTML = item.heading;
            },

            /**
             * Loads the lesson as specified by the given <code>item</code>.
             * 
             * @param   {JSON}          item        A descriptor specifying the lesson to load.
             * @private
             */
            _LoadLesson: function (item)
            {
                var _this = this;

                /* Notify hosting component, so it can clean up before unloading  */
                this.fHost.NotifyUnloadingArticle ();

                /* Open both title panels, so they actually load their contents.
                 * dijit/TitlePane doesn't load when it's closed. */
                this.fPnlArticle.set ("open", true);
                this.fPnlExercises.set ("open", true);

                /* Set content */
                this.fPnlHeading.innerHTML      = item.heading;
                this.fPnlArticle.set ("title", item.heading);
                this.fPnlArticle.set ("href",  item.urlArticle).then
                (
                    function ()
                    {
                        return _this.fPnlExercises.set  ("href",  item.urlExercises);
                    }
                ).then
                (
                    function ()
                    {
                        return _this._Worksheet_Initialize ();
                    }
                ).then
                (
                    function ()
                    {
                        return _this.fPnlExercises.set ("open", false);
                    }
                ).then
                (
                    function ()
                    {
                        _this._NotifyFinishedLoadArticle ();
                    }
                );
            },

            /**
             * Loads external resource into new window/tab
             * 
             * @param   {JSON}      item        A descriptor specifying the resource to load.
             */
            _LoadExternal: function (item)
            {
                this.fPnlHeading.innerHTML = item.heading;
            },
            
            /**
             * Notifies the hosting client that we are finished loading an 
             * article (lesson, resource, ...).
             */
            _NotifyFinishedLoadArticle: function ()
            {
                this.fHost.NotifyHasLoadedArticle ();
            },

            /**
             * Creates a worksheet for teh currently open lesson.
             */
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
                        onRequestLoadSolution: function (id)
                        {
                            _this._Worksheet_LoadSolution (id);
                        },
                        onRequestSaveSolution: function ()
                        {
                            _this._Worksheet_SaveSolution ();
                        }
                    }
                );
                this.fWorksheet.startup ();
            },

            /**
             * Loads a user solution from the local storage into the current worksheet.
             * 
             * @param       {type}      id      The UID of the solution.
             */
            _Worksheet_LoadSolution: function (id)
            {
                var s;

                s = this.fHost.ExerciseSolution_Get     (id);
                this.fWorksheet.SetCurrentSolution      (s);
            },
            
            /**
             * Saves the exercise solution which is open on the current worksheet.
             */
            _Worksheet_SaveSolution: function ()
            {
                var e;

                e = this.fWorksheet.GetCurrentSolution  ();
                this.fHost.ExerciseSolution_Save        (e.id, e.content);
            },

            /**
             * Converts the exercise part of the currently loaded lesson into 
             * a worksheet, so the student can work on the solutions.
             */
            _Worksheet_Initialize: function ()
            {
                var _this = this;
                var d;

                d = new TDeferred ();

                if (this.fWorksheet != null)
                {
                    this.fWorksheet.RequestTerminate ().then
                    (
                        function ()
                        {
                            _this.fWorksheet.destroy ();
                            _this._Worksheet_Create ();
                            d.resolve ();
                        }
                    );
                }
                else
                {
                    _this._Worksheet_Create ();
                    d.resolve ();
                }

                return d;
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
