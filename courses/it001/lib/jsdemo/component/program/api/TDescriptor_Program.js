/**
 *  @fileoverview        Descriptor of a jsdemo user program.. 
 */
define 
(
    [
        "dojo/_base/declare",
        "jsdemo/aux/storage/list/TArrayList",
        "jsdemo/component/program/api/TDescriptor_Step"
    ],
    function 
    (
        declare,
        TArrayList,
        TDescriptor_Step
    )
    {
        var TDescriptor_Program;
        var ret;

        /**
         *  A descriptor holding a jsdemo user program. A program is a short snippet 
         *  of Javascript code as an example to demonstrate some aspect of Javascript.  
         *  
         *  @class TDescriptorProgram
         */
        TDescriptor_Program = 
        {
            /**
             * The original record from which we create this descriptor
             */
            fOrigRecord:    null,
            
            /**
             * The program's name, e.g. "Example 4".
             * 
             * @type        String
             * @private
             */
            fName:          null,
            
            /**
             * The symbols for global variables used by the program, e.g. ["a", "myVar", "b"].
             * 
             * @type        TArrayList &lt;String&gt;  
             * @private
             */
            fVariables:     null,
            
            /**
             * The program's steps (i.e. lines of code).
             * 
             * @type        TArrayList &lt;TDescriptor_Step&gt;
             * @private
             */
            fSteps:         null,
            
            /**
             * Adds one step in the program.
             * 
             * @param {String}      demoSource                     The line of source code in this step.
             * @param {String}      comment                        An explanatory comment about this particular step.
             * @param {[Function]}  transitionFunction             A Javascript function we run when the user moves forward to the next step.
             * @param {String []}   interestingSymbols             A set of variables to show when the step has finished.
             * @public 
             */
            AddStep: function
            (
                demoSource,
                comment,
                transitionFunction,
                interestingSymbols
            )
            {
                var st; 
                
                st = new TDescriptor_Step 
                (
                    demoSource, 
                    comment, 
                    transitionFunction, 
                    interestingSymbols
                );
                this.fSteps.Add (st);
            },
            
            /**
             * Returns the name of this program.
             * 
             * @return {String}             The name of this program.
             * @public 
             */
            GetName: function () 
            {
                return this.fName;
            },

            /**
             * Returns the list of global variable symbols. 
             * 
             * @return {TArrayList &lt;String&gt;}  List of global variable symbols used in this program. 
             * @public 
             */
            GetVariables: function ()
            {
                return this.fVariables;
            },

            /**
             * Returns the list of steps executed by this program.
             * 
             * @return TArrayList &lt;TDescriptor_Step&gt;      The program's steps (i.e. lines of code).
             * @public 
             */
            GetSteps: function ()
            {
                return this.fSteps;
            },

            /**
             * Dojo specific cTor.
             * 
             * @param   {String}    name        Name of the program, e.g. "Example 4".
             * @param   {JSObject}  p           The program to load. 
             * @public 
             */
            constructor: function (name, p)
            {
                var trans;
                var i;
                var n;
                var t;
                var st;
                
                this.fOrigRecord    = p;
                this.fName          = name;
                this.fVariables     = new TArrayList ();
                this.fSteps         = new TArrayList ();
                
                this.fVariables.AddFromArray (p.globals.symbols);
                trans = p.transitionTable;
                n     = trans.length;
                if (n >= 1)
                {
                    for (i = 0; i < n; i++)
                    {
                        t = trans [i];
                        st = new TDescriptor_Step 
                        (
                            t.source, 
                            t.comment, 
                            t.transition, 
                            t.symbols
                        );
                        this.fSteps.Add (st);
                    }
                }
            }
        };
    
        ret = declare ("TDescriptor_Program", [], TDescriptor_Program);
    
        return ret;
    }
);
