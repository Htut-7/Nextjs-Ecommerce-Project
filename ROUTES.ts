const ROUTES={
    HOME: '/',
    PRODUCT: '/products',
    BLOGS: '/blogs',
    CONTACT: '/contact/create',
    LOGIN: '/Login',
    MESSAGE_DETAILS: (id:string)=>'/contact/'+id,
}

export default ROUTES;