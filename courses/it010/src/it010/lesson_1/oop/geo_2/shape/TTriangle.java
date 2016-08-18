/**
 * 
 */
package it010.lesson_1.oop.geo_2.shape;

import it010.lesson_1.oop.geo_2.primitive.TPoint2D;

/**
 * @author peter
 *
 */
public class TTriangle extends VShape
{
    public TTriangle (TPoint2D p0, TPoint2D p1, TPoint2D p2)
    {
        Add (p0);
        Add (p1);
        Add (p2);
    }

    @Override
    public void Add (VShape s)
    {
        // TODO Auto-generated method stub
        
    }

    @Override
    public double GetArea ()
    {
        // TODO Auto-generated method stub
        return 0;
    }
}
