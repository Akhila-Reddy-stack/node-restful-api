var moment = require("moment");
var Models = require("../models");

class Facility {
  /**
   * Get list of facilities API
   */
  async getFacilitiesList(req, res) {
    try {
      Models.Facility.findAll().then((facilities) => {
        if (facilities?.length == 0) {
          res.json({ status: 404, message: "Facilities Not Found!", data: facilities });
        }
        else if (facilities?.length > 0)
          res.json({ status: 200, data: facilities });
      })
    }
    catch (error) {
      res.json({ status: false, message: "Failed!" });
    }
  }

  /**
   * Get facility by facilityId API
   */
  async getFacilityById(req, res) {
    try {
      let facility_id = req.params.facilityId;
      Models.Facility.findOne({
        where: { facility_id: facility_id },
      }).then((facilities) => {
        if (facilities == null || facilities == undefined || facilities?.length == 0) {
          res.json({ status: 404, message: "Facility not Found!" });
        }
        else if (facilities != null || facilities != undefined)
          res.json({ status: 200, data: facilities });
      })
    }
    catch (error) {
      res.json({ status: false, message: "Failed!" });
    }
  }

  /**
   * Create a new facility API
   */
  async createFacility(req, res) {
    try {
      let data = req.body;
      let dataForFacility = {
        facility_name: data.facility_name,
        created_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        updated_at: null,
        deleted_at: null,
        facility_status: data.facility_status
      };

      if (data.facility_name == undefined ||
        data.facility_name == null ||
        data.facility_name == "") {
        res.json({ status: 404, message: "Facility Name is Required!" });
      }

      if (data.facility_name != undefined ||
        data.facility_name != null ||
        data.facility_name != "") {

        Models.Facility.findOne({
          where: { facility_name: data.facility_name },
        }).then((facilityExists) => {
          if (facilityExists || facilityExists == !null) {
            res.json({ status: 403, message: "Facility Name already Exists!" });
          }
          if ((facilityExists == null || facilityExists == undefined)) {

            Models.Facility.create(dataForFacility).then((facilities) => {

              res.json({ status: 200, message: "Facility Added Successfully!" });
            })
          }
        })
      }
    }
    catch (error) {
      res.json({ status: false, message: "Failed!" });
    }
  }

  /**
    * Update existing facility API
    */
  async updateFacility(req, res) {
    try {
      let data = req.body;

      let dataForFacility = {
        facility_name: data.facility_name,
        updated_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        facility_status: data.facility_status
      };

      if (data.facility_id == undefined ||
        data.facility_id == null ||
        data.facility_id == "") {
        res.json({ status: 404, message: "Facility Id is Required!" });
      }

      if (data.facility_id != undefined ||
        data.facility_id != null ||
        data.facility_id != "") {

        Models.Facility.findOne({
          where: { facility_name: data.facility_name },
        }).then((facilityExists) => {
          if (facilityExists || facilityExists == !null) {
            res.json({ status: 403, message: "Facility Name already Exists!" });
          }

          if ((facilityExists == null || facilityExists == undefined)) {
            Models.Facility.update(dataForFacility, {
              where: { facility_id: data.facility_id },
            }).then((facilityUpdated) => {
              if (facilityUpdated.indexOf(0) == -1) {
                res.json({ status: 200, message: "Facility Updated Successfully!" });
              }

              if (facilityUpdated.indexOf(0) == 0) {
                res.json({ status: 404, message: "Update Failed!" });
              }
            })
          }
        })
      }
    }
    catch (error) {
      res.json({ status: false, message: "Failed!" });
    }
  }
}

const FacilityMaster = new Facility();

module.exports = FacilityMaster;