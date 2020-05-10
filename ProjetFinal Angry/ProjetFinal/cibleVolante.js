class CibleVolante extends Cible{
	constructor(v,w,h,m){
		super(v,w,h,m);


		this.image.src= "./images/pigVolant.png";
		this.src2="./images/pigVolant2.png";
		this.src3="./images/pigVolant3.png";
		this.vitesse.y=2;
		this.vitesse.x=0;
		
		this.pdv=60; 

	}



	// cette classe permet de créer des cibles volantes qui ne sont bouger que de bas en haut et leur trajectoires ne doit pas changer lors de collision  avec 
	// d'autres objets cependant elles subit également les dégats

	collisionWithBall(){


		if (this.pdv< 20){
			this.image.src=this.src3;
		}
		else if (this.pdv< 40){
			this.image.src=this.src2;
		}
		

	}


	// Pour la trajectoire, la grativé n'est plus appliquée sinon la cible ne pourrait pas remonter

	calculTrajectoire(){
		// on change de direction lorsqu'il y a une collision ou qu'on arrive en bas et en haut du canvas.
		if (this.origine.y+this.width>= sol.y - this.height || this.hasCollison){ 

			this.vitesse.y= -1* this.vitesse.y;
		}
		if (this.origine.y<= 10 || this.hasCollison){

			this.vitesse.y= -1* this.vitesse.y;
		}
		
		this.origine=this.origine.add(this.vitesse);
			
		
	}
            
			
};
	