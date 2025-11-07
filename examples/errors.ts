import { Bunpress } from "../src";
import { notFound } from "../src/middleware/notFound";

const app = new Bunpress();

app.use(async (req, next) => {
  const res = await next();
  return res || notFound(req);
});

app.get("/", (req, res) => res.send("Welcome to Bunpress!"));

app.get("/crash", () => {
  throw new Error("Something exploded 💥");
});

// ✅ Centralized error handler
app.useError((err, req, res) => {
  console.error("Caught globally:", err.message);
  return res.status(500).json({
    error: "Internal Error",
    details: err.message,
  });
});

app.listen(3000);
