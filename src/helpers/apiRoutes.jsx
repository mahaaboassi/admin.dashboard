export const Host = "https://backendforeshore.vercel.app/api"
// export const Host = "http://localhost:5000/api"

export  const apiRoutes = {
    auth : {
        signIn : `${Host}/auth/signIn`,
    },
    user : {
        getAllUsers : `${Host}/admin/getAllUsers` ,
    },
    feature : {
        getAllfeatures : `${Host}/admin/getAllFeatures`,
        addFeature : `${Host}/admin/addFeature`,
        addSubFeature : `${Host}/admin/addSubFeature`,
        getAllSubfeatures : `${Host}/admin/getAllSubFeatures`,
    },
    property : {
        getAllProperties : `${Host}/admin/getAllProperties`,
        addProperty : `${Host}/admin/addProperty`,
        getOne : (id) => (`${Host}/admin/getProperty/${id}`),
        update : (id) => (`${Host}/admin/updateProperty/${id}`)
      
    },
    type : {
        getAllTypes : `${Host}/admin/getAllTypes`,
        addType : `${Host}/admin/addtype`,
    },

}



