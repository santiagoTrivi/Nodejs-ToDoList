const {inquirerMenu, pause, readInput, listTasksToDelete, confirm} = require('./helpers/inquirer');
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
            case 1: // crear
                const desc = await readInput('Description: ');
                tasks.crearteTask(desc);
                console.log(desc);
            break;
            case 2: // show the entire list
                //console.log(tasks.tolist);
                tasks.showWholeList();
            break;
            case 3: //to show finished tasks
                tasks.showcategory();
            break;
            case 4: //to show pending tasks
                tasks.showcategory(false);
            break;
            case 5: //to show both finished and pending tasks

            break;
            case 6: //to delete task
                const id = await listTasksToDelete(tasks.tolist);
                if( id !== '0'){
                    const answer = await confirm();
                    if(answer){
                        tasks.deleteTask(id);
                        console.log('Done');
                    }
                }
            break;
        }

        savedb(tasks.tolist);

        if(opt !== 0 )await pause();

        
    }while( opt !== 0);

};

main();