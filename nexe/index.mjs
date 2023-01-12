import { createLinter, loadTextlintrc, loadFixerFormatter } from "textlint";
import express from "express";
import cors from "cors";

const app = express();
const port = 4237;

app.use(express.json())
app.use(express.urlencoded({
    extended: true,
    limit: "30mb"
}));

app.use(cors());

app.get("/", async (req, res) => {
    // res.send("Hello World!");

    const result = await lint(`食べれる\nイカれる\nお寿司たべれる\n彼処に向かうの`);
    // console.log(result);
    res.send(result.messages);
})

app.post("/", async (req, res) => {
    const inputText = req.body.lint;
    // console.log(inputText);

    const result = await lint(inputText);

    res.send(result.messages)
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


// descriptor is a structure object for linter
// It includes rules, plugins, and options
const descriptor = await loadTextlintrc({
    configFilePath: ".textlintrc",
    // node_modulesDir: "./node_modules"
});
const linter = createLinter({
    descriptor
});

async function lint(inputText) {
    const result = await linter.lintText(inputText, "./linted.txt");
    // console.log(JSON.stringify(result, null, '\t')); // fixed result

    return result;
}





// import { createLinter, loadTextlintrc, loadLinterFormatter } from "textlint";
// // descriptor is a structure object for linter
// // It includes rules, plugins, and options
// const descriptor = await loadTextlintrc({
//     configFilePath: ".textlintrc",
// });
// const linter = createLinter({
//     descriptor
// });
// const results = await linter.lintFiles(["*.md"]);
// // textlint has two types formatter sets for linter and fixer
// const formatter = await loadLinterFormatter({ formatterName: "stylish" })
// const output = formatter.format(results);
// console.log(results[0].messages);