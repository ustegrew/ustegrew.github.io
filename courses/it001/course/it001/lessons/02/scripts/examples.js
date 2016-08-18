/**
 *  @fileoverview        Program examples, chapter 2
 */
define (["course/it001/res/scripts/decl"], function ()
{
    console.log ("Adding examples: Lesson 02");
    
    window.it001.gProgramRepository ["it001_Ex_02_010"] =
    {
        globals:
        {
            symbols:    ["myValue"]
        },
        transitionTable:
        [
            { // State 0
                source:         "var myValue = 100;",
                symbols:        [],
                comment:        "Declare variable <tt>myValue</tt> and set it to 100.",
                transition:
                    function ()
                    {
                        this.myValue = 100;
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "if (myValue >= 100)",
                symbols:        ["myValue"],
                comment:        "If the value of <tt>myValue</tt> id greater than or equal to 100, then...",
                transition:
                    function ()
                    {
                        if (this.myValue >= 100)
                        {
                            this._SetState (2, false);
                        }
                        else
                        {
                            this._SetState (3, true);
                        }
                    }
            },
            { // State 2
                source:         "    console.log (\"Yikes! My value is too high!\");",
                symbols:        ["myValue"],
                comment:        "Prints \"Yikes! My value is too high!\" onto the console.",
                transition:
                    function ()
                    {
                        console.log ("Yikes! My value is too high!");
                        this._SetState (3, true);
                    }
            },
            { // State 3
                source:         "/* END */",
                symbols:        ["myValue"],
                comment:        "",
                transition:
                    function ()
                    {
                        /* Empty, as this state is terminal */
                    }
            }
        ]
    };
    
    window.it001.gProgramRepository ["it001_Ex_02_020"] =
    {
        globals:
        {
            symbols:    ["myValue"]
        },
        transitionTable:
        [
            { // State 0
                source:         "var myValue = 100;",
                symbols:        [],
                comment:        "Declare variable <tt>myValue</tt> and set it to 100.",
                transition:
                    function ()
                    {
                        this.myValue = 100;
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "if (myValue >= 100)",
                symbols:        ["myValue"],
                comment:        "If the value of <tt>myValue</tt> id greater than or equal to 100, then...",
                transition:
                    function ()
                    {
                        if (this.myValue >= 100)
                        {
                            this._SetState (2, false);
                        }
                        else
                        {
                            this._SetState (3, true);
                        }
                    }
            },
            { // State 2
                source:         "    window.alert (\"Yikes! My value is too high!\");",
                symbols:        ["myValue"],
                comment:        "Show message box with message \"Yikes! My value is too high!\".",
                transition:
                    function ()
                    {
                        window.alert ("Yikes! My value is too high!");
                        this._SetState (3, true);
                    }
            },
            { // State 3
                source:         "/* END */",
                symbols:        ["myValue"],
                comment:        "",
                transition:
                    function ()
                    {
                        /* Empty, as this state is terminal */
                    }
            }
        ]
    };
    
    window.it001.gProgramRepository ["it001_Ex_02_030"] =
    {
        globals:
        {
            symbols:    ["myValue"]
        },
        transitionTable:
        [
            { // State 0
                source:         "var myValue = 100;",
                symbols:        [],
                comment:        "Declare variable <tt>myValue</tt> and set it to 100.",
                transition:
                    function ()
                    {
                        var e;

                        /* Clear output element (in case user steps backwards) */
                        e = document.getElementById ("it001_output_Ex_02_03");
                        e.innerHTML = "Output will appear here.";

                        this.myValue = 100;
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "if (myValue >= 100)",
                symbols:        ["myValue"],
                comment:        "If the value of <tt>myValue</tt> id greater than or equal to 100, then...",
                transition:
                    function ()
                    {
                        var e;

                        /* Clear output element (in case user steps backwards) */
                        e = document.getElementById ("it001_output_Ex_02_03");
                        e.innerHTML = "Output will appear here.";
                        if (this.myValue >= 100)
                        {
                            this._SetState (2, false);
                        }
                        else
                        {
                            this._SetState (3, true);
                        }
                    }
            },
            { // State 2
                source:         "    document.getElementById (\"output\").innerHTML =\"Yikes! My value is too high!\";",
                symbols:        ["myValue"],
                comment:        "Set content of <tt>&lt;pre id=\"output\"&gt;</tt> element to \"Yikes! My value is too high!\".",
                transition:
                    function ()
                    {
                        var e;

                        e           = document.getElementById ("it001_output_Ex_02_03");
                        e.innerHTML = "Yikes! myValue is too high!";
                        this._SetState (3, true);
                    }
            },
            { // State 3
                source:         "/* END */",
                symbols:        ["myValue"],
                comment:        "",
                transition:
                    function ()
                    {
                        /* Empty, as this state is terminal */
                    }
            }
        ]
    };
    
    window.it001.gProgramRepository ["it001_Ex_02_040"] =
    {
        globals:
        {
            symbols:    ["inputElement", "text"]
        },
        transitionTable:
        [
            { // State 0
                source:         "var inputElement;",
                symbols:        [],
                comment:        "Declare variable <tt>inputElement</tt>",
                transition:
                    function ()
                    {
                        this.inputElement = "undefined";
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "var text;",
                symbols:        ["inputElement"],
                comment:        "Declare variable <tt>text</tt>.",
                transition:
                    function ()
                    {
                        this.text = "undefined";
                        this._SetState (2, false);
                    }
            },
            { // State 2
                source:         "",
                symbols:        ["inputElement", "text"],
                comment:        "Just an empty line to make the code easier to read.",
                transition:
                    function ()
                    {
                        this._SetState (3, false);
                    }
            },
            { // State 3
                source:         "inputElement = document.getElementById (\"input\");",
                symbols:        ["inputElement", "text"],
                comment:        "Assign text box reference and assign it to the variable <tt>inputElement</tt>.",
                transition:
                    function ()
                    {
                        this.inputElement = "<tt>&lt;input type=\"text\" id=\"input\"&gt;</tt>";
                        this._SetState (4, false);
                    }
            },
            { // State 4
                source:         "text         = inputElement.value;",
                symbols:        ["inputElement", "text"],
                comment:        "Read the content from the text box and assign the content to the variable <tt>text</tt>.",
                transition:
                    function ()
                    {
                        var e;

                        e           = document.getElementById ("it001_input_Ex_02_040");
                        this.text   = e.value;
                        this._SetState (5, false);
                    }
            },
            { // State 5
                source:         "window.alert (text);",
                symbols:        ["inputElement", "text"],
                comment:        "Show message box with retrieved content as message.",
                transition:
                    function ()
                    {
                        window.alert (this.text);
                        this._SetState (6, true);
                    }
            },
            { // State 6
                source:         "/* End */",
                symbols:        ["inputElement", "text"],
                comment:        "",
                transition:
                    function ()
                    {
                        this.inputElement = 0;
                        this._SetState (x, false);
                    }
            }
        ]
    };
});
