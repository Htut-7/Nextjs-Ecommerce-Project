const ROUTES={
    HOME: '/',
    PRODUCT: '/products',
    BLOGS: '/blogs',
    CONTACT: '/contact/create',
    LOGIN: '/Login',
    MESSAGE_DETAILS: (id:string)=>'/contact/'+id,
    TAGS: '/tags',
}

export default ROUTES;