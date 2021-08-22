const express = require("express");
const exhbs = require("express-handlebars");
const products = require("./products.json"); //импорт продуктов с файла json
// COЗДАНИЕ WEBSERVER
const app = express(); //вызов фу-и, которая вернет обьект, с помощью которого можна сделать веб сервер

// НАСТРОИТЬ РАЗДАЧУ СТАТИЧЕСКИХ РЕСУРСОВ
// создать папку 'public'
//создать прослойку на обработку статики, что бы не дошло до обработчика
// app.use(express.static('public'))
app.use(express.static("public")); //регистрация мидлвара, прослойка на обработку статики

app.set("view engine", "hbs"); //зарегистрировать движок,установка handlebars, по умолчанию паг, можно переименовать на hbs

//

// настроить движок
app.engine(
  "hbs",
  exhbs({
    extname: "hbs", //настройка расширений
  })
);

//

//зарегистрировать app на какой то маршрут
// регистрация слушателя входящего соединениятзт
// REQUEST(req)-ЗАПРОС
// RESPONSE(res)-OТВЕТ
app.get("/", (req, res) => {
  //   console.log('Это колбек для app.get ("/")'); //TERMINAL-Это колбек для app.get ("/")
  //   console.log(req.url); //TERMINAL - /
  //   res.send({ name: "mango" }); //viewport - {"name":"mango"}
  //   res.send("<h1>Привет это / </h1>"); //viewport - Привет это /
  res.render("home", { pageTitle: "Домашняя страница" });
});
app.get("/about", (req, res) => {
  //   console.log('Это колбек для app.get ("/about")'); //TERMINAL-Это колбек для app.get ("/about")
  //   console.log(req.url); //TERMINAL /about
  //   res.send("<h1>Привет это /about </h1>"); //viewport - Привет это /about
  res.render("about", { pageTitle: "О нас" });
});

app.listen(4444, () => {
  console.log(`Aplication server is running on port ${4444}`);
}); //слушай порт 4444 и подними aplication server-->node app.js или npm run dev (в скриптах "dev": "node app.js")

//

// СОЗДАНИЕ РЕНДЕР ШАБЛОНА
//(https://medium.com/@waelyasmina/a-guide-into-using-handlebars-with-your-express-js-application-22b944443b65)
// npm install express-handlebars --save
// папка views в корне проэкта
// app.set("view engine", "handlebars");
// app.engine('handlebars', handlebars({layoutsDir: __dirname + '/views/layouts',}));
// const handlebars = require('express-handlebars'); можно переименовать на exhbs
// Во views добавить about.hbs и home.hbs --> обьявление шаблонов будущих страниц
// добавить в get - res.render("имя")
//Во views создать  папку layouts, в views файл main.hbs
// main.hbs -в боди -->   {{{body}}}
// res.render("about") равно по умолчанию res.render("about", {layout: 'main'});
//res.render("about"); содержимое about.hbs подставица в  {{{body}}} превратит в html и отправится клиенту

//

// добавить products.hbs
// Сделать для products.hbs обработчик
app.get("/products", (req, res) => {
  //если придет запрос на products,
  //   res.render("products"); //то отправь на клиент это

  res.render("products", {
    products,
    cssFileName: "products",
    pageTitle: "Наши продукты",
  });
});

// автоматический перезапуск webserver--> npm i nodemon -D
// "dev": "node app.js" поменять на "dev": "nodemon app.js"

// импортровать продукты с файла json
// в res.render("products") добавить свойства продактс --> res.render("products", {products});
// "products" - product.hbs
// {products} - в product.hbs будет заходить обьект со свойством {products}

// СТИЛИ
// main.hbs:
{
  /* <link rel="stylesheet" href="stylesheets/common.css" />
    <link rel="stylesheet" href="stylesheets/{{cssFileName}}.css" /> */
}
// app.js:
// res.render("products", { products, cssFileName: "products" });

// аналогично делается для всех запросов при рендере:
// 1.добавляется в stylesheets файл about.css
// 2.res.render("about") --> res.render("about", {cssFileName: "about" })

// НАВИГАЦИЯ через паршалы
// создать папку паршали с файлом сатнау
// в main.hbs -  {{> site-nav}} вставка разметки

// ДИНАМИЧЕСКИЙ ПАРАМЕТР
// productID имя свойства на обьекте
// статический параметр - /product/
//все что после : - динамический параметр
app.get("/product/:productID", (req, res) => {
  console.log(req.params); //если кликнуть на произвольный продукт то TERMINAL покажет ID- { productID: '0' }
  const product = products.find((p) => p.id === req.params.productID); //поиск продукта
  res.render("product", { product });
});

// ДЕПЛОЙ
// https://devcenter.heroku.com/articles/git#prerequisites-install-git-and-the-heroku-cli
//установить heroku.cli
//
