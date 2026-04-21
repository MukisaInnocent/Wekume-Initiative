const { sequelize } = require('../config/database');
const models = require('../models');

async function seedTeamMembers() {
    console.log('🌱 Seeding sample Team Members...');
    try {
        await sequelize.authenticate();

        const teamMembers = [
            {
                name: 'Sarah Nakiguli',
                role: 'Executive Director',
                department: 'Leadership',
                date_of_birth: '1988-05-15',
                contact_email: 'sarah@wekume.org',
                contact_phone: '+256-701-234567',
                social_links: {
                    linkedin: 'https://linkedin.com/in/sarah-nakiguli',
                    twitter: 'https://twitter.com/sarahnakiguli',
                    instagram: 'https://instagram.com/sarahnakiguli'
                },
                description: 'Passionate about health education and community empowerment across Uganda.',
                photo_url: 'https://via.placeholder.com/400?text=Sarah+Nakiguli',
                region: 'ug',
                display_order: 1,
                is_active: true
            },
            {
                name: 'Dr. James Mwase',
                role: 'Head of Programs',
                department: 'Programs',
                date_of_birth: '1985-03-22',
                contact_email: 'james@wekume.org',
                contact_phone: '+256-702-345678',
                social_links: {
                    linkedin: 'https://linkedin.com/in/james-mwase',
                    twitter: 'https://twitter.com/drjamesmwase',
                    instagram: 'https://instagram.com/drjamesmwase'
                },
                description: 'Medical professional dedicated to maternal and reproductive health initiatives.',
                photo_url: 'https://via.placeholder.com/400?text=Dr.+James+Mwase',
                region: 'ug',
                display_order: 2,
                is_active: true
            },
            {
                name: 'Amina Hassan',
                role: 'Community Outreach Manager',
                department: 'Outreach',
                date_of_birth: '1990-07-10',
                contact_email: 'amina@wekume.org',
                contact_phone: '+256-703-456789',
                social_links: {
                    linkedin: 'https://linkedin.com/in/amina-hassan',
                    twitter: 'https://twitter.com/aminaoutreach',
                    instagram: 'https://instagram.com/aminahassan'
                },
                description: 'Building trust-based relationships with communities across rural Uganda.',
                photo_url: 'https://via.placeholder.com/400?text=Amina+Hassan',
                region: 'ug',
                display_order: 3,
                is_active: true
            },
            {
                name: 'David Muwanga',
                role: 'Mobile App Developer',
                department: 'Technology',
                date_of_birth: '1995-11-28',
                contact_email: 'david@wekume.org',
                contact_phone: '+256-704-567890',
                social_links: {
                    linkedin: 'https://linkedin.com/in/davidmuwanga',
                    twitter: 'https://twitter.com/davidmuwanga',
                    instagram: 'https://instagram.com/davidmuwanga'
                },
                description: 'Developing innovative mobile solutions to reach youth with health information.',
                photo_url: 'https://via.placeholder.com/400?text=David+Muwanga',
                region: 'ug',
                display_order: 4,
                is_active: true
            },
            {
                name: 'Dr. Priya Patel',
                role: 'Medical Advisor',
                department: 'Programs',
                date_of_birth: '1987-02-14',
                contact_email: 'priya@wekume.org',
                contact_phone: '+1-202-555-0123',
                social_links: {
                    linkedin: 'https://linkedin.com/in/priya-patel-md',
                    twitter: 'https://twitter.com/drpriyapatel',
                    instagram: 'https://instagram.com/drpriyapatel'
                },
                description: 'US-based medical advisor ensuring evidence-based health education content.',
                photo_url: 'https://via.placeholder.com/400?text=Dr.+Priya+Patel',
                region: 'us',
                display_order: 1,
                is_active: true
            },
            {
                name: 'Marcus Johnson',
                role: 'Grant Manager',
                department: 'Operations',
                date_of_birth: '1989-09-05',
                contact_email: 'marcus@wekume.org',
                contact_phone: '+1-202-555-0124',
                social_links: {
                    linkedin: 'https://linkedin.com/in/marcus-johnson-grant',
                    twitter: 'https://twitter.com/marcusjohnson',
                    instagram: ''
                },
                description: 'Managing grants and partnerships to fund community health initiatives.',
                photo_url: 'https://via.placeholder.com/400?text=Marcus+Johnson',
                region: 'us',
                display_order: 2,
                is_active: true
            },
            {
                name: 'Lisa Chen',
                role: 'Communications Lead',
                department: 'Communications',
                date_of_birth: '1992-01-20',
                contact_email: 'lisa@wekume.org',
                contact_phone: '+1-202-555-0125',
                social_links: {
                    linkedin: 'https://linkedin.com/in/lisachen',
                    twitter: 'https://twitter.com/lisachencomms',
                    instagram: 'https://instagram.com/lisachen'
                },
                description: 'Telling the Wekume story through compelling narratives and campaigns.',
                photo_url: 'https://via.placeholder.com/400?text=Lisa+Chen',
                region: 'global',
                display_order: 1,
                is_active: true
            },
            {
                name: 'Jude Okonkwo',
                role: 'Field Mobilizer',
                department: 'Outreach',
                date_of_birth: '1993-06-12',
                contact_email: 'jude@wekume.org',
                contact_phone: '+256-705-678901',
                social_links: {
                    linkedin: 'https://linkedin.com/in/jude-okonkwo',
                    twitter: 'https://twitter.com/judeokonkwo',
                    instagram: 'https://instagram.com/judeokonkwo'
                },
                description: 'On the ground mobilizing youth and facilitating health education sessions.',
                photo_url: 'https://via.placeholder.com/400?text=Jude+Okonkwo',
                region: 'ug',
                display_order: 5,
                is_active: true
            }
        ];

        // Check for existing members to avoid duplicates
        for (const member of teamMembers) {
            const existing = await models.TeamMember.findOne({ where: { contact_email: member.contact_email } });
            if (!existing) {
                await models.TeamMember.create(member);
                console.log(`✅ Created: ${member.name}`);
            } else {
                console.log(`⏭️  Skipped (already exists): ${member.name}`);
            }
        }

        console.log('✅ Team member seeding complete!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Seeding failed:', err);
        process.exit(1);
    }
}

seedTeamMembers();
