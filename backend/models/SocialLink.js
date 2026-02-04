const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const SocialLink = sequelize.define('SocialLink', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        platform: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: 'e.g., facebook, twitter, instagram, linkedin'
        },
        url: {
            type: DataTypes.STRING(500),
            allowNull: false,
            validate: {
                isUrl: true
            }
        },
        icon_class: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: 'e.g., fab fa-facebook'
        },
        display_order: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        tableName: 'social_links',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    return SocialLink;
};
