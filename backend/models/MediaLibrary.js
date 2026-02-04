const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const MediaLibrary = sequelize.define('MediaLibrary', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        file_name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        file_type: {
            type: DataTypes.ENUM('image', 'video', 'document', 'other'),
            defaultValue: 'image'
        },
        file_url: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        file_size_kb: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        alt_text: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        uploaded_by: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id'
            },
            onDelete: 'SET NULL'
        },
        usage_count: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            comment: 'Track how many times this media is used'
        }
    }, {
        tableName: 'media_library',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: false
    });

    return MediaLibrary;
};
