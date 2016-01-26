/*global console: false */
/*global window: false */
/*global Print: false  */ /* Silence JSLint */

var kNBits = 32;

function DoComparison (a, b, type, text)
{
    var y;
    var msg;
    
    switch (type)
    {
        case 0:
            y = (a == b);
            break;
        case 1:
            y = (a === b);
            break;
        case 2:
            y = (a != b);
            break;
        case 3:
            y = (a !== b);
            break;
        case 4:
            y = (a > b);
            break;
        case 5:
            y = (a >= b);
            break;
        case 6:
            y = (a < b);
            break;
        case 7:
            y = (a <= b);
            break;
    }
    
    msg = text + ": " + y;
    console.log (msg);
}

function GetBinStr (x, nBits)
{
    var x0;
    var x1;
    var i;
    var ret;
    
    x0  = x;
    ret = "";
    for (i = 0; i < nBits; i++)
    {
        x1  = x0 & 1;
        ret = "" + x1 + ret; /* "" because we want to force ret to type string */
        x0  = x0 >>> 1;
    }
    
    return ret;
}

function Exec_01 ()
{
    var a, alpha, b, c, d, e;
    alpha = 1.2;
    
    a = 3;                              /* Simple assignment */
    b = 2 + 5;
    c = a * 4 + 28;
    d = Math.random ();                 /* Function call     */
    e = Math.sin (alpha * 3.14 / 180);
}

function Exec_0010 ()
{
    var a;
    
    a = 2 + 3;
    a = a + 5;
    a = a + a;
}

function Exec_0020 ()
{
    var a;
    
    a = 3 - 1;
    a = a - 1;
    a = a - a;
}

function Exec_0030 ()
{
    var a;
    
    a = 5 * 4;
    a = a * 2;
    a = a * a;
}

function Exec_0040 ()
{
    var a;
    
    a =  1 /  2;
    a =  1 /  0;
    a =  1 / -0;
    a = -1 /  0;
    a = -1 / -0;
}

function Exec_0050 ()
{
    var a;
    
    a = -3;
    a = -a;
}

function Exec_0060 ()
{
    var a;
    var b;
    
    a = 5;
    b = a++;
}

function Exec_0070 ()
{
    var a;
    var b;
    
    a = 5;
    b = ++a;
}

function Exec_0080 ()
{
    var a;
    var b;
    
    a = 5;
    b = a--;
}

function Exec_0090 ()
{
    var a;
    var b;
    
    a = 5;
    b = --a;
}

function Exec_0100 ()
{
    var a;
    
    a =  6 %  3;
    a = -6 %  3;
    a =  6 % -3;
    a = -6 %  3;
    a =  6 %  3;
    a = -6 %  3;
    a =  6 % -3;
    a = -6 %  3;
}

function Exec_0200 ()
{
    var a;
    var out;
    
    out = "  9      = " + GetBinStr (  9, kNBits);
    console.log (out);
    
    out = " -9      = " + GetBinStr ( -9, kNBits);
    console.log (out);
    
    out = " 14      = " + GetBinStr ( 14, kNBits);
    console.log (out);
    
    out = "-14      = " + GetBinStr (-14, kNBits);
    console.log (out);
    
    a   =   9 &  14;
    out = " 9 &  14 = " + GetBinStr (a, kNBits);
    console.log (out);
    
    a   =  -9 &  14;
    out = "-9 &  14 = " + GetBinStr (a, kNBits);
    console.log (out);
    
    a   =   9 & -14;
    out = " 9 & -14 = " + GetBinStr (a, kNBits);
    console.log (out);
    
    a   =  -9 & -14;
    out = "-9 & -14 = " + GetBinStr (a, kNBits);
    console.log (out);
}

