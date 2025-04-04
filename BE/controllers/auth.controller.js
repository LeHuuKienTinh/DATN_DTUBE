const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/auth.model');

const JWT_SECRET = 'your_jwt_secret'; // Nên dùng biến môi trường

exports.register = async (req, res) => {
  console.log(req.body);
  try {
    console.log(req.body);
    const { username, name, mail, password } = req.body;
    
    // Kiểm tra username hoặc email đã tồn tại
    const existingUser = await User.findByUsername(username) || await User.findByMail(mail);
    if (existingUser) {
      return res.status(400).send({ message: 'Username or email already exists' });
    }

    // Mã hóa password
    const hashedPassword = bcrypt.hashSync(password, 8);

    // Tạo user mới (mặc định type = 2 - user)
    const userId = await User.create({
      username,
      name,
      mail,
      password: hashedPassword
    });

    res.status(201).send({ message: 'User registered successfully', userId });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Tìm user
    const user = await User.findByUsername(username);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Kiểm tra password
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ message: 'Invalid password' });
    }

    // Tạo token
    const token = jwt.sign({ id: user.id, type: user.type }, JWT_SECRET, {
      expiresIn: 86400 // 24 giờ
    });

    res.status(200).send({
      id: user.id,
      username: user.username,
      name: user.name,
      mail: user.mail,
      type: user.type,
      accessToken: token
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};