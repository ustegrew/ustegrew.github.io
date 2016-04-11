/**
 *  @fileOverview        Courseware module
 */
define 
(
    [
        "dojo/_base/declare",
        "dijit/_WidgetBase",
        "dojo/dom-construct",
        "dojo/request/xhr",
        "dojo/query",
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
        jsonValidator,
        TGUI,
        TLocalStorage
    )
    {
        var TCourseWare;
        var ret;

        /**
         * The Courseware module. Provides an in-broswer interactive learning 
         * environment which runs entirely in the web browser.<br/>
         * To use it, note these things:
         * <ul>
         *     <li>
         *         clients have to provide the course content 
         *         (html, images, custom scripts etc.) and a course descriptor 
         *         (JSON file).
         *     </li>
         *     <li>
         *         The component is meant to be included on an entire web document 
         *         (i.e. to fill the viewport).
         *     </li>
         * </ul>
         * 
         * <p><br/></p>
         * Then, to use the component:
         * @example
         * &lt;!DOCTYPE html&gt;
         * &lt;html&gt;
         *     &lt;head&gt;
         *         &lt;meta charset="utf-8"&gt;
         *         &lt;link rel="shortcut icon" href="favicon.ico"&gt;
         *         &lt;title&gt;
         *             Courses
         *         &lt;/title&gt;
         *         &lt;link rel="stylesheet"  href="lib/dojo/dijit/themes/claro/claro.css"        type="text/css"&gt;
         *         &lt;link rel="stylesheet"  href="lib/dojo/dijit/themes/claro/document.css"     type="text/css"&gt;
         *         &lt;link rel="stylesheet"  href="lib/dojo/gridx/resources/claro/Gridx.css"     type="text/css"&gt;
         *         &lt;script type="text/javascript" src="lib/pieroxy_lz-string/lz-string.js"                    &gt;&lt;/script&gt;
         *         &lt;script type="text/javascript"&gt;
         *             
         *             var dojoConfig =
         *             {
         *                 has:
         *                 {
         *                     "dojo-firebug":         true,
         *                     "dojo-debug-messages":  true
         *                 },
         *                 locale:             'en',
         *                 baseUrl:            'lib/',
         *                 tlmSiblingsOfDojo:  false,
         *                 packages:
         *                 [
         *                     {name: 'ace',                           location: 'ace'},
         *                     {name: 'dojo',                          location: 'dojo/dojo'},
         *                     {name: 'dijit',                         location: 'dojo/dijit'},
         *                     {name: 'dojox',                         location: 'dojo/dojox'},
         *                     {name: 'gridx',                         location: 'dojo/gridx'},
         *                     {name: 'jsdemo',                        location: 'jsdemo'},
         *                     {name: 'courseware',                    location: 'courseware'},
         *                     {name: 'google-code-prettify',          location: 'google-code-prettify'},
         *                     {name: 'pieroxy_lz-string',             location: 'pieroxy_lz-string'},
         *                     {name: 'dojo-local-storage',            location: 'dojo-local-storage'},
         *                     {name: 'course',                        location: '../course'},
         *                 ]
         *             };
         *         &lt;/script&gt;
         *         &lt;script type             = "text/javascript"
         *                 src              = "lib/dojo/dojo/dojo.js"
         *                 data-dojo-config = "'parseOnLoad':false,'async':true, 'isDebug':true"&gt;
         *                 
         *         &lt;/script&gt;
         *         &lt;script type="text/javascript"&gt;
         *             require
         *             ([
         *                 "dojo/parser",
         *                 "dojo/dom",
         *                 "dojo/dom-construct",
         *                 "courseware/TCourseWare",
         *                 "dojo/domReady!"
         *             ], function 
         *             (
         *                 parser,
         *                 dom,
         *                 domConstruct,
         *                 TCourseWare
         *             )
         *             {
         *                 parser.parse().then
         *                 (
         *                     function ()
         *                     {
         *                         var c;
         * 
         *                         c = new TCourseWare ();
         *                         domConstruct.place  (c.domNode, "pnlMain", "only");
         *                         c.startup           ();
         *                         c.LoadCourse        ("course/it001/res/info.json");
         *                     }
         *                 );
         *             });
         *         &lt;/script&gt;
         *     &lt;/head&gt;
         *     &lt;body class="claro"&gt;
         *         &lt;div id="pnlMain" style="position:absolute;top:0px;bottom:0px;left:0px;right:0px;"&gt;&lt;/div&gt;
         *     &lt;/body&gt;
         * &lt;/html&gt;
         * 
         * @class       TCourseWare
         */
        TCourseWare = 
        {
            /**
             * JSON schema to validate the course descriptor.
             * 
             * @constant
             * @type        JSON schema
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
                                "description":  "Function to be executed before an article is being unloaded. Function call should have no parameters.",
                                "type":         "string"
                            }
                        }
                    },
                    "rootNodeID":
                    {
                        "description":  "Unique ID of the root node.",
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
             * JSON schema to validate a folder node descriptor. A folder appears 
             * in the content panel with a folder symbol and is used to group 
             * resources (e.g. all lessons) together into a category . In the 
             * content panel, folder nodes can be collapsed / expanded.
             * 
             * @constant
             * @type        JSON schema
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
             * JSON schema to validate a lesson node. A lesson is the basic unit of a  
             * course.
             * 
             * @constant
             * @type        JSON schema
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
             * JSON schema to validate an external resource node. External resources are 
             * always loaded into a new window.
             * 
             * @constant
             * @type        JSON schema
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
            
            /**
             * Name of the callback that is invoked when the entire course has been loaded.
             * 
             * @type        String
             * @private
             */
            fHandlerOnLoadCourse:       null,
            
            /**
             * Name of the callback that is invoked when the entire course has been loaded.
             * 
             * @type        String
             * @private
             */
            fHandlerOnLoadArticle:      null,

            /**
             * Name of the callback that is invoked when the entire course has been loaded.
             * 
             * @type        String
             * @private
             */
            fHandlerOnUnloadArticle:    null,

            /**
             * The web gui component.
             * 
             * @type        courseware/gui/TCourseWareGUI/TCourseWareGUI
             * @private
             */
            fGUI: null,
            
            /**
             * The bridge to the web browser's HTML5 localStorage.
             * 
             * @type        window/localStorage
             * @private
             */
            fLocalStorage: null,
            
            /**
             * Retrieve the solution to exercise #id from the local storage.
             * 
             * @param   {String}    id          The unique ID of the exercise.
             * @returns {String}                The solution's content, or an 
             *                                  empty string if the solution doesn't
             *                                  exist.
             */
            ExerciseSolution_Get: function (id)
            {
                var ret;
                
                ret = this.fLocalStorage.Get (id, "");
                
                return ret;
            },
            
            /**
             * Saves the solution to exercise #id to the local storage.
             * 
             * @param   {String}    id          The unique ID of the exercise.
             * @param   {String}    content     The solution's content.
             */
            ExerciseSolution_Save: function (id, content)
            {
                this.fLocalStorage.Set (id, content);
            },

            /**
             * Load the course into the environment.
             * 
             * @param   {String}    urlDescriptor       URL of the descriptor's JSON file.
             * @throws  {type}      Error if the course failed to load.
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

            /**
             * Loads the article with the given ID into the article view.
             * 
             * @param   {string}        id
             * @public
             */
            LoadArticle: function (id)
            {
                this.fGUI.LoadArticle (id);
            },
            
            /**
             * Receive notification that an article has finished loading.
             */
            NotifyHasLoadedArticle: function ()
            {
                this._EventExec (this.fHandlerOnLoadArticle);
            },
            
            /**
             * Receive notification that an article has finished unloading.
             */
            NotifyUnloadingArticle: function ()
            {
                this._EventExec (this.fHandlerOnUnloadArticle);
            },
            
            /**
             * cTor. 
             */
            constructor: function ()
            {
                /*
                 * Load local storage bridge. We use the compression driver which 
                 * uses the storage capacity more efficiently.
                 */
                this.fLocalStorage = new TLocalStorage ({driver:"compression"});
            },

            /**
             * Startup method. Overrides _WidgetBase::startup ().
             */
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
            
            /**
             * Validates the given course descriptor. If the descriptor fails validation
             * we will throw an exception with a detailed error message.
             * 
             * @param       {JSON string}   descriptor      The descriptor to be validated.
             * @throws      {string}        An exception (message containing details) if the given descriptor wasn't valid. 
             */
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
            
            /**
             * An event handler executor. Executes one of the TCourseWare module wide 
             * events (defined in the descriptor which was loaded during execution of
             * the {@link #LoadCourse} method. 
             * 
             * Executes the given function in context 'window'. The provided 
             * function name is assumed to be a string containing a dot separated 
             * path:
             * 
             *     <code>courseName dot handlerName</code>
             *     
             * (e.g. 'it001.onLoadCourse'). This maps to an object hierarchy within the 
             * global <code>window</code>: <code>window.courseName.handlerName</code>
             * which means that this object hierarchy has to be set up before any of the
             * event handlers is called.
             * 
             * @param   {string}    fn      The handler to be called.
             */
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
            },

            /**
             * Worker method to load a course into the environment. Clients must 
             * provide a JSON record describing the course.
             * 
             * @param       {type} descriptor   The JSON record describing the course.
             *                                  Must comply with the JSON schema 
             *                                  defined in {@link #kSchemaDescriptorGlobal}.
             */
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