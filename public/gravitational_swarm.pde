//import processing.opengl.*;

Attractor a;
Mover m;
ArrayList<Attractor> attractors;
ArrayList<Mover> movers;

void setup() {
  size(1200,700);
  background(255);
  
  movers = new ArrayList<Mover>();
  attractors = new ArrayList<Attractor>();
  PVector l = new PVector(width/2, height/2);
  PVector v = new PVector (random(0,5), random(0,5));
  a = new Attractor(l,v);
  attractors.add(a);
  
  for (int i = 0; i < 500; i++) {
    m = new Mover(random(0.1, 2), random(width), random(height));
    movers.add(m);
  }
}

void draw() {
  background(255);

  for (Attractor a: attractors){
    a.display(xPosition, yPosition);
  }
  
  for (int i = 0; i < movers.size(); i++) {
    Mover mov = (Mover) movers.get(i);
    PVector force = a.attract(mov);
    mov.applyForce(force);
    mov.run();
  }
}

class Attractor {
  float mass;         
  PVector location, velocity;   
  float g;

  Attractor(PVector _location, PVector _velocity) {
    location = _location;
    velocity  = _velocity;
    mass = 20;
    g = 1.4;
  }

  PVector attract(Mover m) {
    PVector force = PVector.sub(location,m.location);             
    float distance = force.mag();                                 
    distance = constrain(distance,5.0,25.0);                      
    force.normalize();                                            
    float strength = (g * mass * m.mass) / distance; 
    force.mult(strength);                                         
    return force;
  }

  void update(int newX, int newY){
   location.x = newX;
   location.y = newY;
   /*
   if(location.x > .75 * width || location.x < width/4){
    velocity.x = -1 * velocity.x;
   }
   
   if(location.y > .75 * height || location.y < height/4){
     velocity.y = -1 * velocity.y;
   }
   */
    location.add(velocity);
  }

  // Method to display
  void display(int _x, int _y) {
    stroke(0);
    fill(0);
    update(_x, _y);
    ellipse(location.x,location.y,20,20);
  }
}


class Mover {

  PVector location, velocity, acceleration;
  float mass;

  Mover(float m, float x, float y) {
    mass = m;
    location = new PVector(x, y);
    velocity = new PVector(random(-1,3), random(-1,5));
    acceleration = new PVector(0, 0);
  }

  void run() {
    //repel();
    update();
    display();
  }

  void applyForce(PVector force) {
    PVector f = PVector.div(force, mass);
    acceleration.add(f);
  }

  void repel() {
    Iterator<Mover> it = movers.iterator();
    while (it.hasNext ()) {
      Mover other = it.next();
      PVector bump = PVector.sub(location, other.location);
      float distance = bump.mag();
      if (distance <= mass*12) {
        bump.normalize();
        float strength = other.mass;
        bump.mult(strength);
        bump.div(14);
        acceleration.add(bump);
      }
    }
  }
  
  void update() {
    velocity.add(acceleration);
    velocity.div(1.01);
    location.add(velocity);
    acceleration.mult(0);
  }

  void display() {
    noStroke();
    fill(0, 0, 0, 80);
    ellipse(location.x, location.y, 5, 5);
  }
}



