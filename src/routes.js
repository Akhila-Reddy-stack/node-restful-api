var express = require("express");
var router = express.Router();
const UserMaster = require("./controllers/users");
const FacilityMaster = require("./controllers/facilities");
const UserLogin = require("./controllers/userLogin");

// Users API
router.get("/users", UserMaster.getUserList);
router.get(`/users/:userId`, UserMaster.getUserById);
router.post("/users", UserMaster.newUser);
router.put("/users", UserMaster.updateUser);

// facilities API
router.get("/facilities", FacilityMaster.getFacilitiesList);
router.get(`/facilities/:facilityId`, FacilityMaster.getFacilityById);
router.post("/facilities", FacilityMaster.createFacility);
router.put("/facilities", FacilityMaster.updateFacility);

// Authentication API
router.post("/register", UserLogin.NewUser);
router.post("/login", UserLogin.UserLogin);
router.post("/logout", UserLogin.Logout);

module.exports = router;