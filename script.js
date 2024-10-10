console.log("Jake Riggs ALAB 308A.3.1");

// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";

async function getUserDataAwait(id) {
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

// getUserDataAwait(1);

//(if then's instead)

function getUserDataThen(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3,
  };

  return central(id).then((dbPicker) => {
    if (!dbs[dbPicker]) {
      return Promise.reject(new Error(`${dbPicker} is not available`));
    }
    return Promise.all([dbs[dbPicker](id), vault(id)]);
  }).then(([data, vaultContents]) => {
    const dataObject = { id, ...data, ...vaultContents };
    console.log(dataObject);
    return dataObject;
  }).catch((error) => {
    return Promise.reject(error);
  });
}




// getUserDataThen(5);

// Test Function
async function testGetUserData(promiseOrAsync) {

  const testData = [
      // { id: NaN, expected: "error" },
      { id: Infinity, expected: "error" },
      { id: -Infinity, expected: "error" },
      { id: [], expected: "error" },
      { id: null, expected: "error" },
      { id: true, expected: "error" },
      { id: false, expected: "error" },
      { id: {}, expected: "error" },
      { id: undefined, expected: "error" },
      // Error Causers
      { id: -1, expected: "error" },
      { id: 11, expected: "error" },
      { id: 0, expected: "error" },
      { id: "5", expected: "error" },
      { id: "string", expected: "error" },

      // Test non-number values
      { id: "", expected: "error" },
      // Valid ID's
      { id:  1, expected: "success" },
      { id:  2, expected: "success" },
      { id:  3, expected: "success" },
      { id:  4, expected: "success" },
      { id:  5, expected: "success" },
      { id:  6, expected: "success" },
      { id:  7, expected: "success" },
      { id:  8, expected: "success" },
      { id:  9, expected: "success" },
      { id: 10, expected: "success" },
      
  ];

  // Display Version Being Tested
  console.log(`Testing ${promiseOrAsync.toString()} version:`);

  // Test Each Case
  testData.forEach(({ id, expected }) => {

      // Call Correct Function
      if (promiseOrAsync === "await")
          getUserDataAwait(id)
      else
          getUserDataThen(id)

      // See If Results Pass
      .then((result) => {

          if (expected === "success") {
              console.log(`GOOD: Test passed for ID ${id}:`, result);
          } else {
              console.error(`BAD: Test passed for ${id} but should have failed!`);
          }
      })

      // Catch Errors
      .catch((error) => {

          if (expected === "error") { 
              console.log(`GOOD: Test failed for ID ${id}: as expcted with error message:${error.message}`);
          } else {
              console.error(`BAD: Test failed for ID ${id}, but should have passed.  Error message: ${error.message}`);
          }
      });
  });
}


// Test Speed of Code Loops

async function benchmarkGetUserData(promiseOrAsync, runCount = 10) {

  // Start Timing
  const startTime = Date.now();

  // Start Loop
  for (let i = 0; i < runCount; i++)

      // Call Correct Function for ID 1-10
      if (promiseOrAsync === "await")
          await getUserDataAwait(1)
      else
          await getUserDataThen(1);

  // End Timing
  const endTime = Date.now();

  // Measure Timing
  let seconds = Math.floor((endTime - startTime) / 1000);
  let milliseconds = Math.floor((endTime - startTime) % 1000);

  // Show Timing
  if (seconds > 0)
      console.log(`Running ${promiseOrAsync.toString()} version ${runCount} times in a loop took: ${seconds}.${milliseconds} seconds`);
  else
      console.log(`Running ${promiseOrAsync.toString()} version ${runCount} times in a loop took: ${milliseconds} milliseconds`);
}

// Start and Log Tests

await testGetUserData("await")
.then(() => console.log("Await Test Finished. Running Promise Test"))
.then(() => testGetUserData("then"))
.then(() => console.log("Then Test finished. Running ASYNC Bencharmark"))
.then(() => benchmarkGetUserData("await"))
.then(() => console.log("Await Benchmark Finished. Running PROMISE Benchmark"))
.then(() => benchmarkGetUserData("then"))
.then(() => console.log("All Tests Finished. All Done."));