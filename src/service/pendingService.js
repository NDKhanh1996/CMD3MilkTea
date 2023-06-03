const connection = require("../entity/connection");

class PendingService {
    connect = connection.getConnection();

    async getPendingList() {
        try {
            return await new Promise((resolve, reject) => {
                this.connect.query(`select * from case_md3.users;`, (err, result) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(result)
                    }
                });
            });
        } catch (err) {
            console.log(err.message)
        }
    }

    async changeStatus(activeChangeToThis, userId) {
        try {
            return await new Promise((resolve, reject) => {
                this.connect.query(`UPDATE users set active = ${activeChangeToThis} WHERE ${userId} = userId;`, (err, result) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(result)
                    }
                });
            });
        } catch (err) {
            console.log(err.message)
        }
    }
}

module.exports = new PendingService();