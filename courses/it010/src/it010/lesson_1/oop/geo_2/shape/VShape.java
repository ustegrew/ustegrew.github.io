/**
 * 
 */
package it010.lesson_1.oop.geo_2.shape;

import java.util.Vector;

import it010.lesson_1.oop.geo_2.primitive.TPoint2D;

/**
 * @author peter
 *
 */
public abstract class VShape
{
    private Vector<TPoint2D>     fVertices;
    
    public VShape ()
    {
        fVertices = new Vector<>();
    }
    
    public void Add (TPoint2D p)
    {
        fVertices.addElement (p);
    }
    
    /**
     * Rotates this shape clockwise by <code>alpha</code> degrees (in degrees) around the median point
     * 
     * @param alpha
     */
    public void Rotate (double alpha)
    {
        
    }
    
    public abstract void Add (VShape s);

    public abstract double GetArea ();
}
