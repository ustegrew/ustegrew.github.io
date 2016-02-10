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
             * @param   {type} srcNodeRef
             * @returns {undefined}
             */
            constructor: function (params)
            {
                this.fPnlEditor         = null;
                this.fPnlWrapperEdit    = null;
                this.fPnlWrapper        = null;
                this.fHost              = params.fHost;
                this.fAPIEditor =
                {
                    fEditor:        null,
                    fHasChanged:    false,
                    GetContent:     null,
                    SetContent:     null,
                };
                this.fConfig =
                {
                    fHeight:    params.fHeight,
                    fWidth:     params.fWidth
                };
                this.fHandlers =
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
                            onClick:    this.fHandlers.onSave
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
                            onClick:    this.fHandlers.onCancel
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
                
                if (this.fPnlEditor !== null)
                {
                    this.fPnlEditor.destroy ();
                    this.fPnlEditor = null;
                }
                domConstruct.destroy (this.fPnlWrapperEdit);
                
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
                            
                            ret = _host.fPnlEditor.get ("value");
                            
                            return ret;
                        };
                        this.fAPIEditor.SetContent = function (content)         /* [100] */
                        {
                            _host.fPnlEditor.set ("value", content);
                        };
                        this.fPnlEditor = new TRichTextEdit 
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
                        this.fPnlEditor.onLoadDeferred.then
                        (
                            function ()
                            {
                                _host.fHandlers.onLoad ();
                            }
                        );
                        this.fPnlEditor.startup ();
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
                            
                            ret = _host.fPnlEditor.GetContent ();
                            
                            return ret;
                        };
                        this.fAPIEditor.SetContent = function (content)         /* [100] */
                        {
                            _host.fPnlEditor.SetContent (content);
                        };
                        this.fPnlEditor = new TAceEdit ();                      /* <----- Property: fPnlEditor */
                        this.fPnlEditor.Setup
                        (
                            this.fPnlWrapperEdit,
                            srcType,
                            false,
                            true,
                            _host,
                            function ()
                            {
                                _host.fHandlers.onLoad.call (_host);
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
                        throw "TExerciseEditGUI::Unknown text type: " + this.fConfig.fType;
                }
                
                domConstruct.place (this.fPnlWrapperEdit, this.fPnlWrapper, "last");
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

[100]:  It's important to set the editor's event handlers BEFORE creating the 
        actual editor. This is critical, especially with the Ace editor, as that 
        one loads asynchronously and will invoke the onLoad handler at the wrong
        time. Consider these scenarios where we define the event handlers AFTER
        creating/initializing the ace editor:
        1.      Ace editor is not loaded:
        1.1.        Execute:    this.fPnlEditor = new TAceEdit ();
                        This creates a new TAceEdit object
        1.2.        Execute:    this.fPnlEditor.Setup
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
        2.1.        Execute:    this.fPnlEditor = new TAceEdit ();
                        This creates a new TAceEdit object
        2.2.        Execute:    this.fPnlEditor.Setup
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
