// Prend les bibliothèques
const { Builder, By, Key, until } = require("selenium-webdriver");
const fs = require("fs");
// Lance Selenium
(async function example() {

    // choix du navigateur
  let driver = await new Builder()

  .forBrowser('chrome')
  .build();
  try {

    // Prend le contenu du fichier
    let fileContent = fs.readFileSync("liste.txt", "utf-8");
    let lines = fileContent.split("\n");
    for (let line of lines) {

    // Aller sur gmail.com
    await driver.get("https://example.com/");
    // Chercher la zone de text email
    await driver.wait(until.elementLocated(By.xpath('//*[@id="identifierId"]')), 10000);
    let element = await driver.findElement(By.xpath('//*[@id="identifierId"]'));
    // Mettre le texte
    await element.sendKeys(line);
    // Cliquer sur le boutton suivant 
    await driver.findElement(By.xpath('//*[@id="identifierNext"]/div/button/span')).click();
    // Patientez quelque seconde
    await driver.sleep(5000);
    let pageSource = await driver.getPageSource();
    if (pageSource.includes("Ok")) {
        const content = ""+line+"\n";
        fs.appendFile('itok.txt', content, (err) => {
          if (err) throw err;
        });

        } else {

        console.log("Invalide");
        }
    // Supprime les cookies
    await driver.manage().deleteAllCookies();
    }
  } finally {
     // ferme la page web
    await driver.quit();
  }
})();