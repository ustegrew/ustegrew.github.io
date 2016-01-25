/**
 * @fileoverview        A single state.
 */
define 
(
    [
        "dojo/_base/declare",
        "jsdemo/aux/storage/list/TArrayList"
    ],
    function 
    (
        declare,
        TArrayList
    )
    {
        var TState;
        var ret;

        /**
         * A state class, modelling one particular step of a demo program. The basic building block
         * of the controlling state machine ({@link TStateMachine}). A state is defined as a 4-tuple
         * with the elements:
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
         * @class TState
         */
        TState = 
        {
            /**
             * An explanatory comment giving details about this step, it's rationale, side effects, ....
             *
             * @type        String
             * @private
             */
            fComment:               null,

            /**
             * Names of interesting variables (symbols) at this current state, so the user can inspect 
             * them without being hammered by a slew of irrelevant globals.
             *
             * @type        {TArrayList &lt;String&gt;}
             * @private
             */
            fInterestingSymbols:    null,

            /**
             * The line of source code of this step as shown in the example.
             *
             * @type        String
             * @private
             */
            fSourceCode:            null,

            /**
             * A Javascript function, executed by the framework behind the scenes. Sets any globals 
             * as necessary and which step to visit next.
             *
             * @type        [Function]
             * @private
             */
            fTransitionFunction:    null,

            /**
             * Returns the explanatory comment about this step.
             * 
             * @return      {String}                                           The explanatory comment.
             * @public
             */
            GetComment: function ()
            {
                return this.fComment;
            },

            /**
             * Returns the list of names of interesting variables.
             * 
             * @return      {TArrayList &lt;String&gt;}                       The list of interesting variable names.
             * @public
             */
            GetInterestingSymbols: function ()
            {
                return this.fInterestingSymbols;
            },

            /**
             * Returns the line of source code of this step.
             * 
             * @return      {String}                                           The line of source code of this step.
             * @public
             */
            GetSourceCode: function ()
            {
                return this.fSourceCode;
            },

            /**
             * Returns the transition function to be executed as part of this step.
             * 
             * @return      {[Function]}                                       This step's transition function.
             * @public
             */
            GetTransitionFunction: function ()
            {
                return this.fTransitionFunction;
            },
            
            /**
             * Dojo specific cTor.
             */
            constructor: function
            (
                sourceCode,                                                     /* String                   */
                comment,                                                        /* String                   */
                transitionFunction,                                             /* [Function]               */
                interestingSymbols                                              /* TArrayList<String>       */
            )
            {

                this.fSourceCode            = sourceCode;
                this.fComment               = comment;
                this.fTransitionFunction    = transitionFunction;
                this.fInterestingSymbols    = new TArrayList ();
                this.fInterestingSymbols.AddFromArrayList (interestingSymbols);
            }
        };
    
        ret = declare ("TState", [], TState);
    
        return ret;
    }
);
