/**
 * Wekume Initiative — Soup Files Asset Integration Seed Script
 * 
 * This script:
 * 1. Copies curated assets from sup-files → backend/uploads/soup-assets/
 * 2. Registers them in the MediaLibrary table
 * 3. Seeds Events with real event data and banner images
 * 4. Seeds Resources with downloadable documents
 * 
 * NON-DESTRUCTIVE: Does NOT overwrite existing records.
 * All seeded content starts as unpublished for admin review.
 */

const fs = require('fs');
const path = require('path');

// ── Paths ───────────────────────────────────────────────
const ROOT = path.resolve(__dirname, '..', '..');
const SUP = path.join(ROOT, 'sup-files');
const UPLOADS = path.join(ROOT, 'backend', 'uploads', 'soup-assets');

// Sub-roots inside sup-files
const ACTIVITIES = path.join(SUP, 'activities-20260324T020355Z-1-001', 'Photos from events-activities');
const WHERE = path.join(SUP, 'Where we have been-20260324T020410Z-1-001', 'Where we have been');
const GRAPHIC = path.join(SUP, 'Graphic Designs for Wekume-20260324T020352Z-1-001', 'Graphic Designs for Wekume');
const PHASE1 = path.join(SUP, 'Wekume Graphic Designs Phase One Feb-March 2025-20260324T020420Z-1-001', 'Wekume Graphic Designs Phase One Feb-March 2025');
const WEBSITE = path.join(SUP, 'Wekume Website-20260324T020402Z-1-001', 'Wekume Website');
const LETTERHEADS = path.join(SUP, 'Wekume letterheads and forms for campus events-20260324T020416Z-1-001', 'Wekume letterheads and forms for campus events');
const VIDEOS = path.join(SUP, 'Video Testimonials-20260324T020351Z-1-001', 'Video Testimonials');

// ── Helper: Safe file copy ──────────────────────────────
function safeCopy(src, destDir, destName) {
    const destPath = path.join(destDir, destName);
    if (fs.existsSync(destPath)) {
        console.log(`  ⏭  Already exists: ${destName}`);
        return destPath;
    }
    if (!fs.existsSync(src)) {
        console.log(`  ⚠  Source not found: ${path.basename(src)}`);
        return null;
    }
    fs.mkdirSync(destDir, { recursive: true });
    fs.copyFileSync(src, destPath);
    const sizeKB = Math.round(fs.statSync(destPath).size / 1024);
    console.log(`  ✅ Copied: ${destName} (${sizeKB} KB)`);
    return destPath;
}

// Pick the first existing JPG/JPEG/PNG in a directory
function pickBestImage(dir) {
    if (!fs.existsSync(dir)) return null;
    const files = fs.readdirSync(dir)
        .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
        .sort((a, b) => {
            // Prefer descriptive names over IMG_ prefixed ones
            const aScore = a.startsWith('IMG_') || a.startsWith('WhatsApp') ? 1 : 0;
            const bScore = b.startsWith('IMG_') || b.startsWith('WhatsApp') ? 1 : 0;
            return aScore - bScore;
        });
    return files.length > 0 ? path.join(dir, files[0]) : null;
}

