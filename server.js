const { appendFile } = require("fs");
const router = require("./controller/router")
const http = require("http");
const handleController = require("./controller/handle/errorController");
const server = http.createServer((req, res) => {
    let url = req.url;
    let arrPath = url.split("/");
    let path = arrPath[1];
    let id = -1;
    if (arrPath.length > 2) {
        path = arrPath[1];
        id = arrPath[2];
    }
    if (arrPath.length <= 2) {
        arrPath = [1]
    }
    let chosenHandle;
    if (router[path] !== undefined) {
        chosenHandle = router[path];
    } else {
        chosenHandle = handleController.showNotFound;
    }
    chosenHandle(req, res, id);
})

server.listen(8080, "localhost", () => {
    console.log("Server is running on port 8080");
})