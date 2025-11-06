import { Bunpress } from "../src";
import { staticFiles } from "../src/middleware/static";

import { notFound } from "../src/middleware/notFound";


const app = new Bunpress();

app.use(async (req, next) => {
  const res = await next();

  return res || notFound(req);
});

// Serve anything in ./public
app.use(staticFiles("../public"));

app.get("/", (req, res) => res.send("Static files ready — try /hello.txt"));


app.listen(3000);
