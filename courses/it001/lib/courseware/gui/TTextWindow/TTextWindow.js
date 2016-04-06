/**
 *  @fileoverview        Insert_here
 */
define 
(
    [
        "dojo/_base/declare",
        "dijit/_WidgetBase",
        "dojo/dom-construct",
        "dijit/Dialog"
    ],
    function 
    (
        declare,
        _WidgetBase,
        domConstruct,
        TDialog
    )
    {
        var TTextWindow;
        var ret;

        /**
         * Insert_explanation_here
         * 
         * @class       TChangeToClassName
         */
        TTextWindow = 
        {
            fDialog: null,
            
            fNodeHeading: null,
            
            fNodeText: null,
            
            fSemaphore: null,
            
            
            
            Show: function (title, heading, text)
            {
                this.fDialog.set ("title",  title);
                this.fNodeHeading.innerHTML = heading;
                this.fNodeText.value        = text;
                this.fDialog.show ();
            },

            /**
             * Dojo specific cTor.
             */
            constructor: function ()
            {
                this.fDialog        = null;
                this.fNodeHeading   = null;
                this.fNodeText      = null;
            },
            
            destroy: function ()
            {
                if (this.fDialog != null)
                {
                    this.fDialog.destroyRecursive ();
                }
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
            startup: function ()
            {
                var _host = this;
                
                var i;
                var n;
                var d;
                var wr;
                var btn;
                
                this.fDialog = new TDialog
                (
                    {
                        title:      "",
                        content:    "",
                        style:      "width: 520px;",
                        closable:   true
                    }
                );
                this.fDialog.startup ();

                this.fNodeHeading = domConstruct.create 
                (
                    "div",
                    {
                        style: "margin-bottom:20px;font-family:sans-serif;font-size:20px;"
                    },
                    this.fDialog.containerNode,
                    "only"
                );
                this.fNodeText = domConstruct.create
                (
                    "textarea",
                    {
                        style: "width:100%;height:460px;font-family:monospace;"
                    },
                    this.fDialog.containerNode,
                    "last"
                );
            },
        };
    
        ret = declare ("TTextWindow", [_WidgetBase], TTextWindow);
    
        return ret;
    }
);
