const Task = require('./task.js');

class Tasks{

    _list = {};

    get tolist(){
        const list =[];
        Object.keys(this._list).forEach(key => {
            list.push(this._list[key]);
        });

        return list;
    }

    constructor() {

        this._list = {};

    }

    loadTasks = (task = []) =>{
         
        task.forEach(task =>{
            this._list[task.id] = task;
        });
    }

    crearteTask = (desc = '') =>{
        const task = new Task(desc);
        this._list[task.id] = task;

    };

    showWholeList = () =>{

        this.tolist.forEach((task, i) =>{
            const index = i + 1;
            const {desc, finished} = task;
            const status = (finished)
                        ? `finished`
                        : `pending`;
            console.log(`${index}. ${desc} :: ${status}`);
        })   

    }

    showcategory = (complated = true) =>{
            let index = 0;
            this.tolist.forEach(task =>{
                const {desc, finished} = task;
                const status = (finished)
                            ? `finished`
                            : `pending`;
                if(complated){ // to show finished tasks
                    if(finished){
                        index += 1;
                        console.log(`${index}. ${desc} :: ${status}`);
                    }
                }else{ // to show pendi tasks
                    if(!finished){
                        index += 1;
                        console.log(`${index}. ${desc} :: ${status}`);
                    }
                }
                
            })   
    
        
    }

    deleteTask(id = ''){

        if(this._list[id]){
            delete this._list[id];
        };
    };

    updateStatus = (idlist = []) =>{
        idlist.forEach(id =>{
            const task = this._list[id];
            if(!task.finished){
                task.finished = new Date().toISOString()
            }
        })
        
        this._list[id].forEach(task => {
            if(!idlist.includes(task.id)){
                this._list[task.id].finished = null;
            }
        })
    }

}

module.exports = Tasks;