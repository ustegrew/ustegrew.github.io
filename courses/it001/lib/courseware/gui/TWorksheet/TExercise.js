/**
 *  @fileoverview        Struct hoding data pertaining to a worksheet exercise.
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
         * A struct holding data pertaining to a worksheet exercise.
         * All fields in this struct are public.
         * 
         * @class       TExercise
         */
        TExercise = 
        {
            /**
             * The source language expected for the solution (e.g. "js")
             * 
             * @type type       String
             */
            fContentLang:       "",

            /**
             * The document type expected for the solution (e.g. "rtf", "src", ...)
             * 
             * @type type       String
             */
            fContentType:       "",

            /**
             * <code>true</code> if the solution to this exercise has been edited 
             * since the last save, <code>false</code> otherwise.
             * 
             * @type type       boolean
             */
            fHasChanged:        false,

            /**
             * The unique ID of this exercise.
             * 
             * @type type       String
             */
            fID:                "",

            /**
             * <code>true</code> if this exercise is open for editing of the solution,
             * <code>false</code> otherwise.
             * 
             * @type type       boolean
             */
            fIsOpen:            false,

            /**
             * The DOM element holding the entire exercise (question, solution editor, ...).
             * 
             * @type type       DOM element
             */
            fNodeParent:        null,

            /**
             * The DOM element holding the Exercise question text.
             * 
             * @type type       DOM element
             */
            fNodeText:          null,

            /**
             * The DOM element holding the toolbar which contains the "Edit this solution" button.
             * 
             * @type type       DOM element
             */
            fNodeToolbar:       null,

            /**
             * The DOM element holding the editor component.
             * 
             * @type type       DOM element
             */
            fNodeWorkspace:     null,

            /**
             * The "Edit this solution" button.
             * 
             * @type type       dijit/Button
             */
            fObjButton:         null,

            /**
             * Te text of the exercise question.
             * 
             * @type type       String
             */
            fTextQuestion:      "",

            /**
             * The text of the solution, as authored by the user.
             * 
             * @type type       String
             */
            fTextSolution:      "",
            
            /**
             * cTor.
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
