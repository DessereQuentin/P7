const Post = require('../models/Post');
const fs = require('fs');
const User = require('../models/User');


exports.createPost = (req, res, next) => 
{

  User.findById(req.auth.userId)
  .then((user)=>
  {
    const post = new Post(
    {
    title:req.body.title,
    text:req.body.text,
    userId: user._id,
    userName:user.userName,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    usersLiked:[],
    usersDisliked:[],
    date:Date.now()
    });
    post.save()
  })
    .then(() => { res.status(201).json({ message: 'Objet enregistré !' }) })
    .catch(error => { res.status(400).json({ error }) })
};


exports.getOnePost = (req, res, next) => 
{
  Post.findOne({_id: req.params.id})
  .then((post) =>{res.status(200).json(post);})
  .catch((error) =>{res.status(404).json({error: error});});
};

exports.modifyPost = (req, res, next) =>
{
  const postObject = req.file ?
  {
    title: req.body.title,
    text:req.body.text,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
 
  } : {
    title: req.body.title,
    text:req.body.text,
  }
    Post.findOne({ _id: req.params.id })
    .then((post) => {
    if ((req.auth.isAdmin!=true)&&(post.userId != req.auth.userId)) {
        res.status(401).json({ message: 'Not authorized' });
    } else {
         post.updateOne( { ...postObject, _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet modifié!' }))
          .catch(error => res.status(401).json({ error }));
    }
    })
    .catch((error) => {res.status(400).json({ error });});
};

exports.deletePost = (req, res, next) => 
{
  Post.findOne({ _id: req.params.id })
  .then(post => {
  if ((req.auth.isAdmin!=true)&&(post.userId != req.auth.userId)) {
   res.status(401).json({ message: 'Not authorized' });
  }
  else {
   const filename = post.imageUrl.split('/images/')[1];
   fs.unlink(`images/${filename}`, () => 
        {
         Post.deleteOne({ _id: req.params.id })
        .then(() => { res.status(200).json({ message: 'Objet supprimé !' }) })
        .catch(error => res.status(401).json({ error }));
        });
       }
              })
  .catch(error => { res.status(500).json({ error });});
};

exports.getAllPost = (req, res, next) => 
{
  Post.find().sort({date:-1}).then(
  (post) => {res.status(200).json(post);})
  .catch((error) => {res.status(400).json({error: error});});
};




exports.modifyLikes = (req, res, next) => 
{
  const likeObject = { ...req.body }
  likeObject.userId=req.auth.userId
  Post.findOne({ _id: req.params.id })
  .then((post) => 
  {
   const postObject = post;
  if (likeObject.like == 1)
   {
    var indexLikes = postObject.usersLiked.indexOf(likeObject.userId);
    var indexDislikes = postObject.usersDisliked.indexOf(likeObject.userId);
    if (indexDislikes != -1) 
     {
      postObject.usersDisliked.splice(indexDislikes, 1);
      postObject.dislikes = postObject.usersDisliked.length
     }
    if (indexLikes != -1) 
     {
      postObject.usersLiked.splice(indexLikes, 1);
     }
      postObject.usersLiked.push(likeObject.userId)
      postObject.likes = postObject.usersLiked.length

   } else {
    var indexLikes = postObject.usersLiked.indexOf(likeObject.userId);
    var indexDislikes = postObject.usersDisliked.indexOf(likeObject.userId);
     if (indexLikes != -1) 
      {
      postObject.usersLiked.splice(indexLikes, 1);
      postObject.likes =postObject.usersLiked.length
      }
     if (indexDislikes != -1) 
      {
      postObject.usersDisliked.splice(indexDislikes, 1);
      }
      postObject.usersDisliked.push(likeObject.userId)
      postObject.dislikes = postObject.usersDisliked.length
   }

   const champUpdate =
   {
   likes:postObject.likes,
   dislikes:postObject.dislikes,
   usersLiked:postObject.usersLiked,
   usersDisliked:postObject.usersDisliked,
   }

    Post.updateOne({ _id: req.params.id},{ ...champUpdate })
    .then(() => res.status(200).json({ message: 'like mis à jour' }))
    .catch(error => res.status(401).json({ error }));
  })

    .catch((error) => {res.status(400).json({error });});
}