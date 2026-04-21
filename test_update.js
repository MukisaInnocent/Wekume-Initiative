const axios = require('axios');
async function test() {
    try {
        const res = await axios.post('http://localhost:5000/api/admin/login', {email: 'admin@wekume.org', password: 'adminpassword'});
        const token = res.data.token;
        const putRes = await axios.put('http://localhost:5000/api/admin/sections/homepage.hero_title', 
            { section_title: 'Homepage Hero Title Edited Again!', content_text: 'Test Content', region: 'global' }, 
            { headers: { Authorization: `Bearer ${token}`} }
        );
        console.log(putRes.data);
    } catch(e) {
        console.error('Error:', e.response ? e.response.data : e.message);
    }
}
test();
