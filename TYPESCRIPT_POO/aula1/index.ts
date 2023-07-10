class Creature {
  type: string;

  constructor(type: string) {
    this.type = type;
  }

  public comunicate() {
    console.log("raw, raw, raw, raw");
  }
}

class Human extends Creature {
  vision: boolean;
  audition: boolean;

  constructor(vision: boolean, audition: boolean, type: string) {
    super(type);
    this.vision = vision;
    this.audition = audition;
  }

  public comunicate() {
    console.log("uga buga");
  }
}

class Person extends Human {
  name: string;
  age: number;

  constructor(
    name: string,
    age: number,
    type: string,
    vision: boolean,
    audition: boolean
  ) {
    super(vision, audition, type);
    this.age = age;
    this.name = name;
  }

  public comunicate() {
    console.log("hello");
  }
}

const person1 = new Person("João", 10, "sapiens", true, true);
const human1 = new Human(true, true, "sapiens");
human1.comunicate();
person1.comunicate();
