const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const ImpactMetric = sequelize.define('ImpactMetric', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        label: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: 'e.g., Students Reached, Communities Served, Events Hosted'
        },
        value: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: 'e.g., 500+, 12, 30+'
        },
        icon: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: 'Lucide icon name or emoji'
        },
        display_order: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        region: {
            type: DataTypes.ENUM('ug', 'us', 'global'),
            defaultValue: 'global',
            allowNull: false
        }
    }, {
        tableName: 'impact_metrics',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    return ImpactMetric;
};
