require
([
    "dojo/parser",
    "dojo/dom",
    "dojo/dom-construct",
    "courseware/gui/TExerciseEditGUI/TExerciseEditGUI",
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
        window.xtypes =
        [
            {type: "rtf",       lang: "plain_text"  },
            {type: "rtf",       lang: "nonsense"    },
            {type: "src",       lang: "plain_text"  },
            {type: "src",       lang: "js"          },
            {type: "src",       lang: "html"        },
            {type: "src",       lang: "nonsense"    },
            {type: "nonsense",  lang: "nonsense"    },
        ];
        window.xtypesI = -1;
        
        var node01 = dom.byId ("editTest01");
        var editor = new TExerciseEditGUI 
        (
            {
                fHost:          window,
                fWidth:         "800px",
                fHeight:        "180px",
                onCancel:       function () 
                {
                    console.log ("onCancel")
                },
                onLoad:         function ()
                {
//                    window.xedit01.SetContent ("The editor");
                },
                onSave:         function () 
                {
                    var content;
                    content = window.xedit01.GetContent ();
                    console.log (content);
                }
            }
        );
        window.xedit01 = editor;
        editor.startup ();
        editor.SetType ("rtf", "plaintext");
        domConstruct.place (editor.domNode, node01, "only");
    }
    
    window.xrotate = function ()
    {
        var record;
        var message;
        
        window.xtypesI  = (window.xtypesI >= window.xtypes.length-1)  ?  0  :  window.xtypesI + 1;
        
        record          = window.xtypes [window.xtypesI];
        message         = "Setting #" + window.xtypesI + ". Type/language: " + record.type + "::" + record.lang;
        window.xedit01.SetType (record.type, record.lang);
        window.xedit01.SetContent (message);
        console.log (message);
        window.setTimeout (window.xrotate, 5000);
    }

    parser.parse().then
    (
        function ()
        {
            funcEditTest ();
            window.setTimeout (window.xrotate, 5000);
        }
    );
});
