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
        var TArrayList;
        var ret;

        TArrayList = 
        {
            fElements:          null,

            Add: function (/* Any */ x)
            {
                this.fElements.push (x);
            },
            
            AddFromArray: function (/* Any [] */ list)
            {
                this._AddArray (list);
            },
            
            AddFromArrayList: function (/* TArrayList<Any> */ list)
            {
                this._AddArray (list.fElements);
            },
            
            /**
             * Also, tests whether the given index is in range. We need: <code>0 <= i < n</code> where
             * <code>n</code>is the number of entries stored in this dictionary.<br/>
             * 
             * @param   {int}                   i   The index to test.
             * @throws  {OutOfBoundsException}  If given index is out of bounds.
             * @public
             */
            GetValue_ByIndex: function (/* int */ i)
            {
                var e;
                var n;
                var ret;
                
                e = this.fElements;
                n = e.length;
                if ((i < 0) || (i >= n))
                {
                    throw "TArrayList::GetValue_ByIndex: Index must be within bounds: [0, " + n + "[. Given: " + i;
                }
                
                ret = e [i];
                
                return ret;
            },
            
            GetNumElements: function ()
            {
                return this.fElements.length;
            },
            
            constructor: function ()
            {
                this.fElements      = [];
            },
            
            _AddArray: function (/* Any[] */ list)
            {
                var i;
                var n;
                var isList;
                
                isList  = this._IsValidList (list);
                if (isList)
                {
                    n = list.length;
                    if (n >= 1)
                    {
                        for (i = 0; i < n; i++)
                        {
                            this.fElements.push (list[i]);
                        }
                    }
                }
            },
            
            _IsValidList: function (/* Any [] */ x)
            {
                var isArray;
                var ret;

                ret         = true;
                isArray     = Array.isArray (x);
                if (x === undefined)
                {
                    throw "TArrayList::Argument must be an array (undefined)";
                    ret = false;
                }
                else if (x === null)
                {
                    throw "TArrayList::Argument must be an array (null)";
                    ret = false;
                }
                else if (! isArray)
                {
                    throw "TArrayList::Argument must be an array (" + (typeof x) + ")";
                    ret = false;
                }

                return ret;
            }
        };
    
        /* dojo declare() call */
        ret = declare ("TArrayList", [], TArrayList);
    
        return ret;
    }
);
