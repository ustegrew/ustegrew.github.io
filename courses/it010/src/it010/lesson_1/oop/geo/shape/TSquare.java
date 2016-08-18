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

package it010.lesson_1.oop.geo.shape;

/**
 * @author  Peter Hoppe
 * 
 * TODO     Create cTor with size and x / y position
 * TODO     Secure cTors - disallow illegal size / positions
 * TODO     Write methods for geometric transformations: Scale, Translate, Rotate
 * TODO     Replace x/y position by separate class TCoord2D, integrate TCoord2D into this class
 * TODO     Write Dump () method to dump square's state to stdout
 */
public class TSquare
{
    
    private double fSize;
    
    public TSquare ()
    {
        fSize = 0;
    }
    
    public TSquare (double size)
    {
        fSize = size;
    }
    
    public double GetArea ()
    {
        double ret;
        
        ret = fSize * fSize;
        
        return ret;
    }
}
