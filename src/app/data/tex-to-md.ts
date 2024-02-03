import * as fs from "fs";
import * as path from "path";

function chunkArray(lines: string[]) {
  let chunks = [];
  let chunk = [];

  for (let line of lines) {
    if (line.startsWith("1. ") && chunk.length) {
      chunks.push(chunk);
      chunk = [];
    }
    chunk.push(line);
  }

  if (chunk.length) {
    chunks.push(chunk);
  }

  return chunks;
}

function saveMDFiles(sections: string[]) {
  // For each section, create a .md file
  let dayCounter = 0;
  let ukonyCounter = 0;

  // Remove first section - settings, first page etc.
  sections.shift();

  sections.forEach((section, i) => {
    if (section.includes("Úkony (ukazatel cesty) pro")) {
      ukonyCounter++;
      fs.writeFile(path.join(__dirname, "ukony", `${String(ukonyCounter).padStart(2, "0")}.md`), section, (err) => {
        if (err) throw err;
      });
    } else {
      dayCounter++;
      fs.writeFile(path.join(__dirname, "days", `${String(dayCounter).padStart(2, "0")}.md`), section, (err) => {
        if (err) throw err;
      });
    }
  });
}

// Read the .tex file
fs.readFile("./files/exodus90.tex", "utf8", (err, data) => {
  if (err) throw err;

  // Replace \textsuperscript{X} with <sup>X</sup>
  const replacement: [RegExp | string, string][] = [
    [/\\begin\{minipage\}\{\\dimexpr\\textwidth-20pt\}|\\end\{minipage\}/g, ""],
    [/\\begin{quote}\n\s*/, "> "],
    [/\\end\{quote\}/g, ""],
    [/\\textsuperscript\{(\d+)\}/g, "> <sup>$1</sup>"],
    [/\\subsection\*\{(.*)\}/g, "### $1"],
    [/\\section\*\{(.*)\}/g, "## $1"],
    [/\\section\{(.*)\}/g, "## $1"],
    [/\\textbf\{(.*)\}\n\\newline\n\\textit\{([\s\S]*?)\}/g, "**$1** \n $2"],
    [/\\textit\{([\s\S]*?)\}/g, "*$1*"],
    [/\\end\{document\}/g, ""],
    [/\\newpage/g, ""],
    [/% =====.*/g, ""],
    [/\\textbf\{(.*)\}/g, "**$1**"],
    [/\\begin\{enumerate\}|\\end\{enumerate\}/g, ""],
    [/\\item/g, "1."],
    [/\\newline/g, "\n\n"],
  ];
  replacement.forEach((replacer) => {
    data = data.replace(replacer[0], replacer[1]);
  });

  const weekNames = ["Prvni", "Druhy", "Treti", "Ctvrty", "Paty", "Sesty"];

  for (let weekName of weekNames) {
    let match = data.match(new RegExp(`\\\\newcommand\\{\\\\zacatek${weekName}Tyden\\}\\{([\\s\\S]*?)\\}`, "g"))[0];
    match = match.replace(new RegExp(`\\\\newcommand\\{\\\\zacatek${weekName}Tyden\\}\\{([\\s\\S]*?)\\}`, "g"), "$1");
  }

  data = data.replace(/^\*\n/g, "");

  const activities = data.match(/\### \d+\. (.*?)\n(.*?)\n/g)!;

  // console.log(activities);

  let splittedActivities: string[][] = [];
  const lines: string[] = [];
  activities.forEach((activity, i) => {
    activity = activity.replace(/### |\*|_/g, "");
    // activity = activity.replace(//g, "");
    lines.push(
      activity
        .split("\n")
        .map((line, i) => {
          if (i === 1) {
            line = "1. " + line;
            return line;
          } else return line;
        })
        .join("\n"),
    );
  });

  splittedActivities = chunkArray(lines);
  for (let index = 0; index < splittedActivities.length; index++) {
    splittedActivities[index].unshift("### Úkony (ukazatelé cesty)\n");
    splittedActivities[index].push(`
#### Modlitba
Modlete se, aby Pán osvobodil vás a vaše bratrství.
Modleme se za svobodu všech mužů v exodu, stejně tak, jako se oni modlí za vás.
Ve jménu Otce i Syna i Ducha svatého … Otče náš… Ve jménu Otce i Syna i Ducha svatého … Amen.`);
  }

  for (let index = 0; index < splittedActivities.length; index++) {
    data = data.replace(new RegExp(`\\\\zacatek${weekNames[index]}Tyden`, "g"), splittedActivities[index].join(""));
  }

  let sections = data.split(/%newday|%ukony/);
  console.log("Sections:", sections.length);

  saveMDFiles(sections);
});
