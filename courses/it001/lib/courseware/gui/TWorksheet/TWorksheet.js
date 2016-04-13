/**
 *  @fileoverview       The worksheet module.
 */
define 
(
    [
        "dojo/_base/declare",
        "dijit/_WidgetBase",
        "dojo/has",
        "require",                                                              /* [10] */
        "dojo/Deferred",
        "dojo/query",
        "dojo/dom-construct",
        "dojo/dom-attr",
        "dojo/dom-style",
        "dojo/on",
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
        "../../util/validator/TValidatorJSON",
        "../../util/json/TJSONUtils",
        "./TExercise",
        "./TModel",
        "./TController",
        "../TTextWindow/TTextWindow",
        "../TExerciseEditGUI/TExerciseEditGUI",
        "../TButtonDialog/TButtonDialog",
        "dojo/_base/sniff",
        "dojox/html/format"
    ],
    function 
    (
        declare,
        _WidgetBase,
        has,
        _require,
        TDeferred,
        domQuery,
        domConstruct,
        domAttr,
        domStyle,
        on,
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
        JSObjectValidator,
        JSONUtils,
        TExercise,
        TModel,
        TController,
        TTextWindow,
        TExerciseEditGUI,
        TButtonDialog
    )
    {
        /* Debug flag - for that extra info in hard places! */
        var gDebug = false;
        
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
            /**
             * The user's decision regards saving the current exercise.
             * 
             * @enum
             */
            ESaveDecision:
            {
                kDoNotSave: 0,      /* Do not save (saving cancelled)           */
                kDoSave:    1       /* Do save (saving confirmed)               */
            },
            
            /**
             * JSON schema to validate the button dialog's configuration descriptor.
             * 
             * @constant
             * @type        JSON schema
             * @private
             */
            kSchemaParams:
            {
                "$schema":      "http://json-schema.org/draft-03/schema#",
                "title":        "button descriptor",
                "description":  "Descriptor for TWorksheet configuration parameters.",
                "type":         "object",
                properties:
                {
                    "fHost":
                    {
                        "description":      "The object hosting this worksheet",
                        "type":             "object"
                    },
                    "fNodeAnchor":
                    {
                        "description":      "The anchor node against which the work sheet is anchored",
                        "type":             "function"
                    },
                    "onFinishedLoad":
                    {
                        "description":      "Handler, invoked when the editor has finished loading the stored solution text.",
                        "type":             "function"
                    },
                    "onRequestLoadSolution":
                    {
                        "description":      "Handler, invoked when a request was issued to load a solution text.",
                        "type":             "function"
                    },
                    "onRequestSaveSolution":
                    {
                        "description":      "Handler, invoked when  a request was issued to save the current solution text to local storage.",
                        "type":             "function"
                    },
                }
            },

            /**
             * JSON schema to validate the properties on each exercise node on 
             * a given exercise sheet (before it's converted here).
             *
             * @constant
             * @type        JSON schema
             * @private
             */
            kSchemaPropertiesExercise:
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
            },
        
            /**
             *  The controller. A state machine which controls the behaviour of this worksheet.
             * 
             * @type        courseware/gui/TWorksheet/TController
             * @private
             */
            fController: null,

            /**
             * The Yes/No confirmation dialog asking "Do you want to save first?"
             * before the user closes an active solution that has unsaved changes.
             * 
             * @type        courseware/gui/TButtonDialog/TButtonDialog
             * @private
             */
            fDlgDoSaveConfirm: null,
            
            /**
             * The message box containing the saved exercises when the user
             * request them to be copied to the clipboard.
             * 
             * @type        courseware/gui/TTextWindow/TTextWindow
             * @private
             */
            fDlgExerciseSolutions: null,

            /**
             * The editor for the user to edit the solutions to the exercises.
             * 
             * @type        courseware/gui/TExerciseEditGUI/TExerciseEditGUI
             * @private
             */
            fEditor: null,
            
            /**
             * The currently open exercise.
             * 
             * @type        courseware/gui/TWorksheet/TExercise
             * @private
             */
            fExerciseCurrent: null,
            
            /**
             * The exercise to be opened next, e.g. when the user has one exercise 
             * open and would like to open another one.
             * 
             * @type        courseware/gui/TWorksheet/TExercise
             * @private
             */
            fExerciseNext: null,

            /**
             * The client using this class.
             * 
             * @type        JSObject
             * @private
             */
            fHost: null,

            /**
             * The callbacks from the client. Will be called in the client's 
             * context (i.e. 'this' inside a callback will point to the client
             * object, not the TWorksheet object.
             * 
             * @type        JSON
             * @private
             */
            fHandlers: null,

            /**
             * The model holding the exercises. Provides index and hash based access
             * to each exercise element.
             * 
             * @type        courseware/gui/TWorksheet/TModel
             * @private
             */
            fModel: null,
            
            /**
             * The anchor node against which the work sheet is anchored, e.g. the content panel
             * in which the worksheet is located. Needed for certain effects, such as scrolling 
             * the active solution into view.
             * 
             * @type        DOM element
             * @private
             */
            fNodeAnchor: null,
            
            /**
             * A Deferred object to facilitate clean termination of this worksheet 
             * (e.g. We'd like to save when the user has a solution open with unsaved changes).
             * 
             * @type        dojo/Deferred
             * @private
             */
            fSemaphore: null,
            
            /**
             * Returns the solutions to all stored exercises.
             * 
             * @returns     {JSArray}       The solutions to all exercises.
             */
            GetAllSolutions: function ()
            {
                var i;
                var n;
                var e;
                var ret;
                
                ret = [];
                n   = this.fModel.GetNumElements ();
                if (n >= 1)
                {
                    for (i = 0; i < n; i++)
                    {
                        e = GetByIndex (i);
                        ret.push (e);
                    }
                }
                    
                return ret;
            },
            
            /**
             * Returns a record containing the UID of the currently opened exercise
             * and it's solution text.
             * 
             * @returns {JSON}      UID and solution text as one JSON record.
             */
            GetCurrentSolution: function ()
            {
                var ret;
                
                ret = 
                {
                    id:         this.fExerciseCurrent.fID,
                    content:    this.fExerciseCurrent.fTextSolution
                };
                
                return ret;
            },
            
            /**
             * Requests termination of the worksheet.
             * 
             * @returns     {dojo/Deferred}     A promise, resolved when the worksheet 
             *                                  has actually finished terminating.
             */
            RequestTerminate: function ()
            {
                this.fSemaphore = new TDeferred ();
                this.fController.Notify ("kTerminate");
                
                return this.fSemaphore;
            },
            
            /**
             * Sets the solution text of the currently opened exercise.
             * 
             * @param       {String}    content     The content of the solution text
             */
            SetCurrentSolution: function (content)
            {
                this.fExerciseCurrent.fTextSolution = content;
            },
            
            /* *****************************************************************************************************************
             * Event handlers - called from associated TController instance.    [60]
             ***************************************************************************************************************** */
            
            /*
             * Event handlers for TController state: kChanging.
             *     Change mode: User has done changes to the text in the current exercise's editor panel, and has not saved the exercise yet.
             */
            
            /**
             * Event handler: User changed the current answer, i.e. typed something into the current answer's editor panel.
             */
            Handle_Changing_Change: function ()
            {
                if (gDebug) console.log ("TWorksheet::Handle_Changing_Change ()");
                
                /* Do nothing here, all actions already done. */
            },
            
            /**
             * Event handler: Copy all solutions to the clipboard.
             */
            Handle_Changing_CopyAll: function ()
            {
                if (gDebug) console.log ("TWorksheet::Handle_Changing_CopyAll ()");
                
                this._SystemCollectSolutions (); 
            },
            
            /**
             * Event handler: Open another exercise for editing.
             */
            Handle_Changing_Edit: function ()
            {
                if (gDebug) console.log ("TWorksheet::Handle_Changing_Edit ()");
                
                this.fExerciseCurrent = this.fExerciseNext;
                this._SystemFileLoadCurrent ();
                this._NotifySystemEditorChangeObserverSetRunning ();
            },
            
            /**
             * Event handler: Cancel changing.
             */
            Handle_Changing_Read: function ()
            {
                if (gDebug) console.log ("TWorksheet::Handle_Changing_Read ()");
                
                /* Do nothing here, all actions already done. */
            },
            
            /**
             * Event handler: Save the current answer.
             */
            Handle_Changing_Save: function ()
            {
                if (gDebug) console.log ("TWorksheet::Handle_Changing_Save ()");
                
                /* Do nothing here, all actions already done. */
            },
            
            /**
             * Event handler: Terminate worksheet (e.g. when loading another lesson).
             */
            Handle_Changing_Terminate: function ()
            {
                if (gDebug) console.log ("TWorksheet::Handle_Changing_Terminate ()");
                
                this.fSemaphore.resolve ();
            },
            
            /*
             * Event handlers for TController state: kEditing.
             *     Editing mode: User is editing a particular exercise, but has not typed any characters into the editor panel since the last save.
             */

            /**
             * Event handler: User changed the current answer, i.e. typed something into the current answer's editor panel.
             */
            Handle_Editing_Change: function ()
            {
                if (gDebug) console.log ("TWorksheet::Handle_Editing_Change ()");
                
                /* Do nothing here, all actions already done. */
            },
            
            /**
             * Event handler: Copy all solutions to the clipboard.
             */
            Handle_Editing_CopyAll: function ()
            {
                if (gDebug) console.log ("TWorksheet::Handle_Editing_CopyAll ()");
                
                this._SystemCollectSolutions ();
            },
            
            /**
             * Event handler: Open another exercise for editing.
             */
            Handle_Editing_Edit: function ()
            {
                if (gDebug) console.log ("TWorksheet::Handle_Editing_Edit ()");
                
                this.fExerciseCurrent = this.fExerciseNext;
                this._SystemFileLoadCurrent ();
                this.fEditor.SetOberverContentChanged_Running ();
            },
            
            /**
             * Event handler: Cancel editing.
             */
            Handle_Editing_Read: function ()
            {
                if (gDebug) console.log ("TWorksheet::Handle_Editing_Read ()");
                
                /* Do nothing here, all actions already done. */
            },
            
            /**
             * Event handler: Save the current answer.
             */
            Handle_Editing_Save: function ()
            {
                if (gDebug) console.log ("TWorksheet::Handle_Editing_Save ()");
                
                /* Do nothing here, all actions already done. */
            },

            /**
             * Event handler: Terminate worksheet.
             */
            Handle_Editing_Terminate: function ()
            {
                if (gDebug) console.log ("TWorksheet::Handle_Editing_Terminate ()");

                this.fSemaphore.resolve ();
            },
            
            /*
             * Event handlers for TController state: kNull.
             *     When we are finished building the worksheet and ready to have the user work with it.
             */

            /**
             * Event handler: 
             */
            Handle_Null_Start: function ()
            {
                if (gDebug) console.log ("TWorksheet::Handle_Null_Start ()");
            },
            
            /**
             * Event handlers for TController state: kReading.
             *     Reader mode: Student is just reading the exercise sheet, i.e. all exercises collapsed, user can see questions only.
             */

            /**
             * Event handler: Copy all solutions to the clipboard.
             */
            Handle_Reading_CopyAll: function ()
            {
                if (gDebug) console.log ("TWorksheet::Handle_Reading_CopyAll ()");
                
                this._SystemCollectSolutions ();
            },
            
            /**
             * Event handler: Open an exercise for editing.
             */
            Handle_Reading_Edit: function ()
            {
                if (gDebug) console.log ("TWorksheet::Handle_Reading_Edit ()");
                
                this.fExerciseCurrent = this.fExerciseNext;
                this._SystemFileLoadCurrent ();
                this.fEditor.SetOberverContentChanged_Running ();
            },
            
            /**
             * Event handler: Terminate worksheet.
             */
            Handle_Reading_Terminate: function ()
            {
                if (gDebug) console.log ("TWorksheet::Handle_Reading_Terminate ()");
                
                this.fSemaphore.resolve ();
            },
            
            /* *****************************************************************************************************************
             * Notifications from associated TController instance
             ***************************************************************************************************************** */
            
            /**
             * Notification: Execute actions before transiting to the next state (Animations, saving current exercise etc.).
             */
            NotifyPreTransitionActions: function (actions)
            {
                var _this = this; 
                
                var doC;
                var doE;

                if (gDebug)
                {
                    console.log ("TWorksheet::NotifyPreTransitionActions (actions)");
                    console.log ("actions: " + JSON.stringify (actions));
                }

                this._NotifySystemFileSave_PreflightCheck (actions).then
                (
                    function (decision)
                    {
                        return _this._NotifySystemFileSave (decision);           /* [80] */
                    }
                ).then
                (
                    function ()
                    {
                        doC = actions.doCollapseCurrent;
                        doE = actions.doExpandNext;
                        
                        if ((! doC)  &&  (! doE))
                        {
                            _this._NotifySystemControllerEvent ("kSuccess");     /* [90] */
                        }
                        else if ((! doC)  &&  (  doE))
                        {
                            _this._NotifySystemEditorChangeObserverSetPaused ().then
                            (
                                function () {return _this._NotifyUIMigrateEditor ();}
                            ).then
                            (
                                function () {return _this._NotifyUIExpandNext ();}
                            ).then
                            (
                                function () {return _this._NotifyUIScrollWindow ();}
                            ).then
                            (
                                function () {_this._NotifySystemControllerEvent ("kSuccess");}
                            );
                        }
                        else if ((  doC)  &&  (! doE))
                        {
                            _this._NotifySystemEditorChangeObserverSetPaused ().then
                            (
                                function () {return _this._NotifyUICollapseCurrent ();}
                            ).then
                            (
                                function () {_this._NotifySystemControllerEvent ("kSuccess");}
                            );
                        }
                        else if ((  doC)  &&  (  doE))
                        {
                            _this._NotifySystemEditorChangeObserverSetPaused ().then
                            (
                                function () {return _this._NotifyUICollapseCurrent ();}
                            ).then
                            (
                                function () {return _this._NotifyUIMigrateEditor ();}
                            ).then
                            (
                                function () {return _this._NotifyUIExpandNext ();}
                            ).then
                            (
                                function () {return _this._NotifyUIScrollWindow ();}
                            ).then
                            (
                                function () {_this._NotifySystemControllerEvent ("kSuccess");}
                            );
                        }
                    }
                );
            },
            
            /**
             * cTor.
             *
             * @param {JSON}    params      The worksheet's configuration.  Must
             *                              conform to {@link TWorksheet.kSchemaParams}.
             */
            constructor: function (params)
            {
                if (gDebug) console.log ("TWorksheet::constructor ()");

                JSObjectValidator.AssertValid (params, this.kSchemaParams, "constructor");
                
                this.fHost                      = params.fHost;
                this.fNodeAnchor                = params.fNodeAnchor;
                this.fHandlers                  = 
                {
                    onFinishedLoad:                params.onFinishedLoad,
                    onRequestLoadSolution:         params.onRequestLoadSolution,
                    onRequestSaveSolution:         params.onRequestSaveSolution
                };

                this.fController                = new TController ({fHost: this});
                this.fModel                     = new TModel ();
                this.fExerciseCurrent           = null;
                this.fExerciseNext              = null;
                this.fEditor                    = null;
                this.fDlgDoSaveConfirm          = null;
                this.fDlgExerciseSolutions      = null;
            },
            
            /**
             * 
             */
            destroy: function ()
            {
                if (gDebug) console.log ("TWorksheet::destroy ()");

                if (this.fEditor != null)
                {
                    this.fEditor.destroy ();
                    this.fEditor = null;
                }
                
                if (this.fDlgDoSaveConfirm != null)
                {
                    this.fDlgDoSaveConfirm.destroy ();
                    this.fDlgDoSaveConfirm = null;
                }
                
                if (this.fDlgExerciseSolutions != null)
                {
                    this.fDlgExerciseSolutions.destroy ();
                    this.fDlgExerciseSolutions = null;
                }
            },

            /**
             * 
             * @returns {undefined}
             */
            startup: function ()
            {
                var _this           = this;
                var kImgBaseURL     = _require.toUrl ("courseware/img");

                if (gDebug) console.log ("TWorksheet::startup ()");
                
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
                
                globalMenuBar = new TMenuBar ({});
                subMenu       = new TDropDownMenu ({});
                subMenu.addChild
                (
                    new TMenuItem
                    (
                        {
                            label:      "Solutions to clipboard",
                            onClick:    function () {_this._NotifySystemControllerEvent.call (_this, "kCopyAll");}
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
                
                /**
                 * Create dialog which collates all user supplied solutions for this worksheet 
                 */
                this.fDlgExerciseSolutions = new TTextWindow 
                (
                    {
                        host:           this,
                        onClose:        function () {}
                    }
                );
                this.fDlgExerciseSolutions.startup ();
                
                /* Set up exercises */
                ndeListExercises = domQuery ("*[data-courseware-type=\"exercise\"]");
                if (ndeListExercises.length >= 1)
                {
                    /* Create editor component */
                    this.fEditor = new TExerciseEditGUI
                    (
                        {
                            fHost:              window,
                            fWidth:             "745px",                                /* [20] */
                            fHeight:            "480px",                                /* [20] */
                            onFinishedChange:   function () {_this._NotifySystemControllerEvent.call (_this, "kChange"   );},
                            onFinishedLoad:     function () {},
                            onRequestCancel:    function () {_this._NotifySystemControllerEvent.call (_this, "kRead"     );},
                            onRequestSave:      function () {_this._NotifySystemControllerEvent.call (_this, "kSave"     );},
                        }
                    );
                    this.fEditor.startup ();

                    /* Set up confirmation dialog re. unsaved documents */
                    this.fDlgDoSaveConfirm = new TButtonDialog
                    (
                        {
                            "host":             this,
                            "buttons":
                            [
                                {
                                    label:      "No",
                                    onClick:    function () {}   /* [70] */
                                },
                                {
                                    label:      "Yes",
                                    onClick:    function () {}    /* [70] */
                                },
                            ]
                        }
                    );
                    this.fDlgDoSaveConfirm.startup ();
                    
                    /* Set up exercises */
                    iconURLEdit = kImgBaseURL + "/edit.png";
                    for (i = 0; i < ndeListExercises.length; i++)
                    {
                        ndeExercise                         = ndeListExercises [i];
                        
                        ndeProps                            = domAttr.get (ndeExercise, "data-courseware-props");
                        ndeProps                            = JSONUtils.GetAsObject (ndeProps, this.kSchemaPropertiesExercise, "TWorksheet::startup()");
                        fragments                           = ndeProps.type.split ("/");
                        
                        /* Create exercise object and register it with the controller. */
                        objExercise                         = new TExercise ();
                        objExercise.fContentType            = fragments [0];
                        objExercise.fContentLang            = fragments [1];
                        objExercise.fID                     = ndeProps.id;
                        objExercise.fHasChanged             = false;
                        objExercise.fIsOpen                 = false;
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
                                exerciseID:     objExercise.fID,
                                label:          "<img src=\"" + iconURLEdit + "\"/>",
                                onClick: function () 
                                {
                                    _this._NotifySystemFileOpenExercise (this.exerciseID);
                                }
                            }
                        )
                        objExercise.fObjButton.startup ();
                        this.fModel.Register (objExercise);
                        this.fExerciseCurrent = objExercise;
                        this.fHandlers.onRequestLoadSolution (this.fExerciseCurrent.fID);
                        
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
                
                this.fController.Notify ("kStart");
            },
            
            /**
             * 
             * @param {type} event
             * @returns {undefined}
             */
            _NotifySystemControllerEvent: function (event)
            {
                if (gDebug) console.log ("TWorksheet::_NotifySystemControllerEvent ('" + event + "')");
                
                this.fController.Notify.call (this.fController, event);
            },
            
            /**
             * 
             * @returns {Deferred_L8._a|Deferred_L8._11}
             */
            _NotifySystemEditorChangeObserverSetPaused: function ()
            {
                var d;
                
                if (gDebug) console.log ("TWorksheet::_NotifySystemEditorChangeObserverSetPaused ()");

                d = new TDeferred ();
                
                this.fEditor.SetOberverContentChanged_Paused.call (this.fEditor);
                d.resolve ();
                
                return d;
            },
            
            /**
             * 
             * @returns {Deferred_L8._a|Deferred_L8._11}
             */
            _NotifySystemEditorChangeObserverSetRunning: function ()
            {
                var d;

                if (gDebug) console.log ("TWorksheet::_NotifySystemEditorChangeObserverSetRunning ()");

                d = new TDeferred ();
                
                this.fEditor.SetOberverContentChanged_Running.call (this.fEditor);
                d.resolve ();
                
                return d;
            },
            
            /**
             * 
             * @param {type} exerciseID
             * @returns {undefined}
             */
            _NotifySystemFileOpenExercise: function (exerciseID)
            {
                var doOpen;

                doOpen = false;
                if (this.fExerciseCurrent == null)
                {
                    doOpen = true;
                }
                else if (exerciseID != this.fExerciseCurrent.fID)
                {
                    doOpen = true;
                }
                else if (! this.fExerciseCurrent.fIsOpen)
                {
                    doOpen = true;
                }
                
                if (gDebug)
                {
                    if (doOpen)
                    {
                        console.log ("TWorksheet::_NotifySystemFileOpenExercise ('" + exerciseID + "')");
                    }
                    else
                    {
                        console.log ("TWorksheet::_NotifySystemFileOpenExercise ('" + exerciseID + "'): Cancelled, as it's already open.");
                    }
                }
                
                if (doOpen)
                {
                    this.fExerciseNext = this.fModel.GetByID (exerciseID);
                    this.fHandlers.onRequestLoadSolution (this.fExerciseNext.fID);
                    this._NotifySystemControllerEvent ("kEdit");
                }
            },
            
            /**
             * 
             * @param {type} actions
             * @returns {Deferred_L8._a|TWorksheet_L38.TWorksheet@pro;fDlgDoSaveConfirm@call;Show|Deferred_L8._11}
             */
            _NotifySystemFileSave_PreflightCheck: function (actions)
            {
                var d;
                
                if (gDebug)
                {
                    console.log ("_NotifySystemFileSave_PreflightCheck (actions)");
                    console.log ("actions: " + JSON.stringify (actions));
                }
                  
                if (actions.saveAction == this.fController.ESaveAction.kSave)
                {
                    d = new TDeferred ();
                    d.resolve (this.ESaveDecision.kDoSave);
                }
                else if (actions.saveAction == this.fController.ESaveAction.kSaveConfirm)
                {
                    d = this.fDlgDoSaveConfirm.Show ("Unsaved changes...", "Would you like to save?");
                }
                else
                {
                    d = new TDeferred ();
                    d.resolve (this.ESaveDecision.kDoNotSave);
                }
                
                return d;
            },

            /**
             * 
             * @param {type} idDecision
             * @returns {Deferred_L8._a|Deferred_L8._11}
             */
            _NotifySystemFileSave: function (idDecision)
            {
                var d;
                
                if (gDebug) console.log ("TWorksheet::_NotifySystemFileSave (" + idDecision + ")");
                
                d = new TDeferred ();
                
                if (idDecision == this.ESaveDecision.kDoSave)
                {
                    this._SystemFileSaveCurrent ();
                }
                d.resolve ();
                
                return d;
            },
            
            /**
             * 
             * @returns {Deferred_L8._a|Deferred_L8._11}
             */
            _NotifyUICollapseCurrent: function ()
            {
                var _this = this;
                var d;
                
                if (gDebug)
                {
                    console.log ("TWorksheet::_NotifyUICollapseCurrent ()");
                }
                
                d = new TDeferred ();
                
                fx.wipeOut 
                (
                    {
                        node:       this.fExerciseCurrent.fNodeWorkspace,
                        duration:   250,
                        onEnd:      function () 
                        {
                            _this.fExerciseCurrent.fIsOpen = false;
                            d.resolve ();
                        }
                    }
                ).play ();
                
                return d;
            },
            
            /**
             * 
             * @returns {Deferred_L8._a|Deferred_L8._11}
             */
            _NotifyUIExpandNext: function ()
            {
                var _this = this;
                var d;
                
                if (gDebug)
                {
                    console.log ("TWorksheet::_NotifyUIExpandNext ()");
                }

                d = new TDeferred ();
                
                fx.wipeIn 
                (
                    {
                        node:       this.fExerciseNext.fNodeWorkspace,
                        duration:   250,
                        onEnd:      function ()
                        {
                            _this.fExerciseNext.fIsOpen = true;
                            d.resolve ();
                        }
                    }
                ).play ();
                
                return d;
            },
            
            /**
             * 
             * @returns {Deferred_L8._a|Deferred_L8._11}
             */
            _NotifyUIMigrateEditor: function ()
            {
                var d;
                
                if (gDebug)
                {
                    console.log ("TWorksheet::_NotifyUIMigrateEditor ()");
                }

                d = new TDeferred ();
                
                this.fEditor.SetType (this.fExerciseNext.fContentType, this.fExerciseNext.fContentLang);
                domConstruct.place (this.fEditor.domNode, this.fExerciseNext.fNodeWorkspace, "only");
                d.resolve ();
                
                return d;
            },
            
            /**
             * 
             * @returns {Deferred_L8._a|Deferred_L8._11}
             */
            _NotifyUIScrollWindow: function ()
            {
                var yNode;
                var yTarget;
                var d;

                if (gDebug)
                {
                    console.log ("TWorksheet::_NotifyUIScrollWindow ()");
                }

                d           = new TDeferred ();
                yNode       = this._UIGetPosition (this.fExerciseNext.fNodeWorkspace);
                yTarget     = yNode.y - 50;                                     /* [110] */
                
                wndScroll
                (
                    {
                        target:     {x:0,y:yTarget},
                        win:        this.fNodeAnchor,
                        duration:   500,
                        onEnd:  function ()
                        {
                            d.resolve ();
                        }
                    }
                ).play ();

                return d;
            },
            
            /**
             * 
             * @returns {undefined}
             */
            _SystemCollectSolutions: function ()
            {
                var i;
                var n;
                var e;
                var s;
                var isS;
                var ss;
                
                if (gDebug) console.log ("TWorksheet::_SystemCollectSolutions ()");
                
                n = this.fModel.GetNumElements ();
                if (n >= 1)
                {
                    ss = "";
                    for (i = 0; i < n; i++)
                    {
                        e   = this.fModel.GetByIndex (i);
                        s   = e.fTextSolution;
                        
                        isS = ((typeof s) == "string")  &&  (s.length >= 1);
                        s   = isS  ?  dojox.html.format.prettyPrint (s) : "No answer yet."
                        ss += "------------------------------------------------------\n" +
                              "Question " + (i+1) + ":\n" + 
                              "------------------------------------------------------\n" +
                              s + "\n\n";
                    }
                }
                else
                {
                    ss = "No exercises in this lesson.";
                }
                
                this.fDlgExerciseSolutions.Show ("Your solutions", "Copy the text below to the clipboard.", ss);
            },
            
            /**
             * 
             * @returns {undefined}
             */
            _SystemFileLoadCurrent: function ()
            {
                if (gDebug) console.log ("TWorksheet::_SystemFileLoadCurrent ()");

                this.fEditor.SetContent         (this.fExerciseCurrent.fTextSolution);
                this.fEditor.ClearFlagChanged   ();
            },

            /**
             * 
             * @returns {undefined}
             */
            _SystemFileSaveCurrent: function ()
            {
                var content;
                
                if (gDebug) console.log ("TWorksheet::_SystemFileSaveCurrent ()");

                content                             = this.fEditor.GetContent ();
                this.fExerciseCurrent.fTextSolution = content;
                this.fEditor.ClearFlagChanged ();
                this.fHandlers.onRequestSaveSolution ();
            },
            
            /**
             * Returns the position of the given element on the screen. It's always the position
             * of the top left corner of the element looked for.                [100]
             */
            _UIGetPosition: function (el)
            {
                var xPos = 0;
                var yPos = 0;
                var pos  = null;
                var ret;
                
                if (has ("ff"))
                {   /* For Firefox - we can't use dojo/dom-geometry */
                    while (el)
                    {
                        if (el.tagName == "BODY")
                        {
                            // deal with browser quirks with
                            // body/window/document and page scroll
                            var xScroll =    el.scrollLeft
                                          || document.documentElement.scrollLeft;
                            var yScroll =    el.scrollTop
                                          || document.documentElement.scrollTop;

                            xPos += (el.offsetLeft - xScroll + el.clientLeft);
                            yPos += (el.offsetTop - yScroll + el.clientTop);
                        } else
                        {
                            // for all other non-BODY elements
                            xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
                            yPos += (el.offsetTop - el.scrollTop + el.clientTop);
                        }

                        el = el.offsetParent;
                    }
                    yPos -= 50;
                    
                    ret = 
                    {
                        x: xPos,
                        y: yPos
                    };
                }
                else
                {   /* All other browsers seem to be ok with dojo/dom-geometry */
                    pos = domGeometry.position (el, false);
                    ret =
                    {
                        x: pos.x,
                        y: pos.y
                    };
                }
                
                return ret;
            }
        };
    
        ret = declare ("TWorksheet", [_WidgetBase], TWorksheet);
    
        return ret;
    }
);


/*
 
 [10]:     We have to include dojo.require, otherwise require.toUrl fails with an error
           "require.toUrl: Not a function". Reason is that by the time we call this function,
           dojo has 'packaged' the toUrl function inside the global require.original 
           property. Requiring 'require' gives us an unpackaged require module which 
           offers the toUrl function.

 [20]:     Needs refactoring: TExerciseEditGUI should autodiscover. Works for now. 
           Logged as issue#12 [https://github.com/ustegrew/ustegrew.github.io/issues/12]

 [30]:     According to specs, JSON strings can't use single quotes to terminate strings. However,
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

 [40]:     For a new TController we create an empty dummy exercise as fExerciseCurrent,
           fExerciseNext. Setting it to null would create complications.

 [60]:     The TController calls each event handler with this TWorksheet instance as context - therefore, 
           in all event handlers we can use the 'this' reference to refer to this TWorksheet instance.
       
 [70]:     We make TButtonDialog.Show () then-able (dojo/Deferred). The promise resolves when the user clicks one of the buttons,
           with the index of the button clicked.

 [80]:     Normally I don't like to put a function call into a return statement, but in this case 
           it made no sense to create a local variable.

 [90]:     This statement appears in each branch of the enclosing if-else construct and could be relocated
           at the end - but it feels better design to leave it this way. 
       
 [100]:    Cross platform compatible way of finding the element's position:
           * In Firefox:    We use a method courtesy https://www.kirupa.com/html5/get_element_position_using_javascript.htm
           * Chrome/Safari: dojo/dom-geometry works.
           For Firefox, we introduce an additional offset of -50px
           
 [110]:    Offset of -50px - Equivalent to three or four lines of text, so the user can see the last part of 
           the current exercise. 

 */