function Exec_0210 ()
{
    var a;
    var out;
    
    out = "  9      = " + GetBinStr (  9, kNBits);
    console.log (out);
    
    out = " -9      = " + GetBinStr ( -9, kNBits);
    console.log (out);
    
    out = " 14      = " + GetBinStr ( 14, kNBits);
    console.log (out);
    
    out = "-14      = " + GetBinStr (-14, kNBits);
    console.log (out);
    
    a   =   9 |  14;
    out = " 9 |  14 = " + GetBinStr (a, kNBits);
    console.log (out);
    
    a   =  -9 |  14;
    out = "-9 |  14 = " + GetBinStr (a, kNBits);
    console.log (out);
    
    a   =   9 | -14;
    out = " 9 | -14 = " + GetBinStr (a, kNBits);
    console.log (out);
    
    a   =  -9 | -14;
    out = "-9 | -14 = " + GetBinStr (a, kNBits);
    console.log (out);
}

function Exec_0220 ()
{
    var a;
    var out;
    
    out = "  9      = " + GetBinStr (  9, kNBits);
    console.log (out);
    
    out = " -9      = " + GetBinStr ( -9, kNBits);
    console.log (out);
    
    out = " 14      = " + GetBinStr ( 14, kNBits);
    console.log (out);
    
    out = "-14      = " + GetBinStr (-14, kNBits);
    console.log (out);
    
    a   =   9 ^  14;
    out = " 9 ^  14 = " + GetBinStr (a, kNBits);
    console.log (out);
    
    a   =  -9 ^  14;
    out = "-9 ^  14 = " + GetBinStr (a, kNBits);
    console.log (out);
    
    a   =   9 ^ -14;
    out = " 9 ^ -14 = " + GetBinStr (a, kNBits);
    console.log (out);
    
    a   =  -9 ^ -14;
    out = "-9 ^ -14 = " + GetBinStr (a, kNBits);
    console.log (out);
}

function Exec_0230 ()
{
    var a;
    var out;
    
    out = "  9   = " + GetBinStr ( 9, kNBits);
    console.log (out);
    
    out = " -9   = " + GetBinStr (-9, kNBits);
    console.log (out);
    
    a   =  ~( 9);
    out = "~( 9) = " + GetBinStr (a, kNBits);
    console.log (out);
    
    a   =  ~(-9);
    out = "~(-9) = " + GetBinStr (a, kNBits);
    console.log (out);
}

function Exec_0240 ()
{
    var a;
    var out;
    
    out = "  9     = " + GetBinStr (  9, kNBits);
    console.log (out);
    
    out = " -9     = " + GetBinStr ( -9, kNBits);
    console.log (out);
    
    a   =   9 << 2;
    out = " 9 << 2 = " + GetBinStr (a, kNBits);
    console.log (out);
    
    a   =  -9 << 2;
    out = "-9 << 2 = " + GetBinStr (a, kNBits);
    console.log (out);
}

function Exec_0250 ()
{
    var a;
    var out;
    
    out = "  9     = " + GetBinStr (  9, kNBits);
    console.log (out);
    
    out = " -9     = " + GetBinStr ( -9, kNBits);
    console.log (out);
    
    a   =   9 >> 2;
    out = " 9 >> 2 = " + GetBinStr (a, kNBits);
    console.log (out);
    
    a   =  -9 >> 2;
    out = "-9 >> 2 = " + GetBinStr (a, kNBits);
    console.log (out);
}

function Exec_0260 ()
{
    var a;
    var out;
    
    out = "  9      = " + GetBinStr (  9, kNBits);
    console.log (out);
    
    out = " -9      = " + GetBinStr ( -9, kNBits);
    console.log (out);
    
    a   =   9 >>> 2;
    out = " 9 >>> 2 = " + GetBinStr (a, kNBits);
    console.log (out);
    
    a   =  -9 >>> 2;
    out = "-9 >>> 2 = " + GetBinStr (a, kNBits);
    console.log (out);
}

function Exec_290 ()
{
    var a = 10;
    var b =  5;
    var c;
    var d;
    
    c = (a >  b);
    d = (a == b);
    console.log (a + " >  " + b + ": " + c);
    console.log (a + " == " + b + ": " + d);
}

function Exec_0300 ()
{
    DoComparison (1,            1,      0, "  1  == 1"     );
    DoComparison ("1",          1,      0, "\"1\"  == 1"   );
    DoComparison (1.0,          1,      0, "1.0  == 1"     );
}

