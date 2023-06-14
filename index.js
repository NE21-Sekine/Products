const express = require('express');
const app = express();
const PORT = 8082;

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

app.get('/', (req, res) => {
    res.contentType('json');
    res.header('Access-Control-Allow-Origin', '*');
    res.send({result:foods.length, data:foods});
});

app.get('/request', (req, res) => {
    if (req.query.cmd == "search"){
        let result = { err: "", result: 0, data: [] };
        res.contentType('json');
        res.header('Access-Control-Allow-Origin', '*');
        if (req.query.name != null){
            foods.products.forEach(e => {
                if (e.name == req.query.name) {
                    result.result++;
                    result.data.push(e);
                }
            });
        }else {
            result.err = "Seach name not specified"
        }
        if (result.result == 0) result.err = "Item with that name does not exist"
        res.send(result);
    }
    else if (req.query.cmd == "all"){
        res.contentType('json');
        res.header('Access-Control-Allow-Origin', '*');
        res.send({result:foods.length, data:foods});
    }
});

app.get('/add', (req, res) => {
    res.contentType('json');
    res.header('Access-Control-Allow-Origin', '*');
    foods.add(req.query.name, Number(req.query.price))
    res.send({result:foods.length, data:foods});
});

app.listen(process.env.PORT || PORT);