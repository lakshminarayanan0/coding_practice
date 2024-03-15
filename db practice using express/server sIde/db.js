const Pool=require('pg').Pool;

const pool=new Pool({
    user:'postgres',
    host:'localhost',
    database:'billing',
    password:'Maha@2021',
    port:5432
});

module.exports=pool;