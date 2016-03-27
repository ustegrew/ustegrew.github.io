/**
 *  @fileoverview
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
        
        var TPreTransitionSequence = function (host)
        {
            var kActionSystemFileSave = function (actions)
            {
                if (gDebug)
                {
                    console.groupCollapsed ("TWorksheet::TPreTransitionSequence::kActionSystemFileSave (actions)");
                    console.log ("actions: " + JSON.stringify (actions));
                    console.groupEnd ();
                }
                this.fHost._NotifySystemFileSave.call (this.fHost, actions);
            };
            
            var kActionSystemControllerEvent = function ()
            {
                if (gDebug) console.log ("TWorksheet::TPreTransitionSequence::kActionSystemControllerEvent ()");
                this.fHost._NotifySystemControllerEvent.call (this.fHost, "kSuccess");
            };
            
            var kActionSystemEditorChangeObserverSetPaused = function ()
            {
                if (gDebug) console.log ("TWorksheet::TPreTransitionSequence::kActionSystemEditorChangeObserverSetPaused ()");
                this.fHost._NotifySystemEditorChangeObserverSetPaused.call (this.fHost);
            };
            
            var kActionUICollapseCurrent = function ()
            {
                if (gDebug) console.log ("TWorksheet::TPreTransitionSequence::kActionUICollapseCurrent ()");
                this.fHost._NotifyUICollapseCurrent.call (this.fHost);
            };
            
            var kActionUIExpandNext = function ()
            {
                if (gDebug) console.log ("TWorksheet::TPreTransitionSequence::kActionUIExpandNext ()");
                this.fHost._NotifyUIExpandNext.call (this.fHost);
            };
            
            var kActionUIMigrateEditor = function ()
            {
                if (gDebug) console.log ("TWorksheet::TPreTransitionSequence::kActionUIMigrateEditor ()");
                this.fHost._NotifyUIMigrateEditor.call (this.fHost);
            };
            
            var kActionUIScrollWindow = function ()
            {
                if (gDebug) console.log ("TWorksheet::TPreTransitionSequence::kActionUIScrollWindow ()");
                this.fHost._NotifyUIScrollWindow.call (this.fHost);
            };

            var TProgram = function (host)
            {
                this.fCounter   = -1;
                this.fHost      = host;
                this.fSteps     = [];
                this.AddStep = function (functor, param)
                {
                    var step;
                    
                    step =
                    {
                        functor:    functor,
                        param:      param
                    }
                    this.fSteps.push (step);
                };
                this.NotifyDoNextStep = function ()
                {
                    var s;
                    
                    if (this.fCounter < this.fSteps.length - 1)
                    {
                        this.fCounter++;
                        s = this.fSteps [this.fCounter];
                        s.functor.call (this, s.param);
                    }
                };
            };
            
            this.fHost      = host;
            
            this.NotifyStepFinished = function ()
            {
                this.fProgram.NotifyDoNextStep ();
            };
            
            this.Run = function (actions)
            {
                var doCollapse;
                var doExpand;
                
                this.fProgram = new TProgram (this.fHost);
                
                /* 1. Save current exercise if it is requested. */
                this.fProgram.AddStep (kActionSystemFileSave,                               actions);
                
                /* 2. Collapse current exercise or migrate editor. 
                 *    If doExpand is true then we also migrate the editor. */
                doCollapse  = actions.doCollapseCurrent;
                doExpand    = actions.doExpandNext;
                if ((! doCollapse) && (! doExpand))
                {
                }
                else if ((! doCollapse) && (doExpand))
                {
                    this.fProgram.AddStep (kActionSystemEditorChangeObserverSetPaused,      null);
                    this.fProgram.AddStep (kActionUIMigrateEditor,                          null);
                    this.fProgram.AddStep (kActionUIExpandNext,                             null);
                    this.fProgram.AddStep (kActionUIScrollWindow,                           null);
                }
                else if ((doCollapse) && (! doExpand))
                {
                    this.fProgram.AddStep (kActionSystemEditorChangeObserverSetPaused,      null);
                    this.fProgram.AddStep (kActionUICollapseCurrent,                        null);
                }
                else if ((doCollapse) && (doExpand))
                {
                    this.fProgram.AddStep (kActionSystemEditorChangeObserverSetPaused,      null);
                    this.fProgram.AddStep (kActionUICollapseCurrent,                        null);
                    this.fProgram.AddStep (kActionUIMigrateEditor,                          null);
                    this.fProgram.AddStep (kActionUIExpandNext,                             null);
                    this.fProgram.AddStep (kActionUIScrollWindow,                           null);
                }
                
                this.fProgram.AddStep (kActionSystemControllerEvent,                        null);

                this.fProgram.NotifyDoNextStep ();
            };
        };
        
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
            
            SetCurrentSolution: function (content)
            {
                this.fExerciseCurrent.fTextSolution = content;
            },
            
            GetAllSolutions: function ()
            {
                var ret;
                // TODO develop this
                ret = [];
                
                return ret;
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
                
                /* Do nothing here, all actions already done. */
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

                /* Do nothing here, all actions already done. */
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
                
                /* Do nothing here, all actions already done. */
            },
            
            /** *****************************************************************************************************************
             * Notifications from associated TController instance
             ***************************************************************************************************************** **/
            
            /**
             * Notification: Execute actions before transiting to the next state (Animations, saving current exercise etc.).
             */
            NotifyPreTransitionActions: function (actions)
            {
                if (gDebug)
                {
                    console.groupCollapsed ("TWorksheet::NotifyPreTransitionActions (actions)");
                    console.log ("actions: " + JSON.stringify (actions));
                    console.groupEnd ();
                }
                
                this.fPreTransitionSequence.Run (actions);
            },
            
            /**
             * Dojo specific cTor.
             */
            constructor: function (params)
            {
                this.fHost                      = params.fHost;
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
                this.fPreTransitionSequence     = new TPreTransitionSequence (this);
            },
            
            destructor: function ()
            {
                if (this.fEditor != null)
                {
                    this.fEditor.destructor ();
                }
                
                if (this.fDlgDoSaveConfirm != null)
                {
                    this.fDlgDoSaveConfirm.destructor ();
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
                            "host":     this,
                            "buttons":
                            [
                                {
                                    label:      "Yes",
                                    onClick:    function () {_host._NotifySystemFileSaveConfirmed.call (_host);}
                                },
                                {
                                    label:      "No",
                                    onClick:    function () {_host._NotifySystemFileSaveAborted.call (_host);}
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
                if (gDebug) console.log ("TWorksheet::_NotifySystemEditorChangeObserverSetPaused ()");

                this.fEditor.SetOberverContentChanged_Paused.call (this.fEditor);
                this.fPreTransitionSequence.NotifyStepFinished ();
            },
            
            _NotifySystemEditorChangeObserverSetRunning: function ()
            {
                if (gDebug) console.log ("TWorksheet::_NotifySystemEditorChangeObserverSetRunning ()");

                this.fEditor.SetOberverContentChanged_Running.call (this.fEditor);
                this.fPreTransitionSequence.NotifyStepFinished ();
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
            
            _NotifySystemFileSave: function (actions)
            {
                if (gDebug)
                {
                    console.groupCollapsed ("TWorksheet::_NotifySystemFileSave (actions)");
                    console.log ("actions: " + JSON.stringify (actions));
                    console.groupEnd ();
                }
                
                if (actions.saveAction == this.fController.ESaveAction.kSave)
                {
                    this._NotifySystemFileSaveConfirmed ();
                }
                else if (actions.saveAction == this.fController.ESaveAction.kSaveConfirm)
                {
                    this.fDlgDoSaveConfirm.Show ("Unsaved changes...", "Would you like to save?");
                }
                else
                {
                    this.fPreTransitionSequence.NotifyStepFinished ();
                }
            },
            
            _NotifySystemFileSaveAborted: function ()
            {
                if (gDebug) console.log ("TWorksheet::_NotifySystemFileSaveAborted ()");
                
                this.fPreTransitionSequence.NotifyStepFinished ();
            },
            
            _NotifySystemFileSaveConfirmed: function ()
            {
                if (gDebug) console.log ("TWorksheet::_NotifySystemFileSaveConfirmed ()");
                
                this._SystemFileSaveCurrent ();
                this.fPreTransitionSequence.NotifyStepFinished ();
            },
            
            _NotifyUICollapseCurrent: function ()
            {
                var _host = this;
                
                if (gDebug) console.log ("TWorksheet::_NotifyUICollapseCurrent ()");

                fx.wipeOut 
                (
                    {
                        node:       this.fExerciseCurrent.fNodeWorkspace,
                        duration:   250,
                        onEnd:      function () 
                        {
                            _host.fExerciseCurrent.fIsOpen = false;
                            _host.fPreTransitionSequence.NotifyStepFinished ();
                        }
                    }
                ).play ();
            },
            
            _NotifyUIExpandNext: function ()
            {
                var _host = this;
                
                if (gDebug) console.log ("TWorksheet::_NotifyUIExpandNext ()");

                fx.wipeIn 
                (
                    {
                        node:       this.fExerciseNext.fNodeWorkspace,
                        duration:   250,
                        onEnd:      function ()
                        {
                            _host.fExerciseNext.fIsOpen = true;
                            _host.fPreTransitionSequence.NotifyStepFinished ();
                        }
                    }
                ).play ();
            },
            
            _NotifyUIMigrateEditor: function ()
            {
                if (gDebug) console.log ("TWorksheet::_NotifyUIMigrateEditor ()");

                this.fEditor.SetType (this.fExerciseNext.fContentType, this.fExerciseNext.fContentLang);
                domConstruct.place (this.fEditor.domNode, this.fExerciseNext.fNodeWorkspace, "only");
                this.fPreTransitionSequence.NotifyStepFinished ();
            },
            
            _NotifyUIScrollWindow: function ()
            {
                var _host = this;
                
                var yNode;
                var yTarget;

                if (gDebug) console.log ("TWorksheet::_NotifyUIScrollWindow ()");

                yNode       = domGeometry.position (this.fExerciseNext.fNodeWorkspace, false);
                yTarget     = yNode.y - 50;
                wndScroll
                (
                    {
                        target:     {x:0,y:yTarget},
                        win:        window,
                        duration:   500,
                        onEnd:  function ()
                        {
                            _host.fPreTransitionSequence.NotifyStepFinished ();
                        }
                    }
                ).play ();
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
          
 */