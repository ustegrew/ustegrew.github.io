/**
 * 
 */
package it010.lesson_1.oop.geo_2.primitive;

/**
 * @author peter
 *
 */
public class TPoint2D
{
    public double           fX;
    public double           fY;
    
    public TPoint2D ()
    {
        fX = 0;
        fY = 0;
    }
    
    public TPoint2D (double x, double y)
    {
        fX = x;
        fY = y;
    }
    
    public TPoint2D GetSummedWith (TPoint2D other)
    {
        TPoint2D    ret;
        
        ret         = new TPoint2D();
        ret.fX      = fX + other.fX;
        ret.fY      = fY + other.fY;
        
        return ret;
    }
}
