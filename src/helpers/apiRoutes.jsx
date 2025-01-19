export const Host = "https://backendforeshore.vercel.app/api"
// export const Host = "http://localhost:3000"

export  const apiRoutes = {
    auth : {
        signIn : `${Host}/auth/signIn`,
    },
    user : {
        getAllUsers : `${Host}/admin/getAllUsers`,
    },
    feature : {
        getAllfeatures : `${Host}/admin/getAllFeatures`,
        addFeature : `${Host}/admin/addFeature`,
        addSubFeature : `${Host}/admin/addSubFeature`,
    },
    property : {
        getAllProperties : `${Host}/admin/getAllProperties`,
        addProperty : `${Host}/admin/addProperty`,
        // addSubFeature : `${Host}/admin/addSubFeature`,
    },

}



