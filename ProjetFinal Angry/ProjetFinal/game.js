

//Pour la lecture du licher JSON:

function readTextFile(file, callback) {
	var rawFile = new XMLHttpRequest();
	rawFile.overrideMimeType("application/json");
	rawFile.open("GET", file, true);
	rawFile.onreadystatechange = function () {
		if (rawFile.readyState === 4 && rawFile.status == "200") {
			callback(rawFile.responseText);
			}
		}
		rawFile.send(null);
	};


let gameOver=false;
let interval;
let compteur;
let n=0;
let proj=[];
let nbProjMax=0;
imageDefond.src = "./images/angrybirdBack2.png";//par defaut
let init=function(nbNiv){
	lance=false;
	enPosition=false;
	//On supprime tous les ancien objets 
	suppBodies();
	suppObjets();
	suppBirds();
	suppCibles();
	//on remet les intervals à ZERO
	clearInterval(interval);
	clearInterval(compteur);
	readTextFile("datas.json",function (text){
		let data=JSON.parse(text);

		//Il faut penser à remettre à ZERO le vecteur 
		Vecteur.ZERO= new Vecteur(0,0);
		//Recupération des projectiles disponibles pour le niveau
		proj=creationProj(data, nbniv);
		//on récupère l'image du fond du niveau
		imageDefond.src =recupBackground(data,nbniv);
		nbProjMax= proj.length;
		n=0;
		gameOver=false;
	
		

		//récupération des objets et des cibles du fichier JSON
		creationObjets(data,nbniv);
		creationCibles(data,nbniv);
		
		
		

	});

	//afficher les informations de débuggage dans la page pour les 60 FPS:
	let frame = 0;

    
    interval = setInterval(function () {
    try {
        update(1000/60);
        frame++;
    } catch (e) {
        clearInterval(interval);
        throw (e);
    }
    }, 1000/60);

    
    compteur = setInterval(function(){
    	let fps = document.getElementById("fps");
        fps.innerHTML = frame;
        //console.log(frame);
        frame = 0;
    }, 1000);
	//interval=setInterval(update,1000/60);
};


//On va chercher les Objets dans le fichier JSON, correspondant au niveau n
let creationObjets = function(data,n){
	let nbObj = data['niveau'+n]['objets'].length;
	for (let i= 0; i<nbObj;i++ ){
		let x=data['niveau'+n]['objets'][i]['x'];
		let y=data['niveau'+n]['objets'][i]['y'];
		let m=data['niveau'+n]['objets'][i]['m'];
		let t=data['niveau'+n]['objets'][i]['t'];
		let im=data['niveau'+n]['objets'][i]['im'];
		let typ=data['niveau'+n]['objets'][i]['type'];
		let obj;
		if (typ == "n"){
			obj= new Objet(new Vecteur(x,y),indexIm[im]["width"],indexIm[im]["height"],m,t,im);
		}
		else if (typ == "v"){
			obj= new ObjetVolant(new Vecteur(x,y),indexIm[im]["width"],indexIm[im]["height"],m,t,im);
		
		}
		addObjet(obj);
		addBody(obj);



	}
};
let creationCibles = function(data,n){
	let nbCib = data['niveau'+n]['cibles'].length;
	for (let i= 0; i<nbCib;i++ ){
		let x=data['niveau'+n]['cibles'][i]['x'];
		let y=data['niveau'+n]['cibles'][i]['y'];
		let m=data['niveau'+n]['cibles'][i]['m'];
		let ty=data['niveau'+n]['cibles'][i]['type'];
		let c;
		if (ty == "n"){
			c=new Cible(new Vecteur(x-25,y-25),50,50,m);
		}
		else if (ty == "v"){
			c = new CibleVolante(new Vecteur(x-35,y-30),70,60,m);
		}
		else if (ty == "g"){
			c = new CibleGlace(new Vecteur(x-25,y-25),50,50,m);
		}
		addCibles(c);
		addBody(c);


	}
};

let creationProj = function(data,n){

	return data['niveau'+n]['proj'];
};

let recupBackground = function(data,n){
	let i= data['niveau'+n]['imFond'];
	return indexFD[i]["src"];
};





let projectilCourant;
let objets=[];
let birds=[];
let bodies=[];
let cibles=[];


let addCibles=function (b) {
        cibles.push(b);
    }

let addBody=function (b) {
        bodies.push(b);
    }

let addObjet=function (o) {
        objets.push(o);
    }

