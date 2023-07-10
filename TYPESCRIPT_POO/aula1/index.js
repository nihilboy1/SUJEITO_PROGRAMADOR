var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Creature = /** @class */ (function () {
    function Creature(type) {
        this.type = type;
    }
    Creature.prototype.comunicate = function () {
        console.log("raw, raw, raw, raw");
    };
    return Creature;
}());
var Human = /** @class */ (function (_super) {
    __extends(Human, _super);
    function Human(vision, audition, type) {
        var _this = _super.call(this, type) || this;
        _this.vision = vision;
        _this.audition = audition;
        return _this;
    }
    Human.prototype.comunicate = function () {
        console.log("uga buga");
    };
    return Human;
}(Creature));
var Person = /** @class */ (function (_super) {
    __extends(Person, _super);
    function Person(name, age, type, vision, audition) {
        var _this = _super.call(this, vision, audition, type) || this;
        _this.age = age;
        _this.name = name;
        return _this;
    }
    Person.prototype.comunicate = function () {
        console.log("hello");
    };
    return Person;
}(Human));
var person1 = new Person("João", 10, "sapiens", true, true);
var human1 = new Human(true, true, "sapiens");
human1.comunicate();
person1.comunicate();
