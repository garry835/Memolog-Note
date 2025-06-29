import Notes from '../models/Notes.js';
import mongoose from "mongoose";

/*
 GET /
  Dashboard
*/
export const dashboard = async (req,res) => {
    //paging
    let perPage = 12;
    let page = req.query.page || 1;
    
    const locals = {
        userName: req.user.firstName,
        title: "Dashboard",
        description: "Free NodeJS Notes App",
    }
        
    try {
            // Mongoose "^7.0.0 Update
            const notes = await Notes.aggregate([
              { $sort: { updatedAt: -1 } },
              { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
              {
                $project: {
                  title: { $substr: ["$title", 0, 30] },
                  body: { $substr: ["$body", 0, 100] },
                },
              },
            ])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec();
        
            const count = await Notes.countDocuments();
        
            res.render('dashboard/index', {
              locals,
              notes,
              layout: "../views/layouts/dashboard",
              current: page,
              pages: Math.ceil(count / perPage)
        });
    } catch (error) {
        console.log(error);
    }
}


/* GET /
 SPECIFIC NOTE
*/

export const dashboardViewNote = async(req,res) => {
  const note = await Notes.findById({ _id: req.params.id })
  .where({ user:req.user.id }).lean();

  if(note){
    res.render('dashboard/view-notes', {
      noteID: req.params.id,
      note,
      layout: '../views/layouts/dashboard'
    });
  } else {
    res.send("Something went wrong");
  }
}

/*
   PUT /
   Update specific note
*/

export const dashboardUpdateNote = async(req,res) => {
  try{
     
    await Notes.findOneAndUpdate(
      { _id: req.params.id },
      {title: req.body.title, body: req.body.body, updatedAt: Date.now()}
    ).where({ user: req.user.id });
    res.redirect('/dashboard');
  } catch(error) {
    console.log(error);
  }
}

/*
  DELETE /
  Delete specific note
*/

export const dashboardDeleteNote = async(req,res) => {
  try{

    await Notes.deleteOne({_id: req.params.id}).where({user: req.user.id});
    res.redirect('/dashboard');
  } catch(error) {
    console.log(error);
  }
}

/*
  GET /
  Add Notes
*/

export const dashboardAddNote = async(req,res) => {
  res.render('dashboard/add', {
    layout: '../views/layouts/dashboard'
  });
}

export const dashboardAddNoteSubmit = async(req,res) => {
  try{
    console.log(req.user.id);
    req.body.user = req.user.id;
    await Notes.create(req.body);
    console.log("New note added");
    res.redirect('/dashboard');
  } catch(error) {
    console.log(error);
  }
}

/* 
  GET 
  Search 
*/

export const dashboardSearch = async(req,res)=>{
  try{
    res.render('dashboard/search', {
      searchResults: '',
      layout: '../views/layouts/dashboard'
    })
  } catch (error) {
    console.log(error);
  }
}

/*
   POST /
   Search for notes
*/

export const dashboardSearchSubmit = async(req,res) => {
  try{
      let searchTerm = req.body.searchItem;
      const searchNoSpecialChars = searchTerm.replace(/[^a-zA-z0-9]/g,"");

      const searchResults = await Notes.find({
        $or: [
          {title: { $regex: new RegExp(searchNoSpecialChars, 'i') }},
          {body: { $regex: new RegExp(searchNoSpecialChars, 'i') }}
        ]
      }).where( {user: req.user.id });

      res.render('dashboard/search', {
        searchResults,
        layout: '../views/layouts/dashboard'
      })
  } catch (error){
    console.log(error);
  }
}
