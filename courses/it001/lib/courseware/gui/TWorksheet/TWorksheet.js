/**
 *  @fileoverview
 */
define 
(
    [
        "dojo/_base/declare",
        "dijit/_WidgetBase",
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
        "../../util/json/TJSONUtils",
        "./TExercise",
        "./TModel",
        "./TController",
        "../TExerciseEditGUI/TExerciseEditGUI",
        "../TButtonDialog/TButtonDialog"
    ],
    function 
    (
        declare,
        _WidgetBase,
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
        JSONUtils,
        TExercise,
        TModel,
        TController,
        TExerciseEditGUI,
        TButtonDialog
    )
    {
        /* Debug flag - for that extra info in hard places! */
        var gDebug = true;
        
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
             *  The controller. Controls the behaviour of this worksheet.
             * 
             * @type    TController
             */
            fController: null,

            /**
             * The Yes/No confirmation dialog asking "Do you want to save first?"
             * before the user closes an active solution that has unsaved changes.
             * 
             * @type    TButtonDialog
             */
            fDlgDoSaveConfirm: null,

            /**
             * The editor for the user to edit the solutions to the exercises.
             * 
             * @type    TExerciseEditGUI
             */
            fEditor: null,
            
            fExerciseCurrent: null,
            fExerciseNext: null,

            /**
             * The client using this class.
             * 
             * @type    JSObject
             */
            fHost: null,

            /**
             * The callbacks from the client. Will be called in the client's 
             * context (i.e. 'this' inside a callback will point to the client
             * object, not the TWorksheet object.
             * 
             * @type    JSObject
             */
            fHandlers: null,

            /**
             * The model holding the exercises. Provides index and hash based access
             * to each exercise element.
             */
            fModel: null,
            
            /**
             * The anchor node against which the work sheet is anchored, e.g. the content panel
             * in which the worksheet is located. Needed for certain effects, such as scrolling 
             * the active solution into view.
             */
            fNodeAnchor: null,
            
            /**
             * A Deferred object to facilitate clean termination of this worksheet 
             * (e.g. We'd like to save when the user has a solution open with unsaved changes).
             * 
             * @type    dojo/Deferred
             */
            fSemaphore: null,
            
            GetAllSolutions: function ()
            {
                var ret;
                // TODO develop this
                ret = [];
                
                return ret;
            },
            
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
            
            RequestTerminate: function ()
            {
                this.fSemaphore = new TDeferred ();
                this.fController.Notify ("kTerminate");
                
                return this.fSemaphore;
            },
            
            SetCurrentSolution: function (content)
            {
                this.fExerciseCurrent.fTextSolution = content;
            },
            
            /** *****************************************************************************************************************
             * Event handlers - called from associated TController instance.    [60]
             ***************************************************************************************************************** **/
            
            /**
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
                
                this._SystemCopyAllToClipboard (); 
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
            
            /**
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
                
                this._SystemCopyAllToClipboard ();
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
            
            /**
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
                
                this._SystemCopyAllToClipboard ();
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
            
            /** *****************************************************************************************************************
             * Notifications from associated TController instance
             ***************************************************************************************************************** **/
            
            /**
             * Notification: Execute actions before transiting to the next state (Animations, saving current exercise etc.).
             */
            NotifyPreTransitionActions: function (actions)
            {
                var _host = this; 
                
                var doC;
                var doE;
                var d0;
                var d1;

                if (gDebug)
                {
                    console.groupCollapsed ("TWorksheet::NotifyPreTransitionActions (actions)");
                    console.log ("actions: " + JSON.stringify (actions));
                    console.groupEnd ();
                }

                this._NotifySystemFileSave_PreflightCheck (actions).then
                (
                    function (decision)
                    {
                        return _host._NotifySystemFileSave (decision);           /* [80] */
                    }
                ).then
                (
                    function ()
                    {
                        doC = actions.doCollapseCurrent;
                        doE = actions.doExpandNext;
                        
                        if ((! doC)  &&  (! doE))
                        {
                            _host._NotifySystemControllerEvent ("kSuccess");     /* [90] */
                        }
                        else if ((! doC)  &&  (  doE))
                        {
                            _host._NotifySystemEditorChangeObserverSetPaused ().then
                            (
                                function () {return _host._NotifyUIMigrateEditor ();}
                            ).then
                            (
                                function () {return _host._NotifyUIExpandNext ();}
                            ).then
                            (
                                function () {return _host._NotifyUIScrollWindow ();}
                            ).then
                            (
                                function () {_host._NotifySystemControllerEvent ("kSuccess");}
                            );
                        }
                        else if ((  doC)  &&  (! doE))
                        {
                            _host._NotifySystemEditorChangeObserverSetPaused ().then
                            (
                                function () {return _host._NotifyUICollapseCurrent ();}
                            ).then
                            (
                                function () {_host._NotifySystemControllerEvent ("kSuccess");}
                            );
                        }
                        else if ((  doC)  &&  (  doE))
                        {
                            d1 = _host._NotifySystemEditorChangeObserverSetPaused ().then
                            (
                                function () {return _host._NotifyUICollapseCurrent ();}
                            ).then
                            (
                                function () {return _host._NotifyUIMigrateEditor ();}
                            ).then
                            (
                                function () {return _host._NotifyUIExpandNext ();}
                            ).then
                            (
                                function () {return _host._NotifyUIScrollWindow ();}
                            ).then
                            (
                                function () {_host._NotifySystemControllerEvent ("kSuccess");}
                            );
                        }
                    }
                );
            },
            
            /**
             * Dojo specific cTor.
             */
            constructor: function (params)
            {
                this.fHost                      = params.fHost;
                this.fNodeAnchor                = params.fNodeAnchor;
                this.fHandlers                  = 
                {
                    onFinishedLoad:                params.onFinishedLoad,
                    onRequestCopyAllToClipboard:   params.onRequestCopyAllToClipboard,
                    onRequestLoadSolution:         params.onRequestLoadSolution,
                    onRequestSaveSolution:         params.onRequestSaveSolution
                };

                this.fController                = new TController ({fHost: this});
                this.fModel                     = new TModel ();
                this.fEditor                    = null;
                this.fDlgDoSaveConfirm          = null;
                this.fExerciseCurrent           = null;
                this.fExerciseNext              = null;
            },
            
            destroy: function ()
            {
                if (this.fEditor != null)
                {
                    this.fEditor.destroy ();
                }
                
                if (this.fDlgDoSaveConfirm != null)
                {
                    this.fDlgDoSaveConfirm.destroy ();
                }
            },

            startup: function ()
            {
                var _host           = this;
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
                
                globalMenuBar = new TMenuBar ({});
                subMenu       = new TDropDownMenu ({});
                subMenu.addChild
                (
                    new TMenuItem
                    (
                        {
                            label:      "Solutions to clipboard",
                            onClick:    function () {_host._NotifySystemControllerEvent.call (_host, "kCopyAll");}
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
                            fHost:              window,
                            fWidth:             "745px",                                /* [20] */
                            fHeight:            "480px",                                /* [20] */
                            onFinishedChange:   function () {_host._NotifySystemControllerEvent.call (_host, "kChange"   );},
                            onFinishedLoad:     function () {},
                            onRequestCancel:    function () {_host._NotifySystemControllerEvent.call (_host, "kRead"     );},
                            onRequestSave:      function () {_host._NotifySystemControllerEvent.call (_host, "kSave"     );},
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
                                    label:      "Yes",
                                    onClick:    function () {_host.fDlgDoSaveConfirm.fSemaphore.resolve (true);}    /* [70] */
                                },
                                {
                                    label:      "No",
                                    onClick:    function () {_host.fDlgDoSaveConfirm.fSemaphore.resolve (false);}   /* [70] */
                                }
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
                        ndeProps                            = JSONUtils.GetAsObject (ndeProps, kSchemaPropertiesExercise, "TWorksheet::startup()");
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
                                    _host._NotifySystemFileOpenExercise (this.exerciseID);
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
            
            _NotifySystemControllerEvent: function (event)
            {
                if (gDebug) console.log ("TWorksheet::_NotifySystemControllerEvent ('" + event + "')");
                
                this.fController.Notify.call (this.fController, event);
            },
            
            _NotifySystemEditorChangeObserverSetPaused: function ()
            {
                var d;
                
                if (gDebug) console.log ("TWorksheet::_NotifySystemEditorChangeObserverSetPaused ()");

                d = new TDeferred ();
                
                this.fEditor.SetOberverContentChanged_Paused.call (this.fEditor);
                d.resolve ();
                
                return d;
            },
            
            _NotifySystemEditorChangeObserverSetRunning: function ()
            {
                var d;

                if (gDebug) console.log ("TWorksheet::_NotifySystemEditorChangeObserverSetRunning ()");

                d = new TDeferred ();
                
                this.fEditor.SetOberverContentChanged_Running.call (this.fEditor);
                d.resolve ();
                
                return d;
            },
            
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
                    this._NotifySystemControllerEvent ("kEdit");
                }
            },
            
            _NotifySystemFileSave_PreflightCheck: function (actions)
            {
                var d;
                
                if (gDebug)
                {
                    console.groupCollapsed ("_NotifySystemFileSave_PreflightCheck (actions)");
                    console.log ("actions: " + JSON.stringify (actions));
                    console.groupEnd ();
                }
                  
                d = new TDeferred ();
                
                if (actions.saveAction == this.fController.ESaveAction.kSave)
                {
                    d.resolve (true);
                }
                else if (actions.saveAction == this.fController.ESaveAction.kSaveConfirm)
                {
                    this.fDlgDoSaveConfirm.fSemaphore = d;                      /* [70] */
                    this.fDlgDoSaveConfirm.Show ("Unsaved changes...", "Would you like to save?");
                }
                else
                {
                    d.resolve (false);
                }
                
                return d;
            },

            _NotifySystemFileSave: function (decision)
            {
                var d;
                
                if (gDebug) console.log ("TWorksheet::_NotifySystemFileSave (" + decision + ")");
                
                d = new TDeferred ();
                
                if (decision == true)
                {
                    this._SystemFileSaveCurrent ();
                }
                d.resolve ();
                
                return d;
            },
            
            _NotifyUICollapseCurrent: function ()
            {
                var _host = this;
                var d;
                
                if (gDebug) console.log ("TWorksheet::_NotifyUICollapseCurrent ()");
                
                d = new TDeferred ();
                
                fx.wipeOut 
                (
                    {
                        node:       this.fExerciseCurrent.fNodeWorkspace,
                        duration:   250,
                        onEnd:      function () 
                        {
                            _host.fExerciseCurrent.fIsOpen = false;
                            d.resolve ();
                        }
                    }
                ).play ();
                
                return d;
            },
            
            _NotifyUIExpandNext: function ()
            {
                var _host = this;
                var d;
                
                if (gDebug) console.log ("TWorksheet::_NotifyUIExpandNext ()");

                d = new TDeferred ();
                
                fx.wipeIn 
                (
                    {
                        node:       this.fExerciseNext.fNodeWorkspace,
                        duration:   250,
                        onEnd:      function ()
                        {
                            _host.fExerciseNext.fIsOpen = true;
                            d.resolve ();
                        }
                    }
                ).play ();
                
                return d;
            },
            
            _NotifyUIMigrateEditor: function ()
            {
                var d;
                
                if (gDebug) console.log ("TWorksheet::_NotifyUIMigrateEditor ()");

                d = new TDeferred ();
                
                this.fEditor.SetType (this.fExerciseNext.fContentType, this.fExerciseNext.fContentLang);
                domConstruct.place (this.fEditor.domNode, this.fExerciseNext.fNodeWorkspace, "only");
                d.resolve ();
                
                return d;
            },
            
            _NotifyUIScrollWindow: function ()
            {
                var _host = this;
                
                var yNode;
                var yTarget;
                var d;

                if (gDebug) console.log ("TWorksheet::_NotifyUIScrollWindow ()");

                d           = new TDeferred ();
                yNode       = domGeometry.position (this.fExerciseNext.fNodeWorkspace, false);
                yTarget     = yNode.y - 50;
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
            
            _SystemCopyAllToClipboard: function ()
            {
                if (gDebug) console.log ("TWorksheet::_SystemCopyAllToClipboard ()");

                this.fHandlers.onRequestCopyAllToClipboard ();
            },
            
            _SystemFileLoadCurrent: function ()
            {
                if (gDebug) console.log ("TWorksheet::_SystemFileLoadCurrent ()");

                this.fEditor.SetContent         (this.fExerciseCurrent.fTextSolution);
                this.fEditor.ClearFlagChanged   ();
            },

            _SystemFileSaveCurrent: function ()
            {
                var content;
                
                if (gDebug) console.log ("TWorksheet::_SystemFileSaveCurrent ()");

                content                             = this.fEditor.GetContent ();
                this.fExerciseCurrent.fTextSolution = content;
                this.fEditor.ClearFlagChanged ();
                this.fHandlers.onRequestSaveSolution ();
            },
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

 [60]: The TController calls each event handler with this TWorksheet instance as context - therefore, 
       in all event handlers we can use the 'this' reference to refer to this TWorksheet instance.
       
 [70]: Type dojo/Deferred. Works with the dojo promises framework. I didn't know what better name to choose than 'Semaphore'.

 [80]: Normally I don't like to put a function call into a return statement, but in this case 
       it made no sense to create a local variable.

 [90]: This statement appears in each branch of the enclosing if-else construct and could be relocated
       at the end - but it feels better design to leave it this way. 
 */