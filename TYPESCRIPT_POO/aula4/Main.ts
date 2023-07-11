import { Attendant } from "./Attendant";
import { Car } from "./Car";
import { Consumer } from "./Consumer";
import { Store } from "./Store";

const car = new Car("Logan", 1998, 10000);
const consumer = new Consumer("João", 50000);
const attendant = new Attendant("Paulo");

const store = new Store(consumer, car, attendant);
