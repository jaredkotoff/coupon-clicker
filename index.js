const sites = require('./sites');

let config = null;
try {
  config = require('./config.json');
} catch (err) {
  console.error('No config.json found!');
  return;
}

const runSite = async (site) => {
  if (!config[site.name]?.length) {
    console.error(`${site.name} not added to config.json!`);
    console.log('Moving to next site...');
    return;
  }

  console.log(`\n\n*****START: ${site.name.toUpperCase()}*******`);
  await config[site.name].reduce(async (memo, account) => {
    await memo;
    await site.function(account.email, account.password);
  }, undefined);

  console.log(`\n*****END: ${site.name.toUpperCase()}*******`);
};

const main = async () => {
  let sitesArray = Object.entries(sites);
  sitesArray = sitesArray.sort((a, b) => {
    const aPriority = config[a[0]]?.[0]?.priority || 999;
    const bPriority = config[b[0]]?.[0]?.priority || 999;
    return aPriority - bPriority;
  });

  for (let i = 0; i < sitesArray.length; i++) {
    await runSite({ name: sitesArray[i][0], function: sitesArray[i][1] });
  }
};

main();
