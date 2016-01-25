/**
 * @fileoverview        Controller. Connects UI, background logic and data model. 
 */
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
        var TController;
        var ret;
            
        /**
         * The controller. Connects UI, background logic and data model. 
         * 
         * @class       TController
         */
        TController =
        {
            /**
             * The hosting JSDemo component.
             * 
             * @type    TJSDemo
             * @private
             */
            fHost: null,
            
            /**
             * The demo program executor (background logic).
             * 
             * @type    TProgram
             * @private
             */
            fProgram:           null,
            
            /**
             * The user interface.
             * 
             * @type    TGUI
             * @private
             */
            fUI:                null,
            
            NotifyInitFinished: function ()
            {
                this.fHost.NotifyInitFinished ();
            },
            
            /**
             * Notification: Load a demo program.
             * 
             * @param   {TDescriptor_Program}   pd      The program to load. <div style="color:red;"><b>TODO</b>: Write docu about program format.</div>
             * @public
             */
            Notify_LoadProgram: function (pd)
            {
                this.fProgram.Load (pd);
                this._UpdateUI ();
            },
            
            /**
             * Notification: Navigate one step backwards in the demo program.
             * 
             * @public
             */
            Notify_Navigate_Backwards: function ()
            {
                this.fProgram.DoNavBackward ();
                this._UpdateUI ();
            },
            
            /**
             * Notification: Navigate one step forwards in the demo program.
             * 
             * @public
             */
            Notify_Navigate_Forwards: function ()
            {
                this.fProgram.DoNavForward ();
                this._UpdateUI ();
            },
            
            /**
             * Notification: Reset the demo program, i.e. go back to the start state.
             * 
             * @public
             */
            Notify_Navigate_Reset: function ()
            {
                this.fProgram.DoNavReset ();
                this._UpdateUI ();
            },
            
            /**
             * Sets the hosting controller. Has to be done in a separate 
             * setter method, rather than the constructor (otherwise the
             * Dojo framework will flag up 'undefined' reference errors.
             * 
             * @param   {TJSDemo}   host    The hosting JSDemo component.
             * @public
             */
            SetHost: function (host)
            {
                this.fHost = host;
            },
            
            /**
             * Sets UI and background logic. JS demo programs can then be loaded via {@link TController.LoadProgram}.
             * 
             * @param {TProgram}        prog    Background logic, executing the demo program.
             * @param {TGUI}            ui      User interface (Panel).
             * @public
             */
            SetSubjects: function (prog, ui)
            {
                this.fProgram   = prog;
                this.fUI        = ui;
            },
            
            /**
             * Dojo specific cTor.
             */
            constructor: function ()
            {
            },
            
            /**
             * Updates the user interface, e.g. when a demo program step has been computed.
             * 
             * @private
             */
            _UpdateUI: function ()
            {
                var snapshot;
                
                snapshot = this.fProgram.GetSnapshot ();
                this.fUI.Notify_SetStatus (snapshot);
            }
        };

        ret = declare ("TController", [], TController);

        return ret;
    }
);
