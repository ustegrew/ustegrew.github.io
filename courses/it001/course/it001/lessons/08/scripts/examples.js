/**
 *  @fileoverview        Program examples, chapter
 */
define (["course/it001/res/scripts/decl"], function ()
{
    console.log ("Adding examples: Lesson 08");

    window.it001.gProgramRepository ["it001_Ex_08_010"] =
    {
        globals:
        {
            symbols: ["isTerm", "nextState"]
        },
        transitionTable:
        [
            { // State 0
                source:         "function LogTime ()",
                symbols:        [],
                comment:        "Define function <b>LogTime</b>.",
                transition:
                    function ()
                    {
                        this.nextState = 0;
                        this.isTerm    = false;
                        this._SetState (5, false);
                    }
            },
            { // State 1
                source:         "{",
                symbols:        [],
                comment:        "Entering function",
                transition:
                    function ()
                    {
                        this._SetState (2, false);
                    }
            },
            { // State 2
                source:         "    console.log (new Date().toISOString ());",
                symbols:        [],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log (new Date().toISOString ());
                        this._SetState (3, false);
                    }
            },
            { // State 3
                source:         "}",
                symbols:        [],
                comment:        "Exiting function.",
                transition:
                    function ()
                    {
                        this._SetState (this.nextState, this.isTerm);
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
                source:         "LogTime ();",
                symbols:        [],
                comment:        "Call function <b>LogTime</b>...",
                transition:
                    function ()
                    {
                        this.nextState = 6;
                        this.isTerm    = false;
                        this._SetState (1, false);
                    }
            },
            { // State 6
                source:         "LogTime ();",
                symbols:        [],
                comment:        "Call function <b>LogTime</b>...",
                transition:
                    function ()
                    {
                        this.nextState = 7;
                        this.isTerm    = true;
                        this._SetState (1, false);
                    }
            },
            { // State 7
                source:         "/* End */",
                symbols:        [],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    

    window.it001.gProgramRepository ["it001_Ex_08_020"] =
    {
        globals:
        {
            symbols: ["i", "j", "length", "temp", "x", "stack"]
        },
        transitionTable:
        [
            { // State 0
                source:         "function LogTime ()",
                symbols:        ["i", "j", "length", "temp", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.stack = [];
                        this._SetState (5, false);
                    }
            },
            { // State 1
                source:         "{",
                symbols:        ["i", "j", "length", "temp", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (2, false);
                    }
            },
            { // State 2
                source:         "    console.log (new Date().toISOString ());",
                symbols:        ["i", "j", "length", "temp", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log (new Date().toISOString ());
                        this._SetState (3, false);
                    }
            },
            { // State 3
                source:         "}",
                symbols:        ["i", "j", "length", "temp", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        var frame = this.stack.pop ();
                        this._SetState (frame.nextState, frame.isTerminal);
                    }
            },
            { // State 4
                source:         "",
                symbols:        ["i", "j", "length", "temp", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (5, false);
                    }
            },
            { // State 5
                source:         "function LogProgramStart ()",
                symbols:        ["i", "j", "length", "temp", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (11, false);
                    }
            },
            { // State 6
                source:         "{",
                symbols:        ["i", "j", "length", "temp", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (7, false);
                    }
            },
            { // State 7
                source:         "    LogTime ();",
                symbols:        ["i", "j", "length", "temp", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        var frame = 
                        {
                            nextState:      8,
                            isTerminal:     false
                        }
                        this.stack.push (frame);
                        this._SetState (1, false);
                    }
            },
            { // State 8
                source:         "    console.log (\"Program run started\")",
                symbols:        ["i", "j", "length", "temp", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log ("Program run started")
                        this._SetState (9, false);
                    }
            },
            { // State 9
                source:         "}",
                symbols:        ["i", "j", "length", "temp", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        var frame = this.stack.pop ();
                        this._SetState (frame.nextState, frame.isTerminal);
                    }
            },
            { // State 10
                source:         "",
                symbols:        ["i", "j", "length", "temp", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (11, false);
                    }
            },
            { // State 11
                source:         "function LogProgramEnd ()",
                symbols:        ["i", "j", "length", "temp", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (17, false);
                    }
            },
            { // State 12
                source:         "{",
                symbols:        ["i", "j", "length", "temp", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (13, false);
                    }
            },
            { // State 13
                source:         "    LogTime ();",
                symbols:        ["i", "j", "length", "temp", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        var frame = 
                        {
                            nextState:      14,
                            isTerminal:     false
                        }
                        this.stack.push (frame);
                        this._SetState (1, false);
                    }
            },
            { // State 14
                source:         "    console.log (\"Program run finished\")",
                symbols:        ["i", "j", "length", "temp", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log ("Program run finished")
                        this._SetState (15, false);
                    }
            },
            { // State 15
                source:         "}",
                symbols:        ["i", "j", "length", "temp", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        var frame = this.stack.pop ();
                        this._SetState (frame.nextState, frame.isTerminal);
                    }
            },
            { // State 16
                source:         "",
                symbols:        ["i", "j", "length", "temp", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (17, false);
                    }
            },
            { // State 17
                source:         "var x = [6702568390, 7785219811, 303673531];",
                symbols:        ["i", "j", "length", "temp", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.x = [6702568390, 7785219811, 303673531];
                        this._SetState (22, false);
                    }
            },
            { // State 18
                source:         "var i;",
                symbols:        ["i", "j", "length", "temp", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 19
                source:         "var j;",
                symbols:        ["i", "j", "length", "temp", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 20
                source:         "var temp;",
                symbols:        ["i", "j", "length", "temp", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 21
                source:         "",
                symbols:        ["i", "j", "length", "temp", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 22
                source:         "LogProgramStart ();",
                symbols:        ["i", "j", "length", "temp", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        var frame = 
                        {
                            nextState:  24,
                            isTerminal: false
                        }
                        this.stack.push (frame);
                        this._SetState (6, false);
                    }
            },
            { // State 23
                source:         "",
                symbols:        ["i", "j", "length", "temp", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 24
                source:         "for (i = 0; i < x.length-1; i++)",
                symbols:        ["i", "j", "length", "temp", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.i = 0;
                        this._SetState (25, false);
                    }
            },
            { // State 25
                source:         "{",
                symbols:        ["i", "j", "length", "temp", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        if (this.i < this.x.length - 1)
                        {
                            this._SetState (26, false);
                        }
                        else
                        {
                            this._SetState (38, false);
                        }
                    }
            },
            { // State 26
                source:         "    for (j = i+1; j < x.length; j++)",
                symbols:        ["i", "j", "length", "temp", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.j = this.i + 1;
                        this._SetState (27, false);
                    }
            },
            { // State 27
                source:         "    {",
                symbols:        ["i", "j", "length", "temp", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        if (this.j < this.x.length)
                        {
                            this._SetState (28, false);
                        }
                        else
                        {
                            this._SetState (36, false);
                        }
                    }
            },
            { // State 28
                source:         "        if (x [i] < x [j])",
                symbols:        ["i", "j", "length", "temp", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        if (this.x [this.i] > this.x [this.j])
                        {
                            this._SetState (31, false);
                        }
                        else
                        {
                            this._SetState (35, false);
                        }
                    }
            },
            { // State 29
                source:         "        {",
                symbols:        ["i", "j", "length", "temp", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 30
                source:         "            /* swap x [i] and x [j] */",
                symbols:        ["i", "j", "length", "temp", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (31, false);
                    }
            },
            { // State 31
                source:         "            temp    = x [i];",
                symbols:        ["i", "j", "length", "temp", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.temp           = this.x [this.i];
                        this._SetState (32, false);
                    }
            },
            { // State 32
                source:         "            x [i]   = x [j];",
                symbols:        ["i", "j", "length", "temp", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.x [this.i]     = this.x [this.j];
                        this._SetState (33, false);
                    }
            },
            { // State 33
                source:         "            x [j]   = temp;",
                symbols:        ["i", "j", "length", "temp", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.x [this.j]     = this.temp;
                        this._SetState (35, false);
                    }
            },
            { // State 34
                source:         "        }",
                symbols:        ["i", "j", "length", "temp", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 35
                source:         "    }",
                symbols:        ["i", "j", "length", "temp", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.j++;
                        this._SetState (27, false);
                    }
            },
            { // State 36
                source:         "}",
                symbols:        ["i", "j", "length", "temp", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.i++;
                        this._SetState (25, false);
                    }
            },
            { // State 37
                source:         "",
                symbols:        ["i", "j", "length", "temp", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 38
                source:         "LogProgramEnd ();",
                symbols:        ["i", "j", "length", "temp", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        var frame = 
                        {
                            nextState:  39,
                            isTerminal: true
                        }
                        this.stack.push (frame);
                        this._SetState (12, false);
                    }
            },
            { // State 39
                source:         "/* End */",
                symbols:        ["i", "j", "length", "temp", "x"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    

//    window.it001.gProgramRepository ["it001_Ex_08_030"] =
//    {
//        globals:
//        {
//            symbols: ["dbl", "dblVal", "x", "stack", "global_scope", "push", "pop"]
//        },
//        transitionTable:
//        [
//            { // State 0
//                source:         "/**",
//                symbols:        ["dbl", "dblVal", "x"],
//                comment:        "",
//                transition:
//                    function ()
//                    {
//                        this.stack          = [];
//                        this.global_scope   =
//                        {
//                            data:
//                            {
//                                
//                            }
//                        }
//                        this.push = function ()
//                        {
//                            var scope =
//                            {
//
//                            }
//                        }
//                        this._SetState (18, false);
//                    }
//            },
//            { // State 1
//                source:         " * Returns the double value of the given parameter.",
//                symbols:        ["dbl", "dblVal", "x"],
//                comment:        "",
//                transition:
//                    function ()
//                    {
//                    }
//            },
//            { // State 2
//                source:         " * ",
//                symbols:        ["dbl", "dblVal", "x"],
//                comment:        "",
//                transition:
//                    function ()
//                    {
//                    }
//            },
//            { // State 3
//                source:         " * @param   x       The value to be doubled.",
//                symbols:        ["dbl", "dblVal", "x"],
//                comment:        "",
//                transition:
//                    function ()
//                    {
//                    }
//            },
//            { // State 4
//                source:         " * @return          The double value.",
//                symbols:        ["dbl", "dblVal", "x"],
//                comment:        "",
//                transition:
//                    function ()
//                    {
//                    }
//            },
//            { // State 5
//                source:         " */",
//                symbols:        ["dbl", "dblVal", "x"],
//                comment:        "",
//                transition:
//                    function ()
//                    {
//                    }
//            },
//            { // State 6
//                source:         "function GetDoubleOf (x)",
//                symbols:        ["dbl", "dblVal", "x"],
//                comment:        "",
//                transition:
//                    function ()
//                    {
//                    }
//            },
//            { // State 7
//                source:         "{",
//                symbols:        ["dbl", "dblVal", "x"],
//                comment:        "",
//                transition:
//                    function ()
//                    {
//                        this.scope
//                        this._SetState (10, false);
//                    }
//            },
//            { // State 8
//                source:         "    var dbl;",
//                symbols:        ["dbl", "dblVal", "x"],
//                comment:        "",
//                transition:
//                    function ()
//                    {
//                    }
//            },
//            { // State 9
//                source:         "",
//                symbols:        ["dbl", "dblVal", "x"],
//                comment:        "",
//                transition:
//                    function ()
//                    {
//                    }
//            },
//            { // State 10
//                source:         "    dbl = 2 * x;",
//                symbols:        ["dbl", "dblVal", "x"],
//                comment:        "",
//                transition:
//                    function ()
//                    {
//                        this.dbl = 2 * x;
//                        this._SetState (11, false);
//                    }
//            },
//            { // State 11
//                source:         "",
//                symbols:        ["dbl", "dblVal", "x"],
//                comment:        "",
//                transition:
//                    function ()
//                    {
//                        this._SetState (12, false);
//                    }
//            },
//            { // State 12
//                source:         "    return dbl;",
//                symbols:        ["dbl", "dblVal", "x"],
//                comment:        "",
//                transition:
//                    function ()
//                    {
//                        return dbl;
//                        this._SetState (13, false);
//                    }
//            },
//            { // State 13
//                source:         "}",
//                symbols:        ["dbl", "dblVal", "x"],
//                comment:        "",
//                transition:
//                    function ()
//                    {
//                        this._SetState (14, false);
//                    }
//            },
//            { // State 14
//                source:         "",
//                symbols:        ["dbl", "dblVal", "x"],
//                comment:        "",
//                transition:
//                    function ()
//                    {
//                        this._SetState (15, false);
//                    }
//            },
//            { // State 15
//                source:         "/* -------------------------------------------------------------- */",
//                symbols:        ["dbl", "dblVal", "x"],
//                comment:        "",
//                transition:
//                    function ()
//                    {
//                        this._SetState (16, false);
//                    }
//            },
//            { // State 16
//                source:         "var dblVal;",
//                symbols:        ["dbl", "dblVal", "x"],
//                comment:        "",
//                transition:
//                    function ()
//                    {
//                        this._SetState (17, false);
//                    }
//            },
//            { // State 17
//                source:         "",
//                symbols:        ["dbl", "dblVal", "x"],
//                comment:        "",
//                transition:
//                    function ()
//                    {
//                        this._SetState (18, false);
//                    }
//            },
//            { // State 18
//                source:         "dblVal = GetDoubleOf (2);",
//                symbols:        ["dbl", "dblVal", "x"],
//                comment:        "",
//                transition:
//                    function ()
//                    {
//                        var frame = 
//                        {
//                            nextState:      19,
//                            isTerminal:     false
//                        };
//                        this.stack.push (frame);
//                        this._SetState (7, false);
//                    }
//            },
//            { // State 19
//                source:         "console.log (dblVal);",
//                symbols:        ["dbl", "dblVal", "x"],
//                comment:        "",
//                transition:
//                    function ()
//                    {
//                        console.log (dblVal);
//                        this._SetState (20, true);
//                    }
//            },
//            { // State 20
//                source:         "/* End */",
//                symbols:        ["dbl", "dblVal", "x"],
//                comment:        "",
//                transition:     function (){}
//            }
//        ]
//    };
    

//     window.it001.gProgramRepository ["it001_Ex_08_040"] =
//     {
//         globals:
//         {
//             symbols: ["GetChildNode", "GetNumChildren", "IsBanana", "Visit", "console", "gt", "i", "isBanana", "log", "lt", "n", "nd", "node"]
//         },
//         transitionTable:
//         [
//             { // State 0
//                 source:         "function Visit (node)",
//                 symbols:        ["GetChildNode", "GetNumChildren", "IsBanana", "Visit", "console", "gt", "i", "isBanana", "log", "lt", "n", "nd", "node"],
//                 comment:        "",
//                 transition:
//                     function ()
//                     {
//                         function Visit (node)
//                         this._SetState (1, false);
//                     }
//             },
//             { // State 1
//                 source:         "{",
//                 symbols:        ["GetChildNode", "GetNumChildren", "IsBanana", "Visit", "console", "gt", "i", "isBanana", "log", "lt", "n", "nd", "node"],
//                 comment:        "",
//                 transition:
//                     function ()
//                     {
//                         {
//                         this._SetState (2, false);
//                     }
//             },
//             { // State 2
//                 source:         "    var     i;",
//                 symbols:        ["GetChildNode", "GetNumChildren", "IsBanana", "Visit", "console", "gt", "i", "isBanana", "log", "lt", "n", "nd", "node"],
//                 comment:        "",
//                 transition:
//                     function ()
//                     {
//                             var     i;
//                         this._SetState (3, false);
//                     }
//             },
//             { // State 3
//                 source:         "    var     n;",
//                 symbols:        ["GetChildNode", "GetNumChildren", "IsBanana", "Visit", "console", "gt", "i", "isBanana", "log", "lt", "n", "nd", "node"],
//                 comment:        "",
//                 transition:
//                     function ()
//                     {
//                             var     n;
//                         this._SetState (4, false);
//                     }
//             },
//             { // State 4
//                 source:         "    var     nd;",
//                 symbols:        ["GetChildNode", "GetNumChildren", "IsBanana", "Visit", "console", "gt", "i", "isBanana", "log", "lt", "n", "nd", "node"],
//                 comment:        "",
//                 transition:
//                     function ()
//                     {
//                             var     nd;
//                         this._SetState (5, false);
//                     }
//             },
//             { // State 5
//                 source:         "    var     isBanana;",
//                 symbols:        ["GetChildNode", "GetNumChildren", "IsBanana", "Visit", "console", "gt", "i", "isBanana", "log", "lt", "n", "nd", "node"],
//                 comment:        "",
//                 transition:
//                     function ()
//                     {
//                             var     isBanana;
//                         this._SetState (6, false);
//                     }
//             },
//             { // State 6
//                 source:         "",
//                 symbols:        ["GetChildNode", "GetNumChildren", "IsBanana", "Visit", "console", "gt", "i", "isBanana", "log", "lt", "n", "nd", "node"],
//                 comment:        "",
//                 transition:
//                     function ()
//                     {
                        
//                         this._SetState (7, false);
//                     }
//             },
//             { // State 7
//                 source:         "    isBanana = IsBanana (node);",
//                 symbols:        ["GetChildNode", "GetNumChildren", "IsBanana", "Visit", "console", "gt", "i", "isBanana", "log", "lt", "n", "nd", "node"],
//                 comment:        "",
//                 transition:
//                     function ()
//                     {
//                             isBanana = IsBanana (node);
//                         this._SetState (8, false);
//                     }
//             },
//             { // State 8
//                 source:         "    if (isBanana)",
//                 symbols:        ["GetChildNode", "GetNumChildren", "IsBanana", "Visit", "console", "gt", "i", "isBanana", "log", "lt", "n", "nd", "node"],
//                 comment:        "",
//                 transition:
//                     function ()
//                     {
//                             if (isBanana)
//                         this._SetState (9, false);
//                     }
//             },
//             { // State 9
//                 source:         "    {",
//                 symbols:        ["GetChildNode", "GetNumChildren", "IsBanana", "Visit", "console", "gt", "i", "isBanana", "log", "lt", "n", "nd", "node"],
//                 comment:        "",
//                 transition:
//                     function ()
//                     {
//                             {
//                         this._SetState (10, false);
//                     }
//             },
//             { // State 10
//                 source:         "        console.log (\"Yum Yum!\");",
//                 symbols:        ["GetChildNode", "GetNumChildren", "IsBanana", "Visit", "console", "gt", "i", "isBanana", "log", "lt", "n", "nd", "node"],
//                 comment:        "",
//                 transition:
//                     function ()
//                     {
//                                 console.log ("Yum Yum!");
//                         this._SetState (11, false);
//                     }
//             },
//             { // State 11
//                 source:         "    }",
//                 symbols:        ["GetChildNode", "GetNumChildren", "IsBanana", "Visit", "console", "gt", "i", "isBanana", "log", "lt", "n", "nd", "node"],
//                 comment:        "",
//                 transition:
//                     function ()
//                     {
//                             }
//                         this._SetState (12, false);
//                     }
//             },
//             { // State 12
//                 source:         "",
//                 symbols:        ["GetChildNode", "GetNumChildren", "IsBanana", "Visit", "console", "gt", "i", "isBanana", "log", "lt", "n", "nd", "node"],
//                 comment:        "",
//                 transition:
//                     function ()
//                     {
                        
//                         this._SetState (13, false);
//                     }
//             },
//             { // State 13
//                 source:         "    n = GetNumChildren (node);",
//                 symbols:        ["GetChildNode", "GetNumChildren", "IsBanana", "Visit", "console", "gt", "i", "isBanana", "log", "lt", "n", "nd", "node"],
//                 comment:        "",
//                 transition:
//                     function ()
//                     {
//                             n = GetNumChildren (node);
//                         this._SetState (14, false);
//                     }
//             },
//             { // State 14
//                 source:         "    if (n >= 1)",
//                 symbols:        ["GetChildNode", "GetNumChildren", "IsBanana", "Visit", "console", "gt", "i", "isBanana", "log", "lt", "n", "nd", "node"],
//                 comment:        "",
//                 transition:
//                     function ()
//                     {
//                             if (n >= 1)
//                         this._SetState (15, false);
//                     }
//             },
//             { // State 15
//                 source:         "    {",
//                 symbols:        ["GetChildNode", "GetNumChildren", "IsBanana", "Visit", "console", "gt", "i", "isBanana", "log", "lt", "n", "nd", "node"],
//                 comment:        "",
//                 transition:
//                     function ()
//                     {
//                             {
//                         this._SetState (16, false);
//                     }
//             },
//             { // State 16
//                 source:         "        for (i = 0; i < n; i++)",
//                 symbols:        ["GetChildNode", "GetNumChildren", "IsBanana", "Visit", "console", "gt", "i", "isBanana", "log", "lt", "n", "nd", "node"],
//                 comment:        "",
//                 transition:
//                     function ()
//                     {
//                                 for (i = 0; i < n; i++)
//                         this._SetState (17, false);
//                     }
//             },
//             { // State 17
//                 source:         "        {",
//                 symbols:        ["GetChildNode", "GetNumChildren", "IsBanana", "Visit", "console", "gt", "i", "isBanana", "log", "lt", "n", "nd", "node"],
//                 comment:        "",
//                 transition:
//                     function ()
//                     {
//                                 {
//                         this._SetState (18, false);
//                     }
//             },
//             { // State 18
//                 source:         "            nd = GetChildNode (node, i);",
//                 symbols:        ["GetChildNode", "GetNumChildren", "IsBanana", "Visit", "console", "gt", "i", "isBanana", "log", "lt", "n", "nd", "node"],
//                 comment:        "",
//                 transition:
//                     function ()
//                     {
//                                     nd = GetChildNode (node, i);
//                         this._SetState (19, false);
//                     }
//             },
//             { // State 19
//                 source:         "            Visit (nd); /* Recursion: Visit child node */",
//                 symbols:        ["GetChildNode", "GetNumChildren", "IsBanana", "Visit", "console", "gt", "i", "isBanana", "log", "lt", "n", "nd", "node"],
//                 comment:        "",
//                 transition:
//                     function ()
//                     {
//                                     Visit (nd); /* Recursion: Visit child node */
//                         this._SetState (20, false);
//                     }
//             },
//             { // State 20
//                 source:         "        }",
//                 symbols:        ["GetChildNode", "GetNumChildren", "IsBanana", "Visit", "console", "gt", "i", "isBanana", "log", "lt", "n", "nd", "node"],
//                 comment:        "",
//                 transition:
//                     function ()
//                     {
//                                 }
//                         this._SetState (21, false);
//                     }
//             },
//             { // State 21
//                 source:         "    }",
//                 symbols:        ["GetChildNode", "GetNumChildren", "IsBanana", "Visit", "console", "gt", "i", "isBanana", "log", "lt", "n", "nd", "node"],
//                 comment:        "",
//                 transition:
//                     function ()
//                     {
//                             }
//                         this._SetState (22, false);
//                     }
//             },
//             { // State 22
//                 source:         "}",
//                 symbols:        ["GetChildNode", "GetNumChildren", "IsBanana", "Visit", "console", "gt", "i", "isBanana", "log", "lt", "n", "nd", "node"],
//                 comment:        "",
//                 transition:
//                     function ()
//                     {
//                         }
//                         this._SetState (23, true);
//                     }
//             },
//             { // State 23
//                 source:         "/* End */",
//                 symbols:        ["GetChildNode", "GetNumChildren", "IsBanana", "Visit", "console", "gt", "i", "isBanana", "log", "lt", "n", "nd", "node"],
//                 comment:        "",
//                 transition:     function (){}
//             }
//         ]
//     };
    

});
