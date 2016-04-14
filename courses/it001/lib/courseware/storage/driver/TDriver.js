/**
 *  @fileoverview        Data storage driver, abstract base class.
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
        /**
         * Class ID
         * 
         * @type String
         */
        var kClass = "TDriver"
        
        var TDriver;
        var ret;

        /**
         * <code>localStorage</code> drivers (abstract base class). Provides the 
         * API for the localStorage layer. Sub classes must override the 
         * {@link TDriver.Get} and {@link TDriver.Set} methods.
         * 
         * @class       TDriver.
         */
        TDriver = 
        {
            /**
             * The system's localStorage object.
             * 
             * @type window.localStorage
             * @private
             */
            fStore:     null,
            
            /**
             * Returns the value stored with the given <code>key</code>.<br/>
             * Please note: Concrete sub classes must override this method.
             * 
             * @param   {String}    key     The key we want to retrieve the value of.
             * @returns {String}    The value associated with the given <code>key</code>.
             */
            Get: function (key)
            {
                throw kClass + "::Get (key): Must be overridden in sub class";
            },
            
            /**
             * Returns the number of data items stored in the localStore.
             * 
             * @returns {integer}       The number of stored items in the localStore.
             */
            GetSize: function ()
            {
                var ret;
                
                ret = this.fStore.length;
                
                return ret;
            },
        
            /**
             * Returns <code>true</code> the localStorage contains a key/value 
             * pair with the given <code>key</code>, <code>false</code> otherwise.
             * 
             * @param   {String}    key     The key being looked up.
             * @returns {boolean}   <code>true</code> if a value with the given 
             *                      <code>key</code> exists, <code>false</code> 
             *                      otherwise.
             */
            HasKey: function (key)
            {
                var ret;
                
                ret = this.fStore.hasOwnProperty (key);
                
                return ret;
            },
            
            /**
             * Removes the key/value pair with the given <code>key</code> from 
             * the localStorage.
             * 
             * @param   {String}    key     The key we want to remove the value of.
             */
            Remove: function (key)
            {
                this.fStore.removeItem (key);
            },
            
            /**
             * Updates or adds the given <code>key</code>/<code>value</code> pair.<br/>
             * Please note: Concrete sub classes must override this method.
             * 
             * @param {String}      key     The key we want to store the value as.
             * @param {String}      value   The value to be stored.
             */
            Set: function (key, value)
            {
                throw kClass + "::Set (key, value): Must be overridden in sub class";
            },
            
            /**
             * cTor.
             */
            constructor: function ()
            {
                this.fStore = window.localStorage;
            }
        };
    
        ret = declare ("TDriver", [], TDriver);
    
        return ret;
    }
);
