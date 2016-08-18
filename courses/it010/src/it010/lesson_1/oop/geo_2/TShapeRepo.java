/**
 * 
 */
package it010.lesson_1.oop.geo_2;

import java.util.Vector;

import it010.lesson_1.oop.geo_2.shape.VShape;

/**
 * @author peter
 *
 */
public class TShapeRepo
{
    private Vector<VShape>          fShapes;
    
    public TShapeRepo ()
    {
        fShapes = new Vector<> ();
    }
    
    public void SortByArea ()
    {
        double a;
        VShape s;
        
        
        s = fShapes.get (0);
        a = s.GetArea ();
        
    }
}
