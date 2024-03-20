
let c1, c2, c3

function setup() {
  createCanvas(400, 400);

   c1 = new Circle(-1/200, 200, 200);
   c2 = new Circle(1/100, 100, 200);
   c3 = new Circle(1/100, 300, 200);
  

}

function draw(){
  background(255);

  c1.show();
  c2.show();
  c3.show();

  let k4 = descartes(c1, c2, c3)
  let r4 = abs(1/k4)
  circle(mouseX,mouseY, r4*2);
}

function descartes(c1, c2, c3){
  let k1 = c1.bend;
  let k2 = c2.bend;
  let k3 = c3.bend;

  let sum = k1 + k2 + k3;
  let root = 2*sqrt(k1 * k2 + k2 * k3 + k1 * k3);

  return [sum + root, sum - root ]
}

