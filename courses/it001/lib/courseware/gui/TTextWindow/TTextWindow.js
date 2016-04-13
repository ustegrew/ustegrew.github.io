/**
 *  @fileoverview        A text box
 */
define 
(
    [
        "dojo/_base/declare",
        "dijit/_WidgetBase",
        "dojo/Deferred",
        "courseware/util/validator/TValidatorJSON",
        "dojo/dom-construct",
        "dijit/Dialog"
    ],
    function 
    (
        declare,
        _WidgetBase,
        TDeferred,
        JSObjectValidator,
        domConstruct,
        TDialog
    )
    {
        var TTextWindow;
        var ret;

        /**
         * A text box with heading and copyable text area below. Used for the 
         * "Export to clipboard" feature.<br/>
         * The text window can be used with a callback (when the window is closed
         * by the user) or via the Promise API (Promise resolves with closing the 
         * window).
         * <p><br/></p>
         * 
         * <b>Elements on the user interface</b>
         * 
         * <pre>
         * .--------------------------------------------------------------.
         * | Title                                                        |
         * |--------------------------------------------------------------|
         * | Heading                                                      |
         * |                                                              |
         * | ************************************************************ |
         * | * Text                                                     * |
         * | *                                                          * |
         * | ************************************************************ |
         * '--------------------------------------------------------------'
         * </pre>
         * 
         * <dl>
         *     <dt>Title</dt>
         *     <dd>The dialog's title</dd>
         *     
         *     <dt>Heading</dt>
         *     <dd>The heading above the text.</dd>
         *     
         *     <dt>Text</dt>
         *     <dd>The text. Will be inside a TEXTAREA element so it's easy to copy to clipboard.</dd>
         * </dl>
         * <p><br/></p>
         * 
         * <b>Example uses</b>
         * 
         * @example
         * // Using callbacks
         * 
         * require 
         * (
         *     [
         *         "courseware/gui/TTextWindow/TTextWindow"
         *     ],
         *     function 
         *     (
         *         TTxtWnd
         *     )
         *     {
         *         var t;
         *         
         *         t = new TTxtWnd
         *         (
         *             host:        window,
         *             onClose: function ()
         *             {
         *                 window.alert ("Bye!");
         *             }
         *         );
         *         t.startup ();
         *         
         *         t.Show
         *         (
         *             "Message to you",
         *             "This is a heading", 
         *             "And this is a text below the heading"
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
         *         "courseware/gui/TTextWindow/TTextWindow"
         *     ],
         *     function 
         *     (
         *         TTxtWnd
         *     )
         *     {
         *         var t;
         *         
         *         t = new TTxtWnd
         *         (
         *             host:        window,
         *             onClose:     function () {}
         *         );
         *         t.startup ();
         *         
         *         t.Show
         *         (
         *             "Message to you",
         *             "This is a heading", 
         *             "And this is a text below the heading"
         *         ).then
         *         {
         *             function ()
         *             {
         *                 window.alert ("Bye!");
         *             }
         *         };
         *     }
         * );
         * 
         * @class       TTextWindow
         */
        TTextWindow = 
        {
            /**
             * JSON schema to validate the text window's configuration descriptor.
             * 
             * @constant
             * @type        JSON schema
             * @private
             */
            kSchemaParams:
            {
                "$schema":      "http://json-schema.org/draft-03/schema#",
                "title":        "Text window descriptor",
                "description":  "Descriptor for a text window",
                "type":         "object",
                properties:
                {
                    "host":
                    {
                        "description":      "The object hosting this text window",
                        "type":             "object"
                    },
                    "onClose":
                    {
                        "description":      "Callback to invoke when the user closes this text window.",
                        "type":             "function"
                    }
                }
            },

            /**
             * The underlying dijit dialog.
             * 
             * @type        dijit/Dialog
             * @private
             */
            fDialog: null,
            
            /**
             * The callback to be executed when the user closes this text window.
             * 
             * @type    JSFunction
             * @private
             */
            fHandlerOnClose: null,
            
            /**
             * The client using this dialog.
             * 
             * @type        JSObject
             * @private
             */
            fHost: null,
            
            /**
             * The DOM element hosting the heading (above the message text).
             * 
             * @type        DOMNode
             * @private
             */
            fNodeHeading: null,
            
            /**
             * The DOM element hosting the message text.
             * 
             * @type        DOMNode
             * @private
             */
            fNodeText: null,
            
            /**
             * The promise, to use this dialog inside a <code>.then</code> construct.
             * 
             * @type    dojo/Deferred
             * @private
             */
            fSemaphore: null,
            
            /**
             * Shows the text window and sets title, heading and text. Title appears 
             * in the dialog's title bar, heading appears above the text and text 
             * appears inside a TEXTAREA element.
             * 
             * @param       {String}    title       The text window's title.
             * @param       {String}    heading     The heading above the text.
             * @param       {String}    text        The text.
             * @returns     {dojo/Deferred}         A Deferred object, if the window is
             *                                      to be shown using the promise API.
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
             * cTor.
             * 
             * @param {JSON}    params      The text window's configuration.  Must 
             *                              conform to {@link TTextWindow.kSchemaParams}.
             */
            constructor: function (params)
            {
                JSObjectValidator.AssertValid (params, this.kSchemaParams, "constructor");
                this.fDialog            = null;
                this.fHandlerOnClose    = params.onClose;
                this.fHost              = params.host;
                this.fNodeHeading       = null;
                this.fNodeText          = null;
                this.fSemaphore         = null;
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
             * Startup method. Sets up the text window.
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
                            _this.fHandlerOnClose.call (this.fHost);
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
