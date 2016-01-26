/*global Print: false  */ /* Silence JSLint */

function Exec_01 ()
{
    var n;                          /* Variable declaration                  */
    var r = 20;                     /* Variable declaration and definition   */
    n = 100;                        /* Simple assignment                     */
    n = 2 * r;                      /* Assignment with multiplication term   */
    r = Math.sqrt (16)              /* Assignment with function call         */
    if (r == 10) r = 0;             /* Control flow statement                */
   
    Print (1, "Hello World");
}

function Exec_05 ()
{
    var a = 10;
    var b =  0;
    
    /* Conditional execution */
    if (a < 5)
        b = 1;
    else
        b = 2;
        
    Print (5, "b = " + b);
}

function Exec_07_CheckValue (x)
{
    if (x < 10)
        Print (7, "Love the number " + x + "!");
    else
        Print (7, "You doofus! I hate the number " + x + "!");
}

function Exec_07 ()
{
    Exec_07_CheckValue (5);
    Exec_07_CheckValue (20);
}
