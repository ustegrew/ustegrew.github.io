/** 
 *  @fileoverview        Insert_here
 */
define 
(
    [
        "dojo/_base/declare",
        "./TExercise"
    ],
    function 
    (
        declare,
        TExercise
    )
    {
        var ETestType =
        {
            kSkip:              0,
            kIDMustExist:       1,
            kIDMustNotExist:    2
        };
        
        var TModel;
        var ret;

        /**
         * Insert_explanation_here
         * 
         * @class       TChangeToClassName
         */
        TModel = 
        {
            fExerciseList:          null,
            fExerciseMap:           null,
            
            GetByID: function (id)
            {
                var ret;
                
                this._AssertIDUsable(id, ETestType.kIDMustExist);
                ret = this.fExerciseMap [id];
                
                return ret;
            },
            
            GetByIndex: function (i)
            {
                var ret;
                
                this._AssertIndexUsable (i);
                ret = this.fExerciseList [i];
                
                return ret;
            },
            
            GetNumElements: function ()
            {
                return this.fExerciseList.length;
            },
            
            HasElement: function (id)
            {
                var ret;
                
                ret = this.fExerciseMap.hasOwnProperty (id);
                
                return ret;
            },
            
            Register: function (exercise)
            {
                this._AssertIDUsable (exercise.fID, ETestType.kIDMustNotExist);
                exercise.fIsNullObject = false;
                this.fExerciseList.push (exercise);
                this.fExerciseMap [exercise.fID] = exercise;
            },
            
            /**
             * Dojo specific cTor.
             */
            constructor: function ()
            {
                this.fExerciseList  = [];
                this.fExerciseMap   = {}; 
            },

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
            
            _AssertIndexUsable: function (i)
            {
                var kID = "TModel::_AssertIndexUsable";
                
                var wrongType;
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
