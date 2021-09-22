const configs = {
    api_url: process.env.REACT_APP_VERCEL_ENV ? "https://blog-app-node.vercel.app" : "http://localhost:5000"
}

export default configs