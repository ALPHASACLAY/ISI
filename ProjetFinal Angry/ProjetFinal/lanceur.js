let lanceur={
	x:110,
	y:420,
	rayon: 10, // il s'agit du rayon du cercle centrale, la cercle où l'on doit appuyer pour placer un oiseaux.
	rayonPuissance:80 // ici nous avons la taille du rayon qui va nous permettre de mesurer la puissance de tir du projectile
}


let im=new Image();
im.src="./images/lanceur.png";


//Image du lance pierre et du petit cercle permettant de savoir ou positionner l'oiseau a l'origine
let drawLanceur=function(){
	ctx.beginPath();
	ctx.arc(lanceur.x,lanceur.y,lanceur.rayon, 0, 2* Math.PI);
	ctx.strokeStyle="rgb(0, 44, 94)";
	ctx.stroke();
	ctx.drawImage(im,75,390,65,180);

}


// Cette fonction sert à tracer une petite ligne devant afin de mieux voir la direction (l'angle) dans lequel partira l'objet
let drawViseur= function(){
	estEnPosition();
	if (mousePos && enPosition){
		coordonnees=getCoordonneeViseur(mousePos);
		ctx.beginPath();
		ctx.moveTo(coordonnees.x,coordonnees.y);
		ctx.lineTo(lanceur.x,lanceur.y);
		ctx.strokeStyle="rgba(0,0,0,0.2)";
		ctx.stroke();
		
		

	}
}

// Les deux fonctions suivantes permettent de dessiner l'elastique qui se tend lorsque de l'on place l'oiseau pour viser.

let drawElastique1=function(){
	if (projectilCourant && mouseDown&&!estDansLeCentre(mousePos)&& !projectilCourant.lance){
			ctx.beginPath();
			ctx.strokeStyle="black";
    		ctx.moveTo(lanceur.x -lanceur.rayon, lanceur.y);
    		ctx.lineTo(projectilCourant.origine.x, projectilCourant.origine.y+projectilCourant.rayon);
			ctx.stroke();
		}
}
let drawElastique2=function(){
	if (projectilCourant && mouseDown &&!estDansLeCentre(mousePos)&& !projectilCourant.lance){
			ctx.beginPath();
			ctx.strokeStyle="black";
    		ctx.moveTo(lanceur.x +lanceur.rayon, lanceur.y);
    		ctx.lineTo(projectilCourant.origine.x, projectilCourant.origine.y+projectilCourant.rayon);
			ctx.stroke();
		}
}

// Cette fonction permet de savoir si la souris est dans le petit cercle centrale
let estEnPosition = function (){
	if (mousePos && estDansLeCentre(mousePos)){
		if (mouseDown){
			enPosition= true;

		}
		else if (mouseUp) {
			enPosition= false;
		}
	
		
	}
}

//Lorsque l'on relache la souris pour lacher l'oiseau, nous remettons la variable enPostion à false, et nous indiquons que le projectile est tiré
let estLance = function(){
	estEnPosition();
	if (mousePos && enPosition && mouseUp){
		enPosition= false;
		lance=true;
		
	}

	
}


//calcule la distance entre la position de la souris et le centre du lanceur
let estDansLeCentre = function(mousePos){

	let dist= distance(lanceur, mousePos);
	if (dist < lanceur.rayon){
		return true;
	}
	else{
		return false;
	}

}



//  ce qui suit récupère la position de la souris ainsi que les événements (bouger la souris, appuyer sur le bouton, relacher le bouton et le clique)
let mousePos;
let mouseDown = false;
let mouseUp = false;

function getMousePos(canvas,e){
	let c = canvas.getBoundingClientRect();
	return {

          x: e.clientX - c.left,
          y: e.clientY - c.top
        };
};

addEventListener("mousemove", function(e){
	mousePos = getMousePos(canvas,e);

	if (projectilCourant && mouseDown && !projectilCourant.lance){
		projectilCourant.origine.x=mousePos.x-projectilCourant.rayon;
		projectilCourant.origine.y=mousePos.y-projectilCourant.rayon;
		//Afin que l'oiseau suive le mouvement de la souris uniquement lorsque l'on a un projectil de placé, le bouton de la souri enfoncée, un mouvement de la souris et 
		//également lorsque la variable lancé du projectile est à false sinon lorsque l'on appuira sans faire expres sur un autre endroit du canvas alors on récuréreras l'oiseau
	}

},false);

addEventListener("mousedown", function(e){
	mousePos = getMousePos(canvas, e);
	mouseDown = true; 
	mouseUp = false;
	

	
},false);

addEventListener ("mouseup", function (e){
	mousePos = getMousePos(canvas, e);
	mouseDown=false;
	mouseUp = true;
},false);
addEventListener ("click", function (e){
	mousePos = getMousePos(canvas, e);
	if (estDansLeCentre(mousePos)){
		addProj(); // si on clique dans le centre on y place un oiseau
	}
	//if (birds.length!=0){
	//	birds.splice(1);
	//}
},false);



// on récupère l'angle et la puissance de tir pour pouvoir dessiner le viseur
let getCoordonneeViseur = function (mousePos){
	let angle= Math.PI/2 - calculAngle( mousePos,lanceur);

	//limite de force:
	let dist= Math.min (distance(lanceur, mousePos),lanceur.rayonPuissance);

	let x= lanceur.x + dist * Math.sin(angle);
	let y=lanceur.y + dist * Math.cos(angle);

	return {
		x:x,
		y:y
	};
};
