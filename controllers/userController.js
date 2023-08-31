const { UserModel } = require('../models');
const { signToken } = require('../utils/Authentication')
const bcrypt = require('bcrypt');
const userController = {
  // get all pizzas
  getAllUsers(req, res) {
    // console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$', req)
    UserModel.find({})
      .select('-__v')
      .sort({ _id: -1 })
      .then(userData => res.json(userData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one pizza by id
  // getPizzaById({ params }, res) {
  //   console.log('********************', params)
  //   Pizza.findOne({ _id: params.id })
  //     .populate({
  //       path: 'comments',
  //       select: '-__v'
  //     })
  //     .select('-__v')
  //     .then(dbPizzaData => res.json(dbPizzaData))
  //     .catch(err => {
  //       console.log(err);
  //       res.sendStatus(400);
  //     });
  // },

  // createPizza
  createUser({ body }, res) {
    const newUser = UserModel.create(body)
      .then(userData => res.json(userData))
      .catch(err => res.json(err));
    const token = signToken(newUser)
    console.log(token)
    return { token, newUser }
  },

  async loginToUser({ body }, res) {
    const loginUser = await UserModel.findOne({ eMail: body.eMail })
      .select('-__v')

      .sort({ _id: -1 })
      .then(userData => res.json(userData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });

    const dbPassword = '$2b$10$N5A6uCborEuBfTlBu0qjtuAvftKgQOt3IGqSK8sULquGs6t5DpOu6'
    const old = '123'
    const anotherOne = old

    const salt = 10
    const hash = await bcrypt.hash(body.password, salt)

    // console.log(hash)

    const checkPassword = async function () {
      console.log("password match? ", await bcrypt.compare(old, anotherOne))
      // return bcrypt.compareSync(dbPassword, dbPassword)
    }
    checkPassword()




    // console.log('******loginUser', loginUser, '******')
    const token = signToken(loginUser);
    // console.log(token)
    return { token, loginUser };
  }
  // // update pizza by id
  // updatePizza({ params, body }, res) {
  //   Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
  //     .then(dbPizzaData => {
  //       if (!dbPizzaData) {
  //         res.status(404).json({ message: 'No pizza found with this id!' });
  //         return;
  //       }
  //       res.json(dbPizzaData);
  //     })
  //     .catch(err => res.status(404).json(err));
  // },

  // // delete pizza
  // deletePizza({ params }, res) {
  //   Pizza.findOneAndDelete({ _id: params.id })
  //     .then(dbPizzaData => res.json(dbPizzaData))
  //     .catch(err => res.json(err));
  // }
};

module.exports = userController;
