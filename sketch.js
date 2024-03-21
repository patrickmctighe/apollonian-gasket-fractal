
let allCircles=[];
let queue = [];
let epsilon = 0.1;
function setup() {
  createCanvas(800, 800);

  let c1 = new Circle(-1/(width/3), width/2, height/2);
let r2 = random(100, c1.radius /2)

let v = p5.Vector.fromAngle(random(TWO_PI));
v.setMag(c1.radius-r2);

  let c2 = new Circle(1/r2, width/2 + v.x, height/2 + v.y);

  let r3 = v.mag();
  v.rotate(PI);
v.setMag(c1.radius-r3);

 let c3 = new Circle(1/r3, width/2+v.x, height/2+v.y);
 allCircles=[c1, c2, c3];
 queue = [[c1, c2, c3]];
  

}

function validate(c4,c1, c2, c3){
  console.log("validate");
  if(c4.radius <2) return false;
  for(let other of allCircles){
    let d = c4.dist(other);
    let radiusDiff = abs(c4.radius - other.radius);
    if(d < epsilon && radiusDiff < epsilon){
         console.log("too close");
      return false;
   
    }
  }

  if(!isTangent(c4,c1)) return false;
  if(!isTangent(c4,c2)) return false;
  if(!isTangent(c4,c3)) return false;


  console.log("valid");
  return true;

}

function isTangent(c1,c2){
let d = c1.dist(c2);
let r1 = c1.radius;
let r2 = c2.radius;

let a = d - (r1 + r2) < epsilon ;
let b = d - abs(r2 - r1 ) < epsilon;

return a || b; 
 }

function nextGeneration(){
  console.log("mouse pressed");
  let nextQueue = [];
  for (let triplet of queue){
    let [c1,c2,c3] = triplet;
    let k4 = descartes(c1, c2, c3);
    let r4 = abs(1/k4[1]);
    let newCircles = complexDescartes(c1, c2, c3, k4);

    for (let newCircle of newCircles){
      if(validate(newCircle, c1, c2, c3)){  
      allCircles.push(newCircle);
    let t1 = [c1, c2, newCircle];
    let t2 = [c1, c3, newCircle];
    let t3 = [c2, c3, newCircle];
    nextQueue =  nextQueue.concat([t1, t2, t3]);}

    }
  }
  queue = nextQueue;
}

function draw(){
  background(255);
nextGeneration();
  for(let c of allCircles){
    c.show();
  }


//   let k4 = descartes(c1, c2, c3)
//   let r4 = abs(1/k4[1])

// let allCircles = complexDescartes(c1, c2, c3, k4);
// allCircles[0].show();
// allCircles[1].show();
// allCircles[2].show();
// allCircles[3].show();


  
}

function complexDescartes(c1, c2, c3, k4){
  let k1 = c1.bend;
  let k2 = c2.bend;
  let k3 = c3.bend;
  let z1 = c1.center;
  let z2 = c2.center;
  let z3 = c3.center;

  let zk1 = z1.scale(k1);
  let zk2 = z2.scale(k2);
  let zk3 = z3.scale(k3);
  let sum = zk1.add(zk2).add(zk3);

  let root = zk1.mult(zk2).add(zk2.mult(zk3)).add(zk1.mult(zk3));

  root = root.sqrt().scale(2);

let center1 = sum.add(root).scale(1/k4[0]);
let center2 =  sum.sub(root).scale(1/k4[0]);
let center3 = sum.add(root).scale(1/k4[1]);
let center4 = sum.sub(root).scale(1/k4[1]);

return [
  new Circle(k4[0], center1.a, center1.b),
  new Circle(k4[0], center2.a, center2.b),
  new Circle(k4[1], center3.a, center3.b),
  new Circle(k4[1], center4.a, center4.b)

]

}


function descartes(c1, c2, c3){
  let k1 = c1.bend;
  let k2 = c2.bend;
  let k3 = c3.bend;

  let sum = k1 + k2 + k3;
  let product = abs(k1 * k2 + k2 * k3 + k1 * k3);
  let root = 2*sqrt(product);

  return [sum + root, sum - root ]
}

