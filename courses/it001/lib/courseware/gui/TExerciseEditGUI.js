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
            
            /**
             * Dojo specific cTor.
             * 
             * @param   {type} params
             * @param   {type} srcNodeRef
             * @returns {undefined}
             */
            constructor: function (params)
            {
                this.fPnlEditor = null;
                this.fHost      = params.fHost;
                this.fAPIEditor =
                {
                    fEditor:        null,
                    fHasChanged:    false,
                    GetContent:     null,
                    SetContent:     null,
                };
                this.fConfig =
                {
                    fType:      params.fType,
                    fSrcLang:   params.fSrcLang,
                    fHeight:    params.fHeight,
                    fWidth:     params.fWidth
                };
                this.fHandlers =
                {
                    onCancel:   params.onCancel,
                    onLoad:     params.onLoad,
                    onSave:     params.onSave
                },
                this._Init ();
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
                var srcType;
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

                /**
                 * Set up editor component
                 */
                switch (this.fConfig.fType)
                {
                    case this.EType.kRichText:
                        wrStyle         = "left:0px;right:2px;";
                        pnlWrapperEdit  = domConstruct.create 
                        (
                            "div",
                            {
                                style: wrStyle
                            }
                        );
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
                            pnlWrapperEdit
                        );
                        this.fAPIEditor.GetContent = function ()
                        {
                            var ret;
                            
                            ret = _host.fPnlEditor.get ("value");
                            
                            return ret;
                        };
                        this.fAPIEditor.SetContent = function (content)
                        {
                            _host.fPnlEditor.set ("value", content);
                        };
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
                        pnlWrapperEdit = domConstruct.create 
                        (
                            "div",
                            {
                                style: wrStyle
                            }
                        );

                        switch (this.fConfig.fSrcLang)
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
                        
                        this.fPnlEditor = new TAceEdit ();                         /* <----- Property: fPnlEditor */
                        this.fPnlEditor.Setup
                        (
                            pnlWrapperEdit,
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
                        this.fAPIEditor.GetContent = function ()
                        {
                            var ret;
                            
                            ret = _host.fPnlEditor.GetContent ();
                            
                            return ret;
                        };
                        this.fAPIEditor.SetContent = function (content)
                        {
                            _host.fPnlEditor.SetContent (content);
                        };
                    
                        break;
                        
                    default:
                        throw "TExerciseEditGUI::Unknown text type: " + this.fConfig.fType;
                }
                
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
            },
            
            _Init: function ()
            {
                var type;
                var lang;
                
                type    = this.fConfig.fType;
                lang    = this.fConfig.fSrcLang;
                
                if (type === "rtf")
                {
                    this.fConfig.fType      = this.EType.kRichText;
                    this.fConfig.fSrcLang   = this.ESrcLang.kPlaintext;
                }
                else if (type === "src")
                {
                    this.fConfig.fType      = this.EType.kSourceCode;
                    if (lang === "js")
                    {
                        this.fConfig.fSrcLang   = this.ESrcLang.kJavascript;
                    }
                    else if (lang === "html")
                    {
                        this.fConfig.fSrcLang   = this.ESrcLang.kHTML;
                    }
                    else
                    {
                        this.fConfig.fSrcLang   = this.ESrcLang.kPlaintext;
                        this._Log ("Unknown source language: " + lang + ". Set to kSourceCode/kPlaintext.");
                    }
                }
                else
                {
                    this.fConfig.fType      = this.EType.kRichText;
                    this.fConfig.fSrcLang   = this.ESrcLang.kPlaintext;
                    this._Log ("Unknown text type: " + type + ". Set to kRichText");
                }
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
 */      
