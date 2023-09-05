import { DataTypes } from "sequelize";
import db from "../utils/database.js";

//modelo               //tabla
const Todo = db.define('todos', {
    //definir todos los atributos o columnas de la tabla
    //title, description, completed
    id: {
        //**id int [pk, increment] *//

        //tipo de dato 
        type: DataTypes.INTEGER,
        //llave primaria
        primaryKey: true,
        //autoincrementable 
        autoIncrement: true,
    },
    
    title: {
        //** title varchar(80) [not null]*//
        //VARCHAR
        type: DataTypes.STRING(80),
        //NOT NULL
        allowNull: false,
    },

    description: {
        // **description varchar(200) [not null**//
        type: DataTypes.STRING(200),
        allowNull: false,
    },

    completed: {
        //** completed boolean [not null] */
        type: DataTypes.BOOLEAN,
        
    }
})

export default Todo