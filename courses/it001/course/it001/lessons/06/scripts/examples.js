/**
 *  @fileoverview        Program examples, chapter 6
 */
define (["course/it001/res/scripts/decl"], function ()
{
    console.log ("Adding examples: Lesson 06");

    window.it001.gProgramRepository ["it001_Ex_06_010"] =
    {
        globals:
        {
            symbols: ["a", "b", "c", "d", "e"]
        },
        transitionTable:
        [
            { // State 0
                source:         "a = 3;",
                symbols:        ["a", "b", "c", "d", "e"],
                comment:        "Simple assignment",
                transition:
                    function ()
                    {
                        this.a = 3;
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "b = 2 + 5;",
                symbols:        ["a", "b", "c", "d", "e"],
                comment:        "Calculate sum of 2 and 5 and assign it to b.",
                transition:
                    function ()
                    {
                        this.b = 2 + 5;
                        this._SetState (2, false);
                    }
            },
            { // State 2
                source:         "c = a * 4 + 28;",
                symbols:        ["a", "b", "c", "d", "e"],
                comment:        "Do a more complex calculation and assign result to c. Note, we are re-using variable a.",
                transition:
                    function ()
                    {
                        this.c = this.a * 4 + 28;
                        this._SetState (3, false);
                    }
            },
            { // State 3
                source:         "d = Math.random ();",
                symbols:        ["a", "b", "c", "d", "e"],
                comment:        "Function call.",
                transition:
                    function ()
                    {
                        this.d = Math.random ();
                        this._SetState (4, false);
                    }
            },
            { // State 4
                source:         "e = Math.sin (a * 3.14 / 180);  ",
                symbols:        ["a", "b", "c", "d", "e"],
                comment:        "Function call with additional calculations.",
                transition:
                    function ()
                    {
                        this.e = Math.sin (this.a * 3.14 / 180);  
                        this._SetState (5, false);
                    }
            },
            { // State 5
                source:         "/* End */",
                symbols:        ["a", "b", "c", "d", "e"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    

    window.it001.gProgramRepository ["it001_Ex_06_020"] =
    {
        globals:
        {
            symbols: ["a"]
        },
        transitionTable:
        [
            { // State 0
                source:         "a = 2 + 3;",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.a = 2 + 3;
                        this._SetState (1, true);
                    }
            },
            { // State 1
                source:         "/* End */",
                symbols:        ["a"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    

    window.it001.gProgramRepository ["it001_Ex_06_030"] =
    {
        globals:
        {
            symbols: ["a"]
        },
        transitionTable:
        [
            { // State 0
                source:         "a = 3 - 1;",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.a = 3 - 1;
                        this._SetState (1, true);
                    }
            },
            { // State 1
                source:         "/* End */",
                symbols:        ["a"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    

    window.it001.gProgramRepository ["it001_Ex_06_040"] =
    {
        globals:
        {
            symbols: ["a"]
        },
        transitionTable:
        [
            { // State 0
                source:         "a = 5 * 4",
                symbols:        ["a"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.a = 5 * 4
                        this._SetState (1, true);
                    }
            },
            { // State 1
                source:         "/* End */",
                symbols:        ["a"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    

    window.it001.gProgramRepository ["it001_Ex_06_050"] =
    {
        globals:
        {
            symbols: ["a", "b", "c"]
        },
        transitionTable:
        [
            { // State 0
                source:         "a = 1 / 2;",
                symbols:        ["a", "b", "c"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.a = 1 / 2;
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "b = 1.0 /  0.0;",
                symbols:        ["a", "b", "c"],
                comment:        "Division by plus zero will yield 'positive infinity'.",
                transition:
                    function ()
                    {
                        this.b = 1.0 /  0.0;
                        this._SetState (2, false);
                    }
            },
            { // State 2
                source:         "c = 1.0 / -0.0;",
                symbols:        ["a", "b", "c"],
                comment:        "Division by negative zero will yield 'negative infinity'.<br/>" + 
                                "Note: Most other systems throw a 'division by zero' error in those situations.",
                transition:
                    function ()
                    {
                        this.c = 1.0 / -0.0;
                        this._SetState (3, true);
                    }
            },
            { // State 3
                source:         "/* End */",
                symbols:        ["a", "b", "c"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    

    window.it001.gProgramRepository ["it001_Ex_06_060"] =
    {
        globals:
        {
            symbols: ["a", "x"]
        },
        transitionTable:
        [
            { // State 0
                source:         "x =  1;",
                symbols:        ["a", "x"],
                comment:        "Some data for further down.",
                transition:
                    function ()
                    {
                        this.x =  1;
                        this._SetState (2, false);
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
                source:         "a = -3;",
                symbols:        ["a", "x"],
                comment:        "Setting a variable to a negative value",
                transition:
                    function ()
                    {
                        this.a = -3;
                        this._SetState (3, false);
                    }
            },
            { // State 3
                source:         "a = -x;",
                symbols:        ["a", "x"],
                comment:        "Negation works with variables as well. Here we assign negative x to variable a.",
                transition:
                    function ()
                    {
                        this.a = -this.x;
                        this._SetState (4, false);
                    }
            },
            { // State 4
                source:         "a = -a;",
                symbols:        ["a", "x"],
                comment:        "Here we negate variable a.",
                transition:
                    function ()
                    {
                        this.a = -this.a;
                        this._SetState (5, true);
                    }
            },
            { // State 5
                source:         "/* End */",
                symbols:        ["a", "x"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    

    window.it001.gProgramRepository ["it001_Ex_06_070"] =
    {
        globals:
        {
            symbols: ["a", "b"]
        },
        transitionTable:
        [
            { // State 0
                source:         "a = 5;",
                symbols:        ["a", "b"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.a = 5;
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "b = a++;",
                symbols:        ["a", "b"],
                comment:        "Assign value of a to b and then increment a.",
                transition:
                    function ()
                    {
                        this.b = this.a++;
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

    


    window.it001.gProgramRepository ["it001_Ex_06_080"] =
    {
        globals:
        {
            symbols: ["a", "b"]
        },
        transitionTable:
        [
            { // State 0
                source:         "a = 5;",
                symbols:        ["a", "b"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.a = 5;
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "b = ++a;",
                symbols:        ["a", "b"],
                comment:        "Increment a and then assign value of a to b.",
                transition:
                    function ()
                    {
                        this.b = ++this.a;
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

    
    

    window.it001.gProgramRepository ["it001_Ex_06_090"] =
    {
        globals:
        {
            symbols: ["a", "b"]
        },
        transitionTable:
        [
            { // State 0
                source:         "a = 5;",
                symbols:        ["a", "b"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.a = 5;
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "b = a--;",
                symbols:        ["a", "b"],
                comment:        "Assign value of a to b and then decrement a.",
                transition:
                    function ()
                    {
                        this.b = this.a--;
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
    


    window.it001.gProgramRepository ["it001_Ex_06_100"] =
    {
        globals:
        {
            symbols: ["a", "b"]
        },
        transitionTable:
        [
            { // State 0
                source:         "a = 5;",
                symbols:        ["a", "b"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.a = 5;
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "b = --a;",
                symbols:        ["a", "b"],
                comment:        "Decrement a and then assign value of a to b.",
                transition:
                    function ()
                    {
                        this.b = --this.a;
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

    
    
    window.it001.gProgramRepository ["it001_Ex_06_110"] =
    {
        globals:
        {
            symbols: ["a", "b", "c", "d", "e"]
        },
        transitionTable:
        [
            { // State 0
                source:         "a = 6 %  3;",
                symbols:        ["a", "b", "c", "d", "e"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.a = 6 % 3;
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "b = 5 %  3;",
                symbols:        ["a", "b", "c", "d", "e"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.b = 5 % 3;
                        this._SetState (2, false);
                    }
            },
            { // State 2
                source:         "c =-5 %  3;",
                symbols:        ["a", "b", "c", "d", "e"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.c = -5 % 3;
                        this._SetState (3, false);
                    }
            },
            { // State 3
                source:         "d = 5 % -3;",
                symbols:        ["a", "b", "c", "d", "e"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.d = 5 % -3;
                        this._SetState (4, false);
                    }
            },
            { // State 4
                source:         "e =-5 % -3",
                symbols:        ["a", "b", "c", "d", "e"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.e = -5 % -3;
                        this._SetState (5, false);
                    }
            },
            { // State 5
                source:         "/* End */",
                symbols:        ["a", "b", "c", "d", "e"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    

    window.it001.gProgramRepository ["it001_Ex_06_120"] =
    {
        globals:
        {
            symbols: ["op1", "op2", "result"]
        },
        transitionTable:
        [
            { // State 0
                source:         "result = 9 & 14",
                symbols:        ["op1", "op2", "result"],
                comment:        "Bitwise AND between two numbers.",
                transition:
                    function ()
                    {
                        var x;
                        
                        x = 9 & 14;
                        this.op1    = " 9 (binary: " + ( 9 >>> 0).toString (2) + ")";
                        this.op2    = "14 (binary: " + (14 >>> 0).toString (2) + ")";
                        this.result = "" + x + " (binary: " + (x >>> 0).toString (2) + ")"; /* [100] */

                        this._SetState (1, true);
                    }
            },
            { // State 1
                source:         "/* End */",
                symbols:        ["op1", "op2", "result"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    


    window.it001.gProgramRepository ["it001_Ex_06_130"] =
    {
        globals:
        {
            symbols: ["op1", "op2", "result"]
        },
        transitionTable:
        [
            { // State 0
                source:         "result = 9 | 14",
                symbols:        ["op1", "op2", "result"],
                comment:        "Bitwise OR between two numbers.",
                transition:
                    function ()
                    {
                        var x;
                        
                        x = 9 | 14;
                        this.op1    = " 9 (binary: " + ( 9 >>> 0).toString (2) + ")";
                        this.op2    = "14 (binary: " + (14 >>> 0).toString (2) + ")";
                        this.result = "" + x + " (binary: " + (x >>> 0).toString (2) + ")"; /* [100] */
                        
                        this._SetState (1, true);
                    }
            },
            { // State 1
                source:         "/* End */",
                symbols:        ["op1", "op2", "result"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };




    window.it001.gProgramRepository ["it001_Ex_06_140"] =
    {
        globals:
        {
            symbols: ["op1", "op2", "result"]
        },
        transitionTable:
        [
            { // State 0
                source:         "result = 9 ^ 14",
                symbols:        ["op1", "op2", "result"],
                comment:        "Bitwise XOR between two numbers.",
                transition:
                    function ()
                    {
                        var x;
                        
                        x = 9 ^ 14;
                        this.op1    = " 9 (binary: " + ( 9 >>> 0).toString (2) + ")";
                        this.op2    = "14 (binary: " + (14 >>> 0).toString (2) + ")";
                        this.result = "" + x + " (binary: " + (x >>> 0).toString (2) + ")"; /* [100] */
                        
                        this._SetState (1, true);
                    }
            },
            { // State 1
                source:         "/* End */",
                symbols:        ["op1", "op2", "result"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    


    window.it001.gProgramRepository ["it001_Ex_06_150"] =
    {
        globals:
        {
            symbols: ["op", "result"]
        },
        transitionTable:
        [
            { // State 0
                source:         "result = ~9",
                symbols:        ["op", "result"],
                comment:        "Bitwise NEGATION of a number.",
                transition:
                    function ()
                    {
                        var x;
                        
                        x = ~9;
                        this.op     = " 9 (binary: " + ( 9 >>> 0).toString (2) + ")";
                        this.result = "" + x + " (binary: " + (x >>> 0).toString (2) + ")"; /* [100] */
                        
                        this._SetState (1, true);
                    }
            },
            { // State 1
                source:         "/* End */",
                symbols:        ["op", "result"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    


    window.it001.gProgramRepository ["it001_Ex_06_160"] =
    {
        globals:
        {
            symbols: ["op", "result"]
        },
        transitionTable:
        [
            { // State 0
                source:         "result = 9 << 2",
                symbols:        ["op", "result"],
                comment:        "Bitwise LEFT SHIFT of a number by 2 digits.",
                transition:
                    function ()
                    {
                        var x;
                        
                        x = 9 << 2;
                        this.op     = " 9 (binary: " + ( 9 >>> 0).toString (2) + ")";
                        this.result = "" + x + " (binary: " + (x >>> 0).toString (2) + ")"; /* [100] */
                        
                        this._SetState (1, true);
                    }
            },
            { // State 1
                source:         "/* End */",
                symbols:        ["op", "result"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    


    window.it001.gProgramRepository ["it001_Ex_06_170"] =
    {
        globals:
        {
            symbols: ["op", "result"]
        },
        transitionTable:
        [
            { // State 0
                source:         "result = 9 >> 2",
                symbols:        ["op", "result"],
                comment:        "Bitwise RIGHT SHIFT of a number by 2 digits.",
                transition:
                    function ()
                    {
                        var x;

                        x = 9 >> 2;
                        this.op     = " 9 (binary: " + ( 9 >>> 0).toString (2) + ")";
                        this.result = x + " (binary: " + (x >>> 0).toString (2) + ")"; /* [100] */
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "result = -9 >> 2",
                symbols:        ["op", "result"],
                comment:        "Bitwise RIGHT SHIFT of a negative number by 2 digits.",
                transition:
                    function ()
                    {
                        var x;

                        x = -9 >> 2;
                        this.op     = "-9 (binary: " + (-9 >>> 0).toString (2) + ")";
                        this.result = x + " (binary: " + (x >>> 0).toString (2) + ")"; /* [100] */
                        this._SetState (2, true);
                    }
            },
            { // State 2
                source:         "/* End */",
                symbols:        ["op", "result"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    


    window.it001.gProgramRepository ["it001_Ex_06_180"] =
    {
        globals:
        {
            symbols: ["op", "result"]
        },
        transitionTable:
        [
            { // State 0
                source:         "result = 9 >>> 2",
                symbols:        ["op", "result"],
                comment:        "Bitwise LOGICAL RIGHT SHIFT of a number by 2 digits.",
                transition:
                    function ()
                    {
                        var x;

                        x = 9 >>> 2;
                        this.op     = " 9 (binary: " + ( 9 >>> 0).toString (2) + ")";
                        this.result = x + " (binary: " + (x >>> 0).toString (2) + ")"; /* [100] */
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "result = -9 >>> 2",
                symbols:        ["op", "result"],
                comment:        "Bitwise LOGICAL RIGHT SHIFT of a negative number by 2 digits.",
                transition:
                    function ()
                    {
                        var x;

                        x = -9 >>> 2;
                        this.op     = "-9 (binary: " + (-9 >>> 0).toString (2) + ")";
                        this.result = x + " (binary: " + (x >>> 0).toString (2) + ")"; /* [100] */
                        this._SetState (2, true);
                    }
            },
            { // State 2
                source:         "/* End */",
                symbols:        ["op", "result"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    


    window.it001.gProgramRepository ["it001_Ex_06_190"] =
    {
        globals:
        {
            symbols: ["a"]
        },
        transitionTable:
        [
            { // State 0
                source:         "a = 3;",
                symbols:        ["a"],
                comment:        "a will become 3",
                transition:
                    function ()
                    {
                        this.a = 3;
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "a = a + 2;",
                symbols:        ["a"],
                comment:        "a will become 5",
                transition:
                    function ()
                    {
                        this.a = this.a + 2
                        this._SetState (2, true);
                    }
            },
            { // State 2
                source:         "/* End */",
                symbols:        ["a"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    


    window.it001.gProgramRepository ["it001_Ex_06_200"] =
    {
        globals:
        {
            symbols: ["a", "b", "c", "d"]
        },
        transitionTable:
        [
            { // State 0
                source:         "a = 10;",
                symbols:        ["a", "b", "c", "d"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.a = 10;
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "b =  5;",
                symbols:        ["a", "b", "c", "d"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.b = 5;
                        this._SetState (2, false);
                    }
            },
            { // State 2
                source:         "c = (a >  b);",
                symbols:        ["a", "b", "c", "d"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.c = (this.a > this.b);
                        this._SetState (3, false);
                    }
            },
            { // State 3
                source:         "d = (a == b);",
                symbols:        ["a", "b", "c", "d"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.d = (this.a == this.b);
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
    


    window.it001.gProgramRepository ["it001_Ex_06_210"] =
    {
        globals:
        {
            symbols: ["a", "b", "c", "d"]
        },
        transitionTable:
        [
            { // State 0
                source:         "a = (5 == 5)",
                symbols:        ["a", "b", "c", "d"],
                comment:        "5 (integer) equals 5 (integer)?",
                transition:
                    function ()
                    {
                        this.a = (5 == 5);
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "b = (5.0 == 5)",
                symbols:        ["a", "b", "c", "d"],
                comment:        "5.0 (float) equals 5 (integer)?",
                transition:
                    function ()
                    {
                        this.b = (5.0 == 5);
                        this._SetState (2, false);
                    }
            },
            { // State 2
                source:         "c = (\"5\" == 5)",
                symbols:        ["a", "b", "c", "d"],
                comment:        "\"5\" (string) equals 5 (integer)?",
                transition:
                    function ()
                    {
                        this.c = ("5" == 5);
                        this._SetState (3, false);
                    }
            },
            { // State 3
                source:         "d = (4 == 5)",
                symbols:        ["a", "b", "c", "d"],
                comment:        "4 (integer) equals 5 (integer)?",
                transition:
                    function ()
                    {
                        this.d = (4 == 5);
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



    window.it001.gProgramRepository ["it001_Ex_06_220"] =
    {
        globals:
        {
            symbols: ["a", "b", "c", "d"]
        },
        transitionTable:
        [
            { // State 0
                source:         "a = (5 === 5)",
                symbols:        ["a", "b", "c", "d"],
                comment:        "5 (integer) strictly equals 5 (integer)?",
                transition:
                    function ()
                    {
                        this.a = (5 === 5);
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "b = (5.0 === 5)",
                symbols:        ["a", "b", "c", "d"],
                comment:        "5.0 (float) strictly equals 5 (integer)?",
                transition:
                    function ()
                    {
                        this.b = (5.0 === 5);
                        this._SetState (2, false);
                    }
            },
            { // State 2
                source:         "c = (\"5\" === 5)",
                symbols:        ["a", "b", "c", "d"],
                comment:        "\"5\" (string) strictly equals 5 (integer)?",
                transition:
                    function ()
                    {
                        this.c = ("5" === 5);
                        this._SetState (3, false);
                    }
            },
            { // State 3
                source:         "d = (4 === 5)",
                symbols:        ["a", "b", "c", "d"],
                comment:        "4 (integer) strictly equals 5 (integer)?",
                transition:
                    function ()
                    {
                        this.d = (4 === 5);
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



    window.it001.gProgramRepository ["it001_Ex_06_230"] =
    {
        globals:
        {
            symbols: ["a", "b", "c", "d"]
        },
        transitionTable:
        [
            { // State 0
                source:         "a = (5 != 5)",
                symbols:        ["a", "b", "c", "d"],
                comment:        "5 (integer) strictly equals 5 (integer)?",
                transition:
                    function ()
                    {
                        this.a = (5 != 5);
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "b = (5.0 != 5)",
                symbols:        ["a", "b", "c", "d"],
                comment:        "5.0 (float) strictly equals 5 (integer)?",
                transition:
                    function ()
                    {
                        this.b = (5.0 != 5);
                        this._SetState (2, false);
                    }
            },
            { // State 2
                source:         "c = (\"5\" != 5)",
                symbols:        ["a", "b", "c", "d"],
                comment:        "\"5\" (string) strictly equals 5 (integer)?",
                transition:
                    function ()
                    {
                        this.c = ("5" != 5);
                        this._SetState (3, false);
                    }
            },
            { // State 3
                source:         "d = (4 != 5)",
                symbols:        ["a", "b", "c", "d"],
                comment:        "4 (integer) strictly equals 5 (integer)?",
                transition:
                    function ()
                    {
                        this.d = (4 != 5);
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



    window.it001.gProgramRepository ["it001_Ex_06_240"] =
    {
        globals:
        {
            symbols: ["a", "b", "c", "d"]
        },
        transitionTable:
        [
            { // State 0
                source:         "a = (5 !== 5)",
                symbols:        ["a", "b", "c", "d"],
                comment:        "5 (integer) strictly equals 5 (integer)?",
                transition:
                    function ()
                    {
                        this.a = (5 !== 5);
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "b = (5.0 !== 5)",
                symbols:        ["a", "b", "c", "d"],
                comment:        "5.0 (float) strictly equals 5 (integer)?",
                transition:
                    function ()
                    {
                        this.b = (5.0 !== 5);
                        this._SetState (2, false);
                    }
            },
            { // State 2
                source:         "c = (\"5\" !== 5)",
                symbols:        ["a", "b", "c", "d"],
                comment:        "\"5\" (string) strictly equals 5 (integer)?",
                transition:
                    function ()
                    {
                        this.c = ("5" !== 5);
                        this._SetState (3, false);
                    }
            },
            { // State 3
                source:         "d = (4 !== 5)",
                symbols:        ["a", "b", "c", "d"],
                comment:        "4 (integer) strictly equals 5 (integer)?",
                transition:
                    function ()
                    {
                        this.d = (4 !== 5);
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




    window.it001.gProgramRepository ["it001_Ex_06_250"] =
    {
        globals:
        {
            symbols: ["a", "b", "c"]
        },
        transitionTable:
        [
            { // State 0
                source:         "a = (4 > 5)",
                symbols:        ["a", "b", "c"],
                comment:        "4 greater than 5?",
                transition:
                    function ()
                    {
                        this.a = (4 > 5);
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "b = (5 > 5)",
                symbols:        ["a", "b", "c"],
                comment:        "5 greater than 5?",
                transition:
                    function ()
                    {
                        this.b = (5 > 5);
                        this._SetState (2, false);
                    }
            },
            { // State 2
                source:         "c = (6 > 5)",
                symbols:        ["a", "b", "c"],
                comment:        "6 greater than 5?",
                transition:
                    function ()
                    {
                        this.c = (6 > 5);
                        this._SetState (3, true);
                    }
            },
            { // State 3
                source:         "/* End */",
                symbols:        ["a", "b", "c"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };



    window.it001.gProgramRepository ["it001_Ex_06_260"] =
    {
        globals:
        {
            symbols: ["a", "b", "c"]
        },
        transitionTable:
        [
            { // State 0
                source:         "a = (4 >= 5)",
                symbols:        ["a", "b", "c"],
                comment:        "4 greater than, or equal to 5?",
                transition:
                    function ()
                    {
                        this.a = (4 >= 5);
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "b = (5 >= 5)",
                symbols:        ["a", "b", "c"],
                comment:        "5 greater than, or equal to 5?",
                transition:
                    function ()
                    {
                        this.b = (5 >= 5);
                        this._SetState (2, false);
                    }
            },
            { // State 2
                source:         "c = (6 >= 5)",
                symbols:        ["a", "b", "c"],
                comment:        "6 greater than, or equal to 5?",
                transition:
                    function ()
                    {
                        this.c = (6 >= 5);
                        this._SetState (3, true);
                    }
            },
            { // State 3
                source:         "/* End */",
                symbols:        ["a", "b", "c"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };



    window.it001.gProgramRepository ["it001_Ex_06_270"] =
    {
        globals:
        {
            symbols: ["a", "b", "c"]
        },
        transitionTable:
        [
            { // State 0
                source:         "a = (4 < 5)",
                symbols:        ["a", "b", "c"],
                comment:        "4 lesser than 5?",
                transition:
                    function ()
                    {
                        this.a = (4 < 5);
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "b = (5 < 5)",
                symbols:        ["a", "b", "c"],
                comment:        "5 lesser than 5?",
                transition:
                    function ()
                    {
                        this.b = (5 < 5);
                        this._SetState (2, false);
                    }
            },
            { // State 2
                source:         "c = (6 < 5)",
                symbols:        ["a", "b", "c"],
                comment:        "6 lesser than 5?",
                transition:
                    function ()
                    {
                        this.c = (6 < 5);
                        this._SetState (3, true);
                    }
            },
            { // State 3
                source:         "/* End */",
                symbols:        ["a", "b", "c"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };



    window.it001.gProgramRepository ["it001_Ex_06_280"] =
    {
        globals:
        {
            symbols: ["a", "b", "c"]
        },
        transitionTable:
        [
            { // State 0
                source:         "a = (4 <= 5)",
                symbols:        ["a", "b", "c"],
                comment:        "4 lesser than, or equal to 5?",
                transition:
                    function ()
                    {
                        this.a = (4 <= 5);
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "b = (5 <= 5)",
                symbols:        ["a", "b", "c"],
                comment:        "5 lesser than, or equal to 5?",
                transition:
                    function ()
                    {
                        this.b = (5 <= 5);
                        this._SetState (2, false);
                    }
            },
            { // State 2
                source:         "c = (6 <= 5)",
                symbols:        ["a", "b", "c"],
                comment:        "6 lesser than, or equal to 5?",
                transition:
                    function ()
                    {
                        this.c = (6 <= 5);
                        this._SetState (3, true);
                    }
            },
            { // State 3
                source:         "/* End */",
                symbols:        ["a", "b", "c"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };



    window.it001.gProgramRepository ["it001_Ex_06_290"] =
    {
        globals:
        {
            symbols: ["a", "b", "c", "d"]
        },
        transitionTable:
        [
            { // State 0
                source:         "a = true  &&  true;",
                symbols:        ["a", "b", "c", "d"],
                comment:        "<tt>true</tt> AND <tt>true</tt> is ?",
                transition:
                    function ()
                    {
                        this.a = true  &&  true;
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "b = true  &&  false;",
                symbols:        ["a", "b", "c", "d"],
                comment:        "<tt>true</tt> AND <tt>false</tt> is ?",
                transition:
                    function ()
                    {
                        this.b = true  &&  false;
                        this._SetState (2, false);
                    }
            },
            { // State 2
                source:         "c = true  &&  (3 < 4);",
                symbols:        ["a", "b", "c", "d"],
                comment:        "<tt>true</tt> AND <tt>true</tt> is ?",
                transition:
                    function ()
                    {
                        this.c = true  &&  (3 < 4);
                        this._SetState (3, false);
                    }
            },
            { // State 3
                source:         "d = true  &&  (4 < 3);",
                symbols:        ["a", "b", "c", "d"],
                comment:        "<tt>true</tt> AND <tt>false</tt> is ?",
                transition:
                    function ()
                    {
                        this.d = true  &&  (4 < 3);
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



    window.it001.gProgramRepository ["it001_Ex_06_300"] =
    {
        globals:
        {
            symbols: ["a", "b", "c", "d"]
        },
        transitionTable:
        [
            { // State 0
                source:         "a = true  ||  true;",
                symbols:        ["a", "b", "c", "d"],
                comment:        "<tt>true</tt> OR <tt>true</tt> is ?",
                transition:
                    function ()
                    {
                        this.a = true  ||  true;
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "b = true  ||  false;",
                symbols:        ["a", "b", "c", "d"],
                comment:        "<tt>true</tt> OR <tt>false</tt> is ?",
                transition:
                    function ()
                    {
                        this.b = true  ||  false;
                        this._SetState (2, false);
                    }
            },
            { // State 2
                source:         "c = true  ||  (3 < 4);",
                symbols:        ["a", "b", "c", "d"],
                comment:        "<tt>true</tt> OR <tt>true</tt> is ?",
                transition:
                    function ()
                    {
                        this.c = true  ||  (3 < 4);
                        this._SetState (3, false);
                    }
            },
            { // State 3
                source:         "d = true  ||  (4 < 3);",
                symbols:        ["a", "b", "c", "d"],
                comment:        "<tt>true</tt> OR <tt>false</tt> is ?",
                transition:
                    function ()
                    {
                        this.d = true  ||  (4 < 3);
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



    window.it001.gProgramRepository ["it001_Ex_06_310"] =
    {
        globals:
        {
            symbols: ["a", "b"]
        },
        transitionTable:
        [
            { // State 0
                source:         "a = !true;",
                symbols:        ["a", "b"],
                comment:        "NOT <tt>true</tt> is ?",
                transition:
                    function ()
                    {
                        this.a = !true;
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "b = !false;",
                symbols:        ["a", "b"],
                comment:        "NOT <tt>false</tt> is ?",
                transition:
                    function ()
                    {
                        this.b = !false;
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



    window.it001.gProgramRepository ["it001_Ex_06_320"] =
    {
        globals:
        {
            symbols: ["a", "b", "y1", "y2"]
        },
        transitionTable:
        [
            { // State 0
                source:         "a   = \"opera\"",
                symbols:        ["a", "b", "y1", "y2"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.a = "opera"
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "b   = \"tor\";",
                symbols:        ["a", "b", "y1", "y2"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.b = "tor";
                        this._SetState (2, false);
                    }
            },
            { // State 2
                source:         "y1  = a + b;         // \"operator\"",
                symbols:        ["a", "b", "y1", "y2"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.y1 = this.a + this.b;
                        this._SetState (3, false);
                    }
            },
            { // State 3
                source:         "y2  = a + \" \" + b;   // \"opera tor\"",
                symbols:        ["a", "b", "y1", "y2"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.y2 = this.a + " " + this.b;
                        this._SetState (4, true);
                    }
            },
            { // State 4
                source:         "/* End */",
                symbols:        ["a", "b", "y1", "y2"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    

    window.it001.gProgramRepository ["it001_Ex_06_330"] =
    {
        globals:
        {
            symbols: ["a", "b", "c", "d", "e", "y"]
        },
        transitionTable:
        [
            { // State 0
                source:         "a = \"My \";",
                symbols:        ["a", "b", "c", "d", "e", "y"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.a = "My ";
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "b = \"operator \";",
                symbols:        ["a", "b", "c", "d", "e", "y"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.b = "operator ";
                        this._SetState (2, false);
                    }
            },
            { // State 2
                source:         "c = \"is \";",
                symbols:        ["a", "b", "c", "d", "e", "y"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.c = "is ";
                        this._SetState (3, false);
                    }
            },
            { // State 3
                source:         "d = \"not \";",
                symbols:        ["a", "b", "c", "d", "e", "y"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.d = "not ";
                        this._SetState (4, false);
                    }
            },
            { // State 4
                source:         "e = \"working.\";",
                symbols:        ["a", "b", "c", "d", "e", "y"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.e = "working.";
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
                source:         "y  = a;",
                symbols:        ["a", "b", "c", "d", "e", "y"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.y = this.a;
                        this._SetState (7, false);
                    }
            },
            { // State 7
                source:         "y += b;",
                symbols:        ["a", "b", "c", "d", "e", "y"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.y += this.b;
                        this._SetState (8, false);
                    }
            },
            { // State 8
                source:         "y += c;",
                symbols:        ["a", "b", "c", "d", "e", "y"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.y += this.c;
                        this._SetState (9, false);
                    }
            },
            { // State 9
                source:         "y += d;",
                symbols:        ["a", "b", "c", "d", "e", "y"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.y += this.d;
                        this._SetState (10, false);
                    }
            },
            { // State 10
                source:         "y += e;",
                symbols:        ["a", "b", "c", "d", "e", "y"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.y += this.e;
                        this._SetState (11, true);
                    }
            },
            { // State 11
                source:         "/* End */",
                symbols:        ["a", "b", "c", "d", "e", "y"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    

    window.it001.gProgramRepository ["it001_Ex_06_340"] =
    {
        globals:
        {
            symbols: ["a", "b", "c", "y"]
        },
        transitionTable:
        [
            { // State 0
                source:         "a = \"I told you \";",
                symbols:        ["a", "b", "c", "y"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.a = "I told you ";
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "b = 123456;",
                symbols:        ["a", "b", "c", "y"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.b = 123456;
                        this._SetState (2, false);
                    }
            },
            { // State 2
                source:         "c = \" times \";",
                symbols:        ["a", "b", "c", "y"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.c = " times ";
                        this._SetState (3, false);
                    }
            },
            { // State 3
                source:         "y = a + b + c + \": Stop exaggerating!\";",
                symbols:        ["a", "b", "c", "y"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.y = this.a + this.b + this.c + ": Stop exaggerating!";
                        this._SetState (4, true);
                    }
            },
            { // State 4
                source:         "/* End */",
                symbols:        ["a", "b", "c", "y"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    


    window.it001.gProgramRepository ["it001_Ex_06_350"] =
    {
        globals:
        {
            symbols: ["a", "b"]
        },
        transitionTable:
        [
            { // State 0
                source:         "a = ( 5 > 10)  ?  \"Wow, big value!\"  :  \"My, what a small value!\";",
                symbols:        ["a", "b"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.a = (5 > 10) ? "Wow, big value!" : "My, what a small value!";
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "b = (20 > 10)  ?  \"Wow, big value!\"  :  \"My, what a small value!\";",
                symbols:        ["a", "b"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.b = (20 > 10) ? "Wow, big value!" : "My, what a small value!";
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
    


    window.it001.gProgramRepository ["it001_Ex_06_360"] =
    {
        globals:
        {
            symbols: ["a"]
        },
        transitionTable:
        [
            { // State 0
                source:         "a = 2 + 3 * 4;",
                symbols:        ["a"],
                comment:        "Multiplication operator has precedence over addition operator.",
                transition:
                    function ()
                    {
                        this.a = 2 + 3 * 4;
                        this._SetState (1, true);
                    }
            },
            { // State 1
                source:         "/* End */",
                symbols:        ["a"],
                comment:        "",
                transition:     function (){}
            }
        ]
    };
    

    window.it001.gProgramRepository ["it001_Ex_06_370"] =
    {
        globals:
        {
            symbols: ["a", "b"]
        },
        transitionTable:
        [
            { // State 0
                source:         "a = 2 + 3 * 4;",
                symbols:        ["a", "b"],
                comment:        "Normal priorities: Do multiplication, then addition.",
                transition:
                    function ()
                    {
                        a = 2 + 3 * 4;
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "b = (2 + 3) * 4;",
                symbols:        ["a", "b"],
                comment:        "Changed priorities",
                transition:
                    function ()
                    {
                        b = (2 + 3) * 4;
                        this._SetState (2, false);
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
});


/*
 
 [100]  x >>> 0 (right logical shift) coerces a number to unsigned integer. Solution courtesy http://stackoverflow.com/a/16155417

 */