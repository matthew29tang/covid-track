/** Return a hex string proportional to the percent increase (float from 0-1) */
function colorIntensity(increase) {
    if (increase < 0 || increase > 1) return "Invalid input";

    const k = 1;
    let integer = Math.round(increase * 765); // integer from 0 to 765
    let r = 0, g = 0, b = 0;
    if (integer < 255) {
        r = integer;
    }
    else if(integer < 510) {
        r = 255;
        g = integer - 255;
    } else {
        r = 255, g = 255;
        b = integer - 510;
    }
    
    let R = r.toString(16);
    let G = g.toString(16);
    let B = b.toString(16);

    if (R == "0") R += "0";
    if (G == "0") G += "0";
    if (B == "0") B += "0";

    return "#" + R + G + B;
}
