//event targets
const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');

//distance camera has from the view port - helps calculate canvas size
const canvasOffsetX = canvas.offsetLeft; //0px b/c there's nothing beside it
const canvasOffsetY = canvas.offsetTop; //70px b/c of the toolbar above

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;
ctx.lineWidth = 3; //arbitrary number
ctx.lineCap = 'square'; //crisper corners

let isPainting = false;
let perimeterMode = true;
let numPlants = 5;
var plant = new Image(25,25);
plant.src = 'images/defaultP.png'; //when no plant is selected

//TOOLBAR FUNCTIONALITY
toolbar.addEventListener('click', //type (what is it listening for)
    e => { //listener (function)
        if(e.target.id === 'clear') {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath(); //closes the previous path
        }
    }
);

toolbar.addEventListener('change',
    e => {
        if(e.target.id === 'plants'){
            switch (e.target.value){
                case 'carrot':
                    plant.src = 'images/carrot.png';
                    console.log('carrot');//debug
                    break;
                default:
                    plant.src = 'images/defaultP.png';
                    console.log('default');//debug
            }
        }
        if(e.target.id === 'numPlants'){
            numPlants = e.target.value;
        }
        if(e.target.id === 'periMode'){
            perimeterMode = e.target.checked;
            ctx.beginPath();
        }
    }
);


//CANVAS FUNCTIONALITY
const draw = e => {
    if(!isPainting){ return; }

    if(perimeterMode){
        ctx.lineTo(e.clientX - canvasOffsetX, e.clientY - canvasOffsetY);
        ctx.stroke();
    } 
    else{
        ctx.drawImage(plant, e.clientX - canvasOffsetX, e.clientY - canvasOffsetY, 25, 25);
    }
};

canvas.addEventListener('mousedown',
    e => {
        isPainting = true;
    }
);

canvas.addEventListener('mouseup',
    e => {
        isPainting = false;
        ctx.stroke(); //to color the line
    }
);

canvas.addEventListener('mousemove', draw); //to draw free form lines
canvas.addEventListener('mousedown', draw); //to create lines with vertices