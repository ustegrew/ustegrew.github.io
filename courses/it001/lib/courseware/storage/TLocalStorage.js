/**
 *  @fileoverview        Insert_here
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
         * Accessor to the global window.localStorage object. 
         * 
         * @class       TLocalStorage
         */
        TLocalStorage = 
        {
            fLS:        null,
            fDriver:    null,
            
            Get: function (key, defaultValue)
            {
                var ret;
                
                ret = this.fDriver.Get (key);
                if ((ret === null)  &&  (typeof defaultValue === 'string'))
                {
                    ret = defaultValue;
                }
                
                return ret;
            },
            
            GetSize: function ()
            {
                var ret;
                
                ret = this.fDriver.GetSize ();
                
                return ret;
            },
            
            HasKey: function (key)
            {
                var ret;
                
                ret = this.fDriver.HasKey (key);
                
                return ret;
            },
            
            Remove: function (key)
            {
                this.fDriver.Remove (key);
            },
            
            Set: function (key, data)
            {
                this.fDriver.Set (key, data);
            },
            
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
