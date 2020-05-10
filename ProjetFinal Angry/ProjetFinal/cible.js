class Cible extends Body{
	constructor(v,w,h,m){
		super(v,w,h,m);
		this.rayon=w/2;
		this.y=sol.y;
		//this.touche=false;
		this.rebond=-0.3;
		this.image=new Image();
		this.image.src= "./images/cible1.png";
		this.src2="./images/cible2.png";
		this.src3="./images/cible3.png";
		this.image.width=w;
		this.image.height=h;
		this.pdv=30;
		this.enVie=true;

		
		//pour les dommages:
		this.tab=[];
	}

	// permet de diminuer les points de vie d'un cible.
	setPDV(d){
		this.pdv-=d;
	}
	
	// permet d'actualiser l'aspect des cibles. (on met une image différente en fonction des points de vie de la cible)
	collisionWithBall(){


		if (this.pdv< 10){
			this.image.src=this.src3;
		}
		else if (this.pdv< 20){
			this.image.src=this.src2;
		}
		

	}

	// tout comme les objets, les cibles possèdent un tableau indiquant quels projectils les ont dejà touchés ( afin qu'un projectil ne fasse pas trop de dégat et que le jeu ne se finisse pas trop rapidement )
	addProjTouche(p){
		this.tab.push(p);
	}

	// nous regardons si le projectiles est deja dans notre tableau contenant les projectiles qui nous ont déjà touches.
	projDejaTouche(p){
		for (let i=0; i< this.tab.length;i++){
			if (this.tab[i]==p){
				return true;
			}
		}
		return false;
	}


	// permet d'actualiser les trajectoire , l'aspet de la cible et enfin dessiner son image.
	draw(){
		this.estToujoursDansLeChamps();
		this.collisionWithBall();
		this.calculTrajectoire();
		//ctx.beginPath();
		//ctx.arc(this.origine.x+this.rayon,this.origine.y+this.rayon,this.rayon,0,Math.PI*2);
		//ctx.fillStyle="rgb(121, 114, 192)";
		//ctx.fill();
		//ctx.closePath();
		ctx.drawImage(this.image,this.origine.x-1,this.origine.y-4,this.width+2,this.height+5);

		

	}
	//On verifie que le cible est toujours dans le champs de vision si ce n'est pas le cas: le niveau est perdu (vérifie uniquement les cotes)
	estToujoursDansLeChamps(){
		if (this.origine.x + this.width<0 || this.origine.x>1000){
			gameOver=true;
		}
	}

	// cette fonciton nous permet de calculer la trajectoire de la cible qui comme les autre objet est soumise au loi de gravité et ne doit pas s'enfoncer dans le sol
	calculTrajectoire(){

		// ajouter la gravite 
		this.vitesse=this.vitesse.add(Constants.gravity);
		this.origine=this.origine.add(this.vitesse);
			
		
		//Gerer les rebond de la cible
		if (this.origine.y + this.height > this.y ){
			this.vitesse=this.vitesse.mult(this.rebond);
			this.origine.y= this.y - this.height;
			this.vitesse.y= this.vitesse.y * this.rebond;
			
			
		}

		// gerer la friction :
		if (this.origine.y + this.height == this.y ){
			this.vitesse.x*=0.6;		}

	};
	

}
