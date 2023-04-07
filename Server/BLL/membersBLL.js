const membersModel = require('../models/membersModel');

// - Get all members
const getAllMembers = async () => {
    const members = await membersModel.find({})
    return members
}

// - Get member by id
const getMemberById = async (id) => {
    const member = await membersModel.findById(id)
    return member
}

// - Add member
const addMember = async (member) => {
    const newMember = await membersModel.create(member)
    return newMember
}

// - Update member
const updateMember = async (id, member) => {
    const updatedMember = await membersModel.findByIdAndUpdate(id, member)
    return updatedMember
}

// - Delete member
const deleteMember = async (id) => {
    const deletedMember = await membersModel.findByIdAndDelete(id)
    return deletedMember
}


module.exports = {
    getAllMembers,
    getMemberById,
    addMember,
    updateMember,
    deleteMember
}