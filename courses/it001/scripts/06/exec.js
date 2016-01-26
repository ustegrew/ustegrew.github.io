/* global console, window: false */         /* Silence JSLint */

function Exec_0100 ()
{
    /*
     * For each second in 0, 1, 2, ..., 10 we compute 
     * the distance a vehicle will have travelled at 
     * a constant speed of 30 m/s.
     */
     
    var v = 30;
    var t;
    var x;
    var msg;
     
    for (t = 0; t <= 10; t++)
    {
        x   = v * t;
        msg = "After " + t + " seconds, the vehicle will have travelled " + x + " meters.";
        console.log (msg);
    }
}

function Exec_0110 ()
{
    var a;
    var b;
    var c;
    var d;

    a = 0;    
    if (a == 0)
    {
        b = "here is ";
        c = "a block ";
        d = "of statements.";
        console.log ("a is 0, so " + b + c + d);
    }
}

function Exec_0120 ()
{
    var a;
    var b;
    
    a = 1;
    if (a == 0)
        b = 5;
        console.log ("b has changed to " + b);
}

function Exec_0130 ()
{
    var a;
    
    a = 5;
    if (a == 0);
    {
        window.alert ("Yayy, a is zero!");
    }
}

function Exec_0140 ()
{
    var a;
    var b;
    var c;
    var d;
    
    a = 0;
    if (a == 0)
    {
        b = "here is ";
        c = "a block ";
        d = "of statements.";
        console.log ("a is 0, so " + b + c + d);
    }
}

function Exec_0150 ()
{
    var a;
    var b;
    var c;
    var d;
    
    a = -1;
    if (a == 0)
    {
        b = "here is ";
        c = "a block ";
        d = "of statements.";
        console.log ("a is 0, so " + b + c + d);
    }
    else
    {
        b = "here is ";
        c = "another block ";
        d = "of statements.";
        console.log ("a is NOT 0, so " + b + c + d);
    }
}

function Exec_0160 ()
{
    var a;
    
    a = 1;
    if (a == -1)
    {
        console.log ("freezing!");
    }
    else if (a == 0)
    {
        console.log ("still freezing!");
    }
    else if (a >= 1)
    {
        console.log ("That's better!");
    }
    else
    {
        console.log ("I'm confused...");
    }
}

function Exec_0170 ()
{
    var a;
    
    a = 1;
    switch (a)
    {
        case 0:
            console.log ("Zero");
            break;
        case 1:
            console.log ("One");
            break;
        case 5:
            console.log ("Five");
            break;
    }
}

function Exec_0180 ()
{
    var a;
    
    a = 1;
    if (a === 0)
    {
        console.log ("Zero");
    }
    else if (a === 1)
    {
        console.log ("One");
    }
    else if (a === 5)
    {
        console.log ("Five");
    }    
}

function Exec_0190 ()
{
    var a;
    
    a = 1;
    switch (a)
    {
        case 0:
            console.log ("zero");
            break;
        case 1:
        case 2:
            console.log ("one or two");
    }    
}

function Exec_0200 ()
{
    var a;
    
    a = 1;
    if (a === 0)
    {
        console.log ("zero");
    }
    else if ((a === 1)  ||  (a === 2))
    {
        console.log ("one or two");
    }
}

function Exec_0210 ()
{
    var a;
    
    a = 1;
    switch (a)
    {
        case 0:
            console.log ("zero");
        case 1:
            console.log ("one");
        case 2:
            console.log ("two");
        case 3:
            console.log ("three");
    }
}

function Exec_0220 ()
{
    var a;
    
    a = 10;
    switch (a)
    {
        case 0:
            console.log ("zero");
            break;
        case 1:
            console.log ("one");
            break;
        case 2:
            console.log ("two");
            break;
        case 3:
            console.log ("three");
            break;
        default:
            console.log ("unknown number");
    }
}

function Exec_0230 ()
{
    var x;
    var y;
    
    /* Prints the squares of all values in [1, 3] to the console. */
    for (x = 1; x <= 3; x++)
    {
        y = x * x;
        console.log ("x = " + x + ", y = " + y);
    }
}

function Exec_0240 ()
{
    var x = [15, 20, 13, 25, 7, 9, 18];
    var i;
    var n;
    var sum;
    var avg;
    
    n   = x.length;
    sum = 0;
    for (i = 0; i < n; i++)
    {
        sum += x [i];
    }
    avg = sum / n;
    
    console.log ("Average value: " + avg);
}

function Exec_0250 ()
{
    /* Prints the squares of all values in [1, 3] to the console. */
    var x;
    var y;

    x = 1;
    while (x <= 3)
    {
        y = x * x;
        console.log ("x = " + x + ", y = " + y);
        
        x++;
    }
}

function Exec_0260 ()
{
    var num = 6;
    var bit;
    var out;
    
    out = "";
    while (num >= 1)
    {
        bit  = num & 1;
        num = num >>> 1;
        out  = "" + bit + out;
    }
    console.log (out);
}

function Exec_0270 ()
{
    /* Prints the squares of all values in [1, 3] to the console. */
    var x;
    var y;
    
    x = 1;
    do
    {
        y = x * x;
        console.log ("x = " + x + ", y = " + y);
        
        x++;
    }
    while (x <= 3);
}

function Exec_0280 ()
{
    var seed = 5323;
    var rnd;
    var count;
    
    count = 0;
    do
    {
        seed = 8253729 * seed + 2396403;
        rnd  = seed % 32767;
        count++;
    }
    while (rnd >= 1000);
    console.log ("Number of iterations until rnd <= 1000: " + count);
}

function Exec_0290 ()
{
    var a;
    
    a = 10;
    while (a >= 1)
    {
        a--;
        if (a <= 8)
        {
            break;
        }
    }
}

function Exec_ ()
{
    
}

function Exec_ ()
{
    
}

function Exec_ ()
{
    
}

function Exec_ ()
{
    
}

function Exec_ ()
{
    
}

function Exec_ ()
{
    
}

function Exec_ ()
{
    
}

function Exec_ ()
{
    
}

function Exec_ ()
{
    
}

function Exec_ ()
{
    
}

function Exec_ ()
{
    
}

function Exec_ ()
{
    
}

function Exec_ ()
{
    
}

function Exec_ ()
{
    
}

function Exec_ ()
{
    
}

function Exec_ ()
{
    
}

