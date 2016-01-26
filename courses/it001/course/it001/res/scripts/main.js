/**
 *  @fileoverview        it001 - custom scripts
 */
define 
(
    [
        "dojo/dom-construct",
        "dojo/dom-attr",
        "dojo/dom-class",
        "dojo/query",
        "dijit/Dialog",
        "dijit/Toolbar",
        "dijit/form/Button",
        "jsdemo/TJSDemo",
        "dojo/NodeList-dom",
        "course/it001/res/scripts/decl",                                        /* [1] */
        "course/it001/lessons/00/scripts/examples",
        "course/it001/lessons/01/scripts/examples",
        "course/it001/lessons/02/scripts/examples",
        "course/it001/lessons/03/scripts/examples",
        "course/it001/lessons/04/scripts/examples",
        "course/it001/lessons/05/scripts/examples",
        "course/it001/lessons/06/scripts/examples",
        "course/it001/lessons/07/scripts/examples",
        "course/it001/lessons/08/scripts/examples",
        "course/it001/lessons/09/scripts/examples"
    ],
    function 
    (
        domConstruct,
        domAttr,
        domClass,
        query,
        Dialog,
        Toolbar,
        Button,
        TJSDemo
    )
    {
        var GetIdentifiers = function (code)
        {
            var kOptions =
            {
                loc         : false,
                range       : false,
                tokens      : false,
                comment     : false,
                tolerant    : false
            };
            
            var tokens;
            var i;
            var n;
            var tok;
            var hash;
            var idns;
            var ret;
            
            tokens  = esprima.tokenize (code, kOptions);
            ret     = "";
            hash    = {};
            idns    = [];
            if (Array.isArray (tokens))
            {
                n = tokens.length;
                if (n >= 1)
                {
                    for (i = 0; i < n; i++)
                    {
                        tok = tokens [i];
                        if (tok.type === "Identifier")
                        {
                            hash [tok.value] = 0;
                        }
                    }

                    idns = Object.getOwnPropertyNames (hash);
                    idns = idns.sort ();
                }
                
                n = idns.length;
                if (n >= 1)
                {
                    for (i = 0; i < n; i++)
                    {
                        ret += "\"" + idns [i] + "\"";
                        if (i < n-1)
                        {
                            ret += ", ";
                        }
                    }
                }
            }
            
            return ret;
        };
        
        /**
         * Creates skeleton code for the descriptors in an article. This code will
         * be shown in a modal dialog for each article loaded.
         * TODO: Remove for production version.
         */
        var MakeDescriptors = function ()
        {
            var kQuerySection       = "pre.prettyprint";
            var kReplRe_nbsp        = new RegExp ("&nbsp;", "g");
            var kReplRe_quot        = new RegExp ("\"", "g");
            
            var iSect;
            var sSect;
            var descriptor;
            
            if (typeof window.it001.dlgDescr === "undefined")
            {
                window.it001.dlgDescr = new Dialog
                (
                    {
                        title:  "Descriptors for code examples",
                        style:  "height:768px;width:1024px;font-family:monospace;"
                    }
                );
                domConstruct.place (window.it001.dlgDescr.domNode, window.document.body, "first");
                window.it001.dlgDescr.startup();
            }

            iSect       = 0;
            descriptor  = "";
            sSect       = query (kQuerySection);
            sSect.forEach
            (
                function (node)
                {
                    var kIndent = "    ";
                    
                    var code;
                    var symbols;
                    var parentNode;
                    var isEligible;
                    var secNum;
                    var idProlog;
                    var idChapter;
                    var nodesArtcl;
                    var nodeArticle;
                    var lines;
                    var iLine;
                    var nLines;
                    var line;
                    var lineEscQuotes;
                    var rxIsEmpty;
                    var isEmpty;
                    var nextState;
                    var isTerm;
                    var msg;
                    
                    parentNode = node.parentNode;
                    isEligible = domAttr.has (parentNode, "demo-id");
                    if (isEligible)
                    {
                        iSect += 10;
                        
                        /* Normalize section number to two digits */
                        secNum = "INVALID";
                        if (iSect <= 9)
                        {
                            secNum = "00" + iSect;
                        }
                        else if (iSect <= 99)
                        {
                            secNum = "0" + iSect;
                        }
                        else if (iSect <= 999)
                        {
                            secNum = "" + iSect;
                        }
                        else
                        {
                            msg = "Example ID too high... Please change chapter \n\
                            ID policy to four digits.";
                            throw msg;
                        }
                        
                        idProlog    = domAttr.get (parentNode, "demo-id");
                        if (idProlog === "notImpl")
                        {
                            nodesArtcl  = query ("article");
                            nodeArticle = nodesArtcl [0];
                            idChapter   = domAttr.get (nodeArticle, "chapter-id");
                            idProlog    = "it001_Ex_" + idChapter + "_" + secNum;
                        }

                        domConstruct.place
                        (
                            "<div style='margin-left:1em;margin-top:1em;font-weight:bold;font-family:monospace;font-size:1.3em;color:maroon;'>" + idProlog + "</div>\n",
                            node,
                            "before"
                        );

                        code        = node.innerHTML;
                        code        = code.replace (kReplRe_nbsp, " ");
                        lines       = code.split ("\n");
                        try
                        {
                            symbols     = GetIdentifiers (code);
                            descriptor += kIndent + "window.it001.gProgramRepository [\"" + idProlog + "\"] =\n" +
                                          kIndent + "{\n" +
                                          kIndent + "    globals:\n" +
                                          kIndent + "    {\n" +
                                          kIndent + "        symbols: [" + symbols + "]\n" +
                                          kIndent + "    },\n" +
                                          kIndent + "    transitionTable:\n" +
                                          kIndent + "    [\n";

                            if (Array.isArray (lines))
                            {
                                nLines = lines.length;
                                if (nLines >= 1)
                                {
                                    rxIsEmpty = new RegExp ("^\s*$");
                                    for (iLine = 0; iLine < nLines; iLine++)
                                    {
                                        line         = lines [iLine];
                                        isEmpty      = rxIsEmpty.test (line);
                                        nextState    = iLine + 1;
                                        isTerm       = "" + (nextState >= nLines);
                                        lineEscQuotes= line.replace (kReplRe_quot, "\\\"");
                                        descriptor  += kIndent + "        { // State " + iLine + "\n" +
                                                       kIndent + "            source:         \"" + lineEscQuotes + "\",\n" +
                                                       kIndent + "            symbols:        [" + symbols + "],\n" +
                                                       kIndent + "            comment:        \"\",\n" +
                                                       kIndent + "            transition:\n" +
                                                       kIndent + "                function ()\n" +
                                                       kIndent + "                {\n";

                                                       if (! isEmpty)
                                                       {
                                                           descriptor += kIndent + "                    " + line + "\n";
                                                       }

                                        descriptor  += kIndent + "                    this._SetState (" + nextState + ", " + isTerm + ");\n" +
                                                       kIndent + "                }\n" +
                                                       kIndent + "        },\n";
                                    }
                                }
                            }
                            else
                            {
                                nLines = 0;
                            }
                            
                            descriptor += kIndent + "        { // State " + nLines + "\n" +
                                          kIndent + "            source:         \"/* End */\",\n" +
                                          kIndent + "            symbols:        [" + symbols + "],\n" +
                                          kIndent + "            comment:        \"\",\n" +
                                          kIndent + "            transition:     function (){}\n" +
                                          kIndent + "        }\n" +
                                          kIndent + "    ]\n" +
                                          kIndent + "};\n" +
                                          kIndent + "\n\n";
                        }
                        catch (exc)
                        {
                            console.dir (exc);
                        }
                    }
                }
            );
            window.it001.dlgDescr.set ("content", "<textarea style='width:990px;height:490px;' spellcheck='false'>" + descriptor + "</textarea>");
            window.it001.dlgDescr.show ();
        };
        
        
        /* Removes leading spaces and deletes the last empty line 
         * from each node in the given node list.                               [10] */
        var NormalizeSourceListings = function ()
        {
            var kQuerySection       = "pre.prettyprint";
            
            var i;
            var n;
            var nL;
            var replPattern;
            var replReLeadSp;
            var replReSp;
            var nSpaces;
            var isList;
            var match;
            var doOmitLastLine;
            var sourceSections;
            var codeListing;
            var codeLine;
            var leadingSpaces;
            var newCode;
            
            sourceSections = query (kQuerySection);
            sourceSections.forEach
            (
                function (node)
                {   
                    newCode     = "";
                    codeListing = node.innerHTML.split ("\n");
                    isList      = Array.isArray (codeListing);
                    if (isList)
                    {
                        n = codeListing.length;
                        /* Ascertain: Is last line empty? */
                        if (n >= 1)
                        {
                            codeLine        = codeListing [n-1];
                            match           = codeLine.match (/^\s*$/);
                            doOmitLastLine  = (match !== null);
                            if (doOmitLastLine)
                            {
                                n--;
                            }
                        }
                        
                        /* Delete leading spaces, but preserve indentation */
                        if (n >= 1)
                        {
                            codeLine = codeListing [0];
                            match    = codeLine.match (/^\s+/);
                            if (match !== null)
                            {
                                leadingSpaces = match [0];
                                nSpaces       = leadingSpaces.length;
                                if (nSpaces >= 1)
                                {
                                    replPattern     = "^\\s{" + nSpaces + "}";
                                    replReLeadSp    = new RegExp (replPattern);
                                    replReSp        = new RegExp ("\\s", "g");  /* [20] */
                                    for (i = 0; i < n; i++)
                                    {
                                        codeLine = codeListing [i];
                                        codeLine = codeLine.replace (replReLeadSp,  ""          );
                                        codeLine = codeLine.replace (replReSp,      "&nbsp;"    );
                                        nL       = (i <= n-2)  ?  "\n"  :  "";
                                        newCode += codeLine + nL;
                                    }
                                    
                                    node.innerHTML = newCode;
                                }
                            }
                        }
                    }
                }
            );
        };
        
        var InitializeExamples = function ()
        {
            var kQuerySection       = "div.example";
            var kQueryDemoID        = "demo-id";
            
            var exampleSections;
            var hasDemoID;
            var handlerID;
            var toolbar;
            var button;
            var lbl;
            
            exampleSections = query (kQuerySection);
            exampleSections.forEach
            (
                function (node)
                {
                    hasDemoID = domAttr.has (node, kQueryDemoID);
                    if (hasDemoID)
                    {
                        handlerID   = domAttr.get (node, kQueryDemoID);
                        lbl         = (handlerID !== "notImpl")  ?  
                                          "Run"  
                                      :  
                                          "Run <font style='font-size:0.75em;color:maroon;'>(doesn't work yet, sorryyy...)</font>";
                        
                        toolbar     = new Toolbar ({});
                        button      = new Button
                        (
                            {
                                fHandlerID: handlerID,
                                label:      lbl,
                                showLabel:  true,
                                iconClass:  "dijitEditorIcon dijitEditorIconTabIndent",
                                onClick:    function ()                         /* [2] */
                                {
                                    window.it001.JSDemo_RunExample (this.fHandlerID);
                                }
                            }
                        );
                        toolbar.addChild (button);

                        domClass.replace   (node, "example_demo", "example");
                        domConstruct.place ("<div style=\"width:1px;height:0.5em;\">&nbsp;</div>", node, "first");
                        domConstruct.place (toolbar.domNode, node, "first");
                        toolbar.startup ();
                    }
                }
            );
        };
        
        window.it001.onLoadCourse = function ()
        {
            var repo;
            var dlgJSDemo;
            var pnlJSDemo;

            repo = window.it001.gProgramRepository;
            pnlJSDemo = new TJSDemo (repo);

            dlgJSDemo = new Dialog
            (
                {
                    title:  "Looking glass",
                    style:  "height:325px;width:1024px;"
                }
            );
            domConstruct.place (dlgJSDemo.domNode, window.document.body, "first");
            dlgJSDemo.startup();

            domConstruct.place (pnlJSDemo.domNode, dlgJSDemo.containerNode, "only");
            pnlJSDemo.startup ();
            window.it001.dlgJSDemo = dlgJSDemo;
            window.it001.pnlJSDemo = pnlJSDemo;
        };

        window.it001.onLoadArticle = function ()
        {
            /* Remove leading spaces from each source code segment, 
             * preserving indentation - as well as, delete last line if empty.  [10] */
            NormalizeSourceListings ();
            
            /* Initialize example sections. This creates a menu with action items 
             * above each section */
            InitializeExamples ();

            /* If configured, bring up modal dialog showing skeleton code for all
             * examples with demo-id attribute set.
             * TODO: Remove for production code. This is annoying, but needed during development.  
             */
            if (window.it001.config.debugShowPrograms)
            {
                MakeDescriptors ();
            }
            
            window.prettyPrint ();
        };

        window.it001.onUnloadArticle = function ()
        {
        };

        window.it001.JSDemo_RunExample = function (key)
        {
            window.it001.pnlJSDemo.LoadProgram (key);
            window.it001.dlgJSDemo.show ();
        };
    }
);

