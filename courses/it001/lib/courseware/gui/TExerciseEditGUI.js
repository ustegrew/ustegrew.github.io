/**
 *  @fileoverview        Main interface for a course.
 */
define 
(
    [
        "dojo/_base/declare",
        "dijit/_WidgetBase",
        "dojo/dom",
        "dojo/dom-construct",
        "dojo/on",
        "dijit/MenuBar",
        "dijit/PopupMenuBarItem",
        "dijit/Menu",
        "dijit/MenuItem",
        "dijit/MenuSeparator",
        "dijit/DropDownMenu",
        "ace/TAce",
        "dijit/Editor",
        "dijit/_editor/plugins/FontChoice"
    ],
    function 
    (
        declare,
        _WidgetBase,
        dom,
        domConstruct,
        on,
        TMenuBar,
        TPopupMenuBarItem,
        TMenu,
        TMenuItem,
        TMenuSeparator,
        TDropDownMenu,
        TAceEdit,
        TRichTextEdit,
        TRichTextEditFontChoice
    )
    {
        var TExerciseEditGUI;
        var ret;

        /**
         * Class for the exercise editor UI. A text editor panel. Can
         * show either the ACE editor component or a rich text editor.
         * 
         * <pre>    
         *     .------.--------------------------------------.
         *     | File |                                      |
         *     .---------------------------------------------.
         *     |                                             |
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
         * Elements on the user interface:
         * 
         * <dl>
         *     <dt>Content panel</dt>
         *     <dd>The content of the user's solution.</dd>
         *     
         *     <dt>Menu bar</dt>
         *     <dd>As in current user interfaces for applications.</dd>
         * </dl>
         * 
         * @class       TExerciseEditGUI
         * @augments    _WidgetBase
         * @augments    _TemplateMixin
         */
        TExerciseEditGUI = 
        {
            EType:
            {
                kRichText:      10,
                kSourceCode:    20
            },
            
            ESrcLang:
            {
                kJavascript:    10,
                kHTML:          20,
                kPlaintext:     30
            },
            
            ClearFlagChanged : function ()
            {
                this.fAPIEditor.fHasChanged = false;
            },
            
            GetContent: function () 
            {
                var ret;
                
                ret = this.fAPIEditor.GetContent ();
                
                return ret;
            },
            
            HasChanged: function ()
            {
                var ret;
                
                ret = this.fAPIEditor.fHasChanged;
                
                return ret;
            },
            
            SetContent: function (content)
            {
                this.fAPIEditor.SetContent (content);
            },
            
            SetType: function (type, lang)
            {
                this._SetType (type, lang);
            },
            
            /**
             * Dojo specific cTor.
             * 
             * @param   {type} params
             * @returns {undefined}
             */
            constructor: function (params)
            {
                if ((typeof params.fHost !== 'object') ||  (params.fHost == null))
                {
                    throw "TExerciseEditGUI::constructor (): params.fHost is " +
                          "not an object. Clients must set params.fHost to a " +
                          "valid object (e.g. 'this' reference or window object).";
                }
                
                this.fPnlWrapperEdit    = null;
                this.fPnlWrapper        = null;
                this.fHost              = params.fHost;
                this.fAPIEditor =
                {
                    fEarlyContent:  null,                                       /* [21] */
                    fEditor:        null,
                    fHasEditor:     false,                                      /* [20] */
                    fHasChanged:    false,
                    GetContent:     null,
                    SetContent:     null
                };
                this.fConfig =
                {
                    fHeight:    params.fHeight,                                 /* [22] */
                    fWidth:     params.fWidth                                   /* [22] */
                };
                this.fHandlers =                                                /* [10] */
                {
                    onCancel:   params.onCancel,
                    onLoad:     params.onLoad,
                    onSave:     params.onSave
                };
            },
            
            /* -------------------------------------------------------------
             * Dijit overrides 
             * ------------------------------------------------------------- */
        
            /**
             * Sets up the UI. This overrides the _WidgetBase::startup (). 
             * We don't use the typical way of overriding 
             * _WidgetBase::postCreate (), because this widget includes 
             * child widgets (such as BorderContainer), and it's not 
             * recommended to do JS resizing in the postCreate() method. 
             * We could get fancy and do part of the instantiation in a 
             * postCreate() method, but having everything together in 
             * startup () makes things simpler.
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
                
                var pnlWrapper;
                var pnlWrapperMenuBar;
                var pnlWrapperEdit;
                var wrStyle;
                var menuBar;
                var subMenu;

                this.fAPIEditor.fHasEditor = false;                             /* [20] */

                this.fAPIEditor.GetContent = function ()
                {
                    _host._Log ("fAPIEditor.GetContent: Has not been set. Did you call SetType (...)?");
                };
                
                this.fAPIEditor.SetContent = function ()
                {
                    _host._Log ("fAPIEditor.SetContent: Has not been set. Did you call SetType (...)?");
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
                            onClick:    function () {_host.fHandlers.onSave.call (_host.fHost);}
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
                            onClick:    function (){_host.fHandlers.onCancel.call (_host.fHost);}
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
            
            _SetType: function (type, srcLang)
            {
                var _host = this;
                
                var eType;
                var eLang;
                var wrStyle;
                if (this.fAPIEditor.fHasEditor)                                 /* [20] */
                {
                    this.fAPIEditor.fEditor.destroy ();
                    this.fAPIEditor.fEditor         = null;
                    this.fAPIEditor.fEarlyContent   = null;
                    this.fAPIEditor.fHasEditor      = false;                    /* [20] */
                    domConstruct.destroy (this.fPnlWrapperEdit);
                }
                
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
                        wrStyle                 = "left:0px;right:2px;";
                        this.fPnlWrapperEdit    = domConstruct.create 
                        (
                            "div",
                            {
                                style: wrStyle
                            }
                        );
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
                        this.fAPIEditor.fEditor = new TRichTextEdit             /* <----- Property: fAPIEditor.fEditor */
                        (
                            {
                                width:          this.fConfig.fWidth,
                                height:         this.fConfig.fHeight,
                                plugins:
                                [
                                    'cut', 'copy', 'paste',                         '|',
                                    'undo','redo',                                  '|',
                                    'bold','italic','underline',                    '|', 
                                    'justifyLeft', 'justifyCenter', 'justifyRight'
                                ],
                                extraPlugins:   
                                [
                                    '|',
                                    {
                                        name:       "formatBlock",
                                        plainText:  true
                                    }
                                ],
                                onChange: function ()
                                {
                                    _host.fAPIEditor.fHasChanged = true;
                                }
                            },
                            this.fPnlWrapperEdit
                        );
                        this.fAPIEditor.fEditor.onLoadDeferred.then
                        (
                            function ()
                            {
                                _host.fAPIEditor.fHasEditor = true;             /* [20] */
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
                                _host.fAPIEditor.fHasChanged = true;
                            }
                        );
                    
                        break;
                        
                    default:
                        throw "TExerciseEditGUI::Unknown text type: " + type;
                }
                
                domConstruct.place (this.fPnlWrapperEdit, this.fPnlWrapper, "last");
            },
            
            _HandleOnLoad: function ()
            {
                if (this.fAPIEditor.fEarlyContent !== null)
                {
                    this.fAPIEditor.SetContent (this.fAPIEditor.fEarlyContent);
                }
                this.fHandlers.onLoad.call (this.fHost);
            },
            
            _Log: function (msg)
            {
                console.log ("TExerciseEditGUI::" + msg);
            },
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
                     
        

 */      
