class ObjetVolant extends Objet{
	constructor (v,w,h,m,mat, image){
		super(v,w,h,m,mat, image);
		this.vitesse.y=2;
		this.vitesse.x=0;
		
	

	}
	// cette classe permet de creer des objets volants, faisant des allers retour verticalement
	//Les objet ne peuvent pas être dévier de leur trajectoire mais subissent les degats comme les objets "normaux" 

	calculTrajectoire(){
		
		if (this.origine.y+this.width>= sol.y - this.height){

			this.vitesse.y= -1* this.vitesse.y;
		}
		if (this.origine.y<= 10){

			this.vitesse.y= -1* this.vitesse.y;
		}
		
		this.origine=this.origine.add(this.vitesse);
			
		
	}
            
			
};