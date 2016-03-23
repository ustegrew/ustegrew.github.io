/**
 *  @fileoverview        Insert_here
 */
define 
(
    [
        "../validator/TValidatorJSON"
    ],
    function 
    (
            JSObjectValidator
    )
    {
        var ret;

        /**
         * Insert_explanation_here
         * 
         * @class       TChangeToClassName
         */
        ret = 
        {
            GetAsObject: function (record, schema, strContext)
            {
                var isNotString;
                var isNull;
                var record;
                var retM; /* [10] */
                
                isNotString = (typeof record !== "string");
                isNull      = (record == null);
                if (isNotString)
                {
                    throw strContext + ": Given record is not a string (" + typeof record + ")";
                }
                else if (isNull)
                {
                    throw strContext + ": Given record is NULL.";
                }
                else
                {
                    /* Replace single quotes by double quotes */                /* [30] */
                    record = record.replace (/'/gi, "\"");
                    try
                    {
                        retM = JSON.parse (record);
                    }
                    catch (e)
                    {
                        throw strContext + ":: Could not parse record. Given: " + record + "\n" +
                                           "Details: " + e;
                    }
                    
                    JSObjectValidator.AssertValid (retM, schema, strContext);
                }
                
                return retM;
            }
        };
    
        return ret;
    }
);

/*

[10]: Silly shortcut for "returnMethod" aka: "return value of this method". The normally used "ret" 
      is already defined in the enclosing scope; rather than risk it and rely on JS masking ret from
      the outer scope I use a different variable. 


*/