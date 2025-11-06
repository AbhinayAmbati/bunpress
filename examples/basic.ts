import { Bunpress } from "../src";

const app = new Bunpress();

app.use(async (req, next) => {
  console.log(`${req.method} ${req.url}`);
  return await next();
});

app.get("/", (req, res) => res.send("Hello from Bunpress!"));
app.get("/user", (req, res) => res.json({ name: "Abhinay", role: "creator" }));

app.listen(3000);
