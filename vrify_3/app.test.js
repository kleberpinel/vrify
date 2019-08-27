const request = require('supertest');
const app = require('./app')

const postRequest = (url, body) => {
  const httpRequest = request(app).post(url);
  httpRequest.send(body);
  httpRequest.set('Accept', 'application/json')
  httpRequest.set('Origin', 'http://localhost:3000')
  return httpRequest;
}

describe('Test the root path', () => {
    test('It should response the GET method', (done) => {
        request(app).get('/').then((response) => {
            expect(response.statusCode).toBe(200);
            done()
        });
    });
});

describe('Test the customers api', () => {
    test('It should list all customers', async (done) => {
      const response = await request(app).get('/customers');
      expect(response.statusCode).toBe(200);

      expect(response.body.customers.length).toBe(4)
      done()
    });

    test('It should response the customer requested', async (done) => {
      const response = await request(app).get('/customers/1');
      expect(response.statusCode).toBe(200);

      expect(response.body.customer.name).toBe('Ryan')
      done()
    });

    test('It should response the customer with address related', async (done) => {
      const response = await request(app).get('/customers-with-address');
      expect(response.statusCode).toBe(200);

      expect(response.body.customers.length).toBe(3)
      done()
    });

    test('It should create a new record', async (done) => {
      const newCustomer = { name: 'Jhon' }
      const response = await postRequest('/customers', newCustomer);

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true)

      // To improve here, we need to delete the new user added so the tests
      // can run many times and isolated.

      done()
    });

    test('It should create fail on validation', async (done) => {
      const response = await postRequest('/customers', {});

      expect(response.statusCode).toBe(401);
      done()
    });
});
