/** 
 *  @fileoverview        Storage, holding all {@link TExercise} objects in a worksheet.
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
        /**
         * Type of test to do when we check whether any given UID is already in storage.
         * 
         * @enum
         */
        var ETestType =
        {
            kSkip:              0,      /* Don't test                               */
            kIDMustExist:       1,      /* If UID does NOT exist, throw exception   */
            kIDMustNotExist:    2       /* If UID DOES exist, throw exception       */
        };
        
        var TModel;
        var ret;

        /**
         * Storage model, holding all exercises of a worksheet. Provides index 
         * based access and key based access.
         * 
         * @class       TModel
         */
        TModel = 
        {
            /**
             * Background storage for index based access.
             * 
             * @type        JSArray
             * @private
             */
            fExerciseList:          null,

            /**
             * Background storage for key based access.
             * 
             * @type        JSObject
             * @private
             */
            fExerciseMap:           null,
            
            /**
             * Returns the exercise with the given key, <code>id</code>.
             * 
             * @param   {String}        id      The UID of the desired exercise.
             * @returns {TExtercise}    The exercise.
             * @thows   (String)        exception with error message if there
             *                          isn't any such exercise.
             */
            GetByID: function (id)
            {
                var ret;
                
                this._AssertIDUsable(id, ETestType.kIDMustExist);
                ret = this.fExerciseMap [id];
                
                return ret;
            },
            
            /**
             * Returns the exercise with the given index, <code>i</code>. Index 
             * must be between <code>0</code> (zero) and <code>n-1</code>, where
             * <code>n</code> is the amount of exercises stored.
             * 
             * @param   {String}        i       The index of the desired exercise.
             * @returns {TExtercise}    The exercise.
             * @thows   (String)        exception with error message if the given 
             *                          index is out of bounds.
             */
            GetByIndex: function (i)
            {
                var ret;
                
                this._AssertIndexUsable (i);
                ret = this.fExerciseList [i];
                
                return ret;
            },
            
            /**
             * Returns the number of exercises stored.
             * 
             * @returns {integer}       The number of exercises.
             */
            GetNumElements: function ()
            {
                return this.fExerciseList.length;
            },
            
            /**
             * Returns <code>true</code>, if there's an exercise with the 
             * given <code>id</code>, <code>false</code> otherwise.
             * 
             * @param       {String}    id      The UID of the exercise searched for.
             * @returns     {TExercise}         The exercise searched, or, 
             *                                  <code>null</code> if no such exercise 
             *                                  is stored.
             */
            HasElement: function (id)
            {
                var ret;
                
                ret = this.fExerciseMap.hasOwnProperty (id);
                
                return ret;
            },
            
            /**
             * Registers the given exercise, i.e. adds it to storage.
             * 
             * @param   {TExercise}     exercise    The exercise to be stored.
             * @throws  {String}        Exception with message if an exercise with
             *                          the same UID is already stored.
             */
            Register: function (exercise)
            {
                this._AssertIDUsable (exercise.fID, ETestType.kIDMustNotExist);
                exercise.fIsNullObject = false;
                this.fExerciseList.push (exercise);
                this.fExerciseMap [exercise.fID] = exercise;
            },
            
            /**
             * cTor.
             */
            constructor: function ()
            {
                this.fExerciseList  = [];
                this.fExerciseMap   = {}; 
            },

            /**
             * Tests whether the given <code>id</code> is aready stored, resp. not stored. 
             * The exact behaviour depends on the <code>testTypeUnique</code> parameter: 
             * 
             * <table border="1">
             *     <tr>
             *         <th>testTypeUnique</th>
             *         <th>hasID</th>
             *         <th>Result</th>
             *     </tr>
             *     <tr>
             *         <td><code>ETestType.kSkip</code></td>
             *         <td><code>true</code></td>
             *         <td>OK</td>
             *     </tr>
             *     <tr>
             *         <td>&nbsp;</td>
             *         <td><code>false</code></td>
             *         <td>OK</td>
             *     </tr>
             *     <tr>
             *         <td><code>ETestType.kIDMustExist</code></td>
             *         <td><code>true</code></td>
             *         <td>OK</td>
             *     </tr>
             *     <tr>
             *         <td>&nbsp;</td>
             *         <td><code>false</code></td>
             *         <td>throw exception</td>
             *     </tr>
             *     <tr>
             *         <td><code>ETestType.kIDMustNotExist</code></td>
             *         <td><code>true</code></td>
             *         <td>throw exception</td>
             *     </tr>
             *     <tr>
             *         <td>&nbsp;</td>
             *         <td><code>false</code></td>
             *         <td>OK</td>
             *     </tr>
             * </table>
             * 
             * @param   {type}        id                  The UID to look for.
             * @param   {type}        testTypeUnique      A flag, determining the test specifics.
             * @private
             * @throws {String}       Exception with message if an exercise with the same 
             *                        ID does (not) exist.
             */
            _AssertIDUsable: function (id, testTypeUnique)
            {
                var kID = "TModel::_AssertIDUsable";
                
                var isWrongType;
                var isNull;
                var hasID;

                isWrongType = (typeof id !== 'string');
                isNull      = (id == null);
                if (isWrongType)
                {
                    throw kID + ": Exercise ID must be a string. Given: " + (typeof id);
                }
                else if (isNull)
                {
                    throw kID + ": Exercise ID must be not null. Given: null.";
                }

                /**
                 * Test whether id already exists. Behaviour:
                 * 
                 * testType                     hasID       Result
                 * ---------------------------------------------------------
                 *  ETestType.kSkip             true        OK
                 *                              false       OK
                 *  ETestType.kIDMustExist      true        OK
                 *                              false       throw exception
                 *  ETestType.kIDMustNotExist   true        throw exception
                 *                              false       OK
                 */
                if (testTypeUnique !== ETestType.kSkip)
                {
                    hasID = this.fExerciseMap.hasOwnProperty (id);
                    if (testTypeUnique === ETestType.kIDMustExist)
                    {
                        if (! hasID)
                        {
                            throw kID + ": Missing exercise ID: " + id;
                        }
                    }
                    else
                    {
                        if (hasID)
                        {
                            throw kID + ": Exercise ID must be unique. Offending ID: " + id;
                        }
                    }
                }
            },
            
            /**
             * Tests whether the given index <code>i</code> is within bounds.
             * For <code>i</code> to be valid, the value of <code>i</code> must
             * be in interval <code>[0, n[</code> where <code>n</code>
             * is the number of exercises stored.
             * 
             * @param   {type}        i                   The index to test.
             * @private
             * @throws {String}       Exception with message if <code>i</code>
             *                        is out of bounds.
             */
            _AssertIndexUsable: function (i)
            {
                var kID = "TModel::_AssertIndexUsable";
                
                var isWrongType;
                var n;
                
                isWrongType = ((typeof i !== "number") || ((i % 1) != 0));
                if (isWrongType)
                {
                    throw kID + ": Given index has wrong type. Requirement: Must be an integer. i: " + i + "[" + (typeof i) + "]";
                }
                
                n = this.fExerciseList.length;
                if (i < 0)
                {
                    throw kID + ": Index too small. Requirement: 0 <= i < nExercises. i: " + i + ", nExercises = " + n;
                }
                else if (i >= n)
                {
                    throw kID + ": Index too large. Requirement: 0 <= i < nExercises. i: " + i + ", nExercises = " + n;
                }
            }
        };
    
        ret = declare ("TModel", [], TModel);
    
        return ret;
    }
);
