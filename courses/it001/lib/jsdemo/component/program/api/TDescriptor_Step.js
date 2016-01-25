/**
 * @fileoverview        Descriptor of a single step in a jsdemo user program..
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
        var TDescriptor_Step;
        var ret;

        /**
         * A single step in a demo program.
         * 
         * @class TDescriptor_Step
         */
        TDescriptor_Step = 
        {
            /**
             * An explanatory comment about this particular step.
             * 
             * @type    String
             * @public
             */
            fComment:               null,
            
            /**
             * The line of source code in this step.
             * 
             * @type    String
             * @public
             */
            fDemoSource:            null,
            
            /**
             * A set of variables to show when the step has finished.
             * 
             * @type    String []
             * @public
             */
            fInterestingSymbols:    null,
            
            /**
             * A Javascript function we run when the user moves forward to the next step.
             * 
             * @type    [Function]
             * @public
             */
            fTransitionFunction:    null,
    
            /**
             * Dojo specific cTor.
             * 
             * @param {String}      demoSource                     The line of source code in this step.
             * @param {String}      comment                        An explanatory comment about this particular step.
             * @param {[Function]}  transitionFunction             A Javascript function we run when the user moves forward to the next step.
             * @param {String []}   interestingSymbols             A set of variables to show when the step has finished. 
             * @public
             */
            constructor: function 
            (
                demoSource, 
                comment, 
                transitionFunction, 
                interestingSymbols
            )
            {

                this.fDemoSource         = demoSource;
                this.fComment            = comment;
                this.fTransitionFunction = transitionFunction;
                this.fInterestingSymbols = interestingSymbols;
            }
        };
    
        ret = declare ("TDescriptor_Step", [], TDescriptor_Step);
    
        return ret;
    }
);
