const connection = require("../entity/connection");

class PendingService {
    connect = connection.getConnection();

    async getPendingList() {
        try {
            return await new Promise((resolve, reject) => {
                this.connect.query(`select * from FROM case_md3.users;`, (err, result) => {
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