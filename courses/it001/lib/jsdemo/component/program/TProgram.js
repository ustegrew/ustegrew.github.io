/**
 * @fileoverview        Public facade to the program's background logic.
 */
define 
(
    [
        "dojo/_base/declare",
        "courseware/util/validator/TValidatorJSON",
        "jsdemo/component/program/api/TDescriptor_Program",
        "jsdemo/component/program/api/TSnapshot",
        "jsdemo/component/program/context/TContext",
        "jsdemo/aux/storage/map/TDictionary"
    ],
    function 
    (
        declare,
        JSObjectValidator,
        TDescriptor,
        TSnapshot,
        TContext,
        TDictionary
    )
    {
        var TProgram;
        var ret;
        
        /**
         * Public API (facade) to the program's background logic. Acts as a bridge between the 
         * background logic and the user.
         * 
         * @class               TProgram
         */
        TProgram =
        {
            /**
             * JS schema for a program description object. We use the courseware/util/validator/TValidatorJSON validator to 
             * perform the actual validation.<br/>
             * Note that global symbols have naming restrictions. A global symbol may only
             * contain word characters or digits andlower or upper case characters or digits...
             * <ul>
             *     <li>Must start with a word character <code>[a-zA-Z]</code>,</li>
             *     <li>followed by zero or more occurences of word characters or digits <code>[a-zA-Z0-9]</code>.</li>
             * </ul>
             * Main reason is that the transition functions run in a custom environment 
             * which has some data members named with a starting underscore, and by using
             * this naming convention we can avoid naming conflicts.
             * 
             * @constant
             * @type        JSObject
             * @private
             */
            kSchemaProgram:
            {
                "$schema":      "http://json-schema.org/draft-03/schema#",
                "title":        "Demo program",
                "description":  "A demo program",
                "type":         "object",
                "properties":
                {
                    "globals":
                    {
                        "description":  "Globals (re variables etc.)",
                        "type":         "object",
                        "properties":
                        {
                            "symbols":
                            {
                                "description":  "Global symbols (Variables)",
                                "type":         "array",
                                "items":
                                {
                                    "description":      "A symbol for a global variable",
                                    "type":             "string",
                                    "pattern":          "^[a-zA-Z][a-zA-Z0-9]*$"
                                }
                            }
                        }
                    },
                    "transitionTable":
                    {
                        "description":  "Table of steps in the program",
                        "type":         "array",
                        "items":
                        {
                            "description":  "A single step in the program",
                            "type":         "object",
                            "properties":
                            {
                                "source":       
                                {
                                    "description":  "The line of source code pertaining to this step (as it appears in the example listing)",
                                    "type":         "string"
                                },
                                "symbols":
                                {
                                    "description":  "A subset of the global symbols that the user might want to see",
                                    "type":         "array",
                                    "items":
                                    {
                                        "type": "string"
                                    }
                                },
                                "comment":
                                {
                                    "description":  "A more detailed explanation of this step",
                                    "type":         "string"
                                },
                                "transition":
                                {
                                    "description":  "The javascript transition function, leading to the next step",
                                    "type":         "function"
                                }
                            }
                        }
                    }
                }
            },
        
            /**
             * Name for empty program.
             * 
             * @type        String
             * @constant
             * @private
             */
            kProgEmptyName:     "nullprog",

            /**
             * Comment message for when no program has been loaded. 
             * 
             * @type        String
             * @constant
             * @private
             */
            kNoSrc:             "No program loaded",

            /**
             * Comment message for when program has completed it's last step. 
             * 
             * @type        String
             * @constant
             * @private
             */
            kPrgFin:            "Program finished",
            
            /**
             * The context in which we run the demo program.
             * 
             * @type        TContext
             * @private
             */
            fContext:       null,
            
            /**
             * The snapshot of the internal state of the program. Used to present the state to clients.
             * 
             * @type        TSnapshot
             * @private
             */
            fSnapshot:      null,

            /**
             * Returns a descriptor holding a jsdemo user program.
             * 
             * @param       {String}                name            Name of the program, e.g. "Example 4".
             * @param       {JSObject}              p               The program to load.
             * @returns     {TDescriptor_Program}   The new descriptor.
             * @public
             */
            CreateDescriptor: function (name, p)
            {
                var ret;
                
                JSObjectValidator.AssertValid (p, this.kSchemaProgram, "TProgram::CreateDescriptor()");
                ret = new TDescriptor (name, p);
                
                return ret;
            },

            /**
             * Navigates the program backwards by one step. Clients can query the internal program 
             * state afterwards by calling {@link TProgram.GetSnapshot}.
             */
            DoNavBackward: function ()
            {
                var isOK;
                
                isOK = this.fContext.Program_DoStepPrevious ();
                if (isOK)
                {
                    this._SetSnapshot ();
                }
            },
            
            /**
             * Navigates the program forwards by one step. Clients can query the internal program 
             * state afterwards by calling {@link TProgram.GetSnapshot}.
             */
            DoNavForward: function ()
            {
                var isOK;
                
                isOK = this.fContext.Program_DoStepNext ();
                if (isOK)
                {
                    this._SetSnapshot ();
                }
            },
            
            /**
             * Navigates the program to the starting point. Clients can query the internal program 
             * state afterwards by calling {@link TProgram.GetSnapshot}.
             */
            DoNavReset: function ()
            {
                var isOK;
                
                isOK = this.fContext.Program_DoReset ();
                if (isOK)
                {
                    this._SetSnapshot ();
                }
            },
            
            /**
             * Returns a snapshot of the internal state of the program.
             * 
             * @return  {TSnapshot}     The snapshot of the program's internal state.
             * @public
             */
            GetSnapshot: function ()
            {
                var ret;                                                        /* TSnapshot                */
                
                ret = new TSnapshot ();
                ret.CopyFrom (this.fSnapshot);
                
                return ret;
            },
            
            /**
             * Load a demo program. This will clear any previously loaded program.
             * 
             * @param   {TDescriptor_Program}   descriptor  A descriptor holding a jsdemo user program.
             * @public
             */
            Load: function (descriptor)
            {
                if (descriptor !== null)
                {
                    this.fContext = new TContext (descriptor);
                }
                else
                {
                    this.fContext = null;
                }
                
                this._SetSnapshot ();
            },
            
            /**
             * Dojo specific cTor.
             */
            constructor: function ()
            {
                this.fContext       = null;
                this.fSnapshot      = new TSnapshot ();
                
                this._SetSnapshot ();
            },
            
            /**
             * Creates a snapshot of the program's current state.
             * 
             * @private 
             */
            _SetSnapshot: function ()                                           /* private void             */
            {
                var i;                                                          /* int                      */
                var n;                                                          /* int                      */
                var line;                                                       /* String                   */
                var lines;                                                      /* TArrayList<String>       */
                var isTerminated;                                               /* boolean                  */
                var src;                                                        /* String                   */
                var comment;                                                    /* String                   */
                
                if (this.fContext === null)
                {
                    this.fSnapshot.fIsTerminated           = false;
                    this.fSnapshot.fCanNavReset            = false;
                    this.fSnapshot.fCanNavStepBackwards    = false;
                    this.fSnapshot.fCanNavStepForwards     = false;
                    this.fSnapshot.fProgramAllSource       = this.kNoSrc;
                    this.fSnapshot.fProgramName            = this.kProgEmptyName;
                    this.fSnapshot.fProgramCurrentComment  = "";
                    this.fSnapshot.fProgramCurrentState    = -1;
                    this.fSnapshot.fProgramCurrentSymbols  = new TDictionary ();
                    this.fSnapshot.fProgramNumLines        = -1;
                }
                else
                {
                    lines = this.fContext.Program_GetAll_SourceLines ();
                    src   = "";
                    n     = lines.GetNumElements ();
                    if (n >= 1)
                    {
                        for (i = 0; i < n; i++)
                        {
                            line    = lines.GetValue_ByIndex (i);
                            src    += line + "\n";
                        }
                    }
                    else
                    {
                        src = this.kNoSrc;
                    }

                    isTerminated                             = this.fContext.Program_Step_IsTerminal ();
                    comment                                  = this.fContext.Program_GetCurrent_Comment ();
                    this.fSnapshot.fProgramAllSource         = src;
                    this.fSnapshot.fProgramName              = this.fContext.Program_GetName ();
                    this.fSnapshot.fProgramNumLines          = n;
                    this.fSnapshot.fIsTerminated             = isTerminated;
                    this.fSnapshot.fCanNavReset              = this.fContext.Program_CanGoBackward ();
                    this.fSnapshot.fCanNavStepBackwards      = this.fContext.Program_CanGoBackward ();
                    this.fSnapshot.fCanNavStepForwards       = this.fContext.Program_CanGoForward ();
                    this.fSnapshot.fProgramCurrentComment    = isTerminated ? this.kPrgFin : comment;
                    this.fSnapshot.fProgramCurrentState      = this.fContext.Program_Step_GetState ();
                    this.fSnapshot.fProgramCurrentSymbols    = this.fContext.Program_GetCurrent_InterestingSymbols ();
                }
            },
            
            /**
             * Sets the current snapshot's comment property.
             * 
             * @param   {String}    comment         The comment to be set.
             */
            _SetSnapshot_Comment: function (comment)
            {
                this.fSnapshot.fProgramCurrentComment = comment;
            }
        };
        
        ret = declare ("TProgram", [], TProgram);
    
        return ret;
    }
);

