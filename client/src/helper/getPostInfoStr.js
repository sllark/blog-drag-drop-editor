const getPostInfo = (post)=>{

    let info = "";

    if(post.userID?.firstName && post.userID?.lastName){
        info+= `By - ${post.userID.firstName} ${post.userID.lastName}`;
    }

    if(post.createdAt){
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        info+= ` on ${new Date(post.createdAt).toLocaleDateString(undefined,options)}`
    }


    return info;
}


export default getPostInfo;
