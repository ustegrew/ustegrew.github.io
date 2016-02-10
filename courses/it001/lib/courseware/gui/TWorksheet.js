/**
 *  @fileoverview        Insert_here
 */
define 
(
    [
        "dojo/_base/declare",
        "dijit/_WidgetBase",
        "courseware/gui/TExerciseEditGUI"
    ],
    function 
    (
        declare,
        _WidgetBase,
        TExerciseEditGUI
    )
    {
        var TWorksheet;
        var ret;

        /**
         * A worksheet. Contains several exercises. All exercises share a single editor
         * instance.
         * 
         * @class       TWorksheet
         */
        TWorksheet = 
        {
            /**
             * Worksheet controller class. 
             */
            TController: function (host)
            {
                this.fHost = host;
                
            },
            
            /**
             * Dojo specific cTor.
             */
            constructor: function ()
            {
                /**
                 *  The controller. Controls the behaviour of this worksheet.
                 * 
                 * @type TWorksheet::TController
                 */
                this.fController = new this.TController (this);
            },

            /* -------------------------------------------------------------
             * Dijit overrides 
             * ------------------------------------------------------------- */
        
            /**
             * Startup method (for widgets). This overrides the _WidgetBase::startup ().
             * 
             * Excerpt, Dojo documentation:
             *     + postCreate
             *          This is typically the workhorse of a custom widget. The 
             *          widget has been rendered (but note that child widgets in 
             *          the containerNode have not!). The widget though may not 
             *          be attached to the DOM yet so you shouldn’t do any sizing 
             *          calculations in this method.
             *     
             *     + startup
             *          If you need to be sure parsing and creation of any child 
             *          widgets has completed, use startup. This is often used 
             *          for layout widgets like BorderContainer. If the widget 
             *          does JS sizing, then startup() should call resize(), 
             *          which does the sizing.
             */
            postCreate: function ()
            {
                
            },
            
            startup: function ()
            {
                
            }
        };
    
        ret = declare ("TWorksheet", [_WidgetBase], TWorksheet);
    
        return ret;
    }
);


