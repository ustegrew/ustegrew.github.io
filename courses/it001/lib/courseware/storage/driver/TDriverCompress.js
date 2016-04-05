/**
 *  @fileoverview        Data storage driver. This driver passes all data unmodified.
 */
define 
(
    [
        "dojo/_base/declare",
        "pieroxy_lz-string/lz-string",
        "./TDriver"
    ],
    function 
    (
        declare,
        compressor,
        TDriver
    )
    {
        var kEconomyMin = 20;
        
        var TDriverCompress;
        var ret;

        /**
         * The compression driver. (De)Compresses all data to (from) the local 
         * storage. 
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
         */
        TDriverCompress = 
        {
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
                    if (record.isCompressed)
                    {
                        ret = compressor.decompressFromBase64 (record.data);
                    }
                    else
                    {
                        ret = record.data;
                    }
                }
                
                return ret;
            },
        
            Set: function (key, data)
            {
                var compr;
                var lPerc;
                var economy;
                var record;
                var stor;
                
                compr   = compressor.compressToBase64 (data);                   /* [10] */
                if (compr.length >= 1)
                {
                    lPerc   = 100 * compr.length / data.length;
                    economy = 100 - lPerc;
                    if (economy >= kEconomyMin)
                    {
                        record =
                        {
                            isCompressed:   true,
                            data:           compr
                        };
                    }
                    else
                    {
                        record =
                        {
                            isCompressed:   false,
                            data:           data
                        };
                    }
                }
                else
                {
                    record =
                    {
                        isCompressed:   false,
                        data:           ""
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

 */