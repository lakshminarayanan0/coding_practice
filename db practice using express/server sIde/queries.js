const getTodayTopSales=`select t.transaction_id , t.customer_id,c.first_name,c.last_name, t.total_amount 
from transactions t 
left join customers c on t.customer_id=c.customer_id
where t.transaction_date=current_date - interval '7 days'
order by t.total_amount desc limit 10;`

const getTopSalesThisMonth=`select c.customer_id,c.first_name,c.last_name,sum(t.total_amount) as total_purchase_amount from customers c
inner join transactions t on c.customer_id=t.customer_id
where extract(month from t.transaction_date)=extract(month from current_date )
group by c.customer_id
order by total_purchase_amount desc
limit 10;`

const getMostSoldProductsThisMonth=`select p.product_id,p.name,sum(pd.quantity) as total_sold from products p
inner join purchase_details pd on p.product_id=pd.product_id
inner join transactions t on t.transaction_id=pd.transaction_id
where extract(month from t.transaction_date)=extract(month from current_date )
group by p.product_id
order by total_sold desc
limit 10;`

const getUnsoldProductsThisMonth=`select p.prduct_id,p.name,c.category from products p
left join categories c on c.category_id=p.category_id
left join purchase_details pd on p.product_id=pd.product_id
left join transactions t on t.transaction_id=pd.transaction_id and extract(month from t.transaction_date)=extract(month from current_date)
where pd.product_id is null ;`


const getRevenueByElectronicsThisMonth=`select p.product_id,p.name,coalesce(sum(pd.quantity),0) as total_sold ,
coalesce(sum(pd.subtotal),0) as total_purchased 
from products p
left join purchase_details pd on pd.product_id=p.product_id 
inner join categories c on c.category_id=p.category_id 
left join transactions t on pd.transaction_id=t.transaction_id and extract(month from t.transaction_date)=extract(month from current_date)
 where c.category='electronics' 
group by p.product_id,c.category_id
order by total_purchased desc;`


const getProductsSoldOver500ThisMonth=`select p.product_id,p.name,c.category,sum(pd.quantity) as sold_quantity from products p
left join categories c on c.category_id=p.category_id
left join purchase_details pd on p.product_id=pd.product_id
left join transactions t on t.transaction_id=pd.transaction_id and extract(month from t.transaction_date)=extract(month from current_date)
group by p.product_id,c.category_id having sum(pd.quantity) > 500;`

const getCustomersPurchasedMoreThan5000ThisMonth=`select c.customer_id,c.first_name,c.last_name,sum(t.total_amount) as purchased_amount from customers c
left join transactions t on t.customer_id=c.customer_id and extract (month from t.transaction_date)=extract(month from current_date)
group by c.customer_id
having sum(t.total_amount) >50000;`

const getProducts='select p.product_id,p.name,c.category,p.stock_quantity,p.price from products p left join categories c on c.category_id = p.category_id order by product_id asc;'

const getCategoryId='select category_id from categories where category=$1 ;'
const postProduct=`insert into products(name,category_id,stock_quantity,price) values ($1,$2,$3,$4);`
const deleteProduct='delete from products where product_id=$1 ;'
const editProduct='update products set name=$1, price=$2, category_id=$3 , stock_quantity=$4 where product_id=$5 ;'
const getProductById='select * from products where product_id=$1 '
const getProductDetailsById='select p.product_id,p.name,p.category_id,c.category,p.stock_quantity,p.price from products p left join categories c on c.category_id = p.category_id where product_id=$1 '
const getCategories='select * from categories;'
const getProductDetailsByName='select p.product_id,p.name,c.category,p.stock_quantity,p.price from products p left join categories c on c.category_id = p.category_id where p.name=$1 '

module.exports={
    getTodayTopSales,
    getCustomersPurchasedMoreThan5000ThisMonth,
    getMostSoldProductsThisMonth,
    getProductsSoldOver500ThisMonth,
    getRevenueByElectronicsThisMonth,
    getUnsoldProductsThisMonth,
    getTopSalesThisMonth,
    getProducts,
    postProduct,
    getCategoryId,
    deleteProduct,
    editProduct,
    getProductById,
    getProductDetailsById,
    getCategories,
    getProductDetailsByName
}