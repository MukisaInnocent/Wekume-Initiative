const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Testimonial = sequelize.define('Testimonial', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        author_name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        author_role: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: 'e.g., Student, Volunteer, Partner'
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        photo_url: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                min: 1,
                max: 5
            }
        },
        is_featured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        is_approved: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        tableName: 'testimonials',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    return Testimonial;
};
