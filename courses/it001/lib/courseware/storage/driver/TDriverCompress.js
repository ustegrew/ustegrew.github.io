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
        var TDriverCompress;
        var ret;

        /**
         * Insert_explanation_here
         * 
         * @class       TChangeToClassName
         */
        TDriverCompress = 
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
            },
        };
    
        ret = declare ("TDriverCompress", [TDriver], TDriverCompress);
    
        return ret;
    }
);
