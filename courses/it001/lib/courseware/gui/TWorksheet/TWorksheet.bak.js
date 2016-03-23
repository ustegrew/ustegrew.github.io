/**
 *  @fileoverview        Insert_here
 */
define 
(
    [
        "dojo/_base/declare",
        "dijit/_WidgetBase",
        "require",                                                              /* [10] */
        "dojo/query",
        "dojo/dom-construct",
        "dojo/dom-attr",
        "dojo/dom-style",
        "dojo/on",
        "courseware/util/validator/TValidatorJSON",
        "dojo/fx",
        "dojox/fx/scroll",
        "dojo/dom-geometry",
        "dijit/MenuBar",
        "dijit/PopupMenuBarItem",
        "dijit/Menu",
        "dijit/MenuItem",
        "dijit/MenuSeparator",
        "dijit/DropDownMenu",
        "dijit/form/Button",
        "courseware/gui/TExerciseEditGUI/TExerciseEditGUI",
        "courseware/gui/TButtonDialog/TButtonDialog"
    ],
    function 
    (
        declare,
        _WidgetBase,
        _require,
        domQuery,
        domConstruct,
        domAttr,
        domStyle,
        on,
        JSObjectValidator,
        fx,
        wndScroll,
        domGeometry,
        TMenuBar,
        TPopupMenuBarItem,
        TMenu,
        TMenuItem,
        TMenuSeparator,
        TDropDownMenu,
        TButton,
        TExerciseEditGUI,
        TButtonDialog
    )
    {
        var kSchemaPropertiesExercise =
        {
            "$schema":      "http://json-schema.org/draft-03/schema#",
            "title":        "Exercise properties block",
            "description":  "Properties block describing an exercise",
            "type":         "object",
            properties:
            {
                "id":
                {
                    "description":      "The exercise's unique ID. Must be unique for the entire course.",
                    "type":             "string",
                    "pattern":          "^[a-zA-Z0-9.]+$"
                },
                "type":
                {
                    "description":      "The exercise's solution text type. One of: " +
                                        "'rtf/plain_text','src/js','src/html','src/plain_text'",
                    "type":             "string",
                    "enum":             ["rtf/plain_text", "src/js", "src/html", "src/plain_text"]
                }
            }
        };
        
        var TExercise = function ()
        {
            this.fContentType            = "";
            this.fContentLang            = "";
            this.fID                     = "";
            this.fHasChanged             = false;
            this.fNodeParent             = null;
            this.fNodeText               = null;
            this.fNodeToolbar            = null;
            this.fNodeWorkspace          = null;
            this.fNodeText               = "";
            this.fIsNullObject           = true;
            this.fObjButton              = null;
            this.fTextQuestion           = "";
            this.fTextSolution           = "";
        };

        /**
         * Worksheet controller class. 
         * 
         * @class       TController
         * @private
         */
        TController = function (host)
        {
            var ETestType =
            {
                kSkip:              0,
                kIDMustExist:       1,
                kIDMustNotExist:    2
            };

            this.fConfirmDialog     = null;
            this.fEditor            = null;
            this.fExerciseNext      = new TExercise ();                /*  */
            this.fExerciseCurrent   = new TExercise ();
            this.fExerciseList      = [];
            this.fExerciseMap       = {};
            this.fHost              = host;

            /**
             * Notification: User cancelled editing solution to the current exercise.
             */
            this.NotifyEditCancel = function ()
            {

            };

            /**
             * Notification: User opened solution editor for another exercise.
             */
            this.NotifyEditOpen = function (id)
            {
                this._AssertIDUsable (id, ETestType.kIDMustExist);
                this.fExerciseNext = this.fExerciseMap [id];
                if (this.fExerciseCurrent.fIsNullObject)                        /* [50] */
                {
                    this._UI_Exercise_Refocus (false);
                }
                else
                {
                    if (this.fExerciseCurrent.fID  !=  this.fExerciseNext.fID)
                    {
                        this.fExerciseCurrent.fHasChanged   = this.fEditor.HasChanged ();
                        this.fExerciseCurrent.fTextSolution = this.fEditor.GetContent ();
                        this._UI_Exercise_Close (true);
                    }
                }
            }

            /**
             * Notification: User saves solution to current exercise.
             */
            this.NotifyEditSave = function ()
            {

            };

            this.NotifyEditSaveAbort = function ()
            {
                this._Handle_Aborted_SaveCurrentSolution ();
            };
            
            this.NotifyEditSaveConfirm = function ()
            {
                this._Handle_Confirmed_SaveCurrentSolution ();
            };
            
            /**
             * Notification: Solution editor for current exercise has finished 
             *               loading text from storage.
             *               
             */
            this.NotifyEditLoaded = function ()
            {

            };

            /**
             * Notification: User copies all solutions to clipboard.
             */
            this.NotifyPageCopySolutions = function ()
            {

            }

            /**
             * Notification: Worksheet has finished loading and is ready for work.
             */
            this.NotifyPageLoaded = function ()
            {
            };

            this.RegisterExercise = function (objEx)
            {
                this._AssertIDUsable (objEx.fID, ETestType.kIDMustNotExist);
                objEx.fIsNullObject = false;
                this.fExerciseList.push (objEx);
                this.fExerciseMap [objEx.fID] = objEx;
            };
            
            this.SetConfirmDialog = function (objDlg)
            {
                this.fConfirmDialog = objDlg;
            }

            this.SetEditor = function (editor)
            {
                this.fEditor = editor;
            }

            this._AssertIDUsable = function (id, testTypeUnique)
            {
                var isWrongType;
                var isNull;
                var hasID;

                isWrongType = (typeof id !== 'string');
                isNull      = (id == null);
                if (isWrongType)
                {
                    throw "TWorksheet::TController::_AssertIDUnique: Exercise ID must be a string. Given: " + (typeof id);
                }
                else if (isNull)
                {
                    throw "TWorksheet::TController::_AssertIDUnique: Exercise ID must be not null. Given: null.";
                }

                /**
                 * Test whether id already exists. Behaviour:
                 * 
                 * testType                     hasID       Result
                 * ---------------------------------------------------------
                 *  ETestType.kSkip             true        OK
                 *                              false       OK
                 *  ETestType.kIDMustExist      true        OK
                 *                              false       throw exception
                 *  ETestType.kIDMustNotExist   true        throw exception
                 *                              false       OK
                 */
                if (testTypeUnique !== ETestType.kSkip)
                {
                    hasID = this.fExerciseMap.hasOwnProperty (id);
                    if (testTypeUnique === ETestType.kIDMustExist)
                    {
                        if (! hasID)
                        {
                            throw "TWorksheet::TController::_AssertIDUnique: Missing exercise ID: " + id;
                        }
                    }
                    else
                    {
                        if (hasID)
                        {
                            throw "TWorksheet::TController::_AssertIDUnique: Exercise ID must be unique. Offending ID: " + id;
                        }
                    }
                }
            };
            
            this._Handle_Aborted_SaveCurrentSolution = function ()
            {
                this._UI_Exercise_Refocus (true);
            };
            
            this._Handle_Confirmed_SaveCurrentSolution = function ()
            {
                this.fEditor.ClearFlagChanged ();
                this._UI_Exercise_Refocus (true);
            };
            
            /* Close current exercise. Save if necessary. */
            this._UI_Exercise_Close = function (doConfirmSave)
            {
                if (this.fExerciseCurrent.fHasChanged)
                {
                    if (doConfirmSave)
                    {
                        this.fConfirmDialog.Show ("Unsaved changes", "Would you like to save your exercise?");
                    }
                    else
                    {
                        this._Handle_Confirmed_SaveCurrentSolution ();
                    }
                }
                else
                {
                    this._Handle_Aborted_SaveCurrentSolution ();
                }
            };
            
            this._UI_Exercise_Refocus = function (hasPrevious)
            {
                if (hasPrevious)
                {
                    this._UI_Exercise_Refocus_01_ShrinkCurrent ();
                }
                else
                {
                    this._UI_Exercise_Refocus_02_Editor_Migrate ();
                }
            }
            
            this._UI_Exercise_Refocus_01_ShrinkCurrent = function ()
            {
                var _host = this;
                
                fx.wipeOut 
                (
                    {
                        node:       this.fExerciseCurrent.fNodeWorkspace,
                        duration:   100,
                        onEnd:      function () 
                        {
                            _host._UI_Exercise_Refocus_02_Editor_Migrate.call (_host);
                        }
                    }
                ).play ();
            }
            
            this._UI_Exercise_Refocus_02_Editor_Migrate = function ()
            {
                this.fEditor.SetType (this.fExerciseNext.fContentType, this.fExerciseNext.fContentLang);
                domConstruct.place (this.fEditor.domNode, this.fExerciseNext.fNodeWorkspace, "only");
                this._UI_Exercise_Refocus_03_ExpandNext ();
            }

            this._UI_Exercise_Refocus_03_ExpandNext = function ()
            {
                var _host = this;
                
                fx.wipeIn 
                (
                    {
                        node:       this.fExerciseNext.fNodeWorkspace,
                        duration:   100,
                        onEnd:      function ()
                        {
                            _host._UI_Exercise_Refocus_04_ScrollToNextExercise.call (_host);
                        }
                    }
                ).play ();
            }
            
            this._UI_Exercise_Refocus_04_ScrollToNextExercise = function ()
            {
                var _host = this;
                
                var yNode;
                var yTarget;

                yNode       = domGeometry.position (_host.fExerciseNext.fNodeWorkspace, false);
                yTarget     = yNode.y - 50;
                wndScroll
                (
                    {
                        target:     {x:0,y:yTarget},
                        win:        window,
                        duration:   500,
                        onEnd:  function ()
                        {
                            _host._UI_Exercise_Refocus_05_Finished.call (_host);
                        }
                    }
                ).play ();
            };
            
            this._UI_Exercise_Refocus_05_Finished = function ()
            {
                this.fExerciseCurrent = this.fExerciseNext;
            };
            
            this._PrintExerciseNodes = function (context)
            {
                var cID;
                var nID;
                
                cID = (this.fExerciseCurrent.fID !== "")  ? "ExerciseID_cur: '" + this.fExerciseCurrent.fID + "'" : "ExerciseID_cur: ''"
                nID = (this.fExerciseNext.fID    !== "")  ? "ExerciseID_nxt: '" + this.fExerciseNext.fID    + "'" : "ExerciseID_nxt: ''"
                
                console.groupCollapsed ("Context: " + context + " / " + cID + " -> " + nID);
                console.group ("ExerciseCurrent: " + cID);
                console.dir (this.fExerciseCurrent);
                console.groupEnd ();
                console.group ("ExerciseNext: " + nID);
                console.dir (this.fExerciseNext);
                console.groupEnd ();
                console.groupEnd ();
            }
        };

        var TWorksheet;
        var ret;

        /**
         * A worksheet. Contains several exercises. All exercises share a single editor
         * instance.
         * 
         * @class       TWorksheet
         */
        TWorksheet = 
        {
            Init: function ()
            {
                var _controller     = this.fController;
                var kImgBaseURL     = _require.toUrl ("courseware/img");
                
                var list;
                var i;
                var ndeGlobalMenu;
                var globalMenuBar;
                var subMenu;
                var objExercise;
                var ndeListExercises;
                var ndeExercise;
                var ndeProps;
                var iconURLEdit;
                var fragments;
                
                /* Setup menu bar on top of the worksheet */
                list          = domQuery ("*[data-courseware-type=\"globalMenu\"]");
                ndeGlobalMenu = (list.length >= 1)  ?  list [0] : null;
                if (ndeGlobalMenu == null)
                {   /* Oh dear, web developer forgot to provide a hosting DOM node for the menu bar. */
                    throw "Missing DOM node for global worksheet menu. Page misses " +
                          "a DOM node with attribute: data-courseware-type=\"globalMenu\"";
                }
                else if (list.length >= 2)
                {   /* Oh dear, web developer provided more than one hosting DOM node for the menu bar. */
                    throw "Must have one (and one only) DOM node for global worksheet menu. Found more "
                          "than one DOM node with attribute: data-courseware-type=\"globalMenu\"";
                }
                
                /* Found hosting node  */
                globalMenuBar = new TMenuBar ({});
                subMenu       = new TDropDownMenu ({});
                subMenu.addChild
                (
                    new TMenuItem
                    (
                        {
                            label:      "Solutions to clipboard",
                            onClick:    function () {_controller.NotifyPageCopySolutions.call (_controller);}
                        }
                    )
                );
                globalMenuBar.addChild
                (
                    new TPopupMenuBarItem
                    (
                        {
                            label:      "Page tools",
                            popup:      subMenu
                        }
                    )
                )
                globalMenuBar.startup ();
                domConstruct.place (globalMenuBar.domNode, ndeGlobalMenu, "only");
                
                /* Set up exercises */
                ndeListExercises = domQuery ("*[data-courseware-type=\"exercise\"]");
                if (ndeListExercises.length >= 1)
                {
                    /* Create editor component */
                    this.fEditor = new TExerciseEditGUI
                    (
                        {
                            fHost:      window,
                            fWidth:     "745px",                                /* [20] */
                            fHeight:    "480px",                                /* [20] */
                            onCancel:   function () {_controller.NotifyEditCancel.call  (_controller);},
                            onLoad:     function () {_controller.NotifyEditLoaded.call  (_controller);},
                            onSave:     function () {_controller.NotifyEditSave.call    (_controller);},
                        }
                    );
                    this.fEditor.startup ();
                    this.fController.SetEditor (this.fEditor);

                    /* Set up confirmation dialog re. unsaved documents */
                    this.fConfirmDialog = new TButtonDialog
                    (
                        {
                            "host":     this.fController,
                            "buttons":
                            [
                                {
                                    label:      "Yes",
                                    onClick:    function () {_controller.NotifyEditSaveConfirm.call (_controller);}
                                },
                                {
                                    label:      "No",
                                    onClick:    function () {_controller.NotifyEditSaveAbort.call (_controller);}
                                }
                            ]
                        }
                    );
                    this.fConfirmDialog.startup ();
                    this.fController.SetConfirmDialog (this.fConfirmDialog);
                    
                    /* Set up exercises */
                    iconURLEdit = kImgBaseURL + "/edit.png";
                    for (i = 0; i < ndeListExercises.length; i++)
                    {
                        ndeExercise                         = ndeListExercises [i];
                        
                        ndeProps                            = domAttr.get (ndeExercise, "data-courseware-props");
                        ndeProps                            = this._GetRecord (ndeProps, kSchemaPropertiesExercise, "TWorksheet::startup()");
                        fragments                           = ndeProps.type.split ("/");
                        
                        /* Create exercise object and register it with the controller. */
                        objExercise                         = new TExercise ();
                        objExercise.fContentType            = fragments [0];
                        objExercise.fContentLang            = fragments [1];
                        objExercise.fID                     = ndeProps.id;
                        objExercise.fHasChanged             = false;
                        objExercise.fTextQuestion           = ndeExercise.innerHTML;
                        objExercise.fTextSolution           = "";
                        objExercise.fNodeParent             = ndeExercise;
                        objExercise.fNodeText               = domConstruct.create ("div", {'class': "exercise-text"     });
                        objExercise.fNodeToolbar            = domConstruct.create ("div", {"class": "exercise-toolbar"  });
                        objExercise.fNodeWorkspace          = domConstruct.create ("div", {"class": "exercise-workspace"});
                        objExercise.fNodeText.innerHTML     = ndeExercise.innerHTML;
                        objExercise.fObjButton              = new TButton
                        (
                            {
                                exerciseUID:    objExercise.fID,
                                label:          "<img src=\"" + iconURLEdit + "\"/>",
                                onClick:        function () {_controller.NotifyEditOpen.call (_controller, this.exerciseUID);}
                            }
                        )
                        objExercise.fObjButton.startup ();
                        _controller.RegisterExercise (objExercise);
                        
                        /* Set up GUI */
                        domAttr.set        (ndeExercise, "class", "exercise");
                        domConstruct.place (objExercise.fObjButton.domNode,     objExercise.fNodeToolbar,   "only");
                        domConstruct.place (objExercise.fNodeToolbar,           objExercise.fNodeParent,    "only");
                        domConstruct.place (objExercise.fNodeText,              objExercise.fNodeParent,    "last");
                        domConstruct.place (objExercise.fNodeWorkspace,         objExercise.fNodeParent,    "last");
                    }
                }
                else
                { /* Found no exercises. Just log to console. */
                    console.log ("Found no exercises, i.e. no DOM nodes with attribute: " +
                                 "data-courseware-type=\"exercise\".");
                }
                
                _controller.NotifyPageLoaded.call (_controller);
                this.fHandlers.onLoad.call (this.fHost);
            },
            
            /**
             * Dojo specific cTor.
             */
            constructor: function (params)
            {
                /**
                 *  The controller. Controls the behaviour of this worksheet.
                 * 
                 * @type TWorksheet::TController
                 */
                this.fController = new TController (this);
                
                /**
                 * The client using this class.
                 */
                this.fHost = params.fHost;
                
                this.fConfirmDialog = null;
                
                /**
                 * The editor for the user to edit the solutions to the exercises.
                 */
                this.fEditor = null;
                
                this.fDlgDoSaveConfirm = null;
                
                /**
                 * The callbacks from the client. Will be called in the client's 
                 * context (i.e. 'this' inside a callback will point to the client
                 * object, not the TWorksheet object.
                 */
                this.fHandlers =
                {
                    onLoad:     params.onLoad
                };
                
                /**
                 * The persistent storage object. For saving/loading exercise solutions.
                 */
                this.fStore = params.store;
            },

            /* -------------------------------------------------------------
             * Dijit overrides 
             * ------------------------------------------------------------- */
        
            /**
             * Startup method (for widgets). This overrides the _WidgetBase::startup ().
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
            postCreate: function ()
            {
                
            },
            
            startup: function ()
            {
                this.fController.Notify ("kStart");
            },
            
            _GetRecord: function (record, schema, client)
            {
                var kID = "TWorksheet::" + client;
                
                var isNotString;
                var isNull;
                var record;
                var ret;
                
                isNotString = (typeof record !== "string");
                isNull      = (record == null);
                if (isNotString)
                {
                    throw kID + ": Given record is not a string (" + typeof record + ")";
                }
                else if (isNull)
                {
                    throw kID + ": Given record is NULL.";
                }
                else
                {
                    /* Replace single quotes by double quotes */                /* [30] */
                    record = record.replace (/'/gi, "\"");
                    try
                    {
                        ret = JSON.parse (record);
                    }
                    catch (e)
                    {
                        throw "Could not parse record. Given: " + record + "\n" +
                              "Details: " + e;
                    }
                    
                    JSObjectValidator.AssertValid (ret, schema, kID);
                }
                
                return ret;
            }
        };
    
        ret = declare ("TWorksheet", [_WidgetBase], TWorksheet);
    
        return ret;
    }
);


