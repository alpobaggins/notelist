require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const { User, Post } = require('./db/models');
const Bcrypt = require('./utils/bcrypt');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(process.env.PWD, 'public')));

const sessionConfig = {
  name: 'cook',
  secret: process.env.SECRET || 'thisisnotsecure',
  store: new FileStore(),
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
  },
  resave: true,
  saveUninitialized: false,
};

app.use(session(sessionConfig));

app.post('/registration', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const result = await User.create({ email, password: await Bcrypt.hash(password), name });
    if (result.id) {
      req.session.userName = result.name;
      req.session.userId = result.id;
      return res.json(result);
    }
    throw Error(result);
  } catch (error) {
    return res.json(error);
  }
});

app.get('/checkauth', async (req, res) => {
  try {
    const result = await User.findByPk(req.session.userId);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await User.findOne({ where: { email } });
    if (await Bcrypt.compare(password, result.password)) {
      req.session.userName = result.name;
      req.session.userId = result.id;
      return res.json(result);
    }
    throw Error(result);
  } catch (error) {
    return res.json(error);
  }
});

app.get('/logout', async (req, res) => {
  try {
    req.session.destroy();
    res.clearCookie('cook');
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

app.get('/post', async (req, res) => {
  const result = await Post.findAll({ order: [['updatedAt', 'DESC']], include: { model: User }});
  res.json(result);
});

app.post('/post', async (req, res) => {
  const { title, body, pic_url } = req.body;
  const { userId } = req.session;

  const result = await Post.create({ title, body, pic_url, author_id: userId });
  res.json(result);
});

app.delete('/post/:id', async (req, res) => {
  const { id } = req.params;

  await Post.destroy({ where: { id } });
  res.sendStatus(200);
});

app.put('/post', async (req, res) => {
  const { id, title, body, pic_url } = req.body;
  const { userId } = req.session;

  try {
    const findPost = await Post.findOne({ where: { id: req.body.id } });
    await findPost.update({ title: req.body.title, body: req.body.body, pic_url: req.body.pic_url });
    await findPost.save();
    const result = await Post.findAll({ order: [['updatedAt', 'DESC']], include: { model: User }});
    res.json(result);
  } catch(err) {
    console.log(err);
  }
});


app.listen(process.env.PORT, () => {
  console.log('server start ', process.env.PORT);
});
