var moment = require("moment");
var Models = require("../models");
var bcrypt = require("bcrypt");

class Users {
  /**
  * Get list of users API
  */
  async getUserList(req, res) {
    try {
      Models.Users.findAll().then((users) => {
        if (users?.length == 0) {
          res.json({ status: 404, message: "Users Not Found!", data: users });
        }
        else if (users?.length > 0) {
          res.json({ status: 200, data: users });
        }

      })
    }
    catch (error) {
      res.json({ status: false, message: error });
    }
  }
  /**
  * Get user by id API
  */
  async getUserById(req, res) {
    try {
      let user_id = req.params.userId;
      Models.Users.findOne({
        where: { user_id: user_id },
      }).then((user) => {
        if (user == null || user == undefined || user?.length == 0) {
          res.json({ status: 404, message: "User Not Found!" });
        }
        else if (user != null || user != undefined)
          res.json({ status: 200, data: user });
      })
    }
    catch (error) {
      res.json({ status: false, message: "Failed!" });
    }
  }

  /**
  * Create a new user API
  */

  async newUser(req, res) {
    try {
      let data = req.body;

      if (data.user_email == undefined ||
        data.user_email == null ||
        data.user_email == "") {
        res.json({ status: 404, message: "User Email is Required!" });
      }

      if (data.username == undefined ||
        data.username == null ||
        data.username == "") {
        res.json({ status: 404, message: "User Name is Required!" });
      }
      if (data.password == undefined ||
        data.password == null ||
        data.password == "") {
        res.json({ status: 404, message: "Password is Required!" });
      }
      if (data.user_email != undefined ||
        data.user_email != null ||
        data.user_email != "" ||
        data.username == undefined ||
        data.username == null ||
        data.username == "" ||
        data.password == undefined ||
        data.password == null ||
        data.password == "") {

        const passwordhash = bcrypt.hashSync(data.password, 6)
        let dataForUser = {
          facility_id: data.facility_id,
          user_email: data.user_email,
          username: data.username,
          password: passwordhash,
          role_id: data.role_id,
          created_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
          updated_at: null,
          deleted_at: null,
          user_status: data.user_status
        };

        Models.Facility.findOne({
          where: { facility_id: data.facility_id },
        }).then((facilities) => {

          if (facilities == null) {
            const error = 'Facility Id not found!';
            res.json({ status: 400, message: error });
          }

          if (facilities != null) {
            Models.Users.findOne({
              where: { user_email: data.user_email },
            }).then((useremailExists) => {

              if (useremailExists || useremailExists == !null) {
                res.json({ status: 403, message: "User Email already Exists!" });
              }

              if (useremailExists == null ||
                useremailExists == undefined) {

                Models.Users.findOne({
                  where: { username: data.username },
                }).then((username) => {

                  if (username || username == !null) {
                    res.json({ status: 403, message: "User Name already Exists!" });
                  }
                  if (username == null || username == undefined) {

                    Models.Users.create(dataForUser).then((user) => {
                      res.json({ status: 200, message: "User Added Successfully!" });
                    })
                  }
                })
              }
            })
          }
        }
        )

      }
    }
    catch (error) {
      res.json({ status: false, message: "Failed !" });
    }
  }
  /**
  * Update existing user API
  */
  async updateUser(req, res) {
    try {
      let data = req.body;

      if (data.user_id == undefined ||
        data.user_id == null ||
        data.user_id == "") {
        res.json({ status: 404, message: "User Id is Required!" });
      }

      if (data.user_id != undefined ||
        data.user_id != null ||
        data.user_id != "") {
        //Password Comparison
        const passwordhash = bcrypt.hashSync(data.password, 6)

        let dataForUser = {
          facility_id: data.facility_id,
          user_email: data.user_email,
          username: data.username,
          password: passwordhash,
          role_id: data.role_id,
          updated_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
          user_status: data.user_status
        };

        Models.Users.findAll().then((useremailExists) => {

          if (useremailExists != null) {
            useremailExists?.map(user => {

              if (user.user_id != data.user_id) {
                let userdata = user;

                if (userdata.user_email == data.user_email) {
                  res.json({ status: 403, message: "User Email already Exists!" });
                }
                if (userdata.username == data.username) {
                  res.json({ status: 403, message: "User Name already Exists!" });
                }
                if (userdata.user_email != data.user_email && userdata.username != data.username) {
                  Models.Users.update(dataForUser, { where: { user_id: data.user_id } }).then((userUpdated) => {
                    if (userUpdated.indexOf(0) == -1) {
                      res.json({ status: 200, message: "User Updated Successfully!" });
                    }

                    if (userUpdated.indexOf(0) == 0) {
                      res.json({ status: 404, message: "Update Failed!" });
                    }
                  }
                  );
                }
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

const UserMaster = new Users();

module.exports = UserMaster;