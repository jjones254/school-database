'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Users", deps: []
 * createTable "Courses", deps: [Users]
 *
 **/

var info = {
    "revision": 1,
    "name": "noname",
    "created": "2022-04-20T05:15:50.096Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Users",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "firstName": {
                    "type": Sequelize.STRING,
                    "field": "firstName",
                    "validate": {
                        "notNull": {
                            "msg": "A first name is required"
                        },
                        "notEmpty": {
                            "msg": "Please provide a first name"
                        }
                    },
                    "allowNull": false
                },
                "lastName": {
                    "type": Sequelize.STRING,
                    "field": "lastName",
                    "validate": {
                        "notNull": {
                            "msg": "A last name is required"
                        },
                        "notEmpty": {
                            "msg": "Please provide a  last name"
                        }
                    },
                    "allowNull": false
                },
                "emailAddress": {
                    "type": Sequelize.STRING,
                    "field": "emailAddress",
                    "validate": {
                        "notNull": {
                            "msg": "A username is required"
                        },
                        "notEmpty": {
                            "msg": "Please provide a username"
                        },
                        "isEmail": {
                            "msg": "Please provide a valid email address"
                        }
                    },
                    "unique": {
                        "msg": "The email you entered already exists"
                    },
                    "allowNull": false
                },
                "password": {
                    "type": Sequelize.STRING,
                    "field": "password",
                    "validate": {
                        "notNull": {
                            "msg": "A password is required"
                        },
                        "notEmpty": {
                            "msg": "Please provide a password"
                        }
                    },
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Courses",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "title": {
                    "type": Sequelize.STRING,
                    "field": "title",
                    "validate": {
                        "notNull": {
                            "msg": "A title is required"
                        },
                        "notEmpty": {
                            "msg": "Please provide a title"
                        }
                    },
                    "allowNull": false
                },
                "description": {
                    "type": Sequelize.TEXT,
                    "field": "description",
                    "validate": {
                        "notNull": {
                            "msg": "A description is required"
                        },
                        "notEmpty": {
                            "msg": "Please provide a description"
                        }
                    },
                    "allowNull": false
                },
                "estimatedTime": {
                    "type": Sequelize.STRING,
                    "field": "estimatedTime"
                },
                "materialsNeeded": {
                    "type": Sequelize.STRING,
                    "field": "materialsNeeded"
                },
                "userId": {
                    "type": Sequelize.INTEGER,
                    "field": "userId"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                },
                "UserId": {
                    "type": Sequelize.INTEGER,
                    "field": "UserId",
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
                    "allowNull": false
                }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
