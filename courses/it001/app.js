require
([
    "dojo/parser",
    "dojo/dom-construct",
    "courseware/TCourseWare",
    "dojo/domReady!"
], function 
(
    parser,
    domConstruct,
    TCourseWare
)
{
    parser.parse().then
    (
        function ()
        {
            var c;

            c = new TCourseWare ();
            domConstruct.place  (c.domNode, "pnlMain", "only");
            c.startup           ();
            c.LoadCourse        ("course/it001/res/info.json");
        
            /* Pretty print all source code (using google prettyprint library */
//            prettyPrint ();
        }
    );
});
