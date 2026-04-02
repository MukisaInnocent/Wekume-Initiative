const { Event, EventRegistration } = require('./models');

async function seedRegistrations() {
    try {
        console.log('🌱 Seeding event registrations...');
        
        // Find existing events
        const events = await Event.findAll();
        if (events.length === 0) {
            console.log('❌ No events found to register for!');
            process.exit(1);
        }

        const testRegistrations = [
            {
                event_id: events[0].id,
                name: 'Innocent Mukisa',
                email: 'innocent@example.com',
                phone: '+256770000000',
                university: 'Makerere University',
                status: 'confirmed'
            },
            {
                event_id: events[0].id,
                name: 'Jane Doe',
                email: 'jane@example.com',
                phone: '+256780000000',
                university: 'Kyambogo University',
                status: 'pending'
            },
            {
                event_id: events[1]?.id || events[0].id,
                name: 'John Smith',
                email: 'john@smith.com',
                phone: '+1555555555',
                university: 'Online Attendee',
                status: 'pending'
            }
        ];

        await EventRegistration.bulkCreate(testRegistrations);
        console.log('✅ Successfully seeded 3 test event registrations.');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
}

seedRegistrations();
