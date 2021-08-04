const db = require("./conn");

class TaskModel {
    constructor(id, content, favorited, overdue, date_created, due_date, completed)
    {
        this.id = id;
        this.content = content;
        this.favorited = favorited;
        this.overdue = overdue;
        this.date_created = date_created;
        this.due_date = due_date;
        this.completed = completed;
    }

    static async getAllTaskData()
    {
        try{
            const query = `SELECT * FROM tasks`;
            const response = await db.any(query);
            return response;
        }
        catch(error)
        {
            console.error("ERROR: ", error);
            return error;
        }
    }

    static async addTask(content) {
        try {
            const query = `INSERT INTO tasks
                                (content)
                            VALUES
                            ('${content}');`
            const response = await db.result(query);
            return response;
        }
        catch(error)
        {
            console.error("ERROR: ", error);
            return error;
        }
    }

    static async deleteTask(taskID) {
        try {
            const query = `DELETE FROM tasks
                            WHERE id = ${taskID};`
            const response = await db.result(query);
            return response;
        }
        catch(error)
        {
            console.error("ERROR: ", error);
            return error;
        }
    }

    static async toggleTaskCompleted(taskID) {
        try {
            const query = `UPDATE tasks
                            SET completed = NOT completed
                            WHERE id = ${taskID};`
            const response = await db.result(query);
            return response;
        }
        catch(error)
        {
            console.error("ERROR: ", error);
            return error;
        }
    }
}

module.exports = TaskModel;