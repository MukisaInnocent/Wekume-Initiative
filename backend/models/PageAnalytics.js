const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const PageAnalytics = sequelize.define('PageAnalytics', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        page_url: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        page_title: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        visit_count: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        unique_visitors: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    }, {
        tableName: 'page_analytics',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: false,
        indexes: [
            {
                unique: true,
                fields: ['page_url', 'date'],
                name: 'unique_page_date'
            }
        ]
    });

    return PageAnalytics;
};
