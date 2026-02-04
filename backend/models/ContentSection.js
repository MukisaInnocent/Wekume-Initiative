const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const ContentSection = sequelize.define('ContentSection', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        section_key: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            unique: true,
        },
        section_title: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        content_type: {
            type: DataTypes.ENUM('text', 'rich_text', 'image', 'list'),
            defaultValue: 'text'
        },
        content_text: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        image_url: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        last_updated_by: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id'
            },
            onDelete: 'SET NULL'
        }
    }, {
        tableName: 'content_sections',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    return ContentSection;
};
