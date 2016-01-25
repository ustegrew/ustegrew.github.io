/**
 * @fileoverview        Data storage and state tracking.
 */
define 
(
    [
        "dojo/_base/declare",
        "jsdemo/aux/storage/map/TDictionary"
    ],
    function 
    (
        declare,
        TDictionary
    )
    {
        var TScope;
        var ret;

        /**
         * The set of all entities that are visible within one particular step in the demo program. Contains 
         * the global variables and state ID of the program at that point in time. Since we can store scope
         * objects we can keep track of the program's behaviour over time. This is particularly important 
         * for allowing the user to step backwards through the program.
         *
         * @class   TScope
         */
        TScope = 
        {
            /**
             * The global variables.
             * 
             * @type        TDictionary
             * @private
             */
            fGlobals:               null,

            /**
             * A flag to denote whether the current step is a terminal step.
             * 
             * @type        boolean
             * @private
             */
            fIsTerminal:            null,

            /**
             * The ID of the current state.
             * 
             * @type        int
             * @private
             */
            fState:                 null,

            /**
             * Copies data from the given scope into this one. Any previous data stored in this 
             * scope object will be lost.
             *
             * @param       {TScope}    other       The scope from which we copy.
             * @public
             */
            CopyFrom: function (other)
            {
                this.fGlobals = new TDictionary ();
                this.fGlobals.CopyFrom (other.fGlobals);
                this.fState = other.fState;
                this.fIsTerminal = other.fIsTerminal;
            },
            
            /**
             * Returns the globals as JS Object.
             * 
             * @returns {JSObject}      The globals as JS Object.
             */
            GetGlobals_AsJSObject : function ()
            {
                var ret;
                
                ret = this.fGlobals.GetAsJSObject ();
                
                return ret;
            },
            
            /**
             * Returns the name of the global variable #<code>i</code>.
             * 
             * @param       {int}       i               The index to the variable we request the name of. The first variable has index 0 (zero).
             * @return      {String}                    The name of the requested variable.
             * @throws      {OutOfBoundsException}      If given index is out of bounds.
             * @public  
             */
            GetGlobals_Key: function (i)
            {
                var ret;                                                        /* String */

                ret = this.fGlobals.GetKey (i);

                return ret;
            },

            /**
             * Returns the number of global variables.
             * 
             * @return      {int}               The number of global variables.
             * @public  
             */
            GetGlobals_NumEntries: function ()
            {
                var ret;                                                        /* int */

                ret = this.fGlobals.GetNumEntries ();

                return ret;
            },

            /**
             * Returns the value of the global variable #<code>i</code>. 
             * 
             * @param       {int}       i               The index to the variable we request the value of. The first variable has index 0 (zero).
             * @return      {Any}                       The value of the requested variable.
             * @throws      {OutOfBoundsException}      If given index is out of bounds.
             * @public  
             */
            GetGlobals_Value_ByIndex: function (i)
            {
                var ret;                                                        /* Any */

                ret = this.fGlobals.GetValue_ByIndex (i);

                return ret;
            },

            /**
             * Returns the value of the global variable <code>[key]</code>. 
             *  
             * @param       {int}       name        The name of the variable we request the value of.
             * @return      {String}                The value of the requested variable.
             * @throws      {NoSuchKeyException}    If given key does not exist.
             * @public  
             */
            GetGlobals_Value_ByKey: function (name)
            {
                var ret;                                                        /* Any */

                ret = this.fGlobals.GetValue_ByKey (name);

                return ret;
            },

            /**
             * Returns a copy of a subset of all global variables, as an indexed list (index is zero based).
             * 
             * @param       {TArrayList &lt;String&gt;}     keys    The names of the variables we are interested in.
             * @return      {String}                                The value of the requested variable.
             * @throws      {NoSuchKeyException}                    If one or more of the given keys does not exist.
             * @public  
             */
            GetGlobals_Values: function (keys)
            {
                var i;                                                          /* int                      */
                var n;                                                          /* int                      */
                var k;                                                          /* String                   */
                var x;                                                          /* Any                      */
                var ret;                                                        /* TArrayList<Any>          */

                ret = new TArrayList ();
                n   = keys.GetNumElements ();
                if (n >= 1)
                {
                    for (i = 0; i < n; i++)
                    {
                        k = keys.get (i);
                        x = this.fGlobals.GetValue_ByKey (k);
                        ret.add (x);
                    }
                }

                return ret;
            },

            /**
             * Returns the ID of the state associated with this scope. 
             * 
             * @return          {int}       The current step ID.
             * @public
             */            
            GetState: function ()
            {
                return this.fState;
            },

            /**
             * Returns <code>true</code> if the associated state is a final state,
             * <code>false</code> otherwise.
             * 
             * @return          {boolean}       <code>true</code> if the associated state is final,
             *                                  <code>false</code> otherwise.
             * @public
             */            
            IsTerminal: function ()
            {
                return this.fIsTerminal;
            },
            
            /**
             * Sets global variables from the given JS Object.
             * 
             * @param   {JSObject} record       The record from which to set the globals.
             * @public
             */
            SetGlobals_FromJSObject: function (record)
            {
                this.fGlobals.SetFromJSObject (record);
            },

            /**
             * Sets the value of the global variable #<code>i</code> to the given value (<code>value</code>).
             * 
             * @param       {int}       i               The index to the variable we set. The first variable has index 0 (zero).
             * @param       {Any}       value           Value we set the variable to.
             * @throws      {OutOfBoundsException}      If given index is out of bounds.
             * @public
             */            
            SetGlobals_Value_ByIndex: function (i, value)
            {
                this.fGlobals.SetValue (i, value);
            },

            /**
             * Sets the value of the variable with the given name (<code>k</code>) to the given value (<code>value</code>).
             * 
             * @param       {String}    k           Name of variable we set.
             * @param       {Any}       value       Value we set the variable to.
             * @throws      {NoSuchKeyException}    If given key does not exist.
             * @public
             */            
            SetGlobals_Value_ByKey: function (k, value)
            {
                this.fGlobals.SetValue (key, value);
            },

            /**
             * (Re)sets the <i>terminal</i> flag of the associated state.
             * 
             * @param   {boolean}   isTerminal  <code>true</code>  if the state is marked terminal,
             *                                  <code>false</code> otherwise.
             * @public
             */            
            SetIsTerminal: function (isTerminal)
            {
                this.fIsTerminal = isTerminal;
            },

            /**
             * Sets the ID and Re)sets the <i>terminal</i> flag of the associated state. 
             * In effect, setting the ID sets the number of the associated line in the source code.
             * 
             * @param   {int}       st          The state's ID.
             * @param   {boolean}   isTerminal  <code>true</code>  if the state is marked terminal,
             *                                  <code>false</code> otherwise.
             * @public
             */            
            SetState: function (st, isTerminal)
            {
                this.fState         = st;
                this.fIsTerminal    = isTerminal;
            },

            /**
             * Dojo specific cTor. 
             *
             * @param   {TDictionary}   globals     The demo program's global variables.
             */
            constructor: function (globals)
            {
                this.fGlobals       = globals;
                this.fState         = 0;
                this.fIsTerminal    = false;
            }
        };
    
        ret = declare ("TScope", [], TScope);
    
        return ret;
    }
);
