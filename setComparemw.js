const AWS = require ("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient({region:'us-east-1'});
var rekognition = new AWS.Rekognition();
var s3 = new AWS.S3();

// var tempData;
var tempData = [] 
// var tempData = ""

exports.handler = async(event, context, callback) =>{
    // TODO implement

    
    this.sendRequest(event, context, callback)
           
};

exports.sendRequest = async(event, context, callback) =>{
    
    for(var i=0,j=0;i<event.items.length;i++){
    // for(var i=0,j=0;i<1;i++){
    
        tempData.push({"FaceMatches":[{"Similarity":event.items[i].SourceImage}]})
                
        var params = {
            SourceImage: {
              S3Object: {
                Bucket: "webpaa-deployments-mobilehub-209995345", //future
                Name: event.items[i].SourceImage
              }
            },
            TargetImage: {
              S3Object: {
                Bucket: "webpaa-deployments-mobilehub-2128298286", 
                Name: event.items[i].TargetImage
              }
            },
            SimilarityThreshold: 0,
        };
        rekognition.compareFaces(params, async (err, data) =>{
            if (err){
                console.log(err, err.stack); // an error occurred
                callback(null, err.stack)
            }
            else {
                
        
                // callback(null, data)
                // tempData.push(data+",{SourceImage:"+event.items[i].SourceImage+", TargetImage:"+event.items[i].TargetImage+"}")
                tempData.push(data)
                // tempData=data
            }
        })
    }
    
    callback(null, tempData) 
    
}