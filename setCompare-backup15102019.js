const AWS = require ("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient({region:'us-east-1'});
var rekognition = new AWS.Rekognition();
var s3 = new AWS.S3();

let count = 30
var table = "<table><tr><th>Low</th><th>High</th></tr>";

exports.handler = async(event, context, callback) =>{
  
  //**********************************
  //****Show Items available in Bucket
  //**********************************
      // var paramsBucket = {
      //   Bucket: "rekognition-video-console-demo-iad-352250014224-1vio7fvwvq5qve", 
      //   MaxKeys: 2
      // };
      // s3.listObjects(paramsBucket, function(err, data) {
      // // s3.getObject(paramsBucket, function(err, data) {
      //   if (err){
      //     console.log(err, err.stack); // an error occurred
      //   }else{
      //     let scanningParameters =
      //     {
      //       TableName: 'orders',
      //             "Item":{
      //                 "id": ''+count+1,
      //                 "username" : "admin",
      //                 "quantity" : "1",
      //                 "project" : "123",
      //                 // "description": "AWS alexa " + event.image
      //                 "description": "" + JSON.stringify(data)
      //                 // "description": "" + event.operation 
      //             }
      //     }
         
      //     docClient.put(scanningParameters,function(err,data)
      //     {
      //       if (err) {
      //         callback(err,null,);
      //       }
      //       else {
      //         callback(null, data);
      //       }
         
      //     }); 
      //     console.log(data);           // successful response
      //   } 
        
        
        /*
        data = {
          AcceptRanges: "bytes", 
          ContentLength: 3191, 
          ContentType: "image/jpeg", 
          ETag: "\"6805f2cfc46c0f04559748bb039d69ae\"", 
          LastModified: <Date Representation>, 
          Metadata: {
          }, 
          TagCount: 2, 
          VersionId: "null"
        }
        */
      // });
      
      //**********************
      //*****getObject
      //**********************
      
      // var paramsBucket = {
      //   Bucket: "rekognition-video-console-demo-iad-352250014224-1vio7fvwvq5qve", 
      //   Key: "amazon-ceo-jeff-bezos_2.jpg"
      // };
      // s3.getObject(paramsBucket, function(err, data) {
      //   if (err){
      //     console.log(err, err.stack); // an error occurred
      //   }else{
      //     let scanningParameters =
      //     {
      //       TableName: 'orders',
      //             "Item":{
      //                 "id": ''+count+1,
      //                 "username" : "admin",
      //                 "quantity" : "1",
      //                 "project" : "123",
      //                 // "description": "AWS alexa " + event.image
      //                 "description": "" + JSON.stringify(data)
      //                 // "description": "" + event.operation 
      //             }
      //     }
         
      //     docClient.put(scanningParameters,function(err,data)
      //     {
      //       if (err) {
      //         callback(err,null,);
      //       }
      //       else {
      //         callback(null, data);
      //       }
         
      //     }); 
      //     console.log(data);           // successful response
      //   } 
      //   /*
      //   data = {
      //     AcceptRanges: "bytes", 
      //     ContentLength: 3191, 
      //     ContentType: "image/jpeg", 
      //     ETag: "\"6805f2cfc46c0f04559748bb039d69ae\"", 
      //     LastModified: <Date Representation>, 
      //     Metadata: {
      //     }, 
      //     TagCount: 2, 
      //     VersionId: "null"
      //   }
      //   */
      // });
    
      
    //   // var regex = /^data:.+\/(.+);base64,(.*)$/;
      
    //   // var matches = string.match(regex);
    //   // var matches2 = string2.match(regex);
    //   // var ext = matches[1];
    //   // var ext2 = matches[1];
    //   // var data = matches[2];
    //   // var data2 = matches2[2];
    //   // var buffer = new Buffer(data, 'base64');
    //   // var buffer2 = new Buffer(data2, 'base64');
    
    ////*************************************
    //working fine - comparefaces from mobile
    ////*************************************
    
      var params = {
        SourceImage: {
          S3Object: {
            Bucket: "rekognition-video-console-demo-iad-352250014224-1vio7fvwvq5qve", 
            // Name: "amazon-ceo-jeff-bezos_2.jpg"
            Name: "PUCMM2.JPG"
          }
          //Bytes: buffer
          // Video: buffer
        },
        TargetImage: {
          // Bytes: buffer2
          S3Object: {
            Bucket: "webpaa-deployments-mobilehub-209995345", 
            // Bucket: "webpaa-deployments-mobilehub-2128298286", 
            // Name: "amazon-ceo-jeff-bezos_2.jpg"
            Name: "PUCMM.jpg"
            // Name: "getty_946964370_200013332000928085_381902.jpg"
          }
        },
        SimilarityThreshold: 0,
      };
    //   // var params = {
    //   //   Image: {
    //   //     Bytes: buffer2
    //   //   },
    //   //   Attributes: [
    //   //     'ALL',
    //   //   ]
    //   // };
      
    //   // rekognition.detectFaces(params, async (err, data) =>{
      rekognition.compareFaces(params, async (err, data) =>{
        table = "<table><tr><th>Low</th><th>High</th></tr>";
        if (err){
          table += "</tablee>";
          console.log(err, err.stack); // an error occurred
        }
        else {
          
    //       // show each face and build out estimated age table
          // for (var i = 0; i < data.FaceDetails.length; i++) {
          for (var i = 0; i < data.FaceMatches.length; i++) {
            table += '<tr><td>' + data.FaceMatches[i].Similarity + '</td></tr>';
          }
          table += "</table><br/>"
          // table = JSON.stringify(data)
    //       document.getElementById("opResult").innerHTML = table;
            
             
        }
    });

    this.sendToDynamoDB(event, context, callback);
    
  
}

// exports.handler = async(event, context, callback) =>{
  
//       var rekognition = new AWS.Rekognition();
//       var string = event.image[0]
//       var regex = /^data:.+\/(.+);base64,(.*)$/;
      
//       var matches = string.match(regex);
//       var ext = matches[1];
//       var data = matches[2];
//       var buffer = new Buffer(data, 'base64');
    
//       var params = {
//         Image: {
//           Bytes: buffer
//         },
//         Attributes: [
//           'ALL',
//         ]
//       };
      
//       rekognition.detectFaces(params, async (err, data) =>{
//         table = "<table><tr><th>Low</th><th>High</th></tr>";
//         if (err){
//           table += "</tablee>";
//           console.log(err, err.stack); // an error occurred
//         }
//         else {
          
//     //       // show each face and build out estimated age table
//           for (var i = 0; i < data.FaceDetails.length; i++) {
//             table += '<tr><td>' + data.FaceDetails[i].AgeRange.Low +
//               '</td><td>' + data.FaceDetails[i].AgeRange.High + '</td></tr>';
//           }
//           // table += "</table><br/>"
//           // table = JSON.stringify(data)
//     //       document.getElementById("opResult").innerHTML = table;
            
             
//         }
//     });

//     this.sendToDynamoDB(event, context, callback);
  
// }

exports.sendToDynamoDB = async(event,context,callback)=>{

    let scanningParameters =
      {
        TableName: 'orders',
              "Item":{
                  "id": ''+count,
                  "username" : "admin",
                  "quantity" : "1",
                  "project" : "123",
                  // "description": "AWS alexa " + event.image
                  "description": "" + table
                  // "description": "" + event.operation 
              }
      }
     
      docClient.put(scanningParameters,function(err,data)
      {
        if (err) {
          callback(err,null,);
        }
        else {
          callback(null, data);
        }
     
      });
      
      count++
  
    callback(null,event.operation)
    
    table = ""
  
  
}