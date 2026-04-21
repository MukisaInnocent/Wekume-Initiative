async function test() {
    try {
        const res = await fetch('http://localhost:5000/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email: 'admin@wekume.org', password: 'adminpassword'})
        });
        const data = await res.json();
        const token = data.token;
        
        const putRes = await fetch('http://localhost:5000/api/admin/sections/homepage.hero_title', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ section_title: 'Homepage Hero Title Edited Again!', content_text: 'Test Content', region: 'global' })
        });
        const putData = await putRes.json();
        console.log(putData);
    } catch(e) {
        console.error('Error:', e);
    }
}
test();
