import chai from 'chai';
import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();

const expect = chai.expect;

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const notes = [{
    noteId: 1,
    noteContent: "Hey guys, add your notes here."
}];

app.get("/", (req, res) => {
    res.render("home", {
        data: notes
    });
});

app.post("/", (req, res) => {
    const noteContent = req.body.noteContent;
    const noteId = notes.length + 1;

    notes.push({
        noteId: noteId,
        noteContent: noteContent
    });

    res.render("home", {
        data: notes
    });
});

app.post('/edit', (req, res) => {
    var noteId = req.body.noteId;
    var noteContent = req.body.noteContent;

    notes.forEach(note => {
        if (note.noteId == noteId) {
            note.noteContent = noteContent;
        }
    });
    res.render("home", {
        data: notes
    });
});


    it('POST method for update should return status 200', (done) => {
        request(app)
            .post('/edit')
            .send({
                noteId: 1,
                noteContent: 'Updated note content'
            })
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                done();
            });
    });
    it('POST method should return status 200', (done) => {
        request(app)
            .post('/')
            .send({
                noteContent: 'Test note content'
            })
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                done();
            });
    });
   
    describe('GET /', function () {
        it('should return 200 OK and render home view', function (done) {
            request(app)
                .get('/')
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });
        });
    });
    describe('POST /', function () {
        it('should add a new note and render home view', function (done) {
            const noteContent = 'Test note';
    
            request(app)
                .post('/')
                .send({ noteContent: noteContent })
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });
        });
    });
