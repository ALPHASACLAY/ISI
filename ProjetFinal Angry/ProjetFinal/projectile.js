class Projectile extends Body{
	constructor(v,w,h,m, image){
		super(v,w,h,m);

		this.rayon=w/2;
		this.y=sol.y;

		this.bool=true;
		this.lance=false;

		this.rebond=-0.7;

		this.image= new Image();//on crée l'objet image
		this.image.src=indexProj[image].src;


	}


	//actualise la position et dessine le projectile
	draw(){
		this.calculTrajectoire();
		//ctx.beginPath();
		//ctx.arc(this.origine.x+this.rayon,this.origine.y+this.rayon,this.rayon,0,Math.PI*2);
		//ctx.fillStyle="red";
		//ctx.fill();
		//ctx.closePath();
		ctx.drawImage(this.image,this.origine.x-6,this.origine.y-3,this.width+10,this.height+4);


	}


	//Fonction pour lancer le projectile: on récupère la force de tir en prenant le minimum entre la distance entre le centre du lanceur (position initiale du projectile)
	// et l'oiseau et la distance maximale possible (celle du rayonPuissance du lanceur) pour la puissance afin de ne pas depasser la puissance maximale.
	// nous appliquons ensuite les formules de trajectoire parabolique pour vx et vy
	// enfin nous mettons la variable lance du projectile à true pour signifier que le projectile a été lancé
	lancer(){
		if ( mousePos && !this.lance){
			this.force = Math.min(lanceur.rayonPuissance,distance(lanceur,mousePos))/this.masse;
			this.vitesse.x = this.force * Math.cos(calculAngle(mousePos, lanceur));
			this.vitesse.y = this.force * Math.sin(calculAngle(mousePos, lanceur));
			this.lance = true;
			//addProj();
		}

	}

	//Calcule de la trajectoire:
	calculTrajectoire(){

		//Si l'oiseau a été lancé seulement on lui applique une vitesse et la gravité autrement il tomberait au sol ou ne resterait pas à sa position initiale 
		if (this.lance){
			this.vitesse=this.vitesse.add(Constants.gravity);
			this.origine=this.origine.add(this.vitesse);
		}
		
			
		//On gère les rebonds avec les obstacles ou le sol
		if (this.origine.y + this.height > this.y ){
			//this.vitesse=this.vitesse.mult(this.rebond);
			this.origine.y= this.y - this.height;
			this.vitesse.y= this.vitesse.y*this.rebond;
			
			
		}
		//friction:

		if (this.origine.y + this.height == this.y ){
			this.vitesse.x*=0.6;		
			}

	};
	
}
