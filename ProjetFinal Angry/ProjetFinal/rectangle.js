class Rectangle{

	constructor(v,w,h){
		this.origine=v;
		
		this.width=w;
		this.height=h;
	}

	move(v){
		if (this.origine.y+v.y<sol.y){
			this.origine=this.origine.add(v);
		}
		
	}

	mDiff (r) {
        let orig = new Vecteur (r.origine.x - this.origine.x - this.width,
			   r.origine.y - this.origine.y - this.height);
        return new Rectangle(orig, this.width + r.width, this.height + r.height);
    }

    hasOrigin () {
        return (this.origine.x < 0 && this.origine.x + this.width > 0)
        	&& (this.origine.y < 0 && this.origine.y + this.height > 0);
    }

}