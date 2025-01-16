const usersDataBase = [
    {
        full_name: 'Ava Smith',
        age: 29,
        profession: 'QA Engineer'
    },
    {
        full_name: 'Ethan Williams',
        age: 26,
        profession: 'DevOps Engineer'
    },
    {
        full_name: 'Amelia Davis',
        age: 47,
        profession: 'UI/UX Designer'
    },
    {
        full_name: 'Liam Brown',
        age: 22,
        profession: 'Backend Developer'
    },
    {
        full_name: 'Mia Johnson',
        age: 36,
        profession: 'Frontend Developer'
    }
];

function getUsers() {
    return usersDataBase;
}


module.exports = {
    getUsers,
}