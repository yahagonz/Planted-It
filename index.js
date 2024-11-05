//event targets
const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');

//distance camera has from the view port - helps calculate canvas size
const canvasOffsetX = canvas.offsetLeft; //70px b/c of toolbar
const canvasOffsetY = canvas.offsetTop; //0px b/c there's nothing above

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;
ctx.lineWidth = 3; //arbitrary number
ctx.lineCap = 'square'; //crisper corners

let isPainting = false;
let numPlants = 5;
var plant = new Image();
// let startX;
// let startY;

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
                    plant.src = 'carrot.png';
                    console.log('carrot');
                    break;
                default:
                    plant.src = 'defaultP.png';
                    console.log('default');
            }
        }
        if(e.target.id === 'numPlants'){
            numPlants = e.target.value;
        }
    }
);


//CANVAS FUNCTIONALITY
const draw = e => {
    if(!isPainting){ return; }

    ctx.lineTo(e.clientX - canvasOffsetX, e.clientY);
    ctx.drawImage(plant, 100, 100, 25, 25);
    ctx.stroke();
};

//this shows the path WHILE drawing
canvas.addEventListener('mousedown',
    e => {
        isPainting = true;
        // startX = e.clientX;
        // startY = e.clientY;
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