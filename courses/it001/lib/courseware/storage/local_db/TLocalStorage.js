/**
 *  @fileoverview        Insert_here
 */
define 
(
    [
        "dojo/_base/declare"
    ],
    function 
    (
        declare
    )
    {
        var TLocalStorage;
        var ret;

        /**
         * Accessor to the global window.localStorage object. 
         * 
         * @class       TLocalStorage
         */
        TLocalStorage = 
        {
            GetEntry: function (key)
            {

            },
            
            GetSize: function ()
            {
                return this.fLS.length;
            },
            
            HasKey: function (key)
            {
                var ret;
                
                ret = this.fLS.hasOwnProperty (key);
                
                return ret;
            },
            
            constructor: function ()
            {
                this.fLS = window.localStorage;
            }
        };
    
        ret = declare ("TLocalStorage", [], TLocalStorage);
    
        return ret;
    }
);
