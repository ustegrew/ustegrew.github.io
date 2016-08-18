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

package it010.lesson_1.oop.geo;

import it010.lesson_1.oop.geo._misfit.TSquareSilly;
import it010.lesson_1.oop.geo.shape.TSquare;

/**
 * @author Peter Hoppe
 */
public class geo
{
    public static void main (String[] args)
    {
        MakeSillySquare ();
    }
    
    private static void MakeSillySquare ()
    {
        TSquareSilly    squareS;
        double          areaS;
        
        squareS = new TSquareSilly  ();
        areaS  = squareS.GetArea    ();
        System.out.println ("Square [silly] ()  -> " + areaS);
    }
    
    private static void MakeSquare ()
    {
        TSquare         square;
        TSquare         square2;
        double          area;
        double          area2;
        
        square  = new TSquare       (5);
        square2 = new TSquare       ();
        area    = square.GetArea     ();
        area2   = square2.GetArea    ();
        
        System.out.println ("Square         (5) -> " + area);
        System.out.println ("Square         (6) -> " + area2);
        
    }
}
