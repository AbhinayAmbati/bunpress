import { Bunpress } from "../src";

const app = new Bunpress();

app.get("/", () => new Response("Hello from Bunpress!"));

app.get("/user", () =>
  new Response(JSON.stringify({ name: "Abhinay", role: "creator" }), {
    headers: { "Content-Type": "application/json" },
  })
);

app.listen(3000);
