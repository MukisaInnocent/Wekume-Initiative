const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const BackgroundImage = sequelize.define('BackgroundImage', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        image_url: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        public_id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: 'Cloudinary public_id for deletion'
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        display_order: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        uploaded_by: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id'
            },
            onDelete: 'SET NULL'
        }
    }, {
        tableName: 'background_images',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    return BackgroundImage;
};
