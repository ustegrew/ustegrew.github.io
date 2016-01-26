/* Silence JSLint */
/*global window:  false */
/*global console: false */
 
var gSayings = [
"A consultant is someone who takes a subject you understand and makes it sound confusing.",
"A bargain is something you can't use at a price you can't resist.",
"Always borrow money from a pessimist.  He won't expect it back.",
"Always forgive your enemies - Nothing annoys them so much.",
"Always remember that you are absolutely unique. Just like everyone else.",
"Apathy is the worlds fastest growing disease. But who cares.",
"Before borrowing money from a friend, decide which you need more.(Friend or Money !)",
"Do you have trouble making up your mind? Well, yes or no?",
"Evening news is where they begin with 'Good evening', and then proceed to tell you why it isn't.",
"Everybody looks brave holding a machine gun.",
"Everybody wants to go to heaven, but nobody wants to die.",
"Everyone has a photographic memory.  Some just don't have film.",
"For Sale: Parachute. Only used once, never opened, small stain.",
"I can please only one person per day. Today is not your day. Tomorrow isn't looking good, either.",
"I couldn't repair your brakes, so I made your horn louder.",
"If Barbie is so popular, why do you have to buy her friends?",
"If everything seems to be going well, you have obviously overlooked something.",
"If you can't see the bright side of life, polish the dull side.",
"I found a great way to attract money... work!",
"I like work.  It fascinates me.  I  sit and look at it for hours.",
"I love deadlines. I especially like the whooshing sound they make as they go flying by.",
"I'm so poor I can't even pay attention.",
"I used to have an open mind but my brains kept falling out.",
"Many people quit looking for work when they find a job.",
"My Reality Check bounced.",
"Never argue with a fool. People might not know the difference.",
"On the keyboard of life, always keep one finger on the Escape key.",
"Out of my mind. Back in five minutes.",
"Tell me what you need and I'll tell you how to get along without it.",
"There are three sides to any argument: your side, my side and the right side.",
"What if there were no hypothetical situations?",
"When everything's coming your way, you're in the wrong lane.",
"When I'm not in my right mind, my left mind gets pretty crowded.",
"When you're right, no one remembers. When you're wrong, no one forgets.",
"Where there's a will, there are five hundred relatives.",
"You know the speed of light, so what's the speed of dark?",
"You're slower than a herd of turtles stampeding through peanut butter.",
"Apathy is the worlds fastest growing disease. But who cares.",
"Maturity is knowing when and where to be immature.",
"Artificial Intelligence usually beats real stupidity.",
"He who laughs last probably doesn't understand the joke.",
"A day without sunshine is like...night.",
"The elevator to success is out of order. You'll have to use the stairs... one step at a time.",
"To think is easy. To act is hard. But the hardest thing in the world is to act in accordance with your thinking.",
"We don't stop playing because we grow old; we grow old because we stop playing.",
"The best way to cheer yourself up is to try to cheer somebody else up.",
"Age is of no importance unless you're a cheese.",
"The only thing that interferes with my learning is my education.",
"The key to success is not through achievement, but through enthusiasm.",
"I cannot afford to waste my time making money.",
"If you think you are too small to be effective, you have never been in the dark with a mosquito.",
"The difference between genius and stupidity is; genius has its limits.",
"Hope is the dream of a waking man.",
"It is not the answer that enlightens, but the question.",
"If you don't know where you are going, you might wind up someplace else.",
"It took me fifteen years to discover I had no talent for writing, but I couldn't give it up because by then I was too famous.",
"It takes less time to do things right than to explain why you did it wrong.",
"Luck is what you have left over after you give 100 percent.",
];

/**
 * Class: TEasterEgg. A hidden Gem in the Javascript Tour. All examples have been rigged with the easter egg
 * in such a way that they work normally when the user clicks their "Try it" button for a number of times 
 * (mostly, once). After that, whenever the user clicks the resp. "Try me" button again, there will be a 
 * message box with a wise saying instead.
 * We provide a 'no repeat for n times' construct to ensure that no saying will be repeated to quickly. It's
 * a bit annoying to see the same saying pop up twice in a row.
 */

function _GetWiseSaying ()
{
    var doDiscard;
    var iSaying;
    var iQueue;
    var nSayings;
    var nQueueElements;
    var rnd;
    var ret;
    
    nSayings        = gSayings.length;
    nQueueElements  = this.fNoRepeatQueue.length;
    do
    {
        /* Generate Random number in [0, nSayings[                                                    */
        /* Note that we multiply rnd with 0.99; this is to make ABSOLUTELY sure that rnd < 1          */
        /* The Javascript specs say that Math.random() will return a value < 1, but I want to be sure */
        rnd         = Math.random ();
        iSaying     = 0.99 * rnd * nSayings; 
        iSaying     = Math.floor(iSaying);
        
        /* Now test if the random number is in our Queue */
        doDiscard = false;
        for (iQueue = 0; iQueue < nQueueElements; iQueue++)
        {
            if (iSaying === this.fNoRepeatQueue [iQueue])
            {   /* Sorry, number has been found, we will need a new number... */
                doDiscard = true;
            }
        }
        
        /* Test whether the number has been found */
        if (doDiscard === false)
        {   /* Insert new number into queue */
            this.fNoRepeatQueue.unshift (iSaying); /* Push number into queue           */
            this.fNoRepeatQueue.pop     ();        /* Delete last number from queue    */
        }
    }
    while (doDiscard === true);
    
    ret = gSayings [iSaying];
    return ret;
}

/**
 * Brings up a message box. If the silent counter is still positive then the given message will be shown.
 * if the silent counter is zero, then the wise saying will pop up instead.
 */
function _PrintMessage (msg)
{
    var s;
    
    if (this.fSilentCounter >= 1)
    {
        this.fSilentCounter--;
        s = msg;
    }
    else
    {
        s = this.GetWiseSaying ();
    }
    
    window.alert (s);
}

/**
 * cTor. 
 * 
 * @param   silentCounter          How often we need to call the Print (...) method
 *                                  until the saying will be shown.
 */
function TEasterEgg (silentCounter)
{
    this.GetWiseSaying     = _GetWiseSaying;
    this.PrintMessage       = _PrintMessage;
    
    /* Will suppress easter egg until called n times */
    this.fSilentCounter     = silentCounter;            
    
    /* The queue is used to ensure that no saying comes twice during every {queue.length} calls */
    this.fNoRepeatQueue     = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
}

/**
 * Main part.
 */
var gEaster01 = new TEasterEgg (1);
var gEaster05 = new TEasterEgg (1);
var gEaster07 = new TEasterEgg (2);

/**
 * Route message to resp. easter egg if caller ID is known.
 * 
 * @param callerID          numerical ID of the example who called this function.
 * @param msg               Message to be shown.
 */
function Print (callerID, msg)
{
    var ee;
    var doCall;
    
    doCall = true;
    if (callerID === 1)
    {
        ee = gEaster01;
    }
    else if (callerID === 5)
    {
        ee = gEaster05;
    }
    else if (callerID === 7)
    {
        ee = gEaster07;
    }
    else
    {
        doCall = false;
        console.log ("Unknown easter egg ID: " + callerID);
    }
    
    if (doCall === true)
    {
        ee.PrintMessage (msg);
    }
}