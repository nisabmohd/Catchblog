function handleErr(res, err) {
    res.status(err.code).send({
        message: err.message
    })
}
function createErr(code, message) {
    const err = new Error(message)
    err.code = code
    return err
}

module.exports = { handleErr, createErr }