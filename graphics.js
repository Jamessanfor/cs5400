// ------------------------------------------------------------------
// 
// This is the graphics object.  It provides a pseudo pixel rendering
// space for use in demonstrating some basic rendering techniques.
//
// ------------------------------------------------------------------
MySample.graphics = (function(pixelsX, pixelsY, showPixels) {
    'use strict';

    let canvas = document.getElementById('canvas-main');
    let context = canvas.getContext('2d', { alpha: false });

    let deltaX = canvas.width / pixelsX;
    let deltaY = canvas.height / pixelsY;

    //------------------------------------------------------------------
    //
    // Public function that allows the client code to clear the canvas.
    //
    //------------------------------------------------------------------
    function clear() {
        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();

        //
        // Draw a very light background to show the "pixels" for the framebuffer.
        if (showPixels) {
            context.save();
            context.lineWidth = .1;
            context.strokeStyle = 'rgb(150, 150, 150)';
            context.beginPath();
            for (let y = 0; y <= pixelsY; y++) {
                context.moveTo(1, y * deltaY);
                context.lineTo(canvas.width, y * deltaY);
            }
            for (let x = 0; x <= pixelsX; x++) {
                context.moveTo(x * deltaX, 1);
                context.lineTo(x * deltaX, canvas.width);
            }
            context.stroke();
            context.restore();
        }
    }

    //------------------------------------------------------------------
    //
    // Public function that renders a "pixel" on the framebuffer.
    //
    //------------------------------------------------------------------
    function drawPixel(x, y, color) {
        context.fillStyle = color;
        context.fillRect(Math.floor(x * deltaX), Math.floor(y * deltaY), Math.ceil(deltaX), Math.ceil(deltaY));
    }

    function bigsquare(color) {
        let i=1;
        let j=1;
        for (i = 1; i < 100; i++) {
            for (j = 1; j < 100; j++) {
                drawPixel(i, j, color);
            }
        }
    }


    //------------------------------------------------------------------
    //
    // Bresenham line drawing algorithm.
    //
    //------------------------------------------------------------------
    function drawLine(x1, y1, x2, y2, color) {
        //calculate paratmeter

        dx = x2 - x1;
        dy = y2 - y1;
        di = 2 * dy - dx;

        xn = x1;
        yn = y1;
        while (xn<x2) {
            drawPixel(xn, yn, color);
            xn = xn + 1;
            if (di > -1) {
                drawPixel(xn, yn, color);
                di = di + 2 * (dy - dx);

                yn = yn + 1;

            }
            else {

                drawPixel(xn, yn, color);

                di = di + 2 * (dy);
                yn = yn;

            }
        }



    }

    let api = {
        clear: clear,
        drawPixel: drawPixel,
        drawLine: drawLine,
        get sizeX() { return pixelsX; },
        get sizeY() { return pixelsY; }
    };

    return api;
}(150, 150, true));
