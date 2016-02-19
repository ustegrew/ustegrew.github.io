/**
 *  @fileoverview        Data storage driver. This driver passes all data unmodified.
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
        var kClass = "TDriver"
        
        var TDriver;
        var ret;

        /**
         * Insert_explanation_here
         * 
         * @class       TChangeToClassName
         */
        TDriver = 
        {
            fStore:     null,
            
            Get: function (key)
            {
                throw kClass + "::Get (key): Must be overridden in sub class";
            },
            
            GetSize: function ()
            {
                var ret;
                
                ret = this.fStore.length;
                
                return ret;
            },
        
            HasKey: function (key)
            {
                var ret;
                
                ret = this.fStore.hasOwnProperty (key);
                
                return ret;
            },
            
            Remove: function (key)
            {
                this.fStore.removeItem (key);
            },
            
            Set: function (key, data)
            {
                throw kClass + "::Set (key, data): Must be overridden in sub class";
            },
            
            constructor: function ()
            {
                this.fStore = window.localStorage;
            }
        };
    
        ret = declare ("TDriver", [], TDriver);
    
        return ret;
    }
);
