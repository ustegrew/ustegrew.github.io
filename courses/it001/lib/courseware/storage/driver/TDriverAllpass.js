/**
 *  @fileoverview        Data storage driver, passes data unmodified.
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
         * The allpass driver. Passes all data unmodified.
         * 
         * @class       TDriverAllpass
         */
        TDriverAllpass = 
        {
            /**
             * Returns the value stored with the given <code>key</code>.
             * 
             * @param   {String}    key     The key we want to retrieve the value of.
             * @returns {String}    The value associated with the given <code>key</code>.
             */
            Get: function (key)
            {
                var ret;
                
                ret = this.fStore.getItem (key);
                
                return ret;
            },
        
            /**
             * Updates or adds the given <code>key</code>/<code>value</code> pair.
             * 
             * @param {String}      key     The key we want to store the value as.
             * @param {String}      value   The value to be stored.
             */
            Set: function (key, value)
            {
                this.fStore.setItem (key, value);
            }
        };
    
        ret = declare ("TDriverAllpass", [TDriver], TDriverAllpass);
    
        return ret;
    }
);
