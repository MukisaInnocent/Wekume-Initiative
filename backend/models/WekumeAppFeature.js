const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const WekumeAppFeature = sequelize.define('WekumeAppFeature', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        feature_name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        icon_url: {
            type: DataTypes.STRING(500),
            allowNull: true
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
        tableName: 'wekume_app_features',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    return WekumeAppFeature;
};
