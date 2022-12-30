const inquirer = require('inquirer');

const questions0 = [
    {
        type: 'list',
        name: 'option',
        message: 'what would you like to do?',
        choices: [
            {
                value: 1,
                name: `1. create task`
            },
            {
                value: 2,
                name: `2. List tasks`
            },
            {
                value: 3,
                name: `3. List finished tasks`
            },
            {
                value: 4,
                name: `4. List pending tasks`
            },
            {
                value: 5,
                name: `5. do tasks`
            },
            {
                value: 6,
                name: `6. detale task`
            },
            {
                value: 0,
                name: `0. exit`
            },
        ]
    }
];

const inquirerMenu = async() =>{

    console.clear();
    console.log(`======================`);
    console.log(` seleccione una opcion`);
    console.log('======================');

    const { option } = await inquirer.prompt(questions0);

    return option;

}; 

const pause = async() => {

    const questions1 = [
        {
            type: 'input',
            name: 'enter',
            message: 'enter to continue ',
        }
    ];

    console.log('');
    await inquirer.prompt(questions1);
    

};

const readInput = async(msj) => {

    const questions3 = [
        {
            type: 'input',
            name: 'desc',
            message: msj,
            validate( value ){
                if (value.lenght === 0){
                    return'por favor ingrese un valor';
                }
                return true;
            }
        }
    ];
    const {desc} = await inquirer.prompt(questions3);
    return desc;

};

const listTasksToDelete = async ( task =[]) =>{
    
    const choicesFromList = task.map((task, i) => {
        const index = i +1;

        return {
            value: task.id,
            name: `${index}. ${task.desc}`
        }
    });

    choicesFromList.unshift({
        value: '0',
        name: `0. cancelar`
    });

    const questions4 = [
        {
            type: 'list',
            name: 'id',
            message: 'Delete',
            choices: choicesFromList
        }
    ]

    const {id} = await inquirer.prompt(questions4);
    return id;
    
}

const confirm = async() => {
    const question5 = [
        {
            type: 'confirm',
            name: 'answer',
            message: 'Are you sure?'

        }
    ]

    const {answer} = await inquirer.prompt(question5);
    return answer;
}

const listTasksToDoIt = async ( taskpart =[]) =>{
    
    const choicesFromList = taskpart.map((task, i) => {
        const index = i +1;

        return {
            value: task.id,
            name: `${index}. ${task.desc}`,
            checked:  (taskpart.finished) ? true : false
        }
    });

    //choicesFromList.unshift({
       // value: '0',
        //name: `0. cancelar`
    //});

    const questions4 = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Choise',
            choices: choicesFromList
        }
    ]

    const {ids} = await inquirer.prompt(questions4);
    return ids;
    
}

module.exports = {

    inquirerMenu,
    pause,
    readInput,
    listTasksToDelete,
    confirm,
    listTasksToDoIt

};