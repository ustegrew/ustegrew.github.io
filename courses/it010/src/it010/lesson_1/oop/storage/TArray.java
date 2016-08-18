/**
 * This file is part of it010.
 * 
 * it010 is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * it010 is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with it010.  If not, see <http://www.gnu.org/licenses/>.
 */

package it010.lesson_1.oop.storage;

/**
 * @author Peter Hoppe
 */
public class TArray<T>
{
    private static final int            kIncrement = 5;
    
    private T[]    fValues;
    private int    iTop;
    
    @SuppressWarnings ("unchecked")
    public TArray ()
    {
        fValues = (T[]) new Object [kIncrement];
        iTop    = -1;
    }
    
    public void Add (T x)
    {
        iTop++;
        if (iTop >= fValues.length)
        {
            _IncreaseStorage ();
        }
        fValues [iTop] = x;
    }
    
    public T Get (int i)
    {
        T ret;
        
        _AssertInRange (i);
        ret = (T) fValues [i];
        
        return ret;
    }

    /**
     * @param i
     */
    private void _AssertInRange (int i)
    {
        boolean hasError;
        String  msg;
        
        hasError = false;
        msg      = "";
        if (i <= -1)
        {
            hasError    = true;
            msg         = "Given index negative!";
        }
        else if (i >= fValues.length)
        {
            hasError    = true;
            msg         = "Given index too large!";
        }

        if (hasError)
        {
            msg += " Must be in range: [0, " + fValues.length + "[. Given: " + i;
            throw new IndexOutOfBoundsException (msg);
        }
    }

    /**
     * 
     */
    @SuppressWarnings ("unchecked")
    private void _IncreaseStorage ()
    {
        T[]         temp;
        int         newSize;
        
        newSize = fValues.length + kIncrement;
        temp    = (T[]) new Object [newSize];
        System.arraycopy (fValues, 0, temp, 0, fValues.length);
        
        fValues = temp;
    }
}
