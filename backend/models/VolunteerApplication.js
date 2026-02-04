const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const VolunteerApplication = sequelize.define('VolunteerApplication', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fullname: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        phone: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        skills: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        availability: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        motivation: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM('pending', 'approved', 'rejected', 'contacted'),
            defaultValue: 'pending'
        },
        reviewed_by: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id'
            },
            onDelete: 'SET NULL'
        }
    }, {
        tableName: 'volunteer_applications',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    return VolunteerApplication;
};
