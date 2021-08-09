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
            const query = `SELECT * FROM tasks
                            ORDER BY favorited DESC`;
            const response = await db.any(query);

            return response;
        }
        catch(error)
        {
            console.error("ERROR: ", error);
            return error;
        }
    }

    static async addTask(content, dueDate, hasDueDate) {
        
        try {
            let query;
            if(hasDueDate)
            {
                query = `INSERT INTO tasks
                (content, due_date, has_due_date)
                VALUES
                ('${content}', to_timestamp(${dueDate}/1000), ${hasDueDate});`
            }
            else
            {
                query = `INSERT INTO tasks
                (content, due_date, has_due_date)
                VALUES
                ('${content}', ${dueDate}, ${hasDueDate});`
            }

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

    static async toggleTaskFavorited(taskID) {
        try {
            const query = `UPDATE tasks
                            SET favorited = NOT favorited
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