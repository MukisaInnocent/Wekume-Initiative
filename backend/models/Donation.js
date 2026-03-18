const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Donation = sequelize.define('Donation', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        donor_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /^(\+256|0)[0-9]{9}$/
            }
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        currency: {
            type: DataTypes.STRING,
            defaultValue: 'UGX'
        },
        payment_method: {
            type: DataTypes.ENUM('mobile_money', 'bank_transfer', 'card', 'cash'),
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('pending', 'completed', 'failed'),
            defaultValue: 'pending'
        },
        transaction_reference: {
            type: DataTypes.STRING,
            allowNull: true
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        donation_type: {
            type: DataTypes.ENUM('one-time', 'monthly'),
            defaultValue: 'one-time',
            allowNull: false
        },
        is_anonymous: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        timestamps: true,
        tableName: 'donations'
    });

    return Donation;
};
