import { Bunpress } from "../src";

import { notFound } from "../src/middleware/notFound";

const app = new Bunpress();

app.use(async (req, next) => {
  const res = await next();

  return res || notFound(req);
});


app.get("/", (req, res) => res.send("Hello from Bunpress!"));
app.get("/user", (req, res) => res.json({ name: "Abhinay", role: "creator" }));

app.get("/user/:id", (req,res) => {
  return res.json({userId: req.params?.id});
})

app.get("/posts/:postId/comments/:commentId", (req, res) => {
  return res.json({
    postId: req.params?.postId,
    commentId: req.params?.commentId,
  });
});




app.listen(3000);
