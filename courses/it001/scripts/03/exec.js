/* Silence JSLint       */
/*global window:false   */
/*global console: false */
function Exec_01 ()
{
    /* Variable x has not been declared yet. */
    console.log ("Variable x before declaration: " + x);
    
    /* Variable x is declared. */
    var x;
    console.log ("Variable x after declaration: " + x);
    
    /* Variable x is defined. */
    x = 3;
    console.log ("Variable x after definition: " + x);
}

function Exec_02 ()
{
    var x = 0;
    var y = 0;
    
    /* Expression for a parabole f(x) = 3*x*x + 2 with x = 23 */
    x = 23;
    y = 3 * x * x + 2; /* The expression */
    
    console.log ("f(x) =  3*x*x + 2     ---->     f (" + x + ") = " + y);
}

function a ()
{
    console.log ("Executing function a ()");
}

function Exec_03 ()
{
    console.log ("About to call function a ()");
    a ();
    console.log ("Returned from function a ()");
}

function Exec_04 ()
{
    var x = 10;
    var b =  0;
    
    if (x >= 5)
    {
        b = 1;
    }
    else
    {
        b = 2;
    }
    
    console.log (b);
}

function Exec_10 ()
{
    // This is a one line comment
    
    var a = 3;
    // var b = 4;   Commenting out a line is a great debugging tool!
    
    console.log ("Type of a: " + typeof (a));
    console.log ("Type of b: " + typeof (b));
}

function Exec_11 ()
{
    /* A multiline comment used on one line */
    
    /* A multiline comment
       spanning
       several
       lines
     */
    
    var a = 3; /* This will execute */
    
    /*
    Commenting out a chunk of code is a great debugging tool!
     
    var b = 4;
    var iWantThisVariable = 5;
     */
    
    console.log ("Type of a: " + typeof (a));
    console.log ("Type of b: " + typeof (b));
    console.log ("Type of iWantThisVariable: " + typeof (b));
}
