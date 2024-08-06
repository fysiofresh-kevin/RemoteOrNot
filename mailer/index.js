import express from "express";
import Mailgun from "mailgun-js";
import { supabase } from "./supabase.js";

const app = express();

const api_key = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN;
const from_who = `Kevin Alex Nielsen <mailgun@${domain}>`;

const getRecipients = async () => {
  const { data } = await supabase.auth.admin.listUsers();
  if (data.users.length !== 0) {
    const emails = data.users.map((u) => u.email);
    return emails;
  } else {
    return [];
  }
};

app.get("/api/sendmail", async (req, res) => {
  console.log("Sending email")
  const mg = new Mailgun({ apiKey: api_key, domain: domain });
  const recipients = await getRecipients();
  console.log(recipients)
  const { data: dbData } = await supabase.auth.admin.listUsers();
  if (dbData.users.length !== 0) {
    const emails = dbData.users.map((u) => u.email);
    const html = `<h1>Hello!</h1><p>These collegues are in the office today:</p><ul>${emails.map((e) => `<li>${e}</li>`).join("")}</ul>`;
    const data = {
      //Specify email data
      from: from_who,
      //The email to contact
      // to: recipients,
      to: ["keveran@gmail.com"],
      //Subject and text data
      subject: "These collegues are in the office today",
      html: html,
    };
    mg.messages().send(data, (error, body) => {
      if (error) {
        console.log(error);
        res.status(500).json({ error: "Error sending email" });
      } else {
        console.log(body);
        res.status(200).json({ message: "Email sent successfully" });
      }
    });
  } else {
    res.status(500).json({ error: "No users found" });
  }
});

app.listen(3000, () => {
  console.info("Server listening on port 3000");
})
