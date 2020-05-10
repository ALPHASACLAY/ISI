class Objet extends Body{

	constructor (v,w,h,m,mat, image){
		super(v,w,h,m);
		this.rebond=-0.3;;
		this.bool=true;
		this.y=sol.y;
		this.mat=mat;


		// Nous avons fait deux sorte d'objets; les objets en bois et les objets en pierre
		// les objet en pierre seront plus resistants que les objets en bois.
		if (mat=='b'){//bois
			this.color="rgb(200, 113, 0)";
			this.pdv=15;
		}
		else if (mat=='p'){//pierre
			this.color="grey";
			this.pdv=20;
		}
		else if (mat=='g'){//glace
			this.color="blue";
			this.pdv=18;
		}
		else if (mat=='n'){//neige
			this.color="white";
			this.pdv=13;
		}


		this.im=image;
		this.image= new Image();//on crée l'objet image
		this.image.src=indexIm[image].src;


		//pour les dommages: (nous allons mettre dans ce tableau, tous les projectils ayant déjà touche l'objet afin que les objet ne se cassent pas trop vite)
		this.tab=[];

		
		
	}

	setPDV(d){ // mise à jour des pdv
		this.pdv-=d;
	}

	estfissure(){
		//on vérifie les pdv des objets, si ils sont inférieur à 10 on actualise l'image
		if (this.pdv< 10){
			this.image.src=indexIm[this.im].src2;
		}
	}

	//On ajoute le projetile p au tableau tab
	addProjTouche(p){
		this.tab.push(p);
	}

	//On regarde si le projectil p à déja touché l'objet
	projDejaTouche(p){
		for (let i=0; i< this.tab.length;i++){
			if (this.tab[i]==p){
				return true;
			}
		}
		return false;
	}

	draw(){
		//mise à jour de la trajectoire 
		this.calculTrajectoire();
		//mise à jour de l'image de l'objet:
		this.estfissure();


		//ctx.beginPath();
		//ctx.rect(this.origine.x,this.origine.y,this.width,this.height);
		//ctx.fillStyle=this.color;
		//ctx.fill();
		//ctx.closePath();

		//dessiner l'image
		ctx.drawImage(this.image,this.origine.x,this.origine.y,this.width,this.height);

	}

	calculTrajectoire(){
		//endroit ou l'on doit s'arreter si collision
		if (this.hasCollision && this.bool){
			this.y=this.origine.y+this.height;
			this.bool=false;
		}


		// si pas de collision, on doit s'arreter au sol
		else if (!this.bool && !this.hasCollision){
			this.bool=true;
			this.y=sol.y;
		}
		
		//Mise à jour de la vitesse et de la position de l'objet
		this.vitesse=this.vitesse.add(Constants.gravity);
		this.origine=this.origine.add(this.vitesse);
			
		//Les rebond des objets:
		if (this.origine.y + this.height > this.y ){
			//this.vitesse=this.vitesse.mult(this.rebond);
			this.origine.y= this.y - this.height;
			this.vitesse.y= this.vitesse.y*this.rebond;
			
			
		}

		//Friction:
		if (this.origine.y + this.height == this.y ){
			this.vitesse.x*=0.6;		}
		else{
			this.vitesse.x*=0.9;
		}


		//On met a jour la hauteur où doit s'arreter l'objet, c'est à dire où il entre en collision avec un autre objet
		for (let i = 0; i < objets.length; i ++) {
			if (this != objets[i]){
				let obj = objets[i];
				if ((obj.origine.x > this.origine.x +this.width)||(obj.origine.x +obj.width < this.origine.x)
					|| (obj.origine.y > this.origine.y +this.height)||(obj.origine.y +obj.height < this.origine.y)){
					this.hasCollision= false;
					this.y=sol.y;

				}
			}
		}
  
	};



}