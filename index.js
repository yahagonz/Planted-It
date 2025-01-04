//event targets
const canvas = document.getElementById('drawing-board');
const toolbar = document.querySelector('.toolbar');
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
        if(e.target.matches('button.clear')) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath(); //closes the previous path
        }
    }
);

//TOOLBAR FUNCTIONALITY
toolbar.addEventListener('change',
    e => {
        if(e.target.matches('select.plant')){
            switch (e.target.value){
                case 'carrot':
                    plant.src = 'images/carrot.png';
                    break;
                default:
                    plant.src = 'images/defaultP.png';
            }
        }
        if(e.target.matches('input.numPlants')){
            numPlants = e.target.value;
            console.debug(numPlants);
        }
        if(e.target.matches('input.periMode')){
            perimeterMode = e.target.checked;
            ctx.beginPath();
        }
    }
);


//CANVAS FUNCTIONALITY
const draw = e => {
    if(!isPainting){ return; }

    const x = e.clientX - canvasOffsetX;
    const y = e.clientY - canvasOffsetY;

    if(perimeterMode){
        ctx.lineTo(x, y);
        ctx.stroke();
    } 
    else{
        ctx.drawImage(plant, x - 12, y - 12, 25, 25); //12 for half of the size of image
    }
};

//CANVAS FUNCTIONALITY
canvas.addEventListener('mousedown',
    e => {
        isPainting = true;
    }
);

//CANVAS FUNCTIONALITY
canvas.addEventListener('mouseup',
    e => {
        isPainting = false;
        ctx.stroke(); //to color the line
    }
);

//CANVAS FUNCTIONALITY
canvas.addEventListener('mousemove', draw); //to draw free form lines
canvas.addEventListener('mousedown', draw); //to create lines with vertices