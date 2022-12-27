const {inquirerMenu, pause, readInput} = require('./helpers/inquirer');
const {savedb, readb} = require('./helpers/savefiles');
const Tasks = require('./models/tasks');


const main = async() => {


    let opt = '';
    const tasks = new Tasks();
    const tasksdb = readb();

    if(tasksdb){
        tasks.loadTasks(tasksdb);
        //console.log(tasks._list);
    }

    //await pause();

    do{ 

        opt = await inquirerMenu();
        //console.log({ opt });

        switch(opt){
            case 1:
                const desc = await readInput('Description: ');
                tasks.crearteTask(desc);
                console.log(desc);
            break;
            case 2:
                //console.log(tasks.tolist);
                tasks.showWholeList();
            break;
            case 3:
                //to show finished tasks
                tasks.showcategory();
            break;
            case 4:
                //to show pending tasks
                tasks.showcategory(false);
            break;
        }

        savedb(tasks.tolist);

        if(opt !== 0 )await pause();

        
    }while( opt !== 0);

};

main();