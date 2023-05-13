
MySample.main = (function(graphics) {
    'use strict';


    let ptCenter = {
        x: graphics.sizeX / 2,
        y: graphics.sizeY / 2

    };
    let ptEnd = {
        x: graphics.sizeX / 2,
        y: graphics.sizeY / 4

    };
    






    //------------------------------------------------------------------
    //
    // Scene updates go here.
    //
    //------------------------------------------------------------------




    
    function update() {
      //  const rotation = 0.005;

        ptEnd = {
            x: (ptEnd.x - ptCenter.x) * Math.cos(rotation) - (ptEnd.y - ptCenter.y),
            y: (ptEnd.y - ptCenter.y) * Math.cos(rotation) + (ptEnd.x - ptCenter.x)
        };
        
    }
    color = "rgb(150,0,0)";
    //------------------------------------------------------------------
    //
    // Rendering code goes here
    //
    //------------------------------------------------------------------
    function render() {
        
        graphics.clear();
        
        
        graphics.drawLine(ptCenter.x, ptCenter.y, ptEnd.x, ptEnd.y, color);

        graphics.bigsquare(color);
    }

    //------------------------------------------------------------------
    //
    // This is the animation loop.
    //
    //------------------------------------------------------------------
    function animationLoop(time) {

        update();
        render();

        requestAnimationFrame(animationLoop);
    }


    console.log('initializing...');
    requestAnimationFrame(animationLoop); 

}(MySample.graphics));
