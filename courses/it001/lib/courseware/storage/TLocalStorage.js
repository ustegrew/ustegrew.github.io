/**
 *  @fileoverview        Adapter (driver) to the browser's local storage.
 */
define 
(
    [
        "dojo/_base/declare",
        "courseware/util/validator/TValidatorJSON",
        "./driver/TDriverAllpass",
        "./driver/TDriverCompress"
    ],
    function 
    (
        declare,
        JSObjectValidator,
        TDriverAllpass,
        TDriverCompress
    )
    {
        /**
         * JSON schema to validate the driver's configuration descriptor.
         * 
         * @constant
         * @type        JSON schema
         * @private
         */
        var kSchemaParams =
        {
            "$schema":      "http://json-schema.org/draft-03/schema#",
            "title":        "TLocalStorage parameters",
            "description":  "Parameters for a TLocalStorage object",
            "type":         "object",
            "properties":
            {
                "driver":
                {
                    "description":  "The driver which converts the data from/to " +
                                    "the final form when reading from / writing to " +
                                    "the local storage.",
                    "type":         "string",
                    "enum":         ["allpass", "compression"]
                }
            }
        };
        
        var TLocalStorage;
        var ret;

        /**
         * Adapter to the global window.localStorage object. 
         * 
         * @class       TLocalStorage
         */
        TLocalStorage = 
        {
//            fLS:        null, // Obsolete?
             /**
              * The underlying driver which provides the connectivity with the local storage.
              */
            fDriver:    null,
            
            /**
             * 
             * @param {type} key
             * @param {type} defaultValue
             * @returns {TLocalStorage_L13.TLocalStorage@pro;fDriver@call;Get|String}
             */
            Get: function (key, defaultValue)
            {
                var ret;
                
                ret = this.fDriver.Get (key);
                ret = (ret !== null)  ?  ret : "" + defaultValue;
                
                return ret;
            },
            
            /**
             * 
             * @returns {TLocalStorage_L13.TLocalStorage@pro;fDriver@call;GetSize}
             */
            GetSize: function ()
            {
                var ret;
                
                ret = this.fDriver.GetSize ();
                
                return ret;
            },
            
            /**
             * 
             * @param {type} key
             * @returns {TLocalStorage_L13.TLocalStorage@pro;fDriver@call;HasKey}
             */
            HasKey: function (key)
            {
                var ret;
                
                ret = this.fDriver.HasKey (key);
                
                return ret;
            },
            
            /**
             * 
             * @param {type} key
             * @returns {undefined}
             */
            Remove: function (key)
            {
                this.fDriver.Remove (key);
            },
            
            /**
             * 
             * @param {type} key
             * @param {type} data
             * @returns {undefined}
             */
            Set: function (key, data)
            {
                this.fDriver.Set (key, data);
            },
            
            /**
             * 
             * @param {type} params
             * @returns {undefined}
             */
            constructor: function (params)
            {
                var kID = "TLocalStorage::cTor";
                
                JSObjectValidator.AssertValid (params, kSchemaParams, kID);
                if (params.driver == "allpass")
                {
                    this.fDriver = new TDriverAllpass ();
                }
                else if (params.driver == "compression")
                {
                    this.fDriver = new TDriverCompress ();
                }
                else
                {
                    throw kID + ": Unknown driver type: '" + params.driver + "'";
                }
            }
        };
    
        ret = declare ("TLocalStorage", [], TLocalStorage);
    
        return ret;
    }
);
