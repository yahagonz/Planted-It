//event targets
const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');

//distance camera has from the view port - helps calculate canvas size
const canvasOffsetX = canvas.offsetLeft; //0px b/c there's nothing beside it
const canvasOffsetY = canvas.offsetTop; //70px b/c of the toolbar above

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let lineWidth = 5;
let startX;
let startY;

//TOOLBAR FUNCTIONALITY
toolbar.addEventListener('click', //type
    e => { //listener
        if(e.target.id === 'clear') {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
);

toolbar.addEventListener('change',
    e => {
        if(e.target.id === 'stroke'){
            ctx.strokeStyle = e.target.value;
        }
        if(e.target.id === 'lineWidth'){
            lineWidth = e.target.value;
        }
    }
);


//CANVAS FUNCTIONALITY
const draw = e => {
    if(!isPainting){
        return;
    }

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineTo(e.clientX - canvasOffsetX, e.clientY - canvasOffsetY);
    ctx.stroke();
};

canvas.addEventListener('mousedown',
    e => {
        console.log('mouse down'); //debug
        isPainting = true;
        startX = e.clientX;
        startY = e.clientY;
    }
);

canvas.addEventListener('mouseup',
    e => {
        console.log('mouse up'); //debug
        isPainting = false;
        ctx.stroke(); //to color the line
        ctx.beginPath(); //closes the previous path
    }
);

canvas.addEventListener('mousemove', draw);