let addProj= function(){
	
	if (n< nbProjMax){
		let a=proj[n];
		let p=new Projectile(new Vecteur(lanceur.x-(indexProj[a]["width"]/2), lanceur.y-(indexProj[a]["width"]/2)),indexProj[a]["width"],indexProj[a]["height"],indexProj[a]["masse"],a);
		birds.unshift(p);
		addBody(p);
		projectilCourant=birds[0];
		n++;

	}
	else{
		gameOver=true; // lorsque l'on a plus de projectile : GAMEOVER
	}

}



let lance=false;
let enPosition=false;




let removeBody =function (b) {
    let i = bodies.findIndex (function (e) { return e == b; });
    if (i >= 0){
        bodies.splice(i, 1);
    }
    }
let removeObjet =function (b) {
    let i = objets.findIndex (function (e) { return e == b; });
    if (i >= 0){
        objets.splice(i, 1);
    }
    }
let removeCible =function (b) {
    let i = cibles.findIndex (function (e) { return e == b; });
    if (i >= 0){
        cibles.splice(i, 1);
    }
    }





let updateBody = function(){
	for (let i = 0; i < bodies.length; i ++) {

            let body = bodies[i];

            // On regarde si avec une telle vitesse il peut y avoir collision avec les autres objets.
            for (let j = i+1; j < bodies.length; j++) {

                let otherBody = bodies[j];
				
                let res = body.collision(otherBody);

                if (res != null) {
                    // mise à jour des vitesses
                    // On ne veut pas que les objets et cibles volants change de trajectoire a cause d'une collision
                    //Seul les autres objets vont mettre a jour leur vitesse
                    if (!(body instanceof CibleVolante) && !(body instanceof ObjetVolant) ){ 
						body.vitesse = res.vitesse1;
                    }
                    if (!(otherBody instanceof CibleVolante)&&!(otherBody instanceof ObjetVolant)){
						otherBody.vitesse = res.vitesse2;
                    }
                    //On calcul les dommages occasionnés
                    body.calculDommage(otherBody);


                }
            }
     }
    bodies.forEach(function(b){
    	b.draw();
    });
  }


//On update les objet et les cible afin de supprimer ceux/celles qui n'ont plus de pdv
let updateObj=function(){
	for (let i=0;i<objets.length;i++){

		let o= objets[i];
		if (o.pdv<1){
			removeObjet(o);
			removeBody(o);
		}
	}
}

let updateCible=function(){
	for (let i=0;i<cibles.length;i++){

		let c= cibles[i];
		if (c.pdv<=0){
			c.enVie=false;
			removeBody(c);
		}
	}
}


//On regarde si on a une victoire si toutes les cibles ont la variable enVie à false;
let victoire=function(){
	let cpt=0;
	for (let i=0; i< cibles.length;i++){
		let cib=cibles[i];
		if (cib.enVie==false){
			cpt++;
		}
	}
	if (cpt==cibles.length && cpt!=0){ 
		return true;
	}
	else {
		return false;
	}
}



let update=function(){
	
	

	estEnPosition();
	estLance();
	if (lance){
		projectilCourant.lancer();
		lance=false;
	}
	ctx.clearRect(0,0,canvas.width,canvas.height);
	
	drawDecor();
	actualisationTabProj();
	drawLanceur();
	drawViseur();
	drawElastique2();
	updateBody();
	drawElastique1();
	updateObj();
	updateCible();


	if (victoire()){
		cleared.style.display = "initial";

	}

	else{
		if (gameOver ){
			failed.style.display="initial";
		}
	} 

	
}

//context.fillStyle = color;
 // context.font = font;
  //context.fillText(text, x, y);


//Permet d'actualiser le tableau des projectiles: lorsqu'un projectil est déjà lancé il doit disparaitre du tableau
let actualisationTabProj=function(){
	ctx.fillStyle='black';
	ctx.font='20px Times New Roman';
	let t=[0,0,0,0,0];



	for (let i=n; i< nbProjMax;i++){
		if (proj[i]=="proj1"){
			t[0]++;
		}
		else if (proj[i]=="proj2"){
			t[1]++;
		}
		else if (proj[i]=="proj3"){
			t[2]++;
		}
		else if (proj[i]=="proj4"){
			t[3]++;
		}
		else if (proj[i]=="proj5"){
			t[4]++;
		}
	}

	for (let i=0; i<t.length;i++){
		let text=" "+t[i];
		ctx.fillStyle='#393B37';
	    ctx.font='20px Times New Roman';
		ctx. fillText(text, 55+i*50, 72);
	}


	
};



let suppObjets=function(){
	objets.splice(0, objets.length);
};
let suppBirds=function(){
	birds.splice(0, birds.length);
};
let suppCibles=function(){
	cibles.splice(0, cibles.length);
};
let suppBodies=function(){
	bodies.splice(0, bodies.length);
};


