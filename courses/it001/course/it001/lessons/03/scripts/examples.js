/**
 *  @fileoverview        Program examples, chapter
 */
define (["course/it001/res/scripts/decl"], function ()
{
    console.log ("Adding examples: Lesson 03");

    window.it001.gProgramRepository ["it001_Ex_03_010"] =
    {
        globals:
        {
            symbols: ["Math", "alert", "n", "r", "sqrt", "window"]
        },
        transitionTable:
        [
            { // State 0
                source:         "var n;",
                symbols:        [],
                comment:        "Variable declaration.",
                transition:
                    function ()
                    {
                        this.n = (function() {return;})();
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "var r = 20;",
                symbols:        ["n"],
                comment:        "Variable declaration and definition.",
                transition:
                    function ()
                    {
                        this.r = 20;
                        this._SetState (2, false);
                    }
            },
            { // State 2
                source:         "n = 100;",
                symbols:        ["n", "r"],
                comment:        "Simple assignment. Note: Variable n is already declared in line 1.",
                transition:
                    function ()
                    {
                        this.n = 100;
                        this._SetState (3, false);
                    }
            },
            { // State 3
                source:         "n = 2 * r;",
                symbols:        ["n", "r"],
                comment:        "Assignment with multiplication term.",
                transition:
                    function ()
                    {
                        this.n = 2 * this.r;
                        this._SetState (4, false);
                    }
            },
            { // State 4
                source:         "r = Math.sqrt (16);",
                symbols:        ["n", "r"],
                comment:        "Assignment with function call.",
                transition:
                    function ()
                    {
                        this.r = Math.sqrt (16);
                        this._SetState (5, false);
                    }
            },
            { // State 5
                source:         "if (r == 4) r = 0;",
                symbols:        ["n", "r"],
                comment:        "Control flow statement.",
                transition:
                    function ()
                    {
                        if (this.r == 4) this.r = 0;
                        this._SetState (6, false);
                    }
            },
            { // State 6
                source:         "window.alert (\"Hello World\");",
                symbols:        ["n", "r"],
                comment:        "Show message box.",
                transition:
                    function ()
                    {
                        window.alert ("Hello World");
                        this._SetState (7, true);
                    }
            },
            { // State 7
                source:         "/* End */",
                symbols:        ["n", "r"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    
    window.it001.gProgramRepository ["it001_Ex_03_020"] =
    {
        globals:
        {
            symbols: ["a", "b"]
        },
        transitionTable:
        [
            { // State 0
                source:         "a = 5;",
                symbols:        ["a","b"],
                comment:        "a will be of type integer and hold the value 5.",
                transition:
                    function ()
                    {
                        this.a = 5;
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "b = \"Hello\";",
                symbols:        ["a", "b"],
                comment:        "b will be of type string  and hold the value \"Hello\".",
                transition:
                    function ()
                    {
                        this.b = "Hello";
                        this._SetState (2, true);
                    }
            },
            { // State 2
                source:         "/* End */",
                symbols:        ["a", "b"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    

    window.it001.gProgramRepository ["it001_Ex_03_030"] =
    {
        globals:
        {
            symbols: ["t", "x", "y"]
        },
        transitionTable:
        [
            { // State 0
                source:         "x = 10;",
                symbols:        [],
                comment:        "Assign value 10 to variable x.",
                transition:
                    function ()
                    {
                        this.x = 10;
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "t = \"SomeString\";",
                symbols:        ["x"],
                comment:        "Assign value \"SomeString\" to variable t.",
                transition:
                    function ()
                    {
                        this.t = "SomeString";
                        this._SetState (2, false);
                    }
            },
            { // State 2
                source:         "y = 2 * x * x  +  32;",
                symbols:        ["t", "x"],
                comment:        "Compute polynomial value 2*x^2 + 32, store result in variable y.",
                transition:
                    function ()
                    {
                        this.y = 2 * this.x * this.x  +  32;
                        this._SetState (3, true);
                    }
            },
            { // State 3
                source:         "/* End */",
                symbols:        ["t", "x", "y"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    

    window.it001.gProgramRepository ["it001_Ex_03_040"] =
    {
        globals:
        {
            symbols: ["a", "b"]
        },
        transitionTable:
        [
            { // State 0
                source:         "a = 10;",
                symbols:        [],
                comment:        "Define variable a.",
                transition:
                    function ()
                    {
                        this.a = 10;
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "b =  0;",
                symbols:        ["a"],
                comment:        "Define variable b.",
                transition:
                    function ()
                    {
                        this.b =  0;
                        this._SetState (4, false);
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
                source:         "/* Conditional execution */",
                symbols:        [],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 4
                source:         "if (a < 5)",
                symbols:        ["a", "b"],
                comment:        "Condition: If value of a is smaller than 5, then do the next step.",
                transition:
                    function ()
                    {
                        if (this.a < 5)
                        {
                            this._SetState (5, false);
                        }
                        else
                        {
                            this._SetState (6, false);
                        }
                    }
            },
            { // State 5
                source:         "    b = 1;",
                symbols:        ["a", "b"],
                comment:        "Value of a <b>is</b> smaller than five! So, set b to 1.",
                transition:
                    function ()
                    {
                        this.b = 1;
                        this._SetState (9, false);
                    }
            },
            { // State 6
                source:         "else",
                symbols:        ["a", "b"],
                comment:        "Condition is <b>not</b> fulfilled - do the next step.",
                transition:
                    function ()
                    {
                        this._SetState (7, false);
                    }
            },
            { // State 7
                source:         "    b = 2;",
                symbols:        ["a", "b"],
                comment:        "Set b to 2.",
                transition:
                    function ()
                    {
                        this.b = 2;
                        this._SetState (9, false);
                    }
            },
            { // State 8
                source:         "",
                symbols:        ["a", "b"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 9
                source:         "window.alert (\"b = \" + b);",
                symbols:        ["a", "b"],
                comment:        "Show message box.",
                transition:
                    function ()
                    {
                        window.alert ("b = " + this.b);
                        this._SetState (10, true);
                    }
            },
            { // State 10
                source:         "/* End */",
                symbols:        ["a", "b"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    

    window.it001.gProgramRepository ["it001_Ex_03_050"] =
    {
        globals:
        {
            symbols: ["a"]
        },
        transitionTable:
        [
            { // State 0
                source:         "10 a=10",
                symbols:        [],
                comment:        "Set variable a to 10.",
                transition:
                    function ()
                    {
                        this.a = 10;
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "20 if a<=1 then goto 80",
                symbols:        ["a"],
                comment:        "If a is smaller than, or equal to one then go to line 80.",
                transition:
                    function ()
                    {
                        if (this.a <= 1)
                        {
                            this._SetState (7, false);
                        }
                        else
                        {
                            this._SetState (2, false);
                        }
                    }
            },
            { // State 2
                source:         "30 if (a/2)=int(a/2) then goto 60",
                symbols:        ["a"],
                comment:        "If a is even (i.e. if <u>half of a</u> equals <u>half of a, rounded down</u>) then go to line 60.",
                transition:
                    function ()
                    {
                        var a2;
                        var a2int;
                        
                        a2      = this.a / 2;
                        a2int   = Math.floor (a2);
                        if (a2 === a2int)
                        {
                            this._SetState (5, false);
                        }
                        else
                        {
                            this._SetState (3, false);
                        }
                    }
            },
            { // State 3
                source:         "40 a=3*a+1",
                symbols:        ["a"],
                comment:        "Set a to three times a plus one.",
                transition:
                    function ()
                    {
                        this.a = 3 * this.a + 1;
                        this._SetState (4, false);
                    }
            },
            { // State 4
                source:         "50 goto 20",
                symbols:        ["a"],
                comment:        "Go to line 20.",
                transition:
                    function ()
                    {
                        this._SetState (1, false);
                    }
            },
            { // State 5
                source:         "60 a=a/2",
                symbols:        ["a"],
                comment:        "Set a to half of a.",
                transition:
                    function ()
                    {
                        this.a = this.a / 2;
                        this._SetState (6, false);
                    }
            },
            { // State 6
                source:         "70 goto 20",
                symbols:        ["a"],
                comment:        "Go to line 20.",
                transition:
                    function ()
                    {
                        this._SetState (1, false);
                    }
            },
            { // State 7
                source:         "80 print \"Finished!\"",
                symbols:        ["a"],
                comment:        "Print 'finished' onto the screen. Open the web console to see it!",
                transition:
                    function ()
                    {
                        console.log ("Finished!");
                        this._SetState (8, true);
                    }
            },
            { // State 8
                source:         "--- End ---",
                symbols:        ["a"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    

    window.it001.gProgramRepository ["it001_Ex_03_060"] =
    {
        globals:
        {
            symbols: ["a"]
        },
        transitionTable:
        [
            { // State 0
                source:         "a=10",
                symbols:        [],
                comment:        "Set variable a to 10.",
                transition:
                    function ()
                    {
                        this.a = 10;
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "while a >= 2",
                symbols:        ["a"],
                comment:        "<tt>while</tt> loop: While a is greater than, or equal to two, execute the following (<tt>if</tt>) block.",
                transition:
                    function ()
                    {
                        if (this.a >= 2)
                        {
                            this._SetState (2, false);
                        }
                        else
                        {
                            this._SetState (8, false);
                        }
                    }
            },
            { // State 2
                source:         "    if (a/2) = int(a/2) then",
                symbols:        ["a"],
                comment:        "<tt>if</tt> block: If a is even (i.e. if <u>half of a</u> equals <u>half of a, rounded down</u>) then execute the next block (Next block has one statement only).",
                transition:
                    function ()
                    {
                        var a2;
                        var a2int;
                        
                        a2      = this.a / 2;
                        a2int   = Math.floor (a2);
                        if (a2 === a2int)
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
                source:         "        a=a/2",
                symbols:        ["a"],
                comment:        "Set a to half of a.",
                transition:
                    function ()
                    {
                        this.a = this.a / 2;
                        this._SetState (6, false);
                    }
            },
            { // State 4
                source:         "    else",
                symbols:        ["a"],
                comment:        "a is <b>not</b> even - execute the next block (Next block has one statement only).",
                transition:
                    function ()
                    {
                        this._SetState (5, false);
                    }
            },
            { // State 5
                source:         "        a=3*a+1",
                symbols:        ["a"],
                comment:        "Set a to three times a plus one.",
                transition:
                    function ()
                    {
                        this.a = 3 * this.a + 1;
                        this._SetState (6, false);
                    }
            },
            { // State 6
                source:         "    end if",
                symbols:        ["a"],
                comment:        "End of <tt>if</tt> block.",
                transition:
                    function ()
                    {
                        this._SetState (7, false);
                    }
            },
            { // State 7
                source:         "wend",
                symbols:        ["a"],
                comment:        "End of <tt>while</tt> loop. Go back to beginning of <tt>while</tt> loop.",
                transition:
                    function ()
                    {
                        this._SetState (1, false);
                    }
            },
            { // State 8
                source:         "print \"Finished!\"",
                symbols:        ["a"],
                comment:        "Print 'finished' onto the screen. Open the web console to see it!",
                transition:
                    function ()
                    {
                        console.log ("Finished!");
                        this._SetState (9, true);
                    }
            },
            { // State 9
                source:         "--- End ---",
                symbols:        ["a"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    

    window.it001.gProgramRepository ["it001_Ex_03_070"] =                       /* [10] */
    {
        globals:
        {
            symbols: ["CheckValue", "x", "stack", "frame"]
        },
        transitionTable:
        [
            { // State 0
                source:         "function CheckValue (x)",
                symbols:        [],
                comment:        "Define function 'CheckValue'.",
                transition:
                    function ()
                    {
                        this.stack = [];
                        this.CheckValue = function (x){/* ...etc. */};          /* [20] */
                        this._SetState (8, false);
                    }
            },
            { // State 1
                source:         "{",
                symbols:        ["CheckValue", "x"],
                comment:        "Entering function 'CheckValue', passing argument as variable 'x'.",
                transition:
                    function ()
                    {
                        this.stack.push (this.frame);
                        this._SetState (2, false);
                    }
            },
            { // State 2
                source:         "    if (x < 10)",
                symbols:        ["CheckValue", "x"],
                comment:        "<tt>if</tt> block: If x is smaller than 10 then execute the next block.",
                transition:
                    function ()
                    {
                        if (this.x < 10)
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
                source:         "        window.alert (\"Love the number \" + x + \"!\");",
                symbols:        ["CheckValue", "x"],
                comment:        "My program loves this number!",
                transition:
                    function ()
                    {
                        window.alert ("Love the number " + this.x + "!");
                        this._SetState (6, false);
                    }
            },
            { // State 4
                source:         "    else",
                symbols:        ["CheckValue", "x"],
                comment:        "x is <b>not</b> smaller than 10, so execute the next block.",
                transition:
                    function ()
                    {
                        this._SetState (5, false);
                    }
            },
            { // State 5
                source:         "        window.alert (\"You doofus! I hate the number \" + x + \"!\");",
                symbols:        ["CheckValue", "x"],
                comment:        "Eek! My program hates this number!",
                transition:
                    function ()
                    {
                        window.alert ("You doofus! I hate the number " + this.x + "!");
                        this._SetState (6, false);
                    }
            },
            { // State 6
                source:         "}",
                symbols:        ["CheckValue", "x"],
                comment:        "Exit function 'CheckValue'",
                transition:
                    function ()
                    {
                        this.frame = this.stack.pop ();
                        this._SetState (this.frame.nextState, this.frame.willBeTerminal);
                    }
            },
            { // State 7
                source:         "",
                symbols:        ["CheckValue"],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 8
                source:         "CheckValue (5);",
                symbols:        ["CheckValue"],
                comment:        "Execute function 'CheckValue'. Will my program love or hate the number 5?",
                transition:
                    function ()
                    {
                        this.x = 5;
                        this.frame=
                        {
                            nextState:          9,
                            willBeTerminal:     false,
                            x:                  this.x
                        };
                        this._SetState (1, false);
                    }
            },
            { // State 9
                source:         "CheckValue (20);",
                symbols:        ["CheckValue"],
                comment:        "Execute function 'CheckValue'. Will my program love or hate the number 20?",
                transition:
                    function ()
                    {
                        this.x = 20;
                        this.frame=
                        {
                            nextState:          10,
                            willBeTerminal:     true,
                            x:                  this.x
                        };
                        this._SetState (1, false);
                    }
            },
            { // State 10
                source:         "/* End */",
                symbols:        ["CheckValue"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    

    window.it001.gProgramRepository ["it001_Ex_03_080"] =
    {
        globals:
        {
            symbols: ["x"]
        },
        transitionTable:
        [
            { // State 0
                source:         "x = 5;",
                symbols:        [],
                comment:        "Set x to 5.",
                transition:
                    function ()
                    {
                        this.x = 5;
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "if (x < 10)",
                symbols:        ["x"],
                comment:        "If x is smaller than 10, then execute the next block.",
                transition:
                    function ()
                    {
                        if (this.x < 10)
                        {
                            this._SetState (2, false);
                        }
                        else
                        {
                            this._SetState (3, false);
                        }
                    }
            },
            { // State 2
                source:         "    window.alert (\"Love the number \" + x + \"!\");",
                symbols:        ["x"],
                comment:        "My program loves this number!",
                transition:
                    function ()
                    {
                        window.alert ("Love the number " + this.x + "!");
                        this._SetState (6, false);
                    }
            },
            { // State 3
                source:         "else",
                symbols:        ["x"],
                comment:        "x is <b>not</b> smaller than 10 - execute the next block.",
                transition:
                    function ()
                    {
                        this._SetState (4, false);
                    }
            },
            { // State 4
                source:         "    window.alert (\"You doofus! I hate the number \" + x + \"!\");",
                symbols:        ["x"],
                comment:        "Eek! My program hates this number!",
                transition:
                    function ()
                    {
                        window.alert ("You doofus! I hate the number " + this.x + "!");
                        this._SetState (6, false);
                    }
            },
            { // State 5
                source:         "",
                symbols:        [],
                comment:        "",
                transition:
                    function ()
                    {
                    }
            },
            { // State 6
                source:         "x = 20;",
                symbols:        ["x"],
                comment:        "Set x to 20.",
                transition:
                    function ()
                    {
                        this.x = 20;
                        this._SetState (7, false);
                    }
            },
            { // State 7
                source:         "if (x < 10)",
                symbols:        ["x"],
                comment:        "If x is smaller than 10, then execute the next block.",
                transition:
                    function ()
                    {
                        if (this.x < 10)
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
                source:         "    window.alert (\"Love the number \" + x + \"!\");",
                symbols:        ["x"],
                comment:        "My program loves this number!",
                transition:
                    function ()
                    {
                        window.alert ("Love the number " + this.x + "!");
                        this._SetState (11, true);
                    }
            },
            { // State 9
                source:         "else",
                symbols:        ["x"],
                comment:        "x is <b>not</b> smaller than 10 - execute the next block.",
                transition:
                    function ()
                    {
                        this._SetState (10, false);
                    }
            },
            { // State 10
                source:         "    window.alert (\"You doofus! I hate the number \" + x + \"!\");",
                symbols:        ["x"],
                comment:        "Eek! My program hates this number!",
                transition:
                    function ()
                    {
                        window.alert ("You doofus! I hate the number " + this.x + "!");
                        this._SetState (11, true);
                    }
            },
            { // State 11
                source:         "/* End */",
                symbols:        ["x"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    

    window.it001.gProgramRepository ["it001_Ex_03_090"] =
    {
        globals:
        {
            symbols: ["a"]
        },
        transitionTable:
        [
            { // State 0
                source:         "var a = 3;",
                symbols:        ["a"],
                comment:        "a will be an integer.",
                transition:
                    function ()
                    {
                        this.a = 3;
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "a = 3.54;",
                symbols:        ["a"],
                comment:        "Now a will be a floating point variable!",
                transition:
                    function ()
                    {
                        this.a = 3.54;
                        this._SetState (2, false);
                    }
            },
            { // State 2
                source:         "a = \"Hello\"",
                symbols:        ["a"],
                comment:        "Now a will be a string!",
                transition:
                    function ()
                    {
                        this.a = "Hello"
                        this._SetState (3, true);
                    }
            },
            { // State 3
                source:         "/* End */",
                symbols:        ["a"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
});

/*
 [10]:  Re: it001_Ex_03_070: TFunction is defined in course/it001/res/scripts/decl.js

 [20]:  CheckValue will appear in Looking glass view. Therefore we set it to some dummy function.
 */