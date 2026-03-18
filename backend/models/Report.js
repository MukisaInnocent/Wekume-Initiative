const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Report = sequelize.define('Report', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        report_type: {
            type: DataTypes.ENUM('annual', 'quarterly', 'program', 'impact', 'other'),
            defaultValue: 'annual'
        },
        file_url: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        file_size_kb: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        download_count: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        is_published: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
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
        tableName: 'reports',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    return Report;
};
