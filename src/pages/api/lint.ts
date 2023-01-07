import { NextApiRequest, NextApiResponse } from "next";
import { createLinter, loadTextlintrc, loadFixerFormatter } from "textlint";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const inputText = req.body.inputText;

  const text = await lint(inputText);

  res.status(200).json({ text: text });
};

export default handler;

const lint = async (inputText: string) => {
  // descriptor is a structure object for linter
  // It includes rules, plugins, and options
  const descriptor = await loadTextlintrc({
    configFilePath: ".textlintrc",
    // node_modulesDir: "./node_modules"
  });
  const linter = createLinter({
    descriptor,
  });
  const result = await linter.lintText(inputText, "./linted.txt");
  //   console.log(JSON.stringify(result, null, "\t")); // fixed result

  return result.messages;
};
