const express = require("express");
// COЗДАНИЕ WEBSERVER
const app = express(); //вызов фу-и, которая вернет обьект, с помощью которого можна сделать веб сервер

// НАСТРОИТЬ РАЗДАЧУ СТАТИЧЕСКИХ РЕСУРСОВ
// создать папку 'public'
//создать прослойку на обработку статики, что бы не дошло до обработчика
// app.use(express.static('public'))
app.use(express.static("public")); //регистрация мидлвара, прослойка на обработку статики

//зарегистрировать app на какой то маршрут
// регистрация слушателя входящего соединениятзт
// REQUEST(req)-ЗАПРОС
// RESPONSE(res)-OТВЕТ
app.get("/", (req, res) => {
  console.log('Это колбек для app.get ("/")'); //TERMINAL-Это колбек для app.get ("/")
  console.log(req.url); //TERMINAL - /
  //   res.send({ name: "mango" }); //viewport - {"name":"mango"}
  res.send("<h1>Привет это / </h1>"); //viewport - Привет это /
});
app.get("/about", (req, res) => {
  console.log('Это колбек для app.get ("/about")'); //TERMINAL-Это колбек для app.get ("/about")
  console.log(req.url); //TERMINAL /about
  res.send("<h1>Привет это /about </h1>"); //viewport - Привет это /about
});

app.listen(4444, () => {
  console.log(`Aplication server is running on port ${4444}`);
}); //слушай порт 4444 и подними aplication server-->node app.js или npm run dev (в скриптах "dev": "node app.js")

// СОЗДАНИЕ РЕНДЕР ШАБЛОНА
//(https://medium.com/@waelyasmina/a-guide-into-using-handlebars-with-your-express-js-application-22b944443b65)
// npm install express-handlebars --save
