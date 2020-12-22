const filename = '../data/post.json'
let posts = require(filename)
const helper = require('../helper/helper.js')
function getPosts() {}
function getPost(id) { }
function insertPost(newPost) { }
function updatePost(id, newPost) { }
function deletePost(id) { }
module.exports = {
    insertPost,
    getPosts,
    getPost,
    updatePost,
    deletePost
}
// getposts method 
function getPosts() {
    return new Promise((resolve, reject) => {
        if (posts.length === 0) {
            reject({
                message: 'no posts available',
                status: 202
            })
        }
        resolve(posts)
    })
}
//getpost
function getPost(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(posts, id)
            .then(post => resolve(post))
            .catch(err => reject(err))
    })
}
//insertpost
function insertPost(newPost) {
    return new Promise((resolve, reject) => {
        const id = { id: helper.getNewId(posts) }
        const date = { 
            createdAt: helper.newDate(),
            updatedAt: helper.newDate()
        } 
        newPost = { ...id, ...date, ...newPost }
        posts.push(newPost)
        helper.wri
        teJSONFile(filename, posts)
        resolve(newPost)
    })
}
//update post
function updatePost(id, newPost) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(posts, id)
        .then(post => {
            const index = posts.findIndex(p => p.id == post.id)
            id = { id: post.id }
            const date = {
                createdAt: post.createdAt,
                updatedAt: helper.newDate()
            } 
            posts[index] = { ...id, ...date, ...newPost }
            helper.writeJSONFile(filename, posts)
            resolve(posts[index])
        })
        .catch(err => reject(err))
    })
}
//delete post
function deletePost(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(posts, id)
        .then(() => {
            posts = posts.filter(p => p.id !== id)
            helper.writeJSONFile(filename, posts)
            resolve()
        })
        .catch(err => reject(err))
    })
}