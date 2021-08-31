const express = require("express");
const dotenv = require('dotenv');
const cors = require("cors");
const multer = require('multer');
const path = require('path');
const uuid = require('uuid').v4;
const HttpException = require('./utils/HttpException.utils');
const errorMiddleware = require('./middleware/error.middleware');
const MenuRouter = require('./routes/menu.router');
const AdminRouter = require('./routes/admin.router');
const SlideRouter = require('./routes/slide.router');
const ProductRouter = require('./routes/product.router');
const NewFeedRouter = require('./routes/newfeed.router');
const FooterRouter = require('./routes/footer.router');
const InformationRouter = require('./routes/information.router');
const IntroduceRouter = require('./routes/introduce.router');
// Init express
const app = express();
// Init environment
dotenv.config();
// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.json());
// enabling cors for all requests by using cors middleware
app.use(cors());
// Enable pre-flight
app.options("*", cors());


// --- upload file ------
let tmpUrl = ""
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'public/uploads')
  },
  filename: (req, file, cb) => {
      tmpUrl = Date.now()+file.originalname;
      const { originalname } = file;
      // or 
      // uuid, or fieldname
      cb(null, tmpUrl);
  }
})
const upload = multer({ storage }); // or simply { dest: 'uploads/' }

app.post('/upload', upload.array('image'), (req, res) => {
  return res.json({ status: 'OK', url: "http://127.0.0.1:5000/images/"+tmpUrl });
});


const port = Number(process.env.PORT || 5000);
app.use('/images', express.static('public/uploads'))
app.use(`/api/menu/`, MenuRouter);
app.use(`/api/admin/`, AdminRouter);
app.use(`/api/slide/`, SlideRouter);
app.use( `/api/product/`, ProductRouter);
app.use(`/api/newfeed/`, NewFeedRouter);
app.use(`/api/footer/`, FooterRouter);
app.use(`/api/information/`, InformationRouter);
app.use(`/api/introduce/`, IntroduceRouter);
// 404 error
app.all('*', (req, res, next) => {
    const err = new HttpException(404, 'Endpoint Not Found');
    next(err);
});

// Error middleware
app.use(errorMiddleware);

// starting the server
app.listen(port, () =>
    console.log(`Server running on port ${port}!`));


module.exports = app;