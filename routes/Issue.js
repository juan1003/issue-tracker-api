const express = require("express")
const router = express.Router()
const models = require("../models")
const jwt = require("jsonwebtoken")

router.get('/', async (req, res) => {
    try {
        const {token} = req.headers

        await jwt.verify(token, process.env.SECRET, {algorithms: 'HS256'})

        let allIssues = []
        const issues = await models.Issue.findAll({
            include: [{
                model: models.UserIssue,
                required: true,
                include: [{
                    model: models.User,
                    required: true
                },{
                    model: models.UserIssueComment,
                    required: false,
                    include: [{
                        model: models.User,
                        required: true
                    },{
                        model: models.Comment,
                        required: true
                    }]
                }]
            }]
        })

        for(item of issues) {
            const issue = {
                title: item.title,
                description: item.description,
                full_name: item.UserIssue.User.firstName + " " + item.UserIssue.User.lastName,
                username: item.UserIssue.User.username,
                comments: []
            }

            for(item of item.UserIssue.UserIssueComments) {
                const comment = {
                    full_name: item.User.firstName + " " + item.User.lastName,
                    username: item.User.username,
                    message: item.Comment.message
                }

                issue.comments.push(comment)
            }

            allIssues.push(issue)
        }

        res.status(200).send(allIssues)
    
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

router.post('/create', async (req, res) => {
    try {
        const {token} = req.headers
        const {user_id, title, description} = req.body

        await jwt.verify(token, process.env.SECRET, {algorithms: 'HS256'})

        const newIssue = await models.Issue.create({title, description})
        await newIssue.save()

        const newUserIssue = await models.UserIssue.create({ user_id, issue_id: newIssue.id })
        await newUserIssue.save()

        res.status(201).send({ 
            message: "Issue has been created", 
            issue: newIssue,
            userIssue: newUserIssue
        })

    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

router.post('/:id/comment', async (req, res) => {
    try {
        const {token} = req.headers
        const {id} = req.params
        const {user_id, user_issue_id, message} = req.body

        await jwt.verify(token, process.env.SECRET, {algorithms: 'HS256'})

        const newComment = await models.Comment.create({ message })
        await newComment.save()

        const newUserIssueComment = await models.UserIssueComment.create({ user_id, user_issue_id, issue_id: id, comment_id: newComment.id })
        await newUserIssueComment.save()

        res.status(201).send({ 
            message: "Comment has been posted",
            comment: newComment,
            userIssueComment: newUserIssueComment
        })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

module.exports = router