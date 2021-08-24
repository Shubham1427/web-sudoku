const express =  require("express")
const app = express();

app.set("view engine", "ejs");

app.use(express.static('js'))

app.get("/", (req, res) => {
    res.render("sudoku");
});

app.listen(3000, () => {
  console.log("server started on port 3000");
});