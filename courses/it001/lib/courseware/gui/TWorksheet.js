/**
 *  @fileoverview        Insert_here
 */
define 
(
    [
        "dojo/_base/declare",
        "dijit/_WidgetBase",
        "require",
        "dojo/query",
        "dojo/dom-construct",
        "dojo/dom-attr",
        "dojo/on",
        "dijit/MenuBar",
        "dijit/PopupMenuBarItem",
        "dijit/Menu",
        "dijit/MenuItem",
        "dijit/MenuSeparator",
        "dijit/DropDownMenu",
        "dijit/form/Button",
        "courseware/gui/TExerciseEditGUI",
    ],
    function 
    (
        declare,
        _WidgetBase,
        _require,
        domQuery,
        domConstruct,
        domAttr,
        on,
        TMenuBar,
        TPopupMenuBarItem,
        TMenu,
        TMenuItem,
        TMenuSeparator,
        TDropDownMenu,
        TButton,
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
            constructor: function (params)
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
                var _host           = this;
                var kImgBaseURL     = _require.toUrl ("courseware/img");
                
                var list;
                var i;
                var ndeGlobalMenu;
                var globalMenuBar;
                var subMenu;
                var ndeListExercises;
                var ndeExercise;
                var iconURLEdit;
                var innerHTMLExercise;
                var btn;
                var editor;
                var nde_toolbar;
                var nde_text;
                var nde_workspace;
                
                /* Setup menu bar on top of the worksheet */
                list          = domQuery ("*[data-courseware-type=\"globalMenu\"]");
                ndeGlobalMenu = (list.length >= 1)  ?  list [0] : null;
                if (ndeGlobalMenu == null)
                {   /* Oh dear, web developer forgot to provide a hosting DOM node for the menu bar. */
                    throw "Missing DOM node for global worksheet menu. Page misses " +
                          "a DOM node with attribute: data-courseware-type=\"globalMenu\"";
                }
                else if (list.length >= 2)
                {   /* Oh dear, web developer provided more than one hosting DOM node for the menu bar. */
                    throw "Must have one (and one only) DOM node for global worksheet menu. Found more "
                          "than one DOM node with attribute: data-courseware-type=\"globalMenu\"";
                }
                
                /* Found hosting node  */
                globalMenuBar = new TMenuBar ({});
                subMenu       = new TDropDownMenu ({});
                subMenu.addChild
                (
                    new TMenuItem
                    (
                        {
                            label:      "Solutions to clipboard",
                            onClick:    function () {console.log ("Page to clipboard");}
                        }
                    )
                );
                globalMenuBar.addChild
                (
                    new TPopupMenuBarItem
                    (
                        {
                            label:      "Page tools",
                            popup:      subMenu
                        }
                    )
                )
                globalMenuBar.startup ();
                domConstruct.place (globalMenuBar.domNode, ndeGlobalMenu, "only");
                
                /* Set up exercises */
                ndeListExercises = domQuery ("*[data-courseware-type=\"exercise\"]");
                if (ndeListExercises.length >= 1)
                {
                    /* Create editor component */
                    editor = new TExerciseEditGUI
                    (
                        {
                            fHost:      window,
                            fWidth:     "640px",
                            fHeight:    "480px",
                            onCancel:   function () {console.log ("Editor: onCancel");},
                            onLoad:     function () {console.log ("Editor: onLoad");},
                            onSave:     function () {console.log ("Editor: onSave");},
                        }
                    );
                    editor.startup ();
                    
                    /* Set up exercises */
                    iconURLEdit = kImgBaseURL + "/edit.png";
                    for (i = 0; i < ndeListExercises.length; i++)
                    {
                        ndeExercise = ndeListExercises [i];
                        
                        /* Cache inner content of the resp. exercise */
                        innerHTMLExercise = ndeExercise.innerHTML;
                        
                        /* Create "Edit this" button */
                        btn = new TButton
                        (
                            {
                                label:      "<img src=\"" + iconURLEdit + "\"/>",
                                onClick:    function () {console.log ("Exercise open");}
                            }
                        )
                        btn.startup ();
                        
                        /* Create hosting nodes for exercise text, toolbar and editor. */
                        nde_toolbar = domConstruct.create
                        (
                            "div",
                            {
                                class:  "exercise-toolbar",
                            }
                        );
                        nde_workspace = domConstruct.create
                        (
                            "div",
                            {
                                class:  "exercise-workspace",
                            }
                        );
                        nde_text = domConstruct.create
                        (
                            "div",
                            {
                                class:  "exercise-text",
                            }
                        );
                        
                        /* Insert content into hosting nodes. Editor won't be assigned yet. */
                        domConstruct.place (btn.domNode,    nde_toolbar,    "only");
                        nde_text.innerHTML = innerHTMLExercise;
                        if (i == 0)
                        {
                            domConstruct.place (editor.domNode, nde_workspace, "only");
                            editor.SetType ("src", "js");
                        }
                        
                        /* Empty exercise node and insert hosting nodes into exercise node. */
                        domAttr.set        (ndeExercise,    "class",     "exercise");
                        domConstruct.place (nde_toolbar,    ndeExercise, "only");
                        domConstruct.place (nde_text,       ndeExercise, "last");
                        domConstruct.place (nde_workspace,  ndeExercise, "last");
                    }
                }
                else
                { /* Found no exercises. Just log to console. */
                    console.log ("Found no exercises, i.e. no DOM nodes with attribute: " +
                                 "data-courseware-type=\"exercise\".");
                }
            }
        };
    
        ret = declare ("TWorksheet", [_WidgetBase], TWorksheet);
    
        return ret;
    }
);


/*
 
 [10]: We have to include dojo.require, otherwise require.toUrl fails with an error
       "require.toUrl: Not a function". Reason is that by the time we call this function,
       dojo has 'packaged' the toUrl function inside the global require.original 
       property. Requiring 'require' gives us an unpackaged require module which 
       offers the toUrl function.
 
 */