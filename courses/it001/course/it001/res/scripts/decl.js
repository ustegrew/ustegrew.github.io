/**
 *  @fileoverview        Global declarations
 */
define ([], function ()
{
    /* Declares some global properties so we don't need to do it in the resp.
     * chapter's example scripts. Must be included before any of the example 
     * scripts are included.
     */
    
    if (! window.hasOwnProperty ("it001"))
    {
        window.it001 = {};
    }

    if (! window.it001.hasOwnProperty ("gProgramRepository"))
    {
        window.it001.gProgramRepository = {};
    }

    window.it001.gProgramRepository ["notImpl"] =
    {
        globals:
        {
            symbols:    ["stillBeingDeveloped", "mustTellUser", "nowDefinitelyTelling"]
        },
        transitionTable:
        [
            { // State 0
                source:         "var stillBeingDeveloped = true;",
                symbols:        [],
                comment:        "...",
                transition:
                    function ()
                    {
                        this.stillBeingDeveloped = true;
                        this._SetState (1, false);
                    }
            },
            { // State 1
                source:         "var mustTellUser = true;",
                symbols:        ["stillBeingDeveloped"],
                comment:        "... Pssst ... Must tell the user this example isn't working yet...",
                transition:
                    function ()
                    {
                        this.mustTellUser = true;
                        this._SetState (2, false);
                    }
            },
            { // State 2
                source:         "var nowDefinitelyTelling = true;",
                symbols:        ["stillBeingDeveloped", "mustTellUser"],
                comment:        "<img src='course/it001/res/img/misc/alarm-clock.png'/>" +
                                "<span style='position:relative;left:10px;top:-35px;color:blue;'>THIS EXAMPLE ISN'T WORKING YET.</span>",
                transition:
                    function ()
                    {
                        this.nowDefinitelyTelling = true;
                        this._SetState (3, true);
                    }
            },
            { // State 3
                source:         "",
                symbols:        ["stillBeingDeveloped", "mustTellUser", "nowDefinitelyTelling"],
                comment:        "THIS EXAMPLE ISN'T WORKING YET.<br/><img src='course/it001/res/img/misc/alarm-clock.png'/>",
                transition:
                    function ()
                    {
                    }
            }
        ]
    };
});

/*  
 
 [10]   
 
 */