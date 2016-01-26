/*global document: false    */
/*global console: false     */
/*global window: false      */

function Exec_03_01 ()
{
    var myValue         = 100;
    var outputElement   = document.getElementById ("Ex_03_01_output");
    
    if (myValue >= 100)
        console.log ("Yikes! myValue is too high!");
}

function Exec_03_02 ()
{
    var myValue         = 100;

    if (myValue >= 100)
        window.alert ("Yikes! myValue is too high!");
}

function Exec_03_03 ()
{
    var myValue         = 100;
    var outputElement   = document.getElementById ("Ex_03_03_output");
    
    if (myValue >= 100)
    {
        outputElement.innerHTML = "Yikes! myValue is too high!";
    }
}

function Exec_04_01 ()
{
    var inputElement;
    var text;
    
    inputElement = document.getElementById ("Ex_04_01_txtInput");
    text         = inputElement.value;
    window.alert (text);
}