//event targets
const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');

//distance camera has from the view port - helps calculate canvas size
const canvasOffsetX = canvas.offsetLeft; //70px b/c of toolbar
const canvasOffsetY = canvas.offsetTop; //0px b/c there's nothing above

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let numPlants = 5;
// let startX;
// let startY;

//TOOLBAR FUNCTIONALITY
toolbar.addEventListener('click', //type
    e => { //listener
        if(e.target.id === 'clear') {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath(); //closes the previous path
        }
    }
);

toolbar.addEventListener('change',
    e => {
        if(e.target.id === 'stroke'){
            ctx.strokeStyle = e.target.value;
        }
        if(e.target.id === 'numPlants'){
            numPlants = e.target.value;
        }
    }
);


//CANVAS FUNCTIONALITY
const draw = e => {
    if(!isPainting){ return; }

    ctx.lineWidth = 3;
    ctx.lineCap = 'square';
    ctx.lineTo(e.clientX - canvasOffsetX, e.clientY);
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
        // ctx.beginPath(); //closes the previous path
    }
);

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', draw);