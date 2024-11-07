```js
const Nodemailer = require("nodemailer");
const { MailtrapTransport } = require("mailtrap");

const TOKEN = "18327037c5d455b9bb430f932f71fffe";

const transport = Nodemailer.createTransport(
  MailtrapTransport({
    token: TOKEN,
  })
);

const sender = {
  address: "hello@demomailtrap.com",
  name: "Masoandro Mood Clients",
};
const recipients = [
  "tendrytsilavinaakatsuki@gmail.com",
];

transport
  .sendMail({
    from: sender,
    to: recipients,
    subject: "Commande ",
    html: "<b>This is html test</b>",
    category: "Commande",
  })
  .then(console.log, console.error);
```