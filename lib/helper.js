module.exports = {
  replacePkgName(stdout, str) {
    return stdout.replace(/("name"\s*:)\s*(".*"),.*/gim, `$1"${str}",`);
  },
  replaceDbContent(stdout, dbName) {
    return stdout.replace("{__DBNAME__}", dbName);
  },
  replaceProjectName(stdout, name) {
    return stdout.replace(/{name}/gim, name);
  }
};
