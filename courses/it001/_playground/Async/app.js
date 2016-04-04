require
([
    "dojo/Deferred",
    "dojo/parser",
    "dojo/dom",
    "dojo/dom-construct",
    "courseware/TCourseWare",
    "dojo/domReady!"
], function 
(
    TDeferred,
    parser,
    dom,
    domConstruct,
    TCourseWare
)
{
    function Log (method)
    {
        var msg;
        
        msg  = (new Date ()).toISOString ();
        msg += ": " + method;
        console.log (msg);
    }
    
    function DoAsync (mSec)
    {
        Log ("--> DoAsync ()");
        
        var ret = new TDeferred ();
        
        window.setTimeout 
        (
            function ()
            {
                Log ("--> DoAsync () -> Resolve ()");

                ret.resolve ("Resolved: DoAsync ()");

                Log ("<-- DoAsync () -> Resolve ()");
            },
            mSec
        );
        
        Log ("<-- DoAsync ()");

        return ret;
    }
    
    function DoAsyncErr (mSec)
    {
        Log ("--> DoAsyncErr ()");
        
        var ret = new TDeferred ();
        
        window.setTimeout 
        (
            function ()
            {
                Log ("--> DoAsyncErr () -> Reject ()");

                ret.reject ("Rejected: DoAsync ()");

                Log ("<-- DoAsyncErr () -> Reject ()");
            },
            mSec
        );
        
        Log ("<-- DoAsyncErr ()");

        return ret;
    }
    
    function CallAsync1 ()
    {
        var d, p;
        
        Log ("--> CallAsync1 ()");
        
        d = DoAsync (2000);
        
        p = d.promise.then
        (
            function (data)
            {
                Log ("Then 1: " + data);
                return data;
            }
        ).then
        (
            function (data)
            {
                Log ("Then 2: " + data);
                return data;
            }
        ).then
        (
            function (data)
            {
                Log ("Then 3: " + data);
                return data;
            }
        );
        
        Log ("<-- CallAsync1 ()");
        
        console.dir (p);
    }
    
    function CallAsync2 ()
    {
        var d, p;
        
        Log ("--> CallAsync2 ()");
        
        d = new TDeferred ()
        setTimeout
        (
            function ()
            {
                Log ("--> CallAsync2 () -> Resolve ()");

                d.resolve ("Resolved_1: DoAsync ()");

                Log ("<-- CallAsync2 () -> Resolve ()");
            },
            5000
        );
        
        d.promise.then
        (
            function (data)
            {
                var d1;
                
                Log ("Then 1: " + data);

                d1 = new TDeferred ();
                setTimeout
                (
                    function ()
                    {
                        Log ("--> CallAsync2 () -> Resolve ()");

                        d1.resolve ("Resolved_2: DoAsync ()");

                        Log ("<-- CallAsync2 () -> Resolve ()");
                    },
                    5000
                );
                
                return d1;
            }
        ).then
        (
            function (data)
            {
                var d;
                
                Log ("Then 2: " + data);

                d1 = new TDeferred ();
                setTimeout
                (
                    function ()
                    {
                        Log ("--> CallAsync2 () -> Resolve ()");

                        d1.resolve ("Resolved_3: DoAsync ()");

                        Log ("<-- CallAsync2 () -> Resolve ()");
                    },
                    5000
                );
                
                return d1;
            }
        ).then
        (
            function (data)
            {
                Log ("Then 3: " + data);
            }
        );
        
        Log ("<-- CallAsync2 ()");
    }
    
    function CallAsync3 ()
    {
        var d, p;
        
        Log ("--> CallAsync3 ()");
        
        d = DoAsync (5000);
        
        p = d.promise.then
        (
            function (data)
            {
                Log ("Then 1: " + data);
                return DoAsync (5000);
            }
        ).then
        (
            function (data)
            {
                Log ("Then 2: " + data);
                return DoAsync (5000);
            }
        ).then
        (
            function (data)
            {
                Log ("Then 3: " + data);
                return DoAsync (5000);
            }
        );
        
        Log ("<-- CallAsync3 ()");
        
        console.dir (p);
    }
    
    function CallAsync4 ()
    {
        var d, p;
        
        Log ("--> CallAsync4 ()");
        
        d = DoAsync ();
        
        p = d.promise.then
        (
            function (data)
            {
                Log ("Then 1: " + data);
                return DoAsync (1);
            }
        ).then
        (
            function (data)
            {
                Log ("Then 2: " + data);
                return DoAsync (50);
            }
        ).then
        (
            function (data)
            {
                Log ("Then 3: " + data);
                return DoAsync (500);
            }
        ).then
        (
            function (data)
            {
                Log ("Then 4: " + data);
                return DoAsync (2000);
            }
        ).then
        (
            function (data)
            {
                Log ("Then 5: " + data);
                return data
            }
        );
        
        Log ("<-- CallAsync4 ()");
        
        console.dir (p);
    }
    
    function CallAsync5 ()
    {
        var d, p;
        
        Log ("--> CallAsync5 ()");
        
        d = DoAsync (5000);
        
        p = d.promise.then
        (
            function (data)
            {
                Log ("Then 1 (resolve): " + data);
                return DoAsyncErr (5000);
            }
        ).then
        (
            function (data)
            {
                Log ("Then 2 (resolve): " + data);
            },
            function (err)
            {
                Log ("Then 2 (reject): " + err);
                return DoAsync (5000);
            }
        ).then
        (
            function (data)
            {
                Log ("Then 3 (resolve): " + data);
            }
        );
        
        Log ("<-- CallAsync5 ()");
        
        console.dir (p);
    }
    
    parser.parse().then
    (
        function ()
        {
            Log ("--> parser.parse.then (...)");
            
            CallAsync2 ();
            
            Log ("<-- parser.parse.then (...)");
        }
    );
});
