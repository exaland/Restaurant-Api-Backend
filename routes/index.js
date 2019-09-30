var API_KEY = 1234

var express = require('express')
var router = express.Router()
var moment = require('moment')

//GET 
router.get('/', function(req,res,next) {
    res.send('Hello World on my Restaurant')
})

//==============================================================
// USER TABLE
// GET / POST
//==============================================================

router.get('/user', function(req,res,next) {
    if (req.query.key == API_KEY) {

        var fbid = req.query.fbid
        
        if (fbid != null) {
        
            req.getConnection(function(error,conn) {
              conn.query('SELECT userPhone,name,address,fbid FROM user WHERE fbid=?', [fbid],function(err,rows,fields) {

                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({success: false, message: err.message}))
                    } else {
                        if (rows.length > 0 ) {
                            res.send(JSON.stringify({ success: true, result:rows}))
                        } else{
                            res.send(JSON.stringify({success: false, message: "Empty"}))
                        }
                    }

              })
            })

        } else {
            res.send(JSON.stringify({success: false, message: "Missing fbid in the query"}))
        }

    } else {
        res.send(JSON.stringify({success: false, message: "Wrong Api Key"}))
    }
})

router.post('/user', function(req,res,next) {
    if (req.body.key == API_KEY) {

        var fbid = req.body.fbid
        var user_phone = req.body.userPhone
        var user_name = req.body.userName 
        var user_address = req.body.userAddress 

        if (fbid != null) {
        
            req.getConnection(function(error,conn) {
              conn.query('INSERT INTO user(FBID,UserPhone,Name,Address) VALUES(?,?,?,?) ON DUPLICATE KEY UPDATE Name=?,Address=?', [fbid,user_phone,user_name,user_address,user_name,user_address],function(err,rows,fields) {

                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({success: false, message: err.message}))
                    } else {
                        if (rows.affectedRows > 0 ) {
                            res.send(JSON.stringify({ success: true, message:"Success added User"}))
                        } 
                    
                    }

              })
            })

        } else {
            res.send(JSON.stringify({success: false, message: "Missing fbid in the query"}))
        }

    } else {
        res.send(JSON.stringify({success: false, message: "Wrong Api Key"}))
    }
})

//==============================================================
// FAVORITE TABLE
// GET / POST / DELETE
//==============================================================

router.get('/favorite', function(req,res,next) {
    if (req.query.key == API_KEY) {

        var fbid = req.query.fbid
        
        if (fbid != null) {
        
            req.getConnection(function(error,conn) {
              conn.query('SELECT fbid,foodId,restaurantId,restaurantName,foodName,foodImage,price FROM favorite WHERE fbid=?', [fbid],function(err,rows,fields) {

                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({success: false, message: err.message}))
                    } else {
                        if (rows.length > 0 ) {
                            res.send(JSON.stringify({ success: true, result:rows}))
                        } else{
                            res.send(JSON.stringify({success: false, message: "Empty"}))
                        }
                    }

              })
            })

        } else {
            res.send(JSON.stringify({success: false, message: "Missing fbid in the query"}))
        }

    } else {
        res.send(JSON.stringify({success: false, message: "Wrong Api Key"}))
    }
})

router.get('/favoriteByRestaurant', function(req,res,next) {
    if (req.query.key == API_KEY) {

        var fbid = req.query.fbid
        var restaurant_id = req.query.restaurantId

        
        if (fbid != null) {
        
            req.getConnection(function(error,conn) {
              conn.query('SELECT fbid,foodId,restaurantId,restaurantName,foodName,foodImage,price FROM favorite WHERE fbid=? AND RestaurantId=?', [fbid,restaurant_id],function(err,rows,fields) {

                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({success: false, message: err.message}))
                    } else {
                        if (rows.length > 0 ) {
                            res.send(JSON.stringify({ success: true, result:rows}))
                        } else{
                            res.send(JSON.stringify({success: false, message: "Empty"}))
                        }
                    }

              })
            })

        } else {
            res.send(JSON.stringify({success: false, message: "Missing fbid in the query"}))
        }

    } else {
        res.send(JSON.stringify({success: false, message: "Wrong Api Key"}))
    }
})


