const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const ConfigurableBlock = sequelize.define('ConfigurableBlock', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        block_key: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: 'Unique key: l2, yw, m, recon, launch_board, reso, otto, funder_channel, funder_category'
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        image_url: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        block_type: {
            type: DataTypes.ENUM('placeholder', 'funder', 'reward', 'program', 'other'),
            defaultValue: 'placeholder'
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
        tableName: 'configurable_blocks',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    return ConfigurableBlock;
};