/*
    [1]  The decl script provides basic declarations for all the example scripts 
         we load. We can't put those declarations into the callback function
         inside the define directive, but must include the decl script before 
         we load any of the example scripts. If we put the declarations into the 
         callback, they will execute too late with the result that the example 
         scripts will fail.

    [2]  We have to use a functor, otherwise we get a nullpointer error when clicking
         a menu item.

    [10] We have to remove the leading space at each line of source code (code 
         examples) without destroying the indentation. Basically, in each 
         source code section we observe the leading spaces of the first line and
         then remove those number of leading from all the lines in the section.
         This follows the assumption that in all source code examples the first 
         line is in indentation level zero (i.e. first line is the pilot line).

         This answers the problem that the css rule "white-space: pre-line;" 
         is insufficient to clear all prepended spaces. As one solution,we 
         tried to not have the leading spaces in the first place , but this 
         confuses the indentation of the HTML code, making the HTML code harder 
         to read.

         For each node:
             1. Get innerHTML (content)
             2. split content by newlines -> into Array
             3. Isolate prepended spaces on first line
             4. For each element in array, replace prepended spaces by empty string
             5. For each element in array, replace space by non-breaking space
             6. assemble new string from array (concat all elements, separated by newlines).
             7.     but omit the last line if it is empty (0 or more spaces only).
             8. set innerHTML to new string.

    [20] the present version of Chrome doesn't support flags in the String::replace()
         function. But the 'global' flag works when specified inside a regular expression.
         We have to use the 'global' flag, otherwise the String::replace() function 
         will only replace the first occurence of a space.

 */