router.post('/favorite', function(req,res,next) {
    if (req.body.key == API_KEY) {

        var fbid = req.body.fbid
        var food_id = req.body.foodId
        var restaurant_id = req.body.restaurantId
        var restaurant_name = req.body.restaurantName
        var food_name = req.body.foodName
        var food_image = req.body.foodImage
        var food_price = req.body.price


        if (fbid != null) {
        
            req.getConnection(function(error,conn) {
              conn.query('INSERT INTO favorite(FBID,FoodId,RestaurantId,RestaurantName,FoodName,FoodImage,Price) VALUES(?,?,?,?,?,?,?)', [fbid,food_id,restaurant_id,restaurant_name,food_name,food_image,food_price],function(err,rows,fields) {

                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({success: false, message: err.message}))
                    } else {
                        if (rows.affectedRows > 0 ) {
                            res.send(JSON.stringify({ success: true, message:"Success added Favorites"}))
                        } 
                    
                    }

              })
            })

        } else {
            res.send(JSON.stringify({success: false, message: "Missing fbid in the query"}))
        }

    } else {
        res.send(JSON.stringify({success: false, message: "Wrong Api Key"}))
    }
})

router.delete('/favorite', function(req,res,next) {
    if (req.query.key == API_KEY) {

        var fbid = req.query.fbid
        var food_id = req.query.foodId
        var restaurant_id = req.query.restaurantId

        
        if (fbid != null) {
        
            req.getConnection(function(error,conn) {
              conn.query('DELETE FROM favorite WHERE FBID=? AND FoodId=? AND RestaurantId=?', [fbid,food_id,restaurant_id],function(err,rows,fields) {

                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({success: false, message: err.message}))
                    } else {
                        if (rows.affectedRows > 0 ) {
                            res.send(JSON.stringify({ success: true, message: "Success Deleted Favorites"}))
                        } 
                    }

              })
            })

        } else {
            res.send(JSON.stringify({success: false, message: "Missing fbid in the query"}))
        }

    } else {
        res.send(JSON.stringify({success: false, message: "Wrong Api Key"}))
    }
})

//==============================================================
// RESTAURANT TABLE
// GET 
//==============================================================

router.get('/restaurant', function(req,res,next) {
    if (req.query.key == API_KEY) {

            req.getConnection(function(error,conn) {
              conn.query('SELECT id,name,address,phone,lat,lng,userOwner,image,paymentUrl FROM restaurant',function(err,rows,fields) {

                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({success: false, message: err.message}))
                    } else {
                        if (rows.length > 0 ) {
                            res.send(JSON.stringify({ success: true, result:rows}))
                        } else{
                            res.send(JSON.stringify({success: false, message: "Empty"}))
                        }
                    }

              })
            })

    } else {
        res.send(JSON.stringify({success: false, message: "Wrong Api Key"}))
    }
})

router.get('/restaurantById', function(req,res,next) {
    if (req.query.key == API_KEY) {


            req.getConnection(function(error,conn) {
            var restaurant_id = req.query.restaurantId
            
            if (restaurant_id != null) {
              conn.query('SELECT id,name,address,phone,lat,lng,userOwner,image,paymentUrl FROM restaurant WHERE id=?',[restaurant_id],function(err,rows,fields) {

                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({success: false, message: err.message}))
                    } else {
                        if (rows.length > 0 ) {
                            res.send(JSON.stringify({ success: true, result:rows}))
                        } else{
                            res.send(JSON.stringify({success: false, message: "Empty"}))
                        }
                    }

              })
            } else {
                res.send(JSON.stringify({success: false, message: "Missing Restaurant Id"}))
            }
            })

    } else {
        res.send(JSON.stringify({success: false, message: "Wrong Api Key"}))
    }
})

