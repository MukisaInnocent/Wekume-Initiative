const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const SupportForm = sequelize.define('SupportForm', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        phone: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        subject: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        form_type: {
            type: DataTypes.ENUM('contact', 'volunteer', 'partnership', 'support'),
            defaultValue: 'contact'
        },
        status: {
            type: DataTypes.ENUM('new', 'in_progress', 'resolved', 'closed'),
            defaultValue: 'new'
        },
        assigned_to: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id'
            },
            onDelete: 'SET NULL'
        }
    }, {
        tableName: 'support_forms',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    return SupportForm;
};
