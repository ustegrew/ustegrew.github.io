/**
 *  @fileoverview        Facade to the ace editor.
 */
define 
(
    [
        "dojo/_base/declare",
        "dojo/request/script",
        "dojo/dom-construct",
        "require"                                                               /* [5] */
    ],
    function 
    (
        declare,
        aceLib,
        domConstruct,
        _require                                                                /* [5] */
    )
    {
        var TAceEditor;
        var ret;

        /**
         * Facade class to the ace code editor. Streamlines loading and 
         * initialization. Once initialized, editor api is available to 
         * clients via the fEditor property.
         * 
         * @class       TAceEditor
         */
        TAceEditor = 
        {
            /**
             * List of possible language modes.
             */
            kPossibleModes:
            [
                "abap", "abc", "actionscript", "ada", "apache_conf", "applescript", "asciidoc", 
                "assembly_x86", "autohotkey", "batchfile", "c9search", "c_cpp", "cirru", 
                "clojure", "cobol", "coffee", "coldfusion", "csharp", "css", "curly", "dart", 
                "diff", "django", "d", "dockerfile", "dot", "eiffel", "elixir", "elm", "erlang", 
                "forth", "ftl", "gcode", "gherkin", "gitignore", "glsl", "golang", "groovy", 
                "haml", "handlebars", "haskell", "haxe", "html_elixir", "html", "html_ruby", 
                "ini", "io", "jack", "jade", "java", "javascript", "jsoniq", "json", "jsp", 
                "jsx", "julia", "latex", "lean", "less", "liquid", "lisp", "live_script", 
                "livescript", "logiql", "lsl", "lua", "luapage", "lucene", "makefile", 
                "markdown", "mask", "matlab", "maze", "mel", "mips_assembler", "mipsassembler", 
                "mushcode", "mysql", "nix", "objectivec", "ocaml", "pascal", "perl", "pgsql", 
                "php", "plain_text", "powershell", "praat", "prolog", "properties", "protobuf", 
                "python", "rdoc", "rhtml", "r", "ruby", "rust", "sass", "scad", "scala", 
                "scheme", "scss", "sh", "smarty", "snippets", "soy_template", "space", "sql", 
                "sqlserver", "stylus", "svg", "swift", "swig", "tcl", "tex", "textile", "text", 
                "toml", "twig", "typescript", "vala", "vbscript", "velocity", "verilog", "vhdl", 
                "xml", "xquery", "yaml"
            ],
            
            /**
             * The editor component
             * 
             * @type        ace/ace
             * @public
             */
            fEditor: null,
            
            /**
             * The callback function to be called when loading of the Ace editor 
             * library failed.
             * 
             * @type        JSFunction
             * @private
             */
            fCallbackOnError: null,
            
            /**
             * The callback function to be called after successfull loading of 
             * the Ace editor library.
             * 
             * @type        JSFunction
             * @private
             */
            fCallbackOnLoad: null, 
            
            /**
             * The object (client) using this object. Determines in which context 
             * we run the given callback functions. This enables clients to use
             * the 'this' reference in their callbacks.
             * If it's not a JSObject then we assume that no context is specified
             * in which case we run the callbacks in the global context 
             * (<code>window</code>).
             * 
             * @type        JSObject
             * @private
             */
            fClient: null, 
            
            fHasSyntaxCheck: false,
            
            fIsReadOnly: false,
            
            fIsSetup: false,
            
            /**
             * The language mode we set the Ace editor to.
             * 
             * @type        string
             * @private
             */
            fLanguageMode: null, 

            /**
             * The DOM node which will host the Ace editor.
             * 
             * @type        DOMnode
             * @private
             */
            fRefNode: null, 
            
            /**
             * Dojo specific cTor.
             */
            constructor: function ()
            {
                this.fIsSetup = false;
            },
            
            destroy: function ()
            {
                console.log ("Destroying editor");
                this.fEditor.destroy ();
                domConstruct.destroy (this.fRefNode);
            },
            
            /**
             * Setup function. Loads the ace library (if needed) and binds      [10]
             * the editor component into the given reference DOM node. 
             * 
             * <dl>
             *     <dt><code>refNode</code></dt>
             *     <dl>
             *         Is <b>mandatory</b>. Must be a DOM node.
             *     </dl>
             *     <dt><code>languageMode</code></dt>
             *     <dl>
             *          We cater for all modes that the current version of ace 
             *          offers (version 1.2.2). If the mode string is not a 
             *          string or unknown then the editor falls back to text 
             *          mode. Clients should just use the language rather 
             *          than the full domain path of the mode (e.g. "javascript" 
             *          instead of "ace/mode/javascript").
             *     </dl>
             *     <dt><code>client</code>, <code>callbackOnLoad</code> and <code>callbackOnError</code></dt>
             *     <dl>
             *         <ul>
             *             <li>
             *                 Clients should specify two callback functions, one for 
             *                 when loading was successfull, the other one for when 
             *                 loading failed. If any of these parameters isn't of type
             *                 function then nothing will be executed for that parameter.
             *             </li>
             *             <li>
             *                 <code>callbackOnLoad</code> should take no parameter. 
             *                 <code>callbackOnError</code> should take one parameter,
             *                 the error object containing details about the error.
             *             </li>
             *             <li>
             *                 If the <code>client</code> parameter is of type JSObject
             *                 then the callbacks will be executed in that object's context.
             *                 This makes it possible to use this class as part of other 
             *                 classes and use 'this' in those callbacks. If the 
             *                 <code>client</code> parameter is not of type JSObject then
             *                 the callbacks will be executed in the global context (window).
             *             </li>
             *         </ul>
             *     </dl>
             * </dl>
             * 
             * @param   {domNode}       refNode             The node which will 
             *                                              host the editor.
             * @param   {string}        languageMode        The language mode to use.
             * @param   {boolean}       isReadOnly          If <code>true</code>, set 
             *                                              editor into readonly mode.
             * @param   {boolean}       isReadOnly          If <code>false</code>, 
             *                                              disable syntax check.
             * @param   {Object}        client              The client using this class.
             * @param   {function}      callbackOnLoad      Call this function 
             *                                              when editor library 
             *                                              was loaded successfully.
             * @param   {function}      callbackOnError     Call this function 
             *                                              when there was an error
             *                                              loading the ace library.
             */
            Setup: function (refNode, languageMode, isReadOnly, hasSyntaxCheck, client, callbackOnLoad, callbackOnError)
            {
                var _host = this;
                
                var url;
                var hasAceEditor;

                if (this.fIsSetup)
                {
                    throw "TAce::Setup: Can't execute multiple times.";
                }

                this.fRefNode               = refNode;
                this.fClient                = client;
                this.fLanguageMode          = languageMode;
                this.fCallbackOnError       = callbackOnError;
                this.fCallbackOnLoad        = callbackOnLoad;
                this.fIsReadOnly            = (isReadOnly === true);
                this.fHasSyntaxCheck        = (hasSyntaxCheck === true);

                hasAceEditor = (typeof window.ace === "object");
                if (! hasAceEditor)
                {
                    /* Load ace editor per asynchronous call.                      [20] */
                    url     = _require.toUrl ("ace/ace");
                    url    += ".js";
                    aceLib.get (url).then 
                    (
                        function (data)
                        {
                            /* Silently discard 'data' parameter, as we're just interested
                             * in loading the ace editor into memory */
                            _host._Initialize.call (_host);                     /* [22] */
                        },
                        function (err)
                        {
                            _host._HandleFailure.call (_host, err);
                        }
                    );
                }
                else
                {
                    this._Initialize ();
                }
            },
            
            _Exec: function (func, arg)
            {
                var client;
                var cb;
                
                client = (typeof this.fClient ===  "object") ?  
                        this.fClient 
                    : 
                        window;
                
                cb = (typeof func  ===  "function") ? 
                        func
                    :
                        null;
                
                if (cb !== null)
                {
                    if (arg === null)
                    {
                        cb.call (client);
                    }
                    else
                    {
                        cb.call (client, arg);
                    }
                }
            },
            
            _HandleFailure: function (err)
            {
                console.log (err);
                this._Exec (this.fCallbackOnError, err);
            },
            
            _Initialize: function ()
            {
                var kModPreamble    = "ace/mode/";
                var iMode;
                var mode;
                
                iMode = this.kPossibleModes.indexOf (this.fLanguageMode);
                mode  = (iMode >= 0)  ?  
                        kModPreamble + this.fLanguageMode
                    :
                        kModPreamble + "text";
                this.fEditor = ace.edit (this.fRefNode);
                this.fEditor.$blockScrolling = Infinity;                        /* 30 */
                this.fEditor.getSession ().setMode (mode);
                if (this.fIsReadOnly)
                {
                    this.fEditor.setReadOnly (true);
                }
                if (! this.fHasSyntaxCheck)
                {
                    this.fEditor.session.setOption ("useWorker", false);
                }
                this._Exec (this.fCallbackOnLoad, null);
            }
        };
    
        ret = declare ("TAceEditor", [], TAceEditor);
    
        return ret;
    }
);

