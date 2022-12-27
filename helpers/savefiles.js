const fs = require('fs');

const savedb = (data) => {
    
    fs.writeFileSync(`./db/tasks.json`, JSON.stringify(data));
    
};

const readb = () =>{

    if(!fs.existsSync(`./db/tasks.json`)){
        return null;
    }
    
    const info = fs.readFileSync(`./db/tasks.json`, {encoding: 'utf-8'});

    const data = JSON.parse(info);

    return data;

}

module.exports = {
    savedb,
    readb
}