console.log("ALAB 308A.3.1");

// // Importing database functions. DO NOT MODIFY THIS LINE.
// import { central, db1, db2, db3, vault } from "./databases.js";



// function getUserData(id) {
//     const dbs = {
//       db1: db1,
//       db2: db2,
//       db3: db3
//     };
//   }
  

//   async function getUserData(id) {
//     if (typeof id !== "number" || id < 1 || id > 10) {
//       throw new Error("Invalid ID. Please provide a number between 1 and 10.");
//     }
//     try {
//       // Get the database identifier from central
//       const dbIdentifier = await central(id);
//       // Fetch user data and vault data concurrently
//       const [userData, vaultData] = await Promise.all([
//         dbs[dbIdentifier](id),
//         vault(id),
//       ]);
//       // Combine the data
//       return {
//         id,
//         ...vaultData,
//         username: userData.username,
//         website: userData.website,
//         company: userData.company,
//       };
//     } catch (error) {
//       if (error.message.includes("db")) {
//         throw new Error(`Database ${error.message} failed`);
//       }
//       throw error;
//     }
//   }
//   // Example usage:
//   getUserData(5)
//     .then((user) => console.log(user))
//     .catch((error) => console.error(error));