function Exec_0310 ()
{
    DoComparison (1,    1,      1, "  1 === 1"     );
    DoComparison ("1",  1,      1, "\"1\" === 1"   );
    DoComparison (1.0,  1,      1, "1.0 === 1"     );
}

function Exec_0320 ()
{
    DoComparison (1,    1,      2, "  1  != 1"     );
    DoComparison ("1",  1,      2, "\"1\"  != 1"   );
    DoComparison (1.0,  1,      2, "1.0  != 1"     );
    DoComparison (1,    2,      2, "  1  != 2"     );
    DoComparison ("1",  2,      2, "\"1\"  != 2"   );
    DoComparison (1.0,  2,      2, "1.0  != 2"     );
}

function Exec_0330 ()
{
    DoComparison (1,    1,      3, "  1 !== 1"     );
    DoComparison ("1",  1,      3, "\"1\" !== 1"   );
    DoComparison (1.0,  1,      3, "1.0 !== 1"     );
    DoComparison (1,    2,      2, "  1 !== 2"     );
    DoComparison ("1",  2,      2, "\"1\" !== 2"   );
    DoComparison (1.0,  2,      2, "1.0 !== 2"     );
}

function Exec_0340 ()
{
    DoComparison (3,    4,      4, "  3   > 4"     );
    DoComparison (4,    4,      4, "  4   > 4"     );
    DoComparison (5,    4,      4, "  5   > 4"     );
}

function Exec_0350 ()
{
    DoComparison (3,    4,      5, "  3  >= 4"     );
    DoComparison (4,    4,      5, "  4  >= 4"     );
    DoComparison (5,    4,      5, "  5  >= 4"     );
}

function Exec_0360 ()
{
    DoComparison (3,    4,      6, "  3   < 4"     );
    DoComparison (4,    4,      6, "  4   < 4"     );
    DoComparison (5,    4,      6, "  5   < 4"     );
}

function Exec_0370 ()
{
    DoComparison (3,    4,      7, "  3  <= 4"     );
    DoComparison (4,    4,      7, "  4  <= 4"     );
    DoComparison (5,    4,      7, "  5  <= 4"     );
}

function Exec_0400 ()
{
    var a = true;
    var b = true;
    var c = false;
    var d = (3 < 4);
    var e = (4 < 3);
    var y1;
    var y2;
    var y3;
    var y4;
    
    y1 = a && b;    // true
    y2 = a && c;    // false
    y3 = a && d;    // true
    y4 = a && e;    // false
}

function Exec_0410 ()
{
    var a = true;
    var b = true;
    var c = false;
    var d = (3 < 4);
    var e = (4 < 3);
    var y1;
    var y2;
    var y3;
    var y4;
    var y5;
    
    y1 = a || b;    // true
    y2 = a || c;    // true
    y3 = a || d;    // true
    y4 = a || e;    // true
    y5 = c || e;    // false;
}

function Exec_0420 ()
{
    var a = true;
    var b = false;
    var y1;
    var y2;
    
    y1 = !a;        // false
    y2 = !b;        // true
}

function Exec_0500 ()
{
    var a = "opera"
    var b = "tor";
    var y1;
    var y2;
    
    y1 = a + b;         // "operator"
    y2 = a + " " + b;   // "opera tor"
}

function Exec_0510 ()
{
    var a = "My "
    var b = "operator ";
    var c = "is ";
    var d = "not ";
    var e = "working.";
    var y1;
    
    y1  = a;            // "My "
    y1 += b;            // "My operator "
    y1 += c;            // "My operator is "
    y1 += d;            // "My operator is not "
    y1 += e;            // "My operator is not working."
}

function Exec_0520 ()
{
    var a = "I told you ";
    var b = 123456;
    var c = " times ";
    var y;
    
    y = a + b + c + ": Stop exaggerating!";
    Print (1, y);
}

function Exec_0600 ()
{
    var a =  5;
    var b = 20;
    var y;
    
    y = (a > 10) ? "Wow, big value!" :  "My, what a small value!";
    console.log (y);
    
    y = (b > 10) ? "Wow, big value!" :  "My, what a small value!";
    console.log (y);
}