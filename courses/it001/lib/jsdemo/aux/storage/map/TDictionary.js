/**
 * @fileoverview        Dictionary for key/value pairs.
 */
define 
(
    [
        "dojo/_base/declare",
        "jsdemo/aux/storage/map/TDictionaryEntry",
        "jsdemo/aux/storage/list/TArrayList"
    ],
    function 
    (
        declare,
        TDictionaryEntry,
        TArrayList
    )
    {
        var TDictionary;
        var ret;

        /**
         * A dictionary holding key/value pairs. Entries can be accessed by key and by index. 
         * The index access is zero based, i.e. the first element has index 0 (zero). 
         *  
         * @class               TDictionary
         */
        TDictionary = 
        {
            /**
             * An indexed list containing all the key/value pairs. Allows indexed access to each entry.
             * The index access is zero based, i.e. the first element has index 0 (zero).
             * 
             * @type        TArrayList &lt;{@link TDictionaryEntry}&gt;
             * @private
             */
            fList:          null,
            
            /**
             * A hash map containing all the key/value pairs. Allows access to each entry by key.
             * 
             * @type        Object
             * @private
             */
            fMap:           null,
            
            /**
             * Deep copies the given <code>TDictionary</code> to this one. 
             * Data that pre-existed in this dictionary will be overwritten.
             * 
             * @param   {TDictionary}       other       The dictionary we copy from.
             * @public
             */
            CopyFrom: function (other)
            {
                var i;                                                          /* int                      */
                var n;                                                          /* int                      */
                var k;                                                          /* String                   */
                var e0;                                                         /* TDictionaryEntry         */
                var e1;                                                         /* TDictionaryEntry         */
                
                this.fMap        = {};
                this.fList       = TArrayList ();
                
                n = other.fList.GetNumElements ();
                if (n >= 1)
                {
                    for (i = 0; i < n; i++)
                    {
                        e0 = other.fList.GetValue_ByIndex (i);
                        e1 = new TDictionaryEntry (null);
                        e1.CopyFrom (e0);
                        k  = e1.GetKey ();
                        this.fMap [k] = e1;
                        this.fList.Add (e1);
                    }
                }
            },
            
            /**
             * Declare symbols. This creates a group of empty entries.<br/>
             * Each demo program has to declare the symbols it uses. These 
             * symbols are the global variables used by the program.
             * 
             * @param  {TArrayList &lt;String&gt;}  keys    The list of names we want to declare the symbols for. 
             * @throws {DuplicateKeyException}      If one of the symbols has already been declared.
             * @public
             */
            Declare: function (keys)
            {
                var i;                                                          /* int                      */
                var n;                                                          /* int                      */
                var k;                                                          /* String                   */
                
                n = keys.GetNumElements ();
                if (n >= 1)
                {
                    for (i = 0; i < n; i++)
                    {
                        k = keys.GetValue_ByIndex (i);
                        this._DeclareSymbol (k);
                    }
                }
            },

            /**
             * Declare a single symbol.
             * 
             * @param   {String}    key     The symbol's name.
             * @public
             */
            DeclareSymbol: function (key)
            {
                this._DeclareSymbol (key);
            },
            
            /**
             * Returns the dictionary data as JS Object.
             * 
             * @returns     {JSObject}      The dictionary data as JS Object.
             */
            GetAsJSObject: function ()
            {
                var e;
                var k;
                var v;
                var i;
                var n;
                var ret;
                
                ret = {};
                n   = this.fList.GetNumElements ();
                if (n >= 1)
                {
                    for (i = 0; i < n; i++)
                    {
                        e = this.fList.GetValue_ByIndex (i);
                        k = e.GetKey    ();
                        v = e.GetValue  ();
                        ret [k] = v;
                    }
                }
                
                return ret;
            },
            
            /**
             * Returns the key to entry #<code>i</code>.
             * 
             * @param       {int}       i               The index to the entry we request the key of. The first entry has index 0 (zero).
             * @return      {String}                    The key of the requested entry.
             * @throws      {OutOfBoundsException}      If given index is out of bounds.
             * @public  
             */
            GetKey: function (i)
            {
                var e;                                                          /* TDictionaryEntry         */
                var ret;                                                        /* String                   */
                
                e   = this.fList.GetValue_ByIndex (i);
                ret = e.GetKey  ();
               
                return ret;
            },
            
            /**
             * Returns the number of entries stored in this dictionary.
             * 
             * @return      {int}       The number of entries in this dictionary.
             * @public  
             */
            GetNumEntries: function ()                                          /* public int               */
            {
                var ret;                                                        /* int                      */
               
                ret = this.fList.GetNumElements ();
               
                return ret;
            },
           
            /**
             * Returns the value of entry #<code>i</code>. 
             * 
             * @param       {int}       i               The index to the entry we request the value of. The first entry has index 0 (zero).
             * @return      {String}                    The value of the requested entry.
             * @throws      {OutOfBoundsException}      If given index is out of bounds.
             * @public  
             */
            GetValue_ByIndex: function (i)
            {
                var e;                                                          /* TDictionaryEntry         */
                var ret;                                                        /* Any                      */
               
                e   = this.fList.GetValue_ByIndex (i);
                ret = e.GetValue ();
               
                return ret;
            },
           
            /**
             * Returns the value of entry <code>[key]</code>. 
             * 
             * @param       {int}       key         The key to the entry we request the value of.
             * @return      {String}                The value of the requested entry.
             * @throws      {NoSuchKeyException}    If given key does not exist.
             * @public  
             */
            GetValue_ByKey: function (key)
            {
                var e;                                                          /* TDictionaryEntry */
                var ret;                                                        /* Any */
           
                this._AssertKey (key);
                e   = this.fMap [key];
                ret = e.GetValue ();
               
                return ret;
            },
           
            /**
             * Returns <code>true</code> if there's an entry with the given key.
             * 
             * @param   {boolean}   key     The key we are querying.
             * @return  {boolean}           <code>true</code> if an entry with the key exists, 
             *                              <code>false</code> otherwise.
             */
            HasKey: function (key)
            {
                var ret;                                                        /* boolean                  */
               
                ret = this.fMap.hasOwnProperty (key);
               
                return ret;
            },
           
            /**
             * Sets dictionary data from the given JS Object.
             * 
             * @param   {JSObject}  record       The record from which to set the data.
             * @public
             */
            SetFromJSObject: function (record)
            {
                var i;
                var n;
                var keys;
                var k;
                var v;
                var e;
                
                keys = Object.getOwnPropertyNames (record);
                n    = keys.length;
                if (n >= 1)
                {
                    for (i = 0; i < n; i++)
                    {
                        k = keys    [i];
                        v = record  [k];
                        this._SetValue_ByKey (k, v);
                    }
                }
            },
           
            /**
             * Sets the value of entry #<code>i</code>. 
             *  
             * @param       {int}       i               The index to the entry of which we want to set the value. The first entry has index 0 (zero).
             * @param       {Any}       v               The value to set the entry to.
             * @throws      {OutOfBoundsException}      If given index is out of bounds.
             * @public  
             */
            SetValue_ByIndex: function (i, v)
            {
                var e;                                                          /* TDictionaryEntry         */
               
                e = this.fList.GetValue_ByIndex (i);
                e.SetValue (v);
            },
           
            /**
             * Sets the value of entry <code>[key]</code>. 
             * 
             * @param       {String}    key         The key to the entry of which we want to set the value.
             * @param       {Any}       v           The value to set the entry to.
             * @throws      {NoSuchKeyException}    If given key does not exist.
             * @public  
             */
            SetValue_ByKey: function (key, v)
            {
                this._SetValue_ByKey (key, v);
            },
           
            /**
             * Tests whether the given key is declared.
             * 
             * @param   {String}                key         The key to test.
             * @throws  {NoSuchKeyException}    If given key does not exist.
             * @private
             */
            _AssertKey: function (key)
            {
                var dmp;
                var hasKey;                                                     /* boolean                  */
                
                hasKey = this.fMap.hasOwnProperty (key);
                if (! hasKey)
                {
                    dmp = JSON.stringify (this.fMap, null, 4);
                    throw "TDictionary::_AssertKey: Unknown key: " + key + "\n" +
                          "Map content:\n" +
                          dmp;
                }
            },
            
            /**
             * Declare a single symbol.
             * 
             * @param   {String}    key                 The symbol's name.
             * @throws  {DuplicateKeyException}         If the symbol has already been declared.
             * @private
             */
            _DeclareSymbol: function (key)
            {
                var hasKey;                                                     /* boolean                  */
                var e;                                                          /* TDictionaryEntry         */
                
                hasKey = this.fMap.hasOwnProperty (key);

                if (hasKey)
                {
                    throw "Symbol already declared. Key: '" + key + "'";
                }

                e = new TDictionaryEntry (key);
                this.fMap [key] = e;
                this.fList.Add (e);
            },

            /**
             * Sets the value of entry <code>[key]</code>. 
             * 
             * @param       {String}    key         The key to the entry of which we want to set the value.
             * @param       {Any}       v           The value to set the entry to.
             * @throws      {NoSuchKeyException}    If given key does not exist.
             * @public  
             */
            _SetValue_ByKey: function (key, v)
            {
                var e;                                                          /* TDictionaryEntry         */
               
                this._AssertKey (key);
                e = this.fMap [key];
                e.SetValue (v);
            },
           
            /**
             * Dojo specific cTor.
             * 
             * @public
             */
            constructor: function ()
            {
                this.fList = new TArrayList ();
                this.fMap  = {};
            }
        };
    
        ret = declare ("TDictionary", [], TDictionary);
    
        return ret;
    }
);