// ── STEP 1: Copy curated assets ─────────────────────────
function copyAssets() {
    console.log('\n═══════════════════════════════════════════');
    console.log('  STEP 1: Copying Curated Assets');
    console.log('═══════════════════════════════════════════\n');

    const copied = { events: [], logos: [], resources: [], social: [], about: [] };

    // ── About Us team photos ──
    console.log('📸 About Us Team Photos:');
    const aboutDir = path.join(WEBSITE, 'About us');
    if (fs.existsSync(aboutDir)) {
        const photos = fs.readdirSync(aboutDir).filter(f => /\.(jpg|jpeg|png)$/i.test(f));
        photos.forEach((f, i) => {
            const dest = safeCopy(path.join(aboutDir, f), path.join(UPLOADS, 'about'), `team-photo-${String(i + 1).padStart(2, '0')}.jpg`);
            if (dest) copied.about.push(dest);
        });
    } else {
        console.log('  ⚠  About us directory not found (may not be synced)');
    }

    // ── Logos ──
    console.log('\n🎨 Logo Assets:');
    const logoSources = [
        { src: path.join(PHASE1, 'Wekume Logo.jpg'), name: 'wekume-logo-phase1.jpg' },
        { src: path.join(LETTERHEADS, 'Wekume Logo 512x512.png'), name: 'wekume-logo-512.png' },
        { src: path.join(GRAPHIC, 'Brand colors-logo', 'Darker colors and logo-Apr 2025.jpg'), name: 'brand-colors-dark.jpg' },
        { src: path.join(GRAPHIC, 'Brand colors-logo', 'colors and wording and logo shapes-Apr 2025.jpg'), name: 'brand-colors-guide.jpg' },
        { src: path.join(WEBSITE, 'Partners', 'Logo condensed.png'), name: 'logo-condensed.png' },
        { src: path.join(WEBSITE, 'Partners', 'Logo-v2-300x300.png'), name: 'logo-v2-300.png' },
    ];
    logoSources.forEach(({ src, name }) => {
        const dest = safeCopy(src, path.join(UPLOADS, 'logos'), name);
        if (dest) copied.logos.push(dest);
    });

    // ── Social Icons (deduplicated — one size per icon) ──
    console.log('\n🔗 Social Icons:');
    const socialSources = [
        { src: path.join(WEBSITE, 'Partners', 'fb.png'), name: 'facebook.png' },
        { src: path.join(WEBSITE, 'Partners', 'Instagram-Icon-300x300.png'), name: 'instagram.png' },
        { src: path.join(WEBSITE, 'Partners', 'wa-300x300.png'), name: 'whatsapp.png' },
    ];
    socialSources.forEach(({ src, name }) => {
        const dest = safeCopy(src, path.join(UPLOADS, 'social'), name);
        if (dest) copied.social.push(dest);
    });

    // ── Resources (PDFs) ──
    console.log('\n📄 Resource Documents:');
    const resourceSources = [
        { src: path.join(LETTERHEADS, 'Wekume letterhead with footer.pdf'), name: 'wekume-letterhead.pdf' },
        { src: path.join(LETTERHEADS, 'Wekume Blank Letterhead, one with color-one without.pdf'), name: 'wekume-blank-letterhead.pdf' },
        { src: path.join(LETTERHEADS, 'Wekume Grants and Funds Receipt.pdf'), name: 'wekume-grants-receipt.pdf' },
        { src: path.join(LETTERHEADS, 'Wekume On-Campus Event Attendance list.pdf'), name: 'wekume-attendance-form.pdf' },
        { src: path.join(LETTERHEADS, 'Wekume Payment Voucher.pdf'), name: 'wekume-payment-voucher.pdf' },
        { src: path.join(WHERE, 'Catalyst Now Community Certificate of Membership.pdf Dec 17, 2025.pdf'), name: 'catalyst-now-certificate.pdf' },
        { src: path.join(WHERE, 'Copy of Wekume - Certificate of Membership.pdf'), name: 'wekume-certificate-of-membership.pdf' },
    ];
    resourceSources.forEach(({ src, name }) => {
        const dest = safeCopy(src, path.join(UPLOADS, 'resources'), name);
        if (dest) copied.resources.push(dest);
    });

    // ── Event Banner Images (pick best image per event) ──
    console.log('\n📅 Event Banner Images:');

    // Events from "Where we have been"
    const whereEvents = [
        { dir: 'Bingwala CDC incubation', slug: 'bingwala-cdc-incubation' },
        { dir: 'CSG Change day', slug: 'csg-change-day' },
        { dir: 'FUFA Radio Interview Nov 29, 2025', slug: 'fufa-radio-interview' },
        { dir: 'Green Companion Initiative', slug: 'green-companion-initiative' },
        { dir: 'INTER-UNIVERSITY DIALOGUE 2024 MAKERERE', slug: 'inter-university-dialogue-makerere' },
        { dir: 'Trip to Bureau of Internal Affairs NGOs Feb 21, 2025', slug: 'bureau-internal-affairs-visit' },
        { dir: 'YEC 2024 Conference Nov 8, 2024', slug: 'yec-2024-conference' },
        { dir: 'YiDHN mHealth and Application Development Boot CampJuly 22-25, 2025', slug: 'yidhn-mhealth-bootcamp' },
    ];
    whereEvents.forEach(({ dir, slug }) => {
        const eventDir = path.join(WHERE, dir);
        const img = pickBestImage(eventDir);
        if (img) {
            const ext = path.extname(img).toLowerCase();
            const dest = safeCopy(img, path.join(UPLOADS, 'events'), `${slug}${ext}`);
            if (dest) copied.events.push({ slug, path: dest });
        }
    });

    // Events from "Activities"
    const activityEvents = [
        { dir: 'Connect-The-Dots Aug 8, 2025', slug: 'connect-the-dots-aug-2025' },
        { dir: 'DW TV (German) interview Sept 15, 2025', slug: 'dw-tv-interview-sept-2025' },
        { dir: 'International Youth Day Celebration Aug 16, 2025', slug: 'international-youth-day-aug-2025' },
        { dir: 'Mutessa I Royal University on-campus Aug 6-8, 2025', slug: 'mutessa-royal-university-aug-2025' },
        { dir: 'YiDHN mHealth Bootcamp, July 22-25, 2025 Ghana', slug: 'yidhn-bootcamp-ghana-jul-2025' },
        { dir: 'Young Leaders in Arts & Health Summit', slug: 'young-leaders-arts-health-summit' },
        { dir: 'Kids of Africa Run 2025--Wekume Sept 7, 2025', slug: 'kids-of-africa-run-sept-2025' },
        { dir: 'Culture Week at Mutessa I Royal University--Sept 8. 2025', slug: 'culture-week-mutessa-sept-2025' },
    ];
    activityEvents.forEach(({ dir, slug }) => {
        const eventDir = path.join(ACTIVITIES, dir);
        const img = pickBestImage(eventDir);
        if (img) {
            const ext = path.extname(img).toLowerCase();
            const dest = safeCopy(img, path.join(UPLOADS, 'events'), `${slug}${ext}`);
            if (dest) copied.events.push({ slug, path: dest });
        }
    });

    return copied;
}

