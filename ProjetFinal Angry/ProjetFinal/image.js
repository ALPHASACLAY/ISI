//image:
//let image = new Image() -> on crée l'objet
//width et height permettent de connaitre les dimensions de l'image
//src permet de charger l'image.


/*

Dans ce fichier nous allons stocker nos images pour les différents objets et les différents projectiles
Afin de pouvoir générer plusieurs des objets et des oiseaux qui diffèrent plus génériquement.
Nous rentrons également la taille (et la masse pour les oiseaux) de chauque ainsi dans le fichier JSON nous auront uniquement besoin
d'indiquer le type d'objet sans avoir a rentrer les mesure de chaque objet.


*/




let indexIm = {
	boisVertical:{
		width:30,
		height:120,
		src: "./images/BoisVertical.png",
		src2:"./images/boisVerticalAbime.png"
	},
	boisHorizontal:{
		width:170,
		height:30,
		src: "./images/BoisHorizontal.png",
		src2:"./images/boisHorizontalAbime.png"
	},
	boisBlock:{
		width:90,
		height:90,
		src: "./images/Boisblock.png",
		src2:"./images/boisBlockAbime.png"
	},
	pierreVerticale:{
		width:30,
		height:120,
		src: "./images/pierreVerticale.png",
		src2:"./images/pierreVerticaleAbime.png"
	},
	pierreHorizontale:{
		width:170,
		height:30,
		src: "./images/pierreHorizontale.png",
		src2:"./images/pierreHorizontaleAbime.png"
	},
	pierreBlock:{
		width:90,
		height:90,
		src: "./images/pierreBlock.png",
		src2:"./images/pierreBlockAbime.png"
	},
	glaceBlock:{
		width:90,
		height:90,
		src: "./images/glaceBlock.png",
		src2:"./images/blockGlaceAbime.png"
	},
	glaceVerticale:{
		width:30,
		height:120,
		src: "./images/glaceVerticale.png",
		src2:"./images/glaceVerticaleAbime.png"
	},
	glaceHorizontale:{
		width:170,
		height:30,
		src: "./images/glaceHorizontale.png",
		src2:"./images/glaceHorizontaleAbime.png"
	},
	neigeBlock:{
		width:90,
		height:90,
		src: "./images/neigeBlock.png",
		src2:"./images/neigeBlockAbime.png"
	},
	neigeVerticale:{
		width:30,
		height:120,
		src: "./images/NeigeVerticale.png",
		src2:"./images/neigeVerticaleAbime.png"
	},
	neigeHorizontale:{
		width:170,
		height:30,
		src: "./images/NeigeHorizontale.png",
		src2:"./images/neigeHorizontaleAbime.png"
	}
};

let indexProj = {
	proj1:{
		width:34,
		height:34,
		masse:3,
		src: "./images/bird1.png"
	},
	proj2:{
		width:30,
		height:30,
		masse:2.5,
		src: "./images/bird2.png"
	},
	proj3:{
		width:38,
		height:38,
		masse:3.5,
		src: "./images/bird3.png"
	},
	proj4:{
		width:40,
		height:40,
		masse:3.8,
		src: "./images/bird4.png"
	},
		proj5:{
		width:42,
		height:42,
		masse:4,
		src: "./images/bird5.png"
	}
};

let indexFD={
	fond1:{
		src:"./images/angrybirdBack2.png"
	},
	fond2:{
		src:"./images/backgroundNeige.png"
	}
}