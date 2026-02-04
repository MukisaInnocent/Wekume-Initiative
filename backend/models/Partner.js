const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Partner = sequelize.define('Partner', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM('medical', 'educational', 'institutional', 'corporate', 'other'),
            defaultValue: 'other'
        },
        logo_url: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        website: {
            type: DataTypes.STRING(500),
            allowNull: true,
            validate: {
                isUrl: true
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        display_order: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        tableName: 'partners',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    return Partner;
};
