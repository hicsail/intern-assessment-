const supertest = require('supertest');
const chai = require('chai');
const app = require('../app'); // Importing Express app
const expect = chai.expect;

const request = supertest(app);

describe('To Do App API Tests', function() {
  let taskId;

  it('should create a task', function(done) {
    request.post('/tasks')
      .send({ title: 'New Task' })
      .expect(201)
      .end(function(err, res) {
        expect(res.body).to.have.property('id');
        taskId = res.body.id; // Saving task id for other tests
        done(err);
      });
  });

  it('should read a task', function(done) {
    request.get(`/tasks/${taskId}`)
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.have.property('title', 'New Task');
        done(err);
      });
  });

  it('should mark a task as completed', function(done) {
    request.put(`/tasks/${taskId}`)
      .send({ completed: true })
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.have.property('completed', true);
        done(err);
      });
  });

  it('should update the title of a task', function(done) {
    request.put(`/tasks/${taskId}`)
      .send({ title: 'Updated Task' })
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.have.property('title', 'Updated Task');
        done(err);
      });
  });

  it('should delete a task', function(done) {
    request.delete(`/tasks/${taskId}`)
      .expect(204, done);
  });

  it('should list all tasks', function(done) {
    request.get('/tasks')
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.be.an('array');
        done(err);
      });
  });

  it('should list all completed tasks', function(done) {
    request.get('/tasks')
      .query({ completed: true })
      .expect(200)
      .end(function(err, res) {
        expect(res.body.every(task => task.completed === true)).to.be.true;
        done(err);
      });
  });

  it('should list all pending tasks', function(done) {
    request.get('/tasks')
      .query({ completed: false })
      .expect(200)
      .end(function(err, res) {
        expect(res.body.every(task => task.completed === false)).to.be.true;
        done(err);
      });
  });
});
