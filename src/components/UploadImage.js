
import axios from 'axios'; 
import React,{Component} from 'react';
import { useHistory } from "react-router-dom";
import {BlobServiceClient, ContainerClient} from '@azure/storage-blob'

 
class UploadImage extends Component {
  
    state = {
 
      // Initially, no file is selected
      selectedFile: null,
      data: {title:'Intial title',id:'453',createdAt:'2021-10-13T19:54:41.462Z'}
    };
    
    // On file select (from the pop up)
    onFileChange = event => {
    
      // Update the state
      this.setState({ selectedFile: event.target.files[0] });
    
    };
    
    // On file upload (click the upload button)
     onFileUpload = async () => {  
  
    
      const blobservice= new BlobServiceClient('https://mlopsvarmaamlsa.blob.core.windows.net/?sv=2020-08-04&ss=bfqt&srt=co&sp=rwdlacuptfx&se=2021-10-30T07:13:29Z&st=2021-10-12T23:13:29Z&spr=https&sig=k%2FD4XLyZ7%2FHZJc%2B0idbr2WL0e9IEHmW%2FJEjDbWPK9HU%3D');
      const containerClient = blobservice.getContainerClient('styleai');

      const blobClient= containerClient.getBlockBlobClient(this.state.selectedFile.name);
      const options = {blobHTTPHeaders: {blobContentType: this.state.selectedFile.type}};

      // upload file to blob 
      await blobClient.uploadBrowserData(this.state.selectedFile, options); 

      let fileUrl = `https://mlopsvarmaamlsa.blob.core.windows.net/styleai/${this.state.selectedFile.name}}`
      console.log(fileUrl);

      console.log("hello2");  
    const article = { title: 'Axios POST Request Example' };
    const response = await axios.post('https://reqres.in/api/articles', article);
    console.log(response);
    
    var context = this;
    context.setState({data: response.data});
   // this.setState({data: response});    
    console.log(response.data.id);


    };
    
    // File content to be displayed after
    // file upload is complete
    fileData = () => {
    
      if (this.state.selectedFile) {
         
        return (
          <div>
            <h2>File Details:</h2>
             
<p>File Name: {this.state.selectedFile.name}</p>
 
             
<p>File Type: {this.state.selectedFile.type}</p>
 
             
<p>
              Last Modified:{" "}
              {this.state.selectedFile.lastModifiedDate.toDateString()}
            </p>
 
          </div>
        );
      } else {
        return (
          <div>

          </div>
        );
      }
    };
    
    render() {
    
      return (
        <div>
            <h2>USD: {this.state.data.title}</h2>
            <h3>
              Upload Your Creation!
            </h3>
            <div>
                <input type="file" onChange={this.onFileChange} />
                <button onClick={this.onFileUpload.bind(this)}>
                  Generate new art!
                </button>
            </div>
          {this.fileData()}
        </div>
      );
    }
  }
 
  export default UploadImage;