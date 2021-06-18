// noImplicitAny
const add10 = (number: number) => number + 10;


// strictPropertyInitialization
// noImplicitThis
// class Book {
//   name: string;
//   author: string;
//   pages: number;
//   constructor(name: string, author: string, totalPages: number) {
//     this.name = name;
//     this.author = author;
//     this.pages = totalPages;
//   }

//   isLastPageFunction() {
//     return (currentPage: number) => {
//       return this.pages === currentPage;
//     };
//   }
// }

// strictBindCallApply
const logNumber = (x: number) => {
  console.log(`number ${x} logged`);
};

logNumber.call(undefined, 10);


// strictNullChecks
interface Book {
  name: string;
  author: string;
}

const books: Book[] = [{ name: "test1", author: "max" }];

const getBookByAuthor = (author: string) => books.find(book => book.author = author);

const book = getBookByAuthor("john");

if (book) {
  console.log(book.name);
} else {
  console.log("book not found");
}

const logBookName = (book: Book | undefined) => {
  return book ? console.log(book.name) : console.log("not book");
};

logBookName(book);


// strictFunctionTypes
const getBookByName = (name: string | number) => {
  books.find(book => book.name === name);
};

type getBookByNameType = (name: string | number) => void;

const fn: getBookByNameType = getBookByName;


// keyof 
type Person = {
  name: string;
  surname: string;
  email: string;
};

type PersonKeys = keyof Person;
// PersonKeys = "name" | "surname" | "email"


// interface variable
// [P in keyof T]: T[P]
interface Demo {
  a: string;
  b: string;
}

type a = Demo['a'];

// conditional typing
// T extends U ? X : Y
type ConditionalType = string extends boolean ? string : boolean;

//  never, infer
const array: number[] = [1, 2, 3, 4];

type X = typeof array extends (infer U)[] ? U : never;

// generics
function addItem(item: string, array: string[]) {
  array = [...array, item];
  return array;
}

function addItem2<T extends boolean | string | Date>(item: T, array: T[]) {
  array = [...array, item];
  return array;
}

addItem2("hello", []);

addItem2(true, [true, false]);

addItem2(new Date(), []);

// mapped type
// partial 
type Partial1<T> = { [P in keyof T]?: T[P] | undefined; };

// exclude 
type Exclude1<T, U> = T extends U ? never : T;

type animals = "bird" | "cat" | "crocodile";

type mamals = Exclude1<animals, "crocodile">;

// custom mapped type
type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

type Person2 = {
  name: string;
  surname: string;
  email: string;
};

type User = Optional<Person, "email">;
type AnonymousUser = Optional<Person, "name" | "surname">;

type Optional1<T, K extends keyof T> = { [P in K]?: T[P] } & { [P in Exclude<keyof T, K>]: T[P] };

// unions
function logIdentifier(id: string | number) {
  console.log("id", id);
}

function logIdentifier2(id: string | undefined) {
  if (!id) {
    console.log("no identifier found");
  }

  console.log("id", id);
}

enum Vehicles {
  bike,
  plane
}

interface Vehicle {
  speed: number;
  type: Vehicles;
}

interface Bike extends Vehicle {
  ride: () => void;
  type: Vehicles.bike;
}

interface Plane extends Vehicle {
  fly: () => void;
  type: Vehicles.plane;
}

function useVehicle(vehicle: Bike | Plane) {
  switch (vehicle.type) {
    case Vehicles.bike:
      vehicle.ride();
      break;
    case Vehicles.plane:
      vehicle.fly();
    default:
      break;
  }
}

// generics
function addItem3(item: string, array: string[]) {
  array = [...array, item];
  return array;
}

function addItem4<T extends string | boolean>(item: T, array: T[]) {
  array = [...array, item];
  return array;
}

addItem4("hello", []);
addItem4(true, [true, false]);
// addItem4(new Date(), []);


// tuples
const array1: [string, number] = ["test", 12];

const array2 = ["test", 12] as const;

function foo(x: [startIndex: number, endIndex: number]) { }

// mapped types 
// Omit, Partial, Readonly, Readonly, Exclude, Extract, NonNullable, and ReturnType

// type Readonly<T> = { readonly [P in keyof T]: T[P] }
interface Teacher {
  name: string;
  email: string;
}

type ReadonlyTeacher = Readonly<Teacher>;

const t: ReadonlyTeacher = { name: "ben", email: "ben@example.com" };

// t.name = "john";

type Writeable<T> = { -readonly [P in keyof T]: T[P] };

const t1: Writeable<Teacher> = { name: "ben", email: "ben@test.com" };

t1.name = "john";

// type guards
function isNumber(x: any): x is number {
  return typeof x === "number";
}

function add1(value: string | number) {
  if (isNumber(value)) {
    return value + 1;
  }

  return +value + 1;
}

interface Hunter {
  hunt: () => void;
}


function isHunter(x: unknown): x is Hunter {
  return (x as Hunter).hunt !== undefined;
}

const performAction = (x: unknown) => {
  if (isHunter(x)) {
    x.hunt();
  }
};

const animal = {
  hunt: () => console.log("hunt")
};

performAction(animal);