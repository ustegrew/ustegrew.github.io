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
                this.fContentLang            = "";
                this.fContentType            = "";
                this.fHasChanged             = false;
                this.fID                     = "";
                this.fIsOpen                 = false;
                this.fNodeParent             = null;
                this.fNodeText               = null;
                this.fNodeToolbar            = null;
                this.fNodeWorkspace          = null;
                this.fObjButton              = null;
                this.fTextQuestion           = "";
                this.fTextSolution           = "";
            }
        };
    
        ret = declare ("TExercise", [], TExercise);
    
        return ret;
    }
);
