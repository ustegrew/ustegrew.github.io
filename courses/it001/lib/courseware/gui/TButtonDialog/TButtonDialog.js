/**
 *  @fileoverview        Insert_here
 */
define 
(
    [
        "dojo/_base/declare",
        "dijit/_WidgetBase",
        "courseware/util/validator/TValidatorJSON",
        "dojo/dom-construct",
        "dijit/Dialog",
        "dijit/form/Button"
    ],
    function 
    (
        declare,
        _WidgetBase,
        JSObjectValidator,
        domConstruct,
        TDialog,
        TButton
    )
    {
        var kSchemaParams =
        {
            "$schema":      "http://json-schema.org/draft-03/schema#",
            "title":        "button descriptor",
            "description":  "Descriptor for button row",
            "type":         "object",
            properties:
            {
                "host":
                {
                    "description":      "The object hosting this button dialog",
                    "type":             "object"
                },
                "buttons":
                {
                    "description":      "Descriptors for all buttons, one button per descriptor. " +
                                        "Buttons will be shown in the order of the descriptors.",
                    "type":             "array",
                    "items":
                    {
                        "description":      "A descriptor for a button",
                        "type":             "object",
                        "properties":
                        {
                            "label":
                            {
                                "description":      "Text on the button, e.g. 'Cancel'",
                                "type":             "string"
                            },
                            "onClick":
                            {
                                "description":      "Callback (event handler) to invoke when button is clicked.",
                                "type":             "function"
                            }
                        }
                    }
                }
            }
        };
        
        var TButtonDialog;
        var ret;

        /**
         * Insert_explanation_here
         * 
         * @class       TChangeToClassName
         */
        TButtonDialog = 
        {
            Show: function (title, question)
            {
                this.fDialog.set ("title",      title);
                this.fNodeContent.innerHTML = question;
                this.fDialog.show ();
            },

            /**
             * Dojo specific cTor.
             */
            constructor: function (params)
            {
                JSObjectValidator.AssertValid (params, kSchemaParams, "constructor");
                this.fDescriptors   = params.buttons;
                this.fDialog        = null;
                this.fHost          = params.host;
                this.fNodeContent   = null;
                this.fNodeButtons   = null;
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
                        style:      "width: 520px",
                        closable:   false
                    }
                );
                this.fDialog.startup ();

                this.fNodeContent = domConstruct.create 
                (
                    "div",
                    {
                        style: "width:500px"
                    },
                    this.fDialog.containerNode,
                    "only"
                );
                this.fNodeButtons = domConstruct.create
                (
                    "div",
                    {
                        style: "width:500px;height:25px"
                    },
                    this.fDialog.containerNode,
                    "last"
                );
                n = this.fDescriptors.length;
                if (n >= 1)
                {
                    for (i = n-1; i >= 0; i--)
                    {
                        d  = this.fDescriptors [i];
                        wr = domConstruct.create
                        (
                            "div",
                            {
                                style: "float:right"
                            },
                            this.fNodeButtons,
                            "last"
                        );
                        btn = new TButton
                        (
                            {
                                fIndex:     i,
                                label:      d.label,
                                onClick:
                                    function ()
                                    {
                                        _host._HandleClick (this.fIndex, _host);
                                    }
                            }
                        );
                        btn.startup ();
                        domConstruct.place (btn.domNode, wr, "only");
                    }
                }
            },
            
            _HandleClick: function (iHandler, context)
            {
                var handler;
                
                handler = context.fDescriptors[iHandler].onClick;
                this.fDialog.hide ();
                handler.call (this.fHost);
            }
        };
    
        ret = declare ("TButtonDialog", [_WidgetBase], TButtonDialog);
    
        return ret;
    }
);
