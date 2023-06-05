const fs = require('fs');
const pendingService = require('../../service/pendingService');
const qs = require('qs');

class PendingController {
    async showPendingList(req, res) {
        let userList = await pendingService.getPendingList();
        if (req.method === "GET") {
            fs.readFile('./src/view/Pending/pending.html', "utf-8", async (err, data) => {
                if (err) throw err.message;
                let table = '';
                userList.forEach(i => {
                    table += `
        <tr>
          <td>${i.userId}</td>
          <td>${i.email}</td>
<!--          <td>${i.password}</td>-->
          <td>${i.active}</td>
          <td><form method="post"><input type="hidden" name="userId" value="${i.userId}"><button type="submit">change status</button></form></td>
        </tr>
      `;
                });
                data = data.replace("<p id=\"tableHere\"></p>", table)
                res.write(data);
                res.end();
            });
        } else {
            let data = '';
            req.on("data", chunk => {
                data += chunk;
            })
            req.on("end", async () => {
                data = qs.parse(data);
                let userId = parseInt(data.userId);
                let changeComplete = false;
                userList.forEach(i => {
                    if (i.userId === userId && changeComplete === false){
                        if (i.active === 1) {
                            pendingService.changeStatus(0, userId);
                            res.writeHead(301, {"location": "/pending"})
                            res.end()
                            changeComplete = true;
                        }
                        if (i.active === 0) {
                            pendingService.changeStatus(1, userId);
                            res.writeHead(301, {"location": "/pending"})
                            res.end()
                            changeComplete = true;
                        }
                    }
                })
            })
        }
    }
}

module.exports = new PendingController();