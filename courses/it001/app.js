require
([
    "dojo/parser",
    "dojo/dom",
    "dojo/dom-construct",
    "courseware/TCourseWare",
    "courseware/gui/TExerciseEditGUI",
    "dojo/domReady!"
], function 
(
    parser,
    dom,
    domConstruct,
    TCourseWare,
    TExerciseEditGUI
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
        }
    );
});