/*
 
 [10]: We have to include dojo.require, otherwise require.toUrl fails with an error
       "require.toUrl: Not a function". Reason is that by the time we call this function,
       dojo has 'packaged' the toUrl function inside the global require.original 
       property. Requiring 'require' gives us an unpackaged require module which 
       offers the toUrl function.

 [20]: Needs refactoring: TExerciseEditGUI should autodiscover. Works for now. 
       Logged as issue#12 [https://github.com/ustegrew/ustegrew.github.io/issues/12]

 [30]: According to specs, JSON strings can't use single quotes to terminate strings. However,
       this complicates the HTML coding of the web pages where we get the JSON string from -
       we'll have to code constructs such as:
           <div data-courseware-type="exercise" data-courseware-props='{"id":"08.13f2"}'>
       Which quickly turn to a maintenance nightmare if there are multiple such tags in
       the project. It would be yet another rule to consider when writing the web pages.
       Therefore we'll just replace double quotes by single quotes which allows us to write:
           <div data-courseware-type="exercise" data-courseware-props="{'id':'08.13f2'}">
       This doesn't cover the case where strings contain single quotes, e.g.:
           <div data-courseware-type="exercise" data-courseware-props="{'id':'08.13f2', 'description':'That's a nice ID'}">
       If we encounter this problem in this class, then we could solve it by allowing 
       single quotes to be escaped (The JSON specs don't allow it), and to then use several 
       successive string replacements:
           1: Replace each \' by some other character
           2: Replace each ' by "
           3. JSON parse to object
           4. Recursively walk the new object, replacing each occurence of other-character with '
       Or we simply say: Don't use single quotes in strings!
           <div data-courseware-type="exercise" data-courseware-props="{'id':'08.13f2', 'description':'That is a nice ID'}">

 [40]: For a new TController we create an empty dummy exercise as fExerciseCurrent,
       fExerciseNext. Setting it to null would create complications.

 [50]: Tests whether current exercise is an empty one - which means that it's the
       first exercise the user opens since the hosting web page has been loaded.
       Any exercise opened after the first one will have the fIsNullObject property 
       set to false.

 */