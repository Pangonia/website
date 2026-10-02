// canvas consts
const cvs = document.querySelector("canvas");
const ctx = cvs.getContext("2d");
cvs.width = window.innerWidth;
cvs.height = window.innerHeight;

// shape consts
const amountShapes = 10;
const radAInit = cvs.width / 25;//25;
const radBInit = radAInit;//cvs.height/20;//30;
const sizeGrowFactor = 1.005;
let resetPos = {
    x: 0,
    y: cvs.height / 2,
}

// window resize listener
window.addEventListener("resize", function () {
    cvs.width = window.innerWidth;
    cvs.height = window.innerHeight;
});

// mouse movements listener
/*let mouse = {
    x: undefined,
    y: undefined
};
window.addEventListener("mousemove", function (e) {
    mouse.x = e.x;
    mouse.y = e.y;
});*/

// mouse click listener
/*window.addEventListener("mouseup", function (e) {
    resetPos.x = e.x;
    resetPos.y = e.y;
});
*/

// classes for geometric shapes
class Ellipse {
    constructor(id, x, y, radA, radB) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.radA = radA;
        this.radB = radB;
        this.strokeAlpha = 0.1;
        /*this.strokeCol = 360  * Math.random();*/
      
    }

    draw = () => {
        // appearance
        
        ctx.strokeStyle = "rgba(152,139,56," + this.strokeAlpha + ")";
        /*ctx.strokeStyle = "hsl(" + (this.strokeCol) + ",100%,40%)";*/
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.radA, this.radB, 0, 0, 2 * Math.PI)
        ctx.stroke();
        ctx.closePath();
    };

    update = () => {
        // movement and interactivity
        this.radA *= sizeGrowFactor;
        this.radB *= sizeGrowFactor;
        let resetCondition = false;

        // distinction between landscape and portrait orientation
        if (cvs.width>cvs.height){
            this.strokeAlpha = Math.min(2*this.radA / cvs.width, 0.6);
            if (this.radA > cvs.width) resetCondition = true;
        } else {
            this.strokeAlpha = Math.min(2*this.radB / cvs.height, 0.6);
            if (this.radB > cvs.height) resetCondition = true;
        }

        if (resetCondition==true) {
            if (this.id == amountShapes) {
                resetPos.x = Math.random() * cvs.width;
                resetPos.y = Math.random() * cvs.height;
            }
            this.strokeAlpha = 0.0;
            this.radA = radAInit;
            this.radB = radBInit;
            this.x = resetPos.x;
            this.y = resetPos.y;
        }
    };

}

const shapeArray = [];
for (let i = 0; i < amountShapes; i++) {
    shapeArray.push(new Ellipse(i + 1, resetPos.x, resetPos.y, radAInit * i, radBInit * i));
}

// animation function which calls itself repeatedly
function animate() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    // call animation methods
    shapeArray.forEach(shape => {
        shape.update();
        shape.draw();
    });
    setTimeout(() => {
        requestAnimationFrame(animate);
      }, 1000 / 30); //30fps rendering
};

animate();
