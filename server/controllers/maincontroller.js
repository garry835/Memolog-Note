/* GET /
   Homepage
 */

export const homepage = async(req,res) => {
    const locals = {
        title: "MemoLog",
        description: "A Note Making App",
    }

    res.render('index', {
        locals,
        layout: '../views/layouts/front-page'
});
};



export const about = async (req, res) => {
    const locals = {
      title: "About - NodeJs Notes",
      description: "Free NodeJS Notes App.",
    }
    res.render('about', locals);
}
