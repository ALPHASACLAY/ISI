const Constants = {
    gravity : new Vecteur(0,0.5),
    elasticity : 0.7

};


// on stocke le sol ici
let sol = { 
	x:0,
	y:550
};

let distance = function (p1,p2){
	return Math.sqrt(Math.pow((p2.x - p1.x),2)+ Math.pow((p2.y-p1.y),2));
} // Retourne la distance entre P1 et P2



let calculAngle = function (p1,p2){
	return Math.atan2(p2.y - p1.y , p2.x - p1.x);

} // retourne l'angle entre p1 et P2



// image de fond:
let imageDefond = new Image();
//imageDefond.src = "./images/backgroundNeige.png"

//imageDefond.src = "./images/angrybirdBack2.png";

let drawDecor=function(){

	ctx.drawImage(imageDefond,0,0,1000,600);

	drawLanceur();

}