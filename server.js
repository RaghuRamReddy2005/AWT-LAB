var express=require('express');
var mongoose=require('mongoose');

var app=express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/temp")
    .then(()=>console.log("successfullly connected to MongoDB"))
    .catch((err)=>console.log(err))
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number },
    city: { type: String }
});

const Student = mongoose.model('Student', studentSchema);
app.post('/student', (req, res) => {
    const newStudent = new Student(req.body);
    
    newStudent.save()
        .then((student) => {
            res.status(201).json({ message: 'Student created successfully', student });
        })
        .catch((err) => {
            res.status(400).json({ message: 'Error creating student', error: err });
        });
});


app.get('/getAll',(req,res)=>{
    Student.find()
        .then((student)=>{
            res.status(201).json({ message:'getting data',student});
        })
        .catch((err)=>{
            res.status(400).json({message:"unsucesxsful",error:err})
        })
})
app.delete('/student/:name', (req, res) => {
    const studentName = req.params.name;
    
    Student.findOneAndDelete({ name: studentName })
        .then((deletedStudent) => {
            if (deletedStudent) {
                res.status(200).json({ message: 'Student deleted successfully', deletedStudent });
            } else {
                res.status(404).json({ message: 'Student not found' });
            }
        })
        .catch((err) => {
            res.status(400).json({ message: 'Error deleting student', error: err });
        });
});
app.listen(2000,()=>{
    console.log("server running")
});

