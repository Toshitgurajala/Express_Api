const express=require('express');
const Joi = require('joi');
const app = express();
app.use(express.json());
const courses=[
    {id:1,name:'Course1'},
    {id:2,name:'Course2'},
    {id:3,name:'Course3'}
]
app.get('/',(req,res)=>
{
res.send('Hello World!!!!!');
});
app.get('/api/courses',(req,res)=>
{
    res.send(courses);    
})

app.post('/api/courses',(req,res)=>
{
    
const {error} =validatecourse(req.body);
if(error)
{
    res.status(400).send(error.details[0].message); 
    return;
}
const course=
{ 
id:courses.length+1,
name:req.body.name 

}
course.name=req.body.name;
res.send(course);

});
app.put('/api/courses/:id',(req,res)=>
{
const course=courses.find(c=>c.id===parseInt(req.params.id));
if(!course)
res.status(404).send('This course with given ID id not Found');
const {error} =validatecourse(req.body);
if(error)
{
    res.status(400).send(error.details[0].message); 
    return;
}
course.name=req.body.name;
res.send(course);
});
app.delete('/api/courses/:id',(req,res)=>
{
    const course = courses.find(c=>c.id===parseInt(req.params.id));
    if(!course)
    {
        res.status(404).send('The course with the given Id id not found');
        return;
    }
    const result=courses.indexOf(course);
    courses.splice(result,1);
    res.send(course);
})
function validatecourse(course)
{
    const schema=
{name:Joi.string().min(3).required()
};
return Joi.validate(course,schema);
}
const port = process.env.PORT||3000
app.listen(port,()=>{console.log(`Listening on port ${port}`)});

