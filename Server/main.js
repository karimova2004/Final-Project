const express = require("express");

var cors = require("cors");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const mysql = require("mysql2");
app.use(cors());
app.get("/:id", (req, res) => {
  const { id } = req.params;
  console.log(typeof id);
  connection.query(
    `select coinId,CoinName,CoinAbout,IssuingCountry,Composition,Quality,Denomination,year,Weight,Price,categories.CategoryName,categories.CategoryId from coins,categories where coins.CategoryId = categories.CategoryId and coins.CategoryId =${+id}`,
    (error, results) => {
      if (!error) {
        res.status(200).json(results);
        return;
      }
      console.error("Error executing query:", error.message);
      res.status(404).json(error.message);
    }
  );
});

// app.get("/", (req, res) => {
//   console.log(req.query);
//   console.log(+req.query["price-from"]);
//   const query = `select * from coins where (IssuingCountry='${
//     req.query.country
//   }' and Composition='${req.query.metal}' and Quality='${
//     req.query.quality
//   }' and Price BETWEEN ${
//     +req.query["price-from"] > 0 ? req.query["price-from"] : ""
//   } AND ${+req.query["price-to"]}  and year BETWEEN ${+req.query[
//     "year-from"
//   ]} AND ${+req.query["year-to"]} )`;
//   console.log(query);
//   connection.query(query, (error, results) => {
//     if (!error) {
//       res.status(200).json(results.json);
//       return;
//     }
//     console.error("Error executing query:", error.message);
//     res.status(404).json(error.message);
//   });
// });

app.get(`/`, (req, res) => {
  console.log(req.query.q);
  connection.query(
    `select * from coins where CoinAbout like '%${req.query.q}%'`,
    (error, results) => {
      if (!error) {
        res.status(200).json(results);
        return;
      }
      console.error("Error executing query:", error.message);
      res.status(404).json(error.message);
    }
  );
});

// app.delete("/delete/:name", (req, res) => {
//   const { name } = req.params;
//   console.log(req.params);

//   const query = "DELETE FROM coins WHERE CoinName = ?";
//   connection.query(query, [name], (error, results) => {
//     if (!error) {
//       res.status(200).json(results);
//       return;
//     }
//     console.error("Error executing query:", error.message);
//     res.status(500).json({ error: error.message });
//   });
// });

app.delete(`/delete/:id`, (req, res) => {
  connection.query(
    `DELETE FROM coins WHERE coinId='${req.params.id}'`,
    (error, results) => {
      if (!error) {
        console.log(results);
        res.status(200).json(results);
        console.log(`silindi`);
        return;
      }
      console.error("Error executing query:", error.message);
      res.status(404).json(error.message);
    }
  );
});

app.post(`/add-coin/`, (req, res) => {
  console.log(req.body);
  const {
    CoinName,
    CoinAbout,
    IssuingCountry,
    Composition,
    Quality,
    Denomination,
    year,
    Weight,
    Price,
  } = req.body;
  const insert = `INSERT INTO coins (CoinName, CoinAbout, IssuingCountry, Composition, Quality, Denomination, year, Weight, Price)
  VALUES (${CoinName ? `"${CoinName}"` : null}, ${
    CoinAbout ? `"${CoinAbout}"` : null
  }, ${IssuingCountry ? `"${IssuingCountry}"` : null}, ${
    Composition ? `"${Composition}"` : null
  }, ${Quality ? `"${Quality}"` : null}, ${
    Denomination ? `"${Denomination}"` : null
  } , ${year ? +year : null}, ${Weight ? +Weight : null}, ${
    Price ? +Price : null
  })`;

  connection.query(insert, (error, results) => {
    if (!error) {
      console.log(results);
      res.status(201).json(results);
      console.log(`yaradildi`);
      return;
    }
    console.error("Error executing query:", error.message);
    res.status(404).json(error.message);
  });
});

app.put(`/:id`, (req, res) => {
  const { id } = req.params;
  const {
    CoinName,
    CoinAbout,
    IssuingCountry,
    Composition,
    Quality,
    Denomination,
    year,
    Weight,
    Price,
  } = req.body;
  console.log(id);
  console.log(req.body);
  const query = `UPDATE coins
  SET CoinName = '${CoinName}', CoinAbout = '${CoinAbout}', IssuingCountry='${IssuingCountry}', Composition='${Composition}', Quality='${Quality}',Denomination='${Denomination}',year=${year},Weight=${+Weight}, Price=${Price}
  WHERE coinId = ${id}`;

  connection.query(query, (error, results) => {
    if (!error) {
      console.log(results);
      res.status(201).json(results);
      console.log(`Deyisiklikler edildi`);
      return;
    }
    console.error("Error executing query:", error.message);
    res.status(404).json(error.message);
  });
});

app.listen("4000", (err) => {
  if (!err) console.log("running port");
});

const connection = mysql.createConnection({
  host: process.env.host,
  user: "root",
  password: "1234",
  database: "coindb",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err.message);
    return;
  }
  console.log("Connected to MySQL database");
});
