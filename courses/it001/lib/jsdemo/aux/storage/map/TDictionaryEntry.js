/**
 * @fileoverview        Dictionary entry (Key/Value pair)
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
        var TDictionaryEntry;
        var ret;

        /**
         * A single entry in a {@link TDictionary}. Basically, just a key/value pair.
         *  
         * @class               TDictionaryEntry
         */
        TDictionaryEntry = 
        {
            /**
             * The key.
             * 
             * @type        String
             * @private
             */
            fKey:           null,
            
            /**
             * The value.
             * 
             * @type        Any
             * @private
             */
            fValue:         null,
            
            /**
             * Deep copies the given <code>TDictionaryEntry</code> to this one. 
             * Data that pre-existed in this entry will be overwritten.
             * 
             * @param   {TDictionaryEntry}  other   The entry we copy from.
             * @public
             */
            CopyFrom: function (other)
            {
                this.fKey      = other.fKey;
                this.fValue    = other.fValue;
            },
            
            /**
             * Returns the key.
             * 
             * @return  {String}    The key.
             * @public
             */
            GetKey: function ()
            {
                return this.fKey;
            },
            
            /**
             * Returns the value.
             * 
             * @return  {Any}    The value.
             * @public
             */
            GetValue: function ()
            {
                return this.fValue;
            },
            
            /**
             * Sets the value of this entry.
             * 
             * @param   {Any}   v       The value.
             */
            SetValue: function (v)
            {
                this.fValue = v;
            },
            
            /**
             * Dojo specific cTor. Presets the key of this entry.
             * 
             * @param   {String}    key         The entry's key.
             * @public
             */
            constructor: function (/* String */ key)
            {
                this.fKey       = key;
                this.fValue     = (function (){return;})();                     /* [10] */
            }
        };
    
        ret = declare ("TDictionaryEntry", [], TDictionaryEntry);
    
        return ret;
    }
);

/*
 
 [10]:  (function (){return;})() always returns: undefined. Hence the new value 
        is set to undefined.
 
 */