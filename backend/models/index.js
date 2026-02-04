const { sequelize } = require('../config/database');

// Import all model definitions
const UserModel = require('./User');
const ContentSectionModel = require('./ContentSection');
const PartnerModel = require('./Partner');
const EventModel = require('./Event');
const TestimonialModel = require('./Testimonial');
const ReportModel = require('./Report');
const MediaLibraryModel = require('./MediaLibrary');
const ValueModel = require('./Value');
const WekumeAppFeatureModel = require('./WekumeAppFeature');
const SupportFormModel = require('./SupportForm');
const AIAssistantLogModel = require('./AIAssistantLog');
const PageAnalyticsModel = require('./PageAnalytics');
const VolunteerApplicationModel = require('./VolunteerApplication');
const SocialLinkModel = require('./SocialLink');

// Initialize models
const User = UserModel(sequelize);
const ContentSection = ContentSectionModel(sequelize);
const Partner = PartnerModel(sequelize);
const Event = EventModel(sequelize);
const Testimonial = TestimonialModel(sequelize);
const Report = ReportModel(sequelize);
const MediaLibrary = MediaLibraryModel(sequelize);
const Value = ValueModel(sequelize);
const WekumeAppFeature = WekumeAppFeatureModel(sequelize);
const SupportForm = SupportFormModel(sequelize);
const AIAssistantLog = AIAssistantLogModel(sequelize);
const PageAnalytics = PageAnalyticsModel(sequelize);
const VolunteerApplication = VolunteerApplicationModel(sequelize);
const SocialLink = SocialLinkModel(sequelize);
const Donation = require('./Donation')(sequelize);

// Define relationships
User.hasMany(ContentSection, { foreignKey: 'last_updated_by', as: 'updatedSections' });
ContentSection.belongsTo(User, { foreignKey: 'last_updated_by', as: 'updatedBy' });

User.hasMany(Event, { foreignKey: 'created_by', as: 'createdEvents' });
Event.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });

User.hasMany(Report, { foreignKey: 'uploaded_by', as: 'uploadedReports' });
Report.belongsTo(User, { foreignKey: 'uploaded_by', as: 'uploader' });

User.hasMany(MediaLibrary, { foreignKey: 'uploaded_by', as: 'uploadedMedia' });
MediaLibrary.belongsTo(User, { foreignKey: 'uploaded_by', as: 'uploader' });

User.hasMany(SupportForm, { foreignKey: 'assigned_to', as: 'assignedForms' });
SupportForm.belongsTo(User, { foreignKey: 'assigned_to', as: 'assignee' });

User.hasMany(VolunteerApplication, { foreignKey: 'reviewed_by', as: 'reviewedApplications' });
VolunteerApplication.belongsTo(User, { foreignKey: 'reviewed_by', as: 'reviewer' });

// Export models
const db = {
    sequelize,
    User,
    ContentSection,
    Partner,
    Event,
    Testimonial,
    Report,
    MediaLibrary,
    Value,
    WekumeAppFeature,
    SupportForm,
    AIAssistantLog,
    PageAnalytics,
    VolunteerApplication,
    VolunteerApplication,
    SocialLink,
    Donation
};

// Initialize models function
const initializeModels = async () => {
    console.log('✅ All models initialized and relationships established');
    return db;
};

module.exports = { ...db, initializeModels };
