/**
 *  @fileoverview        A text box
 */
define 
(
    [
        "dojo/_base/declare",
        "dijit/_WidgetBase",
        "dojo/Deferred",
        "dojo/dom-construct",
        "dijit/Dialog"
    ],
    function 
    (
        declare,
        _WidgetBase,
        TDeferred,
        domConstruct,
        TDialog
    )
    {
        var TTextWindow;
        var ret;

        /**
         * A text box with heading and copyable text area below. Used for the 
         * "Export to clipboard" feature.
         * 
         * @class       TTextWindow
         */
        TTextWindow = 
        {
            /**
             * 
             * 
             * @type
             * @private
             */
            fDialog: null,
            
            /**
             * 
             * 
             * @type
             * @private
             */
            fNodeHeading: null,
            
            /**
             * 
             * 
             * @type
             * @private
             */
            fNodeText: null,
            
            /**
             * 
             * 
             * @type
             * @private
             */
            fSemaphore: null,
            
            /**
             * 
             * 
             * @type
             * @private
             */
            Show: function (title, heading, text)
            {
                var _this = this;
                
                this.fSemaphore = new TDeferred ();
                
                this.fDialog.set ("title",  title);
                this.fNodeHeading.innerHTML = heading;
                this.fNodeText.value        = text;
                
                this.fDialog.show().then
                (
                    function ()
                    {
                        _this.fNodeText.scrollTop = 0;
                    }
                );
            
                return this.fSemaphore;
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
                var _this = this;
                
                this.fDialog = new TDialog
                (
                    {
                        title:      "",
                        content:    "",
                        style:      "width: 95%;",
                        closable:   true,
                        onHide:    function ()
                        {
                            _this.fSemaphore.resolve ();
                        }
                    }
                );
                this.fDialog.startup ();

                this.fNodeHeading = domConstruct.create 
                (
                    "h1",
                    {
                    },
                    this.fDialog.containerNode,
                    "only"
                );
                this.fNodeText = domConstruct.create
                (
                    "textarea",
                    {
                        style:      "width:100%;height:460px;font-family:monospace;resize:none",
                        readonly:   true
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
