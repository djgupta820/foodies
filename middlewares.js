module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash('error', 'Access Denied... Please login to continue!')
        return res.redirect('/login')
    }
    next()
}