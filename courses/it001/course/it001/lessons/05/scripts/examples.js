/**
 *  @fileoverview        Program examples, chapter
 */
define (["course/it001/res/scripts/decl"], function ()
{
    console.log ("Adding examples: Lesson 05");

    window.it001.gProgramRepository ["it001_Ex_05_010"] =
    {
        globals:
        {
            symbols: ["x"]
        },
        transitionTable:
        [
            { // State 0
                source:         "/* Declare variable x. */",
                symbols:        [],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "var x;",
                symbols:        [],
                comment:        "Declare variable x.",
                transition:
                    function ()
                    {
                        this._SetState (8, false);
                    }
            },
            { // State 2
                source:         "",
                symbols:        [],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 3
                source:         "",
                symbols:        [],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 4
                source:         "/* ",
                symbols:        [],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 5
                source:         " * At this point, the variable x is just declared, ",
                symbols:        [],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 6
                source:         " * but not yet defined.",
                symbols:        [],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 7
                source:         " */",
                symbols:        [],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 8
                source:         "console.log (\"x: \" + x);",
                symbols:        ["x"],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log ("x: " + this.x);
                        this._SetState (12, false);
                    }
            },
            { // State 9
                source:         "",
                symbols:        [],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 10
                source:         "",
                symbols:        [],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 11
                source:         "/* Define variable x to have the value 3 */",
                symbols:        [],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 12
                source:         "x = 3;",
                symbols:        ["x"],
                comment:        "Define variable x.",
                transition:
                    function ()
                    {
                        this.x = 3;
                        this._SetState (18, false);
                    }
            },
            { // State 13
                source:         "",
                symbols:        [],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 14
                source:         "",
                symbols:        [],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 15
                source:         "/* ",
                symbols:        [],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 16
                source:         " * Now the variable x is defined.",
                symbols:        [],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 17
                source:         " */",
                symbols:        [],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 18
                source:         "console.log (\"x: \" + x);",
                symbols:        ["x"],
                comment:        "Now, x is defined properly!",
                transition:
                    function ()
                    {
                        console.log ("x: " + this.x);
                        this._SetState (19, true);
                    }
            },
            { // State 19
                source:         "/* End */",
                symbols:        ["x"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    

    window.it001.gProgramRepository ["it001_Ex_05_020"] =
    {
        globals:
        {
            symbols: ["x"]
        },
        transitionTable:
        [
            { // State 0
                source:         "var x = 3;",
                symbols:        [],
                comment:        "",
                transition:
                    function ()
                    {
                        this.x = 3;
                        this._SetState (3, false);
                    }
            },
            { // State 1
                source:         "",
                symbols:        [],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 2
                source:         "/* Variable x is declared AND defined. */",
                symbols:        [],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 3
                source:         "console.log (\"x: \" + x);",
                symbols:        ["x"],
                comment:        "Variable x is declared AND defined.",
                transition:
                    function ()
                    {
                        console.log ("x: " + this.x);
                        this._SetState (4, false);
                    }
            },
            { // State 4
                source:         "/* End */",
                symbols:        ["x"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    

    window.it001.gProgramRepository ["it001_Ex_05_030"] =
    {
        globals:
        {
            symbols: ["console", "log", "undefined", "x"]
        },
        transitionTable:
        [
            { // State 0
                source:         "var x = 3;",
                symbols:        [],
                comment:        "",
                transition:
                    function ()
                    {
                        this.x = 3;
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "x = 3.2;",
                symbols:        ["x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.x = 3.2;
                        this._SetState (2, false);
                    }
            },
            { // State 2
                source:         "x = \"Hello\";",
                symbols:        ["x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.x = "Hello";
                        this._SetState (3, false);
                    }
            },
            { // State 3
                source:         "x = true;",
                symbols:        ["x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.x = true;
                        this._SetState (4, false);
                    }
            },
            { // State 4
                source:         "x = undefined;",
                symbols:        ["x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.x = undefined;
                        this._SetState (5, false);
                    }
            },
            { // State 5
                source:         "x = null;",
                symbols:        ["x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.x = null;
                        this._SetState (6, true);
                    }
            },
            { // State 6
                source:         "/* End */",
                symbols:        ["x"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    

    window.it001.gProgramRepository ["it001_Ex_05_040"] =
    {
        globals:
        {
            symbols: ["buckets"]
        },
        transitionTable:
        [
            { // State 0
                source:         "var buckets = [10, 25, 16, 45];",
                symbols:        [],
                comment:        "Create array 'buckets'.",
                transition:
                    function ()
                    {
                        this.buckets = [10, 25, 16, 45];
                        this._SetState (1, true);
                    }
            },
            { // State 1
                source:         "/* End */",
                symbols:        ["buckets"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    

    window.it001.gProgramRepository ["it001_Ex_05_050"] =
    {
        globals:
        {
            symbols: ["x"]
        },
        transitionTable:
        [
            { // State 0
                source:         "var x = [15, true, \"I am element #2\", null];",
                symbols:        [],
                comment:        "Create array with mixed type elements",
                transition:
                    function ()
                    {
                        this.x  = [15, true, "I am element #2", null];
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "console.log (\"x: \" + typeof (x[0]) + \", \" + typeof (x[1]) + \", \" + ",
                symbols:        ["x"],
                comment:        "Prints to console: <tt>x: number, boolean, string, object</tt>",
                transition:
                    function ()
                    {
                        console.log ("x: " + typeof (this.x[0]) + ", " + typeof (this.x[1]) + ", " + 
                                             typeof (this.x[2]) + ", " + typeof (this.x[3])          );
                        this._SetState (3, true);
                    }
            },
            { // State 2
                source:         "                     typeof (x[2]) + \", \" + typeof (x[3])          );",
                symbols:        [],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 3
                source:         "/* End */",
                symbols:        ["x"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    

    window.it001.gProgramRepository ["it001_Ex_05_060"] =
    {
        globals:
        {
            symbols: ["x"]
        },
        transitionTable:
        [
            { // State 0
                source:         "var x = [1, , 2];",
                symbols:        [],
                comment:        "Creates a sparse array.",
                transition:
                    function ()
                    {
                        this.x = [1, , 2];
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "console.log (x [1]);",
                symbols:        ["x"],
                comment:        "Prints to console: <tt>undefined</tt>",
                transition:
                    function ()
                    {
                        console.log (this.x [1]);
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
    

    window.it001.gProgramRepository ["it001_Ex_05_070"] =
    {
        globals:
        {
            symbols: ["a", "b", "c", "d"]
        },
        transitionTable:
        [
            { // State 0
                source:         "var a = [];",
                symbols:        [],
                comment:        "Empty array",
                transition:
                    function ()
                    {
                        this.a = [];
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "var b = [20];",
                symbols:        ["a"],
                comment:        "Array with  one element",
                transition:
                    function ()
                    {
                        this.b = [20];
                        this._SetState (2, false);
                    }
            },
            { // State 2
                source:         "var c = [1, \"Hello\"]",
                symbols:        ["a", "b"],
                comment:        "Array with two elements, each of a different type",
                transition:
                    function ()
                    {
                        this.c = [1, "Hello"];
                        this._SetState (3, false);
                    }
            },
            { // State 3
                source:         "var d = [ [1, 2], [5, 6] ]",
                symbols:        ["a", "b", "c"],
                comment:        "Array with two sub arrays as elements (a table)",
                transition:
                    function ()
                    {
                        this.d = [ [1, 2], [5, 6] ];
                        this._SetState (4, true);
                    }
            },
            { // State 4
                source:         "/* End */",
                symbols:        ["a", "b", "c", "d"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    

    window.it001.gProgramRepository ["it001_Ex_05_080"] =
    {
        globals:
        {
            symbols: ["console", "log", "x"]
        },
        transitionTable:
        [
            { // State 0
                source:         "var x = [10, 25, 16, 45];",
                symbols:        [],
                comment:        "Create array with four elements",
                transition:
                    function ()
                    {
                        this.x = [10, 25, 16, 45];
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "console.log (\"x: \" + x [0] + \", \" + x [1] + \", \" + x [2] + \", \" + x [3]);",
                symbols:        ["x"],
                comment:        "Prints to console: <tt>x: 10, 25, 16, 45</tt>",
                transition:
                    function ()
                    {
                        console.log ("x: " + this.x [0] + ", " + this.x [1] + ", " + this.x [2] + ", " + this.x [3]);
                        this._SetState (3, false);
                    }
            },
            { // State 2
                source:         "",
                symbols:        [],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 3
                source:         "x [0] = 98765432;",
                symbols:        ["x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.x [0] = 98765432;
                        this._SetState (4, false);
                    }
            },
            { // State 4
                source:         "console.log (\"x: \" + x [0] + \", \" + x [1] + \", \" + x [2] + \", \" + x [3]);",
                symbols:        ["x"],
                comment:        "Prints to console: <tt>x: 98765432, 25, 16, 45</tt>",
                transition:
                    function ()
                    {
                        console.log ("x: " + this.x [0] + ", " + this.x [1] + ", " + this.x [2] + ", " + this.x [3]);
                        this._SetState (5, false);
                    }
            },
            { // State 5
                source:         "/* End */",
                symbols:        ["x"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    

    window.it001.gProgramRepository ["it001_Ex_05_090"] =
    {
        globals:
        {
            symbols: ["x"]
        },
        transitionTable:
        [
            { // State 0
                source:         "var x = [];",
                symbols:        [],
                comment:        "Creates an empty array.",
                transition:
                    function ()
                    {
                        this.x = [];
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "x [0] = 1;",
                symbols:        ["x"],
                comment:        "Set first array element.",
                transition:
                    function ()
                    {
                        this.x [0] = 1;
                        this._SetState (2, false);
                    }
            },
            { // State 2
                source:         "x [2] = 100;",
                symbols:        ["x"],
                comment:        "Set third element.",
                transition:
                    function ()
                    {
                        this.x [2] = 100;    /* Oops, we're skipping the second element! */
                        this._SetState (3, true);
                    }
            },
            { // State 3
                source:         "/* End */",
                symbols:        ["x"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    

    window.it001.gProgramRepository ["it001_Ex_05_100"] =
    {
        globals:
        {
            symbols: ["x"]
        },
        transitionTable:
        [
            { // State 0
                source:         "var x = [5, 1, 3, 7, 2, 9, 3];",
                symbols:        [],
                comment:        "Create array with seven elements.",
                transition:
                    function ()
                    {
                        this.x = [5, 1, 3, 7, 2, 9, 3];
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "console.log (\"number of elements stored in array x: \" + x.length);",
                symbols:        ["x"],
                comment:        "Prints to console: <tt>number of elements stored in array x: 7</tt>.",
                transition:
                    function ()
                    {
                        console.log ("number of elements stored in array x: " + this.x.length);
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
    

});
