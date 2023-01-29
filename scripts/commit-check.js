const fs = require("fs"),
path = require("path");

const blackWords = ["bnpm"];

const files = [
  {
    name: "yarn.lock",
    path: "../yarn.lock",
    encoding: "utf8",
  },
];

const codeCheck = () => {
  let flag = 0;
  files.forEach((file) => {
    try {
      const realPath = path.join(__dirname, file.path);

      const data = fs.readFileSync(
        realPath,
        // ByteSec: ignore Remote code execution
        file.encoding
      );

      blackWords.forEach((word) => {
        const pos = data.indexOf(word);
        if (pos !== -1) {
          console.error(
            `find black word "${word}" in file "${file.name}" (path: ${realPath}, pos: ${pos})`
          );
          return (flag = 1);
        }
      });
    } catch (err) {
      console.error(err);
      flag = 1;
    }
  });

  return flag;
};

process.exit(codeCheck());