const configs = {
    api_url: process.env.REACT_APP_VERCEL_ENV ? "https://social-media-app-node.herokuapp.com" : "http://localhost:5000"
}

export default configs