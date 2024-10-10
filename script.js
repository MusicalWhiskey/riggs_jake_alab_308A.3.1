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
      return Promise.reject(Error(`${dbPicker} is not available`));
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

//(if then's instead)

// function getUserData(id) {
//   const dbs = {
//     db1: db1,
//     db2: db2,
//     db3: db3,
//   };

//   return central(id).then((dbPicker) => {
//     if (!dbs[dbPicker]) {
//       return Promise.reject(new Error(`${dbPicker} is not available`));
//     }
//     return Promise.all([dbs[dbPicker](id), vault(id)]);
//   }).then(([data, vaultContents]) => {
//     const dataObject = { id, ...data, ...vaultContents };
//     console.log(dataObject);
//     return dataObject;
//   }).catch((error) => {
//     return Promise.reject(error);
//   });
// }


getUserData(5);