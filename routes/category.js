let categoryModel = require('../schema/categorySchema');
const express = require("express");
const router = express.Router();


router.post("/add", (req, res) => {
    let dataToSave = categoryModel({ ...req.body })
    dataToSave.save(function (err, record) {
        if (err) {
            return res.status(406).send({ success: false, msg: 'Failed to save kindly provide all fields' })
        }
        else {
            var objId = record._id.toString()
            var categoryId = objId.slice(objId.length - 5)
            categoryModel.findByIdAndUpdate({ _id: record._id }, { $set: { categoryId: categoryId } }, function (err, doc) {
                if (err) {
                    return res.status(406).send({ success: false, msg: 'Failed to save' })
                }
                else {
                    res.json({ success: true, msg: "successfully saved", data: doc })
                }
            })
        }
    })

})

router.get("/getAll", (req, res) => {
    categoryModel.find({}, function (err, data) {
        if (err) throw err;
        if (!data) {
            res.status(403).send({ success: false, msg: 'No record found' });
        } else {
            res.json({ success: true, data: data });
        }
    })

})


router.get("/getByCategoryName", (req, res) => {
    var category_name = req.params.category_name
    if (!category_name) {
        res.status(400).send({ success: false, msg: 'Provide created by id' });
    }
    categoryModel.find({ category_name: category_name }, function (err, data) {
        if (err) throw err;
        if (!data) {
            res.status(403).send({ success: false, msg: 'No record found' });
        } else {
            res.json({ success: true, data: data });
        }
    })

})

router.post("deleteByCategoryId", (req, res) => {
    var categoryId = req.params.categoryId
    if (!categoryId) {
        res.status(400).send({ success: false, msg: 'Provide created by id' });
    }
    categoryModel.findOneAndDelete({ categoryId: categoryId }, function (err, data) {
        if (err) throw err;
        if (!data) {
            res.status(403).send({ success: false, msg: 'No record found' });
        } else {
            res.json({ success: true, data: data });
        }
    })

})
router.post("/updateByCategoryId", (req, res) => {
    var categoryId = req.body.categoryId
    if (!categoryId) {
        res.status(400).send({ success: false, msg: 'Provide created by id' });
    }
    categoryModel.findOneAndUpdate({ categoryId: categoryId }, req.body, function (err, data) {
        if (err) throw err;
        if (!data) {
            res.status(403).send({ success: false, msg: 'No record found' });
        } else {
            res.json({ success: true, data: data });
        }
    })

})

module.exports = router
