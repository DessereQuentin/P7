const Post = require('../models/Post');
const fs = require('fs');



exports.createPost = (req, res, next) => {
  const postObject = JSON.parse(req.body.post)
  const post = new Post({
    ...postObject,
   
    userId: req.auth.userId,
 
   imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0
  });
  post.save()
    .then(() => { res.status(201).json({ message: 'Objet enregistré !' }) })
    .catch(error => { res.status(400).json({ error }) })
};

exports.getOnePost = (req, res, next) => {
  Post.findOne({
    _id: req.params.id
  }).then(
    (post) => {
      res.status(200).json(post);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifyPost = (req, res, next) => {
  const postObject = req.file ? {
    ...JSON.parse(req.body.post),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body }
   Post.findOne({ _id: req.params.id })
    .then((post) => {
      if ((req.isAdmin!=true)&&(post.userId != req.auth.userId)) {
        res.status(401).json({ message: 'Not authorized' });
      } else {
 
        post.updateOne( { ...postObject, _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet modifié!' }))
          .catch(error => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then(post => {
      if ((req.auth.isAdmin!=true)&&(post.userId != req.auth.userId)) {
        res.status(401).json({ message: 'Not authorized' });
      } else {
        const filename = post.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
         Post.deleteOne({ _id: req.params.id })
            .then(() => { res.status(200).json({ message: 'Objet supprimé !' }) })
            .catch(error => res.status(401).json({ error }));
        });
      }
    })
    .catch(error => {
      res.status(500).json({ error });
    });
};

exports.getAllPost = (req, res, next) => {
  Post.find().then(
    (posts) => {
      res.status(200).json(posts);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.modifyLikes = (req, res, next) => {
  const likeObject = { ...req.body }
  likeObject.userId=req.auth.userId

  Post.findOne({ _id: req.params.id })
    .then((post) => {
      const postObject = post;

      if (likeObject.like == 0) {
        var indexLikes = postObject.usersLiked.indexOf(likeObject.userId);
        var indexDislikes = postObject.usersDisliked.indexOf(likeObject.userId);

        if (indexLikes != -1) {
          postObject.usersLiked.splice(indexLikes, 1);
          postObject.likes =postObject.usersLiked.length
        }
     
        if (indexDislikes != -1) {
         postObject.usersDisliked.splice(indexDislikes, 1);
         postObject.dislikes = postObject.usersDisliked.length
        }
      }
      else if (likeObject.like == 1) {
        var indexLikes = postObject.usersLiked.indexOf(likeObject.userId);
        if (indexLikes != -1) {
          postObject.usersLiked.splice(indexLikes, 1);
        }
        postObject.usersLiked.push(likeObject.userId)
        postObject.likes = postObject.usersLiked.length

      } else {
        var indexDislikes = postObject.usersDisliked.indexOf(likeObject.userId);
        if (indexDislikes != -1) {
         postObject.usersDisliked.splice(indexDislikes, 1);
        }
        postObject.usersDisliked.push(likeObject.userId)
       postObject.dislikes = postObject.usersDisliked.length
      }

      Post.updateOne({ ...postObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'like mis à jour' }))
        .catch(error => res.status(401).json({ error }));
    })

    .catch((error) => {
      res.status(400).json({ error });
    });
}