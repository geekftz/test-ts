abstract class Parent {
  abstract wearClothes(): void;
  abstract brushTeeth(): void;

  getUp() {
    this.wearClothes();
    this.brushTeeth();
  }
}

class Children extends Parent {
  // constructor() {
  //   super();
  // }

  wearClothes() {
    console.log(" wear Clothes ");
  }

  brushTeeth() {
    console.log(" brush Teeth ");
  }
}

const children = new Children();

children.getUp();
