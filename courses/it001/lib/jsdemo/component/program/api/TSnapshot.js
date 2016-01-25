/**
 * @fileoverview        A snapshot of the program's current state.
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
        var TSnapshot;
        var ret;

        /**
         * A snapshot of the program's current state. All data members are public, thus directly usable by clients.<br/>
         * 
         * <b>Overview of data members:</b>
         * <dl>
         *     <dt><code>fIsTerminated</code></dt>              <dd>If <code>true</code>: Program has terminated.</dd>
         *     <dt><code>fCanNavReset</code></dt>               <dd>If <code>true</code>: Program can be reset.</dd>
         *     <dt><code>fCanNavStepBackwards</code></dt>       <dd>If <code>true</code>: Program can step backwards.</dd>
         *     <dt><code>fCanNavStepForwards</code></dt>        <dd>If <code>true</code>: Program can step forwards.</dd>
         *     <dt><code>fProgramAllSource</code></dt>          <dd>Whole source code of the program.</dd>
         *     <dt><code>fProgramCurrentComment</code></dt>     <dd>Comment associated with the current step.</dd>
         *     <dt><code>fProgramCurrentState</code></dt>       <dd>Program's current state ID.</dd>
         *     <dt><code>fProgramCurrentSymbols</code></dt>     <dd>Names of interesting variables (symbols) at this current step.</dd>
         *     <dt><code>fProgramNumLines</code></dt>           <dd>Number of lines in the program.</dd>
         * </dl>
         * 
         * @class TSnapshot
         */
        TSnapshot = 
        {
            /**
             * Flag to indicate whether the demo program has terminated (ie done a terminal step).<br/>
             * 
             * If<br/>
             * 
             * <dl>
             *     <dt><code>true</code></dt>   <dd>Program has terminated. Clients cannot navigate forward.</dd>
             *     <dt><code>false</code></dt>  <dd>Program has not terminated and can be navigated fully.</dd>
             * </dl>
             * 
             * @type    boolean
             * @public
             */
            fIsTerminated:              false,

            /**
             * Flag to indicate whether the demo program can be reset, i.e. set back to the beginning.<br/>
             * 
             * If<br/>
             * 
             * <dl>
             *     <dt><code>true</code></dt>   <dd>Program can be reset.</dd>
             *     <dt><code>false</code></dt>  <dd>Program can't be reset.</dd>
             * </dl>
             * 
             * @type    boolean
             * @public
             */
            fCanNavReset:               false,

            /**
             * Flag to indicate whether the demo program can be navigated backwards (by one step).<br/>
             * 
             * If<br/>
             * 
             * <dl>
             *     <dt><code>true</code></dt>   <dd>Program can be navigated backwards.</dd>
             *     <dt><code>false</code></dt>  <dd>Program can't be navigated backwards.</dd>
             * </dl>
             * 
             * @type    boolean
             * @public
             */
            fCanNavStepBackwards:       false,

            /**
             * Flag to indicate whether the demo program can be navigated forwards (by one step).<br/>
             * 
             * If<br/>
             * 
             * <dl>
             *     <dt><code>true</code></dt>   <dd>Program can be navigated forwards.</dd>
             *     <dt><code>false</code></dt>  <dd>Program can't be navigated forwards.</dd>
             * </dl>
             * 
             * @type    boolean
             * @public
             */
            fCanNavStepForwards:        false,

            /**
             * The entire source code of the demo program, Each line separated from the next one by line 
             * terminators (EOL).
             * 
             * @type    String
             * @public
             */
            fProgramAllSource:          "",

            /**
             * The comment associated with the current program step. Explains more details about the step 
             * (e.g. what it's for, what's exactly happening etc.)
             * 
             * @type    String
             * @public
             */
            fProgramCurrentComment:     "",

            /**
             * Step ID of the current program step.  
             * 
             * @type    int
             * @public
             */
            fProgramCurrentState:       null,

            /**
             * Names of variables worth looking at in the current step. 
             * 
             * @type    TDictionary
             * @public
             */
            fProgramCurrentSymbols:     null,

            /**
             * Number of lines in this program.
             * 
             * @type    int
             * @public
             */
            fProgramNumLines:           0,
            
            /**
             * The name of the program as known to the hosting web page (e.g. "example 4").
             * 
             * @type    String
             * @private
             */
            fProgramName:               null,
            
            /**
             * Deep copies the given <code>TSnapshot</code> to this one. 
             * Data that pre-existed in this entry will be overwritten.
             * 
             * @param   {TSnapshot}     other               The snapshot we copy from.
             */
            CopyFrom: function (other)
            {
                this.fIsTerminated           = other.fIsTerminated;
                this.fCanNavReset            = other.fCanNavReset;
                this.fCanNavStepBackwards    = other.fCanNavStepBackwards;
                this.fCanNavStepForwards     = other.fCanNavStepForwards;
                this.fProgramAllSource       = other.fProgramAllSource;
                this.fProgramName            = other.fProgramName;
                this.fProgramCurrentComment  = other.fProgramCurrentComment;
                this.fProgramCurrentState    = other.fProgramCurrentState;
                this.fProgramCurrentSymbols  = other.fProgramCurrentSymbols;
                this.fProgramNumLines        = other.fProgramNumLines;
            },
            
            /**
             * Dojo specific cTor.
             */
            constructor: function ()
            {
                this.fIsTerminated              = false;
                this.fCanNavReset               = false;
                this.fCanNavStepBackwards       = false;
                this.fCanNavStepForwards        = false;
                this.fProgramAllSource          = "";
                this.fProgramName               = "";
                this.fProgramCurrentComment     = "";
                this.fProgramCurrentState       = null;
                this.fProgramCurrentSymbols     = null;
                this.fProgramNumLines           = 0;
            }
        };
    
        ret = declare ("TSnapshot", [], TSnapshot);
    
        return ret;
    }
);
