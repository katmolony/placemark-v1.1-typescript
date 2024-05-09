import { EventEmitter } from "events";
import { assert } from "chai";
import { placemarkService } from "./placemark-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, greece, testLocations } from "../fixtures.js";

// import { maggie, mozart, testPXlaylists } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("Location API tests", () => {

  let user = null;
  
  setup(async () => {
    placemarkService.clearAuth();
    user = await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggie);
    await placemarkService.deleteAllLocations();
    await placemarkService.deleteAllUsers();
    user = await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggie);
    greece.userid = user._id;
  });


  teardown(async () => {});

  test("create location", async () => {
    const returnedLocation = await placemarkService.createLocation(greece);
    assert.isNotNull(returnedLocation);
    assertSubset(greece, returnedLocation);
  });

  test("delete a location", async () => {
    const location = await placemarkService.createLocation(greece);
    const response = await placemarkService.deleteLocation(location._id);
    assert.equal(response.status, 204);
    try {
      const returnedLocation = await placemarkService.getLocation(location.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Location with this id", "Incorrect Response Message");
    }
  });

  test("create multiple locations", async () => {
    for (let i = 0; i < testLocations.length; i += 1) {
      testLocations[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createLocation(testLocations[i]);
    }
    let returnedLists = await placemarkService.getAllLocations();
    assert.equal(returnedLists.length, testLocations.length);
    await placemarkService.deleteAllLocations();
    returnedLists = await placemarkService.getAllLocations();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant location", async () => {
    try {
      const response = await placemarkService.deleteLocation("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Location with this id", "Incorrect Response Message");
    }
  });
});