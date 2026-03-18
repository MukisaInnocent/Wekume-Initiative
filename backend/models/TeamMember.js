const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const TeamMember = sequelize.define('TeamMember', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        role: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: 'e.g., CEO, Program Director, Volunteer Lead'
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        photo_url: {
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
        },
        region: {
            type: DataTypes.ENUM('ug', 'us', 'global'),
            defaultValue: 'global',
            allowNull: false
        }
    }, {
        tableName: 'team_members',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    return TeamMember;
};
