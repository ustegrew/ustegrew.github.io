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
        var TPreTransitionSequence = function (host)
        {
            var kActionSystemFileSave = function (actions)
            {
                console.log ("kActionSystemFileSave");
                this.fHost._NotifySystemFileSave.call (this.fHost, actions);
            };
            
            var kActionSystemControllerEvent = function ()
            {
                console.log ("kActionSystemControllerEvent");
                this.fHost._NotifySystemControllerEvent.call (this.fHost, "kSuccess");
            };
            
            var kActionUICollapseCurrent = function ()
            {
                console.log ("kActionUICollapseCurrent");
                this.fHost._NotifyUICollapseCurrent.call (this.fHost);
            };
            
            var kActionUIExpandNext = function ()
            {
                console.log ("kActionUIExpandNext");
                this.fHost._NotifyUIExpandNext.call (this.fHost);
            };
            
            var kActionUIMigrateEditor = function ()
            {
                console.log ("kActionUIMigrateEditor");
                this.fHost._NotifyUIMigrateEditor.call (this.fHost);
            };
            
            var kActionUIScrollWindow = function ()
            {
                console.log ("kActionUIScrollWindow");
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
                this.fProgram.AddStep (kActionSystemFileSave,               actions);
                
                /* 2. Collapse current exercise or migrate editor. 
                 *    If doExpand is true then we also migrate the editor. */
                doCollapse  = actions.doCollapseCurrent;
                doExpand    = actions.doExpandNext;
                if ((! doCollapse) && (! doExpand))
                {
                    this.fProgram.AddStep (kActionSystemControllerEvent,    null);
                }
                else if ((! doCollapse) && (doExpand))
                {
                    this.fProgram.AddStep (kActionUIMigrateEditor,          null);
                    this.fProgram.AddStep (kActionUIExpandNext,             null);
                    this.fProgram.AddStep (kActionUIScrollWindow,           null);
                    this.fProgram.AddStep (kActionSystemControllerEvent,    null);
                }
                else if ((doCollapse) && (! doExpand))
                {
                    this.fProgram.AddStep (kActionUICollapseCurrent,        null);
                    this.fProgram.AddStep (kActionSystemControllerEvent,    null);
                }
                else if ((doCollapse) && (doExpand))
                {
                    this.fProgram.AddStep (kActionUICollapseCurrent,        null);
                    this.fProgram.AddStep (kActionUIMigrateEditor,          null);
                    this.fProgram.AddStep (kActionUIExpandNext,             null);
                    this.fProgram.AddStep (kActionUIScrollWindow,           null);
                    this.fProgram.AddStep (kActionSystemControllerEvent,    null);
                }

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
                /* Do nothing here, all actions already done. */
            },
            
            /**
             * Event handler: Copy all solutions to the clipboard.
             */
            Handle_Changing_CopyAll: function ()
            {
                this._SystemCopyAllToClipboard (); 
            },
            
            /**
             * Event handler: Open another exercise for editing.
             */
            Handle_Changing_Edit: function ()
            {
                this.fExerciseCurrent = this.fExerciseNext;
                this._SystemFileLoadIntoCurrent ();
            },
            
            /**
             * Event handler: Cancel changing.
             */
            Handle_Changing_Read: function ()
            {
                /* Do nothing here, all actions already done. */
            },
            
            /**
             * Event handler: Save the current answer.
             */
            Handle_Changing_Save: function ()
            {
                /* Do nothing here, all actions already done. */
            },
            
            /**
             * Event handler: Terminate worksheet (e.g. when loading another lesson).
             */
            Handle_Changing_Terminate: function ()
            {
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
                /* Do nothing here, all actions already done. */
            },
            
            /**
             * Event handler: Copy all solutions to the clipboard.
             */
            Handle_Editing_CopyAll: function ()
            {
                this._SystemCopyAllToClipboard ();
            },
            
            /**
             * Event handler: Open another exercise for editing.
             */
            Handle_Editing_Edit: function ()
            {
                this.fExerciseCurrent = this.fExerciseNext;
                this._SystemFileLoadIntoCurrent ();
            },
            
            /**
             * Event handler: Cancel editing.
             */
            Handle_Editing_Read: function ()
            {
                /* Do nothing here, all actions already done. */
            },
            
            /**
             * Event handler: Terminate worksheet.
             */
            Handle_Editing_Terminate: function ()
            {
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
                /* Do nothing here, all actions already done. */
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
                this._SystemCopyAllToClipboard ();
            },
            
            /**
             * Event handler: Open an exercise for editing.
             */
            Handle_Reading_Edit: function ()
            {
                this.fExerciseCurrent = this.fExerciseNext;
                this._SystemFileLoadIntoCurrent ();
            },
            
            /**
             * Event handler: Terminate worksheet.
             */
            Handle_Reading_Terminate: function ()
            {
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
                this.fPreTransitionSequence.Run (actions);
            },
            
            /**
             * Dojo specific cTor.
             */
            constructor: function (params)
            {
                this.fHost                      = params.fHost;
                this.fHandlers                  = {onLoad: params.onLoad};

                this.fController                = new TController ({fHost: this});
                this.fModel                     = new TModel ();
                this.fEditor                    = null;
                this.fDlgDoSaveConfirm          = null;
                this.fExerciseCurrent           = null;
                this.fExerciseNext              = null;
                this.fPreTransitionSequence     = new TPreTransitionSequence (this);
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
                            fHost:      window,
                            fWidth:     "745px",                                /* [20] */
                            fHeight:    "480px",                                /* [20] */
                            onCancel:   function () {_host._NotifySystemControllerEvent.call (_host, "kRead"     );},
                            onChange:   function () {_host._NotifySystemControllerEvent.call (_host, "kChange"   );},
                            /* onLoad:     function () {_host._NotifySystemControllerEvent.call (_host, "kEdit"     );}, disabled -> seems unecessary*/
                            onLoad:     function () {},
                            onSave:     function () {_host._NotifySystemControllerEvent.call (_host, "kSave"     );},
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
                        objExercise.fTextQuestion           = ndeExercise.innerHTML;
                        objExercise.fTextSolution           = this._SystemFileLoadText (ndeProps.id);
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
                                onClick: function () 
                                {
                                    _host.fExerciseNext = _host.fModel.GetByID (this.exerciseUID);
                                    _host._NotifySystemControllerEvent.call (_host, "kEdit");
                                }
                            }
                        )
                        objExercise.fObjButton.startup ();
                        this.fModel.Register (objExercise);
                        
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
                this.fController.Notify.call (this.fController, event);
            },
            
            _NotifySystemFileSave: function (actions)
            {
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
                    console.log ("_NotifySystemFileSave (kNoAction)");
                    this.fPreTransitionSequence.NotifyStepFinished ();
                }
            },
            
            _NotifySystemFileSaveAborted: function ()
            {
                console.log ("_NotifySystemFileSaveAborted");
                this.fPreTransitionSequence.NotifyStepFinished ();
            },
            
            _NotifySystemFileSaveConfirmed: function ()
            {
                console.log ("_NotifySystemFileSaveConfirmed");
                this._SystemFileSave ();
                this.fPreTransitionSequence.NotifyStepFinished ();
            },
            
            _NotifyUICollapseCurrent: function ()
            {
                var _host = this;
                
                fx.wipeOut 
                (
                    {
                        node:       this.fExerciseCurrent.fNodeWorkspace,
                        duration:   100,
                        onEnd:      function () 
                        {
                            _host.fPreTransitionSequence.NotifyStepFinished ();
                        }
                    }
                ).play ();
            },
            
            _NotifyUIExpandNext: function ()
            {
                var _host = this;
                
                fx.wipeIn 
                (
                    {
                        node:       this.fExerciseNext.fNodeWorkspace,
                        duration:   100,
                        onEnd:      function ()
                        {
                            _host.fPreTransitionSequence.NotifyStepFinished ();
                        }
                    }
                ).play ();
            },
            
            _NotifyUIMigrateEditor: function ()
            {
                this.fEditor.SetType (this.fExerciseNext.fContentType, this.fExerciseNext.fContentLang);
                domConstruct.place (this.fEditor.domNode, this.fExerciseNext.fNodeWorkspace, "only");
                this.fPreTransitionSequence.NotifyStepFinished ();
            },
            
            _NotifyUIScrollWindow: function ()
            {
                var _host = this;
                
                var yNode;
                var yTarget;

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
                /* TODO: Develop (How do they do it on Github?) */
            },
            
            _SystemFileLoadIntoCurrent: function ()
            {
                var content;
                
                content                                 = this._SystemFileLoadText (this.fExerciseCurrent.fID);
                this.fExerciseCurrent.fTextSolution     = content;
                this.fEditor.SetContent         (content);
                this.fEditor.ClearFlagChanged   ();
            },

            _SystemFileLoadText: function (exerciseID)
            {
                return "This is a dummy text"; /* TODO */
            },
            
            _SystemFileSave: function ()
            {
                var content;
                
                content                             = this.fEditor.GetContent ();
                this.fExerciseCurrent.fTextSolution = content;
// TODO               this.fHost.Save (this.fExerciseCurrent.fID, content);
                this.fEditor.ClearFlagChanged ();
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

 [50]: Tests whether current exercise is an empty one - which means that it's the
       first exercise the user opens since the hosting web page has been loaded.
       Any exercise opened after the first one will have the fIsNullObject property 
       set to false.

 [60]: The TController calls each event handler with this TWorksheet instance as context - therefore, 
       in all event handlers we can use the 'this' reference to refer to this TWorksheet instance.
          
 */