import request from 'supertest';
import {app} from '../app';

describe("testing the auth routes", ()=> {
    
    describe(" Testing the register route", () => {

        it(" should return 200 status code", async ()=> {
            const response = await request(app).post('/api/v1/register').send({
                name:"nathn",
                email: "georgenathan010@gmail.com",
                role: "admin",
                password: "ante12",
            });

            expect(response.statusCode).toBe(200);
        })
    });
    describe("testing the login route", ()=> {
        it("should return 200 for proper details", async () => {
            const response = await request(app).post('/api/v1/login').send({
                password: "ante12",
                email: "georgenathan010@gmail.com",
            });

            expect(response.statusCode).toBe(200);
        });
    })
});


describe("role based access", ()=> {
    it('should return 403 for unathorized', ()=> {
        const response = await request(app).post.('/admin').send({
            role: "user",
        });
        expect(response.statusCode).toBe(403);
    })
})