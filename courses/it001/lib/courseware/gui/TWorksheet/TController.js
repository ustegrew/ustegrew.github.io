/**
 *  @fileoverview        Insert_here
 */
define 
(
    [
        "dojo/_base/declare"
    ],
    function 
    (
        declare
    )
    {
        /* Debug flag - for that extra info in hard places! */
        var gDebug = true;
        
        var ESaveAction =
        {
            kNone:                      0,
            kSave:                      1,
            kSaveConfirm:               2
        };
        
        var gkStateTable =                                                      /* [10] */
        {   
            /* Worksheet just constructed */
            kNull:
            {   
                id: "kNull",
                transitions:
                [
                    {   /* Notify: Worksheet started (i.e. load finished, ready to use). */
                        event:                  "kStart",
                        stateNext:              "kReading",
                        actions:
                        {
                            saveAction:         ESaveAction.kNone,
                            doCollapseCurrent:  false,
                            doExpandNext:       false
                        },
                        handler: function ()
                        {
                            this.Handle_Null_Start ();
                        }
                    }
                ]
            },
            
            /* Reader mode: Student is just reading the exercise sheet, i.e. all exercises collapsed, user can see questions only. */
            kReading:
            {   
                id: "kReading",
                transitions:
                [
                    {   /* Copy all solutions to the clipboard. */
                        event:                  "kCopyAll",
                        stateNext:              "kReading",
                        actions:
                        {
                            saveAction:         ESaveAction.kNone,
                            doCollapseCurrent:  false,
                            doExpandNext:       false
                        },
                        handler: function ()
                        {
                            this.Handle_Reading_CopyAll ();
                        }
                    },
                    {   /* Open an exercise for editing. */
                        event:                  "kEdit",
                        stateNext:              "kEditing",
                        actions:
                        {
                            saveAction:         ESaveAction.kNone,
                            doCollapseCurrent:  false,
                            doExpandNext:       true
                        },
                        handler: function (exerciseID)
                        {
                            this.Handle_Reading_Edit (exerciseID);
                        }
                    },
                    {   /* Terminate worksheet. */
                        event:                  "kTerminate",
                        stateNext:              "kTerminated",
                        actions:
                        {
                            saveAction:         ESaveAction.kNone,
                            doCollapseCurrent:  false,
                            doExpandNext:       false
                        },
                        handler:    function ()
                        {
                            this.Handle_Reading_Terminate ();
                        }
                    }
                ]
            },
            
            /* Editing mode: User is editing a particular exercise, but has not typed any characters into the editor panel since the last save. */
            kEditing:
            {   
                id: "kEditing",
                transitions:
                [
                    {   /* User changed the current answer, i.e. typed something into the current answer's editor panel. */
                        event:                  "kChange",
                        stateNext:              "kChanging",
                        actions:
                        {
                            saveAction:         ESaveAction.kNone,
                            doCollapseCurrent:  false,
                            doExpandNext:       false
                        },
                        handler:    function ()
                        {
                            this.Handle_Editing_Change ();
                        }
                    },
                    {   /* Copy all solutions to the clipboard. */
                        event:                  "kCopyAll",
                        stateNext:              "kReading",
                        actions:
                        {
                            saveAction:         ESaveAction.kNone,
                            doCollapseCurrent:  true,
                            doExpandNext:       false
                        },
                        handler: function ()
                        {
                            this.Handle_Editing_CopyAll ();
                        }
                    },
                    {   /* Open another exercise for editing. */
                        event:                  "kEdit",
                        stateNext:              "kEditing",
                        actions:
                        {
                            saveAction:         ESaveAction.kNone,
                            doCollapseCurrent:  true,
                            doExpandNext:       true
                        },
                        handler:    function (exerciseID)
                        {
                            this.Handle_Editing_Edit (exerciseID);
                        }
                    },
                    {   /* Cancel editing. */
                        event:                  "kRead",
                        stateNext:              "kReading",
                        actions:
                        {
                            saveAction:         ESaveAction.kNone,
                            doCollapseCurrent:  true,
                            doExpandNext:       false
                        },
                        handler:    function ()
                        {
                            this.Handle_Editing_Read ();
                        }
                    },
                    {   /* Terminate worksheet. */
                        event:                  "kTerminate",
                        stateNext:              "kTerminated",
                        actions:
                        {
                            saveAction:         ESaveAction.kNone,
                            doCollapseCurrent:  true,
                            doExpandNext:       false
                        },
                        handler:    function ()
                        {
                            this.Handle_Editing_Terminate ();
                        }
                    }
                ]
            },
            
            /* Change mode: User has done changes to the text in the current exercise's editor panel, and has not saved the exercise yet. */
            kChanging:
            {   
                id: "kChanging",
                transitions:
                [
                    {   /* User changed the current answer, i.e. typed something into the current answer's editor panel. */
                        event:                  "kChange",
                        stateNext:              "kChanging",
                        actions:
                        {
                            saveAction:         ESaveAction.kNone,
                            doCollapseCurrent:  false,
                            doExpandNext:       false
                        },
                        handler:    function ()
                        {
                            this.Handle_Changing_Change ();
                        }
                    },
                    {   /* Copy all solutions to the clipboard. */
                        event:                  "kCopyAll",
                        stateNext:              "kReading",
                        actions:
                        {
                            saveAction:         ESaveAction.kSaveConfirm,
                            doCollapseCurrent:  true,
                            doExpandNext:       false
                        },
                        handler: function ()
                        {
                            this.Handle_Changing_CopyAll ();
                        }
                    },
                    {   /* Open another exercise for editing. */
                        event:                  "kEdit",
                        stateNext:              "kEditing",
                        actions:
                        {
                            saveAction:         ESaveAction.kSaveConfirm,
                            doCollapseCurrent:  true,
                            doExpandNext:       true
                        },
                        handler:    function (exerciseID)
                        {
                            this.Handle_Changing_Edit (exerciseID);
                        }
                    },
                    {   /* Cancel changing. User will have to confirm whether (s)he would like to save. */
                        event:                  "kRead",
                        stateNext:              "kReading",
                        actions:
                        {
                            saveAction:         ESaveAction.kSaveConfirm,
                            doCollapseCurrent:  true,
                            doExpandNext:       false
                        },
                        handler:    function ()
                        {
                            this.Handle_Changing_Read ();
                        }
                    },
                    {   /* Save the current answer. */
                        event:                  "kSave",
                        stateNext:              "kEditing",
                        actions:
                        {
                            saveAction:         ESaveAction.kSave,
                            doCollapseCurrent:  false,
                            doExpandNext:       false
                        },
                        handler:    function ()
                        {
                            this.Handle_Changing_Save ();
                        }
                    },
                    {   /* Terminate worksheet. */
                        event:                  "kTerminate",
                        stateNext:              "kTerminated",
                        actions:
                        {
                            saveAction:         ESaveAction.kSaveConfirm,
                            doCollapseCurrent:  true,
                            doExpandNext:       false
                        },
                        handler:    function ()
                        {
                            this.Handle_Changing_Terminate ();
                        }
                    }
                ]
            },
            
            /* Worksheet has been terminated (e.g. user loaded another lesson). */
            kTerminated:
            {   
                id: "kTerminated",
                transitions:
                [
                ]
            },
        };
        
        var TController;
        var ret;

        /**
         * On the worksheet all animations and other things) happen asynchronously. e.g. when 
         * calling an animation function the call returns immediately, but the actual animation
         * will complete at some unspecified time in the future.  However, We have to enforce 
         * some sort of order in which everything unfolds:
         *  
         * 1. Receive incoming event, e.g. "kEdit". This event must be scheduled for later (stack). 
         * 2. Call pre-handling. This will execute all worksheet animations, e.g. on current exercise, collapse 
         *    editor, then migrate editor, then expand next exercise.
         * 3. Once all pre-handling operations have finished, we receive a "kSuccess" event.
         * 4. We retrieve pre-scheduled events back from storage and handle them. 
         * 
         * @class       TChangeToClassName
         */
        TController = 
        {
            /* Export enumerators */
            ESaveAction:        ESaveAction,
                
            fHost:              null,
            fStack:             null,
            fState:             null,
        
            /**
             * For the given event, executes state transition. Transition is executed in several steps:
             * 
             * 1. Worksheet executes pre transition actions (Save current exercise, collapse current solution etc.).
             * 2. Worksheet sends "kSuccess" notification.
             * 3. Now perform the transition. This also calls any worksheet specific handler.
             */
            Notify: function (event)
            {
                var t
                
                if (gDebug)                                            /* [20] */
                    {console.log ("TController::Notify ('" + event + "')");}

                /* It can be confusing, but for each transition the 'else' branch executes first.
                 * Once all the pre transition actions have completed, the worksheet will send
                 * a 'kSuccess' notification which will be handled in the TRUE branch of the 
                 * if statement. */
                if (event === "kSuccess")
                {
                    /* Worksheet has finished animation actions. */
                    /* We get our schedule transition back from the stack */
                    t = this.fStack.pop ();
                    
                    if (gDebug)                                        /* [20] */
                        {console.log ("TController::Notify ('" + event + "'): " + this.fState + " [" + event + "] -> " + t.stateNext);}

                    /* Now execute transition */
                    this.fState = t.stateNext;
                    t.handler.call (this.fHost);                            /* [10] */
                }
                else
                {
                    /* Schedule transition on stack. Will be handled after animations have completed. */
                    t = this._GetTransition (event);
                    this.fStack.push (t);
                    
                    if (gDebug)                                        /* [20] */
                        {console.log ("TController::Notify ('" + event + "'): Executing pre transition actions");}

                    /* Now execute all animation actions. When they have completed, 
                     * we will receive a "kSuccess" notification */
                    this.fHost.NotifyPreTransitionActions (t.actions);                    
                }
            },
            
            _GetTransition: function (event)
            {
                var params;
                var stP;
                var st;
                var iNSt;
                var nNSt;
                var trans;
                var foundEvent;
                var ret;
                
                params              = (typeof args != 'undefined') ? args : null;
                st                  = gkStateTable [this.fState];
                nNSt                = st.transitions.length;
                foundEvent          = false;
                ret                 = null;
                if (nNSt >= 1)
                {
                    for (iNSt = 0; ((iNSt < nNSt) && (! foundEvent)); iNSt++)
                    {
                        trans = st.transitions [iNSt];
                        if (! foundEvent)
                        {
                            if (trans.event == event)
                            {
                                foundEvent  = true;
                                ret         = trans;
                            }
                        }
                    }
                }

                if (foundEvent)
                {
                    if (gDebug)
                    {
                        console.groupCollapsed ("TController::_GetTransition ('" + event + "')");
                        console.log ("Found: " + JSON.stringify (ret));
                        console.groupEnd ();
                    };
                }
                else
                {
                    console.log 
                    (
                        "TController::_GetTransition ('" + event + "'): Invalid transition: " + this.fState + " [" + event + "]"
                    );
                }
                
                return ret;
            },
            
            constructor: function (params)
            {
                this.fHost  = params.fHost;
                this.fState = "kNull";
                this.fStack = [];
            },
        };
    
        ret = declare ("TController", [], TController);
    
        return ret;
    }
);

/*

[10]    Each handler function is called within the context of the hosting TWorksheet object.
        Therefore the 'this' reference within each handler refers to the hosting TWorksheet 
        object, not this TController object.
        
[20]    Hate this compressed code formatting - but it makes other code more readable.
*/