router.get('/nearbyrestaurant', function(req,res,next) {
    if (req.query.key == API_KEY) {

            req.getConnection(function(error,conn) {
                
            var user_lat = parseFloat(req.query.lat)
            var user_lng = parseFloat(req.query.lng)
            var distance = parseFloat(req.query.distance)

            if (user_lat != Number.NaN && user_lng != Number.NaN) {

              conn.query('SELECT * FROM (SELECT id,name,address,phone,lat,lng,userOwner,image,paymentUrl,'
              +'ROUND(111.045 * DEGREES(ACOS(COS(RADIANS(?)) * COS(RADIANS(lat))'
              +'* COS(RADIANS(lng) - RADIANS(?)) + SIN(RADIANS(?))'
              +'* SIN(RADIANS(lat)))),2) AS distance_in_km FROM restaurant)tempTable WHERE distance_in_km  < ?',[user_lat,user_lng,user_lat,distance],function(err,rows,fields) {

                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({success: false, message: err.message}))
                    } else {
                        if (rows.length > 0 ) {
                            res.send(JSON.stringify({ success: true, result:rows}))
                        } else{
                            res.send(JSON.stringify({success: false, message: "Empty"}))
                        }
                    }

              })
            }
            else {
                res.send(JSON.stringify({success: false, message: "Missing Lat and Lng in Query"}))
            }
            })

    } else {
        res.send(JSON.stringify({success: false, message: "Wrong Api Key"}))
    }
})

//==============================================================
// MENU TABLE
// GET 
//==============================================================

router.get('/menu', function(req,res,next) {
    if (req.query.key == API_KEY) {


            req.getConnection(function(error,conn) {
            var restaurant_id = req.query.restaurantId
            
            if (restaurant_id != null) {
              conn.query('SELECT id,name,description,image FROM menu WHERE id in (SELECT menuId FROM restaurant_menu WHERE restaurantId=?)',[restaurant_id],function(err,rows,fields) {

                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({success: false, message: err.message}))
                    } else {
                        if (rows.length > 0 ) {
                            res.send(JSON.stringify({ success: true, result:rows}))
                        } else{
                            res.send(JSON.stringify({success: false, message: "Empty"}))
                        }
                    }

              })
            } else {
                res.send(JSON.stringify({success: false, message: "Missing Restaurant Id"}))
            }
            })

    } else {
        res.send(JSON.stringify({success: false, message: "Wrong Api Key"}))
    }
})

//==============================================================
// FOOD TABLE
// GET 
//==============================================================

router.get('/food', function(req,res,next) {
    if (req.query.key == API_KEY) {


            req.getConnection(function(error,conn) {
            var menu_id = req.query.menuId
            
            if (menu_id != null) {
              conn.query('SELECT id,name,description,image,price,CASE WHEN isSize=1 THEN \'TRUE\' ELSE \'FALSE\' END as isSize,'
              + 'CASE WHEN isAddon=1 THEN \'TRUE\' ELSE \'FALSE\' END as isAddon,'
              +'discount FROM food WHERE id in (SELECT foodId FROM menu_food WHERE menuId=?)',[menu_id],function(err,rows,fields) {

                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({success: false, message: err.message}))
                    } else {
                        if (rows.length > 0 ) {
                            res.send(JSON.stringify({ success: true, result:rows}))
                        } else{
                            res.send(JSON.stringify({success: false, message: "Empty"}))
                        }
                    }

              })
            } else {
                res.send(JSON.stringify({success: false, message: "Missing Menu Id"}))
            }
            })

    } else {
        res.send(JSON.stringify({success: false, message: "Wrong Api Key"}))
    }
})

router.get('/foodById', function(req,res,next) {
    if (req.query.key == API_KEY) {


            req.getConnection(function(error,conn) {
            var food_id = req.query.foodId
            
            if (food_id != null) {
              conn.query('SELECT id,name,description,image,price,CASE WHEN isSize=1 THEN \'TRUE\' ELSE \'FALSE\' END as isSize,'
              + 'CASE WHEN isAddon=1 THEN \'TRUE\' ELSE \'FALSE\' END as isAddon,'
              +'discount FROM food WHERE id =?',[food_id],function(err,rows,fields) {

                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({success: false, message: err.message}))
                    } else {
                        if (rows.length > 0 ) {
                            res.send(JSON.stringify({ success: true, result:rows}))
                        } else{
                            res.send(JSON.stringify({success: false, message: "Empty"}))
                        }
                    }

              })
            } else {
                res.send(JSON.stringify({success: false, message: "Missing Food Id"}))
            }
            })

    } else {
        res.send(JSON.stringify({success: false, message: "Wrong Api Key"}))
    }
})

