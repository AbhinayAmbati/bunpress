import { Bunpress } from "../src";
import { staticFiles } from "../src/middleware/static";

const app = new Bunpress();

// Serve anything in ./public
app.use(staticFiles("./public"));

app.get("/", (req, res) => res.send("Static files ready — try /hello.txt"));


app.listen(3000);
