const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Resource = sequelize.define('Resource', {
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
        file_url: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        resource_type: {
            type: DataTypes.ENUM('form', 'download', 'link'),
            defaultValue: 'download'
        },
        is_published: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        download_count: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        region: {
            type: DataTypes.ENUM('ug', 'us', 'global'),
            defaultValue: 'global',
            allowNull: false
        }
    }, {
        tableName: 'resources',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    return Resource;
};