router.get('/searchfood', function(req,res,next) {
    if (req.query.key == API_KEY) {


            req.getConnection(function(error,conn) {
            var search_query = '%' + req.query.foodName+'%'
            
            if (search_query != null) {
              conn.query('SELECT id,name,description,image,price,CASE WHEN isSize=1 THEN \'TRUE\' ELSE \'FALSE\' END as isSize,'
              + 'CASE WHEN isAddon=1 THEN \'TRUE\' ELSE \'FALSE\' END as isAddon,'
              +'discount FROM food WHERE name LIKE ?',[search_query],function(err,rows,fields) {

                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({success: false, message: err.message}))
                    } else {
                        if (rows.length > 0 ) {
                            res.send(JSON.stringify({ success: true, result:rows}))
                        } else{
                            res.send(JSON.stringify({success: false, message: "Empty"}))
                        }
                    }

              })
            } else {
                res.send(JSON.stringify({success: false, message: "Missing Food Name"}))
            }
            })

    } else {
        res.send(JSON.stringify({success: false, message: "Wrong Api Key"}))
    }
})


//==============================================================
// SIZE TABLE
// GET 
//==============================================================

router.get('/size', function(req,res,next) {
    if (req.query.key == API_KEY) {


            req.getConnection(function(error,conn) {
            var food_id = req.query.foodId
            
            if (food_id != null) {
              conn.query('SELECT id,description,extraPrice FROM size WHERE id in (SELECT sizeId FROM food_size WHERE foodId=?)',[food_id],function(err,rows,fields) {

                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({success: false, message: err.message}))
                    } else {
                        if (rows.length > 0 ) {
                            res.send(JSON.stringify({ success: true, result:rows}))
                        } else{
                            res.send(JSON.stringify({success: false, message: "Empty"}))
                        }
                    }

              })
            } else {
                res.send(JSON.stringify({success: false, message: "Missing Food Id"}))
            }
            })

    } else {
        res.send(JSON.stringify({success: false, message: "Wrong Api Key"}))
    }
})


//==============================================================
// ADDON TABLE
// GET 
//==============================================================

router.get('/addon', function(req,res,next) {
    if (req.query.key == API_KEY) {


            req.getConnection(function(error,conn) {
            var food_id = req.query.foodId
            
            if (food_id != null) {
              conn.query('SELECT id,description,extraPrice FROM addon WHERE id in (SELECT addonId FROM food_addon WHERE foodId=?)',[food_id],function(err,rows,fields) {

                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({success: false, message: err.message}))
                    } else {
                        if (rows.length > 0 ) {
                            res.send(JSON.stringify({ success: true, result:rows}))
                        } else{
                            res.send(JSON.stringify({success: false, message: "Empty"}))
                        }
                    }

              })
            } else {
                res.send(JSON.stringify({success: false, message: "Missing Food Id"}))
            }
            })

    } else {
        res.send(JSON.stringify({success: false, message: "Wrong Api Key"}))
    }
})

//==============================================================
// ORDER TABLE
// GET / POST
//==============================================================

router.get('/order', function(req,res,next) {
    if (req.query.key == API_KEY) {


            req.getConnection(function(error,conn) {
            var order_fbid = req.query.orderFBID
            
            if (order_fbid != null) {
              conn.query('SELECT orderId,orderFBID,orderPhone,orderName,orderAddress,orderStatus,orderDate,'
              + 'restaurantId,transactionId,'
              + 'CASE WHEN cod=1 THEN \'TRUE\' ELSE \'FALSE\' END as cod,'
              + 'totalPrice, numOfitem FROM `order` WHERE orderFBID=? AND numOfItem > 0 '
              + ' ORDER BY orderId DESC',[order_fbid],function(err,rows,fields) {

                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({success: false, message: err.message}))
                    } else {
                        if (rows.length > 0 ) {
                            res.send(JSON.stringify({ success: true, result:rows}))
                        } else{
                            res.send(JSON.stringify({success: false, message: "Empty"}))
                        }
                    }

              })
            } else {
                res.send(JSON.stringify({success: false, message: "Missing Order FBID"}))
            }
            })

    } else {
        res.send(JSON.stringify({success: false, message: "Wrong Api Key"}))
    }
})

