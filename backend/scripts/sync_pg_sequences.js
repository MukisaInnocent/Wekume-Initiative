const { sequelize } = require('../config/database');

async function syncSequences() {
    console.log('🔄 Synchronizing PostgreSQL sequences...');
    try {
        await sequelize.authenticate();
        
        // Get all tables in the public schema
        const [tables] = await sequelize.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_type = 'BASE TABLE'
        `);

        for (const table of tables) {
            const tableName = table.table_name;
            
            // Check if table has an 'id' column and a sequence
            const [sequenceInfo] = await sequelize.query(`
                SELECT column_name 
                FROM information_schema.columns 
                WHERE table_name = '${tableName}' 
                AND column_name = 'id'
            `);

            if (sequenceInfo.length > 0) {
                console.log(`  - Syncing sequence for ${tableName}...`);
                try {
                    // Update sequence to MAX(id) + 1
                    // PostgreSQL default sequence name is usually {table}_{column}_seq
                    await sequelize.query(`
                        SELECT setval(
                            pg_get_serial_sequence('"${tableName}"', 'id'), 
                            COALESCE(MAX(id), 1)
                        ) FROM "${tableName}"
                    `);
                } catch (seqErr) {
                    // Some tables might not use the standard serial sequence naming or might not have one
                    console.warn(`    ⚠️ Could not sync sequence for ${tableName}: ${seqErr.message}`);
                }
            }
        }

        console.log('✅ All sequences synchronized!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Synchronization failed:', err);
        process.exit(1);
    }
}

syncSequences();
