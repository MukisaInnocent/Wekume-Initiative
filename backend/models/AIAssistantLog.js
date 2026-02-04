const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const AIAssistantLog = sequelize.define('AIAssistantLog', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        session_id: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        user_question: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        ai_response: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        topic_category: {
            type: DataTypes.ENUM('srh', 'mental_health', 'events', 'app', 'general', 'other'),
            allowNull: true
        },
        escalated: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            comment: 'Whether escalated to human support'
        },
        user_rating: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                min: 1,
                max: 5
            }
        },
        ip_address: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        user_agent: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        tableName: 'ai_assistant_logs',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: false
    });

    return AIAssistantLog;
};
