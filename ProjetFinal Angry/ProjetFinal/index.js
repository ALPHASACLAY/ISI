
let play = document.getElementById('Play');
let select = document.getElementById('Select');
let niv1 = document.getElementById('Niveau1');
let niv2 = document.getElementById('Niveau2');
let niv3 = document.getElementById('Niveau3');
let niv4 = document.getElementById('Niveau4');
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let menu = document.getElementById('Menu');
let replay = document.getElementById('Replay');
let next = document.getElementById('Next');
let failed = document.getElementById('Failed');
let cleared = document.getElementById('Cleared');
let help = document.getElementById('Help');
let instr = document.getElementById('Instr');
let nbProj = document.getElementById('NbProj');
canvas.style.display = "none";
nbProj.style.display = "none";
next.style.display = "none";
menu.style.display = "none";
replay.style.display = "none";
failed.style.display = "none";
cleared.style.display = "none";
help.style.display = "none";
instr.style.display = "none";

let nbniv=1; // niveau 1 par defaut

play.addEventListener('click',
  () => {
  	niv1.style.display = "none";

  	niv2.style.display = "none";
  	niv3.style.display = "none";
    niv4.style.display = "none";
  	select.style.display = "none";
    play.style.display = "none";
    canvas.style.display = "initial";    
    next.style.display = "initial";
    menu.style.display = "initial";
    replay.style.display = "initial";
    help.style.display = "initial";
    nbProj.style.display = "initial";
    init(nbniv);

  });

niv1.addEventListener('click',
  () => {
  	niv1.style.display = "none";
  	niv2.style.display = "none";
  	niv3.style.display = "none";
    niv4.style.display = "none";
  	select.style.display = "none";
    play.style.display = "none";
    canvas.style.display = "initial";
    next.style.display = "initial";
    menu.style.display = "initial";
    replay.style.display = "initial";
    help.style.display = "initial";
    nbProj.style.display = "initial";
    nbniv=1
    init(nbniv);
  });

niv2.addEventListener('click',
  () => {
  	niv1.style.display = "none";
  	niv2.style.display = "none";
  	niv3.style.display = "none";
    niv4.style.display = "none";
  	select.style.display = "none";
    play.style.display = "none";
    canvas.style.display = "initial";
    next.style.display = "initial";
    menu.style.display = "initial";
    replay.style.display = "initial";
    help.style.display = "initial";
    nbProj.style.display = "initial";
    nbniv=2
    init(nbniv);

  });

niv3.addEventListener('click',
  () => {
    niv1.style.display = "none";
    niv2.style.display = "none";
    niv3.style.display = "none";
    niv4.style.display = "none";
    select.style.display = "none";
    play.style.display = "none";
    canvas.style.display = "initial";
    next.style.display = "initial";
    menu.style.display = "initial";
    replay.style.display = "initial";
    help.style.display = "initial";
    nbProj.style.display = "initial";
    nbniv=3
    init(nbniv);

  });

niv4.addEventListener('click',
  () => {
    niv1.style.display = "none";
    niv2.style.display = "none";
    niv3.style.display = "none";
    niv4.style.display = "none";
    select.style.display = "none";
    play.style.display = "none";
    canvas.style.display = "initial";
    next.style.display = "initial";
    menu.style.display = "initial";
    replay.style.display = "initial";
    help.style.display = "initial";
    nbProj.style.display = "initial";
    nbniv=4
    init(nbniv);

  });
menu.addEventListener('click',
  () => {
    window.location.reload();

    /*
    canvas.style.display = "none";
    next.style.display = "none";
  menu.style.display = "none";
  replay.style.display = "none";
    play.style.display = "initial";
    select.style.display = "initial";
    niv1.style.display = "initial";
    niv2.style.display = "initial";
    niv3.style.display = "initial";
    */
    
    
    

  });

replay.addEventListener('click',
  () => {

    niv1.style.display = "none";
    niv2.style.display = "none";
    niv3.style.display = "none";
    niv4.style.display = "none";
    select.style.display = "none";
    play.style.display = "none";
    canvas.style.display = "initial";
    next.style.display = "initial";
  menu.style.display = "initial";
  replay.style.display = "initial";
    init(nbniv);

  });

next.addEventListener('click',
  () => {

    niv1.style.display = "none";
    niv2.style.display = "none";
    niv3.style.display = "none";
    niv4.style.display = "none";
    select.style.display = "none";
    play.style.display = "none";
    canvas.style.display = "initial";
    next.style.display = "initial";
    menu.style.display = "initial";
    replay.style.display = "initial";
    nbniv++;
    init(nbniv);

  });
failed.addEventListener('click',
  () => {
    failed.style.display = "none";
    niv1.style.display = "none";
    niv2.style.display = "none";
    niv3.style.display = "none";
    niv4.style.display = "none";
    select.style.display = "none";
    play.style.display = "none";
    canvas.style.display = "initial";
    next.style.display = "initial";
    menu.style.display = "initial";
    replay.style.display = "initial";


    init(nbniv);

  });
cleared.addEventListener('click',
  () => {
    cleared.style.display = "none";
    niv1.style.display = "none";
    niv2.style.display = "none";
    niv3.style.display = "none";
    niv4.style.display = "none";
    select.style.display = "none";
    play.style.display = "none";
    canvas.style.display = "initial";
    next.style.display = "initial";
    menu.style.display = "initial";
    replay.style.display = "initial";

    nbniv++
    init(nbniv);

  });

help.addEventListener('click',
  () => {

    if (instr.style.display == "none"){
        instr.style.display="initial";
    }
    else{
      instr.style.display="none";
    }
    
 

  });



