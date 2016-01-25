/**
 *  @fileoverview        Program examples, chapter
 */
define (["course/it001/res/scripts/decl"], function ()
{
    console.log ("Adding examples: Lesson 07");

    window.it001.gProgramRepository ["it001_Ex_07_010"] =
    {
        globals:
        {
            symbols: ["msg", "t", "v", "x"]
        },
        transitionTable:
        [
            { // State 0
                source:         "/*",
                symbols:        [],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "* For each second in 0, 1, 2, ..., 10 we compute",
                symbols:        [],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (2, false);
                    }
            },
            { // State 2
                source:         "* the distance a vehicle will have travelled at",
                symbols:        [],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (3, false);
                    }
            },
            { // State 3
                source:         "* a constant speed of 30 m/s.",
                symbols:        [],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (4, false);
                    }
            },
            { // State 4
                source:         "*/",
                symbols:        [],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (5, false);
                    }
            },
            { // State 5
                source:         "",
                symbols:        [],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (6, false);
                    }
            },
            { // State 6
                source:         "var v = 30;",
                symbols:        [],
                comment:        "",
                transition:
                    function ()
                    {
                        this.v = 30;
                        this._SetState (7, false);
                    }
            },
            { // State 7
                source:         "var t;",
                symbols:        ["v"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (8, false);
                    }
            },
            { // State 8
                source:         "var x;",
                symbols:        ["v","t"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (9, false);
                    }
            },
            { // State 9
                source:         "var msg;",
                symbols:        ["v","t","x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (10, false);
                    }
            },
            { // State 10
                source:         "",
                symbols:        ["msg","v","t","x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (11, false);
                    }
            },
            { // State 11
                source:         "t = 0;",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.t = 0;
                        this._SetState (12, false);
                    }
            },
            { // State 12
                source:         "x = v * t;",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.x = this.v * this.t;
                        this._SetState (13, false);
                    }
            },
            { // State 13
                source:         "msg = \"After \" + t + \" seconds, the vehicle will have travelled \" + x + \" meters.\";",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.msg = "After " +this. t + " seconds, the vehicle will have travelled " + this.x + " meters.";
                        this._SetState (14, false);
                    }
            },
            { // State 14
                source:         "console.log (msg);",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log (this.msg);
                        this._SetState (15, false);
                    }
            },
            { // State 15
                source:         "",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (16, false);
                    }
            },
            { // State 16
                source:         "t = 1;",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.t = 1;
                        this._SetState (17, false);
                    }
            },
            { // State 17
                source:         "x = v * t;",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.x = this.v * this.t;
                        this._SetState (18, false);
                    }
            },
            { // State 18
                source:         "msg = \"After \" + t + \" seconds, the vehicle will have travelled \" + x + \" meters.\";",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.msg = "After " +this. t + " seconds, the vehicle will have travelled " + this.x + " meters.";
                        this._SetState (19, false);
                    }
            },
            { // State 19
                source:         "console.log (msg);",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log (this.msg);
                        this._SetState (20, false);
                    }
            },
            { // State 20
                source:         "",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (21, false);
                    }
            },
            { // State 21
                source:         "t = 2;",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.t = 2;
                        this._SetState (22, false);
                    }
            },
            { // State 22
                source:         "x = v * t;",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.x = this.v * this.t;
                        this._SetState (23, false);
                    }
            },
            { // State 23
                source:         "msg = \"After \" + t + \" seconds, the vehicle will have travelled \" + x + \" meters.\";",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.msg = "After " +this. t + " seconds, the vehicle will have travelled " + this.x + " meters.";
                        this._SetState (24, false);
                    }
            },
            { // State 24
                source:         "console.log (msg);",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log (this.msg);
                        this._SetState (25, false);
                    }
            },
            { // State 25
                source:         "",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (26, false);
                    }
            },
            { // State 26
                source:         "t = 3;",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.t = 3;
                        this._SetState (27, false);
                    }
            },
            { // State 27
                source:         "x = v * t;",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.x = this.v * this.t;
                        this._SetState (28, false);
                    }
            },
            { // State 28
                source:         "msg = \"After \" + t + \" seconds, the vehicle will have travelled \" + x + \" meters.\";",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.msg = "After " +this. t + " seconds, the vehicle will have travelled " + this.x + " meters.";
                        this._SetState (29, false);
                    }
            },
            { // State 29
                source:         "console.log (msg);",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log (this.msg);
                        this._SetState (30, false);
                    }
            },
            { // State 30
                source:         "",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (31, false);
                    }
            },
            { // State 31
                source:         "t = 4;",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.t = 4;
                        this._SetState (32, false);
                    }
            },
            { // State 32
                source:         "x = v * t;",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.x = this.v * this.t;
                        this._SetState (33, false);
                    }
            },
            { // State 33
                source:         "msg = \"After \" + t + \" seconds, the vehicle will have travelled \" + x + \" meters.\";",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.msg = "After " +this. t + " seconds, the vehicle will have travelled " + this.x + " meters.";
                        this._SetState (34, false);
                    }
            },
            { // State 34
                source:         "console.log (msg);",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log (this.msg);
                        this._SetState (35, false);
                    }
            },
            { // State 35
                source:         "",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (36, false);
                    }
            },
            { // State 36
                source:         "t = 5;",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.t = 5;
                        this._SetState (37, false);
                    }
            },
            { // State 37
                source:         "x = v * t;",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.x = this.v * this.t;
                        this._SetState (38, false);
                    }
            },
            { // State 38
                source:         "msg = \"After \" + t + \" seconds, the vehicle will have travelled \" + x + \" meters.\";",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.msg = "After " +this. t + " seconds, the vehicle will have travelled " + this.x + " meters.";
                        this._SetState (39, false);
                    }
            },
            { // State 39
                source:         "console.log (msg);",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log (this.msg);
                        this._SetState (40, false);
                    }
            },
            { // State 40
                source:         "",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (41, false);
                    }
            },
            { // State 41
                source:         "t = 6;",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.t = 6;
                        this._SetState (42, false);
                    }
            },
            { // State 42
                source:         "x = v * t;",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.x = this.v * this.t;
                        this._SetState (43, false);
                    }
            },
            { // State 43
                source:         "msg = \"After \" + t + \" seconds, the vehicle will have travelled \" + x + \" meters.\";",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.msg = "After " +this. t + " seconds, the vehicle will have travelled " + this.x + " meters.";
                        this._SetState (44, false);
                    }
            },
            { // State 44
                source:         "console.log (msg);",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log (this.msg);
                        this._SetState (45, false);
                    }
            },
            { // State 45
                source:         "",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (46, false);
                    }
            },
            { // State 46
                source:         "t = 7;",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.t = 7;
                        this._SetState (47, false);
                    }
            },
            { // State 47
                source:         "x = v * t;",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.x = this.v * this.t;
                        this._SetState (48, false);
                    }
            },
            { // State 48
                source:         "msg = \"After \" + t + \" seconds, the vehicle will have travelled \" + x + \" meters.\";",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.msg = "After " +this. t + " seconds, the vehicle will have travelled " + this.x + " meters.";
                        this._SetState (49, false);
                    }
            },
            { // State 49
                source:         "console.log (msg);",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log (this.msg);
                        this._SetState (50, false);
                    }
            },
            { // State 50
                source:         "",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (51, false);
                    }
            },
            { // State 51
                source:         "t = 8;",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.t = 8;
                        this._SetState (52, false);
                    }
            },
            { // State 52
                source:         "x = v * t;",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.x = this.v * this.t;
                        this._SetState (53, false);
                    }
            },
            { // State 53
                source:         "msg = \"After \" + t + \" seconds, the vehicle will have travelled \" + x + \" meters.\";",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.msg = "After " +this. t + " seconds, the vehicle will have travelled " + this.x + " meters.";
                        this._SetState (54, false);
                    }
            },
            { // State 54
                source:         "console.log (msg);",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log (this.msg);
                        this._SetState (55, false);
                    }
            },
            { // State 55
                source:         "",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (56, false);
                    }
            },
            { // State 56
                source:         "t = 9;",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.t = 9;
                        this._SetState (57, false);
                    }
            },
            { // State 57
                source:         "x = v * t;",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.x = this.v * this.t;
                        this._SetState (58, false);
                    }
            },
            { // State 58
                source:         "msg = \"After \" + t + \" seconds, the vehicle will have travelled \" + x + \" meters.\";",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.msg = "After " +this. t + " seconds, the vehicle will have travelled " + this.x + " meters.";
                        this._SetState (59, false);
                    }
            },
            { // State 59
                source:         "console.log (msg);",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log (this.msg);
                        this._SetState (60, false);
                    }
            },
            { // State 60
                source:         "",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (61, false);
                    }
            },
            { // State 61
                source:         "t = 10;",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.t = 10;
                        this._SetState (62, false);
                    }
            },
            { // State 62
                source:         "x = v * t;",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.x = this.v * this.t;
                        this._SetState (63, false);
                    }
            },
            { // State 63
                source:         "msg = \"After \" + t + \" seconds, the vehicle will have travelled \" + x + \" meters.\";",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.msg = "After " +this. t + " seconds, the vehicle will have travelled " + this.x + " meters.";
                        this._SetState (64, false);
                    }
            },
            { // State 64
                source:         "console.log (msg);",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log (this.msg);
                        this._SetState (65, true);
                    }
            },
            { // State 65
                source:         "/* End */",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    

    window.it001.gProgramRepository ["it001_Ex_07_020"] =
    {
        globals:
        {
            symbols: ["msg", "t", "v", "x"]
        },
        transitionTable:
        [
            { // State 0
                source:         "/*",
                symbols:        [],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (6, false);
                    }
            },
            { // State 1
                source:         " * For each second in 0, 1, 2, ..., 10 we compute ",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (2, false);
                    }
            },
            { // State 2
                source:         " * the distance a vehicle will have travelled at ",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (3, false);
                    }
            },
            { // State 3
                source:         " * a constant speed of 30 m/s.",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (4, false);
                    }
            },
            { // State 4
                source:         " */",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (5, false);
                    }
            },
            { // State 5
                source:         "",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (6, false);
                    }
            },
            { // State 6
                source:         "var v = 30;",
                symbols:        [],
                comment:        "",
                transition:
                    function ()
                    {
                        this.v = 30;
                        this._SetState (7, false);
                    }
            },
            { // State 7
                source:         "var t;",
                symbols:        ["v"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (8, false);
                    }
            },
            { // State 8
                source:         "var x;",
                symbols:        ["t", "v"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (9, false);
                    }
            },
            { // State 9
                source:         "var msg;",
                symbols:        ["t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (10, false);
                    }
            },
            { // State 10
                source:         "",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (11, false);
                    }
            },
            { // State 11
                source:         "for (t = 0; t <= 10; t++)",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.t = 0;
                        this._SetState (12, false);
                    }
            },
            { // State 12
                source:         "{",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        if (this.t <= 10)
                        {
                            this._SetState (13, false);
                        }
                        else
                        {
                            this._SetState (17, true);
                        }
                    }
            },
            { // State 13
                source:         "    x   = v * t;",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.x   = this.v * this.t;
                        this._SetState (14, false);
                    }
            },
            { // State 14
                source:         "    msg = \"After \" + t + \" seconds, the vehicle will have travelled \" + x + \" meters.\";",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.msg = "After " + this.t + " seconds, the vehicle will have travelled " + this.x + " meters.";
                        this._SetState (15, false);
                    }
            },
            { // State 15
                source:         "    console.log (msg);",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log (this.msg);
                        this._SetState (16, false);
                    }
            },
            { // State 16
                source:         "}",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.t++;
                        this._SetState (12, false);
                    }
            },
            { // State 17
                source:         "/* End */",
                symbols:        ["msg", "t", "v", "x"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    

    window.it001.gProgramRepository ["it001_Ex_07_030"] =
    {
        globals:
        {
            symbols: ["a", "b", "c", "x"]
        },
        transitionTable:
        [
            { // State 0
                source:         "x = 5;",
                symbols:        ["a", "b", "c", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.x = 5;
                        this._SetState (2, false);
                    }
            },
            { // State 1
                source:         "",
                symbols:        ["a", "b", "c", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (2, false);
                    }
            },
            { // State 2
                source:         "a = (x >= 10);",
                symbols:        ["a", "b", "c", "x"],
                comment:        "<tt>true</tt> if a is at least 10",
                transition:
                    function ()
                    {
                        this.a = (this.x >= 10);
                        this._SetState (3, false);
                    }
            },
            { // State 3
                source:         "b = (x >= 5)  &&  (x <= 10);",
                symbols:        ["a", "b", "c", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.b = (this.x >= 5)  &&  (this.x <= 10);
                        this._SetState (4, false);
                    }
            },
            { // State 4
                source:         "c = (x % 2  ==  0);",
                symbols:        ["a", "b", "c", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.c = (this.x % 2  ==  0);
                        this._SetState (5, true);
                    }
            },
            { // State 5
                source:         "/* End */",
                symbols:        ["a", "b", "c", "x"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };


    window.it001.gProgramRepository ["it001_Ex_07_040"] =
    {
        globals:
        {
            symbols: ["a", "b"]
        },
        transitionTable:
        [
            { // State 0
                source:         "a = 1;",
                symbols:        ["a", "b"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.a = 1;
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "b = 0;",
                symbols:        ["a", "b"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.b = 0;
                        this._SetState (2, false);
                    }
            },
            { // State 2
                source:         "if (a == 0)",
                symbols:        ["a", "b"],
                comment:        "",
                transition:
                    function ()
                    {
                        if (this.a == 0)
                        {
                            this._SetState (3, false);
                        }
                        else
                        {
                            this._SetState (4, false);
                        }
                    }
            },
            { // State 3
                source:         "    b = 5;",
                symbols:        ["a", "b"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.b = 5;
                        this._SetState (4, false);
                    }
            },
            { // State 4
                source:         "    console.log (\"b has changed to \" + b);",
                symbols:        ["a", "b"],
                comment:        "This will <b>always</b> execute.",
                transition:
                    function ()
                    {
                        console.log ("b has changed to " + this.b); // This will ALWAYS execute (why?)
                        this._SetState (5, true);
                    }
            },
            { // State 5
                source:         "/* End */",
                symbols:        ["a", "b"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    

    window.it001.gProgramRepository ["it001_Ex_07_050"] =
    {
        globals:
        {
            symbols: ["a", "b"]
        },
        transitionTable:
        [
            { // State 0
                source:         "a = 0;",
                symbols:        ["a", "b"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.a = 0;
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "b = 0;",
                symbols:        ["a", "b"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.b = 0;
                        this._SetState (2, false);
                    }
            },
            { // State 2
                source:         "if (a == 0)",
                symbols:        ["a", "b"],
                comment:        "",
                transition:
                    function ()
                    {
                        if (this.a == 0)
                        {
                            this._SetState (4, false);
                        }
                        else
                        {
                            this._SetState (6, true);
                        }
                    }
            },
            { // State 3
                source:         "{",
                symbols:        ["a", "b"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 4
                source:         "    b = 5;",
                symbols:        ["a", "b"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.b = 5;
                        this._SetState (6, false);
                    }
            },
            { // State 5
                source:         "}",
                symbols:        ["a", "b"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 6
                source:         "/* End */",
                symbols:        ["a", "b"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    

    window.it001.gProgramRepository ["it001_Ex_07_060"] =
    {
        globals:
        {
            symbols: ["a"]
        },
        transitionTable:
        [
            { // State 0
                source:         "a = 5;",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.a = 5;
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "if (a == 0);",
                symbols:        ["a"],
                comment:        "An innocent semicolon at the end of this line...",
                transition:
                    function ()
                    {
                        this._SetState (3, false);
                    }
            },
            { // State 2
                source:         "{",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 3
                source:         "    window.alert (\"Yayy, a is zero!\");",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        window.alert ("Yayy, a is zero!");
                        this._SetState (5, true);
                    }
            },
            { // State 4
                source:         "}",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 5
                source:         "/* End */",
                symbols:        ["a"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    

    window.it001.gProgramRepository ["it001_Ex_07_070"] =
    {
        globals:
        {
            symbols: ["a", "b", "c", "d"]
        },
        transitionTable:
        [
            { // State 0
                source:         "if (a == 0)",
                symbols:        ["a", "b", "c", "d"],
                comment:        "Assume a is zero...",
                transition:
                    function ()
                    {
                        this.a = 0;
                        if (this.a == 0)
                        {
                            this._SetState (2, false);
                        }
                        else
                        {
                            this._SetState (7, true);
                        }
                    }
            },
            { // State 1
                source:         "{",
                symbols:        ["a", "b", "c", "d"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 2
                source:         "    b = \"here is \";",
                symbols:        ["a", "b", "c", "d"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.b = "here is ";
                        this._SetState (3, false);
                    }
            },
            { // State 3
                source:         "    c = \"a block \";",
                symbols:        ["a", "b", "c", "d"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.c = "a block ";
                        this._SetState (4, false);
                    }
            },
            { // State 4
                source:         "    d = \"of statements.\";",
                symbols:        ["a", "b", "c", "d"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.d = "of statements.";
                        this._SetState (5, false);
                    }
            },
            { // State 5
                source:         "    console.log (\"a is 0, so \" + b + c + d);",
                symbols:        ["a", "b", "c", "d"],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log ("a is 0, so " + this.b + this.c + this.d);
                        this._SetState (7, true);
                    }
            },
            { // State 6
                source:         "}",
                symbols:        ["a", "b", "c", "d"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 7
                source:         "/* End */",
                symbols:        ["a", "b", "c", "d"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    

    window.it001.gProgramRepository ["it001_Ex_07_080"] =
    {
        globals:
        {
            symbols: ["a", "b", "c", "d"]
        },
        transitionTable:
        [
            { // State 0
                source:         "if (a == 0)",
                symbols:        ["a", "b", "c", "d"],
                comment:        "Assume that a is 1.",
                transition:
                    function ()
                    {
                        this.a = 1;
                        if (this.a == 0)
                        {
                            this._SetState (2, false);
                        }
                        else
                        {
                            this._SetState (9, false);
                        }
                    }
            },
            { // State 1
                source:         "{",
                symbols:        ["a", "b", "c", "d"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 2
                source:         "    b = \"here is \";",
                symbols:        ["a", "b", "c", "d"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.b = "here is ";
                        this._SetState (3, false);
                    }
            },
            { // State 3
                source:         "    c = \"a block \";",
                symbols:        ["a", "b", "c", "d"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.c = "a block ";
                        this._SetState (4, false);
                    }
            },
            { // State 4
                source:         "    d = \"of statements.\";",
                symbols:        ["a", "b", "c", "d"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.d = "of statements.";
                        this._SetState (5, false);
                    }
            },
            { // State 5
                source:         "    console.log (\"a is 0, so \" + b + c + d);",
                symbols:        ["a", "b", "c", "d"],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log ("a is 0, so " + this.b + this.c + this.d);
                        this._SetState (14, true);
                    }
            },
            { // State 6
                source:         "}",
                symbols:        ["a", "b", "c", "d"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 7
                source:         "else",
                symbols:        ["a", "b", "c", "d"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 8
                source:         "{",
                symbols:        ["a", "b", "c", "d"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 9
                source:         "    b = \"here is \";",
                symbols:        ["a", "b", "c", "d"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.b = "here is ";
                        this._SetState (10, false);
                    }
            },
            { // State 10
                source:         "    c = \"another block \";",
                symbols:        ["a", "b", "c", "d"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.c = "another block ";
                        this._SetState (11, false);
                    }
            },
            { // State 11
                source:         "    d = \"of statements.\";",
                symbols:        ["a", "b", "c", "d"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.d = "of statements.";
                        this._SetState (12, false);
                    }
            },
            { // State 12
                source:         "    console.log (\"a is NOT 0, so \" + b + c + d);",
                symbols:        ["a", "b", "c", "d"],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log ("a is NOT 0, so " + this.b + this.c + this.d);
                        this._SetState (14, true);
                    }
            },
            { // State 13
                source:         "}",
                symbols:        ["a", "b", "c", "d"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 14
                source:         "/* End */",
                symbols:        ["a", "b", "c", "d"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    

    window.it001.gProgramRepository ["it001_Ex_07_090"] =
    {
        globals:
        {
            symbols: ["a"]
        },
        transitionTable:
        [
            { // State 0
                source:         "a = 1;",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.a = 1;
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "if (a == -1)",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        if (this.a == -1)
                        {
                            this._SetState (3, false);
                        }
                        else
                        {
                            this._SetState (5, false);
                        }
                    }
            },
            { // State 2
                source:         "{",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 3
                source:         "    // this will not execute",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (17, true);
                    }
            },
            { // State 4
                source:         "}",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 5
                source:         "else if (a == 0)",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        if (this.a == 0)
                        {
                            this._SetState (7, false);
                        }
                        else
                        {
                            this._SetState (9, false);
                        }
                    }
            },
            { // State 6
                source:         "{",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 7
                source:         "    // this won't execute either",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (17, true);
                    }
            },
            { // State 8
                source:         "}",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 9
                source:         "else if (a >= 1)",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        if (this.a >= 1)
                        {
                            this._SetState (11, false);
                        }
                        else
                        {
                            this._SetState (13, false);
                        }
                    }
            },
            { // State 10
                source:         "{",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 11
                source:         "    // bingo!",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (17, true);
                    }
            },
            { // State 12
                source:         "}",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 13
                source:         "else",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (15, false);
                    }
            },
            { // State 14
                source:         "{",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 15
                source:         "    // the fallback case whan nothing matches",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (17, true);
                    }
            },
            { // State 16
                source:         "}",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 17
                source:         "/* End */",
                symbols:        ["a"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    

    window.it001.gProgramRepository ["it001_Ex_07_100"] =
    {
        globals:
        {
            symbols: ["a"]
        },
        transitionTable:
        [
            { // State 0
                source:         "a = 1;",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.a = 1;
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "switch (a)",
                symbols:        ["a"],
                comment:        "Match against three test cases: 0, 1, and, 5 (lines 4, 7, 10)",
                transition:
                    function ()
                    {
                        this._SetState (3, false);
                    }
            },
            { // State 2
                source:         "{",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 3
                source:         "    case 0:",
                symbols:        ["a"],
                comment:        "Does not match. Next <tt>case</tt> statement.",
                transition:
                    function ()
                    {
                        if (this.a == 0)
                        {
                            this._SetState (4, false);
                        }
                        else
                        {
                            this._SetState (6, false);
                        }
                    }
            },
            { // State 4
                source:         "        console.log (\"Zero\");",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log ("Zero");
                        this._SetState (5, false);
                    }
            },
            { // State 5
                source:         "        break;",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (13, true);
                    }
            },
            { // State 6
                source:         "    case 1:",
                symbols:        ["a"],
                comment:        "Does match. Execute next statement.",
                transition:
                    function ()
                    {
                        if (this.a == 1)
                        {
                            this._SetState (7, false);
                        }
                        else
                        {
                            this._SetState (9, false);
                        }
                    }
            },
            { // State 7
                source:         "        console.log (\"One\");",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log ("One");
                        this._SetState (8, false);
                    }
            },
            { // State 8
                source:         "        break;",
                symbols:        ["a"],
                comment:        "<tt>break</tt> statement leaves the <tt>switch</tt> construct.",
                transition:
                    function ()
                    {
                        this._SetState (13, true);
                    }
            },
            { // State 9
                source:         "    case 5:",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        if (this.a == 5)
                        {
                            this._SetState (10, false);
                        }
                        else
                        {
                            this._SetState (13, true);
                        }
                    }
            },
            { // State 10
                source:         "        console.log (\"Five\");",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log ("Five");
                        this._SetState (11, false);
                    }
            },
            { // State 11
                source:         "        break;",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (13, true);
                    }
            },
            { // State 12
                source:         "}",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 13
                source:         "/* End */",
                symbols:        ["a"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    

    window.it001.gProgramRepository ["it001_Ex_07_110"] =
    {
        globals:
        {
            symbols: ["a"]
        },
        transitionTable:
        [
            { // State 0
                source:         "a = 1;",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.a = 1;
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "if (a === 0)",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        if (this.a === 0)
                        {
                            this._SetState (3, false);
                        }
                        else
                        {
                            this._SetState (5, false);
                        }
                    }
            },
            { // State 2
                source:         "{",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 3
                source:         "    console.log (\"Zero\");",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log ("Zero");
                        this._SetState (13, true);
                    }
            },
            { // State 4
                source:         "}",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 5
                source:         "else if (a === 1)",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        if (this.a === 1)
                        {
                            this._SetState (7, false);
                        }
                        else
                        {
                            this._SetState (9, false);
                        }
                    }
            },
            { // State 6
                source:         "{",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 7
                source:         "    console.log (\"One\");",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log ("One");
                        this._SetState (13, true);
                    }
            },
            { // State 8
                source:         "}",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 9
                source:         "else if (a === 5)",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        if (this.a === 5)
                        {
                            this._SetState (11, false);
                        }
                        else
                        {
                            this._SetState (13, true);
                        }
                    }
            },
            { // State 10
                source:         "{",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 11
                source:         "    console.log (\"Five\");",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log ("Five");
                        this._SetState (13, true);
                    }
            },
            { // State 12
                source:         "}",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 13
                source:         "/* End */",
                symbols:        ["a"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    

    window.it001.gProgramRepository ["it001_Ex_07_120"] =
    {
        globals:
        {
            symbols: ["a"]
        },
        transitionTable:
        [
            { // State 0
                source:         "a = 1;",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.a = 1;
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "switch (a)",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (3, false);
                    }
            },
            { // State 2
                source:         "{",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 3
                source:         "    case 0:",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        if (this.a == 0)
                        {
                            this._SetState (4, false);
                        }
                        else
                        {
                            this._SetState (6, false);
                        }
                    }
            },
            { // State 4
                source:         "        console.log (\"zero\");",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log ("zero");
                        this._SetState (5, false);
                    }
            },
            { // State 5
                source:         "        break;",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (10, true);
                    }
            },
            { // State 6
                source:         "    case 1:",
                symbols:        ["a"],
                comment:        "This one matches, but will fall through the next <tt>case</tt> statement.",
                transition:
                    function ()
                    {
                        if (this.a == 1)
                        {
                            this._SetState (8, false);
                        }
                        else
                        {
                            this._SetState (7, false);
                        }
                    }
            },
            { // State 7
                source:         "    case 2:",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        if (this.a == 0)
                        {
                            this._SetState (8, false);
                        }
                        else
                        {
                            this._SetState (10, true);
                        }
                    }
            },
            { // State 8
                source:         "        console.log (\"one or two\");",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log ("one or two");
                        this._SetState (10, true);
                    }
            },
            { // State 9
                source:         "}",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 10
                source:         "/* End */",
                symbols:        ["a"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    

    window.it001.gProgramRepository ["it001_Ex_07_130"] =
    {
        globals:
        {
            symbols: ["a"]
        },
        transitionTable:
        [
            { // State 0
                source:         "a = 1;",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.a = 1;
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "if (a === 0)",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        if (this.a === 0)
                        {
                            this._SetState (3, false);
                        }
                        else
                        {
                            this._SetState (5, false);
                        }
                    }
            },
            { // State 2
                source:         "{",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 3
                source:         "    console.log (\"zero\");",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log ("zero");
                        this._SetState (9, true);
                    }
            },
            { // State 4
                source:         "}",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 5
                source:         "else if ((a === 1)  ||  (a === 2))",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        if ((this.a === 1)  ||  (this.a === 2))
                        {
                            this._SetState (7, false);
                        }
                        else
                        {
                            this._SetState (9, true);
                        }
                    }
            },
            { // State 6
                source:         "{",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 7
                source:         "    console.log (\"one or two\");",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log ("one or two");
                        this._SetState (9, true);
                    }
            },
            { // State 8
                source:         "}",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 9
                source:         "/* End */",
                symbols:        ["a"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    

    window.it001.gProgramRepository ["it001_Ex_07_140"] =
    {
        globals:
        {
            symbols: ["a"]
        },
        transitionTable:
        [
            { // State 0
                source:         "a = 1;",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.a = 1;
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "switch (a)",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (3, false);
                    }
            },
            { // State 2
                source:         "{",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 3
                source:         "    case 0:",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        if (this.a == 0)
                        {
                            this._SetState (4, false);
                        }
                        else
                        {
                            this._SetState (5, false);
                        }
                    }
            },
            { // State 4
                source:         "        console.log (\"zero\");",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log ("zero");
                        this._SetState (5, false);
                    }
            },
            { // State 5
                source:         "    case 1:",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        if ((this.a == 0)  ||  (this.a == 1))
                        {
                            this._SetState (6, false);
                        }
                        else
                        {
                            this._SetState (7, false);
                        }
                    }
            },
            { // State 6
                source:         "        console.log (\"one\");",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log ("one");
                        this._SetState (7, false);
                    }
            },
            { // State 7
                source:         "    case 2:",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        if ((this.a == 0)  ||  (this.a == 1)  ||  (this.a == 2))
                        {
                            this._SetState (8, false);
                        }
                        else
                        {
                            this._SetState (9, false);
                        }
                    }
            },
            { // State 8
                source:         "        console.log (\"two\");",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log ("two");
                        this._SetState (9, false);
                    }
            },
            { // State 9
                source:         "    case 3:",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        if ((this.a == 0)  ||  (this.a == 1)  ||  (this.a == 2)  ||  (this.a == 3))
                        {
                            this._SetState (10, false);
                        }
                        else
                        {
                            this._SetState (12, true);
                        }
                    }
            },
            { // State 10
                source:         "        console.log (\"three\");",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log ("three");
                        this._SetState (12, true);
                    }
            },
            { // State 11
                source:         "}",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 12
                source:         "/* End */",
                symbols:        ["a"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    

    window.it001.gProgramRepository ["it001_Ex_07_150"] =
    {
        globals:
        {
            symbols: ["a"]
        },
        transitionTable:
        [
            { // State 0
                source:         "a = 10;",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.a = 10;
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "switch (a)",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (3, false);
                    }
            },
            { // State 2
                source:         "{",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 3
                source:         "    case 0:",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        if (this.a == 0)
                        {
                            this._SetState (4, false);
                        }
                        else
                        {
                            this._SetState (6, false);
                        }
                    }
            },
            { // State 4
                source:         "        console.log (\"zero\");",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log ("zero");
                        this._SetState (5, false);
                    }
            },
            { // State 5
                source:         "        break;",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (18, true);
                    }
            },
            { // State 6
                source:         "    case 1:",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        if (this.a == 1)
                        {
                            this._SetState (7, false);
                        }
                        else
                        {
                            this._SetState (9, false);
                        }
                    }
            },
            { // State 7
                source:         "        console.log (\"one\");",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log ("one");
                        this._SetState (8, false);
                    }
            },
            { // State 8
                source:         "        break;",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (18, true);
                    }
            },
            { // State 9
                source:         "    case 2:",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        if (this.a == 2)
                        {
                            this._SetState (10, false);
                        }
                        else
                        {
                            this._SetState (12, false);
                        }
                    }
            },
            { // State 10
                source:         "        console.log (\"two\");",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log ("two");
                        this._SetState (11, false);
                    }
            },
            { // State 11
                source:         "        break;",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (18, true);
                    }
            },
            { // State 12
                source:         "    case 3:",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        if (this.a == 3)
                        {
                            this._SetState (13, false);
                        }
                        else
                        {
                            this._SetState (15, false);
                        }
                    }
            },
            { // State 13
                source:         "        console.log (\"three\");",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log ("three");
                        this._SetState (14, false);
                    }
            },
            { // State 14
                source:         "        break;",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (18, true);
                    }
            },
            { // State 15
                source:         "    default:",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (16, false);
                    }
            },
            { // State 16
                source:         "        console.log (\"unknown number\");",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log ("unknown number");
                        this._SetState (18, true);
                    }
            },
            { // State 17
                source:         "}",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 18
                source:         "/* End */",
                symbols:        ["a"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    

    window.it001.gProgramRepository ["it001_Ex_07_160"] =
    {
        globals:
        {
            symbols: ["x", "y"]
        },
        transitionTable:
        [
            { // State 0
                source:         "/* Prints the squares of all values in [1, 3] to the console. */",
                symbols:        ["x", "y"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "for (x = 1; x <= 3; x++)",
                symbols:        ["x", "y"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.x = 1;
                        this._SetState (2, false);
                    }
            },
            { // State 2
                source:         "{",
                symbols:        ["x", "y"],
                comment:        "",
                transition:
                    function ()
                    {
                        if (this.x <= 3)
                        {
                            this._SetState (3, false);
                        }
                        else
                        {
                            this._SetState (6, true);
                        }
                    }
            },
            { // State 3
                source:         "    y = x * x;",
                symbols:        ["x", "y"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.y = this.x * this.x;
                        this._SetState (4, false);
                    }
            },
            { // State 4
                source:         "    console.log (\"x = \" + x + \", y = \" + y);",
                symbols:        ["x", "y"],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log ("x = " + this.x + ", y = " + this.y);
                        this.x++;
                        this._SetState (2, false);
                    }
            },
            { // State 5
                source:         "}    ",
                symbols:        ["x", "y"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 6
                source:         "/* End */",
                symbols:        ["x", "y"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    

    window.it001.gProgramRepository ["it001_Ex_07_170"] =
    {
        globals:
        {
            symbols: ["avg", "i", "length", "n", "sum", "x"]
        },
        transitionTable:
        [
            { // State 0
                source:         "var x = [15, 20, 13, 25, 7, 9, 18];",
                symbols:        ["avg", "i", "length", "n", "sum", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.x = [15, 20, 13, 25, 7, 9, 18];
                        this._SetState (6, false);
                    }
            },
            { // State 1
                source:         "var i;",
                symbols:        ["avg", "i", "length", "n", "sum", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 2
                source:         "var n;",
                symbols:        ["avg", "i", "length", "n", "sum", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 3
                source:         "var sum;",
                symbols:        ["avg", "i", "length", "n", "sum", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 4
                source:         "var avg;",
                symbols:        ["avg", "i", "length", "n", "sum", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 5
                source:         "",
                symbols:        ["avg", "i", "length", "n", "sum", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 6
                source:         "n   = x.length;",
                symbols:        ["avg", "i", "length", "n", "sum", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.n = this.x.length;
                        this._SetState (7, false);
                    }
            },
            { // State 7
                source:         "sum = 0;",
                symbols:        ["avg", "i", "length", "n", "sum", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.sum = 0;
                        this._SetState (8, false);
                    }
            },
            { // State 8
                source:         "for (i = 0; i < n; i++)",
                symbols:        ["avg", "i", "length", "n", "sum", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.i = 0;
                        this._SetState (9, false);
                    }
            },
            { // State 9
                source:         "{",
                symbols:        ["avg", "i", "length", "n", "sum", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        if (this.i < this.n)
                        {
                            this._SetState (10, false);
                        }
                        else
                        {
                            this._SetState (12, false);
                        }
                    }
            },
            { // State 10
                source:         "    sum += x [i];",
                symbols:        ["avg", "i", "length", "n", "sum", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.sum += this.x [this.i];
                        this._SetState (11, false);
                    }
            },
            { // State 11
                source:         "}",
                symbols:        ["avg", "i", "length", "n", "sum", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.i++;
                        this._SetState (9, false);
                    }
            },
            { // State 12
                source:         "avg = sum / n;",
                symbols:        ["avg", "i", "length", "n", "sum", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.avg = this.sum / this.n;
                        this._SetState (14, false);
                    }
            },
            { // State 13
                source:         "",
                symbols:        ["avg", "i", "length", "n", "sum", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 14
                source:         "console.log (\"Average value: \" + avg);",
                symbols:        ["avg", "i", "length", "n", "sum", "x"],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log ("Average value: " + this.avg);
                        this._SetState (15, true);
                    }
            },
            { // State 15
                source:         "/* End */",
                symbols:        ["avg", "i", "length", "n", "sum", "x"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    

    window.it001.gProgramRepository ["it001_Ex_07_180"] =
    {
        globals:
        {
            symbols: ["x", "y"]
        },
        transitionTable:
        [
            { // State 0
                source:         "/* Prints the squares of all values in [1, 3] to the console. */",
                symbols:        ["x", "y"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "var x = 1;",
                symbols:        ["x", "y"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.x = 1;
                        this._SetState (2, false);
                    }
            },
            { // State 2
                source:         "while (x <= 3)",
                symbols:        ["x", "y"],
                comment:        "",
                transition:
                    function ()
                    {
                        if (this.x <= 3)
                        {
                            this._SetState (4, false);
                        }
                        else
                        {
                            this._SetState (9, true);
                        }
                    }
            },
            { // State 3
                source:         "{",
                symbols:        ["x", "y"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 4
                source:         "    y = x * x;",
                symbols:        ["x", "y"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.y = this.x * this.x;
                        this._SetState (5, false);
                    }
            },
            { // State 5
                source:         "    console.log (\"x = \" + x + \", y = \" + y);",
                symbols:        ["x", "y"],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log ("x = " + this.x + ", y = " + this.y);
                        this._SetState (7, false);
                    }
            },
            { // State 6
                source:         "",
                symbols:        ["x", "y"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 7
                source:         "    x++;",
                symbols:        ["x", "y"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.x++;
                        this._SetState (2, false);
                    }
            },
            { // State 8
                source:         "}",
                symbols:        ["x", "y"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 9
                source:         "/* End */",
                symbols:        ["x", "y"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    

    window.it001.gProgramRepository ["it001_Ex_07_190"] =
    {
        globals:
        {
            symbols: ["bit", "num", "out"]
        },
        transitionTable:
        [
            { // State 0
                source:         "var num = 6;",
                symbols:        ["bit", "num", "out"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.num = 6;
                        this._SetState (3, false);
                    }
            },
            { // State 1
                source:         "var out;",
                symbols:        ["bit", "num", "out"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 2
                source:         "",
                symbols:        ["bit", "num", "out"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 3
                source:         "out = \"\";",
                symbols:        ["bit", "num", "out"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.out = "";
                        this._SetState (4, false);
                    }
            },
            { // State 4
                source:         "while (num >= 1)",
                symbols:        ["bit", "num", "out"],
                comment:        "",
                transition:
                    function ()
                    {
                        if (this.num >= 1)
                        {
                            this._SetState (6, false);
                        }
                        else
                        {
                            this._SetState (10, false);
                        }
                    }
            },
            { // State 5
                source:         "{",
                symbols:        ["bit", "num", "out"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 6
                source:         "    bit  = num & 1;",
                symbols:        ["bit", "num", "out"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.bit  = this.num & 1;
                        this._SetState (7, false);
                    }
            },
            { // State 7
                source:         "    num = num >>> 1;",
                symbols:        ["bit", "num", "out"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.num = this.num >>> 1;
                        this._SetState (8, false);
                    }
            },
            { // State 8
                source:         "    out  = \"\" + bit + out;",
                symbols:        ["bit", "num", "out"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.out  = "" + this.bit + this.out;
                        this._SetState (4, false);
                    }
            },
            { // State 9
                source:         "}",
                symbols:        ["bit", "num", "out"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 10
                source:         "console.log (out);",
                symbols:        ["bit", "num", "out"],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log (this.out);
                        this._SetState (11, true);
                    }
            },
            { // State 11
                source:         "/* End */",
                symbols:        ["bit", "num", "out"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    

    window.it001.gProgramRepository ["it001_Ex_07_200"] =
    {
        globals:
        {
            symbols: ["x", "y"]
        },
        transitionTable:
        [
            { // State 0
                source:         "/* Prints the squares of all values in [1, 3] to the console. */",
                symbols:        ["x", "y"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "var x = 1;",
                symbols:        ["x", "y"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.x = 1; 
                        this._SetState (2, false);
                    }
            },
            { // State 2
                source:         "do",
                symbols:        ["x", "y"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (4, false);
                    }
            },
            { // State 3
                source:         "{",
                symbols:        ["x", "y"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 4
                source:         "    y = x * x;",
                symbols:        ["x", "y"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.y = this.x * this.x;
                        this._SetState (5, false);
                    }
            },
            { // State 5
                source:         "    console.log (\"x = \" + x + \", y = \" + y);",
                symbols:        ["x", "y"],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log ("x = " + this.x + ", y = " + this.y);
                        this._SetState (7, false);
                    }
            },
            { // State 6
                source:         "",
                symbols:        ["x", "y"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 7
                source:         "    x++;",
                symbols:        ["x", "y"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.x++;
                        this._SetState (9, false);
                    }
            },
            { // State 8
                source:         "}",
                symbols:        ["x", "y"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 9
                source:         "while (x <= 3);",
                symbols:        ["x", "y"],
                comment:        "",
                transition:
                    function ()
                    {
                        if (this.x <= 3)
                        {
                            this._SetState (4, false);
                        }
                        else
                        {
                            this._SetState (10, true);
                        }
                    }
            },
            { // State 10
                source:         "/* End */",
                symbols:        ["x", "y"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    

    window.it001.gProgramRepository ["it001_Ex_07_210"] =
    {
        globals:
        {
            symbols: ["count", "rnd", "seed"]
        },
        transitionTable:
        [
            { // State 0
                source:         "var seed = 5323;",
                symbols:        ["count", "rnd", "seed"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.seed = 5323;
                        this._SetState (4, false);
                    }
            },
            { // State 1
                source:         "var rnd;",
                symbols:        ["count", "rnd", "seed"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 2
                source:         "var count;",
                symbols:        ["count", "rnd", "seed"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 3
                source:         "",
                symbols:        ["count", "rnd", "seed"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 4
                source:         "count = 0;",
                symbols:        ["count", "rnd", "seed"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.count = 0;
                        this._SetState (5, false);
                    }
            },
            { // State 5
                source:         "do",
                symbols:        ["count", "rnd", "seed"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (7, false);
                    }
            },
            { // State 6
                source:         "{",
                symbols:        ["count", "rnd", "seed"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 7
                source:         "    seed = 8253729 * seed + 2396403;",
                symbols:        ["count", "rnd", "seed"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.seed = 8253729 * this.seed + 2396403;
                        this._SetState (8, false);
                    }
            },
            { // State 8
                source:         "    rnd  = seed % 32767;",
                symbols:        ["count", "rnd", "seed"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.rnd  = this.seed % 32767;
                        this._SetState (9, false);
                    }
            },
            { // State 9
                source:         "    count++;",
                symbols:        ["count", "rnd", "seed"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.count++;
                        this._SetState (11, false);
                    }
            },
            { // State 10
                source:         "}",
                symbols:        ["count", "rnd", "seed"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 11
                source:         "while (rnd >= 1000);",
                symbols:        ["count", "rnd", "seed"],
                comment:        "",
                transition:
                    function ()
                    {
                        if (this.rnd >= 1000)
                        {
                            this._SetState (7, false);
                        }
                        else
                        {
                            this._SetState (12, false);
                        }
                    }
            },
            { // State 12
                source:         "console.log (\"Number of iterations until rnd <= 1000: \" + count);",
                symbols:        ["count", "rnd", "seed"],
                comment:        "",
                transition:
                    function ()
                    {
                        console.log ("Number of iterations until rnd <= 1000: " + this.count);
                        this._SetState (13, true);
                    }
            },
            { // State 13
                source:         "/* End */",
                symbols:        ["count", "rnd", "seed"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    

    window.it001.gProgramRepository ["it001_Ex_07_220"] =
    {
        globals:
        {
            symbols: ["a"]
        },
        transitionTable:
        [
            { // State 0
                source:         "var a = 10;",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.a = 10;
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "while (a >= 1)",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        if (this.a >= 1)
                        {
                            this._SetState (3, false);
                        }
                        else
                        {
                            this._SetState (9, true);
                        }
                    }
            },
            { // State 2
                source:         "{",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 3
                source:         "    a--;",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.a--;
                        this._SetState (4, false);
                    }
            },
            { // State 4
                source:         "    if (a <= 8)",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        if (this.a <= 8)
                        {
                            this._SetState (6, false);
                        }
                        else
                        {
                            this._SetState (3, false);
                        }
                    }
            },
            { // State 5
                source:         "    {",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 6
                source:         "        break;",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        this._SetState (9, true);
                    }
            },
            { // State 7
                source:         "    }",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 8
                source:         "}",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 9
                source:         "/* End */",
                symbols:        ["a"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
});
