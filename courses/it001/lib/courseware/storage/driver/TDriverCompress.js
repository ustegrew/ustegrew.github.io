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
        var TDriverAllpass;
        var ret;

        /**
         * Insert_explanation_here
         * 
         * @class       TChangeToClassName
         */
        TDriverAllpass = 
        {
            Haskey: function (key)
            {
                var ret;
                
                ret = this.fStore.HasKey (key);
                
                return ret;
            },
            
            Get: function (id)
            {
                var ret;
                
                ret = this.fStore.Get (id);
                
                return ret;
            },
        
            Set: function (id, data)
            {
                this.fStore.Set (id, data);
            },
            
            constructor: function (store)
            {
                this.fStore = store;
            }
        };
    
        ret = declare ("TDriverAllpass", [], TDriverAllpass);
    
        return ret;
    }
);
