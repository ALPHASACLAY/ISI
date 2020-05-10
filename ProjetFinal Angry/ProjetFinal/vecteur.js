class Vecteur {
    constructor (x, y) {
        //Object.defineProperty ( this, "x", { writable: false, value : x });
        //Object.defineProperty ( this, "y", { writable: false, value : y });
        this.x=x;
        this.y=y;
    }

    add (v) {
        return new Vecteur(this.x + v.x, this.y + v.y );
    }

    sub(v) {
        return new Vecteur(this.x - v.x, this.y - v.y );
    }

    mult (k) {
        return new Vecteur(this.x * k, this.y * k );
    };

    dot(v) {
        return this.x * v.x + this.y * v.y;
    }

    norm () {
        return Math.sqrt(this.dot(this));
    }

    normalize () {
        return this.mult(1/this.norm ());
    }


    crossProduct(v){
        return  this.x * v.y - this.y * v.x;

    }
    tangente(){
        return new Vecteur ( - this.y, this.x);
    }

}

Vecteur.ZERO = new Vecteur (0,0);
Vecteur.UNIT_X = new Vecteur (1,0);
Vecteur.UNIT_Y = new Vecteur (0,1);
Vecteur.MINUS_UNIT_X = new Vecteur (-1, 0);
Vecteur.MINUS_UNIT_Y = new Vecteur (0, -1);
