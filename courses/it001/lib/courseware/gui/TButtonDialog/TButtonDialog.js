/**
 *  @fileoverview        A dialog showing a text and a customizable set of buttons.
 */
define 
(
    [
        "dojo/_base/declare",
        "dijit/_WidgetBase",
        "dojo/Deferred",
        "courseware/util/validator/TValidatorJSON",
        "dojo/dom-construct",
        "dijit/Dialog",
        "dijit/form/Button"
    ],
    function 
    (
        declare,
        _WidgetBase,
        TDeferred,
        JSObjectValidator,
        domConstruct,
        TDialog,
        TButton
    )
    {
        var TButtonDialog;
        var ret;

        /**
         * A dialog showing a text and a set of buttons. Useful for multiple 
         * choice questions other than "About to reconfigure X... (OK? Cancel?)".<br/>
         * The dialog can be used with callbacks (one for each button's click 
         * event) or via the Promise API (Promise resolves with the index of the
         * button clicked).
         * <p><br/></p>
         * 
         * <b>Elements on the user interface</b>
         * 
         * <pre>
         * .----------------------------------------------------------------.
         * | Title                                                          |
         * |----------------------------------------------------------------|
         * | Question                                                       |
         * |                .-----------. .-----------.     .-------------. |
         * |                | Button[0] | | Button[1] | ... | Button[n-1] | |
         * |                '-----------' '-----------'     '-------------' |
         * '----------------------------------------------------------------'
         * </pre>
         * 
         * <dl>
         *     <dt>Title</dt>
         *     <dd>The dialog's title</dd>
         *     
         *     <dt>Question</dt>
         *     <dd>The question on which the user has to decide.</dd>
         *     
         *     <dt>Button [0] ... Button [n-1]</dt>
         *     <dd>The buttons representing the user's answer.</dd>
         * </dl>
         * <p><br/></p>
         * 
         * <b>Example uses</b>
         * @example 
         * // Using callbacks
         * 
         * require 
         * (
         *     [
         *         "courseware/gui/TButtonDialog/TButtonDialog"
         *     ],
         *     function 
         *     (
         *         TBtnDlg
         *     )
         *     {
         *         var dlg;
         *         
         *         dlg = new TBtnDlg
         *         (
         *             host:        window,
         *             buttons:
         *             [
         *                 {
         *                     label:       "Tell me what's 1 + 1!",
         *                     onClick: function ()
         *                     {
         *                         window.alert ("2");
         *                     }
         *                 },
         *                 {
         *                     label:       "I used to be decisive...",
         *                     onClick: function ()
         *                     {
         *                         window.alert ("... but now I'm not so sure.");
         *                     }
         *                 },
         *             ]
         *         );
         *         dlg.startup ();
         *         
         *         dlg.Show
         *         (
         *             "Important things box", 
         *             "Choose today's important thing to contemplate on"
         *         );
         *     }
         * );
         * 
         * @example
         * // Using promise API
         * 
         * require 
         * (
         *     [
         *         "courseware/gui/TButtonDialog/TButtonDialog"
         *     ],
         *     function 
         *     (
         *         TBtnDlg
         *     )
         *     {
         *         var dlg;
         *         
         *         dlg = new TBtnDlg
         *         (
         *             host:        window,
         *             buttons:
         *             [
         *                 {
         *                     label:       "Tell me what's 1 + 1!",
         *                     onClick: function () {}
         *                 },
         *                 {
         *                     label:       "I used to be decisive...",
         *                     onClick: function () {}
         *                 },
         *             ]
         *         );
         *         dlg.startup ();
         * 
         *         dlg.Show 
         *         (
         *             "Important things box", 
         *             "Choose today's important thing to contemplate on"
         *         )
         *         .then 
         *         {
         *             function (decision)
         *             {
         *                 switch (decision)
         *                 {
         *                     case 0:
         *                         window.alert ("2");
         *                         break;
         *                     case 1:
         *                         window.alert ("... but now I'm not so sure.");
         *                         break;
         *                     default:
         *                         window.alert ("Unknown button alert!);
         *                 }
         *             }
         *         };
         *     }
         * );
         * 
         * @class       TButtonDialog
         */
        TButtonDialog = 
        {
            /**
             * JSON schema to validate the button dialog's configuration descriptor.
             * 
             * @constant
             * @type        JSON schema
             * @private
             */
            kSchemaParams:
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
            },

            /**
             * The descriptors for the set of buttons.
             * 
             * @type        JSON
             * @private
             */
            fDescriptors:   null,
            
            /**
             * The underlying dijit dialog.
             * 
             * @type        dijit/Dialog
             * @private
             */
            fDialog:        null,
            
            /**
             * The client using this dialog.
             * 
             * @type        JSObject
             * @private
             */
            fHost:          null,
            
            /**
             * The DOM element hosting the button set.
             * 
             * @type        DOMNode
             * @private
             */
            fNodeButtons:   null,

            /**
             * The DOM element hosting the question text.
             * 
             * @type        DOMNode
             * @private
             */
            fNodeContent:   null,
            
            /**
             * The promise, to use this dialog inside a <code>.then</code> construct.
             * 
             * @type    dojo/Deferred
             * @private
             */
            fSemaphore:     null,
        
            /**
             * Shows the dialog and sets title and question text. Title appears 
             * in the dialog's title bar, question appears above the buttons.
             * 
             * @param       {String}    title       The dialog's title
             * @param       {String}    question    The question for the user to decide upon.
             * @returns     {dojo/Deferred}         A Deferred object, if the dialog is
             *                                      to be shown using the promise API.
             */
            Show: function (title, question)
            {
                this.fSemaphore = new TDeferred ();
                
                this.fDialog.set ("title",      title);
                this.fNodeContent.innerHTML = question;
                this.fDialog.show ();
                
                return this.fSemaphore;
            },

            /**
             * cTor.
             * 
             * @param {JSON}    params      The dialog's configuration. Must contain the 
             *                              configuration for the set of buttons. Must 
             *                              conform to {@link TButtonDialog.kSchemaParams}.
             */
            constructor: function (params)
            {
                JSObjectValidator.AssertValid (params, this.kSchemaParams, "constructor");
                this.fSemaphore     = null; // of type dojo/Deferred if we want to use this dialog asynchronously.
                this.fDescriptors   = params.buttons;
                this.fHost          = params.host;
                this.fDialog        = null;
                this.fNodeContent   = null;
                this.fNodeButtons   = null;
            },
            
            /**
             * dTor.
             */
            destroy: function ()
            {
                if (this.fDialog != null)
                {
                    this.fDialog.destroyRecursive ();
                }
            },

            /**
             * Startup method. Sets up the dialog and the set of buttons, as 
             * specified with the descriptor that was provided as parameter to the 
             * constructor.
             */
            startup: function ()
            {
                var _host = this;
                
                var i;
                var n;
                var d;
                var wr;
                var btn;
                
                /*
                 * Create new dijit/Dialog.
                 */
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

                /*
                 * Create DIV element to contain the question.
                 */
                this.fNodeContent = domConstruct.create 
                (
                    "div",
                    {
                        style: "width:500px"
                    },
                    this.fDialog.containerNode,
                    "only"
                );
            
                /*
                 * Create DIV element to contain the set of buttons.
                 */
                this.fNodeButtons = domConstruct.create
                (
                    "div",
                    {
                        style: "width:500px;height:25px"
                    },
                    this.fDialog.containerNode,
                    "last"
                );
            
                /*
                 * Create set of buttons.
                 */
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
                                        _host.fDialog.hide ();
                                        _host.fDescriptors[this.fIndex].onClick.call (_host.fHost); /* [10] */
                                        _host.fSemaphore.resolve (this.fIndex);
                                    }
                            }
                        );
                        btn.startup ();
                        domConstruct.place (btn.domNode, wr, "only");
                    }
                }
            }
        };
    
        ret = declare ("TButtonDialog", [_WidgetBase], TButtonDialog);
    
        return ret;
    }
);

/*

[10]: We set the context to the client who hosts this button. Therefore, a client
      can use the 'this' reference, and be sure that 'this' always refers to that
      client, not some other object.

 */