// ── STEP 2: Database seeding ────────────────────────────
async function seedDatabase(copied) {
    console.log('\n═══════════════════════════════════════════');
    console.log('  STEP 2: Seeding Database');
    console.log('═══════════════════════════════════════════\n');

    // Load Sequelize models
    const { sequelize } = require('../config/database');
    const db = require('../models');

    await sequelize.sync();
    console.log('📦 Database connected.\n');

    const API_BASE = '/uploads/soup-assets';
    let created = { events: 0, media: 0, resources: 0 };

    // ── Seed MediaLibrary entries ──
    console.log('🗄  Seeding Media Library...');
    const allCopied = [
        ...copied.about.map(p => ({ path: p, type: 'image', alt: 'Wekume team photo' })),
        ...copied.logos.map(p => ({ path: p, type: 'image', alt: 'Wekume logo asset' })),
        ...copied.social.map(p => ({ path: p, type: 'image', alt: 'Social media icon' })),
        ...copied.events.map(e => ({ path: e.path, type: 'image', alt: `Event: ${e.slug}` })),
        ...copied.resources.map(p => ({ path: p, type: 'document', alt: path.basename(p, path.extname(p)).replace(/-/g, ' ') })),
    ];

    for (const item of allCopied) {
        const fileName = path.basename(item.path);
        const relativePath = item.path.replace(/\\/g, '/').split('soup-assets/')[1];
        const fileUrl = `${API_BASE}/${relativePath}`;
        const sizeKB = Math.round(fs.statSync(item.path).size / 1024);

        const [record, wasCreated] = await db.MediaLibrary.findOrCreate({
            where: { file_name: fileName },
            defaults: {
                file_type: item.type,
                file_url: fileUrl,
                file_size_kb: sizeKB,
                alt_text: item.alt
            }
        });
        if (wasCreated) {
            created.media++;
            console.log(`  ✅ Media: ${fileName}`);
        } else {
            console.log(`  ⏭  Media exists: ${fileName}`);
        }
    }

    // ── Seed Events ──
    console.log('\n📅 Seeding Events...');
    const eventData = [
        // "Where we have been" events
        {
            title: 'Bingwala CDC Incubation Program',
            description: 'Wekume participated in the Bingwala CDC incubation program, with Joshua Walusimbi recognized as a Bingwa First Cohort member in January 2025.',
            event_type: 'training',
            event_date: '2025-01-15',
            location: 'Bingwala CDC, Uganda',
            slug: 'bingwala-cdc-incubation'
        },
        {
            title: 'CSG Change Day 2024',
            description: 'Wekume presented at the CSG Change Day event on November 20, 2024, sharing our mission and strategic goals for youth reproductive health.',
            event_type: 'outreach',
            event_date: '2024-11-20',
            location: 'Uganda',
            slug: 'csg-change-day'
        },
        {
            title: 'FUFA Radio Interview',
            description: 'Derrick Ntubiro and Joshua Walusimbi appeared on FUFA radio station for an interview about Wekume\'s mission and impact on youth health.',
            event_type: 'outreach',
            event_date: '2025-11-29',
            location: 'FUFA Radio Station, Uganda',
            slug: 'fufa-radio-interview'
        },
        {
            title: 'Green Companion Initiative Partnership',
            description: 'Collaboration with the Green Companion Initiative on STEM education and environmental health awareness.',
            event_type: 'other',
            event_date: '2024-12-20',
            location: 'Uganda',
            slug: 'green-companion-initiative'
        },
        {
            title: 'Inter-University Dialogue 2024 — Makerere',
            description: 'Wekume co-organized an inter-university dialogue event at Makerere University, bringing together students from multiple institutions to discuss reproductive health and youth empowerment.',
            event_type: 'outreach',
            event_date: '2024-10-26',
            location: 'Makerere University, Kampala',
            slug: 'inter-university-dialogue-makerere'
        },
        {
            title: 'Visit to Bureau of Internal Affairs (NGO Registration)',
            description: 'Joshua, Derrick, and Dennis visited the Ministry of Internal Affairs for official Wekume NGO registration on February 21, 2025.',
            event_type: 'other',
            event_date: '2025-02-21',
            location: 'Ministry of Internal Affairs, Kampala',
            slug: 'bureau-internal-affairs-visit'
        },
        {
            title: 'YEC 2024 Conference',
            description: 'Wekume team attended the Youth Entrepreneurship Conference (YEC) 2024, networking with fellow youth-led organizations and social enterprises.',
            event_type: 'other',
            event_date: '2024-11-08',
            location: 'Kampala, Uganda',
            slug: 'yec-2024-conference'
        },
        {
            title: 'YiDHN mHealth & Application Development Boot Camp',
            description: 'Wekume participated in the Youth in Digital Health Network (YiDHN) boot camp on mHealth and application development, July 22-25, 2025.',
            event_type: 'training',
            event_date: '2025-07-22',
            location: 'Uganda',
            slug: 'yidhn-mhealth-bootcamp'
        },
        // "Activities" events
        {
            title: 'Connect-The-Dots Event — Joshua Walusimbi as Guest Speaker',
            description: 'Joshua Walusimbi was invited as a guest speaker at the Connect-The-Dots event sharing insights on youth health innovation.',
            event_type: 'outreach',
            event_date: '2025-08-08',
            location: 'Kampala, Uganda',
            slug: 'connect-the-dots-aug-2025'
        },
        {
            title: 'DW TV (German) Interview',
            description: 'The Wekume team — including Derrick Ntubiro, Joshua Walusimbi, and Lydia Nakamya — was interviewed by Deutsche Welle (DW) German TV about Wekume\'s impact.',
            event_type: 'outreach',
            event_date: '2025-09-15',
            location: 'Kampala, Uganda',
            slug: 'dw-tv-interview-sept-2025'
        },
        {
            title: 'International Youth Day Celebration 2025',
            description: 'Wekume celebrated International Youth Day with Joshua Walusimbi delivering a keynote address on youth empowerment through health technology.',
            event_type: 'outreach',
            event_date: '2025-08-16',
            location: 'Kampala, Uganda',
            slug: 'international-youth-day-aug-2025'
        },
        {
            title: 'Mutessa I Royal University On-Campus Event (Phase 2)',
            description: 'Wekume\'s first on-campus event for Phase 2, held at Mutessa I Royal University from August 6-8, 2025. The team brought collateral and health resources directly to students.',
            event_type: 'workshop',
            event_date: '2025-08-06',
            location: 'Mutessa I Royal University, Uganda',
            slug: 'mutessa-royal-university-aug-2025'
        },
        {
            title: 'YiDHN mHealth Bootcamp — Ghana',
            description: 'Joshua Walusimbi traveled to Ghana for the YiDHN mHealth Bootcamp, representing Wekume in an international health technology training program.',
            event_type: 'training',
            event_date: '2025-07-22',
            location: 'Accra, Ghana',
            slug: 'yidhn-bootcamp-ghana-jul-2025'
        },
        {
            title: 'Young Leaders in Arts & Health Summit',
            description: 'Wekume participated in the Young Leaders in Arts & Health Summit in August 2025, connecting creative expression with health advocacy.',
            event_type: 'outreach',
            event_date: '2025-08-22',
            location: 'Uganda',
            slug: 'young-leaders-arts-health-summit'
        },
        {
            title: 'Kids of Africa Run 2025',
            description: 'Wekume joined the Kids of Africa Run 2025, a community event combining fitness with youth health awareness.',
            event_type: 'outreach',
            event_date: '2025-09-07',
            location: 'Kampala, Uganda',
            slug: 'kids-of-africa-run-sept-2025'
        },
        {
            title: 'Culture Week at Mutessa I Royal University',
            description: 'Wekume participated in Culture Week at Mutessa I Royal University, engaging students through cultural activities and health education.',
            event_type: 'outreach',
            event_date: '2025-09-08',
            location: 'Mutessa I Royal University, Uganda',
            slug: 'culture-week-mutessa-sept-2025'
        },
    ];

    for (const evt of eventData) {
        // Find the copied banner image for this event
        const banner = copied.events.find(e => e.slug === evt.slug);
        const bannerUrl = banner
            ? `${API_BASE}/events/${path.basename(banner.path)}`
            : null;

        const [record, wasCreated] = await db.Event.findOrCreate({
            where: { title: evt.title },
            defaults: {
                description: evt.description,
                event_type: evt.event_type,
                event_date: evt.event_date,
                location: evt.location,
                banner_image_url: bannerUrl,
                is_published: false,  // Admin must review and publish
                region: 'ug'
            }
        });

        if (wasCreated) {
            created.events++;
            console.log(`  ✅ Event: ${evt.title}${bannerUrl ? ' (with banner)' : ''}`);
        } else {
            console.log(`  ⏭  Event exists: ${evt.title}`);
        }
    }

    // ── Seed Resources ──
    console.log('\n📄 Seeding Resources...');
    const resourceData = [
        {
            title: 'Wekume Letterhead with Footer',
            description: 'Official Wekume letterhead template with branded footer for formal correspondence.',
            resource_type: 'download',
            file_url: `${API_BASE}/resources/wekume-letterhead.pdf`,
            file: 'wekume-letterhead.pdf'
        },
        {
            title: 'Wekume Blank Letterhead',
            description: 'Blank Wekume letterhead in both color and plain versions for general use.',
            resource_type: 'download',
            file_url: `${API_BASE}/resources/wekume-blank-letterhead.pdf`,
            file: 'wekume-blank-letterhead.pdf'
        },
        {
            title: 'Wekume Grants and Funds Receipt',
            description: 'Official receipt template for grants and funding received by Wekume Initiative.',
            resource_type: 'download',
            file_url: `${API_BASE}/resources/wekume-grants-receipt.pdf`,
            file: 'wekume-grants-receipt.pdf'
        },
        {
            title: 'On-Campus Event Attendance List',
            description: 'Printable attendance tracking form for Wekume on-campus events and health outreaches.',
            resource_type: 'download',
            file_url: `${API_BASE}/resources/wekume-attendance-form.pdf`,
            file: 'wekume-attendance-form.pdf'
        },
        {
            title: 'Wekume Payment Voucher',
            description: 'Payment voucher template used for Wekume financial transactions.',
            resource_type: 'download',
            file_url: `${API_BASE}/resources/wekume-payment-voucher.pdf`,
            file: 'wekume-payment-voucher.pdf'
        },
        {
            title: 'Catalyst Now Community Certificate of Membership',
            description: 'Wekume\'s certificate of membership in the Catalyst Now Community, received December 17, 2025.',
            resource_type: 'download',
            file_url: `${API_BASE}/resources/catalyst-now-certificate.pdf`,
            file: 'catalyst-now-certificate.pdf'
        },
        {
            title: 'Wekume Certificate of Membership',
            description: 'Official certificate of membership for Wekume Initiative.',
            resource_type: 'download',
            file_url: `${API_BASE}/resources/wekume-certificate-of-membership.pdf`,
            file: 'wekume-certificate-of-membership.pdf'
        },
    ];

    for (const res of resourceData) {
        const filePath = path.join(UPLOADS, 'resources', res.file);
        if (!fs.existsSync(filePath)) {
            console.log(`  ⚠  File not copied, skipping: ${res.file}`);
            continue;
        }

        const [record, wasCreated] = await db.Resource.findOrCreate({
            where: { title: res.title },
            defaults: {
                description: res.description,
                resource_type: res.resource_type,
                file_url: res.file_url,
                is_published: false,  // Admin must review and publish
                region: 'global'
            }
        });

        if (wasCreated) {
            created.resources++;
            console.log(`  ✅ Resource: ${res.title}`);
        } else {
            console.log(`  ⏭  Resource exists: ${res.title}`);
        }
    }

    return created;
}

