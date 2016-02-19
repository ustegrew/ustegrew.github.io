/**
 *  @fileoverview        Data storage driver. This driver passes all data unmodified.
 */
define 
(
    [
        "dojo/_base/declare",
        "./TDriver"
    ],
    function 
    (
        declare,
        TDriver
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
            Get: function (key)
            {
                var ret;
                
                ret = this.fStore.getItem (key);
                
                return ret;
            },
        
            Set: function (key, data)
            {
                this.fStore.setItem (key, data);
            }
        };
    
        ret = declare ("TDriverAllpass", [TDriver], TDriverAllpass);
    
        return ret;
    }
);