router.post('/createOrder', function(req,res,next) {
    if (req.body.key == API_KEY) {

        var order_phone = req.body.orderPhone
        var order_name = req.body.orderName
        var order_address = req.body.orderAddress
        var order_date = moment(req.body.orderDate, "MM/DD/YYYY").format("YYYY-MM-DD");
        var restaurant_id = req.body.restaurantId
        var transaction_id = req.body.transactionId
        var cod = req.body.cod
        var total_price = req.body.totalPrice
        var num_of_item = req.body.numOfItem
        var order_fbid = req.body.orderFBID

        if (order_fbid != null) {
        
            req.getConnection(function(error,conn) {
              conn.query('INSERT INTO `order` (OrderFBID,OrderPhone,OrderName,OrderAddress,OrderStatus,OrderDate,RestaurantId,'
              + 'TransactionId,COD,TotalPrice,NumOfItem) VALUES(?,?,?,?,?,?,?,?,?,?,?)', [order_fbid,order_phone,order_name,order_address,0,order_date,restaurant_id,transaction_id,cod,total_price,num_of_item],function(err,rows,fields) {

                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({success: false, message: err.message}))
                    } else {
                        conn.query('SELECT OrderId as orderNumber FROM `order` WHERE OrderFBID=? AND NumOfItem > 0'
                        +' ORDER BY orderNumber DESC LIMIT 1', [order_fbid],function(err,rows,fields) {


                            if (err) {
                                res.status(500)
                                res.send(JSON.stringify({success: false, message: err.message}))
                            } else {
                                res.send(JSON.stringify({success: false, result: rows}))
                            }
                        
                        
                    
                    })
                }

              })
            })

        } else {
            res.send(JSON.stringify({success: false, message: "Missing orderFBID in the query"}))
        }

    } else {
        res.send(JSON.stringify({success: false, message: "Wrong Api Key"}))
    }
})


//==============================================================
// ORDERDETAIL TABLE
// GET / POST
//==============================================================
router.get('/orderDetail', function(req,res,next) {
    if (req.query.key == API_KEY) {


            req.getConnection(function(error,conn) {
            var order_id = req.query.orderId
            
            if (order_id != null) {
              conn.query('SELECT orderId,itemId,quantity,discount,extraPrice,size,addOn FROM orderdetail WHERE orderId=?',[order_id],function(err,rows,fields) {

                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({success: false, message: err.message}))
                    } else {
                        if (rows.length > 0 ) {
                            res.send(JSON.stringify({ success: true, result:rows}))
                        } else{
                            res.send(JSON.stringify({success: false, message: "Empty"}))
                        }
                    }

              })
            } else {
                res.send(JSON.stringify({success: false, message: "Missing OrderId"}))
            }
            })

    } else {
        res.send(JSON.stringify({success: false, message: "Wrong Api Key"}))
    }
})

router.post('/updateOrder', function(req,res,next) {
    if (req.body.key == API_KEY) {

        var order_id = req.body.orderId
        var order_detail

        try {
            order_detail = JSON.parse(req.body.orderDetail)
        } catch (error) {
            res.status(500)
            res.send(JSON.stringify({success: false, message: error.message}))
        }

        if (order_detail != null && order_id != null) {
        
            var data_insert = []
            for (i=0;i < order_detail.length; i++) {
                data_insert[i] = [
                    parseInt(order_id),
                    order_detail[i]["foodId"],
                    order_detail[i]["foodQuantity"],
                    order_detail[i]["foodPrice"],
                    0, //Discount
                    order_detail[i]["foodSize"],
                    order_detail[i]["foodAddon"],
                    parseFloat(order_detail[i]["foodExtraPrice"])
                
                ]
            }
        
            req.getConnection(function(error,conn) {
              conn.query('INSERT INTO orderdetail (OrderId,ItemId,Quantity,Price,Discount,Size,Addon,ExtraPrice) VALUES (?)', data_insert,function(err,rows,fields) {

                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({success: false, message: err.message}))
                    } else {
                        res.send(JSON.stringify({success: true, message: "Update Success"}))
                        
                }

              })
            })

        } else {
            res.send(JSON.stringify({success: false, message: "Missing orderID and orderDetail in the query"}))
        }

    } else {
        res.send(JSON.stringify({success: false, message: "Wrong Api Key"}))
    }
})


module.exports = router