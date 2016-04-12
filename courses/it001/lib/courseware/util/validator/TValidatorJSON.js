/**
 *  @fileoverview        Insert_here
 */
define 
(
    [
        "dojox/json/schema"
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
            AssertValid: function (data, schema, strContext)
            {
                var vResult;
                var objStr;
                var i;
                var n;
                var e;
                var err;

                vResult = JSObjectValidator.validate (data, schema);
                if (! vResult.valid)
                {
                    try
                    {
                        objStr = JSON.stringify (data, null, 4);
                    }
                    catch (e)
                    {
                        objStr = "JSObject [can't stringify: " + e + "]";
                    }
                    
                    n = vResult.errors.length;
                    e = strContext + ": JSON record validation failed. Offending record:\n" +
                                     "    " + objStr + "\n" +
                                     "Error list ";
                    if (n >= 0)
                    {
                        if (n == 1)
                        {
                            e += "(" + n + " error):\n";
                        }
                        else
                        {
                            e += "(" + n + " errors):\n";
                        }

                        for (i = 0; i < n; i++)
                        {
                            err     = vResult.errors [i];
                            e      += "    " + err.property + "::" + err.message + "\n";
                        }
                    }
                    else
                    {
                        e += "(No error details available)";
                    }

                    console.log (e);
                    throw e;
                }
            }
        };
    
        return ret;
    }
);
