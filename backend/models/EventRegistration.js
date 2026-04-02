const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const EventRegistration = sequelize.define('EventRegistration', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        event_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'events',
                key: 'id'
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        university: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM('pending', 'confirmed', 'attended', 'cancelled'),
            defaultValue: 'pending'
        }
    }, {
        tableName: 'event_registrations',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    return EventRegistration;
};