// ── STEP 3: Summary Report ──────────────────────────────
function printReport(copied, created) {
    console.log('\n═══════════════════════════════════════════');
    console.log('  📊 INTEGRATION REPORT');
    console.log('═══════════════════════════════════════════\n');

    console.log('Files Copied:');
    console.log(`  📸 About Us photos: ${copied.about.length}`);
    console.log(`  🎨 Logo assets:     ${copied.logos.length}`);
    console.log(`  🔗 Social icons:    ${copied.social.length}`);
    console.log(`  📅 Event banners:   ${copied.events.length}`);
    console.log(`  📄 Resource docs:   ${copied.resources.length}`);
    console.log(`  ─────────────────────`);
    console.log(`  Total files:        ${copied.about.length + copied.logos.length + copied.social.length + copied.events.length + copied.resources.length}`);

    console.log('\nDatabase Records Created:');
    console.log(`  📅 Events:    ${created.events}`);
    console.log(`  🗄  Media:     ${created.media}`);
    console.log(`  📄 Resources: ${created.resources}`);

    console.log('\n⚠  IMPORTANT: All seeded content is UNPUBLISHED.');
    console.log('   Go to Admin Dashboard → review → publish items you want live.');
    console.log('\n✅ Integration complete!\n');
}

// ── Main ────────────────────────────────────────────────
async function main() {
    console.log('🚀 Wekume Soup Files Asset Integration\n');

    // Step 1: Copy files
    const copied = copyAssets();

    // Step 2: Seed database
    const created = await seedDatabase(copied);

    // Step 3: Report
    printReport(copied, created);

    process.exit(0);
}

main().catch(err => {
    console.error('\n❌ Fatal error:', err);
    process.exit(1);
});
