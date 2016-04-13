/**
 *  @fileoverview        The state machine controlling the behaviour of a worksheet.
 */
define 
(
    [
        "dojo/_base/declare",
        "courseware/util/validator/TValidatorJSON"
    ],
    function 
    (
        declare,
        JSObjectValidator
    )
    {
        /* Debug flag - for that extra info in hard places! */
        var gDebug = false;
        
        /**
         * The type of action to take with respect to saving the currently open
         * exercise solution.
         * 
         * @enum
         */
        var ESaveAction =
        {
            kNone:                      0,      /* Don't save                   */
            kSave:                      1,      /* Do save                      */
            kSaveConfirm:               2       /* Ask the user whether to save */
        };
        
        /**
         * The central state table. Determines the different states of the 
         * controller, how to go about saving the current solution and what 
         * animations to play on state transitions.
         * 
         * @type        JSON
         */
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
                            this.Handle_Editing_Save ();
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
         * The controller, moderating the behaviour of the worksheet it's associated with.
         * Uses a state machine model.
         * 
         * @class       TController
         */
        TController = 
        {
            /**
             * JSON schema to validate the controller's configuration descriptor.
             *
             * @constant
             * @type        JSON schema
             * @private
             */
            kSchemaParams:
            {
                "$schema":      "http://json-schema.org/draft-03/schema#",
                "title":        "Text window descriptor",
                "description":  "Descriptor for the controller descriptor",
                "type":         "object",
                properties:
                {
                    "fHost":
                    {
                        "description":      "The object hosting this controller",
                        "type":             "object"
                    }
                }
            },

            /* Export enumerators */
            ESaveAction:        ESaveAction,
                
            /**
             * The client hosting this controller.
             * 
             * @type        courseware/gui/TWorksheet/TWorksheet
             * @private
             */
            fHost:              null,
            
            /**
             * Buffers the next expected transition for executing after all 
             * the animations have run.
             * 
             * @type    JSArray
             * @private
             */
            fStack:             null,
            
            /**
             * Stores the ID of the current state.
             * 
             * @type    String
             */
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
            
            /**
             * Returns the transition to be executed next.
             * 
             * @param   {type}      event
             * @returns {JSON}      The transition to execute.
             */
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
                        console.log ("TController::_GetTransition ('" + event + "')");
                        console.log ("Found: " + JSON.stringify (ret));
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
            
            /**
             * cTor.
             * 
             * @param {JSON}    params      The dialog's configuration. Must contain the 
             *                              configuration for the set of buttons. Must 
             *                              conform to {@link TController.kSchemaParams}.
             */
            constructor: function (params)
            {
                if (gDebug) console.log ("TController::constructor ()");        /*[20]  */

                JSObjectValidator.AssertValid (params, this.kSchemaParams, "constructor");
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