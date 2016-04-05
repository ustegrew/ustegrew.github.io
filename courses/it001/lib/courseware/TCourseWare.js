/**
 *  @fileoverview        Insert_here
 */
define 
(
    [
        "dojo/_base/declare",
        "dijit/_WidgetBase",
        "dojo/dom-construct",
        "dojo/request/xhr",
        "dojo/query",
        "require",
        "dojo/request/script",
        "courseware/util/validator/TValidatorJSON",
        "courseware/gui/TCourseWareGUI/TCourseWareGUI",
        "courseware/storage/TLocalStorage",
        "dojo/NodeList-manipulate"
    ],
    function 
    (
        declare,
        _WidgetBase,
        domConstruct,
        xhr,
        query,
        _require,
        libLoader,
        jsonValidator,
        TGUI,
        TLocalStorage
    )
    {
        var TCourseWare;
        var ret;

        /**
         * Insert_explanation_here
         * 
         * @class       TChangeToClassName
         */
        TCourseWare = 
        {
            /**
             * JS schema for a course descriptor. We use the dojox/json/schema validator to 
             * perform the actual validation.
             * 
             * @constant
             * @type        JSObject
             * @private
             */
            kSchemaDescriptorGlobal:
            {
                "$schema":      "http://json-schema.org/draft-03/schema#",
                "title":        "Course info block",
                "description":  "Info block describing a course",
                "type":         "object",
                "properties":
                {
                    "stylesheets":
                    {
                        "description":  "Style sheets to be added for this course",
                        "type":         "array",
                        "items":
                        {
                            "description":  "A style sheet to be loaded",
                            "type":         "string"
                        }
                    },
                    "scripts":
                    {
                        "description":  "Custom scripts for the course",
                        "type":         "object",
                        "properties":
                        {
                            "resources":
                            {
                                "description":  "URLs to the style sheets to be loaded",
                                "items":
                                {
                                    "description":  "Scripts to be loaded for the course",
                                    "type":         "string"
                                }
                            },
                            "onLoadCourse":
                            {
                                "description":  "Function executed after an course has loaded. Function call should have no parameters.",
                                "type":         "string"
                            },
                            "onLoadArticle":
                            {
                                "description":  "Function executed after an article has loaded. Function call should have no parameters.",
                                "type":         "string"
                            },
                            "onUnloadArticle":
                            {
                                "description":  "Function to be executed before an article is being unloaded.",
                                "type":         "string"
                            }
                        }
                    },
                    "rootNodeID":
                    {
                        "description":  "Unique ID of the root node",
                        "type":         "string"
                    },
                    "descriptor":
                    {
                        "description":  "Info block core data",
                        "type":         "array",
                        "items":
                        {
                            "description":  "A node in the content hierarchy",
                            "type":         "object",
                            "properties":
                            {
                                "id":
                                {
                                    "description":  "Unique ID of this node",
                                    "type":         "string"
                                },
                                "category":
                                {
                                    "description":  "The type of node. Must be one of: " +
                                                    "'folder', 'lesson', 'external'",
                                    "type":         "string",
                                    "enum":         ["folder", "lesson", "external"]
                                },
                                "name":
                                {
                                    "description":  "Name of this node, as shown in the " +
                                                    "content tree",
                                    "type":         "string"
                                },
                                "heading":
                                {
                                    "description":  "Heading, shown at the top of the " +
                                                    "page and above the article",
                                    "type":         "string"
                                },
                                "details":
                                {
                                    "description":  "Some details about this node",
                                    "type":         "string"
                                },
                                "parent":
                                {
                                     "description": "The parent node's ID",
                                     "type":        "string",
                                     "optional":    "true"
                                }
                            }
                        }
                    }
                }
            },

            /**
             * JS followup schema from a course descriptor: Folder node. 
             * We use the dojox/json/schema validator to perform the actual 
             * validation.
             * 
             * @constant
             * @type        JSObject
             * @private
             */
            kSchemaDescriptorNodeFolder:
            {
                "$schema":      "http://json-schema.org/draft-03/schema#",
                "title":        "Folder info block",
                "description":  "A FOLDER node in the content hierarchy",
                "type":         "object",
                "properties":
                {
                    "hasChildren":
                    {
                        "description":  "Whether this node has children " +
                                        "(true), or not (false)",
                        "type":         "boolean"
                    }
                }
            },

            /**
             * JS followup schema from a course descriptor: Lesson node. 
             * We use the dojox/json/schema validator to perform the actual 
             * validation.
             * 
             * @constant
             * @type        JSObject
             * @private
             */
            kSchemaDescriptorNodeLesson:
            {
                "$schema":      "http://json-schema.org/draft-03/schema#",
                "title":        "Lesson info block",
                "description":  "A LESSON node in the content hierarchy",
                "type":         "object",
                "properties":
                {
                    "urlArticle":
                    {
                        "description":  "The URL of the article",
                        "type":         "string"
                    },
                    "urlExercises":
                    {
                        "description":  "The URL of the associated exercises",
                        "type":         "string"
                    },
                    "isStartNode":
                    {
                        "description":  "Whether this node is the first " +
                                        "article shown after loading the " +
                                        "course descriptor (true), or not " +
                                        "(false)",
                        "type":         "boolean",
                        "optional":     true
                    }
                }
            },

            /**
             * JS followup schema from a course descriptor: Ext. resource node. 
             * We use the dojox/json/schema validator to perform the actual 
             * validation.
             * 
             * @constant
             * @type        JSObject
             * @private
             */
            kSchemaDescriptorNodeExtRes:
            {
                "$schema":      "http://json-schema.org/draft-03/schema#",
                "title":        "ExtRes info block",
                "description":  "An EXTERNAL RESOURCE node in the content hierarchy",
                "type":         "object",
                "properties":
                {
                    "url":
                    {
                        "description":  "The URL of the resource",
                        "type":         "string"
                    }
                }
            },
            
            fHandlerOnLoadCourse:       null,
            fHandlerOnLoadArticle:      null,
            fHandlerOnUnloadArticle:    null,

            /**
             * Insert_explanation_here
             * 
             * @type        Insert_typename_here
             * @private
             */
            fGUI: null,
            
            fLocalStorage: null,
            
            /**
             * Insert_explanation_here
             * 
             * @param   {String}    urlDescriptor       Insert_explanation_here
             * @throws  {type}      Insert_explanation_here
             * @public
             */
            LoadCourse: function (urlDescriptor)
            {
                var _this = this;
                
                /* 1. Load descriptor */
                xhr (urlDescriptor, {handleAs: "json", preventCache: true}).then
                (
                    function (descriptor)
                    {
                        _this._LoadCourse.call (_this, descriptor);
                    }, 
                    function (err)
                    {
                        throw err;
                    }, 
                    function (evt)
                    {
                        // Handle a progress event from the request 
                        // if the browser supports XHR2
                    }
                );
            },

            LoadArticle: function (id)
            {
                this.fGUI.LoadArticle (id);
            },
            
            NotifyHasLoadedArticle: function ()
            {
                this._EventExec (this.fHandlerOnLoadArticle);
            },
            
            NotifyUnloadingArticle: function ()
            {
                this._EventExec (this.fHandlerOnUnloadArticle);
            },
            
            ExerciseSolutionLoad: function (id)
            {
                var data;
                var ret;
                
                data = this.fLocalStorage.Get (id, "Your solution here...");
                ret  = 
                {
                    id:     id, 
                    data:   data
                };
                
                return ret;
            },
            
            ExerciseSolutionSave: function (id, content)
            {
                this.fLocalStorage.Set (id, content);
            },

            _LoadCourse: function (descriptor)
            {
                var _this = this;
                
                var urls;
                var i;
                var n;
                var url;
                var lnk;
                var headNode;
                
                /* 1. Validate descriptor */
                this._AssertDescriptorValid (descriptor);

                /* 2. Retrieve event handler names for the functions covering events: 
                 *     'course loaded', 
                 *     'article loaded',
                 *     'article unloaded'.                                      [30]
                 */
                this.fHandlerOnLoadCourse       = descriptor.scripts.onLoadCourse;
                this.fHandlerOnLoadArticle      = descriptor.scripts.onLoadArticle;
                this.fHandlerOnUnloadArticle    = descriptor.scripts.onUnloadArticle;
                
                /* 3. Load custom style sheets and scripts */
                /* 3.1. Load custom stylesheets into the page header.                [20] */
                headNode    = query ("head");
                urls        = descriptor.stylesheets;
                n           = urls.length;
                if (n >= 1)
                {
                    for (i = 0; i < n; i++)
                    {
                        url = urls [i];
                        lnk = '<link rel="stylesheet" type="text/css" href="' + url + '">';
                        headNode.append (lnk);
                    }
                }

                var url;
                
                /* 3.2. Load custom scripts and execute onLoadCourse event handler
                 *      after all scripts have loaded
                 */
                urls = descriptor.scripts.resources;
                n    = urls.length;
                if (n >= 1)
                {
                    require 
                    (
                        urls,
                        function ()
                        {
                                    _this.fGUI.LoadCourse (descriptor);
                                    _this._EventExec (_this.fHandlerOnLoadCourse);
                                    _this.fGUI.LoadInitialArticle ();
                        }
                    );
                }
            },
            
            /**
             * Dojo specific cTor.
             * 
             * @param   {type} params
             * @param   {type} srcNodeRef
             */
            constructor: function (params, srcNodeRef)
            {
                this.fLocalStorage = new TLocalStorage ({driver:"compression"});
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
                var _this = this;
                this.fGUI = new TGUI        
                (
                    {
                        fHost: _this,
                        style: 
                            "position:absolute;" +
                            "top:0px;" +
                            "bottom:40px;" +
                            "left:0px;" +
                            "right:0px"
                    }
                );
                domConstruct.place          (this.fGUI.domNode, this.domNode, "only");
                this.fGUI.startup           ();
            },
            
            _AssertDescriptorValid: function (descriptor)
            {
                var i;
                var n;
                var d;
                var d;
                var dS;
                var result;
                var followupSchema;
                
                jsonValidator.AssertValid (descriptor, this.kSchemaDescriptorGlobal, "TCourseWare::LoadCourse(kSchemaDescriptorGlobal)");
                n      = descriptor.length;
                if (n >= 1)
                {
                    for (i = 0; i < n; i++)
                    {
                        d  = descriptor [i];
                        c  = d.category;
                        if (c === "folder")
                        {
                            followupSchema = this.kSchemaDescriptorNodeFolder;
                        }
                        else if (c === "lesson")
                        {
                            followupSchema = this.kSchemaDescriptorNodeLesson;
                        }
                        else if (c === "external")
                        {
                            followupSchema = this.kSchemaDescriptorNodeExtRes;
                        }
                        else
                        {
                            dS = JSON.stringify (d, null, 4);
                            throw "TCourseWare::_AssertDescriptorValid: Unknown node type '" + c + "' in node:\n" + dS;
                        }
                        jsonValidator.AssertValid (d, followupSchema, "TCourseWare::LoadCourse(followupSchema)");
                    }
                }
            },
            
            _EventExec: function (fn)
            {
                var path;
                var i;
                var n;
                var o;
                var p;

                
                path = fn.split (".");                                          /* [11] */
                n    = path.length;
                o    = window;
                if (n >= 1)
                {
                    for (i = 0; i < n; i++)
                    {
                        p = path [i];
                        o = o [p];
                    }
                }
                else
                {
                    o = null;
                }
                
                if (o !== null)
                {
                    if (typeof o === "function")
                    {
                        o.call (window);
                    }
                }
            }
        };
    
        ret = declare ("TCourseWare", [_WidgetBase], TCourseWare);
    
        return ret;
    }
);

/*  
  [10]:    We use require calls, as the resp. scripts are all dojo modules.
  
  [20]:    This will immediately apply the loaded style sheet to the page.

  [30]:    These are just strings containing names of functions. The functions 
           themselves must be defined in the course's custom scripts 
           (contained in the course resources). Those scripts will be loaded 
           in ::_LoadCourse::3.2 .
 */