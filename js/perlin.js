class Perlin {

    // This is a port of Ken Perlin's Java code. The
    // original Java code is at http://cs.nyu.edu/%7Eperlin/noise/.
    // Note that in this version, a number from 0 to 1 is returned.

    noise () {
        
        for (var i = 0; i < 256; i++) {
            this.p[256 + i] = this.p[i] = this.permutation[i];
        }

        var X = Math.floor(this.x) & 255;                  // FIND UNIT CUBE THAT
        var Y = Math.floor(this.y) & 255;                 // CONTAINS POINT.
        var Z = Math.floor(this.z) & 255;
        
        this.x = this.x - Math.floor(this.x);                                // FIND RELATIVE X,Y,Z
        this.y = this.y - Math.floor(this.y);                                // OF POINT IN CUBE.
        this.z = this.z - Math.floor(this.z);

        var u = this.fade(this.x);                                // COMPUTE FADE CURVES
        var v = this.fade(this.y);                                // FOR EACH OF X,Y,Z.
        var w = this.fade(this.z);

        var A = this.p[X] + Y; 
        var AA = this.p[A] + Z;
        var AB = this.p[A + 1] + Z;      // HASH COORDINATES OF
        var B = this.p[X + 1] + Y;
        var BA = this.p[B] + Z;
        var BB = this.p[B + 1] + Z;      // THE 8 CUBE CORNERS,

        return this.scale(
            this.lerp(w, 
                this.lerp(v, 
                    this.lerp(u, 
                        this.grad(this.p[AA], this.x, this.y, this.z), 
                        this.grad(this.p[BA], this.x - 1, this.y, this.z)), 
                    this.lerp(u, 
                        this.grad(this.p[AB], this.x, this.y - 1, this.z), 
                        this.grad(this.p[BB], this.x - 1, this.y - 1, this.z))), 
                this.lerp(v, 
                    this.lerp(u, 
                        this.grad(this.p[AA + 1], this.x, this.y, this.z - 1), 
                        this.grad(this.p[BA + 1], this.x - 1, this.y, this.z - 1)), 
                    this.lerp(u, 
                        this.grad(this.p[AB + 1], 
                            this.x, 
                            this.y - 1, 
                            this.z - 1), 
                        this.grad(this.p[BB + 1], this.x - 1, this.y - 1, this.z - 1 )
                        )
                    )
                )
            );
    }

    fade (t) { 
        return t * t * t * (t * (t * 6 - 15) + 10); 
    }
    
    lerp (t, a, b) { 
        return a + t * (b - a); 
    }

    grad(hash, x, y, z) {
        var h = hash & 15;                      // CONVERT LO 4 BITS OF HASH CODE
        var u = h < 8 ? x : y;
        var v = h < 4 ? y : h === 12 || h === 14 ? x : z;
        return ((h & 1) == 0 ? u : -u) + ((h & 2) == 0 ? v : -v);
   } 
    
    scale (n) { 
        return (1 + n) / 2; 
    }

    constructor (x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;

        this.p = new Array(512)
        this.permutation = [151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86,164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212,207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104,218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180];
    }

}
