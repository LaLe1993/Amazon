const express= require('express')
const db= require('../../db')

const router=express.Router()


router.get('/',async(req,res)=>{
    const order = req.query.order || "asc"
    const offset = req.query.offset || 0
    const limit = req.query.limit || 10

    // removing them from Query since otherwise I'll automatically filter on them
    delete req.query.order
    delete req.query.offset
    delete req.query.limit

    let query = 'SELECT * FROM "products" ' 

    const params = []
    for (queryParam in req.query) { 
        params.push(req.query[queryParam])

        if (params.length === 1) 
            query += `WHERE ${queryParam} = $${params.length} `
        else
            query += ` AND ${queryParam} = $${params.length} `
    }

    query += " ORDER BY _id " + order 

    params.push (limit)
    query += ` LIMIT $${params.length} `
    params.push(offset)
    query += ` OFFSET $${params.length}`
   
    console.log(query)

    //you can also specify just the fields you are interested in, like:
    //SELECT asin, category, img, title, price FROM "Books" 
    const response = await db.query(query, params)
    res.send(response.rows)
    // const response= await db.query(`SELECT * FROM "students"`)
    // res.send(response.rows)
})

router.get('/:id',async (req,res)=>{
    const response= await db.query(`SELECT * FROM "products" WHERE _id=$1`,[req.params.id])
    res.send(response.rows)
})

router.post("/", async (req, res)=> {
    const response = await db.query(`INSERT INTO "products" (name, description, brand, "imageUrl", price, category) 
                                     Values ($1, $2, $3, $4, $5, $6)
                                     RETURNING *`, 
                                    [req.body.name, req.body.description, req.body.brand, req.body.imageUrl, req.body.price, req.body.category])
    console.log(response)
    res.send(response.rows[0])
})

router.put('/:id',async(req,res)=>{
    try{
        const result = await db.query(`UPDATE "products"
                                    SET name=$1,
                                    description=$2,
                                    brand=$3,
                                    "imageUrl"=$4,
                                    price=$5,
                                    category=$6
                                    WHERE _id = $7
                                    RETURNING *`,
                                    [req.body.name, req.body.description, req.body.brand, req.body.imageUrl, req.body.price, req.body.category, req.params.id])


        console.log("RESULT",result)
        res.send(result.rows[0])
    }
    catch(ex){
        console.log("Error",ex)
        res.status(500).send(ex)
    }
})

router.delete("/:id", async (req, res) => {
    const response = await db.query(`DELETE FROM "products" WHERE _id = $1`, [ req.params.id ])

    if (response.rowCount === 0)
        return res.status(404).send("Not Found")
    
    res.send("OK")
})
module.exports=router