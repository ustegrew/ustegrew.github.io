/**
 * @fileoverview        State machine
 */
define 
(
    [
        "dojo/_base/declare",
        "jsdemo/component/program/statemachine/TState",
        "jsdemo/aux/storage/list/TArrayList"
    ],
    function 
    (
        declare,
        TState,
        TArrayList
    )
    {
        var TStateMachine;
        var ret;

        /**
         * State machine. We use a finite state machine to model the demo
         * program's execution flow, and each step in the program has a 
         * corresponding state here.<br/>
         * Prior to running a program, it has to be committed to storage,
         * step by step. Clients do this by calling 
         * {@link TStateMachine.AddInstruction} for each program step. 
         * Upon committing a step, it will be stored as a state within 
         * the state machine. A state is defined as a 4-tuple with the elements:
         * 
         * <dl>
         *     <dt>Source</dt>
         *         <dd>The resp. line of Javascript code as shown in the corresponding example.</dd>
         *     <dt>Comment</dt>
         *         <dd>A comment explaining the resp. step.</dd>
         *     <dt>Transition function</dt>
         *         <dd>A Javascript function, executed in the background by the JSDemo framework. 
         *             The Javascript function sets the internal variables and ID for the
         *             next state. This provides the behaviour of the inspected program.</dd>
         *     <dt>Interesting symbols</dt>
         *         <dd>A list variables that the student might be interested to see after the transition 
         *             function has executed.</dd>
         * </dl>
         *
         * Whilst the program is running, the JSDemo framework walks the execution path as determined by 
         * the stored transition functions. Each transition function is responsible to set the ID of the 
         * next state to be visited. We just use ordinary Javascript functions; it is overkill to design 
         * a separate execution framework. Instead we provide a minimal enviroment for the functions, with
         * simple access to the program's global variables via <i>this</i> reference 
         * (<code>this.&lt;variable&gt;</code>) and one function to set the next state 
         * (<code>this._SetState (id, isterminal)</code>). This small environment will be set up dynamically
         * whilst the program is running. All this is happening in the {@link TContext} class.
         *
         * <br/>TODO: Code to generate setup of enviroment for javascript transition function.
         *  
         * @class               TStateMachine
         * @see                 TState
         * @see                 TContext
         */
        TStateMachine = 
        {
            /**
             * List of source code lines of the program.
             * 
             * @type        TArrayList &lt;{@link String}&gt;
             * @private
             */
            fSourceCodeAll:     null,                                           /* private TArrayList<String>       */
            
            /**
             * Index to the state we currently look at. 
             * 
             * @type        int
             * @private
             */
            fStateCurrentID:      null,                                         /* private int                      */

            /**
             * The current state object (4-tuple)
             * 
             * @type        TState
             * @private
             */
            fStateCurrentTuple:    null,

            /**
             * List of all states (program steps).
             * 
             * @type        TArrayList &lt;{@link TState}&gt;
             * @private
             */
            fStates:            null,                                           /* private TArrayList <TState>      */

            /**
             * Commits a state (step) to the storage. 
             * 
             * @param       {String}                        source              The line of source code as shown in the example.
             * @param       {String}                        comment             An explanatory comment.
             * @param       {[Function]}                    transFunc           A Javascript function, executed behind the scenes.
             * @param       {TArrayList &lt;String&gt;}     interestingSymbols  Names of interesting variables (symbols) at this current state.
             * @public
             */
            AddInstruction: function
            (
                source,
                comment,
                transFunc,
                interestingSymbols
            )
            {
                var st;                                                         /* TState                           */
                
                st = new TState (source, comment, transFunc, interestingSymbols);
                this.fStates.Add (st);
                this.fSourceCodeAll.Add (source);
            },
           
            /**
             * Returns all source code lines of the demo program as an indexed list.
             * 
             * @return      {TArrayList &lt;String&gt;}                         All source code lines of the demo program.
             * @public
             */
            GetAll_SourceLines: function ()
            {
                var ret;                                                        /* TArrayList<String>               */
                
                ret = new TArrayList ();
                ret.AddFromArrayList (this.fSourceCodeAll);
                
                return ret;
            },
           
            /**
             * Returns the explanatory comment for the current state (step).
             * 
             * @return      {String}                                            Explanatory comment for the current state.
             * @public
             */
            GetCurrent_Comment: function ()
            {
                var s;                                                          /* TState                           */
                var ret;                                                        /* String                           */
               
                s   = this._GetCurrentState ();
                ret = s.GetComment ();
               
                return ret;
            },
           
            /**
             * Returns the names of interesting variables (symbols) at the current state.
             * 
             * @return  {TArrayList &lt;String&gt;}                             The names of interesting variables (symbols) at this current state.
             * @public
             */
            GetCurrent_InterestingSymbols: function ()
            {
                var s;                                                          /* TState                           */
                var ret;                                                        /* TArrayList<String>               */
                
                s   = this._GetCurrentState ();
                ret = s.GetInterestingSymbols ();
                
                return ret;
            },
            
            /**
             * Returns the source code for the current state.
             *
             * @return  {String}                                                Source code for the current state.
             * @public
             */
            GetCurrent_Source: function ()
            {
                var s;                                                          /* TState                           */
                var ret;                                                        /* String                           */
         
                s   = this._GetCurrentState ();
                ret = s.GetSourceCode ();
                
                return ret;
            },
            
            /**
             * Returns the ID of the current state. This maps directly
             * to the line number of the modelled program.
             * 
             * @return      {int}                                               The ID of the current state.
             * @public
             */
            GetCurrent_State: function ()
            {
                return this.fStateCurrentID;
            },
            
            /**
             * Returns the current state's transition function.
             * 
             * @return      {Function}                                          The current state's transition function
             * @public
             */
            GetCurrent_TransitionFunction: function ()
            {
                var s;                                                          /* TState                           */
                var ret;                                                        /* [Function]                       */
                
                s   = this._GetCurrentState ();
                ret = s.GetTransitionFunction ();
                
                return ret;
            },
           
            /**
             * Returns the number of stored states.
             * 
             * @return      {int}                                               The number of stored states.
             * @public
             */
            GetNumStates: function ()
            {
                var ret;                                                        /* int                              */
                
                ret = this.fStates.GetNumElements ();
                
                return ret;
            },
            
            /**
             * Sets the next state to be visited. The given ID corresponds to the resp. line of source code
             * with 0 (zero) being the first line, 1 (one) the second, 2 the third, ...
             *
             * @param       {int}           i           The ID of the state to be set.
             * @throws      {OutOfBoundsException}      If given index is out of bounds.
             * @public
             */
            SetCurrent_State: function (i)
            {
                this.fStateCurrentID       = i;
                this.fStateCurrentTuple    = this.fStates.GetValue_ByIndex (i);
            },
           
            /**
             * Returns the current state 4-tuple.
             * 
             * @return                                  The current state object.
             * @throws      {NullPointerException}      If no current state has been set yet.
             * @private
             */
            _GetCurrentState: function ()
            {
                var ret;                                                        /* TState                           */
                
                ret = this.fStateCurrentTuple;
                if (ret == null)
                {
                    throw "Current state hasn't been set yet. Did you add any program instructions (AddInstruction (...))?";
                }
                
                return ret;
            },
 
            /**
             * Dojo specific cTor.
             */
            constructor: function ()
            {
 
                this.fStates            = new TArrayList ();
                this.fStateCurrentID    = 0;
                this.fStateCurrentTuple = null;
                this.fSourceCodeAll     = new TArrayList ();
            }
        };
    
        ret = declare ("TStateMachine", [], TStateMachine);
    
        return ret;
    }
);
