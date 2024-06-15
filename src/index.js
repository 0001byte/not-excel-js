import "./testModule";
import "./styles/index.scss";

console.log("start");

const name = "Chubaka";

async function start() {
    return await Promise.resolve("start async ]]]]]]");
}

start().then(console.log);
