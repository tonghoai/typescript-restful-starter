"use strict"

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../dist/index").default;
const expect = chai.expect;
chai.use(chaiHttp);
const requester = chai.request(server).keepOpen()

describe("Common API", function () {
    before(function () {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                return resolve()
            }, 1000)
        }).then()
    })

    describe("/GET index", function () {
        it("it should get index response", function (done) {
            requester
                .get("/")
                .end(function (err, res) {
                    expect(res).have.status(200);
                    expect(res.body).to.be.a('object');
                    done();
                })
        })
    })

    describe("/POST register", function () {
        it("it should register", function (done) {
            requester
                .post("/register")
                .send({ username: "hoaitx", password: "hoaitx", repassword: "hoaitx" })
                .end(function (err, res) {
                    expect(res).have.status(200);
                    expect(res.body).to.be.a("object");
                    expect(res.body).have.property("data");
                    expect(res.body.data).have.property("id").to.be.a("number");
                    done();
                })
        })
    })

    describe("/POST login", function () {
        it("it should login success", function (done) {
            requester
                .post("/login")
                .send({ username: "hoaitx", password: "hoaitx" })
                .end(function (err, res) {
                    expect(res).have.status(200);
                    expect(res.body).to.be.a("object");
                    expect(res.body).have.property("data");
                    expect(res.body.data).have.property("token").to.be.a("string").have.length.gt(0);
                    done();
                })
        })
    })

    after(function () {
        requester.close()
        // process.exit()
    })
})
