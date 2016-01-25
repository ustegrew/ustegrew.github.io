/**
 * A widget to present the inner workings of a piece of Javascript code. Can 
 * demonstrate very simple Javascript code. For teaching environments 
 * (introduction into programming).
 */
define 
(
    [
        "dojo/_base/declare",
        "dijit/_WidgetBase",
        "dojo/dom-construct",
        "jsdemo/aux/storage/map/TDictionary",
        "jsdemo/component/controller/TController",
        "jsdemo/component/program/TProgram",
        "jsdemo/component/gui/TGUI"
    ],
    function 
    (
        declare, 
        _WidgetBase,
        domConstruct,
        TDictionary,
        TController,
        TProgram,
        TGUI
    )
    {
        var TJSDemo;
        var ret;
        
        TJSDemo =
        {
            /**
             * The controller, integrating model {@link TProgram} and UI {@link TGUI}.
             * 
             * @type        TController
             * @private
             */
            fController:        null,

            /**
             * The user interface (dialog).
             * 
             * @type        TGUI
             * @private
             */
            fGUI:               null,
            
            /**
             * The model.
             * 
             * @type        TProgram
             * @private
             */
            fProgram:           null,
            
            /**
             * A JS object object containing all demo programs.
             *
             * @type        JSObject
             * @private
             */
            fProgramList:       null,
            
            /**
             * An map containing all the demo programs
             * The index access is zero based, i.e. the first element has index 0 (zero).
             * 
             * @type        TArrayList &lt;JSObject&gt;
             * @private
             */
            fRepository:        null,

            /**
             * If set to <code>true</code>, print additional debug information to the console
             * during the object's life time.
             *
             * @type        boolean
             * @private
             */
            fShowDebugInfo:     false,         
            
            /**
             * Loads program [<code>key</code>] into the simulator.
             *
             * @param       {String}    key             Key of the program to load.
             * @throws      {NoSuchKeyException}        If no program with the given key exists.
             * @public
             */
            LoadProgram: function (key)
            {
                this._LoadProgram (key);
            },
            
            NotifyInitFinished: function ()
            {
                var keys;
                
                this._PreloadRepository (this.fProgramList);
                keys = Object.getOwnPropertyNames (this.fProgramList);
                this._LoadProgram (keys [0]);
            },

            /**
             * Dojo specific cTor.
             * Loads all programs in the given <code>programList</code> into memory.
             * Clients load individual programs by calling {@link TJSDemo.LoadProgram}.
             * 
             * @param   {JSObject}  programList         A JS object object containing all demo programs.
             * @throws  {DuplicateKeyException}         If two or more programs have the same key.
             * @public
             */
            constructor: function (programList)
            {
                this.fProgramList = programList;
            },

            /**
             * Dijit specific startup function. Creates all sub modules and binds them together.
             */
            startup: function ()
            {
                this.fRepository    = new TDictionary   ();
                this.fController    = new TController   ();
                this.fProgram       = new TProgram      ();
                this.fGUI           = new TGUI          ();

                this.fController.SetHost        (this);
                this.fController.SetSubjects    (this.fProgram, this.fGUI);
                this.fGUI.SetHost               (this.fController);

                domConstruct.place              (this.fGUI.domNode, this.domNode, "only");
                this.fGUI.startup               ();
            },
            
            /**
             * Loads program <code>[key]</code> from the repository.
             * 
             * @param   {String}    key     The key to the program as stored in the repository.
             * @private
             */
            _LoadProgram: function (key)
            {
                var pd;
                
                pd = this.fRepository.GetValue_ByKey (key);
                this.fController.Notify_LoadProgram (pd);
            },
            
            
            /**
             * Pre loads a group of programs into the repository. Usually, this 
             * will contain all the programs on a single resource page.
             * 
             * @param   {JSObject}  programList     The list of programs to be pre loaded.
             * @private
             */
            _PreloadRepository: function (programList)
            {
                var i;                                                          /* int                      */
                var n;                                                          /* int                      */
                var keys;                                                       /* String []                */
                var k;                                                          /* String                   */
                var p;                                                          /* JSObject                 */
                var d;                                                          /* TDescriptor_Program      */
                var repo;                                                       /* TDictionary              */

                if (typeof programList !== "object")
                {
                    throw "TJSDemo::_PreloadRepository: Given parameter value for 'programList' is not a valid object.";
                }

                repo = new TDictionary ();
                keys = Object.getOwnPropertyNames (programList);
                n    = keys.length;
                if (n >= 1)
                {
                    for (i = 0; i < n; i++)
                    {
                        k = keys [i];
                        p = programList [k];
                        d = this.fProgram.CreateDescriptor (k, p);
                        repo.DeclareSymbol  (k);
                        repo.SetValue_ByKey (k, d);
                    }
                }
                
                this.fRepository = repo;
            }
        };

        ret = declare ("TJSDemo", [_WidgetBase], TJSDemo);
    
        return ret;
    }
);

/*
    [20]    We proceed with further steps only after ace has successfully loaded 
            and integrated into the environment. Due to the asynchronous nature 
            we must place all further initialazion code into the callback. 

    [21]    Note that the require.toUrl() call only works because this class doesn't
            derive from dijit/_WidgetBase. If it was derived from dijit/_WidgetBase
            then the global require object would be changed:
                Before change:
                    require =
                    {
                        toUrl: function () 
                        {
                            // Whatever toUrl() needs
                        },
                        // other properties and functions...
                    }
                After change:
                    require =
                    {
                        packaged: true,
                        original: 
                        {
                            // contents of old require object
                        }
                        // other properties and functions...
                    }

    [22]    Inside a functor, the 'this' reference is set to 'window' or another 
            object. There we have to use Function.call (context), with 'context' 
            set to the object we want. Now, inside the called function the 'this' 
            reference refers to the correct object.
 */