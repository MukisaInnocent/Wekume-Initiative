const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Event = sequelize.define('Event', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        event_type: {
            type: DataTypes.ENUM('workshop', 'outreach', 'training', 'webinar', 'other'),
            defaultValue: 'other'
        },
        event_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        location: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        banner_image_url: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        registration_link: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        is_published: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        created_by: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id'
            },
            onDelete: 'SET NULL'
        }
    }, {
        tableName: 'events',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    return Event;
};
