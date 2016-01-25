/**
 *  @fileoverview        Program examples, chapter
 */
define (["course/it001/res/scripts/decl"], function ()
{
    console.log ("Adding examples: Lesson 04");
    
    window.it001.gProgramRepository ["it001_Ex_04_010"] =
    {
        globals:
        {
            symbols: ["x"]
        },
        transitionTable:
        [
            { // State 0
                source:         "var x;",
                symbols:        ["x"],
                comment:        "Declaring variable x...",
                transition:
                    function ()
                    {
                        var dummy;
                        this.x = dummy;
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "x = 3;",
                symbols:        ["x"],
                comment:        "Defining variable x...",
                transition:
                    function ()
                    {
                        this.x = 3;
                        this._SetState (2, true);
                    }
            },
            { // State 2
                source:         "/* End */",
                symbols:        ["x"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    

    window.it001.gProgramRepository ["it001_Ex_04_020"] =
    {
        globals:
        {
            symbols: ["console", "log", "x", "y"]
        },
        transitionTable:
        [
            { // State 0
                source:         "var x = 0;",
                symbols:        [],
                comment:        "Declare/define x.",
                transition:
                    function ()
                    {
                        this.x = 0;
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "var y = 0;",
                symbols:        ["x"],
                comment:        "Declare/define y.",
                transition:
                    function ()
                    {
                        this.y = 0;
                        this._SetState (3, false);
                    }
            },
            { // State 2
                source:         "",
                symbols:        ["x", "y"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 3
                source:         "x = 23;",
                symbols:        ["x", "y"],
                comment:        "Set x to 23.",
                transition:
                    function ()
                    {
                        this.x = 23;
                        this._SetState (4, false);
                    }
            },
            { // State 4
                source:         "y = 3 * x * x + 2;",
                symbols:        ["x", "y"],
                comment:        "Expression for a parabola f(x) = 3*x*x + 2.",
                transition:
                    function ()
                    {
                        this.y = 3 * this.x * this.x + 2;
                        this._SetState (5, true);
                    }
            },
            { // State 5
                source:         "/* End */",
                symbols:        ["x", "y"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    

    window.it001.gProgramRepository ["it001_Ex_04_030"] =
    {
        globals:
        {
            symbols: ["a"]
        },
        transitionTable:
        [
            { // State 0
                source:         "function a ()",
                symbols:        [],
                comment:        "Declaring function a ().",
                transition:
                    function ()
                    {
                        this.a = function () {/* ...etc. */};
                        this._SetState (5, false);
                    }
            },
            { // State 1
                source:         "{",
                symbols:        ["a"],
                comment:        "Entering function a ().",
                transition:
                    function ()
                    {
                        this._SetState (2, false);
                    }
            },
            { // State 2
                source:         "    console.log (\"Executing function a ()\");",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log ("Executing function a ()");
                        this._SetState (3, false);
                    }
            },
            { // State 3
                source:         "}",
                symbols:        ["a"],
                comment:        "Exiting function a ().",
                transition:
                    function ()
                    {
                        this._SetState (7, false);
                    }
            },
            { // State 4
                source:         "",
                symbols:        [],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 5
                source:         "console.log (\"About to call function a ()\");",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log ("About to call function a ()");
                        this._SetState (6, false);
                    }
            },
            { // State 6
                source:         "a ();",
                symbols:        ["a"],
                comment:        "Calling function a ().",
                transition:
                    function ()
                    {
                        this._SetState (1, false);
                    }
            },
            { // State 7
                source:         "console.log (\"Returned from function a ()\");",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log ("Returned from function a ()");
                        this._SetState (8, true);
                    }
            },
            { // State 8
                source:         "/* End */",
                symbols:        ["a"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    

    window.it001.gProgramRepository ["it001_Ex_04_040"] =
    {
        globals:
        {
            symbols: ["b", "x"]
        },
        transitionTable:
        [
            { // State 0
                source:         "var x = 10;",
                symbols:        [],
                comment:        "",
                transition:
                    function ()
                    {
                        this.x = 10;
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "var b =  0;",
                symbols:        ["x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.b =  0;
                        this._SetState (3, false);
                    }
            },
            { // State 2
                source:         "",
                symbols:        ["b", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 3
                source:         "if (x >= 5)",
                symbols:        ["b", "x"],
                comment:        "Condition: If value of x is greater than, or equal to 5, then do the next step",
                transition:
                    function ()
                    {
                        if (this.x >= 5)
                        {
                            this._SetState (5, false);
                        }
                        else
                        {
                            this._SetState (7, false);
                        }
                    }
            },
            { // State 4
                source:         "{",
                symbols:        ["b", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 5
                source:         "    b = 1;",
                symbols:        ["b", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.b = 1;
                        this._SetState (12, false);
                    }
            },
            { // State 6
                source:         "}",
                symbols:        ["b", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 7
                source:         "else",
                symbols:        ["b", "x"],
                comment:        "Condition is <b>not</b> fulfilled - do the next step.",
                transition:
                    function ()
                    {
                        this._SetState (9, false);
                    }
            },
            { // State 8
                source:         "{",
                symbols:        ["b", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 9
                source:         "    b = 2;",
                symbols:        ["b", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.b = 2;
                        this._SetState (12, false);
                    }
            },
            { // State 10
                source:         "}",
                symbols:        ["b", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 11
                source:         "",
                symbols:        ["b", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 12
                source:         "console.log (b);",
                symbols:        ["b", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log (this.b);
                        this._SetState (13, true);
                    }
            },
            { // State 13
                source:         "/* End */",
                symbols:        ["b", "x"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    

    window.it001.gProgramRepository ["it001_Ex_04_050"] =
    {
        globals:
        {
            symbols: ["a", "b"]
        },
        transitionTable:
        [
            { // State 0
                source:         "// This is a one line comment",
                symbols:        [],
                comment:        "Just a comment. Nothing actually happens.",
                transition:
                    function ()
                    {
                        // This is a one line comment
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "",
                symbols:        [],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (2, false);
                    }
            },
            { // State 2
                source:         "var a = 3;",
                symbols:        [],
                comment:        "Set a to 3.",
                transition:
                    function ()
                    {
                        this.a = 3;
                        this._SetState (3, false);
                    }
            },
            { // State 3
                source:         "// var b = 4;",
                symbols:        ["a"],
                comment:        "Commented out - otherwise, we'd set b to 4. Commenting a a line out is a great debugging tool as it 'deactivates the line'!",
                transition:
                    function ()
                    {
                        // this.b = 4;
                        this._SetState (4, false);
                    }
            },
            { // State 4
                source:         "",
                symbols:        ["a", "b"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (5, false);
                    }
            },
            { // State 5
                source:         "console.log (\"Type of a: \" + typeof (a));",
                symbols:        ["a", "b"],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log ("Type of a: " + typeof (this.a));
                        this._SetState (6, false);
                    }
            },
            { // State 6
                source:         "console.log (\"Type of b: \" + typeof (b));",
                symbols:        ["a", "b"],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log ("Type of b: " + typeof (this.b));
                        this._SetState (7, true);
                    }
            },
            { // State 7
                source:         "/* End */",
                symbols:        ["a", "b"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    

    window.it001.gProgramRepository ["it001_Ex_04_060"] =
    {
        globals:
        {
            symbols: ["a", "b", "iWantThisVariable"]
        },
        transitionTable:
        [
            { // State 0
                source:         "/* A multiline comment used on one line */",
                symbols:        [],
                comment:        "Just a comment. Nothing actually happens.",
                transition:
                    function ()
                    {
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "",
                symbols:        [],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (2, false);
                    }
            },
            { // State 2
                source:         "/* A multiline comment",
                symbols:        [],
                comment:        "Start of a multiline comment. Everything in it will be ignored.",
                transition:
                    function ()
                    {
                        this._SetState (3, false);
                    }
            },
            { // State 3
                source:         "   spanning",
                symbols:        [],
                comment:        "Part of a multiline comment. Everything in it will be ignored.",
                transition:
                    function ()
                    {
                        this._SetState (4, false);
                    }
            },
            { // State 4
                source:         "   several",
                symbols:        [],
                comment:        "Part of a multiline comment. Everything in it will be ignored.",
                transition:
                    function ()
                    {
                        this._SetState (5, false);
                    }
            },
            { // State 5
                source:         "   lines",
                symbols:        [],
                comment:        "Part of a multiline comment. Everything in it will be ignored.",
                transition:
                    function ()
                    {
                        this._SetState (6, false);
                    }
            },
            { // State 6
                source:         " */",
                symbols:        [],
                comment:        "End of a multiline comment. everything after it will be executed.",
                transition:
                    function ()
                    {
                        this._SetState (7, false);
                    }
            },
            { // State 7
                source:         "",
                symbols:        [],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (8, false);
                    }
            },
            { // State 8
                source:         "var a = 3;",
                symbols:        ["a"],
                comment:        "This will execute",
                transition:
                    function ()
                    {
                        this.a = 3;
                        this._SetState (9, false);
                    }
            },
            { // State 9
                source:         "",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (10, false);
                    }
            },
            { // State 10
                source:         "/*",
                symbols:        ["a"],
                comment:        "Start of another multiline comment. ",
                transition:
                    function ()
                    {
                        this._SetState (11, false);
                    }
            },
            { // State 11
                source:         "Commenting out a chunk of code is a great debugging tool!",
                symbols:        ["a"],
                comment:        "You can comment out entire sections of code (thus, 'deactivating' them)!",
                transition:
                    function ()
                    {
                        this._SetState (12, false);
                    }
            },
            { // State 12
                source:         "",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (13, false);
                    }
            },
            { // State 13
                source:         "var b = 4;",
                symbols:        ["a"],
                comment:        "This will be ignored as it's commented out.",
                transition:
                    function ()
                    {
                        this._SetState (14, false);
                    }
            },
            { // State 14
                source:         "var iWantThisVariable = 5;",
                symbols:        ["a", "b"],
                comment:        "Will be ignored.",
                transition:
                    function ()
                    {
                        this._SetState (15, false);
                    }
            },
            { // State 15
                source:         " */",
                symbols:        ["a", "b", "iWantThisVariable"],
                comment:        "End of a multiline comment. everything after it will be executed.",
                transition:
                    function ()
                    {
                        this._SetState (16, false);
                    }
            },
            { // State 16
                source:         "",
                symbols:        ["a", "b", "iWantThisVariable"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (17, false);
                    }
            },
            { // State 17
                source:         "console.log (\"Type of a: \" + typeof (a));",
                symbols:        ["a", "b", "iWantThisVariable"],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log ("Type of a: " + typeof (this.a));
                        this._SetState (18, false);
                    }
            },
            { // State 18
                source:         "console.log (\"Type of b: \" + typeof (b));",
                symbols:        ["a", "b", "iWantThisVariable"],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log ("Type of b: " + typeof (this.b));
                        this._SetState (19, false);
                    }
            },
            { // State 19
                source:         "console.log (\"Type of iWantThisVariable: \" + typeof (b));",
                symbols:        ["a", "b", "iWantThisVariable"],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log ("Type of iWantThisVariable: " + typeof (this.iWantThisVariable));
                        this._SetState (20, true);
                    }
            },
            { // State 20
                source:         "/* End */",
                symbols:        ["a", "b", "iWantThisVariable"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
});
