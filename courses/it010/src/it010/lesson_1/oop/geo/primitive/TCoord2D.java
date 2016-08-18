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

package it010.lesson_1.oop.geo.primitive;

/**
 * @author Peter Hoppe
 */
public class TCoord2D
{
    public double       fX;
    public double       fY;
    
    public TCoord2D ()
    {
        fX = 0;
        fY = 0;
    }
    
    public TCoord2D (double x, double y)
    {
        fX = x;
        fY = y;
    }
}
