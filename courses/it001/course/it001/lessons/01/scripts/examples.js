/**
 *  @fileoverview        Program examples, chapter
 */
define (["course/it001/res/scripts/decl"], function ()
{
    console.log ("Adding examples: Lesson 01");

    window.it001.gProgramRepository ["it001_Ex_01_010"] =
    {
        globals:
        {
            symbols:    ["t"]
        },
        transitionTable:
        [
            { // State 0
                source:         "var t = (1 + 1 / (1 + 1 / (1 + 1 / (1 + 1 / (1 + 1 / (1 + 1))))));",
                symbols:        [],
                comment:        "Declare variable <tt>t</tt> and set it.",
                transition:
                    function ()
                    {
                        this.t = (1 + 1 / (1 + 1 / (1 + 1 / (1 + 1 / (1 + 1 / (1 + 1))))));
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "window.alert (\"t = \" + t);",
                symbols:        ["t"],
                comment:        "Show the value of <tt>t</tt> in a message box.",
                transition:
                    function ()
                    {
                        window.alert ("t = " + this.t);
                        this._SetState (2, true);
                    }
            },
            { // State 2
                source:         "/* End */",
                symbols:        ["t"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
});
