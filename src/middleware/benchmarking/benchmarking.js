const request = require('supertest')
const server = require('../server/server.js')
const fs = require('fs');


describe('Benchmarking', function() {
  it('Benchmarking Employee-Onchain', function(done) {
    var answerVar = ' ; gas cost; time;\n'
    request(server)
      .post('/employeeOnchain/create')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        answerVar = answerVar + "employee-create;" + response.body.content.transaction.gasUsed + ";" +
        response.body.content.milliSeconds + "\n"
        return sleep(2000)
      })
      .then(() => {
        return request(server)
        .post('/employeeOnchain/add')
        .send({
        	"firstName" : "Adam",
        	"lastName" : "Miller",
        	"startDate" : 1515942162,
        	"department" : "IT",
        	"salary" : 2000
        })
        .expect('Content-Type', /json/)
        .expect(200)
      })
      .then(response => {
        answerVar = answerVar + "add1;" + response.body.content.transaction.gasUsed + ";" +
        response.body.content.milliSeconds + "\n"
        return request(server)
        .post('/employeeOnchain/add')
        .send({
        	"firstName" : "Kevin Marcel",
        	"lastName" : "Styp-Rekowski",
        	"startDate" : 1515942162,
        	"department" : "IT",
        	"salary" : 20000
        })
        .expect('Content-Type', /json/)
        .expect(200)
      })
      .then(response => {
        answerVar = answerVar + "add2;" + response.body.content.transaction.gasUsed + ";" +
        response.body.content.milliSeconds + "\n"
        return request(server)
        .post('/employeeOnchain/add')
        .send({
        	"firstName" : "Simon",
        	"lastName" : "Fallnich",
        	"startDate" : 1515942162,
        	"department" : "Marketing and Management",
        	"salary" : 2000
        })
        .expect('Content-Type', /json/)
        .expect(200)
      })
      .then(response => {
        answerVar = answerVar + "add3;" + response.body.content.transaction.gasUsed + ";" +
        response.body.content.milliSeconds + "\n"
        return request(server)
        .post('/employeeOnchain/add')
        .send({
        	"firstName" : "Tarek",
        	"lastName" : "Higazi",
        	"startDate" : 1515942162,
        	"department" : "Marketing and Management",
        	"salary" : 2000
        })
        .expect('Content-Type', /json/)
        .expect(200)
      })
      .then(response => {
        answerVar = answerVar + "add4;" + response.body.content.transaction.gasUsed + ";" +
        response.body.content.milliSeconds + "\n"
        return request(server)
        .post('/employeeOnchain/add')
        .send({
        	"firstName" : "Patrick",
        	"lastName" : "Friedrich",
        	"startDate" : 1515942162,
        	"department" : "IT",
        	"salary" : 2000
        })
        .expect('Content-Type', /json/)
        .expect(200)
      })
      .then(response => {
        answerVar = answerVar + "add5;" + response.body.content.transaction.gasUsed + ";" +
        response.body.content.milliSeconds + "\n"
        return request(server)
        .post('/employeeOnchain/add')
        .send({
        	"firstName" : "Vincent",
        	"lastName" : "Jonany",
        	"startDate" : 1515942162,
        	"department" : "IT",
        	"salary" : 2000
        })
        .expect('Content-Type', /json/)
        .expect(200)
      })
      .then(response => {
        answerVar = answerVar + "add6;" + response.body.content.transaction.gasUsed + ";" +
        response.body.content.milliSeconds + "\n"
        return request(server)
        .post('/employeeOnchain/add')
        .send({
        	"firstName" : "Thanh Tuan Tenh",
        	"lastName" : "Cong",
        	"startDate" : 1515942162,
        	"department" : "IT",
        	"salary" : 2000
        })
        .expect('Content-Type', /json/)
        .expect(200)
      })
      .then(response => {
        answerVar = answerVar + "add7;" + response.body.content.transaction.gasUsed + ";" +
        response.body.content.milliSeconds + "\n"
        return request(server)
        .post('/employeeOnchain/add')
        .send({
        	"firstName" : "Dukagjin",
        	"lastName" : "Ramosaj",
        	"startDate" : 1515942162,
        	"department" : "IT",
        	"salary" : 2000
        })
        .expect('Content-Type', /json/)
        .expect(200)
      })
      .then(response => {
        answerVar = answerVar + "add8;" + response.body.content.transaction.gasUsed + ";" +
        response.body.content.milliSeconds + "\n"
        return request(server)
        .post('/employeeOnchain/add')
        .send({
        	"firstName" : "Elon",
        	"lastName" : "Musk",
        	"startDate" : 1515942162,
        	"department" : "IT",
        	"salary" : 10000
        })
        .expect('Content-Type', /json/)
        .expect(200)
      })
      .then(response => {
        answerVar = answerVar + "add9;" + response.body.content.transaction.gasUsed + ";" +
        response.body.content.milliSeconds + "\n"
        return request(server)
        .post('/employeeOnchain/add')
        .send({
        	"firstName" : "Satoshi",
        	"lastName" : "Nakamoto",
        	"startDate" : 1515942162,
        	"department" : "IT",
        	"salary" : 50000
        })
        .expect('Content-Type', /json/)
        .expect(200)
      })
      .then(response => {
        answerVar = answerVar + "add10;" + response.body.content.transaction.gasUsed + ";" +
        response.body.content.milliSeconds + "\n"
        return request(server)
        .post('/payraiseOnchain/create')
        .send({
        	"percentage" : 15,
        	"department" : "IT",
        	"fromStartDate" : 1515942162
        })
        .expect('Content-Type', /json/)
        .expect(200)
      })
      .then(response => {
        answerVar = answerVar + "payraise-create;" + response.body.content.transaction.gasUsed + ";" +
        response.body.content.milliSeconds + "\n"
        const payraiseAddress = response.body.content.address
        request(server)
        .post('/employeeOnchain/increase-salary')
        .send({
        	"contractAddress": payraiseAddress
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          answerVar = answerVar + "increase-salary;" + res.body.content.transaction.gasUsed + ";" +
          res.body.content.milliSeconds + "\n"

          fs.writeFileSync("/middleware/benchmarking/employeeOnchain.csv", answerVar, function(err) {
              if(err) {
                  return console.log(err)
              }
          })
          done()
        });
      })
  });

  it('Benchmarking Employee', function(done) {
    var answerVar = ' ; gas cost; time;\n'
    request(server)
      .post('/employee/create')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        answerVar = answerVar + "employee-create;" + response.body.content.transaction.gasUsed + ";" +
        response.body.content.milliSeconds + "\n"
        return sleep(2000)
      })
      .then(() => {
        return request(server)
        .post('/employee/add')
        .send({
        	"firstName" : "Adam",
        	"lastName" : "Miller",
        	"startDate" : "1515942162",
        	"department" : "IT",
        	"salary" : 2000
        })
        .expect('Content-Type', /json/)
        .expect(200)
      })
      .then(response => {
        answerVar = answerVar + "add1;" + response.body.content.transaction.gasUsed + ";" +
        response.body.content.milliSeconds + "\n"
        return request(server)
        .post('/employee/add')
        .send({
        	"firstName" : "Kevin Marcel",
        	"lastName" : "Styp-Rekowski",
        	"startDate" : "1515942162",
        	"department" : "IT",
        	"salary" : 20000
        })
        .expect('Content-Type', /json/)
        .expect(200)
      })
      .then(response => {
        answerVar = answerVar + "add2;" + response.body.content.transaction.gasUsed + ";" +
        response.body.content.milliSeconds + "\n"
        return request(server)
        .post('/employee/add')
        .send({
        	"firstName" : "Simon",
        	"lastName" : "Fallnich",
        	"startDate" : "1515942162",
        	"department" : "Marketing and Management",
        	"salary" : 2000
        })
        .expect('Content-Type', /json/)
        .expect(200)
      })
      .then(response => {
        answerVar = answerVar + "add3;" + response.body.content.transaction.gasUsed + ";" +
        response.body.content.milliSeconds + "\n"
        return request(server)
        .post('/employee/add')
        .send({
        	"firstName" : "Tarek",
        	"lastName" : "Higazi",
        	"startDate" : "1515942162",
        	"department" : "Marketing and Management",
        	"salary" : 2000
        })
        .expect('Content-Type', /json/)
        .expect(200)
      })
      .then(response => {
        answerVar = answerVar + "add4;" + response.body.content.transaction.gasUsed + ";" +
        response.body.content.milliSeconds + "\n"
        return request(server)
        .post('/employee/add')
        .send({
        	"firstName" : "Patrick",
        	"lastName" : "Friedrich",
        	"startDate" : "1515942162",
        	"department" : "IT",
        	"salary" : 2000
        })
        .expect('Content-Type', /json/)
        .expect(200)
      })
      .then(response => {
        answerVar = answerVar + "add5;" + response.body.content.transaction.gasUsed + ";" +
        response.body.content.milliSeconds + "\n"
        return request(server)
        .post('/employee/add')
        .send({
        	"firstName" : "Vincent",
        	"lastName" : "Jonany",
        	"startDate" : "1515942162",
        	"department" : "IT",
        	"salary" : 2000
        })
        .expect('Content-Type', /json/)
        .expect(200)
      })
      .then(response => {
        answerVar = answerVar + "add6;" + response.body.content.transaction.gasUsed + ";" +
        response.body.content.milliSeconds + "\n"
        return request(server)
        .post('/employee/add')
        .send({
        	"firstName" : "Thanh Tuan Tenh",
        	"lastName" : "Cong",
        	"startDate" : "1515942162",
        	"department" : "IT",
        	"salary" : 2000
        })
        .expect('Content-Type', /json/)
        .expect(200)
      })
      .then(response => {
        answerVar = answerVar + "add7;" + response.body.content.transaction.gasUsed + ";" +
        response.body.content.milliSeconds + "\n"
        return request(server)
        .post('/employee/add')
        .send({
        	"firstName" : "Dukagjin",
        	"lastName" : "Ramosaj",
        	"startDate" : "1515942162",
        	"department" : "IT",
        	"salary" : 2000
        })
        .expect('Content-Type', /json/)
        .expect(200)
      })
      .then(response => {
        answerVar = answerVar + "add8;" + response.body.content.transaction.gasUsed + ";" +
        response.body.content.milliSeconds + "\n"
        return request(server)
        .post('/employee/add')
        .send({
        	"firstName" : "Elon",
        	"lastName" : "Musk",
        	"startDate" : "1515942162",
        	"department" : "IT",
        	"salary" : 10000
        })
        .expect('Content-Type', /json/)
        .expect(200)
      })
      .then(response => {
        answerVar = answerVar + "add9;" + response.body.content.transaction.gasUsed + ";" +
        response.body.content.milliSeconds + "\n"
        return request(server)
        .post('/employee/add')
        .send({
        	"firstName" : "Satoshi",
        	"lastName" : "Nakamoto",
        	"startDate" : "1515942162",
        	"department" : "IT",
        	"salary" : 50000
        })
        .expect('Content-Type', /json/)
        .expect(200)
      })
      .then(response => {
        answerVar = answerVar + "add10;" + response.body.content.transaction.gasUsed + ";" +
        response.body.content.milliSeconds + "\n"
        return request(server)
        .post('/payraise/create')
        .send({
        	"percentage" : 15,
        	"department" : "IT",
        	"fromStartDate" : 1515942162
        })
        .expect('Content-Type', /json/)
        .expect(200)
      })
      .then(response => {
        answerVar = answerVar + "payraise-create;" + response.body.content.transaction.gasUsed + ";" +
        response.body.content.milliSeconds + "\n"
        const payraiseAddress = response.body.content.address
        request(server)
        .post('/employee/increase-salary')
        .send({
        	"contractAddress": payraiseAddress
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          let gasCostCumulated = 0
          let milliSeconds = 0
          for (var i = 0; i < res.body.content.length; i++) {
            if(res.body.content[i].transaction){
              gasCostCumulated += res.body.content[i].transaction.gasUsed
            }
            if(res.body.content[i].milliSeconds){
              milliSeconds = res.body.content[i].milliSeconds
            }
          }
          answerVar = answerVar + "increase-salary;" + gasCostCumulated + ";" + milliSeconds + "\n"

          fs.writeFileSync("/middleware/benchmarking/employee.csv", answerVar, function(err) {
              if(err) {
                  return console.log(err)
              }
          })
          done()
        });
      })
  });
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}