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
        var TStack;
        var ret;

        /* Class definition */
        TStack = 
        {
            kUndef:             (function(){return;})(),
            fElements:          null,
            
            Clear: function ()
            {
                this.fElements = [];
            },
            
            GetFirstElement: function ()
            {
                var n;
                var ret;
                
                n   = this.fElements.length;
                if (n <= 0)
                {
                    throw "Can't retrieve elements from an empty stack.";
                }
                ret = this.fElements [0];
                
                return ret;
            },
            
            Get: function (/* int */ i)
            {
                var n;
                var ret;
                
                if ((i < 0) || (i >= n))
                {
                    throw "Index must be in range: [0, " + n + "[. Given: " + i;
                }
                ret = this.fElements [i];
            },
            
            GetNumElements: function ()
            {
                return this.fElements.length;
            },
            
            Pop: function ()
            {
                var n;
                var ret;
                
                n = this.fElements.length;
                if (n <= 0)
                {
                    throw "Can't pop() elements off an empty stack.";
                }
                ret = this.fElements.pop ();
                
                return ret;
            },
            
            Push: function (/* Any */ e)
            {
                this.fElements.push (e);
            },
            
            constructor: function ()
            {
                this.fElements = [];
            }
        };
    
        /* dojo declare() call */
        ret = declare ("TStack", [], TStack);
    
        return ret;
    }
);
