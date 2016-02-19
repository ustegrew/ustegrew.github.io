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
            
            HasKey: function (key)
            {
                var ret;
                
                ret = this.fStore.HasKey (key);
                
                return ret;
            },
            
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
        
            Set: function (key, data)
            {
                throw kClass + "::Set (key, data): Must be overridden in sub class";
            },
            
            constructor: function (store)
            {
                this.fStore = store;
            }
        };
    
        ret = declare ("TDriver", [], TDriver);
    
        return ret;
    }
);