/*
Example program:

    {
        globals:
            {
                gSymbols:       ["t", "x", "y", "z"],
                gStartState:    0
            },
        transitionTable:
            [
                { // State 0
                    source:             "x = 10;",
                    symbols:            [],
                    comment:            "Set variable <tt>x</tt> to <tt>10</tt> (number: Ten).",
                    transition:
                        function ()
                        {
                            this.x = 10;
                            this.SetState (1, false);
                        }
                },
                { // State 1
                    source:             "t =  \"SomeString\";",
                    symbols:            ["x"],
                    comment:            "Set variable <tt>t</tt> to <tt>\"SomeString\"</tt> (String value).",
                    transition:
                        function ()
                        {
                            this.t = "SomeString";
                            this.SetState (2, false);
                        }
                },
                { // State 2
                    source:             "y = 2 * x * x  +  32;",
                    symbols:            ["x", "t"],
                    comment:            "Compute 2 * x<sup>2</sup> + 32 and assign result to variable <tt>y</tt>.",
                    transition:
                        function ()
                        {
                            this.y = 2 * this.x * this.x + 32;
                            this.SetState (3, false);
                        }
                },
                { // State 3
                    source:             "z = computemyvalue (23);",
                    symbols:            ["x", "t", "y"],
                    comment:            "Call function <tt>computemyvalue</tt>, passing numer <tt>23</tt> as parameter. " +
                                        "Assign return value to variable <tt>z</tt>. Just for argument's sake, assume " +
                                        "<tt>computemyvalue</tt> returns the double of the parameter passed.",
                    transition:
                        function ()
                        {
                            this.z = 46;
                            this.SetState (3, false);
                        }
                },
                { // State 4
                    source:             "// End",
                    symbols:            ["x", "t", "y", "z"],
                    comment:            "Program has finished.",
                    transition:
                        function ()
                        {
                            this.SetState (4, true);;
                        }
                }
            ]
    }

    
        
            
[1]: Variable shadowing

    Regards function local object reference - In this code, is kObj 
    unique for each instantiated object, or is it the same across 
    all objects? 

    function T (n)
    {
        var kObj = this;
        this.n = n;

        this.Dump = function ()
        {
            console.log (this.n);
            console.log (kObj.n);
        };
    }

    var x, y, z;
    x = new T(1);
    y = new T(2);
    z = new T(3);

    x.Dump ();
    y.Dump ();
    z.Dump ();



    If it's the same, we expect the output:
        1
        3
        2
        3
        3
        3

    If it's truly local, we expect the output:
        1
        1
        2
        2
        3
        3

    Result is:
        1
        1
        2
        2
        3
        3

    which is GOOD news! It means we can use this local variable technique 
    to force a constant reference to 'this' in any method, even if methods
    are called from other contexts. We just need to 
        * declare a local variable inside the constructor and set it to 'this'
        * use that local variable in the object's methods, instead of 'this'

    This technique is very useful when calling methods from other contexts,
    e.g. DOM element event handlers, within the dojo framework, ...
 */

