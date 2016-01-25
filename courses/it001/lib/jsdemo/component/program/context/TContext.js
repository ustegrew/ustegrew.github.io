/**
 * @fileoverview        Program running environment.
 */
define 
(
    [
        "dojo/_base/declare",
        "jsdemo/aux/storage/list/TArrayList",
        "jsdemo/aux/storage/list/TStack",
        "jsdemo/aux/storage/map/TDictionary",
        "jsdemo/component/program/context/TScope",
        "jsdemo/component/program/statemachine/TStateMachine"
    ],
    function 
    (
        declare,
        TArrayList,
        TStack,
        TDictionary,
        TScope,
        TStateMachine
    )
    {
        var TContext;
        var ret;

        /**
         * Environment in which we run a demo program. This is the umbrella class which holds all the 
         * resp. background components together and provides a unified interface to the {@link TProgram} 
         * API bridge.
         *
         * @class   TContext
         */
        TContext = 
        {
            /**
             * The program's name
             *
             * @type            String
             * @private
             */
            fName:              null,
            
            /**
             * The action logic, modelling the behavior of the demo program.
             * 
             * @type            TStateMachine
             * @private
             */
            fStateMachine:      null,
            
            /**
             * The current data storage. Keeps all data needed by the user program and 
             * holds the ID of the current state. [footnote]
             * 
             * @type            TScope
             * @private
             */
            fScope:             null,
            
            /**
             * Data scope stack [footnote].
             *
             * @type            TStack &lt;TScope&gt;
             * @private
             */
            fStack:             null,
            
            /**
             * Capabilities flag. If <code>true</code> the program can be navigated 
             * backwards. [footnote]
             *
             * @type            boolean
             * @private
             */
            fCan_GoBackward:    false,
            
            /**
             * Capabilities flag. If <code>true</code> the program can be navigated 
             * forwards. [footnote]
             *
             * @type            boolean
             * @private
             */
            fCan_GoForward:     false,
            
            /**
             * Returns <code>true</code> if the program can be navigated backwards,
             * <code>false</code> otherwise.
             * 
             * @return          {boolean}       <code>true</code> if the program can be navigated backwards,
             *                                  <code>false</code> otherwise.
             * @public
             */            
            Program_CanGoBackward: function ()
            {
                return this.fCan_GoBackward;
            },
            
            /**
             * Returns <code>true</code> if the program can be navigated forwards,
             * <code>false</code> otherwise.
             * 
             * @return          {boolean}       <code>true</code> if the program can be navigated forwards,
             *                                  <code>false</code> otherwise.
             * @public
             */            
            Program_CanGoForward: function ()
            {
                return this.fCan_GoForward;
            },
            
            /**
             * Resets the program to start state (step #0).
             * 
             * @return {boolean}    <code>true</code>   if the operation succeeded,
             *                      <code>false</code>  if we weren't able to reset the program.
             * @public
             */
            Program_DoReset: function ()
            {
                var ret;                                                        /* boolean                  */
                
                ret = this.fCan_GoBackward;                                     /* [footnote] */
                if (this.fCan_GoBackward)
                {
                    /* Get and activate scope from first position on the stack */
                    this.fScope = this.fStack.GetFirstElement ();
                    
                    /* Clear the stack */
                    this.fStack.Clear ();
                    
                    /* Reset state machine */
                    this.fStateMachine.SetCurrent_State (0);
                    
                    /* Refresh capabilities flags */
                    this._SetCapabilities ();
                }
                else
                {
                    this._Log ("Can't reset program.");
                }

                return ret;
            },
            
            /**
             * Navigates the program forwards by one step.
             *
             * @return {boolean}    <code>true</code>   if the operation succeeded,
             *                      <code>false</code>  if we weren't able to execute the next step in the program.
             * @public
             */
            Program_DoStepNext: function ()
            {
                var stCur;                                                      /* int                      */
                var sc;                                                         /* TScope                   */
                var trFunc;                                                     /* JS_Function              */
                var scrCtx;                                                     /* JS Object                */
                var ret;                                                        /* boolean                  */
                
                ret = this.fCan_GoForward;
                if (this.fCan_GoForward)
                {
                    /* -------------------------------------------------------- */
                    /* 1. Push copy of present scope onto the stack.            */
                    /* -------------------------------------------------------- */
                    sc = new TScope (null);
                    sc.CopyFrom (this.fScope);
                    this.fStack.Push (sc);
                    
                    /* -------------------------------------------------------- */
                    /* 2. Run transition function within a synthetic context    */
                    /* -------------------------------------------------------- */
                    /* 2.1. Set up synthetic context                            */
                    scrCtx =
                    {
                        globals:    {},
                        exec:       {}
                    };
                    scrCtx.globals              = this.fScope.GetGlobals_AsJSObject ();
                    scrCtx.globals._exec        = scrCtx.exec;
                    scrCtx.globals._SetState    = function (stateNext, isTerminal) 
                    {
                        this._exec.state        = stateNext,
                        this._exec.isTerminal   = isTerminal;
                    };
                    scrCtx.exec.state           = this.fScope.GetState          ();
                    scrCtx.exec.isTerminal      = this.fScope.IsTerminal        ();
                    
                    /* 2.2. Run transition function in synthetic environment        */
                    trFunc = this.fStateMachine.GetCurrent_TransitionFunction ();
                    trFunc.call (scrCtx.globals);                               /* [footnote]               */
                    
                    /* 2.3. Copy synthetic context back into scope.             */
                    /* 2.3.1. Reduce the globals member to contain data only.   */
                    delete scrCtx.globals._exec;
                    delete scrCtx.globals._SetState;

                    /* 2.3.2. Now copy what's left back into scope.             */
                    this.fScope.SetGlobals_FromJSObject (scrCtx.globals         );
                    this.fScope.SetState            (scrCtx.exec.state      );
                    this.fScope.SetIsTerminal       (scrCtx.exec.isTerminal );
                    
                    /* -------------------------------------------------------- */
                    /* 3. Set state in state machine                            */
                    /* -------------------------------------------------------- */
                    stCur = this.fScope.GetState ();
                    this.fStateMachine.SetCurrent_State (stCur);
                    
                    /* -------------------------------------------------------- */
                    /* 4. Refresh capabilities flags */
                    /* -------------------------------------------------------- */
                    this._SetCapabilities ();
                }
                else
                {
                    this._Log ("Can't do next step.");
                }
                
                return ret;
            },
            
            /**
             * Navigates the program backwards by one step.
             *
             * @return {boolean}    <code>true</code>   if the operation succeeded,
             *                      <code>false</code>  if we weren't able to execute the previous step in the program.
             * @public
             */
            Program_DoStepPrevious: function ()
            {
                var stCur;                                                      /* int                      */
                var ret;                                                        /* boolean                  */
                
                ret = this.fCan_GoBackward;
                if (this.fCan_GoBackward)
                {
                    /* Pop latest scope off the stack and activate it. */
                    this.fScope = this.fStack.Pop ();
                    
                    /* Set State in state machine */
                    stCur = this.fScope.GetState ();
                    this.fStateMachine.SetCurrent_State (stCur);
                    
                    /* Refresh capabilities flags */
                    this._SetCapabilities ();
                }
                else
                {
                    this._Log ("Can't do previous step.");
                }
                
                return ret;
            },
            
            /**
             * Returns the entire source code of the demo program as an indexed list of lines. First
             * line has index 0 (zero).
             * 
             * @return          {TArrayList &lt;String&gt;}         The source code lines of the demo program in question.
             * @public
             */            
            Program_GetAll_SourceLines: function ()
            {
                var ret;                                                        /* TArrayList<String>       */
                
                ret = this.fStateMachine.GetAll_SourceLines ();
                
                return ret;
            },

            /**
             * Returns the explanatory comment giving details about the current step.
             * 
             * @return          {String}        The explanatory comment.
             * @public
             */            
            Program_GetCurrent_Comment: function ()
            {
                var ret;                                                        /* String                   */
                
                ret = this.fStateMachine.GetCurrent_Comment ();
                
                return ret;
            },
            
            /**
             * Returns the variables the user might be interested to inspect in the current step.
             * 
             * @return          {TDictionary}       The currently interesting variables.
             * @public
             */            
            Program_GetCurrent_InterestingSymbols: function ()
            {
                var i;                                                          /* int                      */
                var n;                                                          /* int                      */
                var symbols;                                                    /* TArrayList<String>       */
                var k;                                                          /* String                   */
                var v;                                                          /* Any                      */
                var ret;                                                        /* TDictionary              */
                
                ret         = new TDictionary ();
                symbols     = this.fStateMachine.GetCurrent_InterestingSymbols ();
                ret.Declare (symbols);
                
                n = symbols.GetNumElements ();
                if (n >= 1)
                {
                    for (i = 0; i < n; i++)
                    {
                        k = symbols.GetValue_ByIndex (i);
                        v = this.fScope.GetGlobals_Value_ByKey (k);
                        ret.SetValue_ByKey (k, v);
                    }
                }
                
                return ret;
            },
            
            /**
             * Returns the line of source code of the current step.
             * 
             * @return          {String}        The current line of source code.
             * @public
             */            
            Program_GetCurrent_Source: function ()
            {
                var ret;                                                        /* String                   */

                ret = this.fStateMachine.GetCurrent_Source ();

                return ret;
            },
            
            /**
             * Returns the program's name.
             * 
             * @returns {String}    The program's name
             */
            Program_GetName: function ()
            {
                return this.fName;
            },
            
            /**
             * Returns the ID of the current step. This corresponds to the line number of the demo
             * program's source code. Step ID's and line numbers always map as:
             * 
             * <ul>
             *     <li>Step <code>0</code>: Line <code>1</code></li>
             *     <li>Step <code>1</code>: Line <code>2</code></li>
             *     <li>...</li>
             *     <li>Step <code>n-1</code>: Line <code>n</code></li>
             * </ul>
             *
             * Where <code>n</code> is the number of steps (hence, number of lines of source code) in the demo program.
             * 
             * @return          {int}       The current step ID.
             * @public
             */            
            Program_Step_GetState: function ()
            {
                var ret;                                                        /* int                      */
                
                ret = this.fScope.GetState ();
                
                return ret;
            },
            
            /**
             * Returns <code>true</code> if the program has executed a final step, (thus
             * being in a terminal state), <code>false</code> otherwise.
             * 
             * @return          {boolean}       <code>true</code> if the program has terminated,
             *                                  <code>false</code> otherwise.
             * @public
             */            
            Program_Step_IsTerminal: function ()
            {
                var ret;                                                        /* boolean                  */

                ret = this.fScope.IsTerminal ();

                return ret;
            },
            
            /**
             * Returns the key (symbol) of global variable #<code>i</code>.
             * 
             * @param           {int}       i   Zero based index of queried variable.
             * @return          {String}        The key of global variable #<code>i</code>.
             * @public
             */            
            Scope_GetGlobals_Key: function (i)
            {
                var ret;                                                        /* String                   */

                ret = this.fScope.GetGlobals_Key (i);

                return ret;
            },
            
            /**
             * Returns the number of declared variables in the program.
             * 
             * @return          {int}           The number of declared variables.
             * @public
             */            
            Scope_GetGlobals_NumEntries: function ()
            {
                var ret;                                                        /* int                      */

                ret = this.fScope.GetGlobals_NumEntries ();

                return ret;
            },
            
            /**
             * Returns the value of variable #<code>i</code>.
             * 
             * @param           {int}   i   Zero based index of queried variable.
             * @return          {Any}       The value of variable #<code>i</code>.
             * @public
             */            
            Scope_GetGlobals_Value_ByIndex: function (i)
            {
                var ret;                                                        /* Any                      */

                ret = this.fScope.GetGlobals_Value_ByIndex (i);

                return ret;
            },
            
            /**
             * Returns the value of variable with the given key <code>k</code>.
             * 
             * @param           {String}    k   Key of queried variable.
             * @return          {Any}           The value of variable <code>[k]</code>.
             * @public
             */            
            Scope_GetGlobals_Value_ByKey: function (k)
            {
                var ret;                                                        /* Any                      */

                ret = this.fScope.GetGlobals_Value_ByKey (k);

                return ret;
            },
            
            /**
             * Sets the value of the variable with the given key <code>k</code> to the given value <code>v</code>.
             * 
             * @param   {String}    k           Key of variable we set.
             * @param   {Any}       v           Value we set the variable to.
             * @public
             */            
            Scope_SetGlobals_Value: function (k, v)
            {
                this.fScope.SetGlobals_Value (k, v);
            },

            /**
             * Dojo specific cTor. Creates a new context, loading the given program.
             *
             * @param           {TDescriptor_Program}      program         The program to load.
             */
            constructor: function (program)
            {
                var i;                                                          /* int                      */
                var n;                                                          /* int                      */
                var s;                                                          /* TDescriptor_Step         */
                var symList;                                                    /* TArrayList<String>       */
                var stpList;                                                    /* TArrayList<TDescriptor_Step> */
                var dict;                                                       /* TDictionary              */
                var iState;                                                     /* int                      */
                
                symList                 = program.GetVariables  ();
                dict                    = new TDictionary       ();
                dict.Declare (symList);
                
                this.fName             = program.GetName       ();
                this.fStack            = new TStack            ();
                this.fScope            = new TScope            (dict);
                this.fStateMachine     = new TStateMachine     ();
                
                stpList = program.GetSteps          ();
                n       = stpList.GetNumElements    ();
                if (n >= 1)
                {
                    for (i = 0; i < n; i++)
                    {
                        s       = stpList.GetValue_ByIndex (i);
                        symList = new TArrayList ();
                        symList.AddFromArray (s.fInterestingSymbols);
                        this.fStateMachine.AddInstruction 
                        (
                            s.fDemoSource,
                            s.fComment,
                            s.fTransitionFunction,
                            symList
                        );
                    }
                }
                
                this._SetCapabilities ();
                iState =  (n >= 1) ?  0 : -1;
                this.fStateMachine.SetCurrent_State (iState);
            },
            
            /**
             * Logs the given message to the web browser's console.
             *
             * @param       {String}        msg             The message to log.
             * @private
             */
            _Log: function (msg)
            {
                console.log ("TContext: " + msg);
            },

            /**
             * Sets the various capability flags.
             *
             * @private
             */
            _SetCapabilities: function ()
            {
                var nStack;                                                     /* int                      */
                var sCurrent;                                                   /* int                      */
                var nSteps;                                                     /* int                      */

                nStack      = this.fStack.GetNumElements ();
                nSteps      = this.fStateMachine.GetNumStates ();
                sCurrent    = this.fStateMachine.GetCurrent_State ();

                this.fCan_GoBackward =
                (
                    (nSteps   >= 1)  /* The state machine should have at least one state         */
                 && (nStack   >= 1)  /* There needs to be at least one element on the stack      */  
                 && (sCurrent >= 1)  /* Program pointer must be beyond the first state (# 0)     */
                );

                this.fCan_GoForward = ! (this.fScope.IsTerminal ());
            }
        };
    
        ret = declare ("TContext", [], TContext);
    
        return ret;
    }
);

/*
---------------------------------- 
    [fScope: null]
        As we keep all the program's current data and state in a single container we can
        use a stack to backtrack the demo program, thus enabling the user to 
        navigate backwards.
    [fStack: null]
        We use a stack, so we can step backwards in the demo program. 

    [fCan_GoBackward: false]
    [fCan_GoForward:  false]
        We store capabilities as flags. These are set centrally, whenever 
        a major event happens (e.g. 'user steps forward').
    
    [ret = this.fCan_...]
        We have to store the capability flag before executing the actual step,
        because executing the step has side effects on the capability flags.
    
    [trFunc.call (scrCtx.globals)]
        We run the transition function in the context of the synthetic environment
        we set up.
 */
