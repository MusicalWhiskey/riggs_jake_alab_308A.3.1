console.log("Jake Riggs ALAB 308A.3.1");

// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";

async function getUserData(id) {
  let dbs = {
    db1: db1,
    db2: db2,
    db3: db3,
  };
  //Try Picking DataBase
  try {
    const dbPicker = await central(id);
    if (!dbs[dbPicker]) {
      return Promise.reject(Error(`${dbPicker} not available`));
    }
    //Promise All
    const [data, vaultContents] = await Promise.all([dbs[dbPicker](id), vault(id)]);
    const dataObject = { id, ...data, ...vaultContents };
    console.log(dataObject);

    //Catch
  } catch (error) {
    return Promise.reject(error);
  }
}
getUserData(10);