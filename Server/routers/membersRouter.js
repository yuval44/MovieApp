const router = require('express').Router()
const memberBLL = require('../BLL/membersBLL')
const subscriptionBLL = require('../BLL/subscriptionBLL');


// - GET all members
router.get('/', async (req, res) => {
    const members = await memberBLL.getAllMembers()
    res.status(200).json(members)
})

// - GET one member
router.get('/:id', async (req, res) => {
    const member = await memberBLL.getMemberById(req.params.id)
    res.status(200).json(member)
})

// - POST new member
router.post('/', async (req, res) => {
    // - check if member has last name, if not, add ' -'
    if (!req.body.fullname.split(' ')[1]) {
        req.body.fullname = `${req.body.fullname} -`
    }

    const member = await memberBLL.addMember(req.body)
    res.status(201).json(member)
})

// - PUT update member
router.put('/:id', async (req, res) => {
    const member = await memberBLL.updateMember(req.params.id, req.body)
    res.status(200).json(member)
})

// - DELETE delete member
router.delete('/:id', async (req, res) => {
    const subscriptionDeleted = await subscriptionBLL.deleteAllSubscriptionsByMemberId(req.params.id)
    const member = await memberBLL.deleteMember(req.params.id)
    res.status(200).json(member)
})



module.exports = router