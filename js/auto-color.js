$.cssHooks.backgroundColor = {
    get: function (elem) {
        if (elem.currentStyle)
            var bg = elem.currentStyle["backgroundColor"];
        else if (window.getComputedStyle)
            var bg = document.defaultView.getComputedStyle(elem,
                null).getPropertyValue("background-color");
        if (bg.search("rgb") == -1)
            return bg;
        else {
            bg = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

            function hex(x) {
                return ("0" + parseInt(x).toString(16)).slice(-2);
            }
            return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
        }
    }
};


$(document).ready(function () {

    $(".color").each(function (i) {
        var colorRGB = $(this).find(".swatch").css("background-color");

        
        var rgbOut = "rgb(" + hexToRgb(colorRGB).r + "," + hexToRgb(colorRGB).g + "," + hexToRgb(colorRGB).b + ")";

        var cmykOut = "CMYK: " + rgb2cmyk(hexToRgb(colorRGB).r, hexToRgb(colorRGB).g, hexToRgb(colorRGB).b);
        
        var hexOut = "Hex: " + $(this).find(".swatch").css("backgroundColor");

        
        
var thisColorCode = $(this).find(".color-code");
                thisColorCode.html(hexOut + "<br/>" + rgbOut + "<br/>" + cmykOut);
//                        thisColorCode.html(rgbOut + "  |  " + cmykOut + "  |  " + hexOut);
        

        
var svgContainer = d3.select(this).append("svg")
    .attr("width", 30)
    .attr("height", 30)
        .attr("class","print-swatch");

//Draw the rectangle for printing
var rectangle = svgContainer.append("rect")
    .attr("width", 30)
    .attr("height", 30)
    .attr("fill",colorRGB);
});

    
    function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
    
//  RGB TO CMYK 
    function rgb2cmyk (r,g,b) {
 var computedC = 0;
 var computedM = 0;
 var computedY = 0;
 var computedK = 0;

 //remove spaces from input RGB values, convert to int
 var r = parseInt( (''+r).replace(/\s/g,''),10 ); 
 var g = parseInt( (''+g).replace(/\s/g,''),10 ); 
 var b = parseInt( (''+b).replace(/\s/g,''),10 ); 

 if ( r==null || g==null || b==null ||
     isNaN(r) || isNaN(g)|| isNaN(b) )
 {
   alert ('Please enter numeric RGB values!');
   return;
 }
 if (r<0 || g<0 || b<0 || r>255 || g>255 || b>255) {
   alert ('RGB values must be in the range 0 to 255.');
   return;
 }

 // BLACK
 if (r==0 && g==0 && b==0) {
  computedK = 1;
  return [0,0,0,100];
 }

 computedC = 1 - (r/255);
 computedM = 1 - (g/255);
 computedY = 1 - (b/255);

 var minCMY = Math.min(computedC,
              Math.min(computedM,computedY));
 computedC = (computedC - minCMY) / (1 - minCMY) ;
 computedM = (computedM - minCMY) / (1 - minCMY) ;
 computedY = (computedY - minCMY) / (1 - minCMY) ;
 computedK = minCMY;

 return [Math.round(computedC*100),Math.round(computedM*100),Math.round(computedY*100),Math.round(computedK*100)];
}

    

});