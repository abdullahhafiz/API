const express = require('express')
const router = express.Router()
const post = require('../models/post.model')
const m = require('../helper/middleware')

const filename = 'C:\\Users\\Dell\\Desktop\\API\\data\\post.json'
let posts = require(filename)


module.exports = router
//allposts 
router.get('/', async (req, res) => {
    await post.getPosts()
        .then(posts => res.json(posts))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            } else {
                res.status(500).json({ message: err.message })
            }
        })
})
//post by id 
router.get('/tags/:name', m.mustBeString, async (req, res) => {
    var response=Array()
    const name = req.params.name
    console.log("Name to search is "+name);
    for (let i = 0; i < posts.length; i++) {
        for (let j = 0; j < posts[i].tags.length; j++) {
            const element = posts[i].tags[j];
            if(element==name){
                console.log(element+" found in id= "+posts[i].id);
                response.push(posts[i]);
            }   
        }
        
    }
    res.json(response)
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })})
/* Insert a new post */
router.post('/', m.checkFieldsPost, async (req, res) => {
    await post.insertPost(req.body)
        .then(post => res.status(201).json({
            message: `The post #${post.id} has been created`,
            content: post
        }))
        .catch(err => res.status(500).json({ message: err.message }))
})
/* Update a post */
router.put('/:id', m.mustBeInteger, m.checkFieldsPost, async (req, res) => {
    const id = req.params.id
    await post.updatePost(id, req.body)
        .then(post => res.json({
            message: `The post #${id} has been updated`,
            content: post
        }))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            }
            res.status(500).json({ message: err.message })
        })
})
/* Delete a post */
router.delete('/:id', m.mustBeInteger, async (req, res) => {
    const id = req.params.id

    await post.deletePost(id)
        .then(post => res.json({
            message: `The post #${id} has been deleted`
        }))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            }
            res.status(500).json({ message: err.message })
        })
})