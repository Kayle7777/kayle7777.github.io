const request = require('supertest');
const server = require('../serverTest');

test('all repos have readmes', done => {
    request(server)
        .get('/api/gitHub/')
        .expect(200)
        .end((err, res) => {
            if (err) done(err);
            console.log(res.body);
            done();
        });
});
