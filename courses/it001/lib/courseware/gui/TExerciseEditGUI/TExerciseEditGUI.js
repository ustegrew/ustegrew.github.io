/**
 *  @fileoverview        A multi type editor component.
 */
define 
(
    [
        "dojo/_base/declare",
        "dijit/_WidgetBase",
        "dojo/has",
        "dojo/dom-construct",
        "courseware/util/validator/TValidatorJSON",
        "dijit/MenuBar",
        "dijit/PopupMenuBarItem",
        "dijit/MenuItem",
        "dijit/MenuSeparator",
        "dijit/DropDownMenu",
        "ace/TAce",
        "dijit/Editor",
        "dijit/_editor/plugins/FontChoice",
        "dojo/_base/sniff"
    ],
    function 
    (
        declare,
        _WidgetBase,
        has,
        domConstruct,
        JSObjectValidator,
        TMenuBar,
        TPopupMenuBarItem,
        TMenuItem,
        TMenuSeparator,
        TDropDownMenu,
        TAceEdit,
        TRichTextEdit
    )
    {
        /* Debug flag - for that extra info in hard places! */
        var gDebug = false;
        
        /**
         * The editor's content change observer. Observes the associated editor for
         * changes of content. 
         * 
         * @class           TObserver_ContentChanged
         * @private
         * @see [110]
         */
        var TObserver_ContentChanged = function (host)                          
        {
            /* Local reference to 'this' - for callbacks, 
             * so we can run them in the proper context 
             */
            var _this               = this;
            
            /**
             * Interval [ms] between main loop cycles.
             */
            var kObserverInterval   = 1000;                                          /* [110] */
            
            /**
             * Possible states of this observer.
             * 
             * @enum        {int}
             * @private
             */
            var EObserverState =
            {
                kWait:          10,     /* Observer inactive, i.e. not observing.   */
                kRunning:       20      /* Observer active, i.e. observing.         */
            }
            
            /**
             * Content from previous observation.
             * 
             * @type    String
             * @private
             */
            this.fContentOld    = null;
            
            /**
             * The client using this observer
             * 
             * @type courseware/gui/TExerciseEditGUI
             * @private
             */
            this.fHost          = host;
            
            /**
             * The current state of this observer.
             * 
             * @type    EObserverState
             * @private
             */
            this.fState         = EObserverState.kWait; 
            
            /**
             * Sets this observer's state to inactive.
             */
            this.SetPaused = function ()
            {
                if (gDebug) console.log ("TExerciseEditGUI::TObserver_ContentChanged::SetPaused ()");

                _this.fState = EObserverState.kWait;
            };
            
            /**
             * Sets this observer's state to active.
             */
            this.SetRunning = function ()
            {
                if (gDebug)
                {
                    if (_this.fState != EObserverState.kRunning)
                    {
                        console.log ("TExerciseEditGUI::TObserver_ContentChanged::SetRunning ()");
                    }
                    else
                    {
                        console.log ("TExerciseEditGUI::TObserver_ContentChanged::SetRunning (): Cancelled as we are already in run state.");
                    }
                }

                if (_this.fState != EObserverState.kRunning)                    /* [112] */
                {
                    _this.fContentOld   = this.fHost.fAPIEditor.GetContent ();
                    _this.fState        = EObserverState.kRunning;
                    _this._Run ();
                }
            }
            
            /**
             * The central loop.  Queries the editor's content and fires an onChange event if
             * the editor's content has changed.
             */
            this._Run = function ()
            {
                var content;
                var doQuery;
                
                doQuery     = this.fState == EObserverState.kRunning    &&
                              this.fHost.fAPIEditor.fHasEditor; //      && what else ?
                
                if (doQuery)
                {
                    content = this.fHost.fAPIEditor.GetContent ();
                    if (content !== this.fContentOld)                           /* [111] */
                    {
                        this.fContentOld                   = content;
                        this.fHost.fAPIEditor.fHasChanged  = true;
                        this.fHost.fHandlers.onFinishedChange.call (this.fHost.fHost);
                    }
                    window.setTimeout (function () {_this._Run.call (_this)}, kObserverInterval);
                }
            };
            
            /* We begin this observer in inactive state. */
            this.fState = EObserverState.kWait;
        };
        
        
        var TExerciseEditGUI;
        var ret;

        /**
         * Class for the exercise editor UI. A text editor panel. Can
         * show either the ACE editor component or a Rich text editor. 
         * Provides a menu bar for some actions such as "save document".
         * The editor component can be changed during runtime to cater for
         * a different file type. The component accepts the following file types:
         * 
         * <ul>
         *     <li>
         *         rtf: Free form text. UI will show a richtext editor.
         *     </li>
         *     <li>
         *         src/js: Javascript source code. UI will show a source code 
         *         editor with basic syntax checking for Javascript code.
         *     </li>
         *     <li>
         *         src/html: HTML source code. UI will show a source code  
         *         editor with basic syntax checking for HTML code.
         *     </li>
         *     <li>
         *         src/plain_text: Plain text. UI will show a source code  
         *         editor without any syntax checking.
         *     </li>
         * </ul>
         * <p><br/></p>
         * 
         * <b>Elements on the user interface</b>
         * <pre>    
         *     .------.--------------------------------------.
         *     | File |                                      |
         *     .---------------------------------------------.
         *     | Content panel                               |
         *     |                                             |
         *     |                                             |
         *     |                                             |
         *     |                                             |
         *     |                                             |
         *     |                                             |
         *     |                                             |
         *     |                                             |
         *     '---------------------------------------------'
         * </pre>
         * 
         * <dl>
         *     <dt>Menu bar</dt>
         *     <dd>For actions such as "Save", "Close", ...</dd>
         *     
         *     <dt>Content panel</dt>
         *     <dd>The content of the user's solution.</dd>
         * </dl>
         * <p><br/></p>
         * 
         * <b>Please note</b> that the component will look different depending on 
         * the environment. For example, if we run on anything but Chrome and Firefox
         * the rich text editor will show a reduced feature set. Tests showed that 
         * on Safari, the underlying dijit/Editor didn't do formatting properly. In summary:
         * 
         * <table border="1">
         *     <tr>
         *         <th>Browser used</th>
         *         <th>Specifics</th>
         *     </tr>
         *     <tr>
         *         <td>Chrome or Firefox</td>
         *         <td>All features offered.</td>
         *     </tr>
         *     <tr>
         *         <td>Anything but Chrome or Firefox</td>
         *         <td>Rich text editor has no formatting capabilities.</td>
         *     </tr>
         * </table>
         * <p><br/></p>
         * 
         * <b>Example use - Instantiate editor, set type, set content, get content.</b>
         * @example
         * require 
         * (
         *     [
         *         "dojo/dom-construct",
         *         "courseware/gui/TExerciseEditGUI/TExerciseEditGUI"
         *     ],
         *     function 
         *     (
         *         domConstruct,
         *         TExerciseEditGUI
         *     )
         *     {
         *         var editor;
         *         var cnt;
         * 
         *         // Create editor instance
         *         editor = new TExerciseEditGUI
         *         (
         *             {
         *                 fHost:              window,
         *                 fWidth:             "745px"
         *                 fHeight:            "480px"
         *                 onFinishedChange:   function () {console.log ("Content changed.");},
         *                 onFinishedLoad:     function () {console.log ("Text loaded.");},
         *                 onRequestCancel:    function () {console.log ("User requested to close the document.");},
         *                 onRequestSave:      function () {console.log ("User requested to save the document.");}
         *             }
         *         );
         *         editor.startup ();
         * 
         *         // Embed editor in DOM element on hosting page. Assume, element has ID "pnlEditor"
         *         domConstruct.place (editor.domNode, "pnlEditor", "only");
         * 
         *         // Set editor to be a javascript source code editor.  Set content.
         *         editor.SetType      ("src", "js");
         *         editor.SetContent   ("// This is a javascript comment");
         * 
         * 
         *         // ... lots of stuff; some time later, and user has done lots of editing...
         * 
         *         
         *         // Read editor content.
         *         cnt = editor.GetContent ();
         *         console.log (cnt);
         * 
         * 
         *         // ... lots of stuff; some time later...
         * 
         *         
         *         // Set editor to be a rich text editor. Set content.
         *         editor.SetType      ("rtf", "plain_text");
         *         editor.SetContent   ("&lt;h1&gt;This is a heading&lt;/h1&gt;&lt;p&gt;And this is a paragraph.&lt;/p&gt;");
         * 
         * 
         *         // ... lots of stuff; some time later, and user has done lots of editing...
         * 
         *         
         *         // Read editor content.
         *         cnt = editor.GetContent ();
         *         console.log (cnt);
         *     }
         * );
         * 
         * @class       TExerciseEditGUI
         * @augments    _WidgetBase
         * @augments    _TemplateMixin
         */
        TExerciseEditGUI = 
        {
            /**
             * JSON schema to validate the editor's configuration descriptor.
             * 
             * @constant
             * @type        JSON schema
             * @private
             */
            kSchemaParams:
            {
                "$schema":      "http://json-schema.org/draft-03/schema#",
                "title":        "Content editor descriptor",
                "description":  "Descriptor for a content editor.",
                "type":         "object",
                properties:
                {
                    "fHeight":
                    {
                        "description":      "The total height of the GUI, incl. menu bar",
                        "type":             "string"
                    },
                    "fHost":
                    {
                        "description":      "The object hosting this editor",
                        "type":             "object"
                    },
                    "fWidth":
                    {
                        "description":      "The total width of the GUI",
                        "type":             "string"
                    },
                    "onFinishedChange":
                    {
                        "description":      "Callback to invoke when the observer noticed a content change",
                        "type":             "function"
                    },
                    "onFinishedLoad":
                    {
                        "description":      "Callback to invoke when the content has finished loading",
                        "type":             "function"
                    },
                    "onRequestCancel":
                    {
                        "description":      "Callback to invoke when the user requested to close the editor",
                        "type":             "function"
                    },
                    "onRequestSave":
                    {
                        "description":      "Callback to invoke when the user requested to save the current content",
                        "type":             "function"
                    },
                }
            },

            /**
             * Possible document types.
             * 
             * @private
             */
            EType:
            {
                kRichText:      10,
                kSourceCode:    20
            },
            
            /**
             * Possible source language types.
             * 
             * @private
             */
            ESrcLang:
            {
                kJavascript:    10,
                kHTML:          20,
                kPlaintext:     30
            },
  
            /**
             * The API adapter to the underlying editor.
             * 
             * @type        {JSObject}
             * @private
             */
            fAPIEditor:                     null,
            
            /**
             * The configuration. Holds quantities such as height/width etc.
             * 
             * @type        {JSON}
             * @private
             */
            fConfig:                        null,
            
            /**
             * The event handlers.
             * 
             * @type        {JSObject}
             * @private
             */
            fHandlers:                      null,
            
            /**
             * The hosting client.
             * 
             * @type        {JSObject}
             * @private
             */
            fHost:                          null,
            
            /**
             * The associated content observer - to observe the contents for changes.
             * 
             * @type        {TObserver_ContentChanged}
             * @private
             */
            fObserver_ContentChanged:       null,
            
            /**
             * The outer DOM element wrapping editor and menu bar.
             * 
             * @type        {DOMElement}
             * @private
             */
            fPnlWrapper:                    null,
            
            /**
             * The DOM element wrapping the editor.
             * 
             * @type        {DOMElement}
             * @private
             */
            fPnlWrapperEdit:                null,

            /**
             * Clear the <code>fHasChanged</code> flag. This flag is set to <code>true</code>
             * whenever the associated change observer notices that the editor's content has changed.
             */
            ClearFlagChanged : function ()
            {
                if (gDebug) console.log ("TExerciseEditGUI::ClearFlagChanged ()");
                
                this.fAPIEditor.fHasChanged = false;
            },
            
            /**
             * Destroys this editor instance
             */
            Destroy: function ()
            {
                if (gDebug) console.log ("TExerciseEditGUI::Destroy ()");

                this.fAPIEditor.Destroy ();
            },

            /**
             * Returns the stored text content.
             * 
             * @return      {String}        The stored content.
             */
            GetContent: function () 
            {
                if (gDebug) console.log ("TExerciseEditGUI::GetContent ()");
                
                var ret;
                
                ret = this.fAPIEditor.GetContent ();
                
                return ret;
            },

            /**
             * Returns <code>true</code> if the associated observer noticed a content change, 
             * <code>false</code> otherwise.<br/>
             * Note that the value of the hasChanged flag is persistent, i.e. clients have 
             * to reset this flag deliberately by calling the {@link TExerciseEditGUI#ClearFlagChanged}
             * method.  
             * 
             * @return      {boolean}       <code>true</code> if the associated observer 
             *                              noticed a content change, <code>false</code> 
             *                              otherwise.
             */
            HasChanged: function ()
            {
                if (gDebug) console.log ("TExerciseEditGUI::HasChanged ()");
                
                var ret;
                
                ret = this.fAPIEditor.fHasChanged;
                
                return ret;
            },

            /**
             * Sets the editor's content.
             * 
             * @param       {String}    content         The content we want to set in the editor.
             */
            SetContent: function (content)
            {
                if (gDebug) console.log ("TExerciseEditGUI::SetContent ()");
                
                this.fAPIEditor.SetContent (content);
            },

            /**
             * Suspends change observation, i.e. sets the associated change observer to 
             * inactive state {@link TObserver_ContentChanged}.  
             */
            SetOberverContentChanged_Paused: function ()
            {
                if (gDebug) console.log ("TExerciseEditGUI::SetOberverContentChanged_Paused ()");
                
                this.fAPIEditor.SetObserverPaused ();
            },

            /**
             * Resumes change observation, i.e. sets the associated change observer to 
             * active state {@link TObserver_ContentChanged}.
             */
            SetOberverContentChanged_Running: function ()
            {
                if (gDebug) console.log ("TExerciseEditGUI::SetOberverContentChanged_Running ()");
                
                this.fAPIEditor.SetObserverRunning ();
            },

            /**
             * Sets the editor type. This will also choose the appropriate editor. For example, 
             * if the type is set to "rtf" then we will show a rich text editor. The following 
             * types and languages are available:
             * 
             * <table border="1">
             *     <tr>
             *         <th>Type</th>
             *         <th>Language</th>
             *         <th>Document type</th>
             *     </tr>
             *     <tr>
             *         <td><code>rtf</code></td>
             *         <td><i>ignored</i></td>
             *         <td>Free, formattable text.</td>
             *     </tr>
             *     <tr>
             *         <td><code>src</code></td>
             *         <td><code>js</code></td>
             *         <td>Javascript source code.</td>
             *     </tr>
             *     <tr>
             *         <td><code>src</code></td>
             *         <td><code>html</code></td>
             *         <td>HTML source code</td>
             *     </tr>
             *     <tr>
             *         <td><code>src</code></td>
             *         <td><code>plain_text</code></td>
             *         <td>Plain text without formatting.</td>
             *     </tr>
             *     <tr>
             *         <td><code>src</code></td>
             *         <td><i>unknown</i></td>
             *         <td>Plain text without formatting. Will create an entry in the web browser's console log.</td>
             *     </tr>
             *     <tr>
             *         <td><i>unknown</i></td>
             *         <td><i>ignored</i></td>
             *         <td>Plain text without formatting.  Will create an entry in the web browser's console log.</td>
             *     </tr>
             * </table>
             * 
             * Depending on type and language we will choose the appropriate underlying 
             * editor. For free form text we will present a rich text editor, for source text
             * we will present a source code editor. For unknown types and/or languages
             * we will present a plain vanilla text editor.
             * 
             * @return      {} 
             */
            SetType: function (type, lang)
            {
                if (gDebug) console.log ("TExerciseEditGUI::SetType ()");
                
                this._SetType (type, lang);
            },
            
            /**
             * cTor.
             * 
             * @param       {JSON}      params      The editor's configuration. Must conform to
             *                                      {@link TExerciseEditGUI.kSchemaParams}.
             */
            constructor: function (params)
            {
                if (gDebug) console.log ("TExerciseEditGUI::constructor ()");
                
                JSObjectValidator.AssertValid (params, this.kSchemaParams, "constructor");
                if (params.fHost == null)
                {
                    throw "TExerciseEditGUI::constructor (): params.fHost is " +
                          "not an object. Clients must set params.fHost to a " +
                          "valid object (e.g. 'this' reference or window object).";
                }
                
                this.fObserver_ContentChanged   = new TObserver_ContentChanged (this);
                this.fPnlWrapperEdit            = null;
                this.fPnlWrapper                = null;
                this.fHost                      = params.fHost;
                this.fAPIEditor =
                {
                    fEarlyContent:              null,                                   /* [21] */
                    fEditor:                    null,
                    fHasEditor:                 false,                                  /* [20] */
                    fHasChanged:                false,
                    fObserverContentChanged:    this.fObserver_ContentChanged,
                    Destroy:                    null,
                    GetContent:                 null,
                    SetContent:                 null,
                    SetObserverPaused: function ()
                    {
                        this.fObserverContentChanged.SetPaused ();
                    },
                    SetObserverRunning: function ()
                    {
                        this.fObserverContentChanged.SetRunning ();
                    }
                };
                this.fConfig =
                {
                    fHeight:    params.fHeight,                                 /* [22] */
                    fWidth:     params.fWidth                                   /* [22] */
                };
                this.fHandlers =                                                /* [10] */
                {
                    onFinishedChange:   params.onFinishedChange,
                    onFinishedLoad:     params.onFinishedLoad,
                    onRequestCancel:    params.onRequestCancel,
                    onRequestSave:      params.onRequestSave
                };
            },
            
            /**
             * dTor
             */
            destroy: function ()
            {
                if (gDebug) console.log ("TExerciseEditGUI::destroy ()");

                this.fAPIEditor.Destroy ();
            },
            
            /**
             * Startup method. Sets up the UI skeleton.
             */
            startup: function ()
            {
                if (gDebug) console.log ("TExerciseEditGUI::startup ()");
                
                var _host = this;
                
                var pnlWrapper;
                var pnlWrapperMenuBar;
                var pnlWrapperEdit;
                var wrStyle;
                var menuBar;
                var subMenu;

                this.fAPIEditor.fHasEditor = false;                             /* [20] */
                
                this.fAPIEditor.Destroy = function ()
                {
                    if (gDebug) console.log ("TExerciseEditGUI::fAPIEditor::Destroy () [initial version]");
                    /* Do nothing else. [23] */
                }
                
                this.fAPIEditor.GetContent = function ()
                {
                    _host._Log ("fAPIEditor.GetContent (): Has not been set. Did you call SetType (...)?");
                };
                
                this.fAPIEditor.SetContent = function ()
                {
                    _host._Log ("fAPIEditor.SetContent (): Has not been set. Did you call SetType (...)?");
                }

                /**
                 * Set up menu bar.
                 */
                wrStyle = "top:0px;bottom:0px;left:0px;right:0px;";
                pnlWrapperMenuBar = domConstruct.create
                (
                    "div",
                    {
                        style:  wrStyle
                    }
                );
                menuBar     = new TMenuBar ({});
                subMenu     = new TDropDownMenu ({});
                subMenu.addChild 
                (
                    new TMenuItem
                    (
                        {
                            label:      "Save",
                            onClick:    function () {_host.fHandlers.onRequestSave.call (_host.fHost);}
                        }
                    )
                );
                subMenu.addChild 
                (
                    new TMenuSeparator ()
                );
                subMenu.addChild 
                (
                    new TMenuItem
                    (
                        {
                            label:      "Close",
                            onClick:    function (){_host.fHandlers.onRequestCancel.call (_host.fHost);}
                        }
                    )
                );
                menuBar.addChild
                (
                    new TPopupMenuBarItem
                    (
                        {
                            label:      "File",
                            popup:      subMenu
                        }
                    )
                );
                menuBar.startup ();
                menuBar.placeAt (pnlWrapperMenuBar);
                
                pnlWrapperEdit = domConstruct.create ("div");
                
                pnlWrapper = domConstruct.create 
                (
                    "div",
                    {
                        style:  "width:" + this.fConfig.fWidth + ";height" + this.fConfig.fHeight + ";"
                    }
                );
                domConstruct.place (pnlWrapperMenuBar,  pnlWrapper,     "only");
                domConstruct.place (pnlWrapperEdit,     pnlWrapper,     "last");
                domConstruct.place (pnlWrapper,         this.domNode,   "only");
                
                this.fPnlWrapper        = pnlWrapper;
                this.fPnlWrapperEdit    = pnlWrapperEdit;
            },

            /**
             * Sniffs some environment properties (e.g. which browser we run in) and 
             * returns a record containing various indicators as to what capabilities 
             * and features we can offer.
             * 
             * @return      {JSON}      A record containing feature information. 
             */
            _GetFeatureProfile: function ()
            {
                var ret;
                
                ret = 
                {
                    fNeedSimpleRichtextEditor:      true
                };
                
                if (has ("ff"))
                {
                    ret.fNeedSimpleRichtextEditor = false;
                }
                else if (has ("chrome"))
                {
                    ret.fNeedSimpleRichtextEditor = false;
                }
                
                return ret;
            },

            /**
             * Specific handler, invoked when content is loaded.
             */
            _HandleOnLoad: function ()
            {
                if (gDebug) console.log ("TExerciseEditGUI::_HandleOnLoad ()");
                
                if (this.fAPIEditor.fEarlyContent !== null)
                {
                    this.fAPIEditor.SetContent (this.fAPIEditor.fEarlyContent);
                }
                this.fHandlers.onFinishedLoad.call (this.fHost);
            },
            
            /**
             * Logs a message to the web console.
             * 
             * @param       {String}    msg     The message to be logged.
             * 
             * @private
             */
            _Log: function (msg)
            {
                console.log ("TExerciseEditGUI::" + msg);
            },

            /**
            * Sets up the editor specific to the desired document type and source language. 
            * 
            * @param       {String}     type        The document type (e.g. 'rtf' for free form text).
            * @param       {String}     srcLang     The source language (e.g. 'js' for javascript).
            * 
            * @private
            * @see          {@link TExerciseEditGUI.SetType}    for details on type and language.
            */
            _SetType: function (type, srcLang)
            {
                if (gDebug) console.log ("TExerciseEditGUI::_SetType ('" + type + "', '" + srcLang + "')");
                
                var _host = this;
                
                var featureProfile;
                var eType;
                var eLang;
                var wrStyle;
                
                this.fAPIEditor.Destroy ();
                
                if (type === "rtf")
                {
                    eType   = this.EType.kRichText;
                    eLang   = this.ESrcLang.kPlaintext;
                }
                else if (type === "src")
                {
                    eType = this.EType.kSourceCode;
                    if (srcLang === "js")
                    {
                        eLang = this.ESrcLang.kJavascript;
                    }
                    else if (srcLang === "html")
                    {
                        eLang = this.ESrcLang.kHTML;
                    }
                    else if (srcLang === "plain_text")
                    {
                        eLang = this.ESrcLang.kPlaintext;
                    }
                    else
                    {
                        eLang   = this.ESrcLang.kPlaintext;
                        this._Log ("Unknown source language: " + srcLang + ". Set to kSourceCode/kPlaintext.");
                    }
                }
                else
                {
                    eType   = this.EType.kRichText;
                    eLang   = this.ESrcLang.kPlaintext;
                    this._Log ("Unknown text type: " + type + ". Set to kRichText");
                }
                
                /**
                 * Set up editor component
                 */
                switch (eType)
                {
                    case this.EType.kRichText:
                        featureProfile          = this._GetFeatureProfile ();
                        wrStyle                 = "left:0px;right:2px;";
                        this.fPnlWrapperEdit    = domConstruct.create 
                        (
                            "div",
                            {
                                style: wrStyle
                            }
                        );
                        this.fAPIEditor.Destroy = function ()
                        {
                            if (gDebug) console.log ("TExerciseEditGUI::fAPIEditor::Destroy ()  [kRichText version]");

                            _host.fAPIEditor.SetObserverPaused ();
                            if (_host.fAPIEditor.fHasEditor)
                            {
                                _host.fAPIEditor.fEditor.destroy ();
                                _host.fAPIEditor.fHasEditor      = false;
                                _host.fAPIEditor.fEditor         = null;
                                _host.fAPIEditor.fEarlyContent   = null;
                            }
                        };
                        this.fAPIEditor.GetContent = function ()                /* [100] */
                        {
                            var ret;
                            
                            if (_host.fAPIEditor.fHasEditor)                    /* [20] */
                            {
                                ret = _host.fAPIEditor.fEditor.get ("value");
                            }
                            else
                            {
                                throw "TExerciseEditGUI::fAPIEditor.GetContent<TRichTextEdit>: Editor hasn't finished loading yet. Can't retrieve content."
                            }
                            
                            return ret;
                        };
                        this.fAPIEditor.SetContent = function (content)         /* [100] */
                        {
                            if (_host.fAPIEditor.fHasEditor)
                            {
                                _host.fAPIEditor.fEarlyContent = null;
                                _host.fAPIEditor.fEditor.set ("value", content);
                            }
                            else
                            {
                                _host.fAPIEditor.fEarlyContent = content;
                            }
                        };
                        
                        if (featureProfile.fNeedSimpleRichtextEditor)
                        {
                            this.fAPIEditor.fEditor = new TRichTextEdit             /* <----- Property: fAPIEditor.fEditor */
                            (
                                {
                                    width:          this.fConfig.fWidth,
                                    height:         this.fConfig.fHeight,
                                    plugins:
                                    [
                                        'cut', 'copy', 'paste',                         '|',
                                        'undo','redo'
                                    ]
                                },
                                this.fPnlWrapperEdit
                            );
                        }
                        else
                        {
                            this.fAPIEditor.fEditor = new TRichTextEdit             /* <----- Property: fAPIEditor.fEditor */
                            (
                                {
                                    width:          this.fConfig.fWidth,
                                    height:         this.fConfig.fHeight,
                                    plugins:
                                    [
                                        'cut', 'copy', 'paste',                                             '|',
                                        'undo','redo',                                                      '|',
                                        'bold','italic','underline',                                        '|',
                                        'justifyLeft', 'justifyCenter', 'justifyRight',                     '|',
                                        'insertOrderedList','insertUnorderedList', 'indent', 'outdent'
                                    ],
                                    extraPlugins:   
                                    [
                                        '|',
                                        {
                                            name:       "formatBlock",
                                            plainText:  true
                                        }
                                    ]
                                },
                                this.fPnlWrapperEdit
                            );
                        }
                        this.fAPIEditor.fEditor.onLoadDeferred.then
                        (
                            function ()
                            {
                                _host.fAPIEditor.fHasEditor         = true;             /* [20] */
                                _host._HandleOnLoad.call (_host);
                            }
                        );
                        this.fAPIEditor.fEditor.startup ();
                        break;
                        
                    case this.EType.kSourceCode:
                        wrStyle    = "width:100%;height:" + this.fConfig.fHeight + ";";
                        this.fPnlWrapperEdit = domConstruct.create 
                        (
                            "div",
                            {
                                style: wrStyle
                            }
                        );

                        switch (eLang)
                        {
                            case this.ESrcLang.kJavascript:
                                srcType = "javascript";
                                break;
                            case this.ESrcLang.kHTML:
                                srcType = "html";
                                break;
                            default:
                                srcType = "plain_text";
                        }
                        
                        this.fAPIEditor.Destroy = function ()
                        {
                            if (gDebug) console.log ("TExerciseEditGUI::fAPIEditor::Destroy () [kAceEdit version]");

                            _host.fAPIEditor.SetObserverPaused ();
                            if (_host.fAPIEditor.fHasEditor)
                            {
                                _host.fAPIEditor.fEditor.destroy ();
                                _host.fAPIEditor.fHasEditor      = false;
                                _host.fAPIEditor.fEditor         = null;
                                _host.fAPIEditor.fEarlyContent   = null;
                            }
                        };
                        this.fAPIEditor.GetContent = function ()                /* [100] */
                        {
                            var ret;

                            if (_host.fAPIEditor.fHasEditor)                    /* [20] */
                            {
                                ret = _host.fAPIEditor.fEditor.GetContent ();
                            }
                            else
                            {
                                throw "TExerciseEditGUI::fAPIEditor.GetContent<TAceEdit>: Editor hasn't finished loading yet. Can't retrieve content."
                            }
                            
                            return ret;
                        };
                        this.fAPIEditor.SetContent = function (content)         /* [100] */
                        {
                            if (_host.fAPIEditor.fHasEditor)
                            {
                                _host.fAPIEditor.fEarlyContent = null;
                                _host.fAPIEditor.fEditor.SetContent (content);
                            }
                            else
                            {
                                _host.fAPIEditor.fEarlyContent = content;
                            }
                        };
                        this.fAPIEditor.fEditor = new TAceEdit ();              /* <----- Property: fAPIEditor.fEditor */
                        this.fAPIEditor.fEditor.Setup
                        (
                            this.fPnlWrapperEdit,
                            srcType,
                            false,
                            true,
                            _host,
                            function ()
                            {
                                _host.fAPIEditor.fHasEditor = true;             /* [20] */
                                _host._HandleOnLoad.call (_host);
                            },
                            function (err)
                            {
                                throw "TExerciseEditGUI::startup(): Error loading ace editor. Details:\n" + 
                                      JSON.stringify (err, null, 4);
                            },
                            function ()
                            {
                                // onChange handler - now done using an observer
                            }
                        );
                    
                        break;
                        
                    default:
                        throw "TExerciseEditGUI::Unknown text type: " + type;
                }
                
                domConstruct.place (this.fPnlWrapperEdit, this.fPnlWrapper, "last");
            }
        };
    
        ret = declare ("TExerciseEditGUI", [_WidgetBase], TExerciseEditGUI);
    
        return ret;
    }
);

