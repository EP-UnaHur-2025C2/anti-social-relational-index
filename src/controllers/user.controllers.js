const { User } = require("../db/models");

async function getUsers(req, res) {
  const data = await User.findAll({});
  res.status(200).json(data);
}

const getUserById = async (req, res) => {
  const data = await User.findOne({ where: { id: req.params.id } });
  res.status(200).json(data);
};

const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (e) {
    res.status(400).json({ error: e });
  }
};

const updateNickName = async (req, res) => {
  try {
    const idABuscar = await req.params.id;

    const newUser = await User.update(
      { nickName: req.body.nickName },
      {
        where: {
          id: idABuscar,
        },
      }
    );
    res.status(201).json({ message: "usuario modificado con exito" });
  } catch (e) {
    res.status(400).json({ error: e });
  }
};

const updateEmail = async (req, res) => {
  try {
    const idABuscar = await req.params.id;

    const newUser = await User.update(
      { email: req.body.email },
      {
        where: {
          id: idABuscar,
        },
      }
    );
    res.status(201).json({ message: "email modificado con exito" });
  } catch (e) {
    res.status(400).json({ error: e });
  }
};

const deleteUser = async (req, res) => {
  const idABuscar = await req.params.id;

  const newUser = await User.destroy({
    where: {
      id: idABuscar,
    },
  });

  res.status(201).json({ message: "Usuario eliminado con exito" });
};

const followUser = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    const userASeguir = await User.findOne({
      where: { id: req.params.idASeguir },
    });
    const follow = user.addFollower(userASeguir);
    res
      .status(201)
      .json({
        message:
          user.nickName + " siguio de forma exitosa a: " + userASeguir.nickName,
      });
  } catch (e) {
    res.status(400).json({ error: "hay un error" });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateNickName,
  updateEmail,
  deleteUser,
  followUser,
};
