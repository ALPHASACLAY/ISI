class CibleGlace extends Cible{
	constructor(v,w,h,m){
		super(v,w,h,m);
		this.image.src= "./images/cibleneige.png";
		this.src2="./images/cibleneige2.png";
		this.src3="./images/cibleneige3.png";
	}
	draw(){
		this.estToujoursDansLeChamps();
		this.collisionWithBall();
		this.calculTrajectoire();

		ctx.drawImage(this.image,this.origine.x-1,this.origine.y-4,this.width+2,this.height+15);

		

	}
}