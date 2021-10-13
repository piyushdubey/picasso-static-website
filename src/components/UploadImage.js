
import axios from 'axios'; 
import React,{Component} from 'react';
import { useHistory } from "react-router-dom";
import {BlobServiceClient, ContainerClient} from '@azure/storage-blob'

 
class UploadImage extends Component {
  
    state = {
 
      // Initially, no file is selected
      selectedFile: null
    };
    
    // On file select (from the pop up)
    onFileChange = event => {
    
      // Update the state
      this.setState({ selectedFile: event.target.files[0] });
    
    };
    
    // On file upload (click the upload button)
     onFileUpload = async () => {
    
      // Create an object of formData
      const formData = new FormData();
    
      // Update the formData object
      formData.append(
        "myFile",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
    
      const blobservice= new BlobServiceClient('https://mlopsvarmaamlsa.blob.core.windows.net/?sv=2020-08-04&ss=bfqt&srt=co&sp=rwdlacuptfx&se=2021-10-30T07:13:29Z&st=2021-10-12T23:13:29Z&spr=https&sig=k%2FD4XLyZ7%2FHZJc%2B0idbr2WL0e9IEHmW%2FJEjDbWPK9HU%3D');
      const containerClient = blobservice.getContainerClient('styleai');

      const blobClient= containerClient.getBlockBlobClient(this.state.selectedFile.name);
      const options = {blobHTTPHeaders: {blobContentType: this.state.selectedFile.type}};

      // upload file to blob 
      await blobClient.uploadBrowserData(this.state.selectedFile, options); 

      let fileUrl = `https://mlopsvarmaamlsa.blob.core.windows.net/styleai/${this.state.selectedFile.name}}`
      console.log(fileUrl);
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
            <h3>
              Upload Your Creation!
            </h3>
            <div>
                <input type="file" onChange={this.onFileChange} />
                <button onClick={this.onFileUpload}>
                  Generate new art!
                </button>
            </div>
          {this.fileData()}
        </div>
      );
    }
  }
 
  export default UploadImage;