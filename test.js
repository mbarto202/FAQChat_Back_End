import request from 'supertest';
import { expect } from 'chai';
import app from './server.js';
import { describe, it } from 'mocha';

describe('GET /test-db-connection', () => {
    it('should return a success message and status 200 if database is connected', (done) => {
        request(app)
            .get('/test-db-connection')
            .expect(200)
            .expect((res) => {
                expect(res.text).to.include('Database connected!');
            })
            .end(done);
    });

    it('should return an error message and status 500 if there is a connection issue', (done) => {
        // You can mock the pool.query to simulate a failure
        // This is a simplified example, and you may need to adjust based on your test setup
        request(app)
            .get('/test-db-connection')
            .expect(500)
            .expect((res) => {
                expect(res.text).to.equal('Error connecting to the database');
            })
            .end(done);
    });
});