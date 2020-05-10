class Body extends Rectangle{

	constructor (v,w,h,m){
		super(v,w,h);
		this.masse=m;
		this.invMasse=1/m;
		this.vitesse= new Vecteur(0,0);
		this.force= new Vecteur(0,0);
		this.hasCollision = false;

		
	}

	setCollision (b) {
        this.hasCollision = b;
    }


    //Calcul des dommage; uniquement les objets et les Cible peuvent perdre des points de vie, et uniquement lorsqu'ils sont touché par des projectils.
    calculDommage(b){
    	if ((this instanceof Objet || this instanceof Cible )&& b instanceof Projectile ){
    		if (this.projDejaTouche(b)==false){
				//Si cette oiseaux n'a pas déjà touché l'objet ou la cible alors on compte le dommage réalisé. 
				this.setPDV(((b.vitesse.norm()/2)* b.masse)/this.masse);  //(les points de vie perdue son en fonction des poids des objets et de la vitesse)
                //console.log("perd "+((b.vitesse.norm())*(b.masse)/this.masse)+" PDV " +b.masse);
                this.addProjTouche(b); //on ajoute le projectils dans le tableau des projectiles qui ont déjà abimé l'objet
    		}
                
            }

    }

    //Gerer les collision ( code du TP2)
	collision(b){
		let mdiff = this.mDiff(b);
		if (mdiff.hasOrigin()){
			let vecteurs = [ new Vecteur (0,mdiff.origine.y),
                new Vecteur (0,mdiff.origine.y+ mdiff.height),
                new Vecteur (mdiff.origine.x, 0),
                new Vecteur (mdiff.origine.x + mdiff.width, 0) ];

                let n = vecteurs[0];

                for (let i = 1; i < vecteurs.length; i++) {
                    if (vecteurs[i].norm() < n.norm())
                    n = vecteurs[i];
                };

                let norm_v = this.vitesse.norm();
                let norm_vb = b.vitesse.norm();
                let kv = norm_v / (norm_v + norm_vb);
                let kvb = norm_vb / (norm_v + norm_vb);

                if (norm_v == 0 && norm_vb == 0) {
                    if (this.invMasse == 0 && b.invMasse == 0)
                    return null;
                    else {
                        if (this.masse <= b.masse)
                        kv = 1;
                        else
                        kvb = 1
                    }

                };

                this.move(n.mult(kv));
                b.move(n.mult(-kvb));

                n = n.normalize();

                // (2) On calcule l'impulsion j :
                let v = this.vitesse.sub(b.vitesse);
                let e = Constants.elasticity; 

                let j = -(1 + e) * v.dot(n) / (this.invMasse + b.invMasse);

                // (3) On calcule les nouvelle vitesse:
                let new_v = this.vitesse.add(n.mult(j  * this.invMasse));
                let new_bv = b.vitesse.sub(n.mult(j * b.invMasse));

                b.setCollision(true);
                this.setCollision(true);

                return { vitesse1 : new_v, vitesse2 : new_bv };

            } 
            // ici, on va également regarder si il va y avoir collision afin de de pas louper la collision lorsque les vitesses sont trop élevées.
			// Ce code vient du lien en bas du tp 2
		else{

			let vitesseRelative = this.vitesse.sub(b.vitesse);

			let h = projectVitRelative(Vecteur.ZERO,vitesseRelative, mdiff);

			if (h < Infinity){

				this.origine = this.origine.add(this.vitesse.mult(h));
				b.origine = b.origine.add(b.vitesse.mult(h));
				//let nvr=vitesseRelative.normalize();
				//let tangent = new Vecteur(-nrv.y, nrv.x);
				//this.vitesse=tangent.mult(this.vitesse.dot(tangent));
				//b.vitesse=tangent.mult(b.vitesse.dot(tangent));
			}
			else{
				//this.calculTrajectoire();
				//this.origine=this.origine.add(this.vitesse);
				//b.origine=this.origine.add(b.vitesse);

			}
		}

	}


}




let projectVitRelative=function(origine, direction, mdiff){

	let fin=origine.add(direction);

	let minT= firstIntersect(origine,fin,new Vecteur( mdiff.origine.x, mdiff.origine.y), new Vecteur(mdiff.origine.x, mdiff.origine.y + mdiff.height));
	let x=firstIntersect(origine,fin,new Vecteur( mdiff.origine.x, mdiff.origine.y + mdiff.height), new Vecteur(mdiff.origine.x+ mdiff.width, mdiff.origine.y + mdiff.height));
	if (x<minT){
		minT=x;
	}
	x = firstIntersect(origine,fin,new Vecteur( mdiff.origine.x+mdiff.width, mdiff.origine.y+mdiff.height), new Vecteur(mdiff.origine.x+mdiff.width, mdiff.origine.y ));
	if (x<minT){
		minT=x;
	}
	x = firstIntersect(origine,fin,new Vecteur( mdiff.origine.x+mdiff.width, mdiff.origine.y), new Vecteur(mdiff.origine.x, mdiff.origine.y ));
	if (x<minT){
		minT=x;
	}

	return minT;

}


let firstIntersect=function(debut1,fin1,debut2,fin2){
	let r=fin1.sub(debut1);
	let s= fin2.sub(debut2);

	let num= debut2.sub(debut1).crossProduct(r);
	let den= r.crossProduct(s);

	if (num==0 && den==0){
		return Infinity;
	}
	if (den ==0){

		return Infinity;
	}

	let u = num/den;
	let t= (debut2.sub(debut1).crossProduct(s))/ den;

	if ((t>=0)&& (t<=1)&&(u>=0)&&(u<=1)){
		return t;
	}
	return Infinity;

}