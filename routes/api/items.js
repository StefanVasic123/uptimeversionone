const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Item Model (to find, save)
const Item = require('../../models/Item');

// @route   GET api/items

// @desc    Get All Items

// @access  Public

// it represent api/items (because we are in router)
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
}); 

// @route   POST api/items

// @desc    Create A Item
 //   const data = require('../../../mernapppractice/client/src/App').lsData;
// @access  Public
//prazno je jer je inside items call-a iz axios-a (localhost:5000/api/items)
router.post('/', auth, (req, res) => {
    const newItem = new Item({
     name: req.body.name,
     items: req.body.items
    });

    newItem.save().then(item => res.json(item))
}); 

// @route   DELETE api/items

// @desc    Delete A Item

// @access  Public

router.delete('/:id', auth, (req, res) => {
    Item.findById(req.params.id) 
        .then(item => item.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
})

// @route UPDATE api-items

// @desc UPDATE A Item

// @access Public

router.post('/update', (req, res) => {
  Item.findOneAndUpdate({ name: "track" },
    { $set: {
      items: req.body.items
    }}, (err, result) => {
      if(err) return res.send(err)
      res.send(result)
    })
})
/*router.put("/:id", (req, res) => {
  Item.findById(req.params.id)
}) */
/*router.post("/update", (req, res) => {
  Item.findOneAndUpdate(
    { name: req.body.name },
    { $set: {items: req.body.items} },
    { new: true },
    
  )
}) */

/*router.post("/", (req, res) => {
  let query = {
    name: req.params.name
  }
  let update = {
    name: req.body.name
  }
  let options = {
    new: true
  }
  Item.findOneAndUpdate(query, update, options, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
}); */

  /*  Item.findByIdAndUpdate(req.params.id, { $set: req.body })
        .then(item => {
            console.log(res.send(item));
            console.log(res);
            console.log(item);
        }) */
//})
/* router.get('/:id', (req, res) => {
  Item.findById(req.params.id) // <== Specify your id here
  .then((res) => {
    console.log(res)
  });
}); */
/* router.put('/', (req, res) => {
  const filter = {
    name: req.body.name
  }
  const update = {
    value: req.body.value
  };
  Item.findOneAndUpdate(filter, update, { new: true })
      .then(item => res.json(item))
      .catch(err => res.status(404).json({success: false}));
}) */
/* router.route("/update").post(function(req, res) {
  kennels.findByIdAndUpdate(
    { _id: "5db6b26730f133b65dbbe459" },
    { breed: "Great Dane" },
    function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
}); */

module.exports = router;