/*
   [5]:     We have to include dojo.require, otherwise require.toUrl fails with an error
            "require.toUrl: Not a function". Reason is that by the time we call this function,
            dojo has 'packaged' the toUrl function inside the global require.original 
            property. Requiring 'require' gives us an unpackaged require module which 
            offers the toUrl function. By the time we use require.toUrl
            the global require object has changed:
                Before change:
                    require =
                    {
                        toUrl: function () 
                        {
                            // Whatever toUrl() needs
                        },
                        // other properties and functions...
                    }
                After change:
                    require =
                    {
                        packaged: true,
                        original: 
                        {
                            // contents of old require object
                        }
                        // other properties and functions...
                    }

    [10]:   We have to use a separate setup function. Consider this:
                var editor = new TAce 
                (
                    myDIVNode,
                    "javascript",
                    null,
                    function ()
                    {   // Will fail with "editor undefined"
                        editor.fEditor.setReadOnly (true);      
                    },
                    function (err)
                    {
                        // some error handling code
                    }
                );

            This works:
                var editor = new TAce ();
                editor.Setup
                (
                    myDIVNode,
                    "javascript",
                    null,
                    function ()
                    {   // Works, 'editor' is now defined.
                        editor.fEditor.setReadOnly (true);
                    },
                    function (err)
                    {
                        throw "Error loading ace editor. Details:\n" + 
                              JSON.stringify (err, null, 4);
                    }
                );

    [20]    We proceed with further steps only after ace has successfully loaded 
            and integrated into the environment. Due to the asynchronous nature 
            we must place all further initialazion code into the callback. 

   [30]:    This prevents the warning message
                Automatically scrolling cursor into view after selection change.
                This will be disabled in the next version. Set 
                editor.$blockScrolling = Infinity to disable this message
            each time we set the cursor in the ace editor.

 */
