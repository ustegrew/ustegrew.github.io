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
        var TExercise;
        var ret;

        /**
         * Insert_explanation_here
         * 
         * @class       TChangeToClassName
         */
        TExercise = 
        {
            /**
             * Dojo specific cTor.
             */
            constructor: function ()
            {
                this.fContentType            = "";
                this.fContentLang            = "";
                this.fID                     = "";
                this.fHasChanged             = false;
                this.fNodeParent             = null;
                this.fNodeText               = null;
                this.fNodeToolbar            = null;
                this.fNodeWorkspace          = null;
                this.fNodeText               = "";
                this.fIsNullObject           = true;
                this.fObjButton              = null;
                this.fTextQuestion           = "";
                this.fTextSolution           = "";
            }
        };
    
        ret = declare ("TExercise", [], TExercise);
    
        return ret;
    }
);
