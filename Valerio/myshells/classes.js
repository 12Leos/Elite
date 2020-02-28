// installazione: se avete valeshell -> valeshell -n classes.js
// altrimenti -> rm ~/myshells/classes.js; cp ~/git/Elite/Valerio/myshells/classes.js ~/myshells;newalias classes "node ~/myshells/classes.js"

const { appendFile } = require('fs');
const { execSync } = require("child_process")
const cap = s => s.slice(0, 1).toUpperCase().concat(s.slice(1));
const classes = process.argv.slice(2).map(c => cap(c));
const slice = s => (/\..*$/.test(s) ? s.slice(0, -s.match(/\..*$/)[0].length) : s)
const usage = `Utilizzo: classes [fileNames[,.ieap]]\n
  classes main:
  classes name.m: crea un file contenente class Main o Name e
                  il metodo main all'interno;
  classes name: crea una class Name senza specificatore di visibilità
                (o meglio con specificatore default);
  classes name.p: crea public class Name;
  classes name.e: crea enum Name;
  classes name.i: crea interface Name;
  classes name.a: crea abstract class

  il nome di un file può contenere più flags come name.pa o name.ap crea
  un file Name con dentro "public abstract class Name {}"
`

function body(name) {
  const main = name === 'Main' || /\..*m/.test(name) ? "\tpublic static void main(String[] args) {\n\n\t}" : ''
  let type = 'class'
  if (/\..*i/.test(name))
    type = 'interface'
  if (/\..*e/.test(name))
    type = 'enum'
  if (/\..*a/.test(name))
    type = 'abstract class'
  if (/\..*p/.test(name))
    type = `public ${type}`
  name = slice(name)
  return `${type} ${name} {\n${main}\n}`;
}

if (!classes.length)
  console.error(`\n${__filename}:37\n  Errore: è richiesto almeno un argomento\n${usage}`)

if (classes[0] === '--edit')
  return execSync(`atom ${__filename}`);

for (c of classes) {
  const h = slice(c);
  appendFile(`${h}.java`, body(c), (err) => {
    if (err) throw err
    console.log(`Created ${process.cwd()}/${h}.java`);
  });
}
