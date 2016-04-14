/**
 *  @fileoverview        Data storage driver, passes data (de)compressed.
 */
define 
(
    [
        "dojo/_base/declare",
        "pieroxy_lz-string/lz-string",
        "../../util/validator/TValidatorJSON",
        "./TDriver"
    ],
    function 
    (
        declare,
        compressor,
        JSObjectValidator,
        TDriver
    )
    {
        var TDriverCompress;
        var ret;

        /**
         * The compression driver. (De)Compresses all data to (from) the local 
         * storage. Uses LZW compression through a library (lz-string).
         * 
         * Not all data will be compressed! For each submitted chunk of data 
         * the driver decides whether to store it compressed or as-is. This is
         * decided by the amount of storage saved: For each submitted chunk:
         *     - if compressing can reduce storage size by at least 20% then 
         *       the data will be stored in compressed format.
         *     - if savings are less than 20%, then we store uncompressed.
         * After the compression round the data will be packed into a JS object:
         *     {
         *         isCompressed:    boolean     // true if data is compressed
         *         data:            string      // The data payload
         *     }
         * This object will be (de)serialized to/from a JSON record.
         * 
         * @class       TDriverCompress
         * @extends     TDriver
         */
        TDriverCompress = 
        {
            /**
             * JSON schema to validate stored entries.
             *
             * @constant
             * @type        JSON schema
             * @private
             */
            kSchemaStoredRecord:
            {
                "$schema":      "http://json-schema.org/draft-03/schema#",
                "title":        "Stored entry",
                "description":  "Record as stored in localStorage",
                "type":         "object",
                properties:
                {
                    "isCompressed":
                    {
                        "description":      "Flag, denoting whether the entry is compressed or not",
                        "type":             "boolean"
                    },
                    "value":
                    {
                        "description":      "The data payload",
                        "type":             "string"
                    }
                }
            },
        
            /**
             * The threshold value. If we save at least this much percentage of 
             * data we will compress it before storing it.
             * 
             * @type Float
             * @constant
             * @private
             */
            kEconomyMin: 20,
        
            /**
             * Returns the value stored with the given <code>key</code>. 
             * 
             * @param   {String}    key     The key we want to retrieve the value of.
             * @returns {String}    The value associated with the given <code>key</code>.
             */
            Get: function (key)
            {
                var stor;
                var record;
                var ret;
                
                ret  = null;
                stor = this.fStore.getItem (key);
                if (stor !== null)
                {
                    record  = JSON.parse (stor);

                    /* [30] */
                    JSObjectValidator.AssertValid (record, this.kSchemaStoredRecord, "TDriverCompress::Get");

                    if (record.isCompressed)
                    {
                        ret = compressor.decompressFromBase64 (record.value);
                    }
                    else
                    {
                        ret = record.value;
                    }
                }
                
                return ret;
            },
        
            /**
             * Updates or adds the given <code>key</code>/<code>value</code> pair. 
             * Value will be compressed if compression saves a threshold amount 
             * of space.
             * 
             * @param {String}      key     The key we want to store the value as.
             * @param {String}      value   The value to be stored.
             * @see {@link TDriverCompress.kEconomyMin}
             */
            Set: function (key, value)
            {
                var compr;
                var lPerc;
                var economy;
                var record;
                var stor;
                
                compr = compressor.compressToBase64 (value);                   /* [10] */
                if (compr.length >= 1)
                {
                    lPerc   = 100 * compr.length / value.length;
                    economy = 100 - lPerc;
                    if (economy >= this.kEconomyMin)
                    {
                        record =
                        {
                            isCompressed:   true,
                            value:          compr
                        };
                    }
                    else
                    {
                        record =
                        {
                            isCompressed:   false,
                            value:          value                               /* [20] */
                        };
                    }
                }
                else
                {
                    record =
                    {
                        isCompressed:   false,
                        value:          ""
                    }
                }
                stor = JSON.stringify (record);
                this.fStore.setItem (key, stor);
            }
        };
    
        ret = declare ("TDriverCompress", [TDriver], TDriverCompress);
    
        return ret;
    }
);

/*

 [10]: We compress to (decompress from) a base64 string as this uses a safe character set.
 [20]: If the record is small we are throwing away the compressed data. This makes the driver 
       time inefficient for small records which is a design weakness. I don't know the 
       solution to this. For now, it works.
 [30]: We must validate each stored record, otherwise we get subtle bugs (variables are
       suddenly undefined somewhere else etc.)

 */