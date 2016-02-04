require
([
    "dojo/parser",
    "dojo/dom",
    "dojo/dom-construct",
    "courseware/gui/TExerciseEditGUI",
    "dojo/domReady!"
], function 
(
    parser,
    dom,
    domConstruct,
    TExerciseEditGUI
)
{
    var funcEditTest = function ()
    {
        var node01 = dom.byId ("editTest01");
        var node02 = dom.byId ("editTest02");
        var editor = new TExerciseEditGUI 
        (
            {
                fHost:          null,
                fType:          "rtf",
                fSrcLang:       "js",
                fWidth:         "800px",
                fHeight:        "480px",
                onCancel:       function () 
                {
                    console.log ("onCancel")
                },
                onLoad:         function ()
                {
                    window.xedit01.SetContent ("<h1>Free form editor</h1><p>...for your editing pleasure!</p>");
                },
                onSave:         function () 
                {
                    var content;
                    content = window.xedit.GetContent ();
                    console.log (content);
                }
            }
        );
        window.xedit01 = editor;
        editor.startup ();
        domConstruct.place (editor.domNode, node01, "only");
        var editor = new TExerciseEditGUI 
        (
            {
                fHost:          null,
                fType:          "src",
                fSrcLang:       "js",
                fWidth:         "800px",
                fHeight:        "480px",
                onCancel:       function () 
                {
                    console.log ("onCancel")
                },
                onLoad:         function ()
                {
                    window.xedit02.SetContent ("/* Source code editor */\nvar tryIt=\"Enter some code here.\";\n");
                },
                onSave:         function () 
                {
                    var content;
                    content = window.xedit.GetContent ();
                    console.log (content);
                }
            }
        );
        window.xedit02 = editor;
        editor.startup ();
        domConstruct.place (editor.domNode, node02, "only");
    }

    parser.parse().then
    (
        function ()
        {
            funcEditTest ();
        }
    );
});
