/* Silence JSLint */
/*global console:false */

function Exec_01 ()
{
    /* Declare variable x. */
    var x;
    
    
    /* 
     * At this point, the variable x is just declared, 
     * but not yet defined.
     */
    console.log ("x: " + x);
    
    
    /* Define variable x to have the value 3 */
    x = 3;
    
    
    /* 
     * Now the variable x is defined.
     */
    console.log ("x: " + x);
}

function Exec_02 ()
{
    var x = 3;
    
    /* Variable x is declared AND defined. */
    console.log ("x: " + x);
}

function Exec_03 ()
{
    var x = 3;
    console.log ("x = 3,         type of x is: " + typeof (x));
    
    x = 3.2;
    console.log ("x = 3.2,       type of x is: " + typeof (x));
    
    x = "Hello";
    console.log ("x = 'Hello',   type of x is: " + typeof (x));
    
    x = true;
    console.log ("x = true,      type of x is: " + typeof (x));
    
    x = undefined;
    console.log ("x = undefined, type of x is: " + typeof (x));
    
    x = null;
    console.log ("x = null,      type of x is: " + typeof (x));
}

function Exec_04 ()
{
    var x = [15, true, "I am element #2", null];
    console.log ("x: " + typeof (x[0]) + ", " + typeof (x[1]) + ", " + typeof (x[2]) + ", " + typeof (x[3]));
}

function Exec_042 ()
{
    var x = [1, , 2];
    console.log (x [1]);
}

function Exec_045 ()
{
    var a = [];                 /* Empty array                                          */
    var b = [20];               /* Array with  one element                              */
    var c = [1, "Hello"]        /* Array with two elements, each of a different type    */
    var d = [ [1, 2], [5, 6] ]  /* Array with two sub arrays as elements                */
    console.log (a);
    console.log (b);
    console.log (c);
    console.log (d);
}

function Exec_05 ()
{
    var x = [10, 25, 16, 45];
    console.log ("x: " + x [0] + ", " + x [1] + ", " + x [2] + ", " + x [3]);
    
    x [0] = 98765432;
    console.log ("x: " + x [0] + ", " + x [1] + ", " + x [2] + ", " + x [3]);
}

function Exec_06 ()
{
    var x = [5, 1, 3, 7, 2, 9, 3];
    console.log ("number of elements stored in array x: " + x.length);
}