/*

[10]:   All event handlers run in the context of the 'host' object provided by the 
        client that created this object when doing cTor call such as: 
            myExercise = new TExerciseGUI ({fHost:someObject}
                        
[20]:   For editor detection we use a flag that is set to false at the earliest 
        possible moment (i.e. after constructor call or immediately after destroying
        any existing editor) and set to true as late as possible (i.e. after the
        asynchronous loading of an editor component is complete. This way we ensure
        reliable editor detection. Testing on this.fAPIEditor.fEditor == null is not
        enough, because in
        
            this.fAPIEditor.fEditor = new TEditor ()
        
        this.fAPIEditor.fEditor may be set to something even if the
        concrete editor hasn't completed loading yet.
        Due to the asynchronous loading we may get problems when trying to access
        the actual editor component too early (e.g. Null exception when trying to 
        get or set the content of the editor even though that one hasn't finished
        loading yet).
                        
[21]:   Clients might try to set the content whilst the actual editor component 
        hasn't finished loading. In that case we cache the content-to-be in a
        property and set the editor content inside the resp. editor's onLoad 
        handler.
                        
[22]:   Bad solution. Forces all clients to specify these values (either hard code 
        or implement some discovery mechanism). Better to let this component discover
        the value automatically.
        Logged as issue#12 on github [https://github.com/ustegrew/ustegrew.github.io/issues/12]
        
[23]:   We won't log the call to the Destroy function, even if _SetType() hasn't been 
        called yet. Otherwise, calling _SetType () for the first time would create a
        log entry (which is annoying). This could be mitigated by introducing some flag 
        (e.g. boolean fHasBeenSetBefore). However, the benefits of this feature are 
        negligible and the cost is yet another obscure feature (makes the code harder to 
        maintain). Not worth doing.        

[100]:  It's important to set the editor's event handlers BEFORE creating the 
        actual editor. This is critical, especially with the Ace editor, as that 
        one loads asynchronously and will invoke the onLoad handler at the wrong
        time. Consider these scenarios where we define the event handlers AFTER
        creating/initializing the ace editor:
        1.      Ace editor is not loaded:
        1.1.        Execute:    this.fAPIEditor.fEditor = new TAceEdit ();
                        This creates a new TAceEdit object
        1.2.        Execute:    this.fAPIEditor.fEditor.Setup
        1.2.1           Execute:    hasAceEditor = (typeof window.ace === "object");
                            This will fail -> hasAceEditor == false
        1.2.2.          Execute FALSE branch of     if (! hasAceEditor)
        1.2.2.1.            Execute     aceLib.get (url).then (...)
                                returns a promise, i.e. waits until ace editor is 
                                actually loaded. Whilst waiting...
        1.3.        Execute:    this.fAPIEditor.GetContent = function ()...
                        Define accessor function
        1.4.        Execute:    this.fAPIEditor.SetContent = function (content)
                        Define accessor function
        1.5.        Execute promise:    _host._Initialize.call (_host);
                        Now (i.e. AFTER loading ace library and AFTER defining 
                        accessor functions! Result: Works perfect!
                        
        2.      Now, with ACE editor loaded:
        2.1.        Execute:    this.fAPIEditor.fEditor = new TAceEdit ();
                        This creates a new TAceEdit object
        2.2.        Execute:    this.fAPIEditor.fEditor.Setup
        2.2.1           Execute:    hasAceEditor = (typeof window.ace === "object");
                            This will PASS -> hasAceEditor == true -> Problem!
        2.2.2.          Execute TRUE branch of     if (! hasAceEditor) {...} else {...}
        2.2.2.1.            Execute     this._Initialize ();
                                Executed immediately
        2.2.2.1.1.              Execute:    this._Exec (this.fCallbackOnLoad, null);
                                    In _Initialize (). Now we have a problem if 
                                    fCallbackOnLoad is not defined correctly! 
                                    It will try to call the wrong event handler.
                        
        Solution: Define the event handlers before creating/initializing the ace editor.
                     
[110]:  We cannot use the onChange event as provided by the dijit/Editor component - that
        one only fires if the content has changed AND the component looses focus. In our
        case we need to fire the onChange event as soon as something changed, even if the 
        component has NOT lost focus. To solve this problem we create an observer function
        which detects content changes and gets called once a second. When content change
        has been detected, the observer fires the onChange event. This covers border 
        cases such as the user copying and pasting content (would not be detected by the 
        dijit/Editor provided onKeyUp event). 
        
        The editor content change detection must use the observer pattern across all 
        editor types - even though we only need it for the dijit/editor component. 
        Otherwise when we switch editor type we'll have to provide some complex framework
        to manage observers when editors change.
        
[111]:  Horribly inefficient, especially when we have longer text (Typical 
        Shlemiel-the-painter-solution). Works for now - maybe we can implement a better 
        solution. Possible: Upon creation, augment the Editor component's inner structure 
        with some sort of DOM event handlers which detect content changes and pass these
        on. Such handlers would need to cover border cases such as the user pasting content, 
        i.e. key press detection is insufficient!
        
[112]:  We set a guard to avoid multiple scheduling of window.setTimeout (...), just in case
        .SetRunning() is called multiple times one after another.
        
 */      
