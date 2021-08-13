var Models = require("../models");
var bcrypt = require("bcrypt");
var moment = require("moment");
class Login {
    /**
    * Register API 
    */
    async NewUser(req, res) {
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
            if (data.facility_id == undefined ||
                data.facility_id == null ||
                data.facility_id == "") {
                res.json({ status: 404, message: "Facility Id is Required!" });
            }
            if (data.user_email != undefined &&
                data.user_email != null &&
                data.user_email != "" &&
                data.username != undefined &&
                data.username != null &&
                data.username != "" &&
                data.password != undefined &&
                data.password != null &&
                data.password != "" &&
                data.facility_id != undefined &&
                data.facility_id != null &&
                data.facility_id != "") {
              
                const passwordhash = bcrypt.hashSync(data.password, 6)

                let dataForUsers = {
                    user_email: data.user_email,
                    username: data.username,
                    password: passwordhash,
                    facility_id: data.facility_id,
                    created_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                    updated_at: null,
                    deleted_at: null,
                };
             
                Models.Users.findOne({
                    where: { user_email: data.user_email },
                }).then((user) => {

                    if (user) {
                        const error = 'User already exists';
                        res.json({ status: 409, message: error });
                    }
                    else if (user == null) {
                        Models.Facility.findOne({
                            where: { facility_id: data.facility_id },
                        }).then((facilities) => {
                            if (facilities == null) {
                                const error = 'Facility Id not found!';
                                res.json({ status: 400, message: error });
                            }
                            if (facilities != null) {
                                Models.Users.create(dataForUsers).then((user) => {
                                    res.json({ status: 200, message: "User Created Successfully!" });
                                })
                            }
                        }
                        )
                    }
                })
            }

        }
        catch (error) {
            res.json({ status: false, message: "Failed!" });
        }
    }
    /**
    * Creating Login API
    */
    async UserLogin(req, res) {
        try {
            let user_email = req.body.user_email;
            let password = req.body.password;

            if (user_email == undefined ||
                user_email == null ||
                user_email == "") {
                res.json({ status: 404, message: "User Email is Required!" });
            }
            if (password == undefined ||
                password == null ||
                password == "") {
                res.json({ status: 404, message: "Password is Required!" });
            }
            if (user_email != undefined &&
                user_email != null &&
                user_email != "" &&
                password != undefined &&
                password != null &&
                password != "") {
                Models.Users.findOne({
                    where: { user_email: user_email },
                }).then((user) => {
                    if (user != null || user != undefined && decryptedPassword == true) {
                        let decryptedPassword = bcrypt.compareSync(password, user.password);
                        let status = user.user_status;
                        if (status == 0) {
                            res.json({ status: 403, message: "User Inactive!" });
                        }
                        if (decryptedPassword == false) {
                            res.json({ status: 400, message: "Invalid Password!" });
                        }
                        else if (status == 1 && decryptedPassword == true) {
                            res.json({ status: 200, message: "Logged In Successfully!" });
                        }
                    }
                    else if (user == null || user == undefined) {
                        res.json({ status: 400, message: "Login Failed!" });
                    }
                })
            }
        }
        catch (error) {
            res.json({ status: false, message: "Failed!" });
        }
    }
    /**
    * Logout API
    */
    async Logout(req, res) {
        try {
            let user_email = req.body.user_email;
            if (user_email == undefined ||
                user_email == null ||
                user_email == "") {
                res.json({ status: 404, message: "User Email is Required!" });
            }
            if (user_email != undefined &&
                user_email != null &&
                user_email != "") {
                Models.Users.findOne({
                    where: { user_email: user_email },
                }).then((user) => {
                    if (user == null || user == undefined) {
                        res.json({ status: 404, message: "Failed!" });
                    }
                    if (user != null || user != undefined) {
                        res.json({ status: 200, message: "Logged out Successfully!" });
                    }

                })
            }

        }
        catch (error) {
            res.json({ status: false, message: "Failed!" });
        }
    }
}

const UserLogin = new Login();

module.exports = UserLogin;