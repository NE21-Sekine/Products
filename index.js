class Product {
    constructor(id, name, price) {
      this.id = id;
      this.name = name;
      this.price = price;
    }
}

class ProductDB {
    constructor() {
      this.productNum = 0;
      this.products = [];
    }
  
    add(name, price) {
      this.products.push(new Product(this.productNum, name, price));
      this.productNum++;
    }
}

let foods = new ProductDB();

foods.add("ポッキー", 280);
foods.add("きのこの山", 190);
foods.add("たけのこの里", 190);