const Favorite = require("../models/Favorites");

const createFavorite = async (req, res) => {
  const { postId } = req.params;
  const userId = req.session.userId; // Assuming user ID is stored in the session

  if (postId === undefined || userId === undefined) {
    return res.status(400).send({ message: "Invalid postId or userId" });
  }

  const newFavorite = await Favorite.create(Number(userId), Number(postId));
  res.status(201).send(newFavorite);
};

const deleteFavorite = async (req, res) => {
  const { id } = req.params;
  const deletedFavorite = await Favorite.delete(Number(id));

  if (!deletedFavorite) {
    return res.status(404).send({
      message: `No favorite with the id ${id}`,
    });
  }

  res.send({ message: `Favorite with id ${id} deleted successfully` });
};

const getFavoritesByUserId = async (req, res) => {
  const userId = req.session.userId; // Assuming user ID is stored in the session
  const favorites = await Favorite.findByUserId(Number(userId));

  if (!favorites || favorites.length === 0) {
    return res.status(404).send({
      message: `No favorites found for fellow with id ${userId}`,
    });
  }

  res.send(favorites);
};

const getFavoritesByPostId = async (req, res) => {
  const { postId } = req.params;
  const favorites = await Favorite.findByPostId(Number(postId));

  if (!favorites || favorites.length === 0) {
    return res.status(404).send({
      message: `No favorites found for post with id ${postId}`,
    });
  }

  res.send(favorites);
};

module.exports = {
  createFavorite,
  deleteFavorite,
  getFavoritesByUserId,
  getFavoritesByPostId,
};
