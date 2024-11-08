 import './config';
 import express from 'express';
 import helmet from 'helmet';
 import morgan from 'morgan';


 const app = express();
 const port = process.env.PORT || 3000;
//MIDDLEWARES
 app.use(express.json());
 app.use(helmet())
app.use(morgan('combined'));
//SSL CERT
 const options ={
keys : FileSystem.readFileSync('./privatekeys.pem'),
cert : FileSystem.readFileSync('./certficate.pem')

 }

 app.get('/', (req, res) => {
    res.send('Hello World!');
});


 app.listen(port, () => {
     console.log(`Server running on port ${port}`);
 });