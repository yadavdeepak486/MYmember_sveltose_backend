var testFee = require('../models/TestingFees')
const cloudenary = require("cloudinary").v2

exports.create = (req, res) => {
    var test_fees = req.body;
    console.log(req.file, "&&&&&&&&&&&&&&&&&&&&&&&&&")
    console.log(test_fees);
    var memberObj = new testFee(test_fees);
    memberObj.save(function (err, data) {
        if (data) {
            if(req.file){
            cloudenary.config({
                cloud_name: process.env.cloud_name,
                api_key: process.env.cloud_api_key,
                api_secret: process.env.cloud_api_secret
            });
            const path = req.file.path
            const uniqueFilename = new Date().toISOString()
            cloudenary.uploader.upload(
                path,
                { public_id: `test_fee/${uniqueFilename}`, tags: `test_fee` }, // directory and tags are optional
                function (err, image) {
                    if (err) return res.send(err)
                    console.log('file uploaded to Cloudinary')
                    const fs = require('fs')
                    fs.unlinkSync(path)
                    testFee.findByIdAndUpdate(data._id, { $set: { image: image.url } })
                        .then((response) => {
                            console.log(response)
                            res.send('test fee is add with image')
                        });
                }
            );
            }else{
                res.send('test fee is add')
            }
        }
        else {
            console.log(err)
            res.send('test fee is not add')
        }
    })

}

exports.read = (req, res) => {
    testFee.find().exec((err, data) => {
        if (err) {
            res.send({ error: 'test fee list is not found' })
        }
        else {
            if (data.length > 0) {
                res.send(data)
            }
            else {
                res.send({ msg: 'test fee list is empty' })
            }

        }
    })

}

exports.fee_info = (req, res) => {
    console.log('id', req.params)
    var testID = req.params.feeId;
    testFee.findById(testID).exec((err, data) => {
        if (err) {
            res.send({ error: 'testID is not found' })
        }
        else {
            res.send(data)
        }
    })
}

exports.deletetestfee = (req, res) => {
    console.log('id', req.params)
    var testID = req.params.feeId;
    testFee.findByIdAndDelete(testID).exec((err, data) => {
        if (err) {
            res.send({ error: 'test is not delete' })
        }
        else {
            res.send({ msg: 'test is delete' })
        }
    })
};

exports.updatetestFee = (req, res) => {
    console.log('id', req.params.feeId)
    var memberID = req.params.feeId;
    var data = req.body
    console.log(data);
    testFee.updateOne({ _id: memberID }, data).
        then((datas) => {
            if (req.file) {
                console.log(req.file)
                cloudenary.config({
                    cloud_name: process.env.cloud_name,
                    api_key: process.env.cloud_api_key,
                    api_secret: process.env.cloud_api_secret
                });
                const path = req.file.path
                const uniqueFilename = new Date().toISOString()
                cloudenary.uploader.upload(
                    path,
                    { public_id: `test_fee/${uniqueFilename}`, tags: `test_fee` }, // directory and tags are optional
                    function (err, image) {
                        if (err) return res.send(err)
                        console.log('file uploaded to Cloudinary')
                        const fs = require('fs')
                        fs.unlinkSync(path)
                        testFee.updateOne({_id:memberID}, { $set: { image: image.url } })
                            .then((response) => {
                                console.log(response)
                                res.send('file and all data updated')
                            });
                    }
                );
            } else {
                res.send({ data: datas, msg: 'test fees is update' })
            }

        }).catch((err) => {
            console.log(err)
            res.send(err)
        })
}
